---
name: paper-analyzer
description: This skill should be used when the user asks to "analyze a paper", "read a PDF paper", "dissect a paper", "summarize a research paper", "explain this paper", or wants to extract structured analysis from an academic PDF. It reads the full PDF and produces a comprehensive paper-analysis.json.
version: 1.0.0
---

# Paper Analyzer

Read an academic paper PDF and produce a structured analysis as `paper-analysis.json`. This skill performs deep extraction of metadata, contributions, methodology, equations, experiments, and generates quality ratings.

## Prerequisites

- A PDF file path provided by the user
- The PDF must be text-based (not scanned images)

## Step 1: Validate and Read the PDF

1. Verify the PDF file exists at the given path
2. Read the PDF using the Read tool with the `pages` parameter
   - For papers <= 20 pages: read all at once with `pages: "1-20"`
   - For papers 21-40 pages: read in two batches (`"1-20"`, then `"21-40"`)
   - For papers 40+ pages: read the first 40 pages and note that appendices/supplementary material may be truncated
3. If the PDF contains no extractable text (scanned document), inform the user:
   > "This appears to be a scanned PDF without extractable text. Please use an OCR tool (e.g., Adobe Acrobat, `ocrmypdf`) to convert it first, then try again."

## Step 2: Identify Paper Structure

Use the section heuristics from `${CLAUDE_PLUGIN_ROOT}/skills/paper-analyzer/references/section-heuristics.md` to:

1. Detect the numbering scheme (Arabic, Roman, or unnumbered)
2. Map each section to a standard ID
3. Estimate page ranges for each section
4. Handle domain-specific section patterns (ML, Systems, Theory, Bio, etc.)

## Step 3: Extract Metadata

Extract from the first 1-2 pages:

- **Title**: Usually the largest text on page 1
- **Authors**: Listed below the title, often with affiliations
- **Venue/Conference**: Look for conference name, journal name, or arXiv identifier
- **Year**: From the venue, date, or arXiv timestamp
- **DOI**: If present in headers/footers
- **Domain**: Classify into primary domain (NLP, CV, ML, RL, Systems, Theory, etc.)
- **Domain tags**: 3-5 specific topic keywords
- **Page count**: From the PDF metadata
- **Language**: ISO 639-1 code of the paper's written language

## Step 4: Extract Core Content

### Contributions
- Read the introduction and conclusion carefully
- Extract 2-5 key contributions, ranked by significance
- For each: classify type (architecture, algorithm, theory, dataset, benchmark, analysis)
- Note the evidence supporting each claim

### Methodology
- Summarize the core approach in 2-3 sentences
- List the key steps in the method pipeline
- Identify what is novel compared to prior work
- List key assumptions

### Experiments
- Extract all datasets used (name, size, purpose)
- List baselines compared against
- Extract main quantitative results with improvement margins
- Note ablation studies and their findings

### Limitations
- Extract explicitly stated limitations
- Infer unstated but obvious limitations from the methodology

### Related Work
- Group by research area
- Note key cited papers and the relationship (extends, improves, contrasts)

### Future Directions
- Extract from conclusion and discussion sections

## Step 5: Equation Analysis

Use the math explanation guide from `${CLAUDE_PLUGIN_ROOT}/skills/paper-analyzer/references/math-explanation-guide.md`.

1. Identify important equations (skip trivially standard ones)
2. For each equation:
   - Extract or reconstruct the LaTeX representation
   - List all variables with definitions
   - Write a plain-language explanation (2-3 sentences)
   - Provide an intuitive analogy
   - Classify role: core, supporting, or evaluation
3. If an equation is broken in the PDF extraction:
   - Reconstruct from context
   - Mark with `[reconstructed]` in the latex field
   - Note uncertainty in the explanation

If the paper contains no significant equations, set `equations` to an empty array.

## Step 6: Generate Ratings

Rate on a 1-10 scale:

| Rating | Criteria |
|--------|----------|
| **Novelty** | How new is the core idea? 10 = paradigm-shifting, 5 = incremental improvement, 1 = no novelty |
| **Rigor** | Soundness of methodology and evaluation. 10 = bulletproof, 5 = reasonable but gaps, 1 = fundamentally flawed |
| **Clarity** | Writing quality and organization. 10 = crystal clear, 5 = readable with effort, 1 = incomprehensible |
| **Reproducibility** | Can results be reproduced? 10 = full code+data+details, 5 = most details present, 1 = impossible to reproduce |
| **Impact** | Potential influence on the field. 10 = field-defining, 5 = useful contribution, 1 = negligible |

Also assign a difficulty level:
- `intermediate`: Accessible with ML/domain basics
- `advanced`: Requires solid subfield background
- `expert`: Requires deep specialized knowledge

## Step 7: Build Glossary

Extract 5-15 key terms that a reader might not know:
- Technical terms specific to the paper's subfield
- Acronyms defined in the paper
- Concepts that are important for understanding but not universally known

## Step 8: Write Output

Assemble all extracted data following the schema in `${CLAUDE_PLUGIN_ROOT}/skills/paper-analyzer/references/analysis-schema.md`.

Write to `$OUTPUT_DIR/paper-analysis.json` using the Write tool.

Print a brief summary to the user:
```
Paper: [title]
Authors: [first author] et al. ([year])
Domain: [domain] | Difficulty: [difficulty]
Key contribution: [main contribution in one sentence]
Equations found: [count]
Ratings: N=[novelty] R=[rigor] C=[clarity] Re=[reproducibility] I=[impact]
```

## Error Handling

- If a section is unreadable or missing, skip it and note in the output
- If metadata cannot be extracted (e.g., preprint with minimal headers), fill what's available and set others to null
- If the paper is in a non-English language, still analyze in the original language — translation happens in the summary generation step
- For very long survey papers (40+ pages), focus analysis on the introduction, taxonomy/framework, and conclusion sections

# Section Identification Heuristics

Rules for identifying and mapping sections in academic papers. Papers vary widely in structure — use these heuristics to normalize them.

## Standard Section Map

| Standard ID | Common Headings |
|-------------|----------------|
| `abstract` | Abstract, Summary |
| `introduction` | Introduction, 1. Introduction, I. Introduction, Overview |
| `related-work` | Related Work, Background, Prior Work, Literature Review, 2. Background |
| `methodology` | Method, Methodology, Approach, Model, Architecture, Framework, Our Method, Proposed Method, System Design |
| `experiments` | Experiments, Experimental Setup, Evaluation, Experimental Evaluation, Setup |
| `results` | Results, Main Results, Findings, Experimental Results |
| `discussion` | Discussion, Analysis, Further Analysis |
| `conclusion` | Conclusion, Conclusions, Summary and Future Work, Concluding Remarks |
| `appendix` | Appendix, Supplementary Material, Supplementary |

## Structure Detection Rules

### Numbered Sections
- **Arabic numerals**: `1. Introduction`, `2.1 Problem Setup` — most common in CS/ML
- **Roman numerals**: `I. Introduction`, `II-A. System Model` — common in IEEE papers
- **Unnumbered**: Detect by font size, bold, or all-caps formatting cues in text

### Subsection Depth
- Map up to 2 levels: `3. Method` → `3.1 Architecture` → `3.1.1 Attention Layer`
- For the section list, only include top-level and important second-level sections

### Multi-part Papers
- Some papers split methodology across multiple sections (e.g., "3. Problem Formulation" + "4. Proposed Method")
- Group them under a single `methodology` entry with combined page range

### Missing Sections
- Not all papers have all sections. Common omissions:
  - Theory papers often skip `experiments`
  - Workshop papers may have no `related-work`
  - Survey papers have no `methodology` (map to `analysis`)
- Only include sections that actually exist in the paper

## Domain-Specific Patterns

### Machine Learning Papers
- Often: Abstract → Introduction → Related Work → Method → Experiments → Conclusion
- Look for: "model architecture", "training details", "hyperparameters", "ablation study"

### Systems Papers
- Often: Abstract → Introduction → Background → Design → Implementation → Evaluation → Discussion → Conclusion
- Look for: "system overview", "throughput", "latency", "scalability"

### Theory Papers
- Often: Abstract → Introduction → Preliminaries → Main Results → Proofs → Discussion
- Look for: "theorem", "lemma", "proposition", "proof", "corollary"

### Biomedical Papers
- Often: Abstract → Introduction → Materials and Methods → Results → Discussion → Conclusion
- Look for: "cohort", "statistical analysis", "p-value", "clinical significance"

### Social Science / HCI Papers
- Often: Abstract → Introduction → Related Work → Study Design → Findings → Discussion → Limitations
- Look for: "participants", "survey", "interview", "qualitative analysis", "thematic analysis"

## Page Range Estimation

When exact page boundaries are unclear:
1. Abstract is always page 1
2. Introduction typically starts on page 1 and ends on page 2-3
3. Related Work is usually 1-2 pages
4. Method/Architecture is usually the longest section (2-4 pages)
5. Experiments + Results: 2-4 pages
6. Conclusion: typically the last 0.5-1 page before references

## Handling Edge Cases

- **No clear sections** (e.g., short workshop papers): Create synthetic sections based on content flow
- **Very long papers** (40+ pages): Focus on main body sections, summarize appendices briefly
- **Dual-column format**: Section headings span the full width in most templates
- **Papers in non-English languages**: Section detection works on structure patterns; translate headings for mapping

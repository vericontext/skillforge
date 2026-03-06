# Paper Analysis JSON Schema

The `paper-analysis.json` file contains the structured output of the paper-analyzer skill. All fields are filled by Claude after reading the full PDF.

```json
{
  "metadata": {
    "title": "Attention Is All You Need",
    "authors": ["Ashish Vaswani", "Noam Shazeer", "..."],
    "venue": "NeurIPS 2017",
    "year": 2017,
    "doi": "10.48550/arXiv.1706.03762",
    "domain": "NLP",
    "domainTags": ["Transformer", "Attention", "Sequence-to-Sequence"],
    "pageCount": 15,
    "language": "en"
  },

  "sections": [
    {
      "id": "abstract",
      "title": "Abstract",
      "pageRange": [1, 1],
      "summary": "1-2 sentence summary of this section"
    }
  ],

  "contributions": [
    {
      "id": 1,
      "type": "architecture|algorithm|theory|dataset|benchmark|analysis",
      "claim": "One-sentence description of the contribution",
      "evidence": "How the paper supports this claim",
      "significance": "high|medium|low"
    }
  ],

  "methodology": {
    "approach": "Brief name of the approach (e.g., 'Self-Attention Mechanism')",
    "summary": "2-3 sentence description of the core methodology",
    "steps": [
      "Step 1: ...",
      "Step 2: ..."
    ],
    "novelty": "What is new compared to prior work",
    "assumptions": ["List of key assumptions made"]
  },

  "equations": [
    {
      "id": "eq1",
      "latex": "\\text{Attention}(Q,K,V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V",
      "section": "3.2",
      "variables": {
        "Q": "Query matrix",
        "K": "Key matrix",
        "V": "Value matrix",
        "d_k": "Dimension of key vectors"
      },
      "plainExplanation": "The attention function computes a weighted sum of values V, where the weight for each value is determined by how well the corresponding key matches the query. The dot product is scaled by the square root of the key dimension to prevent gradient vanishing.",
      "intuition": "Think of it as a soft lookup table: the query asks a question, keys are labels, and values are answers. The scaling prevents the softmax from becoming too peaked.",
      "role": "core|supporting|evaluation"
    }
  ],

  "experiments": {
    "datasets": [
      {
        "name": "WMT 2014 English-German",
        "size": "4.5M sentence pairs",
        "purpose": "Machine translation evaluation"
      }
    ],
    "baselines": ["ConvS2S", "ByteNet", "GNMT"],
    "metrics": ["BLEU"],
    "mainResults": [
      {
        "claim": "Transformer achieves 28.4 BLEU on EN-DE",
        "improvement": "+2.0 BLEU over previous SOTA",
        "table": "Table 2"
      }
    ],
    "ablations": [
      {
        "variable": "Number of attention heads",
        "finding": "8 heads performs best; too few or too many hurts quality"
      }
    ]
  },

  "limitations": [
    "Self-attention has O(n^2) complexity with sequence length",
    "Requires large amounts of training data"
  ],

  "relatedWork": [
    {
      "area": "Sequence-to-Sequence Models",
      "keyPapers": ["Sutskever et al. 2014", "Bahdanau et al. 2015"],
      "relationship": "extends|improves|contrasts|combines"
    }
  ],

  "futureDirections": [
    "Apply Transformer to other modalities (images, audio)",
    "Investigate linear attention for longer sequences"
  ],

  "ratings": {
    "novelty": 9,
    "rigor": 8,
    "clarity": 8,
    "reproducibility": 9,
    "impact": 10
  },

  "difficulty": "intermediate|advanced|expert",

  "glossary": {
    "Self-Attention": "A mechanism where each position in a sequence attends to all positions in the same sequence.",
    "Multi-Head Attention": "Running multiple attention functions in parallel to capture different types of relationships."
  }
}
```

## Field Notes

### metadata
- `domain`: Primary research domain. Common values: NLP, CV, ML, RL, Robotics, Systems, Theory, HCI, Security, Bio
- `domainTags`: 3-5 specific topic tags for the paper
- `language`: ISO 639-1 code of the paper's language (not the output language)
- `doi`: Include if found; null if not

### sections
- Map the paper's actual section structure. Use standard IDs: `abstract`, `introduction`, `related-work`, `methodology`, `experiments`, `results`, `discussion`, `conclusion`, `appendix`
- If the paper uses non-standard section names, map to the closest standard ID

### contributions
- Extract 2-5 key contributions
- `type` should reflect the nature: architecture, algorithm, theory, dataset, benchmark, or analysis
- `significance`: high = main contribution, medium = secondary, low = minor

### equations
- Only include equations that are important for understanding the paper
- Skip trivially standard equations (e.g., cross-entropy loss) unless the paper modifies them
- `role`: core = central to the contribution, supporting = helps explain, evaluation = used in experiments
- If the PDF rendering breaks a formula, reconstruct from context and note uncertainty

### ratings
- Scale: 1-10
- `novelty`: How new is the core idea?
- `rigor`: How sound is the methodology and evaluation?
- `clarity`: How well-written and organized is the paper?
- `reproducibility`: Can results be reproduced from the paper alone?
- `impact`: Potential influence on the field (consider citations if known)

### difficulty
- `intermediate`: Accessible to someone with ML/domain basics
- `advanced`: Requires solid background in the subfield
- `expert`: Requires deep specialized knowledge

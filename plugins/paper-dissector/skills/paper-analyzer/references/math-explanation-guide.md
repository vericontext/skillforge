# Math-to-Plain-Language Explanation Guide

Rules for converting mathematical equations into accessible, intuitive explanations. The goal is to make complex math understandable to someone with basic quantitative literacy.

## Explanation Structure

For each important equation, produce three layers:

### 1. Variable Definitions
List every variable with a plain-language name and its role:
```
Q = Query matrix — what we're searching for
K = Key matrix — labels that describe each item
V = Value matrix — the actual content of each item
d_k = Key dimension — size of each key vector (used for scaling)
```

### 2. Plain Explanation (2-3 sentences)
Describe what the equation computes, step by step, without jargon:
```
"This equation computes a weighted average of the values. The weights
are determined by how similar each query is to each key (measured by
dot product). The result is divided by √d_k to keep the numbers in
a reasonable range before applying softmax."
```

### 3. Intuition / Analogy (1-2 sentences)
Connect to a real-world concept:
```
"Think of it as searching a library: your query is the topic you want,
keys are book titles, and values are the books themselves. The attention
score tells you which books are most relevant to your search."
```

## Writing Rules

### DO
- Use active voice: "The model computes..." not "It is computed by..."
- Define every symbol before referencing it
- Use concrete examples when possible ("e.g., if d_k = 64, then √64 = 8")
- Explain WHY each operation is done, not just WHAT
- Acknowledge when an equation is a standard form (e.g., "This is the standard cross-entropy loss")
- Group related equations together in the explanation

### DON'T
- Don't assume knowledge of advanced math notation (e.g., explain what ∇ means)
- Don't skip "obvious" steps — what's obvious to a researcher isn't to a student
- Don't use other jargon to explain jargon
- Don't oversimplify to the point of inaccuracy

## Common Patterns

### Summation / Expectation
```
∑_i w_i · x_i → "A weighted sum: multiply each item x_i by its weight w_i and add them all up"
E[X] → "The average value you'd expect if you repeated the experiment many times"
```

### Argmax / Argmin
```
argmax_θ L(θ) → "Find the parameter values θ that make L as large as possible"
```

### Gradient / Derivative
```
∇_θ L → "How much L changes when you slightly adjust each parameter θ — the direction of steepest increase"
∂L/∂w → "The sensitivity of L to small changes in w"
```

### Probability / Distribution
```
p(y|x) → "The probability of y given that we know x"
KL(p||q) → "A measure of how different distribution q is from distribution p — zero if they're identical"
```

### Norms
```
||x||_2 → "The length (magnitude) of vector x"
||x||_1 → "The sum of absolute values in x — penalizes non-zero entries"
```

### Matrix Operations
```
AB → "Matrix multiplication: each entry in the result is a dot product of a row from A and a column from B"
A^T → "Transpose: flip rows and columns of A"
A^{-1} → "The inverse of A: the matrix that 'undoes' multiplication by A"
```

### Loss Functions
```
-log p(y) → "Negative log-likelihood: penalizes low-probability predictions exponentially"
MSE = (1/n)∑(ŷ-y)² → "Average squared error: how far predictions ŷ are from true values y, on average"
```

## Handling Broken Equations

PDF text extraction often breaks equations. Common issues:

| Issue | Detection | Recovery |
|-------|-----------|----------|
| Missing subscripts/superscripts | `xi` instead of `x_i` | Infer from context and variable naming |
| Broken fractions | `a b` instead of `a/b` | Look for numerator-denominator patterns |
| Missing Greek letters | `alpha` as text | Map common names to symbols |
| Garbled LaTeX | `\frac{}{}` in text | Parse the LaTeX structure |
| Unicode math symbols | Rendered as `?` or boxes | Use surrounding text to identify |

When reconstructing:
1. Flag with `[reconstructed]` marker in the `latex` field
2. Note the uncertainty in `plainExplanation`
3. Cross-reference with the paper's text description of the equation

## Role Classification

- **core**: Central to the paper's contribution. The paper wouldn't exist without this equation. Usually 1-3 per paper.
- **supporting**: Helps explain the method but isn't novel. Standard loss functions, regularization terms, etc.
- **evaluation**: Used only in the experiments section. Metrics, statistical tests, etc.

## Difficulty-Aware Explanations

Adjust explanation depth based on the paper's difficulty level:

- **intermediate**: Explain all notation, use everyday analogies
- **advanced**: Assume vector/matrix basics, focus on the novel parts
- **expert**: Brief explanations focusing on why this formulation was chosen over alternatives

---
name: paper
description: Alias for /dissect - deeply analyze an academic paper PDF
allowed-tools: Bash, Read, Write, Glob, Grep
argument-hint: <paper.pdf> [--theme=academic|dark|light] [--lang=en|ko] [--output=./paper-output/] [--no-card] [--no-qa]
---

# /paper

Alias for `/dissect`. Deeply analyze an academic paper PDF.

## Usage

```
/paper <paper.pdf> [options]
```

Same parameters and behavior as `/dissect`. See the dissect command for full documentation.

## Execution

Delegate to the `paper-director` agent to orchestrate the full pipeline. Parse the user's parameters and pass them to the agent.

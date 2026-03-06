# Language Colors

GitHub-style color map for programming languages. Used in the language distribution bar.

```javascript
const languageColors = {
  'TypeScript':  '#3178c6',
  'JavaScript':  '#f1e05a',
  'Python':      '#3572A5',
  'Go':          '#00ADD8',
  'Rust':        '#dea584',
  'Java':        '#b07219',
  'Ruby':        '#701516',
  'Swift':       '#F05138',
  'Kotlin':      '#A97BFF',
  'C#':          '#178600',
  'C++':         '#f34b7d',
  'C':           '#555555',
  'PHP':         '#4F5D95',
  'Vue':         '#41b883',
  'Svelte':      '#ff3e00',
  'Dart':        '#00B4AB',
  'Elixir':      '#6e4a7e',
  'Haskell':     '#5e5086',
  'Scala':       '#c22d40',
  'Lua':         '#000080',
  'Shell':       '#89e051',
  'CSS':         '#563d7c',
  'HTML':        '#e34c26',
  'SQL':         '#e38c00',
  'Markdown':    '#083fa1',
  'Other':       '#8b8b8b',
};
```

## Usage

When building the language bar, look up the color for each language name:

```javascript
const color = languageColors[lang.name] || languageColors['Other'];
```

The colors are sourced from GitHub's linguist project and represent the standard colors displayed on GitHub repository pages.

## Extension-to-Language Mapping

For reference, the git-analyzer skill maps file extensions to language names. The language name must match a key in `languageColors` exactly. If a language doesn't have a color defined, fall back to `'Other'` (`#8b8b8b`).

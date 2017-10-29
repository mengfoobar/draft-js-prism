const SUPPORTED_LANGS = {
  bash: "bash",
  c: "c",
  clike: "clike",
  coffeescript: 'coffeescript',
  cpp: "cpp",
  csharp: "csharp",
  css: "css",
  dart: "dart",
  docker: "docker",
  elixir: "elixir",
  erlang: "erlang",
  fortran: "fortran",
  git: "git",
  go: "go",
  groovy: "groovy",
  haskell: "haskell",
  java: "java",
  javascript: "javascript",
  json: "json",
  jsx: "jsx",
  kotlin: "kotlin",
  makefile: "makefile",
  markdown: "markdown",
  markup: "markup",
  matlab: "matlab",
  nginx: "nginx",
  perl: "perl",
  php: "php",
  python: "python",
  r: "r",
  ruby: "ruby",
  rust: "rust",
  scala: "scala",
  scss: "scss",
  sql: "sql",
  swift: "swift",
  typescript: "typescript",
  vim: "vim",
  yaml: "yaml"
};

let supportedCodeBlocks = { 'code-block': true };
for (let key of Object.keys(SUPPORTED_LANGS)) {
  supportedCodeBlocks[`custom-code-block-${key}`] = true;
}

module.exports = {
  SupportedLanguages: SUPPORTED_LANGS,
  SupportedCodeBlocks: supportedCodeBlocks //TODO make this immutable
};

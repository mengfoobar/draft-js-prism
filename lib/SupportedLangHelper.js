const SUPPORTED_LANGS = {
  bash: true,
  c: true,
  clike: true,
  coffeescript: true,
  cpp: true,
  csharp: true,
  css: true,
  dart: true,
  docker: true,
  elixir: true,
  erlang: true,
  fortran: true,
  git: true,
  go: true,
  groovy: true,
  haskell: true,
  java: true,
  javascript: true,
  json: true,
  jsx: true,
  kotlin: true,
  makefile: true,
  markdown: true,
  markup: true,
  matlab: true,
  nginx: true,
  perl: true,
  php: true,
  python: true,
  r: true,
  ruby: true,
  rust: true,
  scala: true,
  scss: true,
  sql: true,
  swift: true,
  typescript: true,
  vim: true,
  yaml: true
};

let supportedCodeBlocks = { 'code-block': true };
for (let key of Object.keys(SUPPORTED_LANGS)) {
  supportedCodeBlocks[`custom-code-block-${key}`] = true;
}

module.exports = {
  SupportedLanguages: SUPPORTED_LANGS,
  SupportedCodeBlocks: supportedCodeBlocks //TODO make this immutable
};

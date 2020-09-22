export const LATIN_PATTERN = /^[a-zA-Z\s]*$/;
const LATIN_PATTERN_MESSAGE = 'Only Latin characters';

export const PATTERNS_LIST: { PATTERN: RegExp, MESSAGE: string }[] = [
  {PATTERN: LATIN_PATTERN, MESSAGE: LATIN_PATTERN_MESSAGE},
];

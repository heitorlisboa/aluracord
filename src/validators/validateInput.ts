export function validateInput(input: string, regex: RegExp) {
  let combinedMatches = '';
  const matches = input.matchAll(regex);

  for (const match of matches) {
    combinedMatches += match[0];
  }

  return combinedMatches;
}

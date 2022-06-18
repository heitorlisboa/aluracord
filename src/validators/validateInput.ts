function validateInput(input: string, regex: RegExp) {
  let combinedMatches = '';
  const matches = input.matchAll(regex);

  for (let match of matches) {
    combinedMatches += match[0];
  }

  return combinedMatches;
}

export default validateInput;

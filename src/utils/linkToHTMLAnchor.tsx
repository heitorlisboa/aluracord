/**
 * Transform text that contains links into text with HTML anchors
 * @param text The text which contains the links you want to convert to HTML
 * anchors
 * @returns The resulting value of the text with the anchor elements created
 */
export function linkToHTMLAnchor(text: string) {
  const regex = /https?:\/\/[\d\w./?\-=]*[\d\w/?\-=]/g;
  const matches = text.matchAll(regex);

  // If there are no matches, just return the text
  if (!matches) {
    return text;
  }

  const resultingElements: (JSX.Element | string)[] = [];

  // Since we'll need to reassign the text value, we'll create a variable for it
  let textToSlice = text;

  for (const match of matches) {
    /* match[0] because the first value is the RegExpMatchArray is the matching
    string */
    const matchingString = match[0];
    const matchStart = textToSlice.indexOf(matchingString);
    // This variable is the index right after the match end
    const matchEnd = matchStart + matchingString.length;
    const textBeforeMatch = textToSlice.slice(0, matchStart);
    const textAfterMatch = textToSlice.slice(matchEnd);

    /* Since it's important to keep the text, we'll insert the part of the text
    that was before the link, and then insert the link */
    resultingElements.push(textBeforeMatch);
    resultingElements.push(
      <a
        /* Setting the key as the item index (which is the array length before
        adding the item) */
        key={resultingElements.length}
        href={matchingString}
        target="_blank"
        rel="noreferrer"
      >
        {matchingString}
      </a>
    );

    /* Since the text before the link and the link itself were already added to
    the list, we replace the value of the entire text with the text that hasn't
    been used. Then if the iteration run again, it will use this new value
    instead, if not, it will be added to the final result later */
    textToSlice = textAfterMatch;
  }

  /* When the for loop ends, there will be a remaining text, thus we need to add
  it to the resulting list */
  if (textToSlice) resultingElements.push(textToSlice);

  return resultingElements;
}

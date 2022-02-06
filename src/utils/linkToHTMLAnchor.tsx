/**
 * Transform text that contains links into text with HTML anchors
 * @param text The text which contains the links you want to convert to HTML anchors
 * @returns The resulting value of the text with the anchor elements created
 */
export default function linkToHTMLAnchor(text: string) {
  const regex = /https?:\/\/[\d\w./?\-=]*[\d\w/?\-=]/g;
  const matches = text.matchAll(regex);

  // If there are no matches, just return the text
  if (!matches) {
    return text;
  }

  const resultingElements: (JSX.Element | string)[] = [];

  // Since we'll need to reassign the text value, we'll create a variable for it
  let textToSplit = text;

  for (let match of matches) {
    // This list will have the texts before and after the link (2 items)
    // match[0] because the first value is the RegExpMatchArray is the matching string
    let splittenText = textToSplit.split(match[0]);

    /* Since it's important to keep the text, we'll insert the part of
    the text that was before the link, and then insert the link */
    resultingElements.push(splittenText[0]);
    resultingElements.push(
      <a href={match[0]} target="_blank" rel="noreferrer">
        {match[0]}
      </a>
    );

    /* Since the text before the link and the link itself were already added
    to the list, we replace the value of the entire text with the text that
    hasn't been used. Then if the iteration run again, it will use this new value
    instead, if not, it will be added to the final result later */
    textToSplit = splittenText[1];
  }

  /* When the for loop ends, there will be a remaining text,
  thus we need to add it to the resulting list */
  if (textToSplit) resultingElements.push(textToSplit);

  return resultingElements;
}

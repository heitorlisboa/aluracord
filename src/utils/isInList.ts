export function isInList<T>(itemToFind: T, list: T[]) {
  let result = false;
  const isComparingObjects = itemToFind instanceof Object;

  list.forEach((item) => {
    if (isComparingObjects) {
      /* Sorting the entries because if the order is different, but the
      keys and values are the same, it would return false anyway */
      const itemToFindEntries = Object.entries(itemToFind).sort();
      const itemEntries = Object.entries(item).sort();

      // For each entry
      for (let i = 0; i < itemEntries.length; i++) {
        if (
          // Comparing key
          itemEntries[i][0] === itemToFindEntries[i][0] &&
          // Comparing value
          itemEntries[i][1] === itemToFindEntries[i][1]
        )
          result = true;
      }
    } else {
      if (item === itemToFind) result = true;
    }
  });

  return result;
}

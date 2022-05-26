export const difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));

export const findDuplicates = arr => {
  return arr.map(name =>
    Number(name.split('')[name.split('').length - 1]) ? name.split('').slice(0, -1).join('').trim() : name
  );
};

export const urlFinder = (url, regex) => regex.test(url.toLowerCase());

export const fontGenerator = (serverInfo, text) => {
  return text
    .toUpperCase()
    .split('')
    .map(letter => (serverInfo.font?.[letter] ? serverInfo.font?.[letter] : letter))
    .join('');
};

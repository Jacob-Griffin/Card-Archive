import { helper } from '@ember/component/helper';

export function unTitleCase(string) {
  const newString = string.replace(/\s(.)/, (match, p1) => {
    return `_${p1.toLowerCase()}`;
  });

  const finalString = newString.replace(/^(.)/, (match, p1) => {
    return p1.toLowerCase();
  });

  return finalString;
}
export function titleCase(string) {
  const newString = string.replace(/\_(.)/, (match, p1) => {
    return ` ${p1.toUpperCase()}`;
  });

  return newString.replace(/^(.)/, (match, p1) => {
    return p1.toUpperCase();
  });
}

function titleCaseHelper([string]) {
  const newString = string.replace(/\_(.)/, (match, p1) => {
    return ` ${p1.toUpperCase()}`;
  });

  return newString.replace(/^(.)/, (match, p1) => {
    return p1.toUpperCase();
  });
}

export default helper(titleCaseHelper);

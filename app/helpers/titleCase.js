import { helper } from '@ember/component/helper';


export function unTitleCase(string) {
    console.log(string);
    const newString = string.replace(/\W(.)/, (match, p1) => {
      return `-${p1.toLowerCase()}`;
    });

    console.log(newString);
  
    const finalString = newString.replace(/^(.)/, (match, p1) => {
      return p1.toLowerCase();
    });

    console.log(finalString);
    return finalString;
}
export function titleCase(string) {
  const newString = string.replace(/\-(.)/, (match, p1) => {
    return ` ${p1.toUpperCase()}`;
  });

  return newString.replace(/^(.)/, (match, p1) => {
    return p1.toUpperCase();
  });
}

function titleCaseHelper([string]) {
    const newString = string.replace(/\-(.)/, (match, p1) => {
      return ` ${p1.toUpperCase()}`;
    });
  
    return newString.replace(/^(.)/, (match, p1) => {
      return p1.toUpperCase();
    });
  }

export default helper(titleCaseHelper);

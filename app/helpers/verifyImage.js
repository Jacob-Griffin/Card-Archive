import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function verifyImage(link) {
  //make sure the link is a string
  const input = `${link}`;

  //match regex
  const regex =
    /https\:\/\/storage\.googleapis\.com\/ygoprodeck\.com\/.*\.jpg$/;
  const matches = input.match(regex);

  //If the string is safe, return it as a safe string
  if (matches.length != 0) {
    return htmlSafe(`background-image:url(${input});`);
  } else {
    return '';
  }
}

export default helper(verifyImage);

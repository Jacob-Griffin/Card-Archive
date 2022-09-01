import { helper } from '@ember/component/helper';

export default helper(function notUnsorted(positional) {
  return (positional != 'unsorted');
});

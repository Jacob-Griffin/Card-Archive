import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class DeleteCardComponent extends Component {
  @tracked isNotUnsorted = this.args.collection != 'unsorted';
  @tracked isNotSearch = !this.args.search;
}

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { searchCards } from '../helpers/getcards';

export default class SearchRoute extends Component {
  @tracked query = '';

  @action
  bufferInput() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.args.runSearch, 1000);
  }
}

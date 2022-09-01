import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CardFormComponent extends Component {
  @tracked timer;

  @action
  manageBuffer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.changeEvent, 1000);
  }

  @action
  changeEvent() {
    let query = document.getElementById('card-search').value;
    let queryKey = document.getElementById('key-select').value;

    this.args.searchAPI(query, queryKey);
  }
}

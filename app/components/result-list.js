import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { addCard } from '../helpers/getcards';

export default class ResultListComponent extends Component {
  get hasResults() {
    if (Object.keys(this.args.results).length > 0) {
      //Only re-called when result list changes, so it is focused
      return true;
    }
  }

  get results() {
    return Object.values(this.args.results);
  }

  @action
  addSelectedCard(id) {
    let cardObject = {
      ...this.args.results[id],
      location: this.args.collection,
      searchName: this.args.results[id].name.toUpperCase(),
    };

    this.args.createCard(cardObject);
  }
}

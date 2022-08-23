import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { searchCards } from '../helpers/getcards';

export default class SearchRoute extends Component {
  @tracked cardList = [];
  @tracked query = '';
  @tracked emptyresult = false;

  @action
  bufferInput() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.runSearch, 1000);
  }

  @action
  runSearch() {
    this.query = document.getElementById('search-bar').value;
    searchCards(this.query).then((result) => {
      this.cardList = result;

      //manage if the result is empty because of no results or no query for the purposes of a message
      this.emptyresult = this.query != '' && result.length == 0;
    });
  }
}

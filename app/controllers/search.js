import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deleteCard,searchCards } from '../helpers/getcards';

export default class SearchController extends Controller {
  @tracked cards = [];
  @tracked emptyResult = false;
  @tracked query = '';

  @action
  removeCard(key) {
    deleteCard(key);
    this.cards = this.cards.filter((card) => card.key != key);
  }

  @action
  runSearch() {
    this.query = document.getElementById('search-bar').value;
    searchCards(this.query).then((result) => {
      this.cards = result;

      //manage if the result is empty because of no results or no query for the purposes of a message
      this.emptyResult = this.query != '' && result.length == 0;
    });
  }
}

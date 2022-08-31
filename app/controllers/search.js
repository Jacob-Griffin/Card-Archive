import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class SearchController extends Controller {
    @action
    removeCard(key) {
        deleteCard(key);
        this.cards = this.cards.filter((card) => card.key != key);
    }
}

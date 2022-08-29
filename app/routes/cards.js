import Route from '@ember/routing/route';
import { getCards } from '../helpers/getcards';
import { action } from '@ember/object';

export default class AddCardRoute extends Route {

  @action
  reloadModel() {
    this.refresh();
  }

  async model() {
    return getCards('unsorted');
  }
}

import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { getCards } from '../helpers/getcards';

export default class AddCardRoute extends Route {
  async model() {
    return getCards('unsorted');
  }
}

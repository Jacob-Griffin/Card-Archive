import Route from '@ember/routing/route';
import { getCards } from '../helpers/getcards';
import '@esri/calcite-components/dist/components/calcite-icon';

export default class CollectionRoute extends Route {
  async model(params) {
    this.isUnsorted = params.collection_id == 'unsorted';
    return getCards(params.collection_id);
  }
}

import Route from '@ember/routing/route';
import { getCards } from '../helpers/getcards';
import { setAssetPath } from '@esri/calcite-components/dist/components';
import { action } from '@ember/object';
import '@esri/calcite-components/dist/components/calcite-icon';

export default class CollectionRoute extends Route {

  @action
  reloadModel() {
    this.refresh();
  }

  async model(params) {
    setAssetPath(
      'https://js.arcgis.com/calcite-components/1.0.0-beta.91/assets'
    );
    this.isUnsorted = params.collection_id == 'unsorted';
    return getCards(params.collection_id);
  }
}

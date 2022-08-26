import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { getCards } from '../helpers/getcards';
import { action } from '@ember/object';
import { setAssetPath } from '@esri/calcite-components/dist/components';
import "@esri/calcite-components/dist/components/calcite-icon";

export default class AddCardRoute extends Route {
  @action
  reloadModel() {
    this.refresh();
  }

  async model() {
    setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.91/assets");
    return getCards('unsorted');
  }
}

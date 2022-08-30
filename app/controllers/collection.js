import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CollectionController extends Controller {
  @action
  triggerReload() {
    //Send the reload signal to the route
    this.send('reloadModel');
  }
}

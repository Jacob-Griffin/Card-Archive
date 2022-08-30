import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deleteCollection } from '../helpers/getcards';
export default class CardsController extends Controller {
  constructor(owner, args) {
    super(owner, args);
  }

  @tracked toBeDeleted = '';

  @action
  openDeleteModal(collection) {
    this.toBeDeleted = collection;
    let modal = document.getElementById('delete-modal');
    modal.setAttribute('open', true);
  }

  @action
  sendDeleteCollection() {
    deleteCollection(this.toBeDeleted);
    let modal = document.getElementById('delete-modal');
    modal.removeAttribute('open');
    this.triggerReload();
  }

  @action
  triggerReload() {
    //Send the reload signal to the route
    this.send('reloadModel');
  }
}

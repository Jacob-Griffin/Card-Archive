import Component from '@glimmer/component';
import { action } from '@ember/object';
import { titleCase, unTitleCase } from '../helpers/titleCase';

export default class CollectionFormComponent extends Component {
  @action
  createCollection() {
    const collectionName = unTitleCase(
      document.getElementById('collectionInput').value
    );
    if (collectionName == '') {
      return;
    }

    let db;
    const request = window.indexedDB.open('card-db');
    request.onerror = () => {
      console.error('no indexed db');
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      const transaction = db.transaction(['locations'], 'readwrite');
      const locationStore = transaction.objectStore('locations');
      const locationRequest = locationStore.add(collectionName);
      locationRequest.onsuccess = (event) => {
        this.args.controller.triggerReload();
      };
    };
  }
}

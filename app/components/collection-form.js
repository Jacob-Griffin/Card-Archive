import Component from '@glimmer/component';
import { action } from '@ember/object';
import { titleCase,unTitleCase } from '../helpers/titleCase';

export default class CollectionFormComponent extends Component {

  @action
  createCollection() {
    const collectionName = unTitleCase(document.getElementById("collectionInput").value);
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
        console.log('Added:', collectionName);
        this.renderCollection(collectionName);
      };

    };
  }

  @action
  renderCollection(name) {
    const collection = document.createElement('div');
    const image = document.createElement('img');
    const title = document.createElement('h3');

    collection.classList.add('collection-link');

    image.src = "/images/cardSlot.png";
    image.classList.add("collection-image");

    title.innerHTML = titleCase(name);

    collection.appendChild(image);
    collection.appendChild(title);

    document.getElementById("your-collections").appendChild(collection);
  }
}

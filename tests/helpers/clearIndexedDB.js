import { addCard, upgradeDB } from 'card-archive/helpers/getcards';
import config from '../../config/environment';

const dbVersion = config.APP.dbVersion;

export async function clearDatabase() {
  return new Promise((callback) => {
    //Open the Database
    const request = window.indexedDB.open('card-db', dbVersion);
    request.onupgradeneeded = (event) => {
      upgradeDB(event);
    };
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['cards', 'locations'], 'readwrite');

      transaction.objectStore('cards').clear();
      transaction.objectStore('locations').clear();

      transaction.objectStore('locations').add('unsorted');

      callback();
    };
  });
}

export async function addDummyCard() {
  const dummyCard = {
    id: 56196385,
    name: 'Tri-Brigade Kitt',
    type: 'Effect Monster',
    images: {
      id: 56196385,
      image_url:
        'https://storage.googleapis.com/ygoprodeck.com/pics/56196385.jpg',
      image_url_small:
        'https://storage.googleapis.com/ygoprodeck.com/pics_small/56196385.jpg',
    },
    location: 'unsorted',
  };
  return addCard(dummyCard);
}

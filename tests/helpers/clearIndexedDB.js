import config from '../../config/environment';

const dbVersion = config.APP.dbVersion;

export async function clearDatabase() {
  return new Promise((callback) => {
    //Open the Database
    const request = window.indexedDB.open('card-db', dbVersion);
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

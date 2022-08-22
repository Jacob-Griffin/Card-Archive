import { helper } from '@ember/component/helper';

export async function loadImage([collection]) {
  let db;
  return new Promise((callback) => {
    const request = window.indexedDB.open('card-db', 3);
    request.onsuccess = (event) => {
      db = event.target.result;

      const transaction = db.transaction(['images'], 'readwrite');
      const imgStore = transaction.objectStore('images');
      const imgRequest = imgStore.get(collection);

      imgRequest.onsuccess = (event) => {
        callback(event.target.result);
      };
    };
  });
}

export default helper(loadImage);

import { titleCase } from './titleCase';

export function getCards(collection) {
  let db;
  return new Promise((callback) => {
    //Open the Database
    const request = window.indexedDB.open('card-db', 6);

    //If the database doesn't exist at this version, create it
    request.onupgradeneeded = (event) => {
      db = event.target.result;

      //get rid of existing stores to avoid conflict
      while (db.objectStoreNames.length > 0) {
        db.deleteObjectStore(db.objectStoreNames.item(0));
      }

      const objectStore = db.createObjectStore('cards', {
        autoIncrement: true,
      });
      const locationStore = db.createObjectStore('locations', {
        autoIncrement:true,
      });

      //make sure locations starts with Unsorted
      locationStore.add('unsorted');

      //Add index for name and location in the cards
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('location', 'location', { unique: false });
    };
    request.onerror = () => {
      console.error('no indexed db');
    };
    request.onsuccess = (event) => {
      //if connected, update the db variable
      db = event.target.result;

      //Start a transaction and open stores for locations and cards, where cards are indexed by location
      const transaction = db.transaction(['cards', 'locations'], 'readwrite');
      const locationStore = transaction.objectStore('locations');
      const objectStore = transaction.objectStore('cards');
      const index = objectStore.index('location');

      //Create an empty array for storing the results of the card search
      const cardResult = [];

      //Start by accessing the location store
      locationStore.getAll().onsuccess = (event) => {
        const locations = event.target.result;

        //If the location we're looking up doesn't exist, respond appropriately
        if (locations.find((loc) => collection == loc) === undefined) {
          callback({ locationFound: false, collection: collection });
          return;
        }

        //otherwise, continue with the card search (location == collection)
        index.openCursor(IDBKeyRange.only(collection)).onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            cardResult.push({ ...cursor.value, key: cursor.primaryKey });

            cursor.continue();
          } else {
            //If the cursor found the end of the db, return the matched cards, all locations (for the all cards page), and the collection you searched

            //remove unsorted from locations (unsorted is default on 'cards', the page where you will even see locations)
            const filteredLocations = locations.filter(
              (loc) => loc != 'unsorted'
            );

            //Send the resulting list as the model
            callback({
              collection: collection,
              collectionPrint: titleCase(collection),
              cards: cardResult,
              locations: filteredLocations,
              locationFound: true,
            });
          }
        };
      };
    };
  });
}

export function sortCard(cardKey,collection){
    let db;
    const request = window.indexedDB.open('card-db', 5);

    request.onsuccess = (event) =>{
        db = event.target.result;

        const transaction = db.transaction(['cards'],'readwrite');
        const cardStore = transaction.objectStore('cards');
        cardStore.get(cardKey).onsuccess = (event) =>{
            let cardData = event.target.result;
            cardData.location = collection;
            cardStore.put(cardData,cardKey);
        }
    }
}

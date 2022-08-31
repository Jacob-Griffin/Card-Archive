import { titleCase } from './titleCase';
import config from '../config/environment';

const dbVersion = config.APP.dbVersion;

export async function getCards(collection) {
  let db;
  return new Promise((callback) => {
    //Open the Database
    const request = window.indexedDB.open('card-db', dbVersion);

    //If the database doesn't exist at this version, create it
    request.onupgradeneeded = (event) => {
      upgradeDB(event);
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

export async function searchCards(name) {
  let db;

  //short circuit if nothing to search
  if (name == '') {
    return [];
  }

  return new Promise((callback) => {
    const request = window.indexedDB.open('card-db', dbVersion);
    request.onsuccess = (event) => {
      //if connected, update the db variable
      db = event.target.result;

      //Start a transaction and open the card store, indexed by name
      const transaction = db.transaction(['cards', 'locations'], 'readwrite');
      const objectStore = transaction.objectStore('cards');
      const index = objectStore.index('searchName');

      //Create an empty array for storing the results of the card search
      const cardResult = [];

      //format the search tearm
      let query = name.toUpperCase();

      //open the cursor for the search
      //this is a "starts with search", bound by an exact match with the search and the query + | (| is a beyond any character seen in the names)
      index.openCursor(IDBKeyRange.bound(query, query + '|')).onsuccess = (
        event
      ) => {
        const cursor = event.target.result;
        if (cursor) {
          //if the cursor is pointing
          cardResult.push({ ...cursor.value, key: cursor.primaryKey });
          cursor.continue();
        } else {
          //If the cursor found the end of the db, return the matched cards
          callback(cardResult);
        }
      };
    };
  });
}

export async function sortCard(card, collection) {
  let db;
  return new Promise((callback) => {
    const request = window.indexedDB.open('card-db', dbVersion);
    request.onsuccess = (event) => {
      db = event.target.result;

      const transaction = db.transaction(['cards'], 'readwrite');
      const cardStore = transaction.objectStore('cards');

      cardStore.get(card.key).onsuccess = (event) => {
        let cardData = event.target.result;
        cardData.location = collection;
        let putRequest = cardStore.put(cardData, card.key);
        putRequest.onsuccess = () => {
          callback(true);
        };
        putRequest.onerror = () => {
          console.log(event.target.error);
          callback(false);
        };
      };
    };
  });
}

export function deleteCard(cardKey) {
  let db;
  const request = window.indexedDB.open('card-db', dbVersion);

  request.onsuccess = (event) => {
    db = event.target.result;

    const transaction = db.transaction(['cards'], 'readwrite');
    const cardStore = transaction.objectStore('cards');
    cardStore.delete(cardKey);
  };
}

export function deleteCollection(name) {
  let db;
  const request = window.indexedDB.open('card-db', dbVersion);

  request.onsuccess = (event) => {
    db = event.target.result;

    const transaction = db.transaction(['locations', 'cards'], 'readwrite');

    //Delete the Actual Location
    const locStore = transaction.objectStore('locations');
    const locIndex = locStore.index('location');

    locIndex.openCursor(IDBKeyRange.only(name)).onsuccess = (event) => {
      const cursor = event.target.result;
      cursor.delete();
    };

    //Move cards in the deleted collection back to unsorted
    const cardStore = transaction.objectStore('cards');
    const cardIndex = cardStore.index('location');

    cardIndex.openCursor(IDBKeyRange.only(name)).onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        let updatedCard = cursor.value;
        updatedCard.location = 'unsorted';
        cursor.update(updatedCard);
        cursor.continue();
      }
    };
  };
}

export async function addCard(cardObject) {
  let db;
  return new Promise((callback) => {
    const request = window.indexedDB.open('card-db', dbVersion);
    request.onerror = () => {
      console.error('no indexed db');
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      const transaction = db.transaction(['cards'], 'readwrite');
      const objectStore = transaction.objectStore('cards');
      const outputRequest = objectStore.add(cardObject);
      outputRequest.onsuccess = (event) => {
        cardObject.key = event.target.result;
        callback(cardObject);
      };
    };
    request.onerror = () => {
      callback(false);
    };
  });
}

export async function addCollection(collectionName) {
  let db;
  return new Promise((callback) => {
    const request = window.indexedDB.open('card-db');
    request.onerror = (event) => {
      console.error(event.target.result);
      callback(false);
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      const transaction = db.transaction(['locations'], 'readwrite');
      const locationStore = transaction.objectStore('locations');
      const locRequest = locationStore.add(collectionName);
      locRequest.onsuccess = (event) => {
        callback(true);
      };
      locRequest.onerror = (event) => {
        console.error(event.target.error);
        callback(false);
      };
    };
  });
}

export function upgradeDB(event) {
  let db = event.target.result;

  //get rid of existing stores to avoid conflict
  while (db.objectStoreNames.length > 0) {
    db.deleteObjectStore(db.objectStoreNames.item(0));
  }

  const objectStore = db.createObjectStore('cards', {
    autoIncrement: true,
  });
  const locationStore = db.createObjectStore('locations', {
    autoIncrement: true,
  });

  //make sure locations starts with Unsorted
  locationStore.add('unsorted');

  //Add index for name and location in the cards
  objectStore.createIndex('searchName', 'searchName', { unique: false });
  objectStore.createIndex('location', 'location', { unique: false });
  locationStore.createIndex('location', '', { unique: true });
}

export function generateCSV() {
  let db;
  let cards = new Promise((callback) => {
    //Open the Database
    const request = window.indexedDB.open('card-db', dbVersion);
    request.onsuccess = (event) => {
      //if connected, update the db variable
      db = event.target.result;

      //Start a transaction and open stores for locations and cards, where cards are indexed by location
      const transaction = db.transaction(['cards', 'locations'], 'readwrite');
      const objectStore = transaction.objectStore('cards');

      //Create an empty array for storing the results of the card search
      const cardResult = [];

      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cardResult.push(cursor.value);
          cursor.continue();
        } else {
          callback(cardResult);
        }
      };
    };
  });
  cards.then((list) => {
    let fileData = '';
    for (let i = 0; i < list.length; i++) {
      fileData += `${list[i].name},${parseCardType(list[i].type)},${titleCase(
        list[i].location
      )},${list[i].id}\n`;
    }
    saveFile('card-archive.csv', fileData);
  });
}

export function saveFile(filename, contents) {
  console.log(contents);
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(contents)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function parseCardType(type) {
  let newType = `${type.split(' ')[0]},`; //For Non-Monster types, remove "Card" from the string
  if (type.includes('Monster')) {
    let monsterTypeArray = type.split(' '); //Tokenize monster type
    monsterTypeArray.pop(); //Get rid of the last token (Always "Monster")
    newType = 'Monster,' + monsterTypeArray.join(' '); //Format it to have Monster in one column, then the specific type in a second one
  }
  return newType;
}

export function importCSV(fileData) {
  let rows = fileData.split('\n');
  let ids = [];
  let names = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split(',');

    //Check for ID
    let idMatch = /,(\d{8}),/.exec(row);
    if (idMatch != null) {
      ids.push(idMatch[1]);
      continue;
    }

    //If no id match, grab the first column as a card name
    let cardMatch = /^([^,]+),/.exec(row);
    names.push(cardMatch);
  }
}

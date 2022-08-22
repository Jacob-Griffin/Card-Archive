export async function clearDatabase(){
    return new Promise((callback) => {
      //Open the Database
      const request = window.indexedDB.open('card-db', 5);
      request.onsuccess = (event) =>{
        const db = event.target.result;
        const transaction = db.transaction(['cards','locations'],'readwrite');

        const cardStore = transaction.objectStore('cards');
        const locStore = transaction.objectStore('locations');

        cardStore.clear().onsuccess = (event) =>{
            locStore.clear().onsuccess = (event) =>{
                callback();
            }
        }
  
      }
    });
  }
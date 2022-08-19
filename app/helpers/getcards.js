export function getCards(collection){
    let db;
    return new Promise((callback) =>{
        //Open the Database
        const request = window.indexedDB.open('card-db',3);

        //If the database doesn't exist at this version, create it
        request.onupgradeneeded = (event) =>{
            db = event.target.result;

            //get rid of existing stores to avoid conflict
            while(db.objectStoreNames.length > 0){
                db.deleteObjectStore(db.objectStoreNames.item(0));
            }

            const objectStore = db.createObjectStore("cards",{autoIncrement:true});
            const locationStore = db.createObjectStore("locations",{autoIncrement:true});

            //make sure locations starts with Unsorted
            locationStore.add('unsorted');

            //Add index for name and location in the cards
            objectStore.createIndex("name","name", {unique: false});
            objectStore.createIndex("location","location",{unique: false});

        };
        request.onerror = () => {
            console.error("no indexed db");
        };
        request.onsuccess = (event) => {
            //if connected, update the db variable
            db = event.target.result;
            
            //Start a transaction and open stores for locations and cards, where cards are indexed by location
            const transaction = db.transaction(["cards","locations"],"readwrite");
            const locationStore = transaction.objectStore("locations");
            const objectStore = transaction.objectStore("cards");
            const index = objectStore.index('location');

            //Create an empty array for storing the results of the card search
            const cardResult = [];

            //Start by accessing the location store
            locationStore.getAll().onsuccess = (event) =>{
                const locations = event.target.result;

                console.log(locations);
                //If the location we're looking up doesn't exist, respond appropriately
                if(locations.find((loc)=> collection == loc) === undefined){
                    callback({"locationFound":false,"collection":collection});
                    return;
                }

                //otherwise, continue with the card search (location == collection)
                index.openCursor(IDBKeyRange.only(collection)).onsuccess = (event) => {
                    const cursor = event.target.result;
                    if(cursor){
                        cardResult.push({...cursor.value,"key":cursor.key});

                        cursor.continue();
                    }
                    else{
                        //If the cursor found the end of the db, return the matched cards, all locations (for the all cards page), and the collection you searched
                        
                        //grab the pretty names for your locations
                        callback({"collection":collection,"collectionPrint":titleCase(collection),"cards":cardResult,"locations":locations,"locationFound":true});
                    }
                }
            }

            
        };
    });
}

function titleCase(string){
    string = string.replace(/\-(.)/, (match,p1) =>{
        return ` ${p1.toUpperCase()}`;
    });

    return string.replace(/^(.)/, (match,p1) =>{
        return p1.toUpperCase();
    })
}
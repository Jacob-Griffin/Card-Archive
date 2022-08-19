import Route from "@ember/routing/route";
import {service} from "@ember/service";

export default class AddCardRoute extends Route {

    @service store;

    async model() {
        const collection = "unsorted";
        let db;
        return new Promise((callback) =>{
            const request = window.indexedDB.open('card-db');
            request.onupgradeneeded = (event) =>{
                db = event.target.result;

                const objectStore = db.createObjectStore("cards",{autoIncrement:true});

                objectStore.createIndex("name","name", {unique: false});
                objectStore.createIndex("location","location",{unique: false});

            };
            request.onerror = () => {
                console.error("no indexed db");
            };
            request.onsuccess = (event) => {
                db = event.target.result;
                console.log(db);
                const transaction = db.transaction(["cards"],"readwrite");
                const objectStore = transaction.objectStore("cards");
                const index = objectStore.index('location');

                const cardResult = [];

                index.openCursor(IDBKeyRange.only(collection)).onsuccess = (event) => {
                    const cursor = event.target.result;
                    if(cursor){
                        cardResult.push({...cursor.value,"key":cursor.key});

                        cursor.continue();
                    }
                    else{
                        callback({"collection":collection,"cards":cardResult});
                    }
                }
            };
        });
        
    }
}
import Route from "@ember/routing/route";
import {service} from "@ember/service";

export default class AddCardRoute extends Route {

    @service store;

    async model() {
        let db;
        return new Promise((callback) =>{
            const request = window.indexedDB.open('card-db');
            request.onupgradeneeded = (event) =>{
                db = event.target.result;

                const objectStore = db.createObjectStore("cards",{autoIncrement:true});

                objectStore.createIndex("name","name", {unique: false});
                objectStore.createIndex("location","location",{unique: false});

                objectStore.transaction.oncomplete = (event) =>{
                    const cardObjectStore = db.transaction("cards","readwrite").objectStore("cards");

                }
            };
            request.onerror = () => {
                console.error("no indexed db");
            };
            request.onsuccess = (event) => {
                db = event.target.result;
                console.log(db);
                const transaction = db.transaction(["cards"],"readwrite");
                const objectStore = transaction.objectStore("cards");
                const outputRequest = objectStore.getAll();
                outputRequest.onsuccess = (event) =>{
                    callback(event.target.result);
                }
            };
        });
        
    }
}
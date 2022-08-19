import Route from "@ember/routing/route";
import { getCards } from "../helpers/getcards";

export default class CollectionRoute extends Route {
    

    async model(params) {
        return getCards(params.collection_id);
    }
}
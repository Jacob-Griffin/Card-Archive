import Route from "@ember/routing/route";
import {service} from "@ember/service";

export default class CollectionsRoute extends Route {

    @service store;

    async model() {
        
    }
}
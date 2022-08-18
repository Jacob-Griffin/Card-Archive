import Route from "@ember/routing/route";
import {service} from "@ember/service";

export default class AddCardRoute extends Route {

    @service store;

    async model() {
        return this.store.findRecord('collection','all')
        .then((result)=>{
            return result.cards;
        });
    }
}
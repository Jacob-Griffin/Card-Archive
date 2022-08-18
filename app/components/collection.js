import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {service} from '@ember/service';

export default class CollectionComponent extends Component {

    /*
    @service store;
    
    @tracked cards = this.store.findRecord('collection',this.args.collection)
        .then((result) => {
            console.log(result.cards);
            return result.cards;
        });*/

    @tracked list = this.args.data;

    willInsertElement(){
        console.log(this.cards);
    }
}
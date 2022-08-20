import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { titleCase } from '../helpers/titleCase';

export default class CardComponent extends Component {

    @tracked cardData = this.args.card;

    @action
    readyData(event){
        return event.dataTransfer.setData('text/data',JSON.stringify(this.cardData));
    }
}

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { sortCard } from '../helpers/getcards';
import { titleCase } from '../helpers/titleCase';

export default class CollectionBoxComponent extends Component {

    @action
    enableDrag(event){
        event.preventDefault();
    }

    @action
    handleDrop(event){
        //Get the card's data
        const card = JSON.parse(event.dataTransfer.getData('text/data'));

        //Remove the vard from the page visually 
        const cardElement = document.getElementById(`card-${card.key}`);
        cardElement.parentElement.removeChild(cardElement);

        let destinationElement = event.target;
        if(destinationElement.tagName !== "div"){
            destinationElement = event.target.parentElement;
        }

        sortCard(card.key,destinationElement.getAttribute('destination'));
    }
}

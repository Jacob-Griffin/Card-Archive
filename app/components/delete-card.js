import Component from '@glimmer/component';
import { action } from '@ember/object';
import { deleteCard } from '../helpers/getcards';

export default class DeleteCardComponent extends Component {
  @action
  enableDrag(event) {
    event.preventDefault();
  }

  @action
  handleDrop(event) {
    //Get the card's data
    const card = JSON.parse(event.dataTransfer.getData('text/data'));

    //Remove the vard from the page visually
    const cardElement = document.getElementById(`card-${card.key}`);
    cardElement.parentElement.removeChild(cardElement);

    deleteCard(card.key);
  }
}

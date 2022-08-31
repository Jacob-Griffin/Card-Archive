import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { addCard, deleteCard, sortCard } from '../helpers/getcards';

export default class CollectionController extends Controller {
  constructor(owner, args) {
    super(owner, args);
    this.maxResults = 5;
    this.eventAborter = new AbortController();
    document.addEventListener('click', this.handleDocClick, {
      signal: this.eventAborter.signal,
    });
  }

  @tracked cards = A(this.model.cards);
  @tracked addCardFocused = false;
  @tracked searchResults = {};
  @tracked draggedCard;

  @action
  handleDocClick(event) {
    if (event.target.tagName == 'A') {
      this.eventAborter.abort();
    } else if (
      document.getElementById('input-focus-group').contains(event.target)
    ) {
      this.addCardFocused = true;
    } else {
      this.addCardFocused = false;
    }
  }

  @action
  createCard(card) {
    addCard(card).then((newCard) => {
      if (newCard) {
        this.cards.pushObject(newCard);
      }
    });
  }

  @action
  removeCard(key) {
    deleteCard(key);
    this.cards = this.cards.filter((card) => card.key != key);
  }

  @action
  handleDrop(destination) {
    sortCard(this.draggedCard, destination).then((successful) => {
      if (successful) {
        this.cards = this.cards.filter(
          (card) => card.key != this.draggedCard.key
        );
      }
    });
  }

  @action
  startDrag(card) {
    this.draggedCard = card;
  }

  @action
  preventDefault(event) {
    event.preventDefault();
  }

  @action
  searchAPI(query, queryKey) {
    //Grab the results
    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${queryKey}=${query}`)
      .then((response) => response.json())
      .then((data) => {
        //Format results as an array of card objects
        let array = data.data;
        let cardData = {};

        //Go through each result
        for (let i = 0; i < array.length && i < this.maxResults; i++) {
          let card = array[i];

          //Save the data in the format I actually use
          cardData[card.id] = {
            id: card.id,
            name: card.name,
            type: card.type,
            images: card.card_images[0],
            location: 'unsorted',
          };
        }

        this.searchResults = cardData;
        this.addCardFocused = true;
      });
  }
}

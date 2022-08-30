import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CardFormComponent extends Component {
  @tracked timer;
  @tracked query;
  @tracked queryKey;
  @tracked maxResults = 5;
  @tracked cardData = {};
  @tracked showingResults = false;

  @action
  manageBuffer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.changeEvent, 1000);
  }

  @action
  changeEvent() {
    this.query = document.getElementById('card-search').value;
    this.queryKey = document.getElementById('key-select').value;

    //Grab the results
    fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?${this.queryKey}=${this.query}`
    )
      .then((response) => response.json())
      .then((data) => {
        //Format results as an array of card objects
        let array = data.data;
        this.cardData = {};

        //Go through each result
        for (let i = 0; i < array.length && i < this.maxResults; i++) {
          let card = array[i];

          //Save the data in the format I actually use
          this.cardData[card.id] = {
            id: card.id,
            name: card.name,
            type: card.type,
            images: card.card_images[0],
            location: 'unsorted',
          };
        }
      });
  }

  @action
  showResults() {
    this.showingResults = true;
  }

  @action
  hideResults() {
    this.showingResults = false;
  }
}

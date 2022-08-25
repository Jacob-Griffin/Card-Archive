import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { addCard, deleteCard } from '../helpers/getcards';

export default class CardFormComponent extends Component {
  @tracked timer;
  @tracked query;
  @tracked queryKey;
  @tracked resultArea = document.getElementById('add-results');
  @tracked maxResults = 5;
  @tracked cardData = {};
  @tracked showingResults = false;


  @service store;

  @action
  manageBuffer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.changeEvent, 1000);
    this.query = document.getElementById('cardSearch').value;
    this.queryKey = document.getElementById('keySelect').value;
  }

  @action
  changeEvent() {
    this.queryKey = document.getElementById('keySelect').value;

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
  showResults(){
    this.showingResults = true;
  }

  @action
  hideResults(){
    this.showingResults = false;
  }
}

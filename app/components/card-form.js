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
  @tracked clickListener;

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

    //Go through and delete current children - search results will be different
    while (this.resultArea.firstChild) {
      this.resultArea.removeChild(this.resultArea.firstChild);
    }

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

          //Generate a new element for an individual result
          let currentResult = document.createElement('div');
          currentResult.setAttribute('class', 'ygopro-result');
          currentResult.innerHTML = `<h5>${card.name}</h5><img src='${card.card_images[0].image_url_small}' class='result-image'/>`;
          currentResult.addEventListener('click', () => {
            this.addSelectedCard(card.id);
          });

          //Add that child to the search results base node
          this.resultArea.appendChild(currentResult);
        }
        this.resultArea.classList.add('show');
      });
  }

  constructor(owner, args) {
    super(owner, args);
    this.clickListener = document.addEventListener('click', this.handleDocClick);
  }

  @action
  handleDocClick(event) {
    //If we clicked on a link, get rid of the event listener
    if(event.target.tag == 'a'){
      document.removeEventListener(this.clickListener);
    }
    
    //short circuit if 
    if(document.getElementById('input-focus-group') == null){
      return;
    }

    if (document.getElementById('input-focus-group').contains(event.target)) {
      this.resultArea.classList.add('show');
    } else {
      this.resultArea.classList.remove('show');
    }
  }

  @action
  addSelectedCard(id) {
    let cardObject = {
      ...this.cardData[id],
      location: this.args.collection,
      searchName: this.cardData[id].name.toUpperCase(),
    };

    addCard(cardObject).then((didSucceed) => {
      if (didSucceed) {
        this.createCard(cardObject);
      }
    });
  }

  @action
  createCard(data) {
    const card = document.createElement('div');
    const button = document.createElement('button');

    button.classList.add('delete-item');
    button.type='button';
    button.innerHTML = "X";

    card.id = `card-${data.key}`;
    card.classList.add('card');
    card.classList.add('created-card');
    card.style.backgroundImage = `url(${data.images.image_url})`;
    card.setAttribute('draggable', true);
    card.addEventListener('dragstart', (event) => {
      this.readyData(event, data);
    });

    card.appendChild(button);
    document.getElementById(this.args.collection).appendChild(card);
    button.addEventListener('click',()=>{this.deleteNewCard(data.key)});
  }

  @action
  deleteNewCard(key){
    const card = document.getElementById(`card-${key}`);
    card.parentElement.removeChild(card);
    deleteCard(key);
  }

  @action
  readyData(event, cardData) {
    return event.dataTransfer.setData('text/data', JSON.stringify(cardData));
  }
}

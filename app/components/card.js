import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { titleCase } from '../helpers/titleCase';
import { deleteCard } from '../helpers/getcards';

export default class CardComponent extends Component {
  @tracked cardData = this.args.card;
  @tracked isUnsorted = this.cardData.location == 'unsorted';

  constructor(owner, args) {
    super(owner, args);
  }

  @action
  readyData(event) {
    return event.dataTransfer.setData(
      'text/data',
      JSON.stringify(this.cardData)
    );
  }

  @action
  deleteThis(event) {
    deleteCard(this.args.card.key);
    this.args.controller.triggerReload();
  }
}

import Controller from '@ember/controller';
import { action } from '@ember/object';
export default class CardsController extends Controller {

    constructor(owner,args){
        super(owner,args);
        this.observer = new MutationObserver((mutations) =>{
            this.refresh();
        });
    }
    
    @action
    triggerReload(){
        //clear any cards that were generated before reloading the model
        const tempCards = document.getElementsByClassName('created-card');
        while(tempCards.length > 0){
            const card = tempCards.item(0);
            card.parentElement.removeChild(card);
        }
        this.send("reloadModel");
    }
}

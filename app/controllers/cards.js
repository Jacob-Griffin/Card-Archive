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
        this.send("reloadModel");
    }
}

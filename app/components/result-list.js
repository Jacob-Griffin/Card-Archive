import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { addCard } from '../helpers/getcards';

export default class ResultListComponent extends Component {
    @tracked hasFocus = false;
    @tracked eventAborter;

    get hasResults(){
        if(Object.keys(this.args.results).length > 0){
            //Only re-called when result list changes, so it is focused
            this.hasFocus = true;
            return true;
        }
    }

    get results(){
        return Object.values(this.args.results);
    }

    constructor(owner,args){
        super(owner,args);
        this.eventAborter = new AbortController();
        document.addEventListener('click',this.handleDocClick,{signal:this.eventAborter.signal});

    }

    @action
    handleDocClick(event){
        if(event.target.tagName == 'A'){
            this.eventAborter.abort();
        }
        else if(document.getElementById('input-focus-group').contains(event.target)){
            this.hasFocus = true;
        }
        else{
            this.hasFocus = false;
        }
    }

    @action
    addSelectedCard(event) {
        const target = (event.target.tagName == "DIV")?(event.target):(event.target.parentElement);
        const id = target.id;

        let cardObject = {
            ...this.args.results[id],
            location: this.args.collection,
            searchName: this.args.results[id].name.toUpperCase(),
        };

        addCard(cardObject).then((didSucceed) => {
        if (didSucceed) {
            this.args.controller.triggerReload();
        }
        });
    }
}

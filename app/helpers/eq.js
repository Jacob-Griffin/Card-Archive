import { helper } from '@ember/component/helper';

export function eq(item1,item2){
    //Support #if helpers by computing true/false on equality statements
    return item1 == item2;
}

export default helper(eq);
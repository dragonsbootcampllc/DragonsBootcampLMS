function PickExistVars(SearchObj,CandicateArr){
    if(!SearchObj || !CandicateArr){
        return {};
    }
    let filtedObj = {};
    for(let key of Object.keys(SearchObj)){
      if(CandicateArr.find(val => key === val)){
        filtedObj[key] = SearchObj[key];
      }
    }
    return filtedObj;
}

module.exports = PickExistVars;

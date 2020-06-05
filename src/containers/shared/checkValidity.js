export const checkvalidity=(value,rules)=>{
    let isvalid = true;
    if (!rules) {
        return true;
    }
    if(rules.required){
       isvalid = value.trim() !== ''  && isvalid
    }
    if(rules.minLength){
        isvalid = value.length >= rules.minLength  && isvalid
    }
    if(rules.maxLength){
        isvalid = value.length <= rules.maxLength  && isvalid
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isvalid = pattern.test(value) && isvalid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isvalid = pattern.test(value) && isvalid
    }
    return isvalid
}
export class Validators {
    static required(value = ''){
        let res = value === value && value.trim() ? {valid:true} : {valid:false,msg:'Необходимо заполнить поле'};
        return res;
    }

    static minLength(length){

        return value => {
            return value.length >= length ? {valid:true} : {valid:false,msg:`Сообщение должно содержать не менее ${length} символов`};
        }

    }

    static confirmField(field){
        return value => {
            let res = value === field.value ? {valid:true} : {valid:false,msg:'Пароли не совпадают'};
            return res;
        }
    }

}

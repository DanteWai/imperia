export class Validators {
    static required(value = ''){
        return value === value && value.trim() ? {valid: true} : {valid: false, msg: 'Необходимо заполнить поле'};
    }

    static minLength(length){
        return value => {
            return value.length >= length ? {valid:true} : {valid:false,msg:`Сообщение должно содержать не менее ${length} символов`};
        }
    }

    static confirmField(field){
        return value => {
            return value === field.value ? {valid: true} : {valid: false, msg: 'Пароли не совпадают'};
        }
    }

    static phoneValid(value = '') {
        const template = /^\d[\d\(\)\ -]{4,14}\d$/;
        const result = template.test(value);
        return result ? {valid: true} : {valid: false, msg: 'Телефон введен неверно'};
    }

}

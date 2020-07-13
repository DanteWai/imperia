export class Form {
    constructor(form, controls){
        this.form = form;
        this.controls = controls;
    }

    value() {
        const value = {};

        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value;
        });

        return value;
    }

    clear() {
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = '';
        });
    }

    isValid(){
        let isFormValid = true;

        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control];
            let isValid = true;

            if(!this.form[control]) return;

            let errors = '';
            validators.forEach(validator => {
                let val = validator(this.form[control].value);
                if(val.msg) errors += val.msg + '<br/>';
                isValid = val.valid && isValid;
            });


            if(!isValid){
                setError(this.form[control],errors)
            } else{
                clearError(this.form[control])
            }

            isFormValid = isFormValid && isValid;
        });

        return isFormValid;
    }

    serverValidateErrors(errors){
        Object.keys(errors).forEach(control => {
            let error = errors[control].join('<br/>');
            setError(this.form[control], error);
        })
    }
}

function setError($control, errorName = 'Введите корректное значение') {
    clearError($control);
    const error = `<p class="validation-error">${errorName}</p>`;
    $control.classList.add('invalid');
    $control.insertAdjacentHTML('afterend', error);
}

function clearError($control) {
    $control.classList.remove('invalid');
    if($control.nextElementSibling && $control.nextElementSibling.classList.contains('validation-error')){
        $control.nextElementSibling.remove();
    }
}

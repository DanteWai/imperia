document.addEventListener('DOMContentLoaded', function() {



    let phone = document.getElementById('phone')
    /*phone.addEventListener('blur',function(){

        let valid = ValidPhone(this.value)
        let message = document.querySelector('.message')

        if (valid){
            output = 'Номер телефона введен правильно!'
            message.style.color = 'green'
        } else {
            output = 'Номер телефона введен неправильно!'
            message.style.color = '#cc0303'
        }

        message.innerHTML = output
    })*/




    let delivery = document.getElementById('delivery')
    let pickup = document.getElementById('pickup')
    let complete = document.getElementById('complete')

    delivery.addEventListener('click',function(){
        if(delivery.checked){
            let adr = document.getElementById('adr')
            adr.disabled = false
            adr.addEventListener('input',function(){
                if(adr.value != '') {
                    complete.disabled = false
                }
            })

            document.getElementById('delivery_p').checked = true
        }
    })

    pickup.addEventListener('click',function(){
        document.getElementById('adr').disabled = true
        complete.disabled = false
        document.getElementById('pickup_p').checked = true
    })


    let form = document.getElementById('order-form')

    form.addEventListener('submit',function(e){
        e.preventDefault()

        let valid = ValidPhone(phone.value)

        if (!valid){

            let span = document.createElement('span')
            span.innerHTML = "Укажите номер телефона"
            span.style.color = '#cc0303'
            span.style.marginLeft = '1em'
            complete.insertAdjacentElement('afterend',span)

        } else{
            let payments = document.getElementsByName("payment")
            for(let i = 0; i < payments.length; i ++){
                if(payments[i].checked) payments[i].disabled = false
            }



            form.submit()
        }

    })



})


function ValidPhone(myPhone) {
    let re = /^\d[\d\(\)\ -]{4,14}\d$/;

    var valid = re.test(myPhone)

    return valid
}

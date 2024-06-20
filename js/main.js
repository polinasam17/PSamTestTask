//let btn = document.getElementById("button")
let language = "ru-RU"
window.onload =function(){
    let btn = document.getElementById("button")
    btn.addEventListener('click', pay)
}
function pay() {
  var widget = new cp.CloudPayments({
    language: language
  })

  let data = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    middlename: document.getElementById('middlename').value,
    email: document.getElementById('email').value
  }

  let recurrent = document.getElementById('recurrent')
  if (recurrent.checked) {
    data.CloudPayments = {
        recurrent: {
         interval: 'Month',
         period: 1 
    }
  }
}

  
  widget.pay('auth', // или 'charge'
    { //options
      publicId: 'pk_aff17de359b486f45c12b4e4fdab0', //id из личного кабинета
      description: document.getElementById('description').value, //назначение
      amount: parseFloat(document.getElementById('amount').value) , //сумма
      currency: 'RUB', //валюта
      accountId: document.getElementById('email').value, //идентификатор плательщика (необязательно)
      email: document.getElementById('email').value,
      data: data
    }, 
    
    {
      onSuccess: function(options) { // success
        //действие при успешной оплате
      },
      onFail: function(reason, options) { // fail
        //действие при неуспешной оплате
      },
      onComplete: function(paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
        //например вызов вашей аналитики Facebook Pixel
      }
    }
  )
}

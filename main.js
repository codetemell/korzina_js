
  //  3 ci umumiy8

  let deliveryBox = document.getElementById('deliveryBox');
  let cartWrapper = document.querySelector('.cart-wrapper');
  let totalPriceElement = document.querySelector('.total-price');





  
  window.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'plus') {
      const counterWrapper = event.target.closest('.counter-wrapper');
      let counter = counterWrapper.querySelector('[data-counter]');
      counter.innerHTML = ++counter.innerHTML;
      updateTotalPrice();
    }
  
    if (event.target.dataset.action === 'minus') {
      const counterWrapper = event.target.closest('.counter-wrapper');
      let counter = counterWrapper.querySelector('[data-counter]');
      let cartItem = counterWrapper.closest('.cart-item');
  // remove1
      if (parseInt(counter.innerHTML) > 1) {
        counter.innerHTML = --counter.innerHTML;
      } else if (cartItem) {
        cartItem.remove();
      }
  
      updateTotalPrice();
      showEmpty();
    }
  
    if (event.target.hasAttribute('data-cart')) {
      const cart = event.target.closest('.card');
  
      let cardInfo = {
        id: cart.dataset.id,
        img: cart.querySelector('img').getAttribute('src'),
        title: cart.querySelector('.item-title').innerHTML,
        dataInBox: cart.querySelector('[data-items-in-box]').innerHTML,
        count: cart.querySelector('[data-counter]').innerHTML,
        price: cart.querySelector('.price__currency').innerHTML,
        weight: cart.querySelector('.price__weight').innerHTML
      };
  
      let itemInCard = cartWrapper.querySelector(`[data-id='${cardInfo.id}']`);
      if (itemInCard) {
        let itemCounter = itemInCard.querySelector('[data-counter]');
        itemCounter.innerHTML = parseInt(cardInfo.count) + parseInt(itemCounter.innerHTML);
      } else {
        let itemHTML = `
          <div class="cart-item" data-id="${cardInfo.id}">
            <div class="cart-item__top">
              <div class="cart-item__img">
                <img src="${cardInfo.img}" alt="" />
              </div>
              <div class="cart-item__desc">
                <div class="cart-item__title">${cardInfo.title}</div>
                <div class="cart-item__weight">${cardInfo.dataInBox} / ${cardInfo.weight}</div>
                <div class="cart-item__details">
                  <div class="items items--small counter-wrapper">
                    <div class="items__control" data-action="minus">-</div>
                    <div class="items__current" data-counter="">${cardInfo.count}</div>
                    <div class="items__control" data-action="plus">+</div>
                  </div>
                  <div class="price">
                    <div class="price__currency">${cardInfo.price}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  
        cartWrapper.insertAdjacentHTML('beforebegin', itemHTML);
      }
  
      cart.querySelector('[data-counter]').innerHTML = 1;
  
      updateTotalPrice();
      showEmpty();
    }
  });
  // total9 function
  function updateTotalPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalPrice = 0;
  
    cartItems.forEach((item) => {
      const priceElement = item.querySelector('.price__currency').innerHTML;
      const price = parseFloat(priceElement);
      const countElement = item.querySelector('[data-counter]');
      const count = parseInt(countElement.innerHTML);
  
      totalPrice += price * count;
    });
  
    totalPriceElement.innerHTML = totalPrice.toFixed(2);
  //  besplatno  function
    if (totalPrice >= 1000) {
      deliveryBox.classList.remove('none');
      deliveryBox.innerHTML = `
        <span class="h5">Доставка:</span>
        <span class="delivery-cost free">бесплатно</span> <br>
        <span class="small">бесплатно при заказе 1000 ₽</span>
      `;
    } else {
      deliveryBox.classList.add('none');
    }
  }
  
  function  showEmpty(){
    if (cartWrapper.children.length === 0) {
      let cardEmpty = document.querySelector('[data-cart-empty]');
      cardEmpty.classList.remove('none');
    } else {
     
        cardEmpty.classList.add('none');
      
    }
  }
  
  
  // İlk toplam fiyatı güncelle
  updateTotalPrice();
  showEmpty();








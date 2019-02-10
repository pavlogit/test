const cartCont = document.querySelector('.basket__area');
const buyButtons = document.querySelectorAll('.add_item');
let cartTotal = document.querySelector('#cart-total');


// создание массива в LocalStorage
if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify({list:[]}));
}

function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  }
}

// перебор всех кнопок "в корзину" и присваивание им события по клику
for (let i = 0; i < buyButtons.length; ++i) {
  buyButtons[i].onclick = writeProductData;
}

// Получаем данные из LocalStorage
function getCartData(){
  return JSON.parse(localStorage.getItem('cart')).list;
}
// Записываем данные в LocalStorage
function setCartData(value){
  localStorage.setItem('cart', JSON.stringify({ list: value }));
}

// Добавляем данный из карточки товара в LocalStorage
function writeProductData(e){ 
  const cartData = getCartData();
  const parentBox = this.parentNode.parentNode;
  const itemTitle = parentBox.querySelector('.info__title').innerHTML; // название товара
  const itemPrice = parentBox.querySelector('.act__price').innerHTML; // стоимость товара
  const itemId = +e.target.dataset.id;
  if (!cartData.find(item => +item.itemId === +e.target.dataset.id)) {
    cartData.push({ itemId, itemTitle, itemPrice });
    setCartData(cartData);
    } 
  else {
    alert('Товар уже в корзине!');
  }
  writeProductCart();
}


// Отрисовываем данные из карточки в корзине
function writeProductCart(e){
  const cartData = getCartData();
  let totalItems = '';
  let totalSum;
  // если что-то в корзине уже есть, начинаем формировать данные для вывода
  if(cartData !== null){
    totalItems = cartData.map(item => (`
    <div class="cart-product__item">
      <div class="cart-remove">
        <img class="remove" data-id="${item.itemId}" src="img/basket/remove.png" alt="">
      </div>
      <div class="cart-item">${item.itemTitle}</div>
      <div class="cart-price">${item.itemPrice}</div>
    </div>`)).join('');
    cartCont.innerHTML = `<div class="cart-product">${totalItems}</div>`;
    totalSum = cartData.reduce((acc, item) => acc + parseInt(item.itemPrice), 0);
    cartTotal.innerHTML = totalSum;
  }
}

// при перезагрузке страницы данные из корзины не пропадают
writeProductCart();

// Удаление товара из корзины
addEvent(document.body, 'click', function(e){
  if(e.target.className === 'remove')  {
      const cartData = getCartData().filter(item => item.itemId !== +e.target.dataset.id);
      setCartData(cartData);
      writeProductCart();
  }
});

// Вывод списка товаров добавленных в корзину и общей суммы в момент когда происходит клик по кнопке "Оформить заказ"
addEvent(document.body, 'click', function(e){
  if(e.target.className === 'check')  {
    const cartData = getCartData();
    const totalSum = document.querySelector('#cart-total').innerHTML;
    const totalProduct = cartData.map(item => item.itemTitle);
    if(cartData.length > 0){
      alert('Вы добавили в корзину ' + totalProduct + ' | ' + ' На сумму: ' +  totalSum + 'руб.');
      cartCont.innerHTML = '';
      cartTotal.innerHTML = 0;
      localStorage.clear();
      localStorage.setItem('cart', JSON.stringify({list:[]}));
    }
    else {
      alert('Корзина пуста!')
    }
  }
});


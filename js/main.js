// toggle cart

(function () {
  let cartInfo = document.querySelector('#cart-info');
  let cart = document.querySelector('#cart');

  cartInfo.addEventListener('click', () => {
    const cartItems = document.querySelector('.cart-items')
    if (cartItems.querySelectorAll('.cart-row')[0]) {
      cart.classList.toggle('show-cart');
    }
  });
})();


// Remove from cart
(function () {

  let removeBtn = document.querySelectorAll('.fa-trash')
  removeBtn.forEach(del => {
    del.addEventListener('click', removeItem)
  })

  let addToCartBtn = document.querySelectorAll('.fa-cart-plus')
  addToCartBtn.forEach(item => {
    item.addEventListener('click', addToCart)
  })

  let updateQuantity = document.querySelectorAll('.cart-quantity-input')
  updateQuantity.forEach(item => {
    item.addEventListener('change', updateCartByQuantity)
  })

  let checkout = document.querySelector('.btn-checkout')
  checkout.addEventListener('click', clearCart)

  notify()

})()

// clear cart for checkout
function clearCart() {
  const cartItems = document.querySelector('.cart-items')

  if (cartItems.hasChildNodes) {
    const allCart = cartItems.querySelectorAll('.cart-row')

    allCart.forEach(cart => {
      cart.remove()
      updateTotal()
      alert('Thanks for your purchase. You\'ll receive your order(s) soon')
    })
  }

  disableCart()
  notify()
}

// disbale show cart
function disableCart() {
  const cartItems = document.querySelector('.cart-items')
  if (cartItems.querySelectorAll('div.cart-row').length === 0) {
    let carts = document.querySelector('#cart');
    carts.classList.remove('show-cart');
  }
}

// notification
function notify() {
  const badge = document.querySelector('#badge')
  const cartItems = document.querySelector('.cart-items')
  const cartLength = cartItems.querySelectorAll('div.cart-row').length

  badge.innerHTML = cartLength
}

// update cart 
function updateCartByQuantity(e) {
  let quant = e.target;
  if (quant.value <= 0 || quant.value === null) {
    quant.value = 1;
    return;
  }

  updateTotal()

}

// remove all items from cart
function removeItem(e) {
  let item = e.target
  let cart = item.parentElement.parentElement.parentElement

  cart.remove()
  updateTotal()

  disableCart()
  notify()
}

// updated the total price
function updateTotal() {
  let total = 0
  let totalPrice = document.querySelector('#total')
  let cartRow = document.querySelectorAll('.cart-row')
  cartRow.forEach(row => {
    let price = row.querySelector('.cart-price').innerText
    let quantity = row.querySelector('.cart-quantity-input').value

    price = price.replace('$', '')
    total = total + Math.floor(parseFloat(price * quantity) * 100) / 100
  })

  totalPrice.innerHTML = `$ ${total}`

}

// add to cart
function addToCart(e) {
  const addBtn = e.target
  const cartItems = addBtn.parentElement.parentElement.parentElement

  const cartTop = addBtn.parentElement.parentElement
  const img = cartTop.querySelector('.img').src
  const cartTitle = cartItems.querySelector('.card-item-title').innerText
  const cartPrice = cartItems.querySelector('.card-item-price').innerText

  carts(img, cartTitle, cartPrice)
  updateTotal()
  notify()
}

function carts(img, cartTitle, cartPrice) {
  let cartItems = document.querySelector('.cart-items')
  let cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')

  const allTitle = cartItems.querySelectorAll('.cart-item-title')
  allTitle.forEach(e => {
    if (e.innerHTML === cartTitle) {
      alert('Item is already in cart')
      return;
    }
  })

  const content = `
<div class="cart-item">
  <img src=${img} alt="" />
  <span class="cart-item-title">${cartTitle}</span>
</div>
<span class="cart-price">${cartPrice}</span>
<div class="cart-quantity">
  <input type="number" class="cart-quantity-input" value="1" />
  <span class="btn-danger">
    <i class="fas fa-trash"></i>
  </span>
</div>
`
  cartRow.innerHTML = content
  cartRow.querySelector('.fa-trash').addEventListener('click', removeItem)
  cartRow.querySelector('.cart-quantity-input').addEventListener('change', updateCartByQuantity)

  cartItems.appendChild(cartRow)

}
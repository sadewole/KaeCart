// toggle cart

(function() {
  const cartInfo = document.querySelector('#cart-info');
  const cart = document.querySelector('#cart');

  cartInfo.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
  });
})();

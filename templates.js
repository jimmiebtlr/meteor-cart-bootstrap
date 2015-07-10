UI.registerHelper('cartNumItems',function(){
  return Cart.numItems();
});

UI.registerHelper('cartItems',function(){
  return Cart.items();
});

UI.registerHelper('cartCheckoutUrl',function(){
  console.log( Cart._config.checkoutUrl );
  return CartUI._config.checkoutUrl;
});

UI.registerHelper('cartTotalAmount',function(){
  return Cart.amount();
});

UI.registerHelper('formatMoney',function(amount){
  return accounting.formatMoney( amount );
});

Template.addToCart.events({
  'click button': function(e,template){
    Cart.add({
      relationType: template.data.type, 
      relationId: template.data.id, 
      quantity: 1
    });
  }
});

CartUIImplementation = function(){
  this._config = {};
};

CartUIImplementation.prototype.configure = function(config){
  this._config = config;
};

CartUI = new CartUIImplementation();

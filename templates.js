Template.addToCart.events({
  'click button': function(e,template){
    Cart.add({
      relationType: template.data.type, 
      relationId: template.data.id, 
      quantity: 1
    });
  }
});

Template.cartItemsIcon.helpers({
  cartItems: function(){
    return Cart.numItems();
  }
});

Template.cartReview.helpers({
  cartItems: function(){
    return Cart.items();
  }
});

Template.demo.helpers({
  items: function(){
    return Items.find();
  }
});

Template.cartItem.events({
  'click *[name="remove"]': function(){
    Cart.remove( this._id );
  }
});

Template.item.events({
  'click *[name="addToCart"]': function(){
    Cart.add( {relationType: "Items", relationId: this._id, quantity: 1} );
  }
});

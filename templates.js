var checkoutTemplate = new ReactiveVar();
var options = new ReactiveVar();

Template.cartCheckout.created = function(){
  checkoutTemplate.set( "cartReview" );
  options.set({});
};

Template.cartCheckout.helpers({
  template: function(){
    return checkoutTemplate.get();
  },
  data: function(){
    if( checkoutTemplate.get() === CartUI._settings.paymentSourceTemplate ){
      return { 
        callback: function(opts){
          var o = options.get();
          options.set( _.extend(o,opts) );
          checkoutTemplate.set("cartConfirmation");
        }
      };
    }
  },
  breadcrumbActive: function( route ){
    if( route === "cartReview" ){
      return true;
    }

    // if currently asking for payment source
    // and this is the breadcrumb for that template
    if( route === "paymentSource" && 
      checkoutTemplate.get() == CartUI._settings.paymentSourceTemplate
    ){
      return true;
    }

    // if on final template, all breadcrumbs should be active
    if( checkoutTemplate.get() === "cartConfirmation" ){
      return true;
    }
  }
});

Template.cartCheckout.events({
  'click .checkout-review': function(){
    console.log( "clicked" );
    checkoutTemplate.set("cartReview");
  },
  'click .checkout-source': function(){
    checkoutTemplate.set( CartUI._settings.paymentSourceTemplate );
  },
  'click .checkout-confirm': function(){
    checkoutTemplate.set( "cartConfirmation" );
  }
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

Template.cartReview.created = function(){

};

Template.cartReview.events({
  'click *[name="checkout"]': function(){
    checkoutTemplate.set( CartUI._settings.paymentSourceTemplate ); 
  }
});

Template.cartReviewLineItem.events({
  'click *[name="remove"]': function(){
    Cart.remove( this._id );
  }
});

Template.cartConfirmation.events({
  'click *[name="complete-checkout"]': function(){
    console.log( "checkoull" );
    var opts = options.get();
    opts = _.extend( opts, {expectedTotal: Cart.amount(), id: Cart.collection.findOne()._id});
    CartUI._settings.onCheckout( opts );
  }
});

CartUIImplementation = function(){
  this._settings = {};
};

CartUIImplementation.prototype.configure = function(settings){
  this._settings = settings;
};

CartUI = new CartUIImplementation();


UI.registerHelper('cartNumItems',function(){
  return Cart.numItems();
});

UI.registerHelper('cartItems',function(){
  return Cart.items();
});

UI.registerHelper('cartHasItems',function(){
  return Cart.items().count() > 0;
});

UI.registerHelper('cartCheckoutUrl',function(){
  return CartUI._settings.checkoutUrl;
});

UI.registerHelper('cartTotalAmount',function(){
  return Cart.amount();
});

UI.registerHelper('formatMoney',function(amount){
  return accounting.formatMoney( amount/100.0 );
});

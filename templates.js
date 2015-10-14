var checkoutTemplate = new ReactiveVar();
var options = new ReactiveVar();

var paymentErrors = new ReactiveVar();
var checkPaymentErrors = new Deps.Dependency();

Template.cartCheckout.created = function(){
  checkoutTemplate.set( "cartReview" );
  options.set({});
  paymentErrors.set();
};

Template.cartCheckout.onDestroyed(function(){
  options.set();
});

Template.cartCheckout.helpers({
  template: function(){
    return checkoutTemplate.get();
  },
  breadcrumbActive: function( route ){
    if( route === "cartReview" ){
      return true;
    }

    // if currently asking for payment source
    // and this is the breadcrumb for that template
    if( route === "cartPayment" && 
      checkoutTemplate.get() === "cartPayment"
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
    checkoutTemplate.set("cartReview");
  },
  'click .checkout-source': function(){
    checkoutTemplate.set( "cartPayment" );
  },
  'click .checkout-confirm': function(){
    checkoutTemplate.set( "cartConfirmation" );
  }
});

Template.cartPayment.helpers({
  data: function(){
    var template = Template.instance();
    var data = { 
      register: function( errFunc ){
        template.checkForErrors = errFunc;
      }
    };
    return data;
  },
  template: function(){
    return CartUI._settings.paymentSourceTemplate;
  },
});

Template.cartPayment.events({
  'click *[name="continue"]': function(e, template){
    if( !template.checkForErrors() ){
      checkoutTemplate.set( 'cartConfirmation' ); 
    }
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

Template.cartReview.events({
  'click *[name="checkout"]': function(){
    checkoutTemplate.set( 'cartPayment' ); 
  }
});

Template.cartReviewLineItem.events({
  'click *[name="remove"]': function(){
    Cart.remove( this._id );
  }
});


Template.cartConfirmation.onCreated(function(){
  this.checkoutDisabled = new ReactiveVar(false);
});

Template.cartConfirmation.events({
  'click *[name="complete-checkout"]': function(){
    var template = new Template.instance();
    template.checkoutDisabled.set( true );
    var opts = options.get();
    opts = _.extend( opts, {expectedTotal: Cart.amount(), id: Cart.collection.findOne()._id});
    CartUI._settings.onCheckout( opts );
  }
});

Template.cartConfirmation.helpers({
  disabled: function(){
    var template = new Template.instance();
    return template.checkoutDisabled.get() ? "disabled" : "";
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

UI.registerHelper('cartHasItem',function(type, id){
  return Cart.inCart({
    relationId: id,
    relationType: type,
  });
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

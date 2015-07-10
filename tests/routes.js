Router.configure({
  notFoundTemplate: 'not_found',
  loadingTemplate: 'loading',
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home', 
  template: 'demo'
});


Router.route('/checkout', {
  name: 'checkout', 
  template: 'cartCheckout'
});

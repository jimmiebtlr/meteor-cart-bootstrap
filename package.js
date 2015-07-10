Package.describe({
    name: "elevatedevdesign:cart-bootstrap",
    summary: "Bootstrap templates for use with elevatedevdesign:cart.",
  	version: "0.0.1-rc.2",
    git: "https://github.com/ElevateDev/meteor-cart-bootstrap.git"
});

Package.on_use(function (api) {
	api.versionsFrom("METEOR@1.0.2");

  api.use([
    "elevatedevdesign:cart@0.0.1-rc.2",
    'lepozepo:accounting@1.0.0',
    'templating',
    'ui'
  ]);
	
	api.add_files([
    'templates.html',
    'templates.js',
    'templates.css'
  ],['client']);

  api.export('CartUI');
});

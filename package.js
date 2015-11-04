Package.describe({
    name: "jimmiebtlr:cart-bootstrap",
    summary: "Bootstrap templates for use with jimmiebtlr:cart.",
  	version: "0.0.1-rc.2",
    git: "https://github.com/jimmiebtlr/meteor-cart-bootstrap.git"
});

Package.on_use(function (api) {
	api.versionsFrom("METEOR@1.0.2");

  api.use([
    "jimmiebtlr:cart@0.0.2-rc.1",
    'lepozepo:accounting@1.0.0',
    'templating',
    'ui',
    'reactive-var',
    'deps@1.0.7'
  ]);

	api.add_files([
    'templates.html',
    'templates.js',
    'templates.css',
    'breadcrumb.css'
  ],['client']);

  api.export('CartUI','client');
});

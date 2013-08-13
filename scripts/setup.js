var UUID;

require.config({
  baseUrl: "scripts",
  paths: {
    "jQuery": [
      "//code.jquery.com/jquery-1.10.2.min",
      "/_jquery/js/1.9.1.min"
    ],
    "jQuery UI": [
      "//code.jquery.com/ui/1.10.3/jquery-ui",
      "/_jquery/jqueryui/js/jquery-ui-1.10.2.custom.min"
    ],
    "Handlebars": [
      "//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min",
      "/_handlebars/js/1.0.0.min"
    ],
    "uuid": [
      "//twalve.com/__uuid/uuid.min"
    ],
    "scripts": [
      "scripts"
    ]
  },
  urlArgs: (new Date()).getTime(),
  waitSeconds: 15
});

require( ["uuid", "jQuery", "jQuery UI", "Handlebars", "events", "scripts"],
  function() {
    window.uuid = arguments[0];//skirts around an implementation issue with the library

    RCPTN.init();
  }
);
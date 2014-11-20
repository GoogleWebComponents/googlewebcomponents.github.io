/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

(function() {

  // Establish scope.
  window.WebComponents = window.WebComponents || {flags:{}};

  // loading script
  var file = 'webcomponents.js';
  var script = document.querySelector('script[src*="' + file + '"]');

  // Flags. Convert url arguments to flags
  var flags = {};
  if (!flags.noOpts) {
    // from url
    location.search.slice(1).split('&').forEach(function(o) {
      o = o.split('=');
      o[0] && (flags[o[0]] = o[1] || true);
    });
    // from script
    if (script) {
      for (var i=0, a; (a=script.attributes[i]); i++) {
        if (a.name !== 'src') {
          flags[a.name] = a.value || true;
        }
      }
    }
    // log flags
    if (flags.log) {
      var parts = flags.log.split(',');
      flags.log = {};
      parts.forEach(function(f) {
        flags.log[f] = true;
      });
    } else {
      flags.log = {};
    }
  }

  // Determine default settings.
  // If any of these flags match 'native', then force native ShadowDOM; any
  // other truthy value, or failure to detect native
  // ShadowDOM, results in polyfill
  flags.shadow = (flags.shadow || flags.shadowdom || flags.polyfill);
  if (flags.shadow === 'native') {
    flags.shadow = false;
  } else {
    flags.shadow = flags.shadow || !HTMLElement.prototype.createShadowRoot;
  }

  // Load.
  var ShadowDOMNative = [
    'WebComponents/shadowdom.js'
  ];

  var ShadowDOMPolyfill = [
    'ShadowDOM/ShadowDOM.js',
    'WebComponents/shadowdom.js',
    'ShadowCSS/ShadowCSS.js'
  ];

  // select ShadowDOM impl
  var ShadowDOM = flags.shadow ? ShadowDOMPolyfill : ShadowDOMNative;

  // construct full dependency list
  var modules = [].concat(
    ShadowDOM,
    [
      'HTMLImports/HTMLImports.js',
      'CustomElements/CustomElements.js',
      'WebComponents/lang.js',
      // these scripts are loaded here due to polyfill timing issues
      'WebComponents/dom.js',
      'WebComponents/unresolved.js',
      // back compat.
      'WebComponents/bc.js'
    ]
  );

  var src = script.getAttribute('src');
  var path = src.slice(0, src.lastIndexOf(file));

  modules.forEach(function(f) {
    document.write('<script src="' + path + 'src/' + f + '"></script>');
  });

  // exports
  WebComponents.flags = flags;

})();

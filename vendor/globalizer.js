/* global define */
(function () {
  // add supports for ember-resolver
  // Lightweight module loader for app and template codes
  var oldDefine = define;
  var seen = requirejs._eak_seen = {};

  define = function (name, deps, callback) {
    seen[name] = true;
    return oldDefine(name, deps, callback);
  };

  define.amd = oldDefine.amd;

  /* global define, Ember, DS */
  define('d3', [], function () {
    'use strict';

    return {
      'default': d3
    };
  });

  define('d3.ma', [], function () {
    'use strict';

    return {
      'default': d3.ma
    };
  });
})();

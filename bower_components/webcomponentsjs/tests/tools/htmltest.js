/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

// if standalone
if (window.top === window) {
  // if standalone
  var failed = false;
  window.done = function() {
    window.onerror = null;
    if (!failed) {
      var d = document.createElement('pre');
      d.style.cssText = 'padding: 6px; background-color: lightgreen;';
      d.textContent = 'Passed';
      document.body.appendChild(d);
    }
  };
  window.onerror = function(x) {
    failed = true;
    var d = document.createElement('pre');
    d.style.cssText = 'padding: 6px; background-color: #FFE0E0;';
    d.textContent = 'FAILED: ' + x;
    document.body.appendChild(d);
  };
} else
// if part of a test suite
{
  window.done = function() {
    window.onerror = null;
    parent.postMessage('ok', '*');
  };
  
  window.onerror = function(x) {
    parent.postMessage({error: x}, '*');
  };
}


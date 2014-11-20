/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

suite('Comment', function() {

  test('instanceof', function() {
    var div = document.createElement('div');
    div.innerHTML = '<!-- comment -->';
    assert.instanceOf(div.firstChild, Comment);
  });

  test('instanceof', function() {
    var div = document.createElement('div');
    div.innerHTML = '<!-- comment -->';
    assert.equal(Comment, div.firstChild.constructor);
  });

});

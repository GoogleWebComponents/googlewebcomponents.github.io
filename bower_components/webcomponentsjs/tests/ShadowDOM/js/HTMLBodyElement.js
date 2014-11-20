/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

htmlSuite('HTMLBodyElement', function() {

  var wrap = ShadowDOMPolyfill.wrap;

  var div, div2;

  teardown(function() {
    if (div && div.parentNode)
      div.parentNode.removeChild(div);
    if (div2 && div2.parentNode)
      div2.parentNode.removeChild(div2);
    div = div2 = undefined;
  });

  test('appendChild', function() {
    div = document.createElement('div');
    document.body.appendChild(div);
    assert.equal(wrap(document.body.lastChild), div);
  });

  test('appendChild (through wrapper)', function() {
    var doc = wrap(document);
    div = doc.createElement('div');
    doc.body.appendChild(div);
    assert.equal(doc.body.lastChild, div);
  });

  test('insertBefore', function() {
    div = document.createElement('div');
    document.body.appendChild(div);
    div2 = document.createElement('div');
    document.body.insertBefore(div2, div);
    assert.equal(wrap(document.body.lastChild), div);
    assert.equal(div2.nextSibling, div);
    assert.equal(div.previousSibling, div2);
  });

  test('insertBefore (through wrapper)', function() {
    var doc = wrap(document);
    div = doc.createElement('div');
    doc.body.appendChild(div);
    div2 = doc.createElement('div');
    doc.body.insertBefore(div2, div);
    assert.equal(doc.body.lastChild, div);
    assert.equal(div2.nextSibling, div);
    assert.equal(div.previousSibling, div2);
  });

  test('replaceChild', function() {
    div = document.createElement('div');
    document.body.appendChild(div);
    div2 = document.createElement('div');
    document.body.replaceChild(div2, div);
    assert.equal(wrap(document.body.lastChild), div2);
    assert.isNull(div.parentNode);
  });

  test('replaceChild (through wrapper)', function() {
    var doc = wrap(document);
    div = doc.createElement('div');
    doc.body.appendChild(div);
    div2 = doc.createElement('div');
    doc.body.replaceChild(div2, div);
    assert.equal(doc.body.lastChild, div2);
    assert.isNull(div.parentNode);
  });

  test('removeChild', function() {
    div = document.createElement('div');
    document.body.appendChild(div);
    document.body.removeChild(div);
    assert.isNull(div.parentNode);
  });

  test('removeChild (through wrapper)', function() {
    var doc = wrap(document);
    div = doc.createElement('div');
    doc.body.appendChild(div);
    doc.body.removeChild(div);
    assert.isNull(div.parentNode);
  });

  test('dispatchEvent', function() {
    var calls = 0;
    var doc = wrap(document);
    var f;
    document.body.addEventListener('x', f = function(e) {
      calls++;
      assert.equal(e.target, doc.body);
      assert.equal(e.currentTarget, doc.body);
      assert.equal(this, doc.body);
      if (calls === 2)
        document.body.removeEventListener('x', f);
    });

    document.body.dispatchEvent(new Event('x'));
    doc.body.dispatchEvent(new Event('x'));

    assert.equal(calls, 2);
  });

  test('document.body.contains', function() {
    var doc = wrap(document);
    assert.isTrue(doc.body.contains(doc.body.firstChild));
    assert.isTrue(doc.body.contains(document.body.firstChild));
    assert.isTrue(document.body.contains(doc.body.firstChild));
    assert.isTrue(document.body.contains(document.body.firstChild));
  });

  test('instanceof', function() {
    assert.instanceOf(document.createElement('body'), HTMLBodyElement);
  });

  test('constructor', function() {
    assert.equal(HTMLBodyElement, document.createElement('body').constructor);
  });

  htmlTest('../html/document-body-inner-html.html');

  htmlTest('../html/document-body-shadow-root.html');
});

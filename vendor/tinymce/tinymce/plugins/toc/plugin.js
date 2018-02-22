(function () {
var toc = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var I18n = tinymce.util.Tools.resolve('tinymce.util.I18n');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var getTocClass = function (editor) {
    return editor.getParam('toc_class', 'mce-toc');
  };
  var getTocHeader = function (editor) {
    var tagName = editor.getParam('toc_header', 'h2');
    return /^h[1-6]$/.test(tagName) ? tagName : 'h2';
  };
  var getTocDepth = function (editor) {
    var depth = parseInt(editor.getParam('toc_depth', '3'), 10);
    return depth >= 1 && depth <= 9 ? depth : 3;
  };
<<<<<<< HEAD
  var $_byqypzqkjd08mfg6 = {
=======
  var $_gddj2gqxjducwtt9 = {
>>>>>>> installer
    getTocClass: getTocClass,
    getTocHeader: getTocHeader,
    getTocDepth: getTocDepth
  };

  var create = function (prefix) {
    var counter = 0;
    return function () {
      var guid = new Date().getTime().toString(32);
      return prefix + guid + (counter++).toString(32);
    };
  };
<<<<<<< HEAD
  var $_skjkaqljd08mfg7 = { create: create };

  var tocId = $_skjkaqljd08mfg7.create('mcetoc_');
=======
  var $_ebmdphqyjducwtta = { create: create };

  var tocId = $_ebmdphqyjducwtta.create('mcetoc_');
>>>>>>> installer
  var generateSelector = function generateSelector(depth) {
    var i;
    var selector = [];
    for (i = 1; i <= depth; i++) {
      selector.push('h' + i);
    }
    return selector.join(',');
  };
  var hasHeaders = function (editor) {
    return readHeaders(editor).length > 0;
  };
  var readHeaders = function (editor) {
<<<<<<< HEAD
    var tocClass = $_byqypzqkjd08mfg6.getTocClass(editor);
    var headerTag = $_byqypzqkjd08mfg6.getTocHeader(editor);
    var selector = generateSelector($_byqypzqkjd08mfg6.getTocDepth(editor));
=======
    var tocClass = $_gddj2gqxjducwtt9.getTocClass(editor);
    var headerTag = $_gddj2gqxjducwtt9.getTocHeader(editor);
    var selector = generateSelector($_gddj2gqxjducwtt9.getTocDepth(editor));
>>>>>>> installer
    var headers = editor.$(selector);
    if (headers.length && /^h[1-9]$/i.test(headerTag)) {
      headers = headers.filter(function (i, el) {
        return !editor.dom.hasClass(el.parentNode, tocClass);
      });
    }
    return Tools.map(headers, function (h) {
      return {
        id: h.id ? h.id : tocId(),
        level: parseInt(h.nodeName.replace(/^H/i, ''), 10),
        title: editor.$.text(h),
        element: h
      };
    });
  };
  var getMinLevel = function (headers) {
    var i, minLevel = 9;
    for (i = 0; i < headers.length; i++) {
      if (headers[i].level < minLevel) {
        minLevel = headers[i].level;
      }
      if (minLevel === 1) {
        return minLevel;
      }
    }
    return minLevel;
  };
  var generateTitle = function (tag, title) {
    var openTag = '<' + tag + ' contenteditable="true">';
    var closeTag = '</' + tag + '>';
    return openTag + DOMUtils.DOM.encode(title) + closeTag;
  };
  var generateTocHtml = function (editor) {
    var html = generateTocContentHtml(editor);
<<<<<<< HEAD
    return '<div class="' + editor.dom.encode($_byqypzqkjd08mfg6.getTocClass(editor)) + '" contenteditable="false">' + html + '</div>';
=======
    return '<div class="' + editor.dom.encode($_gddj2gqxjducwtt9.getTocClass(editor)) + '" contenteditable="false">' + html + '</div>';
>>>>>>> installer
  };
  var generateTocContentHtml = function (editor) {
    var html = '';
    var headers = readHeaders(editor);
    var prevLevel = getMinLevel(headers) - 1;
    var i, ii, h, nextLevel;
    if (!headers.length) {
      return '';
    }
<<<<<<< HEAD
    html += generateTitle($_byqypzqkjd08mfg6.getTocHeader(editor), I18n.translate('Table of Contents'));
=======
    html += generateTitle($_gddj2gqxjducwtt9.getTocHeader(editor), I18n.translate('Table of Contents'));
>>>>>>> installer
    for (i = 0; i < headers.length; i++) {
      h = headers[i];
      h.element.id = h.id;
      nextLevel = headers[i + 1] && headers[i + 1].level;
      if (prevLevel === h.level) {
        html += '<li>';
      } else {
        for (ii = prevLevel; ii < h.level; ii++) {
          html += '<ul><li>';
        }
      }
      html += '<a href="#' + h.id + '">' + h.title + '</a>';
      if (nextLevel === h.level || !nextLevel) {
        html += '</li>';
        if (!nextLevel) {
          html += '</ul>';
        }
      } else {
        for (ii = h.level; ii > nextLevel; ii--) {
          html += '</li></ul><li>';
        }
      }
      prevLevel = h.level;
    }
    return html;
  };
  var isEmptyOrOffscren = function (editor, nodes) {
    return !nodes.length || editor.dom.getParents(nodes[0], '.mce-offscreen-selection').length > 0;
  };
  var insertToc = function (editor) {
<<<<<<< HEAD
    var tocClass = $_byqypzqkjd08mfg6.getTocClass(editor);
=======
    var tocClass = $_gddj2gqxjducwtt9.getTocClass(editor);
>>>>>>> installer
    var $tocElm = editor.$('.' + tocClass);
    if (isEmptyOrOffscren(editor, $tocElm)) {
      editor.insertContent(generateTocHtml(editor));
    } else {
      updateToc(editor);
    }
  };
  var updateToc = function (editor) {
<<<<<<< HEAD
    var tocClass = $_byqypzqkjd08mfg6.getTocClass(editor);
=======
    var tocClass = $_gddj2gqxjducwtt9.getTocClass(editor);
>>>>>>> installer
    var $tocElm = editor.$('.' + tocClass);
    if ($tocElm.length) {
      editor.undoManager.transact(function () {
        $tocElm.html(generateTocContentHtml(editor));
      });
    }
  };
<<<<<<< HEAD
  var $_5eh1n1qgjd08mfg1 = {
=======
  var $_ngidxqtjducwtt5 = {
>>>>>>> installer
    hasHeaders: hasHeaders,
    insertToc: insertToc,
    updateToc: updateToc
  };

  var register = function (editor) {
    editor.addCommand('mceInsertToc', function () {
<<<<<<< HEAD
      $_5eh1n1qgjd08mfg1.insertToc(editor);
    });
    editor.addCommand('mceUpdateToc', function () {
      $_5eh1n1qgjd08mfg1.updateToc(editor);
    });
  };
  var $_2x85v5qfjd08mffy = { register: register };

  var setup = function (editor) {
    var $ = editor.$, tocClass = $_byqypzqkjd08mfg6.getTocClass(editor);
=======
      $_ngidxqtjducwtt5.insertToc(editor);
    });
    editor.addCommand('mceUpdateToc', function () {
      $_ngidxqtjducwtt5.updateToc(editor);
    });
  };
  var $_8vgpckqsjducwtt3 = { register: register };

  var setup = function (editor) {
    var $ = editor.$, tocClass = $_gddj2gqxjducwtt9.getTocClass(editor);
>>>>>>> installer
    editor.on('PreProcess', function (e) {
      var $tocElm = $('.' + tocClass, e.node);
      if ($tocElm.length) {
        $tocElm.removeAttr('contentEditable');
        $tocElm.find('[contenteditable]').removeAttr('contentEditable');
      }
    });
    editor.on('SetContent', function () {
      var $tocElm = $('.' + tocClass);
      if ($tocElm.length) {
        $tocElm.attr('contentEditable', false);
        $tocElm.children(':first-child').attr('contentEditable', true);
      }
    });
  };
<<<<<<< HEAD
  var $_5kqv6uqmjd08mfg8 = { setup: setup };
=======
  var $_5dh2naqzjducwttb = { setup: setup };
>>>>>>> installer

  var toggleState = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('LoadContent SetContent change', function () {
<<<<<<< HEAD
        ctrl.disabled(editor.readonly || !$_5eh1n1qgjd08mfg1.hasHeaders(editor));
=======
        ctrl.disabled(editor.readonly || !$_ngidxqtjducwtt5.hasHeaders(editor));
>>>>>>> installer
      });
    };
  };
  var isToc = function (editor) {
    return function (elm) {
<<<<<<< HEAD
      return elm && editor.dom.is(elm, '.' + $_byqypzqkjd08mfg6.getTocClass(editor)) && editor.getBody().contains(elm);
=======
      return elm && editor.dom.is(elm, '.' + $_gddj2gqxjducwtt9.getTocClass(editor)) && editor.getBody().contains(elm);
>>>>>>> installer
    };
  };
  var register$1 = function (editor) {
    editor.addButton('toc', {
      tooltip: 'Table of Contents',
      cmd: 'mceInsertToc',
      icon: 'toc',
      onPostRender: toggleState(editor)
    });
    editor.addButton('tocupdate', {
      tooltip: 'Update',
      cmd: 'mceUpdateToc',
      icon: 'reload'
    });
    editor.addMenuItem('toc', {
      text: 'Table of Contents',
      context: 'insert',
      cmd: 'mceInsertToc',
      onPostRender: toggleState(editor)
    });
    editor.addContextToolbar(isToc(editor), 'tocupdate');
  };
<<<<<<< HEAD
  var $_tb0s4qnjd08mfg9 = { register: register$1 };

  PluginManager.add('toc', function (editor) {
    $_2x85v5qfjd08mffy.register(editor);
    $_tb0s4qnjd08mfg9.register(editor);
    $_5kqv6uqmjd08mfg8.setup(editor);
=======
  var $_6tkytdr0jducwttc = { register: register$1 };

  PluginManager.add('toc', function (editor) {
    $_8vgpckqsjducwtt3.register(editor);
    $_6tkytdr0jducwttc.register(editor);
    $_5dh2naqzjducwttb.setup(editor);
>>>>>>> installer
  });
  function Plugin () {
  }

  return Plugin;

}());
})();

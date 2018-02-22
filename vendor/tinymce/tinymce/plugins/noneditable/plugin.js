(function () {
var noneditable = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var getNonEditableClass = function (editor) {
    return editor.getParam('noneditable_noneditable_class', 'mceNonEditable');
  };
  var getEditableClass = function (editor) {
    return editor.getParam('noneditable_editable_class', 'mceEditable');
  };
  var getNonEditableRegExps = function (editor) {
    var nonEditableRegExps = editor.getParam('noneditable_regexp', []);
    if (nonEditableRegExps && nonEditableRegExps.constructor === RegExp) {
      return [nonEditableRegExps];
    } else {
      return nonEditableRegExps;
    }
  };
<<<<<<< HEAD
  var $_6x7xfjgljd08mdgb = {
=======
  var $_9wsq8dgujducwrnl = {
>>>>>>> installer
    getNonEditableClass: getNonEditableClass,
    getEditableClass: getEditableClass,
    getNonEditableRegExps: getNonEditableRegExps
  };

  var hasClass = function (checkClassName) {
    return function (node) {
      return (' ' + node.attr('class') + ' ').indexOf(checkClassName) !== -1;
    };
  };
  var replaceMatchWithSpan = function (editor, content, cls) {
    return function (match) {
      var args = arguments, index = args[args.length - 2];
      var prevChar = index > 0 ? content.charAt(index - 1) : '';
      if (prevChar === '"') {
        return match;
      }
      if (prevChar === '>') {
        var findStartTagIndex = content.lastIndexOf('<', index);
        if (findStartTagIndex !== -1) {
          var tagHtml = content.substring(findStartTagIndex, index);
          if (tagHtml.indexOf('contenteditable="false"') !== -1) {
            return match;
          }
        }
      }
      return '<span class="' + cls + '" data-mce-content="' + editor.dom.encode(args[0]) + '">' + editor.dom.encode(typeof args[1] === 'string' ? args[1] : args[0]) + '</span>';
    };
  };
  var convertRegExpsToNonEditable = function (editor, nonEditableRegExps, e) {
    var i = nonEditableRegExps.length, content = e.content;
    if (e.format === 'raw') {
      return;
    }
    while (i--) {
<<<<<<< HEAD
      content = content.replace(nonEditableRegExps[i], replaceMatchWithSpan(editor, content, $_6x7xfjgljd08mdgb.getNonEditableClass(editor)));
=======
      content = content.replace(nonEditableRegExps[i], replaceMatchWithSpan(editor, content, $_9wsq8dgujducwrnl.getNonEditableClass(editor)));
>>>>>>> installer
    }
    e.content = content;
  };
  var setup = function (editor) {
    var editClass, nonEditClass;
    var contentEditableAttrName = 'contenteditable';
<<<<<<< HEAD
    editClass = ' ' + Tools.trim($_6x7xfjgljd08mdgb.getEditableClass(editor)) + ' ';
    nonEditClass = ' ' + Tools.trim($_6x7xfjgljd08mdgb.getNonEditableClass(editor)) + ' ';
    var hasEditClass = hasClass(editClass);
    var hasNonEditClass = hasClass(nonEditClass);
    var nonEditableRegExps = $_6x7xfjgljd08mdgb.getNonEditableRegExps(editor);
=======
    editClass = ' ' + Tools.trim($_9wsq8dgujducwrnl.getEditableClass(editor)) + ' ';
    nonEditClass = ' ' + Tools.trim($_9wsq8dgujducwrnl.getNonEditableClass(editor)) + ' ';
    var hasEditClass = hasClass(editClass);
    var hasNonEditClass = hasClass(nonEditClass);
    var nonEditableRegExps = $_9wsq8dgujducwrnl.getNonEditableRegExps(editor);
>>>>>>> installer
    editor.on('PreInit', function () {
      if (nonEditableRegExps.length > 0) {
        editor.on('BeforeSetContent', function (e) {
          convertRegExpsToNonEditable(editor, nonEditableRegExps, e);
        });
      }
      editor.parser.addAttributeFilter('class', function (nodes) {
        var i = nodes.length, node;
        while (i--) {
          node = nodes[i];
          if (hasEditClass(node)) {
            node.attr(contentEditableAttrName, 'true');
          } else if (hasNonEditClass(node)) {
            node.attr(contentEditableAttrName, 'false');
          }
        }
      });
      editor.serializer.addAttributeFilter(contentEditableAttrName, function (nodes) {
        var i = nodes.length, node;
        while (i--) {
          node = nodes[i];
          if (!hasEditClass(node) && !hasNonEditClass(node)) {
            continue;
          }
          if (nonEditableRegExps.length > 0 && node.attr('data-mce-content')) {
            node.name = '#text';
            node.type = 3;
            node.raw = true;
            node.value = node.attr('data-mce-content');
          } else {
            node.attr(contentEditableAttrName, null);
          }
        }
      });
    });
  };
<<<<<<< HEAD
  var $_7lekf1gjjd08mdg4 = { setup: setup };

  PluginManager.add('noneditable', function (editor) {
    $_7lekf1gjjd08mdg4.setup(editor);
=======
  var $_7hrmldgsjducwrnh = { setup: setup };

  PluginManager.add('noneditable', function (editor) {
    $_7hrmldgsjducwrnh.setup(editor);
>>>>>>> installer
  });
  function Plugin () {
  }

  return Plugin;

}());
})();

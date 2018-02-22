(function () {
var directionality = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var setDir = function (editor, dir) {
    var dom = editor.dom;
    var curDir;
    var blocks = editor.selection.getSelectedBlocks();
    if (blocks.length) {
      curDir = dom.getAttrib(blocks[0], 'dir');
      Tools.each(blocks, function (block) {
        if (!dom.getParent(block.parentNode, '*[dir="' + dir + '"]', dom.getRoot())) {
          dom.setAttrib(block, 'dir', curDir !== dir ? dir : null);
        }
      });
      editor.nodeChanged();
    }
  };
<<<<<<< HEAD
  var $_5xi3f9a2jd08mcha = { setDir: setDir };

  var register = function (editor) {
    editor.addCommand('mceDirectionLTR', function () {
      $_5xi3f9a2jd08mcha.setDir(editor, 'ltr');
    });
    editor.addCommand('mceDirectionRTL', function () {
      $_5xi3f9a2jd08mcha.setDir(editor, 'rtl');
    });
  };
  var $_1ubugia1jd08mch7 = { register: register };
=======
  var $_7in3qnabjducwqr0 = { setDir: setDir };

  var register = function (editor) {
    editor.addCommand('mceDirectionLTR', function () {
      $_7in3qnabjducwqr0.setDir(editor, 'ltr');
    });
    editor.addCommand('mceDirectionRTL', function () {
      $_7in3qnabjducwqr0.setDir(editor, 'rtl');
    });
  };
  var $_blvs6aaajducwqqy = { register: register };
>>>>>>> installer

  var generateSelector = function (dir) {
    var selector = [];
    Tools.each('h1 h2 h3 h4 h5 h6 div p'.split(' '), function (name) {
      selector.push(name + '[dir=' + dir + ']');
    });
    return selector.join(',');
  };
  var register$1 = function (editor) {
    editor.addButton('ltr', {
      title: 'Left to right',
      cmd: 'mceDirectionLTR',
      stateSelector: generateSelector('ltr')
    });
    editor.addButton('rtl', {
      title: 'Right to left',
      cmd: 'mceDirectionRTL',
      stateSelector: generateSelector('rtl')
    });
  };
<<<<<<< HEAD
  var $_11r5hna4jd08mchb = { register: register$1 };

  PluginManager.add('directionality', function (editor) {
    $_1ubugia1jd08mch7.register(editor);
    $_11r5hna4jd08mchb.register(editor);
=======
  var $_5gbxnyadjducwqr2 = { register: register$1 };

  PluginManager.add('directionality', function (editor) {
    $_blvs6aaajducwqqy.register(editor);
    $_5gbxnyadjducwqr2.register(editor);
>>>>>>> installer
  });
  function Plugin () {
  }

  return Plugin;

}());
})();

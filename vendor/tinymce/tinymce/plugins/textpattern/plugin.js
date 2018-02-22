(function () {
var textpattern = (function () {
  'use strict';

  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var get = function (patternsState) {
    var setPatterns = function (newPatterns) {
      patternsState.set(newPatterns);
    };
    var getPatterns = function () {
      return patternsState.get();
    };
    return {
      setPatterns: setPatterns,
      getPatterns: getPatterns
    };
  };
<<<<<<< HEAD
  var $_a4abw2q3jd08mfex = { get: get };
=======
  var $_5jvyzaqgjducwts0 = { get: get };
>>>>>>> installer

  var defaultPatterns = [
    {
      start: '*',
      end: '*',
      format: 'italic'
    },
    {
      start: '**',
      end: '**',
      format: 'bold'
    },
    {
      start: '***',
      end: '***',
      format: [
        'bold',
        'italic'
      ]
    },
    {
      start: '#',
      format: 'h1'
    },
    {
      start: '##',
      format: 'h2'
    },
    {
      start: '###',
      format: 'h3'
    },
    {
      start: '####',
      format: 'h4'
    },
    {
      start: '#####',
      format: 'h5'
    },
    {
      start: '######',
      format: 'h6'
    },
    {
      start: '1. ',
      cmd: 'InsertOrderedList'
    },
    {
      start: '* ',
      cmd: 'InsertUnorderedList'
    },
    {
      start: '- ',
      cmd: 'InsertUnorderedList'
    }
  ];
  var getPatterns = function (editorSettings) {
    return editorSettings.textpattern_patterns !== undefined ? editorSettings.textpattern_patterns : defaultPatterns;
  };
<<<<<<< HEAD
  var $_x7l6zq4jd08mfey = { getPatterns: getPatterns };
=======
  var $_ex60acqhjducwts1 = { getPatterns: getPatterns };
>>>>>>> installer

  var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var TreeWalker = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var sortPatterns = function (patterns) {
    return patterns.sort(function (a, b) {
      if (a.start.length > b.start.length) {
        return -1;
      }
      if (a.start.length < b.start.length) {
        return 1;
      }
      return 0;
    });
  };
  var findPattern = function (patterns, text) {
    for (var i = 0; i < patterns.length; i++) {
      if (text.indexOf(patterns[i].start) !== 0) {
        continue;
      }
      if (patterns[i].end && text.lastIndexOf(patterns[i].end) !== text.length - patterns[i].end.length) {
        continue;
      }
      return patterns[i];
    }
  };
  var isMatchingPattern = function (pattern, text, offset, delta) {
    var textEnd = text.substr(offset - pattern.end.length - delta, pattern.end.length);
    return textEnd === pattern.end;
  };
  var hasContent = function (offset, delta, pattern) {
    return offset - delta - pattern.end.length - pattern.start.length > 0;
  };
  var findEndPattern = function (patterns, text, offset, delta) {
    var pattern, i;
    var sortedPatterns = sortPatterns(patterns);
    for (i = 0; i < sortedPatterns.length; i++) {
      pattern = sortedPatterns[i];
      if (pattern.end !== undefined && isMatchingPattern(pattern, text, offset, delta) && hasContent(offset, delta, pattern)) {
        return pattern;
      }
    }
  };
<<<<<<< HEAD
  var $_afn692qcjd08mff9 = {
=======
  var $_86wlu0qpjducwtsb = {
>>>>>>> installer
    findPattern: findPattern,
    findEndPattern: findEndPattern
  };

  var splitContainer = function (container, pattern, endOffset, startOffset, space) {
    container = startOffset > 0 ? container.splitText(startOffset) : container;
    container.splitText(endOffset - startOffset + pattern.end.length);
    container.deleteData(0, pattern.start.length);
    container.deleteData(container.data.length - pattern.end.length, pattern.end.length);
    return container;
  };
  var patternFromRng = function (patterns, rng, space) {
    if (rng.collapsed === false) {
      return;
    }
    var container = rng.startContainer;
    var text = container.data;
    var delta = space === true ? 1 : 0;
    if (container.nodeType !== 3) {
      return;
    }
<<<<<<< HEAD
    var endPattern = $_afn692qcjd08mff9.findEndPattern(patterns, text, rng.startOffset, delta);
=======
    var endPattern = $_86wlu0qpjducwtsb.findEndPattern(patterns, text, rng.startOffset, delta);
>>>>>>> installer
    if (endPattern === undefined) {
      return;
    }
    var endOffset = text.lastIndexOf(endPattern.end, rng.startOffset - delta);
    var startOffset = text.lastIndexOf(endPattern.start, endOffset - endPattern.end.length);
    endOffset = text.indexOf(endPattern.end, startOffset + endPattern.start.length);
    if (startOffset === -1) {
      return;
    }
    var patternRng = document.createRange();
    patternRng.setStart(container, startOffset);
    patternRng.setEnd(container, endOffset + endPattern.end.length);
<<<<<<< HEAD
    var startPattern = $_afn692qcjd08mff9.findPattern(patterns, patternRng.toString());
=======
    var startPattern = $_86wlu0qpjducwtsb.findPattern(patterns, patternRng.toString());
>>>>>>> installer
    if (endPattern === undefined || startPattern !== endPattern || container.data.length <= endPattern.start.length + endPattern.end.length) {
      return;
    }
    return {
      pattern: endPattern,
      startOffset: startOffset,
      endOffset: endOffset
    };
  };
  var splitAndApply = function (editor, container, found, space) {
    var formatArray = Tools.isArray(found.pattern.format) ? found.pattern.format : [found.pattern.format];
    var validFormats = Tools.grep(formatArray, function (formatName) {
      var format = editor.formatter.get(formatName);
      return format && format[0].inline;
    });
    if (validFormats.length !== 0) {
      editor.undoManager.transact(function () {
        container = splitContainer(container, found.pattern, found.endOffset, found.startOffset, space);
        formatArray.forEach(function (format) {
          editor.formatter.apply(format, {}, container);
        });
      });
      return container;
    }
  };
  var doApplyInlineFormat = function (editor, patterns, space) {
    var rng = editor.selection.getRng(true);
    var foundPattern = patternFromRng(patterns, rng, space);
    if (foundPattern) {
      return splitAndApply(editor, rng.startContainer, foundPattern, space);
    }
  };
  var applyInlineFormatSpace = function (editor, patterns) {
    return doApplyInlineFormat(editor, patterns, true);
  };
  var applyInlineFormatEnter = function (editor, patterns) {
    return doApplyInlineFormat(editor, patterns, false);
  };
  var applyBlockFormat = function (editor, patterns) {
    var selection, dom, container, firstTextNode, node, format, textBlockElm, pattern, walker, rng, offset;
    selection = editor.selection;
    dom = editor.dom;
    if (!selection.isCollapsed()) {
      return;
    }
    textBlockElm = dom.getParent(selection.getStart(), 'p');
    if (textBlockElm) {
      walker = new TreeWalker(textBlockElm, textBlockElm);
      while (node = walker.next()) {
        if (node.nodeType === 3) {
          firstTextNode = node;
          break;
        }
      }
      if (firstTextNode) {
<<<<<<< HEAD
        pattern = $_afn692qcjd08mff9.findPattern(patterns, firstTextNode.data);
=======
        pattern = $_86wlu0qpjducwtsb.findPattern(patterns, firstTextNode.data);
>>>>>>> installer
        if (!pattern) {
          return;
        }
        rng = selection.getRng(true);
        container = rng.startContainer;
        offset = rng.startOffset;
        if (firstTextNode === container) {
          offset = Math.max(0, offset - pattern.start.length);
        }
        if (Tools.trim(firstTextNode.data).length === pattern.start.length) {
          return;
        }
        if (pattern.format) {
          format = editor.formatter.get(pattern.format);
          if (format && format[0].block) {
            firstTextNode.deleteData(0, pattern.start.length);
            editor.formatter.apply(pattern.format, {}, firstTextNode);
            rng.setStart(container, offset);
            rng.collapse(true);
            selection.setRng(rng);
          }
        }
        if (pattern.cmd) {
          editor.undoManager.transact(function () {
            firstTextNode.deleteData(0, pattern.start.length);
            editor.execCommand(pattern.cmd);
          });
        }
      }
    }
  };
<<<<<<< HEAD
  var $_acwqfiq9jd08mff5 = {
=======
  var $_w6wv7qmjducwts7 = {
>>>>>>> installer
    patternFromRng: patternFromRng,
    applyInlineFormatSpace: applyInlineFormatSpace,
    applyInlineFormatEnter: applyInlineFormatEnter,
    applyBlockFormat: applyBlockFormat
  };

  function handleEnter(editor, patterns) {
    var wrappedTextNode, rng;
<<<<<<< HEAD
    wrappedTextNode = $_acwqfiq9jd08mff5.applyInlineFormatEnter(editor, patterns);
=======
    wrappedTextNode = $_w6wv7qmjducwts7.applyInlineFormatEnter(editor, patterns);
>>>>>>> installer
    if (wrappedTextNode) {
      rng = editor.dom.createRng();
      rng.setStart(wrappedTextNode, wrappedTextNode.data.length);
      rng.setEnd(wrappedTextNode, wrappedTextNode.data.length);
      editor.selection.setRng(rng);
    }
<<<<<<< HEAD
    $_acwqfiq9jd08mff5.applyBlockFormat(editor, patterns);
  }
  function handleInlineKey(editor, patterns) {
    var wrappedTextNode, lastChar, lastCharNode, rng, dom;
    wrappedTextNode = $_acwqfiq9jd08mff5.applyInlineFormatSpace(editor, patterns);
=======
    $_w6wv7qmjducwts7.applyBlockFormat(editor, patterns);
  }
  function handleInlineKey(editor, patterns) {
    var wrappedTextNode, lastChar, lastCharNode, rng, dom;
    wrappedTextNode = $_w6wv7qmjducwts7.applyInlineFormatSpace(editor, patterns);
>>>>>>> installer
    if (wrappedTextNode) {
      dom = editor.dom;
      lastChar = wrappedTextNode.data.slice(-1);
      if (/[\u00a0 ]/.test(lastChar)) {
        wrappedTextNode.deleteData(wrappedTextNode.data.length - 1, 1);
        lastCharNode = dom.doc.createTextNode(lastChar);
        dom.insertAfter(lastCharNode, wrappedTextNode.parentNode);
        rng = dom.createRng();
        rng.setStart(lastCharNode, 1);
        rng.setEnd(lastCharNode, 1);
        editor.selection.setRng(rng);
      }
    }
  }
  var checkKeyEvent = function (codes, event, predicate) {
    for (var i = 0; i < codes.length; i++) {
      if (predicate(codes[i], event)) {
        return true;
      }
    }
  };
  var checkKeyCode = function (codes, event) {
    return checkKeyEvent(codes, event, function (code, event) {
      return code === event.keyCode && VK.modifierPressed(event) === false;
    });
  };
  var checkCharCode = function (chars, event) {
    return checkKeyEvent(chars, event, function (chr, event) {
      return chr.charCodeAt(0) === event.charCode;
    });
  };
<<<<<<< HEAD
  var $_3vqxhlq8jd08mff3 = {
=======
  var $_5q19wqljducwts4 = {
>>>>>>> installer
    handleEnter: handleEnter,
    handleInlineKey: handleInlineKey,
    checkCharCode: checkCharCode,
    checkKeyCode: checkKeyCode
  };

  var setup = function (editor, patternsState) {
    var charCodes = [
      ',',
      '.',
      ';',
      ':',
      '!',
      '?'
    ];
    var keyCodes = [32];
    editor.on('keydown', function (e) {
      if (e.keyCode === 13 && !VK.modifierPressed(e)) {
<<<<<<< HEAD
        $_3vqxhlq8jd08mff3.handleEnter(editor, patternsState.get());
      }
    }, true);
    editor.on('keyup', function (e) {
      if ($_3vqxhlq8jd08mff3.checkKeyCode(keyCodes, e)) {
        $_3vqxhlq8jd08mff3.handleInlineKey(editor, patternsState.get());
      }
    });
    editor.on('keypress', function (e) {
      if ($_3vqxhlq8jd08mff3.checkCharCode(charCodes, e)) {
        Delay.setEditorTimeout(editor, function () {
          $_3vqxhlq8jd08mff3.handleInlineKey(editor, patternsState.get());
=======
        $_5q19wqljducwts4.handleEnter(editor, patternsState.get());
      }
    }, true);
    editor.on('keyup', function (e) {
      if ($_5q19wqljducwts4.checkKeyCode(keyCodes, e)) {
        $_5q19wqljducwts4.handleInlineKey(editor, patternsState.get());
      }
    });
    editor.on('keypress', function (e) {
      if ($_5q19wqljducwts4.checkCharCode(charCodes, e)) {
        Delay.setEditorTimeout(editor, function () {
          $_5q19wqljducwts4.handleInlineKey(editor, patternsState.get());
>>>>>>> installer
        });
      }
    });
  };
<<<<<<< HEAD
  var $_6tbfwjq5jd08mfez = { setup: setup };

  PluginManager.add('textpattern', function (editor) {
    var patternsState = Cell($_x7l6zq4jd08mfey.getPatterns(editor.settings));
    $_6tbfwjq5jd08mfez.setup(editor, patternsState);
    return $_a4abw2q3jd08mfex.get(patternsState);
=======
  var $_b43h66qijducwts2 = { setup: setup };

  PluginManager.add('textpattern', function (editor) {
    var patternsState = Cell($_ex60acqhjducwts1.getPatterns(editor.settings));
    $_b43h66qijducwts2.setup(editor, patternsState);
    return $_5jvyzaqgjducwts0.get(patternsState);
>>>>>>> installer
  });
  function Plugin () {
  }

  return Plugin;

}());
})();

(function () {
var visualchars = (function () {
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

  var get = function (toggleState) {
    var isEnabled = function () {
      return toggleState.get();
    };
    return { isEnabled: isEnabled };
  };
<<<<<<< HEAD
  var $_1dqk52r3jd08mfhw = { get: get };
=======
  var $_740ysrrgjducwtul = { get: get };
>>>>>>> installer

  var fireVisualChars = function (editor, state) {
    return editor.fire('VisualChars', { state: state });
  };
<<<<<<< HEAD
  var $_9xabisr6jd08mfhz = { fireVisualChars: fireVisualChars };
=======
  var $_5nc3uerjjducwtun = { fireVisualChars: fireVisualChars };
>>>>>>> installer

  var charMap = {
    '\xA0': 'nbsp',
    '\xAD': 'shy'
  };
  var charMapToRegExp = function (charMap, global) {
    var key, regExp = '';
    for (key in charMap) {
      regExp += key;
    }
    return new RegExp('[' + regExp + ']', global ? 'g' : '');
  };
  var charMapToSelector = function (charMap) {
    var key, selector = '';
    for (key in charMap) {
      if (selector) {
        selector += ',';
      }
      selector += 'span.mce-' + charMap[key];
    }
    return selector;
  };
<<<<<<< HEAD
  var $_g9kbq1r8jd08mfi6 = {
=======
  var $_5t08vyrljducwtux = {
>>>>>>> installer
    charMap: charMap,
    regExp: charMapToRegExp(charMap),
    regExpGlobal: charMapToRegExp(charMap, true),
    selector: charMapToSelector(charMap),
    charMapToRegExp: charMapToRegExp,
    charMapToSelector: charMapToSelector
  };

  var noop = function () {
  };
  var noarg = function (f) {
    return function () {
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var tripleEquals = function (a, b) {
    return a === b;
  };
  var curry = function (f) {
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var call = function (f) {
    f();
  };
  var never = constant(false);
  var always = constant(true);
<<<<<<< HEAD
  var $_3lyr4trcjd08mfil = {
=======
  var $_ebzlxurpjducwtvf = {
>>>>>>> installer
    noop: noop,
    noarg: noarg,
    compose: compose,
    constant: constant,
    identity: identity,
    tripleEquals: tripleEquals,
    curry: curry,
    not: not,
    die: die,
    apply: apply,
    call: call,
    never: never,
    always: always
  };

<<<<<<< HEAD
  var never$1 = $_3lyr4trcjd08mfil.never;
  var always$1 = $_3lyr4trcjd08mfil.always;
=======
  var never$1 = $_ebzlxurpjducwtvf.never;
  var always$1 = $_ebzlxurpjducwtvf.always;
>>>>>>> installer
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop = function () {
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never$1,
      isSome: never$1,
      isNone: always$1,
      getOr: id,
      getOrThunk: call,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      or: id,
      orThunk: call,
      map: none,
      ap: none,
      each: noop,
      bind: none,
      flatten: none,
      exists: never$1,
      forall: always$1,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
<<<<<<< HEAD
      toString: $_3lyr4trcjd08mfil.constant('none()')
=======
      toString: $_ebzlxurpjducwtvf.constant('none()')
>>>>>>> installer
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always$1,
      isNone: never$1,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never$1, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
<<<<<<< HEAD
  var $_c9p9o3rbjd08mfij = {
=======
  var Option = {
>>>>>>> installer
    some: some,
    none: none,
    from: from
  };

  var rawIndexOf = function () {
    var pIndexOf = Array.prototype.indexOf;
    var fastIndex = function (xs, x) {
      return pIndexOf.call(xs, x);
    };
    var slowIndex = function (xs, x) {
      return slowIndexOf(xs, x);
    };
    return pIndexOf === undefined ? slowIndex : fastIndex;
  }();
  var indexOf = function (xs, x) {
    var r = rawIndexOf(xs, x);
<<<<<<< HEAD
    return r === -1 ? $_c9p9o3rbjd08mfij.none() : $_c9p9o3rbjd08mfij.some(r);
=======
    return r === -1 ? Option.none() : Option.some(r);
>>>>>>> installer
  };
  var contains = function (xs, x) {
    return rawIndexOf(xs, x) > -1;
  };
  var exists = function (xs, pred) {
    return findIndex(xs, pred).isSome();
  };
  var range = function (num, f) {
    var r = [];
    for (var i = 0; i < num; i++) {
      r.push(f(i));
    }
    return r;
  };
  var chunk = function (array, size) {
    var r = [];
    for (var i = 0; i < array.length; i += size) {
      var s = array.slice(i, i + size);
      r.push(s);
    }
    return r;
  };
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var each = function (xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var eachr = function (xs, f) {
    for (var i = xs.length - 1; i >= 0; i--) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var partition = function (xs, pred) {
    var pass = [];
    var fail = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      var arr = pred(x, i, xs) ? pass : fail;
      arr.push(x);
    }
    return {
      pass: pass,
      fail: fail
    };
  };
  var filter = function (xs, pred) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        r.push(x);
      }
    }
    return r;
  };
  var groupBy = function (xs, f) {
    if (xs.length === 0) {
      return [];
    } else {
      var wasType = f(xs[0]);
      var r = [];
      var group = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var type = f(x);
        if (type !== wasType) {
          r.push(group);
          group = [];
        }
        wasType = type;
        group.push(x);
      }
      if (group.length !== 0) {
        r.push(group);
      }
      return r;
    }
  };
  var foldr = function (xs, f, acc) {
    eachr(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var foldl = function (xs, f, acc) {
    each(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
<<<<<<< HEAD
        return $_c9p9o3rbjd08mfij.some(x);
      }
    }
    return $_c9p9o3rbjd08mfij.none();
=======
        return Option.some(x);
      }
    }
    return Option.none();
>>>>>>> installer
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
<<<<<<< HEAD
        return $_c9p9o3rbjd08mfij.some(i);
      }
    }
    return $_c9p9o3rbjd08mfij.none();
=======
        return Option.some(i);
      }
    }
    return Option.none();
>>>>>>> installer
  };
  var slowIndexOf = function (xs, x) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  };
  var push = Array.prototype.push;
  var flatten = function (xs) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (!Array.prototype.isPrototypeOf(xs[i]))
        throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
      push.apply(r, xs[i]);
    }
    return r;
  };
  var bind = function (xs, f) {
    var output = map(xs, f);
    return flatten(output);
  };
  var forall = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      var x = xs[i];
      if (pred(x, i, xs) !== true) {
        return false;
      }
    }
    return true;
  };
  var equal = function (a1, a2) {
    return a1.length === a2.length && forall(a1, function (x, i) {
      return x === a2[i];
    });
  };
  var slice = Array.prototype.slice;
  var reverse = function (xs) {
    var r = slice.call(xs, 0);
    r.reverse();
    return r;
  };
  var difference = function (a1, a2) {
    return filter(a1, function (x) {
      return !contains(a2, x);
    });
  };
  var mapToObject = function (xs, f) {
    var r = {};
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      r[String(x)] = f(x, i);
    }
    return r;
  };
  var pure = function (x) {
    return [x];
  };
  var sort = function (xs, comparator) {
    var copy = slice.call(xs, 0);
    copy.sort(comparator);
    return copy;
  };
  var head = function (xs) {
<<<<<<< HEAD
    return xs.length === 0 ? $_c9p9o3rbjd08mfij.none() : $_c9p9o3rbjd08mfij.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? $_c9p9o3rbjd08mfij.none() : $_c9p9o3rbjd08mfij.some(xs[xs.length - 1]);
  };
  var $_1w55ekrajd08mfie = {
=======
    return xs.length === 0 ? Option.none() : Option.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? Option.none() : Option.some(xs[xs.length - 1]);
  };
  var $_9ycobnrnjducwtv7 = {
>>>>>>> installer
    map: map,
    each: each,
    eachr: eachr,
    partition: partition,
    filter: filter,
    groupBy: groupBy,
    indexOf: indexOf,
    foldr: foldr,
    foldl: foldl,
    find: find,
    findIndex: findIndex,
    flatten: flatten,
    bind: bind,
    forall: forall,
    exists: exists,
    contains: contains,
    equal: equal,
    reverse: reverse,
    chunk: chunk,
    difference: difference,
    mapToObject: mapToObject,
    pure: pure,
    sort: sort,
    range: range,
    head: head,
    last: last
  };

  var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      console.error('HTML does not have a single root node', html);
      throw 'HTML must have a single root node';
    }
    return fromDom(div.childNodes[0]);
  };
  var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };
  var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };
  var fromDom = function (node) {
    if (node === null || node === undefined)
      throw new Error('Node cannot be null or undefined');
<<<<<<< HEAD
    return { dom: $_3lyr4trcjd08mfil.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return $_c9p9o3rbjd08mfij.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_cj6geerdjd08mfin = {
=======
    return { dom: $_ebzlxurpjducwtvf.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return Option.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_25aatrqjducwtvi = {
>>>>>>> installer
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

<<<<<<< HEAD
  var $_h1iv5rfjd08mfiv = {
=======
  var $_25bmarrsjducwtvq = {
>>>>>>> installer
    ATTRIBUTE: 2,
    CDATA_SECTION: 4,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    ELEMENT: 1,
    TEXT: 3,
    PROCESSING_INSTRUCTION: 7,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    NOTATION: 12
  };

  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value = function (element) {
    return element.dom().nodeValue;
  };
  var isType = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
<<<<<<< HEAD
    return type(element) === $_h1iv5rfjd08mfiv.COMMENT || name(element) === '#comment';
  };
  var isElement = isType($_h1iv5rfjd08mfiv.ELEMENT);
  var isText = isType($_h1iv5rfjd08mfiv.TEXT);
  var isDocument = isType($_h1iv5rfjd08mfiv.DOCUMENT);
  var $_7qd0zorejd08mfiu = {
=======
    return type(element) === $_25bmarrsjducwtvq.COMMENT || name(element) === '#comment';
  };
  var isElement = isType($_25bmarrsjducwtvq.ELEMENT);
  var isText = isType($_25bmarrsjducwtvq.TEXT);
  var isDocument = isType($_25bmarrsjducwtvq.DOCUMENT);
  var $_g6ijnsrrjducwtvo = {
>>>>>>> installer
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var wrapCharWithSpan = function (value) {
<<<<<<< HEAD
    return '<span data-mce-bogus="1" class="mce-' + $_g9kbq1r8jd08mfi6.charMap[value] + '">' + value + '</span>';
  };
  var $_by2t1mrgjd08mfiw = { wrapCharWithSpan: wrapCharWithSpan };

  var isMatch = function (n) {
    return $_7qd0zorejd08mfiu.isText(n) && $_7qd0zorejd08mfiu.value(n) !== undefined && $_g9kbq1r8jd08mfi6.regExp.test($_7qd0zorejd08mfiu.value(n));
=======
    return '<span data-mce-bogus="1" class="mce-' + $_5t08vyrljducwtux.charMap[value] + '">' + value + '</span>';
  };
  var $_9uhwy8rtjducwtvr = { wrapCharWithSpan: wrapCharWithSpan };

  var isMatch = function (n) {
    return $_g6ijnsrrjducwtvo.isText(n) && $_g6ijnsrrjducwtvo.value(n) !== undefined && $_5t08vyrljducwtux.regExp.test($_g6ijnsrrjducwtvo.value(n));
>>>>>>> installer
  };
  var filterDescendants = function (scope, predicate) {
    var result = [];
    var dom = scope.dom();
<<<<<<< HEAD
    var children = $_1w55ekrajd08mfie.map(dom.childNodes, $_cj6geerdjd08mfin.fromDom);
    $_1w55ekrajd08mfie.each(children, function (x) {
=======
    var children = $_9ycobnrnjducwtv7.map(dom.childNodes, $_25aatrqjducwtvi.fromDom);
    $_9ycobnrnjducwtv7.each(children, function (x) {
>>>>>>> installer
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(filterDescendants(x, predicate));
    });
    return result;
  };
  var findParentElm = function (elm, rootElm) {
    while (elm.parentNode) {
      if (elm.parentNode === rootElm) {
        return elm;
      }
      elm = elm.parentNode;
    }
  };
  var replaceWithSpans = function (html) {
<<<<<<< HEAD
    return html.replace($_g9kbq1r8jd08mfi6.regExpGlobal, $_by2t1mrgjd08mfiw.wrapCharWithSpan);
  };
  var $_f5pgt5r9jd08mfi7 = {
=======
    return html.replace($_5t08vyrljducwtux.regExpGlobal, $_9uhwy8rtjducwtvr.wrapCharWithSpan);
  };
  var $_eccpdermjducwtuz = {
>>>>>>> installer
    isMatch: isMatch,
    filterDescendants: filterDescendants,
    findParentElm: findParentElm,
    replaceWithSpans: replaceWithSpans
  };

  var show = function (editor, rootElm) {
    var node, div;
<<<<<<< HEAD
    var nodeList = $_f5pgt5r9jd08mfi7.filterDescendants($_cj6geerdjd08mfin.fromDom(rootElm), $_f5pgt5r9jd08mfi7.isMatch);
    $_1w55ekrajd08mfie.each(nodeList, function (n) {
      var withSpans = $_f5pgt5r9jd08mfi7.replaceWithSpans($_7qd0zorejd08mfiu.value(n));
=======
    var nodeList = $_eccpdermjducwtuz.filterDescendants($_25aatrqjducwtvi.fromDom(rootElm), $_eccpdermjducwtuz.isMatch);
    $_9ycobnrnjducwtv7.each(nodeList, function (n) {
      var withSpans = $_eccpdermjducwtuz.replaceWithSpans($_g6ijnsrrjducwtvo.value(n));
>>>>>>> installer
      div = editor.dom.create('div', null, withSpans);
      while (node = div.lastChild) {
        editor.dom.insertAfter(node, n.dom());
      }
      editor.dom.remove(n.dom());
    });
  };
  var hide = function (editor, body) {
<<<<<<< HEAD
    var nodeList = editor.dom.select($_g9kbq1r8jd08mfi6.selector, body);
    $_1w55ekrajd08mfie.each(nodeList, function (node) {
=======
    var nodeList = editor.dom.select($_5t08vyrljducwtux.selector, body);
    $_9ycobnrnjducwtv7.each(nodeList, function (node) {
>>>>>>> installer
      editor.dom.remove(node, 1);
    });
  };
  var toggle = function (editor) {
    var body = editor.getBody();
    var bookmark = editor.selection.getBookmark();
<<<<<<< HEAD
    var parentNode = $_f5pgt5r9jd08mfi7.findParentElm(editor.selection.getNode(), body);
=======
    var parentNode = $_eccpdermjducwtuz.findParentElm(editor.selection.getNode(), body);
>>>>>>> installer
    parentNode = parentNode !== undefined ? parentNode : body;
    hide(editor, parentNode);
    show(editor, parentNode);
    editor.selection.moveToBookmark(bookmark);
  };
<<<<<<< HEAD
  var $_eu2uw8r7jd08mfi0 = {
=======
  var $_3kwc2vrkjducwtuo = {
>>>>>>> installer
    show: show,
    hide: hide,
    toggle: toggle
  };

  var toggleVisualChars = function (editor, toggleState) {
    var body = editor.getBody();
    var selection = editor.selection;
    var bookmark;
    toggleState.set(!toggleState.get());
<<<<<<< HEAD
    $_9xabisr6jd08mfhz.fireVisualChars(editor, toggleState.get());
    bookmark = selection.getBookmark();
    if (toggleState.get() === true) {
      $_eu2uw8r7jd08mfi0.show(editor, body);
    } else {
      $_eu2uw8r7jd08mfi0.hide(editor, body);
    }
    selection.moveToBookmark(bookmark);
  };
  var $_3ofltlr5jd08mfhy = { toggleVisualChars: toggleVisualChars };

  var register = function (editor, toggleState) {
    editor.addCommand('mceVisualChars', function () {
      $_3ofltlr5jd08mfhy.toggleVisualChars(editor, toggleState);
    });
  };
  var $_cb30r7r4jd08mfhx = { register: register };
=======
    $_5nc3uerjjducwtun.fireVisualChars(editor, toggleState.get());
    bookmark = selection.getBookmark();
    if (toggleState.get() === true) {
      $_3kwc2vrkjducwtuo.show(editor, body);
    } else {
      $_3kwc2vrkjducwtuo.hide(editor, body);
    }
    selection.moveToBookmark(bookmark);
  };
  var $_a9fpforijducwtun = { toggleVisualChars: toggleVisualChars };

  var register = function (editor, toggleState) {
    editor.addCommand('mceVisualChars', function () {
      $_a9fpforijducwtun.toggleVisualChars(editor, toggleState);
    });
  };
  var $_9yyf08rhjducwtum = { register: register };
>>>>>>> installer

  var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var setup = function (editor, toggleState) {
    var debouncedToggle = Delay.debounce(function () {
<<<<<<< HEAD
      $_eu2uw8r7jd08mfi0.toggle(editor);
=======
      $_3kwc2vrkjducwtuo.toggle(editor);
>>>>>>> installer
    }, 300);
    if (editor.settings.forced_root_block !== false) {
      editor.on('keydown', function (e) {
        if (toggleState.get() === true) {
<<<<<<< HEAD
          e.keyCode === 13 ? $_eu2uw8r7jd08mfi0.toggle(editor) : debouncedToggle();
=======
          e.keyCode === 13 ? $_3kwc2vrkjducwtuo.toggle(editor) : debouncedToggle();
>>>>>>> installer
        }
      });
    }
  };
<<<<<<< HEAD
  var $_djcjn4rhjd08mfix = { setup: setup };
=======
  var $_g47jn1rujducwtvu = { setup: setup };
>>>>>>> installer

  var toggleActiveState = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('VisualChars', function (e) {
        ctrl.active(e.state);
      });
    };
  };
  var register$1 = function (editor) {
    editor.addButton('visualchars', {
      active: false,
      title: 'Show invisible characters',
      cmd: 'mceVisualChars',
      onPostRender: toggleActiveState(editor)
    });
    editor.addMenuItem('visualchars', {
      text: 'Show invisible characters',
      cmd: 'mceVisualChars',
      onPostRender: toggleActiveState(editor),
      selectable: true,
      context: 'view',
      prependToContext: true
    });
  };

  PluginManager.add('visualchars', function (editor) {
    var toggleState = Cell(false);
<<<<<<< HEAD
    $_cb30r7r4jd08mfhx.register(editor, toggleState);
    register$1(editor);
    $_djcjn4rhjd08mfix.setup(editor, toggleState);
    return $_1dqk52r3jd08mfhw.get(toggleState);
=======
    $_9yyf08rhjducwtum.register(editor, toggleState);
    register$1(editor);
    $_g47jn1rujducwtvu.setup(editor, toggleState);
    return $_740ysrrgjducwtul.get(toggleState);
>>>>>>> installer
  });
  function Plugin () {
  }

  return Plugin;

}());
})();

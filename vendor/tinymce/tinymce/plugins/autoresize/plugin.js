(function () {
var autoresize = (function () {
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

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var getAutoResizeMinHeight = function (editor) {
    return parseInt(editor.getParam('autoresize_min_height', editor.getElement().offsetHeight), 10);
  };
  var getAutoResizeMaxHeight = function (editor) {
    return parseInt(editor.getParam('autoresize_max_height', 0), 10);
  };
  var getAutoResizeOverflowPadding = function (editor) {
    return editor.getParam('autoresize_overflow_padding', 1);
  };
  var getAutoResizeBottomMargin = function (editor) {
    return editor.getParam('autoresize_bottom_margin', 50);
  };
  var shouldAutoResizeOnInit = function (editor) {
    return editor.getParam('autoresize_on_init', true);
  };
<<<<<<< HEAD
  var $_6pn9ql83jd08mc9s = {
=======
  var $_fr2dlk8cjducwqdk = {
>>>>>>> installer
    getAutoResizeMinHeight: getAutoResizeMinHeight,
    getAutoResizeMaxHeight: getAutoResizeMaxHeight,
    getAutoResizeOverflowPadding: getAutoResizeOverflowPadding,
    getAutoResizeBottomMargin: getAutoResizeBottomMargin,
    shouldAutoResizeOnInit: shouldAutoResizeOnInit
  };

  var isFullscreen = function (editor) {
    return editor.plugins.fullscreen && editor.plugins.fullscreen.isFullscreen();
  };
  var wait = function (editor, oldSize, times, interval, callback) {
    Delay.setEditorTimeout(editor, function () {
      resize(editor, oldSize);
      if (times--) {
        wait(editor, oldSize, times, interval, callback);
      } else if (callback) {
        callback();
      }
    }, interval);
  };
  var toggleScrolling = function (editor, state) {
    var body = editor.getBody();
    if (body) {
      body.style.overflowY = state ? '' : 'hidden';
      if (!state) {
        body.scrollTop = 0;
      }
    }
  };
  var resize = function (editor, oldSize) {
    var deltaSize, doc, body, resizeHeight, myHeight;
    var marginTop, marginBottom, paddingTop, paddingBottom, borderTop, borderBottom;
    var dom = editor.dom;
    doc = editor.getDoc();
    if (!doc) {
      return;
    }
    if (isFullscreen(editor)) {
      toggleScrolling(editor, true);
      return;
    }
    body = doc.body;
<<<<<<< HEAD
    resizeHeight = $_6pn9ql83jd08mc9s.getAutoResizeMinHeight(editor);
=======
    resizeHeight = $_fr2dlk8cjducwqdk.getAutoResizeMinHeight(editor);
>>>>>>> installer
    marginTop = dom.getStyle(body, 'margin-top', true);
    marginBottom = dom.getStyle(body, 'margin-bottom', true);
    paddingTop = dom.getStyle(body, 'padding-top', true);
    paddingBottom = dom.getStyle(body, 'padding-bottom', true);
    borderTop = dom.getStyle(body, 'border-top-width', true);
    borderBottom = dom.getStyle(body, 'border-bottom-width', true);
    myHeight = body.offsetHeight + parseInt(marginTop, 10) + parseInt(marginBottom, 10) + parseInt(paddingTop, 10) + parseInt(paddingBottom, 10) + parseInt(borderTop, 10) + parseInt(borderBottom, 10);
    if (isNaN(myHeight) || myHeight <= 0) {
      myHeight = Env.ie ? body.scrollHeight : Env.webkit && body.clientHeight === 0 ? 0 : body.offsetHeight;
    }
<<<<<<< HEAD
    if (myHeight > $_6pn9ql83jd08mc9s.getAutoResizeMinHeight(editor)) {
      resizeHeight = myHeight;
    }
    var maxHeight = $_6pn9ql83jd08mc9s.getAutoResizeMaxHeight(editor);
=======
    if (myHeight > $_fr2dlk8cjducwqdk.getAutoResizeMinHeight(editor)) {
      resizeHeight = myHeight;
    }
    var maxHeight = $_fr2dlk8cjducwqdk.getAutoResizeMaxHeight(editor);
>>>>>>> installer
    if (maxHeight && myHeight > maxHeight) {
      resizeHeight = maxHeight;
      toggleScrolling(editor, true);
    } else {
      toggleScrolling(editor, false);
    }
    if (resizeHeight !== oldSize.get()) {
      deltaSize = resizeHeight - oldSize.get();
      dom.setStyle(editor.iframeElement, 'height', resizeHeight + 'px');
      oldSize.set(resizeHeight);
      if (Env.webkit && deltaSize < 0) {
        resize(editor, oldSize);
      }
    }
  };
  var setup = function (editor, oldSize) {
    editor.on('init', function () {
      var overflowPadding, bottomMargin;
      var dom = editor.dom;
<<<<<<< HEAD
      overflowPadding = $_6pn9ql83jd08mc9s.getAutoResizeOverflowPadding(editor);
      bottomMargin = $_6pn9ql83jd08mc9s.getAutoResizeBottomMargin(editor);
=======
      overflowPadding = $_fr2dlk8cjducwqdk.getAutoResizeOverflowPadding(editor);
      bottomMargin = $_fr2dlk8cjducwqdk.getAutoResizeBottomMargin(editor);
>>>>>>> installer
      if (overflowPadding !== false) {
        dom.setStyles(editor.getBody(), {
          paddingLeft: overflowPadding,
          paddingRight: overflowPadding
        });
      }
      if (bottomMargin !== false) {
        dom.setStyles(editor.getBody(), { paddingBottom: bottomMargin });
      }
    });
    editor.on('nodechange setcontent keyup FullscreenStateChanged', function (e) {
      resize(editor, oldSize);
    });
<<<<<<< HEAD
    if ($_6pn9ql83jd08mc9s.shouldAutoResizeOnInit(editor)) {
=======
    if ($_fr2dlk8cjducwqdk.shouldAutoResizeOnInit(editor)) {
>>>>>>> installer
      editor.on('init', function () {
        wait(editor, oldSize, 20, 100, function () {
          wait(editor, oldSize, 5, 1000);
        });
      });
    }
  };
<<<<<<< HEAD
  var $_avofmy80jd08mc9p = {
=======
  var $_fl3jrk89jducwqde = {
>>>>>>> installer
    setup: setup,
    resize: resize
  };

  var register = function (editor, oldSize) {
    editor.addCommand('mceAutoResize', function () {
<<<<<<< HEAD
      $_avofmy80jd08mc9p.resize(editor, oldSize);
    });
  };
  var $_26vppr7zjd08mc9n = { register: register };
=======
      $_fl3jrk89jducwqde.resize(editor, oldSize);
    });
  };
  var $_71nwv088jducwqdc = { register: register };
>>>>>>> installer

  PluginManager.add('autoresize', function (editor) {
    if (!editor.inline) {
      var oldSize = Cell(0);
<<<<<<< HEAD
      $_26vppr7zjd08mc9n.register(editor, oldSize);
      $_avofmy80jd08mc9p.setup(editor, oldSize);
=======
      $_71nwv088jducwqdc.register(editor, oldSize);
      $_fl3jrk89jducwqde.setup(editor, oldSize);
>>>>>>> installer
    }
  });
  function Plugin () {
  }

  return Plugin;

}());
})();

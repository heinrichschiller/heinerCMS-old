(function () {
var link = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var assumeExternalTargets = function (editorSettings) {
    return typeof editorSettings.link_assume_external_targets === 'boolean' ? editorSettings.link_assume_external_targets : false;
  };
  var hasContextToolbar = function (editorSettings) {
    return typeof editorSettings.link_context_toolbar === 'boolean' ? editorSettings.link_context_toolbar : false;
  };
  var getLinkList = function (editorSettings) {
    return editorSettings.link_list;
  };
  var hasDefaultLinkTarget = function (editorSettings) {
    return typeof editorSettings.default_link_target === 'string';
  };
  var getDefaultLinkTarget = function (editorSettings) {
    return editorSettings.default_link_target;
  };
  var getTargetList = function (editorSettings) {
    return editorSettings.target_list;
  };
  var setTargetList = function (editor, list) {
    editor.settings.target_list = list;
  };
  var shouldShowTargetList = function (editorSettings) {
    return getTargetList(editorSettings) !== false;
  };
  var getRelList = function (editorSettings) {
    return editorSettings.rel_list;
  };
  var hasRelList = function (editorSettings) {
    return getRelList(editorSettings) !== undefined;
  };
  var getLinkClassList = function (editorSettings) {
    return editorSettings.link_class_list;
  };
  var hasLinkClassList = function (editorSettings) {
    return getLinkClassList(editorSettings) !== undefined;
  };
  var shouldShowLinkTitle = function (editorSettings) {
    return editorSettings.link_title !== false;
  };
  var allowUnsafeLinkTarget = function (editorSettings) {
    return typeof editorSettings.allow_unsafe_link_target === 'boolean' ? editorSettings.allow_unsafe_link_target : false;
  };
<<<<<<< HEAD
  var $_187tvdefjd08md7k = {
=======
  var $_3qadrteojducwrfi = {
>>>>>>> installer
    assumeExternalTargets: assumeExternalTargets,
    hasContextToolbar: hasContextToolbar,
    getLinkList: getLinkList,
    hasDefaultLinkTarget: hasDefaultLinkTarget,
    getDefaultLinkTarget: getDefaultLinkTarget,
    getTargetList: getTargetList,
    setTargetList: setTargetList,
    shouldShowTargetList: shouldShowTargetList,
    getRelList: getRelList,
    hasRelList: hasRelList,
    getLinkClassList: getLinkClassList,
    hasLinkClassList: hasLinkClassList,
    shouldShowLinkTitle: shouldShowLinkTitle,
    allowUnsafeLinkTarget: allowUnsafeLinkTarget
  };

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var appendClickRemove = function (link, evt) {
    document.body.appendChild(link);
    link.dispatchEvent(evt);
    document.body.removeChild(link);
  };
  var open = function (url) {
    if (!Env.ie || Env.ie > 10) {
      var link = document.createElement('a');
      link.target = '_blank';
      link.href = url;
      link.rel = 'noreferrer noopener';
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      appendClickRemove(link, evt);
    } else {
      var win = window.open('', '_blank');
      if (win) {
        win.opener = null;
        var doc = win.document;
        doc.open();
        doc.write('<meta http-equiv="refresh" content="0; url=' + DOMUtils.DOM.encode(url) + '">');
        doc.close();
      }
    }
  };
<<<<<<< HEAD
  var $_8x37hfegjd08md7l = { open: open };
=======
  var $_adzczyepjducwrfk = { open: open };
>>>>>>> installer

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var toggleTargetRules = function (rel, isUnsafe) {
    var rules = ['noopener'];
    var newRel = rel ? rel.split(/\s+/) : [];
    var toString = function (rel) {
      return Tools.trim(rel.sort().join(' '));
    };
    var addTargetRules = function (rel) {
      rel = removeTargetRules(rel);
      return rel.length ? rel.concat(rules) : rules;
    };
    var removeTargetRules = function (rel) {
      return rel.filter(function (val) {
        return Tools.inArray(rules, val) === -1;
      });
    };
    newRel = isUnsafe ? addTargetRules(newRel) : removeTargetRules(newRel);
    return newRel.length ? toString(newRel) : null;
  };
  var trimCaretContainers = function (text) {
    return text.replace(/\uFEFF/g, '');
  };
  var getAnchorElement = function (editor, selectedElm) {
    selectedElm = selectedElm || editor.selection.getNode();
    if (isImageFigure(selectedElm)) {
      return editor.dom.select('a[href]', selectedElm)[0];
    } else {
      return editor.dom.getParent(selectedElm, 'a[href]');
    }
  };
  var getAnchorText = function (selection, anchorElm) {
    var text = anchorElm ? anchorElm.innerText || anchorElm.textContent : selection.getContent({ format: 'text' });
    return trimCaretContainers(text);
  };
  var isLink = function (elm) {
    return elm && elm.nodeName === 'A' && elm.href;
  };
  var hasLinks = function (elements) {
    return Tools.grep(elements, isLink).length > 0;
  };
  var isOnlyTextSelected = function (html) {
    if (/</.test(html) && (!/^<a [^>]+>[^<]+<\/a>$/.test(html) || html.indexOf('href=') === -1)) {
      return false;
    }
    return true;
  };
  var isImageFigure = function (node) {
    return node && node.nodeName === 'FIGURE' && /\bimage\b/i.test(node.className);
  };
  var link = function (editor, attachState) {
    return function (data) {
      editor.undoManager.transact(function () {
        var selectedElm = editor.selection.getNode();
        var anchorElm = getAnchorElement(editor, selectedElm);
        var linkAttrs = {
          href: data.href,
          target: data.target ? data.target : null,
          rel: data.rel ? data.rel : null,
          class: data.class ? data.class : null,
          title: data.title ? data.title : null
        };
<<<<<<< HEAD
        if (!$_187tvdefjd08md7k.hasRelList(editor.settings) && $_187tvdefjd08md7k.allowUnsafeLinkTarget(editor.settings) === false) {
=======
        if (!$_3qadrteojducwrfi.hasRelList(editor.settings) && $_3qadrteojducwrfi.allowUnsafeLinkTarget(editor.settings) === false) {
>>>>>>> installer
          linkAttrs.rel = toggleTargetRules(linkAttrs.rel, linkAttrs.target === '_blank');
        }
        if (data.href === attachState.href) {
          attachState.attach();
          attachState = {};
        }
        if (anchorElm) {
          editor.focus();
          if (data.hasOwnProperty('text')) {
            if ('innerText' in anchorElm) {
              anchorElm.innerText = data.text;
            } else {
              anchorElm.textContent = data.text;
            }
          }
          editor.dom.setAttribs(anchorElm, linkAttrs);
          editor.selection.select(anchorElm);
          editor.undoManager.add();
        } else {
          if (isImageFigure(selectedElm)) {
            linkImageFigure(editor, selectedElm, linkAttrs);
          } else if (data.hasOwnProperty('text')) {
            editor.insertContent(editor.dom.createHTML('a', linkAttrs, editor.dom.encode(data.text)));
          } else {
            editor.execCommand('mceInsertLink', false, linkAttrs);
          }
        }
      });
    };
  };
  var unlink = function (editor) {
    return function () {
      editor.undoManager.transact(function () {
        var node = editor.selection.getNode();
        if (isImageFigure(node)) {
          unlinkImageFigure(editor, node);
        } else {
          editor.execCommand('unlink');
        }
      });
    };
  };
  var unlinkImageFigure = function (editor, fig) {
    var a, img;
    img = editor.dom.select('img', fig)[0];
    if (img) {
      a = editor.dom.getParents(img, 'a[href]', fig)[0];
      if (a) {
        a.parentNode.insertBefore(img, a);
        editor.dom.remove(a);
      }
    }
  };
  var linkImageFigure = function (editor, fig, attrs) {
    var a, img;
    img = editor.dom.select('img', fig)[0];
    if (img) {
      a = editor.dom.create('a', attrs);
      img.parentNode.insertBefore(a, img);
      a.appendChild(img);
    }
  };
<<<<<<< HEAD
  var $_9cfj1ejjd08md7o = {
=======
  var $_1o3qd7esjducwrfo = {
>>>>>>> installer
    link: link,
    unlink: unlink,
    isLink: isLink,
    hasLinks: hasLinks,
    isOnlyTextSelected: isOnlyTextSelected,
    getAnchorElement: getAnchorElement,
    getAnchorText: getAnchorText,
    toggleTargetRules: toggleTargetRules
  };

  var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var XHR = tinymce.util.Tools.resolve('tinymce.util.XHR');

  var attachState = {};
  var createLinkList = function (editor, callback) {
<<<<<<< HEAD
    var linkList = $_187tvdefjd08md7k.getLinkList(editor.settings);
=======
    var linkList = $_3qadrteojducwrfi.getLinkList(editor.settings);
>>>>>>> installer
    if (typeof linkList === 'string') {
      XHR.send({
        url: linkList,
        success: function (text) {
          callback(editor, JSON.parse(text));
        }
      });
    } else if (typeof linkList === 'function') {
      linkList(function (list) {
        callback(editor, list);
      });
    } else {
      callback(editor, linkList);
    }
  };
  var buildListItems = function (inputList, itemCallback, startItems) {
    var appendItems = function (values, output) {
      output = output || [];
      Tools.each(values, function (item) {
        var menuItem = { text: item.text || item.title };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;
          if (itemCallback) {
            itemCallback(menuItem);
          }
        }
        output.push(menuItem);
      });
      return output;
    };
    return appendItems(inputList, startItems || []);
  };
  var delayedConfirm = function (editor, message, callback) {
    var rng = editor.selection.getRng();
    Delay.setEditorTimeout(editor, function () {
      editor.windowManager.confirm(message, function (state) {
        editor.selection.setRng(rng);
        callback(state);
      });
    });
  };
  var showDialog = function (editor, linkList) {
    var data = {};
    var selection = editor.selection;
    var dom = editor.dom;
    var anchorElm, initialText;
    var win, onlyText, textListCtrl, linkListCtrl, relListCtrl, targetListCtrl, classListCtrl, linkTitleCtrl, value;
    var linkListChangeHandler = function (e) {
      var textCtrl = win.find('#text');
      if (!textCtrl.value() || e.lastControl && textCtrl.value() === e.lastControl.text()) {
        textCtrl.value(e.control.text());
      }
      win.find('#href').value(e.control.value());
    };
    var buildAnchorListControl = function (url) {
      var anchorList = [];
      Tools.each(editor.dom.select('a:not([href])'), function (anchor) {
        var id = anchor.name || anchor.id;
        if (id) {
          anchorList.push({
            text: id,
            value: '#' + id,
            selected: url.indexOf('#' + id) !== -1
          });
        }
      });
      if (anchorList.length) {
        anchorList.unshift({
          text: 'None',
          value: ''
        });
        return {
          name: 'anchor',
          type: 'listbox',
          label: 'Anchors',
          values: anchorList,
          onselect: linkListChangeHandler
        };
      }
    };
    var updateText = function () {
      if (!initialText && onlyText && !data.text) {
        this.parent().parent().find('#text')[0].value(this.value());
      }
    };
    var urlChange = function (e) {
      var meta = e.meta || {};
      if (linkListCtrl) {
        linkListCtrl.value(editor.convertURL(this.value(), 'href'));
      }
      Tools.each(e.meta, function (value, key) {
        var inp = win.find('#' + key);
        if (key === 'text') {
          if (initialText.length === 0) {
            inp.value(value);
            data.text = value;
          }
        } else {
          inp.value(value);
        }
      });
      if (meta.attach) {
        attachState = {
          href: this.value(),
          attach: meta.attach
        };
      }
      if (!meta.text) {
        updateText.call(this);
      }
    };
    var onBeforeCall = function (e) {
      e.meta = win.toJSON();
    };
<<<<<<< HEAD
    onlyText = $_9cfj1ejjd08md7o.isOnlyTextSelected(selection.getContent());
    anchorElm = $_9cfj1ejjd08md7o.getAnchorElement(editor);
    data.text = initialText = $_9cfj1ejjd08md7o.getAnchorText(editor.selection, anchorElm);
    data.href = anchorElm ? dom.getAttrib(anchorElm, 'href') : '';
    if (anchorElm) {
      data.target = dom.getAttrib(anchorElm, 'target');
    } else if ($_187tvdefjd08md7k.hasDefaultLinkTarget(editor.settings)) {
      data.target = $_187tvdefjd08md7k.getDefaultLinkTarget(editor.settings);
=======
    onlyText = $_1o3qd7esjducwrfo.isOnlyTextSelected(selection.getContent());
    anchorElm = $_1o3qd7esjducwrfo.getAnchorElement(editor);
    data.text = initialText = $_1o3qd7esjducwrfo.getAnchorText(editor.selection, anchorElm);
    data.href = anchorElm ? dom.getAttrib(anchorElm, 'href') : '';
    if (anchorElm) {
      data.target = dom.getAttrib(anchorElm, 'target');
    } else if ($_3qadrteojducwrfi.hasDefaultLinkTarget(editor.settings)) {
      data.target = $_3qadrteojducwrfi.getDefaultLinkTarget(editor.settings);
>>>>>>> installer
    }
    if (value = dom.getAttrib(anchorElm, 'rel')) {
      data.rel = value;
    }
    if (value = dom.getAttrib(anchorElm, 'class')) {
      data.class = value;
    }
    if (value = dom.getAttrib(anchorElm, 'title')) {
      data.title = value;
    }
    if (onlyText) {
      textListCtrl = {
        name: 'text',
        type: 'textbox',
        size: 40,
        label: 'Text to display',
        onchange: function () {
          data.text = this.value();
        }
      };
    }
    if (linkList) {
      linkListCtrl = {
        type: 'listbox',
        label: 'Link list',
        values: buildListItems(linkList, function (item) {
          item.value = editor.convertURL(item.value || item.url, 'href');
        }, [{
            text: 'None',
            value: ''
          }]),
        onselect: linkListChangeHandler,
        value: editor.convertURL(data.href, 'href'),
        onPostRender: function () {
          linkListCtrl = this;
        }
      };
    }
<<<<<<< HEAD
    if ($_187tvdefjd08md7k.shouldShowTargetList(editor.settings)) {
      if ($_187tvdefjd08md7k.getTargetList(editor.settings) === undefined) {
        $_187tvdefjd08md7k.setTargetList(editor, [
=======
    if ($_3qadrteojducwrfi.shouldShowTargetList(editor.settings)) {
      if ($_3qadrteojducwrfi.getTargetList(editor.settings) === undefined) {
        $_3qadrteojducwrfi.setTargetList(editor, [
>>>>>>> installer
          {
            text: 'None',
            value: ''
          },
          {
            text: 'New window',
            value: '_blank'
          }
        ]);
      }
      targetListCtrl = {
        name: 'target',
        type: 'listbox',
        label: 'Target',
<<<<<<< HEAD
        values: buildListItems($_187tvdefjd08md7k.getTargetList(editor.settings))
      };
    }
    if ($_187tvdefjd08md7k.hasRelList(editor.settings)) {
=======
        values: buildListItems($_3qadrteojducwrfi.getTargetList(editor.settings))
      };
    }
    if ($_3qadrteojducwrfi.hasRelList(editor.settings)) {
>>>>>>> installer
      relListCtrl = {
        name: 'rel',
        type: 'listbox',
        label: 'Rel',
<<<<<<< HEAD
        values: buildListItems($_187tvdefjd08md7k.getRelList(editor.settings), function (item) {
          if ($_187tvdefjd08md7k.allowUnsafeLinkTarget(editor.settings) === false) {
            item.value = $_9cfj1ejjd08md7o.toggleTargetRules(item.value, data.target === '_blank');
=======
        values: buildListItems($_3qadrteojducwrfi.getRelList(editor.settings), function (item) {
          if ($_3qadrteojducwrfi.allowUnsafeLinkTarget(editor.settings) === false) {
            item.value = $_1o3qd7esjducwrfo.toggleTargetRules(item.value, data.target === '_blank');
>>>>>>> installer
          }
        })
      };
    }
<<<<<<< HEAD
    if ($_187tvdefjd08md7k.hasLinkClassList(editor.settings)) {
=======
    if ($_3qadrteojducwrfi.hasLinkClassList(editor.settings)) {
>>>>>>> installer
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
<<<<<<< HEAD
        values: buildListItems($_187tvdefjd08md7k.getLinkClassList(editor.settings), function (item) {
=======
        values: buildListItems($_3qadrteojducwrfi.getLinkClassList(editor.settings), function (item) {
>>>>>>> installer
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                inline: 'a',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
<<<<<<< HEAD
    if ($_187tvdefjd08md7k.shouldShowLinkTitle(editor.settings)) {
=======
    if ($_3qadrteojducwrfi.shouldShowLinkTitle(editor.settings)) {
>>>>>>> installer
      linkTitleCtrl = {
        name: 'title',
        type: 'textbox',
        label: 'Title',
        value: data.title
      };
    }
    win = editor.windowManager.open({
      title: 'Insert link',
      data: data,
      body: [
        {
          name: 'href',
          type: 'filepicker',
          filetype: 'file',
          size: 40,
          autofocus: true,
          label: 'Url',
          onchange: urlChange,
          onkeyup: updateText,
          onpaste: updateText,
          onbeforecall: onBeforeCall
        },
        textListCtrl,
        linkTitleCtrl,
        buildAnchorListControl(data.href),
        linkListCtrl,
        relListCtrl,
        targetListCtrl,
        classListCtrl
      ],
      onSubmit: function (e) {
<<<<<<< HEAD
        var assumeExternalTargets = $_187tvdefjd08md7k.assumeExternalTargets(editor.settings);
        var insertLink = $_9cfj1ejjd08md7o.link(editor, attachState);
        var removeLink = $_9cfj1ejjd08md7o.unlink(editor);
=======
        var assumeExternalTargets = $_3qadrteojducwrfi.assumeExternalTargets(editor.settings);
        var insertLink = $_1o3qd7esjducwrfo.link(editor, attachState);
        var removeLink = $_1o3qd7esjducwrfo.unlink(editor);
>>>>>>> installer
        var resultData = Tools.extend({}, data, e.data);
        var href = resultData.href;
        if (!href) {
          removeLink();
          return;
        }
        if (!onlyText || resultData.text === initialText) {
          delete resultData.text;
        }
        if (href.indexOf('@') > 0 && href.indexOf('//') === -1 && href.indexOf('mailto:') === -1) {
          delayedConfirm(editor, 'The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?', function (state) {
            if (state) {
              resultData.href = 'mailto:' + href;
            }
            insertLink(resultData);
          });
          return;
        }
        if (assumeExternalTargets === true && !/^\w+:/i.test(href) || assumeExternalTargets === false && /^\s*www[\.|\d\.]/i.test(href)) {
          delayedConfirm(editor, 'The URL you entered seems to be an external link. Do you want to add the required http:// prefix?', function (state) {
            if (state) {
              resultData.href = 'http://' + href;
            }
            insertLink(resultData);
          });
          return;
        }
        insertLink(resultData);
      }
    });
  };
  var open$1 = function (editor) {
    createLinkList(editor, showDialog);
  };
<<<<<<< HEAD
  var $_99doozeljd08md7u = { open: open$1 };
=======
  var $_ens490eujducwrfv = { open: open$1 };
>>>>>>> installer

  var getLink = function (editor, elm) {
    return editor.dom.getParent(elm, 'a[href]');
  };
  var getSelectedLink = function (editor) {
    return getLink(editor, editor.selection.getStart());
  };
  var getHref = function (elm) {
    var href = elm.getAttribute('data-mce-href');
    return href ? href : elm.getAttribute('href');
  };
  var isContextMenuVisible = function (editor) {
    var contextmenu = editor.plugins.contextmenu;
    return contextmenu ? contextmenu.isContextMenuVisible() : false;
  };
  var hasOnlyAltModifier = function (e) {
    return e.altKey === true && e.shiftKey === false && e.ctrlKey === false && e.metaKey === false;
  };
  var gotoLink = function (editor, a) {
    if (a) {
      var href = getHref(a);
      if (/^#/.test(href)) {
        var targetEl = editor.$(href);
        if (targetEl.length) {
          editor.selection.scrollIntoView(targetEl[0], true);
        }
      } else {
<<<<<<< HEAD
        $_8x37hfegjd08md7l.open(a.href);
=======
        $_adzczyepjducwrfk.open(a.href);
>>>>>>> installer
      }
    }
  };
  var openDialog = function (editor) {
    return function () {
<<<<<<< HEAD
      $_99doozeljd08md7u.open(editor);
=======
      $_ens490eujducwrfv.open(editor);
>>>>>>> installer
    };
  };
  var gotoSelectedLink = function (editor) {
    return function () {
      gotoLink(editor, getSelectedLink(editor));
    };
  };
  var leftClickedOnAHref = function (editor) {
    return function (elm) {
      var sel, rng, node;
<<<<<<< HEAD
      if ($_187tvdefjd08md7k.hasContextToolbar(editor.settings) && !isContextMenuVisible(editor) && $_9cfj1ejjd08md7o.isLink(elm)) {
=======
      if ($_3qadrteojducwrfi.hasContextToolbar(editor.settings) && !isContextMenuVisible(editor) && $_1o3qd7esjducwrfo.isLink(elm)) {
>>>>>>> installer
        sel = editor.selection;
        rng = sel.getRng();
        node = rng.startContainer;
        if (node.nodeType === 3 && sel.isCollapsed() && rng.startOffset > 0 && rng.startOffset < node.data.length) {
          return true;
        }
      }
      return false;
    };
  };
  var setupGotoLinks = function (editor) {
    editor.on('click', function (e) {
      var link = getLink(editor, e.target);
      if (link && VK.metaKeyPressed(e)) {
        e.preventDefault();
        gotoLink(editor, link);
      }
    });
    editor.on('keydown', function (e) {
      var link = getSelectedLink(editor);
      if (link && e.keyCode === 13 && hasOnlyAltModifier(e)) {
        e.preventDefault();
        gotoLink(editor, link);
      }
    });
  };
  var toggleActiveState = function (editor) {
    return function () {
      var self = this;
      editor.on('nodechange', function (e) {
<<<<<<< HEAD
        self.active(!editor.readonly && !!$_9cfj1ejjd08md7o.getAnchorElement(editor, e.element));
=======
        self.active(!editor.readonly && !!$_1o3qd7esjducwrfo.getAnchorElement(editor, e.element));
>>>>>>> installer
      });
    };
  };
  var toggleViewLinkState = function (editor) {
    return function () {
      var self = this;
      var toggleVisibility = function (e) {
<<<<<<< HEAD
        if ($_9cfj1ejjd08md7o.hasLinks(e.parents)) {
=======
        if ($_1o3qd7esjducwrfo.hasLinks(e.parents)) {
>>>>>>> installer
          self.show();
        } else {
          self.hide();
        }
      };
<<<<<<< HEAD
      if (!$_9cfj1ejjd08md7o.hasLinks(editor.dom.getParents(editor.selection.getStart()))) {
=======
      if (!$_1o3qd7esjducwrfo.hasLinks(editor.dom.getParents(editor.selection.getStart()))) {
>>>>>>> installer
        self.hide();
      }
      editor.on('nodechange', toggleVisibility);
      self.on('remove', function () {
        editor.off('nodechange', toggleVisibility);
      });
    };
  };
<<<<<<< HEAD
  var $_ctfpy4edjd08md7f = {
=======
  var $_39o2bdemjducwrfe = {
>>>>>>> installer
    openDialog: openDialog,
    gotoSelectedLink: gotoSelectedLink,
    leftClickedOnAHref: leftClickedOnAHref,
    setupGotoLinks: setupGotoLinks,
    toggleActiveState: toggleActiveState,
    toggleViewLinkState: toggleViewLinkState
  };

  var register = function (editor) {
<<<<<<< HEAD
    editor.addCommand('mceLink', $_ctfpy4edjd08md7f.openDialog(editor));
  };
  var $_2ux77pecjd08md7c = { register: register };

  var setup = function (editor) {
    editor.addShortcut('Meta+K', '', $_ctfpy4edjd08md7f.openDialog(editor));
  };
  var $_3hkgoueojd08md83 = { setup: setup };
=======
    editor.addCommand('mceLink', $_39o2bdemjducwrfe.openDialog(editor));
  };
  var $_fcxw2keljducwrfd = { register: register };

  var setup = function (editor) {
    editor.addShortcut('Meta+K', '', $_39o2bdemjducwrfe.openDialog(editor));
  };
  var $_b2ulzfexjducwrg3 = { setup: setup };
>>>>>>> installer

  var setupButtons = function (editor) {
    editor.addButton('link', {
      active: false,
      icon: 'link',
      tooltip: 'Insert/edit link',
<<<<<<< HEAD
      onclick: $_ctfpy4edjd08md7f.openDialog(editor),
      onpostrender: $_ctfpy4edjd08md7f.toggleActiveState(editor)
=======
      onclick: $_39o2bdemjducwrfe.openDialog(editor),
      onpostrender: $_39o2bdemjducwrfe.toggleActiveState(editor)
>>>>>>> installer
    });
    editor.addButton('unlink', {
      active: false,
      icon: 'unlink',
      tooltip: 'Remove link',
<<<<<<< HEAD
      onclick: $_9cfj1ejjd08md7o.unlink(editor),
      onpostrender: $_ctfpy4edjd08md7f.toggleActiveState(editor)
=======
      onclick: $_1o3qd7esjducwrfo.unlink(editor),
      onpostrender: $_39o2bdemjducwrfe.toggleActiveState(editor)
>>>>>>> installer
    });
    if (editor.addContextToolbar) {
      editor.addButton('openlink', {
        icon: 'newtab',
        tooltip: 'Open link',
<<<<<<< HEAD
        onclick: $_ctfpy4edjd08md7f.gotoSelectedLink(editor)
=======
        onclick: $_39o2bdemjducwrfe.gotoSelectedLink(editor)
>>>>>>> installer
      });
    }
  };
  var setupMenuItems = function (editor) {
    editor.addMenuItem('openlink', {
      text: 'Open link',
      icon: 'newtab',
<<<<<<< HEAD
      onclick: $_ctfpy4edjd08md7f.gotoSelectedLink(editor),
      onPostRender: $_ctfpy4edjd08md7f.toggleViewLinkState(editor),
=======
      onclick: $_39o2bdemjducwrfe.gotoSelectedLink(editor),
      onPostRender: $_39o2bdemjducwrfe.toggleViewLinkState(editor),
>>>>>>> installer
      prependToContext: true
    });
    editor.addMenuItem('link', {
      icon: 'link',
      text: 'Link',
      shortcut: 'Meta+K',
<<<<<<< HEAD
      onclick: $_ctfpy4edjd08md7f.openDialog(editor),
=======
      onclick: $_39o2bdemjducwrfe.openDialog(editor),
>>>>>>> installer
      stateSelector: 'a[href]',
      context: 'insert',
      prependToContext: true
    });
  };
  var setupContextToolbars = function (editor) {
    if (editor.addContextToolbar) {
<<<<<<< HEAD
      editor.addContextToolbar($_ctfpy4edjd08md7f.leftClickedOnAHref(editor), 'openlink | link unlink');
    }
  };
  var $_bu2en3epjd08md84 = {
=======
      editor.addContextToolbar($_39o2bdemjducwrfe.leftClickedOnAHref(editor), 'openlink | link unlink');
    }
  };
  var $_3sj9sdeyjducwrg4 = {
>>>>>>> installer
    setupButtons: setupButtons,
    setupMenuItems: setupMenuItems,
    setupContextToolbars: setupContextToolbars
  };

  PluginManager.add('link', function (editor) {
<<<<<<< HEAD
    $_bu2en3epjd08md84.setupButtons(editor);
    $_bu2en3epjd08md84.setupMenuItems(editor);
    $_bu2en3epjd08md84.setupContextToolbars(editor);
    $_ctfpy4edjd08md7f.setupGotoLinks(editor);
    $_2ux77pecjd08md7c.register(editor);
    $_3hkgoueojd08md83.setup(editor);
=======
    $_3sj9sdeyjducwrg4.setupButtons(editor);
    $_3sj9sdeyjducwrg4.setupMenuItems(editor);
    $_3sj9sdeyjducwrg4.setupContextToolbars(editor);
    $_39o2bdemjducwrfe.setupGotoLinks(editor);
    $_fcxw2keljducwrfd.register(editor);
    $_b2ulzfexjducwrg3.setup(editor);
>>>>>>> installer
  });
  function Plugin () {
  }

  return Plugin;

}());
})();

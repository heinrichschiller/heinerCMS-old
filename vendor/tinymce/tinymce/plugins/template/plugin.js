(function () {
var template = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

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
  var $_csyezypgjd08mfcn = {
=======
  var $_64cntptjducwtph = {
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

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var XHR = tinymce.util.Tools.resolve('tinymce.util.XHR');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getCreationDateClasses = function (editor) {
    return editor.getParam('template_cdate_classes', 'cdate');
  };
  var getModificationDateClasses = function (editor) {
    return editor.getParam('template_mdate_classes', 'mdate');
  };
  var getSelectedContentClasses = function (editor) {
    return editor.getParam('template_selected_content_classes', 'selcontent');
  };
  var getPreviewReplaceValues = function (editor) {
    return editor.getParam('template_preview_replace_values');
  };
  var getTemplateReplaceValues = function (editor) {
    return editor.getParam('template_replace_values');
  };
  var getTemplates = function (editorSettings) {
    return editorSettings.templates;
  };
  var getCdateFormat = function (editor) {
    return editor.getParam('template_cdate_format', editor.getLang('template.cdate_format'));
  };
  var getMdateFormat = function (editor) {
    return editor.getParam('template_mdate_format', editor.getLang('template.mdate_format'));
  };
  var getDialogWidth = function (editor) {
    return editor.getParam('template_popup_width', 600);
  };
  var getDialogHeight = function (editor) {
    return Math.min(DOMUtils.DOM.getViewPort().h, editor.getParam('template_popup_height', 500));
  };
<<<<<<< HEAD
  var $_vw68mpkjd08mfct = {
=======
  var $_8ti1vppxjducwtpt = {
>>>>>>> installer
    getCreationDateClasses: getCreationDateClasses,
    getModificationDateClasses: getModificationDateClasses,
    getSelectedContentClasses: getSelectedContentClasses,
    getPreviewReplaceValues: getPreviewReplaceValues,
    getTemplateReplaceValues: getTemplateReplaceValues,
    getTemplates: getTemplates,
    getCdateFormat: getCdateFormat,
    getMdateFormat: getMdateFormat,
    getDialogWidth: getDialogWidth,
    getDialogHeight: getDialogHeight
  };

  var addZeros = function (value, len) {
    value = '' + value;
    if (value.length < len) {
      for (var i = 0; i < len - value.length; i++) {
        value = '0' + value;
      }
    }
    return value;
  };
  var getDateTime = function (editor, fmt, date) {
    var daysShort = 'Sun Mon Tue Wed Thu Fri Sat Sun'.split(' ');
    var daysLong = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' ');
    var monthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var monthsLong = 'January February March April May June July August September October November December'.split(' ');
    date = date || new Date();
    fmt = fmt.replace('%D', '%m/%d/%Y');
    fmt = fmt.replace('%r', '%I:%M:%S %p');
    fmt = fmt.replace('%Y', '' + date.getFullYear());
    fmt = fmt.replace('%y', '' + date.getYear());
    fmt = fmt.replace('%m', addZeros(date.getMonth() + 1, 2));
    fmt = fmt.replace('%d', addZeros(date.getDate(), 2));
    fmt = fmt.replace('%H', '' + addZeros(date.getHours(), 2));
    fmt = fmt.replace('%M', '' + addZeros(date.getMinutes(), 2));
    fmt = fmt.replace('%S', '' + addZeros(date.getSeconds(), 2));
    fmt = fmt.replace('%I', '' + ((date.getHours() + 11) % 12 + 1));
    fmt = fmt.replace('%p', '' + (date.getHours() < 12 ? 'AM' : 'PM'));
    fmt = fmt.replace('%B', '' + editor.translate(monthsLong[date.getMonth()]));
    fmt = fmt.replace('%b', '' + editor.translate(monthsShort[date.getMonth()]));
    fmt = fmt.replace('%A', '' + editor.translate(daysLong[date.getDay()]));
    fmt = fmt.replace('%a', '' + editor.translate(daysShort[date.getDay()]));
    fmt = fmt.replace('%%', '%');
    return fmt;
  };
<<<<<<< HEAD
  var $_4ccxpspmjd08mfcv = { getDateTime: getDateTime };

  var createTemplateList = function (editorSettings, callback) {
    return function () {
      var templateList = $_vw68mpkjd08mfct.getTemplates(editorSettings);
=======
  var $_18wwkzpzjducwtpv = { getDateTime: getDateTime };

  var createTemplateList = function (editorSettings, callback) {
    return function () {
      var templateList = $_8ti1vppxjducwtpt.getTemplates(editorSettings);
>>>>>>> installer
      if (typeof templateList === 'function') {
        templateList(callback);
        return;
      }
      if (typeof templateList === 'string') {
        XHR.send({
          url: templateList,
          success: function (text) {
            callback(JSON.parse(text));
          }
        });
      } else {
        callback(templateList);
      }
    };
  };
  var replaceTemplateValues = function (editor, html, templateValues) {
    Tools.each(templateValues, function (v, k) {
      if (typeof v === 'function') {
        v = v(k);
      }
      html = html.replace(new RegExp('\\{\\$' + k + '\\}', 'g'), v);
    });
    return html;
  };
  var replaceVals = function (editor, e) {
<<<<<<< HEAD
    var dom = editor.dom, vl = $_vw68mpkjd08mfct.getTemplateReplaceValues(editor);
=======
    var dom = editor.dom, vl = $_8ti1vppxjducwtpt.getTemplateReplaceValues(editor);
>>>>>>> installer
    Tools.each(dom.select('*', e), function (e) {
      Tools.each(vl, function (v, k) {
        if (dom.hasClass(e, k)) {
          if (typeof vl[k] === 'function') {
            vl[k](e);
          }
        }
      });
    });
  };
  var hasClass = function (n, c) {
    return new RegExp('\\b' + c + '\\b', 'g').test(n.className);
  };
  var insertTemplate = function (editor, ui, html) {
    var el;
    var n;
    var dom = editor.dom;
    var sel = editor.selection.getContent();
<<<<<<< HEAD
    html = replaceTemplateValues(editor, html, $_vw68mpkjd08mfct.getTemplateReplaceValues(editor));
=======
    html = replaceTemplateValues(editor, html, $_8ti1vppxjducwtpt.getTemplateReplaceValues(editor));
>>>>>>> installer
    el = dom.create('div', null, html);
    n = dom.select('.mceTmpl', el);
    if (n && n.length > 0) {
      el = dom.create('div', null);
      el.appendChild(n[0].cloneNode(true));
    }
    Tools.each(dom.select('*', el), function (n) {
<<<<<<< HEAD
      if (hasClass(n, $_vw68mpkjd08mfct.getCreationDateClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = $_4ccxpspmjd08mfcv.getDateTime(editor, $_vw68mpkjd08mfct.getCdateFormat(editor));
      }
      if (hasClass(n, $_vw68mpkjd08mfct.getModificationDateClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = $_4ccxpspmjd08mfcv.getDateTime(editor, $_vw68mpkjd08mfct.getMdateFormat(editor));
      }
      if (hasClass(n, $_vw68mpkjd08mfct.getSelectedContentClasses(editor).replace(/\s+/g, '|'))) {
=======
      if (hasClass(n, $_8ti1vppxjducwtpt.getCreationDateClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = $_18wwkzpzjducwtpv.getDateTime(editor, $_8ti1vppxjducwtpt.getCdateFormat(editor));
      }
      if (hasClass(n, $_8ti1vppxjducwtpt.getModificationDateClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = $_18wwkzpzjducwtpv.getDateTime(editor, $_8ti1vppxjducwtpt.getMdateFormat(editor));
      }
      if (hasClass(n, $_8ti1vppxjducwtpt.getSelectedContentClasses(editor).replace(/\s+/g, '|'))) {
>>>>>>> installer
        n.innerHTML = sel;
      }
    });
    replaceVals(editor, el);
    editor.execCommand('mceInsertContent', false, el.innerHTML);
    editor.addVisual();
  };
<<<<<<< HEAD
  var $_3o9uydphjd08mfcp = {
=======
  var $_6dn9s7pujducwtpo = {
>>>>>>> installer
    createTemplateList: createTemplateList,
    replaceTemplateValues: replaceTemplateValues,
    replaceVals: replaceVals,
    insertTemplate: insertTemplate
  };

  var register = function (editor) {
<<<<<<< HEAD
    editor.addCommand('mceInsertTemplate', $_csyezypgjd08mfcn.curry($_3o9uydphjd08mfcp.insertTemplate, editor));
  };
  var $_1zj8c8pfjd08mfcj = { register: register };

  var setup = function (editor) {
    editor.on('PreProcess', function (o) {
      var dom = editor.dom, dateFormat = $_vw68mpkjd08mfct.getMdateFormat(editor);
=======
    editor.addCommand('mceInsertTemplate', $_64cntptjducwtph.curry($_6dn9s7pujducwtpo.insertTemplate, editor));
  };
  var $_fjst4vpsjducwtpd = { register: register };

  var setup = function (editor) {
    editor.on('PreProcess', function (o) {
      var dom = editor.dom, dateFormat = $_8ti1vppxjducwtpt.getMdateFormat(editor);
>>>>>>> installer
      Tools.each(dom.select('div', o.node), function (e) {
        if (dom.hasClass(e, 'mceTmpl')) {
          Tools.each(dom.select('*', e), function (e) {
            if (dom.hasClass(e, editor.getParam('template_mdate_classes', 'mdate').replace(/\s+/g, '|'))) {
<<<<<<< HEAD
              e.innerHTML = $_4ccxpspmjd08mfcv.getDateTime(editor, dateFormat);
            }
          });
          $_3o9uydphjd08mfcp.replaceVals(editor, e);
=======
              e.innerHTML = $_18wwkzpzjducwtpv.getDateTime(editor, dateFormat);
            }
          });
          $_6dn9s7pujducwtpo.replaceVals(editor, e);
>>>>>>> installer
        }
      });
    });
  };
<<<<<<< HEAD
  var $_a2vsc7pnjd08mfcw = { setup: setup };
=======
  var $_68185sq0jducwtpy = { setup: setup };
>>>>>>> installer

  var insertIframeHtml = function (editor, win, html) {
    if (html.indexOf('<html>') === -1) {
      var contentCssLinks_1 = '';
      Tools.each(editor.contentCSS, function (url) {
        contentCssLinks_1 += '<link type="text/css" rel="stylesheet" href="' + editor.documentBaseURI.toAbsolute(url) + '">';
      });
      var bodyClass = editor.settings.body_class || '';
      if (bodyClass.indexOf('=') !== -1) {
        bodyClass = editor.getParam('body_class', '', 'hash');
        bodyClass = bodyClass[editor.id] || '';
      }
      html = '<!DOCTYPE html>' + '<html>' + '<head>' + contentCssLinks_1 + '</head>' + '<body class="' + bodyClass + '">' + html + '</body>' + '</html>';
    }
<<<<<<< HEAD
    html = $_3o9uydphjd08mfcp.replaceTemplateValues(editor, html, $_vw68mpkjd08mfct.getPreviewReplaceValues(editor));
=======
    html = $_6dn9s7pujducwtpo.replaceTemplateValues(editor, html, $_8ti1vppxjducwtpt.getPreviewReplaceValues(editor));
>>>>>>> installer
    var doc = win.find('iframe')[0].getEl().contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  };
  var open = function (editor, templateList) {
    var win;
    var values = [];
    var templateHtml;
    if (!templateList || templateList.length === 0) {
      var message = editor.translate('No templates defined.');
      editor.notificationManager.open({
        text: message,
        type: 'info'
      });
      return;
    }
    Tools.each(templateList, function (template) {
      values.push({
        selected: !values.length,
        text: template.title,
        value: {
          url: template.url,
          content: template.content,
          description: template.description
        }
      });
    });
    var onSelectTemplate = function (e) {
      var value = e.control.value();
      if (value.url) {
        XHR.send({
          url: value.url,
          success: function (html) {
            templateHtml = html;
            insertIframeHtml(editor, win, templateHtml);
          }
        });
      } else {
        templateHtml = value.content;
        insertIframeHtml(editor, win, templateHtml);
      }
      win.find('#description')[0].text(e.control.value().description);
    };
    win = editor.windowManager.open({
      title: 'Insert template',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      padding: 15,
      spacing: 10,
      items: [
        {
          type: 'form',
          flex: 0,
          padding: 0,
          items: [{
              type: 'container',
              label: 'Templates',
              items: {
                type: 'listbox',
                label: 'Templates',
                name: 'template',
                values: values,
                onselect: onSelectTemplate
              }
            }]
        },
        {
          type: 'label',
          name: 'description',
          label: 'Description',
          text: '\xA0'
        },
        {
          type: 'iframe',
          flex: 1,
          border: 1
        }
      ],
      onsubmit: function () {
<<<<<<< HEAD
        $_3o9uydphjd08mfcp.insertTemplate(editor, false, templateHtml);
      },
      minWidth: $_vw68mpkjd08mfct.getDialogWidth(editor),
      minHeight: $_vw68mpkjd08mfct.getDialogHeight(editor)
    });
    win.find('listbox')[0].fire('select');
  };
  var $_i9eo5ppjd08mfcz = { open: open };

  var showDialog = function (editor) {
    return function (templates) {
      $_i9eo5ppjd08mfcz.open(editor, templates);
=======
        $_6dn9s7pujducwtpo.insertTemplate(editor, false, templateHtml);
      },
      minWidth: $_8ti1vppxjducwtpt.getDialogWidth(editor),
      minHeight: $_8ti1vppxjducwtpt.getDialogHeight(editor)
    });
    win.find('listbox')[0].fire('select');
  };
  var $_fvgpotq2jducwtq3 = { open: open };

  var showDialog = function (editor) {
    return function (templates) {
      $_fvgpotq2jducwtq3.open(editor, templates);
>>>>>>> installer
    };
  };
  var register$1 = function (editor) {
    editor.addButton('template', {
      title: 'Insert template',
<<<<<<< HEAD
      onclick: $_3o9uydphjd08mfcp.createTemplateList(editor.settings, showDialog(editor))
    });
    editor.addMenuItem('template', {
      text: 'Template',
      onclick: $_3o9uydphjd08mfcp.createTemplateList(editor.settings, showDialog(editor)),
=======
      onclick: $_6dn9s7pujducwtpo.createTemplateList(editor.settings, showDialog(editor))
    });
    editor.addMenuItem('template', {
      text: 'Template',
      onclick: $_6dn9s7pujducwtpo.createTemplateList(editor.settings, showDialog(editor)),
>>>>>>> installer
      icon: 'template',
      context: 'insert'
    });
  };
<<<<<<< HEAD
  var $_57tve6pojd08mfcx = { register: register$1 };

  PluginManager.add('template', function (editor) {
    $_57tve6pojd08mfcx.register(editor);
    $_1zj8c8pfjd08mfcj.register(editor);
    $_a2vsc7pnjd08mfcw.setup(editor);
=======
  var $_ctpxabq1jducwtq1 = { register: register$1 };

  PluginManager.add('template', function (editor) {
    $_ctpxabq1jducwtq1.register(editor);
    $_fjst4vpsjducwtpd.register(editor);
    $_68185sq0jducwtpy.setup(editor);
>>>>>>> installer
  });
  function Plugin () {
  }

  return Plugin;

}());
})();

!function(e,t){"use strict";function n(e,t){for(var n,i=[],a=0;a<e.length;++a){if(n=o[e[a]]||r(e[a]),!n)throw"module definition dependecy not found: "+e[a];i.push(n)}t.apply(null,i)}function i(e,i,r){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(i===t)throw"invalid module definition, dependencies must be specified";if(r===t)throw"invalid module definition, definition function must be specified";n(i,function(){o[e]=r.apply(null,arguments)})}function r(t){for(var n=e,i=t.split(/[.\/]/),r=0;r<i.length;++r){if(!n[i[r]])return;n=n[i[r]]}return n}function a(n){for(var i=0;i<n.length;i++){for(var r=e,a=n[i],s=a.split(/[.\/]/),l=0;l<s.length-1;++l)r[s[l]]===t&&(r[s[l]]={}),r=r[s[l]];r[s[s.length-1]]=o[a]}}var o={},s="tinymce/pasteplugin/Utils",l="tinymce/util/Tools",c="tinymce/html/DomParser",d="tinymce/html/Schema",p="tinymce/pasteplugin/Clipboard",f="tinymce/Env",u="tinymce/util/VK",m="tinymce/pasteplugin/WordFilter",g="tinymce/html/Serializer",v="tinymce/html/Node",h="tinymce/pasteplugin/Quirks",b="tinymce/pasteplugin/Plugin",y="tinymce/PluginManager";i(s,[l,c,d],function(e,t,n){function i(t,n){return e.each(n,function(e){t=e.constructor==RegExp?t.replace(e,""):t.replace(e[0],e[1])}),t}function r(i){function r(e){var t=e.name,n=e;if("br"===t)return void(s+="\n");if(l[t]&&(s+=" "),c[t])return void(s+=" ");if(3==e.type&&(s+=e.value),!e.shortEnded&&(e=e.firstChild))do r(e);while(e=e.next);d[t]&&n.next&&(s+="\n","p"==t&&(s+="\n"))}var a=new n,o=new t({},a),s="",l=a.getShortEndedElements(),c=e.makeMap("script noscript style textarea video audio iframe object"," "),d=a.getBlockElements();return r(o.parse(i)),s}return{filter:i,innerText:r}}),i(p,[f,u,s],function(e,t,n){return function(i){function r(e){var t,n=i.dom;if(t=i.fire("BeforePastePreProcess",{content:e}),t=i.fire("PastePreProcess",t),e=t.content,!t.isDefaultPrevented()){if(i.hasEventListeners("PastePostProcess")&&!t.isDefaultPrevented()){var r=n.add(i.getBody(),"div",{style:"display:none"},e);t=i.fire("PastePostProcess",{node:r}),n.remove(r),e=t.node.innerHTML}t.isDefaultPrevented()||i.insertContent(e)}}function a(e){e=i.dom.encode(e).replace(/\r\n/g,"\n");var t,a=i.dom.getParent(i.selection.getStart(),i.dom.isBlock),o=i.settings.forced_root_block;o&&(t=i.dom.createHTML(o,i.settings.forced_root_block_attrs),t=t.substr(0,t.length-3)+">"),a&&/^(PRE|DIV)$/.test(a.nodeName)||!o?e=n.filter(e,[[/\n/g,"<br>"]]):(e=n.filter(e,[[/\n\n/g,"</p>"+t],[/^(.*<\/p>)(<p>)$/,t+"$1"],[/\n/g,"<br />"]]),-1!=e.indexOf("<p>")&&(e=t+e)),r(e)}function o(){var t,n=i.dom,r=i.getBody(),a=i.dom.getViewPort(i.getWin()),o=a.y,s=20;if(v=i.selection.getRng(),i.inline&&(t=i.selection.getScrollContainer(),t&&(o=t.scrollTop)),v.getClientRects){var l=v.getClientRects();if(l.length)s=o+(l[0].top-n.getPos(r).y);else{s=o;var c=v.startContainer;c&&(3==c.nodeType&&c.parentNode!=r&&(c=c.parentNode),1==c.nodeType&&(s=n.getPos(c,t||r).y))}}g=n.add(i.getBody(),"div",{id:"mcepastebin",contentEditable:!0,"data-mce-bogus":"1",style:"position: absolute; top: "+s+"px;width: 10px; height: 10px; overflow: hidden; opacity: 0"},P),(e.ie||e.gecko)&&n.setStyle(g,"left","rtl"==n.getStyle(r,"direction",!0)?65535:-65535),n.bind(g,"beforedeactivate focusin focusout",function(e){e.stopPropagation()}),g.focus(),i.selection.select(g,!0)}function s(){if(g){for(var e;e=i.dom.get("mcepastebin");)i.dom.remove(e),i.dom.unbind(e);v&&i.selection.setRng(v)}h=!1,g=v=null}function l(){var e,t,n=P;for(e=i.dom.select("div[id=mcepastebin]"),t=e.length;t--;){var r=e[t].innerHTML;n==P&&(n=""),r.length>n.length&&(n=r)}return n}function c(e){var t={};if(e&&e.types){var n=e.getData("Text");n&&n.length>0&&(t["text/plain"]=n);for(var i=0;i<e.types.length;i++){var r=e.types[i];t[r]=e.getData(r)}}return t}function d(e){return c(e.clipboardData||i.getDoc().dataTransfer)}function p(e,t){function n(e){if("image/png"==a[o].type){var t=new FileReader;return t.onload=function(){r('<img src="'+t.result+'">')},t.readAsDataURL(e.getAsFile()),!0}}if(!(!i.settings.paste_data_images||"text/html"in t||"text/plain"in t)&&e.clipboardData){var a=e.clipboardData.items;if(a)for(var o=0;o<a.length;o++)if(n(a[o]))return!0}}function f(e){var t,n=i.getDoc();if(n.caretPositionFromPoint){var r=n.caretPositionFromPoint(e.clientX,e.clientY);t=n.createRange(),t.setStart(r.offsetNode,r.offset),t.collapse(!0)}else n.caretRangeFromPoint&&(t=n.caretRangeFromPoint(e.clientX,e.clientY));return t}function u(e,t){return t in e&&e[t].length>0}function m(){i.on("keydown",function(n){if(!n.isDefaultPrevented()&&(t.metaKeyPressed(n)&&86==n.keyCode||n.shiftKey&&45==n.keyCode)){if(h=n.shiftKey&&86==n.keyCode,n.stopImmediatePropagation(),y=(new Date).getTime(),e.ie&&h)return n.preventDefault(),void i.fire("paste",{ieFake:!0});s(),o()}}),i.on("paste",function(t){var c=d(t),f=(new Date).getTime()-y<1e3,m="text"==b.pasteFormat||h;return t.isDefaultPrevented()?void s():p(t,c)?void s():(f||t.preventDefault(),!e.ie||f&&!t.ieFake||(o(),i.dom.bind(g,"paste",function(e){e.stopPropagation()}),i.getDoc().execCommand("Paste",!1,null),c["text/html"]=l()),void setTimeout(function(){var e=l();return g&&g.firstChild&&"mcepastebin"===g.firstChild.id&&(m=!0),s(),e!=P&&f||(e=c["text/html"]||c["text/plain"]||P,e!=P)?(!u(c,"text/html")&&u(c,"text/plain")&&(m=!0),void(m?a(c["text/plain"]||n.innerText(e)):r(e))):void(f||i.windowManager.alert("Please use Ctrl+V/Cmd+V keyboard shortcuts to paste contents."))},0))}),i.on("dragstart",function(e){if(e.dataTransfer.types)try{e.dataTransfer.setData("mce-internal",i.selection.getContent())}catch(t){}}),i.on("drop",function(e){var t=f(e);if(t&&!e.isDefaultPrevented()){var n=c(e.dataTransfer),o=n["mce-internal"]||n["text/html"]||n["text/plain"];o&&(e.preventDefault(),i.undoManager.transact(function(){n["mce-internal"]&&i.execCommand("Delete"),i.selection.setRng(t),n["text/html"]?r(o):a(o)}))}})}var g,v,h,b=this,y=0,P="%MCEPASTEBIN%";b.pasteHtml=r,b.pasteText=a,i.on("preInit",function(){m(),i.parser.addNodeFilter("img",function(t){if(!i.settings.paste_data_images)for(var n=t.length;n--;){var r=t[n].attributes.map.src;r&&0===r.indexOf("data:image")&&(t[n].attr("data-mce-object")||r===e.transparentSrc||t[n].remove())}})}),i.on("PreProcess",function(){i.dom.remove(i.dom.get("mcepastebin"))})}}),i(m,[l,c,d,g,v,s],function(e,t,n,i,r,a){function o(e){return/<font face="Times New Roman"|class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument/i.test(e)}function s(s){var l=s.settings;s.on("BeforePastePreProcess",function(c){function d(e){function t(e,t,o,s){var l=e._listLevel||a;l!=a&&(a>l?n&&(n=n.parent.parent):(i=n,n=null)),n&&n.name==o?n.append(e):(i=i||n,n=new r(o,1),s>1&&n.attr("start",""+s),e.wrap(n)),e.name="li",t.value="";var c=t.next;c&&3==c.type&&(c.value=c.value.replace(/^\u00a0+/,"")),l>a&&i&&i.lastChild.append(n),a=l}for(var n,i,a=1,o=e.getAll("p"),s=0;s<o.length;s++)if(e=o[s],"p"==e.name&&e.firstChild){for(var l="",c=e.firstChild;c&&!(l=c.value);)c=c.firstChild;if(/^\s*[\u2022\u00b7\u00a7\u00d8\u25CF]\s*$/.test(l)){t(e,c,"ul");continue}if(/^\s*\w+\.$/.test(l)){var d=/([0-9])\./.exec(l),p=1;d&&(p=parseInt(d[1],10)),t(e,c,"ol",p);continue}n=null}}function p(t,n){if("p"===t.name){var i=/mso-list:\w+ \w+([0-9]+)/.exec(n);i&&(t._listLevel=parseInt(i[1],10))}if(s.getParam("paste_retain_style_properties","none")){var r="";if(e.each(s.dom.parseStyle(n),function(e,t){switch(t){case"horiz-align":return void(t="text-align");case"vert-align":return void(t="vertical-align");case"font-color":case"mso-foreground":return void(t="color");case"mso-background":case"mso-highlight":t="background"}("all"==f||u&&u[t])&&(r+=t+":"+e+";")}),r)return r}return null}var f,u,m=c.content;if(f=l.paste_retain_style_properties,f&&(u=e.makeMap(f)),l.paste_enable_default_filters!==!1&&o(c.content)){c.wordContent=!0,m=a.filter(m,[/<!--[\s\S]+?-->/gi,/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,[/<(\/?)s>/gi,"<$1strike>"],[/&nbsp;/gi,"\xa0"],[/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,function(e,t){return t.length>0?t.replace(/./," ").slice(Math.floor(t.length/2)).split("").join("\xa0"):""}]]);var g=l.paste_word_valid_elements;g||(g="@[style],-strong/b,-em/i,-span,-p,-ol,-ul,-li,-h1,-h2,-h3,-h4,-h5,-h6,-table[width],-tr,-td[colspan|rowspan|width],-th,-thead,-tfoot,-tbody,-a[href|name],sub,sup,strike,br");var v=new n({valid_elements:g}),h=new t({},v);h.addAttributeFilter("style",function(e){for(var t,n=e.length;n--;)t=e[n],t.attr("style",p(t,t.attr("style"))),"span"!=t.name||t.attributes.length||t.unwrap()}),h.addNodeFilter("a",function(e){for(var t,n,i,r=e.length;r--;)t=e[r],n=t.attr("href"),i=t.attr("name"),n&&0===n.indexOf("file://")&&(n=n.split("#")[1],n&&(n="#"+n)),n||i?t.attr({href:n,name:i}):t.unwrap()});var b=h.parse(m);d(b),c.content=new i({},v).serialize(b)}})}return s.isWordContent=o,s}),i(h,[f,l,m,s],function(e,t,n,i){return function(r){function a(e){r.on("BeforePastePreProcess",function(t){t.content=e(t.content)})}function o(e){return e=i.filter(e,[/^[\s\S]*<!--StartFragment-->|<!--EndFragment-->[\s\S]*$/g,[/<span class="Apple-converted-space">\u00a0<\/span>/g,"\xa0"],/<br>$/i])}function s(e){if(!n.isWordContent(e))return e;var a=[];t.each(r.schema.getBlockElements(),function(e,t){a.push(t)});var o=new RegExp("(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*(<\\/?("+a.join("|")+")[^>]*>)(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*","g");return e=i.filter(e,[[o,"$1"]]),e=i.filter(e,[[/<br><br>/g,"<BR><BR>"],[/<br>/g," "],[/<BR><BR>/g,"<br>"]])}function l(e){return(r.settings.paste_remove_styles||r.settings.paste_remove_styles_if_webkit!==!1)&&(e=e.replace(/ style=\"[^\"]+\"/g,"")),e}e.webkit&&(a(l),a(o)),e.ie&&a(s)}}),i(b,[y,p,m,h],function(e,t,n,i){var r;e.add("paste",function(e){function a(){"text"==o.pasteFormat?(this.active(!1),o.pasteFormat="html"):(o.pasteFormat="text",this.active(!0),r||(e.windowManager.alert("Paste is now in plain text mode. Contents will now be pasted as plain text until you toggle this option off."),r=!0))}var o,s=this,l=e.settings;s.clipboard=o=new t(e),s.quirks=new i(e),s.wordFilter=new n(e),e.settings.paste_as_text&&(s.clipboard.pasteFormat="text"),l.paste_preprocess&&e.on("PastePreProcess",function(e){l.paste_preprocess.call(s,s,e)}),l.paste_postprocess&&e.on("PastePostProcess",function(e){l.paste_postprocess.call(s,s,e)}),e.addCommand("mceInsertClipboardContent",function(e,t){t.content&&s.clipboard.pasteHtml(t.content),t.text&&s.clipboard.pasteText(t.text)}),e.paste_block_drop&&e.on("dragend dragover draggesture dragdrop drop drag",function(e){e.preventDefault(),e.stopPropagation()}),e.settings.paste_data_images||e.on("drop",function(e){var t=e.dataTransfer;t&&t.files&&t.files.length>0&&e.preventDefault()}),e.addButton("pastetext",{icon:"pastetext",tooltip:"Paste as text",onclick:a,active:"text"==s.clipboard.pasteFormat}),e.addMenuItem("pastetext",{text:"Paste as text",selectable:!0,active:o.pasteFormat,onclick:a})})}),a([s,p,m,h,b])}(this);
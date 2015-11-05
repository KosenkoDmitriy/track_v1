!function(e,t){"use strict";function n(e,t){for(var n,o=[],a=0;a<e.length;++a){if(n=i[e[a]]||r(e[a]),!n)throw"module definition dependecy not found: "+e[a];o.push(n)}t.apply(null,o)}function o(e,o,r){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(o===t)throw"invalid module definition, dependencies must be specified";if(r===t)throw"invalid module definition, definition function must be specified";n(o,function(){i[e]=r.apply(null,arguments)})}function r(t){for(var n=e,o=t.split(/[.\/]/),r=0;r<o.length;++r){if(!n[o[r]])return;n=n[o[r]]}return n}function a(n){for(var o=0;o<n.length;o++){for(var r=e,a=n[o],l=a.split(/[.\/]/),c=0;c<l.length-1;++c)r[l[c]]===t&&(r[l[c]]={}),r=r[l[c]];r[l[l.length-1]]=i[a]}}var i={},l="tinymce/tableplugin/TableGrid",c="tinymce/util/Tools",s="tinymce/Env",d="tinymce/tableplugin/Quirks",u="tinymce/util/VK",f="tinymce/tableplugin/CellSelection",m="tinymce/dom/TreeWalker",g="tinymce/tableplugin/Plugin",p="tinymce/PluginManager";o(l,[c,s],function(e,n){function o(e,t){return parseInt(e.getAttribute(t)||1,10)}var r=e.each;return function(a,i){function l(){var e=0;B=[],r(["thead","tbody","tfoot"],function(t){var n=L.select("> "+t+" tr",i);r(n,function(n,a){a+=e,r(L.select("> td, > th",n),function(e,n){var r,i,l,c;if(B[a])for(;B[a][n];)n++;for(l=o(e,"rowspan"),c=o(e,"colspan"),i=a;a+l>i;i++)for(B[i]||(B[i]=[]),r=n;n+c>r;r++)B[i][r]={part:t,real:i==a&&r==n,elm:e,rowspan:l,colspan:c}})}),e+=n.length})}function c(e,t){return e=e.cloneNode(t),e.removeAttribute("id"),e}function s(e,t){var n;return n=B[t],n?n[e]:void 0}function d(e,t,n){e&&(n=parseInt(n,10),1===n?e.removeAttribute(t,1):e.setAttribute(t,n,1))}function u(e){return e&&(L.hasClass(e.elm,"mce-item-selected")||e==I)}function f(){var e=[];return r(i.rows,function(t){r(t.cells,function(n){return L.hasClass(n,"mce-item-selected")||I&&n==I.elm?(e.push(t),!1):void 0})}),e}function m(){var e=L.createRng();e.setStartAfter(i),e.setEndAfter(i),E.setRng(e),L.remove(i)}function g(t){var o,i={};return a.settings.table_clone_elements!==!1&&(i=e.makeMap((a.settings.table_clone_elements||"strong em b i span font h1 h2 h3 h4 h5 h6 p div").toUpperCase(),/[ ,]/)),e.walk(t,function(e){var a;return 3==e.nodeType?(r(L.getParents(e.parentNode,null,t).reverse(),function(e){i[e.nodeName]&&(e=c(e,!1),o?a&&a.appendChild(e):o=a=e,a=e)}),a&&(a.innerHTML=n.ie?"&nbsp;":'<br data-mce-bogus="1" />'),!1):void 0},"childNodes"),t=c(t,!1),d(t,"rowSpan",1),d(t,"colSpan",1),o?t.appendChild(o):n.ie||(t.innerHTML='<br data-mce-bogus="1" />'),t}function p(){var e,t=L.createRng();return r(L.select("tr",i),function(e){0===e.cells.length&&L.remove(e)}),0===L.select("tr",i).length?(t.setStartBefore(i),t.setEndBefore(i),E.setRng(t),void L.remove(i)):(r(L.select("thead,tbody,tfoot",i),function(e){0===e.rows.length&&L.remove(e)}),l(),void(M&&(e=B[Math.min(B.length-1,M.y)],e&&(E.select(e[Math.min(e.length-1,M.x)].elm,!0),E.collapse(!0)))))}function h(e,t,n,o){var r,a,i,l,c;for(r=B[t][e].elm.parentNode,i=1;n>=i;i++)if(r=L.getNext(r,"tr")){for(a=e;a>=0;a--)if(c=B[t+i][a].elm,c.parentNode==r){for(l=1;o>=l;l++)L.insertAfter(g(c),c);break}if(-1==a)for(l=1;o>=l;l++)r.insertBefore(g(r.cells[0]),r.cells[0])}}function b(){r(B,function(e,t){r(e,function(e,n){var r,a,i;if(u(e)&&(e=e.elm,r=o(e,"colspan"),a=o(e,"rowspan"),r>1||a>1)){for(d(e,"rowSpan",1),d(e,"colSpan",1),i=0;r-1>i;i++)L.insertAfter(g(e),e);h(n,t,a-1,r)}})})}function v(t,n,o){var a,i,c,f,m,g,h,v,w,y,x;if(t?(a=T(t),i=a.x,c=a.y,f=i+(n-1),m=c+(o-1)):(M=D=null,r(B,function(e,t){r(e,function(e,n){u(e)&&(M||(M={x:n,y:t}),D={x:n,y:t})})}),M&&(i=M.x,c=M.y,f=D.x,m=D.y)),v=s(i,c),w=s(f,m),v&&w&&v.part==w.part){for(b(),l(),v=s(i,c).elm,d(v,"colSpan",f-i+1),d(v,"rowSpan",m-c+1),h=c;m>=h;h++)for(g=i;f>=g;g++)B[h]&&B[h][g]&&(t=B[h][g].elm,t!=v&&(y=e.grep(t.childNodes),r(y,function(e){v.appendChild(e)}),y.length&&(y=e.grep(v.childNodes),x=0,r(y,function(e){"BR"==e.nodeName&&L.getAttrib(e,"data-mce-bogus")&&x++<y.length-1&&v.removeChild(e)})),L.remove(t)));p()}}function w(e){var n,a,i,l,s,f,m,p,h;if(r(B,function(t,o){return r(t,function(t){return u(t)&&(t=t.elm,s=t.parentNode,f=c(s,!1),n=o,e)?!1:void 0}),e?!n:void 0}),n!==t){for(l=0;l<B[0].length;l++)if(B[n][l]&&(a=B[n][l].elm,a!=i)){if(e){if(n>0&&B[n-1][l]&&(p=B[n-1][l].elm,h=o(p,"rowSpan"),h>1)){d(p,"rowSpan",h+1);continue}}else if(h=o(a,"rowspan"),h>1){d(a,"rowSpan",h+1);continue}m=g(a),d(m,"colSpan",a.colSpan),f.appendChild(m),i=a}f.hasChildNodes()&&(e?s.parentNode.insertBefore(f,s):L.insertAfter(f,s))}}function y(e){var t,n;r(B,function(n){return r(n,function(n,o){return u(n)&&(t=o,e)?!1:void 0}),e?!t:void 0}),r(B,function(r,a){var i,l,c;r[t]&&(i=r[t].elm,i!=n&&(c=o(i,"colspan"),l=o(i,"rowspan"),1==c?e?(i.parentNode.insertBefore(g(i),i),h(t,a,l-1,c)):(L.insertAfter(g(i),i),h(t,a,l-1,c)):d(i,"colSpan",i.colSpan+1),n=i))})}function x(){var t=[];r(B,function(n){r(n,function(n,a){u(n)&&-1===e.inArray(t,a)&&(r(B,function(e){var t,n=e[a].elm;t=o(n,"colSpan"),t>1?d(n,"colSpan",t-1):L.remove(n)}),t.push(a))})}),p()}function C(){function e(e){var t,n,a;t=L.getNext(e,"tr"),r(e.cells,function(e){var t=o(e,"rowSpan");t>1&&(d(e,"rowSpan",t-1),n=T(e),h(n.x,n.y,1,1))}),n=T(e.cells[0]),r(B[n.y],function(e){var t;e=e.elm,e!=a&&(t=o(e,"rowSpan"),1>=t?L.remove(e):d(e,"rowSpan",t-1),a=e)})}var t;t=f(),r(t.reverse(),function(t){e(t)}),p()}function R(){var e=f();return L.remove(e),p(),e}function S(){var e=f();return r(e,function(t,n){e[n]=c(t,!0)}),e}function N(e,t){var n=f(),o=n[t?0:n.length-1],a=o.cells.length;e&&(r(B,function(e){var t;return a=0,r(e,function(e){e.real&&(a+=e.colspan),e.elm.parentNode==o&&(t=1)}),t?!1:void 0}),t||e.reverse(),r(e,function(e){var n,r,i=e.cells.length;for(n=0;i>n;n++)r=e.cells[n],d(r,"colSpan",1),d(r,"rowSpan",1);for(n=i;a>n;n++)e.appendChild(g(e.cells[i-1]));for(n=a;i>n;n++)L.remove(e.cells[n]);t?o.parentNode.insertBefore(e,o):L.insertAfter(e,o)}),L.removeClass(L.select("td.mce-item-selected,th.mce-item-selected"),"mce-item-selected"))}function T(e){var t;return r(B,function(n,o){return r(n,function(n,r){return n.elm==e?(t={x:r,y:o},!1):void 0}),!t}),t}function P(e){M=T(e)}function A(){var e,t;return e=t=0,r(B,function(n,o){r(n,function(n,r){var a,i;u(n)&&(n=B[o][r],r>e&&(e=r),o>t&&(t=o),n.real&&(a=n.colspan-1,i=n.rowspan-1,a&&r+a>e&&(e=r+a),i&&o+i>t&&(t=o+i)))})}),{x:e,y:t}}function k(e){var t,n,o,r,a,i,l,c,s,d;if(D=T(e),M&&D){for(t=Math.min(M.x,D.x),n=Math.min(M.y,D.y),o=Math.max(M.x,D.x),r=Math.max(M.y,D.y),a=o,i=r,d=n;i>=d;d++)e=B[d][t],e.real||t-(e.colspan-1)<t&&(t-=e.colspan-1);for(s=t;a>=s;s++)e=B[n][s],e.real||n-(e.rowspan-1)<n&&(n-=e.rowspan-1);for(d=n;r>=d;d++)for(s=t;o>=s;s++)e=B[d][s],e.real&&(l=e.colspan-1,c=e.rowspan-1,l&&s+l>a&&(a=s+l),c&&d+c>i&&(i=d+c));for(L.removeClass(L.select("td.mce-item-selected,th.mce-item-selected"),"mce-item-selected"),d=n;i>=d;d++)for(s=t;a>=s;s++)B[d][s]&&L.addClass(B[d][s].elm,"mce-item-selected")}}var B,M,D,I,E=a.selection,L=E.dom;i=i||L.getParent(E.getStart(),"table"),l(),I=L.getParent(E.getStart(),"th,td"),I&&(M=T(I),D=A(),I=s(M.x,M.y)),e.extend(this,{deleteTable:m,split:b,merge:v,insertRow:w,insertCol:y,deleteCols:x,deleteRows:C,cutRows:R,copyRows:S,pasteRows:N,getPos:T,setStartCell:P,setEndCell:k})}}),o(d,[u,s,c],function(e,t,n){function o(e,t){return parseInt(e.getAttribute(t)||1,10)}var r=n.each;return function(n){function a(){function t(t){function a(e,o){var r=e?"previousSibling":"nextSibling",a=n.dom.getParent(o,"tr"),l=a[r];if(l)return h(n,o,l,e),t.preventDefault(),!0;var d=n.dom.getParent(a,"table"),u=a.parentNode,f=u.nodeName.toLowerCase();if("tbody"===f||f===(e?"tfoot":"thead")){var m=i(e,d,u,"tbody");if(null!==m)return c(e,m,o)}return s(e,a,r,d)}function i(e,t,o,r){var a=n.dom.select(">"+r,t),i=a.indexOf(o);if(e&&0===i||!e&&i===a.length-1)return l(e,t);if(-1===i){var c="thead"===o.tagName.toLowerCase()?0:a.length-1;return a[c]}return a[i+(e?-1:1)]}function l(e,t){var o=e?"thead":"tfoot",r=n.dom.select(">"+o,t);return 0!==r.length?r[0]:null}function c(e,o,r){var a=d(o,e);return a&&h(n,r,a,e),t.preventDefault(),!0}function s(e,o,r,i){var l=i[r];if(l)return u(l),!0;var c=n.dom.getParent(i,"td,th");if(c)return a(e,c,t);var s=d(o,!e);return u(s),t.preventDefault(),!1}function d(e,t){var o=e&&e[t?"lastChild":"firstChild"];return o&&"BR"===o.nodeName?n.dom.getParent(o,"td,th"):o}function u(e){n.selection.setCursorLocation(e,0)}function f(){return w==e.UP||w==e.DOWN}function m(e){var t=e.selection.getNode(),n=e.dom.getParent(t,"tr");return null!==n}function g(e){for(var t=0,n=e;n.previousSibling;)n=n.previousSibling,t+=o(n,"colspan");return t}function p(e,t){var n=0,a=0;return r(e.children,function(e,r){return n+=o(e,"colspan"),a=r,n>t?!1:void 0}),a}function h(e,t,o,r){var a=g(n.dom.getParent(t,"td,th")),i=p(o,a),l=o.childNodes[i],c=d(l,r);u(c||l)}function b(e){var t=n.selection.getNode(),o=n.dom.getParent(t,"td,th"),r=n.dom.getParent(e,"td,th");return o&&o!==r&&v(o,r)}function v(e,t){return n.dom.getParent(e,"TABLE")===n.dom.getParent(t,"TABLE")}var w=t.keyCode;if(f()&&m(n)){var y=n.selection.getNode();setTimeout(function(){b(y)&&a(!t.shiftKey&&w===e.UP,y,t)},0)}}n.on("KeyDown",function(e){t(e)})}function i(){function e(e,t){var n,o=t.ownerDocument,r=o.createRange();return r.setStartBefore(t),r.setEnd(e.endContainer,e.endOffset),n=o.createElement("body"),n.appendChild(r.cloneContents()),0===n.innerHTML.replace(/<(br|img|object|embed|input|textarea)[^>]*>/gi,"-").replace(/<[^>]+>/g,"").length}n.on("KeyDown",function(t){var o,r,a=n.dom;(37==t.keyCode||38==t.keyCode)&&(o=n.selection.getRng(),r=a.getParent(o.startContainer,"table"),r&&n.getBody().firstChild==r&&e(o,r)&&(o=a.createRng(),o.setStartBefore(r),o.setEndBefore(r),n.selection.setRng(o),t.preventDefault()))})}function l(){n.on("KeyDown SetContent VisualAid",function(){var e;for(e=n.getBody().lastChild;e;e=e.previousSibling)if(3==e.nodeType){if(e.nodeValue.length>0)break}else if(1==e.nodeType&&!e.getAttribute("data-mce-bogus"))break;e&&"TABLE"==e.nodeName&&(n.settings.forced_root_block?n.dom.add(n.getBody(),n.settings.forced_root_block,n.settings.forced_root_block_attrs,t.ie&&t.ie<11?"&nbsp;":'<br data-mce-bogus="1" />'):n.dom.add(n.getBody(),"br",{"data-mce-bogus":"1"}))}),n.on("PreProcess",function(e){var t=e.node.lastChild;t&&("BR"==t.nodeName||1==t.childNodes.length&&("BR"==t.firstChild.nodeName||"\xa0"==t.firstChild.nodeValue))&&t.previousSibling&&"TABLE"==t.previousSibling.nodeName&&n.dom.remove(t)})}function c(){function e(e,t,n,o){var r,a,i,l=3,c=e.dom.getParent(t.startContainer,"TABLE");return c&&(r=c.parentNode),a=t.startContainer.nodeType==l&&0===t.startOffset&&0===t.endOffset&&o&&("TR"==n.nodeName||n==r),i=("TD"==n.nodeName||"TH"==n.nodeName)&&!o,a||i}function t(){var t=n.selection.getRng(),o=n.selection.getNode(),r=n.dom.getParent(t.startContainer,"TD,TH");if(e(n,t,o,r)){r||(r=o);for(var a=r.lastChild;a.lastChild;)a=a.lastChild;t.setEnd(a,a.nodeValue.length),n.selection.setRng(t)}}n.on("KeyDown",function(){t()}),n.on("MouseDown",function(e){2!=e.button&&t()})}function s(){n.on("keydown",function(t){if((t.keyCode==e.DELETE||t.keyCode==e.BACKSPACE)&&!t.isDefaultPrevented()){var o=n.dom.getParent(n.selection.getStart(),"table");if(o){for(var r=n.dom.select("td,th",o),a=r.length;a--;)if(!n.dom.hasClass(r[a],"mce-item-selected"))return;t.preventDefault(),n.execCommand("mceTableDelete")}}})}s(),t.webkit&&(a(),c()),t.gecko&&(i(),l()),t.ie>10&&(i(),l())}}),o(f,[l,m,c],function(e,t,n){return function(o){function r(){o.getBody().style.webkitUserSelect="",d&&(o.dom.removeClass(o.dom.select("td.mce-item-selected,th.mce-item-selected"),"mce-item-selected"),d=!1)}function a(t){var n,r,a=t.target;if(l&&(i||a!=l)&&("TD"==a.nodeName||"TH"==a.nodeName)){r=s.getParent(a,"table"),r==c&&(i||(i=new e(o,r),i.setStartCell(l),o.getBody().style.webkitUserSelect="none"),i.setEndCell(a),d=!0),n=o.selection.getSel();try{n.removeAllRanges?n.removeAllRanges():n.empty()}catch(u){}t.preventDefault()}}var i,l,c,s=o.dom,d=!0;return o.on("MouseDown",function(e){2!=e.button&&(r(),l=s.getParent(e.target,"td,th"),c=s.getParent(l,"table"))}),o.on("mouseover",a),o.on("remove",function(){s.unbind(o.getDoc(),"mouseover",a)}),o.on("MouseUp",function(){function e(e,o){var a=new t(e,e);do{if(3==e.nodeType&&0!==n.trim(e.nodeValue).length)return void(o?r.setStart(e,0):r.setEnd(e,e.nodeValue.length));if("BR"==e.nodeName)return void(o?r.setStartBefore(e):r.setEndBefore(e))}while(e=o?a.next():a.prev())}var r,a,d,u,f,m,g=o.selection;if(l){if(i&&(o.getBody().style.webkitUserSelect=""),a=s.select("td.mce-item-selected,th.mce-item-selected"),a.length>0){r=s.createRng(),u=a[0],m=a[a.length-1],r.setStartBefore(u),r.setEndAfter(u),e(u,1),d=new t(u,s.getParent(a[0],"table"));do if("TD"==u.nodeName||"TH"==u.nodeName){if(!s.hasClass(u,"mce-item-selected"))break;f=u}while(u=d.next());e(f),g.setRng(r)}o.nodeChanged(),l=i=c=null}}),o.on("KeyUp",function(){r()}),{clear:r}}}),o(g,[l,d,f,c,m,s,p],function(e,t,n,o,r,a,i){function l(o){function r(e){return e?e.replace(/px$/,""):""}function i(e){return/^[0-9]+$/.test(e)&&(e+="px"),e}function l(e){c("left center right".split(" "),function(t){o.formatter.remove("align"+t,{},e)})}function s(){var e,t,n=o.dom;e=n.getParent(o.selection.getStart(),"table"),t={width:r(n.getStyle(e,"width")||n.getAttrib(e,"width")),height:r(n.getStyle(e,"height")||n.getAttrib(e,"height")),cellspacing:n.getAttrib(e,"cellspacing"),cellpadding:n.getAttrib(e,"cellpadding"),border:n.getAttrib(e,"border"),caption:!!n.select("caption",e)[0]},c("left center right".split(" "),function(n){o.formatter.matchNode(e,"align"+n)&&(t.align=n)}),o.windowManager.open({title:"Table properties",items:{type:"form",layout:"grid",columns:2,data:t,defaults:{type:"textbox",maxWidth:50},items:[{label:"Width",name:"width"},{label:"Height",name:"height"},{label:"Cell spacing",name:"cellspacing"},{label:"Cell padding",name:"cellpadding"},{label:"Border",name:"border"},{label:"Caption",name:"caption",type:"checkbox"},{label:"Alignment",minWidth:90,name:"align",type:"listbox",text:"None",maxWidth:null,values:[{text:"None",value:""},{text:"Left",value:"left"},{text:"Center",value:"center"},{text:"Right",value:"right"}]}]},onsubmit:function(){var t,r=this.toJSON();o.undoManager.transact(function(){o.dom.setAttribs(e,{cellspacing:r.cellspacing,cellpadding:r.cellpadding,border:r.border}),o.dom.setStyles(e,{width:i(r.width),height:i(r.height)}),t=n.select("caption",e)[0],t&&!r.caption&&n.remove(t),!t&&r.caption&&(t=n.create("caption"),t.innerHTML=a.ie?"\xa0":'<br data-mce-bogus="1"/>',e.insertBefore(t,e.firstChild)),l(e),r.align&&o.formatter.apply("align"+r.align,{},e),o.focus(),o.addVisual()})}})}function d(e,t){o.windowManager.open({title:"Merge cells",body:[{label:"Cols",name:"cols",type:"textbox",size:10},{label:"Rows",name:"rows",type:"textbox",size:10}],onsubmit:function(){var n=this.toJSON();o.undoManager.transact(function(){e.merge(t,n.cols,n.rows)})}})}function u(){var e,t,n=o.dom,a=[];a=o.dom.select("td.mce-item-selected,th.mce-item-selected"),e=o.dom.getParent(o.selection.getStart(),"td,th"),!a.length&&e&&a.push(e),e=e||a[0],e&&(t={width:r(n.getStyle(e,"width")||n.getAttrib(e,"width")),height:r(n.getStyle(e,"height")||n.getAttrib(e,"height")),scope:n.getAttrib(e,"scope")},t.type=e.nodeName.toLowerCase(),c("left center right".split(" "),function(n){o.formatter.matchNode(e,"align"+n)&&(t.align=n)}),o.windowManager.open({title:"Cell properties",items:{type:"form",data:t,layout:"grid",columns:2,defaults:{type:"textbox",maxWidth:50},items:[{label:"Width",name:"width"},{label:"Height",name:"height"},{label:"Cell type",name:"type",type:"listbox",text:"None",minWidth:90,maxWidth:null,values:[{text:"Cell",value:"td"},{text:"Header cell",value:"th"}]},{label:"Scope",name:"scope",type:"listbox",text:"None",minWidth:90,maxWidth:null,values:[{text:"None",value:""},{text:"Row",value:"row"},{text:"Column",value:"col"},{text:"Row group",value:"rowgroup"},{text:"Column group",value:"colgroup"}]},{label:"Alignment",name:"align",type:"listbox",text:"None",minWidth:90,maxWidth:null,values:[{text:"None",value:""},{text:"Left",value:"left"},{text:"Center",value:"center"},{text:"Right",value:"right"}]}]},onsubmit:function(){var e=this.toJSON();o.undoManager.transact(function(){c(a,function(t){o.dom.setAttrib(t,"scope",e.scope),o.dom.setStyles(t,{width:i(e.width),height:i(e.height)}),e.type&&t.nodeName.toLowerCase()!=e.type&&(t=n.rename(t,e.type)),l(t),e.align&&o.formatter.apply("align"+e.align,{},t)}),o.focus()})}}))}function f(){var e,t,n,a,s=o.dom,d=[];e=o.dom.getParent(o.selection.getStart(),"table"),t=o.dom.getParent(o.selection.getStart(),"td,th"),c(e.rows,function(e){c(e.cells,function(n){return s.hasClass(n,"mce-item-selected")||n==t?(d.push(e),!1):void 0})}),n=d[0],n&&(a={height:r(s.getStyle(n,"height")||s.getAttrib(n,"height")),scope:s.getAttrib(n,"scope")},a.type=n.parentNode.nodeName.toLowerCase(),c("left center right".split(" "),function(e){o.formatter.matchNode(n,"align"+e)&&(a.align=e)}),o.windowManager.open({title:"Row properties",items:{type:"form",data:a,columns:2,defaults:{type:"textbox"},items:[{type:"listbox",name:"type",label:"Row type",text:"None",maxWidth:null,values:[{text:"Header",value:"thead"},{text:"Body",value:"tbody"},{text:"Footer",value:"tfoot"}]},{type:"listbox",name:"align",label:"Alignment",text:"None",maxWidth:null,values:[{text:"None",value:""},{text:"Left",value:"left"},{text:"Center",value:"center"},{text:"Right",value:"right"}]},{label:"Height",name:"height"}]},onsubmit:function(){var e,t,n,r=this.toJSON();o.undoManager.transact(function(){var a=r.type;c(d,function(c){o.dom.setAttrib(c,"scope",r.scope),o.dom.setStyles(c,{height:i(r.height)}),a!=c.parentNode.nodeName.toLowerCase()&&(e=s.getParent(c,"table"),t=c.parentNode,n=s.select(a,e)[0],n||(n=s.create(a),e.firstChild?e.insertBefore(n,e.firstChild):e.appendChild(n)),n.appendChild(c),t.hasChildNodes()||s.remove(t)),l(c),r.align&&o.formatter.apply("align"+r.align,{},c)}),o.focus()})}}))}function m(e){return function(){o.execCommand(e)}}function g(e,t){var n,r,i;for(i="<table><tbody>",n=0;t>n;n++){for(i+="<tr>",r=0;e>r;r++)i+="<td>"+(a.ie?" ":"<br>")+"</td>";i+="</tr>"}i+="</tbody></table>",o.insertContent(i)}function p(e,t){function n(){e.disabled(!o.dom.getParent(o.selection.getStart(),t)),o.selection.selectorChanged(t,function(t){e.disabled(!t)})}o.initialized?n():o.on("init",n)}function h(){p(this,"table")}function b(){p(this,"td,th")}function v(){var e="";e='<table role="grid" class="mce-grid mce-grid-border" aria-readonly="true">';for(var t=0;10>t;t++){e+="<tr>";for(var n=0;10>n;n++)e+='<td role="gridcell" tabindex="-1"><a id="mcegrid'+(10*t+n)+'" href="#" data-mce-x="'+n+'" data-mce-y="'+t+'" '+(n+t===0?' class="mce-active"':"")+"></a></td>";e+="</tr>"}return e+="</table>",e+='<div class="mce-text-center" role="presentation">1 x 1</div>'}function w(e,t,n){var r,a,i,l,c=n.getEl().getElementsByTagName("table")[0],s=n.parent().rel;if(n.isRtl()||"tl-tr"==s){for(a=9;a>=0;a--)for(r=0;10>r;r++)l=c.rows[a].childNodes[r].firstChild,o.dom.toggleClass(l,"mce-active",r>=e&&t>=a),r>=e&&t>=a&&(i=l);e=9-e,c.nextSibling.innerHTML=e+" x "+(t+1)}else{for(a=0;10>a;a++)for(r=0;10>r;r++)l=c.rows[a].childNodes[r].firstChild,o.dom.toggleClass(l,"mce-active",e>=r&&t>=a),e>=r&&t>=a&&(i=l);c.nextSibling.innerHTML=e+1+" x "+(t+1)}return i.parentNode}var y,x,C=this;o.addMenuItem("inserttable",{text:"Insert table",icon:"table",context:"table",onhide:function(){var e=this.menu.items()[0].getEl().getElementsByTagName("a");o.dom.removeClass(e,"mce-active"),o.dom.addClass(e[0],"mce-active")},menu:[{type:"container",html:v(),onPostRender:function(){this.lastX=this.lastY=0},onmousemove:function(e){var t,n,o=e.target;"A"==o.nodeName&&(t=parseInt(o.getAttribute("data-mce-x"),10),n=parseInt(o.getAttribute("data-mce-y"),10),(t!==this.lastX||n!==this.lastY)&&(w(t,n,e.control),this.lastX=t,this.lastY=n))},onkeydown:function(e){var t,n=this.lastX,o=this.lastY;switch(e.keyCode){case 37:n>0&&(n--,t=!0);break;case 39:t=!0,9>n&&n++;break;case 38:t=!0,o>0&&o--;break;case 40:t=!0,9>o&&o++}t&&(e.preventDefault(),e.stopPropagation(),w(n,o,e.control).focus(),this.lastX=n,this.lastY=o)},onclick:function(e){"A"==e.target.nodeName&&(e.preventDefault(),e.stopPropagation(),this.parent().cancel(),g(this.lastX+1,this.lastY+1))}}]}),o.addMenuItem("tableprops",{text:"Table properties",context:"table",onPostRender:h,onclick:s}),o.addMenuItem("deletetable",{text:"Delete table",context:"table",onPostRender:h,cmd:"mceTableDelete"}),o.addMenuItem("cell",{separator:"before",text:"Cell",context:"table",menu:[{text:"Cell properties",onclick:m("mceTableCellProps"),onPostRender:b},{text:"Merge cells",onclick:m("mceTableMergeCells"),onPostRender:b},{text:"Split cell",onclick:m("mceTableSplitCells"),onPostRender:b}]}),o.addMenuItem("row",{text:"Row",context:"table",menu:[{text:"Insert row before",onclick:m("mceTableInsertRowBefore"),onPostRender:b},{text:"Insert row after",onclick:m("mceTableInsertRowAfter"),onPostRender:b},{text:"Delete row",onclick:m("mceTableDeleteRow"),onPostRender:b},{text:"Row properties",onclick:m("mceTableRowProps"),onPostRender:b},{text:"-"},{text:"Cut row",onclick:m("mceTableCutRow"),onPostRender:b},{text:"Copy row",onclick:m("mceTableCopyRow"),onPostRender:b},{text:"Paste row before",onclick:m("mceTablePasteRowBefore"),onPostRender:b},{text:"Paste row after",onclick:m("mceTablePasteRowAfter"),onPostRender:b}]}),o.addMenuItem("column",{text:"Column",context:"table",menu:[{text:"Insert column before",onclick:m("mceTableInsertColBefore"),onPostRender:b},{text:"Insert column after",onclick:m("mceTableInsertColAfter"),onPostRender:b},{text:"Delete column",onclick:m("mceTableDeleteCol"),onPostRender:b}]});var R=[];c("inserttable tableprops deletetable | cell row column".split(" "),function(e){R.push("|"==e?{text:"-"}:o.menuItems[e])}),o.addButton("table",{type:"menubutton",title:"Table",menu:R}),a.isIE||o.on("click",function(e){e=e.target,"TABLE"===e.nodeName&&(o.selection.select(e),o.nodeChanged())}),C.quirks=new t(o),o.on("Init",function(){y=o.windowManager,C.cellSelection=new n(o)}),c({mceTableSplitCells:function(e){e.split()},mceTableMergeCells:function(e){var t,n,r;r=o.dom.getParent(o.selection.getStart(),"th,td"),r&&(t=r.rowSpan,n=r.colSpan),o.dom.select("td.mce-item-selected,th.mce-item-selected").length?e.merge():d(e,r)},mceTableInsertRowBefore:function(e){e.insertRow(!0)},mceTableInsertRowAfter:function(e){e.insertRow()},mceTableInsertColBefore:function(e){e.insertCol(!0)},mceTableInsertColAfter:function(e){e.insertCol()},mceTableDeleteCol:function(e){e.deleteCols()},mceTableDeleteRow:function(e){e.deleteRows()},mceTableCutRow:function(e){x=e.cutRows()},mceTableCopyRow:function(e){x=e.copyRows()},mceTablePasteRowBefore:function(e){e.pasteRows(x,!0)},mceTablePasteRowAfter:function(e){e.pasteRows(x)},mceTableDelete:function(e){e.deleteTable()}},function(t,n){o.addCommand(n,function(){var n=new e(o);n&&(t(n),o.execCommand("mceRepaint"),C.cellSelection.clear())})}),c({mceInsertTable:function(){s()},mceTableRowProps:f,mceTableCellProps:u},function(e,t){o.addCommand(t,function(t,n){e(n)})})}var c=o.each;i.add("table",l)}),a([l,d,f,g])}(this);
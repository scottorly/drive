const X={xhtml:"http://www.w3.org/1999/xhtml",svg:"http://www.w3.org/2000/svg"},Q=["animate","animateMotion","animateTransform","audio","canvas","circle","clipPath","defs","desc","discard","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","iframe","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","script","set","stop","style","svg","switch","symbol","text","textPath","title","tspan","unknown","use","video","view"],ee=$=>Q.indexOf($)==-1?X.xhtml:X.svg,te=($,b,...i)=>{try{const g=i.length?[].concat(...i):[];if(b==null&&(b={}),typeof $=="function")return $({attributes:b,children:g});const w=b.xmlns||ee($),v=document.createElementNS(w,$);if(!Object.keys(b).length&&g==null)return v;g.forEach(m=>{typeof m=="string"?v.appendChild(document.createTextNode(m)):m instanceof Array?m.forEach(s=>v.appendChild(s)):v.appendChild(m)});for(const m in b){const s=b[m];if(!(s===void 0||m==="xmlns")){if(m==="className"){s.split(" ").forEach(y=>v.classList.add(y));continue}if(m==="eventListener"){v.addEventListener(...s);continue}if(m==="eventListeners"){s.forEach(y=>v.addEventListener(...y));continue}v.setAttribute(m,s)}}return v}catch(g){console.log(g)}},ne=({children:$})=>{try{const b=document.createDocumentFragment();return $.forEach(i=>{i instanceof Array?i.forEach(g=>b.appendChild(g)):typeof i=="string"?b.appendChild(document.createTextNode(i)):b.appendChild(i)}),b}catch(b){console.log(b)}};var Y=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},J={exports:{}};(function($){var b=typeof window!="undefined"?window:typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var i=function(g){var w=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,v=0,m={},s={manual:g.Prism&&g.Prism.manual,disableWorkerMessageHandler:g.Prism&&g.Prism.disableWorkerMessageHandler,util:{encode:function t(e){return e instanceof y?new y(e.type,t(e.content),e.alias):Array.isArray(e)?e.map(t):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(t){return Object.prototype.toString.call(t).slice(8,-1)},objId:function(t){return t.__id||Object.defineProperty(t,"__id",{value:++v}),t.__id},clone:function t(e,n){n=n||{};var r,a;switch(s.util.type(e)){case"Object":if(a=s.util.objId(e),n[a])return n[a];r={},n[a]=r;for(var o in e)e.hasOwnProperty(o)&&(r[o]=t(e[o],n));return r;case"Array":return a=s.util.objId(e),n[a]?n[a]:(r=[],n[a]=r,e.forEach(function(f,u){r[u]=t(f,n)}),r);default:return e}},getLanguage:function(t){for(;t;){var e=w.exec(t.className);if(e)return e[1].toLowerCase();t=t.parentElement}return"none"},setLanguage:function(t,e){t.className=t.className.replace(RegExp(w,"gi"),""),t.classList.add("language-"+e)},currentScript:function(){if(typeof document=="undefined")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(r){var t=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack)||[])[1];if(t){var e=document.getElementsByTagName("script");for(var n in e)if(e[n].src==t)return e[n]}return null}},isActive:function(t,e,n){for(var r="no-"+e;t;){var a=t.classList;if(a.contains(e))return!0;if(a.contains(r))return!1;t=t.parentElement}return!!n}},languages:{plain:m,plaintext:m,text:m,txt:m,extend:function(t,e){var n=s.util.clone(s.languages[t]);for(var r in e)n[r]=e[r];return n},insertBefore:function(t,e,n,r){r=r||s.languages;var a=r[t],o={};for(var f in a)if(a.hasOwnProperty(f)){if(f==e)for(var u in n)n.hasOwnProperty(u)&&(o[u]=n[u]);n.hasOwnProperty(f)||(o[f]=a[f])}var h=r[t];return r[t]=o,s.languages.DFS(s.languages,function(x,S){S===h&&x!=t&&(this[x]=o)}),o},DFS:function t(e,n,r,a){a=a||{};var o=s.util.objId;for(var f in e)if(e.hasOwnProperty(f)){n.call(e,f,e[f],r||f);var u=e[f],h=s.util.type(u);h==="Object"&&!a[o(u)]?(a[o(u)]=!0,t(u,n,null,a)):h==="Array"&&!a[o(u)]&&(a[o(u)]=!0,t(u,n,f,a))}}},plugins:{},highlightAll:function(t,e){s.highlightAllUnder(document,t,e)},highlightAllUnder:function(t,e,n){var r={callback:n,container:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};s.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),s.hooks.run("before-all-elements-highlight",r);for(var a=0,o;o=r.elements[a++];)s.highlightElement(o,e===!0,r.callback)},highlightElement:function(t,e,n){var r=s.util.getLanguage(t),a=s.languages[r];s.util.setLanguage(t,r);var o=t.parentElement;o&&o.nodeName.toLowerCase()==="pre"&&s.util.setLanguage(o,r);var f=t.textContent,u={element:t,language:r,grammar:a,code:f};function h(S){u.highlightedCode=S,s.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,s.hooks.run("after-highlight",u),s.hooks.run("complete",u),n&&n.call(u.element)}if(s.hooks.run("before-sanity-check",u),o=u.element.parentElement,o&&o.nodeName.toLowerCase()==="pre"&&!o.hasAttribute("tabindex")&&o.setAttribute("tabindex","0"),!u.code){s.hooks.run("complete",u),n&&n.call(u.element);return}if(s.hooks.run("before-highlight",u),!u.grammar){h(s.util.encode(u.code));return}if(e&&g.Worker){var x=new Worker(s.filename);x.onmessage=function(S){h(S.data)},x.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else h(s.highlight(u.code,u.grammar,u.language))},highlight:function(t,e,n){var r={code:t,grammar:e,language:n};if(s.hooks.run("before-tokenize",r),!r.grammar)throw new Error('The language "'+r.language+'" has no grammar.');return r.tokens=s.tokenize(r.code,r.grammar),s.hooks.run("after-tokenize",r),y.stringify(s.util.encode(r.tokens),r.language)},tokenize:function(t,e){var n=e.rest;if(n){for(var r in n)e[r]=n[r];delete e.rest}var a=new c;return l(a,a.head,t),M(t,a,e,a.head,0),F(a)},hooks:{all:{},add:function(t,e){var n=s.hooks.all;n[t]=n[t]||[],n[t].push(e)},run:function(t,e){var n=s.hooks.all[t];if(!(!n||!n.length))for(var r=0,a;a=n[r++];)a(e)}},Token:y};g.Prism=s;function y(t,e,n,r){this.type=t,this.content=e,this.alias=n,this.length=(r||"").length|0}y.stringify=function t(e,n){if(typeof e=="string")return e;if(Array.isArray(e)){var r="";return e.forEach(function(h){r+=t(h,n)}),r}var a={type:e.type,content:t(e.content,n),tag:"span",classes:["token",e.type],attributes:{},language:n},o=e.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(a.classes,o):a.classes.push(o)),s.hooks.run("wrap",a);var f="";for(var u in a.attributes)f+=" "+u+'="'+(a.attributes[u]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+f+">"+a.content+"</"+a.tag+">"};function P(t,e,n,r){t.lastIndex=e;var a=t.exec(n);if(a&&r&&a[1]){var o=a[1].length;a.index+=o,a[0]=a[0].slice(o)}return a}function M(t,e,n,r,a,o){for(var f in n)if(!(!n.hasOwnProperty(f)||!n[f])){var u=n[f];u=Array.isArray(u)?u:[u];for(var h=0;h<u.length;++h){if(o&&o.cause==f+","+h)return;var x=u[h],S=x.inside,_=!!x.lookbehind,L=!!x.greedy,D=x.alias;if(L&&!x.pattern.global){var H=x.pattern.toString().match(/[imsuy]*$/)[0];x.pattern=RegExp(x.pattern.source,H+"g")}for(var j=x.pattern||x,E=r.next,C=a;E!==e.tail&&!(o&&C>=o.reach);C+=E.value.length,E=E.next){var z=E.value;if(e.length>t.length)return;if(!(z instanceof y)){var B=1,T;if(L){if(T=P(j,C,t,_),!T||T.index>=t.length)break;var R=T.index,V=T.index+T[0].length,I=C;for(I+=E.value.length;R>=I;)E=E.next,I+=E.value.length;if(I-=E.value.length,C=I,E.value instanceof y)continue;for(var O=E;O!==e.tail&&(I<V||typeof O.value=="string");O=O.next)B++,I+=O.value.length;B--,z=t.slice(C,I),T.index-=C}else if(T=P(j,0,z,_),!T)continue;var R=T.index,N=T[0],G=z.slice(0,R),W=z.slice(R+N.length),Z=C+z.length;o&&Z>o.reach&&(o.reach=Z);var q=E.prev;G&&(q=l(e,q,G),C+=G.length),A(e,q,B);var K=new y(f,S?s.tokenize(N,S):N,D,N);if(E=l(e,q,K),W&&l(e,E,W),B>1){var U={cause:f+","+h,reach:Z};M(t,e,n,E.prev,C,U),o&&U.reach>o.reach&&(o.reach=U.reach)}}}}}}function c(){var t={value:null,prev:null,next:null},e={value:null,prev:t,next:null};t.next=e,this.head=t,this.tail=e,this.length=0}function l(t,e,n){var r=e.next,a={value:n,prev:e,next:r};return e.next=a,r.prev=a,t.length++,a}function A(t,e,n){for(var r=e.next,a=0;a<n&&r!==t.tail;a++)r=r.next;e.next=r,r.prev=e,t.length-=a}function F(t){for(var e=[],n=t.head.next;n!==t.tail;)e.push(n.value),n=n.next;return e}if(!g.document)return g.addEventListener&&(s.disableWorkerMessageHandler||g.addEventListener("message",function(t){var e=JSON.parse(t.data),n=e.language,r=e.code,a=e.immediateClose;g.postMessage(s.highlight(r,s.languages[n],n)),a&&g.close()},!1)),s;var p=s.util.currentScript();p&&(s.filename=p.src,p.hasAttribute("data-manual")&&(s.manual=!0));function d(){s.manual||s.highlightAll()}if(!s.manual){var k=document.readyState;k==="loading"||k==="interactive"&&p&&p.defer?document.addEventListener("DOMContentLoaded",d):window.requestAnimationFrame?window.requestAnimationFrame(d):window.setTimeout(d,16)}return s}(b);$.exports&&($.exports=i),typeof Y!="undefined"&&(Y.Prism=i),i.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},i.languages.markup.tag.inside["attr-value"].inside.entity=i.languages.markup.entity,i.languages.markup.doctype.inside["internal-subset"].inside=i.languages.markup,i.hooks.add("wrap",function(g){g.type==="entity"&&(g.attributes.title=g.content.replace(/&amp;/,"&"))}),Object.defineProperty(i.languages.markup.tag,"addInlined",{value:function(w,v){var m={};m["language-"+v]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:i.languages[v]},m.cdata=/^<!\[CDATA\[|\]\]>$/i;var s={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:m}};s["language-"+v]={pattern:/[\s\S]+/,inside:i.languages[v]};var y={};y[w]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return w}),"i"),lookbehind:!0,greedy:!0,inside:s},i.languages.insertBefore("markup","cdata",y)}}),Object.defineProperty(i.languages.markup.tag,"addAttribute",{value:function(g,w){i.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+g+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[w,"language-"+w],inside:i.languages[w]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),i.languages.html=i.languages.markup,i.languages.mathml=i.languages.markup,i.languages.svg=i.languages.markup,i.languages.xml=i.languages.extend("markup",{}),i.languages.ssml=i.languages.xml,i.languages.atom=i.languages.xml,i.languages.rss=i.languages.xml,function(g){var w=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;g.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+w.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+w.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+w.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:w,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},g.languages.css.atrule.inside.rest=g.languages.css;var v=g.languages.markup;v&&(v.tag.addInlined("style","css"),v.tag.addAttribute("style","css"))}(i),i.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},i.languages.javascript=i.languages.extend("clike",{"class-name":[i.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),i.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,i.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:i.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:i.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:i.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:i.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:i.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),i.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:i.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),i.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),i.languages.markup&&(i.languages.markup.tag.addInlined("script","javascript"),i.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),i.languages.js=i.languages.javascript,function(){if(typeof i=="undefined"||typeof document=="undefined")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var g="Loading\u2026",w=function(p,d){return"\u2716 Error "+p+" while fetching file: "+d},v="\u2716 Error: File does not exist or is empty",m={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},s="data-src-status",y="loading",P="loaded",M="failed",c="pre[data-src]:not(["+s+'="'+P+'"]):not(['+s+'="'+y+'"])';function l(p,d,k){var t=new XMLHttpRequest;t.open("GET",p,!0),t.onreadystatechange=function(){t.readyState==4&&(t.status<400&&t.responseText?d(t.responseText):t.status>=400?k(w(t.status,t.statusText)):k(v))},t.send(null)}function A(p){var d=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(p||"");if(d){var k=Number(d[1]),t=d[2],e=d[3];return t?e?[k,Number(e)]:[k,void 0]:[k,k]}}i.hooks.add("before-highlightall",function(p){p.selector+=", "+c}),i.hooks.add("before-sanity-check",function(p){var d=p.element;if(d.matches(c)){p.code="",d.setAttribute(s,y);var k=d.appendChild(document.createElement("CODE"));k.textContent=g;var t=d.getAttribute("data-src"),e=p.language;if(e==="none"){var n=(/\.(\w+)$/.exec(t)||[,"none"])[1];e=m[n]||n}i.util.setLanguage(k,e),i.util.setLanguage(d,e);var r=i.plugins.autoloader;r&&r.loadLanguages(e),l(t,function(a){d.setAttribute(s,P);var o=A(d.getAttribute("data-range"));if(o){var f=a.split(/\r\n?|\n/g),u=o[0],h=o[1]==null?f.length:o[1];u<0&&(u+=f.length),u=Math.max(0,Math.min(u-1,f.length)),h<0&&(h+=f.length),h=Math.max(0,Math.min(h,f.length)),a=f.slice(u,h).join(`
`),d.hasAttribute("data-start")||d.setAttribute("data-start",String(u+1))}k.textContent=a,i.highlightElement(k)},function(a){d.setAttribute(s,M),k.textContent=a})}}),i.plugins.fileHighlight={highlight:function(d){for(var k=(d||document).querySelectorAll(c),t=0,e;e=k[t++];)i.highlightElement(e)}};var F=!1;i.fileHighlight=function(){F||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),F=!0),i.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(J);var ae=J.exports;(function(){if(typeof Prism=="undefined"||typeof document=="undefined"||!document.querySelector)return;var $="line-numbers",b="linkable-line-numbers";function i(c,l){return Array.prototype.slice.call((l||document).querySelectorAll(c))}function g(c,l){return c.classList.contains(l)}function w(c){c()}var v=function(){var c;return function(){if(typeof c=="undefined"){var l=document.createElement("div");l.style.fontSize="13px",l.style.lineHeight="1.5",l.style.padding="0",l.style.border="0",l.innerHTML="&nbsp;<br />&nbsp;",document.body.appendChild(l),c=l.offsetHeight===38,document.body.removeChild(l)}return c}}();function m(c,l){var A=getComputedStyle(c),F=getComputedStyle(l);function p(d){return+d.substr(0,d.length-2)}return l.offsetTop+p(F.borderTopWidth)+p(F.paddingTop)-p(A.paddingTop)}function s(c){return!c||!/pre/i.test(c.nodeName)?!1:!!(c.hasAttribute("data-line")||c.id&&Prism.util.isActive(c,b))}var y=!0;Prism.plugins.lineHighlight={highlightLines:function(l,A,F){A=typeof A=="string"?A:l.getAttribute("data-line")||"";var p=A.replace(/\s+/g,"").split(",").filter(Boolean),d=+l.getAttribute("data-line-offset")||0,k=v()?parseInt:parseFloat,t=k(getComputedStyle(l).lineHeight),e=Prism.util.isActive(l,$),n=l.querySelector("code"),r=e?l:n||l,a=[],o=!n||r==n?0:m(l,n);p.forEach(function(h){var x=h.split("-"),S=+x[0],_=+x[1]||S,L=l.querySelector('.line-highlight[data-range="'+h+'"]')||document.createElement("div");if(a.push(function(){L.setAttribute("aria-hidden","true"),L.setAttribute("data-range",h),L.className=(F||"")+" line-highlight"}),e&&Prism.plugins.lineNumbers){var D=Prism.plugins.lineNumbers.getLine(l,S),H=Prism.plugins.lineNumbers.getLine(l,_);if(D){var j=D.offsetTop+o+"px";a.push(function(){L.style.top=j})}if(H){var E=H.offsetTop-D.offsetTop+H.offsetHeight+"px";a.push(function(){L.style.height=E})}}else a.push(function(){L.setAttribute("data-start",String(S)),_>S&&L.setAttribute("data-end",String(_)),L.style.top=(S-d-1)*t+o+"px",L.textContent=new Array(_-S+2).join(` 
`)});a.push(function(){L.style.width=l.scrollWidth+"px"}),a.push(function(){r.appendChild(L)})});var f=l.id;if(e&&Prism.util.isActive(l,b)&&f){g(l,b)||a.push(function(){l.classList.add(b)});var u=parseInt(l.getAttribute("data-start")||"1");i(".line-numbers-rows > span",l).forEach(function(h,x){var S=x+u;h.onclick=function(){var _=f+"."+S;y=!1,location.hash=_,setTimeout(function(){y=!0},1)}})}return function(){a.forEach(w)}}};function P(){var c=location.hash.slice(1);i(".temporary.line-highlight").forEach(function(d){d.parentNode.removeChild(d)});var l=(c.match(/\.([\d,-]+)$/)||[,""])[1];if(!(!l||document.getElementById(c))){var A=c.slice(0,c.lastIndexOf(".")),F=document.getElementById(A);if(!!F){F.hasAttribute("data-line")||F.setAttribute("data-line","");var p=Prism.plugins.lineHighlight.highlightLines(F,l,"temporary ");p(),y&&document.querySelector(".temporary.line-highlight").scrollIntoView()}}}var M=0;Prism.hooks.add("before-sanity-check",function(c){var l=c.element.parentElement;if(!!s(l)){var A=0;i(".line-highlight",l).forEach(function(F){A+=F.textContent.length,F.parentNode.removeChild(F)}),A&&/^(?: \n)+$/.test(c.code.slice(-A))&&(c.code=c.code.slice(0,-A))}}),Prism.hooks.add("complete",function c(l){var A=l.element.parentElement;if(!!s(A)){clearTimeout(M);var F=Prism.plugins.lineNumbers,p=l.plugins&&l.plugins.lineNumbers;if(g(A,$)&&F&&!p)Prism.hooks.add("line-numbers",c);else{var d=Prism.plugins.lineHighlight.highlightLines(A);d(),M=setTimeout(P,1)}}}),window.addEventListener("hashchange",P),window.addEventListener("resize",function(){var c=i("pre").filter(s).map(function(l){return Prism.plugins.lineHighlight.highlightLines(l)});c.forEach(w)})})();Prism.languages.swift={comment:{pattern:/(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,lookbehind:!0,greedy:!0},"string-literal":[{pattern:RegExp(/(^|[^"#])/.source+"(?:"+/"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/.source+"|"+/"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/.source+")"+/(?!["#])/.source),lookbehind:!0,greedy:!0,inside:{interpolation:{pattern:/(\\\()(?:[^()]|\([^()]*\))*(?=\))/,lookbehind:!0,inside:null},"interpolation-punctuation":{pattern:/^\)|\\\($/,alias:"punctuation"},punctuation:/\\(?=[\r\n])/,string:/[\s\S]+/}},{pattern:RegExp(/(^|[^"#])(#+)/.source+"(?:"+/"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/.source+"|"+/"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source+")\\2"),lookbehind:!0,greedy:!0,inside:{interpolation:{pattern:/(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,lookbehind:!0,inside:null},"interpolation-punctuation":{pattern:/^\)|\\#+\($/,alias:"punctuation"},string:/[\s\S]+/}}],directive:{pattern:RegExp(/#/.source+"(?:"+(/(?:elseif|if)\b/.source+"(?:[ 	]*"+/(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/.source+")+")+"|"+/(?:else|endif)\b/.source+")"),alias:"property",inside:{"directive-name":/^#\w+/,boolean:/\b(?:false|true)\b/,number:/\b\d+(?:\.\d+)*\b/,operator:/!|&&|\|\||[<>]=?/,punctuation:/[(),]/}},literal:{pattern:/#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,alias:"constant"},"other-directive":{pattern:/#\w+\b/,alias:"property"},attribute:{pattern:/@\w+/,alias:"atrule"},"function-definition":{pattern:/(\bfunc\s+)\w+/,lookbehind:!0,alias:"function"},label:{pattern:/\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,lookbehind:!0,alias:"important"},keyword:/\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,boolean:/\b(?:false|true)\b/,nil:{pattern:/\bnil\b/,alias:"constant"},"short-argument":/\$\d+\b/,omit:{pattern:/\b_\b/,alias:"keyword"},number:/\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,"class-name":/\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,function:/\b[a-z_]\w*(?=\s*\()/i,constant:/\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,operator:/[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,punctuation:/[{}[\]();,.:\\]/};Prism.languages.swift["string-literal"].forEach(function($){$.inside.interpolation.inside=Prism.languages.swift});export{ae as P,ne as f,te as h};

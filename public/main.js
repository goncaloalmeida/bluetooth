/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(s,t));}return t}toString(){return this.cssText}}const r=t=>new o("string"==typeof t?t:t+"",void 0,s),i=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o(n,t,s)},S=(s,n)=>{e?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$1;const e$1=window,r$1=e$1.trustedTypes,h=r$1?r$1.emptyScript:"",o$1=e$1.reactiveElementPolyfillSupport,n$1={toAttribute(t,i){switch(i){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a=(t,i)=>i!==t&&(i==i||t==t),l={attribute:!0,type:String,converter:n$1,reflect:!1,hasChanged:a};class d extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;null!==(i=this.h)&&void 0!==i||(this.h=[]),this.h.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c(i));}else void 0!==i&&s.push(c(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$1).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$1;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}d.finalized=!0,d.elementProperties=new Map,d.elementStyles=[],d.shadowRootOptions={mode:"open"},null==o$1||o$1({ReactiveElement:d}),(null!==(s$1=e$1.reactiveElementVersions)&&void 0!==s$1?s$1:e$1.reactiveElementVersions=[]).push("1.4.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=window,s$2=i$1.trustedTypes,e$2=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2=`lit$${(Math.random()+"").slice(9)}$`,n$2="?"+o$2,l$1=`<${n$2}>`,h$1=document,r$2=(t="")=>h$1.createComment(t),d$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c$1=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a$1=/-->/g,f=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new S$1(i.insertBefore(r$2(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},E=h$1.createTreeWalker(h$1,129,null,!1),C=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a$1:void 0!==u[1]?d=f:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a$1||d===f?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$1:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$2+y):s+o$2+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$2?e$2.createHTML(u):u,n]};class P{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,i);if(this.el=P.createElement(v,e),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=E.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$2)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$2),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?R:"?"===i[1]?H:"@"===i[1]?I:M});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$2),i=t.length-1;if(i>0){l.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r$2()),E.nextNode(),c.push({type:2,index:++h});l.append(t[i],r$2());}}}else if(8===l.nodeType)if(l.data===n$2)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$2,t+1));)c.push({type:7,index:h}),t+=o$2.length-1;}h++;}}static createElement(t,i){const s=h$1.createElement("template");return s.innerHTML=t,s}}function V(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=d$1(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=r:s._$Cu=r),void 0!==r&&(i=V(t,r._$AS(t,i.values),r,e)),i}class N{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h$1).importNode(s,!0);E.currentNode=o;let n=E.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new S$1(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=E.nextNode(),l++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class S$1{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$C_=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$C_}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=V(this,t,i),d$1(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):c$1(t)?this.O(t):this.$(t);}S(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t));}$(t){this._$AH!==b&&d$1(this._$AH)?this._$AA.nextSibling.data=t:this.k(h$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=P.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new N(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new P(t)),i}O(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new S$1(this.S(r$2()),this.S(r$2()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$C_=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class M{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=V(this,t,i,0),n=!d$1(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=V(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d$1(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.P(t);}P(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class R extends M{constructor(){super(...arguments),this.type=3;}P(t){this.element[this.name]=t===b?void 0:t;}}const k=s$2?s$2.emptyScript:"";class H extends M{constructor(){super(...arguments),this.type=4;}P(t){t&&t!==b?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends M{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=V(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t);}}const Z=i$1.litHtmlPolyfillSupport;null==Z||Z(P,S$1),(null!==(t$1=i$1.litHtmlVersions)&&void 0!==t$1?t$1:i$1.litHtmlVersions=[]).push("2.3.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$2,o$3;class s$3 extends d{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=A(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}}s$3.finalized=!0,s$3._$litElement$=!0,null===(l$2=globalThis.litElementHydrateSupport)||void 0===l$2||l$2.call(globalThis,{LitElement:s$3});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s$3});(null!==(o$3=globalThis.litElementVersions)&&void 0!==o$3?o$3:globalThis.litElementVersions=[]).push("3.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$3=t=>(...e)=>({_$litDirective$:t,values:e});class i$2{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$4=e$3(class extends i$2{constructor(t){var i;if(super(t),t.type!==t$2.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.nt){this.nt=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(t))&&this.nt.add(t);return this.render(s)}const e=i.element.classList;this.nt.forEach((t=>{t in s||(e.remove(t),this.nt.delete(t));}));for(const t in s){const i=!!s[t];i===this.nt.has(t)||(null===(o=this.st)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.nt.add(t)):(e.remove(t),this.nt.delete(t)));}return x}});

function formatDate(dateObj, dateFormat) {
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  let hrs = dateObj.getHours();
  let min = dateObj.getMinutes();
  let sec = dateObj.getSeconds();

  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;
  hrs = hrs < 10 ? '0' + hrs : hrs;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;

  switch (dateFormat) {
    case 'HH:mm':
      return hrs + ':' + min;
    default:
      console.error('no dateFormat');
  }
}

class DateTime {
  constructor(date) {
    if (date instanceof Date) {
      this.date = date;
    }
  }
  format(format) {
    return formatDate(this.date, format);
  }
}
const timely = (date = new Date(), format = null) => new DateTime(date, format);

const sounds = {
  alarm: new Audio('./assets/mp3/alarm.mp3'),
  beep: new Audio('./assets/mp3/beep.mp3'),
};

function audio(sound, play = true) {
  const player = sounds[sound];
  if (!player) return console.error('sound not found!');
  if (play) {
    player.loop = sound == 'alarm' ? true : false;
    player.play();
  } else {
    player.currentTime = 0;
    player.pause();
  }
}

const demo = document.body.querySelector('demo-view');

let previousMinute = 0;
let xAxis = 0;
let yAxis = 100;

let dataTable = [];

const LEGACY_HEADER_1 = 0xaa;
const LEGACY_HEADER_2 = 0x55;
const LEGACY_DATA_COMMAND = 0x0f;

/**
 * Parse stream from pulse oximeter
 * 254 = new line
 * Vitals (10) => 254 10 85 || STATUS(1 = no sensor, 0 = ok) || HR SpO2  ? (10-17),  ? (2-234), time (183-201), ? (10-223)
 * Graph (8) => 254 8 86 || X(16-68) 0 X(3-12) X(0-255)-TIME X(0-255)
 */
function handleData(e) {
  const t = e.target;
  const { value } = t; // ArrayBuffer

  let data = [];
  for (let i = 0; i < value.byteLength; i++) {
    data.push(value.getUint8(i));
  }

  if (isLegacyPacket(data)) {
    parseLegacyFrames(data);
    return;
  }

  let i = 0;
  while (data.length > 0) {
    i++;

    const [b1, b2, b3] = data;

    if (isVitals(b1, b2, b3)) {
      parseVitals(data.slice(4, 10));

      data = data.slice(10, data.length);
    } else if (isGraph(b1, b2, b3)) {
      parseGraph(data[3], data[6]);
      parseSignal(data[5]);

      data = data.slice(8, data.length);
    } else {
      data = [];
    }

    if (i === 20) break;
  }
}

function isLegacyPacket(data) {
  return data.length >= 4
    && data[0] === LEGACY_HEADER_1
    && data[1] === LEGACY_HEADER_2;
}

function parseLegacyFrames(data) {
  let stream = [...data];

  while (stream.length >= 4) {
    if (stream[0] !== LEGACY_HEADER_1 || stream[1] !== LEGACY_HEADER_2) {
      stream = stream.slice(1);
      continue;
    }

    const command = stream[2];
    const payloadLength = stream[3];
    const frameLength = 4 + payloadLength;

    if (stream.length < frameLength) {
      return;
    }

    const payload = stream.slice(4, frameLength);
    parseLegacyFrame(command, payload);
    stream = stream.slice(frameLength);
  }
}

function parseLegacyFrame(command, payload) {
  if (command !== LEGACY_DATA_COMMAND || payload.length < 2) {
    return;
  }

  const frameType = payload[0];

  if (frameType === 1 && payload.length >= 3) {
    const sats = payload[1];
    const bpm = payload[2];
    updateVitals({ bpm, sats });

    if (payload.length >= 5) {
      const intensity = Math.max(0, Math.min(15, Math.round(payload[4] / 7)));
      parseSignal(intensity);
    }

    return;
  }

  if (frameType === 2 && payload.length >= 2) {
    const samples = payload.slice(1);
    for (const sample of samples) {
      const graph = Math.max(0, Math.min(150, sample));
      parseGraph(graph, xAxis);
    }

    const lastSample = samples[samples.length - 1];
    const intensity = Math.max(0, Math.min(15, Math.round(lastSample / 7)));
    parseSignal(intensity);
  }
}

const isVitals = (b1, b2, b3) => b1 === 254 && b2 === 10 && b3 === 85;
const isGraph = (b1, b2, b3) => b1 === 254 && b2 === 8 && b3 === 86;

function parseVitals(arr) {
  const [bpm, sats] = arr;

  updateVitals({ bpm, sats });
}

function updateVitals({ bpm, sats }) {
  const now = timely().format('HH:mm');

  demo.sats = sats;
  demo.bpm = bpm;

  if (now !== previousMinute) {
    previousMinute = now;
    dataTable = [[now, sats, bpm], ...dataTable];
    demo.data = dataTable;
  }
}

let dir;
function parseSignal(intensity) {
  if (intensity > demo.bar) {
    dir = 'up';
  } else if (intensity < demo.bar) {
    if (dir === 'up') {
      audio('beep', true);
    }
    dir = 'down';
  }

  demo.bar = intensity;
}

function parseGraph(graph, x) {
  demo.beep = graph / 150;

  const height = graph;

  yAxis = demo.drawLine(x, yAxis, height);
  xAxis++;

  if (xAxis > 255) {
    xAxis = yAxis = 0;
  }
}

const demo$1 = document.body.querySelector('demo-view');

const COMMANDS = {
  info: 0x14,
  readSensors: 0x17,
};

let previousMinute$1 = 0;
let dataTable$1 = [];

function logWellue(...args) {
}

function crc8(data) {
  let crc = 0;

  for (const byte of data) {
    const chk = crc ^ byte;
    crc = 0;
    if (chk & 0x01) crc = 0x07;
    if (chk & 0x02) crc ^= 0x0e;
    if (chk & 0x04) crc ^= 0x1c;
    if (chk & 0x08) crc ^= 0x38;
    if (chk & 0x10) crc ^= 0x70;
    if (chk & 0x20) crc ^= 0xe0;
    if (chk & 0x40) crc ^= 0xc7;
    if (chk & 0x80) crc ^= 0x89;
  }

  return crc;
}

function buildPacket(command, data = [], block = 0) {
  const packet = [
    0xaa,
    command,
    command ^ 0xff,
    block & 0xff,
    block >> 8,
    data.length & 0xff,
    data.length >> 8,
    ...data,
  ];

  return new Uint8Array([...packet, crc8(packet)]);
}

async function writePacket(characteristic, packet) {
  for (let offset = 0; offset < packet.length; offset += 20) {
    const chunk = packet.slice(offset, offset + 20);

    if (characteristic.properties.writeWithoutResponse) {
      await characteristic.writeValueWithoutResponse(chunk);
    } else {
      await characteristic.writeValue(chunk);
    }
  }
}

function updateReadings({ bpm, sats, perfusionIndex }) {
  const now = timely().format('HH:mm');

  demo$1.sats = sats;
  demo$1.bpm = bpm;
  demo$1.bar = perfusionIndex;

  if (now !== previousMinute$1) {
    previousMinute$1 = now;
    dataTable$1 = [[now, sats, bpm], ...dataTable$1];
    demo$1.data = dataTable$1;
  }
}

function createWelluePo6Session(writeCharacteristic) {
  const decoder = new TextDecoder('utf-8');
  let buffer = new Uint8Array();
  let pollTimer = null;

  function append(chunk) {
    const combined = new Uint8Array(buffer.length + chunk.length);
    combined.set(buffer);
    combined.set(chunk, buffer.length);
    buffer = combined;
  }

  function parsePacket(packet) {
    const command = packet[1];
    const payload = packet.slice(7, packet.length - 1);

    if (command === COMMANDS.info) {
      try {
        logWellue('wellue-info', JSON.parse(decoder.decode(payload)));
      } catch (err) {
        logWellue('wellue-info', decoder.decode(payload));
      }
      return;
    }

    if (command !== COMMANDS.readSensors || payload.length < 12) {
      return;
    }

    const sats = payload[0];
    const bpm = payload[1];
    const battery = payload[7];
    const motion = payload[9];
    const perfusionIndex = payload[10];
    const wornState = payload[11];

    if (wornState === 0 || (sats === 0 && bpm === 0)) {
      return;
    }

    updateReadings({ bpm, sats, perfusionIndex });
  }

  function flush() {
    while (buffer.length >= 8) {
      if (buffer[0] !== 0xaa) {
        buffer = buffer.slice(1);
        continue;
      }

      const command = buffer[1];
      if ((command ^ 0xff) !== buffer[2]) {
        buffer = buffer.slice(1);
        continue;
      }

      const payloadLength = buffer[5] | (buffer[6] << 8);
      const packetLength = 7 + payloadLength + 1;
      if (buffer.length < packetLength) {
        return;
      }

      const packet = buffer.slice(0, packetLength);
      buffer = buffer.slice(packetLength);

      const expectedCrc = crc8(packet.slice(0, packet.length - 1));
      if (expectedCrc !== packet[packet.length - 1]) {
        continue;
      }

      parsePacket(packet);
    }
  }

  async function request(command) {
    await writePacket(writeCharacteristic, buildPacket(command));
  }

  return {
    async start() {
      await request(COMMANDS.info);
      await request(COMMANDS.readSensors);
      pollTimer = setInterval(() => {
        request(COMMANDS.readSensors).catch((err) => console.error(err));
      }, 2000);
    },
    handleData(e) {
      const chunk = new Uint8Array(e.target.value.buffer.slice(0));
      append(chunk);
      flush();
    },
    cleanup() {
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    },
  };
}

const demo$2 = document.body.querySelector('demo-view');

const HEART_RATE_MEASUREMENT_UUID = '00002a37-0000-1000-8000-00805f9b34fb';
const PLX_SPOT_CHECK_UUID = '00002a5e-0000-1000-8000-00805f9b34fb';
const PLX_CONTINUOUS_UUID = '00002a5f-0000-1000-8000-00805f9b34fb';

let previousMinute$2 = 0;
let dataTable$2 = [];

function decodeSfloat(raw) {
  let mantissa = raw & 0x0fff;
  if (mantissa >= 0x0800) {
    mantissa = -(0x1000 - mantissa);
  }

  let exponent = raw >> 12;
  if (exponent >= 0x0008) {
    exponent = -(0x0010 - exponent);
  }

  return mantissa * (10 ** exponent);
}

function updateReadings$1({ bpm, sats }) {
  if (Number.isFinite(sats) && sats >= 50 && sats <= 100) {
    demo$2.sats = Math.round(sats);
  }

  if (Number.isFinite(bpm) && bpm >= 20 && bpm <= 250) {
    demo$2.bpm = Math.round(bpm);
  }

  const now = timely().format('HH:mm');
  if (demo$2.sats !== null && demo$2.bpm !== null && now !== previousMinute$2) {
    previousMinute$2 = now;
    dataTable$2 = [[now, demo$2.sats, demo$2.bpm], ...dataTable$2];
    demo$2.data = dataTable$2;
  }
}

function parseHeartRateMeasurement(view) {
  if (view.byteLength < 2) return;

  const flags = view.getUint8(0);
  const isUint16 = (flags & 0x01) !== 0;
  const bpm = isUint16 ? view.getUint16(1, true) : view.getUint8(1);

  updateReadings$1({ bpm });
}

function parsePlxMeasurement(view, characteristicUuid) {
  if (view.byteLength < 5) return;

  const flags = view.getUint8(0);
  const sats = decodeSfloat(view.getUint16(1, true));
  const bpm = decodeSfloat(view.getUint16(3, true));

  updateReadings$1({ bpm, sats });
}

function createStandardPlxSession() {
  return {
    handleData(characteristicUuid, view) {
      if (characteristicUuid === HEART_RATE_MEASUREMENT_UUID) {
        parseHeartRateMeasurement(view);
        return;
      }

      if (characteristicUuid === PLX_SPOT_CHECK_UUID || characteristicUuid === PLX_CONTINUOUS_UUID) {
        parsePlxMeasurement(view);
        return;
      }

      const bytes = new Uint8Array(view.buffer.slice(0));
      const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join(' ');
    },
    cleanup() {
      // No background timers for the standard BLE profile.
    },
  };
}

const DEMO_VIEW = document.body.querySelector('demo-view');

function logInfo(...args) {
}

function logWarn(...args) {
  console.warn('[BT]', ...args);
}

function logError(...args) {
  console.error('[BT]', ...args);
}

const VIATOM_20F_SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
const LEGACY_UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const WELLUE_PO6_SERVICE_UUID = '14839ac4-7d7e-415c-9a42-167340cf2339';
const WELLUE_PO6_NOTIFY_UUID = '0734594a-a8e7-4b1a-a6b1-cd5243059a57';
const WELLUE_PO6_WRITE_UUID = '8b00ace7-eb0b-49b0-bbe9-9aee0a26e1a3';
const STANDARD_PLX_SERVICE_UUID = '00001822-0000-1000-8000-00805f9b34fb';
const STANDARD_HEART_RATE_SERVICE_UUID = '0000180d-0000-1000-8000-00805f9b34fb';
const STANDARD_BATTERY_SERVICE_UUID = '0000180f-0000-1000-8000-00805f9b34fb';
const GENERIC_ACCESS_SERVICE_UUID = '00001800-0000-1000-8000-00805f9b34fb';
const GENERIC_ATTRIBUTE_SERVICE_UUID = '00001801-0000-1000-8000-00805f9b34fb';

const EXTRA_OPTIONAL_SERVICES = [
  '0000fff0-0000-1000-8000-00805f9b34fb',
  '0000fff1-0000-1000-8000-00805f9b34fb',
  '0000ffe1-0000-1000-8000-00805f9b34fb',
  '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
  '49535343-fe7d-4ae5-8fa9-9fafd205e455',
];

const DEVICE_FILTERS = [
  { name: 'VTM 20F' },
  { namePrefix: 'VTM' },
  { namePrefix: 'PO' },
  { namePrefix: 'POD' },
  { namePrefix: 'Wellue' },
  { namePrefix: 'Viatom' },
];

const PROFILES = [
  {
    id: 'viatom-20f',
    serviceUuid: VIATOM_20F_SERVICE_UUID,
    optionalServices: [
      '00001800-0000-1000-8000-00805f9b34fb',
      '00001801-0000-1000-8000-00805f9b34fb',
      '0000180a-0000-1000-8000-00805f9b34fb',
      '0000fd00-0000-1000-8000-00805f9b34fb',
      '0000ff90-0000-1000-8000-00805f9b34fb',
      '0000ffc0-0000-1000-8000-00805f9b34fb',
      VIATOM_20F_SERVICE_UUID,
      '0000ffe5-0000-1000-8000-00805f9b34fb',
    ],
    async connect(server) {
      const service = await server.getPrimaryService(VIATOM_20F_SERVICE_UUID);
      const characteristics = await service.getCharacteristics();

      logInfo('VIATOM 20F characteristics found', characteristics.map((ch) => ch.uuid));

      for (const characteristic of characteristics) {
        if (characteristic.properties.notify) {
          characteristic.addEventListener('characteristicvaluechanged', handleData);
          await characteristic.startNotifications();
          logInfo('Notification started', characteristic.uuid);
        }
      }

      return {
        cleanup() {
          for (const characteristic of characteristics) {
            characteristic.removeEventListener('characteristicvaluechanged', handleData);
          }
        },
      };
    },
  },
  {
    id: 'legacy-uart-oximeter',
    serviceUuid: LEGACY_UART_SERVICE_UUID,
    optionalServices: [LEGACY_UART_SERVICE_UUID],
    async connect(server) {
      const service = await server.getPrimaryService(LEGACY_UART_SERVICE_UUID);
      const characteristics = await service.getCharacteristics();

      logInfo('Legacy UART characteristics found', characteristics.map((ch) => ch.uuid));

      const active = [];
      for (const characteristic of characteristics) {
        if (!characteristic.properties.notify) continue;

        characteristic.addEventListener('characteristicvaluechanged', handleData);
        await characteristic.startNotifications();
        active.push(characteristic);
        logInfo('Notification started', characteristic.uuid);
      }

      if (!active.length) {
        throw new Error('Legacy UART profile found but no notifiable characteristics were available.');
      }

      return {
        cleanup() {
          for (const characteristic of active) {
            characteristic.removeEventListener('characteristicvaluechanged', handleData);
          }
        },
      };
    },
  },
  {
    id: 'wellue-po6',
    serviceUuid: WELLUE_PO6_SERVICE_UUID,
    optionalServices: [WELLUE_PO6_SERVICE_UUID],
    async connect(server) {
      const service = await server.getPrimaryService(WELLUE_PO6_SERVICE_UUID);
      const characteristics = await service.getCharacteristics();
      logInfo('Wellue service characteristics found', characteristics.map((ch) => ch.uuid));

      const notifyCharacteristic = characteristics.find((ch) => ch.uuid === WELLUE_PO6_NOTIFY_UUID);
      const writeCharacteristic = characteristics.find((ch) => ch.uuid === WELLUE_PO6_WRITE_UUID);

      if (!notifyCharacteristic || !writeCharacteristic) {
        throw new Error(`Wellue profile missing required characteristics. Expected notify=${WELLUE_PO6_NOTIFY_UUID}, write=${WELLUE_PO6_WRITE_UUID}`);
      }

      const wellueSession = createWelluePo6Session(writeCharacteristic);

      notifyCharacteristic.addEventListener('characteristicvaluechanged', wellueSession.handleData);
      await notifyCharacteristic.startNotifications();
      logInfo('Notification started', notifyCharacteristic.uuid);
      await wellueSession.start();

      return {
        cleanup() {
          wellueSession.cleanup();
          notifyCharacteristic.removeEventListener('characteristicvaluechanged', wellueSession.handleData);
        },
      };
    },
  },
  {
    id: 'standard-plx',
    serviceUuid: STANDARD_PLX_SERVICE_UUID,
    optionalServices: [
      STANDARD_PLX_SERVICE_UUID,
      STANDARD_HEART_RATE_SERVICE_UUID,
      STANDARD_BATTERY_SERVICE_UUID,
    ],
    async connect(server) {
      const sessionStandard = createStandardPlxSession();
      const candidates = [
        STANDARD_PLX_SERVICE_UUID,
        STANDARD_HEART_RATE_SERVICE_UUID,
      ];

      const active = [];
      for (const serviceUuid of candidates) {
        let service;
        try {
          service = await server.getPrimaryService(serviceUuid);
        } catch (err) {
          continue;
        }

        const characteristics = await service.getCharacteristics();
        logInfo('Standard service characteristics found', serviceUuid, characteristics.map((ch) => ch.uuid));

        for (const characteristic of characteristics) {
          if (!characteristic.properties.notify) continue;

          const handler = (e) => sessionStandard.handleData(characteristic.uuid, e.target.value);
          characteristic.addEventListener('characteristicvaluechanged', handler);
          await characteristic.startNotifications();
          logInfo('Notification started', characteristic.uuid);
          active.push({ characteristic, handler });
        }
      }

      if (!active.length) {
        throw new Error('Standard PLX profile found but no notifiable characteristics were available.');
      }

      return {
        cleanup() {
          sessionStandard.cleanup();
          for (const { characteristic, handler } of active) {
            characteristic.removeEventListener('characteristicvaluechanged', handler);
          }
        },
      };
    },
  },
];

let device = null;
let session = null;

async function toggleConnection() {
  try {
    if (device?.gatt?.connected) {
      logInfo('Disconnecting device', device.name || device.id || 'unknown');
      session?.cleanup();
      device.gatt.disconnect();
    } else {
      await connect();
    }
    return !!device?.gatt?.connected;
  } catch (err) {
    logError('toggleConnection failed', err);
    throw err;
  }
}

async function connect() {

  const optionalServices = [...new Set([
    ...PROFILES.flatMap((profile) => profile.optionalServices),
    ...EXTRA_OPTIONAL_SERVICES,
  ])];

  try {
    device = await navigator.bluetooth.requestDevice({
      filters: DEVICE_FILTERS,
      optionalServices,
    });
  } catch (err) {
    if (err?.name !== 'NotFoundError') {
      throw err;
    }

    logWarn('Filtered scan found no known devices. Retrying with acceptAllDevices.');
    device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices,
    });
  }

  logInfo('Device selected', { name: device.name || 'unknown device', id: device.id || 'n/a' });

  const server = await device.gatt.connect();
  const decoder = new TextDecoder('utf-8');

  const services = await server.getPrimaryServices();
  const serviceIds = new Set(services.map((service) => service.uuid));
  const profile = PROFILES.find((candidate) => serviceIds.has(candidate.serviceUuid));

  if (!profile) {
    const hasOnlyGenericServices = serviceIds.size === 2
      && serviceIds.has(GENERIC_ACCESS_SERVICE_UUID)
      && serviceIds.has(GENERIC_ATTRIBUTE_SERVICE_UUID);

    if (hasOnlyGenericServices) {
      throw new Error('Unsupported device. Only generic BLE services (1800/1801) are visible. This usually means the oximeter is not in the correct mode, is connected to another app, or a different nearby device was selected.');
    }

    throw new Error(`Unsupported device. Detected services: ${[...serviceIds].join(', ')}. If this is your oximeter, it may expose a different service UUID or still be connected to another app.`);
  }

  logInfo(`Using profile ${profile.id}`);

  session = await profile.connect(server);
  device.addEventListener('gattserverdisconnected', onDisconnected);
}

function onDisconnected(e) {
  const t = e.target;
  logWarn('Device disconnected', t.name || t.id || 'unknown');
  session?.cleanup();
  session = null;
  device = null;
  DEMO_VIEW.disconnected();
}

const FIVE_MINUTES = 5 * 60 * 1000;

async function wakeLock(release = false) {
  if (!'wakeLock' in navigator) return;

  let wakelock = await navigator.wakeLock.request('screen');
  console.log('screen will stay awake for 5 minutes');

  wakelock.addEventListener('release', () => console.log('screen wake lock was released'));

  window.setTimeout(() => {
    wakelock.release();
    wakelock = null;
  }, FIVE_MINUTES);
}

//import './views/demo-view.js';

const CONNECT = 'Connect';
const DISCONNECT = 'Disconnect';

/*
  https://web.dev/bluetooth/
*/
class DemoView extends s$3 {
  static get properties() {
    return {
      _deviceConnected: { type: Boolean },
      _graph: { type: Object },
      data: { type: Array },
      bpm: { type: Number },
      sats: { type: Number },
      bar: { type: Number },
      beep: { type: Number },
    };
  }

  constructor() {
    super();
    this._deviceConnected = false;

    this._graph = {};
    this.data = [];
    this.bpm = null;
    this.sats = null;
    this.bar = 0;
    this.beep = 0.3;
  }

  firstUpdated() {
    this._canvas();
  }
  drawLine(x, y, height) {
    const ctx = this._ctx;
    const BASELINE = 150;
    const WIDTH = 2;
    const startX = x * WIDTH;
    const endX = startX + WIDTH;
    const newY = BASELINE - height;

    if (y === 0) {
      return newY;
    }

    ctx.clearRect(startX, 0, x, BASELINE);
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, newY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.sats < 98 ? '#f44336' : '#2196f3';
    ctx.stroke();
    ctx.closePath();
    return newY;
  }
  async _canvas() {
    const canvas = this.shadowRoot.querySelector('canvas');
    this._ctx = canvas.getContext('2d');
  }
  disconnected() {
    this._graph = {};
    this.data = [];
    this.bpm = null;
    this.sats = null;
    this.bar = 0;
    this.beep = 0.3;
  }
  async _toggleConnection(e) {
    try {
      this._deviceConnected = await toggleConnection();
      if (this._deviceConnected) wakeLock();
    } catch (err) {
      this._deviceConnected = false;
      console.error('[UI] Bluetooth connection failed', err);

      const name = err?.name || 'Error';
      if (name === 'NotFoundError') {
        alert('Bluetooth scan returned no selectable device. Keep the oximeter awake, close mobile apps (ViHealth), and try again.');
        return;
      }

      if (name === 'SecurityError') {
        alert('Bluetooth blocked by browser permissions. Allow Nearby devices/Bluetooth for this site and retry.');
        return;
      }

      alert(`Bluetooth error: ${err?.message || err}`);
    }
  }
  render() {
    const isHypoxic = this.sats !== null && this.sats < 98 ? true : false;
    const isAbnormalRate = this.bpm !== null && this.bpm < 50 || this.bpm > 80 ? true : false;
    const hasAlarm = isHypoxic || isAbnormalRate;
    const classList = {
      alarm: hasAlarm,
      animated: hasAlarm,
      shake: hasAlarm,
      sats: isHypoxic,
      bpm: isAbnormalRate,
    };
    if (hasAlarm) {
      audio('alarm');
    } else {
      audio('alarm', false);
    }
    return y`
      <section class="controls">
        <button @click="${this._toggleConnection}">
          ${this._deviceConnected ? DISCONNECT : CONNECT}
        </button>
      </section>
      <section class="container vitals ${o$4(classList)}">
        <figure class="green">
          <section class="bpm">
            <figcaption>HR
                <svg style="opacity: ${this.beep}" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </figcaption>
            <div>${this.bpm}</div>
          </section>
        </figure>
        <figure class="blue">
          <progress max="15" value="${this.bar}">${this.bar}</progress>
          <section class="sats">
            <figcaption>SpO2</figcaption>
            <div>${this.sats}</div>
          </section>
          <canvas width="600" height="150"></canvas>
        </figure>
      </section>
      <section class="container">
        <main>
          <div>Time</div>
          <div>SpO2</div>
          <div>HR</div>
          ${this.data.map((col) => y`
            <div>${col[0]}</div>
            <div>${col[1]}</div>
            <div>${col[2]}</div>
          `)}
        </main>
      </section>
    `;
  }
  static get styles() {
    return [
      i`
        :host {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          background-color: #000;
        }
        textarea:focus,
        button:focus,
        select:focus,
        input:focus {
          outline: none;
        }
        textarea,
        button,
        input,
        select {
          font-family: inherit;
          font-size: inherit;
          border: 0;
        }
        button {
          display: block;
          text-align: left;
          color: inherit;
          background-color: transparent;
          padding: 0px;
          line-height: 20px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        summary {
          -webkit-tap-highlight-color: transparent;
        }
        section {
          width: 100%;
        }
        section.container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          height: calc(100vh - 80px);
          width: 100%;
          max-width: 500px;
          color: #fff;
        }
        .controls {
          color: #fff;
          width: 100%;
          position: sticky;
          top: 0;
          height: 60px;
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vitals figure {
          flex: 1 1 100%;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: #000;
          transition: color 0.5s ease;
        }
        progress {
          display: block;
          width: 80%;
          align-self: flex-start;
        }
        progress::-webkit-progress-bar {
          background-color: #272727;
        }
        progress::-webkit-progress-value {
          background-color: #2196f3;
          transition: width 0.1s linear;
        }
        progress[value] {
          height: 5px;
          -webkit-appearance: none;
        }
        figure {
          text-align: center;
          margin: 0;
        }
        figure div {
          font-size: 15vh;
          line-height: 15vh;
        }
        figcaption {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        figcaption svg {
          transition: opacity 0.2s;
        }
        svg {
          fill: #F44336;
          margin: 0px 10px;
        }
        main {
          display: grid;
          grid-template-columns: repeat(3, auto);
          grid-gap: 10px 100px;
          padding: 20px;
          justify-content: center;
          overflow: hidden;
          max-height: 80vh;
          align-content: flex-start;
          text-align: center;
        }
        button {
          padding: 5px 12px;
          border: 2px solid #673AB7;
          border-radius: 1rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05rem;
          font-weight: 500;
          color: #D1C4E9;
          background-color: #000;
        }
        .bar {
          padding: 0px 3px;
          background-color: ;
          transition: height 0.3s linear;
          border-radius: 0.3em;
        }
        .graph {
          width: 100%;
          height: 150px;
          display: flex;
          align-items: flex-end;
        }
        .indicator {
          height: 100px;
        }
        .bar-narrow {
          width: 1%;
          background-color: #2196f3;
          box-shadow: 0px 0px 4px #2196f3;
        }
        .metric-group {
          display: flex;
          width: 100%;
          justify-content: center;
        }
        .metric-group div.fig {
          display: inline-block;
          font-size: 0.7rem;
          line-height: 1.3em;
          margin: 10px 0px;
          padding: 0px 15px;
          text-align: center;
        }
        .metric-group span {
          font-size: 0.8rem;
        }
        .metric-group figure {
          margin: 0;
          width: 100%;
          font-size: 4rem;
          line-height: 5rem;
          min-width: 100px;
        }
        .green {
          color: #4caf50;
          align-items: center;
        }
        .blue {
          color: #2196f3;
          padding-bottom: 90px;
        }
        .alarm.bpm figure.green,
        .alarm.sats figure.blue {
          color: #f44336 !important;
        }
        canvas {
          width: calc(100% - 40px);
          margin: 0px 10px;
        }
        .animated {
          animation-duration: 1.5s;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
        }
        @-webkit-keyframes shake {
          from,
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
          }
          20%,
          40%,
          60%,
          80% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
          }
        }
        @keyframes shake {
          from,
          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
          }
          20%,
          40%,
          60%,
          80% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
          }
        }
        .shake {
          -webkit-animation-name: shake;
          animation-name: shake;
        }
      `,
    ];
  }
}
customElements.define('demo-view', DemoView);
//# sourceMappingURL=main.js.map

parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"YfZ1":[function(require,module,exports) {

},{}],"NSdn":[function(require,module,exports) {
"use strict";require("../sass/clock-on-desktop.scss");const e=document.getElementById("time"),t=document.getElementById("greeting"),n=document.getElementById("name"),o=document.getElementById("focus"),r=!0;function s(){let t=new Date,n=t.getHours(),o=t.getMinutes(),a=t.getSeconds();const u=n>=12?"PM":"AM";n=n%24||24,e.innerHTML=`${n}<span>:</span>${c(o)}<span>:</span>${c(a)} ${r?u:""}`,setTimeout(s,1e3)}function c(e){return(parseInt(e,10)<10?"0":"")+e}function a(){let e=(new Date).getHours();e<12?(document.body.style.backgroundImage="url('https://i.ibb.co/7vDLJFb/morning.jpg')",t.textContent="Good Morning, "):e<18?(document.body.style.backgroundImage="url('https://i.ibb.co/3mThcXc/afternoon.jpg')",t.textContent="Good Afternoon, "):(document.body.style.backgroundImage="url('https://i.ibb.co/924T2Wv/night.jpg')",t.textContent="Good Evening, ",document.body.style.color="white")}function u(){null===localStorage.getItem("name")?n.textContent="[Enter Name]":n.textContent=localStorage.getItem("name")}function g(e){"keypress"===e.type?13!=e.which&&13!=e.keyCode||(localStorage.setItem("name",e.target.innerText),n.blur()):localStorage.setItem("name",e.target.innerText)}function l(){null===localStorage.getItem("focus")?o.textContent="[Enter Focus]":o.textContent=localStorage.getItem("focus")}function i(e){"keypress"===e.type?13!=e.which&&13!=e.keyCode||(localStorage.setItem("focus",e.target.innerText),o.blur()):localStorage.setItem("focus",e.target.innerText)}n.addEventListener("keypress",g),n.addEventListener("blur",g),o.addEventListener("keypress",i),o.addEventListener("blur",i),s(),a(),u(),l();
},{"../sass/clock-on-desktop.scss":"YfZ1"}]},{},["NSdn"], null)
//# sourceMappingURL=/js-tasks/clock-on-desktop.bd978788.js.map
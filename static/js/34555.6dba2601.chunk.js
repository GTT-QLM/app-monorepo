"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[34555],{134555:(t,e,r)=>{r.r(e),r.d(e,{default:()=>P});var n=r(887371),u=r(545754),c=r(411987),f=r(695058),o=r(690350),a=r(613549);function l(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,f.default)(t);if(e){var u=(0,f.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}var i=function(t){(0,u.default)(r,t);var e=l(r);function r(){return e.apply(this,arguments)}return(0,n.default)(r)}(r(479480).KeyringHardware);function s(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,f.default)(t);if(e){var u=(0,f.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}var p=function(t){(0,u.default)(r,t);var e=s(r);function r(){return e.apply(this,arguments)}return(0,n.default)(r)}(r(111365).KeyringHd);function d(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,f.default)(t);if(e){var u=(0,f.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}var y=function(t){(0,u.default)(r,t);var e=d(r);function r(){return e.apply(this,arguments)}return(0,n.default)(r)}(r(602219).KeyringImported);function h(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,f.default)(t);if(e){var u=(0,f.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}var v=function(t){(0,u.default)(r,t);var e=h(r);function r(){return e.apply(this,arguments)}return(0,n.default)(r)}(r(520173).KeyringWatching),R=r(376314);function g(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,f.default)(t);if(e){var u=(0,f.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}var m=function(t){(0,u.default)(r,t);var e=g(r);function r(){return e.apply(this,arguments)}return r.prototype.getPsbt=function(){return new R.Psbt({network:this.network,maximumFeeRate:1e4})},(0,n.default)(r)}(r(882914).Provider),B=r(280802);function w(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=(0,f.default)(t);if(e){var u=(0,f.default)(this).constructor;r=Reflect.construct(n,arguments,u)}else r=n.apply(this,arguments);return(0,c.default)(this,r)}}var P=function(t){(0,u.default)(r,t);var e=w(r);function r(){for(var t,r=arguments.length,n=new Array(r),u=0;u<r;u++)n[u]=arguments[u];return(t=e.call.apply(e,[this].concat(n))).providerClass=m,t.keyringMap={hd:p,hw:i,imported:y,watching:v,external:v},t.settings=B.default,t}var c=r.prototype;return c.getDefaultPurpose=function(){return 44},c.getCoinName=function(){return"DOGE"},c.getCoinType=function(){return a.COINTYPE_DOGE},c.getXprvReg=function(){return/^[d]gpv/},c.getXpubReg=function(){return/^[d]gub/},c.getDefaultBlockNums=function(){return[25,5,2]},c.getDefaultBlockTime=function(){return 60},(0,n.default)(r)}(o.default)}}]);
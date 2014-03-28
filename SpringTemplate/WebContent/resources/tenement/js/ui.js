(function($) {
	!function(){"use strict";function a(a){return a.replace(/,/g,".").replace(/[^0-9\.]/g,"")}function b(b){return parseFloat(a(b))>=10}var c,d={bridge:null,version:"0.0.0",disabled:null,outdated:null,ready:null},e={},f=0,g={},h=0,i={},j=null,k=null,l=function(){var a,b,c,d,e="ZeroClipboard.swf";if(document.currentScript&&(d=document.currentScript.src));else{var f=document.getElementsByTagName("script");if("readyState"in f[0])for(a=f.length;a--&&("interactive"!==f[a].readyState||!(d=f[a].src)););else if("loading"===document.readyState)d=f[f.length-1].src;else{for(a=f.length;a--;){if(c=f[a].src,!c){b=null;break}if(c=c.split("#")[0].split("?")[0],c=c.slice(0,c.lastIndexOf("/")+1),null==b)b=c;else if(b!==c){b=null;break}}null!==b&&(d=b)}}return d&&(d=d.split("#")[0].split("?")[0],e=d.slice(0,d.lastIndexOf("/")+1)+e),e}(),m=function(){var a=/\-([a-z])/g,b=function(a,b){return b.toUpperCase()};return function(c){return c.replace(a,b)}}(),n=function(a,b){var c,d,e;return window.getComputedStyle?c=window.getComputedStyle(a,null).getPropertyValue(b):(d=m(b),c=a.currentStyle?a.currentStyle[d]:a.style[d]),"cursor"!==b||c&&"auto"!==c||(e=a.tagName.toLowerCase(),"a"!==e)?c:"pointer"},o=function(a){a||(a=window.event);var b;this!==window?b=this:a.target?b=a.target:a.srcElement&&(b=a.srcElement),I.activate(b)},p=function(a,b,c){a&&1===a.nodeType&&(a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c))},q=function(a,b,c){a&&1===a.nodeType&&(a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c))},r=function(a,b){if(!a||1!==a.nodeType)return a;if(a.classList)return a.classList.contains(b)||a.classList.add(b),a;if(b&&"string"==typeof b){var c=(b||"").split(/\s+/);if(1===a.nodeType)if(a.className){for(var d=" "+a.className+" ",e=a.className,f=0,g=c.length;g>f;f++)d.indexOf(" "+c[f]+" ")<0&&(e+=" "+c[f]);a.className=e.replace(/^\s+|\s+$/g,"")}else a.className=b}return a},s=function(a,b){if(!a||1!==a.nodeType)return a;if(a.classList)return a.classList.contains(b)&&a.classList.remove(b),a;if(b&&"string"==typeof b||void 0===b){var c=(b||"").split(/\s+/);if(1===a.nodeType&&a.className)if(b){for(var d=(" "+a.className+" ").replace(/[\n\t]/g," "),e=0,f=c.length;f>e;e++)d=d.replace(" "+c[e]+" "," ");a.className=d.replace(/^\s+|\s+$/g,"")}else a.className=""}return a},t=function(){var a,b,c,d=1;return"function"==typeof document.body.getBoundingClientRect&&(a=document.body.getBoundingClientRect(),b=a.right-a.left,c=document.body.offsetWidth,d=Math.round(b/c*100)/100),d},u=function(a,b){var c={left:0,top:0,width:0,height:0,zIndex:A(b)-1};if(a.getBoundingClientRect){var d,e,f,g=a.getBoundingClientRect();"pageXOffset"in window&&"pageYOffset"in window?(d=window.pageXOffset,e=window.pageYOffset):(f=t(),d=Math.round(document.documentElement.scrollLeft/f),e=Math.round(document.documentElement.scrollTop/f));var h=document.documentElement.clientLeft||0,i=document.documentElement.clientTop||0;c.left=g.left+d-h,c.top=g.top+e-i,c.width="width"in g?g.width:g.right-g.left,c.height="height"in g?g.height:g.bottom-g.top}return c},v=function(a,b){var c=null==b||b&&b.cacheBust===!0&&b.useNoCache===!0;return c?(-1===a.indexOf("?")?"?":"&")+"noCache="+(new Date).getTime():""},w=function(a){var b,c,d,e=[],f=[],g=[];if(a.trustedOrigins&&("string"==typeof a.trustedOrigins?f.push(a.trustedOrigins):"object"==typeof a.trustedOrigins&&"length"in a.trustedOrigins&&(f=f.concat(a.trustedOrigins))),a.trustedDomains&&("string"==typeof a.trustedDomains?f.push(a.trustedDomains):"object"==typeof a.trustedDomains&&"length"in a.trustedDomains&&(f=f.concat(a.trustedDomains))),f.length)for(b=0,c=f.length;c>b;b++)if(f.hasOwnProperty(b)&&f[b]&&"string"==typeof f[b]){if(d=D(f[b]),!d)continue;if("*"===d){g=[d];break}g.push.apply(g,[d,"//"+d,window.location.protocol+"//"+d])}return g.length&&e.push("trustedOrigins="+encodeURIComponent(g.join(","))),"string"==typeof a.jsModuleId&&a.jsModuleId&&e.push("jsModuleId="+encodeURIComponent(a.jsModuleId)),e.join("&")},x=function(a,b,c){if("function"==typeof b.indexOf)return b.indexOf(a,c);var d,e=b.length;for("undefined"==typeof c?c=0:0>c&&(c=e+c),d=c;e>d;d++)if(b.hasOwnProperty(d)&&b[d]===a)return d;return-1},y=function(a){if("string"==typeof a)throw new TypeError("ZeroClipboard doesn't accept query strings.");return a.length?a:[a]},z=function(a,b,c,d){d?window.setTimeout(function(){a.apply(b,c)},0):a.apply(b,c)},A=function(a){var b,c;return a&&("number"==typeof a&&a>0?b=a:"string"==typeof a&&(c=parseInt(a,10))&&!isNaN(c)&&c>0&&(b=c)),b||("number"==typeof L.zIndex&&L.zIndex>0?b=L.zIndex:"string"==typeof L.zIndex&&(c=parseInt(L.zIndex,10))&&!isNaN(c)&&c>0&&(b=c)),b||0},B=function(a,b){if(a&&b!==!1&&"undefined"!=typeof console&&console&&(console.warn||console.log)){var c="`"+a+"` is deprecated. See docs for more info:\n    https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md#deprecations";console.warn?console.warn(c):console.log(c)}},C=function(){var a,b,c,d,e,f,g=arguments[0]||{};for(a=1,b=arguments.length;b>a;a++)if(null!=(c=arguments[a]))for(d in c)if(c.hasOwnProperty(d)){if(e=g[d],f=c[d],g===f)continue;void 0!==f&&(g[d]=f)}return g},D=function(a){if(null==a||""===a)return null;if(a=a.replace(/^\s+|\s+$/g,""),""===a)return null;var b=a.indexOf("//");a=-1===b?a:a.slice(b+2);var c=a.indexOf("/");return a=-1===c?a:-1===b||0===c?null:a.slice(0,c),a&&".swf"===a.slice(-4).toLowerCase()?null:a||null},E=function(){var a=function(a,b){var c,d,e;if(null!=a&&"*"!==b[0]&&("string"==typeof a&&(a=[a]),"object"==typeof a&&"length"in a))for(c=0,d=a.length;d>c;c++)if(a.hasOwnProperty(c)&&(e=D(a[c]))){if("*"===e){b.length=0,b.push("*");break}-1===x(e,b)&&b.push(e)}},b={always:"always",samedomain:"sameDomain",never:"never"};return function(c,d){var e,f=d.allowScriptAccess;if("string"==typeof f&&(e=f.toLowerCase())&&/^always|samedomain|never$/.test(e))return b[e];var g=D(d.moviePath);null===g&&(g=c);var h=[];a(d.trustedOrigins,h),a(d.trustedDomains,h);var i=h.length;if(i>0){if(1===i&&"*"===h[0])return"always";if(-1!==x(c,h))return 1===i&&c===g?"sameDomain":"always"}return"never"}}(),F=function(a){if(null==a)return[];if(Object.keys)return Object.keys(a);var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b},G=function(a){if(a)for(var b in a)a.hasOwnProperty(b)&&delete a[b];return a},H=function(){var a=!1;if("boolean"==typeof d.disabled)a=d.disabled===!1;else{if("function"==typeof ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(a=!0)}catch(b){}!a&&navigator.mimeTypes["application/x-shockwave-flash"]&&(a=!0)}return a},I=function(a,b){return this instanceof I?(this.id=""+f++,g[this.id]={instance:this,elements:[],handlers:{}},a&&this.clip(a),"undefined"!=typeof b&&(B("new ZeroClipboard(elements, options)",L.debug),I.config(b)),this.options=I.config(),"boolean"!=typeof d.disabled&&(d.disabled=!H()),d.disabled===!1&&d.outdated!==!0&&null===d.bridge&&(d.outdated=!1,d.ready=!1,M()),void 0):new I(a,b)};I.prototype.setText=function(a){return a&&""!==a&&(e["text/plain"]=a,d.ready===!0&&d.bridge&&d.bridge.setText(a)),this},I.prototype.setSize=function(a,b){return d.ready===!0&&d.bridge&&d.bridge.setSize(a,b),this};var J=function(a){d.ready===!0&&d.bridge&&d.bridge.setHandCursor(a)};I.prototype.destroy=function(){this.unclip(),this.off(),delete g[this.id]};var K=function(){var a,b,c,d=[],e=F(g);for(a=0,b=e.length;b>a;a++)c=g[e[a]].instance,c&&c instanceof I&&d.push(c);return d};I.version="2.0.0-alpha.1";var L={swfPath:l,trustedDomains:window.location.host?[window.location.host]:[],cacheBust:!0,forceHandCursor:!1,zIndex:999999999,debug:!0,title:null,autoActivate:!0};I.config=function(a){"object"==typeof a&&null!==a&&C(L,a);{if("string"!=typeof a||!a){var b={};for(var c in L)L.hasOwnProperty(c)&&(b[c]="object"==typeof L[c]&&null!==L[c]?"length"in L[c]?L[c].slice(0):C({},L[c]):L[c]);return b}if(L.hasOwnProperty(a))return L[a]}},I.destroy=function(){I.deactivate();for(var a in g)if(g.hasOwnProperty(a)&&g[a]){var b=g[a].instance;b&&"function"==typeof b.destroy&&b.destroy()}var c=N(d.bridge);c&&c.parentNode&&(c.parentNode.removeChild(c),d.ready=null,d.bridge=null)},I.activate=function(a){c&&(s(c,L.hoverClass),s(c,L.activeClass)),c=a,r(a,L.hoverClass),O();var b=L.title||a.getAttribute("title");if(b){var e=N(d.bridge);e&&e.setAttribute("title",b)}var f=L.forceHandCursor===!0||"pointer"===n(a,"cursor");J(f)},I.deactivate=function(){var a=N(d.bridge);a&&(a.style.left="0px",a.style.top="-9999px",a.removeAttribute("title")),c&&(s(c,L.hoverClass),s(c,L.activeClass),c=null)};var M=function(){var a,b,c=document.getElementById("global-zeroclipboard-html-bridge");if(!c){var e=I.config();e.jsModuleId="string"==typeof j&&j||"string"==typeof k&&k||null;var f=E(window.location.host,L),g=w(e),h=L.moviePath+v(L.moviePath,L),i='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+h+'"/>         <param name="allowScriptAccess" value="'+f+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+g+'"/>         <embed src="'+h+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="'+f+'"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+g+'"           scale="exactfit">         </embed>       </object>';c=document.createElement("div"),c.id="global-zeroclipboard-html-bridge",c.setAttribute("class","global-zeroclipboard-container"),c.style.position="absolute",c.style.left="0px",c.style.top="-9999px",c.style.width="15px",c.style.height="15px",c.style.zIndex=""+A(L.zIndex),document.body.appendChild(c),c.innerHTML=i}a=document["global-zeroclipboard-flash-bridge"],a&&(b=a.length)&&(a=a[b-1]),d.bridge=a||c.children[0].lastElementChild},N=function(a){for(var b=/^OBJECT|EMBED$/,c=a&&a.parentNode;c&&b.test(c.nodeName)&&c.parentNode;)c=c.parentNode;return c||null},O=function(){if(c){var a=u(c,L.zIndex),b=N(d.bridge);b&&(b.style.top=a.top+"px",b.style.left=a.left+"px",b.style.width=a.width+"px",b.style.height=a.height+"px",b.style.zIndex=a.zIndex+1),d.ready===!0&&d.bridge&&d.bridge.setSize(a.width,a.height)}return this};I.prototype.on=function(a,b){var c,e,f,h={},i=g[this.id]&&g[this.id].handlers;if("string"==typeof a&&a)f=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)a.hasOwnProperty(c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&this.on(c,a[c]);if(f&&f.length){for(c=0,e=f.length;e>c;c++)a=f[c].replace(/^on/,""),h[a]=!0,i[a]||(i[a]=[]),i[a].push(b);h.noflash&&d.disabled&&R.call(this,"noflash",{}),h.wrongflash&&d.outdated&&R.call(this,"wrongflash",{flashVersion:d.version}),h.load&&d.ready&&R.call(this,"load",{flashVersion:d.version})}return this},I.prototype.off=function(a,b){var c,d,e,f,h,i=g[this.id]&&g[this.id].handlers;if(0===arguments.length)f=F(i);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)a.hasOwnProperty(c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&this.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),h=i[a],h&&h.length)if(b)for(e=x(b,h);-1!==e;)h.splice(e,1),e=x(b,h,e);else i[a].length=0;return this},I.prototype.handlers=function(a){var b,c=null,d=g[this.id]&&g[this.id].handlers;if(d){if("string"==typeof a&&a)return d[a]?d[a].slice(0):null;c={};for(b in d)d.hasOwnProperty(b)&&d[b]&&(c[b]=d[b].slice(0))}return c};var P=function(a,b,c,d){var e=g[this.id]&&g[this.id].handlers[a];if(e&&e.length){var f,h,i,j=b||this;for(f=0,h=e.length;h>f;f++)i=e[f],b=j,"string"==typeof i&&"function"==typeof window[i]&&(i=window[i]),"object"==typeof i&&i&&"function"==typeof i.handleEvent&&(b=i,i=i.handleEvent),"function"==typeof i&&z(i,b,c,d)}return this};I.prototype.clip=function(a){a=y(a);for(var b=0;b<a.length;b++)if(a.hasOwnProperty(b)&&a[b]&&1===a[b].nodeType){a[b].zcClippingId?-1===x(this.id,i[a[b].zcClippingId])&&i[a[b].zcClippingId].push(this.id):(a[b].zcClippingId="zcClippingId_"+h++,i[a[b].zcClippingId]=[this.id],L.autoActivate===!0&&p(a[b],"mouseover",o));var c=g[this.id].elements;-1===x(a[b],c)&&c.push(a[b])}return this},I.prototype.unclip=function(a){var b=g[this.id];if(b){var c,d=b.elements;a="undefined"==typeof a?d.slice(0):y(a);for(var e=a.length;e--;)if(a.hasOwnProperty(e)&&a[e]&&1===a[e].nodeType){for(c=0;-1!==(c=x(a[e],d,c));)d.splice(c,1);var f=i[a[e].zcClippingId];if(f){for(c=0;-1!==(c=x(this.id,f,c));)f.splice(c,1);0===f.length&&(L.autoActivate===!0&&q(a[e],"mouseover",o),delete a[e].zcClippingId)}}}return this},I.prototype.elements=function(){var a=g[this.id];return a&&a.elements?a.elements.slice(0):[]};var Q=function(a){var b,c,d,e,f,h=[];if(a&&1===a.nodeType&&(b=a.zcClippingId)&&i.hasOwnProperty(b)&&(c=i[b],c&&c.length))for(d=0,e=c.length;e>d;d++)f=g[c[d]].instance,f&&f instanceof I&&h.push(f);return h};L.hoverClass="zeroclipboard-is-hover",L.activeClass="zeroclipboard-is-active",L.trustedOrigins=null,L.allowScriptAccess=null,L.useNoCache=!0,L.moviePath="ZeroClipboard.swf",I.detectFlashSupport=function(){return B("ZeroClipboard.detectFlashSupport",L.debug),H()},I.dispatch=function(a,b){if("string"==typeof a&&a){var d=a.toLowerCase().replace(/^on/,"");if(d)for(var e=c?Q(c):K(),f=0,g=e.length;g>f;f++)R.call(e[f],d,b)}},I.prototype.setHandCursor=function(a){return B("ZeroClipboard.prototype.setHandCursor",L.debug),a="boolean"==typeof a?a:!!a,J(a),L.forceHandCursor=a,this},I.prototype.reposition=function(){return B("ZeroClipboard.prototype.reposition",L.debug),O()},I.prototype.receiveEvent=function(a,b){if(B("ZeroClipboard.prototype.receiveEvent",L.debug),"string"==typeof a&&a){var c=a.toLowerCase().replace(/^on/,"");c&&R.call(this,c,b)}},I.prototype.setCurrent=function(a){return B("ZeroClipboard.prototype.setCurrent",L.debug),I.activate(a),this},I.prototype.resetBridge=function(){return B("ZeroClipboard.prototype.resetBridge",L.debug),I.deactivate(),this},I.prototype.setTitle=function(a){if(B("ZeroClipboard.prototype.setTitle",L.debug),a=a||L.title||c&&c.getAttribute("title")){var b=N(d.bridge);b&&b.setAttribute("title",a)}return this},I.setDefaults=function(a){B("ZeroClipboard.setDefaults",L.debug),I.config(a)},I.prototype.addEventListener=function(a,b){return B("ZeroClipboard.prototype.addEventListener",L.debug),this.on(a,b)},I.prototype.removeEventListener=function(a,b){return B("ZeroClipboard.prototype.removeEventListener",L.debug),this.off(a,b)},I.prototype.ready=function(){return B("ZeroClipboard.prototype.ready",L.debug),d.ready===!0};var R=function(f,g){f=f.toLowerCase().replace(/^on/,"");var h=g&&g.flashVersion&&a(g.flashVersion)||null,i=c,j=!0;switch(f){case"load":if(h){if(!b(h))return R.call(this,"onWrongFlash",{flashVersion:h}),void 0;d.outdated=!1,d.ready=!0,d.version=h}break;case"wrongflash":h&&!b(h)&&(d.outdated=!0,d.ready=!1,d.version=h);break;case"mouseover":r(i,L.hoverClass);break;case"mouseout":L.autoActivate===!0&&I.deactivate();break;case"mousedown":r(i,L.activeClass);break;case"mouseup":s(i,L.activeClass);break;case"datarequested":var k=i.getAttribute("data-clipboard-target"),l=k?document.getElementById(k):null;if(l){var m=l.value||l.textContent||l.innerText;m&&this.setText(m)}else{var n=i.getAttribute("data-clipboard-text");n&&this.setText(n)}j=!1;break;case"complete":G(e)}var o=i,p=[this,g];return P.call(this,f,o,p,j)};"function"==typeof define&&define.amd?define(["require","exports","module"],function(a,b,c){return j=c&&c.id||null,I}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?(k=module.id||null,module.exports=I):window.ZeroClipboard=I}();
	// START OF DATETIMEPICKER
	{
		var smartPhone = (window.orientation != undefined);
		var DateTimePicker = function(element, options) {
			this.id = dpgId++;
			this.init(element, options);
		};
	
		var dateToDate = function(dt) {
			if (typeof dt === 'string') {
				return new Date(dt);
			}
			return dt;
		};
		
		var str2Date4IE8 = function(str) {
			// new Date("2014-03-20") will return NaN in IE8
			// so we have to have a specific method to transfor str 2 date for ie
			// assume the format is yyyy-MM-dd
			var dtstrs = str.split("-");
			return new Date(dtstrs[0],dtstrs[1]-1,dtstrs[2]);
		};
	
		DateTimePicker.prototype = {
			constructor : DateTimePicker,
	
			init: function(element, options) {
				var icon;
				if (!(options.pickTime || options.pickDate))
					throw new Error('Must choose at least one picker');
				this.options = options;
				this.$element = $(element);
				this.language = options.language in dates ? options.language : 'zh-CN';
				this.pickDate = options.pickDate;
				this.pickTime = options.pickTime;
				this.onSelect = options.onSelect;
				this.onClear = options.onClear;
				this.acceptEmpty = options.acceptEmpty;
				this.onChange = options.onChange;
				this.isInput = this.$element.is('input');
				this.component = false;
				if (this.$element.find('.input-append').length || this.$element.find('.input-prepend').length)
					this.component = this.$element.find('.add-on');
				this.format = options.format;
				this.$element.prop('readonly', true);
				if (!this.format) {
					if (this.isInput)
						this.format = this.$element.data('format');
					else
						this.format = this.$element.find('input').data('format');
					if (!this.format) {
						if (this.pickTime && this.pickDate)
							this.format = 'yyyy-MM-dd hh:mm';
						else if (this.pickDate)
							this.format = 'yyyy-MM-dd';
						else if (this.pickTime)
							this.format = 'hh:mm';
					}
				}
				this._compileFormat();
				this.timeIcon = 'icon-time';
				this.dateIcon = 'icon-calendar',
	// if (this.component) {
	//        icon = this.component.find('i');
	//      }
	//      if (this.pickTime) {
	//        if (icon && icon.length) this.timeIcon = icon.data('time-icon');
	//        if (!this.timeIcon) this.timeIcon = 'icon-time';
	//        icon.addClass(this.timeIcon);
	//      }
	//      if (this.pickDate) {
	//        if (icon && icon.length) this.dateIcon = icon.data('date-icon');
	//        if (!this.dateIcon) this.dateIcon = 'icon-calendar';
	//        icon.removeClass(this.timeIcon);
	//        icon.addClass(this.dateIcon);
	//      }
				this.widget = $(getTemplate(this.timeIcon, options.pickDate, options.pickTime, options.pick12HourFormat, options.pickSeconds, options.collapse, options.showAll, options.toolbar));
				this.minViewMode = options.minViewMode || this.$element.data('date-minviewmode') || 0;
				if (typeof this.minViewMode === 'string') {
					switch (this.minViewMode) {
					case 'months':
						this.minViewMode = 1;
						break;
					case 'years':
						this.minViewMode = 2;
						break;
					default:
						this.minViewMode = 0;
						break;
					}
				}
				this.viewMode = options.viewMode || this.$element.data('date-viewmode') || 0;
				if (typeof this.viewMode === 'string') {
					switch (this.viewMode) {
					case 'months':
						this.viewMode = 1;
						break;
					case 'years':
						this.viewMode = 2;
						break;
					default:
						this.viewMode = 0;
						break;
					}
				}
				options.date && this.setDate(options.date);
				if (this.$element.val()) {
					this.setDate(this.$element.val());
				} else {
					this._unset = true;
				}
				this.startViewMode = this.viewMode;
				this.weekStart = options.weekStart || this.$element.data('date-weekstart') || 0;
				this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
				this.setStartDate(options.startDate == undefined ? this.$element.data('date-startdate') : options.startDate);
				this.setEndDate(options.endDate == undefined ? this.$element.data('date-enddate') : options.endDate);
				this.fillDow();
				this.fillMonths();
				this.fillHours();
				this.fillMinutes();
				this.fillSeconds();
				this.update();
				this.showMode();
				this._attachElementEvents();
			},
	
		    show : function(e) {
		    	this.widget.appendTo('body');
				this.widget.show();
				this.height = this.component ? this.component.outerHeight() : this.$element.outerHeight();
				this.place();
				this.$element.trigger({
					type : 'show',
					date : this._date
				});
				this._attachWidgetEvents();
				this._attachDatePickerGlobalEvents();
				if (e) {
					e.stopPropagation();
					e.preventDefault();
				}
			},
			disable : function() {
				this.$element.prop('disabled', true);
				this._detachElementEvents();
			},
			enable : function() {
				this.$element.prop('disabled', false);
				this._attachElementEvents();
			},
		    hide : function(e) {
				if (e && ((this.$element.is(e.target) && e.type != 'mousewheel' && e.type != 'DOMMouseScroll') 
						|| ($('html').is(e.target) && (e.type == 'mousewheel' || e.type == 'DOMMouseScroll')))) {
					return;
				}
				// Ignore event if in the middle of a picker transition
				var collapse = this.widget.find('.collapse');
				for ( var i = 0; i < collapse.length; i++) {
					var collapseData = collapse.eq(i).data('collapse');
					if (collapseData && collapseData.transitioning)
						return;
				}
				this.widget.hide();
				this.widget.remove();
				this.viewMode = this.startViewMode;
				this.showMode();
				this.resetView();
				this.set();
				this.$element.trigger({
					type : 'hide',
					date : this._date
				});
//				this._detachWidgetEvents();
				this._detachDatePickerGlobalEvents();
			},
			
			hideAndCheckInput : function(e) {
				if(this.widget.find(e.target).length || this.widget.is(e.target)){
					return;
				}
				e.stopPropagation();
				if (e && this.$element.is(e.target)) {
					return;
				}
				var nDate = this._newdate && this._newdate.getTime(),
					oDate = this._date && this._date.getTime();
				if(this._newdate && nDate != oDate){
					this._date = this._newdate;
					this._newdate = '';
					this.set();
					this.notifyChange();
				}
				
				// Ignore event if in the middle of a picker transition
				var collapse = this.widget.find('.collapse');
				for ( var i = 0; i < collapse.length; i++) {
					var collapseData = collapse.eq(i).data('collapse');
					if (collapseData && collapseData.transitioning)
						return;
				}
				this.widget.hide();
				this.widget.remove();
				this.viewMode = this.startViewMode;
				this.showMode();
				this.resetView();
				var value = this.$element.val(), 
				date = this.parseDate(value);
				if(date == null && value == ''){
					this.setDate(date);
					this.notifyChange();
				}
				this._detachDatePickerGlobalEvents();
				
			},
			
		    set : function() {
				var formatted = '';
				if (!this._unset)
					formatted = this.formatDate(this._date);
				if (!this.isInput) {
					if (this.component) {
						var input = this.$element.find('input');
						input.val(formatted);
						this._resetMaskPos(input);
					}
					this.$element.data('date', formatted);
				} else {
					this.$element.val(formatted);
					this._resetMaskPos(this.$element);
				}
			},
	
		    setValue : function(newDate) {
				if (!newDate) {
					this._unset = true;
					this.$element.val('');
					return;
				} else {
					this._unset = false;
				}
				if (typeof newDate === 'string') {
					this._date = this.parseDate(newDate);
				} else if (newDate) {
					this._date = new Date(newDate);
				}
				this.set();
				this.viewDate = new Date(this._date.getFullYear(), this._date.getMonth(), 1, 0, 0, 0, 0);
				this.fillDate();
				this.fillTime();
			},
		    getDate : function() {
				if (this._unset)
					return '';
				return new Date(this._date.valueOf());
			},
			getValue : function() {
				if (this._unset)
					return '';
				return this.formatDate(this._date);
			},
			setDate : function(date) {
				if (!date)
					this.setValue(null);
				else
					this.setValue(date.valueOf());
			},
	
		    setStartDate : function(date) {
				if (date instanceof Date) {
					this.startDate = date;
				} else if (typeof date === 'string') {
					this.startDate = new Date(date);
					if(!this.startDate.getFullYear()){
						this.startDate = str2Date4IE8(date);
					}
					if (!this.startDate.getFullYear()) {
						this.startDate = -Infinity;
					}
				} else if (typeof date === 'number') {
					var dt = new Date();
					this.startDate = new Date().setDate(dt.getDate() + date);
				} else {
					this.startDate = -Infinity;
				}
				if (this.viewDate) {
					this.update();
				}
			},
	
		    setEndDate : function(date) {
				if (date instanceof Date) {
					this.endDate = date;
				} else if (typeof date === 'string') {
					this.endDate = new Date(date);
					if(!this.endDate.getFullYear()){
						this.endDate = str2Date4IE8(date);
					}
					if (!this.endDate.getFullYear()) {
						this.endDate = Infinity;
					}
				} else if (typeof date === 'number') {
					var dt = new Date();
					this.endDate = new Date().setDate(dt.getDate() + date);
				} else {
					this.endDate = Infinity;
				}
				if (this.viewDate) {
//					if (this.endDate instanceof Date) {
//						var a = this.endDate, today = new Date();
//						a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
//						today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//						this.widget.find('.ui-dtp-today').prop('disabled', a.getTime()<today.getTime());
//					}else{
//						this.widget.find('.ui-dtp-today').prop('disabled', false);
//					}
					this.update();
				}
			},
	
		    getLocalDate : function() {
				if (this._unset)
					return null;
				var d = this._date;
				return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d
						.getMilliseconds());
			},
	
		    setLocalDate : function(localDate) {
				if (!localDate)
					this.setValue(null);
				else
					this.setValue(new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate
							.getMinutes(), localDate.getSeconds(), localDate.getMilliseconds()));
			},
	
		    place : function() {
				var position = 'absolute';
				var offset = this.component ? this.component.offset() : this.$element.offset();
				this.width = this.component ? this.component.outerWidth() : this.$element.outerWidth();
				
				var $window = $(window);
	
				if (this.options.width != undefined) {
					this.widget.width(this.options.width);
				}
	
				if (this.options.orientation == 'left') {
					this.widget.addClass('left-oriented');
					offset.left = offset.left - this.widget.width() + 20;
				}
	
				if (this._isInFixed()) {
					position = 'fixed';
					offset.top -= $window.scrollTop();
					offset.left -= $window.scrollLeft();
				}
	
				if ($window.width() < offset.left + this.widget.outerWidth()) {
					offset.right = $window.width() - offset.left - this.width;
					offset.left = 'auto';
					this.widget.addClass('pull-right');
				} else {
					offset.right = 'auto';
					this.widget.removeClass('pull-right');
				}
				if ($window.height() < offset.top + this.$element.outerHeight() + this.widget.outerHeight()) {
					offset.top = offset.top - this.widget.outerHeight() - 1;
					this.widget.addClass('pull-top').removeClass('pull-bottom');
				} else {
					offset.top = offset.top + this.height + 1;
					this.widget.removeClass('pull-top').addClass('pull-bottom');
				}
				
				this.widget.css({
					position : position,
					top : offset.top,
					left : offset.left,
					right : offset.right
				});
			},
	
		    notifyChange : function() {
				this.onSelect && (this.acceptEmpty || this.getValue()) && this.onSelect(this.getDate(),this.getValue());
//				this.$element.trigger('change');
				this.$element.trigger('changeDate');
//				this.$element.trigger({
//					type : 'changeDate',
//					date : this.getDate(),
//					localDate : this.getLocalDate()
//				});
			},
			makeChange : function() {
				this.onSelect && (this.acceptEmpty || this.getValue()) && this.onSelect(this.getDate(),this.getValue());
				this.$element.trigger('changeDate');
			},
	
		    update : function(newDate) {
				var dateStr = newDate;
				if (!dateStr) {
					if (this.isInput) {
						dateStr = this.$element.val();
					} else {
						dateStr = this.$element.find('input').val();
					}
					if (dateStr) {
						this._date = this.parseDate(dateStr);
					}
					if (!this._date) {
						var tmp = new Date();
						this._date = new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate(), tmp.getHours(), tmp.getMinutes(), tmp.getSeconds(), tmp
								.getMilliseconds());
					}
				}
				this.viewDate = new Date(this._date.getFullYear(), this._date.getMonth(), 1, 0, 0, 0, 0);
				this.fillDate();
				this.fillTime();
			},
	
		    fillDow : function() {
				var dowCnt = this.weekStart;
				var html = $('<tr>');
				while (dowCnt < this.weekStart + 7) {
					html.append('<th class="dow">' + dates[this.language].daysMin[(dowCnt++) % 7] + '</th>');
				}
				this.widget.find('.datepicker-days thead').append(html);
			},
	
		    fillMonths : function() {
				var html = '';
				var i = 0;
				while (i < 12) {
					html += '<span class="month">' + dates[this.language].monthsShort[i++] + '</span>';
				}
				this.widget.find('.datepicker-months td').append(html);
			},
	
			fillDate: function() {
				var year = this.viewDate.getFullYear();
				var month = this.viewDate.getMonth();
				var currentDate = new Date(this._date.getFullYear(), this._date.getMonth(), this._date.getDate(), 0, 0, 0, 0);
				var startYear = typeof this.startDate === 'object' ? this.startDate.getFullYear() : -Infinity;
				var startMonth = typeof this.startDate === 'object' ? this.startDate.getMonth() : -1;
				var endYear = typeof this.endDate === 'object' ? this.endDate.getFullYear() : Infinity;
				var endMonth = typeof this.endDate === 'object' ? this.endDate.getMonth() : 12;
	
				this.widget.find('.datepicker-days').find('.disabled').removeClass('disabled');
				this.widget.find('.datepicker-months').find('.disabled').removeClass('disabled');
				this.widget.find('.datepicker-years').find('.disabled').removeClass('disabled');
	
				this.widget.find('.datepicker-days th:eq(1)').text(dates[this.language].months[month] + ' ' + year);
	
				var prevMonth = new Date(year, month - 1, 28, 0, 0, 0, 0);
				var day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
				prevMonth.setDate(day);
				prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7) % 7);
				if ((year == startYear && month <= startMonth) || year < startYear) {
					this.widget.find('.datepicker-days th:eq(0)').addClass('disabled');
				}
				if ((year == endYear && month >= endMonth) || year > endYear) {
					this.widget.find('.datepicker-days th:eq(2)').addClass('disabled');
				}
	
				var nextMonth = new Date(prevMonth.valueOf());
				nextMonth.setDate(nextMonth.getDate() + 42);
				nextMonth = nextMonth.valueOf();
				var html = [];
				var row;
				var clsName;
				while (prevMonth.valueOf() < nextMonth) {
					if (prevMonth.getDay() === this.weekStart) {
						row = $('<tr>');
						html.push(row);
					}
					clsName = '';
					if (prevMonth.getFullYear() < year || (prevMonth.getFullYear() == year && prevMonth.getMonth() < month)) {
						clsName += ' old';
					} else if (prevMonth.getFullYear() > year || (prevMonth.getFullYear() == year && prevMonth.getMonth() > month)) {
						clsName += ' new';
					}
					if (prevMonth.valueOf() === currentDate.valueOf()) {
						clsName += ' active';
					}
					if ((prevMonth.valueOf() + 86400000) <= this.startDate) {
						clsName += ' disabled';
					}
					if (prevMonth.valueOf() > this.endDate) {
						clsName += ' disabled';
					}
					row.append('<td class="day' + clsName + '">' + prevMonth.getDate() + '</td>');
					prevMonth.setDate(prevMonth.getDate() + 1);
				}
				this.widget.find('.datepicker-days tbody').empty().append(html);
				var currentYear = this._date.getFullYear();
	
				var months = this.widget.find('.datepicker-months').find('th:eq(1)').text(year).end().find('span').removeClass('active');
				if (currentYear === year) {
					months.eq(this._date.getMonth()).addClass('active');
				}
				if (currentYear - 1 < startYear) {
					this.widget.find('.datepicker-months th:eq(0)').addClass('disabled');
				}
				if (currentYear + 1 > endYear) {
					this.widget.find('.datepicker-months th:eq(2)').addClass('disabled');
				}
				for ( var i = 0; i < 12; i++) {
					if ((year == startYear && startMonth > i) || (year < startYear)) {
						$(months[i]).addClass('disabled');
					} else if ((year == endYear && endMonth < i) || (year > endYear)) {
						$(months[i]).addClass('disabled');
					}
				}
	
				html = '';
				year = parseInt(year / 10, 10) * 10;
				var yearCont = this.widget.find('.datepicker-years').find('th:eq(1)').text(year + '-' + (year + 9)).end().find('td');
				this.widget.find('.datepicker-years').find('th').removeClass('disabled');
				if (startYear > year) {
					this.widget.find('.datepicker-years').find('th:eq(0)').addClass('disabled');
				}
				if (endYear < year + 9) {
					this.widget.find('.datepicker-years').find('th:eq(2)').addClass('disabled');
				}
				year -= 1;
				for ( var i = -1; i < 11; i++) {
					html += '<span class="year' + (i === -1 || i === 10 ? ' old' : '') + (currentYear === year ? ' active' : '')
							+ ((year < startYear || year > endYear) ? ' disabled' : '') + '">' + year + '</span>';
					year += 1;
				}
				yearCont.html(html);
				
				if (this.startDate instanceof Date) {
					var a = this.startDate, today = new Date();
					a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
					today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
					this.widget.find('.ui-dtp-today').prop('disabled', a.getTime()>today.getTime());
				}else if(this.endDate instanceof Date){
					var a = this.endDate, today = new Date();
					a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
					today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
					this.widget.find('.ui-dtp-today').prop('disabled', a.getTime()<today.getTime());
				}else{
					this.widget.find('.ui-dtp-today').prop('disabled', false);
				}
			},
	
		    fillHours : function() {
				var table = this.widget.find('.timepicker .timepicker-hours table');
				table.parent().hide();
				var html = '';
				if (this.options.pick12HourFormat) {
					var current = 1;
					for ( var i = 0; i < 3; i += 1) {
						html += '<tr>';
						for ( var j = 0; j < 4; j += 1) {
							var c = current.toString();
							html += '<td class="hour">' + padLeft(c, 2, '0') + '</td>';
							current++;
						}
						html += '</tr>';
					}
				} else {
					var current = 0;
					for ( var i = 0; i < 6; i += 1) {
						html += '<tr>';
						for ( var j = 0; j < 4; j += 1) {
							var c = current.toString();
							html += '<td class="hour">' + padLeft(c, 2, '0') + '</td>';
							current++;
						}
						html += '</tr>';
					}
				}
				table.html(html);
			},
	
		    fillMinutes : function() {
				var table = this.widget.find('.timepicker .timepicker-minutes table');
				table.parent().hide();
				var html = '';
				var current = 0;
				for ( var i = 0; i < 5; i++) {
					html += '<tr>';
					for ( var j = 0; j < 4; j += 1) {
						var c = current.toString();
						html += '<td class="minute">' + padLeft(c, 2, '0') + '</td>';
						current += 3;
					}
					html += '</tr>';
				}
				table.html(html);
			},
	
		    fillSeconds : function() {
				var table = this.widget.find('.timepicker .timepicker-seconds table');
				table.parent().hide();
				var html = '';
				var current = 0;
				for ( var i = 0; i < 5; i++) {
					html += '<tr>';
					for ( var j = 0; j < 4; j += 1) {
						var c = current.toString();
						html += '<td class="second">' + padLeft(c, 2, '0') + '</td>';
						current += 3;
					}
					html += '</tr>';
				}
				table.html(html);
			},
	
		    fillTime : function() {
				if (!this._date)
					return;
				var timeComponents = this.widget.find('.timepicker span[data-time-component]');
				var table = timeComponents.closest('table');
				var is12HourFormat = this.options.pick12HourFormat;
				var hour = this._date.getHours();
				var period = 'AM';
				if (is12HourFormat) {
					if (hour >= 12)
						period = 'PM';
					if (hour === 0)
						hour = 12;
					else if (hour != 12)
						hour = hour % 12;
					this.widget.find('.timepicker [data-action=togglePeriod]').text(period);
				}
				hour = padLeft(hour.toString(), 2, '0');
				var minute = padLeft(this._date.getMinutes().toString(), 2, '0');
				var second = padLeft(this._date.getSeconds().toString(), 2, '0');
				timeComponents.filter('[data-time-component=hours]').text(hour);
				timeComponents.filter('[data-time-component=minutes]').text(minute);
				timeComponents.filter('[data-time-component=seconds]').text(second);
			},
	
		    click : function(e) {
				e.stopPropagation();
				e.preventDefault();
				this._unset = false;
				var target = $(e.target).closest('span, td, th');
				if (target.length === 1) {
					if (!target.is('.disabled')) {
						switch (target[0].nodeName.toLowerCase()) {
						case 'th':
							switch (target[0].className) {
							case 'switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var vd = this.viewDate;
								var navFnc = DPGlobal.modes[this.viewMode].navFnc;
								var step = DPGlobal.modes[this.viewMode].navStep;
								if (target[0].className === 'prev')
									step = step * -1;
								vd['set' + navFnc](vd['get' + navFnc]() + step);
								this.fillDate();
								this.set();
								break;
							}
							break;
						case 'span':
							if (target.is('.month')) {
								var month = target.parent().find('span').index(target);
								this.viewDate.setMonth(month);
							} else {
								var year = parseInt(target.text(), 10) || 0;
								this.viewDate.setFullYear(year);
							}
							if (this.viewMode !== 0) {
								this._newdate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate(), this._date
										.getHours(), this._date.getMinutes(), this._date.getSeconds(), this._date.getMilliseconds());
//								this.notifyChange();
							}
							this.showMode(-1);
							this.fillDate();
//							this.set();
							break;
						case 'td':
							if (target.is('.day')) {
								var day = parseInt(target.text(), 10) || 1;
								var month = this.viewDate.getMonth();
								var year = this.viewDate.getFullYear();
								if (target.is('.old')) {
									if (month === 0) {
										month = 11;
										year -= 1;
									} else {
										month -= 1;
									}
								} else if (target.is('.new')) {
									if (month == 11) {
										month = 0;
										year += 1;
									} else {
										month += 1;
									}
								}
								this._date = new Date(year, month, day, this._date.getHours(), this._date.getMinutes(), this._date.getSeconds(),
										this._date.getMilliseconds());
								this.viewDate = new Date(year, month, Math.min(28, day), 0, 0, 0, 0);
								this.fillDate();
								this.set();
								this.notifyChange();
								if (this.pickDate && !this.pickTime) {
									this.hide();
								}
							}
							break;
						}
					}
				}
			},
	
		    actions : {
				incrementHours : function(e) {
					this._date.setHours(this._date.getHours() + 1);
				},
	
				incrementMinutes : function(e) {
					this._date.setMinutes(this._date.getMinutes() + 1);
				},
	
				incrementSeconds : function(e) {
					this._date.setSeconds(this._date.getSeconds() + 1);
				},
	
				decrementHours : function(e) {
					this._date.setHours(this._date.getHours() - 1);
				},
	
				decrementMinutes : function(e) {
					this._date.setMinutes(this._date.getMinutes() - 1);
				},
	
				decrementSeconds : function(e) {
					this._date.setSeconds(this._date.getSeconds() - 1);
				},
	
				togglePeriod : function(e) {
					var hour = this._date.getHours();
					if (hour >= 12)
						hour -= 12;
					else
						hour += 12;
					this._date.setHours(hour);
				},
	
				showPicker : function() {
					this.widget.find('.timepicker > div:not(.timepicker-picker)').hide();
					this.widget.find('.timepicker .timepicker-picker').show();
				},
	
				showHours : function() {
					this.widget.find('.timepicker .timepicker-picker').hide();
					this.widget.find('.timepicker .timepicker-hours').show();
				},
	
				showMinutes : function() {
					this.widget.find('.timepicker .timepicker-picker').hide();
					this.widget.find('.timepicker .timepicker-minutes').show();
				},
	
				showSeconds : function() {
					this.widget.find('.timepicker .timepicker-picker').hide();
					this.widget.find('.timepicker .timepicker-seconds').show();
				},
	
				selectHour : function(e) {
					var tgt = $(e.target);
					var value = parseInt(tgt.text(), 10);
					if (this.options.pick12HourFormat) {
						var current = this._date.getHours();
						if (current >= 12) {
							if (value != 12)
								value = (value + 12) % 24;
						} else {
							if (value === 12)
								value = 0;
							else
								value = value % 12;
						}
					}
					this._date.setHours(value);
					this.actions.showPicker.call(this);
				},
	
				selectMinute : function(e) {
					var tgt = $(e.target);
					var value = parseInt(tgt.text(), 10);
					this._date.setMinutes(value);
					this.actions.showPicker.call(this);
				},
	
				selectSecond : function(e) {
					var tgt = $(e.target);
					var value = parseInt(tgt.text(), 10);
					this._date.setSeconds(value);
					this.actions.showPicker.call(this);
				}
			},
	
		    doAction : function(e) {
				e.stopPropagation();
				e.preventDefault();
				if (!this._date)
					this._date = new Date(1970, 0, 0, 0, 0, 0, 0);
				var action = $(e.currentTarget).data('action');
				var rv = this.actions[action].apply(this, arguments);
				this._unset = false;
				this.set();
				this.fillTime();
				this.notifyChange();
				return rv;
			},
	
		    stopEvent : function(e) {
				e.stopPropagation();
				e.preventDefault();
			},
	
			// part of the following code was taken from
		    keydown : function(e) {
				var self = this, k = e.which, input = $(e.target);
				if (k == 8 || k == 46) {
					// backspace and delete cause the maskPosition
					// to be recalculated
					setTimeout(function() {
						self._resetMaskPos(input);
					});
				}
			},
	
		    keypress : function(e) {
				var k = e.which;
				if (k == 8 || k == 46) {
					// For those browsers which will trigger
					// keypress on backspace/delete
					return;
				}
				var input = $(e.target);
				var c = String.fromCharCode(k);
				var val = input.val() || '';
				val += c;
				var mask = this._mask[this._maskPos];
				if (!mask) {
					return false;
				}
				if (mask.end != val.length) {
					return;
				}
				if (!mask.pattern.test(val.slice(mask.start))) {
					val = val.slice(0, val.length - 1);
					while ((mask = this._mask[this._maskPos]) && mask.character) {
						val += mask.character;
						// advance mask position past static
						// part
						this._maskPos++;
					}
					val += c;
					if (mask.end != val.length) {
						input.val(val);
						return false;
					} else {
						if (!mask.pattern.test(val.slice(mask.start))) {
							input.val(val.slice(0, mask.start));
							return false;
						} else {
							input.val(val);
							this._maskPos++;
							return false;
						}
					}
				} else {
					this._maskPos++;
				}
			},
	
		    change : function(e) {
				var input = $(e.target);
				var val = input.val();
				if (this._formatPattern.test(val)) {
					this.update();
					this.setValue(this._date.getTime());
					this.makeChange();
					this.set();
				} else if (val && $.trim(val)) {
					this.setValue(this._date.getTime());
					if (this._date)
						this.set();
					else
						input.val('');
				} else {
					if (this._date) {
						this.setValue(null);
						// unset the date when the input is
						// erased
						this.makeChange();
						this._unset = true;
					}
				}
				this._resetMaskPos(input);
			},
	
			resetView : function() {
				if (this.pickDate && this.pickTime) {
					this.widget.find('.datepicker').addClass('in');
					this.widget.find('.picker-switch .icon-calendar').removeClass('icon-calendar').addClass('icon-time');
					this.widget.find('.timepicker').removeClass('in');
				}
			},
			
		    showMode : function(dir) {
				if (dir) {
					this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
				}
				this.widget.find('.datepicker > div').hide().filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName).show();
			},
	
		    destroy : function() {
				this._detachDatePickerEvents();
				this._detachDatePickerGlobalEvents();
				this.widget.remove();
				this.$element.removeData('datetimepicker');
//				this.component.removeData('datetimepicker');
			},
	
		    formatDate : function(d) {
		    	if (!this.pickTime) {
		    		d.setMinutes(0);
		    		d.setSeconds(0);
		    		d.setHours(0);
		    		d.setMilliseconds(0);
				}
				return this.format.replace(formatReplacer, function(match) {
					var methodName, property, rv, len = match.length;
					if (match === 'ms')
						len = 1;
					property = dateFormatComponents[match].property;
					if (property === 'Hours12') {
						rv = d.getHours();
						if (rv === 0)
							rv = 12;
						else if (rv !== 12)
							rv = rv % 12;
					} else if (property === 'Period12') {
						if (d.getHours() >= 12)
							return 'PM';
						else
							return 'AM';
					} else {
						methodName = 'get' + property;
						rv = d[methodName]();
					}
					if (methodName === 'getMonth')
						rv = rv + 1;
					if (methodName === 'getYear')
						rv = rv + 1900 - 2000;
					return padLeft(rv.toString(), len, '0');
				});
			},
	
		    parseDate : function(str) {
				var match, i, property, methodName, value, parsed = {};
				if (!(match = this._formatPattern.exec(str)))
					return null;
				for (i = 1; i < match.length; i++) {
					property = this._propertiesByIndex[i];
					if (!property)
						continue;
					value = match[i];
					if (/^\d+$/.test(value))
						value = parseInt(value, 10);
					parsed[property] = value;
				}
				return this._finishParsingDate(parsed);
			},
	
		    _resetMaskPos : function(input) {
				var val = input.val();
				for ( var i = 0; i < this._mask.length; i++) {
					if (this._mask[i].end > val.length) {
						// If the mask has ended then jump to
						// the next
						this._maskPos = i;
						break;
					} else if (this._mask[i].end === val.length) {
						this._maskPos = i + 1;
						break;
					}
				}
			},
	
		    _finishParsingDate : function(parsed) {
				var year, month, date, hours, minutes, seconds, milliseconds;
				year = parsed.FullYear;
				if (parsed.Year)
					year = 2000 + parsed.Year;
				if (!year)
					year = 1970;
				if (parsed.Month)
					month = parsed.Month - 1;
				else
					month = 0;
				date = parsed.Date || 1;
				hours = parsed.Hours || 0;
				minutes = parsed.Minutes || 0;
				seconds = parsed.Seconds || 0;
				milliseconds = parsed.Milliseconds || 0;
				if (parsed.Hours12) {
					hours = parsed.Hours12;
				}
				if (parsed.Period12) {
					if (/pm/i.test(parsed.Period12)) {
						if (hours != 12)
							hours = (hours + 12) % 24;
					} else {
						hours = hours % 12;
					}
				}
				return new Date(year, month, date, hours, minutes, seconds, milliseconds);
			},
	
		    _compileFormat : function() {
				var match, component, components = [], mask = [], str = this.format, propertiesByIndex = {}, i = 0, pos = 0;
				while (match = formatComponent.exec(str)) {
					component = match[0];
					if (component in dateFormatComponents) {
						i++;
						propertiesByIndex[i] = dateFormatComponents[component].property;
						components.push('\\s*' + dateFormatComponents[component].getPattern(this) + '\\s*');
						mask.push({
							pattern : new RegExp(dateFormatComponents[component].getPattern(this)),
							property : dateFormatComponents[component].property,
							start : pos,
							end : pos += component.length
						});
					} else {
						components.push(escapeRegExp(component));
						mask.push({
							pattern : new RegExp(escapeRegExp(component)),
							character : component,
							start : pos,
							end : ++pos
						});
					}
					str = str.slice(component.length);
				}
				this._mask = mask;
				this._maskPos = 0;
				this._formatPattern = new RegExp('^\\s*' + components.join('') + '\\s*$');
				this._propertiesByIndex = propertiesByIndex;
			},
			_attachElementEvents : function() {
				var self = this;
				if (this.isInput) {
					this.$element.on({
						'click' : $.proxy(this.show, this),
						'change' : $.proxy(this.change, this)
					});
					if (this.options.maskInput) {
						this.$element.on({
							'keydown' : $.proxy(this.keydown, this),
							'keypress' : $.proxy(this.keypress, this)
						});
					}
				} else {
					this.$element.on({
						'change' : $.proxy(this.change, this)
					}, 'input');
					if (this.options.maskInput) {
						this.$element.on({
							'keydown' : $.proxy(this.keydown, this),
							'keypress' : $.proxy(this.keypress, this)
						}, 'input');
					}
					if (this.component) {
						this.component.on('click', $.proxy(this.show, this));
					} else {
						this.$element.on('click', $.proxy(this.show, this));
					}
				}
			
			},
			reset : function(){
				this.startDate = -Infinity;
				this.endDate = Infinity;
				this.setDate(new Date());
				this.setDate(null);
				this.onClear && this.onClear();
				this.hide();
			},
			setToday : function() {
				this.setDate(new Date());
				this.notifyChange();
				this.hide();
			},
			clearDate : function() {
				this.setDate(null);
				this.onClear && this.onClear();
				this.$element.trigger('change');
				this.hide();
			},
			_attachWidgetEvents : function() {
				var self = this;
				// this handles date picker clicks
				this.widget.on('click', '.datepicker *', $.proxy(this.click, this));
				// this handles time picker clicks
				this.widget.on('click', '[data-action]', $.proxy(this.doAction, this));
				this.widget.on('click', '.ui-dtp-today', $.proxy(this.setToday, this));
				this.widget.on('click', '.ui-dtp-clear', $.proxy(this.clearDate, this));
//				this.widget.on('mousedown', $.proxy(this.stopEvent, this));
				if (this.pickDate && this.pickTime) {
					this.widget.on('click.togglePicker', '.accordion-toggle', function(e) {
						e.stopPropagation();
						var $this = $(this);
						var $parent = $this.closest('ul');
						var expanded = $parent.find('.collapse.in');
						var closed = $parent.find('.collapse:not(.in)');
						
						if (expanded && expanded.length) {
							var collapseData = expanded.data('collapse');
							if (collapseData && collapseData.transitioning)
								return;
							// expanded.collapse('hide');
							// closed.collapse('show');
							expanded.removeClass('in');
							closed.addClass('in');
							$this.find('i').toggleClass(self.timeIcon + ' ' + self.dateIcon);
							self.$element.find('.add-on i').toggleClass(self.timeIcon + ' ' + self.dateIcon);
						}
					});
				}
			},
		    _attachDatePickerEvents : function() {
		    	this._attachElementEvents();
		    	this._attachWidgetEvents();
		    },
		    _attachDatePickerGlobalEvents : function(e) {
		    	$(document).on('DOMMouseScroll.datetimepicker' + this.id, $.proxy(this.hideAndCheckInput, this));
		    	$(document).on('mousewheel.datetimepicker' + this.id, $.proxy(this.hideAndCheckInput, this));
				$(window).on('resize.datetimepicker' + this.id, $.proxy(this.place, this));
				// if (this.isInput) {
				$(document).on('mousedown.datetimepicker' + this.id, $.proxy(this.hideAndCheckInput, this));
				// }
			},
			_detachElementEvents : function() {
				if (this.isInput) {
					this.$element.off({
						'click' : this.show,
						'change' : this.change
					});
					if (this.options.maskInput) {
						this.$element.off({
							'keydown' : this.keydown,
							'keypress' : this.keypress
						});
					}
				} else {
					this.$element.off({
						'change' : this.change
					}, 'input');
					if (this.options.maskInput) {
						this.$element.off({
							'keydown' : this.keydown,
							'keypress' : this.keypress
						}, 'input');
					}
					if (this.component) {
						this.component.off('click', this.show);
					} else {
						this.$element.off('click', this.show);
					}
				}
			},
			_detachWidgetEvents : function() {
				this.widget.off('click', '.datepicker *', this.click);
				this.widget.off('click', '[data-action]');
//				this.widget.off('mousedown', this.stopEvent);
				if (this.pickDate && this.pickTime) {
					this.widget.off('click.togglePicker');
				}
			},
		    _detachDatePickerEvents : function() {
				this._detachElementEvents();
				this._detachWidgetEvents();
			},
	
		    _detachDatePickerGlobalEvents : function() {
		    	$(document).off('DOMMouseScroll.datetimepicker' + this.id);
		    	$(document).off('mousewheel.datetimepicker' + this.id);
				$(window).off('resize.datetimepicker' + this.id);
	//			if (!this.isInput) {
					$(document).off('mousedown.datetimepicker' + this.id);
	//			}
			},
	
		    _isInFixed : function() {
				if (this.$element) {
					var parents = this.$element.parents();
					var inFixed = false;
					for ( var i = 0; i < parents.length; i++) {
						if ($(parents[i]).css('position') == 'fixed') {
							inFixed = true;
							break;
						}
					}
					;
					return inFixed;
				} else {
					return false;
				}
			}
		};
	
		$.fn.datetimepicker = function(option, val) {
			var methodReturn, //
			$set = this.each(function() {
				var $this = $(this), data = $this.data('datetimepicker'), options = typeof option === 'object' && option;
				if (!data) {
					$this.data('datetimepicker', (data = new DateTimePicker(this, $.extend({}, $.fn.datetimepicker.defaults, options))));
				}
				if (typeof option === 'string')
					methodReturn = data[option](val);
			});
			return (methodReturn === undefined) ? $set : methodReturn;
		};
	
		$.fn.datetimepicker.defaults = {
			maskInput : false,
			pickDate : true,
			pickTime : false,
			pick12HourFormat : false,
			pickSeconds : false,
			startDate : -Infinity,
			endDate : Infinity,
			collapse : true,
			showAll : false,
			toolbar : true,
			acceptEmpty : false
		};
		$.fn.datetimepicker.Constructor = DateTimePicker;
		var dpgId = 0;
		var dates = $.fn.datetimepicker.dates = {
			'zh-CN' : {
				days : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ],
				daysShort : [ "周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日" ],
				daysMin : [ "日", "一", "二", "三", "四", "五", "六", "日" ],
				months : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
				monthsShort : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
				today : "今日"
			}
		};
		var dateFormatComponents = {
		    dd: {property: 'Date', getPattern: function() { return '(0?[1-9]|[1-2][0-9]|3[0-1])\\b';}},
		    MM: {property: 'Month', getPattern: function() {return '(0?[1-9]|1[0-2])\\b';}},
		    yy: {property: 'Year', getPattern: function() {return '(\\d{2})\\b';}},
		    yyyy: {property: 'FullYear', getPattern: function() {return '(\\d{4})\\b';}},
		    hh: {property: 'Hours', getPattern: function() {return '(0?[0-9]|1[0-9]|2[0-3])\\b';}},
		    mm: {property: 'Minutes', getPattern: function() {return '(0?[0-9]|[1-5][0-9])\\b';}},
		    ss: {property: 'Seconds', getPattern: function() {return '(0?[0-9]|[1-5][0-9])\\b';}},
		    ms: {property: 'Milliseconds', getPattern: function() {return '([0-9]{1,3})\\b';}},
		    HH: {property: 'Hours12', getPattern: function() {return '(0?[1-9]|1[0-2])\\b';}},
		    PP: {property: 'Period12', getPattern: function() {return '(AM|PM|am|pm|Am|aM|Pm|pM)\\b';}}
		};
	
		var keys = [];
		for ( var k in dateFormatComponents)
			keys.push(k);
		keys[keys.length - 1] += '\\b';
		keys.push('.');
	
		var formatComponent = new RegExp(keys.join('\\b|'));
		keys.pop();
		var formatReplacer = new RegExp(keys.join('\\b|'), 'g');
	
		function escapeRegExp(str) {
			// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
			return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		}
	
		function padLeft(s, l, c) {
			if (l < s.length)
				return s;
			else
				return Array(l - s.length + 1).join(c || ' ') + s;
		}
	
		function getTemplate(timeIcon, pickDate, pickTime, is12Hours, showSeconds, collapse, showAll, toolbar) {
			if (pickDate && pickTime) {
				return (
			        '<div class="ui-datetimepicker-widget">' +
			          '<ul>' +
			            '<li' + (collapse ? ' class="datepicker collapse in"' : '') + '>' +
			                DPGlobal.template +
			            '</li>' +
			            '<li class="picker-switch accordion-toggle'+(showAll ? ' hide' : '') + '"><a><i class="' + timeIcon + '"></i></a></li>' +
 			            '<li' + (collapse ? ' class="timepicker collapse' + (showAll ? ' in timepicker-top' : '') + '"' : '') + '>' +
			                TPGlobal.getTemplate(is12Hours, showSeconds) +
			            '</li>' +
			          '</ul>' +
			        '</div>'
				);
			} else if (pickTime) {
		      return (
		        '<div class="ui-datetimepicker-widget">' +
		          '<div class="timepicker">' +
		            TPGlobal.getTemplate(is12Hours, showSeconds) +
		          '</div>' +
		        '</div>'
		      );
			} else {
		      return (
		        '<div class="ui-datetimepicker-widget">' +
		          '<div class="datepicker">' +
		            DPGlobal.template +
		          '</div>' + 
		          (toolbar ? 
		          '<div class="ui-dtp-bar clearfix">' +
		          	'<button class="ui-dtp-today">今天</button>' +
		          	'<button class="ui-dtp-clear">清除</button>' +
		          '</div>' : '' )+
		        '</div>' 
		      );
			}
		}
	
		var DPGlobal = {
		    modes: [
		      {
		      clsName: 'days',
		      navFnc: 'Month',
		      navStep: 1
		    },
		    {
		      clsName: 'months',
		      navFnc: 'FullYear',
		      navStep: 1
		    },
		    {
		      clsName: 'years',
		      navFnc: 'FullYear',
		      navStep: 10
		    }],
		    isLeapYear: function (year) {
		      return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		    },
		    getDaysInMonth: function (year, month) {
		      return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		    },
		    headTemplate:
		      '<thead>' +
		        '<tr>' +
		          '<th class="prev">&lsaquo;</th>' +
		          '<th colspan="5" class="switch"></th>' +
		          '<th class="next">&rsaquo;</th>' +
		        '</tr>' +
		      '</thead>',
		    contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
		};
		DPGlobal.template =
		    '<div class="datepicker-days">' +
		      '<table class="table-condensed">' +
		        DPGlobal.headTemplate +
		        '<tbody></tbody>' +
		      '</table>' +
		    '</div>' +
		    '<div class="datepicker-months">' +
		      '<table class="table-condensed">' +
		        DPGlobal.headTemplate +
		        DPGlobal.contTemplate+
		      '</table>'+
		    '</div>'+
		    '<div class="datepicker-years">'+
		      '<table class="table-condensed">'+
		        DPGlobal.headTemplate+
		        DPGlobal.contTemplate+
		      '</table>'+
		    '</div>';
		var TPGlobal = {
		    hourTemplate: '<span data-action="showHours" data-time-component="hours" class="timepicker-hour"></span>',
		    minuteTemplate: '<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>',
		    secondTemplate: '<span data-action="showSeconds" data-time-component="seconds" class="timepicker-second"></span>'
		};
		TPGlobal.getTemplate = function(is12Hours, showSeconds) {
			return (
		    '<div class="timepicker-picker">' +
		      '<table class="table-condensed"' +
		        (is12Hours ? ' data-hour-format="12"' : '') +
		        '>' +
		        '<tr>' +
		          '<td><a href="#" class="btn" data-action="incrementHours"><i class="icon-chevron-up"></i></a></td>' +
		          '<td class="separator"></td>' +
		          '<td><a href="#" class="btn" data-action="incrementMinutes"><i class="icon-chevron-up"></i></a></td>' +
		          (showSeconds ?
		          '<td class="separator"></td>' +
		          '<td><a href="#" class="btn" data-action="incrementSeconds"><i class="icon-chevron-up"></i></a></td>': '')+
		          (is12Hours ? '<td class="separator"></td>' : '') +
		        '</tr>' +
		        '<tr>' +
		          '<td>' + TPGlobal.hourTemplate + '</td> ' +
		          '<td class="separator">:</td>' +
		          '<td>' + TPGlobal.minuteTemplate + '</td> ' +
		          (showSeconds ?
		          '<td class="separator">:</td>' +
		          '<td>' + TPGlobal.secondTemplate + '</td>' : '') +
		          (is12Hours ?
		          '<td class="separator"></td>' +
		          '<td>' +
		          '<button type="button" class="btn btn-primary" data-action="togglePeriod"></button>' +
		          '</td>' : '') +
		        '</tr>' +
		        '<tr>' +
		          '<td><a href="#" class="btn" data-action="decrementHours"><i class="icon-chevron-down"></i></a></td>' +
		          '<td class="separator"></td>' +
		          '<td><a href="#" class="btn" data-action="decrementMinutes"><i class="icon-chevron-down"></i></a></td>' +
		          (showSeconds ?
		          '<td class="separator"></td>' +
		          '<td><a href="#" class="btn" data-action="decrementSeconds"><i class="icon-chevron-down"></i></a></td>': '') +
		          (is12Hours ? '<td class="separator"></td>' : '') +
		        '</tr>' +
		      '</table>' +
		    '</div>' +
		    '<div class="timepicker-hours" data-action="selectHour">' +
		      '<table class="table-condensed">' +
		      '</table>'+
		    '</div>'+
		    '<div class="timepicker-minutes" data-action="selectMinute">' +
		      '<table class="table-condensed">' +
		      '</table>'+
		    '</div>'+
		    (showSeconds ?
		    '<div class="timepicker-seconds" data-action="selectSecond">' +
		      '<table class="table-condensed">' +
		      '</table>'+
		    '</div>': '')
			);
		};
	}
	// END OF DATETIMEPICKER
	
	// START OF CHOOSE
	{
		var chooseGuid = 0;
		var Choose = function(element, options, val) {
			var self = this;
			this.opts = {
				top : null,
				right : null,
				bottom : null,
				left : null,
				height : null,
				width : null,
				maxHeight : null,
				minHeight : null,
				maxWidth : null,
				minWidth : null
			};
			var onClick = function(e,treeId,treeNode){
					self._setValue(treeNode.id);
					self._setText(treeNode[self._treeNameKey]);
					self.initOpts.change && self.initOpts.change.call(this, {
						val : self._value,
						text : self._text
					});
					self.close();
				};
			var setting = null;
			this._autoClose = false;
			this._value = this._text = "";
			this._old = {val:"",text:""};
			this._searchCount = 0;
			this._searchTimeout = 0;
			this.$treeDom = $("<div class='ztree'>");

			this.initOpts = {
				content : "",
				change : null,
				chooseRoot : true,
				searchable : true,
				expandFirstNode : true
			};

			this.initOpts.content = options.content;
			options.chooseRoot != undefined && (this.initOpts.chooseRoot =  options.chooseRoot);
			options.expandFirstNode != undefined && (this.initOpts.expandFirstNode =  options.expandFirstNode);
			options.searchable != undefined && (this.initOpts.searchable =  options.searchable);
			
			this._treeId = options.treeId;
			setting = $.extend({
					callback:{
						onClick : onClick
					}
				},options.treeSetting);
			
			this._treeSetting = setting;
			// 生成html
			this.$element = element.addClass("choose-ipt");
			this.chooseBox = $("<span>", {
				"class" : "choose-box"
			});
			this.chooseBtn = $("<span>", {
				"class" : "icon-search choose-btn"
			});
			this.chooseDropBox = $("<div class='choose-drop-box'>");
			this.chooseBox.insertAfter(this.$element).append(this.chooseBtn, this.$element, this.chooseDropBox);
			if (this.$element.attr("name")) {
				this.chooseVal = $("<input type='hidden' />").attr("name", this.$element.attr("name"));
				this.$element.removeAttr("name");
				this.$element.after(this.chooseVal);
			}
			
			//TODO兼容以前choose
			if(this.initOpts.content){
				this.chooseDropBox.html(this.initOpts.content);
			}else{
				this.chooseDropBox.html(this.$treeDom);
			}
			

			// 处理参数
			this._handler(options, val);

			this._init();

			this.initOpts.change = options.change ? options.change : null;
		};

		Choose.prototype = {
			constructor : Choose,
			_init : function() {
				if (!this.$element.prop('readonly') && !this.$element.prop('disabled')) {
					this._setEvent();
				}
				//TODO兼容以前choose
				if(this.initOpts.content){
					this.$element.prop('readonly', true);
				}
			},
			_initTree : function(){
				var firstNode;
				if(!$.fn.zTree) throw "缺少zTree插件";
				
				if(!this._treeId){
					this._treeId = "choose-tree"+chooseGuid++;
				}
				this.$treeDom.attr("id",this._treeId);
				
				this.treeObj = $.fn.zTree.init(this.$treeDom,this._treeSetting,this._data);
				
				this.initOpts.expandFirstNode && this.treeObj.expandNode(firstNode = this.treeObj.getNodes()[0]);
				
				this._treeNameKey = this.treeObj.setting.data.key.name;
				this._treeIdKey = this.treeObj.setting.data.simpleData.idKey;
				
				if(this.initOpts.chooseRoot && firstNode){
					this._setValue(firstNode.id);
					this._setText(firstNode[this._treeNameKey]);
				}
			},
			_handler : function(options, val) {
				var cssList = [], returnVal, needChange = false;
				if (typeof options === "string") {
					if (options in this.opts) {
						if (val == undefined) {
							return this.opts[options];
						} else {
							this.opts[options] = val;
							this._render([ options ]);
						}
					} else {
						if (options in this) {
							if (val != undefined) {
								options === "value" && (needChange = true);
								returnVal = this[options](val);
							} else {
								returnVal = this[options]();
							}
							return returnVal;
						} 
					}
				} else if ($.isPlainObject(options)) {
					for ( var i in options) {
						if (i in this.opts) {
							this.opts[i] = options[i];
							cssList.push(i);
						} else {
							this[i] && this[i](options[i]);
							i === "value" && (needChange = true);
						}
					}
					cssList.length && this._render(cssList);
					needChange && this.trigger();
				}
			},
			_render : function(cssList) {
				var list = cssList, i = list.length, obj = {}, item;
				while (i--) {
					item = list[i];
					obj[item] = this.opts[item];
				}
				this.chooseDropBox.css(obj);
			},
			getTreeObj:function(){
				return this.treeObj;
			},
			clear : function() {
				this._setText("");
				this.chooseVal && this._setValue("");
				if(this._value === "" && this.initOpts.searchable && this.treeObj){
					this.treeObj.showNodes(this.treeObj.getNodesByParam("isHidden", true));
//					this._searchTree("",this.treeObj);
					this.treeObj.cancelSelectedNode();
				}
			},
			data : function(val) {
				if(val == undefined){
					return this._data;
				}else{
					this._data = val||[];
					this._initTree();
				}
			},
			autoClose : function(val) {
				val == undefined ? this._autoClose : (this._autoClose = !!val);
			},
			disabled : function(val) {
				this.chooseBox[val ? 'addClass':'removeClass']("choose-box-disabled");
				this.$element.add(this.chooseVal).prop("disabled", !!val);
				this[val ? '_removeEvent' : '_setEvent']();
			},
			trigger:function(val){
				this.initOpts.change && this.initOpts.change.call(this.$element, {
					val : this._value,
					text : this._text,
					old : this._old
				},val);
			},
			setValue : function(val){
				if(val != undefined){
					this._setValue(val);
					this.treeObj && this._setText(this.treeObj.getNodesByParam("id",val)[0][this._treeNameKey]);
				}
			},
			value : function(val) {
				if (val != undefined) {
					this._setValue(val);
//					$("#"+this.treeObj.getNodeByParam(this._treeIdKey,val).tId).click();
//					this.treeObj.setting.callback.onClick(null, this.treeObj.setting.treeId, this.treeObj.getNodeByParam(this._treeIdKey,val));
//					this.treeObj.selectNode(this.treeObj.getNodeByParam(this._treeIdKey,val));
				} else {
					return this._value;
				}
			},
			text : function(val) {
				if (val != undefined) {
					this._setText(val);
				} else {
					return this._text;
				}
			},
			destroy : function() {
				this.chooseDropBox.add(this.chooseBtn).add(this.chooseVal).remove();
				this.$element.attr("name", this.chooseVal.attr("name")).unwrap();
				$(document).off("mousedown.choose");
			},
			readonly : function(val) {
				this.$element.prop("readonly", !!val);
				this[val ? '_removeEvent' : '_setEvent']();
			},
			_setEvent : function(val) {
				var self = this;
				this._removeEvent();
				this.chooseDropBox.on("mousedown.choose", function() {
					return self._autoClose;
				});
				this.chooseBtn.on("click.choose", function() {
					self.$element.focus().trigger("click.choose");
				});
				this.$element.on("click.choose", $.proxy(this._toggle, this));

				this.$element.on("blur.choose",function(){
					if($.trim(self.$element.val()) !== self.chooseBox.attr("title")){
						self._setText("");
						self._setValue("");
						self.trigger();
						self.initOpts.searchable && self._searchTree("", self.treeObj);
						self.treeObj.cancelSelectedNode();
					}
				});
				
				//TODO兼容以前choose
				if(!this.initOpts.content && this.initOpts.searchable){
					this.$element.on("keyup.choose", function(e){
						var val = $.trim($(this).val()),
							code = e.keyCode;
						
//						if(!(code > 47 && code < 106 || code === 8 || code === 32))return false;
						
						if((e.ctrlKey && e.keyCode === 67)||e.keyCode === 17||e.keyCode === 9||e.keyCode === 13)return false;
						
						!self.chooseBox.hasClass("choose-open") && self.$element.trigger("click.choose");
						
						if(val !== self.$element.attr("title")){
							
							if(self._searchTimeout){
								clearTimeout(self._searchTimeout);
							}
							self._searchTimeout = setTimeout(function(){
								self._searchTree(val, self.treeObj);
							},200);
						}
						
						val !== self.chooseBox.attr("title") && this.chooseVal && self._setValue("");
					});
				}
			},
			_removeEvent : function() {
				this.chooseBtn.off("click.choose");
				this.chooseDropBox.off("mousedown.choose");
				this.$element.off("click.choose");
				this.$element.off("keyup.choose");
				this.$element.off("blur.choose");
			},
			_setValue : function(val) {
				this._old.val = this._value;
				this._value = val;
				this.chooseVal ? this.chooseVal.val(val) : this._setText(val);
			},
			_setText : function(val) {
				var val = $.trim(val);
				this._old.text = this._text;
				this.$element.val(this._text = val);
				this.chooseBox.attr("title", val);
			},
			_setDropBoxPosition : function(e) {
//				if(this.opts.maxHeight)return;
//				var offset = this.$element.offset(), 
//					elmTop = parseInt(offset.top), 
//					winHeight = $(window).height(), 
//					elmHeight = this.$element.outerHeight(), 
//					dropHeight = this.chooseDropBox.outerHeight(), 
//					top = elmTop + elmHeight;
//					css = {};
//				
//				if(winHeight < top+dropHeight){
//					if(elmTop > winHeight-top){
//						css.maxHeight = elmTop;
//						css.bottom = 23;
//						css.top = "initial";
//					}else{
//						css.maxHeight = elmTop;
//						css.bottom = "initial";
//						css.top = 23;
//					}
//				}
//
//				this.chooseDropBox.css(css);
			},
			_toggle : function(event){
				if (!this.chooseBox.hasClass("choose-open")) {
					this.open(event);
				} else {
					this.close(event);
				}
			},
			open : function(event) {
				event && event.preventDefault();
				this.chooseBox.addClass("choose-open");
				$(document).on("mousedown.choose", $.proxy(this.close, this));
			},
			close : function(event) {
				if (event && (event.target === this.chooseBtn[0] || event.target === this.$element[0])) {
					return;
				}
				this.chooseBox.removeClass("choose-open");
				$(document).off("mousedown.choose");
			},
			hide : function() {
				this.chooseBox.hide();
			},
			show : function() {
				this.chooseBox.show();
			},
			_searchTree:function (val,treeObj){
				if(!treeObj)return;
//				console.time("search");
				var nodes = treeObj.getNodes().slice(0),
					showList = [],
					hideList = [],
					//上一个需要展开的节点
					lastExpandNode,
					//临时节点变量
					tempNode,
					match = new RegExp(val,"i");
					nameKey = this._treeNameKey,
					push = nodes.push;
				
				treeObj.showNodes(treeObj.getNodesByParam("isHidden", true));
				while(tempNode = nodes.shift()){
					
					if(match.test(tempNode[nameKey])){
						
						tempNode = tempNode.isParent ? tempNode:tempNode.getParentNode();
						
						if(lastExpandNode !== tempNode){
							lastExpandNode = tempNode;
							treeObj.expandNode(tempNode,true,true,false);
						}
						
						while(tempNode){
							showList.unshift(tempNode);
							tempNode = tempNode.getParentNode();
						}
						
					}else{
						hideList.push(tempNode);
						tempNode.children && push.apply(nodes,tempNode.children);
					}
				}
				//TODO
//				console.timeEnd("search");
//				console.time("render");
				treeObj.hideNodes(hideList);
				treeObj.showNodes(showList);
//				console.timeEnd("render");
				
			}
		};
		$.fn.choose = function(options,val){
			var $this = $(this),
				returnVal;
			
			if(!$this.length) return $this;
			
			$this.each(function(i,n){
				var $this = $(n),
					obj = $this.data("init");
				
				// 如果已经初始化
				if(obj){
					returnVal = obj._handler(options,val);
					if(returnVal != undefined)
						return false;
				}else{
					// 如果还没初始化
					$this.data("init",new Choose($this,options,val));
				}
				
			});
			
			return returnVal != undefined?returnVal:$this;
		};
	}
	// END OF CHOOSE
	
	// START OF FILE UPLOAD
	{
		function UploadFiles(element,options,val){
			this.opts = {
					maxLength:null,
					//默认最大20M(20971520字节)
					maxSize:20971520,
					name:"files",
					buttonText:"浏览文件",
					type:null
				};
			
			$.extend(this.opts,options);
			this.$element = element;
			this.hasFileList = {};
			this.limitType = "exe";
			this.fileCount = 0;
			this.addedData = {};
			this._init();
			this._handler(options,val);
		}
		
		UploadFiles.prototype = {
			_init:function(){
				this.$element.html(
						"<span class='upload-file-box'>" +
							"<ul></ul>" +
						"</span>"+
						"<input type='file' class='upload-file-hidden'/>"+
						"<button class='btn btn-warning upload-file-btn'>"+
							"<i class='icon-search icon-white'></i>"+
							this.opts.buttonText+
						"</button>"
					);
				this.fileBox = this.$element.find(".upload-file-box");
				this.button = this.$element.find(".upload-file-btn");
				this._bindEvent();
			},
			_handler:function(options,val){
				if(typeof options === "string"){
					if(options in this.opts){
						if(val == undefined){
							return this.opts[options];
						}else{
							this.opts[options] = val;
							return this.$element;
						}
					}else{
						return options in this 
								&& (val == undefined 
										? 	this[options]()
												:this[options](val)) 
								|| this.$element;
					}
				}else if($.isPlainObject(options)){
					for(var i in options){
						if(i in this.opts){
							this.opts[i] = options[i];
						}else{
							this[i] && this[i](options[i]);
						}
					}
					return this.$element;
				}
			},
			_bindEvent:function(){
				var _self = this;
				this.button.on("click",function(){
					if(!_self.opts.maxLength || _self.fileCount < _self.opts.maxLength){
						$(this).prev().click();
					}
				});
				
				this.fileBox.on("click","i",function(){
					var $this = $(this),
						$li = $this.closest("li");
					
					delete _self.hasFileList[$li.attr("file-name")];
					$li.remove();
					_self.opts.maxLength && _self.button.is(":disabled") && _self.button.removeAttr("disabled");
					_self.fileCount--;
				})
				
				.on("click","a",function(){
					var href = $(this).attr("href");
					
					$.download({url:href});
					return false;
				});
				
				this.$element.find(".upload-file-hidden").bind("change",function(){
					var $this = $(this),
						file = $this[0].files[0]||{},
						fileName = file.name||"",
						fileSize = file.size||0;
					
					if(_self.hasFileList[fileName]){
						$.msg("该文件已存在！");
						$this.val("");
						return false;
					}else if(_self.opts.type && $.inArray(fileName.split(".").pop(),_self.opts.type.split(",")) < 0){
						$.msg("文件类型只可为"+_self.opts.type);
						$this.val("");
						return false;
					}else if($.inArray(fileName.split(".").pop(),_self.limitType.split(","))>-1){
						$.msg("文件不可为可执行文件");
						$this.val("");
						return false;
					}else if(fileSize > _self.opts.maxSize){
						$.msg("文件不可大于 "+$.round(_self.opts.maxSize/Math.pow(1024,2))+"M");
						$this.val("");
						return false;
					}else{
						_self.hasFileList[fileName] = true;
						_self.fileCount++;
					}
					var $newField = $("<li file-name='"+fileName+"'>" +
							"<i class='icon-remove-sign'></i>" +
								"<span title='"+
								fileName+
								"'>"+
								fileName+
								"</span>" +
							"</li>");
					
					_self.$element
						.find(".upload-file-box ul")
						.append($newField);
					
					$this
						.after($this.clone(true).val(""))
						.attr("name",_self.opts.name);
					
					$newField.find('span').append($this);
					
					_self.disabled(_self.opts.maxLength && _self.fileCount >= _self.opts.maxLength);
				});
			},
			_renderUploaded:function(options){
				var html = "",
					list = options.data;
				if(list && list.length){
					for(var i=0,len=list.length;i<len;i++){
						html += "<li file-name='"+list[i][options.fileName]+"'>" +
									"<i class='icon-remove-sign'></i>" +
									"<span title='"+
									list[i][options.fileName]+
									"'>"+
										"<input type='hidden' name='" +
											options.dataName +
											"' value='"+
											list[i][options.dataItem] +
										"'/>" +
										(options.url ?
												"<a href='"+options.url+"?"+options.dataItem+"="+list[i][options.dataItem]+"'target='_blank'>" + list[i][options.fileName] + "</a>" 
												: list[i][options.fileName])+
									"</span>" +
								"</li>";
						this._setHasFileList(list[i][options.fileName]);
						this.fileCount++;
					}
				}
				
				this.fileBox.find("ul").prepend(html);
			},
			_renderDownload:function(options){
				var html = "",
					list = options.data;
				if(list && list.length){
					for(var i=0,len=list.length;i<len;i++){
						html += "<li>" +
									"<a href='"+
										(list[i][options.href]||"")+
										"'>" +
										list[i][options.fileName]+
									"</a>" +
								"</li>";
						this._setHasFileList(list[i][options.fileName]);
						this.fileCount++;
					}
				}
				
				this.fileBox.find("ul").prepend(html);
			},
			_renderAdded:function(list){
				var html = "";

				if(list && list.length){
					for(var i=0,len=list.length;i<len;i++){
						html += "<li>" +
									"<i class='icon-remove-sign'></i>" +
									"<span title='"+
									list[i].name+
									"'>"+
									list[i].name+
									"</span>" +
								"</li>";
						this._setHasFileList(list[i].name);
						this.fileCount++;
					}
				}

				this.fileBox.find("ul").append(html);
			},
			_setHasFileList:function(name){
				this.hasFileList[name] = true;
			},
			disabled:function(val){
				this.button.add(this.chooseVal).prop("disabled", !!val);
			},
			clear : function(){
				this.hasFileList = {};
				this.fileCount = 0;
				this.addedData = {};
				this.$element.find('.upload-file-box>ul').empty();
				this.$element.find('input[name]').remove();
			},
			getData:function(){
				var data = this.$element.f2j();
				$.extend(data[this.opts.name],this.addedData);
				return data;
			},
			pushUploaded:function(opt){
				var defaults = {
						data:[],
						dataItem:"attachUUID",
						fileName:"attachmentName",
						dataName:"attachmentList",
						url:null
					};
				$.extend(defaults,opt);
				this.data = 
				this._renderUploaded(defaults);
			},
			getFiles:function(){
				var files = {
					existFiles : [],
					newFiles : []
				};
				this.$element.find('.upload-file-box li').each(function() {
					var $this = $(this), 
						$file = $this.find('input');
					if($file.is('[type=file]')){
						files.newFiles.push($file.get(0).files[0]);
					}else{
						files.existFiles.push({
							id : $file.val(),
							name : $this.text()
						});
					}
				});
				return files;
			},
			pushAdded:function(opt){
				var defaults = {
						data:[]
					};
				$.extend(defaults,opt);
				this._renderAdded(defaults.data);
				this.addedData = defaults.data;
			}
		};
		$.fn.uploadMultFile = function(options,val){
			var $this = $(this),
				obj = $this.data("init");
			
			if(obj){
				return obj._handler(options,val);
			}else{
				$this.data("init",new UploadFiles($this,options,val));
				return $this;
			}
		};
	}
	// END OF FILE UPLOAD

	// START OF SELECT
	{
		var Select = function(element, options) {
			this.$select = $(element);
			this.$element = $('<div class="ui-ht-widget ui-select">');
//			!this.$select.is(':visible') && this.$element.hide();
			this.$element.insertAfter(this.$select).append(this.$select);
			this.options = $.extend({}, $.fn.select.defaults, options);
			this.$button = $('<div class="ui-select-button" tabindex="0">');
			// this.$button.addClass((this.$select.attr('class') ||
			// '').replace('ht-select', ''));
			this.$button.addClass(this.$select.is('.required') ? 'required' : '');
			this.$text = $('<span>').addClass('ui-select-text');
			var $icon = $('<span>').addClass('ui-select-icon');
			this.$button.append(this.$text, $icon);

			this.$dropdown = $('<div class="ui-select-dropdown">');
			this.$ul = $('<ul>');
			this.$dropdown.append(this.$ul);
			this.$element.append(this.$button);

			this.init();
			this.refresh();
			this.addEvents();
		};
		Select.prototype = {
			constructor : Select,
			destroy : function() {
				this.$select.removeData('select');
				this.$dropdown.remove();
				this.$element.replaceWith(this.$select);
			},
			init : function() {
				this.options.type = this.$select.is('[multiple]') ? 'M' : 'S';
				// this.options.dropup = this.options.dropup ||
				// this.$select.data('dropup');
				// if (this.options.dropup) {
				// this.$dropdown.addClass('ui-select-dropup');
				// }

				this.options.parent = this.$select.data('parent') || this.options.parent;
				if (this.options.parent) {
					// $(this.options.parent).append(this.$dropdown);
					this.$dropdown.addClass('ui-widget-out');
				}

				if (this.$select.is('[disabled]') || this.$select.is('[disabled="true"]') || this.$select.is('[readonly]')
						|| this.$select.is('[readonly="readonly"]') || this.options.disabled) {
					this.$element.addClass('ui-select-disabled');
				}

				// set width
				var width = this.options.width || this.$select.data('width');
				if (width) {
					this.options.width = width;
					this.$element.width(width);
				}
				var maxHeight = this.options.maxHeight || this.$select.data('maxHeight');
				if (width) {
					this.options.maxHeight = maxHeight;
					this.$dropdown.css({
						maxHeight : maxHeight
					});
				}

				if (!this.options.value) {
					var value = this.$select.data('value');
					if (this._isMultiple()) {
						this.$element.addClass('ui-select-multiple');
						if (value !== undefined) {
							value = value.split(',');
							value = $.map(value, function(val) {
								return $.trim(val);
							});
						}
					}
					this.options.value = value;
				}
				if (this.options.data) {
					this._generateList(this.options.data);
				}
			},
			enable : function() {
				this.$select.removeAttr('disabled');
				this.$element.removeClass('ui-select-disabled');
			},
			disable : function(opt) {
				if (opt !== undefined) {
					this.$select.prop('disabled', opt);
					this.$element[opt ? 'addClass' : 'removeClass']('ui-select-disabled');
				} else {
					this.$select.prop('disabled', true);
					this.$element.addClass('ui-select-disabled');
				}
			},
			readonly : function(opt) {
				this.$element[opt ? 'addClass' : 'removeClass']('ui-select-readonly');
				this[opt ? '_removeEvent' : '_addEvent']();
			},
			reset : function() {
				this.$select.val(this.options.value);
				this.choose(this._getObj(this.options.value));
				this._refreshCheckbox();
			},
			_getObj : function(value) {
				var obj;
				if (this._isSingle()) {
					var $option = this.$select.find('option[value="' + value + '"]');
					if ($option.length === 0) {
						$option = this.$select.find('option:eq(0)');
						value = $option.val();
					}
					obj = {
						text : $.trim($option.text()),
						val : value
					};
				} else if (this._isMultiple()) {
					var opts = this.$element.find('option');
					// TODO order list
					// value = _.sortBy(value, function(val) {
					// return opts.index(opts.filter('[value="' + val + '"]'));
					// });
					obj = [];
					for ( var i in value) {
						var $opt = this.$select.find('option[value="' + value[i] + '"]');
						if ($opt.length) {
							obj.push({
								text : $.trim($opt.text()),
								val : value[i]
							});
						}
					}
				}
				return obj;
			},
			refresh : function() {
				this._refreshList();
				var obj = this._getObj(this.options.value === undefined ? this.$select.val() : this.options.value);
				this.choose(obj);
				this._refreshCheckbox();
			},
			addEvents : function() {
				var _this = this;
				this._addEvent();
			},
			_addEvent : function() {
				this._removeEvent();
				this.$button.bind('click.ui-select', $.proxy(this.open, this));
			},
			_removeEvent : function() {
				this.$button.unbind('click.ui-select');
			},
			_addDropEvent : function() {
				var _this = this;
				this.$dropdown.on('click.ui-select', 'li', function(e) {
					// e.preventDefault();
					// Shall I improve it?
					// if (_this._isMultiple() && $(e.target).is('label')) {
					// // return;
					// }
					var $this = $(this), obj = [];
					if (_this._isSingle()) {
						obj = $this.data();
					} else if (_this._isMultiple()) {
						var $lis = _this.$ul.find('input:checked').parent().parent();
						$lis.each(function() {
							obj.push($(this).data());
						});
					}
					_this._chooseWithEvent(obj);
					e.stopPropagation();
				});
			},
			_isSingle : function() {
				return this.options.type === $.fn.select.TYPE.SINGLE;
			},
			_isMultiple : function() {
				return this.options.type === $.fn.select.TYPE.MULTIPLE;
			},
			_refreshCheckbox : function() {
				if (this._isMultiple()) {
					var $checkbox = this.$dropdown.find('input[type=checkbox]');
					$checkbox.prop('checked', false);
					var vals = this.$select.val() || [];
					for ( var i = 0; i < vals.length; i++) {
						this.$dropdown.find('li[data-val="' + vals[i] + '"]').find('input[type=checkbox]').prop('checked', true);
					}
				}
			},
			trigger : function(type) {
				if (this.options.after) {
					null != this.$select.val() && this.options.after(this._getObj(this.$select.val()));
				}
			},
			_chooseWithEvent : function(obj) {
				if (this.options.before) {
					var ret = this.options.before(obj);
					if (ret === false) {
						this.close();
						return;
					}
				}
				var old = this.$select.val(), oldstr = old && old.toString();
				this.choose(obj);
				if ((this.$select.val() && this.$select.val().toString()) !== oldstr) {
					this.$select.trigger('change');
					this.options.change && this.options.change(obj);
				}
				if (this._isSingle()) {
					this.close();
				}
				this.options.after && this.options.after(obj);
				// for required.
				this.$button.trigger('blur');
			},
			choose : function(obj) {
				if (this._isSingle()) {
					this.$text.text(obj.text).attr('title', obj.text);
					this.$select.val(obj.val);
				} else if (this._isMultiple()) {
					var arrs = [], text = '';
					for ( var i = 0; i < obj.length; i++) {
						text += ', ' + obj[i].text;
						arrs.push(obj[i].val);
					}
					text = text.substring(2, text.length);
					this.$select.val(arrs);
					this.$text.text(text).attr('title', text);
				}
			},
			option : function(opts) {
				this.options = $.extend(this.options, opts);
			},
			_refreshList : function() {
				this.$ul.empty();
				this.list = {};
				var $opts = this.$select.find('option');
				var values = this.$select.val();
				for ( var i = 0; i < $opts.length; i++) {
					var $opt = $opts.eq(i);
					var $li = $('<li>');
					var obj = {
						text : $opt.text(),
						val : $opt.val()
					};
					this.list[obj.val] = $opt.text();
					$li.attr({
						'data-val' : obj.val,
						'data-text' : obj.text,
						'title' : obj.text
					});
					if (this.options.type === $.fn.select.TYPE.MULTIPLE) {
						var $label = $('<label>');
						var $checkbox = $('<input type="checkbox">');
						if ($.inArray(obj.val, values) !== -1) {
							$checkbox.attr('checked', true);
						}
						$label.append($checkbox).append(obj.text);
						$li.append($label);
					} else {
						$li.text(obj.text);
					}
					this.$ul.append($li);
				}
			},
			open : function(event) {
				event.preventDefault();
				if (this.$element.is('.ui-widget-open')) {
					this.close();
					return;
				}
				if (this.$element.is('.ui-select-disabled')) {
					return;
				}
				if (this.options.parent) {
					this.$dropdown.appendTo('body');
					this._addDropEvent();
					this._setOutDropListPosition();
					$(window).bind('resize.ui-select', $.proxy(this._setOutDropListPosition, this));
				}
				this.$element.toggleClass('ui-widget-open');
				$(document).bind('DOMMouseScroll.ui-select', $.proxy(this.close, this));
				$(document).bind('mousewheel.ui-select', $.proxy(this.close, this));
				$(document).bind('mousedown.ui-select', $.proxy(this.close, this));
				$(document).bind('keydown', $.proxy(this.close, this));
			},
			_setOutDropListPosition : function(e) {
				this.$dropdown.removeClass('ui-select-dropup').css('maxHeight', '');
				var offset = this.$element.offset(), elmTop = parseInt(offset.top), winHeight = $(window).height(), elmHeight = this.$element
						.outerHeight(), dropHeight = this.$dropdown.outerHeight(), winTop = elmTop - $(document).scrollTop(), dropTop = winTop
						+ elmHeight, top = elmTop + elmHeight;
				if (dropHeight <= winHeight - dropTop || winTop <= winHeight - dropTop) {
					if (dropHeight > winHeight - dropTop && winTop <= winHeight - dropTop) {
						this.$dropdown.css('maxHeight', winHeight - dropTop);
					}
				} else {
					if (winTop < dropHeight) {
						this.$dropdown.css('maxHeight', winTop);
					}
					this.$dropdown.addClass('ui-select-dropup');
					top = elmTop - this.$dropdown.outerHeight();
				}

				this.$dropdown.css({
					width : this.$element.width(),
					top : top,
					left : offset.left
				});
			},
			close : function(e) {
				if (e && (this.$element.add(this.$dropdown).find(e.target).size() != 0 || this.$dropdown.is(e.target))) {
					return;
				}
				if (this.options.parent) {
					this.$dropdown.remove();
				}
				$(document).unbind('mousedown.ui-select');
				$(document).unbind('DOMMouseScroll.ui-select');
				$(document).unbind('mousewheel.ui-select');
				$(window).unbind('resize.ui-select');
				this.$element.removeClass('ui-widget-open');
			},
			value : function(val) {
				if (val === undefined) {
					var obj = this.$select.val();
					return obj ? obj : (this._isMultiple() ? [] : null);
				}
				if (this.$element) {
					this.choose(this._getObj(val));
					this._refreshCheckbox();
				} else {
					this.$select.data('value', val);
				}
			},
			text : function() {
				var $selected = this.$select.find('option:selected');
				if (this._isMultiple()) {
					return $.map($selected,function(n,i) {
						return $(n).text();
					});
				} else {
					return $selected.text();
				}
			},
			title : function(title) {
				if (title === '') {
					this.$element.removeAttr('title');
				} else {
					this.$element.attr('title', title);
				}
			},
			error : function(err) {
				if (err) {
					this.$element.addClass('error');
				} else {
					this.$element.removeClass('error');
				}
			},
			data : function(data) {
				if (data) {
					this._generateList(data);
					this.refresh();
				} else {
					return this.dataList;
				}
			},
			widget : function() {
				return this.$element;
			},
			_generateList : function(data) {
				this.$select.empty();
				this.dataList = data;
				if ($.isArray(data)) {
					for ( var i = 0; i < data.length; i++) {
						var obj = data[i];
						for ( var key in obj) {
							this.$select.append($('<option>').attr('value', key).text(obj[key]));
							break;
						}
					}
				} else {
					for ( var key in data) {
						this.$select.append($('<option>').attr('value', key).text(data[key]));
					}
				}
			}
		};

		$.fn.select = function(option, value) {
			var methodReturn;
			var $set = this.each(function() {
				var $this = $(this);
				var data = $this.data('select');
				var options = typeof option === 'object' && option;
				if (!data) {
					$this.data('select', (data = new Select(this, options)));
				}
				if (typeof option === 'string') {
					methodReturn = data[option](value);
				}
			});
			return (methodReturn === undefined) ? $set : methodReturn;
		};

		$.fn.select.defaults = {
			type : 'S',
			parent : 'body'
		};
		$.fn.select.TYPE = {
			MULTIPLE : 'M',
			SINGLE : 'S'
		};
		$.fn.select.Constructor = Select;
	}
	// END OF SELECT

	// START OF ADDR
	{
		var Addr = function(element, options) {
			this.options = $.extend({}, $.fn.select.defaults, options);
			this.$element = $(element).addClass('ui-addr');
			this.$province = $('<select>');
			this.$city = $('<select>');
			this.$canton = $('<select>');
			this.$address = $('<input type="text" placeholder="请填写详细地址">');
			this.data = Desktop && Desktop.getCities();
			this._init();
			this._addEvent();
		};
		Addr.prototype = {
			_init : function() {
				var _this = this;
				this.$element.append(this.$province, '&nbsp;', this.$city, '&nbsp;', this.$canton, '&nbsp;', this.$address);
				if (this.options.required) {
					this.$element.find('select,input').addClass('required');
				}
				this.$province.select({
					after : function(){
						_this._changeCity();
					}
				});
				this.$city.select({
					after : function(){
						_this._changeCanton();
					}
				});
				this.$canton.select();
				if (this.data) {
					this._initAddr();
				} else {
					this._getRemote();
				}
			},
			_initAddr : function() {
				this._changeProvince();
			},
			_changeProvince : function() {
				this.$province.select('data', this._getList(this.data, 'province', this.options.provOpt));
				this._changeCity();
			},
			_changeCity : function() {
				var pid = this.$province.val(),
					province = this.data[pid];
				if (province) {
					this.$city.select('data', this._getList(province.citys, 'city', this.options.cityOpt));
					this._changeCanton();
				} else {
					this.$city.select('data', []);
					this.$canton.select('data', []);
				}
			},
			_changeCanton : function() {
				var province = this.data[this.$province.val()],
					city = province.citys[this.$city.val()];
				if (city) {
					this.$canton.select('data', this._getList(city.cantons, 'canton', this.options.cantonOpt));
				} else {
					this.$canton.select('data', []);
				}
			},
			_getList : function(data, type, optional) {
				var list = [];
				if (optional) {
					list.push({
						value : '',
						text : '请选择'
					});
				}
				for ( var key in data) {
					list.push({
						value : key,
						text : data[key][type + 'Name']
					});
				}
				return list;
			},
			_getRemote : function() {
				if (window.SYSURL && window.SYSURL.ADDR) {
					var _this = this;
					$.ajax({
						contentType : 'application/json; charset=UTF-8',
						type : 'POST',
						data : JSON.stringify({
							token : window.token
						}),
						dataType : 'JSON',
						url : window.SYSURL.ADDR,
						success : function(data) {
							_this.data = data.data;
							_this._initAddr();
						}
					});
				}
			},
			_addEvent : function() {
				var _this = this;
				this.$province.change(function(){
					_this._changeCity();
				});
				this.$city.change(function(){
					_this._changeCanton();
				});
			},
			id : function() {
				return {
					provinceId : this.$province.val(),
					cityId : this.$city.val(),
					cantonId : this.$canton.val(),
					address : this.$address.val()
				};
			},
			text : function() {
				var text = {
					provinceName : this.$province.find('option:checked').text(),
					cityName : this.$city.find('option:checked').text(),
					cantonName : this.$canton.find('option:checked').text(),
					address : this.$address.val()
				};
				text.detail = text.provinceName + text.cityName + text.cantonName + text.address;
				return text;
			},
			detail : function() {
				return $.extend({}, this.id(), this.text());
			}
		};
		$.fn.addr = function(option, value) {
			var methodReturn;
			var $set = this.each(function() {
				var $this = $(this);
				var data = $this.data('addr');
				var options = typeof option === 'object' && option;
				if (!data) {
					$this.data('addr', (data = new Addr(this, options)));
				}
				if (typeof option === 'string') {
					methodReturn = data[option](value);
				}
			});
			return (methodReturn === undefined) ? $set : methodReturn;
		};
		$.fn.addr.defaults = {
			required : false,
			provOpt : false,
			cityOpt : false,
			cantonOpt : false
		};
		$.fn.addr.Constructor = Addr;
		$.addr = function(addr) {
			Addr.cities = Addr.cities || Desktop.getCities();
			var pro = Addr.cities[addr.pid], city = pro && pro.citys[addr.cid], canton = city && city.cantons[addr.nid];
			return (pro && pro.provinceName) + (city && city.cityName) + (canton && canton.cantonName) + addr.addr;
		};
	}
	// END OF ADDR
	
	// START OF DATA GRID
	{
		var Grid = function(element, options) {
			this.options = $.extend({}, $.fn.grid.defaults, options);
			this.$element = $(element);
			this.$tb = $('<div class="ui-tb">');
			this.$tbdiv = $('<div class="ui-tb-ctn">');
			this.$hddiv = $('<div class="tb-hd">');
			this.$htable = $('<table></table>');
			this.$hhead = $('<thead></thead>');
			this.$bddiv = $('<div class="tb-bd">');
			this.$btable = $('<table></table>');
			this.$bhead = $('<thead></thead>');
			this.$bbody = $('<tbody></tbody>');
			this.data = this.list = [];
			this._init();
		};
		Grid.prototype = {
			constructor : Grid,
			_init : function() {
				if (this.$element.is('table')) {
					this.$element.hide();
					this.$element.before(this.$tb);
				} else {
					this.$element.append(this.$tb);
				}
				this.options.title = this.options.title || this.$element.attr('title');
				if (this.options.title) {
					this.$title = $('<div class="tb-title">');
					this.$tb.append(this.$title.attr('title',this.$title.html(this.options.title).text()));
				}
				!this.options.showHeader && this.$tbdiv.addClass('tb-no-hd');
				this.$htable.append(this.$hhead);
				this.$hddiv.append(this.$htable);
				this.$btable.append(this.$bhead);
				this.$btable.append(this.$bbody);
				this.$bddiv.append(this.$btable);
				this.$tbdiv.append(this.$hddiv);
				this.$tbdiv.append(this.$bddiv);
				this.$tb.append(this.$tbdiv);
				this.$tb.css({
					height : this.options.height,
					width : this.options.width,
					maxHeight : this.options.maxHeight,
					minHeight : this.options.minHeight,
				});
				if (this.options.height) {
					this.$tb.css('height', this.options.height);
					this.$tb.addClass('ui-tb-ht');
					var tbbdHt = this.options.height - 25;
					this.options.pagination && this.$tbdiv.css('bottom',30);
					this.options.title && this.$tbdiv.css('top',25);
				}else{
					this.$tb.addClass('ui-tb-at');
				}

				this._initPager();
				this._initHD();
				// TODO 
//				this.$tbdiv.css('top', this.$title ? 25 : 0);
				this._addEvent();
				this._initBD();
				this._resizeHD();
				this._resizeTb();
				this.options.data && this.reload(this.options.data || []);
			},
			_resizeTb : function(){
				// 设置表格宽度
				if (this.isPx) {
					this.$btable.width(this.twidth);
					this.$htable.width(this.twidth);
				}
			},
			_initHD : function() {
				// this.$element.find('td').each(function() {
				// var $this = $(this);
				// $this.html($('<div>').html($this.html()));
				// });
				this.checkBoxCount = 0;
				this.sortMap = {}
				var columns = this.options.columns;
				var $tr = $('<tr>'), $hdtr = $('<tr>');
				var width = 0, isPx = true;
				for ( var i = 0; i < columns.length; i++) {
					var col = columns[i];
					var $td = $('<td>');
					if(col.checkbox){
						this.checkBoxCount++;
						!this._hideTopChkBox() && $td.append($('<div class="tb-checkbox tb-cb-all">').append($('<input type="checkbox">').attr('name', col.field)));
					}else if (col.sortable) {
						col.desc = (col.desc === undefined || col.desc) ? true : false;
						this.sortMap[col.field] = {'desc' : col.desc, 'field' : col.field};
						$td.append($('<div>').html(col.title).attr('title', col.title).append($('<span class="' + (col.desc ? 'sort-icon' : 'sort-icon-up') + ' ui-select-icon"></span>')));
					}else{
						$td.append($('<div>').html(col.title).attr('title', col.title));
					}
					$td.attr('field', col.field);
					col.width && $td.css('width', col.width);
					$tr.append($td);
					
					// body 中表头
					var $bdtd = $('<td>').attr('field', col.field);
					col.width && $bdtd.css('width', col.width);
					if($.isNumeric(col.width)){
						col.width = Number(col.width);
						!col.hidden && (width += col.width);
						isPx = isPx && true;
					}else{
						isPx = false;
					}
					
					$hdtr.append($bdtd);
					if (col.hidden) {
						$td.hide();
						$bdtd.hide();
					}
					if (col.align) {
						$td.css('text-align', col.align);
					}
				}
				// 当所有列宽度小于表格本身宽度时有用
				this.twidth = width;
				this.isPx = isPx;
				if(isPx){
					$tr.append($('<td>').hide());
				}
				this.$hhead.append($tr);
				this.$bhead.append($hdtr);
			},
			_hideTopChkBox : function(){
				if($.isFunction(this.hideTopChkBox)){
					return this.hideTopChkBox();
				}
				return this.hideTopChkBox;
			},
			_initBD : function() {
				if (this.options.data) {
					this.data = this.options.data;
					this.reload(this.options.data);
				} else if (this.options.url) {
					this._getRemoteData();
				}
			},
			_getRemoteData : function() {
				var _this = this;
				if(this.options.url){
					$.ajax({
						type : 'POST',
						url : this.options.url,
						dataType : 'JSON',
						data : {
							
						},
						success : function(odata) {
							_this.odata = odata;
							_this.data = _this.options.dataFilter ? _this.options.dataFilter(odata) : odata;
							_this.reload(_this.data);
						}
					});
				}
			},
			_initPager : function() {
				if (this.options.pagination) {
					this.pageSize = this.options.pageSize;
					this.currentPage = this.options.currentPage || 1;
					this.totalSize = 1;
					var pager = this.$pager = $('<div class="tb-pager">');
					pager.append($('<div class="tb-pg-select">' 
								+ '<select><option value="5">5</option><option value="10" selected>10</option><option value="15">15</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="100">100</option>'
								+ '</select></div>'));
					pager.append('<div class="tb-pg-sptr">');
					pager.append($('<div class="tb-pg-page">'
								+ '<span>第</span><span><input class="ht-number" type="text"></span><span>页 '
								+ ' 共</span><span class="tb-total-size">1</span><span>页</span></div>'));
					pager.append('<div class="tb-pg-sptr">');
					pager.append($('<div class="tb-pg-btn"><a class="tb-pg-fst"></a><a class="tb-pg-pre"></a><a class="tb-pg-next"></a><a class="tb-pg-last"></a><a class="tb-pg-rfs"></a></div>'));
					pager.append('<div class="tb-pg-sptr">');
					pager.append('<div class="tb-tlt-num">共<span>0</span>条记录</div>');
					this.$pageSize = pager.find('select');
					this.$pageSize.select && this.$pageSize.select();
					this.$totalSize = pager.find('.tb-total-size');
					this.$totalNum = pager.find('.tb-tlt-num span');
					this.$currentPage = pager.find('input');
					this.$tb.append(pager);
//					this.$bddiv.css('bottom', 30);
					this._refreshPager();
				}
			},
			_changeSize : function(size){
				this.$pageSize.select ? this.$pageSize.select('value', size) : this.$pageSize.val(size);
			},
			_refreshPager : function() {
				if (this.options.pagination) {
					this.totalSize = Math.ceil(this.total / this.pageSize);
					this.totalSize = this.totalSize || 1;
					this.currentPage = this.currentPage || 1;
					this.$totalSize.text(this.totalSize);
					this.$totalNum.text(this.total);
					this.$currentPage.val(this.currentPage);
					this._refreshPagerBtn();
				}
			},
			_generateRow : function(list, start) {
				start = start || 0;
				var colspan = this.$btable.find('>thead td:not(.ui-hide)').length;
				for ( var i = start; i < list.length; i++) {
					this.$bbody.append(this._renderRow(list[i], i));
					this.$bbody.append(this._renderSubGrid(list, i, list[i], colspan));
				}
			},
			_renderSubGrid : function(list, index, row, colspan) {
				if (this.options.subGrid) {
					var $tr = $('<tr class="tb-sub-grid">'),
//						$grid = $('<div>'),
						$td = $('<td>').attr('colspan', colspan);
//					$tr.append($td.append($grid));
					$tr.append($td);
					this.options.subGrid.apply($tr, [ {
						$tr : $tr,
						$grid : $td,
						$td : $td
					}, {
						list : list,
						index : index,
						row : row
					} ]);
					
					return $tr;
				}
			},
			_renderRow : function(row, index) {
				var $tr = $('<tr>'), rowui = {
					$tr : $tr
				}, rowdata = {
					row : row,
					list : this.list,
					data : this.data
				};
				this.options.rowFilter && this.options.rowFilter(rowui, rowdata);
				for ( var j = 0; j < this.options.columns.length; j++) {
					var column = this.options.columns[j], 
						cell = row[column.field], 
						$td = $('<td>').attr('field', column.field), 
						$div = $('<div>'),
						cellui = {
							$td : $td,
							$tr : $tr,
							$div : $div
						}, celldata = {
							cell : cell,
							title : undefined,
							row : row,
							index : index,
							list : this.list,
							data : this.data,
							field : column.field
						};
//					$td.html($div);
					this._generateTd(column, cellui, celldata);
					if (column.hidden) {
						$td.hide();
					}
					if (column.align) {
						$td.css('text-align', column.align);
					}
					$tr.append($td);
				}
				if (this.options.idField !== undefined) {
					$tr.attr('fid', row[this.options.idField]);
				}
				$tr.attr('findex', index).data('index', index);
				return $tr;
			},
			_generateTd : function(column, cellui, celldata){
				var $div = cellui.$div;
				if (column.checkbox) {
					var $checkbox = $('<input type="checkbox">').attr('name', column.field);
						$div.addClass('tb-checkbox');
						$div.html($checkbox),
						checked = column.formatter ? column.formatter($.extend({
							$checkbox : $checkbox
						}, cellui), celldata) : cellui.$td.find('input[type=checkbox]').prop('checked');
					$checkbox.prop('checked', checked);
					checked && this._addSelected(cellui.$tr);
				} else if(column.expander){
					var $icon = $('<i class="icon-plus icon-minus"></i>');
						$div.addClass('tb-expander');
					if (!column.formatter || column.formatter($.extend({
						$icon : $icon
					}, cellui), celldata)) {
						$div.html($icon);
					}
				} else {
					this._formatText(column, cellui, celldata);
				}
				cellui.$td.html($div);
			},
			_formatText : function(column, cellui, celldata){
				var $div = cellui.$div,
					$td = cellui.$td;
				if (column.data && !column.formatter) {
					var datalist = column.data,
						value = '';
					if ($.isFunction(datalist)) {
						datalist = datalist(celldata);
					}
					if ($.isPlainObject(datalist)) {
						value = datalist[celldata.cell];
					} else {
						for ( var i = 0; i < datalist.length; i++) {
							if (celldata.cell in datalist[i]) {
								value = datalist[i][celldata.cell];
								break;
							}
						}
					}
					celldata.cell = value;
				} else if (column.formatter) {
					var ctn = column.formatter(cellui, celldata);
					if (ctn !== undefined) {
						celldata.cell = ctn;
					}
				}
				// need to make enhancement
				if (celldata.cell !== false) {
					var $dom = celldata.cell,
						escapeCell = typeof celldata.cell === 'string'? celldata.cell.replace(/</g,"&lt;").replace(/>/g,"&gt;") : celldata.cell;
					if(typeof celldata.cell === 'string' && /^<(?!script)\w+\s+[^\n\f\r]*>$/.test($.trim(celldata.cell))){
						$dom = $(celldata.cell);
					}
					if ($dom && $dom.length && $dom[0] && $dom[0].nodeType) {
						$div.append($dom);
						celldata.title = celldata.title === undefined ? celldata.row[column.field] : celldata.title;
					} else {
						$div.html(/<(?!script)\w+\s+[^\n\f\r]*>/.test($.trim(celldata.cell)) ? celldata.cell : escapeCell);
						celldata.title = celldata.title === undefined ? celldata.cell : celldata.title;
					}
//					if (!$.isArray(celldata.title) && !$.isPlainObject(celldata.title)) {
					$div.attr('title', celldata.title);
//					}
				}
			},
			_resizeHD : function() {
				var _this = this,
					div = this.$bddiv.get(0),
					oWidth = div.offsetWidth, 
					cWidth = div.clientWidth;
				// 宽度为PX时的行为
				this.$htable.find('td.ui-tb-td-lthd').removeClass('ui-tb-td-lthd');
				if(this.isPx){
					// 有上下滚动条时
					if (oWidth > cWidth) {
						//头部有多行时，第一行最后一列为多余列，为滚动条占位, width为px时有效
						// TODO 多行头部需要重构
						this.$htable.find('tr:eq(0) td:last').width(oWidth - cWidth).show();
					} else {
						// TODO 多行头部需要重构
						this.$htable.find('tr:eq(0) td:last').hide();
						this.$htable.find('tr:eq(0) td:visible:last').addClass('ui-tb-td-lthd');
						this.$htable.find('tr:gt(0)').each(function() {
							$(this).find('td:visible:last').addClass('ui-tb-td-lthd');
						});
					}

					// 有左右滚动条时
					if (this.$bddiv.width() < this.$btable.width()){
						this.$bddiv.bind('scroll.ui-tb', function(e) {
							_this.$hddiv.scrollLeft($(this).scrollLeft());
						});
					}else{
						this.$bddiv.unbind('scroll.ui-tb');
					}
					
					// 表格宽度小于包装盒宽度时
					if (this.$htable.width() < this.$element.width()) {
						this.$htable.find('tr:eq(0) td:last').hide();
						this.$htable.find('td.ui-tb-td-lthd').removeClass('ui-tb-td-lthd');
					}
				} else {
					if (oWidth > cWidth) {
						// width为百分比时,css控制占位符宽度
						this.$hddiv.css('padding-right', oWidth - cWidth);
					} else {
						// TODO 多行头部需要重构
						this.$htable.find('tr td:visible:last').addClass('ui-tb-td-lthd');
						this.$hddiv.css('padding-right', 0);
					}
				}
				this.$htable.find('.tb-cb-all input[type="checkbox"]').prop('checked', false);
			},
			_addEvent : function() {
				var _this = this;
				this.$tb.on('click', 'div.tb-expander', function(e){
					e.stopPropagation();
					var $expander = $(this),
						$tr = _this.$btable.find($expander.parents('tr')),
						index = $tr.data('index');
					if ($tr.length != 1)
						return;
					if(_this.options.subGrid){
						$tr.next()[$expander.find('i').toggleClass('icon-minus').is('.icon-minus') ? 'show' : 'hide' ]();
					}
				});
				this.$hddiv.on('change', 'div.tb-cb-all input[type="checkbox"]', function(e){
					e.stopPropagation();
					var $cb = $(this);
					if(_this.options.single && _this.options.selectOnCheck){
						$cb.prop('checked', false);
						return false;
					}
					if ($cb.is(':checked')) {
						var $cbs = _this.$btable.find('>tbody>tr[findex] .tb-checkbox input[type="checkbox"]:enabled'),
							$trs = _this.$btable.find($cbs.parents('tr'));
						$cbs.prop('checked', true);
						_this._removeSelected(_this.$btable.find('>tbody>tr[findex]'));
						_this._addSelected($trs);
					} else {
						_this.$btable.find('>tbody>tr[findex] .tb-checkbox input[type="checkbox"]:enabled').prop('checked', false);
						_this._removeSelected(_this.$btable.find('>tbody>tr[findex]'));
					}
					_this.options.clickTopCheckbox.apply(this, [$cb.is(':checked'), _this.list]);
				});
				this.$tb.on('change', 'div.tb-checkbox input[type="checkbox"]', function(e) {
					e.stopPropagation();
					var $cb = $(this),
						$tr = _this.$btable.find($cb.parents('tr')),
						index = $tr.data('index');
					if ($tr.length != 1)
						return;
					if ($cb.is(':checked')) {
						if (_this.options.single && _this.options.selectOnCheck) {
							var $otr = _this.$btable.find('>tbody>tr[findex].tb-row-selected');
							$otr.removeClass('tb-row-selected');
							_this._removeSelected($otr);
							_this.$btable.find('>tbody>tr[findex] .tb-checkbox input[type="checkbox"]').not($cb).prop('checked', false);
						}
						_this._addSelected($tr);
						_this._refreshHDCheckbox();
					} else {
						_this.$htable.find('.tb-cb-all input[type="checkbox"]').prop('checked', false);
						_this._removeSelected($tr);
					}
					var args = [$cb.is(':checked'), {
							index : index,
							row : _this.list[index],
							rows : _this.list
						}];
					_this.options.clickCheckbox.apply(this, args);
				});
				this.$tb.on('click', 'tr[findex]', function(e) {
					var $target = _this.$btable.find($(e.target));
				 	if (($target.is('input') || $target.parent('.tb-checkbox').length)) {
				 		return;
					}
					if ($target.is('.ui-tb-edit-field') || $target.parents('.ui-select').length){
						return;
					}
					var $tr = $(this), index = $tr.data('index');
					if (!$tr.is(_this.$btable.find('>tbody>tr'))) {
						return;
					}
					if(_this.options.selectable){
						if (_this.options.single) {
							// 如果checkOnSelect==true，那么单行选中，这取消所有checkbox选中
							_this.options.checkOnSelect && _this.$htable.find('.tb-cb-all input[type="checkbox"]').prop('checked', false);
							var $otr = _this.$btable.find('>tbody>tr[findex].tb-row-selected').not($tr);
							$otr.removeClass('tb-row-selected');
							_this._removeChecked(_this.$btable.find('>tbody>tr[findex]'));
							$tr.addClass('tb-row-selected');
							_this._addChecked($tr);
						} else {
							$tr.toggleClass('tb-row-selected');
							if ($tr.is('.tb-row-selected')) {
								_this._addChecked($tr);
								_this._refreshHDCheckbox();
							} else {
								if($tr.find('div.tb-checkbox').length && _this.options.checkOnSelect){
									// 如果当前行有checkbox OnSelect ==  true，那么uncheck top checkbox
									_this.$htable.find('.tb-cb-all input[type="checkbox"]').prop('checked', false);
								}
								_this._removeChecked($tr);
							}
						}

						var args = [ index, _this.list[index] ];
						$tr.is('.tb-row-selected') ? _this.options.select.apply(this, args) : _this.options.unselect.apply(this, args);
					}
					$.proxy(_this.options.clickRow, this, index, _this.list[index], _this)();
					
					// edit function
					_this._changeToEditable($tr,$target);
					// e.stopPropagation();
				});
				this.options.dblClickRow && this.$tb.on('dblclick', 'tr[findex]', function(e) {
					e.stopPropagation();
					var $tr = $(this), index = $tr.data('index');
					var args = [ index, _this.list[index] ];
					_this.options.dblClickRow.apply(this, args);
				});
				if (this.options.pagination) {
					this.$currentPage.blur($.proxy(this._blurNumber, this));
					this.$currentPage.keypress($.proxy(this._entryNumber, this));
					this.$pageSize.change($.proxy(this._changePageSize,this));
					this.$pager.on('click','.tb-pg-fst:not(.tb-btn-disabled)',function(e){
						e.stopPropagation();
						_this.currentPage = 1;
						_this._clickBtn();
					});
					this.$pager.on('click', '.tb-pg-pre:not(.tb-btn-disabled)', function(e) {
						e.stopPropagation();
						if (_this.currentPage == 1)
							return;
						_this.currentPage--;
						_this._clickBtn();
					});
					this.$pager.on('click', '.tb-pg-next:not(.tb-btn-disabled)', function(e) {
						e.stopPropagation();
						if (_this.currentPage == _this.totalSize)
							return;
						_this.currentPage++;
						_this._clickBtn();
					});
					this.$pager.on('click', '.tb-pg-last:not(.tb-btn-disabled)', function(e) {
						e.stopPropagation();
						_this.currentPage = _this.totalSize;
						_this._clickBtn();
					});
					this.$pager.on('click', '.tb-pg-rfs:not(.tb-btn-disabled)', function(e) {
						e.stopPropagation();
						_this._clickBtn();
					});
				}
				// 自动结束编辑
				$(document).mousedown(function(e) {
					if(_this.options.autoEnd){
						var $target = $(e.target);
						if ($target.parents('tr.tb-tr-editing').length 
								|| !$(document).find($target).length 
								// TODO hard work datetimpepicker
								|| $target.parents('.ui-datetimepicker-widget').length
								|| $target.parents('.ui-select-dropdown.ui-widget-out').length 
								|| $target.is('.ui-select-dropdown.ui-widget-out')) {
							return;
						}
						_this._changeToView();
					}
				});
				// 表格排序， call后台机制
				this.$hhead.on('click', '.sort-icon', function(e){
					var $this = $(this),
						currentField = $this.closest('td').attr('field');
					if ($this.is('.sort-icon-up')) {
						$this.removeClass('sort-icon-up');
						_this.sortMap[currentField].desc = true;
						_this._clickSort(currentField, $this);
					} else {
						$this.addClass('sort-icon-up');
						_this.sortMap[currentField].desc = false;
						_this._clickSort(currentField, $this);
					}
				});
			},
			_addChecked : function($tr){
				this.options.checkOnSelect && $tr.find('.tb-checkbox input[type="checkbox"]').prop('checked', true);
			},
			_removeChecked : function($tr){
				this.options.checkOnSelect && $tr.find('.tb-checkbox input[type="checkbox"]').prop('checked', false);
			},
			_addSelected : function($tr){
				this.options.selectOnCheck && $tr.addClass('tb-row-selected');
			},
			_removeSelected : function($tr){
				this.options.selectOnCheck && $tr.removeClass('tb-row-selected');
			},
			_refreshHDCheckbox : function(){
				var $cbs = this.$btable.find('>tbody>tr[findex] .tb-checkbox input[type="checkbox"]');
				if ($cbs.length == $cbs.filter(':checked').length && $cbs.length) {
					this.$htable.find('.tb-cb-all input[type="checkbox"]').prop('checked', true);
				}
			},
			_changeToView : function($trs){
				var _this = this;
				$trs = ($trs && $trs.length) ? $trs.filter('tr.tb-tr-editing') : this.$btable.find('>tbody>tr[findex].tb-tr-editing');
				$trs.each(function() {
					var $tr = $(this);
						$tds = $tr.find('td'),
						index = $tr.data('index'),
						row = _this.list[index],
						columns =  _this.options.columns,
						cellui = {
							$td : $td,
							$tr : $tr
						},
						celldata = {
							row : row,
							index : index,
							list : this.list,
							data : this.data
						};
					if ($tr.is('.tb-tr-editing') && _this.options.beforeView(row, index) !== false) {
						for ( var i = 0; i < columns.length; i++) {
							var column = columns[i];
							if (column.type) {
								var $td = $tds.eq(i),
									$div = $('<div>');
//								if ($.isFunction(list)) {
//									list = list({
//										cell : cell,
//										row : row
//									});
//								}
								switch (column.type) {
									case 'list': {
										var $select = $td.find('select'),
										value = $select.val();
										if ($select.length) {
											$select.select('destroy');
											row[column.field] = value;
//											$td.html($('<div>').text(list[row[column.field]]));
										}
										break;
									}
									case 'text':
									case 'number':
									case 'decimal':
									default: {
										var $input = $td.find('input');
										if ($input.length) {
											var value = $input.val(), old = row[column.field];
											if ($.isNumeric(value)) {
												value = Number(value);
											}
											if (old !== value) {
												$input.trigger('change');
											}
//											$td.html($('<div>').text(row[column.field]));
										}
									}
								}
								var cell = row[column.field],
									celld = $.extend({}, celldata, {
										cell : cell,
										title : cell
									}), cellu = $.extend({}, cellui, {
										$td : $td,
										$div : $div
									});
								$td.html($div);
								_this._formatText(column, cellu, celld);
							}
						}
						$tr.removeClass('tb-tr-editing');
						_this.options.afterEdit(cellui, celldata);
					}
				});
			},
			_changeToEditable : function($tr, $target) {
				var editable = this.options.editRow,
					index = $tr.data('index'),
					row = this.list[index],
					isediting = $tr.is('.tb-tr-editing');
				
				// change to view when click row of editing
				if (isediting) {
					this._changeToView();
					return;
				}
					
				editable = $.isFunction(editable) ? editable(row, index) : editable;
				if (editable) {
					if (!isediting && (this.options.beforeEdit && this.options.beforeEdit(index, row)) !== false) {
						// change other tr to view status 
						// if(this.options.autoEnd){
						// this._changeToView();
						// }
						$tr.addClass('tb-tr-editing');
						var columns =  this.options.columns,
							$tds = $tr.find('td'),
							isEditable = false;
						for ( var i = 0; i < columns.length; i++) {
							var $td = $tds.eq(i),
								column = columns[i],
								cell = row[column.field],
 								data = {
									row : row,
									cell : cell,
									index : index
								},
								ui = {
									$tr : $tr,
									$td : $td
								};
							// && (!column.isEdit || column.isEdit())

							if (column.type && (!column.isEdit || column.isEdit(ui, data))) {
								isEditable = true;
								$td.html(this._generateEditCellDom(column, data, {
									$tr : $tr,
									$td : $td
								}));
							}
						}
						!isEditable && $tr.removeClass('tb-tr-editing');
					}
				}
			},
			_clickBtn : function(e) {
				this.$currentPage.val(this.currentPage);
				this._changePageNumber();
			},
			_changePageSize : function(e) {
				var pageSize = $(e.target).val();
				var total = Math.min((this.currentPage - 1) * this.pageSize + 1, this.total);
				this.currentPage = Math.ceil(total / pageSize) || 1;
				this.pageSize = pageSize;
				this._changePageNumber();
			},
			_entryNumber : function(e) {
				if (e.keyCode == 13) {
					this._blurNumber(e);
				}
			},
			_blurNumber : function(e) {
				var $ipt = $(e.target);
				pageNum = $ipt.val();
				if (pageNum > this.totalSize) {
					pageNum = this.totalSize;
					$ipt.val(pageNum);
				} else if (pageNum < 1) {
					pageNum = 1;
					$ipt.val(pageNum);
				}
				if (this.currentPage != pageNum) {
					this.currentPage = pageNum;
					this._changePageNumber();
				}
			},
			_changePageNumber : function() {
				this._refreshPagerBtn();
				this.$bddiv.scrollTop(0);
				this.options.pager.select(this.currentPage, this.pageSize);
			},
			_refreshPagerBtn : function(){
				this._changeSize(this.pageSize);
				this.$pager.find('.tb-pg-fst, .tb-pg-pre')[this.currentPage == 1 ? 'addClass' : 'removeClass']('tb-btn-disabled');
				this.$pager.find('.tb-pg-next, .tb-pg-last')[this.currentPage == this.totalSize ? 'addClass' : 'removeClass']('tb-btn-disabled');
				this.$pager.find('.tb-pg-rfs')[this.total > 0 ? 'removeClass' : 'addClass']('tb-btn-disabled');
			},
			_resetIndex : function() {
				this.$btable.find('>tbody>tr[findex]').each(function(index) {
					$(this).attr('findex', index);
					$(this).data('index', index);
				});
			},
			_sortNumber : function(s, e) {
				return s - e;
			},
			_syncData : function(){
//				if ($.isPlainObject(this.data)) {
//					this.total = this.data.total;
//					this.list = this.data.rows;
//				} else {
//					this.total = this.data.length;
//					this.list = this.data;
//				}
				this.total = this.list.length;
			},
			_generateEditCellDom : function(column, data, ui){
				var $dom;
				switch (column.type) {
					case 'list': {
						$dom = this._generateEditList(column, data);
						break;
					}
					case 'number':{
						$dom = $('<input class="ht-number" type="text">').val(data.row[column.field]);
						this._addChangeEvent(column, data, ui, $dom);
						break;
					}
					case 'decimal':{
						$dom = $('<input class="ht-decimal" type="text">').val(data.row[column.field]);
						this._addChangeEvent(column, data, ui, $dom);
						break;
					}
					case 'text':
					default: {
						$dom = $('<input type="text">').val(data.row[column.field]);
						this._addChangeEvent(column, data, ui, $dom);
						break;
					}
				}
				if(column.focusText){
					$dom.addClass('ht-text-all');
				}
				$dom.addClass('ui-tb-edit-field');
				column.maxLength && $dom.attr('maxLength', column.maxLength);
				
				column.editor && column.editor($.extend({
					$editor : $dom
				}, ui), data);
				
				return $dom;
			},
			_addChangeEvent : function(column, data, ui, $dom){
				var _this = this;
				$dom.bind('change.ui-tb-ipt-edit',function(e){
					$(this).unbind('change.ui-tb-ipt-edit');
					var row = data.row,
						old = row[column.field];
					row[column.field] = $(this).val();
					column.onChange && column.onChange({
						row : row,
						index : data.index,
						old : old,
						list : _this.list
					}, ui);
				});
			},
			_generateEditList : function(column, data){
				var $select = $('<select>'),
					dataRt = {};
				var	list = column.data;
				if ($.isFunction(list)) {
					list = list(data);
				}
				if($.isPlainObject(list)){
					for (var key in list) {
						$select.append($('<option>').attr('value', key).text(list[key]));
						dataRt[list[key]] = key;
					}
				}else{
					for ( var i = 0; i < list.length; i++) {
						for (var key in list[i]) {
							$select.append($('<option>').attr('value', key).text(list[i][key]));
							dataRt[list[i][key]] = key;
							continue;
						}
					}
				}
				var val = column.isKey === false ? dataRt[data.cell] : data.cell;
				$select.select({
					value : val,
					change : function(old, column, row, index, dataRt, $select){
						return function(obj){
							row[column.field] = obj.val;
							column.onChange && column.onChange({
								row : row,
								old : old,
								index : index,
								select : obj
							});
						};
//						return $.proxy(column.onChange || $.noop, $select, {
//							row : row,
//							index : index
//						});
					}(val, column, data.row, data.index, dataRt, $select)
				});
				return $select.select('widget');
			},
			reload : function(data) {
				this.data = data || this.data;
				if ($.isPlainObject(this.data)) {
					this.data.total !== undefined &&(this.total = this.data.total);
					this.data.pageSize && (this.pageSize = this.data.pageSize || this.pageSize);
					this.data.currentPage && (this.currentPage = this.data.currentPage || this.currentPage);
					this.list = this.data.rows || [];
				} else {
					this.total = this.options.total || this.data.length;
//					currentPage && (this.currentPage = currentPage);
					this.list = this.data;
				}
				this._refreshTip();
				this.$bbody.empty();
				this._generateRow(this.list);
				this._resizeHD();
				this._refreshPager();
				this.options.loadSuccess();
			},
			_refreshTip : function(){
				this.$tbdiv.find('>.ui-tb-nd-tip').remove();
				if(!this.list || !this.list.length){
					var $tip = $('<div>').addClass('ui-tb-nd-tip').html(this.options.noDataTip)
					this.$tbdiv.append($tip);
					$tip.css('marginLeft',-$tip.width()/2);
				}
			},
			_findColumnOption : function(opt) {
				if ($.isNumeric(opt)) {
					return this.options.columns[opt];
				} else {
					var columns = this.options.columns;
					for ( var i = 0; i < columns.length; i++) {
						if (columns[i].field == opt) {
							return columns[i];
						}
					}
				}
			},
			_hideColumn : function(opt) {
				var column = this._findColumnOption(opt);
				this.$hhead.find('td[field="' + column.field + '"]').addClass('ui-hide');
				this.$bhead.find('td[field="' + column.field + '"]').addClass('ui-hide');
				this.$btable.find('>tbody>tr[findex]>td[field="' + column.field + '"]').hide();
				var colspan = this.$btable.find('>thead td:not(.ui-hide)').length;
				this.$btable.find('>tbody>tr.tb-sub-grid>td').attr('colspan', colspan);
				if (this.isPx && !column.hidden) {
					this.twidth -= column.width;
				}
				column.hidden = true;
			},
			hideColumn : function(opt) {
				if ($.isArray(opt)) {
					for ( var i = 0; i < opt.length; i++) {
						this._hideColumn(opt[i]);
					}
				} else {
					this._hideColumn(opt);
				}
				if (this.isPx) {
					this._resizeTb();
				}
				this._resizeHD();
			},
			_showColumn : function(opt) {
				var column = this._findColumnOption(opt);
				column.hidden = false;
				this.$hhead.find('td[field="' + column.field + '"]').removeClass('ui-hide');
				this.$bhead.find('td[field="' + column.field + '"]').removeClass('ui-hide');
				this.$btable.find('>tbody>tr[findex]>td[field="' + column.field + '"]').show();
				if (this.isPx && column.hidden) {
					this.twidth += column.width;
				}
			},
			showColumn : function(opt) {
				if ($.isArray(opt)) {
					for ( var i = 0; i < opt.length; i++) {
						this._showColumn(opt[i]);
					}
				} else {
					this._showColumn(opt);
				}
				if (this.isPx) {
					this._resizeTb();
				}
				this._resizeHD();
			},
			rebuild : function(data){
				
			},
			endEdit : function(index) {
				var $tr = this.$btable.find('>tbody>tr[findex]').eq(index);
				this._changeToView($tr);
			},
			updateRow : function(index) {
				var row = this.list[index], //
				$tr = this.$btable.find('>tbody>tr[findex]').eq(index), //
				$tds = $tr.find('td'), //
				columns = this.options.columns, //
				isediting = $tr.is('.tb-tr-editing');
				if (row === undefined) {
					return;
				}
				for ( var i = 0; i < columns.length; i++) {
					var column = columns[i], 
						$td = $tds.eq(i), 
						$div = $('<div>'),
						cell = row[column.field], 
						cellui = {
							$td : $td,
							$tr : $tr,
							$div : $div
						}, celldata = {
							cell : cell,
							title : cell,
							row : row,
							index : index,
							list : this.list,
							data : this.data,
							field : column.field
						};
//					if (column.checkbox || column.expander) {
//						continue;
//					}
					// 编辑列正在编辑
					if (column.type && isediting && (!column.isEdit || column.isEdit(cellui, celldata))) {
						// 还是可以编辑的情况
						if('list' == column.type){
							$td.find('select').select('destroy');
						}
						$td.html(this._generateEditCellDom(column, celldata, cellui));
					// 非编辑列或者没有在编辑中
					// 编辑列正在编辑但不能编辑了
					} else {
//						$td.html($div);
						this._generateTd(column, cellui, celldata);
//						if (column.formatter) {
//							var ctn = column.formatter(cellui, celldata);
//							if (ctn !== undefined) {
//								celldata.cell = ctn;
//							}
//						} else if (column.data) {
//							var datalist = column.data;
//							if ($.isFunction(datalist)) {
//								datalist = datalist(celldata);
//							}
//							celldata.cell = datalist[celldata.cell];
//						}
//						if (typeof celldata.cell === 'object' || !$.trim(celldata.cell).indexOf('<')) {
//							$td.html(celldata.cell);
//						} else {
//							$td.html($('<div>').text(celldata.cell));
//						}
					}
				}
			},
			getData : function() {
				return this.data;
			},
			getRows : function() {
				return this.list;
			},
			getList : function() {
				return this.list;
			},
			getRow : function(row) {
				return this.list[row];
			},
			getCell : function(opts) {
				return this.list[opts.index][opts.field];
			},
			getChecked : function() {
				var $checked = this.$btable.find('>tbody>tr[findex] .tb-checkbox input[type="checkbox"]:checked');
				var arrs = [],$tr,$otr;
				for ( var i = 0; i < $checked.length; i++) {
					$otr = $checked.eq(i).parents('tr');
					if ($tr == $otr) {
						return;
					}
					$tr = $otr;
					arrs.push(this.list[$tr.data('index')]);
				}
				return this.options.single && this.options.selectOnCheck ? (arrs.length ? arrs[0] : '') : arrs;
			},
			getCheckedIndex : function() {
				var $checked = this.$btable.find('>tbody>tr[findex] .tb-checkbox input[type="checkbox"]:checked');
				var arrs = [], $tr, $otr;
				for ( var i = 0; i < $checked.length; i++) {
					$otr = $checked.eq(i).parents('tr');
					if ($tr == $otr) {
						return;
					}
					$tr = $otr;
					arrs.push($tr.data('index'));
				}
				return this.options.single && this.options.selectOnCheck ? (arrs.length ? arrs[0] : '') : arrs;
			},
			getSelected : function() {
				var $selected = this.$btable.find('>tbody>tr[findex].tb-row-selected');
				var arrs = [];
				for ( var i = 0; i < $selected.length; i++) {
					arrs.push(this.list[$selected.eq(i).data('index')]);
				}
				return this.options.single ? (arrs.length ? arrs[0] : '') : arrs;
			},
			getSelectedIndex : function() {
				var $selected = this.$btable.find('>tbody>tr[findex].tb-row-selected');
				var arrs = [];
				for ( var i = 0; i < $selected.length; i++) {
					arrs.push($selected.eq(i).data('index'));
				}
				return this.options.single ? (arrs.length ? arrs[0] : '') : arrs;
			},
			_deleteRow : function($tr) {
				this.list.splice($tr.data('index'), 1);
				if (this.options.subGrid) {
					$tr.next().remove();
				}
				$tr.remove();
			},
			deleteCheckedRows : function(){
				var $checked = this.$btable.find('>tbody>tr[findex] .tb-checkbox input:checked');
				for ( var i = $checked.length - 1; i >= 0 ; i--) {
					var $tr = $checked.eq(i).parents('tr');
					this._deleteRow($tr);
				}
				this._resizeHD();
				this._resetIndex();
			},
			deleteSelectedRows : function(){
				var $selected = this.$btable.find('>tbody>tr[findex].tb-row-selected');
				for ( var i = $selected.length - 1; i >= 0 ; i--) {
					this._deleteRow($selected.eq(i));
				}
				this._resizeHD();
				this._resetIndex();
			},
			deleteRows : function(rows) {
				rows.sort(this._sortNumber);
				var $trs = this.$btable.find('>tbody>tr[findex]');
				for ( var i = rows.length - 1 ; i >= 0 ; i--) {
					this._deleteRow($trs.eq(rows[i]));
				}
				this._resizeHD();
				this._resetIndex();
			},
			deleteRow : function(row) {
				this._deleteRow(this.$btable.find('>tbody>tr[findex]').eq(row));
				this._resizeHD();
				this._resetIndex();
			},
			addRows : function(list) {
				var start = this.list.length;
				this.list = this.list.concat(list);
				this._refreshTip();
				this._generateRow(this.list, start);
				this._resizeHD();
				this._syncData();
			},
			addRow : function(obj) {
				this.addRows([obj]);
			},
			insertRow : function(opts) {
				var index = Math.min(this.list.length, opts.index);
					index = Math.max(index, 0);
				this.list.splice(index, 0, opts.row);
				this._refreshTip();
				var colspan = this.$btable.find('>thead td:not(.ui-hide)').length,
					$tr = this._renderRow(opts.row, index),
					$str = this._renderSubGrid(this.list, index, this.list[index], colspan);
					$trs = this.$btable.find('>tbody>tr[findex]');
				if ($trs.length && opts.index < this.list.length - 1) {
					$trs.eq(opts.index).before($tr, $str);
				} else {
					this.$bbody.append($tr, $str);
				}
				this._resizeHD();
				this._resetIndex();
				this._syncData();
			},
			loadData : function(list) {
				list = list ? list : [];
				this.reload(list);
			},
			selectRow : function(index) {
				if (this.options.single) {
					this.$btable.find('>tbody>tr.tb-row-selected').removeClass('tb-row-selected');
				}
				this._addChecked(this.$btable.find('>tbody>tr[findex]').eq(index).addClass('tb-row-selected'));
			},
			unSelectRow : function(index) {
				if (!this.options.single) {
					this._removeChecked(this.$btable.find('>tbody>tr[findex]').eq(index).removeClass('tb-row-selected'));
				}
			},
			checkRow : function(index) {
			},
			unCheckRow : function(index) {
			},
			selectRecord : function(id) {
				if (this.options.single) {
					this.$btable.find('>tbody>tr.tb-row-selected').removeClass('tb-row-selected');
				}
				this.$btable.find('>tbody>tr[fid=' + id + ']').addClass('tb-row-selected');
			},
			getRowById : function(id){
				var row = this.list[this.getRowIndex(id)];
				return row ? row : null;
			},
			getRowIndex : function(id){
				var index = this.$btable.find('>tbody>tr[findex][fid=' + id + ']').attr('findex');
				return index ? index : null;
			},
			clear : function() {
				this.currentPage = 1;
				this.total = 0;
				this.data = [];
				this.reload();
				this._refreshPager();
			},
			option : function(opts){
				this.options = $.extend(this.options, opts);
			},
			destroy : function() {
				this.$element.removeData('grid');
				this.$tb.remove();
			},
			showHeader : function(){
				this.$tbdiv.removeClass('tb-no-hd');
			},
			hideHeader : function(){
				this.$tbdiv.addClass('tb-no-hd');
			},
			_clickSort : function(field, $ele){
				this.options.sort.call($ele, field, this.sortMap[field].desc, this.sortMap); 
			},
		};
		$.fn.grid = function(option, value) {
			var methodReturn;
			var $set = this.each(function() {
				var $this = $(this);
				var data = $this.data('grid');
				var options = typeof option === 'object' && option;
				if (!data) {
					$this.data('grid', (data = new Grid(this, options)));
				}
				if (typeof option === 'string') {
					methodReturn = data[option](value);
				}
			});
			return (methodReturn === undefined) ? $set : methodReturn;
		};
		$.fn.grid.defaults = {
			columns : [],
			pageSize : 10,
			single : false,
			hideTopChkBox : false,
			selectable : true,
			select : $.noop,
			unselect : $.noop,
			checkOnSelect : true,
			selectOnCheck : true,
			clickRow : $.noop,
			clickCheckbox : $.noop,
			clickTopCheckbox : $.noop,
			loadSuccess : $.noop,
			beforeView : $.noop,
			afterEdit : $.noop,
			showHeader : true,
			editRow : false,
			autoEnd : true,
			expandSubGrid : true,
			noDataTip : '无数据',
			pager : {
				select : $.noop,
				refresh : $.noop,
				changePageSize : $.noop
			},
			sort : $.noop
		};
		$.fn.grid.Constructor = Grid;
	}
	// END OF DATA GRID
	
	$(window).resize(function(){
		$('.ui-widget-open').removeClass('ui-widget-open');
		$('.ui-widget-out').remove();
	});
})(window.jQuery);

/*! groot v.0.1 */
!function(window,document,console){"use strict";function uniqid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}var log=function(a){console&&console.log&&console.log(a)};if(void 0!==window.Groot)return void log("Library already loaded");var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){var b,c,d,e,f,g,h,i="",j=0;for(a=Base64._utf8_encode(a);j<a.length;)b=a.charCodeAt(j++),c=a.charCodeAt(j++),d=a.charCodeAt(j++),e=b>>2,f=(3&b)<<4|c>>4,g=(15&c)<<2|d>>6,h=63&d,isNaN(c)?g=h=64:isNaN(d)&&(h=64),i+=Base64._keyStr.charAt(e)+Base64._keyStr.charAt(f)+Base64._keyStr.charAt(g)+Base64._keyStr.charAt(h);return i},_utf8_encode:function(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}},JSON2={};!function(){function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx,escapable,gap,indent,meta,rep;escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON2.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})},cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON2.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")}}();var Cookie={parseCookieValue:function(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(pluses," "))}catch(b){}},read:function(a){return this.parseCookieValue(a)},get:function(a){if("undefined"==typeof this.cookies){var b=document.cookie?document.cookie.split("; "):[];this.cookies={};for(var c=0,d=b.length;d>c;c++){var e=b[c].split("="),f=decodeURIComponent(e.shift()),g=e.join("=");this.cookies[f]=g}}return"undefined"!=typeof this.cookies[a]?this.cookies[a]:void 0},set:function(a,b,c,d,e){if(void 0!==b){if("number"==typeof e){var f=e,g=new Date;e=g,g.setTime(+g+864e5*f)}return document.cookie=[encodeURIComponent(a),"=",encodeURIComponent(String(b)),e?"; expires="+e.toUTCString():"",d?"; path="+d:"",c?"; domain="+c:""].join("")}},remove:function(a){this.set(a,"",null,null,-1)}},Groot={properties:{$source:{}},init:function(a){if(this._loaded)throw new Error("Library already inited");if("undefined"==typeof a||""===a)throw new Error("siteId is required");this.siteid=a,this._loaded=!0,this.cookie_name="groot_"+this.siteid,this.domain=window.location.hostname;var b=Cookie.get(this.cookie_name);if("undefined"==typeof b){var c=document.referrer||"",d={$source:{}};if(""!==c){var e=document.createElement("a");e.href=c,this.properties.referrer=c,this.properties.referrer_domain=e.hostname}else this.properties.referrer="Direct",this.properties.referrer_domain="Direct";for(var f="utm_source utm_medium utm_campaign utm_content utm_term".split(" "),g=document.createElement("a").href=window.location,h=this._queryString(g.search),i=0;i<f.length;i++)"undefined"!=typeof h[f[i]]&&(this.properties.$source[f[i]]=h[f[i]],d.$source[f[i]]=h[f[i]]);this.distinct_id=uniqid(),this.saveCookie()}else{var j=JSON2.parse(decodeURIComponent(b));this.properties.$source=j.$source,this.properties.referrer=j.referrer,this.properties.referrer_domain=j.referrer_domain,this.distinct_id=j.distinct_id,this.alias=j.alias}},getBrowser:function(){var a,b=navigator.appName,c=navigator.userAgent,d=c.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);return d&&null!=(a=c.match(/version\/([\.\d]+)/i))&&(d[2]=a[1]),d=d?[d[1],d[2]]:[b,navigator.appVersion,"-?"],d[0]},track:function(a){if("undefined"==typeof a)throw new Error("Invalid event name");var b={name:a,props:{subsite_id:this.siteid+"",ts:(new Date).getTime(),uid:this.distinct_id,lib:"web",browser:this.getBrowser(),referrer:this.properties.referrer,referrer_domain:this.properties.referrer_domain},source:this.properties.$source};"undefined"!=typeof this.alias&&(b.props.alias=this.alias),log(b),this._xhrRequest(b)},identify:function(a){"number"!=typeof a&&(a=parseInt(a,10)),this.alias=a,this.saveCookie()},saveCookie:function(){var a={$source:this.properties.$source,distinct_id:this.distinct_id,alias:this.alias,referrer:this.properties.referrer,referrer_domain:this.properties.referrer_domain};Cookie.set(this.cookie_name,JSON2.stringify(a),this.domain,"/",365)},_xhrRequest:function(a){var b;b=window.JSON&&window.JSON.stringify?window.JSON.stringify(a):JSON2.stringify(a),b=Base64.encode(b);var c=new Image;c.src="http://groot.ivi.ru/track?data="+b+"&_="+(new Date).getTime()},_queryString:function(a){a=a.substr(1).split("&");for(var b={},c=0;c<a.length;c++){var d=a[c].split("=");b[d[0]]=d[1]}return b}};window.Groot=Groot}(window,document,console);
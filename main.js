// Generated by Haxe 4.0.0 (git build module-levels @ 435b2f2)
if (typeof process !== "undefined") if (process.version < "v4.0.0") console.warn("Module " + (typeof(module) == "undefined" ? "" : module.filename) + " requires node.js version 4.0.0 or higher");

(function () { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.filter = function(it,f) {
	var l = new List();
	var x = it.iterator();
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			l.add(x1);
		}
	}
	return l;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = new _$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = new _$List_ListNode(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
};
var _$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
_$List_ListNode.__name__ = true;
var _$List_ListIterator = function(head) {
	this.head = head;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var token = process.env["BOT_TOKEN"];
	if(token == null) {
		token = js_node_Fs.readFileSync("bottoken.txt",{ encoding : "utf8"});
	}
	var api = new telegram_bot_BotApi(new telegram_bot_Connection(token));
	var onUpdate = function(update) {
		if(update.message != null) {
			api.connection.execute("sendMessage",{ text : "Я тут", reply_to_message_id : update.message.message_id, chat_id : update.message.chat.id},null);
		}
	};
	var _this = new telegram_bot_PollUpdateListener(api,onUpdate,10);
	var cb = function() {
		console.log("Main.hx:22:","Bot started");
	};
	var _gthis = _this;
	_this.stopped = false;
	_this.api.connection.execute("setWebhook",{ url : ""},function(_) {
		_gthis.loop();
		cb();
	});
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) {
		v = parseInt(x);
	}
	if(isNaN(v)) {
		return null;
	}
	return v;
};
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
};
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	setHeader: function(header,value) {
		this.headers = Lambda.filter(this.headers,function(h) {
			return h.header != header;
		});
		this.headers.push({ header : header, value : value});
		return this;
	}
	,setPostData: function(data) {
		this.postData = data;
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var parsedUrl = js_node_Url.parse(this.url);
		var secure = parsedUrl.protocol == "https:";
		var host = parsedUrl.hostname;
		var path = parsedUrl.path;
		var port = parsedUrl.port != null ? Std.parseInt(parsedUrl.port) : secure ? 443 : 80;
		var h = { };
		var _g_head = this.headers.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var i = val;
			var arr = Reflect.field(h,i.header);
			if(arr == null) {
				arr = [];
				h[i.header] = arr;
			}
			arr.push(i.value);
		}
		var uri = this.postData;
		if(uri != null) {
			post = true;
		} else {
			var _g_head1 = this.params.h;
			while(_g_head1 != null) {
				var val1 = _g_head1.item;
				_g_head1 = _g_head1.next;
				var p = val1;
				if(uri == null) {
					uri = "";
				} else {
					uri += "&";
				}
				var s = p.param;
				var uri1 = encodeURIComponent(s) + "=";
				var s1 = p.value;
				uri += uri1 + encodeURIComponent(s1);
			}
		}
		var question = path.split("?").length <= 1;
		if(!post && uri != null) {
			path += (question ? "?" : "&") + uri;
		}
		var opts = { protocol : parsedUrl.protocol, hostname : host, port : port, method : post ? "POST" : "GET", path : path, headers : h};
		var httpResponse = function(res) {
			var s2 = res.statusCode;
			if(s2 != null) {
				me.onStatus(s2);
			}
			var body = "";
			res.on("data",function(d) {
				body += d;
			});
			res.on("end",function(_) {
				me.responseData = body;
				me.req = null;
				if(s2 != null && s2 >= 200 && s2 < 400) {
					me.onData(body);
				} else {
					me.onError("Http Error #" + s2);
				}
			});
		};
		this.req = secure ? js_node_Https.request(opts,httpResponse) : js_node_Http.request(opts,httpResponse);
		if(post) {
			this.req.write(uri);
		}
		this.req.end();
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
var haxe_ds_Either = { __ename__ : true, __constructs__ : ["Left","Right"] };
haxe_ds_Either.Left = function(v) { var $x = ["Left",0,v]; $x.__enum__ = haxe_ds_Either; $x.toString = $estr; return $x; };
haxe_ds_Either.Right = function(v) { var $x = ["Right",1,v]; $x.__enum__ = haxe_ds_Either; $x.toString = $estr; return $x; };
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.fastGet = function(b,pos) {
	return b.bytes[pos];
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_node_Fs = require("fs");
var js_node_Http = require("http");
var js_node_Https = require("https");
var js_node_Url = require("url");
var telegram_bot_BotApi = function(connection) {
	this.connection = connection;
};
telegram_bot_BotApi.__name__ = true;
var telegram_bot_Connection = function(token) {
	this.token = token;
};
telegram_bot_Connection.__name__ = true;
telegram_bot_Connection.prototype = {
	execute: function(name,params,callback) {
		var req = new haxe_Http("https://api.telegram.org/bot" + this.token + "/" + name);
		if(callback != null) {
			req.onData = function(s) {
				var res;
				try {
					res = JSON.parse(s);
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					callback(haxe_ds_Either.Left({ message : Std.string(e)}));
					return;
				}
				if(res.ok) {
					callback(haxe_ds_Either.Right(res.result));
				} else {
					callback(haxe_ds_Either.Left({ message : res.description}));
				}
			};
			req.onError = function(e1) {
				callback(haxe_ds_Either.Left({ message : e1}));
			};
		}
		req.setPostData(JSON.stringify(params));
		req.setHeader("Content-Type","application/json");
		req.request(true);
	}
};
var telegram_bot_PollUpdateListener = function(api,handler,timeout) {
	this.api = api;
	this.handler = handler;
	this.timeout = timeout;
	this.stopped = false;
	this.lastUpdate = -1;
};
telegram_bot_PollUpdateListener.__name__ = true;
telegram_bot_PollUpdateListener.prototype = {
	loop: function() {
		var _gthis = this;
		this.api.connection.execute("getUpdates",{ offset : this.lastUpdate + 1, timeout : this.timeout},function(result) {
			if(_gthis.stopped) {
				return;
			}
			switch(result[1]) {
			case 0:
				var error = result[2];
				throw new js__$Boot_HaxeError(JSON.stringify(error));
			case 1:
				var updates = result[2];
				var _g = 0;
				while(_g < updates.length) {
					var update = updates[_g];
					++_g;
					_gthis.lastUpdate = update.update_id;
					_gthis.handler(update);
				}
				break;
			}
			_gthis.loop();
		});
	}
};
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
Main.main();
})();

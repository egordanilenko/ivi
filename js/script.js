//public_html/js/compiled/da.autocomplete.js
if (da == void 0) var da = [];
da.autocomplete = function(a) {
	this.input = $(a.input);
	this.success = a.success;
	this.section = a.section;
	this.content = a.content;
	this.person = a.person;
	this.cache = [];
	this.settings = a;
	this.input.keyup(this.keyup())
};
da.autocomplete.escape = 27;
da.autocomplete.searchable = /.{2,}|[0-9]/;
da.autocomplete.prototype.keyup = function() {
	var a = this;
	return function(b) {
		if (b.keyCode == da.autocomplete.escape) return a.hide();
		b = a.input.val();
		if (!da.autocomplete.searchable.test(b)) return a.hide();
		a.fetch(b)
	}
};
da.autocomplete.prototype.fetch = function(a) {
	if (this.cache[a]) return this.draw(this.cache[a]);
	var b = this;
	$.ajax({
		url: this.input.data("autocomplete"),
		data: {
			q: a,
			json: 1,
			limit: 8
		},
		dataType: "json",
		error: function() {
			b.hide()
		},
		success: function(c) {
			b.addToCache(a);
			b.draw(c)
		}
	})
};
da.autocomplete.prototype.addToCache = function(a, b) {
	this.cache[a] = b
};
da.autocomplete.prototype.draw = function(a) {
	var b = $("<ul>"),
		c = 0;
	a && a.content && (c += this.list(b, a.content, "content"));
	a && a.person && (c += this.list(b, a.person, "person"));
	c ? (this.success(a, b), this.show(b)) : this.hide()
};
da.autocomplete.prototype.show = function(a) {
	this.ul = a;
	var b = this.input.offset();
	if (!this.block) {
		this.block = $(document.createElement("div")).addClass(this.settings.className);
		var c = this;
		$(document.body).click(function() {
			c.hide()
		});
		$(document.body).append(this.block)
	}
	this.block.html("").append(a);
	this.block.css({
		width: px(this.settings.width || this.input.width()),
		top: px(this.settings.marginTop + this.input.height() / 2),
		left: px(b.left + this.settings.marginLeft)
	}).show()
};
da.autocomplete.prototype.hide = function() {
	this.block && this.block.hide()
};
function px(a) {
	return a + "px"
}
da.autocomplete.prototype.list = function(a, b, c) {
	if (!b || b.length == 0) return 0;
	a.append(this.section({
		section: c
	}));
	var e = this,
		d = 0;
	$(b).each(function() {
		a.append(e[c](this));
		d++
	});
	return d
};
//public_html/js/compiled/da.track.js
da.track = {
	configure: function(a) {
		$.template("da_track_go", a.go);
		$.template("da_track_q", a.q);
		da.track.exclude = RegExp(a.exclude)
	},
	patchURL: function(a) {
		return $.tmpl("da_track_go", a).text()
	},
	search: function(a, d) {
		this.track = a;
		var b = this;
		this.uid = (new Date).getTime() + "_" + Math.random();
		this.prev = d ? d.uid : "";
		this.patchURL = function(e, a) {
			return da.track.patchURL({
				url: e,
				area: a,
				uid: this.uid,
				track: this.track
			})
		};
		this.go = function(e, a) {
			e.find("a").each(function() {
				this.href = b.patchURL(this.getAttribute("href"), a)
			})
		};
		this.each = function(a, d, c) {
			c || (c = 0);
			a.each(function() {
				c++;
				b.go($(this), d + c)
			});
			return c
		};
		this.log = function() {
			var a = new Image;
			a.src = $.tmpl("da_track_q", {
				track: b.track,
				uid: b.uid,
				prev: b.prev
			}).text();
			a.width = 1;
			a.height = 1;
			$(document.body).append(a)
		}
	}
};
//public_html/js/compiled/da.captcha.js
da.captcha = {
	show: function(b) {
		var a = {};
		a.$code = da.captcha._onlyone(b.code);
		a.$img = da.captcha._onlyone(b.img);
		a.$code.data("url") || a.$code.parent().hide();
		a.reload = function() {
			var b = $.Deferred();
			data = {};
			if (da.captcha.ip) data.ip = da.captcha.ip;
			$.ajax({
				url: a.$code.data("url") + "create",
				dataType: "jsonp",
				data: data,
				success: function(c) {
					var d = $(document.createElement("img"));
					d.attr("src", a.$code.data("url") + "image?code=" + c.code).ready(function() {
						a.$code.attr("value", c.code);
						a.$img.attr("src", d.attr("src"));
						b.resolve(a)
					}).error(function() {
						b.reject(a, "generate image fault")
					})
				},
				error: function(c, d, e) {
					b.reject(a, "create code fault", c, d, e)
				}
			});
			return b
		};
		var c = a.reload();
		b.success && c.done(b.success);
		return c
	},
	_onlyone: function(b, a) {
		var c = $(b);
		if (c.length != 1) throw "Invalid " + a + " selector: " + b + ", " + c.length + " objects found, seems to be 1";
		return c
	}
};
//public_html/js/compiled/watch.js
if (da == void 0) var da = [];
da.watch = [];
da.watch.branding = function() {
	var a = $("#video-player-wrapper"),
		c = a.find("div.branding-link").data("url");
	c && a.find(".clickable").click(function() {
		window.open(c);
		return !1
	})
};
da.watch.render = function(a) {
	var c = "";
	return {
		item: function(a) {
			c += a.html
		},
		ready: function() {
			a.append(c);
			gravity.setRecommendationClickEvent(a, da.watch.recommendationId);
			c = "";
			a.removeClass("loading");
			a.children("li").each(function() {
				da.watch.render.hasPopup.test(this.className) || (this.className += " has_popup", $(this).iviMoviePopup())
			})
		}
	}
};
da.watch.render.hasPopup = /\bhas_popup\b/;
da.watch.related = {
	buildSelect: function(a) {
		var c = a.find("select");
		if (c.length != 1) return !1;
		var b = da.watch.related.onerror(a),
			d = da.watch.related.buildLoader(a);
		$.ajax({
			url: c.data("src"),
			dataType: "json",
			success: function(e) {
				if (e.error) return b();
				for (var f = null, g = 0, h = 0; h < e.entries.length; h++) if (e.entries[h].total > 1) {
					f || (f = e.entries[h]);
					g += 1;
					var i = document.createElement("option");
					i.value = e.entries[h].id;
					i.innerHTML = e.entries[h].title;
					c.append(i)
				}
				f ? (d(f.id), g == 1 ? (c.hide(), $h2 = a.find(".h2i"), $h2.html($h2.data("one").replace("$", f.title))) : (cuSel({
					changedEl: c[0],
					visRows: 7
				}), $("#property_id").change(function() {
					d(this.value)
				}))) : b({
					message: "Empty set"
				})
			},
			error: b
		})
	},
	count: {
		0: 8,
		8: 16,
		16: 24
	},
	buildLoader: function(a) {
		var c = a.data("exclude"),
			b = a.find("ul.list"),
			d = a.find("a.more").hide(),
			e = da.watch.render(b),
			f = {
				url: a.data("src"),
				error: da.watch.related.onerror(a),
				render: function(a) {
					if (c == a.uid) return !1;
					e.item(a);
					return !0
				},
				data: {
					render: a.data("render")
				},
				ready: function(b) {
					da.lazy.show(a);
					e.ready();
					if (!b.next) return d.hide();
					var c = da.watch.related.count[parseInt(d.data("count"))];
					if (c == void 0) return d.hide();
					d.show();
					d.data("count", c);
					d.data("from", b.next)
				}
			},
			g = function(a, e, g) {
				if (b.hasClass("loading")) return !1;
				else b.addClass("loading");
				d.data("id", a);
				d.data("count", g);
				f.data.id = a;
				f.data.from = e;
				f.data.count = g + 1;
				f.data.contentuid = c;
				f.displayCount = g;
				da.feed.load(da.feed.paging(f))
			};
		d.click(function() {
			g(d.data("id"), d.data("from"), d.data("count"));
			return !1
		});
		return function(a) {
			b.html("");
			g(a, 0, da.watch.related.count[0])
		}
	},
	onerror: function(a) {
		return function(c) {
			a.hide();
			da.on("ajax_error").fire(c);
			da.on("window_resize").fire()
		}
	}
};
da.watch.recomedations = function(a) {
	var c = gravity.instance(),
		b = da.settings.data(a);
	b.target = a.find("ul.list");
	b.data = {
		render: a.data("render")
	};
	var d = da.watch.render(b.target);
	b.render = d.item;
	b.ready = function() {
		da.lazy.show(a);
		d.ready()
	};
	b.more = a.find("a.more");
	b.error = function() {
		b.target.removeClass("loading")
	};
	var e = da.feed.ids(b, [6, 12, 18]);
	c.parseParams(b);
	c.fetch(gravity.scenarios.item_page, b.get("prefetch", 60), [], gravity.ids(function(a, b) {
		da.watch.recommendationId = b;
		e(a)
	}))
};
da.watch.selection = function(a) {
	var c = [4, 8, 12],
		b = 0,
		d = a.find("a.more").hide(),
		e = [],
		e = {
			url: a.data("src"),
			data: {
				from: 0,
				count: c[0]
			},
			render: da.feed.render({
				target: a.find("ul.list"),
				tpl: da.feed.jqtpl("#html_watch_selections_item")
			}),
			ready: function(f) {
				da.lazy.show(a);
				b++;
				f.next && c[b] != void 0 ? (e.data.from = f.next, e.data.count = c[b], d.show()) : d.hide()
			},
			error: function() {
				a.hide()
			}
		};
	da.feed.load(da.feed.paging(e));
	d.click(function() {
		d.hide();
		da.feed.load(da.feed.paging(e));
		return !1
	})
};
da.watch.fetchCurrentGenre = function() {
	var a = da.watch.fetchURLGenre();
	if (a) return a;
	return da.watch.fetchRefererGenre(document.referrer, document.location.host)
};
da.watch.fetchURLGenre = function() {
	var a = /^\#genre_id=(\d+)$/.exec(document.location.hash);
	if (a) return a[1]
};
da.watch.fetchRefererGenre = function(a, c) {
	if (!a) return null;
	var b = /^(https|http)\:\/\/(.*?)\/videos\/all\/(\w+)\/(\w+)\//.exec(a);
	if (!b) return null;
	if (b[2] != c) return null;
	b = $("#" + b[3] + "_" + b[4]);
	if (b.length) return b.data("id");
	return null
};
da.watch.addAfishaReview = function(a) {
	var c = a.data("uid");
	a.children("li").length == 0 && $(".wrap-url-all-reviews").hide();
	c && da.feed.load({
		url: "/review/ajax/afisha/review/",
		data: {
			uid: c
		},
		render: function(b) {
			var c = a.children("li");
			c.length == 3 && $(c[2]).remove();
			b.rating = parseInt(b.rate);
			c = da.feed.jqtpl("#html_watch_review_afisha")(b);
			c.find(".scale-rating div").css({
				width: parseInt(20 * b.rate) + "%"
			});
			a.prepend(c)
		},
		empty: function() {
			a.find("li").length == 0 && a.hide()
		},
		success: function(a) {
			a.rating && ($("#afisha_rating").html(da.feed.jqtpl("#afisha_rating_tpl")(a)), $("#content_ratings").show())
		}
	})
};
da.watch.processSelectionsBlock = function(a) {
	a = $(a);
	$("ul li", a).length === 0 && a.hide()
};
//public_html/js/compiled/lazy.js
if (da == void 0) var da = [];
da.lazy = {
	add: function(a, c) {
		if (!a.length) return !1;
		da.lazy.hide(a);
		var b = new da.lazy.callback(a, c);
		da.lazy.callbacks.push(b);
		da.lazy.reload();
		return b
	},
	preloadHeight: 0,
	setPreloadHeight: function(a) {
		da.lazy.preloadHeight = a;
		da.lazy.reload();
		return da.lazy
	},
	height: 0,
	$document: null,
	callbacks: [],
	start: function() {
		da.lazy.$document = $(document);
		$(window).scroll(da.lazy.onscroll);
		$(window).resize(function() {
			da.lazy.reload()
		});
		da.lazy.reload();
		return da.lazy
	},
	reload: function() {
		if (da.lazy.$document) {
			da.lazy.height = $(document.body).height();
			if (da.lazy.preloadHeight) {
				var a = /^(\d+)\%$/.exec(da.lazy.preloadHeight);
				da.lazy.height += a ? parseInt(a[1]) * da.lazy.height / 100 : da.lazy.preloadHeight
			}
			return da.lazy.onscroll()
		}
	},
	onscroll: function() {
		if (da.lazy.locked()) return !1;
		for (var a = da.lazy.height + da.lazy.$document.scrollTop(), c = da.lazy.callbacks.length, b = 0; b < c; b++) da.lazy.callbacks[b].executeVisible(a);
		return !0
	},
	locked: function() {
		return !1
	},
	lock: function() {
		var a = da.lazy.$document.scrollTop();
		da.lazy.locked = function() {
			if (da.lazy.$document.scrollTop() >= a) return a = da.lazy.$document.scrollTop(), !0;
			da.lazy.locked = function() {
				return !1
			};
			da.lazy.reload();
			return !1
		}
	},
	callback: function(a, c) {
		this.used = !1;
		this.recalc = function() {
			this.top = a.offset().top
		};
		this.recalc();
		this.callback = c ? c : da.lazy.buildCallbackFunction(a);
		this.executeVisible = function(b) {
			if (this.used) return !1;
			if (b < this.top) return !1;
			this.used = !0;
			this.callback(a, da.lazy.reload) && da.lazy.show(a)
		}
	},
	buildCallbackFunction: function(a) {
		for (var c = window, a = a.data("lazy").split("."), b = 0; b < a.length; b++) c = c[a[b]];
		return c
	},
	hide: function(a) {
		a.css({
			visibility: "hidden"
		})
	},
	show: function(a) {
		a.css({
			visibility: "visible"
		})
	}
};
//public_html/js/compiled/jquery.utils.js
//public_html/js/compiled/jquery-1.7.1.js
(function(a, b) {
	function cy(a) {
		return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
	}
	function cv(a) {
		if (!ck[a]) {
			var b = c.body,
				d = f("<" + a + ">").appendTo(b),
				e = d.css("display");
			d.remove();
			if (e === "none" || e === "") {
				cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
				if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
				d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl)
			}
			ck[a] = e
		}
		return ck[a]
	}
	function cu(a, b) {
		var c = {};
		f.each(cq.concat.apply([], cq.slice(0, b)), function() {
			c[this] = a
		});
		return c
	}
	function ct() {
		cr = b
	}
	function cs() {
		setTimeout(ct, 0);
		return cr = f.now()
	}
	function cj() {
		try {
			return new a.ActiveXObject("Microsoft.XMLHTTP")
		} catch (b) {}
	}
	function ci() {
		try {
			return new a.XMLHttpRequest
		} catch (b) {}
	}
	function cc(a, c) {
		a.dataFilter && (c = a.dataFilter(c, a.dataType));
		var d = a.dataTypes,
			e = {},
			g, h, i = d.length,
			j, k = d[0],
			l, m, n, o, p;
		for (g = 1; g < i; g++) {
			if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
			l = k, k = d[g];
			if (k === "*") k = l;
			else if (l !== "*" && l !== k) {
				m = l + " " + k, n = e[m] || e["* " + k];
				if (!n) {
					p = b;
					for (o in e) {
						j = o.split(" ");
						if (j[0] === l || j[0] === "*") {
							p = e[j[1] + " " + k];
							if (p) {
								o = e[o], o === !0 ? n = p : p === !0 && (n = o);
								break
							}
						}
					}
				}!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
			}
		}
		return c
	}
	function cb(a, c, d) {
		var e = a.contents,
			f = a.dataTypes,
			g = a.responseFields,
			h, i, j, k;
		for (i in g) i in d && (c[g[i]] = d[i]);
		while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
		if (h) for (i in e) if (e[i] && e[i].test(h)) {
			f.unshift(i);
			break
		}
		if (f[0] in d) j = f[0];
		else {
			for (i in d) {
				if (!f[0] || a.converters[i + " " + f[0]]) {
					j = i;
					break
				}
				k || (k = i)
			}
			j = j || k
		}
		if (j) {
			j !== f[0] && f.unshift(j);
			return d[j]
		}
	}
	function ca(a, b, c, d) {
		if (f.isArray(b)) f.each(b, function(b, e) {
			c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
		});
		else if (!c && b != null && typeof b == "object") for (var e in b) ca(a + "[" + e + "]", b[e], c, d);
		else d(a, b)
	}
	function b_(a, c) {
		var d, e, g = f.ajaxSettings.flatOptions || {};
		for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
		e && f.extend(!0, a, e)
	}
	function b$(a, c, d, e, f, g) {
		f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
		var h = a[f],
			i = 0,
			j = h ? h.length : 0,
			k = a === bT,
			l;
		for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
		(k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
		return l
	}
	function bZ(a) {
		return function(b, c) {
			typeof b != "string" && (c = b, b = "*");
			if (f.isFunction(c)) {
				var d = b.toLowerCase().split(bP),
					e = 0,
					g = d.length,
					h, i, j;
				for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
			}
		}
	}
	function bC(a, b, c) {
		var d = b === "width" ? a.offsetWidth : a.offsetHeight,
			e = b === "width" ? bx : by,
			g = 0,
			h = e.length;
		if (d > 0) {
			if (c !== "border") for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
			return d + "px"
		}
		d = bz(a, b, b);
		if (d < 0 || d == null) d = a.style[b] || 0;
		d = parseFloat(d) || 0;
		if (c) for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
		return d + "px"
	}
	function bp(a, b) {
		b.src ? f.ajax({
			url: b.src,
			async: !1,
			dataType: "script"
		}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
	}
	function bo(a) {
		var b = c.createElement("div");
		bh.appendChild(b), b.innerHTML = a.outerHTML;
		return b.firstChild
	}
	function bn(a) {
		var b = (a.nodeName || "").toLowerCase();
		b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
	}
	function bm(a) {
		if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
	}
	function bl(a) {
		return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
	}
	function bk(a, b) {
		var c;
		if (b.nodeType === 1) {
			b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
			if (c === "object") b.outerHTML = a.outerHTML;
			else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") if (c === "option") b.selected = a.defaultSelected;
			else {
				if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
			} else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
			b.removeAttribute(f.expando)
		}
	}
	function bj(a, b) {
		if (b.nodeType === 1 && !! f.hasData(a)) {
			var c, d, e, g = f._data(a),
				h = f._data(b, g),
				i = g.events;
			if (i) {
				delete h.handle, h.events = {};
				for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
			}
			h.data && (h.data = f.extend({}, h.data))
		}
	}
	function bi(a, b) {
		return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
	}
	function U(a) {
		var b = V.split("|"),
			c = a.createDocumentFragment();
		if (c.createElement) while (b.length) c.createElement(b.pop());
		return c
	}
	function T(a, b, c) {
		b = b || 0;
		if (f.isFunction(b)) return f.grep(a, function(a, d) {
			var e = !! b.call(a, d, a);
			return e === c
		});
		if (b.nodeType) return f.grep(a, function(a, d) {
			return a === b === c
		});
		if (typeof b == "string") {
			var d = f.grep(a, function(a) {
				return a.nodeType === 1
			});
			if (O.test(b)) return f.filter(b, d, !c);
			b = f.filter(b, d)
		}
		return f.grep(a, function(a, d) {
			return f.inArray(a, b) >= 0 === c
		})
	}
	function S(a) {
		return !a || !a.parentNode || a.parentNode.nodeType === 11
	}
	function K() {
		return !0
	}
	function J() {
		return !1
	}
	function n(a, b, c) {
		var d = b + "defer",
			e = b + "queue",
			g = b + "mark",
			h = f._data(a, d);
		h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
			!f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
		}, 0)
	}
	function m(a) {
		for (var b in a) {
			if (b === "data" && f.isEmptyObject(a[b])) continue;
			if (b !== "toJSON") return !1
		}
		return !0
	}
	function l(a, c, d) {
		if (d === b && a.nodeType === 1) {
			var e = "data-" + c.replace(k, "-$1").toLowerCase();
			d = a.getAttribute(e);
			if (typeof d == "string") {
				try {
					d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
				} catch (g) {}
				f.data(a, c, d)
			} else d = b
		}
		return d
	}
	function h(a) {
		var b = g[a] = {},
			c, d;
		a = a.split(/\s+/);
		for (c =
		0, d = a.length; c < d; c++) b[a[c]] = !0;
		return b
	}
	var c = a.document,
		d = a.navigator,
		e = a.location,
		f = function() {
			function J() {
				if (!e.isReady) {
					try {
						c.documentElement.doScroll("left")
					} catch (a) {
						setTimeout(J, 1);
						return
					}
					e.ready()
				}
			}
			var e = function(a, b) {
				return new e.fn.init(a, b, h)
			},
				f = a.jQuery,
				g = a.$,
				h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
				j = /\S/,
				k = /^\s+/,
				l = /\s+$/,
				m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
				n = /^[\],:{}\s]*$/,
				o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				q = /(?:^|:|,)(?:\s*\[)+/g,
				r = /(webkit)[ \/]([\w.]+)/,
				s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
				t = /(msie) ([\w.]+)/,
				u = /(mozilla)(?:.*? rv:([\w.]+))?/,
				v = /-([a-z]|[0-9])/ig,
				w = /^-ms-/,
				x = function(a, b) {
					return (b + "").toUpperCase()
				},
				y = d.userAgent,
				z, A, B, C = Object.prototype.toString,
				D = Object.prototype.hasOwnProperty,
				E = Array.prototype.push,
				F = Array.prototype.slice,
				G = String.prototype.trim,
				H = Array.prototype.indexOf,
				I = {};
			e.fn = e.prototype = {
				constructor: e,
				init: function(a, d, f) {
					var g, h, j, k;
					if (!a) return this;
					if (a.nodeType) {
						this.context =
						this[0] = a, this.length = 1;
						return this
					}
					if (a === "body" && !d && c.body) {
						this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
						return this
					}
					if (typeof a == "string") {
						a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
						if (g && (g[1] || !d)) {
							if (g[1]) {
								d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
								return e.merge(this, a)
							}
							h = c.getElementById(g[2]);
							if (h && h.parentNode) {
								if (h.id !== g[2]) return f.find(a);
								this.length = 1, this[0] = h
							}
							this.context = c, this.selector = a;
							return this
						}
						return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
					}
					if (e.isFunction(a)) return f.ready(a);
					a.selector !== b && (this.selector = a.selector, this.context = a.context);
					return e.makeArray(a, this)
				},
				selector: "",
				jquery: "1.7.1",
				length: 0,
				size: function() {
					return this.length
				},
				toArray: function() {
					return F.call(this, 0)
				},
				get: function(a) {
					return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
				},
				pushStack: function(a, b, c) {
					var d = this.constructor();
					e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
					return d
				},
				each: function(a, b) {
					return e.each(this, a, b)
				},
				ready: function(a) {
					e.bindReady(), A.add(a);
					return this
				},
				eq: function(a) {
					a = +a;
					return a === -1 ? this.slice(a) : this.slice(a, a + 1)
				},
				first: function() {
					return this.eq(0)
				},
				last: function() {
					return this.eq(-1)
				},
				slice: function() {
					return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
				},
				map: function(a) {
					return this.pushStack(e.map(this, function(b, c) {
						return a.call(b, c, b)
					}))
				},
				end: function() {
					return this.prevObject || this.constructor(null)
				},
				push: E,
				sort: [].sort,
				splice: [].splice
			}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
				var a, c, d, f, g, h, i = arguments[0] || {},
					j = 1,
					k = arguments.length,
					l = !1;
				typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
				for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
					d = i[c], f = a[c];
					if (i === f) continue;
					l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
				}
				return i
			}, e.extend({
				noConflict: function(b) {
					a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
					return e
				},
				isReady: !1,
				readyWait: 1,
				holdReady: function(a) {
					a ? e.readyWait++ : e.ready(!0)
				},
				ready: function(a) {
					if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
						if (!c.body) return setTimeout(e.ready, 1);
						e.isReady = !0;
						if (a !== !0 && --e.readyWait > 0) return;
						A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
					}
				},
				bindReady: function() {
					if (!A) {
						A = e.Callbacks("once memory");
						if (c.readyState === "complete") return setTimeout(e.ready, 1);
						if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
						else if (c.attachEvent) {
							c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
							var b = !1;
							try {
								b = a.frameElement == null
							} catch (d) {}
							c.documentElement.doScroll && b && J()
						}
					}
				},
				isFunction: function(a) {
					return e.type(a) === "function"
				},
				isArray: Array.isArray ||
				function(a) {
					return e.type(a) === "array"
				},
				isWindow: function(a) {
					return a && typeof a == "object" && "setInterval" in a
				},
				isNumeric: function(a) {
					return !isNaN(parseFloat(a)) && isFinite(a)
				},
				type: function(a) {
					return a == null ? String(a) : I[C.call(a)] || "object"
				},
				isPlainObject: function(a) {
					if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
					try {
						if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
					} catch (c) {
						return !1
					}
					var d;
					for (d in a);
					return d === b || D.call(a, d)
				},
				isEmptyObject: function(a) {
					for (var b in a) return !1;
					return !0
				},
				error: function(a) {
					throw new Error(a);
				},
				parseJSON: function(b) {
					if (typeof b != "string" || !b) return null;
					b = e.trim(b);
					if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
					if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
					e.error("Invalid JSON: " + b)
				},
				parseXML: function(c) {
					var d, f;
					try {
						a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
					} catch (g) {
						d = b
					}(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
					return d
				},
				noop: function() {},
				globalEval: function(b) {
					b && j.test(b) && (a.execScript ||
					function(b) {
						a.eval.call(a, b)
					})(b)
				},
				camelCase: function(a) {
					return a.replace(w, "ms-").replace(v, x)
				},
				nodeName: function(a, b) {
					return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
				},
				each: function(a, c, d) {
					var f, g = 0,
						h = a.length,
						i = h === b || e.isFunction(a);
					if (d) if (i) for (f in a) {
						if (c.apply(a[f], d) === !1) break
					} else
					for (; g < h;) {
						if (c.apply(a[g++], d) === !1) break
					} else if (i) for (f in a) {
						if (c.call(a[f], f, a[f]) === !1) break
					} else
					for (; g < h;) if (c.call(a[g], g, a[g++]) === !1) break;
					return a
				},
				trim: G ?
				function(a) {
					return a == null ? "" : G.call(a)
				} : function(a) {
					return a == null ? "" : (a + "").replace(k, "").replace(l, "")
				},
				makeArray: function(a, b) {
					var c = b || [];
					if (a != null) {
						var d = e.type(a);
						a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
					}
					return c
				},
				inArray: function(a, b, c) {
					var d;
					if (b) {
						if (H) return H.call(b, a, c);
						d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
						for (; c < d; c++) if (c in b && b[c] === a) return c
					}
					return -1
				},
				merge: function(a, c) {
					var d = a.length,
						e = 0;
					if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e];
					else
					while (c[e] !== b) a[d++] = c[e++];
					a.length = d;
					return a
				},
				grep: function(a, b, c) {
					var d = [],
						e;
					c = !! c;
					for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
					return d
				},
				map: function(a, c, d) {
					var f, g, h = [],
						i = 0,
						j = a.length,
						k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
					if (k) for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
					else
					for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
					return h.concat.apply([], h)
				},
				guid: 1,
				proxy: function(a, c) {
					if (typeof c == "string") {
						var d = a[c];
						c = a, a = d
					}
					if (!e.isFunction(a)) return b;
					var f = F.call(arguments, 2),
						g = function() {
							return a.apply(c, f.concat(F.call(arguments)))
						};
					g.guid = a.guid = a.guid || g.guid || e.guid++;
					return g
				},
				access: function(a, c, d, f, g, h) {
					var i = a.length;
					if (typeof c == "object") {
						for (var j in c) e.access(a, j, c[j], f, g, d);
						return a
					}
					if (d !== b) {
						f = !h && f && e.isFunction(d);
						for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
						return a
					}
					return i ? g(a[0], c) : b
				},
				now: function() {
					return (new Date).getTime()
				},
				uaMatch: function(a) {
					a = a.toLowerCase();
					var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
					return {
						browser: b[1] || "",
						version: b[2] || "0"
					}
				},
				sub: function() {
					function a(b, c) {
						return new a.fn.init(b, c)
					}
					e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
						f && f instanceof
						e && !(f instanceof a) && (f = a(f));
						return e.fn.init.call(this, d, f, b)
					}, a.fn.init.prototype = a.fn;
					var b = a(c);
					return a
				},
				browser: {}
			}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
				I["[object " + b + "]"] = b.toLowerCase()
			}), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
				c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
			} : c.attachEvent && (B = function() {
				c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
			});
			return e
		}(),
		g = {};
	f.Callbacks = function(a) {
		a = a ? g[a] || h(a) : {};
		var c = [],
			d = [],
			e, i, j, k, l, m = function(b) {
				var d, e, g, h, i;
				for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
			},
			n = function(b, f) {
				f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
				for (; c && l < k; l++) if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
					e = !0;
					break
				}
				i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
			},
			o = {
				add: function() {
					if (c) {
						var a = c.length;
						m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
					}
					return this
				},
				remove: function() {
					if (c) {
						var b = arguments,
							d = 0,
							e = b.length;
						for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
							i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
							if (a.unique) break
						}
					}
					return this
				},
				has: function(a) {
					if (c) {
						var b = 0,
							d = c.length;
						for (; b < d; b++) if (a === c[b]) return !0
					}
					return !1
				},
				empty: function() {
					c = [];
					return this
				},
				disable: function() {
					c =
					d = e = b;
					return this
				},
				disabled: function() {
					return !c
				},
				lock: function() {
					d = b, (!e || e === !0) && o.disable();
					return this
				},
				locked: function() {
					return !d
				},
				fireWith: function(b, c) {
					d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
					return this
				},
				fire: function() {
					o.fireWith(this, arguments);
					return this
				},
				fired: function() {
					return !!e
				}
			};
		return o
	};
	var i = [].slice;
	f.extend({
		Deferred: function(a) {
			var b = f.Callbacks("once memory"),
				c = f.Callbacks("once memory"),
				d = f.Callbacks("memory"),
				e = "pending",
				g = {
					resolve: b,
					reject: c,
					notify: d
				},
				h = {
					done: b.add,
					fail: c.add,
					progress: d.add,
					state: function() {
						return e
					},
					isResolved: b.fired,
					isRejected: c.fired,
					then: function(a, b, c) {
						i.done(a).fail(b).progress(c);
						return this
					},
					always: function() {
						i.done.apply(i, arguments).fail.apply(i, arguments);
						return this
					},
					pipe: function(a, b, c) {
						return f.Deferred(function(d) {
							f.each({
								done: [a, "resolve"],
								fail: [b, "reject"],
								progress: [c, "notify"]
							}, function(a, b) {
								var c = b[0],
									e = b[1],
									g;
								f.isFunction(c) ? i[a](function() {
									g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
								}) : i[a](d[e])
							})
						}).promise()
					},
					promise: function(a) {
						if (a == null) a = h;
						else
						for (var b in h) a[b] = h[b];
						return a
					}
				},
				i = h.promise({}),
				j;
			for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
			i.done(function() {
				e = "resolved"
			}, c.disable, d.lock).fail(function() {
				e = "rejected"
			}, b.disable, d.lock), a && a.call(i, i);
			return i
		},
		when: function(a) {
			function m(a) {
				return function(b) {
					e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
				}
			}
			function l(a) {
				return function(c) {
					b[a] =
					arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
				}
			}
			var b = i.call(arguments, 0),
				c = 0,
				d = b.length,
				e = Array(d),
				g = d,
				h = d,
				j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
				k = j.promise();
			if (d > 1) {
				for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
				g || j.resolveWith(j, b)
			} else j !== a && j.resolveWith(j, d ? [a] : []);
			return k
		}
	}), f.support = function() {
		var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"),
			r = c.documentElement;
		q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
		if (!d || !d.length || !e) return {};
		g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
			leadingWhitespace: q.firstChild.nodeType === 3,
			tbody: !q.getElementsByTagName("tbody").length,
			htmlSerialize: !! q.getElementsByTagName("link").length,
			style: /top/.test(e.getAttribute("style")),
			hrefNormalized: e.getAttribute("href") === "/a",
			opacity: /^0.55/.test(e.style.opacity),
			cssFloat: !! e.style.cssFloat,
			checkOn: i.value === "on",
			optSelected: h.selected,
			getSetAttribute: q.className !== "t",
			enctype: !! c.createElement("form").enctype,
			html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0
		}, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
		try {
			delete q.test
		} catch (s) {
			b.deleteExpando = !1
		}!q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function() {
			b.noCloneEvent = !1
		}), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked =
		i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
			marginRight: 0
		}).marginRight, 10) || 0) === 0);
		if (q.attachEvent) for (o in {
			submit: 1,
			change: 1,
			focusin: 1
		}) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
		k.removeChild(q), k = g = h = j = q = i = null, f(function() {
			var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
			!r || (j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
				doesNotAddBorder: e.offsetTop !== 5,
				doesAddBorderForTableAndCells: h.offsetTop === 5
			}, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i))
		});
		return b
	}();
	var j = /^(?:\{.*\}|\[.*\])$/,
		k = /([A-Z])/g;
	f.extend({
		cache: {},
		uuid: 0,
		expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(a) {
			a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
			return !!a && !m(a)
		},
		data: function(a, c, d, e) {
			if ( !! f.acceptData(a)) {
				var g, h, i, j = f.expando,
					k = typeof c == "string",
					l = a.nodeType,
					m = l ? f.cache : a,
					n = l ? a[j] : a[j] && j,
					o = c === "events";
				if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
				n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
				if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
				g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
				if (o && !h[c]) return g.events;
				k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
				return i
			}
		},
		removeData: function(a, b, c) {
			if ( !! f.acceptData(a)) {
				var d, e, g, h = f.expando,
					i = a.nodeType,
					j = i ? f.cache : a,
					k = i ? a[h] : h;
				if (!j[k]) return;
				if (b) {
					d = c ? j[k] : j[k].data;
					if (d) {
						f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b =
						b.split(" ")));
						for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
						if (!(c ? m : f.isEmptyObject)(d)) return
					}
				}
				if (!c) {
					delete j[k].data;
					if (!m(j[k])) return
				}
				f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
			}
		},
		_data: function(a, b, c) {
			return f.data(a, b, c, !0)
		},
		acceptData: function(a) {
			if (a.nodeName) {
				var b = f.noData[a.nodeName.toLowerCase()];
				if (b) return b !== !0 && a.getAttribute("classid") === b
			}
			return !0
		}
	}), f.fn.extend({
		data: function(a, c) {
			var d, e, g, h = null;
			if (typeof a == "undefined") {
				if (this.length) {
					h = f.data(this[0]);
					if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
						e = this[0].attributes;
						for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
						f._data(this[0], "parsedAttrs", !0)
					}
				}
				return h
			}
			if (typeof a == "object") return this.each(function() {
				f.data(this, a)
			});
			d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
			if (c === b) {
				h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h));
				return h === b && d[1] ? this.data(d[0]) : h
			}
			return this.each(function() {
				var b = f(this),
					e = [d[0], c];
				b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
			})
		},
		removeData: function(a) {
			return this.each(function() {
				f.removeData(this, a)
			})
		}
	}), f.extend({
		_mark: function(a, b) {
			a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
		},
		_unmark: function(a, b, c) {
			a !== !0 && (c = b, b = a, a = !1);
			if (b) {
				c = c || "fx";
				var d = c + "mark",
					e = a ? 0 : (f._data(b, d) || 1) - 1;
				e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
			}
		},
		queue: function(a, b, c) {
			var d;
			if (a) {
				b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
				return d || []
			}
		},
		dequeue: function(a, b) {
			b = b || "fx";
			var c = f.queue(a, b),
				d = c.shift(),
				e = {};
			d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
				f.dequeue(a, b)
			}, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
		}
	}), f.fn.extend({
		queue: function(a, c) {
			typeof a != "string" && (c = a, a = "fx");
			if (c === b) return f.queue(this[0], a);
			return this.each(function() {
				var b = f.queue(this, a, c);
				a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
			})
		},
		dequeue: function(a) {
			return this.each(function() {
				f.dequeue(this, a)
			})
		},
		delay: function(a, b) {
			a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
			return this.queue(b, function(b, c) {
				var d = setTimeout(b, a);
				c.stop = function() {
					clearTimeout(d)
				}
			})
		},
		clearQueue: function(a) {
			return this.queue(a || "fx", [])
		},
		promise: function(a, c) {
			function m() {
				--h || d.resolveWith(e, [e])
			}
			typeof a != "string" && (c = a, a = b), a = a || "fx";
			var d = f.Deferred(),
				e = this,
				g = e.length,
				h = 1,
				i = a + "defer",
				j = a + "queue",
				k = a + "mark",
				l;
			while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
			m();
			return d.promise()
		}
	});
	var o = /[\n\t\r]/g,
		p = /\s+/,
		q = /\r/g,
		r = /^(?:button|input)$/i,
		s = /^(?:button|input|object|select|textarea)$/i,
		t = /^a(?:rea)?$/i,
		u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		v = f.support.getSetAttribute,
		w, x, y;
	f.fn.extend({
		attr: function(a, b) {
			return f.access(this, a, b, !0, f.attr)
		},
		removeAttr: function(a) {
			return this.each(function() {
				f.removeAttr(this, a)
			})
		},
		prop: function(a, b) {
			return f.access(this, a, b, !0, f.prop)
		},
		removeProp: function(a) {
			a = f.propFix[a] || a;
			return this.each(function() {
				try {
					this[a] = b, delete this[a]
				} catch (c) {}
			})
		},
		addClass: function(a) {
			var b, c, d, e, g, h, i;
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).addClass(a.call(this, b, this.className))
			});
			if (a && typeof a == "string") {
				b =
				a.split(p);
				for (c = 0, d = this.length; c < d; c++) {
					e = this[c];
					if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a;
					else {
						g = " " + e.className + " ";
						for (h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
						e.className = f.trim(g)
					}
				}
			}
			return this
		},
		removeClass: function(a) {
			var c, d, e, g, h, i, j;
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).removeClass(a.call(this, b, this.className))
			});
			if (a && typeof a == "string" || a === b) {
				c = (a || "").split(p);
				for (d = 0, e = this.length; d < e; d++) {
					g = this[d];
					if (g.nodeType === 1 && g.className) if (a) {
						h = (" " + g.className + " ").replace(o, " ");
						for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
						g.className = f.trim(h)
					} else g.className = ""
				}
			}
			return this
		},
		toggleClass: function(a, b) {
			var c = typeof a,
				d = typeof b == "boolean";
			if (f.isFunction(a)) return this.each(function(c) {
				f(this).toggleClass(a.call(this, c, this.className, b), b)
			});
			return this.each(function() {
				if (c === "string") {
					var e, g = 0,
						h = f(this),
						i = b,
						j = a.split(p);
					while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
				} else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
			})
		},
		hasClass: function(a) {
			var b = " " + a + " ",
				c = 0,
				d = this.length;
			for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
			return !1
		},
		val: function(a) {
			var c, d, e, g = this[0];
			if ( !! arguments.length) {
				e = f.isFunction(a);
				return this.each(function(d) {
					var g = f(this),
						h;
					if (this.nodeType === 1) {
						e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
							return a == null ? "" : a + ""
						})), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
						if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
					}
				})
			}
			if (g) {
				c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
				if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
				d = g.value;
				return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
			}
		}
	}), f.extend({
		valHooks: {
			option: {
				get: function(a) {
					var b = a.attributes.value;
					return !b || b.specified ? a.value : a.text
				}
			},
			select: {
				get: function(a) {
					var b, c, d, e, g = a.selectedIndex,
						h = [],
						i = a.options,
						j = a.type === "select-one";
					if (g < 0) return null;
					c = j ? g : 0, d = j ? g + 1 : i.length;
					for (; c < d; c++) {
						e = i[c];
						if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
							b = f(e).val();
							if (j) return b;
							h.push(b)
						}
					}
					if (j && !h.length && i.length) return f(i[g]).val();
					return h
				},
				set: function(a, b) {
					var c = f.makeArray(b);
					f(a).find("option").each(function() {
						this.selected = f.inArray(f(this).val(), c) >= 0
					}), c.length || (a.selectedIndex = -1);
					return c
				}
			}
		},
		attrFn: {
			val: !0,
			css: !0,
			html: !0,
			text: !0,
			data: !0,
			width: !0,
			height: !0,
			offset: !0
		},
		attr: function(a, c, d, e) {
			var g, h, i, j = a.nodeType;
			if ( !! a && j !== 3 && j !== 8 && j !== 2) {
				if (e && c in f.attrFn) return f(a)[c](d);
				if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
				i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
				if (d !== b) {
					if (d === null) {
						f.removeAttr(a, c);
						return
					}
					if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
					a.setAttribute(c, "" + d);
					return d
				}
				if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
				g = a.getAttribute(c);
				return g === null ? b : g
			}
		},
		removeAttr: function(a, b) {
			var c, d, e, g, h = 0;
			if (b && a.nodeType === 1) {
				d = b.toLowerCase().split(p), g = d.length;
				for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
			}
		},
		attrHooks: {
			type: {
				set: function(a, b) {
					if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
					else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
						var c = a.value;
						a.setAttribute("type", b), c && (a.value = c);
						return b
					}
				}
			},
			value: {
				get: function(a, b) {
					if (w && f.nodeName(a, "button")) return w.get(a, b);
					return b in a ? a.value : null
				},
				set: function(a, b, c) {
					if (w && f.nodeName(a, "button")) return w.set(a, b, c);
					a.value = b
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(a, c, d) {
			var e, g, h, i = a.nodeType;
			if ( !! a && i !== 3 && i !== 8 && i !== 2) {
				h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
				return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
			}
		},
		propHooks: {
			tabIndex: {
				get: function(a) {
					var c = a.getAttributeNode("tabindex");
					return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
				}
			}
		}
	}), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
		get: function(a, c) {
			var d, e = f.prop(a, c);
			return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
		},
		set: function(a, b, c) {
			var d;
			b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
			return c
		}
	}, v || (y = {
		name: !0,
		id: !0
	}, w = f.valHooks.button = {
		get: function(a, c) {
			var d;
			d = a.getAttributeNode(c);
			return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
		},
		set: function(a, b, d) {
			var e = a.getAttributeNode(d);
			e || (e = c.createAttribute(d), a.setAttributeNode(e));
			return e.nodeValue = b + ""
		}
	}, f.attrHooks.tabindex.set =
	w.set, f.each(["width", "height"], function(a, b) {
		f.attrHooks[b] = f.extend(f.attrHooks[b], {
			set: function(a, c) {
				if (c === "") {
					a.setAttribute(b, "auto");
					return c
				}
			}
		})
	}), f.attrHooks.contenteditable = {
		get: w.get,
		set: function(a, b, c) {
			b === "" && (b = "false"), w.set(a, b, c)
		}
	}), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(a, c) {
		f.attrHooks[c] = f.extend(f.attrHooks[c], {
			get: function(a) {
				var d = a.getAttribute(c, 2);
				return d === null ? b : d
			}
		})
	}), f.support.style || (f.attrHooks.style = {
		get: function(a) {
			return a.style.cssText.toLowerCase() || b
		},
		set: function(a, b) {
			return a.style.cssText = "" + b
		}
	}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
		get: function(a) {
			var b = a.parentNode;
			b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
			return null
		}
	})), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function() {
		f.valHooks[this] = {
			get: function(a) {
				return a.getAttribute("value") === null ? "on" : a.value
			}
		}
	}), f.each(["radio", "checkbox"], function() {
		f.valHooks[this] = f.extend(f.valHooks[this], {
			set: function(a, b) {
				if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
			}
		})
	});
	var z = /^(?:textarea|input|select)$/i,
		A = /^([^\.]*)?(?:\.(.+))?$/,
		B = /\bhover(\.\S+)?\b/,
		C = /^key/,
		D = /^(?:mouse|contextmenu)|click/,
		E = /^(?:focusinfocus|focusoutblur)$/,
		F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
		G = function(a) {
			var b = F.exec(a);
			b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
			return b
		},
		H = function(a, b) {
			var c = a.attributes || {};
			return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
		},
		I = function(a) {
			return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
		};
	f.event = {
		add: function(a, c, d, e, g) {
			var h, i, j, k, l, m, n, o, p, q, r, s;
			if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
				d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
					return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
				}, i.elem = a), c = f.trim(I(c)).split(" ");
				for (k = 0; k < c.length; k++) {
					l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
						type: m,
						origType: l[1],
						data: e,
						handler: d,
						guid: d.guid,
						selector: g,
						quick: G(g),
						namespace: n.join(".")
					}, p), r = j[m];
					if (!r) {
						r = j[m] = [], r.delegateCount = 0;
						if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
					}
					s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
				}
				a = null
			}
		},
		global: {},
		remove: function(a, b, c, d, e) {
			var g = f.hasData(a) && f._data(a),
				h, i, j, k, l, m, n, o, p, q, r, s;
			if ( !! g && !! (o = g.events)) {
				b = f.trim(I(b || "")).split(" ");
				for (h = 0; h < b.length; h++) {
					i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
					if (!j) {
						for (j in o) f.event.remove(a, j + b[h], c, d, !0);
						continue
					}
					p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
					for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
					r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
				}
				f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
			}
		},
		customEvent: {
			getData: !0,
			setData: !0,
			changeData: !0
		},
		trigger: function(c, d, e, g) {
			if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
				var h = c.type || c,
					i = [],
					j, k, l, m, n, o, p, q, r, s;
				if (E.test(h + f.event.triggered)) return;
				h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
				if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
				c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
				if (!e) {
					j = f.cache;
					for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
					return
				}
				c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
				if (p.trigger && p.trigger.apply(e, d) === !1) return;
				r = [
					[e, p.bindType || h]
				];
				if (!g && !p.noBubble && !f.isWindow(e)) {
					s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
					for (; m; m = m.parentNode) r.push([m, s]), n = m;
					n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
				}
				for (l =
				0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
				c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered =
				b, n && (e[o] = n));
				return c.result
			}
		},
		dispatch: function(c) {
			c = f.event.fix(c || a.event);
			var d = (f._data(this, "events") || {})[c.type] || [],
				e = d.delegateCount,
				g = [].slice.call(arguments, 0),
				h = !c.exclusive && !c.namespace,
				i = [],
				j, k, l, m, n, o, p, q, r, s, t;
			g[0] = c, c.delegateTarget = this;
			if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
				m = f(this), m.context = this.ownerDocument || this;
				for (l = c.target; l != this; l = l.parentNode || this) {
					o = {}, q = [], m[0] = l;
					for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
					q.length && i.push({
						elem: l,
						matches: q
					})
				}
			}
			d.length > e && i.push({
				elem: this,
				matches: d.slice(e)
			});
			for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
				p = i[j], c.currentTarget = p.elem;
				for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
					r = p.matches[k];
					if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
				}
			}
			return c.result
		},
		props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(a, b) {
				a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
				return a
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(a, d) {
				var e, f, g, h = d.button,
					i = d.fromElement;
				a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
				return a
			}
		},
		fix: function(a) {
			if (a[f.expando]) return a;
			var d, e, g = a,
				h = f.event.fixHooks[a.type] || {},
				i = h.props ? this.props.concat(h.props) : this.props;
			a = f.Event(g);
			for (d = i.length; d;) e = i[--d], a[e] = g[e];
			a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
			return h.filter ? h.filter(a, g) : a
		},
		special: {
			ready: {
				setup: f.bindReady
			},
			load: {
				noBubble: !0
			},
			focus: {
				delegateType: "focusin"
			},
			blur: {
				delegateType: "focusout"
			},
			beforeunload: {
				setup: function(a, b, c) {
					f.isWindow(this) && (this.onbeforeunload = c)
				},
				teardown: function(a, b) {
					this.onbeforeunload === b && (this.onbeforeunload = null)
				}
			}
		},
		simulate: function(a, b, c, d) {
			var e = f.extend(new f.Event, c, {
				type: a,
				isSimulated: !0,
				originalEvent: {}
			});
			d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
		}
	}, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ?
	function(a, b, c) {
		a.removeEventListener && a.removeEventListener(b, c, !1)
	} : function(a, b, c) {
		a.detachEvent && a.detachEvent("on" + b, c)
	}, f.Event = function(a, b) {
		if (!(this instanceof f.Event)) return new f.Event(a, b);
		a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
	}, f.Event.prototype = {
		preventDefault: function() {
			this.isDefaultPrevented = K;
			var a = this.originalEvent;
			!a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
		},
		stopPropagation: function() {
			this.isPropagationStopped = K;
			var a = this.originalEvent;
			!a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = K, this.stopPropagation()
		},
		isDefaultPrevented: J,
		isPropagationStopped: J,
		isImmediatePropagationStopped: J
	}, f.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(a, b) {
		f.event.special[a] = {
			delegateType: b,
			bindType: b,
			handle: function(a) {
				var c = this,
					d = a.relatedTarget,
					e = a.handleObj,
					g = e.selector,
					h;
				if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
				return h
			}
		}
	}), f.support.submitBubbles || (f.event.special.submit = {
		setup: function() {
			if (f.nodeName(this, "form")) return !1;
			f.event.add(this, "click._submit keypress._submit", function(a) {
				var c = a.target,
					d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
				d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
					this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
				}), d._submit_attached = !0)
			})
		},
		teardown: function() {
			if (f.nodeName(this, "form")) return !1;
			f.event.remove(this, "._submit")
		}
	}), f.support.changeBubbles || (f.event.special.change = {
		setup: function() {
			if (z.test(this.nodeName)) {
				if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function(a) {
					a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
				}), f.event.add(this, "click._change", function(a) {
					this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
				});
				return !1
			}
			f.event.add(this, "beforeactivate._change", function(a) {
				var b = a.target;
				z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
					this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
				}), b._change_attached = !0)
			})
		},
		handle: function(a) {
			var b = a.target;
			if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
		},
		teardown: function() {
			f.event.remove(this, "._change");
			return z.test(this.nodeName)
		}
	}), f.support.focusinBubbles || f.each({
		focus: "focusin",
		blur: "focusout"
	}, function(a, b) {
		var d = 0,
			e = function(a) {
				f.event.simulate(b, a.target, f.event.fix(a), !0)
			};
		f.event.special[b] = {
			setup: function() {
				d++ === 0 && c.addEventListener(a, e, !0)
			},
			teardown: function() {
				--d === 0 && c.removeEventListener(a, e, !0)
			}
		}
	}), f.fn.extend({
		on: function(a, c, d, e, g) {
			var h, i;
			if (typeof a == "object") {
				typeof c != "string" && (d = c, c = b);
				for (i in a) this.on(i, c, d, a[i], g);
				return this
			}
			d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
			if (e === !1) e = J;
			else if (!e) return this;
			g === 1 && (h = e, e = function(a) {
				f().off(a);
				return h.apply(this, arguments)
			}, e.guid = h.guid || (h.guid = f.guid++));
			return this.each(function() {
				f.event.add(this, a, e, d, c)
			})
		},
		one: function(a, b, c, d) {
			return this.on.call(this, a, b, c, d, 1)
		},
		off: function(a, c, d) {
			if (a && a.preventDefault && a.handleObj) {
				var e = a.handleObj;
				f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
				return this
			}
			if (typeof a == "object") {
				for (var g in a) this.off(g, c, a[g]);
				return this
			}
			if (c === !1 || typeof c == "function") d = c, c = b;
			d === !1 && (d = J);
			return this.each(function() {
				f.event.remove(this, a, d, c)
			})
		},
		bind: function(a, b, c) {
			return this.on(a, null, b, c)
		},
		unbind: function(a, b) {
			return this.off(a, null, b)
		},
		live: function(a, b, c) {
			f(this.context).on(a, this.selector, b, c);
			return this
		},
		die: function(a, b) {
			f(this.context).off(a, this.selector || "**", b);
			return this
		},
		delegate: function(a, b, c, d) {
			return this.on(b, a, c, d)
		},
		undelegate: function(a, b, c) {
			return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
		},
		trigger: function(a, b) {
			return this.each(function() {
				f.event.trigger(a, b, this)
			})
		},
		triggerHandler: function(a, b) {
			if (this[0]) return f.event.trigger(a, b, this[0], !0)
		},
		toggle: function(a) {
			var b = arguments,
				c = a.guid || f.guid++,
				d = 0,
				e = function(c) {
					var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
					f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
					return b[e].apply(this, arguments) || !1
				};
			e.guid = c;
			while (d < b.length) b[d++].guid = c;
			return this.click(e)
		},
		hover: function(a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		}
	}), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
		f.fn[b] = function(a, c) {
			c == null && (c = a, a = null);
			return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
		}, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
	}), function() {
		function x(a, b, c, e, f, g) {
			for (var h = 0, i = e.length; h < i; h++) {
				var j = e[h];
				if (j) {
					var k = !1;
					j = j[a];
					while (j) {
						if (j[d] === c) {
							k = e[j.sizset];
							break
						}
						if (j.nodeType === 1) {
							g || (j[d] = c, j.sizset = h);
							if (typeof b != "string") {
								if (j === b) {
									k = !0;
									break
								}
							} else if (m.filter(b, [j]).length > 0) {
								k = j;
								break
							}
						}
						j = j[a]
					}
					e[h] = k
				}
			}
		}
		function w(a, b, c, e, f, g) {
			for (var h = 0, i = e.length; h < i; h++) {
				var j = e[h];
				if (j) {
					var k = !1;
					j = j[a];
					while (j) {
						if (j[d] === c) {
							k = e[j.sizset];
							break
						}
						j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
						if (j.nodeName.toLowerCase() === b) {
							k = j;
							break
						}
						j = j[a]
					}
					e[h] = k
				}
			}
		}
		var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
			d = "sizcache" + (Math.random() + "").replace(".", ""),
			e = 0,
			g = Object.prototype.toString,
			h = !1,
			i = !0,
			j = /\\/g,
			k = /\r\n/g,
			l = /\W/;
		[0, 0].sort(function() {
			i = !1;
			return 0
		});
		var m = function(b, d, e, f) {
			e = e || [], d = d || c;
			var h = d;
			if (d.nodeType !== 1 && d.nodeType !== 9) return [];
			if (!b || typeof b != "string") return e;
			var i, j, k, l, n, q, r, t, u = !0,
				v = m.isXML(d),
				w = [],
				x = b;
			do {
				a.exec(""), i = a.exec(x);
				if (i) {
					x = i[3], w.push(i[1]);
					if (i[2]) {
						l = i[3];
						break
					}
				}
			} while (i);
			if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
			else {
				j = o.relative[w[0]] ? [d] : m(w.shift(), d);
				while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
			} else {
				!f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
				if (d) {
					n = f ? {
						expr: w.pop(),
						set: s(f)
					} : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
					while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
				} else k = w = []
			}
			k || (k = j), k || m.error(q || b);
			if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k);
			else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
			else
			for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
			else s(k, e);
			l && (m(l, h, e, f), m.uniqueSort(e));
			return e
		};
		m.uniqueSort = function(a) {
			if (u) {
				h = i, a.sort(u);
				if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
			}
			return a
		}, m.matches = function(a, b) {
			return m(a, null, null, b)
		}, m.matchesSelector = function(a, b) {
			return m(b, null, null, [a]).length > 0
		}, m.find = function(a, b, c) {
			var d, e, f, g, h, i;
			if (!a) return [];
			for (e = 0, f = o.order.length; e < f; e++) {
				h = o.order[e];
				if (g = o.leftMatch[h].exec(a)) {
					i = g[1], g.splice(1, 1);
					if (i.substr(i.length - 1) !== "\\") {
						g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
						if (d != null) {
							a = a.replace(o.match[h], "");
							break
						}
					}
				}
			}
			d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
			return {
				set: d,
				expr: a
			}
		}, m.filter = function(a, c, d, e) {
			var f, g, h, i, j, k, l, n, p, q = a,
				r = [],
				s = c,
				t = c && c[0] && m.isXML(c[0]);
			while (a && c.length) {
				for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
					k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
					if (l.substr(l.length - 1) === "\\") continue;
					s === r && (r = []);
					if (o.preFilter[h]) {
						f = o.preFilter[h](f, s, d, r, e, t);
						if (!f) g = i = !0;
						else if (f === !0) continue
					}
					if (f) for (n = 0;
					(j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
					if (i !== b) {
						d || (s = r), a = a.replace(o.match[h], "");
						if (!g) return [];
						break
					}
				}
				if (a === q) if (g == null) m.error(a);
				else
				break;
				q = a
			}
			return s
		}, m.error = function(a) {
			throw new Error("Syntax error, unrecognized expression: " + a);
		};
		var n = m.getText = function(a) {
			var b, c, d = a.nodeType,
				e = "";
			if (d) if (d === 1 || d === 9) {
				if (typeof a.textContent == "string") return a.textContent;
				if (typeof a.innerText == "string") return a.innerText.replace(k, "");
				for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
			} else {
				if (d === 3 || d === 4) return a.nodeValue
			} else
			for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
			return e
		},
			o = m.selectors = {
				order: ["ID", "NAME", "TAG"],
				match: {
					ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
					ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
					TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
					CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
					POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
					PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
				},
				leftMatch: {},
				attrMap: {
					"class": "className",
					"for": "htmlFor"
				},
				attrHandle: {
					href: function(a) {
						return a.getAttribute("href")
					},
					type: function(a) {
						return a.getAttribute("type")
					}
				},
				relative: {
					"+": function(a, b) {
						var c = typeof b == "string",
							d = c && !l.test(b),
							e = c && !d;
						d && (b = b.toLowerCase());
						for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
							while ((h = h.previousSibling) && h.nodeType !== 1);
							a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
						}
						e && m.filter(b, a, !0)
					},
					">": function(a, b) {
						var c, d = typeof b == "string",
							e = 0,
							f = a.length;
						if (d && !l.test(b)) {
							b = b.toLowerCase();
							for (; e < f; e++) {
								c = a[e];
								if (c) {
									var g = c.parentNode;
									a[e] = g.nodeName.toLowerCase() === b ? g : !1
								}
							}
						} else {
							for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
							d && m.filter(b, a, !0)
						}
					},
					"": function(a, b, c) {
						var d, f = e++,
							g = x;
						typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
					},
					"~": function(a, b, c) {
						var d, f = e++,
							g = x;
						typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
					}
				},
				find: {
					ID: function(a, b, c) {
						if (typeof b.getElementById != "undefined" && !c) {
							var d = b.getElementById(a[1]);
							return d && d.parentNode ? [d] : []
						}
					},
					NAME: function(a, b) {
						if (typeof b.getElementsByName != "undefined") {
							var c = [],
								d = b.getElementsByName(a[1]);
							for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
							return c.length === 0 ? null : c
						}
					},
					TAG: function(a, b) {
						if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
					}
				},
				preFilter: {
					CLASS: function(a, b, c, d, e, f) {
						a = " " + a[1].replace(j, "") + " ";
						if (f) return a;
						for (var g = 0, h;
						(h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
						return !1
					},
					ID: function(a) {
						return a[1].replace(j, "")
					},
					TAG: function(a, b) {
						return a[1].replace(j, "").toLowerCase()
					},
					CHILD: function(a) {
						if (a[1] === "nth") {
							a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
							var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
							a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
						} else a[2] && m.error(a[0]);
						a[0] = e++;
						return a
					},
					ATTR: function(a, b, c, d, e, f) {
						var g = a[1] = a[1].replace(j, "");
						!f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
						return a
					},
					PSEUDO: function(b, c, d, e, f) {
						if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c);
						else {
							var g = m.filter(b[3], c, d, !0 ^ f);
							d || e.push.apply(e, g);
							return !1
						} else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
						return b
					},
					POS: function(a) {
						a.unshift(!0);
						return a
					}
				},
				filters: {
					enabled: function(a) {
						return a.disabled === !1 && a.type !== "hidden"
					},
					disabled: function(a) {
						return a.disabled === !0
					},
					checked: function(a) {
						return a.checked === !0
					},
					selected: function(a) {
						a.parentNode && a.parentNode.selectedIndex;
						return a.selected === !0
					},
					parent: function(a) {
						return !!a.firstChild
					},
					empty: function(a) {
						return !a.firstChild
					},
					has: function(a, b, c) {
						return !!m(c[3], a).length
					},
					header: function(a) {
						return /h\d/i.test(a.nodeName)
					},
					text: function(a) {
						var b = a.getAttribute("type"),
							c = a.type;
						return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
					},
					radio: function(a) {
						return a.nodeName.toLowerCase() === "input" && "radio" === a.type
					},
					checkbox: function(a) {
						return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
					},
					file: function(a) {
						return a.nodeName.toLowerCase() === "input" && "file" === a.type
					},
					password: function(a) {
						return a.nodeName.toLowerCase() === "input" && "password" === a.type
					},
					submit: function(a) {
						var b = a.nodeName.toLowerCase();
						return (b === "input" || b === "button") && "submit" === a.type
					},
					image: function(a) {
						return a.nodeName.toLowerCase() === "input" && "image" === a.type
					},
					reset: function(a) {
						var b = a.nodeName.toLowerCase();
						return (b === "input" || b === "button") && "reset" === a.type
					},
					button: function(a) {
						var b = a.nodeName.toLowerCase();
						return b === "input" && "button" === a.type || b === "button"
					},
					input: function(a) {
						return /input|select|textarea|button/i.test(a.nodeName)
					},
					focus: function(a) {
						return a === a.ownerDocument.activeElement
					}
				},
				setFilters: {
					first: function(a, b) {
						return b === 0
					},
					last: function(a, b, c, d) {
						return b === d.length - 1
					},
					even: function(a, b) {
						return b % 2 === 0
					},
					odd: function(a, b) {
						return b % 2 === 1
					},
					lt: function(a, b, c) {
						return b < c[3] - 0
					},
					gt: function(a, b, c) {
						return b > c[3] - 0
					},
					nth: function(a, b, c) {
						return c[3] - 0 === b
					},
					eq: function(a, b, c) {
						return c[3] - 0 === b
					}
				},
				filter: {
					PSEUDO: function(a, b, c, d) {
						var e = b[1],
							f = o.filters[e];
						if (f) return f(a, c, b, d);
						if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
						if (e === "not") {
							var g = b[3];
							for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
							return !0
						}
						m.error(e)
					},
					CHILD: function(a, b) {
						var c, e, f, g, h, i, j, k = b[1],
							l = a;
						switch (k) {
						case "only":
						case "first":
							while (l = l.previousSibling) if (l.nodeType === 1) return !1;
							if (k === "first") return !0;
							l = a;
						case "last":
							while (l = l.nextSibling) if (l.nodeType === 1) return !1;
							return !0;
						case "nth":
							c = b[2], e = b[3];
							if (c === 1 && e === 0) return !0;
							f = b[0], g = a.parentNode;
							if (g && (g[d] !== f || !a.nodeIndex)) {
								i = 0;
								for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
								g[d] = f
							}
							j = a.nodeIndex - e;
							return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
						}
					},
					ID: function(a, b) {
						return a.nodeType === 1 && a.getAttribute("id") === b
					},
					TAG: function(a, b) {
						return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
					},
					CLASS: function(a, b) {
						return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
					},
					ATTR: function(a, b) {
						var c = b[1],
							d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
							e = d + "",
							f = b[2],
							g = b[4];
						return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
					},
					POS: function(a, b, c, d) {
						var e = b[2],
							f = o.setFilters[e];
						if (f) return f(a, c, b, d)
					}
				}
			},
			p = o.match.POS,
			q = function(a, b) {
				return "\\" + (b - 0 + 1)
			};
		for (var r in o.match) o.match[r] =
		new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
		var s = function(a, b) {
			a = Array.prototype.slice.call(a, 0);
			if (b) {
				b.push.apply(b, a);
				return b
			}
			return a
		};
		try {
			Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
		} catch (t) {
			s = function(a, b) {
				var c = 0,
					d = b || [];
				if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
				else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]);
				else
				for (; a[c]; c++) d.push(a[c]);
				return d
			}
		}
		var u, v;
		c.documentElement.compareDocumentPosition ? u = function(a, b) {
			if (a === b) {
				h = !0;
				return 0
			}
			if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
			return a.compareDocumentPosition(b) & 4 ? -1 : 1
		} : (u = function(a, b) {
			if (a === b) {
				h = !0;
				return 0
			}
			if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
			var c, d, e = [],
				f = [],
				g = a.parentNode,
				i = b.parentNode,
				j = g;
			if (g === i) return v(a, b);
			if (!g) return -1;
			if (!i) return 1;
			while (j) e.unshift(j), j = j.parentNode;
			j = i;
			while (j) f.unshift(j), j = j.parentNode;
			c = e.length, d = f.length;
			for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
			return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
		}, v = function(a, b, c) {
			if (a === b) return c;
			var d = a.nextSibling;
			while (d) {
				if (d === b) return -1;
				d = d.nextSibling
			}
			return 1
		}), function() {
			var a = c.createElement("div"),
				d = "script" + (new Date).getTime(),
				e = c.documentElement;
			a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
				if (typeof c.getElementById != "undefined" && !d) {
					var e = c.getElementById(a[1]);
					return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
				}
			}, o.filter.ID = function(a, b) {
				var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
				return a.nodeType === 1 && c && c.nodeValue === b
			}), e.removeChild(a), e = a = null
		}(), function() {
			var a = c.createElement("div");
			a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
				var c = b.getElementsByTagName(a[1]);
				if (a[1] === "*") {
					var d = [];
					for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
					c = d
				}
				return c
			}), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
				return a.getAttribute("href", 2)
			}), a = null
		}(), c.querySelectorAll &&
		function() {
			var a = m,
				b = c.createElement("div"),
				d = "__sizzle__";
			b.innerHTML = "<p class='TEST'></p>";
			if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
				m = function(b, e, f, g) {
					e = e || c;
					if (!g && !m.isXML(e)) {
						var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
						if (h && (e.nodeType === 1 || e.nodeType === 9)) {
							if (h[1]) return s(e.getElementsByTagName(b), f);
							if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
						}
						if (e.nodeType === 9) {
							if (b === "body" && e.body) return s([e.body], f);
							if (h && h[3]) {
								var i = e.getElementById(h[3]);
								if (!i || !i.parentNode) return s([], f);
								if (i.id === h[3]) return s([i], f)
							}
							try {
								return s(e.querySelectorAll(b), f)
							} catch (j) {}
						} else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
							var k = e,
								l = e.getAttribute("id"),
								n = l || d,
								p = e.parentNode,
								q = /^\s*[+~]/.test(b);
							l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
							try {
								if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
							} catch (r) {} finally {
								l || k.removeAttribute("id")
							}
						}
					}
					return a(b, e, f, g)
				};
				for (var e in a) m[e] = a[e];
				b = null
			}
		}(), function() {
			var a = c.documentElement,
				b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
			if (b) {
				var d = !b.call(c.createElement("div"), "div"),
					e = !1;
				try {
					b.call(c.documentElement, "[test!='']:sizzle")
				} catch (f) {
					e = !0
				}
				m.matchesSelector = function(a, c) {
					c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
					if (!m.isXML(a)) try {
						if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
							var f = b.call(a, c);
							if (f || !d || a.document && a.document.nodeType !== 11) return f
						}
					} catch (g) {}
					return m(c, null, null, [a]).length > 0
				}
			}
		}(), function() {
			var a = c.createElement("div");
			a.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if ( !! a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
				a.lastChild.className = "e";
				if (a.getElementsByClassName("e").length === 1) return;
				o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
					if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
				}, a = null
			}
		}(), c.documentElement.contains ? m.contains = function(a, b) {
			return a !== b && (a.contains ? a.contains(b) : !0)
		} : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
			return !!(a.compareDocumentPosition(b) & 16)
		} : m.contains = function() {
			return !1
		}, m.isXML = function(a) {
			var b = (a ? a.ownerDocument || a : 0).documentElement;
			return b ? b.nodeName !== "HTML" : !1
		};
		var y = function(a, b, c) {
			var d, e = [],
				f = "",
				g = b.nodeType ? [b] : b;
			while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
			a = o.relative[a] ? a + "*" : a;
			for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
			return m.filter(f, e)
		};
		m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
	}();
	var L = /Until$/,
		M = /^(?:parents|prevUntil|prevAll)/,
		N = /,/,
		O = /^.[^:#\[\.,]*$/,
		P = Array.prototype.slice,
		Q = f.expr.match.POS,
		R = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	f.fn.extend({
		find: function(a) {
			var b = this,
				c, d;
			if (typeof a != "string") return f(a).filter(function() {
				for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0
			});
			var e = this.pushStack("", "find", a),
				g, h, i;
			for (c = 0, d = this.length; c < d; c++) {
				g = e.length, f.find(a, this[c], e);
				if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
					e.splice(h--, 1);
					break
				}
			}
			return e
		},
		has: function(a) {
			var b = f(a);
			return this.filter(function() {
				for (var a =
				0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0
			})
		},
		not: function(a) {
			return this.pushStack(T(this, a, !1), "not", a)
		},
		filter: function(a) {
			return this.pushStack(T(this, a, !0), "filter", a)
		},
		is: function(a) {
			return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
		},
		closest: function(a, b) {
			var c = [],
				d, e, g = this[0];
			if (f.isArray(a)) {
				var h = 1;
				while (g && g.ownerDocument && g !== b) {
					for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
						selector: a[d],
						elem: g,
						level: h
					});
					g = g.parentNode, h++
				}
				return c
			}
			var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
			for (d = 0, e = this.length; d < e; d++) {
				g = this[d];
				while (g) {
					if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
						c.push(g);
						break
					}
					g = g.parentNode;
					if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
				}
			}
			c = c.length > 1 ? f.unique(c) : c;
			return this.pushStack(c, "closest", a)
		},
		index: function(a) {
			if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
			if (typeof a == "string") return f.inArray(this[0], f(a));
			return f.inArray(a.jquery ? a[0] : a, this)
		},
		add: function(a, b) {
			var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
				d = f.merge(this.get(), c);
			return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
		},
		andSelf: function() {
			return this.add(this.prevObject)
		}
	}), f.each({
		parent: function(a) {
			var b = a.parentNode;
			return b && b.nodeType !== 11 ? b : null
		},
		parents: function(a) {
			return f.dir(a, "parentNode")
		},
		parentsUntil: function(a, b, c) {
			return f.dir(a, "parentNode", c)
		},
		next: function(a) {
			return f.nth(a, 2, "nextSibling")
		},
		prev: function(a) {
			return f.nth(a, 2, "previousSibling")
		},
		nextAll: function(a) {
			return f.dir(a, "nextSibling")
		},
		prevAll: function(a) {
			return f.dir(a, "previousSibling")
		},
		nextUntil: function(a, b, c) {
			return f.dir(a, "nextSibling", c)
		},
		prevUntil: function(a, b, c) {
			return f.dir(a, "previousSibling", c)
		},
		siblings: function(a) {
			return f.sibling(a.parentNode.firstChild, a)
		},
		children: function(a) {
			return f.sibling(a.firstChild)
		},
		contents: function(a) {
			return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
		}
	}, function(a, b) {
		f.fn[a] = function(c, d) {
			var e = f.map(this, b, c);
			L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
			return this.pushStack(e, a, P.call(arguments).join(","))
		}
	}), f.extend({
		filter: function(a, b, c) {
			c && (a = ":not(" + a + ")");
			return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
		},
		dir: function(a, c, d) {
			var e = [],
				g = a[c];
			while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
			return e
		},
		nth: function(a, b, c, d) {
			b = b || 1;
			var e = 0;
			for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
			return a
		},
		sibling: function(a, b) {
			var c = [];
			for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
			return c
		}
	});
	var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		W = / jQuery\d+="(?:\d+|null)"/g,
		X = /^\s+/,
		Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		Z = /<([\w:]+)/,
		$ = /<tbody/i,
		_ = /<|&#?\w+;/,
		ba = /<(?:script|style)/i,
		bb = /<(?:script|object|embed|option|style)/i,
		bc = new RegExp("<(?:" + V + ")", "i"),
		bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
		be = /\/(java|ecma)script/i,
		bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
		bg = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		},
		bh = U(c);
	bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
		text: function(a) {
			if (f.isFunction(a)) return this.each(function(b) {
				var c = f(this);
				c.text(a.call(this, b, c.text()))
			});
			if (typeof a != "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
			return f.text(this)
		},
		wrapAll: function(a) {
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).wrapAll(a.call(this, b))
			});
			if (this[0]) {
				var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
					var a = this;
					while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
					return a
				}).append(this)
			}
			return this
		},
		wrapInner: function(a) {
			if (f.isFunction(a)) return this.each(function(b) {
				f(this).wrapInner(a.call(this, b))
			});
			return this.each(function() {
				var b = f(this),
					c = b.contents();
				c.length ? c.wrapAll(a) : b.append(a)
			})
		},
		wrap: function(a) {
			var b = f.isFunction(a);
			return this.each(function(c) {
				f(this).wrapAll(b ? a.call(this, c) : a)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, !0, function(a) {
				this.nodeType === 1 && this.appendChild(a)
			})
		},
		prepend: function() {
			return this.domManip(arguments, !0, function(a) {
				this.nodeType === 1 && this.insertBefore(a, this.firstChild)
			})
		},
		before: function() {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
				this.parentNode.insertBefore(a, this)
			});
			if (arguments.length) {
				var a = f.clean(arguments);
				a.push.apply(a, this.toArray());
				return this.pushStack(a, "before", arguments)
			}
		},
		after: function() {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
				this.parentNode.insertBefore(a, this.nextSibling)
			});
			if (arguments.length) {
				var a = this.pushStack(this, "after", arguments);
				a.push.apply(a, f.clean(arguments));
				return a
			}
		},
		remove: function(a, b) {
			for (var c = 0, d;
			(d = this[c]) != null; c++) if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
			return this
		},
		empty: function() {
			for (var a = 0, b;
			(b = this[a]) != null; a++) {
				b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
				while (b.firstChild) b.removeChild(b.firstChild)
			}
			return this
		},
		clone: function(a, b) {
			a = a == null ? !1 : a, b = b == null ? a : b;
			return this.map(function() {
				return f.clone(this, a, b)
			})
		},
		html: function(a) {
			if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
			if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
				a = a.replace(Y, "<$1></$2>");
				try {
					for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
				} catch (e) {
					this.empty().append(a)
				}
			} else f.isFunction(a) ? this.each(function(b) {
				var c = f(this);
				c.html(a.call(this, b, c.html()))
			}) : this.empty().append(a);
			return this
		},
		replaceWith: function(a) {
			if (this[0] && this[0].parentNode) {
				if (f.isFunction(a)) return this.each(function(b) {
					var c = f(this),
						d = c.html();
					c.replaceWith(a.call(this, b, d))
				});
				typeof a != "string" && (a = f(a).detach());
				return this.each(function() {
					var b = this.nextSibling,
						c = this.parentNode;
					f(this).remove(), b ? f(b).before(a) : f(c).append(a)
				})
			}
			return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
		},
		detach: function(a) {
			return this.remove(a, !0)
		},
		domManip: function(a, c, d) {
			var e, g, h, i, j = a[0],
				k = [];
			if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function() {
				f(this).domManip(a, c, d, !0)
			});
			if (f.isFunction(j)) return this.each(function(e) {
				var g = f(this);
				a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
			});
			if (this[0]) {
				i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
					fragment: i
				} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
				if (g) {
					c = c && f.nodeName(g, "tr");
					for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
				}
				k.length && f.each(k, bp)
			}
			return this
		}
	}), f.buildFragment = function(a, b, d) {
		var e, g, h, i, j = a[0];
		b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
		return {
			fragment: e,
			cacheable: g
		}
	}, f.fragments = {}, f.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(a, b) {
		f.fn[a] = function(c) {
			var d = [],
				e = f(c),
				g = this.length === 1 && this[0].parentNode;
			if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
				e[b](this[0]);
				return this
			}
			for (var h = 0, i = e.length; h < i; h++) {
				var j = (h > 0 ? this.clone(!0) : this).get();
				f(e[h])[b](j), d = d.concat(j)
			}
			return this.pushStack(d, a, e.selector)
		}
	}), f.extend({
		clone: function(a, b, c) {
			var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
			if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
				bk(a, h), d = bl(a), e = bl(h);
				for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
			}
			if (b) {
				bj(a, h);
				if (c) {
					d = bl(a), e = bl(h);
					for (g = 0; d[g]; ++g) bj(d[g], e[g])
				}
			}
			d = e = null;
			return h
		},
		clean: function(a, b, d, e) {
			var g;
			b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
			var h = [],
				i;
			for (var j = 0, k;
			(k = a[j]) != null; j++) {
				typeof k == "number" && (k += "");
				if (!k) continue;
				if (typeof k == "string") if (!_.test(k)) k = b.createTextNode(k);
				else {
					k =
					k.replace(Y, "<$1></$2>");
					var l = (Z.exec(k) || ["", ""])[1].toLowerCase(),
						m = bg[l] || bg._default,
						n = m[0],
						o = b.createElement("div");
					b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
					while (n--) o = o.lastChild;
					if (!f.support.tbody) {
						var p = $.test(k),
							q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
						for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
					}!f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
				}
				var r;
				if (!f.support.appendChecked) if (k[0] && typeof(r = k.length) == "number") for (i = 0; i < r; i++) bn(k[i]);
				else bn(k);
				k.nodeType ? h.push(k) : h = f.merge(h, k)
			}
			if (d) {
				g = function(a) {
					return !a.type || be.test(a.type)
				};
				for (j = 0; h[j]; j++) if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]);
				else {
					if (h[j].nodeType === 1) {
						var s = f.grep(h[j].getElementsByTagName("script"), g);
						h.splice.apply(h, [j + 1, 0].concat(s))
					}
					d.appendChild(h[j])
				}
			}
			return h
		},
		cleanData: function(a) {
			var b, c, d = f.cache,
				e = f.event.special,
				g = f.support.deleteExpando;
			for (var h = 0, i;
			(i = a[h]) != null; h++) {
				if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
				c = i[f.expando];
				if (c) {
					b = d[c];
					if (b && b.events) {
						for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
						b.handle && (b.handle.elem = null)
					}
					g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
				}
			}
		}
	});
	var bq = /alpha\([^)]*\)/i,
		br = /opacity=([^)]*)/,
		bs = /([A-Z]|^ms)/g,
		bt = /^-?\d+(?:px)?$/i,
		bu = /^-?\d/,
		bv = /^([\-+])=([\-+.\de]+)/,
		bw = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		bx = ["Left", "Right"],
		by = ["Top", "Bottom"],
		bz, bA, bB;
	f.fn.css = function(a, c) {
		if (arguments.length === 2 && c === b) return this;
		return f.access(this, a, c, !0, function(a, c, d) {
			return d !== b ? f.style(a, c, d) : f.css(a, c)
		})
	}, f.extend({
		cssHooks: {
			opacity: {
				get: function(a, b) {
					if (b) {
						var c = bz(a, "opacity", "opacity");
						return c === "" ? "1" : c
					}
					return a.style.opacity
				}
			}
		},
		cssNumber: {
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": f.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(a, c, d, e) {
			if ( !! a && a.nodeType !== 3 && a.nodeType !== 8 && !! a.style) {
				var g, h, i = f.camelCase(c),
					j = a.style,
					k = f.cssHooks[i];
				c = f.cssProps[i] || i;
				if (d === b) {
					if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
					return j[c]
				}
				h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
				if (d == null || h === "number" && isNaN(d)) return;
				h === "number" && !f.cssNumber[i] && (d += "px");
				if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
					j[c] = d
				} catch (l) {}
			}
		},
		css: function(a, c, d) {
			var e, g;
			c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
			if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
			if (bz) return bz(a, c)
		},
		swap: function(a, b, c) {
			var d = {};
			for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
			c.call(a);
			for (e in b) a.style[e] = d[e]
		}
	}), f.curCSS = f.css, f.each(["height", "width"], function(a, b) {
		f.cssHooks[b] = {
			get: function(a, c, d) {
				var e;
				if (c) {
					if (a.offsetWidth !== 0) return bC(a, b, d);
					f.swap(a, bw, function() {
						e =
						bC(a, b, d)
					});
					return e
				}
			},
			set: function(a, b) {
				if (!bt.test(b)) return b;
				b = parseFloat(b);
				if (b >= 0) return b + "px"
			}
		}
	}), f.support.opacity || (f.cssHooks.opacity = {
		get: function(a, b) {
			return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
		},
		set: function(a, b) {
			var c = a.style,
				d = a.currentStyle,
				e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
				g = d && d.filter || c.filter || "";
			c.zoom = 1;
			if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
				c.removeAttribute("filter");
				if (d && !d.filter) return
			}
			c.filter =
			bq.test(g) ? g.replace(bq, e) : g + " " + e
		}
	}), f(function() {
		f.support.reliableMarginRight || (f.cssHooks.marginRight = {
			get: function(a, b) {
				var c;
				f.swap(a, {
					display: "inline-block"
				}, function() {
					b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
				});
				return c
			}
		})
	}), c.defaultView && c.defaultView.getComputedStyle && (bA = function(a, b) {
		var c, d, e;
		b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
		return c
	}), c.documentElement.currentStyle && (bB = function(a, b) {
		var c, d, e, f = a.currentStyle && a.currentStyle[b],
			g = a.style;
		f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
		return f === "" ? "auto" : f
	}), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
		var b = a.offsetWidth,
			c = a.offsetHeight;
		return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
	}, f.expr.filters.visible = function(a) {
		return !f.expr.filters.hidden(a)
	});
	var bD = /%20/g,
		bE = /\[\]$/,
		bF = /\r?\n/g,
		bG = /#.*$/,
		bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
		bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
		bK = /^(?:GET|HEAD)$/,
		bL = /^\/\//,
		bM = /\?/,
		bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		bO = /^(?:select|textarea)/i,
		bP = /\s+/,
		bQ = /([?&])_=[^&]*/,
		bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
		bS = f.fn.load,
		bT = {},
		bU = {},
		bV, bW, bX = ["*/"] + ["*"];
	try {
		bV = e.href
	} catch (bY) {
		bV = c.createElement("a"), bV.href = "", bV = bV.href
	}
	bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
		load: function(a, c, d) {
			if (typeof a != "string" && bS) return bS.apply(this, arguments);
			if (!this.length) return this;
			var e = a.indexOf(" ");
			if (e >= 0) {
				var g = a.slice(e, a.length);
				a = a.slice(0, e)
			}
			var h = "GET";
			c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
			var i = this;
			f.ajax({
				url: a,
				type: h,
				dataType: "html",
				data: c,
				complete: function(a, b, c) {
					c = a.responseText, a.isResolved() && (a.done(function(a) {
						c = a
					}), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [c, b, a])
				}
			});
			return this
		},
		serialize: function() {
			return f.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				return this.elements ? f.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
			}).map(function(a, b) {
				var c = f(this).val();
				return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
					return {
						name: b.name,
						value: a.replace(bF, "\r\n")
					}
				}) : {
					name: b.name,
					value: c.replace(bF, "\r\n")
				}
			}).get()
		}
	}), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
		f.fn[b] = function(a) {
			return this.on(b, a)
		}
	}), f.each(["get", "post"], function(a, c) {
		f[c] = function(a, d, e, g) {
			f.isFunction(d) && (g = g || e, e = d, d = b);
			return f.ajax({
				type: c,
				url: a,
				data: d,
				success: e,
				dataType: g
			})
		}
	}), f.extend({
		getScript: function(a, c) {
			return f.get(a, b, c, "script")
		},
		getJSON: function(a, b, c) {
			return f.get(a, b, c, "json")
		},
		ajaxSetup: function(a, b) {
			b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b);
			return a
		},
		ajaxSettings: {
			url: bV,
			isLocal: bJ.test(bW[1]),
			global: !0,
			type: "GET",
			contentType: "application/x-www-form-urlencoded",
			processData: !0,
			async: !0,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": bX
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": a.String,
				"text html": !0,
				"text json": f.parseJSON,
				"text xml": f.parseXML
			},
			flatOptions: {
				context: !0,
				url: !0
			}
		},
		ajaxPrefilter: bZ(bT),
		ajaxTransport: bZ(bU),
		ajax: function(a, c) {
			function w(a, c, l, m) {
				if (s !== 2) {
					s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
					var o, r, u, w = c,
						x = l ? cb(d, v, l) : b,
						y, z;
					if (a >= 200 && a < 300 || a === 304) {
						if (d.ifModified) {
							if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] =
							y;
							if (z = v.getResponseHeader("Etag")) f.etag[k] = z
						}
						if (a === 304) w = "notmodified", o = !0;
						else
						try {
							r = cc(d, x), w = "success", o = !0
						} catch (A) {
							w = "parsererror", u = A
						}
					} else {
						u = w;
						if (!w || a) w = "error", a < 0 && (a = 0)
					}
					v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
				}
			}
			typeof a == "object" && (c = a, a = b), c = c || {};
			var d = f.ajaxSetup({}, c),
				e = d.context || d,
				g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
				h = f.Deferred(),
				i = f.Callbacks("once memory"),
				j = d.statusCode || {},
				k, l = {},
				m = {},
				n, o, p, q, r, s = 0,
				t, u, v = {
					readyState: 0,
					setRequestHeader: function(a, b) {
						if (!s) {
							var c = a.toLowerCase();
							a = m[c] = m[c] || a, l[a] = b
						}
						return this
					},
					getAllResponseHeaders: function() {
						return s === 2 ? n : null
					},
					getResponseHeader: function(a) {
						var c;
						if (s === 2) {
							if (!o) {
								o = {};
								while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2]
							}
							c = o[a.toLowerCase()]
						}
						return c === b ? null : c
					},
					overrideMimeType: function(a) {
						s || (d.mimeType = a);
						return this
					},
					abort: function(a) {
						a = a || "abort", p && p.abort(a), w(0, a);
						return this
					}
				};
			h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
				if (a) {
					var b;
					if (s < 2) for (b in a) j[b] = [j[b], a[b]];
					else b = a[v.status], v.then(b, b)
				}
				return this
			}, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
			if (s === 2) return !1;
			t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
			if (!d.hasContent) {
				d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
				if (d.cache === !1) {
					var x = f.now(),
						y = d.url.replace(bQ, "$1_=" + x);
					d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
				}
			}(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
			for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
			if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
				v.abort();
				return !1
			}
			for (u in {
				success: 1,
				error: 1,
				complete: 1
			}) v[u](d[u]);
			p = b$(bU, d, c, v);
			if (!p) w(-1, "No Transport");
			else {
				v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function() {
					v.abort("timeout")
				}, d.timeout));
				try {
					s = 1, p.send(l, w)
				} catch (z) {
					if (s < 2) w(-1, z);
					else
					throw z;
				}
			}
			return v
		},
		param: function(a, c) {
			var d = [],
				e = function(a, b) {
					b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
				};
			c === b && (c = f.ajaxSettings.traditional);
			if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
				e(this.name, this.value)
			});
			else
			for (var g in a) ca(g, a[g], c, e);
			return d.join("&").replace(bD, "+")
		}
	}), f.extend({
		active: 0,
		lastModified: {},
		etag: {}
	});
	var cd = f.now(),
		ce = /(\=)\?(&|$)|\?\?/i;
	f.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			return f.expando + "_" + cd++
		}
	}), f.ajaxPrefilter("json jsonp", function(b, c, d) {
		var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
		if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
			var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
				i = a[h],
				j = b.url,
				k = b.data,
				l = "$1" + h + "$2";
			b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
				g = [a]
			}, d.always(function() {
				a[h] = i, g && f.isFunction(i) && a[h](g[0])
			}), b.converters["script json"] = function() {
				g || f.error(h + " was not called");
				return g[0]
			}, b.dataTypes[0] = "json";
			return "script"
		}
	}), f.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function(a) {
				f.globalEval(a);
				return a
			}
		}
	}), f.ajaxPrefilter("script", function(a) {
		a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
	}), f.ajaxTransport("script", function(a) {
		if (a.crossDomain) {
			var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
			return {
				send: function(f, g) {
					d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
						if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
					}, e.insertBefore(d, e.firstChild)
				},
				abort: function() {
					d && d.onload(0, 1)
				}
			}
		}
	});
	var cf = a.ActiveXObject ?
	function() {
		for (var a in ch) ch[a](0, 1)
	} : !1,
		cg = 0,
		ch;
	f.ajaxSettings.xhr = a.ActiveXObject ?
	function() {
		return !this.isLocal && ci() || cj()
	} : ci, function(a) {
		f.extend(f.support, {
			ajax: !! a,
			cors: !! a && "withCredentials" in a
		})
	}(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
		if (!c.crossDomain || f.support.cors) {
			var d;
			return {
				send: function(e, g) {
					var h = c.xhr(),
						i, j;
					c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
					if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
					c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (j in e) h.setRequestHeader(j, e[j])
					} catch (k) {}
					h.send(c.hasContent && c.data || null), d = function(a, e) {
						var j, k, l, m, n;
						try {
							if (d && (e || h.readyState === 4)) {
								d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
								if (e) h.readyState !== 4 && h.abort();
								else {
									j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
									try {
										k = h.statusText
									} catch (o) {
										k = ""
									}!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
								}
							}
						} catch (p) {
							e || g(-1, p)
						}
						m && g(j, k, m, l)
					}, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d)
				},
				abort: function() {
					d && d(0, 1)
				}
			}
		}
	});
	var ck = {},
		cl, cm, cn = /^(?:toggle|show|hide)$/,
		co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
		cp, cq = [
			["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
			["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
			["opacity"]
		],
		cr;
	f.fn.extend({
		show: function(a, b, c) {
			var d, e;
			if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
			for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
			for (g = 0; g < h; g++) {
				d = this[g];
				if (d.style) {
					e = d.style.display;
					if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
				}
			}
			return this
		},
		hide: function(a, b, c) {
			if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
			var d, e, g = 0,
				h = this.length;
			for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
			for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
			return this
		},
		_toggle: f.fn.toggle,
		toggle: function(a, b, c) {
			var d = typeof a == "boolean";
			f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
				var b = d ? a : f(this).is(":hidden");
				f(this)[b ? "show" : "hide"]()
			}) : this.animate(cu("toggle", 3), a, b, c);
			return this
		},
		fadeTo: function(a, b, c, d) {
			return this.filter(":hidden").css("opacity", 0).show().end().animate({
				opacity: b
			}, a, c, d)
		},
		animate: function(a, b, c, d) {
			function g() {
				e.queue === !1 && f._mark(this);
				var b = f.extend({}, e),
					c = this.nodeType === 1,
					d = c && f(this).is(":hidden"),
					g, h, i, j, k, l, m, n, o;
				b.animatedProperties = {};
				for (i in a) {
					g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
					if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
					c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
				}
				b.overflow != null && (this.style.overflow = "hidden");
				for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
				return !0
			}
			var e = f.speed(b, c, d);
			if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
			a = f.extend({}, a);
			return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
		},
		stop: function(a, c, d) {
			typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
			return this.each(function() {
				function h(a, b, c) {
					var e = b[c];
					f.removeData(a, c, !0), e.stop(d)
				}
				var b, c = !1,
					e = f.timers,
					g = f._data(this);
				d || f._unmark(!0, this);
				if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
				else g[b = a + ".run"] && g[b].stop && h(this, g, b);
				for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
				(!d || !c) && f.dequeue(this, a)
			})
		}
	}), f.each({
		slideDown: cu("show", 1),
		slideUp: cu("hide", 1),
		slideToggle: cu("toggle", 1),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(a, b) {
		f.fn[a] = function(a, c, d) {
			return this.animate(b, a, c, d)
		}
	}), f.extend({
		speed: function(a, b, c) {
			var d = a && typeof a == "object" ? f.extend({}, a) : {
				complete: c || !c && b || f.isFunction(a) && a,
				duration: a,
				easing: c && b || b && !f.isFunction(b) && b
			};
			d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
			if (d.queue == null || d.queue === !0) d.queue = "fx";
			d.old = d.complete, d.complete = function(a) {
				f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
			};
			return d
		},
		easing: {
			linear: function(a, b, c, d) {
				return c + d * a
			},
			swing: function(a, b, c, d) {
				return (-Math.cos(a * Math.PI) / 2 + 0.5) * d + c
			}
		},
		timers: [],
		fx: function(a, b, c) {
			this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
		}
	}), f.fx.prototype = {
		update: function() {
			this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
		},
		cur: function() {
			if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
			var a, b = f.css(this.elem, this.prop);
			return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
		},
		custom: function(a, c, d) {
			function h(a) {
				return e.step(a)
			}
			var e = this,
				g = f.fx;
			this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
				e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
			}, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
		},
		show: function() {
			var a = f._data(this.elem, "fxshow" + this.prop);
			this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
		},
		hide: function() {
			this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
		},
		step: function(a) {
			var b, c, d, e = cr || cs(),
				g = !0,
				h = this.elem,
				i = this.options;
			if (a || e >= i.duration + this.startTime) {
				this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
				for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
				if (g) {
					i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function(a, b) {
						h.style["overflow" + b] = i.overflow[a]
					}), i.hide && f(h).hide();
					if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
					d = i.complete, d && (i.complete = !1, d.call(h))
				}
				return !1
			}
			i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now =
			this.start + (this.end - this.start) * this.pos), this.update();
			return !0
		}
	}, f.extend(f.fx, {
		tick: function() {
			var a, b = f.timers,
				c = 0;
			for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
			b.length || f.fx.stop()
		},
		interval: 13,
		stop: function() {
			clearInterval(cp), cp = null
		},
		speeds: {
			slow: 600,
			fast: 200,
			_default: 400
		},
		step: {
			opacity: function(a) {
				f.style(a.elem, "opacity", a.now)
			},
			_default: function(a) {
				a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
			}
		}
	}), f.each(["width", "height"], function(a, b) {
		f.fx.step[b] = function(a) {
			f.style(a.elem, b, Math.max(0, a.now) + a.unit)
		}
	}), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
		return f.grep(f.timers, function(b) {
			return a === b.elem
		}).length
	});
	var cw = /^t(?:able|d|h)$/i,
		cx = /^(?:body|html)$/i;
	"getBoundingClientRect" in c.documentElement ? f.fn.offset = function(a) {
		var b = this[0],
			c;
		if (a) return this.each(function(b) {
			f.offset.setOffset(this, a, b)
		});
		if (!b || !b.ownerDocument) return null;
		if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
		try {
			c = b.getBoundingClientRect()
		} catch (d) {}
		var e = b.ownerDocument,
			g = e.documentElement;
		if (!c || !f.contains(g, b)) return c ? {
			top: c.top,
			left: c.left
		} : {
			top: 0,
			left: 0
		};
		var h = e.body,
			i = cy(e),
			j = g.clientTop || h.clientTop || 0,
			k = g.clientLeft || h.clientLeft || 0,
			l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
			m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft,
			n = c.top + l - j,
			o = c.left + m - k;
		return {
			top: n,
			left: o
		}
	} : f.fn.offset = function(a) {
		var b = this[0];
		if (a) return this.each(function(b) {
			f.offset.setOffset(this, a, b)
		});
		if (!b || !b.ownerDocument) return null;
		if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
		var c, d = b.offsetParent,
			e = b,
			g = b.ownerDocument,
			h = g.documentElement,
			i = g.body,
			j = g.defaultView,
			k = j ? j.getComputedStyle(b, null) : b.currentStyle,
			l = b.offsetTop,
			m = b.offsetLeft;
		while ((b = b.parentNode) && b !== i && b !== h) {
			if (f.support.fixedPosition && k.position === "fixed") break;
			c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
		}
		if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
		f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
		return {
			top: l,
			left: m
		}
	}, f.offset = {
		bodyOffset: function(a) {
			var b = a.offsetTop,
				c = a.offsetLeft;
			f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
			return {
				top: b,
				left: c
			}
		},
		setOffset: function(a, b, c) {
			var d = f.css(a, "position");
			d === "static" && (a.style.position = "relative");
			var e = f(a),
				g = e.offset(),
				h = f.css(a, "top"),
				i = f.css(a, "left"),
				j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
				k = {},
				l = {},
				m, n;
			j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
		}
	}, f.fn.extend({
		position: function() {
			if (!this[0]) return null;
			var a = this[0],
				b = this.offsetParent(),
				c = this.offset(),
				d = cx.test(b[0].nodeName) ? {
					top: 0,
					left: 0
				} : b.offset();
			c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
			return {
				top: c.top - d.top,
				left: c.left - d.left
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var a = this.offsetParent || c.body;
				while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
				return a
			})
		}
	}), f.each(["Left", "Top"], function(a, c) {
		var d = "scroll" + c;
		f.fn[d] = function(c) {
			var e, g;
			if (c === b) {
				e = this[0];
				if (!e) return null;
				g = cy(e);
				return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
			}
			return this.each(function() {
				g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
			})
		}
	}), f.each(["Height", "Width"], function(a, c) {
		var d = c.toLowerCase();
		f.fn["inner" + c] = function() {
			var a = this[0];
			return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
		}, f.fn["outer" + c] = function(a) {
			var b = this[0];
			return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
		}, f.fn[d] = function(a) {
			var e = this[0];
			if (!e) return a == null ? null : this;
			if (f.isFunction(a)) return this.each(function(b) {
				var c =
				f(this);
				c[d](a.call(this, b, c[d]()))
			});
			if (f.isWindow(e)) {
				var g = e.document.documentElement["client" + c],
					h = e.document.body;
				return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
			}
			if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
			if (a === b) {
				var i = f.css(e, d),
					j = parseFloat(i);
				return f.isNumeric(j) ? j : i
			}
			return this.css(d, typeof a == "string" ? a : a + "px")
		}
	}), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return f
	})
})(window);
//public_html/js/compiled/jquery.tools.min.js
(function(a) {
	a.tools = a.tools || {
		version: "@VERSION"
	}, a.tools.tabs = {
		conf: {
			tabs: "a",
			current: "active",
			onBeforeClick: null,
			onClick: null,
			effect: "default",
			initialIndex: 0,
			event: "click",
			rotate: !1,
			history: !1
		},
		addEffect: function(a, c) {
			b[a] = c
		}
	};
	var b = {
		"default": function(a, b) {
			this.getPanes().hide().eq(a).show(), b.call()
		},
		fade: function(a, b) {
			var c = this.getConf(),
				d = c.fadeOutSpeed,
				e = this.getPanes();
			d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b)
		},
		slide: function(a, b) {
			this.getPanes().slideUp(200), this.getPanes().eq(a).slideDown(400, b)
		},
		ajax: function(a, b) {
			this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b)
		}
	},
		c;
	a.tools.tabs.addEffect("horizontal", function(b, d) {
		c || (c = this.getPanes().eq(0).width()), this.getCurrentPane().animate({
			width: 0
		}, function() {
			a(this).hide()
		}), this.getPanes().eq(b).animate({
			width: c
		}, function() {
			a(this).show(), d.call()
		})
	});
	function d(c, d, e) {
		var f = this,
			g = c.add(this),
			h = c.find(e.tabs),
			i = d.jquery ? d : c.children(d),
			j;
		h.length || (h = c.children()), i.length || (i = c.parent().find(d)), i.length || (i = a(d)), a.extend(this, {
			click: function(c, d) {
				var i = h.eq(c);
				typeof c == "string" && c.replace("#", "") && (i = h.filter("[href*=" + c.replace("#", "") + "]"), c = Math.max(h.index(i), 0));
				if (e.rotate) {
					var k = h.length - 1;
					if (c < 0) return f.click(k, d);
					if (c > k) return f.click(0, d)
				}
				if (!i.length) {
					if (j >= 0) return f;
					c = e.initialIndex, i = h.eq(c)
				}
				if (c === j) return f;
				d = d || a.Event(), d.type = "onBeforeClick", g.trigger(d, [c]);
				if (!d.isDefaultPrevented()) {
					b[e.effect].call(f, c, function() {
						d.type = "onClick", g.trigger(d, [c])
					}), j = c, h.parents("li").removeClass(e.current), i.parents("li").addClass(e.current);
					return f
				}
			},
			getConf: function() {
				return e
			},
			getTabs: function() {
				return h
			},
			getPanes: function() {
				return i
			},
			getCurrentPane: function() {
				return i.eq(j)
			},
			getCurrentTab: function() {
				return h.eq(j)
			},
			getIndex: function() {
				return j
			},
			next: function() {
				return f.click(j + 1)
			},
			prev: function() {
				return f.click(j - 1)
			},
			destroy: function() {
				h.unbind(e.event).removeClass(e.current), i.find("a[href^=#]").unbind("click.T");
				return f
			}
		}), a.each("onBeforeClick,onClick".split(","), function(b, c) {
			a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
				b && a(f).bind(c, b);
				return f
			}
		}), e.history && a.fn.history && (a.tools.history.init(h), e.event = "history"), h.each(function(b) {
			a(this).bind(e.event, function(a) {
				f.click(b, a);
				return a.preventDefault()
			})
		}), i.find("a[href^=#]").bind("click.T", function(b) {
			f.click(a(this).attr("href"), b)
		}), location.hash && e.tabs == "a" && c.find("[href='" + location.hash + "']").length ? f.click(location.hash) : (e.initialIndex === 0 || e.initialIndex > 0) && f.click(e.initialIndex)
	}
	a.fn.tabs = function(b, c) {
		var e = this.data("tabs");
		e && (e.destroy(), this.removeData("tabs")), a.isFunction(c) && (c = {
			onBeforeClick: c
		}), c = a.extend({}, a.tools.tabs.conf, c), this.each(function() {
			e = new d(a(this), b, c), a(this).data("tabs", e)
		});
		return c.api ? e : this
	}
})(jQuery);
//public_html/js/compiled/jquery.cookie.js
(function(e, h, i) {
	function j(b) {
		return b
	}
	function k(b) {
		return decodeURIComponent(b.replace(l, " "))
	}
	var l = /\+/g,
		d = e.cookie = function(b, c, a) {
			if (c !== i) {
				a = e.extend({}, d.defaults, a);
				if (c === null) a.expires = -1;
				if (typeof a.expires === "number") {
					var f = a.expires,
						g = a.expires = new Date;
					g.setDate(g.getDate() + f)
				}
				c = d.json ? JSON.stringify(c) : String(c);
				return h.cookie = [encodeURIComponent(b), "=", d.raw ? c : encodeURIComponent(c), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
			}
			c = d.raw ? j : k;
			a = h.cookie.split("; ");
			for (f = 0; g = a[f] && a[f].split("="); f++) if (c(g.shift()) === b) return b = c(g.join("=")), d.json ? JSON.parse(b) : b;
			return null
		};
	d.defaults = {};
	e.removeCookie = function(b, c) {
		if (e.cookie(b) !== null) return e.cookie(b, null, c), !0;
		return !1
	}
})(jQuery, document);
//public_html/js/compiled/jquery.customScroller-1.2.js
(function(d) {
	var j = {},
		a = {},
		l, k, m;
	d.fn.customScroller = function(f, g) {
		f = d.extend({
			width: null,
			height: null,
			horizontal: 1,
			vertical: 1,
			speed: 4
		}, f);
		if (this.length > 0) {
			var e;
			this.each(function() {
				if (void 0 === this.id || !this.id.length) this.id = "customScroller_" + h;
				var h = (new Date).getTime(),
					b = e === h ? "ID_" + (h + 1E3) : "ID_" + h;
				j[this.id] || (j[this.id] = this);
				j[this.id]._uniqueID = b;
				a[b] = {};
				if (f.width) a[b].width = (f.width + "").indexOf("%") > 0 || (f.width + "").indexOf("px") > 0 ? f.width : parseInt(f.width, 10) + "px", d(this).css("width", a[b].width);
				else if (d(this).css("width") !== "auto") a[b].width = d(this).css("width").indexOf("%") > 0 ? "100%" : parseInt(d(this).css("width"), 10) + "px";
				else
				return !1;
				if (f.height) a[b].height = (f.height + "").indexOf("%") > 0 || (f.height + "").indexOf("px") > 0 ? f.height : parseInt(f.height, 10) + "px", d(this).css("height", a[b].height);
				else if (d(this).css("height") !== "auto") a[b].height = d(this).css("height").indexOf("%") > 0 ? "100%" : parseInt(d(this).css("height"), 10) + "px";
				else
				return !1;
				d(this).css("overflow", "hidden");
				d(this).css("position", "relative");
				a[b].speed = !d(this).attr("speed") ? f.speed : parseInt(d(this).attr("speed"), 10);
				if (isNaN(a[b].speed)) a[b].speed = f.speed;
				a[b].vertical = !d(this).attr("vertical") ? f.vertical : parseInt(d(this).attr("vertical"), 10);
				if (isNaN(a[b].vertical)) a[b].vertical = f.vertical;
				a[b].horizontal = !d(this).attr("horizontal") ? f.horizontal : parseInt(d(this).attr("horizontal"), 10);
				if (isNaN(a[b].horizontal)) a[b].horizontal = f.horizontal;
				var i = '<div class="customScrollerContainer" id="customScrollerContainer_' + b + '">';
				i += '<ul class="customScrollerContent" id="customScrollerContent_' + b + '">';
				i += d(this).html();
				i += "</ul></div>";
				d(this).html(i);
				a[b].objContainer = d("#customScrollerContainer_" + b);
				a[b].objContent = d("#customScrollerContent_" + b);
				a[b].objContainer.css({
					position: "relative",
					"float": "left",
					width: "100%",
					height: "100%",
					overflow: "hidden",
					margin: "0px",
					border: "0px",
					padding: "0 1px 0 0"
				});
				a[b].objContent.css({
					position: "absolute",
					top: "0px",
					left: "0px",
					margin: "0",
					border: "0px"
				});
				i = '<div id="divVScrollerBar_' + b + '" class="divVScrollerBar">';
				i += '<span id="divVScrollerBar_trace_' + b + '" class="divVScrollerBarTrace">';
				i += '<span id="divVScrollerBar_cursor_' + b + '" class="divVScrollerBarCursor"><span></span></span>';
				i += "</span>";
				i += '<span id="divVScrollerBar_down_' + b + '" class="divVScrollerBarDown"><span></span></span>';
				i += "</div>";
				d(this).prepend(i);
				a[b].objVScroller = d("#divVScrollerBar_" + b);
				a[b].objUp = d("#divVScrollerBar_up_" + b);
				a[b].objDown = d("#divVScrollerBar_down_" + b);
				a[b].objVTrace = d("#divVScrollerBar_trace_" + b);
				a[b].objVCursor = d("#divVScrollerBar_cursor_" + b);
				a[b].objVScroller.css({
					"float": "right",
					overflow: "hidden",
					padding: "0px"
				});
				a[b].objUp.css({
					display: "none",
					width: "100%",
					overflow: "hidden"
				});
				a[b].objDown.css({
					display: "none",
					width: "100%",
					overflow: "hidden"
				});
				a[b].objVTrace.css({
					display: "block",
					position: "relative",
					width: "100%",
					overflow: "hidden",
					margin: "0px",
					border: "0px",
					padding: "0px"
				});
				a[b].objVCursor.css({
					display: "block",
					position: "absolute",
					width: "100%",
					overflow: "hidden",
					top: "0px",
					left: "0px",
					margin: "0px",
					border: "0px",
					padding: "0px"
				});
				i = '<div id="divOScrollerBar_' + b + '" class="divOScrollerBar">';
				i += '<span id="divOScrollerBar_left_' + b + '" class="divOScrollerBarLeft"><span></span></span>';
				i += '<span id="divOScrollerBar_trace_' + b + '" class="divOScrollerBarTrace">';
				i += '<span id="divOScrollerBar_cursor_' + b + '" class="divOScrollerBarCursor"><span></span></span>';
				i += "</span>";
				i += '<span id="divOScrollerBar_right_' + b + '" class="divOScrollerBarRight"><span></span></span>';
				i += '<div style="clear: both;"></div></div>';
				d(this).append(i);
				a[b].objOScroller = d("#divOScrollerBar_" + b);
				a[b].objLeft = d("#divOScrollerBar_left_" + b);
				a[b].objRight = d("#divOScrollerBar_right_" + b);
				a[b].objOTrace = d("#divOScrollerBar_trace_" + b);
				a[b].objOCursor = d("#divOScrollerBar_cursor_" + b);
				a[b].objOScroller.css({
					"float": "left",
					overflow: "hidden",
					padding: "0px"
				});
				a[b].objLeft.css({
					"float": "left",
					display: "block",
					height: "100%",
					margin: "0px",
					overflow: "hidden"
				});
				a[b].objRight.css({
					"float": "left",
					display: "block",
					height: "100%",
					margin: "0px",
					overflow: "hidden"
				});
				a[b].objOTrace.css({
					"float": "left",
					display: "block",
					position: "relative",
					height: "100%",
					overflow: "hidden",
					margin: "0px",
					border: "0px",
					padding: "0px"
				});
				a[b].objOCursor.css({
					display: "block",
					position: "absolute",
					height: "100%",
					overflow: "hidden",
					top: "0px",
					left: "0px",
					margin: "0px",
					border: "0px",
					padding: "0px"
				});
				d(this).append('<div style="clear: both;"></div>');
				d.fn.setScroller = function() {
					this.length > 0 && this.each(function() {
						if (j[this.id]._uniqueID && j[this.id]._uniqueID.length > 0) {
							var c = j[this.id]._uniqueID;
							if (a[c]) {
								a[c]._vscroll = !1;
								a[c]._oscroll = !1;
								a[c].objOScroller.hide();
								a[c].objVScroller.hide();
								a[c].objContainer.css({
									width: "100%",
									height: "100%"
								});
								d.browser.msie && a[c].objContent.css({
									width: "auto"
								});
								contentOuterHeight = g ? d(this).find("ul.check > li").length * 16 : a[c].objContent.outerHeight(!0);
								if (a[c].vertical === 1 && a[c]._vscroll === !1 && a[c].objContainer.height() > 0 && contentOuterHeight > a[c].objContainer.height()) {
									a[c]._vscroll = !0;
									a[c].objVScroller.show();
									a[c].objContainer.css("width", a[c].objContainer.width() - a[c].objVScroller.outerWidth(!0) - 1 + "px");
									a[c].containerHeight =
									a[c].objContainer.height();
									a[c].contentHeight = contentOuterHeight;
									a[c].objVScroller.css("height", a[c].containerHeight + "px");
									a[c].traceHeight = a[c].containerHeight;
									a[c].objVTrace.css("height", a[c].traceHeight + "px");
									a[c].cursorHeight = Math.ceil(a[c].traceHeight * a[c].containerHeight / a[c].contentHeight);
									a[c].objVCursor.css("height", a[c].cursorHeight + "px");
									a[c].traceVVoid = a[c].traceHeight - a[c].cursorHeight;
									a[c].posVTrace = a[c].objVTrace.offset().top;
									var b = (0 - parseInt(a[c].objContent.css("top"), 10)) * a[c].traceVVoid / (a[c].contentHeight - a[c].containerHeight);
									a[c].objVCursor.css("top", b + "px")
								}
								if (a[c].horizontal === 1 && a[c]._oscroll === !1 && a[c].objContainer.width() > 0 && a[c].objContent.outerWidth(!0) > a[c].objContainer.width() && (a[c]._oscroll = !0, a[c].objOScroller.show(), a[c].objContainer.css("height", a[c].objContainer.height() - a[c].objOScroller.outerHeight(!0) + "px"), a[c].containerWidth = a[c].objContainer.width(), a[c].contentWidth = a[c].objContent.outerWidth(!0), a[c].objOScroller.css("width", a[c].containerWidth + "px"), a[c].traceWidth =
								a[c].containerWidth - a[c].objLeft.outerWidth(!0) - a[c].objRight.outerWidth(!0), a[c].objOTrace.css("width", a[c].traceWidth + "px"), a[c].cursorWidth = Math.ceil(a[c].traceWidth * a[c].containerWidth / a[c].contentWidth), a[c].objOCursor.css("width", a[c].cursorWidth + "px"), a[c].traceOVoid = a[c].traceWidth - a[c].cursorWidth, a[c].posOTrace = a[c].objOTrace.offset().left, b = (0 - parseInt(a[c].objContent.css("left"), 10)) * a[c].traceOVoid / (a[c].contentWidth - a[c].containerWidth), a[c].objOCursor.css("left", b + "px"), a[c].vertical === 1 && a[c]._vscroll === !0)) a[c].containerHeight = a[c].objContainer.height(), a[c].contentHeight = contentOuterHeight, a[c].objVScroller.css("height", a[c].containerHeight + "px"), a[c].traceHeight = a[c].containerHeight - a[c].objUp.outerHeight(!0) - a[c].objDown.outerHeight(!0), a[c].objVTrace.css("height", a[c].traceHeight + "px"), a[c].cursorHeight = Math.ceil(a[c].traceHeight * a[c].containerHeight / a[c].contentHeight), a[c].objVCursor.css("height", a[c].cursorHeight + "px"), a[c].traceVVoid = a[c].traceHeight - a[c].cursorHeight, a[c].posVTrace = a[c].objVTrace.offset().top, b = (0 - parseInt(a[c].objContent.css("top"), 10)) * a[c].traceVVoid / (a[c].contentHeight - a[c].containerHeight), a[c].objVCursor.css("top", b + "px");
								d.browser.msie && a[c].objContent.css({
									width: a[c].objContent.width() + "px"
								});
								a[c]._vscroll === !1 && a[c].objContent.css("top", "0px");
								a[c]._oscroll === !1 && a[c].objContent.css("left", "0px");
								a[c].containerOffset = a[c].objContainer.offset();
								a[c].containerHeight = a[c].objContainer.height();
								a[c].contentHeight = contentOuterHeight;
								a[c].containerWidth =
								a[c].objContainer.width();
								a[c].contentWidth = a[c].objContent.outerWidth(!0)
							}
						}
					})
				};
				d(this).setScroller();
				d(this).bind("mousedown", function(a) {
					a.stopPropagation();
					l = b
				});
				a[b].objContainer.bind("mousedown", function() {
					k = b
				});
				a[b].objContainer.bind("mousemove", function(c) {
					if (k) {
						var b = a[k].containerOffset,
							f = a[k].containerHeight,
							d = a[k].containerWidth;
						n();
						a[k]._vscroll === !0 && c.pageY > b.top && c.pageY < b.top + 10 ? s(a[k], 1) : a[k]._oscroll === !0 && c.pageX > b.left && c.pageX < b.left + 10 ? t(a[k], 1) : a[k]._vscroll === !0 && c.pageY > b.top + f - 10 && c.pageY < b.top + f ? u(a[k], -1) : a[k]._oscroll === !0 && c.pageX > b.left + d - 10 && c.pageX < b.left + d && v(a[k], -1)
					}
				});
				a[b].objContainer.bind("mouseup", function() {
					n();
					k = null
				});
				d().mousewheel && (a[b].objContainer.bind("mousewheel", function(c, f) {
					f > 0 ? o(a[b], f) : p(a[b], f);
					return !1
				}), a[b]._vscroll === !1 && a[b].objContainer.bind("mousewheel", function(c, f) {
					f > 0 ? q(a[b], f) : r(a[b], f);
					return !1
				}));
				a[b].objVTrace.bind("mousedown", function(c) {
					c = c.pageY - a[b].posVTrace;
					c > a[b].cursorHeight + parseInt(a[b].objVCursor.css("top"), 10) ? p(a[b], -3) : c < parseInt(a[b].objVCursor.css("top"), 10) && o(a[b], 3);
					return !1
				});
				a[b].objUp.bind("mouseover", function() {
					d("span", this).addClass("hover");
					s(a[b]);
					return !1
				});
				a[b].objDown.bind("mouseover", function() {
					d("span", this).addClass("hover");
					u(a[b]);
					return !1
				});
				a[b].objUp.bind("mouseout", function() {
					d("span", this).removeClass("hover");
					n();
					return !1
				});
				a[b].objDown.bind("mouseout", function() {
					d("span", this).removeClass("hover");
					n();
					return !1
				});
				a[b].objVCursor.bind("mouseover", function() {
					d("span", this).addClass("hover");
					return !1
				});
				a[b].objVCursor.bind("mouseout", function() {
					d("span", this).removeClass("hover");
					return !1
				});
				d(a[b].objVCursor).dragCursor(b, "bottom");
				d(a[b].objVCursor).ondrag(function() {
					var c = 0 - parseInt(a[b].objVCursor.css("top"), 10) * (a[b].contentHeight - a[b].containerHeight) / a[b].traceVVoid;
					a[b].objContent.css("top", c + "px");
					return !1
				});
				a[b].objOTrace.bind("mousedown", function(c) {
					c = c.pageX - a[b].posOTrace;
					c > a[b].cursorWidth + parseInt(a[b].objOCursor.css("left"), 10) ? r(a[b], -3) : c < parseInt(a[b].objOCursor.css("left"), 10) && q(a[b], 3);
					return !1
				});
				a[b].objLeft.bind("mouseover", function() {
					d("span", this).addClass("hover");
					t(a[b]);
					return !1
				});
				a[b].objRight.bind("mouseover", function() {
					d("span", this).addClass("hover");
					v(a[b]);
					return !1
				});
				a[b].objLeft.bind("mouseout", function() {
					d("span", this).removeClass("hover");
					n();
					return !1
				});
				a[b].objRight.bind("mouseout", function() {
					d("span", this).removeClass("hover");
					n();
					return !1
				});
				a[b].objOCursor.bind("mouseover", function() {
					d("span", this).addClass("hover");
					return !1
				});
				a[b].objOCursor.bind("mouseout", function() {
					d("span", this).removeClass("hover");
					return !1
				});
				d(a[b].objOCursor).dragCursor(b, "right");
				d(a[b].objOCursor).ondrag(function() {
					var c = 0 - parseInt(a[b].objOCursor.css("left"), 10) * (a[b].contentWidth - a[b].containerWidth) / a[b].traceOVoid;
					a[b].objContent.css("left", c + "px");
					return !1
				});
				e = h
			});
			d.anchorFix()
		}
	};
	d.anchorFix = function() {
		d("a").each(function() {
			d(this).bind("click", function() {
				var f = d(this).attr("href");
				if (f && f.indexOf("#") !== -1) var g = f.replace(window.location.href, ""),
					g = g.substring(g.indexOf("#"));
				f = d(this).attr("target");
				if (g && f && j[f] && g.length > 0 && j[f]._uniqueID.length > 0 && g.charAt(0) === "#") {
					var g = d("a[name=" + g.substring(1) + "]").parent().offset().top,
						e = a[j[f]._uniqueID].objContainer.offset().top,
						g = parseInt(a[j[f]._uniqueID].objContent.css("top"), 10) + (0 - parseInt(g - e, 10)),
						e = 0 - a[j[f]._uniqueID].contentHeight + a[j[f]._uniqueID].containerHeight;
					g < e && (g = e);
					a[j[f]._uniqueID].objContent.css("top", g + "px");
					g = (0 - parseInt(g, 10)) * a[j[f]._uniqueID].traceVVoid / (a[j[f]._uniqueID].contentHeight - a[j[f]._uniqueID].containerHeight);
					a[j[f]._uniqueID].objVCursor.css("top", g + "px");
					return !1
				}
			})
		})
	};
	var u = function(a, d) {
		m = window.setInterval(function() {
			p(a, d)
		}, 20)
	},
		s = function(a, d) {
			m = window.setInterval(function() {
				o(a, d)
			}, 20)
		},
		v = function(a, d) {
			m = window.setInterval(function() {
				r(a, d)
			}, 20)
		},
		t = function(a, d) {
			m = window.setInterval(function() {
				q(a, d)
			}, 20)
		},
		n = function() {
			m && window.clearInterval(m)
		},
		p = function(a, d) {
			var e;
			e = d ? 0 - parseInt(d * 5, 10) : 1;
			var h = parseInt(a.objContent.css("top"), 10),
				b = 0 - a.contentHeight + a.containerHeight;
			h >= b && (e = h - parseInt(a.speed * e, 10), e < b && (e = b), a.objContent.css("top", e + "px"), b = parseInt((0 - e) * a.traceVVoid / (a.contentHeight - a.containerHeight), 10), a.objVCursor.css("top", b + "px"))
		},
		o = function(a, d) {
			var e;
			e = d ? parseInt(d * 5, 10) : 1;
			var h = parseInt(a.objContent.css("top"), 10);
			h <= 0 && (e = h + parseInt(a.speed * e, 10), e > 0 && (e = 0), a.objContent.css("top", e + "px"), e = parseInt((0 - e) * a.traceVVoid / (a.contentHeight - a.containerHeight), 10), a.objVCursor.css("top", e + "px"))
		},
		r = function(a, d) {
			var e;
			e = d ? 0 - parseInt(d * 5, 10) : 1;
			var h = parseInt(a.objContent.css("left"), 10),
				b = 0 - a.contentWidth + a.containerWidth;
			h >= b && (e = h - parseInt(a.speed * e, 10), e < b && (e = b), a.objContent.css("left", e + "px"), b = parseInt((0 - e) * a.traceOVoid / (a.contentWidth - a.containerWidth), 10), a.objOCursor.css("left", b + "px"))
		},
		q = function(a, d) {
			var e;
			e = d ? parseInt(d * 5, 10) : 1;
			var h = parseInt(a.objContent.css("left"), 10);
			h <= 0 && (e = h + parseInt(a.speed * e, 10), e > 0 && (e = 0), a.objContent.css("left", e + "px"), e = parseInt((0 - e) * a.traceOVoid / (a.contentWidth - a.containerWidth), 10), a.objOCursor.css("left", e + "px"))
		};
	d.fn.dragCursor =

	function(f, g) {
		var e = !1,
			h = null,
			b = {},
			i, c, j, k;
		if (a[f]) {
			options = {
				maxTop: 0,
				maxRight: 0,
				maxBottom: 0,
				maxLeft: 0
			};
			d.fn.ondrag = function(a) {
				if (this.length > 0) return this.each(function() {
					b[this.id] = a
				})
			};
			this.length > 0 && this.each(function() {
				d(this).bind("mousedown", function(b) {
					if (g === "bottom") options.maxTop = 0, options.maxRight = 0, options.maxBottom = a[f].traceVVoid, options.maxLeft = 0;
					if (g === "right") options.maxTop = 0, options.maxRight = a[f].traceOVoid, options.maxBottom = 0, options.maxLeft = 0;
					e = !0;
					h = this;
					var m = d(this).offset(),
						n = d(this).offsetParent(),
						o = {};
					if (n.length > 0) o.top = n.offset().top, o.left = n.offset().left;
					i = b.pageX;
					c = b.pageY;
					j = m.top - o.top;
					k = m.left - o.left;
					l(b);
					return !1
				})
			});
			var l = function(a) {
				var b = j + (a.pageY - c),
					a = k + (a.pageX - i);
				if (options.maxTop !== null && b < options.maxTop) b = options.maxTop;
				if (options.maxLeft !== null && a < options.maxLeft) a = options.maxLeft;
				if (options.maxBottom !== null && b > options.maxBottom) b = options.maxBottom;
				if (options.maxRight !== null && a > options.maxRight) a = options.maxRight;
				d(h).css("top", b + "px");
				d(h).css("left", a + "px")
			};
			d(document).bind("mousemove", function(a) {
				if (e === !0) {
					l(a);
					if (typeof b[h.id] === "function") b[h.id](a, h);
					return !1
				}
			});
			d(document).bind("mouseup", function() {
				e = !1
			})
		}
	};
	d.fn.ajaxScroller = function(a, g, e) {
		e = d.extend({}, e);
		this.length > 0 && this.each(function() {
			d(this).html("Loading...");
			d(this).load(a, g, function(a, b) {
				b === "success" ? d(this).customScroller(e) : alert("Error")
			})
		})
	};
	d(document).ready(function() {
		d(document).bind("mousedown", function() {
			l = null
		});
		d(document).bind("keydown keypress", function(d) {
			if (l) {
				switch (d.which) {
				case 38:
					o(a[l], 1);
					break;
				case 40:
					p(a[l], -1);
					break;
				case 37:
					q(a[l], 1);
					break;
				case 39:
					r(a[l], -1);
					break;
				case 33:
					o(a[l], 3);
					break;
				case 34:
					p(a[l], -3);
					break;
				case 36:
					q(a[l], 3);
					break;
				case 35:
					r(a[l], -3);
					break;
				default:
					return !0
				}
				return !1
			}
		});
		d().wresize && d(window).wresize(function() {
			m && clearTimeout(m);
			m = setTimeout(function() {
				d.each(j, function(a, g) {
					typeof g !== "function" && d(g).setScroller()
				})
			}, 100);
			return !1
		})
	})
})(jQuery);
//public_html/js/compiled/jquery.jcarousel.min.js
(function(g) {
	var q = {
		vertical: !1,
		rtl: !1,
		start: 1,
		offset: 1,
		size: null,
		scroll: 3,
		visible: null,
		animation: "normal",
		easing: "swing",
		auto: 0,
		wrap: null,
		initCallback: null,
		setupCallback: null,
		reloadCallback: null,
		itemLoadCallback: null,
		itemFirstInCallback: null,
		itemFirstOutCallback: null,
		itemLastInCallback: null,
		itemLastOutCallback: null,
		itemVisibleInCallback: null,
		itemVisibleOutCallback: null,
		animationStepCallback: null,
		buttonNextHTML: "<div></div>",
		buttonPrevHTML: "<div></div>",
		buttonNextEvent: "click",
		buttonPrevEvent: "click",
		buttonNextCallback: null,
		buttonPrevCallback: null,
		itemFallbackDimension: null
	},
		m = !1;
	g(window).bind("load.jcarousel", function() {
		m = !0
	});
	g.jcarousel = function(a, c) {
		this.options = g.extend({}, q, c || {});
		this.autoStopped = this.locked = !1;
		this.buttonPrevState = this.buttonNextState = this.buttonPrev = this.buttonNext = this.list = this.clip = this.container = null;
		if (!c || c.rtl === void 0) this.options.rtl = (g(a).attr("dir") || g("html").attr("dir") || "").toLowerCase() == "rtl";
		this.wh = !this.options.vertical ? "width" : "height";
		this.lt = !this.options.vertical ? this.options.rtl ? "right" : "left" : "top";
		for (var b = "", d = a.className.split(" "), f = 0; f < d.length; f++) if (d[f].indexOf("jcarousel-skin") != -1) {
			g(a).removeClass(d[f]);
			b = d[f];
			break
		}
		a.nodeName.toUpperCase() == "UL" || a.nodeName.toUpperCase() == "OL" ? (this.list = g(a), this.clip = this.list.parents(".jcarousel-clip"), this.container = this.list.parents(".jcarousel-container")) : (this.container = g(a), this.list = this.container.find("ul,ol").eq(0), this.clip = this.container.find(".jcarousel-clip"));
		if (this.clip.size() === 0) this.clip =
		this.list.wrap("<div></div>").parent();
		if (this.container.size() === 0) this.container = this.clip.wrap("<div></div>").parent();
		b !== "" && this.container.parent()[0].className.indexOf("jcarousel-skin") == -1 && this.container.wrap('<div class=" ' + b + '"></div>');
		this.buttonPrev = g(".jcarousel-prev", this.container);
		if (this.buttonPrev.size() === 0 && this.options.buttonPrevHTML !== null) this.buttonPrev = g(this.options.buttonPrevHTML).appendTo(this.container);
		this.buttonPrev.addClass(this.className("jcarousel-prev"));
		this.buttonNext =
		g(".jcarousel-next", this.container);
		if (this.buttonNext.size() === 0 && this.options.buttonNextHTML !== null) this.buttonNext = g(this.options.buttonNextHTML).appendTo(this.container);
		this.buttonNext.addClass(this.className("jcarousel-next"));
		this.clip.addClass(this.className("jcarousel-clip")).css({
			position: "relative"
		});
		this.list.addClass(this.className("jcarousel-list")).css({
			overflow: "hidden",
			position: "relative",
			top: 0,
			margin: 0,
			padding: 0
		}).css(this.options.rtl ? "right" : "left", 0);
		this.container.addClass(this.className("jcarousel-container")).css({
			position: "relative"
		});
		!this.options.vertical && this.options.rtl && this.container.addClass("jcarousel-direction-rtl").attr("dir", "rtl");
		var j = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null,
			b = this.list.children("li"),
			e = this;
		if (b.size() > 0) {
			var h = 0,
				i = this.options.offset;
			b.each(function() {
				e.format(this, i++);
				h += e.dimension(this, j)
			});
			this.list.css(this.wh, h + 100 + "px");
			if (!c || c.size === void 0) this.options.size = b.size()
		}
		this.container.css("display", "block");
		this.buttonNext.css("display", "block");
		this.buttonPrev.css("display", "block");
		this.funcNext = function() {
			e.next()
		};
		this.funcPrev = function() {
			e.prev()
		};
		this.funcResize = function() {
			e.resizeTimer && clearTimeout(e.resizeTimer);
			e.resizeTimer = setTimeout(function() {
				e.reload()
			}, 100)
		};
		this.options.initCallback !== null && this.options.initCallback(this, "init");
		!m && g.browser.safari ? (this.buttons(!1, !1), g(window).bind("load.jcarousel", function() {
			e.setup()
		})) : this.setup()
	};
	var f = g.jcarousel;
	f.fn = f.prototype = {
		jcarousel: "0.2.8"
	};
	f.fn.extend = f.extend = g.extend;
	f.fn.extend({
		setup: function() {
			this.prevLast =
			this.prevFirst = this.last = this.first = null;
			this.animating = !1;
			this.tail = this.resizeTimer = this.timer = null;
			this.inTail = !1;
			if (!this.locked) {
				this.list.css(this.lt, this.pos(this.options.offset) + "px");
				var a = this.pos(this.options.start, !0);
				this.prevFirst = this.prevLast = null;
				this.animate(a, !1);
				g(window).unbind("resize.jcarousel", this.funcResize).bind("resize.jcarousel", this.funcResize);
				this.options.setupCallback !== null && this.options.setupCallback(this)
			}
		},
		reset: function() {
			this.list.empty();
			this.list.css(this.lt, "0px");
			this.list.css(this.wh, "10px");
			this.options.initCallback !== null && this.options.initCallback(this, "reset");
			this.setup()
		},
		reload: function() {
			this.tail !== null && this.inTail && this.list.css(this.lt, f.intval(this.list.css(this.lt)) + this.tail);
			this.tail = null;
			this.inTail = !1;
			this.options.reloadCallback !== null && this.options.reloadCallback(this);
			if (this.options.visible !== null) {
				var a = this,
					c = Math.ceil(this.clipping() / this.options.visible),
					b = 0,
					d = 0;
				this.list.children("li").each(function(f) {
					b += a.dimension(this, c);
					f + 1 < a.first && (d = b)
				});
				this.list.css(this.wh, b + "px");
				this.list.css(this.lt, -d + "px")
			}
			this.scroll(this.first, !1)
		},
		lock: function() {
			this.locked = !0;
			this.buttons()
		},
		unlock: function() {
			this.locked = !1;
			this.buttons()
		},
		size: function(a) {
			if (a !== void 0) this.options.size = a, this.locked || this.buttons();
			return this.options.size
		},
		has: function(a, c) {
			if (c === void 0 || !c) c = a;
			if (this.options.size !== null && c > this.options.size) c = this.options.size;
			for (var b = a; b <= c; b++) {
				var d = this.get(b);
				if (!d.length || d.hasClass("jcarousel-item-placeholder")) return !1
			}
			return !0
		},
		get: function(a) {
			return g(">.jcarousel-item-" + a, this.list)
		},
		add: function(a, c) {
			var b = this.get(a),
				d = 0,
				p = g(c);
			if (b.length === 0) for (var j, e = f.intval(a), b = this.create(a);;) {
				if (j = this.get(--e), e <= 0 || j.length) {
					e <= 0 ? this.list.prepend(b) : j.after(b);
					break
				}
			} else d = this.dimension(b);
			p.get(0).nodeName.toUpperCase() == "LI" ? (b.replaceWith(p), b = p) : b.empty().append(c);
			this.format(b.removeClass(this.className("jcarousel-item-placeholder")), a);
			p = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
			d = this.dimension(b, p) - d;
			a > 0 && a < this.first && this.list.css(this.lt, f.intval(this.list.css(this.lt)) - d + "px");
			this.list.css(this.wh, f.intval(this.list.css(this.wh)) + d + "px");
			return b
		},
		remove: function(a) {
			var c = this.get(a);
			if (c.length && !(a >= this.first && a <= this.last)) {
				var b = this.dimension(c);
				a < this.first && this.list.css(this.lt, f.intval(this.list.css(this.lt)) + b + "px");
				c.remove();
				this.list.css(this.wh, f.intval(this.list.css(this.wh)) - b + "px")
			}
		},
		next: function() {
			this.tail !== null && !this.inTail ? this.scrollTail(!1) : this.scroll((this.options.wrap == "both" || this.options.wrap == "last") && this.options.size !== null && this.last == this.options.size ? 1 : this.first + this.options.scroll)
		},
		prev: function() {
			this.tail !== null && this.inTail ? this.scrollTail(!0) : this.scroll((this.options.wrap == "both" || this.options.wrap == "first") && this.options.size !== null && this.first == 1 ? this.options.size : this.first - this.options.scroll)
		},
		scrollTail: function(a) {
			if (!this.locked && !this.animating && this.tail) {
				this.pauseAuto();
				var c = f.intval(this.list.css(this.lt)),
					c = !a ? c - this.tail : c + this.tail;
				this.inTail = !a;
				this.prevFirst = this.first;
				this.prevLast = this.last;
				this.animate(c)
			}
		},
		scroll: function(a, c) {
			!this.locked && !this.animating && (this.pauseAuto(), this.animate(this.pos(a), c))
		},
		pos: function(a, c) {
			var b = f.intval(this.list.css(this.lt));
			if (this.locked || this.animating) return b;
			this.options.wrap != "circular" && (a = a < 1 ? 1 : this.options.size && a > this.options.size ? this.options.size : a);
			for (var d = this.first > a, g = this.options.wrap != "circular" && this.first <= 1 ? 1 : this.first, j = d ? this.get(g) : this.get(this.last), e = d ? g : g - 1, h = null, i = 0, k = !1, l = 0; d ? --e >= a : ++e < a;) {
				h = this.get(e);
				k = !h.length;
				if (h.length === 0 && (h = this.create(e).addClass(this.className("jcarousel-item-placeholder")), j[d ? "before" : "after"](h), this.first !== null && this.options.wrap == "circular" && this.options.size !== null && (e <= 0 || e > this.options.size))) j = this.get(this.index(e)), j.length && (h = this.add(e, j.clone(!0)));
				j = h;
				l = this.dimension(h);
				k && (i += l);
				if (this.first !== null && (this.options.wrap == "circular" || e >= 1 && (this.options.size === null || e <= this.options.size))) b = d ? b + l : b - l
			}
			for (var g = this.clipping(), m = [], o = 0, n = 0, j = this.get(a - 1), e = a; ++o;) {
				h = this.get(e);
				k = !h.length;
				if (h.length === 0) {
					h = this.create(e).addClass(this.className("jcarousel-item-placeholder"));
					if (j.length === 0) this.list.prepend(h);
					else j[d ? "before" : "after"](h);
					if (this.first !== null && this.options.wrap == "circular" && this.options.size !== null && (e <= 0 || e > this.options.size)) j = this.get(this.index(e)), j.length && (h = this.add(e, j.clone(!0)))
				}
				j = h;
				l = this.dimension(h);
				if (l === 0) throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");
				this.options.wrap != "circular" && this.options.size !== null && e > this.options.size ? m.push(h) : k && (i += l);
				n += l;
				if (n >= g) break;
				e++
			}
			for (h = 0; h < m.length; h++) m[h].remove();
			i > 0 && (this.list.css(this.wh, this.dimension(this.list) + i + "px"), d && (b -= i, this.list.css(this.lt, f.intval(this.list.css(this.lt)) - i + "px")));
			i = a + o - 1;
			if (this.options.wrap != "circular" && this.options.size && i > this.options.size) i = this.options.size;
			if (e > i) {
				o = 0;
				e = i;
				for (n = 0; ++o;) {
					h = this.get(e--);
					if (!h.length) break;
					n += this.dimension(h);
					if (n >= g) break
				}
			}
			e = i - o + 1;
			this.options.wrap != "circular" && e < 1 && (e = 1);
			if (this.inTail && d) b += this.tail, this.inTail = !1;
			this.tail = null;
			if (this.options.wrap != "circular" && i == this.options.size && i - o + 1 >= 1 && (d = f.intval(this.get(i).css(!this.options.vertical ? "marginRight" : "marginBottom")), n - d > g)) this.tail = n - g - d;
			if (c && a === this.options.size && this.tail) b -= this.tail, this.inTail = !0;
			for (; a-- > e;) b += this.dimension(this.get(a));
			this.prevFirst = this.first;
			this.prevLast = this.last;
			this.first = e;
			this.last = i;
			return b
		},
		animate: function(a, c) {
			if (!this.locked && !this.animating) {
				this.animating = !0;
				var b = this,
					d = function() {
						b.animating = !1;
						a === 0 && b.list.css(b.lt, 0);
						!b.autoStopped && (b.options.wrap == "circular" || b.options.wrap == "both" || b.options.wrap == "last" || b.options.size === null || b.last < b.options.size || b.last == b.options.size && b.tail !== null && !b.inTail) && b.startAuto();
						b.buttons();
						b.notify("onAfterAnimation");
						if (b.options.wrap == "circular" && b.options.size !== null) for (var c = b.prevFirst; c <= b.prevLast; c++) c !== null && !(c >= b.first && c <= b.last) && (c < 1 || c > b.options.size) && b.remove(c)
					};
				this.notify("onBeforeAnimation");
				if (!this.options.animation || c === !1) this.list.css(this.lt, a + "px"), d();
				else {
					var f = !this.options.vertical ? this.options.rtl ? {
						right: a
					} : {
						left: a
					} : {
						top: a
					},
						d = {
							duration: this.options.animation,
							easing: this.options.easing,
							complete: d
						};
					if (g.isFunction(this.options.animationStepCallback)) d.step = this.options.animationStepCallback;
					this.list.animate(f, d)
				}
			}
		},
		startAuto: function(a) {
			if (a !== void 0) this.options.auto = a;
			if (this.options.auto === 0) return this.stopAuto();
			if (this.timer === null) {
				this.autoStopped = !1;
				var c = this;
				this.timer = window.setTimeout(function() {
					c.next()
				}, this.options.auto * 1E3)
			}
		},
		stopAuto: function() {
			this.pauseAuto();
			this.autoStopped = !0
		},
		pauseAuto: function() {
			if (this.timer !== null) window.clearTimeout(this.timer), this.timer = null
		},
		buttons: function(a, c) {
			if (a == null && (a = !this.locked && this.options.size !== 0 && (this.options.wrap && this.options.wrap != "first" || this.options.size === null || this.last < this.options.size), !this.locked && (!this.options.wrap || this.options.wrap == "first") && this.options.size !== null && this.last >= this.options.size)) a = this.tail !== null && !this.inTail;
			if (c == null && (c = !this.locked && this.options.size !== 0 && (this.options.wrap && this.options.wrap != "last" || this.first > 1), !this.locked && (!this.options.wrap || this.options.wrap == "last") && this.options.size !== null && this.first == 1)) c = this.tail !== null && this.inTail;
			var b = this;
			this.buttonNext.size() > 0 ? (this.buttonNext.unbind(this.options.buttonNextEvent + ".jcarousel", this.funcNext), a && this.buttonNext.bind(this.options.buttonNextEvent + ".jcarousel", this.funcNext), this.buttonNext[a ? "removeClass" : "addClass"](this.className("jcarousel-next-disabled")).attr("disabled", a ? !1 : !0), this.options.buttonNextCallback !== null && this.buttonNext.data("jcarouselstate") != a && this.buttonNext.each(function() {
				b.options.buttonNextCallback(b, this, a)
			}).data("jcarouselstate", a)) : this.options.buttonNextCallback !== null && this.buttonNextState != a && this.options.buttonNextCallback(b, null, a);
			this.buttonPrev.size() > 0 ? (this.buttonPrev.unbind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev), c && this.buttonPrev.bind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev), this.buttonPrev[c ? "removeClass" : "addClass"](this.className("jcarousel-prev-disabled")).attr("disabled", c ? !1 : !0), this.options.buttonPrevCallback !== null && this.buttonPrev.data("jcarouselstate") != c && this.buttonPrev.each(function() {
				b.options.buttonPrevCallback(b, this, c)
			}).data("jcarouselstate", c)) : this.options.buttonPrevCallback !== null && this.buttonPrevState != c && this.options.buttonPrevCallback(b, null, c);
			this.buttonNextState =
			a;
			this.buttonPrevState = c
		},
		notify: function(a) {
			var c = this.prevFirst === null ? "init" : this.prevFirst < this.first ? "next" : "prev";
			this.callback("itemLoadCallback", a, c);
			this.prevFirst !== this.first && (this.callback("itemFirstInCallback", a, c, this.first), this.callback("itemFirstOutCallback", a, c, this.prevFirst));
			this.prevLast !== this.last && (this.callback("itemLastInCallback", a, c, this.last), this.callback("itemLastOutCallback", a, c, this.prevLast));
			this.callback("itemVisibleInCallback", a, c, this.first, this.last, this.prevFirst, this.prevLast);
			this.callback("itemVisibleOutCallback", a, c, this.prevFirst, this.prevLast, this.first, this.last)
		},
		callback: function(a, c, b, d, f, j, e) {
			if (!(this.options[a] == null || typeof this.options[a] != "object" && c != "onAfterAnimation")) {
				var h = typeof this.options[a] == "object" ? this.options[a][c] : this.options[a];
				if (g.isFunction(h)) {
					var i = this;
					if (d === void 0) h(i, b, c);
					else if (f === void 0) this.get(d).each(function() {
						h(i, this, d, b, c)
					});
					else
					for (var a = function(a) {
						i.get(a).each(function() {
							h(i, this, a, b, c)
						})
					}, k = d; k <= f; k++) k !== null && !(k >= j && k <= e) && a(k)
				}
			}
		},
		create: function(a) {
			return this.format("<li></li>", a)
		},
		format: function(a, c) {
			for (var a = g(a), b = a.get(0).className.split(" "), d = 0; d < b.length; d++) b[d].indexOf("jcarousel-") != -1 && a.removeClass(b[d]);
			a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-" + c)).css({
				"float": this.options.rtl ? "right" : "left",
				"list-style": "none"
			}).attr("jcarouselindex", c);
			return a
		},
		className: function(a) {
			return a + " " + a + (!this.options.vertical ? "-horizontal" : "-vertical")
		},
		dimension: function(a, c) {
			var b = g(a);
			if (c == null) return !this.options.vertical ? b.outerWidth(!0) || f.intval(this.options.itemFallbackDimension) : b.outerHeight(!0) || f.intval(this.options.itemFallbackDimension);
			else {
				var d = !this.options.vertical ? c - f.intval(b.css("marginLeft")) - f.intval(b.css("marginRight")) : c - f.intval(b.css("marginTop")) - f.intval(b.css("marginBottom"));
				g(b).css(this.wh, d + "px");
				return this.dimension(b)
			}
		},
		clipping: function() {
			return !this.options.vertical ? this.clip[0].offsetWidth - f.intval(this.clip.css("borderLeftWidth")) - f.intval(this.clip.css("borderRightWidth")) : this.clip[0].offsetHeight - f.intval(this.clip.css("borderTopWidth")) - f.intval(this.clip.css("borderBottomWidth"))
		},
		index: function(a, c) {
			if (c == null) c = this.options.size;
			return Math.round(((a - 1) / c - Math.floor((a - 1) / c)) * c) + 1
		}
	});
	f.extend({
		defaults: function(a) {
			return g.extend(q, a || {})
		},
		intval: function(a) {
			a = parseInt(a, 10);
			return isNaN(a) ? 0 : a
		},
		windowLoaded: function() {
			m = !0
		}
	});
	g.fn.jcarousel = function(a) {
		if (typeof a == "string") {
			var c = g(this).data("jcarousel"),
				b = Array.prototype.slice.call(arguments, 1);
			return c[a].apply(c, b)
		} else
		return this.each(function() {
			var b = g(this).data("jcarousel");
			b ? (a && g.extend(b.options, a), b.reload()) : g(this).data("jcarousel", new f(this, a))
		})
	}
})(jQuery);
//public_html/js/compiled/jquery.autoresize.js
(function(c) {
	c.fn.autoResize = function(e) {
		var a = c.extend({
			onResize: function() {},
			animate: !0,
			animateDuration: 150,
			animateCallback: function() {},
			extraSpace: 20,
			limit: 1E3
		}, e);
		this.filter("textarea").each(function() {
			var d = c(this).css({
				resize: "none",
				"overflow-y": "hidden"
			}),
				h = d.outerHeight(!0),
				e = d.outerWidth(!0),
				f = function() {
					var b = {};
					c.each(["height", "width", "lineHeight", "textDecoration", "letterSpacing"], function(c, a) {
						b[a] = d.css(a)
					});
					b.width = e;
					return d.clone().removeAttr("id").removeAttr("name").css({
						position: "absolute",
						top: 0,
						left: -9999
					}).css(b).attr("tabIndex", "-1").insertBefore(d)
				}(),
				i = null,
				g = function() {
					f.height(0).val(c(this).val()).scrollTop(1E4);
					var b = Math.max(f.scrollTop() + 16, h) + a.extraSpace,
						e = c(this).add(f);
					i !== b && (i = b, c(this).css("overflow-x", "hidden"), b >= a.limit && (b = a.limit - a.extraSpace, c(this).css("overflow-y", "")), a.onResize.call(this), b > h && (a.animate && d.css("display") === "block" ? e.stop().animate({
						height: b + 2
					}, a.animateDuration, a.animateCallback) : e.height(b + 2)))
				};
			d.unbind(".dynSiz").bind("keyup.dynSiz", g).bind("keydown.dynSiz", g).bind("change.dynSiz", g)
		});
		return this
	}
})(jQuery);
//public_html/js/compiled/jquery.autocomplete.js
jQuery.autocomplete = function(h, a) {
	function n() {
		k = {
			data: {},
			length: 0
		}
	}
	function x(a) {
		var c = l.find("li");
		if (c.length) {
			j += a;
			j >= c.size() ? j = -1 : j < -1 && (j = c.size() - 1);
			if (j == -1) return e.val(C), c.removeClass("active"), !1;
			if (c.eq(j).hasClass("section")) return x(a), !1;
			c.removeClass("active").eq(j).addClass("active");
			e.val(c.eq(j).find("strong").text())
		}
	}
	function H() {
		var b = $("li.active", o)[0];
		if (!b) {
			var c = $("li", o);
			a.selectOnly ? c.length == 1 && (b = c[0]) : a.selectFirst && (b = c[0])
		}
		return b ? (y(b), !0) : !1
	}
	function y(b) {
		if (!b) b =
		document.createElement("li"), b.extra = [], b.selectValue = "";
		var c = $.trim(b.selectValue ? b.selectValue : b.innerHTML);
		c && (c = c.replace(/<\/?[^>]+>/gi, ""));
		p = h.lastSelected = c;
		l.html("");
		e.val(c);
		q();
		a.onItemSelect && setTimeout(function() {
			a.onItemSelect(b)
		}, 1)
	}
	function q() {
		m && clearTimeout(m);
		e.removeClass(a.loadingClass);
		l.is(":visible") && l.hide();
		a.mustMatch && e.val() != h.lastSelected && y(null)
	}
	function D(b, c) {
		if (c.content || c.artists) {
			e.removeClass(a.loadingClass);
			o.innerHTML = "";
			if (!z || c.length == 0) return q();
			$(o).append(I(c));
			if (a.autoFill && e.val().toLowerCase() == b.toLowerCase()) {
				var f = c[0][0];
				if (r != 8) {
					e.val(e.val() + f.substring(p.length));
					var d = p.length,
						f = f.length,
						i = e.get(0);
					if (i.createTextRange) {
						var g = i.createTextRange();
						g.collapse(!0);
						g.moveStart("character", d);
						g.moveEnd("character", f);
						g.select()
					} else if (i.setSelectionRange) i.setSelectionRange(d, f);
					else if (i.selectionStart) i.selectionStart = d, i.selectionEnd = f;
					i.focus()
				}
			}
			d = h;
			f = d.offsetLeft || 0;
			for (i = d.offsetTop || 0; d = d.offsetParent;) f += d.offsetLeft, i += d.offsetTop;
			d = {
				x: f,
				y: i
			};
			f = a.width > 0 ? a.width : e.width();
			l.css({
				minWidth: parseInt(f) + "px",
				top: d.y + h.offsetHeight + 9 + "px",
				left: d.x + -13 + "px"
			}).show()
		} else q()
	}
	function I(b) {
		var c = $(document.createElement("ul")),
			f = b.length;
		s = new da.track.search(b.track, s);
		s.log();
		if (a.maxItemsToShow > 0 && a.maxItemsToShow < f) f = a.maxItemsToShow;
		if (b.content && b.content.length) {
			c.append($(document.createElement("li")).addClass("section").append(a.drawContentHeader()));
			var d = 0;
			$(b.content).each(function() {
				d++;
				c.append($(document.createElement("li")).append(a.drawContent(this.title, s.patchURL(this.link, "suggest_content_" + d), this.image, this.compilation, this.year, this.country)))
			})
		}
		if (b.artists && b.artists.length) {
			var e = 0;
			c.append($(document.createElement("li")).addClass("section").append(a.drawArtistHeader()));
			$(b.artists).each(function() {
				e++;
				c.append($(document.createElement("li")).append(a.drawArtist(this.title, s.patchURL(this.link, "suggest_person_" + d))))
			})
		}
		c.children("li").hover(function() {
			$("li", c).removeClass("ac_over");
			$(this).addClass("ac_over");
			j = $("li", c).indexOf($(this).get(0))
		}, function() {
			$(this).removeClass("ac_over")
		}).click(function(a) {
			typeof saveRecommendationSourse == "function" && saveRecommendationSourse("search");
			a.preventDefault();
			a.stopPropagation();
			y(this)
		});
		return c
	}
	function J(b) {
		a.matchCase || (b = b.toLowerCase());
		var c = a.cacheLength ? E(b) : null;
		c ? D(b, c) : typeof a.url == "string" && a.url.length > 0 ? $.ajax({
			url: F(b),
			dataType: "json",
			success: function(a) {
				A(b, a);
				D(b, a)
			}
		}) : e.removeClass(a.loadingClass)
	}
	function F(b) {
		var b = a.url + "?q=" + encodeURI(b) + "&json=1",
			c;
		for (c in a.extraParams) b += "&" + c + "=" + encodeURI(a.extraParams[c]);
		return b
	}
	function E(b) {
		if (!b) return null;
		if (k.data[b]) return k.data[b];
		if (a.matchSubset) for (var c = b.length - 1; c >= a.minChars; c--) {
			var f = b.substr(0, c);
			if (f = k.data[f]) {
				for (var c = [], d = 0; d < f.length; d++) {
					var e = f[d],
						g;
					g = e[0];
					var h = b;
					a.matchCase || (g = g.toLowerCase());
					g = g.indexOf(h);
					g = g == -1 ? !1 : g == 0 || a.matchContains;
					g && (c[c.length] = e)
				}
				return c
			}
		}
		return null
	}
	function B(b, c) {
		c && e.removeClass(a.loadingClass);
		for (var f = c ? c.length : 0, d = null, i = 0; i < f; i++) {
			var g = c[i];
			if (g[0].toLowerCase() == b.toLowerCase()) {
				d = document.createElement("li");
				if (a.formatItem) {
					var h = a.formatItem(g, i, f);
					$(d).append(h)
				} else d.innerHTML = g[0];
				d.selectValue = g[0];
				h = null;
				if (g.length > 1) for (var h = [], j = 1; j < g.length; j++) h[h.length] = g[j];
				d.extra = h
			}
		}
		a.onFindValue && setTimeout(function() {
			a.onFindValue(d)
		}, 1)
	}
	function A(b, c) {
		c && b && a.cacheLength && (!k.length || k.length > a.cacheLength ? (n(), k.length++) : k[b] || k.length++, k.data[b] = c)
	}
	var e = $(h).attr("autocomplete", "off");
	a.inputClass && e.addClass(a.inputClass);
	var o = document.createElement("div"),
		l = $(o);
	l.hide().addClass(a.resultsClass);
	a.width > 0 && l.css("min-width", a.width);
	$("body").append(o);
	h.autocompleter = this;
	var m = null,
		p = "",
		C = "",
		j = -1,
		k = {},
		z = !1,
		r = null,
		s = null;
	n();
	if (a.data != null) {
		var v = "",
			t = {},
			w = [];
		if (typeof a.url != "string") a.cacheLength = 1;
		for (var u = 0; u < a.data.length; u++) w = typeof a.data[u] == "string" ? [a.data[u]] : a.data[u], w[0].length > 0 && (v = w[0].substring(0, 1).toLowerCase(), t[v] || (t[v] = []), t[v].push(w));
		for (var G in t) a.cacheLength++, A(G, t[G])
	}
	e.keydown(function(b) {
		r = b.keyCode;
		switch (b.keyCode) {
		case 38:
			x(-1);
			b.preventDefault();
			break;
		case 40:
			x(1);
			b.preventDefault();
			break;
		case 9:
		case 13:
			H() && (e.get(0).blur(), b.preventDefault());
			break;
		default:
			j = -1, m && clearTimeout(m), m = setTimeout(function() {
				if (r == 46 || r > 8 && r < 32) l.hide();
				else {
					var b = e.val();
					b != p && (p = b, b.length >= a.minChars ? (e.addClass(a.loadingClass), J(b), C = e.val()) : (e.removeClass(a.loadingClass), l.hide()))
				}
			}, a.delay)
		}
	}).focus(function() {
		z = !0
	}).blur(function() {
		z = !1;
		m && clearTimeout(m);
		m = setTimeout(q, 200)
	});
	q();
	this.flushCache = function() {
		n()
	};
	this.setExtraParams =

	function(b) {
		a.extraParams = b
	};
	this.findValue = function() {
		var b = e.val();
		a.matchCase || (b = b.toLowerCase());
		var c = a.cacheLength ? E(b) : null;
		c ? B(b, c) : typeof a.url == "string" && a.url.length > 0 ? $.get(F(b), function(a) {
			a = parseData(a);
			A(b, a);
			B(b, a)
		}) : B(b, null)
	}
};
jQuery.fn.autocomplete = function(h, a, n) {
	a = a || {};
	a.url = h;
	a.data = typeof n == "object" && n.constructor == Array ? n : null;
	a.inputClass = a.inputClass || "ac_input";
	a.resultsClass = a.resultsClass || "ac_results";
	a.lineSeparator = a.lineSeparator || "\n";
	a.cellSeparator = a.cellSeparator || "|";
	a.minChars = a.minChars || 1;
	a.delay = a.delay || 400;
	a.matchCase = a.matchCase || 0;
	a.matchSubset = a.matchSubset && 1;
	a.matchContains = a.matchContains || 0;
	a.cacheLength = a.cacheLength || 1;
	a.mustMatch = a.mustMatch || 0;
	a.extraParams = a.extraParams || {};
	a.loadingClass =
	a.loadingClass || "ac_loading";
	a.selectFirst = a.selectFirst || !1;
	a.selectOnly = a.selectOnly || !1;
	a.maxItemsToShow = a.maxItemsToShow || -1;
	a.autoFill = a.autoFill || !1;
	a.width = parseInt(a.width, 10) || 0;
	this.each(function() {
		new jQuery.autocomplete(this, a)
	});
	return this
};
jQuery.fn.autocompleteArray = function(h, a) {
	return this.autocomplete(null, a, h)
};
jQuery.fn.indexOf = function(h) {
	for (var a = 0; a < this.length; a++) if (this[a] == h) return a;
	return -1
};
//public_html/js/compiled/jqModal.js
(function(b) {
	b.fn.jqm = function(a) {
		var k = {
			overlay: 50,
			overlayClass: "jqmOverlay",
			closeClass: "jqmClose",
			trigger: ".jqModal",
			ajax: d,
			ajaxText: "",
			target: d,
			modal: d,
			toTop: d,
			onShow: d,
			onHide: d,
			onLoad: d
		};
		return this.each(function() {
			if (this._jqm) return i[this._jqm].c = b.extend({}, i[this._jqm].c, a);
			g++;
			this._jqm = g;
			i[g] = {
				c: b.extend(k, b.jqm.params, a),
				a: d,
				w: b(this).addClass("jqmID" + g),
				s: g
			};
			k.trigger && b(this).jqmAddTrigger(k.trigger)
		})
	};
	b.fn.jqmAddClose = function(a) {
		return n(this, a, "jqmHide")
	};
	b.fn.jqmAddTrigger = function(a) {
		return n(this, a, "jqmShow")
	};
	b.fn.jqmShow = function(a) {
		return this.each(function() {
			a = a || window.event;
			b.jqm.open(this._jqm, a)
		})
	};
	b.fn.jqmHide = function(a) {
		return this.each(function() {
			a = a || window.event;
			b.jqm.close(this._jqm, a)
		})
	};
	b.jqm = {
		hash: {},
		open: function(a, k) {
			var c = i[a],
				e = c.c,
				l = "." + e.closeClass,
				h = parseInt(c.w.css("z-index")),
				h = h > 0 ? h : 3E3,
				f = b("<div></div>").css({
					height: "100%",
					width: "100%",
					position: "fixed",
					left: 0,
					top: 0,
					"z-index": h - 1,
					opacity: e.overlay / 100
				});
			if (c.a) return d;
			c.t = k;
			c.a = !0;
			c.w.css("z-index", h);
			e.modal ? (j[0] || o("bind"), j.push(a)) : e.overlay > 0 ? c.w.jqmAddClose(f) : f = d;
			c.o = f ? f.addClass(e.overlayClass).prependTo("body") : d;
			if (p && (b("html,body").css({
				height: "100%",
				width: "100%"
			}), f)) {
				var f = f.css({
					position: "absolute"
				})[0],
					g;
				for (g in {
					Top: 1,
					Left: 1
				}) f.style.setExpression(g.toLowerCase(), "(_=(document.documentElement.scroll" + g + " || document.body.scroll" + g + "))+'px'")
			}
			e.ajax ? (h = e.target || c.w, f = e.ajax, h = typeof h == "string" ? b(h, c.w) : b(h), f = f.substr(0, 1) == "@" ? b(k).attr(f.substring(1)) : f, h.html(e.ajaxText).load(f, function() {
				e.onLoad && e.onLoad.call(this, c);
				l && c.w.jqmAddClose(b(l, c.w));
				q(c)
			})) : l && c.w.jqmAddClose(b(l, c.w));
			e.toTop && c.o && c.w.before('<span id="jqmP' + c.w[0]._jqm + '"></span>').insertAfter(c.o);
			e.onShow ? e.onShow(c) : c.w.show();
			q(c);
			return d
		},
		close: function(a) {
			a = i[a];
			if (!a.a) return d;
			a.a = d;
			j[0] && (j.pop(), j[0] || o("unbind"));
			a.c.toTop && a.o && b("#jqmP" + a.w[0]._jqm).after(a.w).remove();
			if (a.c.onHide) a.c.onHide(a);
			else a.w.hide();
			a.o && a.o.remove();
			return d
		},
		params: {}
	};
	var g = 0,
		i = b.jqm.hash,
		j = [],
		p = b.browser.msie && b.browser.version == "6.0",
		d = !1,
		r = b('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({
			opacity: 0
		}),
		q = function(a) {
			p && (a.o ? a.o.html('<p style="width:100%;height:100%"/>').prepend(r) : b("iframe.jqm", a.w)[0] || a.w.prepend(r));
			s(a)
		},
		s = function(a) {
			try {
				b(":input:visible", a.w)[0].focus()
			} catch (d) {}
		},
		o = function(a) {
			b()[a]("keypress", m)[a]("keydown", m)[a]("mousedown", m)
		},
		m = function(a) {
			var d = i[j[j.length - 1]];
			(a = !b(a.target).parents(".jqmID" + d.s)[0]) && s(d);
			return !a
		},
		n = function(a, g, c) {
			return a.each(function() {
				var a =
				this._jqm;
				b(g).each(function() {
					this[c] || (this[c] = [], b(this).click(function() {
						for (var a in {
							jqmShow: 1,
							jqmHide: 1
						}) for (var b in this[a]) if (i[this[a][b]]) i[this[a][b]].w[a](this);
						return d
					}));
					this[c].push(a)
				})
			})
		}
})(jQuery);
//public_html/js/compiled/mustache.js
var Mustache = function() {
	var j = function() {};
	j.prototype = {
		otag: "{{",
		ctag: "}}",
		pragmas: {},
		buffer: [],
		pragmas_implemented: {
			"IMPLICIT-ITERATOR": !0
		},
		context: {},
		render: function(a, b, d, c) {
			if (!c) this.context = b, this.buffer = [];
			if (!this.includes("", a)) if (c) return a;
			else {
				this.send(a);
				return
			}
			a = this.render_pragmas(a);
			a = this.render_section(a, b, d);
			if (c) return this.render_tags(a, b, d, c);
			this.render_tags(a, b, d, c)
		},
		send: function(a) {
			a != "" && this.buffer.push(a)
		},
		render_pragmas: function(a) {
			if (!this.includes("%", a)) return a;
			var b = this;
			return a.replace(RegExp(this.otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + this.ctag), function(a, c, e) {
				if (!b.pragmas_implemented[c]) throw {
					message: "This implementation of mustache doesn't understand the '" + c + "' pragma"
				};
				b.pragmas[c] = {};
				e && (a = e.split("="), b.pragmas[c][a[0]] = a[1]);
				return ""
			})
		},
		render_partial: function(a, b, d) {
			a = this.trim(a);
			if (!d || d[a] === void 0) throw {
				message: "unknown_partial '" + a + "'"
			};
			if (typeof b[a] != "object") return this.render(d[a], b, d, !0);
			return this.render(d[a], b[a], d, !0)
		},
		render_section: function(a, b, d) {
			if (!this.includes("#", a) && !this.includes("^", a)) return a;
			var c = this;
			return a.replace(RegExp(this.otag + "(\\^|\\#)\\s*(.+)\\s*" + this.ctag + "\n*([\\s\\S]+?)" + this.otag + "\\/\\s*\\2\\s*" + this.ctag + "\\s*", "mg"), function(a, g, i, f) {
				a = c.find(i, b);
				if (g == "^") return !a || c.is_array(a) && a.length === 0 ? c.render(f, b, d, !0) : "";
				else if (g == "#") return c.is_array(a) ? c.map(a, function(a) {
					return c.render(f, c.create_context(a), d, !0)
				}).join("") : c.is_object(a) ? c.render(f, c.create_context(a), d, !0) : typeof a === "function" ? a.call(b, f, function(a) {
					return c.render(a, b, d, !0)
				}) : a ? c.render(f, b, d, !0) : ""
			})
		},
		render_tags: function(a, b, d, c) {
			for (var e = this, g = function() {
				return RegExp(e.otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" + e.ctag + "+", "g")
			}, i = g(), f = function(a, c, f) {
				switch (c) {
				case "!":
					return "";
				case "=":
					return e.set_delimiters(f), i = g(), "";
				case ">":
					return e.render_partial(f, b, d);
				case "{":
					return e.find(f, b);
				default:
					return e.escape(e.find(f, b))
				}
			}, a = a.split("\n"), h = 0; h < a.length; h++) a[h] = a[h].replace(i, f, this), c || this.send(a[h]);
			if (c) return a.join("\n")
		},
		set_delimiters: function(a) {
			a = a.split(" ");
			this.otag = this.escape_regex(a[0]);
			this.ctag = this.escape_regex(a[1])
		},
		escape_regex: function(a) {
			if (!arguments.callee.sRE) arguments.callee.sRE = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g");
			return a.replace(arguments.callee.sRE, "\\$1")
		},
		find: function(a, b) {
			var a = this.trim(a),
				d;
			b[a] === !1 || b[a] === 0 || b[a] ? d = b[a] : (this.context[a] === !1 || this.context[a] === 0 || this.context[a]) && (d = this.context[a]);
			if (typeof d === "function") return d.apply(b);
			if (d !== void 0) return d;
			return ""
		},
		includes: function(a, b) {
			return b.indexOf(this.otag + a) != -1
		},
		escape: function(a) {
			return String(a === null ? "" : a).replace(/&(?!\w+;)|["'<>\\]/g, function(a) {
				switch (a) {
				case "&":
					return "&amp;";
				case "\\":
					return "\\\\";
				case '"':
					return "&quot;";
				case "'":
					return "&#39;";
				case "<":
					return "&lt;";
				case ">":
					return "&gt;";
				default:
					return a
				}
			})
		},
		create_context: function(a) {
			if (this.is_object(a)) return a;
			else {
				var b = ".";
				if (this.pragmas["IMPLICIT-ITERATOR"]) b = this.pragmas["IMPLICIT-ITERATOR"].iterator;
				var d = {};
				d[b] = a;
				return d
			}
		},
		is_object: function(a) {
			return a && typeof a == "object"
		},
		is_array: function(a) {
			return Object.prototype.toString.call(a) === "[object Array]"
		},
		trim: function(a) {
			return a.replace(/^\s*|\s*$/g, "")
		},
		map: function(a, b) {
			if (typeof a.map == "function") return a.map(b);
			else {
				for (var d = [], c = a.length, e = 0; e < c; e++) d.push(b(a[e]));
				return d
			}
		}
	};
	return {
		name: "mustache.js",
		version: "0.3.1-dev",
		to_html: function(a, b, d, c) {
			var e = new j;
			if (c) e.send = c;
			e.render(a, b, d);
			if (!c) return e.buffer.join("\n")
		}
	}
}();
//public_html/js/compiled/jquery.menu-aim.js
(function(d) {
	d.fn.menuAim = function(n) {
		var k = d(this),
			h = null,
			i = [],
			l = null,
			c = null,
			e = d.extend({
				rowSelector: "> li",
				submenuSelector: "*",
				tolerance: 75,
				enter: d.noop,
				exit: d.noop,
				activate: d.noop,
				deactivate: d.noop
			}, n),
			o = function(a) {
				a != h && (h && e.deactivate(h), e.activate(a), h = a)
			},
			m = function(a) {
				var b = p();
				b ? c = setTimeout(function() {
					m(a)
				}, b) : o(a)
			},
			p = function() {
				function a(a, b) {
					return (b.y - a.y) / (b.x - a.x)
				}
				if (!h || !d(h).is(e.submenuSelector)) return 0;
				var b = k.offset(),
					c = {
						x: b.left + k.outerWidth(),
						y: b.top - e.tolerance
					},
					j = {
						x: b.left + k.outerWidth(),
						y: b.top + k.outerHeight() + e.tolerance
					},
					g = i[i.length - 1],
					f = i[0];
				if (!g) return 0;
				f || (f = g);
				if (f.x < b.left || f.x > j.x || f.y < b.top || f.y > j.y) return 0;
				if (l && g.x == l.x && g.y == l.y) return 0;
				var b = a(g, c),
					m = a(g, j),
					c = a(f, c),
					j = a(f, j);
				if (b < c && m > j) return l = g, 300;
				l = null;
				return 0
			};
		k.mouseleave(function() {
			c && clearTimeout(c)
		}).find(e.rowSelector).mouseenter(function() {
			c && clearTimeout(c);
			e.enter(this);
			m(this)
		}).mouseleave(function() {
			e.exit(this)
		});
		d(document).mousemove(function(a) {
			i.push({
				x: a.pageX,
				y: a.pageY
			});
			i.length > 3 && i.shift()
		});
		return this
	}
})(jQuery);
//public_html/js/compiled/cusel.js

function cuSel(d) {
	function f() {
		jQuery("html").unbind("click");
		jQuery("html").click(function(b) {
			var b = jQuery(b.target),
				a = "";
			typeof b.attr("class") != "undefined" && (a = b.attr("class"));
			if ((a.indexOf("cuselText") != -1 || a.indexOf("cuselFrameRight") != -1) && b.parent().attr("class").indexOf("classDisCusel") == -1) {
				jQuery(".cusel-scroll-wrap").css("display", "none").parent(".cusel").removeClass("cuselOpen");
				var c = b.parent().find(".cusel-scroll-wrap").eq(0);
				cuselShowList(c)
			} else if (a.indexOf("cusel") != -1 && a.indexOf("classDisCusel") == -1 && b.is("div")) c = b.find(".cusel-scroll-wrap").eq(0), cuselShowList(c);
			else if (b.is(".cusel-scroll-wrap span") && a.indexOf("cuselActive") == -1) b.attr("val") == void 0 ? c = b.text() : c = b.attr("val"), b.parents(".cusel-scroll-wrap").find(".cuselActive").eq(0).removeClass("cuselActive").end().parents(".cusel-scroll-wrap").next().val(c).end().prev().text(b.text()).end().css("display", "none").parent(".cusel").removeClass("cuselOpen"), b.addClass("cuselActive"), b.parents(".cusel-scroll-wrap").find(".cuselOptHover").removeClass("cuselOptHover"), a.indexOf("cuselActive") == -1 && b.parents(".cusel").find(".cusel-scroll-wrap").eq(0).next("input").change();
			else if (b.parents(".cusel-scroll-wrap").is("div")) return;
			else jQuery(".cusel-scroll-wrap").css("display", "none").parent(".cusel").removeClass("cuselOpen");
			$.browser.opera && $.browser.version.slice(0, 4) < "10.6" && (document.body.style += "")
		});
		jQuery(".cusel").unbind("keydown");
		jQuery(".cusel").keydown(function(b) {
			var a;
			if (window.event) a = window.event.keyCode;
			else if (b) a = b.which;
			if (a == null || a == 0 || a == 9) return !0;
			if (jQuery(this).attr("class").indexOf("classDisCusel") != -1) return !1;
			if (a == 40) return a = jQuery(this).find(".cuselOptHover").eq(0), a = a.is("span") ? a : jQuery(this).find(".cuselActive").eq(0), b = a.next(), b.is("span") && (jQuery(this).find(".cuselText").eq(0).text(b.text()), a.removeClass("cuselOptHover"), b.addClass("cuselOptHover"), $(this).find("input").eq(0).val(b.attr("val")), cuselScrollToCurent($(this).find(".cusel-scroll-wrap").eq(0))), !1;
			if (a == 38) return a = $(this).find(".cuselOptHover").eq(0), a = a.is("span") ? a : $(this).find(".cuselActive").eq(0), cuselActivePrev = a.prev(), cuselActivePrev.is("span") && ($(this).find(".cuselText").eq(0).text(cuselActivePrev.text()), a.removeClass("cuselOptHover"), cuselActivePrev.addClass("cuselOptHover"), $(this).find("input").eq(0).val(cuselActivePrev.attr("val")), cuselScrollToCurent($(this).find(".cusel-scroll-wrap").eq(0))), !1;
			a == 27 && (b = $(this).find(".cuselActive").eq(0).text(), $(this).removeClass("cuselOpen").find(".cusel-scroll-wrap").eq(0).css("display", "none").end().find(".cuselOptHover").eq(0).removeClass("cuselOptHover"), $(this).find(".cuselText").eq(0).text(b), (b = $.browser.opera && $.browser.version.slice(0, 4) < "10.6") && (document.body.style += ""));
			a == 13 && (b = $(this).find(".cuselOptHover").eq(0), b.is("span") ? ($(this).find(".cuselActive").removeClass("cuselActive"), b.addClass("cuselActive")) : $(this).find(".cuselActive").attr("val"), $(this).removeClass("cuselOpen").find(".cusel-scroll-wrap").eq(0).css("display", "none").end().find(".cuselOptHover").eq(0).removeClass("cuselOptHover"), $(this).find("input").eq(0).change(), (b =
			$.browser.opera && $.browser.version.slice(0, 4) < "10.6") && (document.body.style += ""));
			a == 32 && $.browser.opera && (a = $(this).find(".cusel-scroll-wrap").eq(0), cuselShowList(a));
			if ($.browser.opera) return !1
		});
		var c = [];
		jQuery(".cusel").keypress(function(b) {
			function a() {
				var b = [],
					a;
				for (a in c) {
					if (window.event) b[a] = c[a].keyCode;
					else if (c[a]) b[a] = c[a].which;
					b[a] = String.fromCharCode(b[a]).toUpperCase()
				}
				a = jQuery(f).find("span");
				var d = a.length,
					e, l;
				for (e = 0; e < d; e++) {
					var h = !0,
						j;
					for (j in c) l = a.eq(e).text().charAt(j).toUpperCase(), l != b[j] && (h = !1);
					if (h) {
						jQuery(f).find(".cuselOptHover").removeClass("cuselOptHover").end().find("span").eq(e).addClass("cuselOptHover").end().end().find(".cuselText").eq(0).text(a.eq(e).text());
						$(this).find("input").eq(0).val(a.eq(e).text());
						cuselScrollToCurent($(f).find(".cusel-scroll-wrap").eq(0));
						c = c.splice;
						c = [];
						break
					}
				}
				c = c.splice;
				c = []
			}
			var d;
			if (window.event) d = window.event.keyCode;
			else if (b) d = b.which;
			if (d == null || d == 0 || d == 9) return !0;
			if (jQuery(this).attr("class").indexOf("classDisCusel") != -1) return !1;
			var f = this;
			c.push(b);
			clearTimeout(jQuery.data(this, "timer"));
			b = setTimeout(function() {
				a()
			}, 500);
			jQuery(this).data("timer", b);
			if (jQuery.browser.opera && window.event.keyCode != 9) return !1
		})
	}
	jQuery(d.changedEl).each(function() {
		var c = jQuery(this),
			b = c.outerWidth(),
			a = c.attr("class"),
			e = c.attr("id"),
			k = c.attr("name"),
			m = c.val(),
			g = c.find("option[value='" + m + "']").eq(0),
			n = g.text(),
			o = !! c.attr("disabled"),
			l = d.scrollArrows,
			h = c.attr("onchange"),
			j = c.attr("tabindex"),
			p = c.attr("multiple");
		if (!e || p) return !1;
		o ? (classDisCuselText = "classDisCuselLabel", classDisCusel = "classDisCusel") : classDisCusel = classDisCuselText = "";
		l && (classDisCusel += " cuselScrollArrows");
		g.addClass("cuselActive");
		g = c.html().replace(/option/ig, "span").replace(/value=/ig, "val=");
		$.browser.msie && parseInt($.browser.version) < 9 && (g = g.replace(/(val=)(.*?)(>)/g, "$1'$2'$3"));
		c.replaceWith('<div class="cusel ' + a + " " + classDisCusel + '" id=cuselFrame-' + e + ' style="width:' + b + 'px" tabindex="' + j + '"><div class="cuselFrameRight"></div><div class="cuselText">' + n + '</div><div class="cusel-scroll-wrap"><div class="cusel-scroll-pane" id="cusel-scroll-' + e + '">' + g + '</div></div><input type="hidden" id="' + e + '" name="' + k + '" value="' + m + '" /></div>');
		h && jQuery("#" + e).bind("change", h);
		c = jQuery("#cuselFrame-" + e);
		b = c.find("span");
		b.eq(0).text() ? a = b.eq(0).innerHeight() : (a = b.eq(1).innerHeight(), b.eq(0).css("height", b.eq(1).height()));
		b.length > d.visRows ? c.find(".cusel-scroll-wrap").eq(0).css({
			height: a * d.visRows + "px",
			display: "none",
			visibility: "visible"
		}).children(".cusel-scroll-pane").css("height", a * d.visRows + "px") : c.find(".cusel-scroll-wrap").eq(0).css({
			display: "none",
			visibility: "visible"
		});
		e = jQuery("#cusel-scroll-" + e).find("span[addTags]");
		c = e.length;
		for (i = 0; i < c; i++) e.eq(i).append(e.eq(i).attr("addTags")).removeAttr("addTags");
		f()
	});
	jQuery(".cusel").focus(function() {
		jQuery(this).addClass("cuselFocus")
	});
	jQuery(".cusel").blur(function() {
		jQuery(this).removeClass("cuselFocus")
	});
	jQuery(".cusel").hover(function() {
		jQuery(this).addClass("cuselFocus")
	}, function() {
		jQuery(this).removeClass("cuselFocus")
	})
}

function cuSelRefresh(d) {
	var f = d.refreshEl.split(","),
		c = f.length,
		b;
	for (b = 0; b < c; b++) {
		var a = jQuery(f[b]).parents(".cusel").find(".cusel-scroll-wrap").eq(0);
		a.find(".cusel-scroll-pane").jScrollPaneRemoveCusel();
		a.css({
			visibility: "hidden",
			display: "block"
		});
		var e = a.find("span"),
			k = e.eq(0).outerHeight();
		e.length > d.visRows ? a.css({
			height: k * d.visRows + "px",
			display: "none",
			visibility: "visible"
		}).children(".cusel-scroll-pane").css("height", k * d.visRows + "px") : a.css({
			display: "none",
			visibility: "visible"
		})
	}
}

function cuselShowList(d) {
	var f = d.parent(".cusel");
	if (d.css("display") == "none") {
		$(".cusel-scroll-wrap").css("display", "none");
		f.addClass("cuselOpen");
		d.css("display", "block");
		var c = !1;
		f.attr("class").indexOf("cuselScrollArrows") != -1 && (c = !0);
		d.find(".jScrollPaneContainer").eq(0).is("div") || d.find("div").eq(0).jScrollPaneCusel({
			showArrows: c
		});
		cuselScrollToCurent(d)
	} else d.css("display", "none"), f.removeClass("cuselOpen")
}

function cuselScrollToCurent(d) {
	var f = null;
	d.find(".cuselOptHover").eq(0).is("span") ? f = d.find(".cuselOptHover").eq(0) : d.find(".cuselActive").eq(0).is("span") && (f = d.find(".cuselActive").eq(0));
	d.find(".jScrollPaneTrack").eq(0).is("div") && f && (f = f.position(), d = d.find(".cusel-scroll-pane").eq(0).attr("id"), jQuery("#" + d)[0].scrollTo(f.top))
};
//public_html/js/compiled/jScrollPane.js
(function(a) {
	a.jScrollPaneCusel = {
		active: []
	};
	a.fn.jScrollPaneCusel = function(b) {
		var b = a.extend({}, a.fn.jScrollPaneCusel.defaults, b),
			j = function() {
				return !1
			};
		return this.each(function() {
			var c = a(this),
				e = this.parentNode.offsetWidth;
			c.css("overflow", "hidden");
			var H = this;
			if (a(this).parent().is(".jScrollPaneContainer")) {
				var I = b.maintainPosition ? c.position().top : 0,
					d = a(this).parent(),
					g = d.outerHeight(),
					m = g;
				a(">.jScrollPaneTrack, >.jScrollArrowUp, >.jScrollArrowDown", d).remove();
				c.css({
					top: 0
				})
			} else I = 0, this.originalPadding =
			c.css("paddingTop") + " " + c.css("paddingRight") + " " + c.css("paddingBottom") + " " + c.css("paddingLeft"), this.originalSidePaddingTotal = (parseInt(c.css("paddingLeft")) || 0) + (parseInt(c.css("paddingRight")) || 0), m = g = c.innerHeight(), c.wrap("<div class='jScrollPaneContainer'></div>").parent().css({
				height: g + "px",
				width: e + "px"
			}), window.navigator.userProfile || (d = parseInt(a(this).parent().css("border-left-width")) + parseInt(a(this).parent().css("border-right-width")), e -= d, a(this).css("width", e + "px").parent().css("width", e + "px")), a(document).bind("emchange", function() {
				c.jScrollPaneCusel(b)
			});
			if (b.reinitialiseOnImageLoad) {
				var o = a.data(H, "jScrollPaneImagesToLoad") || a("img", c),
					J = [];
				o.length && o.each(function(f, K) {
					a(this).bind("load", function() {
						if (a.inArray(f, J) == -1) J.push(K), o = a.grep(o, function(a) {
							return a != K
						}), a.data(H, "jScrollPaneImagesToLoad", o), b.reinitialiseOnImageLoad = !1, c.jScrollPaneCusel(b)
					}).each(function() {
						if (this.complete || this.complete === void 0) this.src = this.src
					})
				})
			}
			d = {
				height: "auto",
				width: e - b.scrollbarWidth - b.scrollbarMargin - this.originalSidePaddingTotal + "px"
			};
			b.scrollbarOnLeft ? d.paddingLeft = b.scrollbarMargin + b.scrollbarWidth + "px" : d.paddingRight = b.scrollbarMargin + "px";
			c.css(d);
			var q = c.outerHeight(),
				r = g / q;
			if (r < 0.99) {
				var i = c.parent();
				i.append(a('<div class="jScrollPaneTrack"></div>').css({
					width: b.scrollbarWidth + "px"
				}).append(a('<div class="jScrollPaneDrag"></div>').css({
					width: b.scrollbarWidth + "px"
				}).append(a('<div class="jScrollPaneDragTop"></div>').css({
					width: b.scrollbarWidth + "px"
				}), a('<div class="jScrollPaneDragBottom"></div>').css({
					width: b.scrollbarWidth + "px"
				}))));
				var e = a(">.jScrollPaneTrack", i),
					s = a(">.jScrollPaneTrack .jScrollPaneDrag", i);
				if (b.showArrows) {
					var t, B, L, u, M = function() {
						(u > 4 || u % 4 == 0) && k(h + B * C);
						u++
					},
						N = function() {
							a("html").unbind("mouseup", N);
							t.removeClass("jScrollActiveArrowButton");
							clearInterval(L)
						},
						O = function() {
							a("html").bind("mouseup", N);
							t.addClass("jScrollActiveArrowButton");
							u = 0;
							M();
							L = setInterval(M, 100)
						};
					i.append(a("<div></div>").attr({
						"class": "jScrollArrowUp"
					}).css({
						width: b.scrollbarWidth + "px"
					}).bind("mousedown", function() {
						t = a(this);
						B = -1;
						O();
						this.blur();
						return !1
					}).bind("click", j), a("<div></div>").attr({
						"class": "jScrollArrowDown"
					}).css({
						width: b.scrollbarWidth + "px"
					}).bind("mousedown", function() {
						t = a(this);
						B = 1;
						O();
						this.blur();
						return !1
					}).bind("click", j));
					var P = a(">.jScrollArrowUp", i),
						Q = a(">.jScrollArrowDown", i);
					b.arrowSize ? (m = g - b.arrowSize - b.arrowSize, e.css({
						height: m + "px",
						top: b.arrowSize + "px"
					})) : (d = P.height(), b.arrowSize = d, m = g - d - Q.height(), e.css({
						height: m + "px",
						top: d + "px"
					}))
				}
				var D = a(this).css({
					position: "absolute",
					overflow: "visible"
				}),
					p, l, C, h = 0,
					v = r * g / 2,
					E = function(a, b) {
						var c = b == "X" ? "Left" : "Top";
						return a["page" + b] || a["client" + b] + (document.documentElement["scroll" + c] || document.body["scroll" + c]) || 0
					},
					w = function() {
						return !1
					},
					y = function() {
						x();
						p = s.offset(!1);
						p.top -= h;
						l = m - s[0].offsetHeight;
						C = 2 * b.wheelSpeed * l / q
					},
					R = function() {
						a("html").unbind("mouseup", R).unbind("mousemove", S);
						v = r * g / 2;
						a.browser.msie && a("html").unbind("dragstart", w).unbind("selectstart", w)
					},
					k = function(a) {
						h = a = a < 0 ? 0 : a > l ? l : a;
						s.css({
							top: a + "px"
						});
						D.css({
							top: (g - q) * (a / l) + "px"
						});
						c.trigger("scroll");
						b.showArrows && (P[a == 0 ? "addClass" : "removeClass"]("disabled"), Q[a == l ? "addClass" : "removeClass"]("disabled"))
					},
					S = function(a) {
						k(E(a, "Y") - p.top - v)
					};
				s.css({
					height: Math.max(Math.min(r * (g - b.arrowSize * 2), b.dragMaxHeight), b.dragMinHeight) + "px"
				}).bind("mousedown", function(b) {
					y();
					v = E(b, "Y") - h - p.top;
					a("html").bind("mouseup", R).bind("mousemove", S);
					a.browser.msie && a("html").bind("dragstart", w).bind("selectstart", w);
					return !1
				});
				var T, z, U, V = function() {
					(z > 8 || z % 4 == 0) && k(h - (h - U) / 2);
					z++
				},
					W = function() {
						clearInterval(T);
						a("html").unbind("mouseup", W).unbind("mousemove", F)
					},
					F = function(a) {
						U = E(a, "Y") - p.top - v
					};
				e.bind("mousedown", function(b) {
					y();
					F(b);
					z = 0;
					a("html").bind("mouseup", W).bind("mousemove", F);
					T = setInterval(V, 100);
					V()
				});
				i.bind("mousewheel", function(a, b) {
					y();
					x();
					k(h - b * C);
					return !1
				});
				var A, G, X = function() {
					var a = (A - h) / b.animateStep;
					a > 1 || a < -1 ? k(h + a) : (k(A), x())
				},
					x = function() {
						G && (clearInterval(G), delete A)
					},
					n = function(f, d) {
						if (typeof f == "string") {
							$e = a(f, c);
							if (!$e.length) return;
							f = $e.offset().top - c.offset().top
						}
						i.scrollTop(0);
						x();
						var e = -f / (g - q) * l;
						d || !b.animateTo ? k(e) : (A = e, G = setInterval(X, b.animateInterval))
					};
				c[0].scrollTo = n;
				c[0].scrollBy = function(a) {
					var b = -parseInt(D.css("top")) || 0;
					n(b + a)
				};
				y();
				n(-I, !0);
				a("*", this).bind("focus", function() {
					for (var f = a(this), d = 0; f[0] != c[0];) d += f.position().top, f = f.offsetParent();
					var f = -parseInt(D.css("top")) || 0,
						e = f + g;
					d > f && d < e || (e = d - b.scrollbarMargin, d > f && (e += a(this).height() + 15 + b.scrollbarMargin - g), n(e))
				});
				location.hash && n(location.hash);
				a(document).bind("click", function(b) {
					$target = a(b.target);
					$target.is("a") && (b = $target.attr("href"), b.substr(0, 1) == "#" && b.length > 1 && n(b))
				});
				a.jScrollPaneCusel.active.push(c[0])
			} else c.css({
				height: g + "px",
				width: e - this.originalSidePaddingTotal + "px",
				padding: this.originalPadding
			}), c.parent().unbind("mousewheel")
		})
	};
	a.fn.jScrollPaneRemoveCusel = function() {
		a(this).each(function() {
			$this = a(this);
			var b = $this.parent();
			b.is(".jScrollPaneContainer") && ($this.css({
				top: "",
				height: "",
				width: "",
				padding: "",
				overflow: "",
				position: ""
			}), $this.attr("style", $this.data("originalStyleTag")), b.after($this).remove())
		})
	};
	a.fn.jScrollPaneCusel.defaults = {
		scrollbarWidth: 10,
		scrollbarMargin: 5,
		wheelSpeed: 18,
		showArrows: !1,
		arrowSize: 0,
		animateTo: !1,
		dragMinHeight: 1,
		dragMaxHeight: 99999,
		animateInterval: 100,
		animateStep: 3,
		maintainPosition: !0,
		scrollbarOnLeft: !1,
		reinitialiseOnImageLoad: !1
	};
	a(window).bind("unload", function() {
		for (var b = a.jScrollPaneCusel.active, j = 0; j < b.length; j++) b[j].scrollTo = b[j].scrollBy = null
	})
})(jQuery);
//public_html/js/compiled/jquery.mousewheel.js
(function(d) {
	function e(a) {
		var b = a || window.event,
			c = [].slice.call(arguments, 1),
			f = 0,
			e = 0,
			g = 0,
			a = d.event.fix(b);
		a.type = "mousewheel";
		b.wheelDelta && (f = b.wheelDelta / 120);
		b.detail && (f = -b.detail / 3);
		g = f;
		b.axis !== void 0 && b.axis === b.HORIZONTAL_AXIS && (g = 0, e = -1 * f);
		b.wheelDeltaY !== void 0 && (g = b.wheelDeltaY / 120);
		b.wheelDeltaX !== void 0 && (e = -1 * b.wheelDeltaX / 120);
		c.unshift(a, f, e, g);
		return (d.event.dispatch || d.event.handle).apply(this, c)
	}
	var c = ["DOMMouseScroll", "mousewheel"];
	if (d.event.fixHooks) for (var h = c.length; h;) d.event.fixHooks[c[--h]] =
	d.event.mouseHooks;
	d.event.special.mousewheel = {
		setup: function() {
			if (this.addEventListener) for (var a = c.length; a;) this.addEventListener(c[--a], e, !1);
			else this.onmousewheel = e
		},
		teardown: function() {
			if (this.removeEventListener) for (var a = c.length; a;) this.removeEventListener(c[--a], e, !1);
			else this.onmousewheel = null
		}
	};
	d.fn.extend({
		mousewheel: function(a) {
			return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
		},
		unmousewheel: function(a) {
			return this.unbind("mousewheel", a)
		}
	})
})(jQuery);
//public_html/js/compiled/flashembed.js
(function() {
	function j(a, b) {
		if (b) for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
		return a
	}
	function l(a, b) {
		var c = [],
			d;
		for (d in a) a.hasOwnProperty(d) && (c[d] = b(a[d]));
		return c
	}
	function m(a, b, c) {
		if (i.isSupported(b.version)) a.innerHTML = i.getHTML(b, c);
		else if (a.innerHTML = '<a href="http://www.adobe.com/go/getflashplayer"><img style="width:100%;height:100%" target="_blank" src="/images/da/img/update_flash.jpg" alt="Get Adobe Flash player"></a>', b.onFail) {
			var d = b.onFail.call(this);
			if (typeof d == "string") a.innerHTML =
			d
		}
		k && (window[b.id] = document.getElementById(b.id));
		j(this, {
			getRoot: function() {
				return a
			},
			getOptions: function() {
				return b
			},
			getConf: function() {
				return c
			},
			getApi: function() {
				return a.firstChild
			}
		})
	}
	var k = document.all,
		n = typeof jQuery == "function",
		o = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/,
		g = {
			width: "100%",
			height: "100%",
			id: "_" + ("" + Math.random()).slice(9),
			allowFullScreen: !0,
			allowScriptAccess: "always",
			quality: "high",
			version: [3, 0],
			onFail: null,
			expressInstall: null,
			w3c: !1,
			cachebusting: !1
		};
	window.attachEvent && window.attachEvent("onbeforeunload", function() {
		__flash_unloadHandler = function() {};
		__flash_savedUnloadHandler = function() {}
	});
	window.flashembed = function(a, b, c) {
		typeof a == "string" && (a = document.getElementById(a.replace("#", "")));
		if (a) return typeof b == "string" && (b = {
			src: b
		}), new m(a, j(j({}, g), b), c)
	};
	var i = j(window.flashembed, {
		conf: g,
		getVersion: function() {
			var a, b;
			try {
				b = navigator.plugins["Shockwave Flash"].description.slice(16)
			} catch (c) {
				try {
					b = (a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")) && a.GetVariable("$version")
				} catch (d) {
					try {
						b = (a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6")) && a.GetVariable("$version")
					} catch (f) {}
				}
			}
			return (b = o.exec(b)) ? [b[1], b[2]] : [0, 0]
		},
		asString: function(a) {
			if (a === null || a === void 0) return null;
			var b = typeof a;
			b == "object" && a.push && (b = "array");
			switch (b) {
			case "string":
				return a = a.replace(RegExp('(["\\\\])', "g"), "\\$1"), a = a.replace(/^\s?(\d+\.?\d*)%/, "$1pct"), '"' + a + '"';
			case "array":
				return "[" + l(a, function(a) {
					return i.asString(a)
				}).join(",") + "]";
			case "function":
				return '"function()"';
			case "object":
				var b = [],
					c;
				for (c in a) a.hasOwnProperty(c) && b.push('"' + c + '":' + i.asString(a[c]));
				return "{" + b.join(",") + "}"
			}
			return String(a).replace(/\s/g, " ").replace(/\'/g, '"')
		},
		getHTML: function(a, b) {
			var a = j({}, a),
				c = '<object width="' + a.width + '" height="' + a.height + '" id="' + a.id + '" name="' + a.id + '"';
			a.cachebusting && (a.src += (a.src.indexOf("?") != -1 ? "&" : "?") + Math.random());
			c += a.w3c || !k ? ' data="' + a.src + '" type="application/x-shockwave-flash"' : ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
			c += ">";
			if (a.w3c || k) c += '<param name="movie" value="' + a.src + '">';
			var d = a.src;
			a.width = a.height = a.id = a.w3c = a.src = null;
			a.onFail = a.version = a.expressInstall = null;
			for (var f in a) a[f] && (c += '<param name="' + f + '" value="' + a[f] + '">');
			var e = "";
			if (b) {
				for (var g in b) if (b[g]) {
					var h = b[g];
					e += g + "=" + encodeURIComponent(/function|object/.test(typeof h) ? i.asString(h) : h) + "&"
				}
				e = e.slice(0, -1);
				c += '<param name="flashvars" value=\'' + e + "'>"
			}
			c += d.match(/\?/) != null ? '<embed movie="' + d + "&" + e + '" ' : '<embed movie="' + d + "?" + e + '" ';
			e = "";
			for (f in a) a[f] && (e += f + '="' + a[f] + '" ');
			c += e;
			c += "></embed>";
			c += "<div><h1>Версия</h1><p><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a></p></div>";
			c += "</object>";
			return c
		},
		isSupported: function(a) {
			return h[0] > a[0] || h[0] == a[0] && h[1] >= a[1]
		}
	}),
		h = i.getVersion();
	if (n) jQuery.tools = jQuery.tools || {
		version: "@VERSION"
	}, jQuery.tools.flashembed = {
		conf: g
	}, jQuery.fn.flashembed = function(a, b) {
		return this.each(function() {
			jQuery(this).data("flashembed", flashembed(this, a, b))
		})
	}
})();
//public_html/js/compiled/autocomplete.init.js
var autocomplete_track = null;
function highLightSubstring(b, c, a, d) {
	a = a || "span";
	if (!b) return b;
	return b.replace(RegExp("(" + c + ")", "i"), "<" + a + ' class="' + (d || "highlight") + '">$1</' + a + ">")
};
//public_html/js/compiled/jquery.query.js
new
function(h) {
	var l = h.separator || "&",
		k = h.spaces === !1 ? !1 : !0,
		m = h.prefix !== !1 ? h.hash === !0 ? "#" : "?" : "",
		n = h.numbers === !1 ? !1 : !0;
	jQuery.query = new
	function() {
		var g = function(a, b) {
			return a != void 0 && a !== null && (b ? a.constructor == b : !0)
		},
			h = function(a) {
				for (var b = /\[([^[]*)\]/g, d = /^([^[]+)(\[.*\])?$/.exec(a), e = d[1], c = []; a = b.exec(d[2]);) c.push(a[1]);
				return [e, c]
			},
			i = function(a, b, d) {
				var e = b.shift();
				typeof a != "object" && (a = null);
				if (e === "") if (a || (a = []), g(a, Array)) a.push(b.length == 0 ? d : i(null, b.slice(0), d));
				else if (g(a, Object)) {
					for (e =
					0; a[e++] != null;);
					a[--e] = b.length == 0 ? d : i(a[e], b.slice(0), d)
				} else a = [], a.push(b.length == 0 ? d : i(null, b.slice(0), d));
				else if (e && e.match(/^\s*[0-9]+\s*$/)) {
					var c = parseInt(e, 10);
					a || (a = []);
					a[c] = b.length == 0 ? d : i(a[c], b.slice(0), d)
				} else if (e) {
					c = e.replace(/^\s*|\s*$/g, "");
					a || (a = {});
					if (g(a, Array)) {
						for (var f = {}, e = 0; e < a.length; ++e) f[e] = a[e];
						a = f
					}
					a[c] = b.length == 0 ? d : i(a[c], b.slice(0), d)
				} else
				return d;
				return a
			},
			j = function(a) {
				var b = this;
				b.keys = {};
				a.queryObject ? jQuery.each(a.get(), function(a, e) {
					b.SET(a, e)
				}) : jQuery.each(arguments, function() {
					var a;
					a = ("" + this).replace(/^[?#]/, "");
					a = a.replace(/[;&]$/, "");
					k && (a = a.replace(/[+]/g, " "));
					jQuery.each(a.split(/[&;]/), function() {
						var a = decodeURIComponent(this.split("=")[0] || ""),
							c = decodeURIComponent(this.split("=")[1] || "");
						a && (n && (/^[+-]?[0-9]+\.[0-9]*$/.test(c) ? c = parseFloat(c) : /^[+-]?[0-9]+$/.test(c) && (c = parseInt(c, 10))), b.SET(a, !c && c !== 0 ? !0 : c))
					})
				});
				return b
			};
		j.prototype = {
			queryObject: !0,
			has: function(a, b) {
				var d = this.get(a);
				return g(d, b)
			},
			GET: function(a) {
				if (!g(a)) return this.keys;
				for (var b =
				h(a), a = b[1], b = this.keys[b[0]]; b != null && a.length != 0;) b = b[a.shift()];
				return typeof b == "number" ? b : b || ""
			},
			get: function(a) {
				a = this.GET(a);
				if (g(a, Object)) return jQuery.extend(!0, {}, a);
				else if (g(a, Array)) return a.slice(0);
				return a
			},
			SET: function(a, b) {
				var d = !g(b) ? null : b,
					e = h(a),
					c = e[0];
				this.keys[c] = i(this.keys[c], e[1].slice(0), d);
				return this
			},
			set: function(a, b) {
				return this.copy().SET(a, b)
			},
			REMOVE: function(a) {
				return this.SET(a, null).COMPACT()
			},
			remove: function(a) {
				return this.copy().REMOVE(a)
			},
			EMPTY: function() {
				var a =
				this;
				jQuery.each(a.keys, function(b) {
					delete a.keys[b]
				});
				return a
			},
			load: function(a) {
				var b = a.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"),
					d = a.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
				return new j(a.length == d.length ? "" : d, a.length == b.length ? "" : b)
			},
			empty: function() {
				return this.copy().EMPTY()
			},
			copy: function() {
				return new j(this)
			},
			COMPACT: function() {
				function a(b) {
					var d = typeof b == "object" ? g(b, Array) ? [] : {} : b;
					typeof b == "object" && jQuery.each(b, function(b, c) {
						if (!g(c)) return !0;
						var f = a(c);
						g(d, Array) ? d.push(f) : d[b] = f
					});
					return d
				}
				this.keys = a(this.keys);
				return this
			},
			compact: function() {
				return this.copy().COMPACT()
			},
			toString: function() {
				var a = [],
					b = [],
					d = function(a) {
						a += "";
						k && (a = a.replace(/ /g, "+"));
						return encodeURIComponent(a)
					},
					e = function(a, f) {
						var h = function(a) {
							return !f || f == "" ? "" + a : [f, "[", a, "]"].join("")
						};
						jQuery.each(a, function(a, c) {
							if (typeof c == "object") e(c, h(a));
							else {
								var f = h(a);
								g(c) && c !== !1 && (f = [d(f)], c !== !0 && (f.push("="), f.push(d(c))), b.push(f.join("")))
							}
						})
					};
				e(this.keys);
				b.length > 0 && a.push(m);
				a.push(b.join(l));
				return a.join("")
			}
		};
		return new j(location.search, location.hash)
	}
}(jQuery.query || {});
//public_html/js/compiled/jquery.ajaxq.js
(function(d) {
	d.configureAjaxq = function(a, b) {
		if (typeof document.ajaxq == "undefined") document.ajaxq = {
			q: {},
			r: null
		};
		var c = {
			complete: function() {},
			start: function() {},
			mostRecentOnly: !1
		};
		d.extend(c, b);
		typeof document.ajaxq.q[a] === "undefined" && (document.ajaxq.q[a] = {
			requests: [],
			complete: c.complete,
			start: c.start,
			mostRecentOnly: c.mostRecentOnly
		})
	};
	d.ajaxq = function(a, b) {
		d.configureAjaxq(a, {});
		if (typeof b !== "undefined") {
			var c = {},
				e;
			for (e in b) b.hasOwnProperty(e) && (c[e] = b[e]);
			b = c;
			if (document.ajaxq.q[a].mostRecentOnly === !0 && document.ajaxq.r !== null) c = document.ajaxq.q[a].requests.shift(), document.ajaxq.q[a].requests = [c];
			var f = b.complete;
			b.complete = function(b, c) {
				document.ajaxq.q[a].requests.shift();
				document.ajaxq.r = null;
				f && f(b, c);
				document.ajaxq.q[a].requests.length > 0 ? document.ajaxq.r = d.ajax(document.ajaxq.q[a].requests[0]) : document.ajaxq.q[a].complete()
			};
			document.ajaxq.q[a].requests.push(b);
			if (document.ajaxq.q[a].requests.length === 1) document.ajaxq.q[a].start(), document.ajaxq.r = d.ajax(b)
		} else {
			c = document.ajaxq.q[a].complete;
			e = document.ajaxq.q[a].start;
			if (document.ajaxq.r) document.ajaxq.r.abort(), document.ajaxq.r = null;
			document.ajaxq.q[a] = void 0;
			d.configureAjaxq(a, {
				start: e,
				complete: c
			})
		}
	}
})(jQuery);
//public_html/js/compiled/json.js
var JSON;
if (!JSON) JSON = {};
(function() {
	function f(n) {
		return n < 10 ? "0" + n : n
	}
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function(key) {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
			return this.valueOf()
		}
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		gap, indent, meta = {
			"": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		rep;
	function quote(string) {
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
			var c = meta[a];
			return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + string + '"'
	}
	function str(key, holder) {
		var i, k, v, length, mind =
		gap,
			partial, value = holder[key];
		if (value && typeof value === "object" && typeof value.toJSON === "function") value = value.toJSON(key);
		if (typeof rep === "function") value = rep.call(holder, key, value);
		switch (typeof value) {
		case "string":
			return quote(value);
		case "number":
			return isFinite(value) ? String(value) : "null";
		case "boolean":
		case "null":
			return String(value);
		case "object":
			if (!value) return "null";
			gap += indent;
			partial = [];
			if (Object.prototype.toString.apply(value) === "[object Array]") {
				length = value.length;
				for (i = 0; i < length; i += 1) partial[i] = str(i, value) || "null";
				v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
				gap = mind;
				return v
			}
			if (rep && typeof rep === "object") {
				length = rep.length;
				for (i = 0; i < length; i += 1) if (typeof rep[i] === "string") {
					k = rep[i];
					v = str(k, value);
					if (v) partial.push(quote(k) + (gap ? ": " : ":") + v)
				}
			} else
			for (k in value) if (Object.prototype.hasOwnProperty.call(value, k)) {
				v = str(k, value);
				if (v) partial.push(quote(k) + (gap ? ": " : ":") + v)
			}
			v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
			gap = mind;
			return v
		}
	}
	if (typeof JSON.stringify !== "function") JSON.stringify = function(value, replacer, space) {
		var i;
		gap = "";
		indent = "";
		if (typeof space === "number") for (i = 0; i < space; i += 1) indent += " ";
		else if (typeof space === "string") indent = space;
		rep = replacer;
		if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) throw new Error("JSON.stringify");
		return str("", {
			"": value
		})
	};
	if (typeof JSON.parse !== "function") JSON.parse =

	function(text, reviver) {
		var j;
		function walk(holder, key) {
			var k, v, value = holder[key];
			if (value && typeof value === "object") for (k in value) if (Object.prototype.hasOwnProperty.call(value, k)) {
				v = walk(value, k);
				if (v !== undefined) value[k] = v;
				else delete value[k]
			}
			return reviver.call(holder, key, value)
		}
		text = String(text);
		cx.lastIndex = 0;
		if (cx.test(text)) text = text.replace(cx, function(a) {
			return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		});
		if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
			j = eval("(" + text + ")");
			return typeof reviver === "function" ? walk({
				"": j
			}, "") : j
		}
		throw new SyntaxError("JSON.parse");
	}
})();
//public_html/js/compiled/jquery.jstorage.js
(function(g) {
	function m() {
		if (e.jStorage) try {
			d = n(String(e.jStorage))
		} catch (a) {
			e.jStorage = "{}"
		} else e.jStorage = "{}";
		j = e.jStorage ? String(e.jStorage).length : 0
	}
	function h() {
		try {
			e.jStorage = o(d), c && (c.setAttribute("jStorage", e.jStorage), c.save("jStorage")), j = e.jStorage ? String(e.jStorage).length : 0
		} catch (a) {}
	}
	function i(a) {
		if (!a || typeof a != "string" && typeof a != "number") throw new TypeError("Key name must be string or numeric");
		if (a == "__jstorage_meta") throw new TypeError("Reserved key name");
		return !0
	}
	function k() {
		var a, b, c, e = Infinity,
			f = !1;
		clearTimeout(p);
		if (d.__jstorage_meta && typeof d.__jstorage_meta.TTL == "object") {
			a = +new Date;
			c = d.__jstorage_meta.TTL;
			for (b in c) c.hasOwnProperty(b) && (c[b] <= a ? (delete c[b], delete d[b], f = !0) : c[b] < e && (e = c[b]));
			e != Infinity && (p = setTimeout(k, e - a));
			f && h()
		}
	}
	if (!g || !g.toJSON && !Object.toJSON && !window.JSON) throw Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");
	var d = {},
		e = {
			jStorage: "{}"
		},
		c = null,
		j = 0,
		o = g.toJSON || Object.toJSON || window.JSON && (JSON.encode || JSON.stringify),
		n = g.evalJSON || window.JSON && (JSON.decode || JSON.parse) ||
		function(a) {
			return String(a).evalJSON()
		},
		f = !1,
		p, l = {
			isXML: function(a) {
				return (a = (a ? a.ownerDocument || a : 0).documentElement) ? a.nodeName !== "HTML" : !1
			},
			encode: function(a) {
				if (!this.isXML(a)) return !1;
				try {
					return (new XMLSerializer).serializeToString(a)
				} catch (b) {
					try {
						return a.xml
					} catch (d) {}
				}
				return !1
			},
			decode: function(a) {
				var b = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject &&
				function(a) {
					var b = new ActiveXObject("Microsoft.XMLDOM");
					b.async = "false";
					b.loadXML(a);
					return b
				};
				if (!b) return !1;
				a = b.call("DOMParser" in window && new DOMParser || window, a, "text/xml");
				return this.isXML(a) ? a : !1
			}
		};
	g.jStorage = {
		version: "0.1.7.0",
		set: function(a, b, c) {
			i(a);
			c = c || {};
			l.isXML(b) ? b = {
				_is_xml: !0,
				xml: l.encode(b)
			} : typeof b == "function" ? b = null : b && typeof b == "object" && (b = n(o(b)));
			d[a] = b;
			isNaN(c.TTL) ? h() : this.setTTL(a, c.TTL);
			return b
		},
		get: function(a, b) {
			i(a);
			if (a in d) return d[a] && typeof d[a] == "object" && d[a]._is_xml && d[a]._is_xml ? l.decode(d[a].xml) : d[a];
			return typeof b == "undefined" ? null : b
		},
		deleteKey: function(a) {
			i(a);
			if (a in d) return delete d[a], d.__jstorage_meta && typeof d.__jstorage_meta.TTL == "object" && a in d.__jstorage_meta.TTL && delete d.__jstorage_meta.TTL[a], h(), !0;
			return !1
		},
		setTTL: function(a, b) {
			var c = +new Date;
			i(a);
			b = Number(b) || 0;
			if (a in d) {
				if (!d.__jstorage_meta) d.__jstorage_meta = {};
				if (!d.__jstorage_meta.TTL) d.__jstorage_meta.TTL = {};
				b > 0 ? d.__jstorage_meta.TTL[a] = c + b : delete d.__jstorage_meta.TTL[a];
				h();
				k();
				return !0
			}
			return !1
		},
		flush: function() {
			d = {};
			h();
			return !0
		},
		storageObj: function() {
			function a() {}
			a.prototype = d;
			return new a
		},
		index: function() {
			var a = [],
				b;
			for (b in d) d.hasOwnProperty(b) && b != "__jstorage_meta" && a.push(b);
			return a
		},
		storageSize: function() {
			return j
		},
		currentBackend: function() {
			return f
		},
		storageAvailable: function() {
			return !!f
		},
		reInit: function() {
			var a;
			if (c && c.addBehavior) {
				a = document.createElement("link");
				c.parentNode.replaceChild(a, c);
				c = a;
				c.style.behavior = "url(#default#userData)";
				document.getElementsByTagName("head")[0].appendChild(c);
				c.load("jStorage");
				a = "{}";
				try {
					a = c.getAttribute("jStorage")
				} catch (b) {}
				e.jStorage = a;
				f = "userDataBehavior"
			}
			m()
		}
	};
	(function() {
		var a = !1;
		if ("localStorage" in window) try {
			window.localStorage.setItem("_tmptest", "tmpval"), a = !0, window.localStorage.removeItem("_tmptest")
		} catch (b) {}
		if (a) try {
			if (window.localStorage) e = window.localStorage, f = "localStorage"
		} catch (d) {} else if ("globalStorage" in window) try {
			window.globalStorage && (e = window.globalStorage[window.location.hostname], f = "globalStorage")
		} catch (g) {} else if (c = document.createElement("link"), c.addBehavior) {
			c.style.behavior = "url(#default#userData)";
			document.getElementsByTagName("head")[0].appendChild(c);
			c.load("jStorage");
			a = "{}";
			try {
				a = c.getAttribute("jStorage")
			} catch (h) {}
			e.jStorage = a;
			f = "userDataBehavior"
		} else {
			c = null;
			return
		}
		m();
		k()
	})()
})(window.$ || window.jQuery);
//public_html/js/compiled/jquery.popupWindow.js
(function($) {
	var defaults = {
		height: 500,
		width: 500,
		toolbar: false,
		scrollbars: false,
		status: false,
		resizable: false,
		left: 0,
		top: 0,
		center: true,
		createNew: true,
		name: null,
		location: false,
		menubar: false,
		onUnload: null
	};
	$.popupWindow = function(url, opts) {
		var options = $.extend({}, defaults, opts);
		if (options.center) {
			options.top = (screen.height - options.height) / 2 - 50;
			options.left = (screen.width - options.width) / 2
		}
		var params = [];
		params.push("location=" + (options.location ? "yes" : "no"));
		params.push("menubar=" + (options.menubar ? "yes" : "no"));
		params.push("toolbar=" + (options.toolbar ? "yes" : "no"));
		params.push("scrollbars=" + (options.scrollbars ? "yes" : "no"));
		params.push("status=" + (options.status ? "yes" : "no"));
		params.push("resizable=" + (options.resizable ? "yes" : "no"));
		params.push("height=" + options.height);
		params.push("width=" + options.width);
		params.push("left=" + options.left);
		params.push("top=" + options.top);
		var random = (new Date).getTime();
		var name = options.name || (options.createNew ? "popup_window_" + random : "popup_window");
		var win = window.open(url, name, params.join(","));
		if (options.onUnload && typeof options.onUnload === "function") var unloadInterval = setInterval(function() {
			if (!win || win.closed) {
				clearInterval(unloadInterval);
				options.onUnload()
			}
		}, 50);
		if (win && win.focus) win.focus();
		return win
	}
})(jQuery);
//public_html/js/compiled/jquery.waterfall.js
(function($) {
	$.waterfall = function() {
		var steps = [],
			dfrd = $.Deferred(),
			pointer = 0;
		$.each(arguments, function(i, a) {
			steps.push(function() {
				var args = [].slice.apply(arguments),
					d;
				if (typeof a == "function") {
					if (!((d = a.apply(null, args)) && d.promise)) d = $.Deferred()[d === false ? "reject" : "resolve"](d)
				} else if (a && a.promise) d = a;
				else d = $.Deferred()[a === false ? "reject" : "resolve"](a);
				d.fail(function() {
					dfrd.reject.apply(dfrd, [].slice.apply(arguments))
				}).done(function(data) {
					pointer++;
					args.push(data);
					pointer == steps.length ? dfrd.resolve.apply(dfrd, args) : steps[pointer].apply(null, args)
				})
			})
		});
		steps.length ? steps[0]() : dfrd.resolve();
		return dfrd
	}
})(jQuery);
//public_html/js/compiled/jquery.tmpl.js
(function(d) {
	function m(a, b, e, c) {
		c = {
			data: c || c === 0 || c === !1 ? c : b ? b.data : {},
			_wrap: b ? b._wrap : null,
			tmpl: null,
			parent: b || null,
			nodes: [],
			calls: B,
			nest: C,
			wrap: D,
			html: E,
			update: F
		};
		a && d.extend(c, a, {
			nodes: [],
			parent: b
		});
		if (e) c.tmpl = e, c._ctnt = c._ctnt || c.tmpl(d, c), c.key = ++n, (t.length ? o : j)[n] = c;
		return c
	}
	function p(a, b, e) {
		var c, e = e ? d.map(e, function(b) {
			return typeof b === "string" ? a.key ? b.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + l + '="' + a.key + '" $2') : b : p(b, a, b._ctnt)
		}) : a;
		if (b) return e;
		e = e.join("");
		e.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(b, a, e, i) {
			c = d(e).get();
			v(c);
			a && (c = u(a).concat(c));
			i && (c = c.concat(u(i)))
		});
		return c ? c : u(e)
	}
	function u(a) {
		var b = document.createElement("div");
		b.innerHTML = a;
		return d.makeArray(b.childNodes)
	}
	function w(a) {
		return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + d.trim(a).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(a, e, c, g, h, f, i) {
			a = d.tmpl.tag[c];
			if (!a) throw "Unknown template tag: " + c;
			c = a._default || [];
			f && !/\w$/.test(h) && (h += f, f = "");
			h ? (h = q(h), i = i ? "," + q(i) + ")" : f ? ")" : "", i = f ? h.indexOf(".") > -1 ? h + q(f) : "(" + h + ").call($item" + i : h, f = f ? i : "(typeof(" + h + ")==='function'?(" + h + ").call($item):(" + h + "))") : f = i = c.$1 || "null";
			g = q(g);
			return "');" + a[e ? "close" : "open"].split("$notnull_1").join(h ? "typeof(" + h + ")!=='undefined' && (" + h + ")!=null" : "true").split("$1a").join(f).split("$1").join(i).split("$2").join(g || c.$2 || "") + "__.push('"
		}) + "');}return __;")
	}
	function x(a, b) {
		a._wrap = p(a, !0, d.isArray(b) ? b : [y.test(b) ? b : d(b).html()]).join("")
	}
	function q(a) {
		return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
	}
	function v(a) {
		function b(a) {
			function b(a) {
				var G;
				a += e;
				G = h[a] = h[a] || m(f, j[f.parent.key + e] || f.parent), f = G
			}
			var c, g = a,
				f, i;
			if (i = a.getAttribute(l)) {
				for (; g.parentNode && (g = g.parentNode).nodeType === 1 && !(c = g.getAttribute(l)););
				if (c !== i) {
					g = g.parentNode ? g.nodeType === 11 ? 0 : g.getAttribute(l) || 0 : 0;
					if (!(f = j[i])) f = o[i], f = m(f, j[g] || o[g]), f.key = ++n, j[n] = f;
					k && b(i)
				}
				a.removeAttribute(l)
			} else if (k && (f = d.data(a, "tmplItem"))) b(f.key), j[f.key] = f, g = (g = d.data(a.parentNode, "tmplItem")) ? g.key : 0;
			if (f) {
				for (c = f; c && c.key != g;) c.nodes.push(a), c = c.parent;
				delete f._ctnt;
				delete f._wrap;
				d.data(a, "tmplItem", f)
			}
		}
		var e = "_" + k,
			c, g, h = {},
			f, i, r;
		f = 0;
		for (i = a.length; f < i; f++) if ((c = a[f]).nodeType === 1) {
			g = c.getElementsByTagName("*");
			for (r = g.length - 1; r >= 0; r--) b(g[r]);
			b(c)
		}
	}
	function B(a, b, d, c) {
		if (!a) return t.pop();
		t.push({
			_: a,
			tmpl: b,
			item: this,
			data: d,
			options: c
		})
	}
	function C(a, b, e) {
		return d.tmpl(d.template(a), b, e, this)
	}
	function D(a, b) {
		var e = a.options || {};
		e.wrapped = b;
		return d.tmpl(d.template(a.tmpl), a.data, e, a.item)
	}
	function E(a, b) {
		var e = this._wrap;
		return d.map(d(d.isArray(e) ? e.join("") : e).filter(a || "*"), function(a) {
			if (b) a = a.innerText || a.textContent;
			else {
				var d;
				if (!(d = a.outerHTML)) d = document.createElement("div"), d.appendChild(a.cloneNode(!0)), d = d.innerHTML;
				a = d
			}
			return a
		})
	}
	function F() {
		var a = this.nodes;
		d.tmpl(null, null, null, this).insertBefore(a[0]);
		d(a).remove()
	}
	var z = d.fn.domManip,
		l = "_tmplitem",
		y = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
		j = {},
		o = {},
		s, A = {
			key: 0,
			data: {}
		},
		n = 0,
		k = 0,
		t = [];
	d.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(a, b) {
		d.fn[a] = function(e) {
			var c = [],
				e = d(e),
				g, h, f;
			g = this.length === 1 && this[0].parentNode;
			s = j || {};
			if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) e[b](this[0]), c = this;
			else {
				h = 0;
				for (f = e.length; h < f; h++) k = h, g = (h > 0 ? this.clone(!0) : this).get(), d(e[h])[b](g), c = c.concat(g);
				k = 0;
				c = this.pushStack(c, a, e.selector)
			}
			e = s;
			s = null;
			d.tmpl.complete(e);
			return c
		}
	});
	d.fn.extend({
		tmpl: function(a, b, e) {
			return d.tmpl(this[0], a, b, e)
		},
		tmplItem: function() {
			return d.tmplItem(this[0])
		},
		template: function(a) {
			return d.template(a, this[0])
		},
		domManip: function(a, b, e) {
			if (a[0] && d.isArray(a[0])) {
				for (var c = d.makeArray(arguments), g = a[0], h = g.length, f = 0, i; f < h && !(i = d.data(g[f++], "tmplItem")););
				i && k && (c[2] = function(a) {
					d.tmpl.afterManip(this, a, e)
				});
				z.apply(this, c)
			} else z.apply(this, arguments);
			k = 0;
			s || d.tmpl.complete(j);
			return this
		}
	});
	d.extend({
		tmpl: function(a, b, e, c) {
			var g = !c;
			if (g) c = A, a = d.template[a] || d.template(null, a), o = {};
			else if (!a) return a = c.tmpl, j[c.key] = c, c.nodes = [], c.wrapped && x(c, c.wrapped), d(p(c, null, c.tmpl(d, c)));
			if (!a) return [];
			typeof b === "function" && (b = b.call(c || {}));
			e && e.wrapped && x(e, e.wrapped);
			b = d.isArray(b) ? d.map(b, function(b) {
				return b ? m(e, c, a, b) : null
			}) : [m(e, c, a, b)];
			return g ? d(p(c, null, b)) : b
		},
		tmplItem: function(a) {
			var b;
			for (a instanceof d && (a = a[0]); a && a.nodeType === 1 && !(b = d.data(a, "tmplItem")) && (a = a.parentNode););
			return b || A
		},
		template: function(a, b) {
			if (b) return typeof b === "string" ? b = w(b) : b instanceof d && (b = b[0] || {}), b.nodeType && (b = d.data(b, "tmpl") || d.data(b, "tmpl", w(b.innerHTML))), typeof a === "string" ? d.template[a] = b : b;
			return a ? typeof a !== "string" ? d.template(null, a) : d.template[a] || d.template(null, y.test(a) ? a : d(a)) : null
		},
		encode: function(a) {
			return ("" + a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
		}
	});
	d.extend(d.tmpl, {
		tag: {
			tmpl: {
				_default: {
					$2: "null"
				},
				open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
			},
			wrap: {
				_default: {
					$2: "null"
				},
				open: "$item.calls(__,$1,$2);__=[];",
				close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
			},
			each: {
				_default: {
					$2: "$index, $value"
				},
				open: "if($notnull_1){$.each($1a,function($2){with(this){",
				close: "}});}"
			},
			"if": {
				open: "if(($notnull_1) && $1a){",
				close: "}"
			},
			"else": {
				_default: {
					$1: "true"
				},
				open: "}else if(($notnull_1) && $1a){"
			},
			html: {
				open: "if($notnull_1){__.push($1a);}"
			},
			"=": {
				_default: {
					$1: "$data"
				},
				open: "if($notnull_1){__.push($.encode($1a));}"
			},
			"!": {
				open: ""
			}
		},
		complete: function() {
			j = {}
		},
		afterManip: function(a, b, e) {
			var c = b.nodeType === 11 ? d.makeArray(b.childNodes) : b.nodeType === 1 ? [b] : [];
			e.call(a, b);
			v(c);
			k++
		}
	})
})(jQuery);
//public_html/js/compiled/jquery.browser.js
(function(d, e) {
	var c, a;
	d.uaMatch = function(b) {
		var b = b.toLowerCase(),
			a = /(opr)[\/]([\w.]+)/.exec(b) || /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || b.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(b) || b.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [],
			b = /(ipad)/.exec(b) || /(iphone)/.exec(b) || /(android)/.exec(b) || [];
		return {
			browser: a[1] || "",
			version: a[2] || "0",
			platform: b[0] || ""
		}
	};
	c = d.uaMatch(e.navigator.userAgent);
	a = {};
	if (c.browser) a[c.browser] = !0, a.version = c.version;
	c.platform && (a[c.platform] = !0);
	if (a.chrome || a.opr) a.webkit = !0;
	else if (a.webkit) a.safari = !0;
	if (a.rv) a.msie = !0;
	if (a.opr) a.opera = !0;
	d.browser = a
})(jQuery, window);
//public_html/js/compiled/ugc.js
da.ugc = {
	ajax: function(a) {
		if (!a.data) a.data = {};
		a.data.session = getCookieForPlayer();
		return $.ajax(a)
	},
	init_watchhistory_tab: function() {
		da.on("watched.show").add(function(a) {
			a = a ? parseInt(a) : 0;
			da.ugc.watchhistory.init()(a)
		})
	}
};
da.ugc.watchhistory = {
	url: null,
	paging: null,
	build_paging: function() {
		var a = $("#watchistory_paging"),
			c = parseInt(a.data("limit")),
			b = $("#watchistory");
		da.ugc.watchhistory.url = b.data("url");
		var h = da.ugc.watchhistory.build_draw_row(b),
			e = new pagintator({
				limit: c,
				prev: a.find(".link-prev"),
				next: a.find(".link-next"),
				call: function(a) {
					var f = !0;
					a.nocache && (f = !1);
					document.location.hash = "#watched?" + a.from;
					da.ugc.ajax({
						url: da.ugc.watchhistory.url,
						data: {
							from: a.from,
							to: a.to
						},
						cache: f,
						success: function(d) {
							if (!d || d.error || d.length == 0) {
								if (e.from > 0) return e.unlock(), e.go(e.from - e.limit);
								$(b.data("empty")).show()
							} else $(b.data("wrapper")).show();
							b.html("").removeClass("loading");
							for (var f = Math.min(c, d.length), g = 0; g < f; g++) b.append(h(d[g]));
							da.ugc.watchhistory.apply_eveness(b);
							a.success(d)
						},
						error: function() {
							$(b.data("empty")).show()
						}
					})
				}
			});
		return e
	},
	init: function() {
		if (!da.ugc.paging) da.ugc.watchhistory.paging = da.ugc.watchhistory.build_paging();
		return function(a) {
			da.ugc.watchhistory.paging.go(a)
		}
	},
	delete_click: function(a, c) {
		var b = $(c);
		if (b.hasClass("loading")) return !1;
		b.addClass("loading");
		da.ugc.ajax({
			url: da.ugc.watchhistory.url + "delete",
			type: "POST",
			data: {
				content_id: a
			},
			success: function(a) {
				return a.result == "ok" ? da.ugc.watchhistory.paging.go(da.ugc.watchhistory.paging.from, {
					nocache: !0
				}) : (b.removeClass("loading"), !1)
			}
		});
		return !1
	},
	build_draw_row: function(a) {
		var c = da.feed.jqtpl("#watchistory_row");
		return function(b) {
			b.url = b.compilation ? "/watch/~/content/" + b.id + "/" : "/watch/" + b.id + "/";
			b.thumb = b.thumbnails.length ? b.thumbnails[0].path + "/" + a.data("preview") + "/" : a.data("thumb");
			b.content_genres = get_genres_title(b.genres);
			b.added = format_period(b.watch_date);
			return c(b)
		}
	},
	apply_eveness: function(a) {
		var c = ["odd", "even"],
			b = 0;
		a.children().each(function() {
			this.className = c[b % 2];
			b++
		})
	}
};
var pagintator = function(a) {
	this.from = 0;
	this.locked = !1;
	for (key in a) this[key] = a[key];
	var c = this;
	this.prev.click(function() {
		if (this.getAttribute("disabled")) return !1;
		c.go(c.from - c.limit);
		return !1
	});
	this.next.click(function() {
		if (this.getAttribute("disabled")) return !1;
		c.go(c.from + c.limit);
		return !1
	})
};
pagintator.prototype.go = function(a, c) {
	c || (c = {});
	if (!this.lock()) return !1;
	this.from = a;
	var b = this;
	c.from = a;
	c.to = a + this.limit;
	c.success = function(a) {
		b.redraw(a)
	};
	this.call(c)
};
pagintator.prototype.redraw = function(a) {
	this.unlock();
	this.from == 0 && a.length <= this.limit && (this.prev.hide(), this.next.hide());
	enable_if(this.prev, this.from > 0);
	enable_if(this.next, a.length > this.limit)
};
pagintator.prototype.lock = function() {
	if (this.locked) return !1;
	disable(this.prev);
	disable(this.next);
	return this.locked = !0
};
pagintator.prototype.unlock = function() {
	this.locked = !1
};
//public_html/js/compiled/feed.js
if (window.da == void 0) var da = [];
da.feed = {
	jQuery: function(a) {
		this.each(function() {
			da.feed.init(da.settings.data(this).merge(a).merge({
				target: this
			}))
		})
	},
	hideparent: function(a) {
		return function() {
			$(a).parent().hide()
		}
	},
	init: function(a) {
		if (a.error == void 0) a.error = da.feed.hideparent(a.target);
		da.feed.load({
			url: a.url,
			error: a.error,
			render: da.feed.render({
				target: $(a.target),
				tpl: da.feed.fire(da.feed.jqtpl(a.tpl), a.fire)
			})
		})
	},
	emptyResult: "empty result",
	safe: function(a) {
		var b = a.success ||
		function() {},
			c = a.error || da.feed.stderror;
		a.error = function(a, b, f) {
			c({
				"class": "JqueryAjaxError",
				message: b,
				jqXHR: a,
				errorThrown: f
			})
		};
		a.success = function(a) {
			if (a.error) return c(a.error);
			b(a)
		};
		return a
	},
	stderror: function(a) {
		da.on("ajax_error").fire(a)
	},
	load: function(a) {
		var b = a.success ||
		function() {},
			c = a.recommendationId || void 0;
		a.recommendationId !== void 0 && delete a.recommendationId;
		a = da.feed.safe(a);
		if (!a.empty) a.empty = a.error;
		a.success = function(d) {
			if (!d.entries) return a.error({
				message: da.feed.emptyResult,
				resp: d
			});
			if (d.entries.length) {
				for (var e = 0; e < d.entries.length; e++) a.render(d.entries[e], c);
				b(d)
			} else if (a.empty != void 0) return a.empty(d)
		};
		$.ajax(a)
	},
	fromSphinxIds: function(a) {
		return function(b, c) {
			a.url = "/video/AjaxSphinxIdsToFeed";
			a.data = {
				ids: b
			};
			a.type = "POST";
			a.recommendationId = c;
			return da.feed.load(a)
		}
	},
	render: function(a) {
		return function(b) {
			b = a.tpl(b);
			a.target.append(b);
			return b
		}
	},
	jqtpl: function(a) {
		var b = $(a).template();
		return function(a) {
			return $.tmpl(b, a)
		}
	},
	fire: function(a, b) {
		return function(c) {
			c = a(c);
			da.on(b).fire(c);
			return c
		}
	},
	limit: {
		render: function(a, b) {
			var c = 0,
				d = function(d) {
					c != b && a(d) && c++
				};
			d.total = function() {
				return c
			};
			return d
		}
	},
	paging: function(a) {
		var b = [];
		for (key in a) b[key] = a[key];
		var c = 0,
			d = b.render;
		b.render = da.feed.limit.render(function(a) {
			c++;
			return d(a)
		}, b.displayCount || b.data.count);
		b.data.count += 1;
		b.success = function(a) {
			a.next = c < a.entries.length ? b.data.from + c : !1;
			b.ready(a)
		};
		return b
	}
};
jQuery.fn.da_feed = da.feed.jQuery;
da.feed.ids = function(a, b) {
	return function(c) {
		var d = b[0];
		c.offset = 0;
		c.slice = function(b) {
			for (var c = []; c.length < b;) if (id = this[this.offset++], id == void 0) break;
			else id != a.exclude && c.push(id);
			return c
		};
		a.url = "/video/AjaxSphinxIdsToFeed";
		var e = function() {
			a.ready();
			f += 1;
			void 0 != b[f] && a.data.ids.length > 0 ? a.more.show() : a.more.hide()
		};
		a.success = da.feed.ids.success(a, c, d, e);
		a.empty = a.success;
		var f = 0;
		a.more.click(function() {
			a.more.hide();
			if (a.target.hasClass("loading")) return !1;
			g(b[f]);
			return !1
		});
		var g = function(b) {
			a.target.addClass("loading");
			a.data.ids = c.slice(b);
			a.success = da.feed.ids.success(a, c, b, e);
			return da.feed.load(a)
		};
		g(b[0])
	}
};
da.feed.ids.success = function(a, b, c, d) {
	return function(e) {
		a.target.removeClass("loading");
		e && (c -= e.entries.length);
		if (c > 0 && (a.data.ids = b.slice(c), a.data.ids.length > 0)) return a.success = da.feed.ids.success(a, b, c, d), a.empty = a.success, da.feed.load(a);
		d()
	}
};
//public_html/js/compiled/filter.js
if (da == void 0) var da = [];
da.filter = function(a) {
	for (key in a) this[key] = a[key];
	a.selector && this.setSelector(a.selector);
	this.filters = [];
	this.ready = $.Callbacks()
};
da.filter.prototype.setSelector = function(a) {
	this.query = function() {
		return $(a)
	};
	return this
};
da.filter.prototype.add = function(a) {
	this.filters[this.filters.length] = a;
	a.callback.add(this.onchange())
};
da.filter.prototype.onchange = function() {
	var a = this;
	return function() {
		var b = 0;
		a.query().each(function() {
			a.check(this) ? (b++, a.show(this)) : a.hide(this)
		});
		a.ready.fire(b)
	}
};
da.filter.prototype.show = function(a) {
	a.style.display = "block"
};
da.filter.prototype.hide = function(a) {
	a.style.display = "none"
};
da.filter.ctor = function() {
	return function(a) {
		for (key in a) this[key] = a[key];
		a.selector && this.setSelector(a.selector);
		a.input && this.setInput(a.input);
		this.callback = $.Callbacks()
	}
};
da.filter.prototype.check = function(a) {
	for (var b = 0; b < this.filters.length; b++) if (!this.filters[b].check(a)) return !1;
	return !0
};
da.filter.query = function(a) {
	return function(b) {
		return $(b).find(a)
	}
};
da.filter.checked = da.filter.ctor();
da.filter.checked.prototype.setSelector = function(a) {
	var b = da.filter.query(a);
	this.query = function(a) {
		return b(a).attr("checked")
	};
	return this
};
da.filter.checked.prototype.setInput = function(a) {
	var b = this;
	b.filter = a.val();
	a.change(function() {
		b.filter = a.val();
		b.callback.fire(b.filter)
	});
	return this
};
da.filter.checked.prototype.check = function(a) {
	switch (this.filter) {
	case "all":
		return !0;
	case "checked":
		return this.query(a);
	case "unchecked":
		return !this.query(a)
	}
};
da.filter.title = da.filter.ctor();
da.filter.title.prototype.setSelector = function(a) {
	var b = da.filter.query(a);
	this.query = function(a) {
		return b(a).text()
	}
};
da.filter.title.prototype.setInput = function(a) {
	var b = this;
	b.setFilter(a.val());
	a.attr("autocomplete", "off");
	a.keyup(function() {
		b.setFilter(a.val());
		b.callback.fire(b.filter)
	});
	return this
};
da.filter.title.prototype.check = function(a) {
	if (!this.filter) return !0;
	return this.filter.test(this.query(a))
};
da.filter.title.prototype.setFilter = function(a) {
	this.filter = a ? String.translit_preg(a, "i") : null;
	return this
};
//public_html/js/compiled/string_translit.js
String.translitDict = {
	"А": "A",
	"а": "a",
	"Б": "B",
	"б": "b",
	"В": "V",
	"в": "v",
	"Г": "G",
	"г": "g",
	"Д": "D",
	"д": "d",
	"Е": "E",
	"е": "e",
	"Ё": "Yo",
	"ё": "yo",
	"Ж": "Zh",
	"ж": "zh",
	"З": "Z",
	"з": "z",
	"И": "I",
	"и": "i",
	"Й": "Y",
	"й": "y",
	"К": "K",
	"к": "k",
	"Л": "L",
	"л": "l",
	"М": "M",
	"м": "m",
	"Н": "N",
	"н": "n",
	"О": "O",
	"о": "o",
	"П": "P",
	"п": "p",
	"Р": "R",
	"р": "r",
	"С": "S",
	"с": "s",
	"Т": "T",
	"т": "t",
	"У": "U",
	"у": "u",
	"Ф": "F",
	"ф": "f",
	"Х": "Kh",
	"х": "kh",
	"Ц": "Ts",
	"ц": "ts",
	"Ч": "Ch",
	"ч": "ch",
	"Ш": "Sh",
	"ш": "sh",
	"Щ": "Sch",
	"щ": "sch",
	"Ъ": '"',
	"ъ": '"',
	"Ы": "Y",
	"ы": "y",
	"Ь": "'",
	"ь": "'",
	"Э": "E",
	"э": "e",
	"Ю": "Yu",
	"ю": "yu",
	"Я": "Ya",
	"я": "ya"
};
String.builDictReplace = function(b) {
	var a = "";
	for (key in b) a.length && (a += "|"), a += key;
	var c = RegExp(a, "g");
	return function(a) {
		return a.replace(c, function(a) {
			return a in b ? b[a] : ""
		})
	}
};
String.rdictreplace = function(b) {
	var a = {},
		c = [];
	for (ru in b) {
		var d = b[ru].length;
		a[d] == void 0 && (a[d] = [], c.push(d));
		a[d][b[ru]] || (a[d][b[ru]] = ru)
	}
	for (var c = c.sort(function(a, b) {
		return b - a
	}), e = [], b = 0; b < c.length; b++) e.push(String.builDictReplace(a[c[b]]));
	return function(a) {
		for (var b = 0; b < e.length; b++) a = e[b](a);
		return a
	}
};
String.translit = String.builDictReplace(String.translitDict);
String.prototype.translit = function() {
	return String.translit(this)
};
String.untranslit = String.rdictreplace(String.translitDict);
String.prototype.untranslit = function() {
	return String.untranslit(this)
};
String.translit_preg = function(b, a) {
	if (!b) return null;
	var c = {
		no: function(a) {
			return a
		},
		translit: String.translit,
		untranslit: String.untranslit
	},
		d = "";
	for (key in c) d.length && (d += "|"), d += c[key](b);
	return RegExp(d, a)
};
//public_html/js/compiled/string_name.js
var RussianNameProcessor = {
	sexM: "m",
	sexF: "f",
	gcaseIm: "nominative",
	gcaseNom: "nominative",
	gcaseRod: "genitive",
	gcaseGen: "genitive",
	gcaseDat: "dative",
	gcaseVin: "accusative",
	gcaseAcc: "accusative",
	gcaseTvor: "instrumentative",
	gcaseIns: "instrumentative",
	gcasePred: "prepositional",
	gcasePos: "prepositional",
	rules: {
		lastName: {
			exceptions: ["\tдюма,тома,дега,люка,ферма,гамарра,петипа,шандра . . . . .", "\tгусь,ремень,камень,онук,богода,нечипас,долгопалец,маненок,рева,кива . . . . .", "\tвий,сой,цой,хой -я -ю -я -ем -е"],
			suffixes: ["f\tб,в,г,д,ж,з,й,к,л,м,н,п,р,с,т,ф,х,ц,ч,ш,щ,ъ,ь . . . . .", "f\tска,цка  -ой -ой -ую -ой -ой", "f\tая       --ой --ой --ую --ой --ой", "\tская     --ой --ой --ую --ой --ой", "f\tна       -ой -ой -у -ой -ой", "\tиной -я -ю -я -ем -е", "\tуй   -я -ю -я -ем -е", "\tца   -ы -е -у -ей -е", "\tрих  а у а ом е", "\tия                      . . . . .", "\tиа,аа,оа,уа,ыа,еа,юа,эа . . . . .", "\tих,ых                   . . . . .", "\tо,е,э,и,ы,у,ю           . . . . .", "\tова,ева            -ой -ой -у -ой -ой", "\tга,ка,ха,ча,ща,жа  -и -е -у -ой -е", "\tца  -и -е -у -ей -е", "\tа   -ы -е -у -ой -е", "\tь   -я -ю -я -ем -е", "\tия  -и -и -ю -ей -и", "\tя   -и -е -ю -ей -е", "\tей  -я -ю -я -ем -е", "\tян,ан,йн   а у а ом е", "\tынец,обец  --ца --цу --ца --цем --це", "\tонец,овец  --ца --цу --ца --цом --це", "\tц,ч,ш,щ   а у а ем е", "\tай  -я -ю -я -ем -е", "\tгой,кой  -го -му -го --им -м", "\tой  -го -му -го --ым -м", "\tах,ив   а у а ом е", "\tший,щий,жий,ний  --его --ему --его -м --ем", "\tкий,ый   --ого --ому --ого -м --ом", "\tий       -я -ю -я -ем -и", "\tок  --ка --ку --ка --ком --ке", "\tец  --ца --цу --ца --цом --це", "\tв,н   а у а ым е", "\tб,г,д,ж,з,к,л,м,п,р,с,т,ф,х   а у а ом е"]
		},
		firstName: {
			exceptions: ["\tлев    --ьва --ьву --ьва --ьвом --ьве", "\tпавел  --ла  --лу  --ла  --лом  --ле", "m\tшота   . . . . .", "f\tрашель,нинель,николь,габриэль,даниэль   . . . . ."],
			suffixes: ["\tе,ё,и,о,у,ы,э,ю   . . . . .", "f\tб,в,г,д,ж,з,й,к,л,м,н,п,р,с,т,ф,х,ц,ч,ш,щ,ъ   . . . . .", "f\tь   -и -и . ю -и", "m\tь   -я -ю -я -ем -е", "\tга,ка,ха,ча,ща,жа  -и -е -у -ой -е", "\tа   -ы -е -у -ой -е", "\tия  -и -и -ю -ей -и", "\tя   -и -е -ю -ей -е", "\tей  -я -ю -я -ем -е", "\tий  -я -ю -я -ем -и", "\tй   -я -ю -я -ем -е", "\tб,в,г,д,ж,з,к,л,м,н,п,р,с,т,ф,х,ц,ч\t а у а ом е"]
		},
		middleName: {
			suffixes: ["\tич   а  у  а  ем  е", "\tна  -ы -е -у -ой -е"]
		}
	},
	initialized: !1,
	init: function() {
		if (!this.initialized) this.prepareRules(), this.initialized = !0
	},
	prepareRules: function() {
		for (var a in this.rules) for (var c in this.rules[a]) for (var b = 0, d = this.rules[a][c].length; b < d; b++) this.rules[a][c][b] =
		this.rule(this.rules[a][c][b])
	},
	rule: function(a) {
		if (a = a.match(/^\s*([fm]?)\s*(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*$/)) return {
			sex: a[1],
			test: a[2].split(","),
			mods: [a[3], a[4], a[5], a[6], a[7]]
		};
		return !1
	},
	word: function(a, c, b, d) {
		if (d == this.gcaseNom) return a;
		if (a.match(/[-]/)) {
			for (var a = a.split("-"), e = 0, f = a.length; e < f; e++) a[e] = this.word(a[e], c, b, d);
			return a.join("-")
		}
		if (a.match(/^[А-ЯЁ]\.?$/i)) return a;
		this.init();
		b = this.rules[b];
		if (b.exceptions && (e = this.pick(a, c, d, b.exceptions, !0))) return e;
		return (e =
		this.pick(a, c, d, b.suffixes, !1)) || a
	},
	pick: function(a, c, b, d, e) {
		wordLower = a.toLowerCase();
		for (var f = 0, g = d.length; f < g; f++) if (this.ruleMatch(wordLower, c, d[f], e)) return this.applyMod(a, b, d[f]);
		return !1
	},
	ruleMatch: function(a, c, b, d) {
		if (b.sex == this.sexM && c == this.sexF) return !1;
		if (b.sex == this.sexF && c != this.sexF) return !1;
		for (var c = 0, e = b.test.length; c < e; c++) if ((d ? a : a.substr(Math.max(a.length - b.test[c].length, 0))) == b.test[c]) return !0;
		return !1
	},
	applyMod: function(a, c, b) {
		switch (c) {
		case this.gcaseNom:
			c = ".";
			break;
		case this.gcaseGen:
			c =
			b.mods[0];
			break;
		case this.gcaseDat:
			c = b.mods[1];
			break;
		case this.gcaseAcc:
			c = b.mods[2];
			break;
		case this.gcaseIns:
			c = b.mods[3];
			break;
		case this.gcasePos:
			c = b.mods[4];
			break;
		default:
			throw "Unknown grammatic case: " + c;
		}
		for (var b = 0, d = c.length; b < d; b++) {
			var e = c.substr(b, 1);
			switch (e) {
			case ".":
				break;
			case "-":
				a = a.substr(0, a.length - 1);
				break;
			default:
				a += e
			}
		}
		return a
	}
},
	RussianName = function(a, c, b, d) {
		if (typeof c == "undefined") {
			b = a.match(/^\s*(\S+)(\s+(\S+)(\s+(\S+))?)?\s*$/);
			if (!b) throw "Cannot parse supplied name";
			b[5] && b[3].match(/(ич|на)$/) && !b[5].match(/(ич|на)$/) ? (a = b[5], c = b[1], b = b[3], this.fullNameSurnameLast = !0) : (a = b[1], c = b[3], b = b[5])
		}
		this.ln = a;
		this.fn = c || "";
		this.mn = b || "";
		this.sex = d || this.getSex()
	};
RussianName.prototype = {
	sexM: RussianNameProcessor.sexM,
	sexF: RussianNameProcessor.sexF,
	gcaseIm: RussianNameProcessor.gcaseIm,
	gcaseNom: RussianNameProcessor.gcaseNom,
	gcaseRod: RussianNameProcessor.gcaseRod,
	gcaseGen: RussianNameProcessor.gcaseGen,
	gcaseDat: RussianNameProcessor.gcaseDat,
	gcaseVin: RussianNameProcessor.gcaseVin,
	gcaseAcc: RussianNameProcessor.gcaseAcc,
	gcaseTvor: RussianNameProcessor.gcaseTvor,
	gcaseIns: RussianNameProcessor.gcaseIns,
	gcasePred: RussianNameProcessor.gcasePred,
	gcasePos: RussianNameProcessor.gcasePos,
	fullNameSurnameLast: !1,
	ln: "",
	fn: "",
	mn: "",
	sex: "",
	getSex: function() {
		if (this.mn.length > 2) switch (this.mn.substr(this.mn.length - 2)) {
		case "ич":
			return this.sexM;
		case "на":
			return this.sexF
		}
		return ""
	},
	fullName: function(a) {
		return ((this.fullNameSurnameLast ? "" : this.lastName(a) + " ") + this.firstName(a) + " " + this.middleName(a) + (this.fullNameSurnameLast ? " " + this.lastName(a) : "")).replace(/^ +| +$/g, "")
	},
	lastName: function(a) {
		return RussianNameProcessor.word(this.ln, this.sex, "lastName", a)
	},
	firstName: function(a) {
		return RussianNameProcessor.word(this.fn, this.sex, "firstName", a)
	},
	middleName: function(a) {
		return RussianNameProcessor.word(this.mn, this.sex, "middleName", a)
	}
};
//public_html/js/compiled/auhtorize.js
window.da_settings = {};
var daAuth = {
	initSettings: function() {
		this.div_name = window.da_settings.div_name;
		this.VK_app_id = window.da_settings.VK_app_id;
		this.MAILRU_app_id = window.da_settings.MAILRU_app_id;
		this.MAILRU_secret = window.da_settings.MAILRU_secret;
		this.FB_app_id = window.da_settings.FB_app_id;
		this.host = window.da_settings.host;
		this.fcallback = window.da_settings.callback;
		this.hcallback = window.da_settings.hashcallback;
		this.authCallback = this.fcallback;
		this.nocookie = !1;
		obj = this;
		if (/^(https|http)\:\/\/www\.facebook\.com\//.test(document.referrer)) {
			if (!/redirect/.test(window.location.search)) {
				var a = document.location.pathname;
				window.location.search.length && (a += "?" + window.location.search);
				a += document.location.hash;
				a = daAuth.urlEncode("http://" + document.location.host + "/auth/with/-/facebook/?redirect=" + daAuth.urlEncode(a));
				document.location.href = "https://www.facebook.com/dialog/oauth?client_id=" + window.da_settings.FB_app_id + "&scope=publish_stream, email, user_birthday, publish_actions, read_friendlists, manage_friendlists, friends_online_presence&redirect_uri=" + a
			}
		} else if (/^https?:\/\/vk\.com\//.test(document.referrer) && !/redirect/.test(window.location.search)) a =
		document.location.pathname, window.location.search.length && (a += "?" + window.location.search), a += document.location.hash, a = daAuth.urlEncode("http://" + document.location.host + "/auth/with/-/vkontakte/?redirect=" + daAuth.urlEncode(a)), document.location.href = "https://oauth.vk.com/authorize?client_id=" + window.da_settings.VK_app_id + "&scope=photos,offline,video&redirect_uri=" + a;
		da.on("user_auth").add(function(a) {
			if (a.error) return da.on("user_auth_fault").fire(a);
			a.strategy == "User\\Login\\Merge" ? daAuth.mergeIt(a) : daAuth.authCallback()
		});
		$(document.body).append($('<div id="' + this.div_name + '"></div>'));
		$(document.body).append($('<div id="fb-root"></div>'));
		this.dynLoadJs("http://connect.facebook.net/ru_RU/all.js", this.div_name);
		window.fbAsyncInit = function() {
			FB.init({
				appId: obj.FB_app_id,
				status: !0,
				cookie: !0,
				xfbml: !0
			});
			window.fbApiInit = !0
		}
	},
	auth: function(a, c, b) {
		c = c || !1;
		b = b || !1;
		if (c) document.location.hash = c;
		daAuth.authCallback = typeof b == "function" ? b : daAuth.fcallback;
		a == "ivi" ? obj.show_popup_ivi() : $.popupWindow("/auth/with/-/" + a + "/", {
			name: "user_auth",
			width: 847,
			height: 431
		})
	},
	authAndShare: function(a) {
		daAuth.auth(a, "", function() {
			Social.shareOnSocialClick(a)
		})
	},
	dynLoadJs: function(a, c) {
		if (document.getElementById(c)) {
			var b = document.createElement("script");
			b.type = "text/javascript";
			b.charset = "windows-1251";
			b.src = a;
			b.async = !0;
			document.getElementById(c).appendChild(b)
		}
	},
	dynLoadJsCallback: function(a, c) {
		$.getScript(a, function() {
			c()
		})
	},
	popup: function(a, c, b) {
		$.popupWindow(a, {
			height: 431,
			width: 847,
			toolbar: !1,
			scrollbars: !1,
			status: !1,
			resizable: !0,
			center: !0,
			createNew: !1,
			location: !1,
			menubar: !1,
			onUnload: function() {
				c !== void 0 && c()
			},
			name: b
		})
	},
	show_popup_ivi: function() {
		var a = null,
			c = null,
			b = "/auth/ivi/";
		obj.nocookie && (b += "?nocookie=1");
		var d = window.open(b, null, "width=450, height=390, menubar=no, location=no, resizable=yes, scrollbars=yes, status=no, titlebar=no"),
			a = window.setInterval(function() {
				try {
					c = d.location.hash.substring(1).split("="), c = c[1], d && d.location && c && (typeof obj.hcallback == "function" && obj.nocookie ? obj.hcallback(c) : obj.authCallback(), a && window.clearTimeout(a), d.close())
				} catch (b) {}
			}, 1E3);
		window.setTimeout(function() {
			a && window.clearTimeout(a)
		}, 6E4);
		return !1
	},
	update_userinfo: function(a, c, b) {
		adata = {
			uid: a,
			asession: c,
			ref: this.getProject(),
			nocookie: obj.nocookie,
			type: b
		};
		$.ajax({
			dataType: "json",
			url: "/auth/with/-/" + b + "/",
			data: adata,
			success: function(a) {
				typeof obj.hcallback == "function" && obj.nocookie ? obj.hcallback(a.session) : obj.authCallback();
				obj.nocookie = !1
			}
		})
	},
	urlEncode: function(a) {
		return encodeURIComponent(a).replace(/\%20/g, "+").replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/\~/g, "%7E")
	},
	getProject: function() {
		if (/music/.test(document.referrer)) return "music";
		return "ivi"
	},
	ensureFbInit: function(a) {
		window.fbApiInit ? a && a() : setTimeout(function() {
			daAuth.ensureFbInit(a)
		}, 50)
	},
	mergeIt: function() {
		$.ajax({
			url: "/auth/merge/",
			data: {
				ajax: 1
			},
			dataType: "json",
			success: function(a) {
				daAuth.mergeConfirm({
					data: a,
					confirm: a.status == "conflict" ?
					function() {
						document.location.href = "/auth/merge/"
					} : function() {
						$.ajax({
							url: "/auth/merge/",
							data: {
								ajax: 1,
								confirm: 1
							},
							dataType: "json",
							success: function(a) {
								a.status == "complete" ? daAuth.mergeSuccess({
									data: a,
									close: daAuth.authCallback
								}) : document.location.href = "/auth/merge/"
							}
						})
					}
				})
			}
		})
	},
	mergeConfirm: function(a) {
		loadModal("merge_social_notice").done(function(c) {
			var b = $(c);
			b.jqm();
			$("#merge_details").html(a.data.details);
			b.find(".confirm").click(function() {
				a.confirm();
				b.jqmHide()
			});
			b.find(".cancel").click(function() {
				b.jqmHide()
			});
			b.jqmShow()
		})
	},
	mergeSuccess: function(a) {
		loadModal("merge_social_done").done(function(c) {
			var b =
			$(c);
			b.jqm();
			c = b.find(".message");
			c.html(c.html().replace("${user}", a.data.src.displayName));
			b.find(".close").click(function() {
				b.jqmHide();
				a.close()
			});
			b.jqmShow()
		})
	},
	fillPasswordForm: null,
	displayFillPasswordForm: function(a, c) {
		loadModal("auth_fill_password").done(function(b) {
			var d = $(b),
				e = {
					message: {
						2: "Указан некорректный email",
						3: "Пользователь с таким email уже существует",
						4: "Указан некорректный пароль"
					},
					show: function(a) {
						e.message[a.code] ? alert(e.message[a.code]) : alert(a.message);
						return !1
					},
					clear: function() {},
					InvalidEmail: 2,
					InvalidPassword: 4
				};
			d.find(".cancel").click(function() {
				d.jqmHide()
			});
			var f = d.find('input[name="email"]'),
				j = RegExp(REGEXP_EMAIL_BODY),
				g = $('input[name="password"]');
			$(g.data("show")).change(function() {
				g[0].type = this.checked ? "text" : "password"
			});
			var h = d.find("form"),
				i = !1;
			f.change(function() {
				i = !0
			});
			h.submit(function() {
				var a = {
					email: f.val(),
					password: g.val()
				};
				if (!j.test(a.email)) return e.show({
					code: e.InvalidEmail
				});
				if (!a.password.length) return e.show({
					code: e.InvalidPassword
				});
				a = {
					url: h.attr("action"),
					type: "POST",
					data: a,
					dataType: "json",
					success: function(a) {
						if (a.error) return e.show(a.error);
						else d.hide(), d.success(a)
					}
				};
				$.ajax(a);
				return !1
			});
			var k = d.find(".social-plate");
			d.display = function(a, b) {
				i || f.val($('#edit_profile input[name="email"]').val());
				e.clear();
				k.hide();
				d.find("." + b).show();
				d.jqmShow();
				d.success = a
			};
			d.jqm();
			d.display(a, c)
		});
		return !1
	},
	clearClientAuth: function() {
		this.clearAuthCookie();
		this.clearAuthFlag()
	},
	clearAuthFlag: function() {
		$(document.body).data("auth", 0)
	},
	clearAuthCookie: function() {
		eraseCookie(window.da_settings.authCookieName)
	}
};
//public_html/js/compiled/ivi.settings.js
window.da_settings.div_name = "js_loader";
window.da_settings.authCookieName = "sessivi";
window.da_settings.VK_app_id = "1955190";
window.da_settings.VK_access = {
	MESSAGES: 1,
	FRIENDS: 2,
	PHOTOS: 4,
	AUDIO: 8,
	VIDEO: 16,
	MATCHES: 32,
	QUESTIONS: 64,
	WIKI: 128,
	APP_LINKS: 256,
	APP_WALL_LINKS: 512,
	STATUS: 1024,
	NOTIFY: 2048,
	EXTENDED_MESSAGES: 4096,
	WALL: 8192
};
window.da_settings.VK_def_access = window.da_settings.VK_access.FRIENDS | window.da_settings.VK_access.AUDIO | window.da_settings.VK_access.VIDEO | window.da_settings.VK_access.PHOTOS | window.da_settings.VK_access.NOTIFY | window.da_settings.VK_access.STATUS | window.da_settings.VK_access.WALL;
window.da_settings.MAILRU_app_id = "536908";
window.da_settings.MAILRU_secret = "9183d01a732a7b586c6eb591165f0c62";
window.da_settings.FB_app_id = "135045099875158";
window.da_settings.host = "http://ivi.333.kg/";
window.da_settings.GRAVITY_merchant = "iviru";
window.da_settings.gravity = {
	page_view_timeout: 20
};
window.da_settings.OK_app_id = "";
window.da_settings.callback = function() {
	var a = window.location.pathname;
	if (window.location.search.length) {
		var c = window.location.search.substr(1).split("&"),
			d = c.length,
			e = /^rnd\=/;
		a += "?";
		for (var b = 0; b < d; b++) e.test(c[b]) || (a += c[b] + "&")
	} else a += "?";
	a += "rnd=" + (new Date).getTime();
	a += document.location.hash;
	document.location.href = a
};
window.da_settings.hashcallback = mergeAccount;
window.da_settings.kinohod_apikey = "cc7cc160-c031-3424-ad52-9c5c478f6b68";
window.da_settings.uppod = {
	uid: "SimpleVideoPlayer",
	style: "http://www.ivi.ru/pages/uppod/player/st/video163-474.txt",
	src: "http://www.ivi.ru/pages/uppod/player/uppod.swf",
	seporator: "*"
};
//public_html/js/compiled/lawnchair.js
var Lawnchair = function() {
	if (!JSON) throw "JSON unavailable! Include http://www.json.org/json2.js to fix.";
	if (arguments.length <= 2 && arguments.length > 0) var callback = typeof arguments[0] === "function" ? arguments[0] : arguments[1],
		options = typeof arguments[0] === "function" ? {} : arguments[0];
	else
	throw "Incorrect # of ctor args!";
	if (typeof callback !== "function") throw "No callback was provided";
	var self = !(this instanceof Lawnchair) ? new Lawnchair(options, callback) : this;
	self.record = options.record || "record";
	self.name = options.name || "records";
	var adapter;
	if (options.adapter) {
		adapter = Lawnchair.adapters[self.indexOf(Lawnchair.adapters, options.adapter)];
		adapter = adapter.valid() ? adapter : undefined
	} else
	for (var i = 0, l = Lawnchair.adapters.length; i < l; i++) {
		adapter = Lawnchair.adapters[i].valid() ? Lawnchair.adapters[i] : undefined;
		if (adapter) break
	}
	if (!adapter) throw "No valid adapter.";
	for (var j in adapter) self[j] = adapter[j];
	for (var i = 0, l = Lawnchair.plugins.length; i < l; i++) Lawnchair.plugins[i].call(self);
	self.init(options, callback);
	return self
};
Lawnchair.adapters = [];
Lawnchair.adapter = function(id, obj) {
	obj["adapter"] = id;
	var implementing = "adapter valid init keys save batch get exists all remove nuke".split(" "),
		indexOf = this.prototype.indexOf;
	for (var i in obj) if (indexOf(implementing, i) === -1) throw "Invalid adapter! Nonstandard method: " + i;
	Lawnchair.adapters.push(obj)
};
Lawnchair.plugins = [];
Lawnchair.plugin = function(obj) {
	for (var i in obj) i === "init" ? Lawnchair.plugins.push(obj[i]) : this.prototype[i] = obj[i]
};
Lawnchair.prototype = {
	isArray: Array.isArray ||
	function(o) {
		return Object.prototype.toString.call(o) === "[object Array]"
	},
	indexOf: function(ary, item, i, l) {
		if (ary.indexOf) return ary.indexOf(item);
		for (i = 0, l = ary.length; i < l; i++) if (ary[i] === item) return i;
		return -1
	},
	lambda: function(callback) {
		return this.fn(this.record, callback)
	},
	fn: function(name, callback) {
		return typeof callback == "string" ? new Function(name, callback) : callback
	},
	uuid: function() {
		var S4 = function() {
			return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
		};
		return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
	},
	each: function(callback) {
		var cb = this.lambda(callback);
		if (this.__results) for (var i = 0, l = this.__results.length; i < l; i++) cb.call(this, this.__results[i], i);
		else this.all(function(r) {
			for (var i = 0, l = r.length; i < l; i++) cb.call(this, r[i], i)
		});
		return this
	}
};
//public_html/js/compiled/dom.js
Lawnchair.adapter("dom", function() {
	var storage = window.localStorage;
	var indexer = function(name) {
		return {
			key: name + "._index_",
			all: function() {
				var a = JSON.parse(storage.getItem(this.key));
				if (a === null) storage.setItem(this.key, JSON.stringify([]));
				return JSON.parse(storage.getItem(this.key))
			},
			add: function(key) {
				var a = this.all();
				a.push(key);
				storage.setItem(this.key, JSON.stringify(a))
			},
			del: function(key) {
				var a = this.all(),
					r = [];
				for (var i = 0, l = a.length; i < l; i++) if (a[i] != key) r.push(a[i]);
				storage.setItem(this.key, JSON.stringify(r))
			},
			find: function(key) {
				var a = this.all();
				for (var i = 0, l = a.length; i < l; i++) if (key === a[i]) return i;
				return false
			}
		}
	};
	return {
		valid: function() {
			return !!storage
		},
		init: function(options, callback) {
			this.indexer = indexer(this.name);
			if (callback) this.fn(this.name, callback).call(this, this)
		},
		save: function(obj, callback) {
			var key = obj.key ? this.name + "." + obj.key : this.name + "." + this.uuid();
			if (this.indexer.find(key) === false) this.indexer.add(key);
			delete obj.key;
			storage.setItem(key, JSON.stringify(obj));
			obj.key = key.slice(this.name.length + 1);
			if (callback) this.lambda(callback).call(this, obj);
			return this
		},
		batch: function(ary, callback) {
			var saved = [];
			for (var i = 0, l = ary.length; i < l; i++) this.save(ary[i], function(r) {
				saved.push(r)
			});
			if (callback) this.lambda(callback).call(this, saved);
			return this
		},
		keys: function(callback) {
			if (callback) {
				var name = this.name,
					keys = this.indexer.all().map(function(r) {
						return r.replace(name + ".", "")
					});
				this.fn("keys", callback).call(this, keys)
			}
			return this
		},
		get: function(key, callback) {
			if (this.isArray(key)) {
				var r = [];
				for (var i = 0, l = key.length; i < l; i++) {
					var k = this.name + "." + key[i],
						obj = JSON.parse(storage.getItem(k));
					if (obj) {
						obj.key = key[i];
						r.push(obj)
					}
				}
				if (callback) this.lambda(callback).call(this, r)
			} else {
				var k = this.name + "." + key,
					obj = JSON.parse(storage.getItem(k));
				if (obj) obj.key = key;
				if (callback) this.lambda(callback).call(this, obj)
			}
			return this
		},
		all: function(callback) {
			var idx = this.indexer.all(),
				r = [],
				o, k;
			for (var i = 0, l = idx.length; i < l; i++) {
				k = idx[i];
				o = JSON.parse(storage.getItem(k));
				o.key = k.replace(this.name + ".", "");
				r.push(o)
			}
			if (callback) this.fn(this.name, callback).call(this, r);
			return this
		},
		remove: function(keyOrObj, callback) {
			var key = this.name + "." + (keyOrObj.key ? keyOrObj.key : keyOrObj);
			this.indexer.del(key);
			storage.removeItem(key);
			if (callback) this.lambda(callback).call(this);
			return this
		},
		nuke: function(callback) {
			this.all(function(r) {
				for (var i = 0, l = r.length; i < l; i++) this.remove(r[i]);
				if (callback) this.lambda(callback).call(this)
			});
			return this
		}
	}
}());
//public_html/js/compiled/ie-userdata.js
Lawnchair.adapter("ie-userdata", {
	valid: function() {
		return typeof document.body.addBehavior != "undefined"
	},
	init: function(options, callback) {
		var s = document.createElement("span");
		s.style.behavior = "url('#default#userData')";
		s.style.position = "absolute";
		s.style.left = 1E4;
		document.body.appendChild(s);
		this.storage = s;
		this.storage.load("lawnchair");
		this.fn(this.name, callback).call(this, this)
	},
	get: function(key, callback) {
		var obj = JSON.parse(this.storage.getAttribute(key) || "null");
		if (obj) obj.key = key;
		if (callback) this.lambda(callback).call(this, obj);
		return this
	},
	save: function(obj, callback) {
		var id = obj.key || "lc" + this.uuid();
		delete obj.key;
		this.storage.setAttribute(id, JSON.stringify(obj));
		this.storage.save("lawnchair");
		obj.key = id;
		if (callback) this.lambda(callback).call(this, obj);
		return this
	},
	all: function(callback) {
		var ca = this.storage.XMLDocument.firstChild.attributes;
		var yar = [];
		var v, o;
		for (var i = 0, l = ca.length; i < l; i++) {
			v = ca[i];
			o = JSON.parse(v.nodeValue || "null");
			if (o) {
				o.key = v.nodeName;
				yar.push(o)
			}
		}
		if (callback) this.fn(this.name, callback).call(this, yar);
		return this
	},
	remove: function(keyOrObj, callback) {
		var key = typeof keyOrObj == "string" ? keyOrObj : keyOrObj.key;
		this.storage.removeAttribute(key);
		this.storage.save("lawnchair");
		if (callback) this.lambda(callback).call(this);
		return this
	},
	nuke: function(callback) {
		var that = this;
		this.all(function(r) {
			for (var i = 0, l = r.length; i < l; i++) if (r[i].key) that.remove(r[i].key);
			if (callback) that.lambda(callback).call(that)
		});
		return this
	}
});
//public_html/js/compiled/comments.js
var Comments = {
	parentId: null,
	objectId: null,
	objectType: null,
	formCopy: null,
	init: function() {
		var a = $(".comments-block");
		if (a.length) this.objectId = a.attr("data-id"), this.objectType = parseInt(a.attr("data-type")), a = $(".wrap-comment-form").eq(0), a.find('[data-slot="support_text"]').replaceWith('<p>Если у вас возникли технические проблемы, посмотрите <a href="http://ask.ivi.ru/knowledgebase" target="_blank">часто задаваемые вопросы</a> или напишите в нашу <a href="http://ask.ivi.ru/" target="_blank">службу поддержки</a>.</p>'), this.formCopy = a.clone(), Comments.initAddFormHanlers(), Comments.initCommentsHandlers()
	},
	countUp: function() {
		if ($(".comments-count").length > 0) {
			var a = $.trim($("#comments-count-tab").html()),
				a = parseInt(a);
			isNaN(a) && (a = 0);
			a += 1;
			$(".comments-count").html(a)
		}
		$("#reviewstab").length > 0 && $("#commentstab").click(function() {
			$("#reviews-cont").hide();
			$("#reviewstab").removeClass("active");
			$("#comments-cont").show();
			$("#commentstab").addClass("active")
		})
	},
	initAddFormHanlers: function() {
		$("#add-comment-form-title").focus(function() {
			var a =
			$(this).parents(".wrap-form");
			a.hasClass("expanded") || (a.addClass("expanded"), $(this).autoResize({
				extraSpace: 0
			}), $(this).val(""), $(this).html(""))
		});
		$(".wrap-comment-form .add-form .add").click(function(a) {
			a.preventDefault();
			$("#comment-error-message").html("");
			if (isLoggedIn() === !1) openModal("auth");
			else if (a = $("#add-comment-form-title").val(), a = $.trim(a), a.length < 10) $("#comment-error-message").html("Комментарий должен быть не менее 10 символов");
			else if (a.length > 700) $("#comment-error-message").html("Комментарий должен быть не более 700 символов");
			else {
				var b = null;
				if (Comments.parentId !== null) b = Comments.parentId;
				$(".wrap-comment-form .add-form .add").attr("disabled", "true");
				a = {
					text: a,
					object_id: Comments.objectId,
					object_type: Comments.objectType
				};
				if (b !== null) a.parent_id = b;
				$.post("/comments/ajax/add", a, function(a) {
					$(".wrap-comment-form .add-form .add").removeAttr("disabled");
					if (typeof a.error == "undefined") {
						var c = null,
							d = gravity.getItemType({
								comment: Comments.objectType
							});
						recommendation.actionComment(Comments.objectId, d);
						b !== null ? ($(".wrap-comment-form").hide(), c = $("#comment" + b), $("ul.ch" + b, c).length === 0 ? (a = '<ul class="childs ch' + b + ' comments-list">' + a.html + "</ul>", $(c).append(a)) : $("ul.ch" + b, c).append(a.html), c = $("ul.ch" + b + " li").last(), $("#add-comment-form-title").val(""), $(".wrap-comment-form").remove()) : ($("#add-comment-form-title").val(""), $(".comments-block ul.root").prepend(a.html));
						Comments.countUp();
						Comments.initCommentsHandlers();
						$("#add-comment-form-title").val("");
						$("#add-comment-form-title").html("");
						c && $("html, body").animate({
							scrollTop: c.offset().top - 70
						}, 0);
						Comments.parentId = null;
						Comments.placeCommentForm($("#main-comment-form-placer"))
					} else a.error_code == "no_user_email" ? openModal("comment_no_email") : a.error_code == "unconfirmed_user_email" ? ($("#comment-user-email").html(a.email), openModal("comment_confirm_email")) : $("#comment-error-message").html(a.error)
				}, "json")
			}
		});
		$(".wrap-comment-form  .add-form .cancel").click(function(a) {
			Comments.parentId = null;
			$("#comment-error-message").html("");
			if ($(this).parents(".comments-list").length) {
				var b = $("#main-comment-form-placer");
				Comments.placeCommentForm(b)
			} else $(".wrap-comment-form .wrap-form").hasClass("expanded") && ($(".wrap-comment-form .wrap-form").removeClass("expanded").find("textarea:first").remove(), b = $(".wrap-comment-form .wrap-form").find("textarea"), b.val(b.attr("data-deftext")));
			$("#add-comment-form-title").offset() != null && $("html, body").animate({
				scrollTop: $("#add-comment-form-title").offset().top - 70
			}, 0);
			a.preventDefault()
		})
	},
	initCommentsHandlers: function() {
		$(".comments-block  .user_action  .button-reply").click(function(a) {
			if (isLoggedIn() === !1) return openModal("auth"), a.preventDefault(), !1;
			Comments.parentId = $(this).parent().attr("data-comment-id");
			$(".wrap-comment-form").remove();
			Comments.placeCommentForm($(this).parent().parent());
			$(".wrap-comment-form .add-form textarea").focus();
			return !1
		});
		$(".comments-block  .minus-vote,.plus-vote").click(function(a) {
			if (isLoggedIn() === !1) return openModal("auth"), a.preventDefault(), !1;
			var b = $(this).parent().attr("data-comment-id"),
				e = $(this).hasClass("minus-vote") ? -1 : 1,
				c = $("#likes" + b).text(),
				d = c < 0 ? "negative" : c > 0 ? "positive" : "neutral";
			$.post("/comments/ajax/like", {
				id: b,
				direction: e
			}, function(a) {
				if (typeof a.error == "undefined") {
					var a = parseInt(a.count, 10),
						c = a < 0 ? "negative" : a > 0 ? "positive" : "neutral";
					$("#comment" + b).addClass("voted");
					d != c ? $("#likes" + b).text(a).addClass(c + "-comment").removeClass(d + "-comment") : $("#likes" + b).text(a)
				}
			}, "json");
			a.preventDefault();
			return !1
		})
	},
	placeCommentForm: function(a) {
		$(".wrap-comment-form").remove();
		$(Comments.formCopy).insertAfter(a);
		$("#add-comment-form-title").val("");
		$("#add-comment-form-title").html("");
		$("#comment-error-message").html("");
		$.browser.msie && $.browser.version <= 9 && ($(".wrap-comment-form").find(".cancel").replaceWith($(".wrap-comment-form").find(".cancel").clone(!1)).end().find(".add").replaceWith($(".wrap-comment-form").find(".add").clone(!1)), $.browser.version <= 8 && $(".wrap-comment-form").find(".action-button-wrapper button").removeClass("hover").hover(function() {
			$(this).toggleClass("hover")
		}));
		Comments.initAddFormHanlers();
		$(".wrap-comment-form").show()
	}
};
//public_html/js/compiled/jquery.ivi.moviePopup.js
(function(a) {
	if (!a.ivi) a.ivi = {};
	a.ivi.moviePopup = function(b, j, k) {
		var c = this;
		c.$el = a(b);
		c.el = b;
		c.clickFunc = function(c) {
			f(c);
			var d = null,
				b = null;
			a(this).attr("data-id") ? (d = a(this).attr("data-id"), b = "content") : (d = a(this).attr("data-compilation"), b = "compilation");
			var g = a(this).hasClass("subscribe"),
				i = g ? a("a.fav", a(this).parent()) : a("a.subscribe", a(this).parent()),
				e = this;
			Favorites.addFavorite(d, b, function(c) {
				typeof c.error === "undefined" && (g ? (c.subscribed == 1 ? (a(e).addClass("active"), a(i).addClass("active").text(c.text)) : a(e).removeClass("active"), a(e).text(c.subscribe_text)) : (c.status > 0 ? a(e).addClass("active") : (a(i).removeClass("active").text(c.subscribe_text), a(e).removeClass("active")), a(e).text(c.text)))
			}, g, a(e).parent());
			c.preventDefault()
		};
		c.init = function() {
			var h = this.$el.find(".image");
			c.params = a.extend({}, a.ivi.moviePopup.defaultParams, j);
			c.options = a.extend({}, a.ivi.moviePopup.defaultOptions, k);
			if (c.params.carouselMode === !1) a(b).on("click", "a.button-favorite", c.clickFunc);
			this.$el.find(".button-view").live("click", function(a) {
				f(a);
				return !0
			});
			h.length ? h.mouseenter(function(d) {
				f(d);
				var h = a(b).width(),
					g = a(window).width(),
					i = a(b).offset().left;
				c.params.enableReverse === !0 && (g - (h + i) < 424 ? a(".xinfo", b).addClass("reverse") : a(".xinfo", b).removeClass("reverse"));
				c.params.carouselMode && c.expandInfoMouseover(d);
				d.stopPropagation()
			}).mouseleave(function(a) {
				a.stopPropagation()
			}) : this.$el.mouseenter(function(a) {
				f(a)
			})
		};
		c.expandInfoMouseover = function(b) {
			var d = a(b.target).parents("ul"),
				d = a(d).data("jcarousel");
			item_elem = a(b.target).parents("li");
			link_elem = a(item_elem).find(".image");
			parent_elem = a(b.target).parents(".films-gallery-scroller-inner, .video-list-scroller-inner");
			pos_left = a(item_elem).offset().left - a(parent_elem).offset().left;
			pos_top = parent_elem.position().top;
			shadow_width = a(link_elem).width() + "px";
			shadow_height = a(link_elem).height() + "px";
			pos_left_shadow = (old_carousel_mode = parent_elem.hasClass("video-list-scroller-inner")) ? pos_left + 26 : pos_left;
			shadow_elem = a("<div></div>").css({
				position: "absolute",
				left: pos_left_shadow + "px",
				top: pos_top + "px",
				width: shadow_width,
				height: shadow_height,
				overflow: "visible"
			});
			clink_elem = link_elem.clone();
			clink_elem.css({
				display: "block",
				width: shadow_width,
				height: shadow_height
			});
			a(link_elem).attr("attr-id");
			(b = a(link_elem).attr("attr-extra-id")) || (b = "");
			b = a(link_elem).children(".xinfo");
			b = a(b).attr("id");
			clink_href = a("a", clink_elem).attr("href");
			a(clink_elem).html('<a href="' + clink_href + '"><span class="overlay"></span></a>');
			cinfo_elem = a(item_elem).find(".xinfo").clone(!0).attr("id", "c" + b);
			a(clink_elem).mouseover(function() {
				da.xinfo.load(item_elem)
			});
			c.params.enableReverse === !0 && a(item_elem).offset().left + 424 > a(window).width() && a(cinfo_elem).addClass("reverse");
			a(clink_elem).append(cinfo_elem);
			shadow_elem.append(clink_elem);
			shown_info_elem = parent_elem.parent().find("#shown_info");
			shown_info_elem.html("").append(shadow_elem);
			a("#shown_info a.button-favorite").click(c.clickFunc);
			a(clink_elem).mouseout(function(a) {
				c.expandInfoMouseout(a)
			});
			d && d.stopAuto()
		};
		c.expandInfoMouseout = function(b) {
			var c = a(b.target).parents(".films-gallery-scroller, .video-list-scroller").find("ul").data("jcarousel");
			parent_elem = a(b.target).parents("#shown_info");
			c && c.startAuto()
		};
		c.$el.data("ivi.moviePopup") || (c.$el.data("ivi.moviePopup", c), c.init())
	};
	a.ivi.moviePopup.defaultOptions = {
		enableRating: !1
	};
	a.ivi.moviePopup.defaultParams = {
		carouselMode: !1,
		enableReverse: !0
	};
	a.fn.iviMoviePopup = function(b, f) {
		return this.each(function() {
			new a.ivi.moviePopup(this, b, f)
		})
	};
	var f = function(b) {
		b = a(b.target);
		b = b.hasClass("button-view") ? "Нажатие на кнопку Смотреть во всплывающем окне" : b.hasClass("button-favorite") ? b.hasClass("active") ? "Удаление из очереди из всплывающего окна" : "Добавление в очередь из всплывающего окна" : "Всплывающее окно при наведении на постер";
		window.counterHint(b)
	}
})(jQuery);
//public_html/js/compiled/jquery.dynamicInput.js
jQuery.fn.dynamicInput = function() {
	var b = $(this),
		c = function(a) {
			a.val() === "" && a.val(a.attr("title")).addClass("blank")
		},
		d = function(a) {
			a.val() === a.attr("title") && a.val("").removeClass("blank")
		};
	d(b);
	c(b);
	b.focus(function() {
		d(b)
	}).blur(function() {
		c(b)
	})
};
//public_html/js/compiled/functions.js
Array.prototype.shuffle = function() {
	for (var a = this.length - 1; a >= 0; a--) {
		var b = Math.floor(Math.random() * (a + 1)),
			c = this[b];
		this[b] = this[a];
		this[a] = c
	}
	return this
};
if (da == void 0) var da = [];
da.listeners = [];
da.on = function(a) {
	da.listeners[a] == void 0 && (da.listeners[a] = $.Callbacks());
	return da.listeners[a]
};
da.notice = function(a) {
	var b = $.Callbacks();
	$("#popup-notices-container").append(a);
	a.find(".close").click(function(c) {
		a.hide();
		b.fire(c)
	});
	a.show();
	return b
};
da.template = function(a, b) {
	for (key in b) a = a.replace(RegExp("%" + key + "%", "g"), b[key]);
	return a
};
da.settings = function(a) {
	this.init(a)
};
da.settings.prototype.get = function(a, b) {
	if (this[a] == void 0) return b;
	return this[a]
};
da.settings.prototype.merge = function(a) {
	if (a) for (key in a) this[key] == void 0 && (this[key] = a[key]);
	return this
};
da.settings.prototype.init = function(a) {
	for (key in a) this[key] = a[key];
	return this
};
da.settings.attr = function(a, b) {
	var c = new da.settings;
	json = a.attributes[b];
	json != void 0 && c.init($.parseJSON(json.value));
	for (var d = RegExp("^" + b + "-(.+)$"), e = null, f = 0; f < a.attributes.length; f++) if (e = d.exec(a.attributes[f].name)) c[e[1]] = a.attributes[f].value;
	return c
};
da.settings.data = function(a) {
	var a = $(a).data(),
		b = new da.settings;
	for (key in a) b[key] = a[key];
	return b
};
da.xinfo = {
	findPopup: function(a) {
		var a = $(a),
			b = da.xinfo._findPopup(a);
		b.data("uid", a.data("uid"));
		return b
	},
	_findPopup: function(a) {
		if (!a.length) throw Error("Popup not found");
		var b = a.find(".xinfo");
		if (b.length == 1) return b;
		if (b.length > 1) throw Error("More than one popup founded");
		return da.xinfo._findPopup(a.parent())
	},
	load: function(a) {
		a = $(a);
		if (!da.xinfo.once(a)) return !1;
		$.ajax(da.feed.safe({
			url: "/video/ajax/info/-/" + a.data("uid") + "/",
			dataType: "json",
			success: da.xinfo.success(a),
			error: da.xinfo.hide(a)
		}))
	},
	once: function(a) {
		if (a.data("lock")) return !1;
		a.data("lock", 1);
		return !0
	},
	success: function(a) {
		return function(b) {
			var c = a.find(".xinfo");
			b.error === void 0 && (c.html(b.html), a.find(".add_comming").each(function() {
				Runner.add_comming.bind(this)
			}))
		}
	},
	hide: function(a) {
		a.find(".tags, .wrap-text-xinfo").removeClass("info-loading")
	}
};
function showXinfo(a, b) {
	var c = "xinfo_" + a;
	b && (c = b + "_" + c);
	c = $("#" + c);
	c.data("uid", a - 1);
	da.xinfo.load(c)
}

function toFormattedTime(a, b, c) {
	c && (a = Math.ceil(a));
	var d = c = "00",
		e = "00",
		e = d = c = 0,
		c = Math.floor(a / 3600);
	a %= 3600;
	d = Math.floor(a / 60);
	a %= 60;
	e = a;
	c = c >= 10 ? c.toString() : "0" + c.toString();
	d = d >= 10 ? d.toString() : "0" + d.toString();
	e = e >= 10 ? e.toString() : "0" + e.toString();
	return (b ? c + ":" : "") + d + ":" + e
}

function DaysInMonth(a, b) {
	DaysInMonthR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	DaysInMonthL = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	res = null;
	if (a == 0) return DaysInMonthL[0];
	return res = b % 4 == 0 && b % 100 != 0 || b % 400 == 0 ? DaysInMonthL[a - 1] : DaysInMonthR[a - 1]
}

function drawDaySelect(a, b, c, d, e) {
	addedSelect = '<select id="' + e + '" name="birth_day" class="w55">';
	addedSelect += '<option value="0">&mdash;</option>';
	isEmptyMonth = isSelect = !1;
	a == 0 && (isEmptyMonth = !0);
	for (a = 1; a <= c; a++) a == c && isSelect == !1 && !isEmptyMonth && d != 0 ? addedSelect += '<option value="' + a + '" SELECTED>' + a + "</option>" : a == d && !isEmptyMonth ? (addedSelect += '<option value="' + a + '" SELECTED>' + a + "</option>", isSelect = !0) : addedSelect += '<option value="' + a + '">' + a + "</option>";
	addedSelect += "</select>";
	return addedSelect
}

function getDays(a, b, c, d) {
	days = DaysInMonth(a, b);
	return drawDaySelect(a, b, days, c, d)
}
Array.prototype.remove = function(a, b) {
	var c = this.slice((b || a) + 1 || this.length);
	this.length = a < 0 ? this.length + a : a;
	return this.push.apply(this, c)
};
function thisMovie(a) {
	return navigator.appName.indexOf("Microsoft") != -1 ? window[a] : document[a]
}

function getCookie(a) {
	a += "=";
	for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
		for (var d = b[c]; d.charAt(0) == " ";) d = d.substring(1, d.length);
		if (d.indexOf(a) == 0) return d.substring(a.length, d.length)
	}
	return null
}
function eraseCookie(a) {
	setCookie(a, "", -1)
}
function openUserModal(a) {
	$(".jqmWindow").jqmHide();
	loadModal(a).done(function(a) {
		$(a).jqm().jqmShow()
	});
	return !1
}

function loadModal(a, b) {
	var b = b || {},
		c = $("#modal_" + a + "_wrapper").data(),
		c = c || {};
	$.extend(b, c);
	var d = $.Deferred(),
		e = "#modal_" + a,
		c = $(e);
	if (c.length) return d.resolve(c), d.promise();
	c = $.ajax("/core/modal/?template_key=" + a, {
		data: b
	});
	c.done(function(a) {
		$(document.body).append(a);
		a = $(e);
		d.resolve(a)
	});
	c.fail(function() {
		d.reject()
	});
	return d.promise()
}

function YAreachGoal(a) {
	typeof yaCounter7692568 === "undefined" ?
	function(b, c) {
		(b[c] = b[c] || []).push(function() {
			try {
				b.yaCounter7692568 = new Ya.Metrika({
					id: 7692568,
					enableAll: !0,
					webvisor: !0
				}), yaCounter7692568.reachGoal(a)
			} catch (c) {}
		})
	}(window, "yandex_metrika_callbacks") : yaCounter7692568.reachGoal(a)
}

function openModal(a, b, c) {
	this.auth = b || "";
	this.c_name = c || "";
	this.auth == !0 ? getCookie("have_login") ? (this.c_name != "" && setCookie(this.c_name, 1, 1), openModal("auth")) : showReg() : ($(".jqmWindow").jqm().jqmHide(), a == "social_register" && getCookie("buy") == 1 && (Runner.currentPage == "watch" || Runner.currentPage == "plus") || (a == "register_teaser" ? loadModal(a).done(function(a) {
		$(a).jqm({
			onHide: function(a) {
				a.w.hide();
				a.o.remove();
				_gaq.push(["_trackEvent", "SiteEvents", "ClosedLP", "заглушка закрыта"]);
				setCookie("_set_motivation_teaser", "ClosedLP", 30);
				YAreachGoal("ClosedLP")
			},
			onShow: function(a) {
				a.w.show();
				_gaq.push(["_trackEvent", "SiteEvents", "ShowedLP", "показана мотивационная заглушка"]);
				setCookie("_set_motivation_teaser", "ShowedLP", 30);
				YAreachGoal("ShowedLP")
			}
		}).jqmShow()
	}) : loadModal(a).done(function(b) {
		$(b).jqm().jqmShow();
		a == "reg" && reloadCaptcha()
	})));
	return !1
}
function socialAuthClick(a, b) {
	b && $("#" + b).jqmHide();
	daAuth.auth(a);
	return !1
}

function styleRadioChoose(a) {
	$(a).children().removeClass("active");
	$(a).find("input:radio:checked").each(function(a, c) {
		$(c).parent().addClass("active")
	})
}

function showHidePassword(a, b) {
	ec = $("#" + a);
	ec.length > 0 && (elem = ec.first(), flag = !1, ec_text = $("#" + a + "_text"), ec_text.length === 0 ? (elem_text = document.createElement("input"), $(elem_text).attr("id", a + "_text").attr("type", "text").attr("tabindex", $(elem).attr("tabindex")).addClass($(elem).attr("class")), $(elem).css("display", "none").attr("disabled", "disabled"), $(elem_text).insertAfter(elem), flag = !0) : elem_text = ec_text.first(), b ? ($(elem_text).val($(elem).val()), $(elem_text).css("display", "").removeAttr("disabled").attr("name", $(elem).attr("name")), $(elem).css("display", "none").removeAttr("name").attr("disabled", "disabled")) : (flag || $(elem).val($(elem_text).val()), $(elem).attr("disabled", "disabled").removeAttr("disabled").css("display", "").attr("name", $(elem_text).attr("name")), $(elem_text).css("display", "none").removeAttr("name").attr("disabled", "disabled")))
}
function mergeAccount(a) {
	$.ajax({
		url: "/user/ajax/merge",
		dataType: "json",
		type: "POST",
		data: {
			hash: a
		},
		success: function() {
			afterMergeReload()
		}
	})
}

function afterMergeReload() {
	window.location.hash = "#socnet";
	window.location.reload()
}
function separateAccount(a) {
	$.ajax({
		url: "/user/ajax/separate",
		dataType: "json",
		type: "POST",
		data: {
			hash: a
		},
		success: function() {
			window.location.hash = "#socnet";
			window.location.reload()
		}
	})
}
function reloadCaptcha() {
	da.register_captcha ? da.register_captcha.reload() : da.captcha.show({
		code: "#captcha_code",
		img: "#captcha",
		success: function(a) {
			$("#captcha").show();
			da.register_captcha = a
		}
	})
}
function showReg() {
	openModal("reg")
}

function setCookie(a, b, c) {
	var d = new Date;
	d.setDate(d.getDate() + c);
	b = escape(b) + (c == null ? "" : "; expires=" + d.toUTCString());
	document.cookie = a + "=" + b + "; path=/"
}
function redrawSocial() {}

function ivicarousel_initCallback(a, b) {
	var c = $(a.list).parents(".five-preview").find(".promo-but ul li");
	$(c).bind("click", function() {
		a.scroll($(this).index() * a.options.scroll + 1);
		return !1
	});
	c = $(a.list).parents(".video-list-scroller");
	$(c).find(".scroll-left").bind("click", function() {
		a.prev();
		return !1
	});
	$(c).find(".scroll-right").bind("click", function() {
		a.next();
		return !1
	});
	if (b == "init") a.startAutoOrig = a.startAuto, a.startAuto = function() {
		a.paused || a.startAutoOrig()
	}, a.pause = function() {
		a.paused = !0;
		a.stopAuto()
	}, a.play = function() {
		a.paused = !1;
		a.startAuto()
	}, items = $(a.container[0]).parent().parent().parent().parent(), items.mouseenter(function() {
		a.pause()
	}), items.mouseleave(function() {
		a.play()
	});
	a.play()
}
function ivicarousel_setActiveButton(a, b, c) {
	var b = $(a.list).parents(".five-preview"),
		d = $(b).find(".promo-but ul li"),
		e = Math.floor((c - 1) / a.options.scroll);
	$(d).each(function(a) {
		a == e ? $(this).addClass("active") : $(this).removeClass("active")
	});
	$(b).find(".shown-info").html("")
}

function ivicarousel_initCallback_episodes(a) {
	var b = $(a.list).parents(".video-list-scroller");
	$(b).find(".scroll-left").bind("click", function() {
		a.prev();
		return !1
	});
	$(b).find(".scroll-right").bind("click", function() {
		a.next();
		return !1
	})
}
function ivicarousel_buttonPrevCallback(a, b, c) {
	a = $(a.list).parents(".films-gallery-scroller, .video-list-scroller, .list-scroller").find(".scroll-left");
	c ? $(a).removeClass("disabled") : $(a).addClass("disabled")
}

function ivicarousel_buttonNextCallback(a, b, c) {
	a = $(a.list).parents(".films-gallery-scroller, .video-list-scroller, .list-scroller").find(".scroll-right");
	c ? $(a).removeClass("disabled") : $(a).addClass("disabled")
}
function ivicarousel_setPromoPixel(a, b) {
	link = $(b).find("a");
	if (link.attr("pixel")) {
		var c = new Image;
		$(c).attr("src", link.attr("pixel"))
	}
}
function canvasArcAngleValue(a) {
	return Math.PI * (a * 0.02 - 0.5)
}

function drawPieDiagram(a, b, c, d) {
	if (typeof a.getContext != "undefined") {
		var e = a.getContext("2d");
		e.clearRect(0, 0, a.width, a.height);
		a = Math.floor(Math.min(a.width, a.height) / 2);
		e.fillStyle = d;
		e.beginPath();
		e.arc(a, a, a, canvasArcAngleValue(b), canvasArcAngleValue(100), !1);
		e.lineTo(a, a);
		e.closePath();
		e.fill();
		e.fillStyle = c;
		e.beginPath();
		e.arc(a, a, a, canvasArcAngleValue(0), canvasArcAngleValue(b), !1);
		e.lineTo(a, a);
		e.closePath();
		e.fill()
	}
}

function submitRegister(a) {
	$.ajax({
		dataType: "json",
		type: "POST",
		url: "/user/ajax/register/",
		data: $("#register").serialize(),
		success: function(b) {
			b.error ? (reloadCaptcha(), $("#register .error").text(""), b.error[1] == "email_typo" || b.error[1] == 105 || b.error[1] == 104 ? $("#error_reg_email").text(b.error[0]) : b.error[1] == "pass_typo" || b.error[1] == 108 ? $("#error_reg_password").text(b.error[0]) : (b.error[1] == "captcha" || b.error[1] == "captcha_typo") && $("#error_reg_code").text(b.error[0])) : (doAtRequest("reg_form_success"), Groot.track("reg_form_success"), window.sessionStorage.setItem("just_registered", 1), _gaq.push(["_trackEvent", "SiteEvents", "StartedRegistration", "зарегестрировался"]), a != "" ? (window.location.href = window.location.href + "#" + a, window.location.reload(!0)) : window.location.href = b.url)
		}
	})
}

function submitLogin(a) {
	$.ajax({
		dataType: "json",
		type: "POST",
		url: "/user/ajax/login/",
		data: $("#user_login").serialize(),
		success: function(b) {
			$("#error_auth_email").text("");
			$("#error_auth_password").text("");
			if (b.error) b.error[1] == 104 ? $("#error_auth_email").text(b.error[0]) : b.error[1] == 108 && $("#error_auth_password").text(b.error[0]);
			else {
				Groot.track("auth_form_success");
				doAtRequest("auth_form_success");
				if (a != "") window.location.href = window.location.href + "#" + a;
				getCookie("gift") ? window.location.href = "/gift/activate/" : window.location.reload(!0)
			}
		}
	})
}
function submitRecover() {
	var a = $("#pwrecover_button").attr("disabled", "disabled").addClass("disabled");
	$.ajax({
		dataType: "json",
		type: "POST",
		url: "/user/ajax/recover/",
		data: "email=" + $("#recover_email").val(),
		success: function(b) {
			a.removeAttr("disabled").removeClass("disabled");
			b.error ? $("#form_error_recover").empty().show().html(b.error) : b.message && $("#form_error_recover").empty().show().html(b.message)
		}
	})
}

function share(a) {
	window.open(a, "_blank", "menubar=no,height=500,width=550")
}
function resizeVideoPlayer(a, b) {
	var c = a ? a : $(window).height(),
		c = c > 830 ? "w980" : c > 730 ? "w864" : c > 630 ? "w704" : "w640",
		d = b ? $("#video-player-wrapper") : $("#content-top-wrapper");
	d.hasClass(c) || (d.removeClass("w992 w980 w864 w704 w640"), d.addClass(c))
}
function isIE7() {
	return $.browser.msie && parseInt($.browser.version, 10) < 8
}

function setGender(a, b, c) {
	$(c).val(a);
	$(b).find("li").removeClass("active");
	$(b).find("li." + a).addClass("active")
}
function expandInfoOver(a) {
	$(a).find(".info").show()
}
function contractExpanded(a) {
	a = $(a).parents("ul.items li");
	a = $(a).find(".expanded");
	contractInfoExpanded(a);
	$(a).hide().css({
		width: 88,
		height: 132,
		marginTop: -66,
		marginLeft: -44
	}).removeClass("start")
}
function contractInfoExpanded(a) {
	$(a).find(".info").hide()
}

function submitEdit() {
	var a = $("#edit_profile");
	$.ajax({
		dataType: "json",
		type: "POST",
		url: "/user/ajax/edit/",
		data: a.serialize(),
		success: function(b) {
			b.error ? $("#save-notice").html(b.error).removeClass("nodisplay") : b.message && $("#save-notice").html(b.message).removeClass("nodisplay");
			b.form !== void 0 && a.find('[name="info"]').val(b.form.info);
			b.show_email_notice && $("#email-notice").show()
		}
	})
}

function sendConfirmEmail() {
	$.ajax({
		dataType: "json",
		type: "POST",
		url: "/user/ajax/send/mail/",
		success: function() {
			$("#email-notice").hide()
		}
	})
}
function setGender(a, b) {
	$("#gender-value").val(a);
	$("#gender span").removeClass("select");
	$(b).addClass("select")
}
function removeWatched(a) {
	$.ajax({
		dataType: "json",
		type: "POST",
		url: "/video/ajax/remove/watched/",
		data: "vid=" + a,
		success: function() {
			$("#watched_" + a).remove()
		}
	})
}

function resetPage() {
	$("tr").filter(function() {
		return this.id.match(/watched_*/)
	}).remove()
}
function nextPage() {
	curPage = parseInt($("#page_number").val());
	max = parseInt($("#max_page").val());
	curPage >= max || showPage(curPage + 1)
}
function prevPage() {
	curPage = parseInt($("#page_number").val());
	max = parseInt($("#max_page").val());
	curPage - 1 <= 0 || showPage(curPage - 1)
}
function nextSelectionsPage(a) {
	nextPage = 1 + parseInt($("#page_number").val());
	document.location.href = a + nextPage + "/"
}

function prevSelectionsPage(a) {
	prevPage = parseInt($("#page_number").val()) - 1;
	document.location.href = prevPage == 1 ? a : a + prevPage + "/"
}
function buildPageNumberLinks(a, b, c, d) {
	b > 2 ? $("#" + c).attr("href", a + (b - 1) + "/") : $("#" + c).attr("href", a);
	$("#" + d).attr("href", a + (b + 1) + "/")
}

function addRow(a) {
	_tr = $("<tr></tr>").attr("id", "watched_" + a.id);
	_td_link = $("<td></td>");
	_a_link = $("<a></a>").attr("href", a.link);
	_span1_link = $("<span></span>").addClass("listed-thumb-wrapper");
	_img_link = $("<img/>").attr("src", a.image);
	_span1_link.append(_img_link);
	_span2_link = $("<span></span>").addClass("title");
	a.compilation && (_b_link = $("<b>" + a.compilation + ": </b>"), _span2_link.append(_b_link));
	_span2_link.html(_span2_link.html() + a.title);
	_span3_link = $("<span></span>").addClass("tags").html(a.genres);
	_a_link.append(_span1_link).append(_span2_link).append(_span3_link);
	_td_link.append(_a_link);
	_td_link.append(a.price_html);
	_td_date = $("<td></td>").addClass("date").html(a.date);
	_tr.append(_td_link).append(_td_date);
	$("#watched_table").append(_tr)
}

function showPage(a) {
	var b = $("#max_page"),
		c = $("#page_number"),
		d = $("#page_prev"),
		e = $("#page_next");
	if (parseInt(b.val()) < a) return showPage(b.val()), !1;
	$.ajax({
		dataType: "json",
		type: "GET",
		url: "/user/ajax/watched/video/",
		data: "page=" + a,
		success: function(b) {
			if (!b.error) {
				resetPage();
				for (i = 0; i < b.data.length; ++i) addRow(b.data[i], i);
				c.val(a);
				d.val(a - 1);
				e.val(a + 1)
			}
		}
	});
	return !1
}

function showFavPage(a, b) {
	b |= $("#fav_category").val();
	b == "all" && (b = null);
	max_page = $("#max_fav_page");
	if (parseInt(max_page.val()) < a) return $("#page_fav_number").val(max_page.val()), showFavPage(max_page.val()), !1;
	$.ajax({
		dataType: "json",
		type: "GET",
		url: "/user/ajax/draw/favourites/",
		data: "page=" + a + "&category=" + parseInt(b),
		success: function(b) {
			b.error || ($("#fav_main_tbody").html("").html(b.html), b.pages ? ($("#fav_form").show(), $("#max_fav_page").val(b.pages), $("#max_fav_page_label").text(b.pages)) : $("#fav_form").hide(), $("#page_fav_number").val(a), $("#page_fav_prev").val(a - 1), $("#page_fav_next").val(a + 1))
		}
	});
	return !1
}
function removeSocial(a, b) {
	var c = function() {
		$.ajax({
			dataType: "json",
			type: "POST",
			url: "/user/ajax/separate/",
			data: "hash=" + a,
			success: function() {
				window.location.hash = "#socnet";
				window.location.reload()
			}
		});
		return !1
	},
		d = $("#socnet-connected");
	if (d.data("haspassword") || d.find("li.connected").length > 1) return c();
	daAuth.displayFillPasswordForm(c, b)
}

function isLoggedIn() {
	if (parseInt($(document.body).data("auth"))) return !0;
	return !1
}
function goToByScroll(a) {
	$("html,body").animate({
		scrollTop: $("#" + a).offset().top - 50
	}, "slow")
}
var ContentWatchedChecker = {
	list: [],
	isWatched: function(a) {
		return this.list.indexOf(a) == -1 ? (this.list.push(a), !1) : !0
	}
};
function contentWatched(a) {
	ContentWatchedChecker.isWatched(a) || $.post("/b2b/api/json/", '{"method":"da.content.content_watched","params":["' + a + '",{"site":1}]}')
}

function add2Fav(a, b, c) {
	$.ajax({
		url: "/user/ajax/add/favourite",
		dataType: "json",
		type: "POST",
		data: {
			id: a,
			type: b
		},
		success: function(d) {
			typeof d.status != "undefined" && (d.status == 1 ? gravity.actionAdd(a, b) : gravity.actionRemove(a, b), d.overlay && fadedPopupAdd(d.overlay, "notice_queue_" + b + "-" + a));
			c.call(void 0, d);
			d.status == 1 ? $(document).trigger("ivi:favourites:add", [a, b]) : $(document).trigger("ivi:favourites:remove", [a, b])
		}
	})
}

function fadedPopupAdd(a, b, c) {
	var c = $.extend({
		fadeIn: 500,
		fadeOut: 500,
		life: 3E3
	}, c),
		d = $("#popup-notices-container"),
		a = $(a);
	a.attr("id", b);
	a.children(".close").click(function() {
		fadedPopupDisappear(b, c.fadeOut)
	});
	fadedPopupsCleanup();
	d.append(a);
	fadedPopupAppear(b, c.fadeIn);
	c.life && setTimeout("fadedPopupDisappear('" + b + "', " + c.fadeOut + ")", c.life)
}
function fadedPopupAppear(a, b) {
	$("#popup-notices").find("#" + a).hide().fadeIn(b)
}

function fadedPopupDisappear(a, b) {
	var c = $("#popup-notices").find("#" + a).not("[data-hidden]");
	c.length && c.attr("data-hidden", "true").show().fadeOut(b, function() {
		$(this).css({
			visibility: "hidden",
			display: "block"
		})
	})
}
function fadedPopupsCleanup() {
	var a = $("#popup-notices-container").children(".item"),
		a = $.makeArray(a).reverse(),
		b;
	for (b in a) {
		var c = $(a[b]);
		if (c.is("[data-hidden]")) c.remove();
		else
		break
	}
}

function removeFromFav(a, b, c) {
	gravity.actionRemove(a, b);
	$.ajax({
		url: "/user/ajax/remove/favourite",
		dataType: "json",
		type: "POST",
		data: {
			id: a,
			type: b
		},
		success: function(d) {
			c.call(void 0, d);
			$(document).trigger("ivi:favourites:remove", [a, b])
		}
	})
}
function getURLParameter(a) {
	return decodeURI((RegExp(a + "=(.+?)(&|$)").exec(location.search) || [, null])[1])
}

function subscribeFavorite(a, b, c) {
	$.ajax({
		url: "/user/ajax/fav/subscribe",
		dataType: "json",
		type: "POST",
		data: {
			id: a,
			type: b
		},
		success: function(d) {
			typeof d.subscribed != "undefined" && (d.subscribed == 1 && (d.in_favourite || $(document).trigger("ivi:favourites:add", [a, b]), gravity.actionAdd(a, b)), d.overlay && fadedPopupAdd(d.overlay, "notice_subscribe_" + b + "-" + a));
			c.call(void 0, d)
		}
	})
}

function unsubscribeFavorite(a, b, c) {
	$.ajax({
		url: "/user/ajax/remove/favourite",
		dataType: "json",
		type: "POST",
		data: {
			id: a,
			type: b,
			subscribe: 0
		},
		success: function(a) {
			c.call(void 0, a)
		}
	})
}
var Reviews = {
	limit: 10,
	page: 1,
	videoId: null,
	pageCount: 0,
	returnValue: !1,
	getTemplate: function() {
		return '<div class="review-item {{#even}}even{{/even}}" id="review-{{id}}">    <p>{{{text}}}</p>    <div class="bottom">        <div class="user-rating-block">            <div class="user-rating"><div style="width: {{user_rate}}%"></div></div>       </div>        <div class="like"            >{{#canlike}}{{#canchange}}<span>{{likes}}</span><a href="javascript::void(0);" onclick="Reviews.like({{id}});return false;">Хорошая рецензия!</a            >{{/canchange}}{{^canchange}}<span onclick="Reviews.like({{id}});return false;">{{likes}}</span        >{{/canchange}}{{/canlike}}{{^canlike}}<span>{{likes}}</span>{{/canlike}}</div>    </div>    <div class="root"></div>    <div class="author">        {{#avatar}}<img src="{{avatar}}" alt=""></if>{{/avatar}}        <strong>            <span>{{username}}</span        ></strong>        <small>{{added}}</small>    </div></div>'
	},
	load: function() {
		$("#tab_reviews .content .loading").show();
		var a = this.getTemplate();
		$.getJSON("/video/ajax/reviews", {
			id: this.videoId,
			page: this.page
		}, function(b) {
			for (var c = "", d = 0; d < b.length; d++) {
				if (d % 2 == 1) b[d].even = !0;
				b[d].user_rate *= 20;
				c += Mustache.to_html(a, b[d])
			}
			$("#tab_reviews .content .loading").hide();
			$("#reviews-content").html(c);
			$("#pageNumber").val(Reviews.page)
		})
	},
	next: function() {
		this.page + 1 <= this.pageCount && (this.page++, this.load())
	},
	previous: function() {
		this.page - 1 > 0 && (this.page--, this.load())
	},
	like: function(a) {
		$.getJSON("/video/ajax/likereview", {
			id: a
		}, function(b) {
			typeof b.error == "undefined" && (b.i > 0 ? $("#review-" + a + " div.like").html("<span class='clickable' onclick='Reviews.like(" + a + ");return false;'>" + b.likes + "</span>") : $("#review-" + a + " div.like").html("<span>" + b.likes + "</span><a href='javascript::void(0);' onclick='Reviews.like(" + a + ");return false;'>Хорошая рецензия!</a>"))
		})
	},
	setPage: function(a) {
		if (a > 0 && a <= this.pageCount) this.page = a, this.load()
	}
},
	ReviewsWatch = {
		like: function(a, b, c) {
			$.ajax({
				url: "/review/ajax/likereview",
				type: "get",
				cache: !1,
				dataType: "json",
				data: {
					id: a,
					content_type: b
				},
				success: function(b) {
					$("#likes_count_" + a).text(b.likes);
					var e = "#likes_text_" + a,
						f = "#likes_label_" + a;
					b.likes == 0 ? $(e).hide() : ($(f).html(b.text), $(e).show());
					b.i == 1 ? c.text("Больше не нравится") : c.text("Мне нравится")
				}
			})
		},
		editForm: function(a, b) {
			var c = "",
				d = $("#review-form-hash").val();
			$.get("/review/ajax/get/review", {
				id: a,
				hash: d
			}, function(a) {
				typeof a.error == "undefined" ? (c = a, a = $.trim($("#review_title").text()), ReviewsWatch.showForm(c, a), b == "single" && $(".checklist").hide(), window.scrollTo(0, 0)) : a.error != "" ? alert(a.error) : alert("Произошла ошибка, повторите позже")
			}, "json")
		},
		showForm: function(a, b) {
			isLoggedIn() ? ($("ul.reviews-list").hide(), $(".wrap-review-form").show(), $(".tooltip").hide(), $("#add-review-form-text").val(a).parents(".wrap-form").addClass("expanded").end().autoResize({
				extraSpace: 0
			}).trigger("change.dynSiz"), $("#add-review-form-title").val(b)) : openModal("auth")
		},
		hideEditForm: function() {
			$("#watch_review_add").hide();
			$("#review-placer").show();
			$("#review-header").show();
			$(".review-page-block").show();
			$("#comments-placer").show()
		},
		hideAddForm: function() {
			this.reviews_count > 0 ? (this.hideEditForm(), $(".action-links").show()) : ($("#add-review-form-title").val(""), $("#add-review-form-text").val(""))
		},
		addReview: function(a, b, c, d) {
			if (isLoggedIn()) {
				var e = $("#add-review-form-error");
				if ($.trim($("#add-review-form-title").val()).length == 0) $("#add-review-form-title_error").html("У рецензии должно быть название");
				else {
					var f = $.trim($("#add-review-form-text").val().replace(/(<([^>]+)>)/ig, "")).length;
					if (f >= 400) {
						var f = $("#add-review-form-text").val(),
							g = $("#add-review-form-title").val();
						$("#review-form-add").attr("disabled", "true");
						recommendation.actionComment();
						$.post("/review/ajax/addreview", {
							text: f,
							id: a,
							title: g,
							content_type: c
						}, function(f) {
							typeof f.error == "undefined" ? $("#elem_send_friends").prop("checked") ? Social.shareReview(a, c, f.id, b, d).done(function() {
								ReviewsWatch.redirectToReview(f.id, b, d)
							}) : ReviewsWatch.redirectToReview(f.id, b, d) : (f.error.unvoted ? $("#add-review-form-rating_error").html(f.error.unvoted) : e.html(f.error), f.error_code == "no_user_email" ? openModal("review_no_email") : f.error_code == "unconfirmed_user_email" && ($("#review-user-email").html(f.email), openModal("review_confirm_email")), $("#review-form-add").removeAttr("disabled"))
						}, "json")
					} else e.html("Рецензия не может быть меньше 400 знаков, вам не хватает еще " + (400 - f))
				}
			} else f = Lawnchair({}, function() {}), g = [], g.push({
				text: $("#add-review-form-text").val(),
				title: $("#add-review-form-title").val()
			}), f.save({
				key: "form_data",
				data: g
			}), openModal("auth")
		},
		editReview: function(a, b, c) {
			var d = $("#add-review-form-error");
			if ($.trim($("#add-review-form-title").val()).length == 0) $("#add-review-form-title_error").html("У рецензии должно быть название");
			else if (a = $.trim($("#add-review-form-text").val().replace(/(<([^>]+)>)/ig, "")).length, a >= 400) {
				var a = $("#add-review-form-title").val(),
					e = $("#add-review-form-text").val(),
					f = $("#review-form-hash").val();
				$.post("/review/ajax/editreview", {
					text: e,
					id: b,
					title: a,
					hash: f
				}, function(a) {
					typeof a.error == "undefined" ? window.location.href =
					c : d.html(a.error)
				}, "json")
			} else d.html("Рецензия не может быть меньше 400 знаков, вам не хватает еще " + (400 - a))
		},
		redirectToReview: function(a, b, c) {
			window.location.href = b + "#review-" + a;
			c == "list" && window.location.reload()
		}
	};
function trailerFinished() {
	Trailer.close()
}
var Payment = {
	params: null,
	back_url: "",
	closeTrialId: null,
	event_tab_name: "personalaccount",
	getOpenEventName: function() {
		return "payment_" + Payment.event_tab_name
	},
	getCloseEventName: function() {
		return "payment_" + Payment.event_tab_name + "_closewindow"
	},
	setEventTabName: function(a) {
		Payment.event_tab_name = a
	},
	buildSuccessBuyEventName: function(a) {
		return "payment_" + a + "_successful"
	},
	onclick: function(a) {
		var b = {};
		if (a.data("right") == "svod") {
			var c = a.parent().hasClass("multi-choice") ? a.parent().find("input[name=paid]:checked").data("subscription-id") : a.data("subscription-id");
			b.subscription_id = c;
			b.action = a.data("action") == "prolong" ? a.data("action") : "buy"
		} else b.content_id = a.data("content-id");
		b.can_buy = a.data("can-buy") !== void 0 ? a.data("can-buy") : 0;
		b.back_url = a.data("back-url");
		this.openPayment(b)
	},
	registerBackUrl: function(a) {
		this.back_url = a
	},
	runBackUrl: function() {
		if (this.back_url) window.location = this.back_url
	},
	loadPaymentBlock: function(a, b) {
		$("#payment_load_block_id").length || $(document.body).append('<div id="payment_load_block_id"></div>');
		$.ajax({
			dataType: "json",
			type: "POST",
			url: "/payment/ajax/payment/block/",
			data: a,
			success: function(a) {
				$("#payment_load_block_id").html(a.html);
				b(a)
			}
		})
	},
	isRussianIP: function() {
		var a = !1;
		$.ajax({
			dataType: "json",
			type: "GET",
			url: "/mobileapi/geocheck/",
			async: !1,
			success: function(b) {
				a = b.result
			}
		});
		return a
	},
	userOs: function() {
		return navigator.userAgent.toLowerCase().indexOf("linux") != -1
	},
	openPayment: function(a) {
		if (isLoggedIn()) if (Payment.userOs() && !a.linux_notice) {
			if (a.linux_notice !== void 0) {
				if (a) Payment.params.linux_notice =
				a.linux_notice
			} else if (a) Payment.params = a;
			openModal("linux_notice");
			a.subscription_id || a.content_id ? $("#continue-payment_linux").html("Продолжить покупку") : $("#continue-payment_linux").html("Пополнить счет")
		} else if (!a.ignore_geo && !this.isRussianIP()) {
			if (a.linux_notice !== void 0) {
				if (a) Payment.params.linux_notice = a.linux_notice, a = Payment.params
			} else if (a) Payment.params = a;
			a.subscription_id || a.content_id ? $("#continue-payment").html("Продолжить покупку") : $("#continue-payment").html("Пополнить счет");
			openModal("geo_notice")
		} else {
			if (!a || a.ignore_geo || a.linux_notice) if (a = Payment.params, getCookie("subscription_id")) a.subscription_id = getCookie("subscription_id"), a.content_id = null;
			this.loadPaymentBlock(a, function(b) {
				loadModal("payment").done(function(c) {
					$(c).jqm({
						onHide: function(a) {
							a.w.hide();
							wolf_experiment && (Groot.track(Payment.getCloseEventName() + "_" + wolf_main_counter), doAtRequest(Payment.getCloseEventName()))
						}
					});
					$(document).scrollTop(0);
					$(c).jqmShow();
					_gaq.push(["_trackEvent", "Pay", "OpenPayForm", "юзер открыл iframe оплаты"]);
					tabs_param = {};
					c = -1;
					if (a.can_buy && a.trial != 1) c = tabs_param.initialIndex = 6;
					else if (b.default_tab) {
						eval("open_tab_param = " + b.tab_param);
						switch (b.default_tab) {
						case "alfa_bank":
							c = 0;
							func = function() {
								Payment.tabsCards(open_tab_param)
							};
							break;
						case "web_money":
							c = 1;
							func = function() {
								Payment.tabsWM(open_tab_param)
							};
							break;
						case "qiwi":
							c = 2;
							func = function() {
								Payment.tabsQiwi(open_tab_param)
							};
							break;
						case "yandex_money":
							c = 3;
							func = function() {
								Payment.tabsYM(open_tab_param)
							};
							break;
						case "sms":
							c = 4;
							func = function() {
								Payment.tabsSms(open_tab_param)
							};
							break;
						default:
							c = 0, func = function() {
								Payment.tabsCards(open_tab_param)
							}
						}
						tabs_param.initialIndex = c
					}
					$("#tabs-menu_payment li a").click(function() {
						$("#payment-teaser").hide()
					});
					$("#tabs-menu_payment").tabs("#tabs-content_payment > .tab", tabs_param);
					var d = $("#tabs-menu_payment").data("tabs");
					c > 0 && d.click(c);
					a.can_buy && ($("#payment-teaser").hide(), a.trial && func());
					b.default_tab && !a.can_buy && ($("#payment-teaser").hide(), func());
					$.browser.opera && $.browser.version.slice(0, 4) < "10.6" && (document.body.style += "");
					$("#modal_payment").find(".modal-close").click(function() {
						Payment.clearCookie()
					})
				})
			})
		} else a.trial == 1 ? setCookie("trial", 1, 1) : setCookie("buy", 1, 1), a.subscription_id && setCookie("subscription_id", a.subscription_id), getCookie("have_login") ? openModal("auth") : showReg()
	},
	clearCookie: function() {
		getCookie("buy") == 1 && eraseCookie("buy");
		getCookie("subscription_id") && eraseCookie("subscription_id");
		getCookie("trial") && eraseCookie("trial")
	},
	validateGift: function(a) {
		return /^[0-9a-f]{12}$/ig.test(a) ? !0 : (alert("Неверный номер сертификата"), !1)
	},
	plusActivateGift: function(a) {
		var b = {
			error: null,
			location: null,
			result: null
		};
		/^[0-9a-f]{8, 18}$/ig.test(a) ? $.ajax({
			dataType: "json",
			type: "POST",
			url: "/gift/ajax/activate/",
			data: "key=" + a,
			success: function(a) {
				if (a.error) b.error = a.error;
				else if (a.open_payment && a.subscription_id) return Payment.openPayment({
					subscription_id: a.subscription_id,
					discount: a.discount,
					action: a.action,
					back_url: a.back_url,
					key: a.key
				}), !0;
				else b.result = "Активация прошла успешно", b.location = "/plus/";
				return b
			}
		}) : b.error = "Неверный номер сертификата"
	},
	profileActivateGift: function(a) {
		if (!this.validateGift(a)) return !1;
		$.ajax({
			dataType: "json",
			type: "POST",
			url: "/gift/ajax/activate/",
			data: "key=" + a,
			success: function(a) {
				if (a.error) alert(a.error), window.location = "profil.php?profile_tab=gifts";
				else if (a.open_payment && a.subscription_id) return Payment.openPayment({
					subscription_id: a.subscription_id,
					discount: a.discount,
					action: a.action,
					back_url: a.back_url,
					key: a.key,
					can_buy: a.can_buy
				}), !0;
				else alert("Активация прошла успешно"), window.location = a.svod_redirect ? "/plus/" : "profil.php?profile_tab=gifts"
			}
		})
	},
	activateGift: function(a, b) {
		if (!/^[0-9a-f]{12}$/ig.test(a)) return alert("Неверный номер сертификата"), !1;
		_self = this;
		$.ajax({
			dataType: "json",
			type: "POST",
			url: "/gift/ajax/activate/",
			data: "key=" + a + "&tab=" + b.tab,
			success: function(a) {
				if (a.error) alert(a.error);
				else if (b.open_payment && b.subscription_id) return alert("try open payment"), params.subscription_id = b.subscription_id, params.action = "prolong", params.can_buy = 1, params.back_url = b.back_url, Payment.openPayment(params), !0;
				else b.callback ? b.callback() : b.content_id ? _self.buyContent(b.content_id, "payment_certificate_successful") : b.subscription_id ? _self.buySubscription(b.subscription_id, b.action, null) : document.location.reload(!0)
			}
		})
	},
	activateGifts: function(a, b) {
		/^[0-9a-f]{12}$/ig.test(a) ? $.ajax({
			dataType: "json",
			type: "POST",
			url: "/gift/ajax/activate/",
			data: "key=" + a,
			success: function(a) {
				b(a)
			}
		}) : b({
			error: "Неверный номер сертификата"
		})
	},
	notifyGift: function(a) {
		_self = this;
		$.ajax({
			dataType: "json",
			type: "POST",
			url: "/gift/ajax/notify/",
			data: "key=" + a,
			success: function(a) {
				a.error ? alert(a.error) : a.callback ? a.callback() : alert("Уведомление отправлено")
			}
		})
	},
	buyContent: function(a, b) {
		b = b || "payment_personalaccount_successful";
		$.ajax({
			dataType: "json",
			type: "POST",
			url: "/payment/ajax/try/buy/content/",
			data: "id=" + a,
			success: function(a) {
				a.buy == 1 ? (wolf_experiment && (doAtRequest(b), Groot.track(b + "_" + wolf_main_counter)), window.location.reload(!0)) : a.error && alert(a.error)
			}
		})
	},
	buySubscription: function(a, b, c, d) {
		c === void 0 && (c = null);
		$.ajax({
			dataType: "json",
			type: "POST",
			url: "/payment/ajax/try/buy/subscription/",
			data: "id=" + a + "&action=" + b + (c ? "&autoprolong=1" : "") + (d ? "&gift=" + d : ""),
			success: function(a) {
				a.buy == 1 ? d ? document.location.href = "/plus/" : window.location.reload(!0) : a.error && alert("Ошибка:" + a.error);
				return !0
			}
		})
	},
	delAutoProlongSubscription: function(a) {
		$.ajax({
			dataType: "json",
			type: "POST",
			url: "/user/ajax/del/auto/prolong/subscription/",
			data: "id=" + a,
			success: function(a) {
				a.result == 1 ? window.location.reload(!0) : a.error && alert(a.error)
			}
		})
	},
	closeTrial: function(a, b) {
		b ? this.closeTrialId && $.ajax({
			dataType: "json",
			type: "POST",
			url: "/user/ajax/close/trial/",
			data: "id=" + this.closeTrialId,
			success: function(a) {
				a.result == 1 ? window.location.reload(!0) : a.error && alert(a.error)
			}
		}) : (this.closeTrialId = a, openModal("trial_notice"))
	},
	accessContent: function(a, b) {
		$.ajax({
			dataType: "json",
			type: "POST",
			url: "/payment/ajax/access/content/",
			data: "id=" + a,
			success: function(a) {
				a.access == !0 && b()
			}
		})
	},
	accessSubscription: function(a, b) {
		isLoggedIn() && $.ajax({
			dataType: "json",
			type: "POST",
			url: "/payment/ajax/access/subscription/",
			data: "id=" + a,
			success: function(a) {
				a.access == !0 && b()
			},
			statusCode: {
				401: function() {
					daAuth.clearClientAuth()
				}
			}
		})
	},
	buildTabsParam: function(a) {
		var b = "";
		a.content ? b = "content_id=" + a.content : a.subscription && (b = "subscription_id=" + a.subscription + "&action=" + a.action);
		a.back && (b += "&back_url=" + escape(a.back));
		a.key && (b += "&key=" + a.key);
		a.trial && (b += "&trial=" + a.trial);
		a.amount && (b += "&amount=" + a.amount);
		return b
	},
	runTabs: function(a) {
		Payment.clearCookie();
		wolf_experiment && (setCookie("irek_experiment_value", wolf_main_counter), doAtRequest(Payment.getOpenEventName()), Groot.track(Payment.getOpenEventName() + "_" + wolf_main_counter));
		var b = this.buildTabsParam(a);
		$(a.block_id).html('<div class="loading light_gray"></div>');
		$.ajax({
			dataType: "json",
			type: "get",
			url: a.url,
			data: b,
			success: function(b) {
				$(a.block_id).html(b.content)
			}
		})
	},
	tabsCards: function(a) {
		Payment.setEventTabName("bankcard");
		a || (a = {});
		a.url = "/payment/ajax/tabs/cards/draw/";
		a.block_id = "#tab_cards";
		this.runTabs(a)
	},
	tabsSms: function(a) {
		Payment.setEventTabName("sms");
		a || (a = {});
		a.url = "/payment/ajax/tabs/sms/draw/";
		a.block_id = "#tab_sms";
		this.runTabs(a)
	},
	tabsGift: function(a) {
		Payment.setEventTabName("certificate");
		a || (a = {});
		a.url = "/payment/ajax/tabs/gift/draw/";
		a.block_id = "#tab_pay_gift";
		this.runTabs(a)
	},
	tabsQiwi: function(a) {
		Payment.setEventTabName("qiwi");
		a || (a = {});
		a.url = "/payment/ajax/tabs/qiwi/draw/";
		a.block_id = "#tab_qiwi";
		this.runTabs(a)
	},
	tabsYM: function(a) {
		Payment.setEventTabName("yandex");
		a || (a = {});
		a.url = "/payment/ajax/tabs/yandex/money/draw/";
		a.block_id = "#tab_yandex";
		this.runTabs(a)
	},
	tabsWM: function(a) {
		a || (a = {});
		a.url = "/payment/ajax/tabs/web/money/draw/";
		a.block_id = "#tab_webmoney";
		this.runTabs(a)
	},
	tabsAcc: function(a) {
		Payment.setEventTabName("personalaccount");
		a || (a = {});
		a.url = "/payment/ajax/tabs/account/draw/";
		a.block_id = "#tab_account";
		this.runTabs(a)
	}
},
	EventMessage = {
		queue: {},
		init: function() {
			this.initNextMessage()
		},
		queueAdd: function(a, b, c) {
			c.queue("chain", function(c) {
				fadedPopupAdd(a.message_list[b].html, "notice_payment_" + a.message_list[b].id, {
					fadeIn: 2E3,
					life: 3E4
				});
				c()
			})
		},
		initNextMessage: function() {
			var a = this;
			$.ajax({
				dataType: "json",
				type: "POST",
				url: "/event/ajax/get/next/message/",
				success: function(b) {
					var c = $("#popup-notices").children().first();
					if (b.message_list) {
						for (var d = $({}), e = 0; e < b.message_list.length; e++) a.queueAdd(b, e, d, c);
						d.dequeue("chain")
					}
				}
			})
		}
	};

function checkCanGiftPay(a) {
	var b = 0;
	$("form.incut").find("input[name=price]").each(function(a, d) {
		$(d).attr("checked") && (b = $(d).val())
	});
	b && (_self = this, $.ajax({
		dataType: "json",
		type: "POST",
		url: "/payment/ajax/balance/",
		success: function(c) {
			c.balance < b ? alert("Недостаточно денежных средств для покупки сертификата") : a.submit()
		}
	}));
	return !1
}
var JSON;
JSON || (JSON = {});
(function() {
	function a(a) {
		return a < 10 ? "0" + a : a
	}
	function b(a) {
		e.lastIndex = 0;
		return e.test(a) ? '"' + a.replace(e, function(a) {
			var b = h[a];
			return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + a + '"'
	}
	function c(a, d) {
		var e, h, m, n, o = f,
			l, j = d[a];
		j && typeof j === "object" && typeof j.toJSON === "function" && (j = j.toJSON(a));
		typeof k === "function" && (j = k.call(d, a, j));
		switch (typeof j) {
		case "string":
			return b(j);
		case "number":
			return isFinite(j) ? String(j) : "null";
		case "boolean":
		case "null":
			return String(j);
		case "object":
			if (!j) return "null";
			f += g;
			l = [];
			if (Object.prototype.toString.apply(j) === "[object Array]") {
				n = j.length;
				for (e = 0; e < n; e += 1) l[e] = c(e, j) || "null";
				m = l.length === 0 ? "[]" : f ? "[\n" + f + l.join(",\n" + f) + "\n" + o + "]" : "[" + l.join(",") + "]";
				f = o;
				return m
			}
			if (k && typeof k === "object") {
				n = k.length;
				for (e = 0; e < n; e += 1) typeof k[e] === "string" && (h = k[e], (m = c(h, j)) && l.push(b(h) + (f ? ": " : ":") + m))
			} else
			for (h in j) Object.prototype.hasOwnProperty.call(j, h) && (m = c(h, j)) && l.push(b(h) + (f ? ": " : ":") + m);
			m = l.length === 0 ? "{}" : f ? "{\n" + f + l.join(",\n" + f) + "\n" + o + "}" : "{" + l.join(",") + "}";
			f = o;
			return m
		}
	}
	if (typeof Date.prototype.toJSON !== "function") Date.prototype.toJSON = function() {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
		return this.valueOf()
	};
	var d = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		f, g, h = {
			"": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		k;
	if (typeof JSON.stringify !== "function") JSON.stringify = function(a, b, d) {
		var e;
		g = f = "";
		if (typeof d === "number") for (e = 0; e < d; e += 1) g += " ";
		else typeof d === "string" && (g = d);
		if ((k = b) && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number")) throw Error("JSON.stringify");
		return c("", {
			"": a
		})
	};
	if (typeof JSON.parse !== "function") JSON.parse = function(a, b) {
		function c(a, d) {
			var e, f, g = a[d];
			if (g && typeof g === "object") for (e in g) Object.prototype.hasOwnProperty.call(g, e) && (f = c(g, e), f !== void 0 ? g[e] = f : delete g[e]);
			return b.call(a, d, g)
		}
		var e, a = String(a);
		d.lastIndex = 0;
		d.test(a) && (a = a.replace(d, function(a) {
			return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}));
		if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), typeof b === "function" ? c({
			"": e
		}, "") : e;
		throw new SyntaxError("JSON.parse");
	}
})();
function setVideoWatched(a) {
	recommendation.actionWatch();
	Social.shareWatched(a)
}
function onPauseButtonClick() {
	Runner.videoId && window.erotic !== !0 && (window.sessionStorage.setItem("player_pause", 1), Social.shareWatchedOnPause(Runner.videoId))
}
function eroticConfirm() {}
function eroticDeny() {}
$.extend({
	getUrlVars: function() {
		var a;
		a = window.location.hash ? window.location.href.substr(0, window.location.href.indexOf("#")) : window.location.href;
		for (var b = [], c = a.slice(a.indexOf("?") + 1).split("&"), d = 0; d < c.length; d++) a = c[d].split("="), b.push(a[0]), b[a[0]] = a[1];
		return b
	},
	getUrlVar: function(a) {
		return $.getUrlVars()[a]
	},
	setUrlVar: function(a, b) {
		var a = escape(a),
			b = escape(b),
			c = window.location.hash,
			d = document.location.search,
			e = a + "=" + b,
			d = d.replace(RegExp("(&|\\?)" + a + "=[^&]*"), "$1" + e);
		RegExp.$1 || (d += (d.length > 0 ? "&" : "?") + e);
		d += c;
		return d
	}
});

function showSeasonsBlock() {
	var a = $("#catalog_serials ol li").filter(":visible").height() + 5;
	if ($("#carousel-list-seasons").length) {
		activeSeasonNumber = parseInt($(".compilation-list-seasons ul li.active a span").attr("class").substr(7));
		$("#carousel-list-seasons").jcarousel({
			vertical: !0,
			scroll: 10,
			start: activeSeasonNumber
		});
		$(".compilation-watch-block .compilation-list-seasons").css("overflow", "visible");
		$("#carousel-list-seasons").mousewheel(function(a, b) {
			b < 0 ? $(".compilation-list-seasons .jcarousel-next").click() : b > 0 && $(".compilation-list-seasons .jcarousel-prev").click();
			return !1
		});
		var b = $("#carousel-list-seasons li").height() + 1,
			c = $("#carousel-list-seasons li").size();
		c <= 10 && (c *= b, $(".compilation-list-seasons").css({
			height: c
		}), $(".jcarousel-prev,.jcarousel-next").hide());
		var d = $(".compilation-list-seasons").height() - b
	}
	$("#catalog_serials").customScroller();
	$(".compilation-watch-block .compilation-list-episodes .scrollbar-dummy").css("visibility", "visible");
	var e = function(b) {
		b = b.find("li").length;
		b <= 16 ? (b *= a, typeof d != "undefined" && b < d && (b = d), $(".compilation-watch-block .compilation-list-episodes .scrollbar-dummy, .compilation-watch-block .compilation-list-episodes .divVScrollerBar").hide()) : (b = "auto", $(".compilation-watch-block .compilation-list-episodes .scrollbar-dummy, .compilation-watch-block .compilation-list-episodes .divVScrollerBar").show());
		$(".compilation-list-episodes").css({
			height: b
		});
		b = $(".compilation-list-episodes").height() + 42;
		$(".compilation-watch-block").css("height", b)
	};
	e($(".compilation-list-episodes ol.active"));
	$(".compilation-list-episodes ol.active").show();
	$(".compilation-list-episodes ol li").click(function() {
		var a = $(this).find("strong a").attr("href");
		window.location = a
	});
	var f = function(a, b) {
		a.addClass("active");
		$(".compilation-list-episodes ol.active").removeClass("active");
		e(b);
		b.addClass("active");
		$("#catalog_serials").setScroller()
	};
	$(".compilation-list-seasons ul li").click(function() {
		$(".compilation-list-seasons ul li.active").removeClass("active");
		var a = $(this).find("a:first").attr("class"),
			b =
			$(this),
			c = $("." + a + "-episodes"),
			a = $("#catalog_serials .divVScrollerBarCursor");
		a.length && parseInt(a.css("top")) != 0 ? (a.animate({
			top: 0
		}, {
			duration: "slow"
		}), a.animate({
			top: 0
		}, {
			duration: "slow",
			complete: function() {
				f(b, c)
			}
		})) : f(b, c);
		return !1
	});
	$(".compilation-list-episodes ol li").click(function() {
		var a = $(this).find("strong a").attr("href");
		window.location = a
	})
}
var b2c = {
	token: {
		get: function(a) {
			var b = a.fail ||
			function() {};
			$.ajax({
				url: "/share/token/",
				data: {
					id: a.id,
					type: a.type || "Content",
					action: a.action || "*"
				},
				dataType: "json",
				success: function(c) {
					c.token ? a.success(c.token) : b(c)
				},
				fail: b
			})
		},
		signedPost: function(a, b) {
			a.success = function(a) {
				b.data = b.data || [];
				b.data.token = a;
				$.ajax(b)
			};
			b2c.token.get(a)
		}
	}
};

function afterLoginRedirect(a) {
	a = a || Lawnchair({}, function() {});
	a.get("after_login_profile_redirect", function(b) {
		a.remove("after_login_profile_redirect");
		if (b && b.value) window.location = "profil.php#" + b.value
	})
}
function trn() {
	(new Image).src = "http://luxup.ru/tr/8609/&r=" + escape(document.referrer) + "&t=" + (new Date).getTime() + "&tref=" + escape(document.location.href + "&action=play_free")
}

function getUniqueId(a, b) {
	var c = {
		Content: 0,
		ContentCompilation: 1,
		Person: 2
	};
	if (typeof c[b] == "undefined") return a;
	return a = parseInt(a) * 10 + parseInt(c[b])
}
function addRate(a, b, c) {
	$.getJSON("/video/ajax/rate", {
		id: a,
		rate: b
	}, function(d) {
		typeof d.error == "undefined" && gravity.actionRate(a, b);
		typeof c == "function" && c(d)
	})
}
function popupErotic() {
	return !1
}

function showPopupErotic(a) {
	cuSel({
		changedEl: "form.selector select, #order-block select",
		visRows: 7,
		scrollArrows: !1
	});
	var b = a.target.href;
	loadModal("erotic_prompt").done(function(c) {
		$(c).jqm({
			modal: !0
		});
		$("#erotic-age-prompt-title").html('<span class="h2i">Доступ в данный раздел сервиса ivi.ru запрещен для пользователей, не достигших 18 лет.</span>');
		$("#erotic-age-prompt-text").html('<p class="small">Нажав «Да», вы заявляете, что вам исполнилось 18 лет и эта информация является достоверной, вы предприняли все необходимые действия для ограничения доступа детей к просмотру данного фильма посредством вашего компьютера или мобильного устройства.</p>');
		$("#erotic_confirm_yes").attr("href", b);
		$("#erotic_confirm_yes").removeClass("jqmClose");
		$("#erotic_confirm_yes").click(function() {
			$("#erotic_confirm_yes").unbind("click", arguments.callee);
			window.location = b
		});
		openModal("erotic_prompt");
		Runner.sendAdcErotica(a)
	});
	return popupErotic()
}

function showPopupEroticNoRedirect(a) {
	var b = $(this);
	cuSel({
		changedEl: "form.selector select, #order-block select",
		visRows: 7,
		scrollArrows: !1
	});
	loadModal("erotic_prompt").done(function(c) {
		$(c).jqm({
			modal: !0
		});
		$("#erotic-age-prompt-title").html('<span class="h2i">Доступ в данный раздел сервиса ivi.ru запрещен для пользователей, не достигших 18 лет.</span>');
		$("#erotic-age-prompt-text").html('<p class="small">Нажав «Да», вы заявляете, что вам исполнилось 18 лет и эта информация является достоверной, вы предприняли все необходимые действия для ограничения доступа детей к просмотру данного фильма посредством вашего компьютера или мобильного устройства.</p>');
		$("#erotic_confirm_yes").attr("href", "#");
		$("#erotic_confirm_yes").addClass("jqmClose");
		$("#erotic_confirm_yes").click(function() {
			$("#erotic_confirm_yes").unbind("click", arguments.callee);
			return showPreviewGenre.call(b, a)
		});
		openModal("erotic_prompt")
	});
	return popupErotic()
}

function showPreviewGenre(a) {
	$("#tabs-menu_subgenres li").removeClass("active");
	$(this).parent().addClass("active");
	$("#subgenres_more_link").attr("href", $(this).attr("href"));
	$.ajax({
		url: "/video/show/subgenre/",
		type: "get",
		data: {
			category_id: a,
			genre_id: $(this).attr("id")
		},
		success: function(a) {
			$("#genre-subgenre_action-items").html(a);
			$("#genre-subgenre_action-items > li").iviMoviePopup()
		}
	});
	return !1
}
var ratingSelector = function(a) {
	$(a.selector).change(function() {
		var b = $(this).parent().parent(),
			c = $(b).next(),
			d = $(b).serializeArray();
		typeof a.tpl == "string" && d.push({
			name: "tpl",
			value: a.tpl
		});
		a.count !== void 0 && d.push({
			name: "count",
			value: a.count
		});
		var e = $(b).next().next().find("#more_link"),
			f = $(e).attr("href").split("/by_"),
			b = $(b[0].rating).val();
		b !== f[1] && (new_href = f[0] + "/by_" + b);
		f[1].indexOf("premiers") !== -1 && (new_href += "/premiers/");
		$.ajax({
			url: "/video/show/rating/",
			data: d,
			type: "GET",
			success: function(a) {
				$(c).html(a);
				$(e).attr("href", new_href)
			}
		})
	})
},
	textExpander = function(a, b, c, d, e) {
		var a = $(a),
			f = a.height(),
			g = 0,
			c = c || "Подробнее…",
			d = d || "Свернуть",
			e = e || 350;
		f > b && (a.append('<p class="more-link"><a class="more">' + c + "</a></p>").find(".content-wrapper").addClass("contracted").parent().find("p > a.more").click(function() {
			var a = $(this),
				k = a.parent().prev(".content-wrapper");
			k.hasClass("locked") || (k.hasClass("contracted") ? k.addClass("locked").animate({
				height: f + "px"
			}, {
				duration: e,
				complete: function() {
					k.removeClass("contracted").addClass("expanded").removeClass("locked");
					a.text(d)
				}
			}) : k.hasClass("expanded") && k.addClass("locked").animate({
				height: b + "px"
			}, {
				duration: e,
				complete: function() {
					k.removeClass("expanded").addClass("contracted").removeClass("locked");
					a.text(c)
				}
			}))
		}), g = f - b);
		return g
	},
	ajax_lazyloader = function(a, b) {
		if (a.length) {
			var c = !1;
			a.click(function() {
				var d = a.attr("href");
				if (d && !c) return c = !0, $.ajax({
					url: d,
					dataType: "json",
					success: function(d) {
						b.html(b.html() + d.list);
						$("ul.films-gallery > li").iviMoviePopup();
						d.hasMore ? a.attr("href", d.hasMore) : (a.attr("href", ""), a.hide());
						c = !1
					}
				}), !1
			})
		}
	};

function callYouTubePlayer(a, b, c) {
	function d(a, b) {
		var c = a ? window.addEventListener : window.removeEventListener;
		c ? c("message", b, !1) : (a ? window.attachEvent : window.detachEvent)("onmessage", b)
	}
	if (window.jQuery && a instanceof jQuery) a = a.get(0).id;
	var e = document.getElementById(a);
	e && e.tagName.toUpperCase() != "IFRAME" && (e = e.getElementsByTagName("iframe")[0]);
	if (!callYouTubePlayer.queue) callYouTubePlayer.queue = {};
	var f = callYouTubePlayer.queue[a],
		g = document.readyState == "complete";
	if (g && !e) f && clearInterval(f.poller);
	else if (b === "listening") e && e.contentWindow && (b = '{"event":"listening","id":' + JSON.stringify("" + a) + "}", e.contentWindow.postMessage(b, "*"));
	else if (!g || e && (!e.contentWindow || f && !f.ready)) {
		if (f || (f = callYouTubePlayer.queue[a] = []), f.push([b, c]), !("poller" in f)) f.poller = setInterval(function() {
			callYouTubePlayer(a, "listening")
		}, 250), d(1, function k(b) {
			if ((b = JSON.parse(b.data)) && b.id == a && b.event == "onReady") {
				clearInterval(f.poller);
				f.ready = !0;
				for (d(0, k); b = f.shift();) callYouTubePlayer(a, b[0], b[1])
			}
		}, !1)
	} else if (e && e.contentWindow) {
		if (b.call) return b();
		e.contentWindow.postMessage(JSON.stringify({
			event: "command",
			func: b,
			args: c || [],
			id: a
		}), "*")
	}
}
var getCampaignData = function() {
	function a(a, b, c) {
		if (!a || a == "" || !b || b == "" || !c || c == "") return "-";
		var d, e = "-";
		d = a.indexOf(b);
		b = b.indexOf("=") + 1;
		if (d > -1) {
			c = a.indexOf(c, d);
			if (c < 0) c = a.length;
			e = a.substring(d + b, c)
		}
		return e
	}
	var b = a(document.cookie, "__utmz=", ";"),
		c = a(b, "utmcsr=", "|"),
		d = a(b, "utmcmd=", "|"),
		e = a(b, "utmctr=", "|"),
		f = a(b, "utmcct=", "|"),
		g = a(b, "utmccn=", "|");
	a(b, "utmgclid=", "|") != "-" && (c = "google", d = "cpc");
	var b = {
		source: c,
		medium: d,
		term: e,
		content: f,
		campaign: g
	},
		c = "",
		h;
	for (h in b) b[h] && b[h] != "-" && b[h] != "undefined" && (c = c + h + "=" + b[h] + ",");
	return c.length > 0 ? c = c.substr(0, c.length - 1) : null
};
function saveRecommendationSourse(a) {
	Lawnchair({}, function() {}).save({
		key: "watchSource",
		value: a
	})
}
function processVideoLinkById(a, b) {
	processVideoLinkByKindAndId("content", a, b)
}
function processVideoLinkByKindAndId(a, b, c) {
	var d = c ||
	function(a) {
		window.location = a
	};
	$.ajax({
		url: "/video/ajax/build/link/",
		type: "GET",
		dataType: "json",
		data: {
			content_id: b,
			type: a
		},
		success: function(a) {
			typeof a.error == "undefined" && d(a.link)
		}
	})
}

function showAjaxTopReviews(a) {
	$.ajax({
		url: "review/main/page/top/reviews",
		type: "POST",
		data: {},
		success: function(b) {
			typeof b.error == "undefined" && ($(a).find("ul").append(b), da.lazy.show(a), $("#reviews-teaser-block").show())
		}
	})
}
function pluralize(a, b, c, d) {
	a %= 100;
	var e = a % 10;
	if (Math.floor(a / 10) != 1) if (e == 1) return b;
	else if (e >= 2 && e <= 4) return c;
	return d
}
function getRequestParameterFromUrl(a, b) {
	return decodeURI((RegExp(b + "=(.+?)(&|$)").exec(a) || [, null])[1])
}

function showAdrimeAd(a) {
	$("body").append('<iframe src="/tag.html?connection=' + a + '" style="display: none; position: absolute; width: 1px; height: 1px; margin-left: -10000px;"></iframe>')
}
function getRandomDigits(a) {
	var b = "0123456789".split("");
	a || (a = Math.floor(Math.random() * b.length));
	for (var c = "", d = 0; d < a; d++) c += b[Math.floor(Math.random() * b.length)];
	return c
}

function isOldBrowser(a) {
	var b = !1;
	$.each(a, function(a, d) {
		var e = a in $.browser,
			f = parseInt($.browser.version) < d;
		if (e && f) return b = !0, !1
	});
	return b
}

function replaceSwf(a) {
	a.each(function(a, c) {
		if ($(c).attr("swf")) {
			var d = $(c).parent(),
				e = $(c).attr("swf");
			$(c).remove();
			$("<div id='wrapper-swf-promotop'></div>").appendTo(d);
			$("div", d).flashembed({
				id: "flash" + Math.random(),
				src: e,
				allowScriptAccess: "always",
				allowFullScreen: "true",
				wmode: "opaque",
				width: "100%",
				height: "100%",
				quality: "high",
				bgcolor: "#000000"
			}, {})
		}
	})
}(function(a) {
	a.ResourceLoader = new
	function() {
		this.jsMimeType = "text/javascript";
		this.js = function(a, c, d) {
			c = c || {};
			d = d || null;
			a = this._createScript(a, c);
			if (c = this._getParentNode()) c.appendChild(a), d && this._processLoadCallback(a, d);
			return this
		};
		this._createScript = function(b, c) {
			var d = a.document.createElement("script");
			c.type = this.jsMimeType;
			c.src = b;
			for (var e in c) c.hasOwnProperty(e) && d.setAttribute(e, c[e]);
			return d
		};
		this._getParentNode = function() {
			var b = a.document.getElementsByTagName("head");
			if (b.length) return b[0];
			return null
		};
		this._processLoadCallback = function(a, c) {
			a.onload = a.onreadystatechange = function() {
				if (!a.readyState || a.readyState === "complete" || a.readyState === "loaded") a.onload = a.onreadystatechange = null, c(a)
			}
		}
	}
})(window);
var counterHint = function(a, b) {
	b = b || document.URL;
	window.yaCounter7692568.hit(b, a)
};
loadScript = function(a, b) {
	var c = document.getElementsByTagName("head")[0],
		d = !1,
		e = document.createElement("script");
	e.src = a;
	e.onload = e.onreadystatechange = function() {
		if (!d && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) d = !0, typeof b === "function" && b()
	};
	c.appendChild(e)
};
var headerOpacityValue = function(a) {
	a = $(document).scrollTop() - (a || 0);
	a < 0 && (a = 0);
	var b = 140 / (0.8 - 1),
		c = 0.8;
	b != 0 && a < 140 && (c = 1 + a / b);
	return c
},
	getPlatesHeight = function() {
		var a = 0;
		$(".plate-notices").length && (a += 41);
		return a
	},
	getHeaderHeight = function() {
		return $(".header-wrapper").height()
	},
	calculateScrollOffset = function() {
		return getHeaderHeight() + getPlatesHeight()
	};
function removeBodyPlateClass() {
	$(".plate-notices").length === 0 && $("body").removeClass("has-plate-notices")
}
var loadPlayer = function(a) {
	$(".watch-top .main-button-wrapper").addClass("hidden");
	a.autoStart = 1;
	a.is_paid && !a.access_success ? ($(".static-overlay").hide(), a.openPayment()) : (a.playerWidth !== !1 ? resizeVideoPlayer(a.playerWidth, !0) : (resizeVideoPlayer(null, !0), $(window).resize(function() {
		resizeVideoPlayer()
	})), Runner.loadPlayer(a))
},
	eroticConfirmPlayerPopup = function(a, b) {
		a.erotic ? ($(".static-overlay").show(), $("#modal_erotic_warning").show(), $("#eroticConfirm").off("click").click(function() {
			$("#modal_erotic_warning").hide();
			$(".static-overlay").hide();
			b(a);
			return !1
		})) : b(a)
	},
	showPlayerBlock = function(a, b, c) {
		c = c || !1;
		$("#video-player-wrapper").length && (b = b || loadPlayer, $("#video-player-wrapper").show(), $("#video-player-wrapper").removeClass("hidden"), c ? b(a) : eroticConfirmPlayerPopup(a, b))
	},
	getCounter = function(a) {
		var a = $(a),
			b = 0;
		a.length > 0 && (b = parseInt(a.text()));
		return b
	},
	incCounter = function(a) {
		var a = $(a),
			b = getCounter(a);
		b += 1;
		a.text(b);
		return b
	},
	decCounter = function(a) {
		var a = $(a),
			b = getCounter(a);
		b -= 1;
		b < 0 && (b = 0);
		a.text(b);
		return b
	},
	REGEXP_EMAIL_BODY = "^([-_.A-z0-9]+)@((([A-z0-9]|[A-z0-9][A-z0-9-]*[A-z0-9-]).)+((ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bl|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|post|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xxx|ye|yt|yu|za|zm|zw)|((([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]).){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))))$",
	get_carousel_start_position = function(a, b) {
		var c = a.find("li").size(),
			d = $(a).attr("data-name"),
			d = "carousel:" + (d ? d : b) + ":start_position",
			e = Lawnchair({}, function() {}),
			f = 1;
		e.get(d, function(a) {
			a !== null && a.value < c && (f = a.value + 1)
		});
		e.save({
			key: d,
			value: f
		});
		return f
	};
function getCookieForPlayer() {
	return getCookie(window.da_settings.authCookieName)
}
function get_genre_title(a) {
	return $(".main-nav a[data-id=" + a + "]").html()
}

function get_genres_title(a) {
	for (var b = "", c = "", d = 0; d < a.length; d++) if (c = get_genre_title(a[d])) b && (b += ", "), b += c;
	return b
}
var format_period = function(a) {
	a = Math.ceil(((new Date).getTime() - (new Date(a)).getTime()) / 6E4);
	if (a < 0) return format_period.right_now;
	if (a < 60) return format_period.plural(a, format_period.minutes);
	a = Math.ceil(a / 60);
	if (a < 24) return format_period.plural(a, format_period.hours);
	a = Math.ceil(a / 24);
	if (a < 30) return format_period.plural(a, format_period.days);
	return format_period.long_time
};
format_period.plural = function(a, b) {
	return a + " " + pluralize(a, b[0], b[1], b[2]) + format_period.ago
};
format_period.ago = " назад";
format_period.right_now = "только что";
format_period.minutes = ["минута", "минуты", "минут"];
format_period.hours = ["час", "часа", "часов"];
format_period.days = ["день", "дня", "дней"];
format_period.long_time = "больше месяца назад";
function enable(a) {
	return a.removeAttr("disabled").removeClass("disabled")
}
function disable(a) {
	return a.attr("disabled", "disabled").addClass("disabled")
}

function enable_if(a, b) {
	return b ? enable(a) : disable(a)
}
function watchingNow_initCallback(a) {
	var b = $(a.list).parents(".gallery-wrapper");
	$(b).on("click", "#watching_now_next", function() {
		a.next()
	});
	$(b).on("click", "#watching_now_prev", function() {
		a.prev()
	})
}
function watching_now_carousel_init() {
	$("#watching_now_carousel").jcarousel({
		scroll: 1,
		wrap: "circular",
		auto: 2,
		wrap: "last",
		initCallback: watchingNow_initCallback
	})
}

function callWasdClub(a) {
	$.ajax({
		url: "/video/wasdclub/",
		dataType: "json",
		type: "GET",
		data: {
			request_id: a
		},
		success: function(a) {
			(!a.error || a.error === "undefined") && $.ajax({
				url: "/logger/ivi/mediarich",
				dataType: "json",
				type: "POST",
				data: {
					mediarich: 1
				}
			})
		}
	})
}
var countHit = function(a) {
	(new Image).src = a
},
	setClickUrl = function(a, b, c) {
		a.click(c ?
		function() {
			window.open(b);
			return !1
		} : function() {
			window.location.href = b;
			return !1
		})
	},
	favouriteClick = function(a, b, c) {
		c.attr("data-type") !== void 0 && (a = c.attr("data-type"));
		Favorites.addFavorite(c.attr("data-id"), a, function(a) {
			a.status == 0 && (c.removeClass("active"), $("#button-favorite-subscribe").removeClass("active").text("Следить"));
			c.text(a.text)
		}, !1, c.parent().parent());
		b.preventDefault()
	},
	subscribeClick = function(a, b, c) {
		c.attr("data-type") !== void 0 && (a = c.attr("data-type"));
		Favorites.addFavorite(c.attr("data-id"), a, function(a) {
			c.hasClass("active") ? (c.removeClass("active"), c.text(a.subscribe_text)) : (c.addClass("active"), c.text(a.subscribe_text), $button_favourite = $("#button-favorite"), $button_favourite.addClass("active"), $button_favourite.text(a.text))
		}, !0, c.parent().parent());
		b.preventDefault()
	};
function addEventHandler(a, b, c) {
	document.addEventListener ? a.addEventListener(b, c) : document.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
}

function devicesScenes(a) {
	function b() {
		var b = e - 1;
		b < f && (b = a);
		d(b)
	}
	function c() {
		var b = e + 1;
		b > a && (b = f);
		d(b)
	}
	function d(a) {
		var b = document.querySelector(".scene.active");
		b.className = b.className.replace(" active", "");
		document.querySelector(".scene.scene" + a).className += " active";
		e = a
	}
	if (!(a < 2)) {
		var e = 1,
			f = 1;
		addEventHandler(document, "keydown", function(a) {
			switch (a.keyCode) {
			case 37:
				return b(), !1;
			case 39:
				return c(), !1
			}
			return !0
		});
		var g, h = document.querySelectorAll(".scene .title-block .button-prev");
		for (g = 0; g < h.length; g++) addEventHandler(h[g], "click", b);
		h = document.querySelectorAll(".scene .title-block .button-next");
		for (g = 0; g < h.length; g++) addEventHandler(h[g], "click", c)
	}
}
function doAtRequest(a) {
	xt_click(this, "F", "4", a)
};
//public_html/js/compiled/person_wiki.js
var person_wiki = function() {
	$(".filmography > ul > li").iviMoviePopup({
		"enableReverse": false
	});
	$("ul.films-gallery > li").iviMoviePopup({
		"enableReverse": false
	});
	Runner.add_comming.init();
	var bio_elem = $(".bio");
	var bio_height_min = 90;
	var bio_height_full = bio_elem.height();
	var text_expand = "Вся биография";
	var text_contract = "Свернуть биографию";
	if (bio_height_full > bio_height_min) $(".bio").append('<p><a class="more">' + text_expand + "</a></p>").find(".content-wrapper").addClass("contracted").parent().find("p > a.more").click(function() {
		var elem_link =
		$(this);
		var elem_wrapper = elem_link.parent().prev(".content-wrapper");
		if (!elem_wrapper.hasClass("locked")) if (elem_wrapper.hasClass("contracted")) elem_wrapper.addClass("locked").animate({
			"height": bio_height_full + "px"
		}, {
			"duration": 350,
			"complete": function() {
				elem_wrapper.removeClass("contracted").addClass("expanded").removeClass("locked");
				elem_link.text(text_contract)
			}
		});
		else if (elem_wrapper.hasClass("expanded")) elem_wrapper.addClass("locked").animate({
			"height": bio_height_min + "px"
		}, {
			"duration": 350,
			"complete": function() {
				elem_wrapper.removeClass("expanded").addClass("contracted").removeClass("locked");
				elem_link.text(text_expand)
			}
		})
	});
	$(window).on("click", "div.scale-rating li", Runner.onRate)
};
//public_html/js/compiled/social.js
var Social = {
	afterCalculateCallback: null,
	project: null,
	projectOk: "ok",
	projectVk: "vk",
	projectMail: "mail",
	projectFb: "fb",
	projectTw: "tw",
	projects: {
		odnoklassniki: "ok",
		vkontakte: "vk",
		mail: "mail",
		facebook: "fb",
		twitter: "tw"
	},
	vkPostedCount: 0,
	vkSelectedFriends: 0,
	vkSuccessPosted: 0,
	lastShareActionUrl: "",
	lastShareActionData: {},
	setProject: function(a) {
		if (this.projects[a] !== void 0) return this.project = a, !0;
		return !1
	},
	vkPackages: [],
	vkCallback: null,
	shareRating: function(a, b) {
		return Social.shareWithModal("/social/ajax/content/rate", {
			content_id: a,
			rate: b
		}, "о своей оценке фильма")
	},
	shareReview: function(a, b, d, c, f) {
		return Social.shareWithModal("/social/ajax/entity/review", {
			content_id: a,
			content_type: b,
			review_id: d || null,
			url: c || null,
			page_type: f || null
		}, "о своей рецензии на фильм")
	},
	shareWatchedOnPause: function(a) {
		return Social.shareWithModal("/social/ajax/content/watched", {
			content_id: a
		}, "о просмотре фильма")
	},
	shareWatched: function(a) {
		$.getJSON("/social/ajax/get/merged/socials", function(b) {
			$.each(b, function(b, c) {
				$.get("/social/ajax/content/watched", {
					content_id: a,
					project: c
				})
			})
		})
	},
	shareWithModal: function(a, b, d) {
		var c = new $.Deferred;
		Social.lastShareActionUrl = a;
		Social.lastShareActionData = b;
		$.getJSON("/social/ajax/get/merged/socials", function(f) {
			function h() {
				Object.size(g) == f.length && (i != e.length ? ($.each(e, function(a, b) {
					g[b] === void 0 && (g[b] = 0)
				}), window.sessionStorage.getItem("player_pause") ? (window.sessionStorage.removeItem("player_pause"), Social.openOfferShareModal(g, d)) : Social.openShareModal(g, d, b.review_id || null, b.url || null, b.page_type || null), c.reject()) : c.resolve())
			}
			var e = ["vkontakte", "mailru", "facebook", "twitter", "odnoklassniki"],
				g = [];
			Object.size = function(a) {
				var b = 0,
					c;
				for (c in a) a.hasOwnProperty(c) && b++;
				return b
			};
			var i = 0;
			f.length == 0 ? h() : $.each(f, function(c, d) {
				b.project = d;
				$.ajax({
					url: a,
					data: b,
					dataType: "json"
				}).done(function(a) {
					g[d] = a.status;
					i += a.status
				}).fail(function() {
					g[d] = 0
				}).always(function() {
					h()
				})
			})
		});
		return c
	},
	shareOnSocialClick: function(a) {
		var b = Social.lastShareActionData;
		b.project = a;
		$.ajax({
			url: Social.lastShareActionUrl,
			data: b,
			dataType: "json"
		}).done(function(b) {
			b.status && Social.activateProjectButton(a)
		})
	},
	openOfferShareModal: function(a, b) {
		$("#popup-social-share").show();
		$("#action_button_share").click(function() {
			$("#action_button_share").unbind("click");
			$("#popup-social-share").hide();
			Social.openShareModal(a, b)
		})
	},
	openShareModal: function(a, b, d, c, f) {
		$(".jqmWindow").jqm().jqmHide();
		loadModal("social").done(function(h) {
			$(h).jqm({
				onHide: function() {
					d && c ? ($(".jqmWindow").hide(), ReviewsWatch.redirectToReview(d, c, f)) : $(".jqmWindow").hide()
				}
			}).jqmShow();
			for (var e in a) a.hasOwnProperty(e) && (a[e] && Social.activateProjectButton(e), a[e] || Social.deactivateProjectButton(e));
			b && $("#modal-social-what-they-know").html(b)
		})
	},
	activateProjectButton: function(a) {
		$("." + a + ".active").show();
		$("." + a + ".inactive").hide()
	},
	deactivateProjectButton: function(a) {
		$("." + a + ".active").hide();
		$("." + a + ".inactive").show()
	}
};
//public_html/js/compiled/editor.js
var editor = {
	doAddTags: function(b, c) {
		var a = document.getElementById("add-review-form-text");
		if (document.selection) {
			a.focus();
			var d = document.selection.createRange();
			d.text = b + d.text + c
		} else {
			var h = a.value.length,
				g = a.selectionStart,
				e = a.selectionEnd,
				f = a.scrollTop,
				i = a.scrollLeft,
				d = a.value.substring(g, e);
			a.value = a.value.substring(0, g) + (b + d + c) + a.value.substring(e, h);
			a.scrollTop = f;
			a.scrollLeft = i
		}
	},
	addUrl: function() {
		var b = document.getElementById("add-review-form-text"),
			c, a = prompt("Введите url:", "http://"),
			d = b.scrollTop,
			h = b.scrollLeft;
		a.match("^(www.)?(music.)?ivi.ru") && (a = "http://" + a);
		if (document.selection) b.focus(), c = document.selection.createRange(), c.text = c.text == "" ? '<a href="' + a + '">' + a + "</a>" : '<a href="' + a + '">' + c.text + "</a>";
		else {
			var g = b.value.length,
				e = b.selectionStart,
				f = b.selectionEnd;
			c = b.value.substring(e, f);
			c = c == "" ? a : b.value.substring(e, f);
			b.value = b.value.substring(0, e) + ('<a href="' + a + '">' + c + "</a>") + b.value.substring(f, g);
			b.scrollTop = d;
			b.scrollLeft = h
		}
	}
};
//public_html/js/compiled/sphinx.js
var search = [];
search.paging = function(containerID, blockSize) {
	var $moreItems = $("#" + containerID + " a.more-items");
	var refreshMoreItems = function() {
		if (!$moreItems.attr("rel")) $moreItems.hide()
	};
	refreshMoreItems();
	var lock = {
		locked: false,
		set: function() {
			if (this.locked) return false;
			this.locked = true;
			return true
		},
		free: function() {
			this.locked = false
		}
	};
	$moreItems.click(function(e) {
		if (e.ctrlKey || e.shiftKey) return true;
		if (!lock.set()) return false;
		jQuery.ajax({
			url: $moreItems.attr("href"),
			dataType: "json",
			data: {
				json: 1
			},
			success: function(resp) {
				var $list =
				$("#" + containerID + " > ul");
				$list[0].innerHTML += resp.serp;
				search.moreButton(resp, $moreItems);
				lock.free();
				search.onload()
			}
		});
		return false
	});
	function displayHidden() {
		var displayed = 0;
		document.location.hash = moreLink;
		moreLink = null;
		$items.each(function() {
			if (displayed < blockSize) {
				if (isHidden.test(this.className)) {
					this.className = this.className.replace(isHidden, "");
					displayed++
				}
			} else if (!moreLink) moreLink = this.id
		});
		refreshMoreItems()
	}
};
search.moreButton = function(resp, $moreItems) {
	if (resp.hasMore != 0) $moreItems.attr("href", $moreItems.attr("rel") + "&from=" + resp.hasMore);
	else $moreItems.hide()
};
search.misspell = function() {
	$("#misspell_fixed").click(function() {
		$("#q").val(this.innerHTML).focus();
		return false
	})
};
search.initDuration = function() {
	if (!($.browser.msie && parseInt($.browser.version, 10) <= 8)) cuSel({
		changedEl: "select#duration-filter",
		visRows: 7,
		scrollArrows: false
	})
};
search.form = function() {
	var $extended = $(".filters-extended");
	var resetForm = function() {
		$extended.find("input").attr("checked", 1);
		$(".duration").html(resetDuration);
		$("#duration-filter").val("");
		search.initDuration()
	};
	$("#search-filters-expander").click(function() {
		if ($extended.hasClass("disabled")) return false;
		$extended.toggleClass("expanded");
		if (!$extended.hasClass("expanded")) resetForm();
		return false
	});
	var resetDuration = $(".duration").html();
	search.initDuration();
	var $q = $("#q");
	var $form = $("#main_search_form");
	var $submit = $form.find('button[type="submit"]');
	var activeSubmit = function($input) {
		var $submit = $input.parents("form").find('button[type="submit"]');
		var validate = function() {
			if ($input.val().length == 0) $submit.attr("disabled", "disabled").addClass("disabled");
			else $submit.removeAttr("disabled").removeClass("disabled")
		};
		$input.change(validate).keyup(validate);
		validate();
		return validate
	};
	var queryChanged = activeSubmit($q);
	$(".clear").click(function() {
		$(".input-wrapper input").val("").focus();
		queryChanged()
	});
	$form.submit(function() {
		if (!$q.val().length) {
			alert("Пустой запрос");
			return false
		}
		return true
	});
	var filters = {
		"name": $("#search-name-filter"),
		"descr": $("#search-descr-filter"),
		"persons": $("#search-persons-filter")
	};
	var displayExtended = function() {
		if (!filters.descr.prop("checked") && !filters.name.prop("checked")) {
			$extended.addClass("disabled").removeClass("expanded");
			resetForm()
		} else $extended.removeClass("disabled")
	};
	displayExtended();
	for (key in filters) filters[key].change(displayExtended)
};
search.postload_persons = function() {
	$jspersons = $(".jspersons");
	if (!$jspersons.length) return null;
	var query = $(".jspersons").data("query");
	$.ajax({
		url: "/search/page",
		data: {
			q: query,
			select: "persons",
			fetchCount: 1,
			json: 1
		},
		dataType: "json",
		success: function(resp) {
			if (!resp.serp.length) return false;
			$jspersons.removeClass("jspersons");
			$("#search_report").append('и <a id="content_person_link" href="#persons">' + resp["count"]["total"] + " " + resp["count"]["plural"] + "</a>");
			var $list = $("#persons > ul");
			$list[0].innerHTML =
			resp.serp;
			$more = $jspersons.find(".more-items");
			$more.attr("rel", "/search/page?q=" + query + "&select=persons");
			search.moreButton(resp, $more)
		}
	})
};
search.onload = function() {
	$("#search-films-list > li").iviMoviePopup({
		"enableReverse": true
	});
	Runner.add_comming.init();
	$(".search-films-list").on("click", ".scale-rating ul li", function(e) {
		var rate = $(this).attr("class").replace("rate", "");
		var id = $(this).parent().attr("data-id");
		var div = $(this).parent().parent();
		addRate(id, rate, function(response) {
			if (response.error === undefined) {
				$("div", div).css("width", rate * 10 + "%");
				$(div).addClass("personal")
			}
		});
		e.preventDefault()
	});
	var findAndHighLight = function(element, query) {
		var $element = $(element);
		$element.each(function() {
			var $this = $(this);
			var val = $this.text();
			var highLightedVal = highLightSubstring(val, query);
			$this.html(highLightedVal)
		})
	};
	var query = $("#q").val();
	findAndHighLight(".films-gallery li strong > a", query);
	findAndHighLight(".persons-gallery li strong > a", query);
	findAndHighLight(".persons-list-description li h3 > a", query);
	findAndHighLight(".text h3 > a", query);
	findAndHighLight(".text .description p", query)
};
search.init = function(search_id) {
	var scrollToBlock = function(block, margin) {
		var offset = $(block).offset().top - calculateScrollOffset() - margin;
		$("html, body").animate({
			scrollTop: offset
		}, 600)
	};
	$("#content_anchor_link").click(function(e) {
		var margin = 15;
		var $best = $(".best-content");
		var $block = $best.length ? $best : $("#content");
		if ($block.length) scrollToBlock($block, margin);
		e.preventDefault()
	});
	$("#persons_anchor_link").click(function(e) {
		var margin = 15;
		var $best = $(".best-person");
		var $block = $best.length ? $best : $("#persons");
		if ($block.length) scrollToBlock($block, margin);
		e.preventDefault()
	});
	if (search_id) search.postload_persons();
	var recommendation = gravity.instance();
	search.paging("content");
	search.paging("persons");
	search.misspell();
	search.form();
	search.onload();
	$(".da_feed").da_feed({
		tpl: "#entity_item"
	});
	$(".gravity_similar").each(function() {
		var settings = da.settings.attr(this, "gravity");
		settings.target = $(this);
		var uniqueItem = new UniqueItem({
			itemId: settings.target.data("id"),
			itemType: settings.target.data("type")
		});
		recommendation.parseParams(settings);
		recommendation.fetch(gravity.scenarios.item_page, settings.get("limit", 5), {
			CurrentItemId: uniqueItem.getUniqueId()
		}, gravity.ids(da.feed.fromSphinxIds({
			render: function(item, recommendationId) {
				var $element = da.feed.render({
					target: settings.target,
					tpl: da.feed.jqtpl("#entity_item")
				})(item);
				gravity.setRecommendationClickEvent($element, recommendationId)
			},
			error: da.feed.hideparent(this)
		})))
	});
	watching_now_carousel_init()
};
//public_html/js/compiled/jquery.promoCarousel.js
jQuery.fn.promoCarousel = function(c) {
	var d = $(this),
		h = {},
		i = {},
		j = {},
		a = {
			carousel: null,
			previewItemsCount: 0,
			delta: 0,
			relationOfItems: [],
			imagesLoaded: 0,
			init: function() {
				a.previewItemsCount = d.find("li").size();
				replaceSwf(c.imagesEl.find("a"));
				if (!c.start) c.start = 1;
				var b = ".item" + c.start,
					k = ".item-" + c.start;
				d.find(b).parent().addClass("active");
				c.imagesEl.find(k).fadeIn(c.animation);
				c.infoEl.find(b).length && c.infoEl.find(b).css("display", "block").addClass("active");
				c.imagesEl.find(k + " object").length || c.infoEl.parent().fadeIn("fast");
				a.previewItemsCount > 1 && (d.parent().fadeIn("fast"), d.jcarousel(c))
			},
			tryCarousel: function() {
				++a.imagesLoaded;
				d.jcarousel(c)
			},
			setButtonPrev: function(b) {
				typeof c.buttonPrev != "undefined" && (b > 1 ? (c.buttonPrev.find("a:first").click(function() {
					a.carousel.prev();
					return !1
				}), c.buttonPrev.css("display", "block")) : c.buttonPrev.css("display", "none"))
			},
			setButtonNext: function(b) {
				typeof c.buttonNext != "undefined" && (b > 1 ? (c.buttonNext.find("a:first").click(function() {
					a.carousel.next();
					return !1
				}), c.buttonNext.css("display", "block")) : c.buttonNext.css("display", "none"))
			},
			resizePreviewFrame: function(b) {
				if (c.vertical) {
					var a = d.find("li:first").outerHeight(!0);
					d.parent().css("height", b * a)
				} else a = d.find("li:first").outerWidth(!0), d.parent().css("width", b * a)
			},
			getDelta: function(b) {
				return b > c.maxPreviewItems ? Math.floor(c.maxPreviewItems / 2) : Math.floor(b / 2)
			},
			previewClickCallback: function(b) {
				b = parseInt(b.attr("class").substr(4));
				a.carousel.scroll(a.relationOfItems[b])
			},
			afterFrameHover: function() {
				a.carousel.stopAuto()
			},
			afterFrameLive: function() {
				a.carousel.startAuto()
			},
			clearActivePreview: function() {
				d.find("li.active").removeClass("active")
			},
			setActivePreview: function(b) {
				typeof b != "undefined" && d.find("li .item" + b).parent().addClass("active")
			},
			getCenterItemClass: function(b) {
				return (b + a.previewItemsCount * 1E3 - 1) % a.previewItemsCount + 1
			},
			pixelAuditBeforeAnimation: function(b) {
				if (typeof j[b] == "undefined") {
					j[b] = !0;
					var a = c.imagesEl.find(".item-" + b + " span:first");
					h[b] = a.attr("pixel") !== !1 ? a.attr("pixel") : !1;
					i[b] = a.attr("adriver") !== !1 ? a.attr("adriver") : !1;
					a.remove()
				}
			},
			pixelAuditAfterAnimation: function(b) {
				if (h[b] !== "") {
					var a = new Image;
					$(a).attr("src", h[b])
				}
				i[b] && (a = new Image, $(a).attr("src", i[b] + Math.round(Math.random() * 1E9)))
			},
			jCarouselInitCallback: function(b) {
				a.carousel = b;
				a.setButtonPrev(a.previewItemsCount);
				a.setButtonNext(a.previewItemsCount);
				a.previewItemsCount <= 1 ? (b.stopAuto(), d.css("display", "none")) : (a.delta = a.getDelta(a.previewItemsCount), a.resizePreviewFrame(a.previewItemsCount), d.find("a").bind("click", function() {
					a.previewClickCallback($(this));
					return !1
				}), c.frame.hover(function() {
					a.afterFrameHover()
				}, function() {
					a.afterFrameLive()
				}))
			},
			getCircularItemRelations: function(b, a, d, e) {
				var f = parseInt(b.find("a:first").attr("class").substr(4)),
					b = 0;
				a -= e;
				for (e = []; f <= d; f++) e[f] = a++, b++;
				for (f = 1; b < c.maxPreviewItems && b < d;) e[f++] = a++, b++;
				return e
			},
			jCarouselCallbackBeforeAnimation: function(b, d, g, e) {
				b = a.getCenterItemClass(g);
				a.pixelAuditBeforeAnimation(b);
				e != "init" && (a.clearActivePreview(), c.beforeAnimationCallback(b));
				a.relationOfItems = a.getCircularItemRelations($(d), g, a.previewItemsCount, a.delta);
				$(".promo-top .images li:first object").length == 1 && $(".promo-top .info .item1").hide()
			},
			jCarouselCallbackAfterAnimation: function(b, c, d, e) {
				b = a.getCenterItemClass(d);
				a.pixelAuditAfterAnimation(b);
				e != "init" && a.setActivePreview(b)
			},
			userCallbackBeforeAnimation: function(a) {
				var d = c.imagesEl.find("li.item-" + a),
					g = c.imagesEl.find("li:not(:hidden)"),
					e = g.css("z-index");
				g.css("z-index", e - 1);
				d.fadeIn(c.animation, function() {
					g.hide();
					g.css("z-index", e)
				});
				var f = $(".promo-top .info div.active");
				f.fadeOut("slow").hide();
				d.length && d.find("object").length ? ($(".promo-top .wrapped-info").fadeOut("slow").hide(), $(".promo-top .info .item" + a).addClass("active"), f.removeClass("active")) : ($(".promo-top .wrapped-info").fadeIn("slow"), $(".promo-top .info .item" + a).fadeIn("slow", function() {
					$(this).addClass("active");
					f.removeClass("active")
				}))
			}
		},
		c = jQuery.extend({
			vertical: !1,
			scroll: 1,
			auto: 10,
			animation: "slow",
			wrap: "circular",
			maxPreviewItems: 5,
			initCallback: a.jCarouselInitCallback,
			itemFirstInCallback: {
				onBeforeAnimation: a.jCarouselCallbackBeforeAnimation,
				onAfterAnimation: a.jCarouselCallbackAfterAnimation
			},
			beforeAnimationCallback: a.userCallbackBeforeAnimation
		}, c);
	a.init()
};
//public_html/js/compiled/recommendation.js
var _gravity = _gravity || [],
	gravity = {
		merchantId: null,
		userId: null,
		recommendationMainCount: 6,
		recommendation404Count: 6,
		recommendationGenreCount: 9,
		localStorage: "gravityRecommends",
		itemTypes: {
			content: "Content",
			compilation: "ContentCompilation"
		},
		commentItemTypes: {
			3: "content",
			4: "compilation"
		},
		reviewItemTypes: {
			2: "compilation"
		},
		scenarios: {
			main_page: "MAIN_PAGE",
			main_page_similar: "MAIN_PAGE_SIMILAR",
			catalog_page: "CATEGORY_PAGE",
			item_page: "ITEM_PAGE",
			main_gender_age: "MAIN_GENDER_AGE"
		},
		events: {
			view: "VIEW",
			add: "ADD_TO_FAVORITES",
			remove: "REMOVE_FROM_FAVORITES",
			rating: "RATING",
			recommend: "REC_CLICK",
			comment: "COMMENT",
			free: "FREE_VIEW",
			paid: "PAID_VIEW",
			subscription: "SUBSCRIPTION_VIEW",
			share: "SHARE"
		},
		cookieName: "gr_reco",
		recommendationIdTimeout: 30,
		getPageViewTimeout: function() {
			return window.da_settings.gravity.page_view_timeout * 1E3
		},
		init: function() {
			this.merchantId = String(window.da_settings.GRAVITY_merchant);
			var b = function() {
				typeof IviStore != "undefined" ? (this.userId = String(IviStore.user_id), this.userId != "null" && this.userId != "undefined" && _gravity.push({
					type: "set",
					userId: this.userId
				})) : setTimeout(b, 50)
			};
			b();
			_gravity.push({
				type: "set",
				merchantId: String(this.merchantId)
			});
			_gravity.push({
				type: "set",
				useJsGeneratedCookie: !0
			})
		},
		instance: function() {
			var b = gravity;
			return {
				itemId: null,
				itemType: null,
				isPaid: !1,
				isFree: !1,
				isSubscription: !1,
				gravityRecommendationId: null,
				parseParams: function(a) {
					if (typeof a != "object") return !1;
					this.itemId = typeof a.videoId != "undefined" && parseInt(a.videoId) > 0 ? String(a.videoId) : String(a.compilationId);
					if (typeof a.itemType != "undefined") this.itemType = a.itemType;
					else if (typeof a.contentType != "undefined") this.itemType = a.contentType == "compilation" ? b.itemTypes.compilation : b.itemTypes.content;
					typeof a.is_paid != "undefined" && a.is_paid == !0 ? typeof a.is_tvod != "undefined" ? this.isPaid = !0 : this.isSubscription = !0 : this.isFree = !0
				},
				doEvent: function(a, c, d, f, e) {
					a = a || !1;
					d = d || this.itemId;
					f = f || this.itemType;
					e = e || this.restoreRecommendationId(d, f);
					c = c || !1;
					if (d === null || parseInt(d) <= 0) return !1;
					var d = b.getUniqueItemId(d, f),
						g = {
							type: "event"
						};
					g.eventType =
					a;
					g.itemId = String(d);
					g.itemType = f;
					e && (g.recommendationId = e);
					if (c) for (var h in c) g[h] = c[h];
					_gravity.push(g)
				},
				actionView: function() {
					this.doEvent(b.events.view, null, null, null)
				},
				actionWatch: function(a) {
					var b = this.isPaid,
						d = this.isSubscription;
					typeof a == "object" && (b = a.isPaid || b, d = a.isSubscription || d);
					b ? this.actionPaidWatch() : d ? this.actionSubscriptionWatch() : this.actionFreeWatch()
				},
				actionPaidWatch: function(a) {
					a = a || this.restoreRecommendationId();
					this.doEvent(b.events.paid, null, null, null, a)
				},
				actionSubscriptionWatch: function(a) {
					a =
					a || this.restoreRecommendationId();
					this.doEvent(b.events.subscription, null, null, null, a)
				},
				actionFreeWatch: function(a) {
					a = a || this.restoreRecommendationId();
					this.doEvent(b.events.free, null, null, null, a)
				},
				actionComment: function() {
					this.doEvent(b.events.comment)
				},
				restoreRecommendationId: function(a, c) {
					a = a || this.itemId;
					c = c || this.itemType;
					if (!this.gravityRecommendationId) this.gravityRecommendationId = b.getRecommendationId(a, c), b.clearOldRecommendationIds();
					return this.gravityRecommendationId
				},
				fetch: function(a, c, d, f) {
					d = d || {};
					if (this.itemId && this.itemType) {
						var e = b.getUniqueItemId(this.itemId, this.itemType);
						d.CurrentItemId = e
					}
					b.fetch(a, c, d, f)
				},
				storeGravityRecommendationId: function(a) {
					this.gravityRecommendationId = a
				}
			}
		},
		actionRecClick: function(b, a, c, d) {
			var f = this.getUniqueItemId(b, a);
			(new DeferredStorage).bind("gravity_rec_click", {
				itemId: b,
				itemType: a,
				recommendationId: c,
				wsource: d
			});
			Lawnchair({}, function() {}).get(gravity.localStorage, function(a) {
				a = a !== null && a.items !== void 0 ? a.items : {};
				a[f] = {
					date: new Date,
					recommendationId: c
				};
				this.save({
					key: gravity.localStorage,
					items: a
				})
			})
		},
		actionRate: function(b, a) {
			this.instance().doEvent(this.events.rating, {
				Value: a
			}, b, this.itemTypes.content)
		},
		actionAdd: function(b, a) {
			a = this.itemTypes[a] || this.itemTypes.content;
			this.instance().doEvent(this.events.add, null, b, a)
		},
		actionRemove: function(b, a) {
			a = this.itemTypes[a] || this.itemTypes.content;
			this.instance().doEvent(this.events.remove, null, b, a)
		},
		getItemType: function(b) {
			if (typeof b != "object") return null;
			var a = !1;
			b.comment !== void 0 && this.commentItemTypes[b.comment] !== void 0 ? a = this.commentItemTypes[b.comment] : b.review !== void 0 && this.reviewItemTypes[b.review] !== void 0 && (a = this.commentItemTypes[b.review]);
			if (a) return this.itemTypes[a];
			return null
		},
		getUniqueItemId: function(b, a) {
			return getUniqueId(b, a)
		},
		parseClientResult: function(b) {
			for (var a = [], c = 0; c < b.items.length; c++) a[c] = b.items[c].CompilationId !== void 0 && parseInt(b.items[c].itemid) > 0 ? b.items[c].CompilationId : b.items[c].itemid;
			return a
		},
		showRecommendation: function(b, a, c, d, f, e) {
			gravity.fetch(b, c, e || {}, this.ids(function(b, e) {
				d.length && $.ajax({
					url: "/video/ajax/recommendation",
					type: "POST",
					dataType: "html",
					data: {
						ids: b,
						page: a,
						limit: c
					},
					success: function(a) {
						d.append(a);
						gravity.setRecommendationClickEvent(d, e);
						typeof f == "function" && f(d)
					}
				})
			}))
		},
		fetchExplanations: function(b, a, c) {
			var d = $.Deferred();
			_gravity.push({
				type: "explanation",
				numberLimit: 3,
				scenarioId: b,
				recommendationId: a,
				recommendedItemIds: c,
				resultNames: ["itemid", "Url", "Categories"],
				callback: function(a) {
					$.ajax({
						url: "/recommendation/explanation",
						dataType: "json",
						type: "post",
						data: {
							items: a
						},
						success: function(a) {
							d.resolveWith(a, [c])
						}
					})
				}
			});
			return d
		},
		ids: function(b) {
			return function(a) {
				if (a.items !== void 0 && a.items.length > 0) {
					var c = gravity.parseClientResult(a);
					c && c.length > 0 && b(c, a.recommendationId)
				}
			}
		},
		fetch: function(b, a, c, d) {
			c = c || {};
			b = {
				type: "recommendation",
				scenarioId: b,
				numberLimit: a,
				resultNames: ["ItemId", "CompilationId"],
				callback: function(a) {
					d(a)
				}
			};
			jQuery.extend(b, c);
			_gravity.push(b)
		},
		fetch_group: function(b, a, c, d, f) {
			for (var e = [], g = 0; g < c; g++) e.UserTagNumber = Number(g), e.groupId =
			d, e.groupSize = Number(c), e.groupSeq = Number(g) + 1, gravity.fetch(b, a, e, f)
		},
		setRecommendationClickEvent: function(b, a) {
			if (b.length) {
				var c = $(b),
					c = c.hasClass("recommended_element") ? c : $(b).find("li.recommended_element"),
					c = c.not(".recommended_action_set");
				c.each(function(b, c) {
					var e = $(c),
						g = e.data("type"),
						h = e.data("id"),
						j = e.data("unique-id"),
						i = new UniqueItem({
							itemType: g,
							itemId: h,
							uniqueId: j
						});
					e.on("click", "a.view_link", function() {
						gravity.actionRecClick(i.getItemId(), gravity.itemTypes[i.getItemType()], a, $(this).parents("[data-wsource]").data("wsource"))
					})
				});
				c.addClass("recommended_action_set")
			}
		},
		showMainRecommendation: function(b, a) {
			this.showRecommendation(this.scenarios.main_page, "main", this.recommendationMainCount, $("#" + b), a)
		},
		show404Recommendation: function(b, a) {
			this.showRecommendation(this.scenarios.main_page, "404", this.recommendation404Count, $("#" + b), a)
		},
		showGenreRecommendation: function(b, a, c, d) {
			var b = $("#" + b),
				f = f || {};
			a !== void 0 && a.length > 0 && (f["Filter.Categories"] = a);
			c !== void 0 && c.length > 0 && (f["Filter.Genres"] = c);
			this.showRecommendation(this.scenarios.catalog_page, "catalog", this.recommendationGenreCount, b, d, f)
		},
		getRecommendationId: function(b, a) {
			var c = this.getUniqueItemId(b, a),
				d = null;
			Lawnchair({}, function() {}).get(this.localStorage, function(a) {
				if (a !== null && a.items !== void 0 && a.items[c] !== void 0) d = a.items[c].recommendationId
			});
			return d
		},
		clearOldRecommendationIds: function() {
			Lawnchair({}, function() {}).get(this.localStorage, function(b) {
				if (b !== null && b.items !== void 0) {
					var a = (new Date).valueOf() - 864E5 * gravity.recommendationIdTimeout,
						c;
					for (c in b.items)(new Date(b.items[c].date)).valueOf() < a && delete b.items[c];
					this.save({
						key: gravity.localStorage,
						items: b.items
					})
				}
			})
		}
	};
gravity.init();
var recommendation = gravity.instance();
$(document).on("gravity_rec_click", function(b, a) {
	var c = a.getData();
	gravity.instance().doEvent(gravity.events.recommend, null, c.itemId, c.itemType, c.recommendationId);
	a.success()
});
//public_html/js/compiled/tagpair.js
da.tagPair = {
	refresh_counter: 0,
	page: "",
	steps: [1, 1, 1],
	callCount: 0,
	pairCount: 6,
	pairItemsCount: 56,
	blockSetupSurvey: "#subtab_recommended_tagpairs div div.block-head div.text span",
	blockClose: "#subtab_recommended_tagpairs div span.link-close",
	blockMain: "div#subtab_recommended_tagpairs",
	init: function(a, b) {
		da.tagPair.page = a;
		da.tagPair.initRefreshCounter();
		da.tagPair.setupInitVars();
		da.tagPair.wsource = b || null;
		gravity.fetch_group("MAIN_PAGE_TAG", da.tagPair.pairItemsCount, da.tagPair.pairCount, "tag_pair", da.tagPair.recomentadions)
	},
	initRefreshCounter: function() {
		if (window.localStorage !== void 0) {
			da.tagPair.refresh_counter = localStorage.getItem("refresh_counter");
			if (da.tagPair.refresh_counter === null) da.tagPair.refresh_counter = 0;
			parseInt(da.tagPair.refresh_counter) < 2 ? localStorage.setItem("refresh_counter", parseInt(da.tagPair.refresh_counter) + 1) : localStorage.setItem("refresh_counter", 0)
		} else da.tagPair.refresh_counter = 0
	},
	setupInitVars: function() {
		if (da.tagPair.page === "main") da.tagPair.pairItemsCount = 56, da.tagPair.steps = [1, 2, 3], da.tagPair.pairCount =
		2 * (1 + parseInt(da.tagPair.refresh_counter))
	},
	recomentadions: function(a) {
		if (a === void 0 || a.items.length == 0) return !1;
		var b = da.tagPair.initPairData(a);
		if (da.tagPair.page === "main" && b.index <= parseInt(da.tagPair.refresh_counter) * 2) return !1;
		b.page = da.tagPair.page;
		$.ajaxq("tagpair", {
			url: "/recommendation/ajax/draw/tag/pair/block",
			data: {
				params: b
			},
			dataType: "html",
			success: function(c) {
				var d = [];
				$(da.tagPair.blockMain).append(c);
				da.tagPair.initEvents();
				for (c = 0; c < a.items.length; ++c) d[d.length] = a.items[c].itemid;
				da.tagPair.show(d, b.index, a.recommendationId)
			}
		})
	},
	initPairData: function(a) {
		da.tagPair.callCount++;
		return {
			index: da.tagPair.callCount,
			tag1: a.items[0].selectedtag1,
			tag2: a.items[0].selectedtag2,
			wsource: da.tagPair.wsource || ""
		}
	},
	initEvents: function() {
		$(da.tagPair.blockClose).click(function(a) {
			(typeof $(a.target) == "undefined" ? $(a.srcElement) : $(a.target)).parent().remove();
			return !1
		});
		$(da.tagPair.blockSetupSurvey).click(function() {
			$("html, body").animate({
				scrollTop: 0
			}, "fast");
			$("#subtab-adjust-link").trigger("click")
		})
	},
	show: function(a, b, c) {
		$("#tag-pair-" + b).videoBlock({
			count: 0,
			action: "tagpair",
			limit: 8,
			steps: da.tagPair.steps,
			ids: function(b, c) {
				return a.slice(b, b + c)
			},
			hide_empty_block: !0,
			callback: function(a) {
				gravity.setRecommendationClickEvent(a, c)
			}
		})
	},
	parseTag: function(a) {
		if (a !== void 0 && (a = a.split(":"), a.length == 2)) return a[1]
	}
};
//public_html/js/compiled/fastSearch.js
var FastSearch = function() {
	var a = this;
	this.url = "/search/ajax/new/autocomplete";
	this.$input = $("#search-text");
	this.query = "";
	this.$searchBox = $("#fast_search_result");
	this.regExp = /.{2,}|[0-9]/;
	this.cache = [];
	this.hideResults = function() {
		a.$searchBox.html("").hide()
	};
	this.showResultsByJson = function(b) {
		b.content_count = b.content.length;
		b.person_count = b.person.length;
		b.total = b.content_count + b.person_count;
		b.query = a.query;
		a.hideResults();
		a.$searchBox.append(a.replaceText($.tmpl($("#content_autocomplete").template(), b)));
		a.$searchBox.show()
	};
	this.replaceText = function(b) {
		b.find(".object-name").each(function() {
			$(this).html($(this).html().replace(RegExp("(" + a.query + ")", "ig"), "<strong>$1</strong>"))
		});
		return b
	};
	this.showResults = function() {
		a.cache[a.query] ? a.showResultsByJson(a.cache[a.query]) : $.ajax({
			url: a.url,
			data: {
				q: a.query,
				json: 1
			},
			dataType: "json",
			success: function(b) {
				a.cache[b.query] = b;
				b.query == a.query && a.showResultsByJson(b)
			}
		})
	};
	this.keyUp = function(b) {
		a.hideResults();
		if (b.keyCode != 27) a.query = a.$input.val(), a.regExp.test(a.query) && a.showResults()
	};
	this.createEvents = function() {
		$("body").click(function() {
			a.hideResults()
		});
		a.$searchBox.click(function(a) {
			a.stopPropagation()
		});
		a.$input.focus(function() {
			a.hideResults()
		});
		a.$input.keyup(a.keyUp);
		$("#fast_search_submit").click(function() {
			a.$input.focus()
		});
		$("#fast_search_form").submit(function() {
			if (!a.$input.val()) return !1
		})
	}
};
//public_html/js/compiled/runner.js
var Runner = {
	videoId: null,
	user_id: null,
	carouselCorr: null,
	carouselItemsCount: null,
	nextVideoLink: null,
	wolf_experiment_id: 103304,
	tvod: function() {
		var a = new Rotation("tvod_rotate_collection", 9, 3);
		a.showElements($("#genre-new-items li.rotate-items"));
		a.showElements($("#genre-popular-items li.rotate-items"));
		a.rotate();
		ratingSelector({
			selector: ".ratings_selector",
			tpl: "html_genre_films_xlist_block_item_with_img",
			count: 5
		});
		$("body.plus-promo-page .promo-top").plusPromo({
			buttons: ".tab-buttons",
			images: ".images",
			infos: ".info",
			isCircular: !0,
			autoSwitchInterval: 7,
			start: get_carousel_start_position($("body.plus-promo-page .promo-top .images ul"), "premieres-promo")
		});
		plus_promo();
		$("#plus_promo_catalog div.scale-rating li").live("click", Runner.onRate);
		$("#genre-new-items div.scale-rating li").click(Runner.onRate);
		$("#genre-popular-items div.scale-rating li").click(Runner.onRate)
	},
	persons: function(a) {
		textExpander(".text-persons", 72);
		var b = $(".content-bottom");
		b.find("ul").hide();
		if (b.find("strong a").html() == 1) {
			var c =
			b.find("a"),
				e = c[c.length - 2].textContent,
				d = 1,
				f = b.offset().top;
			$(window).scroll(function() {
				if (d > e) return b.hide(), !0;
				var a = $(document.body).height();
				$(document).scrollTop() > f - a - 100 && h()
			});
			var g = !1,
				h = function() {
					if (!g) return d += 1, g = !0, $.ajax({
						url: a,
						data: {
							spage: d,
							ajax: 1
						},
						dataType: "html",
						success: function(a) {
							$("#persons").append(a);
							f = b.offset().top;
							g = !1
						}
					}), !1
				}
		}
	},
	onRate: function(a) {
		var b = $(this).parent().attr("data-id"),
			c = $(this).attr("class").replace("rate", ""),
			e = $(this).parent().parent();
		addRate(b, c, function(a) {
			typeof a.error == "undefined" && ($("div", e).css("width", c * 10 + "%"), $(e).addClass("personal"))
		});
		a.preventDefault()
	},
	common: function() {
		(new DeferredStorage).trigger();
		(new Event).track();
		(new FastSearch).createEvents();
		$("#search-text").dynamicInput();
		$(document).bind("ivi:favourites:add", function() {
			incCounter("#user_menu_show_favourites_items_count") > 0 && $("#user-menu-favourites").show()
		});
		$(document).bind("ivi:favourites:remove", function() {
			decCounter("#user_menu_show_favourites_items_count") <= 0 && $("#user-menu-favourites").hide()
		});
		$("#recommend-notice > .close").live("click", function(a) {
			$(a.target).hasClass("fadeout") || $("#recommend-notice").remove();
			$.post("/survey/set/survey/declined");
			removeBodyPlateClass();
			return !1
		});
		isIE7() && $(".recommended ul.items > li > a:first-child").each(function(a, d) {
			$(d).find("img").click(function() {
				location.href = d.href
			})
		});
		isLoggedIn() && $("body").click(function(a) {
			var a = $(a.target),
				d = $("#user-menu");
			if (a.attr("id") == "user-menu-link") return d.toggle(), !1;
			else d.hide()
		});
		var a = window.sessionStorage || null;
		if (a) {
			var b = $.getUrlVar("utm_campaign");
			b == "ad1" ? a.setItem("ad1", 1) : b == "adonweb" ? a.setItem("adonweb", 1) : b == "CityAds" ? (a.setItem("cityads", 1), b = $.getUrlVar("prx"), b != void 0 && /^[0-9a-z_]{1,32}$/i.test(b) && a.setItem("cityads_prx", b), b = $.getUrlVar("click_id"), b != void 0 && /^[0-9a-z_]{1,64}$/i.test(b) && a.setItem("cityads_click_id", b)) : b == "luxup" ? a.setItem("luxup", 1) : b == "CityAdsMult" && (b = $.getUrlVar("prx"), b != void 0 && /^[0-9a-z_]{1,32}$/i.test(b) && setCookie("cityadsmult", b, 30), b = $.getUrlVar("click_id"), b != void 0 && /^[0-9a-z_]{1,64}$/i.test(b) && setCookie("cityadsmult_click", b, 30));
			a.getItem("just_registered") && (a.removeItem("just_registered"), openModal("social_register"))
		}
		daAuth.initSettings();
		a = (new Date).getFullYear();
		$("#copyright").html("Copyright &copy; 2010—" + a + " ivi media.");
		$("ul#nav-top li").hover(function() {
			$(this).find("div.hid-nav").stop(!0, !0).show();
			$(this).addClass("selected");
			$(this).hasClass("selected") && $(this).find("a").addClass("selected");
			$("li.selected").prev().addClass("no-bg")
		}, function() {
			$(this).removeClass("selected");
			$(this).find("div.hid-nav").hide();
			$(this).find("a").removeClass("selected");
			$("li").removeClass("no-bg")
		});
		$(".tooltip .close").live("click", function() {
			$(this).parent().hide();
			return !1
		});
		$("#want-recommends").click(function(a) {
			openModal("auth");
			a.preventDefault()
		});
		$(window).on("click", ".support_btn", function() {
			window.open("http://ivi.333.kg/");
			return !1
		});
		a = ["reg"];
		(b = function(a) {
			if (!a) return null;
			for (var a = a.split("#"), d = [], b = 0; b < a.length; b++) a[b] != "" && d.push(a[b]);
			if (d.length == 0) return null;
			return d[0]
		}(window.location.hash)) && $.inArray(b, a) != -1 && openModal(b);
		if (isLoggedIn()) {
			var c = Lawnchair({}, function() {});
			afterLoginRedirect(c);
			var e = this.videoId || null;
			c.get("user_id", function(a) {
				a && a.value ? Runner.user_id = a.value : (a = Math.random(0.001, 0.999) * (new Date).getTime(), c.save({
					key: "user_id",
					value: a
				}))
			});
			c.get("addfavorites", function(a) {
				if (a && a.ids) {
					for (var a = a.ids, d = 0; d < a.length; d++) Favorites.addFavorite(a[d].id, a[d].type, function(a) {
						if (a && !a.error) if (Runner.currentPage == "video") {
							if (e && a.content_id && a.content_id === e) {
								var d = $("#add-favorite");
								parseInt(a.status) == 1 ? $(d).addClass("active") : $(d).removeClass("active");
								a.text && $(d).find("span").text(a.text)
							}
						} else Runner.currentPage == "watch" ? e && a.content_id && a.content_id === e && (d = $("#button-favorite"), parseInt(a.status) == 1 ? ($(d).addClass("active"), $(d).text("Удалить из очереди")) : ($(d).removeClass("active"), $(d).text("Добавить в очередь"))) : (d = a.content_id ? $(".element-selector[data-type='content'][data-id='" + a.content_id + "'] a.fav") : $(".element-selector[data-type='compilation'][data-id='" + a.compilation_id + "'] a.fav"), $(d).text(a.text), typeof a.subscribed != "undefined" && (a.subscribed === 1 ? $("a.subscribe", $(d).parent()).addClass("active").text(a.subscribe_text) : $("a.subscribe", $(d).parent()).removeClass("active").text(a.subscribe_text)), typeof a.status != "undefined" && (a.status == 1 ? $(d).addClass("active") : $(d).removeClass("active")))
					}, a[d].subscribe);
					c.remove("addfavorites")
				}
			})
		}
		if (a = getCookie("auth_popup")) a = $.parseJSON(unescape(a)), c = Lawnchair({}, function() {}), eraseCookie("auth_popup"), a.profile_tab !== void 0 && c.save({
			key: "after_login_profile_redirect",
			value: a.profile_tab
		}), openModal("auth");
		var d = window.external && "msIsSiteMode" in window.external && window.external.msIsSiteMode();
		(function() {
			if (d) {
				window.external.msSiteModeCreateJumplist("Популярное");
				window.external.msSiteModeClearJumplist();
				for (var a = ie_items, b = a.length - 1; b >= 0; b--) window.external.msSiteModeAddJumpListItem(a[b].name, a[b].url, "/images/da/img/2_ivicon.ico");
				window.external.msSiteModeShowJumplist()
			}
		})();
		$(document.body).on("click", ".erotic_link", function(a) {
			showPopupErotic(a);
			return !1
		});
		$(document.body).on("click", "#confirm-email-button", function() {
			$.cookie("hide_email_notice_" + IviStore.user_id, 1, {
				expires: 7,
				path: "/"
			});
			$(this).parent(".plate-notices").remove();
			removeBodyPlateClass();
			$("#tabs-menu_profile").find("a[href*='/#personal']").click()
		});
		$("#register-plate-email").dynamicInput();
		(function() {
			$(window).on("click", "[data-wsource] a[href*='/watch/'],[data-wsource] a[href*='/person/'],[data-wsource] a[href*='/podborki/']", function() {
				var a = $(this).parents("[data-wsource]").attr("data-wsource");
				saveRecommendationSourse(a)
			});
			var a = Lawnchair({}, function() {}),
				d = function(d) {
					a.get("showBlocks", function(b) {
						b = b || {
							value: []
						};
						b.value.push(d);
						a.save({
							key: "showBlocks",
							value: b.value
						})
					})
				},
				b = [],
				e = function() {
					$("[data-wsource]").each(function() {
						var a = $(this).attr("data-wsource");
						$(window).scrollTop() + $(window).height() >= $(this).offset().top && $(this).is(":visible") && $.inArray(a, b) == -1 && (b.push(a), d(a))
					})
				};
			$(window).on("show", "[data-wsource]", e());
			e();
			$(window).scroll(e)
		})();
		a = function() {
			var a = !1,
				d = '<div id="oldbrowser-warning" class="oldbrowser-warning"><div class="inner">';
			$.browser.msie ? (a = parseInt($.browser.version), d += "Вы используете морально устаревший браузер Internet Explorer " + a + '. Наш сайт его поддерживает лишь частично. <br />Чтобы получить доступ ко всем возможностям, загрузите и установите один из этих браузеров:<ul><li class="first"><a href="/away/?url=http%3A%2F%2Fwindows.microsoft.com%2Fru-RU%2Finternet-explorer%2Fdownloads%2Fie&amp;crc=c37d3584d8cfa513d1e35f182d7b09a1" title="" target="_blank">Internet Explorer ' + (a < 7 ? 8 : 9) + '</span></a></li><li><a href="/away/?url=http%3A%2F%2Fwww.opera.com%2Fdownload%2F&amp;crc=e6e95e0508303ec3f59f77e90e156eed" title="" target="_blank">Opera</a></li><li><a href="/away/?url=http%3A%2F%2Fwww.mozilla-europe.org%2Fru%2Ffirefox%2F&amp;crc=278fc320c70ce285f7c456a0f22dfe20" title="" target="_blank">Mozilla Firefox</a></li><li><a href="/away/?url=http%3A%2F%2Fwww.google.com%2Fchrome%2F&amp;crc=c64eb26eb09b76e69306e5b5cdf3bea9" title="" target="_blank">Google Chrome</a></li><li class="last"><a href="/away/?url=http%3A%2F%2Fwww.apple.com%2Fru%2Fsafari%2Fdownload%2F&amp;crc=0099412e704b18fe69346ad164030b6e" title="" target="_blank">Safari</a></li></ul>', a = !0) : $.browser.opera && (d += 'Вы используете устаревший браузер Opera. Вы сможете в полной мере воспользоваться всеми функциями ivi.ru, однако некоторые элементы дизайна могут отображаться некорректно. Мы рекомендуем вам обновить Opera, либо установить один из этих браузеров:<ul><li class="first"><a href="/away/?url=http%3A%2F%2Fwww.opera.com%2Fdownload%2F&amp;crc=e6e95e0508303ec3f59f77e90e156eed" title="" target="_blank">Opera (новая версия)</a></li><li><a href="/away/?url=http%3A%2F%2Fwindows.microsoft.com%2Fru-RU%2Finternet-explorer%2Fdownloads%2Fie&amp;crc=c37d3584d8cfa513d1e35f182d7b09a1" title="" target="_blank">Internet Explorer 9</a></li><li><a href="/away/?url=http%3A%2F%2Fwww.mozilla-europe.org%2Fru%2Ffirefox%2F&amp;crc=278fc320c70ce285f7c456a0f22dfe20" title="" target="_blank">Mozilla Firefox</a></li><li><a href="/away/?url=http%3A%2F%2Fwww.google.com%2Fchrome%2F&amp;crc=c64eb26eb09b76e69306e5b5cdf3bea9" title="" target="_blank">Google Chrome</a></li><li class="last"><a href="/away/?url=http%3A%2F%2Fwww.apple.com%2Fru%2Fsafari%2Fdownload%2F&amp;crc=0099412e704b18fe69346ad164030b6e" title="" target="_blank">Safari</a></li></ul>', a = !0);
			a && (d += '<span id="oldbrowser-warning-close" class="oldbrowser-warning-close">x</span></div></div>', $("body").prepend(d), $("#oldbrowser-warning-close").click(function() {
				$(this).parents("#oldbrowser-warning").hide()
			}))
		};
		isOldBrowser({
			mozilla: 14,
			opera: 12,
			msie: 9
		}) && ($.cookie("is_old_browser") || (Payment.isRussianIP() ? Runner.showChromePopup("is_old_browser", 3) : a()));
		$("body");
		var f = $(".header-opacity"),
			b = $(".main-nav", f),
			a = b.children("li"),
			b = b.find(".subitems-wrapper"),
			g = $(".ac_results"),
			h = $("#user-menu", f),
			k = b.add(g).add(h),
			j = function() {
				if (!f.hasClass("static")) {
					var a = 38,
						d = $(".plate-notices");
					d.length && (a += d.height());
					a = headerOpacityValue(a);
					f.css("background-color", "rgba(0, 0, 0, " + a + ")")
				}
			};
		$(window).on("scroll", function() {
			var a = !1;
			j();
			k.hide();
			a && clearTimeout(a);
			a = setTimeout(function() {
				k.css("display", "")
			}, 500)
		});
		j();
		a.on("mouseover", function() {
			g.hide()
		});
		Runner.setCookieForVideoVolna();
		Runner.showWelcomePopup("");
		$("#music_bottom_href").click(function() {
			window.open("http://music.ivi.ru")
		});
		$("#bottom_faq_link").click(function() {
			window.open("http://ask.ivi.ru/knowledgebase")
		});
		$(document).on("click", "a[at_auth], span[at_auth] , input[at_auth], button[at_auth]", function() {
			Runner.at_action($(this))
		});
		return this
	},
	showChromePopup: function(a, b) {
		var c = '<div id="browser-update-notice-block" class="browser-update-notice"><span class="h2i">В данный момент вы используете устаревший браузер.</span><div class="browser-update-notice-content"><div class="top-part"><div class="bottom-part"><div class="ivi-logo"><a href="/"><img src="/images/da/img/notice_old_browsers/ivi-logo.gif" width="51" height="29" alt="IVI" /></a></div><div class="chrome"><a href="http://ad.doubleclick.net/ddm/clk/281043307;107855061;w"><img src="/images/da/img/notice_old_browsers/chrome_logo.jpg" width="184" height="183" alt="Chrome" /></a></div><div><p>Для оптимального просмотра фильмов на ivi.ru, рекомендуем обновить ваш браузер.</p></div><div class="download-link"><a href="http://ad.doubleclick.net/ddm/clk/281043307;107855061;w">Загрузить Chrome</a></div><div><span>или <a id="back-to-site-link" href="#">перейти на сайт</a> без установки</span></div></div></div></div><img src="http://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=368676&bt=21&bid=2141223&bn=2141223&rnd=' + getRandomDigits(10) + '" width="0" height="0" border="0" /><IMG SRC="http://ad.doubleclick.net/ad/N5295.283767.IVI.RU/B8064776.107855061;sz=1x1;ord=' + $.now() + '?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="Advertisement"></A><SCRIPT language="JavaScript1.1" SRC="http://pixel.adsafeprotected.com/rjss/st/25624/2179032/skeleton.js"><\/SCRIPT><NOSCRIPT><IMG SRC="http://pixel.adsafeprotected.com/rfw/st/25624/2179031/skeleton.gif" BORDER=0 WIDTH=1 HEIGHT=1 ALT=""></NOSCRIPT></div>',
			e = $("body");
		e.append(c);
		e.addClass("browser-update-notice");
		$.cookie(a, 1, {
			expires: b,
			path: "/"
		});
		$("#back-to-site-link").click(function(a) {
			e.removeClass("browser-update-notice");
			$("#browser-update-notice-block").remove();
			a.preventDefault()
		})
	},
	at_action: function(a) {
		var b = $(a).attr("at_auth");
		$(a).attr("id") == "elem_reg_subscribe" && ($(a).prop("checked") ? b += "_on" : b += "_off");
		typeof wolf_main_counter != "undefined" && Groot.track(b + "_" + wolf_main_counter);
		doAtRequest(b)
	},
	beelineSp: function() {
		var a = $("#sertificate-form"),
			b = a.find("#promo-key"),
			c = $("#sertificate-form-error");
		b.dynamicInput();
		isLoggedIn() || b.click(function() {
			openModal("auth")
		});
		a.submit(function() {
			if (!isLoggedIn()) return !1;
			c.addClass("hidden");
			Payment.activateGifts(b.val(), function(a) {
				a.error ? (b.addClass("error"), c.html(a.error), c.removeClass("hidden")) : (a.open_payment && a.subscription_id && $.jStorage.set("gift", a.key), window.location = "/plus/")
			});
			return !1
		});
		setClickUrl($(".beeline-promo .adv a"), "http://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=21&ad=431380&pid=1371438&bid=2969771&bn=2969771&rnd=1158808569", !0);
		setClickUrl($(".beeline-promo .modem-link"), "http://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=21&ad=431380&pid=1371438&bid=2969771&bn=2969771&rnd=1158808569", !0);
		setClickUrl($(".beeline-promo .salon-link"), "http://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=21&ad=431380&pid=1371439&bid=2969772&bn=2969772&rnd=2035063560", !0)
	},
	devices: function() {
		var a = window.location.hash;
		a == "#partners-ap" ? openModal("partners_phones") : a == "#partners-at" ? openModal("partners_tablets_android") : a == "#partners-w8" && openModal("partners_tablets_win8");
		$("#partners-phones-link").click(function() {
			openModal("partners_phones")
		});
		$("#partners-tablets-android-link").click(function() {
			openModal("partners_tablets_android")
		});
		$("#partners-tablets-win8-link").click(function() {
			openModal("partners_tablets_win8")
		})
	},
	devicesScenes: function(a) {
		function b() {
			window.scrollX !== 0 && window.scrollTo(0, window.scrollY)
		}
		navigator.userAgent.indexOf("Trident") !== -1 || addEventHandler(window, "scroll", b);
		a >= 2 && devicesScenes(a);
		var c = {
			android: "",
			ios: "",
			winphone: "",
			symbian: "",
			bada: ""
		};
		$(".scene .download-button").click(function(a) {
			var d = $(this).parent(".scene");
			for (i in c) if ($(d).hasClass(i)) {
				window.open(c[i]);
				break
			}
			a.preventDefault()
		})
	},
	search: function(a) {
		search.init(a)
	},
	showWelcomePopup: function(a) {
		$("body").on("submit", ".teaser-registration-form", function(b) {
			$.ajax({
				dataType: "json",
				type: "POST",
				url: "/user/ajax/register/popup",
				data: {
					email: $("#teaser-email").val(),
					c: 0
				},
				beforeSend: function() {
					$("#popup_checking_process").show()
				},
				success: function(d) {
					$("#popup_checking_process").hide();
					d.error ? ($("#popup_error_placer").text(d.error[0]).show(), $("#teaser-email").addClass("error-input")) : (window.sessionStorage.setItem("just_registered", 1), _gaq.push(["_trackEvent", "SiteEvents", "StartedRegistration", "зарегистрировался"], ["_trackEvent", "SiteEvents", "RegisteredLP", "зарегистрировался"]), setCookie("_set_motivation_teaser", "RegisteredLP", 30), YAreachGoal("RegisteredLP"), a != "" && typeof a != "undefined" ? (window.location.href = window.location.href + "#" + a, window.location.reload(!0)) : window.location.href = d.url)
				}
			});
			b.preventDefault()
		});
		if (function() {
			if (isLoggedIn()) return !1;
			if (getCookie("motivation_popup")) return !0;
			if (getCookie("partner_code")) return !0
		}()) {
			var b = Lawnchair({}, function() {}),
				c = 0;
			b.get("views_number", function(a) {
				a !== null && a.value >= 0 ? c = a.value : b.save({
					key: "views_number",
					value: 1
				});
				c < 3 && getCookie("motivation_popup_time") === null && ($("#modal_register_teaser").jqm({
					modal: !0
				}), openModal("register_teaser"), b.save({
					key: "views_number",
					value: c + 1
				}), setCookie("motivation_popup_time", "1", 1))
			})
		}
	},
	setCookieForVideoVolna: function() {
		(document.referrer.search("vlna.tv") != -1 || document.referrer.search("external.ivi.ru") != -1) && setCookie("partner_code", "videovolna", 1)
	},
	tagpair: function(a, b) {
		$("ul.films-gallery > li").not("#watching_now_carousel > li").iviMoviePopup();
		if (a === "main") return da.tagPair.init(a, b), !1;
		var c = !0;
		da.on("recommendations.show").add(function() {
			c && da.tagPair.init(a, b);
			c = !1
		})
	},
	survey: function(a, b) {
		b = typeof b !== "undefined" ? b : 0;
		$(function() {
			var a = 1;
			b > 0 && (a = 0);
			$("#recommendations_subtabs_nav").tabs("#tab_recommendations > .subtab", {
				initialIndex: a
			});
			$("#recommendations_adjust_steps_nav").tabs("#tab_recommendations > #subtab_adjust > .steptab", {
				tabs: "a"
			})
		});
		da.on("recommendations.show").add(function() {
			da.survey.init({
				id: "#recommendations_adjust_steps_nav",
				rateItems: a
			})
		});
		var c = function(a) {
			var d = "фильмов";
			a == 4 || a == 3 || a == 2 ? d = "фильма" : a == 1 && (d = "фильм");
			return d
		};
		$("#infinite_rate").on("click", ".inf_li .scale-rating ul li", function(a) {
			var d = $(this).attr("class").replace("rate", ""),
				b = $(this).parent().attr("data-id"),
				e = $(this).parent().parent().attr("id"),
				j = $(this).parent().parent();
			addRate(b, d, function(a) {
				typeof a.error == "undefined" && ($("div", j).css("width", d * 10 + "%"), $(j).addClass("personal"))
			});
			userStorage.addRated(e);
			b = $(this).parents(".inf_li").attr("id");
			da.start.reloadItem(b, "size16");
			b = parseInt(da.survey.ratesCount) + 1;
			e = da.start.drawRatesCount(b);
			$("#rates_count").html(e);
			da.survey.ratesCount = b;
			if (da.survey.ratesCount <= da.survey.rateItems) {
				da.survey.status.set("rate", da.survey.ratesCount * 5);
				var l = da.survey.rateItems - da.survey.ratesCount,
					m = c(l)
			}
			da.survey.ratesCount < da.survey.rateItems ? $("#films_num").html(l + " " + m) : $("#films_num_text").html("Оцените фильмы");
			a.preventDefault()
		});
		$("#infinite_rate").on("click", ".skipped", function() {
			var a = $(this).attr("id").replace("skipped_", "");
			userStorage.addSkipped(a);
			a = $(this).parents(".inf_li").attr("id");
			da.start.reloadItem(a, "size16")
		});
		var e = $("#rates_count").text();
		da.survey.ratesCount = parseInt(e);
		e = da.start.drawRatesCount(e);
		$("#rates_count").html(e);
		var e = parseInt($("#films_num").text()),
			d = c(e);
		$("#films_num").html(e + " " + d);
		da.survey.status.subscribe(function(a) {
			a >= 51 && $.post("/survey/set/survey/completion")
		})
	},
	studio: function() {
		$("ul.films-gallery > li").iviMoviePopup();
		textExpander("#studio-text", 72)
	},
	start: function(a) {
		var a =
		a || {},
			b = new Rotation("main_rotate_collection", 9, 3);
		b.showElements($("#index_new li.element-selector"));
		b.showElements($("#index_pop li.element-selector"));
		b.rotate();
		$("ul.films-gallery > li").not("#watching_now_carousel > li").iviMoviePopup();
		da.lazy.setPreloadHeight("50%");
		da.lazy.start();
		da.start.promotop();
		da.start.prepareWatchHistory();
		textExpander("#description-text", 144);
		textExpander("#description-footer-text", 144);
		da.lazy.add($("#recommendation_explanation"), da.start.explanation);
		da.lazy.add($("#html_start_recommendation_targetted"), da.start.recommendation_targetted);
		da.lazy.add($("#watch-again"), function(a) {
			da.start.WatchAgain(a)
		});
		var c = [];
		$(".watch-history-element").each(function(a) {
			a < 3 ? $(this).show() : c.push(this)
		});
		$(".watch-history-element .link-delete").click(function() {
			$(this).parent(".watch-history-element").remove();
			c.length > 0 && $(c.shift()).show();
			$(".watch-history-element").length == 0 && $("div.extra-col div.watch-history").hide()
		});
		$("#selection-categories-list li a").click(function(a) {
			var d = $(this).attr("data-value");
			$.ajax({
				url: "/video/ajax/prepare/selections",
				data: {
					category: d,
					page: 1
				},
				dataType: "json",
				success: function(a) {
					var b = $("#selectons_more_btn");
					$("#selections-block-content-list").html("").html(a.html);
					a.more ? (b.show(), b.attr("href", "/videos/podborki/" + (d != "all" ? d + "/" : ""))) : b.hide()
				}
			});
			a.preventDefault();
			return !1
		});
		$(".promo-lesser-block li img").each(function() {
			$(this).load(function() {
				var a = new Image;
				$(a).attr("src", $(this).attr("pxlink"))
			})
		});
		$("#authorize").click(function() {
			openModal("auth")
		});
		da.lazy.add($("#reviews-ajax-block"), da.start.showAjaxTopReviews);
		da.start.grossFilms();
		da.start.awardWinners();
		da.start.persons();
		da.start.ratings();
		$("#flash_updater").flashembed(a.updater_path);
		da.lazy.add($("#infinite_rate"), da.start.rateAllItem);
		$("#infinite_rate").on("click", ".inf_li .scale-rating ul li", function(a) {
			var d = $(this).attr("class").replace("rate", ""),
				b = $(this).parent().attr("data-id"),
				c = $(this).parent().parent().attr("id"),
				h = $(this).parent().parent();
			addRate(b, d, function(a) {
				typeof a.error == "undefined" && ($("div", h).css("width", d * 10 + "%"), $(h).addClass("personal"))
			});
			userStorage.addRated(c);
			b = $(this).parents(".inf_li").attr("id");
			da.start.reloadItem(b);
			b = parseInt(da.start.ratesCount) + 1;
			c = da.start.drawRatesCount(b);
			$("#rates_count").html(c);
			da.start.ratesCount = b;
			!isLoggedIn() && userStorage.rated.length >= 5 && ($("#rates_overlay").show(), setCookie("unreg_rated", JSON.stringify(userStorage.getRated()), 1), setCookie("unreg_skipped", JSON.stringify(userStorage.getSkipped()), 1));
			a.preventDefault()
		});
		$("#infinite_rate").on("click", ".skipped", function() {
			if (!isLoggedIn() && userStorage.skipped.length >= 15) $("#rates_overlay").show(), setCookie("unreg_rated", JSON.stringify(userStorage.getRated()), 1);
			else {
				var a = $(this).attr("id").replace("skipped_", "");
				userStorage.addSkipped(a);
				a = $(this).parents(".inf_li").attr("id");
				da.start.reloadItem(a)
			}
		});
		$("#infinite_rate").on("click", "#user_votes_login", function() {
			openModal("auth")
		});
		$(".open-vote-help-block").on("click", function() {
			$("#infinite_rate ul.films-gallery > li.loading").length || $(this).toggleClass("active").parent().siblings(".vote-help-block").toggleClass("expanded").end().siblings(".films-gallery").children("li").slice(-2).toggle();
			return !1
		});
		$(".vote-help-block .link-close").on("click", function() {
			$(".open-vote-help-block").click()
		});
		a = $("#rates_count").text();
		da.start.ratesCount = a;
		a = da.start.drawRatesCount(a);
		$("#rates_count").html(a);
		da.lazy.add($("#similar-parent"), da.start.similarToConcreteFilms);
		da.lazy.add($("#subgenres"), da.start.subgenres.init);
		$("#start_fav_list").on("click", ".link-delete", function(a) {
			var d = $("#start_fav_list").children();
			d.length > 3 ? ($(a.target).parent().remove(), $(a.target).data("id"), $(a.target).data("type"), d.length == 4 && $("#start_fav_list .link-delete").remove()) : $("#start_fav_list .link-delete").remove()
		});
		$("#movie-stack-teaser").click(function() {
			openModal("auth", !0);
			return !1
		});
		watching_now_carousel_init();
		$(document).bind("ivi:favourites:add", function() {
			incCounter("#start_block_favourites_items_count")
		});
		$(document).bind("ivi:favourites:remove", function() {
			decCounter("#start_block_favourites_items_count") === 0 && $("#start_fav_list_more").hide()
		});
		$(function() {
			function a() {
				var d = $("html").width();
				d < 1700 ? $("#wrapper").width(d) : $("#wrapper").width("auto")
			}
			a();
			$(window).resize(a)
		})
	},
	main: function(a) {
		function b(a, b, c) {
			a = $("#carousel-series-new li:last").index();
			a++;
			c == a && $(".opacity-layout").show()
		}
		function c(d, b, c) {
			c--;
			d = c / a.newSeriesCount;
			d = Math.ceil(d);
			$(".series-new-nav>span>span").html(d)
		}
		function e(a, b, c) {
			a = $("#carousel-series-new li:last").index();
			c == a && $(".opacity-layout").hide()
		}
		this.currentPage = "main";
		gravity.showMainRecommendation("recommendation_main_page_place", function(a) {
			a.find("#genre-recommend-items ul li").click(function(a) {
				var d =
				$(this).attr("class").replace("rate", ""),
					b = $(this).parent().attr("data-id"),
					c = $(this).parent().parent();
				addRate(b, d, function(a) {
					typeof a.error == "undefined" && ($("div", c).css("width", d * 10 + "%"), $(c).addClass("personal"))
				});
				a.preventDefault()
			});
			a.find("#genre-recommend-items > li").iviMoviePopup()
		});
		$("ul.films-gallery > li").not("#watching_now_carousel > li").iviMoviePopup();
		$(".promo-lesser-block li img").each(function() {
			$(this).load(function() {
				var a = new Image;
				$(a).attr("src", $(this).attr("pxlink"))
			})
		});
		$(".scale-rating ul li").click(function(a) {
			var b = $(this).attr("class").replace("rate", ""),
				c = $(this).parent().attr("data-id"),
				e = $(this).parent().parent();
			addRate(c, b, function(a) {
				typeof a.error == "undefined" && ($("div", e).css("width", b * 10 + "%"), $(e).addClass("personal"))
			});
			a.preventDefault()
		});
		$("#vlscroll_channel-items ").children().length > 0 ? ($("#vlscroll_channel-items").jcarousel({
			scroll: 5,
			auto: 10,
			wrap: "both",
			initCallback: ivicarousel_initCallback,
			itemFirstInCallback: {
				onBeforeAnimation: ivicarousel_setActiveButton,
				onAfterAnimation: null
			},
			buttonPrevCallback: ivicarousel_buttonPrevCallback,
			buttonNextCallback: ivicarousel_buttonNextCallback,
			buttonNextEvent: "carouselNext",
			buttonPrevEvent: "carouselPrev",
			buttonNextHTML: null,
			buttonPrevHTML: null
		}), $("#channel_items ul.items > li").iviMoviePopup({
			carouselMode: !0
		})) : $("#channel_items_block").hide();
		$("#channel_items_block .scale-rating ul li").click(function(a) {
			var b = $(this).attr("class").replace("rate", ""),
				c = $(this).parent().attr("data-id"),
				e = $(this).parent().parent();
			addRate(c, b, function(a) {
				typeof a.error == "undefined" && ($("div", e).css("width", b * 10 + "%"), $(e).addClass("personal"))
			});
			a.preventDefault()
		});
		$("ul.selections-nav-items li a").click(function(a) {
			var b = this.id;
			$("ul.selections-nav-items li a").parent().removeClass("active");
			$("ul.selections-nav-items li a#" + this.id).parent().toggleClass("active");
			$.ajax({
				url: "/video/ajax/prepare/selections",
				data: {
					category: b
				},
				dataType: "json",
				success: function(a) {
					$("#selections-content").html(a);
					$("#more_btn").attr("href", "/videos/podborki/" + (b != "all" ? b + "/" : ""))
				}
			});
			a.preventDefault()
		});
		$("div.series-new-block .series-new-nav").length != 0 && ($("#carousel-series-new").jcarousel({
			vertical: !0,
			scroll: a.newSeriesCount,
			itemVisibleInCallback: {
				onBeforeAnimation: null,
				onAfterAnimation: e
			},
			itemLastOutCallback: {
				onBeforeAnimation: null,
				onAfterAnimation: b
			},
			itemLastInCallback: c
		}), $(".wrapper-scroll-series-new").css("overflow", "visible"));
		return this
	},
	loadPlayer: function(a) {
		if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) && a.is_paid) $("#video-player").html("К сожалению, это видео можно посмотреть только на компьютере.");
		else if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) $.post("/b2b/api/json/", '{"params": [' + a.videoId + ', {"site":1}], "method": "da.content.get", "uid":"' + Runner.user_id + '"}', function(d) {
			if (typeof d.error == "object" && typeof d.error.code != "undefined" && d.error.code == 4501) $("#video-player").html("Извините, видео не доступно для просмотра в вашем регионе.<br/>Sorry, this video is not available in your region due to copyright restrictions");
			else if (d.result.sharing_disabled && !onSite()) $("#video-player").html("Извините, видео временно не доступно.<br/>Sorry the video is temoprary unavailable");
			else {
				var b = _preview = null;
				wh = a.playerWidth !== !1 ? a.playerWidth : $(window).height();
				wh > 830 ? (vheight = 550, vwidth = 980, vpc = "w980") : wh > 730 ? (vheight = 486, vwidth = 864, vpc = "w864") : wh > 630 ? (vheight = 396, vwidth = 704, vpc = "w704") : (vheight = 360, vwidth = 640, vpc = "w640");
				for (var c = 0; c < d.result.files.length; ++c) if (d.result.files[c].content_format == "MP4-hi") b = d.result.files[c].url;
				for (c = 0; c < d.result.preview.length; ++c) if (d.result.preview[c].content_format == "Thumb-640x480") _preview = d.result.preview[c].url;
				$("#content-top-wrapper").hasClass(vpc) || ($("#content-top-wrapper").removeClass(), $("#content-top-wrapper").addClass(vpc));
				$("#video-player").empty().append('<video src="' + b + '" width="100%" height="100%" x-webkit-airplay="allow" poster="' + _preview + '" controls onplay="contentWatched(' + a.videoId + ');"><p>If you are reading this, it is because your browser does not support the HTML5 video element.</p></video>')
			}
		}, "json");
		else {
			if (a.is_paid) {
				var b = "/video/pay/player";
				a.autoPlay = "false"
			} else b = "/video/player";
			var c = {
				videoId: a.videoId,
				autoStart: a.autoPlay,
				_isB2C: 1,
				b2cApiUrl: "/api/json/flash/1.0/",
				use_vi: "0"
			};
			if (a.campaignData && a.campaignData !== void 0) c.utm_full_info = a.campaignData;
			a.is_paid || (c.autoStart = 1);
			if (a.siteId) c.siteId = a.siteId;
			if (a.start !== !1) c.start = a.start;
			if (a.finish !== !1) c.finish = a.finish;
			var e = window.sessionStorage || null;
			if (e) {
				if (e.getItem("ad1") == 1) c.ad1 = !0;
				if (e.getItem("adonweb") == 1) c.adonweb = !0;
				var d = e.getItem("cityads"),
					f = e.getItem("cityads_prx"),
					g = e.getItem("cityads_click_id");
				if (d == 1) {
					c.cityads = !0;
					if (f != void 0 && /^[0-9a-z_]{1,32}$/i.test(f)) c.cityads_prx = f;
					if (g != void 0 && /^[0-9a-z_]{1,64}$/i.test(g)) c.cityads_click_id = g
				}
				d = getCookie("cityadsmult");
				if (d != void 0 && /^[0-9a-z_]{1,32}$/i.test(d)) c.cityadsmult_prx = d;
				d = getCookie("cityadsmult_click");
				if (d != void 0 && /^[0-9a-z_]{1,32}$/i.test(d)) c.cityads_click_id = d;
				if (e.getItem("luxup") == 1) c.luxup = !0;
				d = e.getItem("utm_campaign");
				f = e.getItem("utm_source");
				e = e.getItem("utm_content");
				if (d) c.utm_campaign = d;
				if (f) c.utm_source = f;
				if (e) c.utm_content = e
			}
			if (a.is_paid) c.bgcolor = "#000000";
			if (a.iviUid) c.iviUid = a.iviUid;
			if (a.isDebugMode) c.isDebugMode = a.isDebugMode;
			if (a.age) c.age = a.age;
			if (a.gender) c.gender = a.gender;
			e = $("#video-player");
			if (d = e.data("adr_order_id")) c.adr_order_id = d;
			c.from_genre = da.watch.fetchCurrentGenre();
			c.share_embed = "0";
			b = {
				id: "flash-video-player",
				src: b,
				base: "/images/da/",
				allowScriptAccess: "always",
				allowFullScreen: "true",
				wmode: "opaque",
				bgcolor: "#000000",
				width: "100%",
				height: "100%",
				quality: "high",
				expressInstall: "/images/da/swfobject/expressInstall.swf",
				version: [10, 2],
				b2cApiUrl: "/api/json/flash/1.0/",
				iviUid: a.iviUid ? a.iviUid : 0,
				isDebugMode: a.isDebugMode ? a.isDebugMode : 0
			};
			if (a.age) b.age = a.age;
			if (a.gender) b.gender = a.gender;
			e.flashembed(b, c)
		}
	},
	person_wiki: function() {
		person_wiki()
	},
	plus: function(a, b, c) {
		c = new Rotation("plus_rotate_collection", c || 9, 3);
		c.showElements($("#genre-new-items li.rotate-items"));
		c.showElements($("#genre-popular-items li.rotate-items"));
		c.rotate();
		$("body.plus-promo-page .promo-top").plusPromo({
			buttons: ".tab-buttons",
			images: ".images",
			infos: ".info",
			isCircular: !0,
			autoSwitchInterval: 7,
			start: get_carousel_start_position($("body.plus-promo-page .promo-top .images ul"), "plus-promo")
		});
		$(document.body).on("click", "#abort-gift, #close-gift", function(a) {
			$("#gift-key").attr("value", "");
			$("#gift-error").html("");
			a.preventDefault()
		});
		$(document.body).on("click", "#gift-activate-button", function() {
			isLoggedIn() ? openModal("certificate", !1, "gift") : (setCookie("gift", 1, 1), openModal("auth"))
		});
		var e = function(a, b) {
			$.ajax({
				dataType: "json",
				type: "POST",
				url: "/gift/ajax/activate/",
				data: "key=" + a,
				success: function(a) {
					$("#modal_certificate .loading.light_gray").removeClass("visible");
					if (a.error) $("#gift-error").css("display", "block"), $("#gift-error").html(a.error);
					else if (a.open_payment && a.subscription_id) return b(), Payment.openPayment({
						subscription_id: a.subscription_id,
						discount: a.discount,
						action: a.action,
						back_url: a.back_url,
						key: a.key,
						can_buy: a.can_buy
					}), !0;
					else b(), window.location = "/plus/"
				}
			})
		};
		$(document.body).on("click", "#activate-gift", function(a) {
			$("#modal_certificate .loading.light_gray").addClass("visible");
			$("#gift-error").html("");
			var b = $("#gift-key").attr("value");
			if (!/^[0-9a-f]{12}$/ig.test(b) || b == void 0) return $("#gift-error").css("display", "block"), $("#gift-error").html("Неверный номер сертификата."), $("#modal_certificate .loading.light_gray").removeClass("visible"), !1;
			e($("#gift-key").attr("value"), function() {
				loadModal("certificate").done(function(a) {
					$(a).jqmHide()
				})
			});
			a.preventDefault()
		});
		if (c = $.jStorage.get("gift")) $.jStorage.deleteKey("gift"), e(c, function() {});
		$("#plus_promo_catalog div.scale-rating li").live("click", Runner.onRate);
		$("#genre-new-items div.scale-rating li").click(Runner.onRate);
		$("#genre-popular-items div.scale-rating li").click(Runner.onRate);
		c = getCookie("subscription_id");
		isLoggedIn() && getCookie("gift") == 1 && (setCookie("gift", 0, 1), $("#gift-activate-button").trigger("click"));
		getCookie("buy") == 1 && !$("#modal_social_register").is(":visible") && ($(".buy-link").click(function() {
			Payment.onclick($(this));
			return !1
		}), isLoggedIn() ? (eraseCookie("buy"), $("#subscription-button-" + c).trigger("click")) : (setCookie("buy", 1, 1), setCookie("subscription_id", c, 1), openModal("auth")));
		getCookie("trial") == 1 && (isLoggedIn() ? (eraseCookie("trial"), $("#trial-button-" + c).trigger("click")) : (setCookie("trial", 1, 1), setCookie("subscription_id", c, 1), openModal("auth")));
		plus_promo();
		a == 1 && $("#gift-activate-button").trigger("click");
		b == "reuse_trial" && ($(".jqmWindow").jqm().jqmHide(), loadModal("reuse_trial").done(function(a) {
			$(a).jqm().jqmShow()
		}))
	},
	page: function() {
		$(document.body).on("click", ".buy-link, .header-profile-buy-link", function() {
			Payment.onclick($(this));
			return !1
		});
		$(document.body).on("click", "#continue-payment", function() {
			loadModal("geo_notice").done(function(a) {
				$(a).jqm().jqmHide()
			});
			Payment.openPayment({
				ignore_geo: !0,
				linux_notice: !0
			})
		});
		$(document.body).on("click", "#continue-payment_linux", function() {
			var a = {
				linux_notice: !0
			};
			loadModal("linux_notice").done(function(b) {
				$(b).jqm().jqmHide();
				Payment.openPayment(a)
			})
		});
		$(document.body).on("click", "#tab-activate-gift", function(a) {
			var b = $("#tab-activate-gift"),
				c = !1;
			b.data("tab") === 1 && (c = !0);
			c = {
				action: b.data("action"),
				tab: c
			};
			if (b.data("content-id")) c.content_id = b.data("content-id");
			else if (b.data("subscription-id")) c.subscription_id = b.data("subscription-id");
			Payment.activateGift($("#tab_elem_gift-code").val(), c);
			a.preventDefault()
		});
		$("#activation_gift").click(function() {
			isLoggedIn() ? window.location.href = "/gift/activate/" : (setCookie("gift", 1, 1), openModal("auth"))
		})
	},
	page404: function() {
		gravity.show404Recommendation("recommendations_404", function(a) {
			a.find("#genre-recommend-items > li ul li").click(function(a) {
				var c = $(this).attr("class").replace("rate", ""),
					e = $(this).parent().attr("data-id"),
					d = $(this).parent().parent();
				addRate(e, c, function(a) {
					typeof a.error == "undefined" && ($("div", d).css("width", c * 10 + "%"), $(d).addClass("personal"))
				});
				a.preventDefault()
			});
			a.find("#genre-recommend-items > li").iviMoviePopup()
		})
	},
	watch: function(a) {
		function b() {
			$(".main-col .tabs-content > div").hide();
			$(".ugc-tabs li").removeClass("active")
		}
		function c(a) {
			b();
			$("#" + a + "-cont").show();
			$("#" + a + "tab").addClass("active")
		}
		this.nextVideoLink = a.nextVideoLink || null;
		this.nextVideoId = a.next || null;
		this.currentPage = "watch";
		var e = a.contentType;
		this.baseId = this.currentId = a.videoId;
		var d = da.watch.fetchCurrentGenre();
		d && (this.nextVideoLink && (this.nextVideoLink += "#genre_id=" + d), $("#series-block").bind("click", function(a) {
			a.target.tagName == "A" && (a.target.href += "#genre_id=" + d);
			return !0
		}), $("a.action-button, .line-seasons a").each(function() {
			this.href += "#genre_id=" + d
		}));
		(new TrailerController(new TrailerModel(a.trailer), a)).setStartButton($("#start-trailer"));
		$(".buy-button").click(function() {
			Payment.onclick($(this));
			var a = $(this).attr("xt_watch");
			typeof a != "undefined" && (xt_click(this, "F", "4", a), Groot.track(a));
			return !1
		});
		$("#series-block").seriesBlock({
			tmpl: "serie_item_tmpl"
		});
		$("#directors-parent").videoBlock({
			excludeId: a.videoId || a.compilationId,
			action: "director",
			limit: 8
		});
		$("#actors-parent").videoBlock({
			excludeId: a.videoId || a.compilationId,
			action: "actor",
			limit: 8
		});
		recommendation.parseParams(a);
		a.campaignData =
		getCampaignData();
		a.gravity_view !== void 0 && a.gravity_view && (a.isFake == 1 ? recommendation.actionView() : setTimeout(function() {
			recommendation.actionView()
		}, gravity.getPageViewTimeout()));
		$(".promo-lesser-block li img").each(function() {
			$(this).load(function() {
				var a = new Image;
				$(a).attr("src", $(this).attr("pxlink"))
			})
		});
		$("#button-favorite").click(function(a) {
			favouriteClick(e, a, $(this))
		});
		$("#button-favorite-subscribe").click(function(a) {
			subscribeClick(e, a, $(this))
		});
		$(".scale-rating ul li").click(function(a) {
			var d =
			$(this).attr("class").replace("rate", ""),
				b = $(this).parent().attr("data-id"),
				c = $(this).parent().parent(),
				e = Lawnchair({}, function() {});
			isLoggedIn() || e.save({
				key: "rate_data",
				rate: d,
				id: b
			});
			var e = $(this).parents(".scale-rating").data("rating-submit-button"),
				f = function() {
					$("div", c).css("width", d * 10 + "%");
					$(c).addClass("personal");
					$("#add-review-form-rating_error").html("")
				},
				k = function() {
					addRate(b, d, function(a) {
						typeof a.error == "undefined" && f()
					})
				};
			e ? (f(), $(e).click(k)) : k();
			a.preventDefault()
		});
		$(".scale-rating.shareable ul li").click(function(a) {
			var d =
			$(this).parent().attr("data-id"),
				b = $(this).attr("class").replace("rate", "");
			$("#rating-share-friend").prop("checked") && Social.shareRating(d, b);
			a.preventDefault()
		});
		$playerContainer = $("#video-player");
		$playerContainer.length ? sessionStorage && !a.showSeasonsBlock ? a.is_paid && a.access_success ? showPlayerBlock(a) : a.is_paid && !a.access_success ? isLoggedIn() && getCookie("buy") == 1 && (Payment.onclick($(".buy-button")), Payment.clearCookie()) : sessionStorage.getItem("ad1") || (a.autoPlay == 1 || a.is_paid) && showPlayerBlock(a) : a.is_paid && a.access_success ? showPlayerBlock(a) : a.is_paid ? isLoggedIn() && getCookie("buy") == 1 && (Payment.onclick($(".buy-button")), Payment.clearCookie()) : showPlayerBlock(a) : a.is_svod && !a.access_success && isLoggedIn() && getCookie("buy") == 1 && getCookie("subscription_id") && (Payment.onclick($(".buy-button")), Payment.clearCookie());
		a.is_paid && $(".paid-links").length && $(".faq", ".paid-links").text("Проблемы с воспроизведением видео?");
		$("#show-content").click(function() {
			showPlayerBlock(a);
			_gaq.push(["_trackEvent", "SiteEvents", "WatchButton_click"]);
			return !1
		});
		$("#show-content-track-compilation").click(function() {
			_gaq.push(["_trackEvent", "SiteEvents", "WatchButton_click"])
		});
		$("#eroticDeny").click(function() {
			window.location = "/";
			return !1
		});
		var f = window.location.href.split("#")[0],
			f = f.split("?")[0],
			f = f.replace(/^.*\/\/[^\/]+/, "");
		f.charAt(f.length - 1) == "/" && (f = f.slice(0, f.length - 1));
		if (a.commentsUrl.charAt(a.commentsUrl.length - 1) == "/") a.commentsUrl = a.commentsUrl.slice(0, a.commentsUrl.length - 1);
		da.watch.addAfishaReview($(".reviews-list"));
		$(".ugc-tabs li").click(function(a) {
			var d = $(this).find("a").attr("href").replace("#", "");
			c(d);
			a.preventDefault()
		});
		var g = function() {
			var a = $(".ugc-block-title").offset().top - calculateScrollOffset() + 80;
			$("html, body").animate({
				scrollTop: a
			}, 600)
		},
			h = function() {
				da.lazy.start();
				da.lazy.lock();
				b();
				c("comments");
				g()
			},
			k = function() {
				isLoggedIn() ? (da.lazy.start(), da.lazy.lock(), Comments.placeCommentForm($("#main-comment-form-placer")), b(), c("comments"), g(), $("#add-comment-form-title").focus()) : openModal("auth")
			};
		$("#add-comment").click(function() {
			a.commentsUrl == f ? k() : window.location = a.commentsUrl + "#addcomment";
			return !1
		});
		window.location.hash == "#addcomment" && k();
		window.location.hash == "#comments" && h();
		$("#view-comments").click(function() {
			a.commentsUrl == f ? h() : window.location = a.commentsUrl + "#comments";
			return !1
		});
		$("#add-review-form-text").focusin(function() {
			var a = $(this).parents(".wrap-form");
			a.hasClass("expanded") || (a.addClass("expanded"), $(this).autoResize({
				extraSpace: 0
			}));
			$(this).val() == "Написать свою рецензию..." && $(this).val("")
		});
		$("#add-review-form-title").live("keyup", function() {
			$.trim($(this).val()).length > 0 && $("#add-review-form-title_error").empty()
		});
		$("#add-review-form-text").live("keyup", function() {
			$.trim($(this).val()).length > 0 && $("#add-review-form-error").empty()
		});
		$("a.button-like").click(function() {
			var a = $(this).attr("content_type"),
				d = $(this).attr("review_id");
			ReviewsWatch.like(d, a, $(this));
			return !1
		});
		$("#reviews-scroll-top").click(function(d) {
			if (a.nextVideoLink || a.is_season) return window.location.href =
			a.baseUrl + "#addReview", !1;
			a.review_page == "single" ? window.location.href = a.pageUrl + "/reviews/#addReview" : (b(), c("reviews"), g());
			d.preventDefault()
		});
		window.location.hash == "#addReview" && $(".ugc-block-title").length > 0 && g();
		$("#review-edit-button").click(function() {
			if ($(this).attr("href") == "#") {
				var d = $(this).attr("review-id");
				ReviewsWatch.editForm(d, a.review_page);
				return !1
			}
		});
		window.location.hash == "#edit" && $("#review-edit-button").click();
		$(".review-make-button").click(function(a) {
			b();
			c("reviews");
			g();
			$("div.wrap-form").addClass("expanded");
			a.preventDefault()
		});
		a.subaction === "main" && !a.season ? $("a.review-make-button").click(function() {
			ReviewsWatch.showForm();
			$(".content-line").focus().blur()
		}) : $("a.review-make-button").click(function(d) {
			da.lazy.lock();
			window.location = a.baseUrl + "#addReview";
			d.preventDefault()
		});
		$("#review-form-edit-close").click(function() {
			window.location.href = $(".breadcrumbs-nav").find("a")[3].href + "#reviews";
			return !1
		});
		$("#review-form-add-close").click(function() {
			ReviewsWatch.hideAddForm();
			return !1
		});
		$("#review-form-add").click(function() {
			var d = $(this).attr("url"),
				b = $(this).attr("video_id"),
				c = $(this).attr("content_type");
			ReviewsWatch.addReview(b, d, c, a.review_page);
			return !1
		});
		$("#review-form-edit").click(function() {
			var a = $(this).attr("review_id"),
				d = $(this).attr("video_id"),
				b = $(this).attr("url");
			ReviewsWatch.editReview(d, a, b);
			return !1
		});
		$(".add-comment-review_block").click(function() {
			b();
			c("comments");
			$(".comments-block .add-link > a").click();
			return !1
		});
		$("li.bold a").click(function() {
			editor.doAddTags("<strong>", "</strong>");
			return !1
		});
		$("li.italic a").click(function() {
			editor.doAddTags("<em>", "</em>");
			return !1
		});
		$("li.strike a").click(function() {
			editor.doAddTags("<strike>", "</strike>");
			return !1
		});
		$("li.link a").click(function() {
			editor.addUrl();
			return !1
		});
		if (isLoggedIn()) {
			var j = Lawnchair({}, function() {});
			j.get("form_data", function(a) {
				a !== null && (a = a.data[0], $("#add-review-form-text").val(a.text), $("#add-review-form-title").val(a.title));
				j.remove("form_data")
			});
			j.get("rate_data", function(a) {
				a !== null && addRate(a.id, a.rate, function() {
					$("#add-review-rating_block").children("div").css("width", a.rate * 10 + "%")
				});
				j.remove("rate_data")
			})
		}
		da.lazy.setPreloadHeight("50%");
		da.lazy.start();
		da.watch.branding();
		da.lazy.add($("#video_block_properties"), da.watch.related.buildSelect);
		da.lazy.add($("#video_block_recomendations"), da.watch.recomedations);
		$("ul.episodes-gallery").length && Runner.watchSource != "undefined" && Runner.watchSource != null && $("body.watch ul.episodes-gallery").attr("data-wsource", Runner.watchSource);
		da.watch.processSelectionsBlock("#video_block_selections");
		var l = a.contentType == "content" ? a.videoId : a.compilationId;
		a.isFake || $.ajax({
			url: "/video/ajax/devices/availability/",
			type: "GET",
			data: {
				id: l,
				type: a.contentType
			}
		}).success(function(a) {
			a && $("#device-block").html(a)
		});
		$("#popup-social-share > .close").click(function() {
			$(this).parent().hide()
		})
	},
	add_comming: {
		init: function() {
			$(".add_comming").each(function() {
				Runner.add_comming.bind(this)
			})
		},
		bind: function(a) {
			var b = $(a);
			b.find("a").click(function(a) {
				a.preventDefault();
				Runner.add_comming.click(b)
			})
		},
		click: function(a) {
			if (!isLoggedIn()) return openModal("auth"), !1;
			$.ajax({
				url: "/user/ajax/add/comming/",
				type: "POST",
				dataType: "json",
				data: {
					content: a.attr("rel"),
					mode: "list"
				},
				success: function(b) {
					a.hasClass("pending-showhide") ? b.pending ? (a.find(".pending-yes").show(), a.find(".pending-no").hide()) : (a.find(".pending-yes").hide(), a.find(".pending-no").show()) : (a.html(b.html), Runner.add_comming.bind(a))
				}
			})
		}
	},
	fake_watch: function(a) {
		function b() {
			$(".main-col .tabs > div").hide();
			$(".video-tab-review-comment li").removeClass("active")
		}
		function c(a) {
			b();
			$("#" + a + "-cont").show();
			$("#" + a + "tab").addClass("active")
		}
		ajax_lazyloader($("#same_more_button"), $("#same_pending_gallery"));
		ajax_lazyloader($("#actors_more_button"), $("#actors_pending_gallery"));
		ajax_lazyloader($("#directors_more_button"), $("#directors_pending_gallery"));
		$("#watch-trailer-link").click(function() {
			callYouTubePlayer("ytplayer", "pauseVideo");
			$("#watch-trailer,#watch-trailer-link>span").toggle()
		});
		$(".scale-rating ul li").click(function(a) {
			var b = $(this).attr("class").replace("rate", ""),
				c = $(this).parent().attr("data-id"),
				e = $(this).parent().parent();
			addRate(c, b, function(a) {
				typeof a.error == "undefined" && ($("div", e).css("width", b * 10 + "%"), $(e).addClass("personal"))
			});
			a.preventDefault()
		});
		$("#add_comming").live("click", function(d) {
			isLoggedIn() ? $.ajax({
				dataType: "json",
				type: "POST",
				url: "/user/ajax/add/comming/",
				data: "content=" + a.content_id,
				success: function(a) {
					a.error || $("#pending_link_wrapper").empty().html(a.html)
				}
			}) : openModal("auth");
			d.preventDefault()
		});
		$("ul.films-gallery > li").iviMoviePopup();
		$(".video-tab-review-comment a").click(function(a) {
			var b =
			$(this).attr("href").replace("#", "");
			c(b);
			a.preventDefault()
		});
		$("#add-comment").click(function(a) {
			isLoggedIn() && $("html, body").animate({
				scrollTop: $("#add-comment-form-title").offset().top - 70
			}, 600);
			a.preventDefault()
		});
		window.location.hash == "#addcomment" && (b(), c("comments"), isLoggedIn() && $("html, body").animate({
			scrollTop: $("#add-comment-form-title").offset().top - 70
		}, 600));
		$("#add-review-form-title").live("keyup", function() {
			$.trim($(this).val()).length > 0 && $("#add-review-form-title_error").empty()
		});
		$("#add-review-form-text").live("keyup", function() {
			$.trim($(this).val()).length > 0 && $("#add-review-form-error").empty()
		});
		$("a.button-like").click(function() {
			var a = $(this).attr("content_type"),
				b = $(this).attr("review_id");
			ReviewsWatch.like(b, a, $(this));
			return !1
		});
		$("#review-edit-button").click(function() {
			if ($(this).attr("href") != "#") {
				var a = $(this).attr("review-id");
				ReviewsWatch.editForm(a);
				return !1
			}
		});
		window.location.hash == "#addReview" && ReviewsWatch.showForm();
		a.subaction === "main" ? $("a.review-make-button").click(function() {
			ReviewsWatch.showForm();
			$(".content-line").focus().blur()
		}) : $("a.review-make-button").click(function(b) {
			window.location = a.baseUrl + "#addReview";
			b.preventDefault()
		});
		$("#review-form-edit-close").click(function() {
			window.location.href = $(".breadcrumbs-nav").find("a")[3].href + "#reviews";
			return !1
		});
		$("#review-form-add-close").click(function() {
			ReviewsWatch.hideAddForm();
			return !1
		});
		$("#review-form-add").click(function() {
			var a = $(this).attr("url"),
				b = $(this).attr("video_id"),
				c = $(this).attr("content_type");
			ReviewsWatch.addReview(b, a, c);
			return !1
		});
		$("#review-form-edit").click(function() {
			var a = $(this).attr("review_id"),
				b = $(this).attr("video_id"),
				c = $(this).attr("url");
			ReviewsWatch.editReview(b, a, c);
			return !1
		});
		$(".add-comment-review_block").click(function() {
			b();
			c("comments");
			$(".comments-block .add-link > a").click();
			return !1
		});
		$("li.bold a").click(function() {
			editor.doAddTags("<strong>", "</strong>");
			return !1
		});
		$("li.italic a").click(function() {
			editor.doAddTags("<em>", "</em>");
			return !1
		});
		$("li.strike a").click(function() {
			editor.doAddTags("<strike>", "</strike>");
			return !1
		});
		$("li.link a").click(function() {
			editor.addUrl();
			return !1
		});
		if (isLoggedIn()) {
			var e = Lawnchair({}, function() {});
			e.get("form_data", function(a) {
				a !== null && (a = a.data[0], $("#add-review-form-text").val(a.text), $("#add-review-form-title").val(a.title));
				e.remove("form_data")
			});
			e.get("rate_data", function(a) {
				a !== null && addRate(a.id, a.rate, function() {
					$("#add-review-rating_block").children("div").css("width", a.rate * 10 + "%")
				});
				e.remove("rate_data")
			})
		}
	},
	genre: function(a) {
		if (window.location.href.toString().indexOf("utm_source=ostrova") != -1) window.location.hash = "catalog";
		var b = new Rotation("genre_rotate_collection", 6, 3);
		b.showElements($("#genre-new-items li.rotate-items"));
		b.showElements($("#genre-popular-items li.rotate-items"));
		b.rotate();
		this.currentPage = "genre";
		a.recommendation !== void 0 && gravity.showGenreRecommendation("recommendation_genre_page_place", a.recommendation.categoryName, a.recommendation.genreName, function(a) {
			a.find("li").iviMoviePopup()
		});
		$("body.genre_old .promo-top").plusPromo({
			buttons: ".tab-buttons",
			images: ".images",
			infos: ".info",
			isCircular: !0,
			autoSwitchInterval: 7,
			start: get_carousel_start_position($("body.genre_old .promo-top .images ul"), "genre-promo")
		});
		$("#check-for-personal-auth").click(function() {
			isLoggedIn() || openModal("auth", !0);
			return !1
		});
		var c = $.getUrlVar("personal");
		c == 1 ? isLoggedIn() && $("#check-for-personal").prop("checked", !0) : $("#check-for-personal").prop("checked", !1);
		$("#check-for-personal").click(function() {
			var a = $("#check-for-personal").is(":checked"),
				b = "0";
			if ((c == 0 || c === void 0) && a) b = "1";
			if (!window.location.hash) window.location.hash = "#catalog";
			window.location.href = $.setUrlVar("personal", b)
		});
		$(".persons-block").each(function() {
			var a = $(this),
				b = $("ul", a),
				c = $(".more a", a);
			if (c.length) {
				var g = !1;
				c.click(function(a) {
					if (a.ctrlKey || a.shiftKey) return !0;
					if (g) return !1;
					b.css({
						height: b.height()
					});
					b.addClass("loading");
					g = !0;
					$.ajax({
						url: this.getAttribute("rel"),
						dataType: "json",
						success: function(a) {
							g = !1;
							b.removeClass("loading");
							b.css({
								height: null
							});
							a.error ? document.location.href = c.attr("href") : (b.html(a.list), a.next ? (c.attr("href", a.next.href), c.attr("rel", a.next.rel)) : c.hide())
						},
						error: function() {
							document.location.href = c.attr("href")
						}
					});
					return !1
				})
			}
		});
		$(".scale-rating ul li").live("click", function(a) {
			var b = $(this).attr("class").replace("rate", ""),
				c = $(this).parent().attr("data-id"),
				g = $(this).parent().parent();
			addRate(c, b, function(a) {
				typeof a.error == "undefined" && ($("div", g).css("width", b * 10 + "%"), $(g).addClass("personal"))
			});
			a.preventDefault()
		});
		$("div.promo-top a.button-favorite.fav").click(function(a) {
			var b = $(this),
				c = b.parent().find(".subscribe");
			if (b.attr("data-compilation")) var g = "compilation",
				h = b.attr("data-compilation");
			else g = "content", h = b.attr("data-id");
			Favorites.addFavorite(h, g, function(a) {
				typeof a.error === "undefined" && (a.status > 0 ? b.addClass("active") : (c.removeClass("active").text(a.subscribe_text), b.removeClass("active")), b.text(a.text))
			}, !1, b.parent());
			a.preventDefault()
		});
		$("div.promo-top a.subscribe").click(function(a) {
			var b = $(this),
				c = b.parent().find(".fav");
			if (b.attr("data-compilation")) var g = "compilation",
				h = b.attr("data-compilation");
			else g = "content", h = b.attr("data-id");
			Favorites.addFavorite(h, g, function(a) {
				typeof a.error === "undefined" && (a.subscribed == 1 ? b.addClass("active") : b.removeClass("active"), b.text(a.subscribe_text), a.status == 1 && c.addClass("active").text(a.text))
			}, !0, b.parent());
			a.preventDefault()
		});
		ratingSelector({
			selector: ".ratings_selector"
		});
		$("#awarded_criteria").change(function() {
			var a = $("#awards_select_form"),
				b = $("#awards_list"),
				a = $(a).serialize();
			$.ajax({
				url: "/video/show/awards/?" + a,
				type: "GET",
				success: function(a) {
					$(b).html(a)
				}
			})
		});
		$("#show_laureates").click(function() {
			var a = $("#awards_select_form"),
				b = $("#awards_list"),
				a = $(a).serialize();
			$.ajax({
				url: "/video/show/awards/?" + a + "&limit=100",
				type: "GET",
				success: function(a) {
					$(b).html(a)
				}
			});
			return !1
		});
		a = $("#empty_selection_message");
		a.length > 0 && a.load("/genre/empty/selection/message");
		$("ul.films-gallery > li").iviMoviePopup()
	},
	episodes: [],
	currentIndex: 0,
	currentId: null,
	nextVideoId: null,
	baseId: null,
	autoPlay: 1,
	num: function(a, b, c, e) {
		var d = a % 10;
		if (d == 0 || d >= 5 || a >= 11 && a <= 19) return "" + a + " " + e;
		if (d == 1) return "" + a + " " + b;
		if (d >= 2 && d <= 4) return "" + a + " " + c
	},
	login: function() {
		return this
	},
	registerAccessObject: function(a) {
		_self = this;
		_self.access_content_id = a.content_id;
		_self.access_subscription_id = a.subscription_id;
		_self.access_content_callback = a.callback
	},
	runAccessObject: function() {
		_self = this;
		this.accessInterval && clearInterval(this.accessInterval);
		_self.accessObjectDuration = 0;
		_self.accessObjectDelay = 5E3;
		_self.access_content_id ? Payment.accessContent(_self.access_content_id, _self.access_content_callback) : _self.access_subscription_id && Payment.accessSubscription(_self.access_subscription_id, _self.access_content_callback);
		this.accessInterval = setInterval(function() {
			_self.access_content_id ? Payment.accessContent(_self.access_content_id, _self.access_content_callback) : _self.access_subscription_id && Payment.accessSubscription(_self.access_subscription_id, _self.access_content_callback);
			_self.accessObjectDuration++;
			if (_self.accessObjectDuration >= 36) _self.accessObjectDelay = 6E4
		}, _self.accessObjectDelay)
	},
	openPayment: function(a) {
		Payment.openPayment(a)
	},
	profile: function() {
		$("ul#user-info li a.tab-link").each(function(a, b) {
			var c = $(b).attr("href").split("#");
			c.length > 1 && $(b).click(function() {
				e("#" + c[1]);
				$("#user-menu").hide();
				return !1
			})
		});
		$("#activate-gift").click(function() {
			Payment.profileActivateGift($("#elem_gift-code").val());
			return !1
		});
		this.currentPage = "profile";
		cuSel({
			changedEl: "#tab_personal .birthdate select.w55, #tab_personal .birthdate select.w75, #tab_personal .birthdate select.w95",
			visRows: 5,
			scrollArrows: !1
		});
		var a = $("div.content-area"),
			b = $("#tabs-menu_profile a"),
			c = null;
		a.hide();
		b.click(function(b) {
			c = this.hash.replace("#", "");
			d(c);
			var e = this.hash.replace("#", "");
			da.on(e + ".show").fire();
			a.hide();
			a.filter("#tab_" + e).show();
			$(".tabs-menu a").parent().removeClass("active");
			$(this).parent().addClass("active");
			window.location.hash = this.hash;
			b.preventDefault()
		});
		var e = function(c) {
			hash_info = c.replace("#", "").split("?");
			da.on(hash_info[0] + ".show").fire(hash_info[1]);
			a.hide();
			a.filter("#tab_" + hash_info[0]).show();
			b.filter('[href="profil.php#' + hash_info[0] + '"]').parent().addClass("active")
		},
			d = function(a) {
				a == "money" ? $("#del-auto-prolong").css("display", "block") : $("#del-auto-prolong").css("display", "none")
			};
		da.ugc.init_watchhistory_tab();
		if (window.location.hash) e(window.location.hash);
		else {
			var f = getURLParameter("profile_tab");
			f != "null" ? e("#" + f) : e("#recommendations")
		}
		d(c);
		styleRadioChoose($("ul.choose"));
		$("ul.choose").click(function() {
			styleRadioChoose($("ul.choose"))
		});
		$("#gender_male", "#gender").click(function() {
			setGender("1", this)
		});
		$("#gender_female", "#gender").click(function() {
			setGender("2", this)
		});
		$.browser.opera && $.browser.version.slice(0, 4) < "10.6" && $("#order-block").addClass("static");
		cuSel({
			changedEl: "select.w146h20",
			visRows: 10,
			scrollArrows: !1
		});
		$("#fav_elem_order-by").change(function() {
			category = $(this).val();
			category = category == "all" ? null : parseInt(category);
			$("#fav_category").val(category);
			showFavPage(1)
		});
		$("#form_watched").submit(function() {
			showPage(parseInt($("#page_number").val()));
			return !1
		});
		$("#fav_form").submit(function() {
			showFavPage(parseInt($("#page_fav_number").val()));
			return !1
		});
		$("#page_fav_next").live("click", function() {
			curPage = parseInt($("#page_fav_number").val());
			max = parseInt($("#max_fav_page").val());
			curPage >= max || showFavPage(curPage + 1);
			return !1
		});
		$("#page_fav_prev").live("click", function() {
			curPage = parseInt($("#page_fav_number").val());
			max = parseInt($("#max_fav_page").val());
			curPage - 1 <= 0 || showFavPage(curPage - 1);
			return !1
		});
		$("#email-notice-close").click(function() {
			$("#email-notice").css("display", "none")
		});
		$("#favorites-table .link-delete").live("click", function(a) {
			var b =
			$(this).attr("data-id"),
				c = $(this).attr("data-type"),
				d = this;
			removeFromFav(b, c, function(a) {
				if (a && !a.error) {
					$(d).parent().parent().remove();
					decCounter("#user_profile_menu_show_favourites_items_count");
					var e = function(a) {
						var a = $(a),
							b = a.text(),
							c = 0,
							d = b.match(/(\d+)/);
						d.length >= 2 && (c = d[1]);
						c -= 1;
						c < 0 && (c = 0);
						a.text(b.replace(/(\d+)/, c))
					};
					e("#profile_selector_favourites_items_count");
					e("#order-block .cuselText");
					var h = {
						14: "profile_selector_favourites_contents_items_count",
						15: "profile_selector_favourites_compilations_items_count",
						16: "profile_selector_favourites_programs_items_count",
						17: "profile_selector_favourites_cartoons_items_count"
					};
					$.ajax("/user/ajax/get/category/list", {
						data: {
							content_id: b,
							content_type: c
						},
						dataType: "json"
					}).success(function(a) {
						a && a.categoryList && $(a.categoryList).each(function() {
							var a = parseInt(this);
							h[a] && e("#" + h[a])
						})
					})
				}
			});
			a.preventDefault()
		});
		$("body").on("click", "#favorites-table .nice-checkbox + label", function() {
			var a = $(this).siblings("input"),
				b = a.attr("id").replace("elem-subscribe-", "");
			$.post("/user/ajax/fav/subscribe", {
				id: b,
				type: "compilation"
			}, function(b) {
				b.subscribed !== void 0 && a.attr("checked", b.subscribed == 1 ? !0 : !1)
			}, "json")
		});
		$("#elem-profile_birth_month").change(function() {
			var a = $("#elem-profile_birth_month").val(),
				b = $("#elem-profile_birth_year").val(),
				c = $("#elem-profile_birth_day").val(),
				a = getDays(a, b, c, "elem-profile_birth_day");
			jQuery("#cuselFrame-elem-profile_birth_day").replaceWith(a);
			cuSel({
				changedEl: "#elem-profile_birth_day",
				visRows: 5
			})
		});
		$("#elem-profile_birth_year").change(function() {
			var a = $("#elem-profile_birth_month").val(),
				b = $("#elem-profile_birth_year").val(),
				c = $("#elem-profile_birth_day").val(),
				a = getDays(a, b, c, "elem-profile_birth_day");
			jQuery("#cuselFrame-elem-profile_birth_day").replaceWith(a);
			cuSel({
				changedEl: "#elem-profile_birth_day",
				visRows: 5
			})
		});
		$("#favorites-table .scale-rating ul li").click(function(a) {
			var b = $(this).attr("class").replace("rate", ""),
				c = $(this).parent().attr("data-id"),
				d = $(this).parent().parent();
			addRate(c, b, function(a) {
				typeof a.error == "undefined" && ($("div", d).css("width", b * 10 + "%"), $(d).addClass("personal"))
			});
			a.preventDefault()
		});
		$("#continue-close-trial").click(function() {
			loadModal("trial_notice").done(function(a) {
				$(a).jqm().jqmHide();
				Payment.closeTrial(null, !0)
			})
		});
		var g = function(a, b, c) {
			a = $(a);
			b = a.text() == b ? c : b;
			a.text(b)
		},
			f = $("#social-network");
		$("ul.social-networks-list > li", f).each(function(a, b) {
			var c = $(b),
				d = $(".settings_toggle_link", c),
				e = $(".action", d);
			d.click(function(a) {
				c.toggleClass("expanded");
				g(e, "Редактировать", "Свернуть");
				a.preventDefault()
			});
			$("button.cancel", c).click(function(a) {
				c.toggleClass("expanded");
				g(e, "Редактировать", "Свернуть");
				a.preventDefault()
			});
			$(".social_options_form", c).submit(function(a) {
				var b = $(this).serialize();
				$.ajax("/user/save/social/options/", {
					data: b
				}).done(function() {
					c.toggleClass("expanded");
					g(e, "Редактировать", "Свернуть")
				});
				a.preventDefault()
			})
		});
		return this
	},
	getNextVideo: function() {
		if (this.episodes.length == 0) return this.nextVideoId;
		this.currentIndex++;
		if (this.currentIndex == this.episodes.length) this.currentIndex = 0;
		return this.currentId = this.episodes[this.currentIndex]
	},
	getNextVideoLink: function() {
		return this.nextVideoLink
	},
	eventMessageInit: function() {
		EventMessage.init();
		return this
	},
	setRounded: function() {},
	needRefresh: 0,
	promo: function() {
		if (window.location.hash == "#tinkoff") return document.getElementById("tinkoff-iframe").scrollIntoView(!0), !1;
		$("#tinkoff_form_button").click(function() {
			if (IviStore.user_id === null) return openModal("auth", !0), !1;
			return !0
		})
	},
	pageModalPayment: function(a) {
		$("#payment-choose-pay-period input").click(function() {
			var b = this.id.replace(/pay-period-/, "");
			a.subscription = b;
			b = "#" + $("#tabs-menu_payment li.active").attr("id") + " a";
			$(b).trigger("click")
		});
		$("#tab-cards a").click(function() {
			Payment.tabsCards(a)
		});
		$("#tab-wm a").click(function() {
			Payment.tabsWM(a)
		});
		$("#tab-qiwi a").click(function() {
			Payment.tabsQiwi(a)
		});
		$("#tab-yandex a").click(function() {
			Payment.tabsYM(a)
		});
		$("#tab-sms a").click(function() {
			Payment.tabsSms(a)
		});
		$("#tab-gift a").click(function() {
			Payment.tabsGift(a)
		});
		$("#tab-account a").click(function() {
			Payment.tabsAcc(a)
		})
	},
	load_vi_script: function() {
		var a = "http://sync.ivi.ru/code/?flashid=XXX&r=" + getRandomDigits(10);
		loadScript(a)
	},
	landing: function() {
		var a = $("#landing-form"),
			b = a.find("#promo-key"),
			c = $("#landing-form-error");
		isLoggedIn() || b.click(function() {
			$("#landing-auth-rule").addClass("error")
		});
		a.submit(function() {
			if (!isLoggedIn()) return !1;
			c.addClass("hidden");
			Payment.activateGifts(b.val(), function(a) {
				a.error ? (b.addClass("error"), c.html(a.error), c.removeClass("hidden")) : (a.open_payment && a.subscription_id && $.jStorage.set("gift", a.key), window.location = "/plus/")
			});
			return !1
		});
		$("#promo-key").dynamicInput();
		$("#landing_login_link").click(function() {
			if (isLoggedIn()) return !1;
			openModal("auth")
		});
		$("#landing_reg_link").click(function() {
			isLoggedIn() || showReg();
			return !1
		})
	},
	singlePlayer: function(a) {
		this.nextVideoLink = a.nextVideoLink || null;
		this.nextVideoId = a.nextVideoId || null;
		this.baseId = a.videoId || null
	},
	sendAdcErotica: function(a) {
		a.target.href.indexOf("plus") >= 0 ? $(a.target).hasClass("movies") ? xt_adc(this, "PUB-[header_new_2014]-[movies_plus_erotics]") : xt_adc(this, "PUB-[header_new_2014]-[ivi_plus_erotics]") : a.target.href.indexOf("series") >= 0 ? xt_adc(this, "PUB-[header_new_2014]-[series_erotika]") : xt_adc(this, "PUB-[header_new_2014]-[movies_erotika]")
	}
};
$(document).ready(function() {
	Runner.common()
});
var ivi = {
	brand: {
		add: function(a, b, c, e, d) {
			getRequestParameterFromUrl(d, "gotourl") == "mazda_preroll" ? (a = getRequestParameterFromUrl(d, "connectionID"), showAdrimeAd(a)) : $("#video-adv").show().css("background-color", "#000").flashembed({
				src: d,
				id: "flash-video-adv",
				width: "100%",
				height: "100%",
				base: "/images/da/",
				allowScriptAccess: "always",
				allowFullScreen: "true",
				wmode: "transparent"
			})
		},
		del: function() {
			var a = $("#flash-video-player").get(0);
			$("#video-adv").hide().html("");
			a.handleSuperrollEnd()
		}
	}
};

function getNextVideo() {
	if (Runner.autoPlay == 1 || $("#auto_advance").attr("checked")) return Runner.getNextVideo()
}
function setCurrentVideoID(a) {
	Runner.baseId != parseInt(a) && processVideoLinkById(a)
}
function whatsNext() {
	if (Runner.autoPlay == 1 || $("#auto_advance").attr("checked")) {
		var a = window.location.search,
			b = Runner.getNextVideoLink();
		if (b && b.length > 0) return window.location = b + a, "";
		b = Runner.getNextVideo();
		typeof b !== "undefined" && processVideoLinkById(b, function(b) {
			window.location = b + a
		})
	}
	return ""
}

function playNext(a, b) {
	if (Runner.autoPlay == 1 || $("#auto_advance").attr("checked")) {
		var c = window.location.search;
		processVideoLinkByKindAndId(a, b, function(a) {
			window.location.pathname.match(/\/player\/$/) != null ? (params = a.split("/"), window.location = window.location.pathname + c.replace(/videoid=\d+/, "videoid=" + params[params.length - 1])) : window.location = a + c
		})
	}
}
var Favorites = {
	checkIn: function(a, b, c) {
		IviStore.user_id === null && thisMovie(a).hasFavorite(JSON.stringify({
			error: "auth"
		}));
		$.post("/user/ajax/check/favourite", {
			id: b,
			type: c
		}, function(b) {
			thisMovie(a).hasFavorite(JSON.stringify(b))
		}, "json")
	},
	addFavorite: function(a, b, c, e, d) {
		if (isLoggedIn()) {
			var f = function() {
				e ? subscribeFavorite(a, b, g) : add2Fav(a, b, g)
			},
				g = function(a) {
					typeof a.error === "undefined" && typeof c == "function" && c(a);
					d && d.data("can_click", !0)
				};
			d ? d.data("can_click") != !1 && (d.data("can_click", !1), f()) : f()
		} else {
			var h =
			Lawnchair({}, function() {});
			h.get("addfavorites", function(c) {
				var d = [];
				if (c !== null) d = c.ids;
				var c = {
					id: a,
					type: b,
					subscribe: e
				},
					f;
				a: {
					f = d;
					for (var g = 0; g < f.length; g++) if (JSON.stringify(f[g]) === JSON.stringify(c)) {
						f = !0;
						break a
					}
					f = !1
				}
				f === !1 && (d.push(c), h.save({
					key: "addfavorites",
					ids: d
				}))
			});
			openModal("auth")
		}
	},
	removeFavorite: function(a, b, c) {
		isLoggedIn() ? removeFromFav(a, b, function(a) {
			typeof a.error === "undefined" && a.status == 1 && typeof c == "function" && c(a)
		}) : openModal("auth")
	},
	addFavoriteFromPlayer: function() {},
	removeFavoriteFromPlayer: function() {},
	subscribeFavoriteFromPlayer: function() {},
	unsubscribeFavoriteFromPlayer: function() {}
};
//public_html/js/compiled/plus_promo.js
var plus_promo = function(height_delta) {
	$("ul.films-gallery > li").iviMoviePopup();
	cuSel({
		changedEl: "select.w146h20",
		visRows: 10,
		scrollArrows: false
	});
	var $more = $("#plus_more_button");
	if (!$more.length) return;
	var scrollDelta = 200;
	var $catalog = $("#plus_promo_catalog");
	var createLoad = function() {
		var lock = false;
		return function() {
			var href = $more.attr("href");
			if (!href) return false;
			if (lock) return false;
			lock = true;
			$.ajax({
				url: href,
				dataType: "json",
				success: function(data) {
					$catalog.html($catalog.html() + data.list);
					$("ul.films-gallery > li").iviMoviePopup();
					if (data.hasMore) {
						$more.attr("href", data.hasMore);
						moreTop = $more.offset().top
					} else {
						$more.attr("href", "");
						$more.hide();
						moreTop = 0
					}
					lock = false
				}
			});
			return false
		}
	};
	var load = createLoad();
	$more.click(load);
	var moreTop = $more.offset().top;
	$(window).scroll(function() {
		if (moreTop == 0) return true;
		var height = $(document.body).height();
		var scroll = $(document).scrollTop();
		if (scroll > moreTop - height - scrollDelta) load()
	})
};
//public_html/js/compiled/jquery.plusPromo.js
jQuery.fn.plusPromo = function(a) {
	$this = $(this);
	var f = null,
		c = null,
		g = null,
		e = null,
		i = $.browser.msie && $.browser.version == 8,
		b = {
			init: function() {
				$buttons = $this.find(a.buttons).find("li");
				$images = $this.find(a.images).find("li");
				$infos = $this.find(a.infos).find("li");
				$prev = $(a.buttonPrev, $this);
				$next = $(a.buttonNext, $this);
				$links = $this.find(a.images).find("a");
				$ie8infos = $this.find(a.infos).find(".info-item");
				$ie8viewbuttons = $this.find(a.infos).find(".action-button-wrapper");
				replaceSwf($links);
				$("div#wrapper-swf-promotop").addClass("wrapper-swf-promotop");
				f = $buttons.length;
				if (Math.max($buttons.length, $images.length, $infos.length) == Math.min($buttons.length, $images.length, $infos.length)) {
					g = f - 1;
					$buttons.click(function() {
						b.switchTo($(this).index())
					});
					$prev.click(b.switchPrev);
					$next.click(b.switchNext);
					if (!a.start) a.start = 1;
					b.switchTo(a.start - 1);
					b.startAutoSwitch();
					$this.hover(b.stopAutoSwitch, b.startAutoSwitch);
					$this.addClass(a.loadedClass)
				}
			},
			switchTo: function(d) {
				if (d != c) {
					c != null && ($images.eq(c).stop().fadeOut(a.animSpeed), $infos.eq(c).stop().fadeOut(a.animSpeed), $buttons.eq(c).removeClass(a.selectedClass), b.IE8_fade("out", c));
					var h = $images.eq(d);
					h.stop().show().fadeTo(a.animSpeed, 1);
					h.find("object").length || $infos.eq(d).stop().show().fadeTo(a.animSpeed, 1);
					$buttons.eq(d).addClass(a.selectedClass);
					b.IE8_fade("in", d);
					b.ad(d);
					c = d;
					b.adjustPrevNextButtons()
				}
			},
			switchNext: function() {
				var d = c + 1;
				if (d > g) if (a.isCircular) d = 0;
				else
				return;
				b.switchTo(d);
				Boolean(e) && b.startAutoSwitch()
			},
			switchPrev: function() {
				var d = c - 1;
				if (d < 0) if (a.isCircular) d = f - 1;
				else
				return;
				b.switchTo(d)
			},
			adjustPrevNextButtons: function() {
				a.isCircular ? ($prev.show(), $next.show()) : (c == 0 ? $prev.hide() : $prev.show(), c == g ? $next.hide() : $next.show())
			},
			startAutoSwitch: function() {
				a.autoSwitchInterval && (e = setTimeout(b.switchNext, a.autoSwitchInterval * 1E3))
			},
			stopAutoSwitch: function() {
				clearTimeout(e);
				e = null
			},
			ad: function(a) {
				var b = $images.eq(a).find(".pixel"),
					a = $images.eq(a).find(".adriver");
				b.length && $("<img>").attr("src", b.text());
				a.length && $("<img>").attr("src", a.text())
			},
			IE8_fade: function(b, c) {
				i && (b == "in" ? $ie8viewbuttons.eq(c).show() : $ie8viewbuttons.eq(c).hide(), $ie8infos.eq(c).stop().fadeTo(a.animSpeed, b == "in" ? 1 : 0))
			},
			end: 1
		},
		a = jQuery.extend({
			autoSwitchInterval: 10,
			animSpeed: "slow",
			selectedClass: "selected",
			loadedClass: "loaded",
			isCircular: !0,
			buttonNext: ".right-arrow",
			buttonPrev: ".left-arrow",
			buttons: null,
			images: null,
			info: null
		}, a);
	b.init()
};
//public_html/js/compiled/jquery.horizontalPager.js
jQuery.fn.horizontalPager = function(options) {
	var $this = $(this);
	var $items = null;
	var $pager = null;
	var $buttons = null;
	var selectedIndex = 0;
	var itemsAmount = null;
	var pagesAmount = null;
	var itemWidth = null;
	var itemMargin = null;
	var methods = {
		init: function() {
			if ($this.data("horizontalPager")) return;
			else $this.data("horizontalPager", true);
			$items = $this.children("li");
			itemsAmount = $items.length;
			pagesAmount = Math.ceil(itemsAmount / options.pageSize);
			$pager = $(options.pager).empty();
			for (var i = 0; i < pagesAmount; i++) $pager.append("<li/>");
			$buttons = $pager.find("li");
			$buttons.first().addClass(options.selectedClass);
			itemWidth = $items.first().width();
			itemMargin = parseInt($items.last().css("margin-left"));
			$buttons.click(function() {
				methods.switchTo($(this).index())
			})
		},
		switchTo: function(newIndex) {
			if (newIndex == selectedIndex) return;
			$buttons.removeClass(options.selectedClass).eq(newIndex).addClass(options.selectedClass);
			var shift = -(itemWidth + itemMargin) * newIndex * options.pageSize;
			$items.first().stop().animate({
				"margin-left": shift
			}, options.animSpeed * options.pageSize);
			selectedIndex = newIndex
		},
		end: 1
	};
	var options = jQuery.extend({
		animSpeed: 200,
		selectedClass: "selected",
		pageSize: 1,
		viewportSize: 3,
		pager: null,
		end: 1
	}, options);
	methods.init()
};
//public_html/js/compiled/jquery.tinyscrollbar.js
(function($) {
	$.tiny = $.tiny || {};
	$.tiny.scrollbar = {
		options: {
			axis: "y",
			wheel: 40,
			scroll: true,
			lockscroll: true,
			size: "auto",
			sizethumb: "auto"
		}
	};
	$.fn.tinyscrollbar = function(options) {
		var options = $.extend({}, $.tiny.scrollbar.options, options);
		this.each(function() {
			$(this).data("tsb", new Scrollbar($(this), options))
		});
		return this
	};
	$.fn.tinyscrollbar_update = function(sScroll) {
		return $(this).data("tsb").update(sScroll)
	};
	function Scrollbar(root, options) {
		var oSelf = this;
		var oWrapper = root;
		var oViewport = {
			obj: $(".viewport", root)
		};
		var oContent = {
			obj: $(".overview", root)
		};
		var oScrollbar = {
			obj: $(".scrollbar", root)
		};
		var oTrack = {
			obj: $(".track", oScrollbar.obj)
		};
		var oThumb = {
			obj: $(".thumb", oScrollbar.obj)
		};
		var sAxis = options.axis == "x",
			sDirection = sAxis ? "left" : "top",
			sSize = sAxis ? "Width" : "Height";
		var iScroll, iPosition = {
			start: 0,
			now: 0
		},
			iMouse = {};
		function initialize() {
			oSelf.update();
			setEvents();
			return oSelf
		}
		this.update = function(sScroll) {
			oViewport[options.axis] = oViewport.obj[0]["offset" + sSize];
			oContent[options.axis] = oContent.obj[0]["scroll" + sSize];
			oContent.ratio = oViewport[options.axis] / oContent[options.axis];
			oScrollbar.obj.toggleClass("disable", oContent.ratio >= 1);
			oTrack[options.axis] = options.size == "auto" ? oViewport[options.axis] : options.size;
			oThumb[options.axis] = Math.min(oTrack[options.axis], Math.max(0, options.sizethumb == "auto" ? oTrack[options.axis] * oContent.ratio : options.sizethumb));
			oScrollbar.ratio = options.sizethumb == "auto" ? oContent[options.axis] / oTrack[options.axis] : (oContent[options.axis] - oViewport[options.axis]) / (oTrack[options.axis] - oThumb[options.axis]);
			iScroll = sScroll == "relative" && oContent.ratio <= 1 ? Math.min(oContent[options.axis] - oViewport[options.axis], Math.max(0, iScroll)) : 0;
			iScroll = sScroll == "bottom" && oContent.ratio <= 1 ? oContent[options.axis] - oViewport[options.axis] : isNaN(parseInt(sScroll)) ? iScroll : parseInt(sScroll);
			setSize()
		};
		function setSize() {
			oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
			oContent.obj.css(sDirection, -iScroll);
			iMouse["start"] = oThumb.obj.offset()[sDirection];
			var sCssSize = sSize.toLowerCase();
			oScrollbar.obj.css(sCssSize, oTrack[options.axis]);
			oTrack.obj.css(sCssSize, oTrack[options.axis]);
			oThumb.obj.css(sCssSize, oThumb[options.axis])
		}
		function setEvents() {
			oThumb.obj.bind("mousedown", start);
			oThumb.obj[0].ontouchstart = function(oEvent) {
				oEvent.preventDefault();
				oThumb.obj.unbind("mousedown");
				start(oEvent.touches[0]);
				return false
			};
			oTrack.obj.bind("mouseup", drag);
			if (options.scroll && this.addEventListener) {
				oWrapper[0].addEventListener("DOMMouseScroll", wheel, false);
				oWrapper[0].addEventListener("mousewheel", wheel, false)
			} else if (options.scroll) oWrapper[0].onmousewheel =
			wheel
		}
		function start(oEvent) {
			iMouse.start = sAxis ? oEvent.pageX : oEvent.pageY;
			var oThumbDir = parseInt(oThumb.obj.css(sDirection));
			iPosition.start = oThumbDir == "auto" ? 0 : oThumbDir;
			$(document).bind("mousemove", drag);
			document.ontouchmove = function(oEvent) {
				$(document).unbind("mousemove");
				drag(oEvent.touches[0])
			};
			$(document).bind("mouseup", end);
			oThumb.obj.bind("mouseup", end);
			oThumb.obj[0].ontouchend = document.ontouchend = function(oEvent) {
				$(document).unbind("mouseup");
				oThumb.obj.unbind("mouseup");
				end(oEvent.touches[0])
			};
			return false
		}
		function wheel(oEvent) {
			if (!(oContent.ratio >= 1)) {
				var oEvent = oEvent || window.event;
				var iDelta = oEvent.wheelDelta ? oEvent.wheelDelta / 120 : -oEvent.detail / 3;
				iScroll -= iDelta * options.wheel;
				iScroll = Math.min(oContent[options.axis] - oViewport[options.axis], Math.max(0, iScroll));
				callback(iScroll);
				oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
				oContent.obj.css(sDirection, -iScroll);
				if (options.lockscroll || iScroll !== oContent[options.axis] - oViewport[options.axis] && iScroll !== 0) {
					oEvent = $.event.fix(oEvent);
					oEvent.preventDefault()
				}
			}
		}
		function end(oEvent) {
			$(document).unbind("mousemove", drag);
			$(document).unbind("mouseup", end);
			oThumb.obj.unbind("mouseup", end);
			document.ontouchmove = oThumb.obj[0].ontouchend = document.ontouchend = null;
			return false
		}
		function drag(oEvent) {
			if (!(oContent.ratio >= 1)) {
				iPosition.now = Math.min(oTrack[options.axis] - oThumb[options.axis], Math.max(0, iPosition.start + ((sAxis ? oEvent.pageX : oEvent.pageY) - iMouse.start)));
				iScroll = iPosition.now * oScrollbar.ratio;
				callback(iScroll);
				oContent.obj.css(sDirection, -iScroll);
				oThumb.obj.css(sDirection, iPosition.now)
			}
			return false
		}
		function callback(iScroll) {
			if (!options.callback) return;
			options.callback(oContent.obj, iScroll, oViewport.obj, oSelf)
		}
		return initialize()
	}
})(jQuery);
//public_html/js/compiled/jquery.videoBlock.js
(function($) {
	$.fn.videoBlock = function(settings) {
		var videoBlock = {
			settings: null,
			steps: [1, 2, 3],
			tpl: null,
			ids: [],
			jQuery: function(elem, settings) {
				videoBlock.settings = jQuery.extend({
					url: "/video/json/video/items",
					tpl: "video_item",
					limit: 8,
					force: false,
					callback: function($element) {},
					hide_empty_block: false
				}, settings);
				if (settings.steps !== undefined && settings.steps.length > 0) videoBlock.steps = settings.steps;
				$(elem).each(function(index, element) {
					videoBlock.init(element)
				})
			},
			init: function(element) {
				this.tpl = $("#" + this.settings.tpl).template();
				var $parent = $(element);
				this.cont = $parent;
				var $container = $parent.find(".vb-container:first");
				$container.find("li.vb-item").iviMoviePopup();
				var $link = $parent.find(".vb-get-more:first");
				var $selector = $parent.find(".vb-selector:first");
				if (this.settings.force) $container.find("li.vb-item").remove();
				this.selectorInit($parent, $container, $selector, $link);
				this.getMoreInit($parent, $container, $selector, $link)
			},
			createOverheadLimit: function(limit) {
				if (limit && limit > 0) return limit + 1;
				return false
			},
			getMoreInit: function($parent, $container, $selector, $link) {
				var that = this;
				var offset = this.getOffset($container);
				var click = function() {
					that.startLoader($container);
					var limit = that.getLimit($container);
					var offset = that.getOffset($container);
					var overheadLimit = that.createOverheadLimit(limit);
					var ids = that.getIds($parent, $selector, $link, offset, overheadLimit);
					if (limit === false || ids.length == 0) {
						that.stop($container, $link);
						return
					}
					that.doRequest($parent, $container, {
						action: that.settings.action,
						ids: ids,
						limit: overheadLimit,
						offset: offset,
						exclude: that.settings.excludeId
					}, function(elements) {
						if (limit >= elements.length) that.stop($container, $link);
						return elements.slice(0, limit)
					}, function() {
						var limit = that.getLimit($container);
						if (limit === false) that.stop($container, $link)
					});
					return false
				};
				$link.click(click);
				if (offset == 0) click();
				else if (offset < this.settings.limit) this.stop($container, $link)
			},
			selectorInit: function($parent, $container, $selector, $link) {
				if ($selector.length) {
					var limit = this.settings.limit;
					var that = this;
					this.ids = this.parseAllIds($selector);
					$selector.change(function() {
						that.startLoader($container);
						var overheadLimit = that.createOverheadLimit(limit);
						that.doRequest($parent, $container, {
							action: that.settings.action,
							ids: that.getIds($parent, $selector, $link, 0, overheadLimit),
							limit: overheadLimit,
							offset: 0,
							exclude: that.settings.excludeId
						}, function(elements) {
							if (limit >= elements.length) that.stop($container, $link);
							else $link.show();
							$container.empty();
							return elements.slice(0, limit)
						}, function() {})
					})
				}
			},
			getOffset: function($container) {
				return $container.find("li.vb-item").length
			},
			getNextStepByRows: function(rows) {
				var stepKey =
				0;
				var stepRows = 0;
				for (var key in this.steps) {
					stepKey = parseInt(key);
					if (stepKey + 1 == this.steps.length) return false;
					stepRows += this.steps[stepKey];
					if (rows == stepRows) return stepKey + 1;
					if (rows < stepRows) return stepKey
				}
				return false
			},
			getLimit: function($container) {
				var limit = videoBlock.settings.limit;
				var offset = this.getOffset($container);
				var rows = Math.floor(offset / limit);
				var step = this.getNextStepByRows(rows);
				if (step === false) return false;
				return this.steps[step] * limit
			},
			parseAllIds: function($selector) {
				var ids = [];
				var fillIds = function($element, attr) {
					$element.each(function(index, element) {
						var value = $(element).attr(attr);
						if (value != "all") ids[ids.length] = value
					})
				};
				if ($selector.length) {
					var $options = $selector.find("options");
					if ($options.length) fillIds($options, "value");
					else {
						var $cusel = $selector.find(".cusel-scroll-pane span");
						if ($cusel.length) fillIds($cusel, "val")
					}
				}
				return ids
			},
			getIds: function($parent, $selector, $link, offset, limit) {
				var id = 0;
				if ($.isFunction(this.settings.ids)) {
					var ids = this.settings.ids(offset, limit);
					if ($.isArray(ids) || this.isDeferred(ids)) return ids;
					return []
				}
				if ($selector.length) {
					var $cuselSelector = $selector.find("input:first");
					if ($cuselSelector.length) id = $cuselSelector.val();
					else id = $selector.val()
				} else if ($link && $link.length) id = $link.data("id");
				if (id == "all") return this.ids;
				return [id]
			},
			doRequest: function($parent, $container, data, beforeAppend, afterAppend) {
				var that = this;
				var lock = false;
				var _doRequest = function($parent, $container, data, beforeAppend, afterAppend) {
					if (!lock) {
						lock = true;
						$.ajax({
							url: that.settings.url,
							dataType: "json",
							type: "get",
							data: data,
							success: function(response) {
								videoBlock.render($container, response, beforeAppend, afterAppend)
							},
							fail: function(error) {},
							complete: function(jqXHR, textStatus) {
								lock = false
							}
						})
					}
				};
				if (this.isDeferred(data["ids"])) data["ids"].done(function(recommendedIds) {
					var explanations = this;
					var explanationsById = {};
					$.each(explanations, function(index, expl) {
						explanationsById[recommendedIds[index]] = expl
					});
					that.cont.data("explanationsById", explanationsById);
					data["ids"] = recommendedIds;
					_doRequest($parent, $container, data, beforeAppend, afterAppend)
				});
				else _doRequest($parent, $container, data, beforeAppend, afterAppend)
			},
			startLoader: function($container) {
				$container.addClass("loading")
			},
			finishLoader: function($container) {
				$container.removeClass("loading")
			},
			stop: function($container, $link) {
				$link.hide();
				this.finishLoader($container)
			},
			render: function($container, elements, beforeAppend, afterAppend) {
				var that = this;
				elements = beforeAppend(elements);
				if (elements.length > 0) if (this.tmpl) $container.append($.tmpl(this.tpl, elements)).iviMoviePopup();
				else $.each(elements, function(index, element) {
					var $el = $(element);
					$el.iviMoviePopup();
					$container.append($el);
					that.settings.callback($el)
				});
				else if (that.settings.hide_empty_block) $container.parent().hide();
				afterAppend();
				this.finishLoader($container)
			},
			isDeferred: function(obj) {
				return $.isFunction(obj.promise)
			}
		};
		videoBlock.jQuery(this, settings)
	}
})(jQuery);
//public_html/js/compiled/jquery.seriesBlock.js
(function($) {
	$.fn.seriesBlock = function(settings) {
		var seriesBlock = {
			$seasons: null,
			$episodes: null,
			$element: null,
			$seasonsElements: null,
			$arrowUp: null,
			$arrowDown: null,
			$active: null,
			maxSeriesCount: 10,
			tmpl: null,
			init: function($element, settings) {
				if ($element.length) {
					this.$element = $element;
					this.$seasons = $element.find(".seasons-list-block");
					this.$seasonsElements = this.$seasons.find("li a");
					this.$episodes = $element.find(".episodes-gallery");
					this.$arrowUp = $element.find(".list-pick-up");
					this.$arrowDown = $element.find(".list-lower-down");
					this.tmpl = $("#" + settings.tmpl).template();
					this.initSeasons()
				}
			},
			initSeasons: function() {
				this.setSeasonsScroller();
				this.setSeriesSwitcher()
			},
			showSeries: function(elements) {
				if (elements.length) if (this.tmpl) {
					this.$episodes.empty();
					this.$episodes.append($.tmpl(this.tmpl, elements))
				} else this.$episodes.html("Проблемы при отображении шаблона");
				else this.$episodes.html("Сезон не содержит серий");
				this.$episodes.removeClass("loading")
			},
			setSeriesSwitcher: function() {
				this.$seasonsElements.click(function() {
					seriesBlock.$episodes.addClass("loading");
					seriesBlock.$active.removeClass("active");
					seriesBlock.$active = $(this).parent();
					seriesBlock.$active.addClass("active");
					var compilationId = $(this).data("compilation");
					var season = $(this).data("season");
					$.ajax({
						url: "/video/json/video/items",
						dataType: "json",
						data: {
							ids: [compilationId],
							limit: season,
							tmpl: 0,
							action: "series"
						},
						success: function(response) {
							seriesBlock.showSeries(response)
						}
					});
					return false
				})
			},
			getActiveElementNumber: function() {
				if (this.$active == null) this.$active = this.$seasons.find("li.active");
				var number =
				parseInt(this.$active.data("number"));
				if (number > 0) return number;
				return 1
			},
			setSeasonsScroller: function() {
				var activeNumber = this.getActiveElementNumber();
				if (this.$seasonsElements.length > this.maxSeriesCount) {
					this.$seasons.addClass("list-block-jcarousel");
					this.$seasons.find(".seasons-list:first").jcarousel({
						vertical: true,
						buttonNextHTML: null,
						buttonPrevHTML: null,
						initCallback: this.carousel.init,
						buttonNextCallback: this.carousel.nextCallback,
						buttonPrevCallback: this.carousel.prevCallback,
						start: activeNumber
					})
				} else {
					this.$arrowUp.hide();
					this.$arrowDown.hide()
				}
			},
			carousel: {
				init: function(carousel, state) {
					seriesBlock.$arrowUp.bind("click", function() {
						carousel.prev();
						return false
					});
					seriesBlock.$arrowDown.bind("click", function() {
						carousel.next();
						return false
					})
				},
				nextCallback: function(carousel, control, flag) {
					if (!flag) seriesBlock.$arrowDown.hide();
					else seriesBlock.$arrowDown.show()
				},
				prevCallback: function(carousel, control, flag) {
					if (!flag) seriesBlock.$arrowUp.hide();
					else seriesBlock.$arrowUp.show()
				}
			}
		};
		seriesBlock.init($(this), settings)
	}
})(jQuery);
//public_html/js/compiled/start.js
da.start = {
	ratesCount: 0,
	explanation: function($el) {
		var explanation = {
			recommendationLimit: 40,
			itemsLimit: 6,
			parseRecommendation: function(recommendation) {
				var that = explanation;
				var ids = [];
				$.each(recommendation.items, function(index, val) {
					ids.push(val.itemid)
				});
				var fetchExplanations = function(offset, limit) {
					var recommendedIds = ids.slice(offset, offset + limit);
					if (showExplanations) return gravity.fetchExplanations(gravity.scenarios.item_page, recommendation.recommendationId, recommendedIds);
					return recommendedIds
				};
				$el.videoBlock({
					action: "recommendation",
					limit: explanation.itemsLimit,
					ids: fetchExplanations,
					steps: [1, 1, 2, 2],
					callback: function($element) {
						gravity.setRecommendationClickEvent($element, recommendation.recommendationId);
						var explanationsById = $el.data("explanationsById");
						if (explanationsById) that.render($element, explanationsById)
					}
				});
				da.lazy.show($el)
			},
			render: function($element, explanationsById) {
				var itemid = $element.data("gravity-itemid");
				var expl = explanationsById[itemid];
				if (expl !== undefined) {
					$element.append("<small>" + expl["static"] + "</small>");
					if (expl.name) $element.append("<strong>" + expl["name"] + "</strong>")
				}
			}
		};
		var showExplanations = $el.data("show-explanations");
		var limitOfRecommendations = showExplanations ? explanation.recommendationLimit : explanation.itemsLimit + 1;
		gravity.fetch(gravity.scenarios.main_page, limitOfRecommendations, null, explanation.parseRecommendation)
	},
	WatchAgain: function($block) {
		var watchAgainIds = [];
		$.ajax({
			url: "/rating/ajax/get/content/ids",
			dataType: "json",
			async: false,
			success: function(response) {
				if (response.ids !== undefined) {
					watchAgainIds = response.ids;
					watchAgainIds.shuffle();
					$("#watch-again").videoBlock({
						count: 0,
						action: "rating",
						limit: 8,
						ids: function(offset, limit) {
							return watchAgainIds.slice(offset, offset + limit)
						}
					});
					da.lazy.show($block)
				} else {
					$("#watch-again").remove();
					return false
				}
			}
		})
	},
	grossFilms: function() {
		cuSel({
			changedEl: "select#grossing-film",
			visRows: 2
		});
		var ItemsContainer = function(elements, defaultKey) {
			this._items = elements;
			this._defaultKey = defaultKey
		};
		ItemsContainer.prototype = {
			all: function() {
				return this._items
			},
			get: function(key) {
				return this._items[key]
			},
			getDefault: function() {
				return this._items[this._defaultKey]
			}
		};
		var $grossList = $("#grossing_films_list");
		var $budgetList = $("#budget_films_list");
		var contentLists = new ItemsContainer({
			"gross": $grossList,
			"budget": $budgetList
		}, "gross");
		var videosLinkRefs = new ItemsContainer({
			"gross": "/videos/all/all/all/by_gross/#catalog",
			"budget": "/videos/all/all/all/by_budget/#catalog"
		}, "gross");
		var $showMoreLink = $("#grossing_film_show_more_link");
		var processGrossingFilmsSelector = function(e) {
			var selectionType = $(this).val();
			$showMoreLink.attr("href", videosLinkRefs.get(selectionType));
			var contentItems = contentLists.all();
			for (var key in contentItems) if (contentItems.hasOwnProperty(key)) contentItems[key].hide();
			contentLists.get(selectionType).show()
		};
		var setDefaultGrossingFilms = function() {
			contentLists.getDefault().show();
			$showMoreLink.attr("href", videosLinkRefs.getDefault())
		};
		setDefaultGrossingFilms();
		$("#grossing-film").change(processGrossingFilmsSelector)
	},
	similarToConcreteFilms: function($el, callback) {
		callback = callback || $.noop;
		cuSel({
			changedEl: "select#similar",
			visRows: 5
		});
		var limit =
		60;
		var $filmSelector = $("#similar");
		var kindToType = {
			1: gravity.itemTypes.content,
			2: gravity.itemTypes.compilation
		};
		var processGravityResponse = function(gravityResponse) {
			var ids = [];
			$.each(gravityResponse.items, function(index, val) {
				ids.push(val.itemid)
			});
			$el.videoBlock({
				action: "similarRecommendation",
				limit: 8,
				ids: function(offset, limit) {
					return ids.slice(offset, offset + limit)
				},
				force: true,
				callback: function($element) {
					gravity.setRecommendationClickEvent($element, gravityResponse.recommendationId)
				}
			});
			da.lazy.show($el)
		};
		var processFilmSelection = function(e) {
			var id = parseInt($filmSelector.val());
			var kind = 1;
			var sphinxId = gravity.getUniqueItemId(id, kindToType[kind]);
			gravity.fetch(gravity.scenarios.main_page_similar, limit, {
				CurrentItemId: sphinxId
			}, processGravityResponse, false);
			e.preventDefault()
		};
		$filmSelector.change(processFilmSelection);
		$filmSelector.change()
	},
	awardWinners: function() {
		cuSel({
			changedEl: "select#award-winners",
			visRows: 9
		});
		var awardWinnersListAction = "/default/ajax/award/winners/";
		var $awardWinnersBlock = $("#award_winner_list");
		var $awardSelector = $("#award-winners");
		var $awardWinnersShowMoreLink = $("#award_winners_show_more");
		var defaultItemsCount = 5;
		var updateAwardWinners = function(params) {
			var query = {
				url: awardWinnersListAction,
				data: params,
				dataType: "json"
			};
			$awardWinnersBlock.addClass("loading");
			$.ajax(query).done(function(data) {
				if (data && data.content) {
					$awardWinnersBlock.removeClass("loading").html(data.content);
					var newFrom = data.from_start ? 0 : params["from"];
					$awardWinnersBlock.data("from", newFrom)
				}
			})
		};
		var processAwardListSelector =

		function(e) {
			var awardId = $awardSelector.val();
			var params = {
				"awardid": awardId
			};
			updateAwardWinners(params);
			e.preventDefault()
		};
		var processAwardWinnersMoreLink = function(e) {
			var awardId = $awardSelector.val();
			var count = $awardWinnersBlock.data("count");
			var from = $awardWinnersBlock.data("from");
			if (!count) {
				count = defaultItemsCount;
				$awardWinnersBlock.data("count", defaultItemsCount)
			}
			from = from ? from : 0;
			var newFrom = from + count;
			var params = {
				awardid: awardId,
				from: newFrom
			};
			updateAwardWinners(params);
			e.preventDefault()
		};
		$awardSelector.change(processAwardListSelector);
		$awardWinnersShowMoreLink.click(processAwardWinnersMoreLink)
	},
	promotop: function() {
		$(".promo-top .previews ul").promoCarousel({
			animation: 750,
			auto: 7,
			imagesEl: $(".promo-top .images ul"),
			infoEl: $(".promo-top .wrapped-info .info"),
			frame: $(".promo-top"),
			buttonNext: $(".promo-buttons-container.right-arrow"),
			buttonPrev: $(".promo-buttons-container.left-arrow"),
			itemFallbackDimension: 1700,
			start: get_carousel_start_position($(".promo-top .previews ul"), "promo-top")
		});
		$(".promo-button-favorite.fav, .reviews-teaser-block .button-favorite.fav").click(function(e) {
			if (!isLoggedIn()) {
				openModal("auth");
				return false
			}
			var el = $(this);
			if (el.attr("data-compilation")) {
				var type = "compilation";
				var dataId = el.attr("data-compilation")
			} else {
				var type = "content";
				var dataId = el.attr("data-id")
			}
			if (el.hasClass("active")) add2Fav(dataId, type, function(response) {
				var text = "В очередь";
				$(".subscribe", el.parent()).removeClass("active").text("Следить");
				el.removeClass("active");
				el.text(text)
			});
			else add2Fav(dataId, type, function(response) {
				var text = "Из очереди";
				el.addClass("active");
				el.text(text)
			});
			e.preventDefault()
		});
		$(".promo-button-favorite.subscribe, .reviews-teaser-block .button-favorite.subscribe").click(function(e) {
			if (!isLoggedIn()) {
				openModal("auth");
				return false
			}
			var el = $(this);
			if (el.attr("data-compilation")) {
				var type = "compilation";
				var dataId = el.attr("data-compilation")
			} else {
				var type = "content";
				var dataId = el.attr("data-id")
			}
			if (el.hasClass("active")) subscribeFavorite(dataId, type, function(response) {
				var text = "Следить";
				el.removeClass("active");
				el.text(text)
			});
			else subscribeFavorite(dataId, type, function(response) {
				var text = "Не следить";
				el.addClass("active");
				el.text(text);
				el.parent().find(".fav").addClass("active").text("Из очереди")
			});
			e.preventDefault()
		})
	},
	persons: function() {
		cuSel({
			changedEl: "select#main_ratings_persons",
			visRows: 9
		});
		$("#main_ratings_persons").change(function() {
			var value = $(this).attr("value");
			$(".start-ratings-persons").hide();
			$("#ratings_" + value).show()
		});
		$(".ratings-persons").each(function(index, value) {
			obj = $("#" + value.id);
			num = parseInt(obj.attr("number"));
			obj.html(num + " " + pluralize(num, "фильм", "фильма", "фильмов")).removeAttr("number")
		})
	},
	ratings: function() {
		cuSel({
			changedEl: "select#main_ratings_ratings",
			visRows: 9
		});
		var links = {
			"imdb": "/videos/all/all/all/by_imdb/#catalog",
			"kp": "/videos/all/all/all/by_kp/#catalog",
			"ivi": "/videos/all/all/all/by_ivi/#catalog"
		};
		$("#main_ratings_ratings").change(function() {
			var value = $(this).attr("value");
			$("#more_ratings").attr("href", links[value]);
			$(".start-ratings-ratings").hide();
			$("#films_list_" + value).show()
		})
	},
	recommendation_targetted: function($block) {
		var recommendation = gravity.instance();
		var settings = da.settings.data($block);
		settings.target = $block.find("ul.films-gallery");
		settings.data = {
			render: $block.data("render")
		};
		var render = da.watch.render(settings.target);
		var lastRecomendationId = 0;
		settings.render = render.item;
		settings.ready = function() {
			da.lazy.show($block);
			gravity.setRecommendationClickEvent($block, lastRecomendationId);
			render.ready()
		};
		settings.more = $block.find("a.more");
		settings.error = function() {
			settings.target.removeClass("loading")
		};
		var query = {};
		if (settings.age) query.Age = settings.age;
		if (settings.gender) query.Gender = settings.gender;
		var loadEntities = da.feed.ids(settings, [8, 16, 24]);
		recommendation.parseParams(settings);
		recommendation.fetch(gravity.scenarios.main_gender_age, settings.get("prefetch", 80), query, gravity.ids(function(ids, recomendationId) {
			lastRecomendationId = recomendationId;
			loadEntities(ids)
		}))
	},
	showAjaxTopReviews: function(block, callback) {
		$.ajax({
			url: "review/main/page/top/reviews",
			type: "POST",
			dataType: "json",
			success: function(response) {
				if (!response.error) {
					for (i = 0; i < response.html.length; i++) $(block).find("ul").append(response.html[i]);
					da.lazy.show(block);
					$("#reviews-teaser-block").show()
				}
			}
		})
	},
	rateAllItem: function(block, callback) {
		userStorage.init();
		$.ajax({
			url: "/default/rate/all/item",
			type: "POST",
			data: {
				"class": "unvoted size13 bright",
				"items": 30
			},
			dataType: "json",
			success: function(response) {
				if (response.common !== undefined) {
					var i = 0,
						k = 0;
					while (i < 6) {
						if (response.common[k] === undefined) break;
						if (!userStorage.isSkipped(response.common[k]["sphinx_id"])) {
							$(block).find("ul.inf_ul").append(response.common[k]["html"]);
							i++
						}
						k++
					}
					$(block).find("ul.inf_ul li").iviMoviePopup();
					da.lazy.show(block)
				}
				if (response.extra !== undefined && response.extra.length > 0) itemsStorage.addItems(response.extra)
			}
		})
	},
	reloadItem: function(id, cls) {
		var li = $("#" + id);
		$(li).addClass("loading");
		setTimeout(function() {
			var next = itemsStorage.getItem(cls);
			if (next) {
				var next_id = $(next).attr("id");
				$(li).replaceWith(next);
				$("#" + next_id).iviMoviePopup()
			} else;
		}, 3E3)
	},
	drawRatesCount: function(rates) {
		if (rates < 10) rates = "000" + rates;
		else if (rates < 100) rates = "00" + rates;
		else if (rates < 1E3) rates = "0" + rates;
		else rates = rates.toString();
		result = "";
		for (i = 0; i < rates.length; i++) result += "<span>" + rates.substr(i, 1) + "</span>";
		return result
	},
	prepareWatchHistory: function() {
		var listItems =
		$("#start_fav_list").children();
		if (listItems.length <= 3) $("#start_fav_list .link-delete").remove()
	}
};
var itemsStorage = {
	elements_: [],
	addItems: function(items) {
		for (var i = 0; i < items.length; i++) if (items[i] !== undefined) this.elements_.push(items[i]["html"])
	},
	loadMore: function(cls) {
		if (!cls) cls = "size13 bright";
		$.ajax({
			url: "/default/rate/all/item",
			type: "POST",
			data: {
				"class": "unvoted " + cls,
				"items": 6,
				"skipped": userStorage.getSkipped(),
				"rated": userStorage.getRated()
			},
			dataType: "json",
			success: function(response) {
				if (response.common !== undefined && response.common.length > 0) itemsStorage.addItems(response.common)
			}
		})
	},
	getItem: function(cls) {
		if (isLoggedIn()) if (this.elements_.length < 4) this.loadMore(cls);
		return this.elements_.shift()
	}
};
var userStorage = {
	skipped: [],
	rated: [],
	skippedKey: "unreg_skipped",
	init: function() {
		var skipped = this.getCookies(this.skippedKey);
		for (var i = 0; i < skipped.length; i++) this.skipped.push(Number(skipped[i]))
	},
	addRated: function(item) {
		if (item !== undefined) this.rated.push(item)
	},
	getRated: function() {
		var arr = this.rated;
		this.rated = [];
		this.rated.length = 0;
		return arr
	},
	addSkipped: function(item) {
		if (item !== undefined) {
			this.skipped.push(Number(item));
			this.addCookieForAnonym(this.skippedKey, item)
		}
	},
	getSkipped: function() {
		var arr =
		this.skipped;
		this.skipped = [];
		this.skipped.length = 0;
		return arr
	},
	addCookieForAnonym: function(cookieName, item) {
		if (!isLoggedIn()) {
			var cookieData = this.getCookies(cookieName);
			var newData = [];
			if (cookieData) newData = cookieData;
			newData.push(item);
			var json = JSON.stringify(newData);
			setCookie(cookieName, json, 1)
		}
	},
	getCookies: function(cookieName) {
		var data = unescape(getCookie(cookieName));
		if (data && data !== "null") return JSON.parse(data);
		return []
	},
	clearCookie: function(cookieName) {
		eraseCookie(cookieName)
	},
	isSkipped: function(id) {
		if ($.inArray(id, this.skipped) == -1) return false;
		return true
	}
};
da.start.subgenres = {
	init: function() {
		var recommendation = gravity.instance();
		recommendation.fetch("CPOP", 10, [], da.start.subgenres.genre.render());
		return false
	},
	genre: {
		selected: null,
		select: function(li) {
			if (da.start.subgenres.genre.selected) da.start.subgenres.genre.selected.removeClass("active");
			da.start.subgenres.genre.selected = li;
			da.start.subgenres.genre.selected.addClass("active");
			$("#subgenres .h2i").html(li.find("a").html());
			da.start.subgenres.items.fetch(li.data("genre"))
		},
		render: function() {
			var tpl =
			da.feed.jqtpl("#start_subgenre_item");
			var $ul = $("#tabs-menu_subgenres");
			var titles = [];
			var add = function(item) {
				item.title = item.PopGenre.substr(0, 1).toUpperCase() + item.PopGenre.substr(1);
				if (titles[item.title]) return null;
				var li = tpl(item);
				titles[item.title] = li;
				$ul.append(li);
				li.click(function() {
					da.start.subgenres.genre.select(li);
					return false
				});
				return li
			};
			return function(resp) {
				for (var i = 0; i < resp.items.length; i++) {
					li = add(resp.items[i]);
					if (i == 0) da.start.subgenres.genre.select(li)
				}
			}
		}
	},
	items: {
		paging: {
			0: {
				from: 0,
				count: 6
			},
			1: {
				from: 6,
				count: 12
			},
			2: {
				from: 18,
				count: 18
			}
		},
		fetch: function(title, page) {
			var $ul = $("#genre-subgenre_action-items");
			if (!page) {
				page = 0;
				$ul.html("")
			}
			$ul.addClass("loading");
			var limit = da.start.subgenres.items.paging[page];
			if (!limit) return;
			da.feed.load({
				url: "/genre/ajax/subgenre/items/",
				data: {
					title: title,
					render: "start_genre_item",
					from: limit.from,
					count: limit.count + 1
				},
				render: da.feed.limit.render(function(item) {
					return $ul.removeClass("loading").append(item.html)
				}, limit.count),
				success: function(res) {
					$("#subgenres").css({
						visibility: "visible"
					});
					$("li", $ul).iviMoviePopup();
					var $more = $("#subgenres_more_link");
					if (res.entries.length < limit.count) return $more.hide();
					if (!da.start.subgenres.items.paging[page + 1]) return $more.hide();
					$more.show().off("click").click(function() {
						da.start.subgenres.items.fetch(title, page + 1);
						return false
					})
				}
			})
		}
	}
};
var queueStorage = {
	lock: false,
	elements_: [],
	queueSize: null,
	queueStorageSize: null,
	addItems: function(items) {
		for (i = 0; i < this.queueStorageSize; i++) if (typeof items[i] != "undefined") this.elements_.push(items[i])
	},
	loadMore: function(offset) {
		if (queueStorage.elements_.length <= this.queueSize) return $.ajax({
			url: "/user/load/more/queue/items/",
			type: "GET",
			data: {
				"offset": offset
			},
			dataType: "json"
		});
		else
		return true
	},
	replaceElementWithNext: function(elem) {
		if (queueStorage.lock) return false;
		queueStorage.lock = true;
		if (!isLoggedIn()) return false;
		var $list = $(elem).parents(".films-list-posters");
		var offset = parseInt($list.attr("data-offset"));
		$.waterfall(queueStorage.loadMore(offset), function(data) {
			if (data.html && data.html !== undefined && data.html.length > 0) {
				queueStorage.addItems(data.html);
				$list.attr("data-offset", parseInt(offset + parseInt(data.html.length)))
			}
		}, function(args2) {
			if (queueStorage.elements_.length > 0) {
				var next = queueStorage.elements_.shift();
				var current = $(elem).parent();
				$(current).replaceWith(next)
			} else $list.find(".link-delete").hide()
		}).fail(function(error) {}).done(function() {
			queueStorage.lock =
			false
		})
	}
};
//public_html/js/compiled/performance.js
da.Performance = function() {
	if (window.performance === undefined || window.performance.timing === undefined) this.timing = {};
	else this.timing = window.performance.timing;
	this.getTimingData = function() {
		var data = this.timing;
		data.url = document.URL;
		return data
	};
	this.timingSent = function(response) {};
	this.logTiming = function() {
		var _this = this;
		$.ajax({
			url: "/logger/ivi/load_js",
			type: "POST",
			data: this.getTimingData(),
			success: function(response) {
				_this.timingSent(response)
			}
		})
	};
	this.supported = function() {
		if (Object.keys === undefined) return false;
		var keys = Object.keys(this.timing);
		if (keys.length > 0) return true;
		return false
	};
	return this
};
setTimeout(function() {
	var per = new da.Performance;
	if (per.supported()) per.logTiming()
}, 1E4);
//public_html/js/compiled/player.js
var player = {
	getRecommendationId: function(videoId) {
		var recommendationId = gravity.getRecommendationId(videoId, "Content");
		return recommendationId
	}
};
//public_html/js/compiled/trailer.js
var TrailerController = function(trailer, video) {
	this.trailer = trailer;
	this.video = video;
	this.trailerId = "flash-trailer-player";
	this.$trailerPlayer = null;
	this.$iviPlayer = null;
	this.getPlayerWrapper = function() {
		if (this.$playerWrapper === undefined) this.$playerWrapper = $("#video-player-wrapper");
		return this.$playerWrapper
	};
	this.getPlayer = function() {
		if (this.$player === undefined) this.$player = $("#flash-video-player");
		return this.$player
	};
	this.getBuyButton = function() {
		if (this.$buyButton === undefined) this.$buyButton = $(".buy-button:first");
		return this.$buyButton
	};
	this.getTrailer = function() {
		if (this.$trailer === undefined) this.$trailer = $("#trailer-player");
		return this.$trailer
	};
	this.getPlayerContainer = function() {
		if (this.$playerContainer === undefined) this.$playerContainer = $("#video-player");
		return this.$playerContainer
	};
	this.stopPlayer = function() {
		var $player = this.getPlayer();
		if ($player.length) document.getElementById("flash-video-player").pauseClick()
	};
	this.stopTrailer = function() {};
	this.showPlayer = function() {
		this.getPlayerContainer().show();
		showPlayerBlock(this.video)
	};
	this.hidePlayer = function() {
		this.getPlayerContainer().hide();
		this.getPlayerContainer().empty();
		uppodEvents.clear(this.trailerId)
	};
	this.hideTrailer = function() {
		this.getTrailer().hide();
		this.getTrailer().empty()
	};
	this.showTrailer = function() {
		var _this = this;
		this.getTrailer().show();
		eroticConfirmPlayerPopup(_this.video, function() {
			_this.buildUppod(_this.getTrailer());
			uppodEvents.on(_this.trailerId, "end", function() {
				_this.onEndTrailer()
			})
		})
	};
	this.startTrailer = function() {
		var _this =
		this;
		uppodEvents.on(this.trailerId, "init", function() {
			uppodSend(_this.trailerId, "play")
		})
	};
	this.startPlayer = function() {
		if (this.getPlayer().length) document.getElementById("flash-video-player").playClick()
	};
	this.onFirstStartTrailer = function() {
		showPlayerBlock(this.video, function() {}, true)
	};
	this.onFirstStartPlayer = function() {};
	this.onStartTrailer = function($trailerButton, $playerButton) {
		if (this.video.playerWidth !== undefined && this.video.playerWidth) resizeVideoPlayer(this.video.playerWidth, true);
		this.hidePlayer();
		this.showTrailer();
		this.startTrailer();
		$trailerButton.css({
			display: "none"
		});
		$nativeWatchButton = $("#show-content");
		$nativeWatchButton.css({
			display: "none"
		});
		if ($playerButton.length) $playerButton.css({
			display: "inline-block"
		});
		else $trailerButton.parent().css({
			display: "none"
		})
	};
	this.onEndTrailer = function() {
		console.log("End of trailer")
	};
	this.onStartPlayer = function($playerButton, $trailerButton) {
		if (this.getBuyButton().length) {
			this.getBuyButton().trigger("click");
			return
		}
		this.hideTrailer();
		this.showPlayer();
		$playerButton.css({
			display: "none"
		});
		$trailerButton.css({
			display: "inline-block"
		})
	};
	this.buildUppod = function($container) {
		var _this = this;
		trailer.getFiles(function(files) {
			var flashvars = {
				uid: _this.trailerId,
				comment: trailer.getTitle(),
				st: window.da_settings.uppod.style,
				file: files.join(window.da_settings.uppod.seporator),
				hdseparator: window.da_settings.uppod.seporator
			};
			$container.flashembed({
				"bgcolor": "#000000",
				"allowFullScreen": "true",
				"allowScriptAccess": "always",
				"src": window.da_settings.uppod.src,
				"wmode": "opaque",
				"expressInstall": "/images/da/swfobject/expressInstall.swf",
				"id": _this.trailerId
			}, flashvars)
		})
	};
	this.setStartButton = function($button) {
		var _this = this;
		$button.on("click", ".watch-trailer", function() {
			if (!$(this).hasClass("watch-trailer-clicked")) _this.onFirstStartTrailer();
			_this.onStartTrailer($(this), $button.find(".watch-film"));
			$(this).addClass("watch-trailer-clicked");
			return false
		});
		$button.on("click", ".watch-film", function() {
			if (!$(this).hasClass("watch-film-clicked")) _this.onFirstStartPlayer();
			_this.onStartPlayer($(this), $button.find(".watch-trailer"));
			$(this).addClass("watch-film-clicked");
			return false
		});
		if (this.video.autoPlay == 1) $button.find(".watch-film").trigger("click")
	}
};
var TrailerModel = function(trailerData) {
	this.trailerData = trailerData;
	this.files = [];
	this.getId = function() {
		return this.trailerData.id
	};
	this.getTitle = function() {
		return this.trailerData.title
	};
	this.getFiles = function(callback) {
		var _this = this;
		if (this.files.length > 0) {
			callback(this.files);
			return
		}
		$.ajax({
			url: "/b2b/api/json/",
			data: '{"method":"da.content.get_additional_data","params":["' + _this.getId() + '", {"site":1}]}',
			dataType: "json",
			type: "post",
			success: function(response) {
				var files = response.result.files;
				var urls = [];
				for (var index in files) {
					if (files[index].content_format === "MP4-hi") urls.unshift(files[index].url);
					if (files[index].content_format === "MP4-lo") urls.push(files[index].url)
				}
				_this.files = urls;
				callback(urls)
			}
		})
	}
};
var Trailer = {
	video_player_html: "",
	title: "",
	open: function(params) {
		this.video_player_html = $("#video-player").html();
		var _self = this;
		var player_url = "/video/pay/player";
		flash_vars = {
			"videoId": params.videoId,
			"autoStart": "1",
			"trailer": "1"
		};
		$("#video-player").html("");
		$("#video-player").flash(player_url + "?_isB2C=1&trailer=1", {
			"id": "flash-video-player",
			"width": "100%",
			"height": "100%",
			"flashvars": flash_vars,
			"paremeters": {
				"base": "/images/da/",
				"allowScriptAccess": "always",
				"allowFullScreen": "true",
				"wmode": "opaque"
			}
		});
		innerlay_elem = $('<div class="innerlay"></div>');
		var button_text = params.payment.kind == "content" ? "Купить за " + params.payment.price + " руб." : "Купить подписку";
		buy_button_elem = $('<a href="#" class="buy">' + button_text + "</a>");
		buy_button_elem.click(function() {
			Payment.openPayment(params.payment);
			return false
		});
		this.title = $("#content-top-caption").find("h1").first().html();
		$("#content-top-caption").find("h1").first().html("Трейлер " + _self.title);
		close_elem = $('<a href="#" class="close link-close" title="Закрыть трейлер"></a>');
		close_elem.click(function() {
			_self.close();
			return false
		});
		$(innerlay_elem).append(buy_button_elem);
		$(innerlay_elem).append(close_elem);
		$("#video-player").append(innerlay_elem)
	},
	close: function() {
		$("#video-player").html(this.video_player_html);
		$("#content-top-caption").find("h1").first().html(this.title);
		this.video_player_html = ""
	}
};
//public_html/js/compiled/uppod_api.js
var uppodEvents = {
	events: {},
	triggers: {},
	add: function(player, event) {
		if (this.events[player] === undefined) this.events[player] = {};
		this.events[player][event] = 1;
		if (this.triggers[event] !== undefined) this.trigger(event)
	},
	is: function(player, event) {
		if (this.events[player] === undefined) return false;
		if (this.events[player][event] === undefined) return false;
		return true
	},
	clear: function(player) {
		if (this.events[player] !== undefined) delete this.events[player];
		if (this.triggers[player] !== undefined) delete this.triggers[player]
	},
	on: function(player, event, callback) {
		if (this.triggers[event] === undefined) this.triggers[event] = [];
		this.triggers[event].push(callback);
		if (this.is(player, event)) this.trigger(event)
	},
	trigger: function(event) {
		for (var index in this.triggers[event]) this.triggers[event][index]()
	}
};

function uppodEvent(playerID, event) {
	uppodEvents.add(playerID, event);
	switch (event) {
	case "init":
		break;
	case "start":
		break;
	case "play":
		break;
	case "pause":
		break;
	case "stop":
		break;
	case "seek":
		break;
	case "loaded":
		break;
	case "end":
		break;
	case "download":
		break;
	case "quality":
		break;
	case "error":
		break;
	case "ad_end":
		break;
	case "pl":
		break;
	case "volume":
		break
	}
}
function uppodSend(playerID, com, callback) {
	document.getElementById(playerID).sendToUppod(com)
}

function uppodGet(playerID, com, callback) {
	return document.getElementById(playerID).getUppod(com)
};
//public_html/js/compiled/uniqueItem.js
var UniqueItem = function(keyParams) {
	this.uniqueId = undefined;
	this.itemId = undefined;
	this.itemType = undefined;
	this.itemTypeId = undefined;
	this.uniqueMap = {
		0: "content",
		1: "compilation",
		2: "person"
	};
	this.gainer = 10;
	this.init = function(keyParams) {
		this.validate(keyParams);
		if (keyParams.uniqueId !== undefined) this.uniqueId = parseInt(keyParams.uniqueId);
		if (keyParams.itemId !== undefined) this.itemId = parseInt(keyParams.itemId);
		if (keyParams.itemType !== undefined) this.itemType = keyParams.itemType;
		if (keyParams.itemTypeId !== undefined) this.itemTypeId =
		parseInt(keyParams.itemTypeId)
	};
	this.validate = function(keyParams) {
		if (keyParams.itemId === undefined || keyParams.itemType === undefined && keyParams.itemTypeId === undefined) if (keyParams.uniqueId === undefined) throw new uniqueItemException("Unique ID validation error");
	};
	this.getUniqueId = function() {
		if (this.uniqueId === undefined) this.uniqueId = this.itemId * this.gainer + this.getItemTypeId();
		return this.uniqueId
	};
	this.getItemTypeId = function() {
		if (this.itemTypeId === undefined) try {
			this.itemTypeId = this.getItemTypeIdByUnique(this.uniqueId)
		} catch (error) {
			this.itemTypeId =
			this.getItemTypeIdByType(this.itemType)
		}
		return this.itemTypeId
	};
	this.getItemType = function() {
		if (this.itemType === undefined) this.itemType = this.uniqueMap[this.getItemTypeId()];
		return this.itemType
	};
	this.getItemId = function() {
		if (this.itemId === undefined) this.itemId = this.getItemIdByUnique(this.getUniqueId());
		return this.itemId
	};
	this.getItemTypeIdByType = function(itemType) {
		for (var mapId in this.uniqueMap) {
			if (!this.uniqueMap.hasOwnProperty(mapId)) continue;
			if (this.uniqueMap[mapId] == itemType) return parseInt(mapId)
		}
		throw new uniqueItemException('Cant find item type ID of "' + itemType + '"');
	};
	this.getItemTypeIdByUnique = function(uniqueId) {
		if (uniqueId === undefined) throw new uniqueItemException("Unique ID is Undefined");
		return parseInt(uniqueId % this.gainer)
	};
	this.getItemIdByUnique = function(uniqueId) {
		if (uniqueId === undefined) throw new uniqueItemException("Unique ID is Undefined");
		return parseInt(uniqueId / this.gainer)
	};
	this.init(keyParams)
};
var uniqueItemException = function(message) {
	this.message = message
};
//public_html/js/compiled/deferredStorage.js
var DeferredStorage = function() {
	this.storageKey = "deferred_storage";
	this.bind = function(event, data) {
		this.data[event] = data;
		this.save()
	};
	this.save = function() {
		$.jStorage.set(this.storageKey, this.data)
	};
	this.trigger = function() {
		for (var event in this.data) {
			var dse = new DeferredStorageEvent(this, event);
			$.event.trigger(event, dse)
		}
	};
	this.clear = function(event) {
		if (this.data[event] !== undefined) {
			delete this.data[event];
			this.save()
		}
	};
	this.getDataByEvent = function(event) {
		if (this.data[event] === undefined) return {};
		return this.data[event]
	};
	this.data = $.jStorage.get(this.storageKey) || {}
};
var DeferredStorageEvent = function(storage, event) {
	this.storage = storage;
	this.event = event;
	this.success = function() {
		this.storage.clear(this.event)
	};
	this.getData = function() {
		return this.storage.getDataByEvent(this.event)
	}
};
//public_html/js/compiled/event.js
var Event = function() {
	this.localCache = 6E5;
	this.localCacheKey = "event_flag";
	this.timeout = 3E4;
	this.isDebug = getCookie("event_debug");
	this.track = function() {
		if (!isLoggedIn()) return false;
		var _this = this;
		_this.check();
		setTimeout(function() {
			_this.track()
		}, this.timeout)
	};
	this.check = function() {
		var sessionFlag = $.jStorage.get(this.localCacheKey);
		var _this = this;
		if (!this.isDebug) if (sessionFlag) return false;
		else $.jStorage.set(this.localCacheKey, 1, {
			"TTL": this.localCache
		});
		$.ajax({
			url: "/user/ajax/events",
			dataType: "json",
			success: function(response) {
				for (type in response) for (elem in response[type]) {
					if (!response[type].hasOwnProperty(elem)) continue;
					_this.fire(type, response[type][elem])
				}
			}
		})
	};
	this.fire = function(type, data) {
		if (this.isDebug) {
			var $messages = $("#event-debug-messages");
			if (!$messages.length) {
				$("body").prepend($('<div id="event-debug-messages"/>'));
				$messages = $("#event-debug-messages");
				$messages.css({
					display: "block",
					position: "fixed",
					top: "100px",
					left: "0px",
					width: "100%",
					height: "auto",
					zIndex: "10000",
					background: "#FFFFFF"
				})
			}
			$message =
			$("<div></div>");
			for (key in data) $message.append("<p>" + key + " = " + data[key] + "</p>");
			$message.append("<p>----</p>");
			$messages.append($message)
		}
		$(document).trigger("event_" + type, data)
	}
};
var sendEventIntoGA = function(context, data) {
	if (window._gaq !== undefined) {
		var transaction = _gaq.push(["_addTrans", data["payment_id"], "ivi+", data["amount"]]);
		_gaq.push(["_addItem", data["payment_id"], data["product_id"], data["title"], data["product"], data["amount"], "1"]);
		_gaq.push(["_trackTrans"])
	}
};
var sendExperimentCounterEvent = function(payment) {
	var event_name = Payment.buildSuccessBuyEventName(buildEventByPaymentType(payment["payment_kind"]));
	doAtRequest(event_name);
	Groot.track(event_name + "_" + getCookie("irek_experiment_value"))
};
var buildEventByPaymentType = function(payment_type) {
	if (payment_type == "card") return "bankcard";
	else if (payment_type == "qiwi") return "qiwi_wallet";
	else if (payment_type == "yandex") return "yandex";
	else if (payment_type == "none") return "sms";
	else if (payment_type == "gift") return "certificate";
	else
	return "unknown"
};
var sendBuyEvents = function(context, data) {
	sendEventIntoGA(context, data);
	if (data["product"] == "content" && data["product_id"] == Runner.wolf_experiment_id && data["payment"]) sendExperimentCounterEvent(data["payment"])
};
$(document).on("event_buy", sendBuyEvents);
$(document).on("event_prolong", sendEventIntoGA);
//public_html/js/compiled/adriver.core.2.js

function adriver(a, b, d) {
	var e = this,
		c = a;
	if (this instanceof adriver) {
		typeof c == "string" ? c = document.getElementById(a) : a = c.id;
		if (!c) {
			if (!adriver.isDomReady) adriver.onDomReady(function() {
				new adriver(a, b, d)
			});
			return null
		}
		if (adriver(a)) return adriver(a);
		e.p = c;
		e.defer = d;
		e.prm = adriver.extend(b, {
			ph: a
		});
		e.loadCompleteQueue = new adriver.queue;
		e.domReadyQueue = new adriver.queue(adriver.isDomReady);
		adriver.initQueue.push(function() {
			e.init()
		});
		return adriver.items[a] = e
	} else
	return a ? adriver.items[a] : adriver.items
}
adriver.prototype = {
	isLoading: 0,
	init: function() {},
	loadComplete: function() {},
	domReady: function() {},
	onLoadComplete: function(a) {
		var b = this;
		b.loadCompleteQueue.push(function() {
			a.call(b)
		});
		return b
	},
	onDomReady: function(a) {
		this.domReadyQueue.push(a);
		return this
	},
	reset: function() {
		this.loadCompleteQueue.flush();
		this.domReadyQueue.flush(adriver.isDomReady);
		return this
	}
};
adriver.extend = function() {
	for (var a = arguments[0], b = 1, d = arguments.length, e, c; b < d; b++) for (c in e = arguments[b], e) e.hasOwnProperty(c) && (e[c] instanceof Function ? a[c] = e[c] : e[c] instanceof Object ? a[c] ? adriver.extend(a[c], e[c]) : a[c] = adriver.extend(e[c] instanceof Array ? [] : {}, e[c]) : a[c] = e[c]);
	return a
};
adriver.extend(adriver, {
	version: "2.3.6",
	defaults: {
		tail256: escape(document.referrer || "unknown")
	},
	items: {},
	options: {},
	plugins: {},
	pluginPath: {},
	redirectHost: "//ad.adriver.ru",
	defaultMirror: "//content.adriver.ru",
	loadScript: function(a) {
		try {
			var b = document.getElementsByTagName("head")[0],
				d = document.createElement("script");
			d.setAttribute("type", "text/javascript");
			d.setAttribute("charset", "windows-1251");
			d.setAttribute("src", a.split("![rnd]").join(Math.round(Math.random() * 9999999)));
			d.onreadystatechange =

			function() {
				if (/loaded|complete/.test(this.readyState)) d.onload = null, b.removeChild(d)
			};
			d.onload = function() {
				b && d && b.removeChild(d)
			};
			b.insertBefore(d, b.firstChild)
		} catch (e) {}
	},
	isDomReady: !1,
	onDomReady: function(a) {
		adriver.domReadyQueue.push(a)
	},
	onBeforeDomReady: function(a) {
		adriver.domReadyQueue.unshift(a)
	},
	domReady: function() {
		adriver.isDomReady = !0;
		adriver.domReadyQueue.execute()
	},
	checkDomReady: function(a) {
		try {
			var b = document;
			if (/WebKit/i.test(navigator.userAgent))(function() {
				/loaded|complete/.test(b.readyState) ? a() : setTimeout(arguments.callee, 100)
			})();
			else if (b.addEventListener) b.addEventListener("DOMContentLoaded", a, !1);
			else if (document.attachEvent) {
				var d = function() {
					if (!adriver.isDomReady) {
						try {
							document.documentElement.doScroll("left")
						} catch (b) {
							setTimeout(d, 1);
							return
						}
						a()
					}
				},
					e = function() {
						document.readyState === "complete" && (document.detachEvent("onreadystatechange", e), a())
					};
				document.attachEvent("onreadystatechange", e);
				window.attachEvent("onload", function() {
					adriver.isDomReady || a()
				});
				try {
					toplevel = window.frameElement == null
				} catch (c) {}
				document.documentElement.doScroll && toplevel && d()
			}
		} catch (f) {}
	},
	onLoadComplete: function(a) {
		adriver.loadCompleteQueue.push(a);
		return adriver
	},
	loadComplete: function() {
		adriver.loadCompleteQueue.execute();
		return adriver
	},
	setDefaults: function(a) {
		adriver.extend(adriver.defaults, a)
	},
	setOptions: function(a) {
		adriver.extend(adriver.options, a)
	},
	setPluginPath: function(a) {
		adriver.extend(adriver.pluginPath, a)
	},
	queue: function(a) {
		this.q = [];
		this.flag = a ? !0 : !1
	},
	Plugin: function(a) {
		if (this instanceof adriver.Plugin && a && !adriver.plugins[a]) this.id = a, this.q = new adriver.queue, adriver.plugins[a] = this;
		return adriver.plugins[a]
	}
});
adriver.sync = function(a, b) {
	if (!adriver.syncFlag) {
		adriver.syncFlag = 1;
		for (var d = []; b--;) d[b] = b + 1;
		d.sort(function() {
			return 0.5 - Math.random()
		});
		adriver.synchArray = d
	}
	return adriver.synchArray[(!a || a <= 0 ? 1 : a) - 1]
};
adriver.queue.prototype = {
	push: function(a) {
		this.flag ? a() : this.q.push(a)
	},
	unshift: function(a) {
		this.flag ? a() : this.q.unshift(a)
	},
	execute: function(a) {
		for (var b; b = this.q.shift();) b();
		a == void 0 && (a = !0);
		this.flag = a ? !0 : !1
	},
	flush: function(a) {
		this.q.length = 0;
		this.flag = a ? !0 : !1
	}
};
adriver.Plugin.prototype = {
	loadingStatus: 0,
	load: function() {
		this.loadingStatus = 1;
		adriver.loadScript((adriver.pluginPath[this.id.split(".").pop()] || adriver.defaultMirror + "/plugins/") + this.id + ".js")
	},
	loadComplete: function() {
		this.loadingStatus = 2;
		this.q.execute();
		return this
	},
	onLoadComplete: function(a) {
		this.q.push(a);
		return this
	}
};
adriver.Plugin.require = function() {
	var a = this,
		b = 0;
	a.q = new adriver.queue;
	for (var d = 0, e = arguments.length, c; d < e; d++) c = new adriver.Plugin(arguments[d]), c.loadingStatus != 2 && (b++, c.onLoadComplete(function() {
		b-- == 1 && a.q.execute()
	}), c.loadingStatus || c.load());
	b || a.q.execute()
};
adriver.Plugin.require.prototype.onLoadComplete = function(a) {
	this.q.push(a);
	return this
};
adriver.domReadyQueue = new adriver.queue;
adriver.loadCompleteQueue = new adriver.queue;
adriver.initQueue = new adriver.queue;
adriver.checkDomReady(adriver.domReady);
(new adriver.Plugin.require("autoUpdate.adriver")).onLoadComplete(function() {
	adriver.initQueue.execute()
});
//public_html/js/compiled/rotation.js

function Rotation(cookie_name, element_count, collection_count) {
	this.element_count = element_count;
	this.collection_count = collection_count;
	this.cookie_name = cookie_name;
	this.getRotateCollection = function() {
		return $.cookie(this.cookie_name) || 1
	};
	this.getFirst = function() {
		return (this.getRotateCollection() - 1) * this.element_count
	};
	this.getLast = function() {
		return this.getRotateCollection() * this.element_count - 1
	};
	this.rotate = function() {
		var rotate_collection = this.getRotateCollection();
		rotate_collection++;
		if (rotate_collection > this.collection_count) rotate_collection = 1;
		$.cookie(this.cookie_name, rotate_collection);
		return this
	};
	this.showElements = function($elements, callback) {
		var Rotator = this;
		$elements.each(function(index, element) {
			if (index >= Rotator.getFirst() && index <= Rotator.getLast()) if (callback) callback($(element), Rotator);
			else $(element).removeClass("hidden")
		});
		return this
	}
};
//public_html/js/compiled/jquery.dynamicInput.js
jQuery.fn.dynamicInput = function() {
	var b = $(this),
		c = function(a) {
			a.val() === "" && a.val(a.attr("title")).addClass("blank")
		},
		d = function(a) {
			a.val() === a.attr("title") && a.val("").removeClass("blank")
		};
	d(b);
	c(b);
	b.focus(function() {
		d(b)
	}).blur(function() {
		c(b)
	})
};
//public_html/js/compiled/dfs.js
//public_html/js/compiled/xdr.js
//public_html/external/xdr/pmxdr-client.min.js
(function() {
	function b(a, d) {
		function c() {
			if (typeof e.onload == "function") e.onload()
		}
		var e = this;
		e.iFrame = document.createElement("iframe");
		e.iFrame.style.display = "none";
		e.origin = a.replace(b.originRegex, "$1");
		e.iFrame.addEventListener ? e.iFrame.addEventListener("load", c, !1) : e.iFrame.attachEvent && e.iFrame.attachEvent("onload", c);
		e.iFrame.src = e.origin + "/pmxdr/api";
		if (typeof d == "function") e.onload = d, e.init()
	}
	function f(a) {
		if (a.origin.indexOf("facebook.com") == -1) {
			var d = JSON.parse(a.data);
			d.pmxdr == !0 && (b.requests[d.id] && b.requests[d.id].origin == a.origin && typeof b.requests[d.id].callback == "function" && !b.requests.aborted[d.id] ? b.requests[d.id].callback(d) : b.requests.aborted[d.id] && (delete b.requests.aborted[d.id], d.id in b.requests && delete b.requests[d.id]))
		}
	}
	var c = this;
	typeof c.opera != "undefined" && parseInt(c.opera.version()) == 9 && Event.prototype.__defineGetter__("origin", function() {
		return "http://" + this.domain
	});
	b.originRegex = /^([\w-]+:\/*\[?[\w\.:-]+\]?(?::\d+)?).*/;
	b.request = function(a) {
		if (typeof a == "string") return b.request({
			uri: a
		});
		else if (Object.prototype.toString.call(a) == "[object Array]") {
			for (var d = [], c = 0; c < a.length; c++) d.push(b.request(a[c]));
			return d
		}
		var d = new b(a.uri),
			e = a.callback;
		a.id = b.getSafeID();
		a.callback = function(a) {
			typeof e == "function" && e.call(this, a);
			this.unload()
		};
		d.onload = function() {
			this.request(a)
		};
		d.init();
		return {
			abort: function() {
				b.requests.aborted[a.id] = !0
			}
		}
	};
	b.interfaceFrameParent = document.documentElement || document.getElementsByTagName("head")[0] || document.body || document.getElementsByTagName("body")[0];
	b.getSafeID =

	function() {
		var a = Math.random().toString().substr(2);
		return typeof b.requests[a] == "undefined" ? a : safeRandID()
	};
	b.prototype = {
		init: function(a) {
			if (typeof a == "function") this.onload = a;
			this.iFrame.parentNode && this.unload();
			b.interfaceFrameParent.appendChild(this.iFrame)
		},
		unload: function() {
			b.interfaceFrameParent.removeChild(this.iFrame)
		},
		defaultRequestMethod: "GET",
		request: function(a) {
			function d() {
				b.requests[g] && b.requests[g].callback && b.requests[g].callback({
					pmxdr: !0,
					id: g,
					error: "TIMEOUT"
				})
			}
			var c = [],
				e = this;
			if (Object.prototype.toString.call(a) == "[object Array]") {
				for (var f = 0; f < a.length; f++) c.push(e.request(a[f]));
				return c
			}
			var g = (b.requests[a.id] ? !1 : a.id) || b.getSafeID(),
				c = a.method || e.defaultRequestMethod,
				f = a.timeout || e.defaultTimeout,
				i = a.contentType || e.defaultContentType,
				c = c.toUpperCase();
			b.requests[g] = {
				origin: e.origin,
				remove: function() {
					delete b.requests[g]
				},
				callback: function(c) {
					typeof a.callback == "function" && a.callback.call(e, c);
					b.requests[g].remove()
				}
			};
			if (i) {
				if (!a.headers) a.headers = {};
				a.headers["Content-Type"] =
				i.toString()
			}
			e.iFrame.contentWindow.postMessage(JSON.stringify({
				pmxdr: !0,
				method: c,
				uri: a.uri,
				data: a.data,
				headers: a.headers,
				id: g
			}), e.origin);
			f && setTimeout(d, f);
			return {
				abort: b.requests[g].remove
			}
		}
	};
	b.requests = {
		aborted: {},
		clear: function() {
			b.requests = {
				aborted: {},
				clear: this.clear
			}
		}
	};
	c.addEventListener ? c.addEventListener("message", f, !1) : c.attachEvent && c.attachEvent("onmessage", f);
	b.destruct = function() {
		c.removeEventListener ? c.removeEventListener("message", f, !1) : c.detachEvent && c.detachEvent("onmessage", f);
		delete c.pmxdr;
		delete f
	};
	c.pmxdr = b
})();
this.JSON || (JSON = {});
this.JSON && (!JSON.stringify || !JSON.parse) && eval(function(b, f, c, a, d, h) {
	d = function(a) {
		return (a < 62 ? "" : d(parseInt(a / 62))) + ((a %= 62) < 36 ? a.toString(36) : String.fromCharCode(a + 29))
	};
	if ("0".replace(0, d) == 0) {
		for (; c--;) h[d(c)] = a[c];
		a = [function(a) {
			return h[a] || a
		}];
		d = function() {
			return "\\w{1,2}"
		};
		c = 1
	}
	for (; c--;) a[c] && (b = b.replace(RegExp("\\b" + d(c) + "\\b", "g"), a[c]));
	return b
}('(3(){3 f(n){6 n<10?"0"+n:n}2(5 1b.w.7!=="3"){1b.w.7=3(a){6 8.getUTCFullYear()+"-"+f(8.getUTCMonth()+1)+"-"+f(8.getUTCDate())+"T"+f(8.getUTCHours())+":"+f(8.getUTCMinutes())+":"+f(8.getUTCSeconds())+"Z"};O.w.7=Number.w.7=Boolean.w.7=3(a){6 8.valueOf()}}y g=/[\\u0000\\R\\Q-\\1i\\1f\\1e\\1c\\1a-\\19\\18-\\17\\15-\\14\\13\\12-\\11]/g,h=/[\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\R\\Q-\\1i\\1f\\1e\\1c\\1a-\\19\\18-\\17\\15-\\14\\13\\12-\\11]/g,l,m,o={"\\b":"\\\\b","\\t":"\\\\t","\\n":"\\\\n","\\f":"\\\\f","\\r":"\\\\r",\'"\':\'\\\\"\',"\\\\":"\\\\\\\\"},p;3 q(b){h.S=0;6 h.I(b)?\'"\'+b.z(h,3(a){y c=o[a];6 5 c==="G"?c:"\\\\u"+("1h"+a.1g(0).P(16)).1d(-4)})+\'"\':\'"\'+b+\'"\'}3 r(a,b){y i,k,v,c,d=l,e,f=b[a];2(f&&5 f==="x"&&5 f.7==="3"){f=f.7(a)}2(5 p==="3"){f=p.H(b,a,f)}switch(5 f){D"G":6 q(f);D"N":6 isFinite(f)?O(f):"C";D"boolean":D"C":6 O(f);D"x":2(!f){6"C"}l+=m;e=[];2(M.w.P.apply(f)==="[x Array]"){c=f.B;A(i=0;i<c;i+=1){e[i]=r(i,f)||"C"}v=e.B===0?"[]":l?"[\\n"+l+e.E(",\\n"+l)+"\\n"+d+"]":"["+e.E(",")+"]";l=d;6 v}2(p&&5 p==="x"){c=p.B;A(i=0;i<c;i+=1){k=p[i];2(5 k==="G"){v=r(k,f);2(v){e.Y(q(k)+(l?": ":":")+v)}}}}J{A(k X f){2(M.W.H(f,k)){v=r(k,f);2(v){e.Y(q(k)+(l?": ":":")+v)}}}}v=e.B===0?"{}":l?"{\\n"+l+e.E(",\\n"+l)+"\\n"+d+"}":"{"+e.E(",")+"}";l=d;6 v}}2(5 9.K!=="3"){9.K=3(a,b,c){y i;l="";m="";2(5 c==="N"){A(i=0;i<c;i+=1){m+=" "}}J{2(5 c==="G"){m=c}}p=b;2(b&&5 b!=="3"&&(5 b!=="x"||5 b.B!=="N")){V U Error("9.K")}6 r("",{"":a})}}2(5 9.L!=="3"){9.L=3(d,e){y j;3 f(a,b){y k,v,c=a[b];2(c&&5 c==="x"){A(k X c){2(M.W.H(c,k)){v=f(c,k);2(v!==undefined){c[k]=v}J{delete c[k]}}}}6 e.H(a,b,c)}g.S=0;2(g.I(d)){d=d.z(g,3(a){6"\\\\u"+("1h"+a.1g(0).P(16)).1d(-4)})}2(/^[\\],:{}\\s]*$/.I(d.z(/\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").z(/"[^"\\\\\\n\\r]*"|true|false|C|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?/g,"]").z(/(?:^|:|,)(?:\\s*\\[)+/g,""))){j=eval("("+d+")");6 5 e==="3"?f({"":j},""):j}V U SyntaxError("9.L")}}})();', [], 81, "||if|function||typeof|return|toJSON|this|JSON|||||||||||||||||||||||prototype|object|var|replace|for|length|null|case|join||string|call|test|else|stringify|parse|Object|number|String|toString|u0600|u00ad|lastIndex||new|throw|hasOwnProperty|in|push|||uffff|ufff0|ufeff|u206f|u2060||u202f|u2028|u200f|u200c|Date|u17b5|slice|u17b4|u070f|charCodeAt|0000|u0604".split("|"), 0, {}));
//public_html/external/xdr/libxdr.min.js
if (!this.XDR) this.XDR = new Function, XDR.prototype = {
	open: function(c, a, d) {
		if (d === !1) throw new RangeError("XDR.open: libxdr does not support synchronous requests.");
		this._request = {
			method: c,
			uri: a,
			headers: {}
		}
	},
	setRequestHeader: function(c, a) {
		this._request.headers[c.toLowerCase()] = a
	},
	removeRequestHeader: function(c) {
		delete this._request.headers[c.toLowerCase()]
	},
	send: function(c) {
		var a = this;
		a._request.data = c;
		a._request.callback = function(b) {
			a.readyState = 4;
			if (b.error) if (b.error == "LOAD_ERROR") a.status = 502, a.statusText = "Bad Gateway";
			else if (b.error == "DISALLOWED_REQUEST_METHOD") a.status = 405, a.statusText = "Method Not Allowed";
			else if (b.error == "TIMEOUT") a.status = 408, a.statusText = "Request Timeout";
			else {
				if (b.error == "DISALLOWED_ORIGIN") a.status = 412, a.statusText = "Precondition Failed"
			} else {
				if (b.status) a.status = b.status;
				if (b.statusText) a.statusText = b.statusText
			}
			if (!a.status) a.status = 200;
			if (b.error || b.status >= 400) {
				if (typeof a.onloadend == "function") a.onloadend();
				if (typeof a.onerror == "function") return a.onerror()
			}
			if (a.status == 408 && typeof a.ontimeout == "function") return a.ontimeout();
			var c = null;
			try {
				c = (new DOMParser).parseFromString(b.data, "application/xml")
			} catch (d) {
				try {
					c = new ActiveXObject("Microsoft.XMLDOM"), c.loadXML(b.data)
				} catch (g) {
					c = null
				}
			}
			a.responseXML = c;
			a.responseText = b.data;
			if (!b.headers) b.headers = {};
			a.contentType = b.headers["content-type"];
			var e = [],
				f;
			for (f in b.headers) b.headers.hasOwnProperty(f) && e.push(f + ": " + b.headers[f]);
			e = e.join("\r\n");
			a.getAllResponseHeaders = function() {
				return e
			};
			a.getResponseHeader = function(a) {
				return b.headers[a.toLowerCase()] || null
			};
			if (typeof a.onreadystatechange == "function") a.onreadystatechange();
			if (typeof a.onprogress == "function") a.onprogress();
			if (typeof a.onload == "function") a.onload();
			if (typeof a.onloadend == "function") a.onloadend()
		};
		if (a.timeout) a._request.timeout = a.timeout;
		else if (XDR.defaultTimeout) a._request.timeout = XDR.defaultTimeout;
		var d = pmxdr.request(a._request).abort;
		a.abort = function() {
			d()
		}
	},
	abort: function() {
		delete this._request
	}
};
//public_html/external/xdr/imgobj.min.js
ImageObjRequest = function() {
	var a = this;
	a._object = new Image;
	a._url = null;
	a._timeoutDefault = 3E4;
	a._timeoutCounter = null;
	a.timeout = null;
	a.onabort = null;
	a.onprogress = null;
	a.onloadend = null;
	a.onload = null;
	a.onerror = null;
	a.ontimeout = null;
	a.status = null;
	a.responseText = {
		length: 0
	};
	a.getResponseHeader = function() {
		return null
	};
	a.open = function(b, c) {
		a._url = c
	};
	a.send = function() {
		if (typeof a._url == "string" && a._url.length) {
			if (typeof a.timeout != "number" || !a.timeout < 1) a.timeout = a._timeoutDefault;
			a._object.onprogress = a._progressHandler;
			a._object.onload = a._loadHandler;
			a._object.onerror = a._errorHandler;
			a._timeoutCounter = setTimeout(a._timeoutHandler, a.timeout);
			a._object.src = a._url
		}
	};
	a.abort = function() {
		a._object.src = null;
		if (!a._hasStatus()) {
			a._stopTimeout();
			a.xStatus = -99;
			if (typeof a.onabort == "function") a.onabort();
			if (typeof a.onloadend == "function") a.onloadend()
		}
	};
	a._hasStatus = function() {
		return a.xStatus !== void 0 || !! a.status
	};
	a._progressHandler = function(b) {
		a.responseText.length = b.loaded;
		if (typeof a.onprogress == "function") a.onprogress(b)
	};
	a._loadHandler = function() {
		if (!a._hasStatus()) {
			a._stopTimeout();
			a.status = 200;
			if (typeof a.onload == "function") a.onload();
			if (typeof a.onloadend == "function") a.onloadend()
		}
	};
	a._errorHandler = function() {
		if (!a._hasStatus()) {
			a._stopTimeout();
			a.xStatus = -2;
			if (typeof a.onerror == "function") a.onerror();
			if (typeof a.onloadend == "function") a.onloadend()
		}
	};
	a._timeoutHandler = function() {
		if (!a._hasStatus()) {
			a.abort();
			a.xStatus = -408;
			if (typeof a.ontimeout == "function") a.ontimeout();
			if (typeof a.onerror == "function") a.onerror();
			if (typeof a.onloadend == "function") a.onloadend()
		}
	};
	a._stopTimeout = function() {
		a._timeoutCounter && clearTimeout(a._timeoutCounter)
	}
};
//public_html/external/xdr/difim.min.js
DifimRequest = function() {
	var a = this;
	a._wrapper = null;
	a._wrapperWindow = null;
	a._wrapperDocument = null;
	a._transport = null;
	a._transportIsReady = !1;
	a._sendIsPending = !1;
	a._url = null;
	a._timeoutDefault = 3E4;
	a._timeoutCounter = null;
	a.timeout = null;
	a.onabort = null;
	a.onprogress = null;
	a.onloadend = null;
	a.onload = null;
	a.onerror = null;
	a.ontimeout = null;
	a.status = null;
	a.responseText = {
		length: 0
	};
	a._init = function() {
		a._wrapper = window.document.createElement("iframe");
		a._wrapper.src = "javascript:false";
		a._wrapper.width = "1";
		a._wrapper.height = "1";
		a._wrapper.style.position = "absolute";
		a._wrapper.style.left = "-20000px";
		a._wrapper.style.top = "-20000px";
		a._wrapper.style.opacity = "0";
		window.document.body.appendChild(a._wrapper);
		a._wrapperWindow = a._wrapper.contentWindow;
		a._wrapperDocument = a._wrapper.contentDocument || a._wrapperWindow.document;
		a._setWrapperReadyChecker()
	};
	a._stateIsReady = function(a) {
		return a.readyState === "loaded" || a.readyState === "complete"
	};
	a._setWrapperReadyChecker = function() {
		var c = a._wrapperWindow,
			b = a._wrapperDocument,
			d = a._wrapperReadyHandler;
		a._stateIsReady(b) && d();
		b.addEventListener ? (b.addEventListener("DOMContentLoaded", d, !1), c.addEventListener("load", d, !1)) : b.attachEvent && (b.attachEvent("onreadystatechange", d), c.attachEvent("onload", d));
		var e = setInterval(function() {
			a._stateIsReady(b) && (d(), clearInterval(e))
		}, 10)
	};
	a._wrapperReadyHandler = function() {
		if (a._stateIsReady(a._wrapperDocument) && !a._transportIsReady && (a._createTransport(), a._transportIsReady = !0, a._sendIsPending)) a._send(), a._sendIsPending = !1
	};
	a._createTransport = function() {
		a._transport =
		a._wrapperDocument.createElement("img");
		a._transport.width = "1";
		a._transport.height = "1";
		a._wrapperDocument.body.appendChild(a._transport)
	};
	a._destroyTransport = function() {
		a._wrapper.parentNode.removeChild(a._wrapper)
	};
	a.getResponseHeader = function() {
		return null
	};
	a.open = function(c, b) {
		a._url = b
	};
	a.send = function() {
		a._transportIsReady ? a._send() : a._sendIsPending = !0
	};
	a._send = function() {
		if (typeof a._url == "string" && a._url.length) {
			if (typeof a.timeout != "number" || a.timeout < 1) a.timeout = a._timeoutDefault;
			a._transport.onprogress =
			a._progressHandler;
			a._transport.onload = a._loadHandler;
			a._transport.onerror = a._errorHandler;
			a._timeoutCounter = setTimeout(a._timeoutHandler, a.timeout);
			a._transport.src = a._url
		}
	};
	a.abort = function() {
		if (a._sendIsPending) a._sendIsPending = !1;
		else if (a._transportIsReady) if (typeof a._wrapperWindow.stop == "function") a._wrapperWindow.stop();
		else
		try {
			a._wrapperDocument.execCommand("Stop", !1)
		} catch (c) {
			try {
				a._wrapperDocument.removeChild(a._wrapperDocument.documentElement)
			} catch (b) {}
		}
		if (!a._hasStatus()) {
			a._stopTimeout();
			a._destroyTransport();
			a.xStatus = -99;
			if (typeof a.onabort == "function") a.onabort();
			if (typeof a.onloadend == "function") a.onloadend()
		}
	};
	a._hasStatus = function() {
		return a.xStatus !== void 0 || !! a.status
	};
	a._progressHandler = function(c) {
		if (typeof a.onprogress == "function") a.onprogress(c)
	};
	a._loadHandler = function() {
		if (!a._hasStatus()) {
			a._stopTimeout();
			a._destroyTransport();
			a.status = 200;
			if (typeof a.onload == "function") a.onload();
			if (typeof a.onloadend == "function") a.onloadend()
		}
	};
	a._errorHandler = function() {
		if (!a._hasStatus()) {
			a._stopTimeout();
			a._destroyTransport();
			a.xStatus = -2;
			if (typeof a.onerror == "function") a.onerror();
			if (typeof a.onloadend == "function") a.onloadend()
		}
	};
	a._timeoutHandler = function() {
		if (!a._hasStatus()) {
			a.abort();
			a.xStatus = -408;
			if (typeof a.ontimeout == "function") a.ontimeout();
			if (typeof a.onerror == "function") a.onerror();
			if (typeof a.onloadend == "function") a.onloadend()
		}
	};
	a._stopTimeout = function() {
		a._timeoutCounter && clearTimeout(a._timeoutCounter)
	};
	a._init()
};
//public_html/external/dfs/ivi.dfs.utils.min.js
(function() {
	var c = window.ivi;
	c === void 0 && (c = {});
	if (c.dfs === void 0) c.dfs = {};
	if (c.dfs.utils === void 0) c.dfs.utils = {};
	var a = c.dfs.utils;
	a.toInteger = function(b) {
		return parseInt(b, 10)
	};
	a.isNaturalNumeric = function(b) {
		var d = a.toInteger(b);
		return !isNaN(d) && isFinite(b) && b >= 1 && d == b
	};
	a.isArray = function(b) {
		return b !== void 0 && b instanceof Array
	};
	a.isNonEmptyString = function(b) {
		return typeof b === "string" && b.length
	};
	a.hasSubstring = function(b, a) {
		return b.indexOf(a) != -1
	};
	a.isSafari = function() {
		return a.hasSubstring(navigator.vendor || "", "Apple")
	};
	a.isMobileSafari = function() {
		if (a.isSafari()) return a.hasSubstring(navigator.userAgent, "Mobile/");
		return !1
	};
	a.isDesktopSafari = function() {
		if (a.isSafari()) return !a.hasSubstring(navigator.userAgent, "Mobile/");
		return !1
	};
	a.isDesktopSafari5 = function() {
		if (a.isDesktopSafari()) return a.hasSubstring(navigator.userAgent, " Version/5");
		return !1
	};
	a.isSymbianBrowser = function() {
		return a.hasSubstring(navigator.userAgent, "NokiaBrowser")
	};
	a.detectTransports = function() {
		var b = {
			head: {
				rfc: !1,
				nonrfc: !1
			},
			get: {
				common: !1,
				stimg: !1,
				stimgbig: !1
			}
		};
		if (a.isSymbianBrowser()) b.head.rfc = !1, b.head.nonrfc = !1, b.get.common = !1, b.get.stimg = "imgobj", b.get.stimgbig = "imgobj";
		else if (a.isDesktopSafari5()) b.head.rfc = "pmxdr", b.head.nonrfc = "pmxdr", b.get.common = "xhr2", b.get.stimg = "imgobj", b.get.stimgbig = "imgobj";
		else if (a.isMobileSafari()) b.head.rfc = "pmxdr", b.head.nonrfc = "pmxdr", b.get.common = "xhr2", b.get.stimg = "imgobj", b.get.stimgbig = "imgobj";
		else if (a.hasXHR2()) b.head.rfc = "xhr2", b.head.nonrfc = "xhr2", b.get.common = "xhr2", b.get.stimg = "xhr2", b.get.stimgbig = "imgobj";
		else if (a.hasPMXDR()) b.head.rfc = "pmxdr", b.head.nonrfc = "pmxdr", b.get.common = a.hasIEXDR() ? "iexdr" : "pmxdr", b.get.stimg = "imgobj", b.get.stimgbig = "imgobj";
		else if (a.hasIEXDR()) b.head.rfc = !1, b.head.nonrfc = !1, b.get.common = "iexdr", b.get.stimg = "imgobj", b.get.stimgbig = "imgobj";
		return b
	};
	a.createRequest = function(b) {
		if (!b) return null;
		var d = null;
		switch (b) {
		case "xhr2":
			a.hasXHR() && (d = new XMLHttpRequest, a.isXHR2(d) || (d = null));
			break;
		case "pmxdr":
			a.hasPMXDR() && (d = new XDR);
			break;
		case "iexdr":
			a.hasIEXDR() && (d = new XDomainRequest);
			break;
		case "imgobj":
			a.hasImageObjRequest() && (d = new ImageObjRequest)
		}
		if (d) d.transport = b;
		return d
	};
	a.isXHR2 = function(b) {
		return b instanceof XMLHttpRequest && b.withCredentials !== void 0
	};
	a.isRedirected = function(b) {
		if (b.status === void 0) return !1;
		var a = [300, 301, 302, 303, 307],
			c;
		for (c in a) if (a.hasOwnProperty(c) && b.status == a[c]) return !0;
		return !1
	};
	a.getRedirectLocation = function(b) {
		var a = null;
		try {
			a = b.getResponseHeader("Location")
		} catch (c) {}
		return a
	};
	a.getDfsId = function(b) {
		var a;
		try {
			a = b.getResponseHeader("X-Dfsid")
		} catch (c) {}
		a || (a = -1);
		return a
	};
	a.getXStatus = function(b) {
		var a = -1;
		if (b.status) a = b.status;
		else if (b.xStatus !== void 0) a = b.xStatus;
		return a
	};
	a.hasXHR = function() {
		return window.XMLHttpRequest !== void 0
	};
	a.hasXHR2 = function() {
		if (a.hasXHR()) return a.isXHR2(new XMLHttpRequest);
		return !1
	};
	a.hasIEXDR = function() {
		return window.XDomainRequest !== void 0
	};
	a.hasPostMessage = function() {
		return window.postMessage !== void 0
	};
	a.hasPMXDR = function() {
		return a.hasPostMessage() && window.XDR !== void 0 && window.pmxdr !== void 0
	};
	a.hasImageObjRequest =

	function() {
		return window.ImageObjRequest !== void 0
	}
})();
//public_html/external/dfs/ivi.dfs.filechecker.min.js
(function() {
	var d = window.ivi;
	d === void 0 && (d = {});
	if (d.dfs === void 0) d.dfs = {};
	var e = d.dfs.utils,
		i = window.console || {
			log: function() {},
			dir: function() {}
		};
	d.dfs.FileChecker = function() {
		var b = this;
		b.status = !0;
		b.transport = !1;
		b.requests = [];
		b.timeoutDefault = 5E3;
		b.timeoutAbortAfter = 100;
		b.init = function() {
			try {
				var a = e.detectTransports();
				b.transport = a.head.rfc;
				if (!b.transport) throw Error("Неподдерживаемый браузер");
			} catch (g) {
				i.log("ivi.dfs.FileChecker error: " + g.message)
			}
		};
		b.loadendHandler = function() {
			b.finishLoad(this)
		};
		b.timeoutHandler = function() {
			this.xStatus = -408;
			b.finishLoad(this)
		};
		b.forceTimeout = function(a) {
			a.xStatus = -408;
			a.abort();
			b.finishLoad(a)
		};
		b.finishLoad = function(a) {
			if (a.isRunning) {
				a.isRunning = !1;
				b.stopRequestTimers(a);
				var g = b.getRequestResult(a);
				if (e.isRedirected(a)) {
					var f = e.getRedirectLocation(a);
					if (f) {
						var d = a.chain;
						d.push(g);
						b.checkFile(f, a.resultCallback, a.timeout, d);
						return
					}
				}
				b.sendRequestResult(a, g)
			}
		};
		b.stopRequestTimers = function(a) {
			clearTimeout(a.timeoutCounter);
			a.timeEnd = (new Date).getTime();
			a.timeDelta =
			a.timeEnd - a.timeBegin
		};
		b.getRequestResult = function(a) {
			a.dfsId = e.getDfsId(a);
			a.xStatus = e.getXStatus(a);
			return {
				url: a.url,
				dfsid: a.dfsId,
				http_code: a.xStatus,
				time_ms: a.timeDelta,
				transport: b.transport,
				chain: a.chain
			}
		};
		b.sendRequestResult = function(a, b) {
			if (!a.resultSent) {
				if (typeof a.resultCallback !== "function") throw Error("Назначенный callback не является функцией");
				a.resultCallback(b);
				a.resultSent = !0
			}
		};
		b.checkFile = function(a, d, f, h) {
			try {
				if (!e.isNonEmptyString(a)) throw Error("URL не передан или некорректен");
				if (typeof d !== "function") throw Error("Переданный callback не является функцией");
				if (f) if (e.isNaturalNumeric(f)) f = e.toInteger(f);
				else
				throw Error("Передан некорректный таймаут");
				else f = b.timeoutDefault;
				var c = e.createRequest(b.transport);
				if (!c) throw Error("Не удалось создать запрос");
				e.isArray(h) || (h = []);
				c.chain = h;
				c.url = a;
				c.isRunning = !1;
				c.resultCallback = d;
				c.resultSent = !1;
				c.open("HEAD", a, !0);
				c.onload = b.loadendHandler;
				c.onerror = b.loadendHandler;
				c.onabort = b.loadendHandler;
				c.ontimeout = b.timeoutHandler;
				c.timeout = f;
				var j = f + b.timeoutAbortAfter;
				c.timeBegin = (new Date).getTime();
				c.timeoutCounter = setTimeout(function() {
					b.forceTimeout(c)
				}, j);
				c.send();
				c.isRunning = !0;
				b.requests.push(c)
			} catch (k) {
				i.log("ivi.dfs.FileChecker error: " + k.message)
			}
		};
		b.init()
	}
})();
//public_html/external/dfs/ivi.dfs.speedtest.min.js
(function(j) {
	var h = window.ivi;
	h === void 0 && (h = {});
	if (h.dfs === void 0) h.dfs = {};
	var i = h.dfs.utils;
	h.dfs.SpeedTest = function(h, k) {
		var a = this;
		a.$elems = {
			output: null,
			errorMessage: null,
			auxLink: null,
			button: null,
			progressWrap: null,
			progressBar: null,
			progressValue: null
		};
		a.elemIdsDefault = {
			output: "speedtest_output",
			errorMessage: "speedtest_error_message",
			auxLink: "speedtest_aux_link",
			button: "speedtest_button",
			progressWrap: "speedtest_progress",
			progressBar: "speedtest_progress_bar",
			progressValue: "speedtest_progress_value"
		};
		a.optionsDefault = {
			requestThreshold: 8E3,
			requestTimeout: 6E4,
			forceTimeoutAfter: 100,
			anticacheParam: "r",
			loadingCssClass: "loading"
		};
		a.isRunning = !1;
		a.isDone = !1;
		a.errorCode = null;
		a.runningRequestId = -1;
		a.numRequestsTotal = 0;
		a.numRequestsLeft = 0;
		a.serverLastDfsId = {};
		a.transport = {
			main: null,
			fallback: null,
			header: null
		};
		a.apiUrl = "/speed/json/api/";
		a.uriGetFilesList = "get/servers/";
		a.uriSendResults = "send/results/";
		a.emptyFilelistKey = "empty";
		a.fallbackFromKey = "32m";
		a.apiErrorKey = "error";
		a.options = {};
		a.testFiles = {};
		a.requests = [];
		a.skipServers = {};
		a.clientData = {};
		a.results = {};
		a.messages = {
			ERROR_COMMON: "Ошибка %CODE%",
			ERROR_101: "Вы используете устаревший браузер",
			ERROR_111: "Некорректное значение порогового интервала",
			ERROR_112: "Некорректное значение таймаута",
			ERROR_113: "Таймаут должен превышать пороговый интервал",
			ERROR_131: "Не определён элемент выдачи результатов",
			ERROR_132: "Не определён элемент выдачи ошибки",
			ERROR_133: "Не определён элемент служебной ссылки",
			ERROR_134: "Не определён элемент функциональной кнопки",
			ERROR_135: "Не определён элемент контейнера прогресса",
			ERROR_136: "Не определён элемент отображения прогресса",
			ERROR_137: "Не определён элемент значения прогресса",
			ERROR_151: "Не найден элемент выдачи результатов",
			ERROR_152: "Не найден элемент выдачи ошибки",
			ERROR_153: "Не найден элемент служебной ссылки",
			ERROR_154: "Не найден элемент функциональной кнопки",
			ERROR_155: "Не найден элемент контейнера прогресса",
			ERROR_156: "Не найден элемент отображения прогресса",
			ERROR_157: "Не найден элемент значения прогресса",
			ERROR_211: "Невозможно получить список файлов",
			ERROR_212: "Невозможно получить список файлов",
			ERROR_213: "Некорректный список файлов",
			ERROR_214: "Некорректный список файлов",
			ERROR_221: "Невозможно получить результаты тестирования",
			ERROR_222: "Невозможно получить результаты тестирования",
			ERROR_223: "Невозможно отобразить результаты тестирования",
			ERROR_224: "Невозможно отобразить результаты тестирования",
			ERROR_225: "Невозможно отобразить результаты тестирования",
			BUTTON_START: "Проверить скорость",
			BUTTON_TESTING: "Идёт тестирование…",
			BUTTON_FINISHED: "Проверка закончена",
			BUTTON_UNABLE: "Тестирование невозможно",
			AUXLINK_RESTART: "Начать заново",
			AUXLINK_RETRY: "Попробовать ещё раз",
			RESULTS_TITLE: "<h2>Результаты тестирования</h2>\n",
			RESULTS_MEASURE_ID: "<h3>ID операции: <strong>%MEASURE_ID%</kbd></strong></h3>\n",
			RESULTS_LIST_OPEN: '<ul class="test-results">\n',
			RESULTS_ITEM: "    <li><em>%SERVER_ID%:</em> <strong>%KBPS% Кбит/с</strong></li>\n",
			RESULTS_ITEM_BEST: '    <li class="best"><em>%SERVER_ID%:</em> <strong>%KBPS% Кбит/с</strong> (лучший результат!)</li>\n',
			RESULTS_ITEM_ERROR: '    <li class="error"><em>%SERVER_ID%:</em> <strong>ошибка!</strong></li>\n',
			RESULTS_LIST_CLOSE: "</ul>\n"
		};
		a.init = function(b, c) {
			a.setClientData();
			if (a.setElements(c) && a.setOptions(b)) {
				var d = i.detectTransports();
				a.transport.main = d.get.stimg;
				a.transport.fallback = d.get.stimgbig;
				a.transport.header = d.head.rfc;
				if (!a.transport.main || !a.transport.fallback) a.setError(101);
				else {
					if (!a.transport.header) a.transport.header = a.transport.main;
					a.$elems.button.prop("disabled", !1).text(a.messages.BUTTON_START).click(function() {
						a.runTest()
					})
				}
			}
		};
		a.setClientData = function() {
			a.clientData.useragent =
			navigator.userAgent;
			var b = !1,
				c = "";
			if (window.swfobject !== void 0) {
				var d = swfobject.getFlashPlayerVersion();
				d.major > 0 && (b = !0, c = d.major + "." + d.minor + "." + d.release)
			}
			a.clientData.flash_enabled = b;
			a.clientData.flash_version = c
		};
		a.setElements = function(b) {
			var c, b = j.extend(a.elemIdsDefault, b),
				d = 130,
				e = 150;
			for (c in a.$elems) if (a.$elems.hasOwnProperty(c)) {
				d++;
				if (typeof b[c] != "string") return a.setError(d), !1;
				e++;
				a.$elems[c] = j("#" + b[c]);
				if (!a.$elems[c].length) return a.setError(d), !1
			}
			return !0
		};
		a.setOptions = function(b) {
			a.options =
			j.extend(a.optionsDefault, b);
			if (!i.isNaturalNumeric(a.options.requestThreshold)) return a.setError(111), !1;
			if (!i.isNaturalNumeric(a.options.requestTimeout)) return a.setError(112), !1;
			if (a.options.requestTimeout <= a.options.requestThreshold) return a.setError(113), !1;
			if (typeof a.options.loadingCssClass != "string") a.options.loadingCssClass = "";
			return !0
		};
		a.runTest = function() {
			if (!a.isRunning) {
				a.isRunning = !0;
				a.$elems.output.addClass(a.options.loadingCssClass).show();
				a.$elems.progressWrap.show();
				a.$elems.button.prop("disabled", !0).text(a.messages.BUTTON_TESTING);
				var b = a.apiUrl + a.uriGetFilesList;
				b += "?" + a.options.anticacheParam + "=" + (new Date).getTime();
				j.ajax({
					url: b,
					async: !0,
					dataType: "json",
					crossDomain: !1,
					success: a.applyFilesList,
					error: function() {
						a.setError(211)
					}
				})
			}
		};
		a.applyFilesList = function(b) {
			if (b[a.apiErrorKey] !== void 0) a.setError(212);
			else {
				var c, d, e, g, f;
				a.testFiles = b;
				for (c in a.testFiles) if (a.testFiles.hasOwnProperty(c)) {
					a.serverLastDfsId[c] = null;
					b = !1;
					d = a.testFiles[c];
					if (!j.isArray(d) && !j.isPlainObject(d)) {
						a.setError(214);
						return
					}
					a.results[c] = {};
					a.skipServers[c] = !1;
					for (var h in d) if (d.hasOwnProperty(h) && (e = d[h][0], g = d[h][1], !(e === void 0 || g === void 0))) {
						e == a.fallbackFromKey && (b = !0);
						f = e == a.emptyFilelistKey ? a.transport.header : b ? a.transport.fallback : a.transport.main;
						f = i.createRequest(f);
						if (!f) {
							a.setError(101);
							return
						}
						f.url = g;
						f.open("GET", g, !0);
						f.onload = a.requestLoadEndCallback;
						f.onerror = a.requestLoadEndCallback;
						f.onabort = a.requestLoadEndCallback;
						f.timeout = a.options.requestTimeout;
						f.ontimeout = a.requestTimeoutCallback;
						f.onprogress =
						a.requestProgressCallback;
						f.serverId = c;
						f.fileId = e;
						f.bytesLoaded = 0;
						f.progress = [];
						requestId = a.requests.length;
						f.requestId = requestId;
						a.requests[requestId] = f
					}
				}
				a.requests.length ? (a.numRequestsTotal = a.numRequestsLeft = a.requests.length, a.drawTotalProgress(), a.startNextRequest()) : a.setError(213)
			}
		};
		a.stopRequestTimers = function(b) {
			b.forcedTimeoutCounter !== void 0 && clearTimeout(b.forcedTimeoutCounter);
			var c = b.timeStart,
				d = (new Date).getTime(),
				c = d - c;
			b.timeFinish = d;
			b.timeDelta = c;
			b.thresholdReached = c >= a.options.requestThreshold
		};
		a.saveResult = function(b) {
			var c = b.fileId,
				d = b.serverId,
				e = i.getDfsId(b);
			e != -1 ? a.serverLastDfsId[d] = e : e = a.serverLastDfsId[d] || -1;
			if (c != a.emptyFilelistKey) {
				var g = b.progress;
				g.length || g.push(b.bytesLoaded);
				a.results[d][c] = {
					dfsid: e,
					time_ms: b.timeDelta,
					http_code: b.xStatus,
					progress: g,
					transport: b.transport
				}
			}
		};
		a.requestLoadEndCallback = function(b) {
			a.stopRequestTimers(this);
			this.xStatus = i.getXStatus(this);
			var c = this.xStatus != 200;
			if (this.thresholdReached || c) a.skipServers[this.serverId] = !0;
			try {
				this.bytesLoaded =
				this.transport == "xhr2" ? b.loaded : this.responseText.length
			} catch (d) {}
			a.saveResult(this);
			a.drawTotalProgress();
			a.startNextRequest()
		};
		a.requestTimeoutCallback = function() {
			this.xStatus = -408
		};
		a.forceTimeout = function(a) {
			a.xStatus = -408;
			a.abort()
		};
		a.requestProgressCallback = function(a) {
			for (var c = this.timeStart, c = (new Date).getTime() - c, c = Math.floor(c / 1E3), d = this.progress, e = this.bytesLoaded, g = e, g = this.transport == "xhr2" ? a.loaded : this.responseText.length, a = d.length; a < c; a++) d[a] = e;
			this.bytesLoaded = d[c] = g
		};
		a.drawTotalProgress =

		function() {
			var b = Math.floor((a.numRequestsTotal - a.numRequestsLeft) / a.numRequestsTotal * 100) + "%";
			a.$elems.progressBar.css("width", b);
			a.$elems.progressValue.html(b)
		};
		a.setError = function(b) {
			a.isRunning = !1;
			a.errorCode = b;
			var c = a.messages.ERROR_COMMON.replace("%CODE%", b),
				b = a.messages["ERROR_" + b];
			b !== void 0 && (c += ": " + b);
			try {
				a.$elems.output.show().removeClass(a.options.loadingCssClass), a.$elems.errorMessage.text(c).show()
			} catch (d) {
				alert(c)
			}
			try {
				a.$elems.auxLink.text(a.messages.AUXLINK_RETRY).show()
			} catch (e) {}
			try {
				a.$elems.button.prop("disabled", !0).text(a.messages.BUTTON_UNABLE)
			} catch (g) {}
		};
		a.getNextRequestId = function(b) {
			b === void 0 && (b = a.runningRequestId + 1);
			var c = a.requests[b];
			return typeof c != "object" ? -1 : a.skipServers[c.serverId] ? (a.numRequestsLeft--, a.getNextRequestId(b + 1)) : (a.numRequestsLeft--, b)
		};
		a.startNextRequest = function() {
			if (a.isRunning) {
				var b = a.getNextRequestId();
				a.runningRequestId = b;
				if (b > -1) {
					var c = a.requests[b];
					if (i.isNaturalNumeric(a.options.forceTimeoutAfter) && i.isNaturalNumeric(c.timeout)) c.forcedTimeoutCounter = setTimeout(function() {
						a.forceTimeout(c)
					}, c.timeout + a.options.forceTimeoutAfter);
					c.timeStart = (new Date).getTime();
					c.send()
				} else a.isDone = !0, a.isRunning = !1, a.drawTotalProgress(), a.sendResults()
			}
		};
		a.sendResults = function() {
			var b = JSON.stringify({
				client: a.clientData,
				results: a.results,
				transport: a.transport.main
			}),
				c = a.apiUrl + a.uriSendResults;
			c += "?" + a.options.anticacheParam + "=" + (new Date).getTime();
			j.ajax({
				type: "POST",
				url: c,
				async: !0,
				data: {
					results: b
				},
				dataType: "json",
				crossDomain: !1,
				success: a.showOutput,
				error: function() {
					a.setError(221)
				}
			})
		};
		a.showOutput =

		function(b) {
			if (b[a.apiErrorKey] !== void 0) a.setError(222);
			else if (b.speed === void 0) a.setError(223);
			else {
				var c, d, e, g, f = null;
				e = d = 0;
				for (c in b.speed) if (b.speed.hasOwnProperty(c)) {
					if (b.speed[c].kbps === void 0) {
						a.setError(225);
						return
					}
					e++;
					if (b.speed[c].kbps > d) f = c, d = b.speed[c].kbps
				}
				if (e) {
					d = a.messages.RESULTS_TITLE;
					b.measure_id !== void 0 && (d += a.messages.RESULTS_MEASURE_ID.replace("%MEASURE_ID%", b.measure_id));
					d += a.messages.RESULTS_LIST_OPEN;
					for (c in b.speed) if (b.speed.hasOwnProperty(c)) e = b.speed[c].kbps, g = c == f, e = e ? g ? "RESULTS_ITEM_BEST" : "RESULTS_ITEM" : "RESULTS_ITEM_ERROR", d += a.messages[e].replace("%SERVER_ID%", c).replace("%KBPS%", b.speed[c].kbps);
					d += a.messages.RESULTS_LIST_CLOSE;
					a.$elems.output.removeClass(a.options.loadingCssClass).append(d);
					a.$elems.button.prop("disabled", !0).text(a.messages.BUTTON_FINISHED);
					a.$elems.auxLink.text(a.messages.AUXLINK_RESTART).show()
				} else a.setError(224)
			}
		};
		a.init(h, k)
	}
})(jQuery);
//public_html/js/compiled/swfobject.js
var swfobject = function() {
	function u() {
		if (!s) {
			try {
				var a = d.getElementsByTagName("body")[0].appendChild(d.createElement("span"));
				a.parentNode.removeChild(a)
			} catch (b) {
				return
			}
			s = !0;
			for (var a = x.length, c = 0; c < a; c++) x[c]()
		}
	}
	function L(a) {
		s ? a() : x[x.length] = a
	}
	function M(a) {
		if (typeof m.addEventListener != i) m.addEventListener("load", a, !1);
		else if (typeof d.addEventListener != i) d.addEventListener("load", a, !1);
		else if (typeof m.attachEvent != i) U(m, "onload", a);
		else if (typeof m.onload == "function") {
			var b = m.onload;
			m.onload =

			function() {
				b();
				a()
			}
		} else m.onload = a
	}
	function V() {
		var a = d.getElementsByTagName("body")[0],
			b = d.createElement(r);
		b.setAttribute("type", y);
		var c = a.appendChild(b);
		if (c) {
			var f = 0;
			(function() {
				if (typeof c.GetVariable != i) {
					var g = c.GetVariable("$version");
					if (g) g = g.split(" ")[1].split(","), e.pv = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)]
				} else if (f < 10) {
					f++;
					setTimeout(arguments.callee, 10);
					return
				}
				a.removeChild(b);
				c = null;
				D()
			})()
		} else D()
	}
	function D() {
		var a = o.length;
		if (a > 0) for (var b = 0; b < a; b++) {
			var c = o[b].id,
				f = o[b].callbackFn,
				g = {
					success: !1,
					id: c
				};
			if (e.pv[0] > 0) {
				var d = n(c);
				if (d) if (z(o[b].swfVersion) && !(e.wk && e.wk < 312)) {
					if (t(c, !0), f) g.success = !0, g.ref = E(c), f(g)
				} else if (o[b].expressInstall && F()) {
					g = {};
					g.data = o[b].expressInstall;
					g.width = d.getAttribute("width") || "0";
					g.height = d.getAttribute("height") || "0";
					if (d.getAttribute("class")) g.styleclass = d.getAttribute("class");
					if (d.getAttribute("align")) g.align = d.getAttribute("align");
					for (var h = {}, d = d.getElementsByTagName("param"), j = d.length, k = 0; k < j; k++) d[k].getAttribute("name").toLowerCase() != "movie" && (h[d[k].getAttribute("name")] = d[k].getAttribute("value"));
					G(g, h, c, f)
				} else W(d), f && f(g)
			} else if (t(c, !0), f) {
				if ((c = E(c)) && typeof c.SetVariable != i) g.success = !0, g.ref = c;
				f(g)
			}
		}
	}
	function E(a) {
		var b = null;
		if ((a = n(a)) && a.nodeName == "OBJECT") typeof a.SetVariable != i ? b = a : (a = a.getElementsByTagName(r)[0]) && (b = a);
		return b
	}
	function F() {
		return !A && z("6.0.65") && (e.win || e.mac) && !(e.wk && e.wk < 312)
	}
	function G(a, b, c, f) {
		A = !0;
		H = f || null;
		N = {
			success: !1,
			id: c
		};
		var g = n(c);
		if (g) {
			g.nodeName == "OBJECT" ? (w = I(g), B = null) : (w = g, B =
			c);
			a.id = O;
			if (typeof a.width == i || !/%$/.test(a.width) && parseInt(a.width, 10) < 310) a.width = "310";
			if (typeof a.height == i || !/%$/.test(a.height) && parseInt(a.height, 10) < 137) a.height = "137";
			d.title = d.title.slice(0, 47) + " - Flash Player Installation";
			f = e.ie && e.win ? "ActiveX" : "PlugIn";
			f = "MMredirectURL=" + m.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + d.title;
			typeof b.flashvars != i ? b.flashvars += "&" + f : b.flashvars = f;
			if (e.ie && e.win && g.readyState != 4) f = d.createElement("div"), c += "SWFObjectNew", f.setAttribute("id", c), g.parentNode.insertBefore(f, g), g.style.display = "none", function() {
				g.readyState == 4 ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10)
			}();
			J(a, b, c)
		}
	}
	function W(a) {
		if (e.ie && e.win && a.readyState != 4) {
			var b = d.createElement("div");
			a.parentNode.insertBefore(b, a);
			b.parentNode.replaceChild(I(a), b);
			a.style.display = "none";
			(function() {
				a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
			})()
		} else a.parentNode.replaceChild(I(a), a)
	}
	function I(a) {
		var b = d.createElement("div");
		if (e.win && e.ie) b.innerHTML = a.innerHTML;
		else if (a = a.getElementsByTagName(r)[0]) if (a = a.childNodes) for (var c = a.length, f = 0; f < c; f++)!(a[f].nodeType == 1 && a[f].nodeName == "PARAM") && a[f].nodeType != 8 && b.appendChild(a[f].cloneNode(!0));
		return b
	}
	function J(a, b, c) {
		var f, g = n(c);
		if (e.wk && e.wk < 312) return f;
		if (g) {
			if (typeof a.id == i) a.id = c;
			if (e.ie && e.win) {
				var q = "",
					h;
				for (h in a) if (a[h] != Object.prototype[h]) h.toLowerCase() == "data" ? b.movie = a[h] : h.toLowerCase() == "styleclass" ? q += ' class="' + a[h] + '"' : h.toLowerCase() != "classid" && (q += " " + h + '="' + a[h] + '"');
				h = "";
				for (var j in b) b[j] != Object.prototype[j] && (h += '<param name="' + j + '" value="' + b[j] + '" />');
				g.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + q + ">" + h + "</object>";
				C[C.length] = a.id;
				f = n(a.id)
			} else {
				j = d.createElement(r);
				j.setAttribute("type", y);
				for (var k in a) a[k] != Object.prototype[k] && (k.toLowerCase() == "styleclass" ? j.setAttribute("class", a[k]) : k.toLowerCase() != "classid" && j.setAttribute(k, a[k]));
				for (q in b) b[q] != Object.prototype[q] && q.toLowerCase() != "movie" && (a = j, h = q, k = b[q], c = d.createElement("param"), c.setAttribute("name", h), c.setAttribute("value", k), a.appendChild(c));
				g.parentNode.replaceChild(j, g);
				f = j
			}
		}
		return f
	}
	function P(a) {
		var b = n(a);
		if (b && b.nodeName == "OBJECT") e.ie && e.win ? (b.style.display = "none", function() {
			if (b.readyState == 4) {
				var c = n(a);
				if (c) {
					for (var f in c) typeof c[f] == "function" && (c[f] = null);
					c.parentNode.removeChild(c)
				}
			} else setTimeout(arguments.callee, 10)
		}()) : b.parentNode.removeChild(b)
	}
	function n(a) {
		var b = null;
		try {
			b = d.getElementById(a)
		} catch (c) {}
		return b
	}

	function U(a, b, c) {
		a.attachEvent(b, c);
		v[v.length] = [a, b, c]
	}
	function z(a) {
		var b = e.pv,
			a = a.split(".");
		a[0] = parseInt(a[0], 10);
		a[1] = parseInt(a[1], 10) || 0;
		a[2] = parseInt(a[2], 10) || 0;
		return b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : !1
	}
	function Q(a, b, c, f) {
		if (!e.ie || !e.mac) {
			var g = d.getElementsByTagName("head")[0];
			if (g) {
				c = c && typeof c == "string" ? c : "screen";
				f && (K = l = null);
				if (!l || K != c) f = d.createElement("style"), f.setAttribute("type", "text/css"), f.setAttribute("media", c), l = g.appendChild(f), e.ie && e.win && typeof d.styleSheets != i && d.styleSheets.length > 0 && (l = d.styleSheets[d.styleSheets.length - 1]), K = c;
				e.ie && e.win ? l && typeof l.addRule == r && l.addRule(a, b) : l && typeof d.createTextNode != i && l.appendChild(d.createTextNode(a + " {" + b + "}"))
			}
		}
	}
	function t(a, b) {
		if (R) {
			var c = b ? "visible" : "hidden";
			s && n(a) ? n(a).style.visibility = c : Q("#" + a, "visibility:" + c)
		}
	}
	function S(a) {
		return /[\\\"<>\.;]/.exec(a) != null && typeof encodeURIComponent != i ? encodeURIComponent(a) : a
	}
	var i = "undefined",
		r = "object",
		y = "application/x-shockwave-flash",
		O = "SWFObjectExprInst",
		m = window,
		d = document,
		p = navigator,
		T = !1,
		x = [function() {
			T ? V() : D()
		}],
		o = [],
		C = [],
		v = [],
		w, B, H, N, s = !1,
		A = !1,
		l, K, R = !0,
		e = function() {
			var a = typeof d.getElementById != i && typeof d.getElementsByTagName != i && typeof d.createElement != i,
				b = p.userAgent.toLowerCase(),
				c = p.platform.toLowerCase(),
				f = c ? /win/.test(c) : /win/.test(b),
				c = c ? /mac/.test(c) : /mac/.test(b),
				b = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
				g = !+"1",
				e = [0, 0, 0],
				h = null;
			if (typeof p.plugins != i && typeof p.plugins["Shockwave Flash"] == r) {
				if ((h = p.plugins["Shockwave Flash"].description) && !(typeof p.mimeTypes != i && p.mimeTypes[y] && !p.mimeTypes[y].enabledPlugin)) T = !0, g = !1, h = h.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), e[0] = parseInt(h.replace(/^(.*)\..*$/, "$1"), 10), e[1] = parseInt(h.replace(/^.*\.(.*)\s.*$/, "$1"), 10), e[2] = /[a-zA-Z]/.test(h) ? parseInt(h.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
			} else if (typeof m.ActiveXObject != i) try {
				var j = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				if (j && (h = j.GetVariable("$version"))) g = !0, h = h.split(" ")[1].split(","), e = [parseInt(h[0], 10), parseInt(h[1], 10), parseInt(h[2], 10)]
			} catch (k) {}
			return {
				w3: a,
				pv: e,
				wk: b,
				ie: g,
				win: f,
				mac: c
			}
		}();
	(function() {
		e.w3 && ((typeof d.readyState != i && d.readyState == "complete" || typeof d.readyState == i && (d.getElementsByTagName("body")[0] || d.body)) && u(), s || (typeof d.addEventListener != i && d.addEventListener("DOMContentLoaded", u, !1), e.ie && e.win && (d.attachEvent("onreadystatechange", function() {
			d.readyState == "complete" && (d.detachEvent("onreadystatechange", arguments.callee), u())
		}), m == top &&
		function() {
			if (!s) {
				try {
					d.documentElement.doScroll("left")
				} catch (a) {
					setTimeout(arguments.callee, 0);
					return
				}
				u()
			}
		}()), e.wk &&
		function() {
			s || (/loaded|complete/.test(d.readyState) ? u() : setTimeout(arguments.callee, 0))
		}(), M(u)))
	})();
	(function() {
		e.ie && e.win && window.attachEvent("onunload", function() {
			for (var a = v.length, b = 0; b < a; b++) v[b][0].detachEvent(v[b][1], v[b][2]);
			a = C.length;
			for (b = 0; b < a; b++) P(C[b]);
			for (var c in e) e[c] = null;
			e = null;
			for (var f in swfobject) swfobject[f] = null;
			swfobject = null
		})
	})();
	return {
		registerObject: function(a, b, c, f) {
			if (e.w3 && a && b) {
				var d = {};
				d.id = a;
				d.swfVersion = b;
				d.expressInstall = c;
				d.callbackFn =
				f;
				o[o.length] = d;
				t(a, !1)
			} else f && f({
				success: !1,
				id: a
			})
		},
		getObjectById: function(a) {
			if (e.w3) return E(a)
		},
		embedSWF: function(a, b, c, d, g, q, h, j, k, m) {
			var n = {
				success: !1,
				id: b
			};
			e.w3 && !(e.wk && e.wk < 312) && a && b && c && d && g ? (t(b, !1), L(function() {
				c += "";
				d += "";
				var e = {};
				if (k && typeof k === r) for (var l in k) e[l] = k[l];
				e.data = a;
				e.width = c;
				e.height = d;
				l = {};
				if (j && typeof j === r) for (var o in j) l[o] = j[o];
				if (h && typeof h === r) for (var p in h) typeof l.flashvars != i ? l.flashvars += "&" + p + "=" + h[p] : l.flashvars = p + "=" + h[p];
				if (z(g)) o = J(e, l, b), e.id == b && t(b, !0), n.success = !0, n.ref = o;
				else if (q && F()) {
					e.data = q;
					G(e, l, b, m);
					return
				} else t(b, !0);
				m && m(n)
			})) : m && m(n)
		},
		switchOffAutoHideShow: function() {
			R = !1
		},
		ua: e,
		getFlashPlayerVersion: function() {
			return {
				major: e.pv[0],
				minor: e.pv[1],
				release: e.pv[2]
			}
		},
		hasFlashPlayerVersion: z,
		createSWF: function(a, b, c) {
			if (e.w3) return J(a, b, c)
		},
		showExpressInstall: function(a, b, c, d) {
			e.w3 && F() && G(a, b, c, d)
		},
		removeSWF: function(a) {
			e.w3 && P(a)
		},
		createCSS: function(a, b, c, d) {
			e.w3 && Q(a, b, c, d)
		},
		addDomLoadEvent: L,
		addLoadEvent: M,
		getQueryParamValue: function(a) {
			var b =
			d.location.search || d.location.hash;
			if (b) {
				/\?/.test(b) && (b = b.split("?")[1]);
				if (a == null) return S(b);
				for (var b = b.split("&"), c = 0; c < b.length; c++) if (b[c].substring(0, b[c].indexOf("=")) == a) return S(b[c].substring(b[c].indexOf("=") + 1))
			}
			return ""
		},
		expressInstallCallback: function() {
			if (A) {
				var a = n(O);
				if (a && w) {
					a.parentNode.replaceChild(w, a);
					if (B && (t(B, !0), e.ie && e.win)) w.style.display = "block";
					H && H(N)
				}
				A = !1
			}
		}
	}
}();
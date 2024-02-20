function notif(n, t, i) {
    new PNotify({
        title: n,
        text: t,
        type: i,
        styling: "bootstrap3"
    })
}

function notifFooter(n, t, i) {
    new TabbedNotification({
        title: n,
        text: t,
        type: i,
        sound: !1
    })
}

function notifBlocking(n, t, i) {
    new PNotify({
        title: n,
        text: t,
        type: i,
        hide: !1,
        nonblock: {
            nonblock: !0
        },
        styling: "bootstrap3",
        addclass: "dark"
    })
}(function(n, t) {
    "function" == typeof define && define.amd ? define("pnotify", ["jquery"], function(i) {
        return t(i, n)
    }) : "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), global || n) : n.PNotify = t(n.jQuery, n)
})(this, function(n, t) {
    var i = function(t) {
        var s = {
                dir1: "down",
                dir2: "left",
                push: "bottom",
                spacing1: 36,
                spacing2: 36,
                context: n("body"),
                modal: !1
            },
            u, f, e = n(t),
            o = function() {
                f = n("body");
                r.prototype.options.stack.context = f;
                e = n(t);
                e.bind("resize", function() {
                    u && clearTimeout(u);
                    u = setTimeout(function() {
                        r.positionAll(!0)
                    }, 10)
                })
            },
            h = function(t) {
                var i = n("<div />", {
                    "class": "ui-pnotify-modal-overlay"
                });
                return i.prependTo(t.context), t.overlay_close && i.click(function() {
                    r.removeStack(t)
                }), i
            },
            r = function(n) {
                this.parseOptions(n);
                this.init()
            };
        return n.extend(r.prototype, {
            version: "3.0.0",
            options: {
                title: !1,
                title_escape: !1,
                text: !1,
                text_escape: !1,
                styling: "brighttheme",
                addclass: "",
                cornerclass: "",
                auto_display: !0,
                width: "300px",
                min_height: "16px",
                type: "notice",
                icon: !0,
                animation: "fade",
                animate_speed: "normal",
                shadow: !0,
                hide: !0,
                delay: 8e3,
                mouse_reset: !0,
                remove: !0,
                insert_brs: !0,
                destroy: !0,
                stack: s
            },
            modules: {},
            runModules: function(n, t) {
                var r, i;
                for (i in this.modules) r = "object" == typeof t && i in t ? t[i] : t, "function" == typeof this.modules[i][n] && (this.modules[i].notice = this, this.modules[i].options = "object" == typeof this.options[i] ? this.options[i] : {}, this.modules[i][n](this, "object" == typeof this.options[i] ? this.options[i] : {}, r))
            },
            state: "initializing",
            timer: null,
            animTimer: null,
            styles: null,
            elem: null,
            container: null,
            title_container: null,
            text_container: null,
            animating: !1,
            timerHide: !1,
            init: function() {
                var t = this;
                return this.modules = {}, n.extend(!0, this.modules, r.prototype.modules), this.styles = "object" == typeof this.options.styling ? this.options.styling : r.styling[this.options.styling], this.elem = n("<div />", {
                    "class": "ui-pnotify " + this.options.addclass,
                    css: {
                        display: "none"
                    },
                    "aria-live": "assertive",
                    "aria-role": "alertdialog",
                    mouseenter: function() {
                        if (t.options.mouse_reset && "out" === t.animating) {
                            if (!t.timerHide) return;
                            t.cancelRemove()
                        }
                        t.options.hide && t.options.mouse_reset && t.cancelRemove()
                    },
                    mouseleave: function() {
                        t.options.hide && t.options.mouse_reset && "out" !== t.animating && t.queueRemove();
                        r.positionAll()
                    }
                }), "fade" === this.options.animation && this.elem.addClass("ui-pnotify-fade-" + this.options.animate_speed), this.container = n("<div />", {
                    "class": this.styles.container + " ui-pnotify-container " + ("error" === this.options.type ? this.styles.error : "info" === this.options.type ? this.styles.info : "success" === this.options.type ? this.styles.success : this.styles.notice),
                    role: "alert"
                }).appendTo(this.elem), "" !== this.options.cornerclass && this.container.removeClass("ui-corner-all").addClass(this.options.cornerclass), this.options.shadow && this.container.addClass("ui-pnotify-shadow"), !1 !== this.options.icon && n("<div />", {
                    "class": "ui-pnotify-icon"
                }).append(n("<span />", {
                    "class": !0 === this.options.icon ? "error" === this.options.type ? this.styles.error_icon : "info" === this.options.type ? this.styles.info_icon : "success" === this.options.type ? this.styles.success_icon : this.styles.notice_icon : this.options.icon
                })).prependTo(this.container), this.title_container = n("<h4 />", {
                    "class": "ui-pnotify-title"
                }).appendTo(this.container), !1 === this.options.title ? this.title_container.hide() : this.options.title_escape ? this.title_container.text(this.options.title) : this.title_container.html(this.options.title), this.text_container = n("<div />", {
                    "class": "ui-pnotify-text",
                    "aria-role": "alert"
                }).appendTo(this.container), !1 === this.options.text ? this.text_container.hide() : this.options.text_escape ? this.text_container.text(this.options.text) : this.text_container.html(this.options.insert_brs ? String(this.options.text).replace(/\n/g, "<br />") : this.options.text), "string" == typeof this.options.width && this.elem.css("width", this.options.width), "string" == typeof this.options.min_height && this.container.css("min-height", this.options.min_height), r.notices = "top" === this.options.stack.push ? n.merge([this], r.notices) : n.merge(r.notices, [this]), "top" === this.options.stack.push && this.queuePosition(!1, 1), this.options.stack.animation = !1, this.runModules("init"), this.options.auto_display && this.open(), this
            },
            update: function(t) {
                var i = this.options;
                return this.parseOptions(i, t), this.elem.removeClass("ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast"), "fade" === this.options.animation && this.elem.addClass("ui-pnotify-fade-" + this.options.animate_speed), this.options.cornerclass !== i.cornerclass && this.container.removeClass("ui-corner-all " + i.cornerclass).addClass(this.options.cornerclass), this.options.shadow !== i.shadow && (this.options.shadow ? this.container.addClass("ui-pnotify-shadow") : this.container.removeClass("ui-pnotify-shadow")), !1 === this.options.addclass ? this.elem.removeClass(i.addclass) : this.options.addclass !== i.addclass && this.elem.removeClass(i.addclass).addClass(this.options.addclass), !1 === this.options.title ? this.title_container.slideUp("fast") : this.options.title !== i.title && (this.options.title_escape ? this.title_container.text(this.options.title) : this.title_container.html(this.options.title), !1 === i.title && this.title_container.slideDown(200)), !1 === this.options.text ? this.text_container.slideUp("fast") : this.options.text !== i.text && (this.options.text_escape ? this.text_container.text(this.options.text) : this.text_container.html(this.options.insert_brs ? String(this.options.text).replace(/\n/g, "<br />") : this.options.text), !1 === i.text && this.text_container.slideDown(200)), this.options.type !== i.type && this.container.removeClass(this.styles.error + " " + this.styles.notice + " " + this.styles.success + " " + this.styles.info).addClass("error" === this.options.type ? this.styles.error : "info" === this.options.type ? this.styles.info : "success" === this.options.type ? this.styles.success : this.styles.notice), (this.options.icon !== i.icon || !0 === this.options.icon && this.options.type !== i.type) && (this.container.find("div.ui-pnotify-icon").remove(), !1 !== this.options.icon && n("<div />", {
                    "class": "ui-pnotify-icon"
                }).append(n("<span />", {
                    "class": !0 === this.options.icon ? "error" === this.options.type ? this.styles.error_icon : "info" === this.options.type ? this.styles.info_icon : "success" === this.options.type ? this.styles.success_icon : this.styles.notice_icon : this.options.icon
                })).prependTo(this.container)), this.options.width !== i.width && this.elem.animate({
                    width: this.options.width
                }), this.options.min_height !== i.min_height && this.container.animate({
                    minHeight: this.options.min_height
                }), this.options.hide ? i.hide || this.queueRemove() : this.cancelRemove(), this.queuePosition(!0), this.runModules("update", i), this
            },
            open: function() {
                this.state = "opening";
                this.runModules("beforeOpen");
                var n = this;
                return this.elem.parent().length || this.elem.appendTo(this.options.stack.context ? this.options.stack.context : f), "top" !== this.options.stack.push && this.position(!0), this.animateIn(function() {
                    n.queuePosition(!0);
                    n.options.hide && n.queueRemove();
                    n.state = "open";
                    n.runModules("afterOpen")
                }), this
            },
            remove: function(i) {
                this.state = "closing";
                this.timerHide = !!i;
                this.runModules("beforeClose");
                var u = this;
                return this.timer && (t.clearTimeout(this.timer), this.timer = null), this.animateOut(function() {
                    if (u.state = "closed", u.runModules("afterClose"), u.queuePosition(!0), u.options.remove && u.elem.detach(), u.runModules("beforeDestroy"), u.options.destroy && null !== r.notices) {
                        var t = n.inArray(u, r.notices); - 1 !== t && r.notices.splice(t, 1)
                    }
                    u.runModules("afterDestroy")
                }), this
            },
            get: function() {
                return this.elem
            },
            parseOptions: function(t, i) {
                var o, u, e, f;
                for (this.options = n.extend(!0, {}, r.prototype.options), this.options.stack = r.prototype.options.stack, o = [t, i], e = 0; e < o.length; e++) {
                    if (u = o[e], "undefined" == typeof u) break;
                    if ("object" != typeof u) this.options.text = u;
                    else
                        for (f in u) this.modules[f] ? n.extend(!0, this.options[f], u[f]) : this.options[f] = u[f]
                }
            },
            animateIn: function(n) {
                this.animating = "in";
                var t = this;
                n = function() {
                    t.animTimer && clearTimeout(t.animTimer);
                    "in" === t.animating && (t.elem.is(":visible") ? (this && this.call(), t.animating = !1) : t.animTimer = setTimeout(n, 40))
                }.bind(n);
                "fade" === this.options.animation ? (this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend", n).addClass("ui-pnotify-in"), this.elem.css("opacity"), this.elem.addClass("ui-pnotify-fade-in"), this.animTimer = setTimeout(n, 650)) : (this.elem.addClass("ui-pnotify-in"), n())
            },
            animateOut: function(n) {
                this.animating = "out";
                var t = this;
                n = function() {
                    t.animTimer && clearTimeout(t.animTimer);
                    "out" === t.animating && ("0" != t.elem.css("opacity") && t.elem.is(":visible") ? t.animTimer = setTimeout(n, 40) : (t.elem.removeClass("ui-pnotify-in"), this && this.call(), t.animating = !1))
                }.bind(n);
                "fade" === this.options.animation ? (this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend", n).removeClass("ui-pnotify-fade-in"), this.animTimer = setTimeout(n, 650)) : (this.elem.removeClass("ui-pnotify-in"), n())
            },
            position: function(n) {
                var t = this.options.stack,
                    i = this.elem,
                    o, r, u;
                if ("undefined" == typeof t.context && (t.context = f), t) {
                    if ("number" != typeof t.nextpos1 && (t.nextpos1 = t.firstpos1), "number" != typeof t.nextpos2 && (t.nextpos2 = t.firstpos2), "number" != typeof t.addpos2 && (t.addpos2 = 0), o = !i.hasClass("ui-pnotify-in"), !o || n) {
                        t.modal && (t.overlay ? t.overlay.show() : t.overlay = h(t));
                        i.addClass("ui-pnotify-move");
                        switch (t.dir1) {
                            case "down":
                                r = "top";
                                break;
                            case "up":
                                r = "bottom";
                                break;
                            case "left":
                                r = "right";
                                break;
                            case "right":
                                r = "left"
                        }
                        n = parseInt(i.css(r).replace(/(?:\..*|[^0-9.])/g, ""));
                        isNaN(n) && (n = 0);
                        "undefined" != typeof t.firstpos1 || o || (t.firstpos1 = n, t.nextpos1 = t.firstpos1);
                        switch (t.dir2) {
                            case "down":
                                u = "top";
                                break;
                            case "up":
                                u = "bottom";
                                break;
                            case "left":
                                u = "right";
                                break;
                            case "right":
                                u = "left"
                        }
                        n = parseInt(i.css(u).replace(/(?:\..*|[^0-9.])/g, ""));
                        isNaN(n) && (n = 0);
                        "undefined" != typeof t.firstpos2 || o || (t.firstpos2 = n, t.nextpos2 = t.firstpos2);
                        ("down" === t.dir1 && t.nextpos1 + i.height() > (t.context.is(f) ? e.height() : t.context.prop("scrollHeight")) || "up" === t.dir1 && t.nextpos1 + i.height() > (t.context.is(f) ? e.height() : t.context.prop("scrollHeight")) || "left" === t.dir1 && t.nextpos1 + i.width() > (t.context.is(f) ? e.width() : t.context.prop("scrollWidth")) || "right" === t.dir1 && t.nextpos1 + i.width() > (t.context.is(f) ? e.width() : t.context.prop("scrollWidth"))) && (t.nextpos1 = t.firstpos1, t.nextpos2 += t.addpos2 + ("undefined" == typeof t.spacing2 ? 25 : t.spacing2), t.addpos2 = 0);
                        "number" == typeof t.nextpos2 && (t.animation ? i.css(u, t.nextpos2 + "px") : (i.removeClass("ui-pnotify-move"), i.css(u, t.nextpos2 + "px"), i.css(u), i.addClass("ui-pnotify-move")));
                        switch (t.dir2) {
                            case "down":
                            case "up":
                                i.outerHeight(!0) > t.addpos2 && (t.addpos2 = i.height());
                                break;
                            case "left":
                            case "right":
                                i.outerWidth(!0) > t.addpos2 && (t.addpos2 = i.width())
                        }
                        "number" == typeof t.nextpos1 && (t.animation ? i.css(r, t.nextpos1 + "px") : (i.removeClass("ui-pnotify-move"), i.css(r, t.nextpos1 + "px"), i.css(r), i.addClass("ui-pnotify-move")));
                        switch (t.dir1) {
                            case "down":
                            case "up":
                                t.nextpos1 += i.height() + ("undefined" == typeof t.spacing1 ? 25 : t.spacing1);
                                break;
                            case "left":
                            case "right":
                                t.nextpos1 += i.width() + ("undefined" == typeof t.spacing1 ? 25 : t.spacing1)
                        }
                    }
                    return this
                }
            },
            queuePosition: function(n, t) {
                return u && clearTimeout(u), t || (t = 10), u = setTimeout(function() {
                    r.positionAll(n)
                }, t), this
            },
            cancelRemove: function() {
                return this.timer && t.clearTimeout(this.timer), this.animTimer && t.clearTimeout(this.animTimer), "closing" === this.state && (this.state = "open", this.animating = !1, this.elem.addClass("ui-pnotify-in"), "fade" === this.options.animation && this.elem.addClass("ui-pnotify-fade-in")), this
            },
            queueRemove: function() {
                var n = this;
                return this.cancelRemove(), this.timer = t.setTimeout(function() {
                    n.remove(!0)
                }, isNaN(this.options.delay) ? 0 : this.options.delay), this
            }
        }), n.extend(r, {
            notices: [],
            reload: i,
            removeAll: function() {
                n.each(r.notices, function() {
                    this.remove && this.remove(!1)
                })
            },
            removeStack: function(t) {
                n.each(r.notices, function() {
                    this.remove && this.options.stack === t && this.remove(!1)
                })
            },
            positionAll: function(t) {
                if (u && clearTimeout(u), u = null, r.notices && r.notices.length) n.each(r.notices, function() {
                    var n = this.options.stack;
                    n && (n.overlay && n.overlay.hide(), n.nextpos1 = n.firstpos1, n.nextpos2 = n.firstpos2, n.addpos2 = 0, n.animation = t)
                }), n.each(r.notices, function() {
                    this.position()
                });
                else {
                    var i = r.prototype.options.stack;
                    i && (delete i.nextpos1, delete i.nextpos2)
                }
            },
            styling: {
                brighttheme: {
                    container: "brighttheme",
                    notice: "brighttheme-notice",
                    notice_icon: "brighttheme-icon-notice",
                    info: "brighttheme-info",
                    info_icon: "brighttheme-icon-info",
                    success: "brighttheme-success",
                    success_icon: "brighttheme-icon-success",
                    error: "brighttheme-error",
                    error_icon: "brighttheme-icon-error"
                },
                jqueryui: {
                    container: "ui-widget ui-widget-content ui-corner-all",
                    notice: "ui-state-highlight",
                    notice_icon: "ui-icon ui-icon-info",
                    info: "",
                    info_icon: "ui-icon ui-icon-info",
                    success: "ui-state-default",
                    success_icon: "ui-icon ui-icon-circle-check",
                    error: "ui-state-error",
                    error_icon: "ui-icon ui-icon-alert"
                },
                bootstrap3: {
                    container: "alert",
                    notice: "alert-warning",
                    notice_icon: "glyphicon glyphicon-exclamation-sign",
                    info: "alert-info",
                    info_icon: "glyphicon glyphicon-info-sign",
                    success: "alert-success",
                    success_icon: "glyphicon glyphicon-ok-sign",
                    error: "alert-danger",
                    error_icon: "glyphicon glyphicon-warning-sign"
                }
            }
        }), r.styling.fontawesome = n.extend({}, r.styling.bootstrap3), n.extend(r.styling.fontawesome, {
            notice_icon: "fa fa-exclamation-circle",
            info_icon: "fa fa-info",
            success_icon: "fa fa-check",
            error_icon: "fa fa-warning"
        }), t.document.body ? o() : n(o), r
    };
    return i(t)
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("pnotify.buttons", ["jquery", "pnotify"], t) : "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./pnotify")) : t(n.jQuery, n.PNotify)
}(this, function(n, t) {
    t.prototype.options.buttons = {
        closer: !0,
        closer_hover: !0,
        sticker: !0,
        sticker_hover: !0,
        show_on_nonblock: !1,
        labels: {
            close: "Close",
            stick: "Stick",
            unstick: "Unstick"
        },
        classes: {
            closer: null,
            pin_up: null,
            pin_down: null
        }
    };
    t.prototype.modules.buttons = {
        closer: null,
        sticker: null,
        init: function(t, i) {
            var r = this;
            t.elem.on({
                mouseenter: function() {
                    !r.options.sticker || t.options.nonblock && t.options.nonblock.nonblock && !r.options.show_on_nonblock || r.sticker.trigger("pnotify:buttons:toggleStick").css("visibility", "visible");
                    !r.options.closer || t.options.nonblock && t.options.nonblock.nonblock && !r.options.show_on_nonblock || r.closer.css("visibility", "visible")
                },
                mouseleave: function() {
                    r.options.sticker_hover && r.sticker.css("visibility", "hidden");
                    r.options.closer_hover && r.closer.css("visibility", "hidden")
                }
            });
            this.sticker = n("<div />", {
                "class": "ui-pnotify-sticker",
                "aria-role": "button",
                "aria-pressed": t.options.hide ? "false" : "true",
                tabindex: "0",
                title: t.options.hide ? i.labels.stick : i.labels.unstick,
                css: {
                    cursor: "pointer",
                    visibility: i.sticker_hover ? "hidden" : "visible"
                },
                click: function() {
                    t.options.hide = !t.options.hide;
                    t.options.hide ? t.queueRemove() : t.cancelRemove();
                    n(this).trigger("pnotify:buttons:toggleStick")
                }
            }).bind("pnotify:buttons:toggleStick", function() {
                var i = null === r.options.classes.pin_up ? t.styles.pin_up : r.options.classes.pin_up,
                    u = null === r.options.classes.pin_down ? t.styles.pin_down : r.options.classes.pin_down;
                n(this).attr("title", t.options.hide ? r.options.labels.stick : r.options.labels.unstick).children().attr("class", "").addClass(t.options.hide ? i : u).attr("aria-pressed", t.options.hide ? "false" : "true")
            }).append("<span />").trigger("pnotify:buttons:toggleStick").prependTo(t.container);
            (!i.sticker || t.options.nonblock && t.options.nonblock.nonblock && !i.show_on_nonblock) && this.sticker.css("display", "none");
            this.closer = n("<div />", {
                "class": "ui-pnotify-closer",
                "aria-role": "button",
                tabindex: "0",
                title: i.labels.close,
                css: {
                    cursor: "pointer",
                    visibility: i.closer_hover ? "hidden" : "visible"
                },
                click: function() {
                    t.remove(!1);
                    r.sticker.css("visibility", "hidden");
                    r.closer.css("visibility", "hidden")
                }
            }).append(n("<span />", {
                "class": null === i.classes.closer ? t.styles.closer : i.classes.closer
            })).prependTo(t.container);
            (!i.closer || t.options.nonblock && t.options.nonblock.nonblock && !i.show_on_nonblock) && this.closer.css("display", "none")
        },
        update: function(n, t) {
            !t.closer || n.options.nonblock && n.options.nonblock.nonblock && !t.show_on_nonblock ? this.closer.css("display", "none") : t.closer && this.closer.css("display", "block");
            !t.sticker || n.options.nonblock && n.options.nonblock.nonblock && !t.show_on_nonblock ? this.sticker.css("display", "none") : t.sticker && this.sticker.css("display", "block");
            this.sticker.trigger("pnotify:buttons:toggleStick");
            this.closer.find("span").attr("class", "").addClass(null === t.classes.closer ? n.styles.closer : t.classes.closer);
            t.sticker_hover ? this.sticker.css("visibility", "hidden") : n.options.nonblock && n.options.nonblock.nonblock && !t.show_on_nonblock || this.sticker.css("visibility", "visible");
            t.closer_hover ? this.closer.css("visibility", "hidden") : n.options.nonblock && n.options.nonblock.nonblock && !t.show_on_nonblock || this.closer.css("visibility", "visible")
        }
    };
    n.extend(t.styling.brighttheme, {
        closer: "brighttheme-icon-closer",
        pin_up: "brighttheme-icon-sticker",
        pin_down: "brighttheme-icon-sticker brighttheme-icon-stuck"
    });
    n.extend(t.styling.jqueryui, {
        closer: "ui-icon ui-icon-close",
        pin_up: "ui-icon ui-icon-pin-w",
        pin_down: "ui-icon ui-icon-pin-s"
    });
    n.extend(t.styling.bootstrap2, {
        closer: "icon-remove",
        pin_up: "icon-pause",
        pin_down: "icon-play"
    });
    n.extend(t.styling.bootstrap3, {
        closer: "glyphicon glyphicon-remove",
        pin_up: "glyphicon glyphicon-pause",
        pin_down: "glyphicon glyphicon-play"
    });
    n.extend(t.styling.fontawesome, {
        closer: "fa fa-times",
        pin_up: "fa fa-pause",
        pin_down: "fa fa-play"
    })
}),
function(n, t) {
    "function" == typeof define && define.amd ? define("pnotify.nonblock", ["jquery", "pnotify"], t) : "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./pnotify")) : t(n.jQuery, n.PNotify)
}(this, function(n, t) {
    var f = /^on/,
        e = /^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,
        o = /^(focus|blur|select|change|reset)$|^key(press|down|up)$/,
        s = /^(scroll|resize|(un)?load|abort|error)$/,
        r = function(t, i) {
            var r;
            t = t.toLowerCase();
            document.createEvent && this.dispatchEvent ? (t = t.replace(f, ""), t.match(e) ? (n(this).offset(), r = document.createEvent("MouseEvents"), r.initMouseEvent(t, i.bubbles, i.cancelable, i.view, i.detail, i.screenX, i.screenY, i.clientX, i.clientY, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.button, i.relatedTarget)) : t.match(o) ? (r = document.createEvent("UIEvents"), r.initUIEvent(t, i.bubbles, i.cancelable, i.view, i.detail)) : t.match(s) && (r = document.createEvent("HTMLEvents"), r.initEvent(t, i.bubbles, i.cancelable)), r && this.dispatchEvent(r)) : (t.match(f) || (t = "on" + t), r = document.createEventObject(i), this.fireEvent(t, r))
        },
        i, u = function(t, u, f) {
            var e, s, o;
            t.elem.addClass("ui-pnotify-nonblock-hide");
            e = document.elementFromPoint(u.clientX, u.clientY);
            t.elem.removeClass("ui-pnotify-nonblock-hide");
            s = n(e);
            o = s.css("cursor");
            "auto" === o && "A" === e.tagName && (o = "pointer");
            t.elem.css("cursor", "auto" !== o ? o : "default");
            i && i.get(0) == e || (i && (r.call(i.get(0), "mouseleave", u.originalEvent), r.call(i.get(0), "mouseout", u.originalEvent)), r.call(e, "mouseenter", u.originalEvent), r.call(e, "mouseover", u.originalEvent));
            r.call(e, f, u.originalEvent);
            i = s
        };
    t.prototype.options.nonblock = {
        nonblock: !1
    };
    t.prototype.modules.nonblock = {
        init: function(n) {
            var t = this;
            n.elem.on({
                mouseenter: function(i) {
                    t.options.nonblock && i.stopPropagation();
                    t.options.nonblock && n.elem.addClass("ui-pnotify-nonblock-fade")
                },
                mouseleave: function(r) {
                    t.options.nonblock && r.stopPropagation();
                    i = null;
                    n.elem.css("cursor", "auto");
                    t.options.nonblock && "out" !== n.animating && n.elem.removeClass("ui-pnotify-nonblock-fade")
                },
                mouseover: function(n) {
                    t.options.nonblock && n.stopPropagation()
                },
                mouseout: function(n) {
                    t.options.nonblock && n.stopPropagation()
                },
                mousemove: function(i) {
                    t.options.nonblock && (i.stopPropagation(), u(n, i, "onmousemove"))
                },
                mousedown: function(i) {
                    t.options.nonblock && (i.stopPropagation(), i.preventDefault(), u(n, i, "onmousedown"))
                },
                mouseup: function(i) {
                    t.options.nonblock && (i.stopPropagation(), i.preventDefault(), u(n, i, "onmouseup"))
                },
                click: function(i) {
                    t.options.nonblock && (i.stopPropagation(), u(n, i, "onclick"))
                },
                dblclick: function(i) {
                    t.options.nonblock && (i.stopPropagation(), u(n, i, "ondblclick"))
                }
            })
        }
    }
})
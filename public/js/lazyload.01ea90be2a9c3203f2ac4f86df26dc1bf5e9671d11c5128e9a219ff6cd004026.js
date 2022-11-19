(() => {
  // node_modules/vanilla-lazyload/dist/lazyload.esm.min.js
  var e = "undefined" != typeof window;
  var t = e && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
  var a = e && "IntersectionObserver" in window;
  var s = e && "classList" in document.createElement("p");
  var l = e && window.devicePixelRatio > 1;
  var n = { elements_selector: ".lazy", container: t || e ? document : null, threshold: 300, thresholds: null, data_src: "src", data_srcset: "srcset", data_sizes: "sizes", data_bg: "bg", data_bg_hidpi: "bg-hidpi", data_bg_multi: "bg-multi", data_bg_multi_hidpi: "bg-multi-hidpi", data_bg_set: "bg-set", data_poster: "poster", class_applied: "applied", class_loading: "loading", class_loaded: "loaded", class_error: "error", class_entered: "entered", class_exited: "exited", unobserve_completed: true, unobserve_entered: false, cancel_on_exit: true, callback_enter: null, callback_exit: null, callback_applied: null, callback_loading: null, callback_loaded: null, callback_error: null, callback_finish: null, callback_cancel: null, use_native: false, restore_on_error: false };
  var o = (e2) => Object.assign({}, n, e2);
  var r = function(e2, t2) {
    let a2;
    const s2 = "LazyLoad::Initialized", l2 = new e2(t2);
    try {
      a2 = new CustomEvent(s2, { detail: { instance: l2 } });
    } catch (e3) {
      a2 = document.createEvent("CustomEvent"), a2.initCustomEvent(s2, false, false, { instance: l2 });
    }
    window.dispatchEvent(a2);
  };
  var i = "src";
  var c = "llOriginalAttrs";
  var d = (e2, t2) => e2.getAttribute("data-" + t2);
  var _ = (e2) => d(e2, "ll-status");
  var u = (e2, t2) => ((e3, t3, a2) => {
    var s2 = "data-ll-status";
    null !== a2 ? e3.setAttribute(s2, a2) : e3.removeAttribute(s2);
  })(e2, 0, t2);
  var g = (e2) => u(e2, null);
  var b = (e2) => null === _(e2);
  var m = (e2) => "native" === _(e2);
  var p = ["loading", "loaded", "applied", "error"];
  var h = (e2, t2, a2, s2) => {
    e2 && (void 0 === s2 ? void 0 === a2 ? e2(t2) : e2(t2, a2) : e2(t2, a2, s2));
  };
  var v = (e2, t2) => {
    s ? e2.classList.add(t2) : e2.className += (e2.className ? " " : "") + t2;
  };
  var E = (e2, t2) => {
    s ? e2.classList.remove(t2) : e2.className = e2.className.replace(new RegExp("(^|\\s+)" + t2 + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
  };
  var f = (e2) => e2.llTempImage;
  var I = (e2, t2) => {
    if (!t2)
      return;
    const a2 = t2._observer;
    a2 && a2.unobserve(e2);
  };
  var k = (e2, t2) => {
    e2 && (e2.loadingCount += t2);
  };
  var A = (e2, t2) => {
    e2 && (e2.toLoadCount = t2);
  };
  var w = (e2) => {
    let t2 = [];
    for (let a2, s2 = 0; a2 = e2.children[s2]; s2 += 1)
      "SOURCE" === a2.tagName && t2.push(a2);
    return t2;
  };
  var y = (e2, t2) => {
    const a2 = e2.parentNode;
    a2 && "PICTURE" === a2.tagName && w(a2).forEach(t2);
  };
  var L = (e2, t2) => {
    w(e2).forEach(t2);
  };
  var O = [i];
  var x = [i, "poster"];
  var C = [i, "srcset", "sizes"];
  var N = ["data"];
  var M = (e2) => !!e2[c];
  var z = (e2) => e2[c];
  var R = (e2) => delete e2[c];
  var T = (e2, t2) => {
    if (M(e2))
      return;
    const a2 = {};
    t2.forEach((t3) => {
      a2[t3] = e2.getAttribute(t3);
    }), e2[c] = a2;
  };
  var G = (e2, t2) => {
    if (!M(e2))
      return;
    const a2 = z(e2);
    t2.forEach((t3) => {
      ((e3, t4, a3) => {
        a3 ? e3.setAttribute(t4, a3) : e3.removeAttribute(t4);
      })(e2, t3, a2[t3]);
    });
  };
  var D = (e2, t2, a2) => {
    v(e2, t2.class_applied), u(e2, "applied"), a2 && (t2.unobserve_completed && I(e2, t2), h(t2.callback_applied, e2, a2));
  };
  var H = (e2, t2, a2) => {
    v(e2, t2.class_loading), u(e2, "loading"), a2 && (k(a2, 1), h(t2.callback_loading, e2, a2));
  };
  var V = (e2, t2, a2) => {
    a2 && e2.setAttribute(t2, a2);
  };
  var $ = (e2, t2) => {
    V(e2, "sizes", d(e2, t2.data_sizes)), V(e2, "srcset", d(e2, t2.data_srcset)), V(e2, i, d(e2, t2.data_src));
  };
  var F = { IMG: (e2, t2) => {
    y(e2, (e3) => {
      T(e3, C), $(e3, t2);
    }), T(e2, C), $(e2, t2);
  }, IFRAME: (e2, t2) => {
    T(e2, O), V(e2, i, d(e2, t2.data_src));
  }, VIDEO: (e2, t2) => {
    L(e2, (e3) => {
      T(e3, O), V(e3, i, d(e3, t2.data_src));
    }), T(e2, x), V(e2, "poster", d(e2, t2.data_poster)), V(e2, i, d(e2, t2.data_src)), e2.load();
  }, OBJECT: (e2, t2) => {
    T(e2, N), V(e2, "data", d(e2, t2.data_src));
  } };
  var j = ["IMG", "IFRAME", "VIDEO", "OBJECT"];
  var B = (e2, t2) => {
    !t2 || ((e3) => e3.loadingCount > 0)(t2) || ((e3) => e3.toLoadCount > 0)(t2) || h(e2.callback_finish, t2);
  };
  var J = (e2, t2, a2) => {
    e2.addEventListener(t2, a2), e2.llEvLisnrs[t2] = a2;
  };
  var S = (e2, t2, a2) => {
    e2.removeEventListener(t2, a2);
  };
  var P = (e2) => !!e2.llEvLisnrs;
  var U = (e2) => {
    if (!P(e2))
      return;
    const t2 = e2.llEvLisnrs;
    for (let a2 in t2) {
      const s2 = t2[a2];
      S(e2, a2, s2);
    }
    delete e2.llEvLisnrs;
  };
  var q = (e2, t2, a2) => {
    ((e3) => {
      delete e3.llTempImage;
    })(e2), k(a2, -1), ((e3) => {
      e3 && (e3.toLoadCount -= 1);
    })(a2), E(e2, t2.class_loading), t2.unobserve_completed && I(e2, a2);
  };
  var K = (e2, t2, a2) => {
    const s2 = f(e2) || e2;
    P(s2) || ((e3, t3, a3) => {
      P(e3) || (e3.llEvLisnrs = {});
      const s3 = "VIDEO" === e3.tagName ? "loadeddata" : "load";
      J(e3, s3, t3), J(e3, "error", a3);
    })(s2, (l2) => {
      ((e3, t3, a3, s3) => {
        const l3 = m(t3);
        q(t3, a3, s3), v(t3, a3.class_loaded), u(t3, "loaded"), h(a3.callback_loaded, t3, s3), l3 || B(a3, s3);
      })(0, e2, t2, a2), U(s2);
    }, (l2) => {
      ((e3, t3, a3, s3) => {
        const l3 = m(t3);
        q(t3, a3, s3), v(t3, a3.class_error), u(t3, "error"), h(a3.callback_error, t3, s3), a3.restore_on_error && G(t3, C), l3 || B(a3, s3);
      })(0, e2, t2, a2), U(s2);
    });
  };
  var Q = (e2, t2, a2) => {
    ((e3) => j.indexOf(e3.tagName) > -1)(e2) ? ((e3, t3, a3) => {
      K(e3, t3, a3), ((e4, t4, a4) => {
        const s2 = F[e4.tagName];
        s2 && (s2(e4, t4), H(e4, t4, a4));
      })(e3, t3, a3);
    })(e2, t2, a2) : ((e3, t3, a3) => {
      ((e4) => {
        e4.llTempImage = document.createElement("IMG");
      })(e3), K(e3, t3, a3), ((e4) => {
        M(e4) || (e4[c] = { backgroundImage: e4.style.backgroundImage });
      })(e3), ((e4, t4, a4) => {
        const s2 = d(e4, t4.data_bg), n2 = d(e4, t4.data_bg_hidpi), o2 = l && n2 ? n2 : s2;
        o2 && (e4.style.backgroundImage = `url("${o2}")`, f(e4).setAttribute(i, o2), H(e4, t4, a4));
      })(e3, t3, a3), ((e4, t4, a4) => {
        const s2 = d(e4, t4.data_bg_multi), n2 = d(e4, t4.data_bg_multi_hidpi), o2 = l && n2 ? n2 : s2;
        o2 && (e4.style.backgroundImage = o2, D(e4, t4, a4));
      })(e3, t3, a3), ((e4, t4, a4) => {
        const s2 = d(e4, t4.data_bg_set);
        if (!s2)
          return;
        const l2 = s2.split("|");
        let n2 = l2.map((e5) => `image-set(${e5})`);
        e4.style.backgroundImage = n2.join(), "" === e4.style.backgroundImage && (n2 = l2.map((e5) => `-webkit-image-set(${e5})`), e4.style.backgroundImage = n2.join()), D(e4, t4, a4);
      })(e3, t3, a3);
    })(e2, t2, a2);
  };
  var W = (e2) => {
    e2.removeAttribute(i), e2.removeAttribute("srcset"), e2.removeAttribute("sizes");
  };
  var X = (e2) => {
    y(e2, (e3) => {
      G(e3, C);
    }), G(e2, C);
  };
  var Y = { IMG: X, IFRAME: (e2) => {
    G(e2, O);
  }, VIDEO: (e2) => {
    L(e2, (e3) => {
      G(e3, O);
    }), G(e2, x), e2.load();
  }, OBJECT: (e2) => {
    G(e2, N);
  } };
  var Z = (e2, t2) => {
    ((e3) => {
      const t3 = Y[e3.tagName];
      t3 ? t3(e3) : ((e4) => {
        if (!M(e4))
          return;
        const t4 = z(e4);
        e4.style.backgroundImage = t4.backgroundImage;
      })(e3);
    })(e2), ((e3, t3) => {
      b(e3) || m(e3) || (E(e3, t3.class_entered), E(e3, t3.class_exited), E(e3, t3.class_applied), E(e3, t3.class_loading), E(e3, t3.class_loaded), E(e3, t3.class_error));
    })(e2, t2), g(e2), R(e2);
  };
  var ee = ["IMG", "IFRAME", "VIDEO"];
  var te = (e2) => e2.use_native && "loading" in HTMLImageElement.prototype;
  var ae = (e2, t2, a2) => {
    e2.forEach((e3) => ((e4) => e4.isIntersecting || e4.intersectionRatio > 0)(e3) ? ((e4, t3, a3, s2) => {
      const l2 = ((e5) => p.indexOf(_(e5)) >= 0)(e4);
      u(e4, "entered"), v(e4, a3.class_entered), E(e4, a3.class_exited), ((e5, t4, a4) => {
        t4.unobserve_entered && I(e5, a4);
      })(e4, a3, s2), h(a3.callback_enter, e4, t3, s2), l2 || Q(e4, a3, s2);
    })(e3.target, e3, t2, a2) : ((e4, t3, a3, s2) => {
      b(e4) || (v(e4, a3.class_exited), ((e5, t4, a4, s3) => {
        a4.cancel_on_exit && ((e6) => "loading" === _(e6))(e5) && "IMG" === e5.tagName && (U(e5), ((e6) => {
          y(e6, (e7) => {
            W(e7);
          }), W(e6);
        })(e5), X(e5), E(e5, a4.class_loading), k(s3, -1), g(e5), h(a4.callback_cancel, e5, t4, s3));
      })(e4, t3, a3, s2), h(a3.callback_exit, e4, t3, s2));
    })(e3.target, e3, t2, a2));
  };
  var se = (e2) => Array.prototype.slice.call(e2);
  var le = (e2) => e2.container.querySelectorAll(e2.elements_selector);
  var ne = (e2) => ((e3) => "error" === _(e3))(e2);
  var oe = (e2, t2) => ((e3) => se(e3).filter(b))(e2 || le(t2));
  var re = function(t2, s2) {
    const l2 = o(t2);
    this._settings = l2, this.loadingCount = 0, ((e2, t3) => {
      a && !te(e2) && (t3._observer = new IntersectionObserver((a2) => {
        ae(a2, e2, t3);
      }, ((e3) => ({ root: e3.container === document ? null : e3.container, rootMargin: e3.thresholds || e3.threshold + "px" }))(e2)));
    })(l2, this), ((t3, a2) => {
      e && (a2._onlineHandler = () => {
        ((e2, t4) => {
          var a3;
          (a3 = le(e2), se(a3).filter(ne)).forEach((t5) => {
            E(t5, e2.class_error), g(t5);
          }), t4.update();
        })(t3, a2);
      }, window.addEventListener("online", a2._onlineHandler));
    })(l2, this), this.update(s2);
  };
  re.prototype = { update: function(e2) {
    const s2 = this._settings, l2 = oe(e2, s2);
    var n2, o2;
    A(this, l2.length), !t && a ? te(s2) ? ((e3, t2, a2) => {
      e3.forEach((e4) => {
        -1 !== ee.indexOf(e4.tagName) && ((e5, t3, a3) => {
          e5.setAttribute("loading", "lazy"), K(e5, t3, a3), ((e6, t4) => {
            const a4 = F[e6.tagName];
            a4 && a4(e6, t4);
          })(e5, t3), u(e5, "native");
        })(e4, t2, a2);
      }), A(a2, 0);
    })(l2, s2, this) : (o2 = l2, ((e3) => {
      e3.disconnect();
    })(n2 = this._observer), ((e3, t2) => {
      t2.forEach((t3) => {
        e3.observe(t3);
      });
    })(n2, o2)) : this.loadAll(l2);
  }, destroy: function() {
    this._observer && this._observer.disconnect(), e && window.removeEventListener("online", this._onlineHandler), le(this._settings).forEach((e2) => {
      R(e2);
    }), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, delete this.toLoadCount;
  }, loadAll: function(e2) {
    const t2 = this._settings;
    oe(e2, t2).forEach((e3) => {
      I(e3, this), Q(e3, t2, this);
    });
  }, restoreAll: function() {
    const e2 = this._settings;
    le(e2).forEach((t2) => {
      Z(t2, e2);
    });
  } }, re.load = (e2, t2) => {
    const a2 = o(t2);
    Q(e2, a2);
  }, re.resetStatus = (e2) => {
    g(e2);
  }, e && ((e2, t2) => {
    if (t2)
      if (t2.length)
        for (let a2, s2 = 0; a2 = t2[s2]; s2 += 1)
          r(e2, a2);
      else
        r(e2, t2);
  })(re, window.lazyLoadOptions);
})();

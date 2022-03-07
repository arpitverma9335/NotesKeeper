"use strict";
(self.webpackChunkNotesKeeper = self.webpackChunkNotesKeeper || []).push([
  [179],
  {
    904: () => {
      function K(e) {
        return "function" == typeof e;
      }
      function Xr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const pi = Xr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function eo(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class at {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._teardowns = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (K(r))
              try {
                r();
              } catch (i) {
                t = i instanceof pi ? i.errors : [i];
              }
            const { _teardowns: o } = this;
            if (o) {
              this._teardowns = null;
              for (const i of o)
                try {
                  Pd(i);
                } catch (s) {
                  (t = null != t ? t : []),
                    s instanceof pi ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new pi(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Pd(t);
            else {
              if (t instanceof at) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._teardowns =
                null !== (n = this._teardowns) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && eo(n, t);
        }
        remove(t) {
          const { _teardowns: n } = this;
          n && eo(n, t), t instanceof at && t._removeParent(this);
        }
      }
      at.EMPTY = (() => {
        const e = new at();
        return (e.closed = !0), e;
      })();
      const Id = at.EMPTY;
      function Od(e) {
        return (
          e instanceof at ||
          (e && "closed" in e && K(e.remove) && K(e.add) && K(e.unsubscribe))
        );
      }
      function Pd(e) {
        K(e) ? e() : e.unsubscribe();
      }
      const Pn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        gi = {
          setTimeout(...e) {
            const { delegate: t } = gi;
            return ((null == t ? void 0 : t.setTimeout) || setTimeout)(...e);
          },
          clearTimeout(e) {
            const { delegate: t } = gi;
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Td(e) {
        gi.setTimeout(() => {
          const { onUnhandledError: t } = Pn;
          if (!t) throw e;
          t(e);
        });
      }
      function Nd() {}
      const kC = ya("C", void 0, void 0);
      function ya(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Tn = null;
      function mi(e) {
        if (Pn.useDeprecatedSynchronousErrorHandling) {
          const t = !Tn;
          if ((t && (Tn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Tn;
            if (((Tn = null), n)) throw r;
          }
        } else e();
      }
      class va extends at {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Od(t) && t.add(this))
              : (this.destination = $C);
        }
        static create(t, n, r) {
          return new yi(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Ca(
                (function LC(e) {
                  return ya("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Ca(
                (function VC(e) {
                  return ya("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Ca(kC, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const BC = Function.prototype.bind;
      function _a(e, t) {
        return BC.call(e, t);
      }
      class HC {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              vi(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              vi(r);
            }
          else vi(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              vi(n);
            }
        }
      }
      class yi extends va {
        constructor(t, n, r) {
          let o;
          if ((super(), K(t) || !t))
            o = {
              next: null != t ? t : void 0,
              error: null != n ? n : void 0,
              complete: null != r ? r : void 0,
            };
          else {
            let i;
            this && Pn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && _a(t.next, i),
                  error: t.error && _a(t.error, i),
                  complete: t.complete && _a(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new HC(o);
        }
      }
      function vi(e) {
        Pn.useDeprecatedSynchronousErrorHandling
          ? (function jC(e) {
              Pn.useDeprecatedSynchronousErrorHandling &&
                Tn &&
                ((Tn.errorThrown = !0), (Tn.error = e));
            })(e)
          : Td(e);
      }
      function Ca(e, t) {
        const { onStoppedNotification: n } = Pn;
        n && gi.setTimeout(() => n(e, t));
      }
      const $C = {
          closed: !0,
          next: Nd,
          error: function UC(e) {
            throw e;
          },
          complete: Nd,
        },
        Da =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Nn(e) {
        return e;
      }
      let pe = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function zC(e) {
              return (
                (e && e instanceof va) ||
                ((function GC(e) {
                  return e && K(e.next) && K(e.error) && K(e.complete);
                })(e) &&
                  Od(e))
              );
            })(n)
              ? n
              : new yi(n, r, o);
            return (
              mi(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Rd(r))((o, i) => {
              const s = new yi({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Da]() {
            return this;
          }
          pipe(...n) {
            return (function Fd(e) {
              return 0 === e.length
                ? Nn
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = Rd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Rd(e) {
        var t;
        return null !== (t = null != e ? e : Pn.Promise) && void 0 !== t
          ? t
          : Promise;
      }
      const qC = Xr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Kt = (() => {
        class e extends pe {
          constructor() {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new kd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new qC();
          }
          next(n) {
            mi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const r = this.observers.slice();
                for (const o of r) o.next(n);
              }
            });
          }
          error(n) {
            mi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            mi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o ? Id : (i.push(n), new at(() => eo(i, n)));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new pe();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new kd(t, n)), e;
      })();
      class kd extends Kt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Id;
        }
      }
      function Vd(e) {
        return K(null == e ? void 0 : e.lift);
      }
      function xe(e) {
        return (t) => {
          if (Vd(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Me(e, t, n, r, o) {
        return new WC(e, t, n, r, o);
      }
      class WC extends va {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function J(e, t) {
        return xe((n, r) => {
          let o = 0;
          n.subscribe(
            Me(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function Fn(e) {
        return this instanceof Fn ? ((this.v = e), this) : new Fn(e);
      }
      function YC(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, m) {
                i.push([f, h, p, m]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function l(f) {
              f.value instanceof Fn
                ? Promise.resolve(f.value.v).then(u, c)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function u(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function KC(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Bd(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    i({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const Hd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Ud(e) {
        return K(null == e ? void 0 : e.then);
      }
      function $d(e) {
        return K(e[Da]);
      }
      function Gd(e) {
        return (
          Symbol.asyncIterator &&
          K(null == e ? void 0 : e[Symbol.asyncIterator])
        );
      }
      function zd(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const qd = (function XC() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Wd(e) {
        return K(null == e ? void 0 : e[qd]);
      }
      function Qd(e) {
        return YC(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Fn(n.read());
              if (o) return yield Fn(void 0);
              yield yield Fn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Zd(e) {
        return K(null == e ? void 0 : e.getReader);
      }
      function Ft(e) {
        if (e instanceof pe) return e;
        if (null != e) {
          if ($d(e))
            return (function eD(e) {
              return new pe((t) => {
                const n = e[Da]();
                if (K(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Hd(e))
            return (function tD(e) {
              return new pe((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Ud(e))
            return (function nD(e) {
              return new pe((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Td);
              });
            })(e);
          if (Gd(e)) return Yd(e);
          if (Wd(e))
            return (function rD(e) {
              return new pe((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Zd(e))
            return (function oD(e) {
              return Yd(Qd(e));
            })(e);
        }
        throw zd(e);
      }
      function Yd(e) {
        return new pe((t) => {
          (function iD(e, t) {
            var n, r, o, i;
            return (function QC(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = KC(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Jt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Ee(e, t, n = 1 / 0) {
        return K(t)
          ? Ee((r, o) => J((i, s) => t(r, i, o, s))(Ft(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            xe((r, o) =>
              (function sD(e, t, n, r, o, i, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && t.complete();
                  },
                  h = (m) => (u < r ? p(m) : l.push(m)),
                  p = (m) => {
                    i && t.next(m), u++;
                    let v = !1;
                    Ft(n(m, c++)).subscribe(
                      Me(
                        t,
                        (C) => {
                          null == o || o(C), i ? h(C) : t.next(C);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (u--; l.length && u < r; ) {
                                const C = l.shift();
                                s ? Jt(t, s, () => p(C)) : p(C);
                              }
                              f();
                            } catch (C) {
                              t.error(C);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Me(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function to(e = 1 / 0) {
        return Ee(Nn, e);
      }
      const Xt = new pe((e) => e.complete());
      function ba(e) {
        return e[e.length - 1];
      }
      function Kd(e) {
        return K(ba(e)) ? e.pop() : void 0;
      }
      function no(e) {
        return (function lD(e) {
          return e && K(e.schedule);
        })(ba(e))
          ? e.pop()
          : void 0;
      }
      function Jd(e, t = 0) {
        return xe((n, r) => {
          n.subscribe(
            Me(
              r,
              (o) => Jt(r, e, () => r.next(o), t),
              () => Jt(r, e, () => r.complete(), t),
              (o) => Jt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Xd(e, t = 0) {
        return xe((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function ef(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new pe((n) => {
          Jt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Jt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ae(e, t) {
        return t
          ? (function gD(e, t) {
              if (null != e) {
                if ($d(e))
                  return (function cD(e, t) {
                    return Ft(e).pipe(Xd(t), Jd(t));
                  })(e, t);
                if (Hd(e))
                  return (function fD(e, t) {
                    return new pe((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Ud(e))
                  return (function dD(e, t) {
                    return Ft(e).pipe(Xd(t), Jd(t));
                  })(e, t);
                if (Gd(e)) return ef(e, t);
                if (Wd(e))
                  return (function hD(e, t) {
                    return new pe((n) => {
                      let r;
                      return (
                        Jt(n, t, () => {
                          (r = e[qd]()),
                            Jt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => K(null == r ? void 0 : r.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Zd(e))
                  return (function pD(e, t) {
                    return ef(Qd(e), t);
                  })(e, t);
              }
              throw zd(e);
            })(e, t)
          : Ft(e);
      }
      function _i(e) {
        return e <= 0
          ? () => Xt
          : xe((t, n) => {
              let r = 0;
              t.subscribe(
                Me(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function Ma(e, t, ...n) {
        return !0 === t
          ? (e(), null)
          : !1 === t
          ? null
          : t(...n)
              .pipe(_i(1))
              .subscribe(() => e());
      }
      function Z(e) {
        for (let t in e) if (e[t] === Z) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Ea(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function W(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(W).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Aa(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const vD = Z({ __forward_ref__: Z });
      function X(e) {
        return (
          (e.__forward_ref__ = X),
          (e.toString = function () {
            return W(this());
          }),
          e
        );
      }
      function N(e) {
        return tf(e) ? e() : e;
      }
      function tf(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(vD) &&
          e.__forward_ref__ === X
        );
      }
      class G extends Error {
        constructor(t, n) {
          super(
            (function Sa(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function P(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Ve(e) {
        return "function" == typeof e
          ? e.name || e.toString()
          : "object" == typeof e && null != e && "function" == typeof e.type
          ? e.type.name || e.type.toString()
          : P(e);
      }
      function Ci(e, t) {
        const n = t ? ` in ${t}` : "";
        throw new G(-201, `No provider for ${Ve(e)} found${n}`);
      }
      function Ye(e, t) {
        null == e &&
          (function ne(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function U(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Ke(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function xa(e) {
        return nf(e, Di) || nf(e, of);
      }
      function nf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function rf(e) {
        return e && (e.hasOwnProperty(Ia) || e.hasOwnProperty(ED))
          ? e[Ia]
          : null;
      }
      const Di = Z({ ɵprov: Z }),
        Ia = Z({ ɵinj: Z }),
        of = Z({ ngInjectableDef: Z }),
        ED = Z({ ngInjectorDef: Z });
      var O = (() => (
        ((O = O || {})[(O.Default = 0)] = "Default"),
        (O[(O.Host = 1)] = "Host"),
        (O[(O.Self = 2)] = "Self"),
        (O[(O.SkipSelf = 4)] = "SkipSelf"),
        (O[(O.Optional = 8)] = "Optional"),
        O
      ))();
      let Oa;
      function pn(e) {
        const t = Oa;
        return (Oa = e), t;
      }
      function sf(e, t, n) {
        const r = xa(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & O.Optional
          ? null
          : void 0 !== t
          ? t
          : void Ci(W(e), "Injector");
      }
      function gn(e) {
        return { toString: e }.toString();
      }
      var Ct = (() => (
          ((Ct = Ct || {})[(Ct.OnPush = 0)] = "OnPush"),
          (Ct[(Ct.Default = 1)] = "Default"),
          Ct
        ))(),
        Rt = (() => {
          return (
            ((e = Rt || (Rt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Rt
          );
          var e;
        })();
      const SD = "undefined" != typeof globalThis && globalThis,
        xD = "undefined" != typeof window && window,
        ID =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Q = SD || ("undefined" != typeof global && global) || xD || ID,
        nr = {},
        Y = [],
        wi = Z({ ɵcmp: Z }),
        Pa = Z({ ɵdir: Z }),
        Ta = Z({ ɵpipe: Z }),
        af = Z({ ɵmod: Z }),
        tn = Z({ ɵfac: Z }),
        ro = Z({ __NG_ELEMENT_ID__: Z });
      let OD = 0;
      function Rn(e) {
        return gn(() => {
          const n = {},
            r = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Ct.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || Y,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Rt.Emulated,
              id: "c",
              styles: e.styles || Y,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            o = e.directives,
            i = e.features,
            s = e.pipes;
          return (
            (r.id += OD++),
            (r.inputs = df(e.inputs, n)),
            (r.outputs = df(e.outputs)),
            i && i.forEach((a) => a(r)),
            (r.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(lf)
              : null),
            (r.pipeDefs = s
              ? () => ("function" == typeof s ? s() : s).map(uf)
              : null),
            r
          );
        });
      }
      function lf(e) {
        return (
          Pe(e) ||
          (function mn(e) {
            return e[Pa] || null;
          })(e)
        );
      }
      function uf(e) {
        return (function kn(e) {
          return e[Ta] || null;
        })(e);
      }
      const cf = {};
      function lt(e) {
        return gn(() => {
          const t = {
            type: e.type,
            bootstrap: e.bootstrap || Y,
            declarations: e.declarations || Y,
            imports: e.imports || Y,
            exports: e.exports || Y,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          };
          return null != e.id && (cf[e.id] = e.type), t;
        });
      }
      function df(e, t) {
        if (null == e) return nr;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const S = Rn;
      function Le(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function Pe(e) {
        return e[wi] || null;
      }
      function ut(e, t) {
        const n = e[af] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${W(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const F = 11;
      function kt(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function wt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Ra(e) {
        return 0 != (8 & e.flags);
      }
      function Ai(e) {
        return 2 == (2 & e.flags);
      }
      function Si(e) {
        return 1 == (1 & e.flags);
      }
      function bt(e) {
        return null !== e.template;
      }
      function kD(e) {
        return 0 != (512 & e[2]);
      }
      function Bn(e, t) {
        return e.hasOwnProperty(tn) ? e[tn] : null;
      }
      class jD {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function dt() {
        return hf;
      }
      function hf(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = HD), BD;
      }
      function BD() {
        const e = gf(this),
          t = null == e ? void 0 : e.current;
        if (t) {
          const n = e.previous;
          if (n === nr) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function HD(e, t, n, r) {
        const o =
            gf(e) ||
            (function UD(e, t) {
              return (e[pf] = t);
            })(e, { previous: nr, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          l = s[a];
        (i[a] = new jD(l && l.currentValue, t, s === nr)), (e[r] = t);
      }
      dt.ngInherit = !0;
      const pf = "__ngSimpleChanges__";
      function gf(e) {
        return e[pf] || null;
      }
      let Ba;
      function le(e) {
        return !!e.listen;
      }
      const mf = {
        createRenderer: (e, t) =>
          (function Ha() {
            return void 0 !== Ba
              ? Ba
              : "undefined" != typeof document
              ? document
              : void 0;
          })(),
      };
      function ge(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function xi(e, t) {
        return ge(t[e]);
      }
      function ht(e, t) {
        return ge(t[e.index]);
      }
      function Ua(e, t) {
        return e.data[t];
      }
      function ar(e, t) {
        return e[t];
      }
      function Xe(e, t) {
        const n = t[e];
        return kt(n) ? n : n[0];
      }
      function $a(e) {
        return 128 == (128 & e[2]);
      }
      function yn(e, t) {
        return null == t ? null : e[t];
      }
      function vf(e) {
        e[18] = 0;
      }
      function Ga(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const x = {
        lFrame: Af(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function _f() {
        return x.bindingsEnabled;
      }
      function y() {
        return x.lFrame.lView;
      }
      function z() {
        return x.lFrame.tView;
      }
      function Ii(e) {
        return (x.lFrame.contextLView = e), e[8];
      }
      function Ce() {
        let e = Cf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Cf() {
        return x.lFrame.currentTNode;
      }
      function Vt(e, t) {
        const n = x.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function za() {
        return x.lFrame.isParent;
      }
      function Oi() {
        return x.isInCheckNoChangesMode;
      }
      function Pi(e) {
        x.isInCheckNoChangesMode = e;
      }
      function lr() {
        return x.lFrame.bindingIndex++;
      }
      function iw(e, t) {
        const n = x.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Wa(t);
      }
      function Wa(e) {
        x.lFrame.currentDirectiveIndex = e;
      }
      function Za(e) {
        x.lFrame.currentQueryIndex = e;
      }
      function aw(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function Mf(e, t, n) {
        if (n & O.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & O.Host ||
              ((o = aw(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (x.lFrame = Ef());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Ti(e) {
        const t = Ef(),
          n = e[1];
        (x.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Ef() {
        const e = x.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Af(e) : t;
      }
      function Af(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Sf() {
        const e = x.lFrame;
        return (
          (x.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const xf = Sf;
      function Ni() {
        const e = Sf();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Be() {
        return x.lFrame.selectedIndex;
      }
      function vn(e) {
        x.lFrame.selectedIndex = e;
      }
      function Fi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks || (e.viewHooks = [])).push(-n, l),
            u &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, u),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, u)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function Ri(e, t, n) {
        If(e, t, 3, n);
      }
      function ki(e, t, n, r) {
        (3 & e[2]) === n && If(e, t, n, r);
      }
      function Ya(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function If(e, t, n, r) {
        const i = null != r ? r : -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[18] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (mw(e, n, t, l), (e[18] = (4294901760 & e[18]) + l + 2)),
              l++;
      }
      function mw(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class lo {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Vi(e, t, n) {
        const r = le(e);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if ("number" == typeof i) {
            if (0 !== i) break;
            o++;
            const s = n[o++],
              a = n[o++],
              l = n[o++];
            r ? e.setAttribute(t, a, l, s) : t.setAttributeNS(s, a, l);
          } else {
            const s = i,
              a = n[++o];
            Ja(s)
              ? r && e.setProperty(t, s, a)
              : r
              ? e.setAttribute(t, s, a)
              : t.setAttribute(s, a),
              o++;
          }
        }
        return o;
      }
      function Of(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Ja(e) {
        return 64 === e.charCodeAt(0);
      }
      function Li(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Pf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Pf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Tf(e) {
        return -1 !== e;
      }
      function ur(e) {
        return 32767 & e;
      }
      function cr(e, t) {
        let n = (function Dw(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Xa = !0;
      function ji(e) {
        const t = Xa;
        return (Xa = e), t;
      }
      let ww = 0;
      function co(e, t) {
        const n = tl(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          el(r.data, e),
          el(t, null),
          el(r.blueprint, null));
        const o = Bi(e, t),
          i = e.injectorIndex;
        if (Tf(o)) {
          const s = ur(o),
            a = cr(o, t),
            l = a[1].data;
          for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | l[s + u];
        }
        return (t[i + 8] = o), i;
      }
      function el(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function tl(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Bi(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          const i = o[1],
            s = i.type;
          if (((r = 2 === s ? i.declTNode : 1 === s ? o[6] : null), null === r))
            return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Hi(e, t, n) {
        !(function bw(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(ro) && (r = n[ro]),
            null == r && (r = n[ro] = ww++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function Rf(e, t, n) {
        if (n & O.Optional) return e;
        Ci(t, "NodeInjector");
      }
      function kf(e, t, n, r) {
        if (
          (n & O.Optional && void 0 === r && (r = null),
          0 == (n & (O.Self | O.Host)))
        ) {
          const o = e[9],
            i = pn(void 0);
          try {
            return o ? o.get(t, r, n & O.Optional) : sf(t, r, n & O.Optional);
          } finally {
            pn(i);
          }
        }
        return Rf(r, t, n);
      }
      function Vf(e, t, n, r = O.Default, o) {
        if (null !== e) {
          const i = (function Sw(e) {
            if ("string" == typeof e) return e.charCodeAt(0) || 0;
            const t = e.hasOwnProperty(ro) ? e[ro] : void 0;
            return "number" == typeof t ? (t >= 0 ? 255 & t : Ew) : t;
          })(n);
          if ("function" == typeof i) {
            if (!Mf(t, e, r)) return r & O.Host ? Rf(o, n, r) : kf(t, n, r, o);
            try {
              const s = i(r);
              if (null != s || r & O.Optional) return s;
              Ci(n);
            } finally {
              xf();
            }
          } else if ("number" == typeof i) {
            let s = null,
              a = tl(e, t),
              l = -1,
              u = r & O.Host ? t[16][6] : null;
            for (
              (-1 === a || r & O.SkipSelf) &&
              ((l = -1 === a ? Bi(e, t) : t[a + 8]),
              -1 !== l && Bf(r, !1)
                ? ((s = t[1]), (a = ur(l)), (t = cr(l, t)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = t[1];
              if (jf(i, a, c.data)) {
                const d = Aw(a, t, n, s, r, u);
                if (d !== Lf) return d;
              }
              (l = t[a + 8]),
                -1 !== l && Bf(r, t[1].data[a + 8] === u) && jf(i, a, t)
                  ? ((s = c), (a = ur(l)), (t = cr(l, t)))
                  : (a = -1);
            }
          }
        }
        return kf(t, n, r, o);
      }
      const Lf = {};
      function Ew() {
        return new dr(Ce(), y());
      }
      function Aw(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function Ui(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              l = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (o) {
              const h = s[l];
              if (h && bt(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Ai(a) && Xa : r != s && 0 != (3 & a.type),
            o & O.Host && i === a
          );
        return null !== c ? fo(t, s, c, a) : Lf;
      }
      function fo(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function yw(e) {
            return e instanceof lo;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function _D(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new G(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(Ve(i[n]));
          const a = ji(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? pn(s.injectImpl) : null;
          Mf(e, r, O.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function gw(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = hf(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== l && pn(l), ji(a), (s.resolving = !1), xf();
          }
        }
        return o;
      }
      function jf(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Bf(e, t) {
        return !(e & O.Self || (e & O.Host && t));
      }
      class dr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Vf(this._tNode, this._lView, t, r, n);
        }
      }
      function nl(e) {
        return tf(e)
          ? () => {
              const t = nl(N(e));
              return t && t();
            }
          : Bn(e);
      }
      function ho(e) {
        return (function Mw(e, t) {
          if ("class" === t) return e.classes;
          if ("style" === t) return e.styles;
          const n = e.attrs;
          if (n) {
            const r = n.length;
            let o = 0;
            for (; o < r; ) {
              const i = n[o];
              if (Of(i)) break;
              if (0 === i) o += 2;
              else if ("number" == typeof i)
                for (o++; o < r && "string" == typeof n[o]; ) o++;
              else {
                if (i === t) return n[o + 1];
                o += 2;
              }
            }
          }
          return null;
        })(Ce(), e);
      }
      const hr = "__parameters__";
      function gr(e, t, n) {
        return gn(() => {
          const r = (function rl(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(hr)
                ? l[hr]
                : Object.defineProperty(l, hr, { value: [] })[hr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class j {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = U({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Iw = new j("AnalyzeForEntryComponents");
      function Lt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Lt(n, t) : t(n)));
      }
      function Uf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function $i(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function et(e, t, n) {
        let r = mr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function Tw(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function il(e, t) {
        const n = mr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function mr(e, t) {
        return (function zf(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const yo = {},
        al = "__NG_DI_FLAG__",
        zi = "ngTempTokenPath",
        jw = /\n/gm,
        Wf = "__source",
        Hw = Z({ provide: String, useValue: Z });
      let vo;
      function Qf(e) {
        const t = vo;
        return (vo = e), t;
      }
      function Uw(e, t = O.Default) {
        if (void 0 === vo) throw new G(203, "");
        return null === vo
          ? sf(e, void 0, t)
          : vo.get(e, t & O.Optional ? null : void 0, t);
      }
      function E(e, t = O.Default) {
        return (
          (function AD() {
            return Oa;
          })() || Uw
        )(N(e), t);
      }
      const $w = E;
      function ll(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = N(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new G(900, "");
            let o,
              i = O.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = Gw(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (i |= l)
                : (o = a);
            }
            t.push(E(o, i));
          } else t.push(E(r));
        }
        return t;
      }
      function _o(e, t) {
        return (e[al] = t), (e.prototype[al] = t), e;
      }
      function Gw(e) {
        return e[al];
      }
      const qi = _o(
          gr("Inject", (e) => ({ token: e })),
          -1
        ),
        Cn = _o(gr("Optional"), 8),
        Co = _o(gr("SkipSelf"), 4);
      const hh = "__ngContext__";
      function Fe(e, t) {
        e[hh] = t;
      }
      function vl(e) {
        const t = (function Eo(e) {
          return e[hh] || null;
        })(e);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function Cl(e) {
        return e.ngOriginalError;
      }
      function kb(e, ...t) {
        e.error(...t);
      }
      class Ao {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t),
            r = (function Rb(e) {
              return (e && e.ngErrorLogger) || kb;
            })(t);
          r(this._console, "ERROR", t),
            n && r(this._console, "ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Cl(t);
          for (; n && Cl(n); ) n = Cl(n);
          return n || null;
        }
      }
      const qb = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Q))();
      function Bt(e) {
        return e instanceof Function ? e() : e;
      }
      var tt = (() => (
        ((tt = tt || {})[(tt.Important = 1)] = "Important"),
        (tt[(tt.DashCase = 2)] = "DashCase"),
        tt
      ))();
      function wl(e, t) {
        return undefined(e, t);
      }
      function So(e) {
        const t = e[3];
        return wt(t) ? t[3] : t;
      }
      function bl(e) {
        return wh(e[13]);
      }
      function Ml(e) {
        return wh(e[4]);
      }
      function wh(e) {
        for (; null !== e && !wt(e); ) e = e[4];
        return e;
      }
      function Cr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          wt(r) ? (i = r) : kt(r) && ((s = !0), (r = r[0]));
          const a = ge(r);
          0 === e && null !== n
            ? null == o
              ? xh(t, n, a)
              : Hn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Hn(t, n, a, o || null, !0)
            : 2 === e
            ? (function Rh(e, t, n) {
                const r = Ji(e, t);
                r &&
                  (function sM(e, t, n, r) {
                    le(e) ? e.removeChild(t, n, r) : t.removeChild(n);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function uM(e, t, n, r, o) {
                const i = n[7];
                i !== ge(n) && Cr(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  xo(l[1], l, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Al(e, t, n) {
        if (le(e)) return e.createElement(t, n);
        {
          const r =
            null !== n
              ? (function qD(e) {
                  const t = e.toLowerCase();
                  return "svg" === t
                    ? "http://www.w3.org/2000/svg"
                    : "math" === t
                    ? "http://www.w3.org/1998/MathML/"
                    : null;
                })(n)
              : null;
          return null === r ? e.createElement(t) : e.createElementNS(r, t);
        }
      }
      function Mh(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        1024 & t[2] && ((t[2] &= -1025), Ga(o, -1)), n.splice(r, 1);
      }
      function Sl(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && Mh(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = $i(e, 10 + t);
          !(function Jb(e, t) {
            xo(e, t, t[F], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function Eh(e, t) {
        if (!(256 & t[2])) {
          const n = t[F];
          le(n) && n.destroyNode && xo(e, t, n, 3, null, null),
            (function tM(e) {
              let t = e[13];
              if (!t) return xl(e[1], e);
              for (; t; ) {
                let n = null;
                if (kt(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    kt(t) && xl(t[1], t), (t = t[3]);
                  null === t && (t = e), kt(t) && xl(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function xl(e, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function iM(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof lo)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function oM(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      a = "function" == typeof s ? s(t) : ge(t[s]),
                      l = r[(o = n[i + 2])],
                      u = n[i + 3];
                    "boolean" == typeof u
                      ? a.removeEventListener(n[i], l, u)
                      : u >= 0
                      ? r[(o = u)]()
                      : r[(o = -u)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) r[i]();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && le(t[F]) && t[F].destroy();
          const n = t[17];
          if (null !== n && wt(t[3])) {
            n !== t[3] && Mh(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
        }
      }
      function Ah(e, t, n) {
        return (function Sh(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === Rt.None || o === Rt.Emulated) return null;
          }
          return ht(r, n);
        })(e, t.parent, n);
      }
      function Hn(e, t, n, r, o) {
        le(e) ? e.insertBefore(t, n, r, o) : t.insertBefore(n, r, o);
      }
      function xh(e, t, n) {
        le(e) ? e.appendChild(t, n) : t.appendChild(n);
      }
      function Ih(e, t, n, r, o) {
        null !== r ? Hn(e, t, n, r, o) : xh(e, t, n);
      }
      function Ji(e, t) {
        return le(e) ? e.parentNode(t) : t.parentNode;
      }
      let Th = function Ph(e, t, n) {
        return 40 & e.type ? ht(e, n) : null;
      };
      function Xi(e, t, n, r) {
        const o = Ah(e, r, t),
          i = t[F],
          a = (function Oh(e, t, n) {
            return Th(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) Ih(i, o, n[l], a, !1);
          else Ih(i, o, n, a, !1);
      }
      function es(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return ht(t, e);
          if (4 & n) return Ol(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return es(e, r);
            {
              const o = e[t.index];
              return wt(o) ? Ol(-1, o) : ge(o);
            }
          }
          if (32 & n) return wl(t, e)() || ge(e[t.index]);
          {
            const r = Fh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : es(So(e[16]), r)
              : es(e, t.next);
          }
        }
        return null;
      }
      function Fh(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function Ol(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return es(r, o);
        }
        return t[7];
      }
      function Pl(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && Fe(ge(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) Pl(e, t, n.child, r, o, i, !1), Cr(t, e, o, a, i);
            else if (32 & l) {
              const u = wl(n, r);
              let c;
              for (; (c = u()); ) Cr(t, e, o, c, i);
              Cr(t, e, o, a, i);
            } else 16 & l ? kh(e, t, r, n, o, i) : Cr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function xo(e, t, n, r, o, i) {
        Pl(n, r, e.firstChild, t, o, i, !1);
      }
      function kh(e, t, n, r, o, i) {
        const s = n[16],
          l = s[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) Cr(t, e, o, l[u], i);
        else Pl(e, t, l, s[3], o, i, !0);
      }
      function Vh(e, t, n) {
        le(e) ? e.setAttribute(t, "style", n) : (t.style.cssText = n);
      }
      function Tl(e, t, n) {
        le(e)
          ? "" === n
            ? e.removeAttribute(t, "class")
            : e.setAttribute(t, "class", n)
          : (t.className = n);
      }
      function Lh(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const jh = "ng-template";
      function dM(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== Lh(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Bh(e) {
        return 4 === e.type && e.value !== jh;
      }
      function fM(e, t, n) {
        return t === (4 !== e.type || n ? e.value : jh);
      }
      function hM(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function mM(e) {
            for (let t = 0; t < e.length; t++) if (Of(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !fM(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (Mt(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!dM(e.attrs, u, n)) {
                    if (Mt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = pM(8 & r ? "class" : l, o, Bh(e), n);
                if (-1 === d) {
                  if (Mt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Lh(h, u, 0)) || (2 & r && u !== f)) {
                    if (Mt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Mt(r) && !Mt(l)) return !1;
            if (s && Mt(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return Mt(r) || s;
      }
      function Mt(e) {
        return 0 == (1 & e);
      }
      function pM(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function yM(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Hh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (hM(e, t[r], n)) return !0;
        return !1;
      }
      function Uh(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function _M(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Mt(s) && ((t += Uh(i, o)), (o = "")),
              (r = s),
              (i = i || !Mt(r));
          n++;
        }
        return "" !== o && (t += Uh(i, o)), t;
      }
      const T = {};
      function Ht(e) {
        $h(z(), y(), Be() + e, Oi());
      }
      function $h(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && Ri(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && ki(t, i, 0, n);
          }
        vn(n);
      }
      function ts(e, t) {
        return (e << 17) | (t << 2);
      }
      function Et(e) {
        return (e >> 17) & 32767;
      }
      function Nl(e) {
        return 2 | e;
      }
      function on(e) {
        return (131068 & e) >> 2;
      }
      function Fl(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Rl(e) {
        return 1 | e;
      }
      function ep(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Za(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Io(e, t, n, r, o, i, s, a, l, u) {
        const c = t.blueprint.slice();
        return (
          (c[0] = o),
          (c[2] = 140 | r),
          vf(c),
          (c[3] = c[15] = e),
          (c[8] = n),
          (c[10] = s || (e && e[10])),
          (c[F] = a || (e && e[F])),
          (c[12] = l || (e && e[12]) || null),
          (c[9] = u || (e && e[9]) || null),
          (c[6] = i),
          (c[16] = 2 == t.type ? e[16] : c),
          c
        );
      }
      function Dr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Gl(e, t, n, r, o) {
            const i = Cf(),
              s = za(),
              l = (e.data[t] = (function VM(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== i &&
                (s
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && (i.next = l)),
              l
            );
          })(e, t, n, r, o)),
            (function ow() {
              return x.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function ao() {
            const e = x.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Vt(i, !0), i;
      }
      function wr(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Oo(e, t, n) {
        Ti(t);
        try {
          const r = e.viewQuery;
          null !== r && Xl(1, r, n);
          const o = e.template;
          null !== o && tp(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && ep(e, t),
            e.staticViewQueries && Xl(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function FM(e, t) {
              for (let n = 0; n < t.length; n++) t0(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Ni();
        }
      }
      function br(e, t, n, r) {
        const o = t[2];
        if (256 == (256 & o)) return;
        Ti(t);
        const i = Oi();
        try {
          vf(t),
            (function Df(e) {
              return (x.lFrame.bindingIndex = e);
            })(e.bindingStartIndex),
            null !== n && tp(e, t, n, 2, r);
          const s = 3 == (3 & o);
          if (!i)
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && Ri(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && ki(t, u, 0, null), Ya(t, 0);
            }
          if (
            ((function XM(e) {
              for (let t = bl(e); null !== t; t = Ml(t)) {
                if (!t[2]) continue;
                const n = t[9];
                for (let r = 0; r < n.length; r++) {
                  const o = n[r],
                    i = o[3];
                  0 == (1024 & o[2]) && Ga(i, 1), (o[2] |= 1024);
                }
              }
            })(t),
            (function JM(e) {
              for (let t = bl(e); null !== t; t = Ml(t))
                for (let n = 10; n < t.length; n++) {
                  const r = t[n],
                    o = r[1];
                  $a(r) && br(o, r, o.template, r[8]);
                }
            })(t),
            null !== e.contentQueries && ep(e, t),
            !i)
          )
            if (s) {
              const u = e.contentCheckHooks;
              null !== u && Ri(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && ki(t, u, 1), Ya(t, 1);
            }
          !(function TM(e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const o = n[r];
                  if (o < 0) vn(~o);
                  else {
                    const i = o,
                      s = n[++r],
                      a = n[++r];
                    iw(s, i), a(2, t[i]);
                  }
                }
              } finally {
                vn(-1);
              }
          })(e, t);
          const a = e.components;
          null !== a &&
            (function NM(e, t) {
              for (let n = 0; n < t.length; n++) e0(e, t[n]);
            })(t, a);
          const l = e.viewQuery;
          if ((null !== l && Xl(2, l, r), !i))
            if (s) {
              const u = e.viewCheckHooks;
              null !== u && Ri(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && ki(t, u, 2), Ya(t, 2);
            }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            i || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), Ga(t[3], -1));
        } finally {
          Ni();
        }
      }
      function RM(e, t, n, r) {
        const o = t[10],
          i = !Oi(),
          s = (function yf(e) {
            return 4 == (4 & e[2]);
          })(t);
        try {
          i && !s && o.begin && o.begin(), s && Oo(e, t, r), br(e, t, n, r);
        } finally {
          i && !s && o.end && o.end();
        }
      }
      function tp(e, t, n, r, o) {
        const i = Be(),
          s = 2 & r;
        try {
          vn(-1), s && t.length > 20 && $h(e, t, 20, Oi()), n(r, o);
        } finally {
          vn(i);
        }
      }
      function zl(e, t, n) {
        !_f() ||
          ((function GM(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || co(n, t), Fe(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const l = e.data[a],
                u = bt(l);
              u && ZM(t, n, l);
              const c = fo(t, e, a, n);
              Fe(c, t),
                null !== s && YM(0, a - o, c, l, 0, s),
                u && (Xe(n.index, t)[8] = c);
            }
          })(e, t, n, ht(n, t)),
          128 == (128 & n.flags) &&
            (function zM(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                s = n.index,
                a = (function sw() {
                  return x.lFrame.currentDirectiveIndex;
                })();
              try {
                vn(s);
                for (let l = r; l < o; l++) {
                  const u = e.data[l],
                    c = t[l];
                  Wa(l),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      cp(u, c);
                }
              } finally {
                vn(-1), Wa(a);
              }
            })(e, t, n));
      }
      function ql(e, t, n = ht) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function rp(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = os(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function os(e, t, n, r, o, i, s, a, l, u) {
        const c = 20 + r,
          d = c + o,
          f = (function kM(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : T);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function ap(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function Wl(e, t, n, r) {
        let o = !1;
        if (_f()) {
          const i = (function qM(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  Hh(n, s.selectors, !1) &&
                    (o || (o = []),
                    Hi(co(n, t), e, s.type),
                    bt(s) ? (dp(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), fp(n, e.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              u = wr(e, t, i.length, null);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              (n.mergedAttrs = Li(n.mergedAttrs, d.hostAttrs)),
                hp(e, n, t, u, d),
                QM(u, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (l = !0)),
                u++;
            }
            !(function LM(e, t) {
              const r = t.directiveEnd,
                o = e.data,
                i = t.attrs,
                s = [];
              let a = null,
                l = null;
              for (let u = t.directiveStart; u < r; u++) {
                const c = o[u],
                  d = c.inputs,
                  f = null === i || Bh(t) ? null : KM(d, i);
                s.push(f), (a = ap(d, u, a)), (l = ap(c.outputs, u, l));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (t.flags |= 16),
                a.hasOwnProperty("style") && (t.flags |= 32)),
                (t.initialInputs = s),
                (t.inputs = a),
                (t.outputs = l);
            })(e, n);
          }
          s &&
            (function WM(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i) throw new G(-301, !1);
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = Li(n.mergedAttrs, n.attrs)), o;
      }
      function up(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const l = ~t.index;
          (function $M(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, o, s);
        }
      }
      function cp(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function dp(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function QM(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          bt(t) && (n[""] = e);
        }
      }
      function fp(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function hp(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Bn(o.type)),
          s = new lo(i, bt(o), null);
        (e.blueprint[r] = s),
          (n[r] = s),
          up(e, t, 0, r, wr(e, n, o.hostVars, T), o);
      }
      function ZM(e, t, n) {
        const r = ht(t, e),
          o = rp(n),
          i = e[10],
          s = is(
            e,
            Io(
              e,
              o,
              null,
              n.onPush ? 64 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function YM(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const u = s[l++],
              c = s[l++],
              d = s[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function KM(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function pp(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function e0(e, t) {
        const n = Xe(t, e);
        if ($a(n)) {
          const r = n[1];
          80 & n[2] ? br(r, n, r.template, n[8]) : n[5] > 0 && Zl(n);
        }
      }
      function Zl(e) {
        for (let r = bl(e); null !== r; r = Ml(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (1024 & i[2]) {
              const s = i[1];
              br(s, i, s.template, i[8]);
            } else i[5] > 0 && Zl(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Xe(n[r], e);
            $a(o) && o[5] > 0 && Zl(o);
          }
      }
      function t0(e, t) {
        const n = Xe(t, e),
          r = n[1];
        (function n0(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Oo(r, n, n[8]);
      }
      function is(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Yl(e) {
        for (; e; ) {
          e[2] |= 64;
          const t = So(e);
          if (kD(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Jl(e, t, n) {
        const r = t[10];
        r.begin && r.begin();
        try {
          br(e, t, e.template, n);
        } catch (o) {
          throw (_p(t, o), o);
        } finally {
          r.end && r.end();
        }
      }
      function gp(e) {
        !(function Kl(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = vl(n),
              o = r[1];
            RM(o, r, o.template, n);
          }
        })(e[8]);
      }
      function Xl(e, t, n) {
        Za(0), t(e, n);
      }
      const a0 = (() => Promise.resolve(null))();
      function mp(e) {
        return e[7] || (e[7] = []);
      }
      function yp(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function _p(e, t) {
        const n = e[9],
          r = n ? n.get(Ao, null) : null;
        r && r.handleError(t);
      }
      function Cp(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            l = t[s],
            u = e.data[s];
          null !== u.setInput ? u.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function sn(e, t, n) {
        const r = xi(t, e);
        !(function bh(e, t, n) {
          le(e) ? e.setValue(t, n) : (t.textContent = n);
        })(e[F], r, n);
      }
      function ss(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Aa(o, a))
              : 2 == i && (r = Aa(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      const eu = new j("INJECTOR", -1);
      class Dp {
        get(t, n = yo) {
          if (n === yo) {
            const r = new Error(`NullInjectorError: No provider for ${W(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const tu = new j("Set Injector scope."),
        Po = {},
        c0 = {};
      let nu;
      function wp() {
        return void 0 === nu && (nu = new Dp()), nu;
      }
      function bp(e, t = null, n = null, r) {
        const o = Mp(e, t, n, r);
        return o._resolveInjectorDefTypes(), o;
      }
      function Mp(e, t = null, n = null, r) {
        return new d0(e, n, t || wp(), r);
      }
      class d0 {
        constructor(t, n, r, o = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const i = [];
          n && Lt(n, (a) => this.processProvider(a, t, n)),
            Lt([t], (a) => this.processInjectorType(a, [], i)),
            this.records.set(eu, Mr(void 0, this));
          const s = this.records.get(tu);
          (this.scope = null != s ? s.value : null),
            (this.source = o || ("object" == typeof t ? null : W(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, n = yo, r = O.Default) {
          this.assertNotDestroyed();
          const o = Qf(this),
            i = pn(void 0);
          try {
            if (!(r & O.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function _0(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof j)
                    );
                  })(t) && xa(t);
                (a = l && this.injectableDefInScope(l) ? Mr(ru(t), Po) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & O.Self ? wp() : this.parent).get(
              t,
              (n = r & O.Optional && n === yo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[zi] = s[zi] || []).unshift(W(t)), o)) throw s;
              return (function zw(e, t, n, r) {
                const o = e[zi];
                throw (
                  (t[Wf] && o.unshift(t[Wf]),
                  (e.message = (function qw(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.substr(2)
                        : e;
                    let o = W(t);
                    if (Array.isArray(t)) o = t.map(W).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : W(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      jw,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[zi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            pn(i), Qf(o);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((r, o) => t.push(W(o))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new G(205, !1);
        }
        processInjectorType(t, n, r) {
          if (!(t = N(t))) return !1;
          let o = rf(t);
          const i = (null == o && t.ngModule) || void 0,
            s = void 0 === i ? t : i,
            a = -1 !== r.indexOf(s);
          if ((void 0 !== i && (o = rf(i)), null == o)) return !1;
          if (null != o.imports && !a) {
            let c;
            r.push(s);
            try {
              Lt(o.imports, (d) => {
                this.processInjectorType(d, n, r) &&
                  (void 0 === c && (c = []), c.push(d));
              });
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d];
                Lt(h, (p) => this.processProvider(p, f, h || Y));
              }
          }
          this.injectorDefTypes.add(s);
          const l = Bn(s) || (() => new s());
          this.records.set(s, Mr(l, Po));
          const u = o.providers;
          if (null != u && !a) {
            const c = t;
            Lt(u, (d) => this.processProvider(d, c, u));
          }
          return void 0 !== i && void 0 !== t.providers;
        }
        processProvider(t, n, r) {
          let o = Er((t = N(t))) ? t : N(t && t.provide);
          const i = (function h0(e, t, n) {
            return Ap(e) ? Mr(void 0, e.useValue) : Mr(Ep(e), Po);
          })(t);
          if (Er(t) || !0 !== t.multi) this.records.get(o);
          else {
            let s = this.records.get(o);
            s ||
              ((s = Mr(void 0, Po, !0)),
              (s.factory = () => ll(s.multi)),
              this.records.set(o, s)),
              (o = t),
              s.multi.push(t);
          }
          this.records.set(o, i);
        }
        hydrate(t, n) {
          return (
            n.value === Po && ((n.value = c0), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function v0(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = N(t.providedIn);
          return "string" == typeof n
            ? "any" === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function ru(e) {
        const t = xa(e),
          n = null !== t ? t.factory : Bn(e);
        if (null !== n) return n;
        if (e instanceof j) throw new G(204, !1);
        if (e instanceof Function)
          return (function f0(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function mo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new G(204, !1))
              );
            const n = (function bD(e) {
              const t = e && (e[Di] || e[of]);
              if (t) {
                const n = (function MD(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new G(204, !1);
      }
      function Ep(e, t, n) {
        let r;
        if (Er(e)) {
          const o = N(e);
          return Bn(o) || ru(o);
        }
        if (Ap(e)) r = () => N(e.useValue);
        else if (
          (function g0(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...ll(e.deps || []));
        else if (
          (function p0(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => E(N(e.useExisting));
        else {
          const o = N(e && (e.useClass || e.provide));
          if (
            !(function y0(e) {
              return !!e.deps;
            })(e)
          )
            return Bn(o) || ru(o);
          r = () => new o(...ll(e.deps));
        }
        return r;
      }
      function Mr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Ap(e) {
        return null !== e && "object" == typeof e && Hw in e;
      }
      function Er(e) {
        return "function" == typeof e;
      }
      let Ue = (() => {
        class e {
          static create(n, r) {
            var o;
            if (Array.isArray(n)) return bp({ name: "" }, r, n, "");
            {
              const i = null !== (o = n.name) && void 0 !== o ? o : "";
              return bp({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = yo),
          (e.NULL = new Dp()),
          (e.ɵprov = U({ token: e, providedIn: "any", factory: () => E(eu) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function S0(e, t) {
        Fi(vl(e)[1], Ce());
      }
      function q(e) {
        let t = (function Lp(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (bt(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new G(903, "");
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = su(e.inputs)),
                (s.declaredInputs = su(e.declaredInputs)),
                (s.outputs = su(e.outputs));
              const a = o.hostBindings;
              a && P0(e, a);
              const l = o.viewQuery,
                u = o.contentQueries;
              if (
                (l && I0(e, l),
                u && O0(e, u),
                Ea(e.inputs, o.inputs),
                Ea(e.declaredInputs, o.declaredInputs),
                Ea(e.outputs, o.outputs),
                bt(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === q && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function x0(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = Li(o.hostAttrs, (n = Li(n, o.hostAttrs))));
          }
        })(r);
      }
      function su(e) {
        return e === nr ? {} : e === Y ? [] : e;
      }
      function I0(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function O0(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function P0(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      let as = null;
      function Ar() {
        if (!as) {
          const e = Q.Symbol;
          if (e && e.iterator) as = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (as = r);
            }
          }
        }
        return as;
      }
      function To(e) {
        return (
          !!au(e) && (Array.isArray(e) || (!(e instanceof Map) && Ar() in e))
        );
      }
      function au(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Re(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function us(e, t, n, r, o, i, s, a) {
        const l = y(),
          u = z(),
          c = e + 20,
          d = u.firstCreatePass
            ? (function L0(e, t, n, r, o, i, s, a, l) {
                const u = t.consts,
                  c = Dr(t, e, 4, s || null, yn(u, a));
                Wl(t, n, c, yn(u, l)), Fi(t, c);
                const d = (c.tViews = os(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, o, i, s)
            : u.data[c];
        Vt(d, !1);
        const f = l[F].createComment("");
        Xi(u, l, f, d),
          Fe(f, l),
          is(l, (l[c] = pp(f, l, f, d))),
          Si(d) && zl(u, l, d),
          null != s && ql(l, d, a);
      }
      function _(e, t = O.Default) {
        const n = y();
        return null === n ? E(e, t) : Vf(Ce(), n, N(e), t);
      }
      function fu() {
        throw new Error("invalid");
      }
      function $n(e, t, n) {
        const r = y();
        return (
          Re(r, lr(), t) &&
            (function nt(e, t, n, r, o, i, s, a) {
              const l = ht(t, n);
              let c,
                u = t.inputs;
              !a && null != u && (c = u[r])
                ? (Cp(e, n, c, r, o),
                  Ai(t) &&
                    (function BM(e, t) {
                      const n = Xe(t, e);
                      16 & n[2] || (n[2] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function jM(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  le(i)
                    ? i.setProperty(l, r, o)
                    : Ja(r) ||
                      (l.setProperty ? l.setProperty(r, o) : (l[r] = o)));
            })(
              z(),
              (function ue() {
                const e = x.lFrame;
                return Ua(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[F],
              n,
              !1
            ),
          $n
        );
      }
      function hu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Cp(e, n, t.inputs[s], s, r);
      }
      function oe(e, t, n, r) {
        const o = y(),
          i = z(),
          s = 20 + e,
          a = o[F],
          l = (o[s] = Al(
            a,
            t,
            (function pw() {
              return x.lFrame.currentNamespace;
            })()
          )),
          u = i.firstCreatePass
            ? (function iE(e, t, n, r, o, i, s) {
                const a = t.consts,
                  u = Dr(t, e, 2, o, yn(a, i));
                return (
                  Wl(t, n, u, yn(a, s)),
                  null !== u.attrs && ss(u, u.attrs, !1),
                  null !== u.mergedAttrs && ss(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        Vt(u, !0);
        const c = u.mergedAttrs;
        null !== c && Vi(a, l, c);
        const d = u.classes;
        null !== d && Tl(a, l, d);
        const f = u.styles;
        return (
          null !== f && Vh(a, l, f),
          64 != (64 & u.flags) && Xi(i, o, l, u),
          0 ===
            (function JD() {
              return x.lFrame.elementDepthCount;
            })() && Fe(l, o),
          (function XD() {
            x.lFrame.elementDepthCount++;
          })(),
          Si(u) &&
            (zl(i, o, u),
            (function np(e, t, n) {
              if (Ra(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i];
                  s.contentQueries && s.contentQueries(1, n[i], i);
                }
              }
            })(i, u, o)),
          null !== r && ql(o, u),
          oe
        );
      }
      function ce() {
        let e = Ce();
        za()
          ? (function qa() {
              x.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Vt(e, !1));
        const t = e;
        !(function ew() {
          x.lFrame.elementDepthCount--;
        })();
        const n = z();
        return (
          n.firstCreatePass && (Fi(n, e), Ra(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function _w(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            hu(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function Cw(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            hu(n, t, y(), t.stylesWithoutHost, !1),
          ce
        );
      }
      function Vr(e, t, n, r) {
        return oe(e, t, n, r), ce(), Vr;
      }
      function Fo(e) {
        return !!e && "function" == typeof e.then;
      }
      const mu = function ag(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function ye(e, t, n, r) {
        const o = y(),
          i = z(),
          s = Ce();
        return (
          (function ug(e, t, n, r, o, i, s, a) {
            const l = Si(r),
              c = e.firstCreatePass && yp(e),
              d = t[8],
              f = mp(t);
            let h = !0;
            if (3 & r.type || a) {
              const v = ht(r, t),
                C = a ? a(v) : v,
                g = f.length,
                b = a ? (I) => a(ge(I[r.index])) : r.index;
              if (le(n)) {
                let I = null;
                if (
                  (!a &&
                    l &&
                    (I = (function aE(e, t, n, r) {
                      const o = e.cleanup;
                      if (null != o)
                        for (let i = 0; i < o.length - 1; i += 2) {
                          const s = o[i];
                          if (s === n && o[i + 1] === r) {
                            const a = t[7],
                              l = o[i + 2];
                            return a.length > l ? a[l] : null;
                          }
                          "string" == typeof s && (i += 2);
                        }
                      return null;
                    })(e, t, o, r.index)),
                  null !== I)
                )
                  ((I.__ngLastListenerFn__ || I).__ngNextListenerFn__ = i),
                    (I.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = yu(r, t, d, i, !1);
                  const $ = n.listen(C, o, i);
                  f.push(i, $), c && c.push(o, b, g, g + 1);
                }
              } else
                (i = yu(r, t, d, i, !0)),
                  C.addEventListener(o, i, s),
                  f.push(i),
                  c && c.push(o, b, g, s);
            } else i = yu(r, t, d, i, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[o])) {
              const v = m.length;
              if (v)
                for (let C = 0; C < v; C += 2) {
                  const st = t[m[C]][m[C + 1]].subscribe(i),
                    tr = f.length;
                  f.push(i, st), c && c.push(o, r.index, tr, -(tr + 1));
                }
            }
          })(i, o, o[F], s, e, t, !!n, r),
          ye
        );
      }
      function cg(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return _p(e, o), !1;
        }
      }
      function yu(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          const a = 2 & e.flags ? Xe(e.index, t) : t;
          0 == (32 & t[2]) && Yl(a);
          let l = cg(t, 0, r, s),
            u = i.__ngNextListenerFn__;
          for (; u; ) (l = cg(t, 0, u, s) && l), (u = u.__ngNextListenerFn__);
          return o && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function Gn(e = 1) {
        return (function lw(e) {
          return (x.lFrame.contextLView = (function uw(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, x.lFrame.contextLView))[8];
        })(e);
      }
      function Cg(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? Et(i) : on(i),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const c = e[a + 1];
          hE(e[a], t) && ((l = !0), (e[a + 1] = r ? Rl(c) : Nl(c))),
            (a = r ? Et(c) : on(c));
        }
        l && (e[n + 1] = r ? Nl(i) : Rl(i));
      }
      function hE(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && mr(e, t) >= 0)
        );
      }
      function ds(e, t) {
        return (
          (function St(e, t, n, r) {
            const o = y(),
              i = z(),
              s = (function rn(e) {
                const t = x.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function Ig(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[Be()],
                    s = (function xg(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function Ng(e, t) {
                    return 0 != (e.flags & (t ? 16 : 32));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function wE(e, t, n, r) {
                      const o = (function Qa(e) {
                        const t = x.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Ro((n = _u(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = _u(o, e, t, n, r)), null === i)) {
                            let l = (function bE(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== on(r)) return e[Et(r)];
                            })(e, t, r);
                            void 0 !== l &&
                              Array.isArray(l) &&
                              ((l = _u(null, e, t, l[1], r)),
                              (l = Ro(l, t.attrs, r)),
                              (function ME(e, t, n, r) {
                                e[Et(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, l));
                          } else
                            i = (function EE(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Ro(r, e[i].hostAttrs, n);
                              return Ro(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function dE(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = Et(s),
                        l = on(s);
                      e[r] = n;
                      let c,
                        u = !1;
                      if (Array.isArray(n)) {
                        const d = n;
                        (c = d[1]), (null === c || mr(d, c) > 0) && (u = !0);
                      } else c = n;
                      if (o)
                        if (0 !== l) {
                          const f = Et(e[a + 1]);
                          (e[r + 1] = ts(f, a)),
                            0 !== f && (e[f + 1] = Fl(e[f + 1], r)),
                            (e[a + 1] = (function wM(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = ts(a, 0)),
                            0 !== a && (e[a + 1] = Fl(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = ts(l, 0)),
                          0 === a ? (a = r) : (e[l + 1] = Fl(e[l + 1], r)),
                          (l = r);
                      u && (e[r + 1] = Nl(e[r + 1])),
                        Cg(e, c, r, !0),
                        Cg(e, c, r, !1),
                        (function fE(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            mr(i, t) >= 0 &&
                            (n[r + 1] = Rl(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = ts(a, l)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== T &&
                Re(o, s, t) &&
                (function Pg(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const l = e.data,
                    u = l[a + 1];
                  fs(
                    (function qh(e) {
                      return 1 == (1 & e);
                    })(u)
                      ? Tg(l, t, n, o, on(u), s)
                      : void 0
                  ) ||
                    (fs(i) ||
                      ((function zh(e) {
                        return 2 == (2 & e);
                      })(u) &&
                        (i = Tg(l, null, n, o, a, s))),
                    (function cM(e, t, n, r, o) {
                      const i = le(e);
                      if (t)
                        o
                          ? i
                            ? e.addClass(n, r)
                            : n.classList.add(r)
                          : i
                          ? e.removeClass(n, r)
                          : n.classList.remove(r);
                      else {
                        let s = -1 === r.indexOf("-") ? void 0 : tt.DashCase;
                        if (null == o)
                          i
                            ? e.removeStyle(n, r, s)
                            : n.style.removeProperty(r);
                        else {
                          const a =
                            "string" == typeof o && o.endsWith("!important");
                          a && ((o = o.slice(0, -10)), (s |= tt.Important)),
                            i
                              ? e.setStyle(n, r, o, s)
                              : n.style.setProperty(r, o, a ? "important" : "");
                        }
                      }
                    })(r, s, xi(Be(), n), o, i));
                })(
                  i,
                  i.data[Be()],
                  o,
                  o[F],
                  e,
                  (o[s + 1] = (function xE(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e &&
                            (e = W(
                              (function Dn(e) {
                                return e instanceof
                                  class rh {
                                    constructor(t) {
                                      this.changingThisBreaksApplicationSecurity =
                                        t;
                                    }
                                    toString() {
                                      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
                                    }
                                  }
                                  ? e.changingThisBreaksApplicationSecurity
                                  : e;
                              })(e)
                            ))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          ds
        );
      }
      function _u(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Ro(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Ro(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                et(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function Tg(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const l = e[o],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[o + 1];
          f === T && (f = d ? Y : void 0);
          let h = d ? il(f, r) : c === r ? f : void 0;
          if ((u && !fs(h) && (h = il(l, r)), fs(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? Et(p) : on(p);
        }
        if (null !== t) {
          let l = i ? t.residualClasses : t.residualStyles;
          null != l && (a = il(l, r));
        }
        return a;
      }
      function fs(e) {
        return void 0 !== e;
      }
      function $e(e, t = "") {
        const n = y(),
          r = z(),
          o = e + 20,
          i = r.firstCreatePass ? Dr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function El(e, t) {
            return le(e) ? e.createText(t) : e.createTextNode(t);
          })(n[F], t));
        Xi(r, n, s, i), Vt(i, !1);
      }
      function Cu(e) {
        return jr("", e, ""), Cu;
      }
      function jr(e, t, n) {
        const r = y(),
          o = (function xr(e, t, n, r) {
            return Re(e, lr(), n) ? t + P(n) + r : T;
          })(r, e, t, n);
        return o !== T && sn(r, Be(), o), jr;
      }
      const hs = "en-US";
      let tm = hs;
      function bu(e, t, n, r, o) {
        if (((e = N(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) bu(e[i], t, n, r, o);
        else {
          const i = z(),
            s = y();
          let a = Er(e) ? e : N(e.provide),
            l = Ep(e);
          const u = Ce(),
            c = 1048575 & u.providerIndexes,
            d = u.directiveStart,
            f = u.providerIndexes >> 20;
          if (Er(e) || !e.multi) {
            const h = new lo(l, o, _),
              p = Eu(a, t, o ? c : c + f, d);
            -1 === p
              ? (Hi(co(u, s), i, a),
                Mu(i, e, t.length),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = Eu(a, t, c + f, d),
              p = Eu(a, t, c, c + f),
              m = h >= 0 && n[h],
              v = p >= 0 && n[p];
            if ((o && !v) || (!o && !m)) {
              Hi(co(u, s), i, a);
              const C = (function WA(e, t, n, r, o) {
                const i = new lo(e, n, _);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Em(i, o, r && !n),
                  i
                );
              })(o ? qA : zA, n.length, o, r, l);
              !o && v && (n[p].providerFactory = C),
                Mu(i, e, t.length, 0),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(C),
                s.push(C);
            } else Mu(i, e, h > -1 ? h : p, Em(n[o ? p : h], l, !o && r));
            !o && r && v && n[p].componentProviders++;
          }
        }
      }
      function Mu(e, t, n, r) {
        const o = Er(t),
          i = (function m0(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const l = (i ? N(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const u = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = u.indexOf(n);
              -1 === c ? u.push(n, [r, l]) : u[c + 1].push(r, l);
            } else u.push(n, l);
          }
        }
      }
      function Em(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Eu(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function zA(e, t, n, r) {
        return Au(this.multi, []);
      }
      function qA(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = fo(n, n[1], this.providerFactory.index, r);
          (i = a.slice(0, s)), Au(o, i);
          for (let l = s; l < a.length; l++) i.push(a[l]);
        } else (i = []), Au(o, i);
        return i;
      }
      function Au(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function ie(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function GA(e, t, n) {
              const r = z();
              if (r.firstCreatePass) {
                const o = bt(e);
                bu(n, r.data, r.blueprint, o, !0),
                  bu(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class Am {}
      class YA {
        resolveComponentFactory(t) {
          throw (function ZA(e) {
            const t = Error(
              `No component factory found for ${W(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Bo = (() => {
        class e {}
        return (e.NULL = new YA()), e;
      })();
      function KA() {
        return Ur(Ce(), y());
      }
      function Ur(e, t) {
        return new rt(ht(e, t));
      }
      let rt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = KA), e;
      })();
      class xm {}
      let an = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function eS() {
                const e = y(),
                  n = Xe(Ce().index, e);
                return (function XA(e) {
                  return e[F];
                })(kt(n) ? n : e);
              })()),
            e
          );
        })(),
        tS = (() => {
          class e {}
          return (
            (e.ɵprov = U({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Ho {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const nS = new Ho("13.2.5"),
        Su = {};
      function vs(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(ge(i)), wt(i)))
            for (let a = 10; a < i.length; a++) {
              const l = i[a],
                u = l[1].firstChild;
              null !== u && vs(l[1], l, u, r);
            }
          const s = n.type;
          if (8 & s) vs(e, t, n.child, r);
          else if (32 & s) {
            const a = wl(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = Fh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = So(t[16]);
              vs(l[1], l, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Uo {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return vs(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (wt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Sl(t, r), $i(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Eh(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function sp(e, t, n, r) {
            const o = mp(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && yp(e).push(r, o.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Yl(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Jl(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function o0(e, t, n) {
            Pi(!0);
            try {
              Jl(e, t, n);
            } finally {
              Pi(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new G(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function eM(e, t) {
              xo(e, t, t[F], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new G(902, "");
          this._appRef = t;
        }
      }
      class rS extends Uo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          gp(this._view);
        }
        checkNoChanges() {
          !(function s0(e) {
            Pi(!0);
            try {
              gp(e);
            } finally {
              Pi(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      class Im extends Bo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = Pe(t);
          return new xu(n, this.ngModule);
        }
      }
      function Om(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class xu extends Am {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function CM(e) {
              return e.map(_M).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return Om(this.componentDef.inputs);
        }
        get outputs() {
          return Om(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          const i = (o = o || this.ngModule)
              ? (function iS(e, t) {
                  return {
                    get: (n, r, o) => {
                      const i = e.get(n, Su, o);
                      return i !== Su || r === Su ? i : t.get(n, r, o);
                    },
                  };
                })(t, o.injector)
              : t,
            s = i.get(xm, mf),
            a = i.get(tS, null),
            l = s.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            c = r
              ? (function ip(e, t, n) {
                  if (le(e)) return e.selectRootElement(t, n === Rt.ShadowDom);
                  let r = "string" == typeof t ? e.querySelector(t) : t;
                  return (r.textContent = ""), r;
                })(l, r, this.componentDef.encapsulation)
              : Al(
                  s.createRenderer(null, this.componentDef),
                  u,
                  (function oS(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(u)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function Vp(e, t) {
              return {
                components: [],
                scheduler: e || qb,
                clean: a0,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            h = os(0, null, null, 1, 0, null, null, null, null, null),
            p = Io(null, h, f, d, null, null, s, l, a, i);
          let m, v;
          Ti(p);
          try {
            const C = (function Rp(e, t, n, r, o, i) {
              const s = n[1];
              n[20] = e;
              const l = Dr(s, 20, 2, "#host", null),
                u = (l.mergedAttrs = t.hostAttrs);
              null !== u &&
                (ss(l, u, !0),
                null !== e &&
                  (Vi(o, e, u),
                  null !== l.classes && Tl(o, e, l.classes),
                  null !== l.styles && Vh(o, e, l.styles)));
              const c = r.createRenderer(e, t),
                d = Io(
                  n,
                  rp(t),
                  null,
                  t.onPush ? 64 : 16,
                  n[20],
                  l,
                  r,
                  c,
                  i || null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (Hi(co(l, n), s, t.type), dp(s, l), fp(l, n.length, 1)),
                is(n, d),
                (n[20] = d)
              );
            })(c, this.componentDef, p, s, l);
            if (c)
              if (r) Vi(l, c, ["ng-version", nS.full]);
              else {
                const { attrs: g, classes: b } = (function DM(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!Mt(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                g && Vi(l, c, g), b && b.length > 0 && Tl(l, c, b.join(" "));
              }
            if (((v = Ua(h, 20)), void 0 !== n)) {
              const g = (v.projection = []);
              for (let b = 0; b < this.ngContentSelectors.length; b++) {
                const I = n[b];
                g.push(null != I ? Array.from(I) : null);
              }
            }
            (m = (function kp(e, t, n, r, o) {
              const i = n[1],
                s = (function UM(e, t, n) {
                  const r = Ce();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    hp(e, r, t, wr(e, t, 1, null), n));
                  const o = fo(t, e, r.directiveStart, r);
                  Fe(o, t);
                  const i = ht(r, t);
                  return i && Fe(i, t), o;
                })(i, n, t);
              if (
                (r.components.push(s),
                (e[8] = s),
                o && o.forEach((l) => l(s, t)),
                t.contentQueries)
              ) {
                const l = Ce();
                t.contentQueries(1, s, l.directiveStart);
              }
              const a = Ce();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (vn(a.index),
                  up(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  cp(t, s)),
                s
              );
            })(C, this.componentDef, p, f, [S0])),
              Oo(h, p, null);
          } finally {
            Ni();
          }
          return new aS(this.componentType, m, Ur(v, p), p, v);
        }
      }
      class aS extends class QA {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new rS(o)),
            (this.componentType = t);
        }
        get injector() {
          return new dr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      class ln {}
      class Pm {}
      const $r = new Map();
      class Fm extends ln {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Im(this));
          const r = ut(t);
          (this._bootstrapComponents = Bt(r.bootstrap)),
            (this._r3Injector = Mp(
              t,
              n,
              [
                { provide: ln, useValue: this },
                { provide: Bo, useValue: this.componentFactoryResolver },
              ],
              W(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, n = Ue.THROW_IF_NOT_FOUND, r = O.Default) {
          return t === Ue || t === ln || t === eu
            ? this
            : this._r3Injector.get(t, n, r);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Iu extends Pm {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== ut(t) &&
              (function uS(e) {
                const t = new Set();
                !(function n(r) {
                  const o = ut(r, !0),
                    i = o.id;
                  null !== i &&
                    ((function Tm(e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${W(
                            t
                          )} vs ${W(t.name)}`
                        );
                    })(i, $r.get(i), r),
                    $r.set(i, r));
                  const s = Bt(o.imports);
                  for (const a of s) t.has(a) || (t.add(a), n(a));
                })(e);
              })(t);
        }
        create(t) {
          return new Fm(this.moduleType, t);
        }
      }
      function Rm(e, t, n, r, o, i) {
        const s = t + n;
        return Re(e, s, o)
          ? (function $t(e, t, n) {
              return (e[t] = n);
            })(e, s + 1, i ? r.call(i, o) : r(o))
          : (function $o(e, t) {
              const n = e[t];
              return n === T ? void 0 : n;
            })(e, s + 1);
      }
      function Hm(e, t, n) {
        const r = e + 20,
          o = y(),
          i = ar(o, r);
        return (function Go(e, t) {
          return e[1].data[t].pure;
        })(o, r)
          ? Rm(
              o,
              (function je() {
                const e = x.lFrame;
                let t = e.bindingRootIndex;
                return (
                  -1 === t &&
                    (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                  t
                );
              })(),
              t,
              i.transform,
              n,
              i
            )
          : i.transform(n);
      }
      function Ou(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const se = class ES extends Kt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          var o, i, s;
          let a = t,
            l = n || (() => null),
            u = r;
          if (t && "object" == typeof t) {
            const d = t;
            (a = null === (o = d.next) || void 0 === o ? void 0 : o.bind(d)),
              (l = null === (i = d.error) || void 0 === i ? void 0 : i.bind(d)),
              (u =
                null === (s = d.complete) || void 0 === s ? void 0 : s.bind(d));
          }
          this.__isAsync && ((l = Ou(l)), a && (a = Ou(a)), u && (u = Ou(u)));
          const c = super.subscribe({ next: a, error: l, complete: u });
          return t instanceof at && t.add(c), c;
        }
      };
      Symbol;
      let un = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = IS), e;
      })();
      const SS = un,
        xS = class extends SS {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t) {
            const n = this._declarationTContainer.tViews,
              r = Io(
                this._declarationLView,
                n,
                t,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const i = this._declarationLView[19];
            return (
              null !== i && (r[19] = i.createEmbeddedView(n)),
              Oo(n, r, t),
              new Uo(r)
            );
          }
        };
      function IS() {
        return _s(Ce(), y());
      }
      function _s(e, t) {
        return 4 & e.type ? new xS(t, e, Ur(e, t)) : null;
      }
      let It = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = OS), e;
      })();
      function OS() {
        return (function Gm(e, t) {
          let n;
          const r = t[e.index];
          if (wt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = ge(r);
            else {
              const i = t[F];
              o = i.createComment("");
              const s = ht(e, t);
              Hn(
                i,
                Ji(i, s),
                o,
                (function aM(e, t) {
                  return le(e) ? e.nextSibling(t) : t.nextSibling;
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = pp(r, t, o, e)), is(t, n);
          }
          return new Um(n, e, t);
        })(Ce(), y());
      }
      const PS = It,
        Um = class extends PS {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Ur(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new dr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Bi(this._hostTNode, this._hostLView);
            if (Tf(t)) {
              const n = cr(t, this._hostLView),
                r = ur(t);
              return new dr(n[1].data[r + 8], n);
            }
            return new dr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = $m(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            const o = t.createEmbeddedView(n || {});
            return this.insert(o, r), o;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function go(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.ngModuleRef);
            }
            const l = s ? t : new xu(Pe(t)),
              u = r || this.parentInjector;
            if (!i && null == l.ngModule) {
              const f = (s ? u : this.parentInjector).get(ln, null);
              f && (i = f);
            }
            const c = l.create(u, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function KD(e) {
                return wt(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new Um(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function nM(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), Uf(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function rM(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 128);
            })(o, r, s, i);
            const a = Ol(i, s),
              l = r[F],
              u = Ji(l, s[7]);
            return (
              null !== u &&
                (function Xb(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), xo(e, r, n, 1, o, i);
                })(o, s[6], l, r, u, a),
              t.attachToViewContainerRef(),
              Uf(Tu(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = $m(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Sl(this._lContainer, n);
            r && ($i(Tu(this._lContainer), n), Eh(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Sl(this._lContainer, n);
            return r && null != $i(Tu(this._lContainer), n) ? new Uo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return null == t ? this.length + n : t;
          }
        };
      function $m(e) {
        return e[8];
      }
      function Tu(e) {
        return e[8] || (e[8] = []);
      }
      function Ym(e, t) {
        return _s(e, t);
      }
      function ws(...e) {}
      const qu = new j("Application Initializer");
      let Wu = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = ws),
              (this.reject = ws),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Fo(i)) n.push(i);
                else if (mu(i)) {
                  const s = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(qu, 8));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const qo = new j("AppId", {
        providedIn: "root",
        factory: function hy() {
          return `${Qu()}${Qu()}${Qu()}`;
        },
      });
      function Qu() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const py = new j("Platform Initializer"),
        Zu = new j("Platform ID"),
        gy = new j("appBootstrapListener");
      let my = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Mn = new j("LocaleId", {
        providedIn: "root",
        factory: () =>
          $w(Mn, O.Optional | O.SkipSelf) ||
          (function rx() {
            return ("undefined" != typeof $localize && $localize.locale) || hs;
          })(),
      });
      class ix {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let yy = (() => {
        class e {
          compileModuleSync(n) {
            return new Iu(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Bt(ut(n).declarations).reduce((s, a) => {
                const l = Pe(a);
                return l && s.push(new xu(l)), s;
              }, []);
            return new ix(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ax = (() => Promise.resolve(0))();
      function Yu(e) {
        "undefined" == typeof Zone
          ? ax.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Ie {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new se(!1)),
            (this.onMicrotaskEmpty = new se(!1)),
            (this.onStable = new se(!1)),
            (this.onError = new se(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function lx() {
              let e = Q.requestAnimationFrame,
                t = Q.cancelAnimationFrame;
              if ("undefined" != typeof Zone && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function dx(e) {
              const t = () => {
                !(function cx(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Q, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Ju(e),
                                (e.isCheckStableRunning = !0),
                                Ku(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Ju(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return vy(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      _y(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, l) => {
                  try {
                    return vy(e), n.invoke(o, i, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), _y(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Ju(e),
                          Ku(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return (
            "undefined" != typeof Zone &&
            !0 === Zone.current.get("isAngularZone")
          );
        }
        static assertInAngularZone() {
          if (!Ie.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Ie.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, ux, ws, ws);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const ux = {};
      function Ku(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ju(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function vy(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function _y(e) {
        e._nesting--, Ku(e);
      }
      class fx {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new se()),
            (this.onMicrotaskEmpty = new se()),
            (this.onStable = new se()),
            (this.onError = new se());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      let Xu = (() => {
          class e {
            constructor(n) {
              (this._ngZone = n),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ie.assertNotInAngularZone(),
                        Yu(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Yu(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(E(Ie));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Cy = (() => {
          class e {
            constructor() {
              (this._applications = new Map()), ec.addToWindow(this);
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return ec.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      class hx {
        addToWindow(t) {}
        findTestabilityInTree(t, n, r) {
          return null;
        }
      }
      let Ot,
        ec = new hx();
      const Dy = new j("AllowMultipleToken");
      class wy {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function by(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new j(r);
        return (i = []) => {
          let s = My();
          if (!s || s.injector.get(Dy, !1))
            if (e) e(n.concat(i).concat({ provide: o, useValue: !0 }));
            else {
              const a = n
                .concat(i)
                .concat(
                  { provide: o, useValue: !0 },
                  { provide: tu, useValue: "platform" }
                );
              !(function yx(e) {
                if (Ot && !Ot.destroyed && !Ot.injector.get(Dy, !1))
                  throw new G(400, "");
                Ot = e.get(Ey);
                const t = e.get(py, null);
                t && t.forEach((n) => n());
              })(Ue.create({ providers: a, name: r }));
            }
          return (function vx(e) {
            const t = My();
            if (!t) throw new G(401, "");
            return t;
          })();
        };
      }
      function My() {
        return Ot && !Ot.destroyed ? Ot : null;
      }
      let Ey = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function _x(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new fx()
                      : ("zone.js" === e ? void 0 : e) ||
                        new Ie({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              l = [{ provide: Ie, useValue: a }];
            return a.run(() => {
              const u = Ue.create({
                  providers: l,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(u),
                d = c.injector.get(Ao, null);
              if (!d) throw new G(402, "");
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    nc(this._modules, c), f.unsubscribe();
                  });
                }),
                (function Cx(e, t, n) {
                  try {
                    const r = n();
                    return Fo(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(d, a, () => {
                  const f = c.injector.get(Wu);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function XE(e) {
                          Ye(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (tm = e.toLowerCase().replace(/_/g, "-"));
                        })(c.injector.get(Mn, hs) || hs),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Ay({}, r);
            return (function gx(e, t, n) {
              const r = new Iu(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(tc);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new G(403, "");
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new G(404, "");
            this._modules.slice().forEach((n) => n.destroy()),
              this._destroyListeners.forEach((n) => n()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(Ue));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Ay(e, t) {
        return Array.isArray(t)
          ? t.reduce(Ay, e)
          : Object.assign(Object.assign({}, e), t);
      }
      let tc = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._componentFactoryResolver = i),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const a = new pe((u) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    u.next(this._stable), u.complete();
                  });
              }),
              l = new pe((u) => {
                let c;
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    Ie.assertNotInAngularZone(),
                      Yu(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), u.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  Ie.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        u.next(!1);
                      }));
                });
                return () => {
                  c.unsubscribe(), d.unsubscribe();
                };
              });
            this.isStable = (function mD(...e) {
              const t = no(e),
                n = (function uD(e, t) {
                  return "number" == typeof ba(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? Ft(r[0])
                  : to(n)(Ae(r, t))
                : Xt;
            })(
              a,
              l.pipe(
                (function yD(e = {}) {
                  const {
                    connector: t = () => new Kt(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s = null,
                      a = null,
                      l = null,
                      u = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        null == a || a.unsubscribe(), (a = null);
                      },
                      h = () => {
                        f(), (s = l = null), (c = d = !1);
                      },
                      p = () => {
                        const m = s;
                        h(), null == m || m.unsubscribe();
                      };
                    return xe((m, v) => {
                      u++, !d && !c && f();
                      const C = (l = null != l ? l : t());
                      v.add(() => {
                        u--, 0 === u && !d && !c && (a = Ma(p, o));
                      }),
                        C.subscribe(v),
                        s ||
                          ((s = new yi({
                            next: (g) => C.next(g),
                            error: (g) => {
                              (d = !0), f(), (a = Ma(h, n, g)), C.error(g);
                            },
                            complete: () => {
                              (c = !0), f(), (a = Ma(h, r)), C.complete();
                            },
                          })),
                          Ae(m).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new G(405, "");
            let o;
            (o =
              n instanceof Am
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(o.componentType);
            const i = (function mx(e) {
                return e.isBoundToModule;
              })(o)
                ? void 0
                : this._injector.get(ln),
              a = o.create(Ue.NULL, [], r || o.selector, i),
              l = a.location.nativeElement,
              u = a.injector.get(Xu, null),
              c = u && a.injector.get(Cy);
            return (
              u && c && c.registerApplication(l, u),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  nc(this.components, a),
                  c && c.unregisterApplication(l);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick) throw new G(101, "");
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            nc(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(gy, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
          }
          ngOnDestroy() {
            this._views.slice().forEach((n) => n.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(Ie), E(Ue), E(Ao), E(Bo), E(Wu));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function nc(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let xy = !0,
        bs = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = bx), e;
        })();
      function bx(e) {
        return (function Mx(e, t, n) {
          if (Ai(e) && !n) {
            const r = Xe(e.index, t);
            return new Uo(r, r);
          }
          return 47 & e.type ? new Uo(t[16], t) : null;
        })(Ce(), y(), 16 == (16 & e));
      }
      class Ny {
        constructor() {}
        supports(t) {
          return To(t);
        }
        create(t) {
          return new Ox(t);
        }
      }
      const Ix = (e, t) => t;
      class Ox {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Ix);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Ry(r, o, i)) ? n : r,
              a = Ry(s, o, i),
              l = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const u = a - o,
                c = l - o;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < u && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - u;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !To(t))) throw new G(900, "");
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function V0(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Ar()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new Px(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Fy()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Fy()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class Px {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Tx {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Fy {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new Tx()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Ry(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class ky {
        constructor() {}
        supports(t) {
          return t instanceof Map || au(t);
        }
        create() {
          return new Nx();
        }
      }
      class Nx {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || au(t))) throw new G(900, "");
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new Fx(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class Fx {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Vy() {
        return new As([new Ny()]);
      }
      let As = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Vy()),
              deps: [[e, new Co(), new Cn()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new G(901, "");
          }
        }
        return (e.ɵprov = U({ token: e, providedIn: "root", factory: Vy })), e;
      })();
      function Ly() {
        return new Wo([new ky()]);
      }
      let Wo = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Ly()),
              deps: [[e, new Co(), new Cn()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (r) return r;
            throw new G(901, "");
          }
        }
        return (e.ɵprov = U({ token: e, providedIn: "root", factory: Ly })), e;
      })();
      const Vx = by(null, "core", [
        { provide: Zu, useValue: "unknown" },
        { provide: Ey, deps: [Ue] },
        { provide: Cy, deps: [] },
        { provide: my, deps: [] },
      ]);
      let Lx = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(E(tc));
            }),
            (e.ɵmod = lt({ type: e })),
            (e.ɵinj = Ke({})),
            e
          );
        })(),
        Ss = null;
      function Wt() {
        return Ss;
      }
      const mt = new j("DocumentToken");
      let Wn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({
            token: e,
            factory: function () {
              return (function Ux() {
                return E(jy);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const $x = new j("Location Initialized");
      let jy = (() => {
        class e extends Wn {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Wt().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Wt().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Wt().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, o) {
            By() ? this._history.pushState(n, r, o) : (this.location.hash = o);
          }
          replaceState(n, r, o) {
            By()
              ? this._history.replaceState(n, r, o)
              : (this.location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(mt));
          }),
          (e.ɵprov = U({
            token: e,
            factory: function () {
              return (function Gx() {
                return new jy(E(mt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function By() {
        return !!window.history.pushState;
      }
      function ac(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function Hy(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function cn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let zr = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({
            token: e,
            factory: function () {
              return (function zx(e) {
                const t = E(mt).location;
                return new Uy(E(Wn), (t && t.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const lc = new j("appBaseHref");
      let Uy = (() => {
          class e extends zr {
            constructor(n, r) {
              if (
                (super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = r;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return ac(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  cn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + cn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + cn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, o;
              null === (o = (r = this._platformLocation).historyGo) ||
                void 0 === o ||
                o.call(r, n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(E(Wn), E(lc, 8));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        qx = (() => {
          class e extends zr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = ac(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + cn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + cn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, o;
              null === (o = (r = this._platformLocation).historyGo) ||
                void 0 === o ||
                o.call(r, n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(E(Wn), E(lc, 8));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        uc = (() => {
          class e {
            constructor(n, r) {
              (this._subject = new se()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = n);
              const o = this._platformStrategy.getBaseHref();
              (this._platformLocation = r),
                (this._baseHref = Hy($y(o))),
                this._platformStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            path(n = !1) {
              return this.normalize(this._platformStrategy.path(n));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + cn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function Qx(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, $y(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._platformStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._platformStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + cn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._platformStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + cn(r)),
                  o
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(n = 0) {
              var r, o;
              null === (o = (r = this._platformStrategy).historyGo) ||
                void 0 === o ||
                o.call(r, n);
            }
            onUrlChange(n) {
              this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  }));
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = cn),
            (e.joinWithSlash = ac),
            (e.stripTrailingSlash = Hy),
            (e.ɵfac = function (n) {
              return new (n || e)(E(zr), E(Wn));
            }),
            (e.ɵprov = U({
              token: e,
              factory: function () {
                return (function Wx() {
                  return new uc(E(zr), E(Wn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function $y(e) {
        return e.replace(/\/index.html$/, "");
      }
      let Jy = (() => {
        class e {
          constructor(n, r, o, i) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = r),
              (this._ngEl = o),
              (this._renderer = i),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(n) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                "string" == typeof n ? n.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(n) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = "string" == typeof n ? n.split(/\s+/) : n),
              this._rawClass &&
                (To(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const n = this._iterableDiffer.diff(this._rawClass);
              n && this._applyIterableChanges(n);
            } else if (this._keyValueDiffer) {
              const n = this._keyValueDiffer.diff(this._rawClass);
              n && this._applyKeyValueChanges(n);
            }
          }
          _applyKeyValueChanges(n) {
            n.forEachAddedItem((r) => this._toggleClass(r.key, r.currentValue)),
              n.forEachChangedItem((r) =>
                this._toggleClass(r.key, r.currentValue)
              ),
              n.forEachRemovedItem((r) => {
                r.previousValue && this._toggleClass(r.key, !1);
              });
          }
          _applyIterableChanges(n) {
            n.forEachAddedItem((r) => {
              if ("string" != typeof r.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${W(
                    r.item
                  )}`
                );
              this._toggleClass(r.item, !0);
            }),
              n.forEachRemovedItem((r) => this._toggleClass(r.item, !1));
          }
          _applyClasses(n) {
            n &&
              (Array.isArray(n) || n instanceof Set
                ? n.forEach((r) => this._toggleClass(r, !0))
                : Object.keys(n).forEach((r) => this._toggleClass(r, !!n[r])));
          }
          _removeClasses(n) {
            n &&
              (Array.isArray(n) || n instanceof Set
                ? n.forEach((r) => this._toggleClass(r, !1))
                : Object.keys(n).forEach((r) => this._toggleClass(r, !1)));
          }
          _toggleClass(n, r) {
            (n = n.trim()) &&
              n.split(/\s+/g).forEach((o) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, o)
                  : this._renderer.removeClass(this._ngEl.nativeElement, o);
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(As), _(Wo), _(rt), _(an));
          }),
          (e.ɵdir = S({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
          })),
          e
        );
      })();
      class NI {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Xy = (() => {
        class e {
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new NI(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), ev(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              ev(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(It), _(un), _(As));
          }),
          (e.ɵdir = S({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          e
        );
      })();
      function ev(e, t) {
        e.context.$implicit = t.item;
      }
      let tv = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new FI()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            nv("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            nv("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(It), _(un));
          }),
          (e.ɵdir = S({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          e
        );
      })();
      class FI {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function nv(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${W(t)}'.`
          );
      }
      let aO = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = lt({ type: e })),
          (e.ɵinj = Ke({})),
          e
        );
      })();
      let dO = (() => {
        class e {}
        return (
          (e.ɵprov = U({
            token: e,
            providedIn: "root",
            factory: () => new fO(E(mt), window),
          })),
          e
        );
      })();
      class fO {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function hO(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              sv(this.window.history) ||
              sv(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (t) {
            return !1;
          }
        }
      }
      function sv(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class bc extends class gO extends class Hx {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function Bx(e) {
            Ss || (Ss = e);
          })(new bc());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function mO() {
            return (
              (Yo = Yo || document.querySelector("base")),
              Yo ? Yo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function yO(e) {
                (Vs = Vs || document.createElement("a")),
                  Vs.setAttribute("href", e);
                const t = Vs.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Yo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function PI(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Vs,
        Yo = null;
      const av = new j("TRANSITION_ID"),
        _O = [
          {
            provide: qu,
            useFactory: function vO(e, t, n) {
              return () => {
                n.get(Wu).donePromise.then(() => {
                  const r = Wt(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [av, mt, Ue],
            multi: !0,
          },
        ];
      class Mc {
        static init() {
          !(function px(e) {
            ec = e;
          })(new Mc());
        }
        addToWindow(t) {
          (Q.getAngularTestability = (r, o = !0) => {
            const i = t.findTestabilityInTree(r, o);
            if (null == i)
              throw new Error("Could not find testability for element.");
            return i;
          }),
            (Q.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Q.getAllAngularRootElements = () => t.getAllRootElements()),
            Q.frameworkStabilizers || (Q.frameworkStabilizers = []),
            Q.frameworkStabilizers.push((r) => {
              const o = Q.getAllAngularTestabilities();
              let i = o.length,
                s = !1;
              const a = function (l) {
                (s = s || l), i--, 0 == i && r(s);
              };
              o.forEach(function (l) {
                l.whenStable(a);
              });
            });
        }
        findTestabilityInTree(t, n, r) {
          if (null == n) return null;
          const o = t.getTestability(n);
          return null != o
            ? o
            : r
            ? Wt().isShadowRoot(n)
              ? this.findTestabilityInTree(t, n.host, !0)
              : this.findTestabilityInTree(t, n.parentElement, !0)
            : null;
        }
      }
      let CO = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ls = new j("EventManagerPlugins");
      let js = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(Ls), E(Ie));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class lv {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = Wt().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let uv = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ko = (() => {
          class e extends uv {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(cv), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(cv));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(E(mt));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function cv(e) {
        Wt().remove(e);
      }
      const Ec = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Ac = /%COMP%/g;
      function Bs(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r];
          Array.isArray(o) ? Bs(e, o, n) : ((o = o.replace(Ac, e)), n.push(o));
        }
        return n;
      }
      function hv(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Sc = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new xc(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Rt.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new AO(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case Rt.ShadowDom:
                return new SO(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = Bs(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(js), E(Ko), E(qo));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class xc {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Ec[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          t.appendChild(n);
        }
        insertBefore(t, n, r) {
          t && t.insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Ec[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Ec[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (tt.DashCase | tt.Important)
            ? t.style.setProperty(n, r, o & tt.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & tt.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, hv(r))
            : this.eventManager.addEventListener(t, n, hv(r));
        }
      }
      class AO extends xc {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = Bs(o + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function bO(e) {
              return "_ngcontent-%COMP%".replace(Ac, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function MO(e) {
              return "_nghost-%COMP%".replace(Ac, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class SO extends xc {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Bs(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let xO = (() => {
        class e extends lv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(mt));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const gv = ["alt", "control", "meta", "shift"],
        OO = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        mv = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        PO = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let TO = (() => {
        class e extends lv {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Wt().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "";
            if (
              (gv.forEach((l) => {
                const u = r.indexOf(l);
                u > -1 && (r.splice(u, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const a = {};
            return (a.domEventName = o), (a.fullKey = s), a;
          }
          static getEventFullKey(n) {
            let r = "",
              o = (function NO(e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && mv.hasOwnProperty(t) && (t = mv[t]));
                }
                return OO[t] || t;
              })(n);
            return (
              (o = o.toLowerCase()),
              " " === o ? (o = "space") : "." === o && (o = "dot"),
              gv.forEach((i) => {
                i != o && PO[i](n) && (r += i + ".");
              }),
              (r += o),
              r
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.getEventFullKey(i) === n && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(mt));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const VO = by(Vx, "browser", [
          { provide: Zu, useValue: "browser" },
          {
            provide: py,
            useValue: function FO() {
              bc.makeCurrent(), Mc.init();
            },
            multi: !0,
          },
          {
            provide: mt,
            useFactory: function kO() {
              return (
                (function WD(e) {
                  Ba = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        LO = [
          { provide: tu, useValue: "root" },
          {
            provide: Ao,
            useFactory: function RO() {
              return new Ao();
            },
            deps: [],
          },
          { provide: Ls, useClass: xO, multi: !0, deps: [mt, Ie, Zu] },
          { provide: Ls, useClass: TO, multi: !0, deps: [mt] },
          { provide: Sc, useClass: Sc, deps: [js, Ko, qo] },
          { provide: xm, useExisting: Sc },
          { provide: uv, useExisting: Ko },
          { provide: Ko, useClass: Ko, deps: [mt] },
          { provide: Xu, useClass: Xu, deps: [Ie] },
          { provide: js, useClass: js, deps: [Ls, Ie] },
          { provide: class pO {}, useClass: CO, deps: [] },
        ];
      let jO = (() => {
        class e {
          constructor(n) {
            if (n)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                { provide: qo, useValue: n.appId },
                { provide: av, useExisting: qo },
                _O,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(e, 12));
          }),
          (e.ɵmod = lt({ type: e })),
          (e.ɵinj = Ke({ providers: LO, imports: [aO, Lx] })),
          e
        );
      })();
      function k(...e) {
        return Ae(e, no(e));
      }
      "undefined" != typeof window && window;
      class Nt extends Kt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const { isArray: YO } = Array,
        { getPrototypeOf: KO, prototype: JO, keys: XO } = Object;
      function _v(e) {
        if (1 === e.length) {
          const t = e[0];
          if (YO(t)) return { args: t, keys: null };
          if (
            (function eP(e) {
              return e && "object" == typeof e && KO(e) === JO;
            })(t)
          ) {
            const n = XO(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: tP } = Array;
      function Cv(e) {
        return J((t) =>
          (function nP(e, t) {
            return tP(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function Dv(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function wv(e, t, n) {
        e ? Jt(n, e, t) : t();
      }
      function Hs(e, t) {
        const n = K(e) ? e : () => e,
          r = (o) => o.error(n());
        return new pe(t ? (o) => t.schedule(r, 0, o) : r);
      }
      const Us = Xr(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Oc(...e) {
        return (function iP() {
          return to(1);
        })()(Ae(e, no(e)));
      }
      function bv(e) {
        return new pe((t) => {
          Ft(e()).subscribe(t);
        });
      }
      function Mv() {
        return xe((e, t) => {
          let n = null;
          e._refCount++;
          const r = Me(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class sP extends pe {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Vd(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null),
            null == t || t.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new at();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Me(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = at.EMPTY));
          }
          return t;
        }
        refCount() {
          return Mv()(this);
        }
      }
      function Qn(e, t) {
        return xe((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Me(
              r,
              (l) => {
                null == o || o.unsubscribe();
                let u = 0;
                const c = i++;
                Ft(e(l, c)).subscribe(
                  (o = Me(
                    r,
                    (d) => r.next(t ? t(l, d, c, u++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function lP(e, t, n, r, o) {
        return (i, s) => {
          let a = n,
            l = t,
            u = 0;
          i.subscribe(
            Me(
              s,
              (c) => {
                const d = u++;
                (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
              },
              o &&
                (() => {
                  a && s.next(l), s.complete();
                })
            )
          );
        };
      }
      function Ev(e, t) {
        return xe(lP(e, t, arguments.length >= 2, !0));
      }
      function qr(e, t) {
        return xe((n, r) => {
          let o = 0;
          n.subscribe(Me(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function An(e) {
        return xe((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Me(n, void 0, void 0, (s) => {
              (i = Ft(e(s, An(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function Jo(e, t) {
        return K(t) ? Ee(e, t, 1) : Ee(e, 1);
      }
      function Pc(e) {
        return e <= 0
          ? () => Xt
          : xe((t, n) => {
              let r = [];
              t.subscribe(
                Me(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function Av(e = uP) {
        return xe((t, n) => {
          let r = !1;
          t.subscribe(
            Me(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function uP() {
        return new Us();
      }
      function Sv(e) {
        return xe((t, n) => {
          let r = !1;
          t.subscribe(
            Me(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function Wr(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? qr((o, i) => e(o, i, r)) : Nn,
            _i(1),
            n ? Sv(t) : Av(() => new Us())
          );
      }
      function ot(e, t, n) {
        const r = K(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? xe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Me(
                  i,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      i.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      i.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      i.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : Nn;
      }
      class fn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Tc extends fn {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n), (this.navigationTrigger = r), (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Xo extends fn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class xv extends fn {
        constructor(t, n, r) {
          super(t, n), (this.reason = r);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class fP extends fn {
        constructor(t, n, r) {
          super(t, n), (this.error = r);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class hP extends fn {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class pP extends fn {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class gP extends fn {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class mP extends fn {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class yP extends fn {
        constructor(t, n, r, o) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = o);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Iv {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Ov {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class vP {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class _P {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class CP {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class DP {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Pv {
        constructor(t, n, r) {
          (this.routerEvent = t), (this.position = n), (this.anchor = r);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const L = "primary";
      class wP {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Qr(e) {
        return new wP(e);
      }
      const Tv = "ngNavigationCancelingError";
      function Nc(e) {
        const t = Error("NavigationCancelingError: " + e);
        return (t[Tv] = !0), t;
      }
      function MP(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Qt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !Nv(e[o], t[o]))) return !1;
        return !0;
      }
      function Nv(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function Fv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Rv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Oe(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Zt(e) {
        return mu(e) ? e : Fo(e) ? Ae(Promise.resolve(e)) : k(e);
      }
      const SP = {
          exact: function Lv(e, t, n) {
            if (
              !Yn(e.segments, t.segments) ||
              !$s(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !Lv(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: jv,
        },
        kv = {
          exact: function xP(e, t) {
            return Qt(e, t);
          },
          subset: function IP(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Nv(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Vv(e, t, n) {
        return (
          SP[n.paths](e.root, t.root, n.matrixParams) &&
          kv[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function jv(e, t, n) {
        return Bv(e, t, t.segments, n);
      }
      function Bv(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Yn(o, n) || t.hasChildren() || !$s(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Yn(e.segments, n) || !$s(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !jv(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Yn(e.segments, o) && $s(e.segments, o, r) && e.children[L]) &&
            Bv(e.children[L], t, i, r)
          );
        }
      }
      function $s(e, t, n) {
        return t.every((r, o) => kv[n](e[o].parameters, r.parameters));
      }
      class Zn {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Qr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return TP.serialize(this);
        }
      }
      class H {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Oe(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Gs(this);
        }
      }
      class ei {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Qr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return zv(this);
        }
      }
      function Yn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      class Hv {}
      class Uv {
        parse(t) {
          const n = new HP(t);
          return new Zn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${ti(t.root, !0)}`,
            r = (function RP(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${zs(n)}=${zs(o)}`).join("&")
                    : `${zs(n)}=${zs(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function NP(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const TP = new Uv();
      function Gs(e) {
        return e.segments.map((t) => zv(t)).join("/");
      }
      function ti(e, t) {
        if (!e.hasChildren()) return Gs(e);
        if (t) {
          const n = e.children[L] ? ti(e.children[L], !1) : "",
            r = [];
          return (
            Oe(e.children, (o, i) => {
              i !== L && r.push(`${i}:${ti(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function PP(e, t) {
            let n = [];
            return (
              Oe(e.children, (r, o) => {
                o === L && (n = n.concat(t(r, o)));
              }),
              Oe(e.children, (r, o) => {
                o !== L && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === L ? [ti(e.children[L], !1)] : [`${o}:${ti(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[L]
            ? `${Gs(e)}/${n[0]}`
            : `${Gs(e)}/(${n.join("//")})`;
        }
      }
      function $v(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function zs(e) {
        return $v(e).replace(/%3B/gi, ";");
      }
      function Fc(e) {
        return $v(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function qs(e) {
        return decodeURIComponent(e);
      }
      function Gv(e) {
        return qs(e.replace(/\+/g, "%20"));
      }
      function zv(e) {
        return `${Fc(e.path)}${(function FP(e) {
          return Object.keys(e)
            .map((t) => `;${Fc(t)}=${Fc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const kP = /^[^\/()?;=#]+/;
      function Ws(e) {
        const t = e.match(kP);
        return t ? t[0] : "";
      }
      const VP = /^[^=?&#]+/,
        jP = /^[^&#]+/;
      class HP {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new H([], {})
              : new H([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[L] = new H(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Ws(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new ei(qs(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Ws(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Ws(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[qs(n)] = qs(r);
        }
        parseQueryParam(t) {
          const n = (function LP(e) {
            const t = e.match(VP);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function BP(e) {
              const t = e.match(jP);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = Gv(n),
            i = Gv(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Ws(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o)
              throw new Error(`Cannot parse url '${this.url}'`);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.substr(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = L);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[L] : new H([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class qv {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Rc(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Rc(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = kc(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return kc(t, this._root).map((n) => n.value);
        }
      }
      function Rc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Rc(e, n);
          if (r) return r;
        }
        return null;
      }
      function kc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = kc(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class hn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Zr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Wv extends qv {
        constructor(t, n) {
          super(t), (this.snapshot = n), Vc(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Qv(e, t) {
        const n = (function UP(e, t) {
            const s = new Qs([], {}, {}, "", {}, L, t, null, e.root, -1, {});
            return new Yv("", new hn(s, []));
          })(e, t),
          r = new Nt([new ei("", {})]),
          o = new Nt({}),
          i = new Nt({}),
          s = new Nt({}),
          a = new Nt(""),
          l = new Yr(r, o, s, a, i, L, t, n.root);
        return (l.snapshot = n.root), new Wv(new hn(l, []), n);
      }
      class Yr {
        constructor(t, n, r, o, i, s, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(J((t) => Qr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(J((t) => Qr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Zv(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function $P(e) {
          return e.reduce(
            (t, n) => ({
              params: Object.assign(Object.assign({}, t.params), n.params),
              data: Object.assign(Object.assign({}, t.data), n.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                n._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Qs {
        constructor(t, n, r, o, i, s, a, l, u, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Qr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Qr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Yv extends qv {
        constructor(t, n) {
          super(n), (this.url = t), Vc(this, n);
        }
        toString() {
          return Kv(this._root);
        }
      }
      function Vc(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Vc(e, n));
      }
      function Kv(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Kv).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Lc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Qt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Qt(t.params, n.params) || e.params.next(n.params),
            (function EP(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Qt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Qt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function jc(e, t) {
        const n =
          Qt(e.params, t.params) &&
          (function OP(e, t) {
            return (
              Yn(e, t) && e.every((n, r) => Qt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || jc(e.parent, t.parent))
        );
      }
      function ni(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function zP(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return ni(e, r, o);
              return ni(e, r);
            });
          })(e, t, n);
          return new hn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => ni(e, a))),
                s
              );
            }
          }
          const r = (function qP(e) {
              return new Yr(
                new Nt(e.url),
                new Nt(e.params),
                new Nt(e.queryParams),
                new Nt(e.fragment),
                new Nt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => ni(e, i));
          return new hn(r, o);
        }
      }
      function Zs(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function ri(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Bc(e, t, n, r, o) {
        let i = {};
        return (
          r &&
            Oe(r, (s, a) => {
              i[a] = Array.isArray(s) ? s.map((l) => `${l}`) : `${s}`;
            }),
          new Zn(n.root === e ? t : Jv(n.root, e, t), i, o)
        );
      }
      function Jv(e, t, n) {
        const r = {};
        return (
          Oe(e.children, (o, i) => {
            r[i] = o === t ? n : Jv(o, t, n);
          }),
          new H(e.segments, r)
        );
      }
      class Xv {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Zs(r[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const o = r.find(ri);
          if (o && o !== Rv(r))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Hc {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function e_(e, t, n) {
        if (
          (e || (e = new H([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Ys(e, t, n);
        const r = (function JP(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (ri(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!n_(l, u, s)) return i;
                r += 2;
              } else {
                if (!n_(l, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new H(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[L] = new H(e.segments.slice(r.pathIndex), e.children)),
            Ys(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new H(e.segments, {})
          : r.match && !e.hasChildren()
          ? Uc(e, t, n)
          : r.match
          ? Ys(e, 0, o)
          : Uc(e, t, n);
      }
      function Ys(e, t, n) {
        if (0 === n.length) return new H(e.segments, {});
        {
          const r = (function KP(e) {
              return ri(e[0]) ? e[0].outlets : { [L]: e };
            })(n),
            o = {};
          return (
            Oe(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = e_(e.children[s], t, i));
            }),
            Oe(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new H(e.segments, o)
          );
        }
      }
      function Uc(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (ri(i)) {
            const l = XP(i.outlets);
            return new H(r, l);
          }
          if (0 === o && Zs(n[0])) {
            r.push(new ei(e.segments[t].path, t_(n[0]))), o++;
            continue;
          }
          const s = ri(i) ? i.outlets[L] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Zs(a)
            ? (r.push(new ei(s, t_(a))), (o += 2))
            : (r.push(new ei(s, {})), o++);
        }
        return new H(r, {});
      }
      function XP(e) {
        const t = {};
        return (
          Oe(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Uc(new H([], {}), 0, n));
          }),
          t
        );
      }
      function t_(e) {
        const t = {};
        return Oe(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function n_(e, t, n) {
        return e == n.path && Qt(t, n.parameters);
      }
      class tT {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Lc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Zr(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Oe(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Zr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Zr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Zr(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new DP(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new _P(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Lc(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Lc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = (function nT(e) {
                  for (let t = e.parent; t; t = t.parent) {
                    const n = t.routeConfig;
                    if (n && n._loadedConfig) return n._loadedConfig;
                    if (n && n.component) return null;
                  }
                  return null;
                })(o.snapshot),
                l = a ? a.module.componentFactoryResolver : null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = l),
                s.outlet && s.outlet.activateWith(o, l),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class $c {
        constructor(t, n) {
          (this.routes = t), (this.module = n);
        }
      }
      function Sn(e) {
        return "function" == typeof e;
      }
      function Kn(e) {
        return e instanceof Zn;
      }
      const oi = Symbol("INITIAL_VALUE");
      function ii() {
        return Qn((e) =>
          (function rP(...e) {
            const t = no(e),
              n = Kd(e),
              { args: r, keys: o } = _v(e);
            if (0 === r.length) return Ae([], t);
            const i = new pe(
              (function oP(e, t, n = Nn) {
                return (r) => {
                  wv(
                    t,
                    () => {
                      const { length: o } = e,
                        i = new Array(o);
                      let s = o,
                        a = o;
                      for (let l = 0; l < o; l++)
                        wv(
                          t,
                          () => {
                            const u = Ae(e[l], t);
                            let c = !1;
                            u.subscribe(
                              Me(
                                r,
                                (d) => {
                                  (i[l] = d),
                                    c || ((c = !0), a--),
                                    a || r.next(n(i.slice()));
                                },
                                () => {
                                  --s || r.complete();
                                }
                              )
                            );
                          },
                          r
                        );
                    },
                    r
                  );
                };
              })(r, t, o ? (s) => Dv(o, s) : Nn)
            );
            return n ? i.pipe(Cv(n)) : i;
          })(
            e.map((t) =>
              t.pipe(
                _i(1),
                (function aP(...e) {
                  const t = no(e);
                  return xe((n, r) => {
                    (t ? Oc(e, n, t) : Oc(e, n)).subscribe(r);
                  });
                })(oi)
              )
            )
          ).pipe(
            Ev((t, n) => {
              let r = !1;
              return n.reduce(
                (o, i, s) =>
                  o !== oi
                    ? o
                    : (i === oi && (r = !0),
                      r || (!1 !== i && s !== n.length - 1 && !Kn(i)) ? o : i),
                t
              );
            }, oi),
            qr((t) => t !== oi),
            J((t) => (Kn(t) ? t : !0 === t)),
            _i(1)
          )
        );
      }
      class lT {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new si()),
            (this.attachRef = null);
        }
      }
      class si {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, n) {
          const r = this.getOrCreateContext(t);
          (r.outlet = n), this.contexts.set(t, r);
        }
        onChildOutletDestroyed(t) {
          const n = this.getContext(t);
          n && ((n.outlet = null), (n.attachRef = null));
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let n = this.getContext(t);
          return n || ((n = new lT()), this.contexts.set(t, n)), n;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let Gc = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.resolver = o),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new se()),
              (this.deactivateEvents = new se()),
              (this.attachEvents = new se()),
              (this.detachEvents = new se()),
              (this.name = i || L),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = n;
            const s = (r = r || this.resolver).resolveComponentFactory(
                n._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new uT(n, a, this.location.injector);
            (this.activated = this.location.createComponent(
              s,
              this.location.length,
              l
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(si), _(It), _(Bo), ho("name"), _(bs));
          }),
          (e.ɵdir = S({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
          })),
          e
        );
      })();
      class uT {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Yr
            ? this.route
            : t === si
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let r_ = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Rn({
            type: e,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Vr(0, "router-outlet");
            },
            directives: [Gc],
            encapsulation: 2,
          })),
          e
        );
      })();
      function o_(e, t = "") {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          cT(r, dT(t, r));
        }
      }
      function cT(e, t) {
        e.children && o_(e.children, t);
      }
      function dT(e, t) {
        return t
          ? e || t.path
            ? e && !t.path
              ? `${e}/`
              : !e && t.path
              ? t.path
              : `${e}/${t.path}`
            : ""
          : e;
      }
      function zc(e) {
        const t = e.children && e.children.map(zc),
          n = t
            ? Object.assign(Object.assign({}, e), { children: t })
            : Object.assign({}, e);
        return (
          !n.component &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== L &&
            (n.component = r_),
          n
        );
      }
      function _t(e) {
        return e.outlet || L;
      }
      function i_(e, t) {
        const n = e.filter((r) => _t(r) === t);
        return n.push(...e.filter((r) => _t(r) !== t)), n;
      }
      const s_ = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Ks(e, t, n) {
        var r;
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? Object.assign({}, s_)
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (t.matcher || MP)(n, e, t);
        if (!i) return Object.assign({}, s_);
        const s = {};
        Oe(i.posParams, (l, u) => {
          s[u] = l.path;
        });
        const a =
          i.consumed.length > 0
            ? Object.assign(
                Object.assign({}, s),
                i.consumed[i.consumed.length - 1].parameters
              )
            : s;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          remainingSegments: n.slice(i.consumed.length),
          parameters: a,
          positionalParamSegments:
            null !== (r = i.posParams) && void 0 !== r ? r : {},
        };
      }
      function Js(e, t, n, r, o = "corrected") {
        if (
          n.length > 0 &&
          (function pT(e, t, n) {
            return n.some((r) => Xs(e, t, r) && _t(r) !== L);
          })(e, n, r)
        ) {
          const s = new H(
            t,
            (function hT(e, t, n, r) {
              const o = {};
              (o[L] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && _t(i) !== L) {
                  const s = new H([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[_t(i)] = s);
                }
              return o;
            })(e, t, r, new H(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function gT(e, t, n) {
            return n.some((r) => Xs(e, t, r));
          })(e, n, r)
        ) {
          const s = new H(
            e.segments,
            (function fT(e, t, n, r, o, i) {
              const s = {};
              for (const a of r)
                if (Xs(e, n, a) && !o[_t(a)]) {
                  const l = new H([], {});
                  (l._sourceSegment = e),
                    (l._segmentIndexShift =
                      "legacy" === i ? e.segments.length : t.length),
                    (s[_t(a)] = l);
                }
              return Object.assign(Object.assign({}, o), s);
            })(e, t, n, r, e.children, o)
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        const i = new H(e.segments, e.children);
        return (
          (i._sourceSegment = e),
          (i._segmentIndexShift = t.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function Xs(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function a_(e, t, n, r) {
        return (
          !!(_t(e) === r || (r !== L && Xs(t, n, e))) &&
          ("**" === e.path || Ks(t, e, n).matched)
        );
      }
      function l_(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      class ai {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class u_ {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ea(e) {
        return Hs(new ai(e));
      }
      function c_(e) {
        return Hs(new u_(e));
      }
      class _T {
        constructor(t, n, r, o, i) {
          (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(ln));
        }
        apply() {
          const t = Js(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new H(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, n, L)
            .pipe(
              J((i) =>
                this.createUrlTree(
                  qc(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              An((i) => {
                if (i instanceof u_)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof ai ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, L)
            .pipe(
              J((o) => this.createUrlTree(qc(o), t.queryParams, t.fragment))
            )
            .pipe(
              An((o) => {
                throw o instanceof ai ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, n, r) {
          const o = t.segments.length > 0 ? new H([], { [L]: t }) : t;
          return new Zn(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(J((i) => new H([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Ae(o).pipe(
            Jo((i) => {
              const s = r.children[i],
                a = i_(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                J((l) => ({ segment: l, outlet: i }))
              );
            }),
            Ev((i, s) => ((i[s.outlet] = s.segment), i), {}),
            (function cP(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? qr((o, i) => e(o, i, r)) : Nn,
                  Pc(1),
                  n ? Sv(t) : Av(() => new Us())
                );
            })()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return Ae(r).pipe(
            Jo((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                An((u) => {
                  if (u instanceof ai) return k(null);
                  throw u;
                })
              )
            ),
            Wr((a) => !!a),
            An((a, l) => {
              if (a instanceof Us || "EmptyError" === a.name) {
                if (l_(n, o, i)) return k(new H([], {}));
                throw new ai(n);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return a_(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : ea(n)
            : ea(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? c_(i)
            : this.lineralizeSegments(r, i).pipe(
                Ee((s) => {
                  const a = new H(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = Ks(n, o, i);
          if (!a) return ea(n);
          const d = this.applyRedirectCommands(l, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? c_(d)
            : this.lineralizeSegments(o, d).pipe(
                Ee((f) => this.expandSegment(t, n, r, f.concat(u), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          if ("**" === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? k(r._loadedConfig)
                  : this.configLoader.load(t.injector, r)
                ).pipe(J((d) => ((r._loadedConfig = d), new H(o, {}))))
              : k(new H(o, {}));
          const {
            matched: s,
            consumedSegments: a,
            remainingSegments: l,
          } = Ks(n, r, o);
          return s
            ? this.getChildConfig(t, r, o).pipe(
                Ee((c) => {
                  const d = c.module,
                    f = c.routes,
                    { segmentGroup: h, slicedSegments: p } = Js(n, a, l, f),
                    m = new H(h.segments, h.children);
                  if (0 === p.length && m.hasChildren())
                    return this.expandChildren(d, f, m).pipe(
                      J((b) => new H(a, b))
                    );
                  if (0 === f.length && 0 === p.length) return k(new H(a, {}));
                  const v = _t(r) === i;
                  return this.expandSegment(d, m, f, p, v ? L : i, !0).pipe(
                    J((g) => new H(a.concat(g.segments), g.children))
                  );
                })
              )
            : ea(n);
        }
        getChildConfig(t, n, r) {
          return n.children
            ? k(new $c(n.children, t))
            : n.loadChildren
            ? void 0 !== n._loadedConfig
              ? k(n._loadedConfig)
              : this.runCanLoadGuards(t.injector, n, r).pipe(
                  Ee((o) =>
                    o
                      ? this.configLoader
                          .load(t.injector, n)
                          .pipe(J((i) => ((n._loadedConfig = i), i)))
                      : (function yT(e) {
                          return Hs(
                            Nc(
                              `Cannot load children because the guard of the route "path: '${e.path}'" returned false`
                            )
                          );
                        })(n)
                  )
                )
            : k(new $c([], t));
        }
        runCanLoadGuards(t, n, r) {
          const o = n.canLoad;
          return o && 0 !== o.length
            ? k(
                o.map((s) => {
                  const a = t.get(s);
                  let l;
                  if (
                    (function oT(e) {
                      return e && Sn(e.canLoad);
                    })(a)
                  )
                    l = a.canLoad(n, r);
                  else {
                    if (!Sn(a)) throw new Error("Invalid CanLoad guard");
                    l = a(n, r);
                  }
                  return Zt(l);
                })
              ).pipe(
                ii(),
                ot((s) => {
                  if (!Kn(s)) return;
                  const a = Nc(
                    `Redirecting to "${this.urlSerializer.serialize(s)}"`
                  );
                  throw ((a.url = s), a);
                }),
                J((s) => !0 === s)
              )
            : k(!0);
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return k(r);
            if (o.numberOfChildren > 1 || !o.children[L])
              return Hs(
                new Error(
                  `Only absolute redirects can have named outlets. redirectTo: '${t.redirectTo}'`
                )
              );
            o = o.children[L];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreatreUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreatreUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Zn(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Oe(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Oe(n.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, r, o);
            }),
            new H(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${n.path}'.`
            );
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      function qc(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = qc(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function CT(e) {
          if (1 === e.numberOfChildren && e.children[L]) {
            const t = e.children[L];
            return new H(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new H(e.segments, t));
      }
      class d_ {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ta {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function wT(e, t, n) {
        const r = e._root;
        return li(r, t ? t._root : null, n, [r.value]);
      }
      function na(e, t, n) {
        const r = (function MT(e) {
          if (!e) return null;
          for (let t = e.parent; t; t = t.parent) {
            const n = t.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(t);
        return (r ? r.module.injector : n).get(e);
      }
      function li(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Zr(t);
        return (
          e.children.forEach((s) => {
            (function ET(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const l = (function AT(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Yn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Yn(e.url, t.url) || !Qt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !jc(e, t) || !Qt(e.queryParams, t.queryParams);
                    default:
                      return !jc(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? o.canActivateChecks.push(new d_(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  li(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new ta(a.outlet.component, s));
              } else
                s && ui(t, a, o),
                  o.canActivateChecks.push(new d_(r)),
                  li(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Oe(i, (s, a) => ui(s, n.getContext(a), o)),
          o
        );
      }
      function ui(e, t, n) {
        const r = Zr(e),
          o = e.value;
        Oe(r, (i, s) => {
          ui(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new ta(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      class RT {}
      function f_(e) {
        return new pe((t) => t.error(e));
      }
      class VT {
        constructor(t, n, r, o, i, s) {
          (this.rootComponentType = t),
            (this.config = n),
            (this.urlTree = r),
            (this.url = o),
            (this.paramsInheritanceStrategy = i),
            (this.relativeLinkResolution = s);
        }
        recognize() {
          const t = Js(
              this.urlTree.root,
              [],
              [],
              this.config.filter((s) => void 0 === s.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            n = this.processSegmentGroup(this.config, t, L);
          if (null === n) return null;
          const r = new Qs(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              L,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            o = new hn(r, n),
            i = new Yv(this.url, o);
          return this.inheritParamsAndData(i._root), i;
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Zv(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(t, n)
            : this.processSegment(t, n, n.segments, r);
        }
        processChildren(t, n) {
          const r = [];
          for (const i of Object.keys(n.children)) {
            const s = n.children[i],
              a = i_(t, i),
              l = this.processSegmentGroup(a, s, i);
            if (null === l) return null;
            r.push(...l);
          }
          const o = h_(r);
          return (
            (function LT(e) {
              e.sort((t, n) =>
                t.value.outlet === L
                  ? -1
                  : n.value.outlet === L
                  ? 1
                  : t.value.outlet.localeCompare(n.value.outlet)
              );
            })(o),
            o
          );
        }
        processSegment(t, n, r, o) {
          for (const i of t) {
            const s = this.processSegmentAgainstRoute(i, n, r, o);
            if (null !== s) return s;
          }
          return l_(n, r, o) ? [] : null;
        }
        processSegmentAgainstRoute(t, n, r, o) {
          if (t.redirectTo || !a_(t, n, r, o)) return null;
          let i,
            s = [],
            a = [];
          if ("**" === t.path) {
            const h = r.length > 0 ? Rv(r).parameters : {};
            i = new Qs(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              m_(t),
              _t(t),
              t.component,
              t,
              p_(n),
              g_(n) + r.length,
              y_(t)
            );
          } else {
            const h = Ks(n, t, r);
            if (!h.matched) return null;
            (s = h.consumedSegments),
              (a = h.remainingSegments),
              (i = new Qs(
                s,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                m_(t),
                _t(t),
                t.component,
                t,
                p_(n),
                g_(n) + s.length,
                y_(t)
              ));
          }
          const l = (function jT(e) {
              return e.children
                ? e.children
                : e.loadChildren
                ? e._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: u, slicedSegments: c } = Js(
              n,
              s,
              a,
              l.filter((h) => void 0 === h.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && u.hasChildren()) {
            const h = this.processChildren(l, u);
            return null === h ? null : [new hn(i, h)];
          }
          if (0 === l.length && 0 === c.length) return [new hn(i, [])];
          const d = _t(t) === o,
            f = this.processSegment(l, u, c, d ? L : o);
          return null === f ? null : [new hn(i, f)];
        }
      }
      function BT(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function h_(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!BT(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = h_(r.children);
          t.push(new hn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function p_(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function g_(e) {
        let t = e,
          n = t._segmentIndexShift ? t._segmentIndexShift : 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment),
            (n += t._segmentIndexShift ? t._segmentIndexShift : 0);
        return n - 1;
      }
      function m_(e) {
        return e.data || {};
      }
      function y_(e) {
        return e.resolve || {};
      }
      function v_(e) {
        return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
      }
      function Wc(e) {
        return Qn((t) => {
          const n = e(t);
          return n ? Ae(n).pipe(J(() => t)) : k(t);
        });
      }
      class QT extends class WT {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const Qc = new j("ROUTES");
      class __ {
        constructor(t, n, r, o) {
          (this.injector = t),
            (this.compiler = n),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = o);
        }
        load(t, n) {
          if (n._loader$) return n._loader$;
          this.onLoadStartListener && this.onLoadStartListener(n);
          const o = this.loadModuleFactory(n.loadChildren).pipe(
            J((i) => {
              this.onLoadEndListener && this.onLoadEndListener(n);
              const s = i.create(t);
              return new $c(
                Fv(s.injector.get(Qc, void 0, O.Self | O.Optional)).map(zc),
                s
              );
            }),
            An((i) => {
              throw ((n._loader$ = void 0), i);
            })
          );
          return (
            (n._loader$ = new sP(o, () => new Kt()).pipe(Mv())), n._loader$
          );
        }
        loadModuleFactory(t) {
          return Zt(t()).pipe(
            Ee((n) =>
              n instanceof Pm ? k(n) : Ae(this.compiler.compileModuleAsync(n))
            )
          );
        }
      }
      class YT {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function KT(e) {
        throw e;
      }
      function JT(e, t, n) {
        return t.parse("/");
      }
      function C_(e, t) {
        return k(null);
      }
      const XT = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        e1 = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let it = (() => {
        class e {
          constructor(n, r, o, i, s, a, l) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = o),
              (this.location = i),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new Kt()),
              (this.errorHandler = KT),
              (this.malformedUriErrorHandler = JT),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: C_,
                afterPreactivation: C_,
              }),
              (this.urlHandlingStrategy = new YT()),
              (this.routeReuseStrategy = new QT()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = s.get(ln)),
              (this.console = s.get(my));
            const d = s.get(Ie);
            (this.isNgZoneEnabled = d instanceof Ie && Ie.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function AP() {
                return new Zn(new H([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new __(
                s,
                a,
                (f) => this.triggerEvent(new Iv(f)),
                (f) => this.triggerEvent(new Ov(f))
              )),
              (this.routerState = Qv(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new Nt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var n;
            return null === (n = this.location.getState()) || void 0 === n
              ? void 0
              : n.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              qr((o) => 0 !== o.id),
              J((o) =>
                Object.assign(Object.assign({}, o), {
                  extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
                })
              ),
              Qn((o) => {
                let i = !1,
                  s = !1;
                return k(o).pipe(
                  ot((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    };
                  }),
                  Qn((a) => {
                    const l = this.browserUrlTree.toString(),
                      u =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || u) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        ra(a.source) && (this.browserUrlTree = a.extractedUrl),
                        k(a).pipe(
                          Qn((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new Tc(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? Xt
                                : Promise.resolve(d)
                            );
                          }),
                          (function DT(e, t, n, r) {
                            return Qn((o) =>
                              (function vT(e, t, n, r, o) {
                                return new _T(e, t, n, r, o).apply();
                              })(e, t, n, o.extractedUrl, r).pipe(
                                J((i) =>
                                  Object.assign(Object.assign({}, o), {
                                    urlAfterRedirects: i,
                                  })
                                )
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          ot((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function HT(e, t, n, r, o) {
                            return Ee((i) =>
                              (function kT(
                                e,
                                t,
                                n,
                                r,
                                o = "emptyOnly",
                                i = "legacy"
                              ) {
                                try {
                                  const s = new VT(
                                    e,
                                    t,
                                    n,
                                    r,
                                    o,
                                    i
                                  ).recognize();
                                  return null === s ? f_(new RT()) : k(s);
                                } catch (s) {
                                  return f_(s);
                                }
                              })(
                                e,
                                t,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                o
                              ).pipe(
                                J((s) =>
                                  Object.assign(Object.assign({}, i), {
                                    targetSnapshot: s,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (d) => this.serializeUrl(d),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          ot((d) => {
                            if ("eager" === this.urlUpdateStrategy) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new hP(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      u &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: m,
                          extras: v,
                        } = a,
                        C = new Tc(f, this.serializeUrl(h), p, m);
                      r.next(C);
                      const g = Qv(h, this.rootComponentType).snapshot;
                      return k(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: g,
                          urlAfterRedirects: h,
                          extras: Object.assign(Object.assign({}, v), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Xt;
                  }),
                  Wc((a) => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.beforePreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  ot((a) => {
                    const l = new pP(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  J((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: wT(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function ST(e, t) {
                    return Ee((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: o,
                        guards: {
                          canActivateChecks: i,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === i.length
                        ? k(
                            Object.assign(Object.assign({}, n), {
                              guardsResult: !0,
                            })
                          )
                        : (function xT(e, t, n, r) {
                            return Ae(e).pipe(
                              Ee((o) =>
                                (function FT(e, t, n, r, o) {
                                  const i =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return i && 0 !== i.length
                                    ? k(
                                        i.map((a) => {
                                          const l = na(a, t, o);
                                          let u;
                                          if (
                                            (function aT(e) {
                                              return e && Sn(e.canDeactivate);
                                            })(l)
                                          )
                                            u = Zt(l.canDeactivate(e, t, n, r));
                                          else {
                                            if (!Sn(l))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            u = Zt(l(e, t, n, r));
                                          }
                                          return u.pipe(Wr());
                                        })
                                      ).pipe(ii())
                                    : k(!0);
                                })(o.component, o.route, n, t, r)
                              ),
                              Wr((o) => !0 !== o, !0)
                            );
                          })(s, r, o, e).pipe(
                            Ee((a) =>
                              a &&
                              (function rT(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function IT(e, t, n, r) {
                                    return Ae(t).pipe(
                                      Jo((o) =>
                                        Oc(
                                          (function PT(e, t) {
                                            return (
                                              null !== e && t && t(new vP(e)),
                                              k(!0)
                                            );
                                          })(o.route.parent, r),
                                          (function OT(e, t) {
                                            return (
                                              null !== e && t && t(new CP(e)),
                                              k(!0)
                                            );
                                          })(o.route, r),
                                          (function NT(e, t, n) {
                                            const r = t[t.length - 1],
                                              i = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function bT(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  bv(() =>
                                                    k(
                                                      s.guards.map((l) => {
                                                        const u = na(
                                                          l,
                                                          s.node,
                                                          n
                                                        );
                                                        let c;
                                                        if (
                                                          (function sT(e) {
                                                            return (
                                                              e &&
                                                              Sn(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(u)
                                                        )
                                                          c = Zt(
                                                            u.canActivateChild(
                                                              r,
                                                              e
                                                            )
                                                          );
                                                        else {
                                                          if (!Sn(u))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          c = Zt(u(r, e));
                                                        }
                                                        return c.pipe(Wr());
                                                      })
                                                    ).pipe(ii())
                                                  )
                                                );
                                            return k(i).pipe(ii());
                                          })(e, o.path, n),
                                          (function TT(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return k(!0);
                                            const o = r.map((i) =>
                                              bv(() => {
                                                const s = na(i, t, n);
                                                let a;
                                                if (
                                                  (function iT(e) {
                                                    return (
                                                      e && Sn(e.canActivate)
                                                    );
                                                  })(s)
                                                )
                                                  a = Zt(s.canActivate(t, e));
                                                else {
                                                  if (!Sn(s))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  a = Zt(s(t, e));
                                                }
                                                return a.pipe(Wr());
                                              })
                                            );
                                            return k(o).pipe(ii());
                                          })(e, o.route, n)
                                        )
                                      ),
                                      Wr((o) => !0 !== o, !0)
                                    );
                                  })(r, i, e, t)
                                : k(a)
                            ),
                            J((a) =>
                              Object.assign(Object.assign({}, n), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  ot((a) => {
                    if (Kn(a.guardsResult)) {
                      const u = Nc(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((u.url = a.guardsResult), u);
                    }
                    const l = new gP(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  qr(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  Wc((a) => {
                    if (a.guards.canActivateChecks.length)
                      return k(a).pipe(
                        ot((l) => {
                          const u = new mP(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        }),
                        Qn((l) => {
                          let u = !1;
                          return k(l).pipe(
                            (function UT(e, t) {
                              return Ee((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: o },
                                } = n;
                                if (!o.length) return k(n);
                                let i = 0;
                                return Ae(o).pipe(
                                  Jo((s) =>
                                    (function $T(e, t, n, r) {
                                      return (function GT(e, t, n, r) {
                                        const o = v_(e);
                                        if (0 === o.length) return k({});
                                        const i = {};
                                        return Ae(o).pipe(
                                          Ee((s) =>
                                            (function zT(e, t, n, r) {
                                              const o = na(e, t, r);
                                              return Zt(
                                                o.resolve
                                                  ? o.resolve(t, n)
                                                  : o(t, n)
                                              );
                                            })(e[s], t, n, r).pipe(
                                              ot((a) => {
                                                i[s] = a;
                                              })
                                            )
                                          ),
                                          Pc(1),
                                          Ee(() =>
                                            v_(i).length === o.length
                                              ? k(i)
                                              : Xt
                                          )
                                        );
                                      })(e._resolve, e, t, r).pipe(
                                        J(
                                          (i) => (
                                            (e._resolvedData = i),
                                            (e.data = Object.assign(
                                              Object.assign({}, e.data),
                                              Zv(e, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(s.route, r, e, t)
                                  ),
                                  ot(() => i++),
                                  Pc(1),
                                  Ee((s) => (i === o.length ? k(n) : Xt))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            ot({
                              next: () => (u = !0),
                              complete: () => {
                                u ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(
                                    l,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                        }),
                        ot((l) => {
                          const u = new yP(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        })
                      );
                  }),
                  Wc((a) => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.afterPreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  J((a) => {
                    const l = (function GP(e, t, n) {
                      const r = ni(e, t._root, n ? n._root : void 0);
                      return new Wv(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: l,
                    });
                  }),
                  ot((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    J(
                      (r) => (
                        new tT(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  ot({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    },
                  }),
                  (function dP(e) {
                    return xe((t, n) => {
                      try {
                        t.subscribe(n);
                      } finally {
                        n.add(e);
                      }
                    });
                  })(() => {
                    var a;
                    i ||
                      s ||
                      this.cancelNavigationTransition(
                        o,
                        `Navigation ID ${o.id} is not equal to the current navigation id ${this.navigationId}`
                      ),
                      (null === (a = this.currentNavigation) || void 0 === a
                        ? void 0
                        : a.id) === o.id && (this.currentNavigation = null);
                  }),
                  An((a) => {
                    if (
                      ((s = !0),
                      (function bP(e) {
                        return e && e[Tv];
                      })(a))
                    ) {
                      const l = Kn(a.url);
                      l || ((this.navigated = !0), this.restoreHistory(o, !0));
                      const u = new xv(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a.message
                      );
                      r.next(u),
                        l
                          ? setTimeout(() => {
                              const c = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                d = {
                                  skipLocationChange:
                                    o.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy ||
                                    ra(o.source),
                                };
                              this.scheduleNavigation(
                                c,
                                "imperative",
                                null,
                                d,
                                {
                                  resolve: o.resolve,
                                  reject: o.reject,
                                  promise: o.promise,
                                }
                              );
                            }, 0)
                          : o.resolve(!1);
                    } else {
                      this.restoreHistory(o, !0);
                      const l = new fP(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a
                      );
                      r.next(l);
                      try {
                        o.resolve(this.errorHandler(a));
                      } catch (u) {
                        o.reject(u);
                      }
                    }
                    return Xt;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.transitions.value), n)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    var o;
                    const i = { replaceUrl: !0 },
                      s = (
                        null === (o = n.state) || void 0 === o
                          ? void 0
                          : o.navigationId
                      )
                        ? n.state
                        : null;
                    if (s) {
                      const l = Object.assign({}, s);
                      delete l.navigationId,
                        delete l.ɵrouterPageId,
                        0 !== Object.keys(l).length && (i.state = l);
                    }
                    const a = this.parseUrl(n.url);
                    this.scheduleNavigation(a, r, s, i);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            o_(n),
              (this.config = n.map(zc)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = o || this.routerState.root,
              c = l ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  i
                );
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = i || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function WP(e, t, n, r, o) {
                if (0 === n.length) return Bc(t.root, t.root, t, r, o);
                const i = (function QP(e) {
                  if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                    return new Xv(!0, 0, e);
                  let t = 0,
                    n = !1;
                  const r = e.reduce((o, i, s) => {
                    if ("object" == typeof i && null != i) {
                      if (i.outlets) {
                        const a = {};
                        return (
                          Oe(i.outlets, (l, u) => {
                            a[u] = "string" == typeof l ? l.split("/") : l;
                          }),
                          [...o, { outlets: a }]
                        );
                      }
                      if (i.segmentPath) return [...o, i.segmentPath];
                    }
                    return "string" != typeof i
                      ? [...o, i]
                      : 0 === s
                      ? (i.split("/").forEach((a, l) => {
                          (0 == l && "." === a) ||
                            (0 == l && "" === a
                              ? (n = !0)
                              : ".." === a
                              ? t++
                              : "" != a && o.push(a));
                        }),
                        o)
                      : [...o, i];
                  }, []);
                  return new Xv(n, t, r);
                })(n);
                if (i.toRoot()) return Bc(t.root, new H([], {}), t, r, o);
                const s = (function ZP(e, t, n) {
                    if (e.isAbsolute) return new Hc(t.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const i = n.snapshot._urlSegment;
                      return new Hc(i, i === t.root, 0);
                    }
                    const r = Zs(e.commands[0]) ? 0 : 1;
                    return (function YP(e, t, n) {
                      let r = e,
                        o = t,
                        i = n;
                      for (; i > o; ) {
                        if (((i -= o), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'");
                        o = r.segments.length;
                      }
                      return new Hc(r, !1, o - i);
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + r,
                      e.numberOfDoubleDots
                    );
                  })(i, t, e),
                  a = s.processChildren
                    ? Ys(s.segmentGroup, s.index, i.commands)
                    : e_(s.segmentGroup, s.index, i.commands);
                return Bc(s.segmentGroup, a, t, r, o);
              })(u, this.currentUrlTree, n, d, null != c ? c : null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = Kn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function t1(e) {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t];
                  if (null == n)
                    throw new Error(
                      `The requested path contains ${n} segment at index ${t}`
                    );
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (
              ((o =
                !0 === r
                  ? Object.assign({}, XT)
                  : !1 === r
                  ? Object.assign({}, e1)
                  : r),
              Kn(n))
            )
              return Vv(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return Vv(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new Xo(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, o, i, s) {
            var a, l, u;
            if (this.disposed) return Promise.resolve(!1);
            const c = this.transitions.value,
              d = ra(r) && c && !ra(c.source),
              f = c.rawUrl.toString() === n.toString(),
              h =
                c.id ===
                (null === (a = this.currentNavigation) || void 0 === a
                  ? void 0
                  : a.id);
            if (d && f && h) return Promise.resolve(!0);
            let m, v, C;
            s
              ? ((m = s.resolve), (v = s.reject), (C = s.promise))
              : (C = new Promise((I, $) => {
                  (m = I), (v = $);
                }));
            const g = ++this.navigationId;
            let b;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (o = this.location.getState()),
                  (b =
                    o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? null !== (l = this.browserPageId) && void 0 !== l
                        ? l
                        : 0
                      : (null !== (u = this.browserPageId) && void 0 !== u
                          ? u
                          : 0) + 1))
                : (b = 0),
              this.setTransition({
                id: g,
                targetPageId: b,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: i,
                resolve: m,
                reject: v,
                promise: C,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              C.catch((I) => Promise.reject(I))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              i = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              );
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(n, r = !1) {
            var o, i;
            if ("computed" === this.canceledNavigationResolution) {
              const s = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (o = this.currentNavigation) || void 0 === o
                    ? void 0
                    : o.finalUrl)) ||
              0 === s
                ? this.currentUrlTree ===
                    (null === (i = this.currentNavigation) || void 0 === i
                      ? void 0
                      : i.finalUrl) &&
                  0 === s &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(s);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r) {
            const o = new xv(n.id, this.serializeUrl(n.extractedUrl), r);
            this.triggerEvent(o), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            fu();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function ra(e) {
        return "imperative" !== e;
      }
      let oa = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.route = r),
              (this.tabIndexAttribute = o),
              (this.renderer = i),
              (this.el = s),
              (this.commands = null),
              (this.onChanges = new Kt()),
              this.setTabIndexIfNotOnNativeEl("0");
          }
          setTabIndexIfNotOnNativeEl(n) {
            if (null != this.tabIndexAttribute) return;
            const r = this.renderer,
              o = this.el.nativeElement;
            null !== n
              ? r.setAttribute(o, "tabindex", n)
              : r.removeAttribute(o, "tabindex");
          }
          ngOnChanges(n) {
            this.onChanges.next(this);
          }
          set routerLink(n) {
            null != n
              ? ((this.commands = Array.isArray(n) ? n : [n]),
                this.setTabIndexIfNotOnNativeEl("0"))
              : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
          }
          onClick() {
            if (null === this.urlTree) return !0;
            const n = {
              skipLocationChange: Kr(this.skipLocationChange),
              replaceUrl: Kr(this.replaceUrl),
              state: this.state,
            };
            return this.router.navigateByUrl(this.urlTree, n), !0;
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: Kr(this.preserveFragment),
                });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(it), _(Yr), ho("tabindex"), _(an), _(rt));
          }),
          (e.ɵdir = S({
            type: e,
            selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
            hostBindings: function (n, r) {
              1 & n &&
                ye("click", function () {
                  return r.onClick();
                });
            },
            inputs: {
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              preserveFragment: "preserveFragment",
              skipLocationChange: "skipLocationChange",
              replaceUrl: "replaceUrl",
              state: "state",
              relativeTo: "relativeTo",
              routerLink: "routerLink",
            },
            features: [dt],
          })),
          e
        );
      })();
      function Kr(e) {
        return "" === e || !!e;
      }
      class D_ {}
      class w_ {
        preload(t, n) {
          return k(null);
        }
      }
      let b_ = (() => {
          class e {
            constructor(n, r, o, i) {
              (this.router = n),
                (this.injector = o),
                (this.preloadingStrategy = i),
                (this.loader = new __(
                  o,
                  r,
                  (l) => n.triggerEvent(new Iv(l)),
                  (l) => n.triggerEvent(new Ov(l))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  qr((n) => n instanceof Xo),
                  Jo(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const n = this.injector.get(ln);
              return this.processRoutes(n, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(n, r) {
              const o = [];
              for (const i of r)
                if (i.loadChildren && !i.canLoad && i._loadedConfig) {
                  const s = i._loadedConfig;
                  o.push(this.processRoutes(s.module, s.routes));
                } else
                  i.loadChildren && !i.canLoad
                    ? o.push(this.preloadConfig(n, i))
                    : i.children && o.push(this.processRoutes(n, i.children));
              return Ae(o).pipe(
                to(),
                J((i) => {})
              );
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? k(r._loadedConfig)
                  : this.loader.load(n.injector, r)
                ).pipe(
                  Ee(
                    (i) => (
                      (r._loadedConfig = i),
                      this.processRoutes(i.module, i.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(E(it), E(yy), E(Ue), E(D_));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Yc = (() => {
          class e {
            constructor(n, r, o = {}) {
              (this.router = n),
                (this.viewportScroller = r),
                (this.options = o),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (o.scrollPositionRestoration =
                  o.scrollPositionRestoration || "disabled"),
                (o.anchorScrolling = o.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof Tc
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof Xo &&
                    ((this.lastId = n.id),
                    this.scheduleScrollEvent(
                      n,
                      this.router.parseUrl(n.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof Pv &&
                  (n.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(n.position)
                    : n.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(n.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(n, r) {
              this.router.triggerEvent(
                new Pv(
                  n,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (e.ɵfac = function (n) {
              fu();
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Jn = new j("ROUTER_CONFIGURATION"),
        M_ = new j("ROUTER_FORROOT_GUARD"),
        i1 = [
          uc,
          { provide: Hv, useClass: Uv },
          {
            provide: it,
            useFactory: function c1(e, t, n, r, o, i, s = {}, a, l) {
              const u = new it(null, e, t, n, r, o, Fv(i));
              return (
                a && (u.urlHandlingStrategy = a),
                l && (u.routeReuseStrategy = l),
                (function d1(e, t) {
                  e.errorHandler && (t.errorHandler = e.errorHandler),
                    e.malformedUriErrorHandler &&
                      (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
                    e.onSameUrlNavigation &&
                      (t.onSameUrlNavigation = e.onSameUrlNavigation),
                    e.paramsInheritanceStrategy &&
                      (t.paramsInheritanceStrategy =
                        e.paramsInheritanceStrategy),
                    e.relativeLinkResolution &&
                      (t.relativeLinkResolution = e.relativeLinkResolution),
                    e.urlUpdateStrategy &&
                      (t.urlUpdateStrategy = e.urlUpdateStrategy),
                    e.canceledNavigationResolution &&
                      (t.canceledNavigationResolution =
                        e.canceledNavigationResolution);
                })(s, u),
                s.enableTracing &&
                  u.events.subscribe((c) => {
                    var d, f;
                    null === (d = console.group) ||
                      void 0 === d ||
                      d.call(console, `Router Event: ${c.constructor.name}`),
                      console.log(c.toString()),
                      console.log(c),
                      null === (f = console.groupEnd) ||
                        void 0 === f ||
                        f.call(console);
                  }),
                u
              );
            },
            deps: [
              Hv,
              si,
              uc,
              Ue,
              yy,
              Qc,
              Jn,
              [class ZT {}, new Cn()],
              [class qT {}, new Cn()],
            ],
          },
          si,
          {
            provide: Yr,
            useFactory: function f1(e) {
              return e.routerState.root;
            },
            deps: [it],
          },
          b_,
          w_,
          class o1 {
            preload(t, n) {
              return n().pipe(An(() => k(null)));
            }
          },
          { provide: Jn, useValue: { enableTracing: !1 } },
        ];
      function s1() {
        return new wy("Router", it);
      }
      let E_ = (() => {
        class e {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                i1,
                A_(n),
                {
                  provide: M_,
                  useFactory: u1,
                  deps: [[it, new Cn(), new Co()]],
                },
                { provide: Jn, useValue: r || {} },
                {
                  provide: zr,
                  useFactory: l1,
                  deps: [Wn, [new qi(lc), new Cn()], Jn],
                },
                { provide: Yc, useFactory: a1, deps: [it, dO, Jn] },
                {
                  provide: D_,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : w_,
                },
                { provide: wy, multi: !0, useFactory: s1 },
                [
                  Kc,
                  { provide: qu, multi: !0, useFactory: h1, deps: [Kc] },
                  { provide: S_, useFactory: p1, deps: [Kc] },
                  { provide: gy, multi: !0, useExisting: S_ },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [A_(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(M_, 8), E(it, 8));
          }),
          (e.ɵmod = lt({ type: e })),
          (e.ɵinj = Ke({})),
          e
        );
      })();
      function a1(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new Yc(e, t, n);
      }
      function l1(e, t, n = {}) {
        return n.useHash ? new qx(e, t) : new Uy(e, t);
      }
      function u1(e) {
        return "guarded";
      }
      function A_(e) {
        return [
          { provide: Iw, multi: !0, useValue: e },
          { provide: Qc, multi: !0, useValue: e },
        ];
      }
      let Kc = (() => {
        class e {
          constructor(n) {
            (this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new Kt());
          }
          appInitializer() {
            return this.injector.get($x, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const o = new Promise((a) => (r = a)),
                i = this.injector.get(it),
                s = this.injector.get(Jn);
              return (
                "disabled" === s.initialNavigation
                  ? (i.setUpLocationChangeListener(), r(!0))
                  : "enabled" === s.initialNavigation ||
                    "enabledBlocking" === s.initialNavigation
                  ? ((i.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? k(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    i.initialNavigation())
                  : r(!0),
                o
              );
            });
          }
          bootstrapListener(n) {
            const r = this.injector.get(Jn),
              o = this.injector.get(b_),
              i = this.injector.get(Yc),
              s = this.injector.get(it),
              a = this.injector.get(tc);
            n === a.components[0] &&
              (("enabledNonBlocking" === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                s.initialNavigation(),
              o.setUpPreloading(),
              i.init(),
              s.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(E(Ue));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function h1(e) {
        return e.appInitializer.bind(e);
      }
      function p1(e) {
        return e.bootstrapListener.bind(e);
      }
      const S_ = new j("Router Initializer");
      let x_ = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(an), _(rt));
            }),
            (e.ɵdir = S({ type: e })),
            e
          );
        })(),
        Xn = (() => {
          class e extends x_ {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (
                  t ||
                  (t = (function Ne(e) {
                    return gn(() => {
                      const t = e.prototype.constructor,
                        n = t[tn] || nl(t),
                        r = Object.prototype;
                      let o = Object.getPrototypeOf(e.prototype).constructor;
                      for (; o && o !== r; ) {
                        const i = o[tn] || nl(o);
                        if (i && i !== n) return i;
                        o = Object.getPrototypeOf(o);
                      }
                      return (i) => new i();
                    });
                  })(e))
                )(r || e);
              };
            })()),
            (e.ɵdir = S({ type: e, features: [q] })),
            e
          );
        })();
      const Yt = new j("NgValueAccessor"),
        v1 = { provide: Yt, useExisting: X(() => ia), multi: !0 },
        C1 = new j("CompositionEventMode");
      let ia = (() => {
        class e extends x_ {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function _1() {
                  const e = Wt() ? Wt().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", null == n ? "" : n);
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(an), _(rt), _(C1, 8));
          }),
          (e.ɵdir = S({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                ye("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [ie([v1]), q],
          })),
          e
        );
      })();
      function xn(e) {
        return null == e || 0 === e.length;
      }
      function O_(e) {
        return null != e && "number" == typeof e.length;
      }
      const ke = new j("NgValidators"),
        In = new j("NgAsyncValidators"),
        D1 =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class P_ {
        static min(t) {
          return (function T_(e) {
            return (t) => {
              if (xn(t.value) || xn(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n < e
                ? { min: { min: e, actual: t.value } }
                : null;
            };
          })(t);
        }
        static max(t) {
          return (function N_(e) {
            return (t) => {
              if (xn(t.value) || xn(e)) return null;
              const n = parseFloat(t.value);
              return !isNaN(n) && n > e
                ? { max: { max: e, actual: t.value } }
                : null;
            };
          })(t);
        }
        static required(t) {
          return (function F_(e) {
            return xn(e.value) ? { required: !0 } : null;
          })(t);
        }
        static requiredTrue(t) {
          return (function R_(e) {
            return !0 === e.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function k_(e) {
            return xn(e.value) || D1.test(e.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return (function V_(e) {
            return (t) =>
              xn(t.value) || !O_(t.value)
                ? null
                : t.value.length < e
                ? {
                    minlength: {
                      requiredLength: e,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static maxLength(t) {
          return (function L_(e) {
            return (t) =>
              O_(t.value) && t.value.length > e
                ? {
                    maxlength: {
                      requiredLength: e,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static pattern(t) {
          return (function j_(e) {
            if (!e) return sa;
            let t, n;
            return (
              "string" == typeof e
                ? ((n = ""),
                  "^" !== e.charAt(0) && (n += "^"),
                  (n += e),
                  "$" !== e.charAt(e.length - 1) && (n += "$"),
                  (t = new RegExp(n)))
                : ((n = e.toString()), (t = e)),
              (r) => {
                if (xn(r.value)) return null;
                const o = r.value;
                return t.test(o)
                  ? null
                  : { pattern: { requiredPattern: n, actualValue: o } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return z_(t);
        }
        static composeAsync(t) {
          return q_(t);
        }
      }
      function sa(e) {
        return null;
      }
      function B_(e) {
        return null != e;
      }
      function H_(e) {
        const t = Fo(e) ? Ae(e) : e;
        return mu(t), t;
      }
      function U_(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? Object.assign(Object.assign({}, t), n) : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function $_(e, t) {
        return t.map((n) => n(e));
      }
      function G_(e) {
        return e.map((t) =>
          (function w1(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function z_(e) {
        if (!e) return null;
        const t = e.filter(B_);
        return 0 == t.length
          ? null
          : function (n) {
              return U_($_(n, t));
            };
      }
      function Jc(e) {
        return null != e ? z_(G_(e)) : null;
      }
      function q_(e) {
        if (!e) return null;
        const t = e.filter(B_);
        return 0 == t.length
          ? null
          : function (n) {
              return (function m1(...e) {
                const t = Kd(e),
                  { args: n, keys: r } = _v(e),
                  o = new pe((i) => {
                    const { length: s } = n;
                    if (!s) return void i.complete();
                    const a = new Array(s);
                    let l = s,
                      u = s;
                    for (let c = 0; c < s; c++) {
                      let d = !1;
                      Ft(n[c]).subscribe(
                        Me(
                          i,
                          (f) => {
                            d || ((d = !0), u--), (a[c] = f);
                          },
                          () => l--,
                          void 0,
                          () => {
                            (!l || !d) &&
                              (u || i.next(r ? Dv(r, a) : a), i.complete());
                          }
                        )
                      );
                    }
                  });
                return t ? o.pipe(Cv(t)) : o;
              })($_(n, t).map(H_)).pipe(J(U_));
            };
      }
      function Xc(e) {
        return null != e ? q_(G_(e)) : null;
      }
      function W_(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function ed(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function aa(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function Y_(e, t) {
        const n = ed(t);
        return (
          ed(e).forEach((o) => {
            aa(n, o) || n.push(o);
          }),
          n
        );
      }
      function K_(e, t) {
        return ed(t).filter((n) => !aa(e, n));
      }
      class J_ {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Jc(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Xc(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class On extends J_ {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class qe extends J_ {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class X_ {
        constructor(t) {
          this._cd = t;
        }
        is(t) {
          var n, r, o;
          return "submitted" === t
            ? !!(null === (n = this._cd) || void 0 === n ? void 0 : n.submitted)
            : !!(null ===
                (o =
                  null === (r = this._cd) || void 0 === r
                    ? void 0
                    : r.control) || void 0 === o
                ? void 0
                : o[t]);
        }
      }
      let eC = (() => {
          class e extends X_ {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(On, 2));
            }),
            (e.ɵdir = S({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  ds("ng-untouched", r.is("untouched"))(
                    "ng-touched",
                    r.is("touched")
                  )("ng-pristine", r.is("pristine"))("ng-dirty", r.is("dirty"))(
                    "ng-valid",
                    r.is("valid")
                  )("ng-invalid", r.is("invalid"))(
                    "ng-pending",
                    r.is("pending")
                  );
              },
              features: [q],
            })),
            e
          );
        })(),
        tC = (() => {
          class e extends X_ {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(_(qe, 10));
            }),
            (e.ɵdir = S({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  ds("ng-untouched", r.is("untouched"))(
                    "ng-touched",
                    r.is("touched")
                  )("ng-pristine", r.is("pristine"))("ng-dirty", r.is("dirty"))(
                    "ng-valid",
                    r.is("valid")
                  )("ng-invalid", r.is("invalid"))(
                    "ng-pending",
                    r.is("pending")
                  )("ng-submitted", r.is("submitted"));
              },
              features: [q],
            })),
            e
          );
        })();
      function ci(e, t) {
        rd(e, t),
          t.valueAccessor.writeValue(e.value),
          (function O1(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && rC(e, t);
            });
          })(e, t),
          (function T1(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function P1(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && rC(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function I1(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function da(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function rd(e, t) {
        const n = (function Q_(e) {
          return e._rawValidators;
        })(e);
        null !== t.validator
          ? e.setValidators(W_(n, t.validator))
          : "function" == typeof n && e.setValidators([n]);
        const r = (function Z_(e) {
          return e._rawAsyncValidators;
        })(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(W_(r, t.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const o = () => e.updateValueAndValidity();
        da(t._rawValidators, o), da(t._rawAsyncValidators, o);
      }
      function rC(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function sd(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const di = "VALID",
        ha = "INVALID",
        Jr = "PENDING",
        fi = "DISABLED";
      function ld(e) {
        return (pa(e) ? e.validators : e) || null;
      }
      function sC(e) {
        return Array.isArray(e) ? Jc(e) : e || null;
      }
      function ud(e, t) {
        return (pa(t) ? t.asyncValidators : e) || null;
      }
      function aC(e) {
        return Array.isArray(e) ? Xc(e) : e || null;
      }
      function pa(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      const cd = (e) => e instanceof fd;
      function uC(e) {
        return ((e) => e instanceof ga)(e) ? e.value : e.getRawValue();
      }
      function cC(e, t) {
        const n = cd(e),
          r = e.controls;
        if (!(n ? Object.keys(r) : r).length) throw new G(1e3, "");
        if (!r[t]) throw new G(1001, "");
      }
      function dC(e, t) {
        cd(e),
          e._forEachChild((r, o) => {
            if (void 0 === t[o]) throw new G(1002, "");
          });
      }
      class dd {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = t),
            (this._rawAsyncValidators = n),
            (this._composedValidatorFn = sC(this._rawValidators)),
            (this._composedAsyncValidatorFn = aC(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === di;
        }
        get invalid() {
          return this.status === ha;
        }
        get pending() {
          return this.status == Jr;
        }
        get disabled() {
          return this.status === fi;
        }
        get enabled() {
          return this.status !== fi;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          (this._rawValidators = t), (this._composedValidatorFn = sC(t));
        }
        setAsyncValidators(t) {
          (this._rawAsyncValidators = t),
            (this._composedAsyncValidatorFn = aC(t));
        }
        addValidators(t) {
          this.setValidators(Y_(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(Y_(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(K_(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(K_(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return aa(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return aa(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Jr),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = fi),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: n })
            ),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = di),
            this._forEachChild((r) => {
              r.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: n })
            ),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === di || this.status === Jr) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? fi : di;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Jr), (this._hasOwnPendingAsyncValidator = !0);
            const n = H_(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          return (function k1(e, t, n) {
            if (
              null == t ||
              (Array.isArray(t) || (t = t.split(n)),
              Array.isArray(t) && 0 === t.length)
            )
              return null;
            let r = e;
            return (
              t.forEach((o) => {
                r = cd(r)
                  ? r.controls.hasOwnProperty(o)
                    ? r.controls[o]
                    : null
                  : (((e) => e instanceof L1)(r) && r.at(o)) || null;
              }),
              r
            );
          })(this, t, ".");
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new se()), (this.statusChanges = new se());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? fi
            : this.errors
            ? ha
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Jr)
            ? Jr
            : this._anyControlsHaveStatus(ha)
            ? ha
            : di;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          pa(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class ga extends dd {
        constructor(t = null, n, r) {
          super(ld(n), ud(r, n)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(t),
            this._setUpdateStrategy(n),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            pa(n) &&
              n.initialValueIsDefault &&
              (this.defaultValue = this._isBoxedValue(t) ? t.value : t);
        }
        setValue(t, n = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== n.emitModelToViewChange &&
              this._onChange.forEach((r) =>
                r(this.value, !1 !== n.emitViewToModelChange)
              ),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          this.setValue(t, n);
        }
        reset(t = this.defaultValue, n = {}) {
          this._applyFormState(t),
            this.markAsPristine(n),
            this.markAsUntouched(n),
            this.setValue(this.value, n),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          sd(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          sd(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class fd extends dd {
        constructor(t, n, r) {
          super(ld(n), ud(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          dC(this, t),
            Object.keys(t).forEach((r) => {
              cC(this, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              this.controls[r] &&
                this.controls[r].patchValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren({}, (t, n, r) => ((t[r] = uC(n)), t));
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const n of Object.keys(this.controls)) {
            const r = this.controls[n];
            if (this.contains(n) && t(r)) return !0;
          }
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((n.enabled || this.disabled) && (t[r] = n.value), t)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((o, i) => {
              r = n(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
      }
      class L1 extends dd {
        constructor(t, n, r) {
          super(ld(n), ud(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(t) {
          return this.controls[t];
        }
        push(t, n = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, n, r = {}) {
          this.controls.splice(t, 0, n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        removeAt(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            n && (this.controls.splice(t, 0, n), this._registerControl(n)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, n = {}) {
          dC(this, t),
            t.forEach((r, o) => {
              cC(this, o),
                this.at(o).setValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (t.forEach((r, o) => {
              this.at(o) &&
                this.at(o).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = [], n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this.controls.map((t) => uC(t));
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((n) => n._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (n, r) => !!r._syncPendingControls() || n,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          this.controls.forEach((n, r) => {
            t(n, r);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((n) => n.enabled && t(n));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const j1 = { provide: qe, useExisting: X(() => ma) },
        hi = (() => Promise.resolve(null))();
      let ma = (() => {
        class e extends qe {
          constructor(n, r) {
            super(),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new se()),
              (this.form = new fd({}, Jc(n), Xc(r)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(n) {
            hi.then(() => {
              const r = this._findContainer(n.path);
              (n.control = r.registerControl(n.name, n.control)),
                ci(n.control, n),
                n.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(n);
            });
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            hi.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name), this._directives.delete(n);
            });
          }
          addFormGroup(n) {
            hi.then(() => {
              const r = this._findContainer(n.path),
                o = new fd({});
              (function oC(e, t) {
                rd(e, t);
              })(o, n),
                r.registerControl(n.name, o),
                o.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(n) {
            hi.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name);
            });
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            hi.then(() => {
              this.form.get(n.path).setValue(r);
            });
          }
          setValue(n) {
            this.control.setValue(n);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function iC(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this._directives),
              this.ngSubmit.emit(n),
              !1
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n) {
            this.form.reset(n), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(n) {
            return n.pop(), n.length ? this.form.get(n) : this.form;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(_(ke, 10), _(In, 10));
          }),
          (e.ɵdir = S({
            type: e,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                ye("submit", function (i) {
                  return r.onSubmit(i);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [ie([j1]), q],
          })),
          e
        );
      })();
      const H1 = { provide: On, useExisting: X(() => hd) },
        pC = (() => Promise.resolve(null))();
      let hd = (() => {
          class e extends On {
            constructor(n, r, o, i, s) {
              super(),
                (this._changeDetectorRef = s),
                (this.control = new ga()),
                (this._registered = !1),
                (this.update = new se()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function id(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === ia
                        ? (n = i)
                        : (function R1(e) {
                            return Object.getPrototypeOf(e.constructor) === Xn;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function od(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              ci(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              pC.then(() => {
                var r;
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  null === (r = this._changeDetectorRef) ||
                    void 0 === r ||
                    r.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o = "" === r || (r && "false" !== r);
              pC.then(() => {
                var i;
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  null === (i = this._changeDetectorRef) ||
                    void 0 === i ||
                    i.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function ua(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                _(qe, 9),
                _(ke, 10),
                _(In, 10),
                _(Yt, 10),
                _(bs, 8)
              );
            }),
            (e.ɵdir = S({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [ie([H1]), q, dt],
            })),
            e
          );
        })(),
        gC = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = S({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            e
          );
        })(),
        yC = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = lt({ type: e })),
            (e.ɵinj = Ke({})),
            e
          );
        })(),
        fN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = lt({ type: e })),
            (e.ɵinj = Ke({ imports: [[yC]] })),
            e
          );
        })(),
        hN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = lt({ type: e })),
            (e.ɵinj = Ke({ imports: [fN] })),
            e
          );
        })(),
        pN = (() => {
          class e {
            constructor() {
              this.noteAdd = new se();
            }
            onSubmit() {
              const n = { heading: this.heading, content: this.content },
                r = new ga(this.heading, P_.required);
              "VALID" === new ga(this.content, P_.required).status
                ? "VALID" === r.status
                  ? (this.noteAdd.emit(n),
                    (this.message = "Saved Successfully"))
                  : (this.message = "Check Your Heading")
                : (this.message = "Check Your Content");
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Rn({
              type: e,
              selectors: [["app-note-element"]],
              outputs: { noteAdd: "noteAdd" },
              decls: 21,
              vars: 3,
              consts: [
                [1, "py-14", "px-2", "bg-slate-100", "space-y-14"],
                [
                  1,
                  "text-4xl",
                  "font-bold",
                  "text-purple-700",
                  "text-center",
                  "underline",
                ],
                [1, "flex", "space-x-40", "ml-11"],
                [1, "flex", "items-center", "w-64", "ml-20"],
                ["src", "./assets/note.png", "alt", "Diary"],
                [
                  1,
                  "flex",
                  "flex-col",
                  "items-center",
                  "w-110",
                  "shadow-2xl",
                  "p-5",
                  "rounded-3xl",
                ],
                [1, "flex", "flex-col", "space-y-5", "w-full", 3, "ngSubmit"],
                [
                  "for",
                  "heading",
                  1,
                  "text-2xl",
                  "font-serif",
                  "text-purple-900",
                ],
                [
                  "type",
                  "text",
                  "id",
                  "heading",
                  "name",
                  "heading",
                  1,
                  "border-2",
                  "border-rose-500",
                  "rounded-lg",
                  "my-5",
                  "p-5",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  "for",
                  "content",
                  1,
                  "text-2xl",
                  "font-serif",
                  "text-purple-900",
                ],
                [
                  "name",
                  "content",
                  1,
                  "border-2",
                  "border-rose-500",
                  "rounded-lg",
                  "my-5",
                  "h-32",
                  "p-5",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  "type",
                  "submit",
                  1,
                  "rounded-xl",
                  "bg-blue-900",
                  "text-white",
                  "p-3",
                ],
                [1, ""],
                [1, "text-3xl", "text-yellow-600", "text-center"],
              ],
              template: function (n, r) {
                1 & n &&
                  (oe(0, "main", 0)(1, "p", 1),
                  $e(2, " Add a Note "),
                  ce(),
                  oe(3, "div", 2)(4, "div", 3),
                  Vr(5, "img", 4),
                  ce(),
                  oe(6, "div", 5)(7, "form", 6),
                  ye("ngSubmit", function () {
                    return r.onSubmit();
                  }),
                  oe(8, "label", 7),
                  $e(9, "Heading"),
                  ce(),
                  oe(10, "input", 8),
                  ye("ngModelChange", function (i) {
                    return (r.heading = i);
                  }),
                  ce(),
                  oe(11, "label", 9),
                  $e(12, "Content "),
                  ce(),
                  oe(13, "textarea", 10),
                  ye("ngModelChange", function (i) {
                    return (r.content = i);
                  }),
                  ce(),
                  oe(14, "button", 11),
                  $e(15, " Submit "),
                  ce()()()()(),
                  oe(16, "footer")(17, "div", 12)(18, "p", 13),
                  $e(19),
                  ce()()(),
                  Vr(20, "hr")),
                  2 & n &&
                    (Ht(10),
                    $n("ngModel", r.heading),
                    Ht(3),
                    $n("ngModel", r.content),
                    Ht(6),
                    jr(" ", r.message, " "));
              },
              directives: [gC, tC, ma, ia, eC, hd],
              styles: [
                '*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-content: ""}html[_ngcontent-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body[_ngcontent-%COMP%]{margin:0;line-height:inherit}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{text-transform:none}button[_ngcontent-%COMP%], [type=button][_ngcontent-%COMP%], [type=reset][_ngcontent-%COMP%], [type=submit][_ngcontent-%COMP%]{-webkit-appearance:button;background-color:transparent;background-image:none}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}progress[_ngcontent-%COMP%]{vertical-align:baseline}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[type=search][_ngcontent-%COMP%]{-webkit-appearance:textfield;outline-offset:-2px}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[_ngcontent-%COMP%]{display:list-item}blockquote[_ngcontent-%COMP%], dl[_ngcontent-%COMP%], dd[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], hr[_ngcontent-%COMP%], figure[_ngcontent-%COMP%], p[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{margin:0}fieldset[_ngcontent-%COMP%]{margin:0;padding:0}legend[_ngcontent-%COMP%]{padding:0}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}textarea[_ngcontent-%COMP%]{resize:vertical}input[_ngcontent-%COMP%]::placeholder, textarea[_ngcontent-%COMP%]::placeholder{opacity:1;color:#9ca3af}button[_ngcontent-%COMP%], [role=button][_ngcontent-%COMP%]{cursor:pointer}[_ngcontent-%COMP%]:disabled{cursor:default}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}[hidden][_ngcontent-%COMP%]{display:none}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.mx-2[_ngcontent-%COMP%]{margin-left:.5rem;margin-right:.5rem}.mx-14[_ngcontent-%COMP%]{margin-left:3.5rem;margin-right:3.5rem}.my-5[_ngcontent-%COMP%]{margin-top:1.25rem;margin-bottom:1.25rem}.ml-11[_ngcontent-%COMP%]{margin-left:2.75rem}.ml-20[_ngcontent-%COMP%]{margin-left:5rem}.flex[_ngcontent-%COMP%]{display:flex}.h-110[_ngcontent-%COMP%]{height:36rem}.h-32[_ngcontent-%COMP%]{height:8rem}.w-64[_ngcontent-%COMP%]{width:16rem}.w-110[_ngcontent-%COMP%]{width:36rem}.w-full[_ngcontent-%COMP%]{width:100%}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-end[_ngcontent-%COMP%]{justify-content:flex-end}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.space-x-12[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(3rem * var(--tw-space-x-reverse));margin-left:calc(3rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-14[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(3.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(3.5rem * var(--tw-space-y-reverse))}.space-x-40[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(10rem * var(--tw-space-x-reverse));margin-left:calc(10rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-5[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem * var(--tw-space-y-reverse))}.overflow-y-scroll[_ngcontent-%COMP%]{overflow-y:scroll}.rounded-xl[_ngcontent-%COMP%]{border-radius:.75rem}.rounded-3xl[_ngcontent-%COMP%]{border-radius:1.5rem}.rounded-lg[_ngcontent-%COMP%]{border-radius:.5rem}.border-2[_ngcontent-%COMP%]{border-width:2px}.border-rose-500[_ngcontent-%COMP%]{--tw-border-opacity: 1;border-color:rgb(244 63 94 / var(--tw-border-opacity))}.bg-teal-400[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(45 212 191 / var(--tw-bg-opacity))}.bg-slate-200[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.bg-blue-900[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(30 58 138 / var(--tw-bg-opacity))}.bg-red-500[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(239 68 68 / var(--tw-bg-opacity))}.bg-slate-100[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.p-5[_ngcontent-%COMP%]{padding:1.25rem}.p-3[_ngcontent-%COMP%]{padding:.75rem}.px-7[_ngcontent-%COMP%]{padding-left:1.75rem;padding-right:1.75rem}.py-3[_ngcontent-%COMP%]{padding-top:.75rem;padding-bottom:.75rem}.px-8[_ngcontent-%COMP%]{padding-left:2rem;padding-right:2rem}.py-8[_ngcontent-%COMP%]{padding-top:2rem;padding-bottom:2rem}.py-14[_ngcontent-%COMP%]{padding-top:3.5rem;padding-bottom:3.5rem}.px-2[_ngcontent-%COMP%]{padding-left:.5rem;padding-right:.5rem}.text-center[_ngcontent-%COMP%]{text-align:center}.font-mono[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.font-serif[_ngcontent-%COMP%]{font-family:ui-serif,Georgia,Cambria,Times New Roman,Times,serif}.text-2xl[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem}.text-xl[_ngcontent-%COMP%]{font-size:1.25rem;line-height:1.75rem}.text-4xl[_ngcontent-%COMP%]{font-size:2.25rem;line-height:2.5rem}.text-3xl[_ngcontent-%COMP%]{font-size:1.875rem;line-height:2.25rem}.font-bold[_ngcontent-%COMP%]{font-weight:700}.text-neutral-900[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(23 23 23 / var(--tw-text-opacity))}.text-white[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-black[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-purple-700[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(126 34 206 / var(--tw-text-opacity))}.text-purple-900[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(88 28 135 / var(--tw-text-opacity))}.text-yellow-600[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(202 138 4 / var(--tw-text-opacity))}.underline[_ngcontent-%COMP%]{-webkit-text-decoration-line:underline;text-decoration-line:underline}.shadow-2xl[_ngcontent-%COMP%]{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}',
              ],
            })),
            e
          );
        })(),
        gN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = lt({ type: e })),
            (e.ɵinj = Ke({ imports: [[hN]] })),
            e
          );
        })(),
        RC = (() => {
          class e {
            constructor() {
              (this.localItem = localStorage.getItem("notes")),
                (this.notes =
                  null == this.localItem ? [] : JSON.parse(this.localItem));
            }
            ngOnInit() {}
            noteAddition(n) {
              console.log(n),
                this.notes.push(n),
                localStorage.setItem("notes", JSON.stringify(this.notes));
            }
            deleteNote(n) {
              this.notes.splice(n, 1),
                localStorage.setItem("notes", JSON.stringify(this.notes));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Rn({
              type: e,
              selectors: [["app-note"]],
              decls: 1,
              vars: 0,
              consts: [[3, "noteAdd"]],
              template: function (n, r) {
                1 & n &&
                  (oe(0, "app-note-element", 0),
                  ye("noteAdd", function (i) {
                    return r.noteAddition(i);
                  }),
                  ce());
              },
              directives: [pN],
              styles: [
                '*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-content: ""}html[_ngcontent-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body[_ngcontent-%COMP%]{margin:0;line-height:inherit}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{text-transform:none}button[_ngcontent-%COMP%], [type=button][_ngcontent-%COMP%], [type=reset][_ngcontent-%COMP%], [type=submit][_ngcontent-%COMP%]{-webkit-appearance:button;background-color:transparent;background-image:none}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}progress[_ngcontent-%COMP%]{vertical-align:baseline}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[type=search][_ngcontent-%COMP%]{-webkit-appearance:textfield;outline-offset:-2px}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[_ngcontent-%COMP%]{display:list-item}blockquote[_ngcontent-%COMP%], dl[_ngcontent-%COMP%], dd[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], hr[_ngcontent-%COMP%], figure[_ngcontent-%COMP%], p[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{margin:0}fieldset[_ngcontent-%COMP%]{margin:0;padding:0}legend[_ngcontent-%COMP%]{padding:0}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}textarea[_ngcontent-%COMP%]{resize:vertical}input[_ngcontent-%COMP%]::placeholder, textarea[_ngcontent-%COMP%]::placeholder{opacity:1;color:#9ca3af}button[_ngcontent-%COMP%], [role=button][_ngcontent-%COMP%]{cursor:pointer}[_ngcontent-%COMP%]:disabled{cursor:default}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}[hidden][_ngcontent-%COMP%]{display:none}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.mx-2[_ngcontent-%COMP%]{margin-left:.5rem;margin-right:.5rem}.mx-14[_ngcontent-%COMP%]{margin-left:3.5rem;margin-right:3.5rem}.my-5[_ngcontent-%COMP%]{margin-top:1.25rem;margin-bottom:1.25rem}.ml-11[_ngcontent-%COMP%]{margin-left:2.75rem}.ml-20[_ngcontent-%COMP%]{margin-left:5rem}.flex[_ngcontent-%COMP%]{display:flex}.h-110[_ngcontent-%COMP%]{height:36rem}.h-32[_ngcontent-%COMP%]{height:8rem}.w-64[_ngcontent-%COMP%]{width:16rem}.w-110[_ngcontent-%COMP%]{width:36rem}.w-full[_ngcontent-%COMP%]{width:100%}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-end[_ngcontent-%COMP%]{justify-content:flex-end}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.space-x-12[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(3rem * var(--tw-space-x-reverse));margin-left:calc(3rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-14[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(3.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(3.5rem * var(--tw-space-y-reverse))}.space-x-40[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(10rem * var(--tw-space-x-reverse));margin-left:calc(10rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-5[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem * var(--tw-space-y-reverse))}.overflow-y-scroll[_ngcontent-%COMP%]{overflow-y:scroll}.rounded-xl[_ngcontent-%COMP%]{border-radius:.75rem}.rounded-3xl[_ngcontent-%COMP%]{border-radius:1.5rem}.rounded-lg[_ngcontent-%COMP%]{border-radius:.5rem}.border-2[_ngcontent-%COMP%]{border-width:2px}.border-rose-500[_ngcontent-%COMP%]{--tw-border-opacity: 1;border-color:rgb(244 63 94 / var(--tw-border-opacity))}.bg-teal-400[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(45 212 191 / var(--tw-bg-opacity))}.bg-slate-200[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.bg-blue-900[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(30 58 138 / var(--tw-bg-opacity))}.bg-red-500[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(239 68 68 / var(--tw-bg-opacity))}.bg-slate-100[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.p-5[_ngcontent-%COMP%]{padding:1.25rem}.p-3[_ngcontent-%COMP%]{padding:.75rem}.px-7[_ngcontent-%COMP%]{padding-left:1.75rem;padding-right:1.75rem}.py-3[_ngcontent-%COMP%]{padding-top:.75rem;padding-bottom:.75rem}.px-8[_ngcontent-%COMP%]{padding-left:2rem;padding-right:2rem}.py-8[_ngcontent-%COMP%]{padding-top:2rem;padding-bottom:2rem}.py-14[_ngcontent-%COMP%]{padding-top:3.5rem;padding-bottom:3.5rem}.px-2[_ngcontent-%COMP%]{padding-left:.5rem;padding-right:.5rem}.text-center[_ngcontent-%COMP%]{text-align:center}.font-mono[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.font-serif[_ngcontent-%COMP%]{font-family:ui-serif,Georgia,Cambria,Times New Roman,Times,serif}.text-2xl[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem}.text-xl[_ngcontent-%COMP%]{font-size:1.25rem;line-height:1.75rem}.text-4xl[_ngcontent-%COMP%]{font-size:2.25rem;line-height:2.5rem}.text-3xl[_ngcontent-%COMP%]{font-size:1.875rem;line-height:2.25rem}.font-bold[_ngcontent-%COMP%]{font-weight:700}.text-neutral-900[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(23 23 23 / var(--tw-text-opacity))}.text-white[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-black[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-purple-700[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(126 34 206 / var(--tw-text-opacity))}.text-purple-900[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(88 28 135 / var(--tw-text-opacity))}.text-yellow-600[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(202 138 4 / var(--tw-text-opacity))}.underline[_ngcontent-%COMP%]{-webkit-text-decoration-line:underline;text-decoration-line:underline}.shadow-2xl[_ngcontent-%COMP%]{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}',
              ],
            })),
            e
          );
        })(),
        mN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = lt({ type: e })),
            (e.ɵinj = Ke({ imports: [[gN]] })),
            e
          );
        })();
      function yN(e, t) {
        if ((1 & e && (oe(0, "pre", 11), $e(1), ce()), 2 & e)) {
          const n = Gn().$implicit;
          Ht(1), Cu(n.content);
        }
      }
      function vN(e, t) {
        if (
          (1 & e &&
            (oe(0, "p", 11),
            $e(1),
            (function Bm(e, t) {
              const n = z();
              let r;
              const o = e + 20;
              n.firstCreatePass
                ? ((r = (function CS(e, t) {
                    if (t)
                      for (let n = t.length - 1; n >= 0; n--) {
                        const r = t[n];
                        if (e === r.name) return r;
                      }
                  })(t, n.pipeRegistry)),
                  (n.data[o] = r),
                  r.onDestroy &&
                    (n.destroyHooks || (n.destroyHooks = [])).push(
                      o,
                      r.onDestroy
                    ))
                : (r = n.data[o]);
              const i = r.factory || (r.factory = Bn(r.type)),
                s = pn(_);
              try {
                const a = ji(!1),
                  l = i();
                return (
                  ji(a),
                  (function j0(e, t, n, r) {
                    n >= e.data.length &&
                      ((e.data[n] = null), (e.blueprint[n] = null)),
                      (t[n] = r);
                  })(n, y(), o, l),
                  l
                );
              } finally {
                pn(s);
              }
            })(2, "compress"),
            ce()),
          2 & e)
        ) {
          const n = Gn().$implicit;
          Ht(1), jr("", Hm(2, 1, n.content), "...");
        }
      }
      function _N(e, t) {
        if (1 & e) {
          const n = (function sg() {
            return y();
          })();
          oe(0, "div", 2)(1, "div", 3)(2, "p", 4),
            $e(3),
            ce(),
            oe(4, "div", 5),
            us(5, yN, 2, 1, "pre", 6),
            us(6, vN, 3, 3, "ng-template", null, 7, Ym),
            oe(8, "div", 8)(9, "button", 9),
            ye("click", function () {
              const i = Ii(n).index;
              return Gn().expand(i);
            }),
            $e(10, " Expand "),
            ce(),
            oe(11, "button", 9),
            ye("click", function () {
              const i = Ii(n).index;
              return Gn().contract(i);
            }),
            $e(12, " Contract "),
            ce(),
            oe(13, "button", 10),
            ye("click", function () {
              const i = Ii(n).index;
              return Gn().deleteNote(i);
            }),
            $e(14, " Delete "),
            ce()()()()();
        }
        if (2 & e) {
          const n = t.$implicit,
            r = t.index,
            o = (function Qp(e) {
              return ar(
                (function rw() {
                  return x.lFrame.contextLView;
                })(),
                20 + e
              );
            })(7),
            i = Gn();
          Ht(1),
            $n("ngClass", r % 2 == 0 ? "even p-5" : "p-5"),
            Ht(2),
            jr(" ", n.heading, " "),
            Ht(2),
            $n("ngIf", i.targetIndex === r)("ngIfElse", o);
        }
      }
      let CN = (() => {
        class e {
          transform(n) {
            return n.slice(0, 42);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵpipe = Le({ name: "compress", type: e, pure: !0 })),
          e
        );
      })();
      const wN = [
        {
          path: "",
          component: (() => {
            class e extends RC {
              constructor() {
                super(),
                  (this.targetIndex = -1),
                  (this.isCompressed = !0),
                  (this.deleteIndex = new se()),
                  (this.noteList = this.notes),
                  console.log(this.noteList);
              }
              expand(n) {
                console.log("expand", n), (this.targetIndex = n);
              }
              contract(n) {
                console.log("Contract", n), (this.targetIndex = -1);
              }
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)();
              }),
              (e.ɵcmp = Rn({
                type: e,
                selectors: [["app-home"]],
                outputs: { deleteIndex: "deleteIndex" },
                features: [q],
                decls: 2,
                vars: 1,
                consts: [
                  [
                    1,
                    "mx-2",
                    "my-5",
                    "bg-slate-200",
                    "overflow-y-scroll",
                    "h-110",
                  ],
                  ["class", "px-8 py-8", 4, "ngFor", "ngForOf"],
                  [1, "px-8", "py-8"],
                  [3, "ngClass"],
                  [1, "text-2xl", "text-neutral-900", "font-mono", "font-bold"],
                  [1, "flex", "justify-between"],
                  ["class", "", 4, "ngIf", "ngIfElse"],
                  ["elseBlock", ""],
                  [1, "flex", "space-x-2", "items-center"],
                  [
                    1,
                    "rounded-xl",
                    "bg-blue-900",
                    "text-white",
                    "p-3",
                    3,
                    "click",
                  ],
                  [
                    1,
                    "rounded-xl",
                    "bg-red-500",
                    "text-black",
                    "p-3",
                    3,
                    "click",
                  ],
                  [1, ""],
                ],
                template: function (n, r) {
                  1 & n && (oe(0, "main", 0), us(1, _N, 15, 4, "div", 1), ce()),
                    2 & n && (Ht(1), $n("ngForOf", r.noteList));
                },
                directives: [Xy, Jy, tv],
                pipes: [CN],
                styles: [
                  '*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-content: ""}html[_ngcontent-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body[_ngcontent-%COMP%]{margin:0;line-height:inherit}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{text-transform:none}button[_ngcontent-%COMP%], [type=button][_ngcontent-%COMP%], [type=reset][_ngcontent-%COMP%], [type=submit][_ngcontent-%COMP%]{-webkit-appearance:button;background-color:transparent;background-image:none}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}progress[_ngcontent-%COMP%]{vertical-align:baseline}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[type=search][_ngcontent-%COMP%]{-webkit-appearance:textfield;outline-offset:-2px}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[_ngcontent-%COMP%]{display:list-item}blockquote[_ngcontent-%COMP%], dl[_ngcontent-%COMP%], dd[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], hr[_ngcontent-%COMP%], figure[_ngcontent-%COMP%], p[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{margin:0}fieldset[_ngcontent-%COMP%]{margin:0;padding:0}legend[_ngcontent-%COMP%]{padding:0}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}textarea[_ngcontent-%COMP%]{resize:vertical}input[_ngcontent-%COMP%]::placeholder, textarea[_ngcontent-%COMP%]::placeholder{opacity:1;color:#9ca3af}button[_ngcontent-%COMP%], [role=button][_ngcontent-%COMP%]{cursor:pointer}[_ngcontent-%COMP%]:disabled{cursor:default}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}[hidden][_ngcontent-%COMP%]{display:none}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.mx-2[_ngcontent-%COMP%]{margin-left:.5rem;margin-right:.5rem}.mx-14[_ngcontent-%COMP%]{margin-left:3.5rem;margin-right:3.5rem}.my-5[_ngcontent-%COMP%]{margin-top:1.25rem;margin-bottom:1.25rem}.ml-11[_ngcontent-%COMP%]{margin-left:2.75rem}.ml-20[_ngcontent-%COMP%]{margin-left:5rem}.flex[_ngcontent-%COMP%]{display:flex}.h-110[_ngcontent-%COMP%]{height:36rem}.h-32[_ngcontent-%COMP%]{height:8rem}.w-64[_ngcontent-%COMP%]{width:16rem}.w-110[_ngcontent-%COMP%]{width:36rem}.w-full[_ngcontent-%COMP%]{width:100%}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-end[_ngcontent-%COMP%]{justify-content:flex-end}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.space-x-12[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(3rem * var(--tw-space-x-reverse));margin-left:calc(3rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-14[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(3.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(3.5rem * var(--tw-space-y-reverse))}.space-x-40[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(10rem * var(--tw-space-x-reverse));margin-left:calc(10rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-5[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:not([hidden]) ~ [_ngcontent-%COMP%]:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem * var(--tw-space-y-reverse))}.overflow-y-scroll[_ngcontent-%COMP%]{overflow-y:scroll}.rounded-xl[_ngcontent-%COMP%]{border-radius:.75rem}.rounded-3xl[_ngcontent-%COMP%]{border-radius:1.5rem}.rounded-lg[_ngcontent-%COMP%]{border-radius:.5rem}.border-2[_ngcontent-%COMP%]{border-width:2px}.border-rose-500[_ngcontent-%COMP%]{--tw-border-opacity: 1;border-color:rgb(244 63 94 / var(--tw-border-opacity))}.bg-teal-400[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(45 212 191 / var(--tw-bg-opacity))}.bg-slate-200[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.bg-blue-900[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(30 58 138 / var(--tw-bg-opacity))}.bg-red-500[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(239 68 68 / var(--tw-bg-opacity))}.bg-slate-100[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.p-5[_ngcontent-%COMP%]{padding:1.25rem}.p-3[_ngcontent-%COMP%]{padding:.75rem}.px-7[_ngcontent-%COMP%]{padding-left:1.75rem;padding-right:1.75rem}.py-3[_ngcontent-%COMP%]{padding-top:.75rem;padding-bottom:.75rem}.px-8[_ngcontent-%COMP%]{padding-left:2rem;padding-right:2rem}.py-8[_ngcontent-%COMP%]{padding-top:2rem;padding-bottom:2rem}.py-14[_ngcontent-%COMP%]{padding-top:3.5rem;padding-bottom:3.5rem}.px-2[_ngcontent-%COMP%]{padding-left:.5rem;padding-right:.5rem}.text-center[_ngcontent-%COMP%]{text-align:center}.font-mono[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.font-serif[_ngcontent-%COMP%]{font-family:ui-serif,Georgia,Cambria,Times New Roman,Times,serif}.text-2xl[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem}.text-xl[_ngcontent-%COMP%]{font-size:1.25rem;line-height:1.75rem}.text-4xl[_ngcontent-%COMP%]{font-size:2.25rem;line-height:2.5rem}.text-3xl[_ngcontent-%COMP%]{font-size:1.875rem;line-height:2.25rem}.font-bold[_ngcontent-%COMP%]{font-weight:700}.text-neutral-900[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(23 23 23 / var(--tw-text-opacity))}.text-white[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-black[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-purple-700[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(126 34 206 / var(--tw-text-opacity))}.text-purple-900[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(88 28 135 / var(--tw-text-opacity))}.text-yellow-600[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(202 138 4 / var(--tw-text-opacity))}.underline[_ngcontent-%COMP%]{-webkit-text-decoration-line:underline;text-decoration-line:underline}.shadow-2xl[_ngcontent-%COMP%]{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.even[_ngcontent-%COMP%]{background-color:#0ff}',
                ],
              })),
              e
            );
          })(),
        },
        { path: "notes", component: RC },
      ];
      let bN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = lt({ type: e })),
            (e.ɵinj = Ke({ imports: [[E_.forRoot(wN)], E_] })),
            e
          );
        })(),
        MN = (() => {
          class e {
            constructor() {
              this.title = "NotesKeeper";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Rn({
              type: e,
              selectors: [["app-root"]],
              decls: 11,
              vars: 0,
              consts: [
                [1, "bg-teal-400", "mx-2", "flex", "justify-between"],
                [1, "flex", "items-center"],
                [1, "text-2xl", "px-7", "text-black-900", "font-mono"],
                [
                  1,
                  "flex",
                  "text-xl",
                  "space-x-12",
                  "mx-14",
                  "py-3",
                  "justify-end",
                ],
                ["routerLink", "/", 1, "cursor-pointer"],
                ["routerLink", "/notes", 1, "cursor-pointer"],
              ],
              template: function (n, r) {
                1 & n &&
                  (oe(0, "div", 0)(1, "div", 1)(2, "h1", 2),
                  $e(3, "Notes Keeper"),
                  ce()(),
                  oe(4, "nav")(5, "ul", 3)(6, "li", 4),
                  $e(7, "Saved Notes"),
                  ce(),
                  oe(8, "li", 5),
                  $e(9, "Add a Note"),
                  ce()()()(),
                  Vr(10, "router-outlet"));
              },
              directives: [oa, Gc],
              styles: [""],
            })),
            e
          );
        })(),
        EN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = lt({ type: e, bootstrap: [MN] })),
            (e.ɵinj = Ke({ providers: [], imports: [[jO, bN, mN]] })),
            e
          );
        })();
      (function wx() {
        xy = !1;
      })(),
        VO()
          .bootstrapModule(EN)
          .catch((e) => console.error(e));
    },
  },
  (K) => {
    K((K.s = 904));
  },
]);

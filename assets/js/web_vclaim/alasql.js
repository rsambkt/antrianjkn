var DO_NOT_EXPORT_CODEPAGE,DO_NOT_EXPORT_JSZIP,cptable,XLSX,XLS,ODS;
(function(n, t) {
    typeof define=="function"&&define.amd?define([], t): typeof exports=="object"?module.exports=t(): n.alasql=t()
}

)(this, function() {
    function at(n) {
        return"(y="+n+",y===y?y:undefined)"
    }
    function b(n, t) {
        return"(y="+n+',typeof y=="undefined"?undefined:'+t+")"
    }
    function a() {
        return!0
    }
    function ii() {}
    function ui() {
        var n=navigator.userAgent.toLowerCase();
        return n.indexOf("msie")!==-1?parseInt(n.split("msie")[1]): !1
    }
    function ur(i, r, u) {
        function f(t, i, u) {
            var o=t[i], ut=1e5, g, d, ot, nt, tt, it, rt, w, l, a, c, e, p, v, st, y;
            if(o.selid) {
                if(o.selid==="PATH") {
                    for(var ft=[ {
                        node: u, stack: []
                    }
                    ], ht= {}
                    , et=n.databases[n.useid].objects;
                    ft.length>0;
                    ) {
                        var ct=ft.shift(), b=ct.node, k=ct.stack, p=f(o.args, 0, b);
                        if(p.length>0)return i+1+1>t.length?k:(g=[], k&&k.length>0&&k.forEach(function(n) {
                            g=g.concat(f(t, i+1, n))
                        }
                        ), g);
                        if(typeof ht[b.$id]!="undefined")continue;
                        else ht[b.$id]=!0, b.$out&&b.$out.length>0&&b.$out.forEach(function(n) {
                            var t=et[n], i=k.concat(t);
                            i.push(et[t.$out[0]]);
                            ft.push( {
                                node: et[t.$out[0]], stack: i
                            }
                            )
                        }
                        )
                    }
                    return[]
                }
                if(o.selid==="NOT")return e=f(o.args, 0, u), e.length>0?[]:i+1+1>t.length?[u]:f(t, i+1, u);
                if(o.selid==="DISTINCT")return e=typeof o.args=="undefined"||o.args.length===0?yt(u):f(o.args, 0, u), e.length===0?[]:(v=yt(e), i+1+1>t.length?v:f(t, i+1, v));
                if(o.selid==="AND")return v=!0, o.args.forEach(function(n) {
                    v=v&&f(n, 0, u).length>0
                }
                ), v?i+1+1>t.length?[u]:f(t, i+1, u):[];
                if(o.selid==="OR")return v=!1, o.args.forEach(function(n) {
                    v=v||f(n, 0, u).length>0
                }
                ), v?i+1+1>t.length?[u]:f(t, i+1, u):[];
                if(o.selid==="ALL")return e=f(o.args[0], 0, u), e.length===0?[]:i+1+1>t.length?e:f(t, i+1, e);
                if(o.selid==="ANY")return e=f(o.args[0], 0, u), e.length===0?[]:i+1+1>t.length?[e[0]]:f(t, i+1, [e[0]]);
                if(o.selid==="UNIONALL")return e=[], o.args.forEach(function(n) {
                    e=e.concat(f(n, 0, u))
                }
                ), e.length===0?[]:i+1+1>t.length?e:f(t, i+1, e);
                if(o.selid==="UNION")return e=[], o.args.forEach(function(n) {
                    e=e.concat(f(n, 0, u))
                }
                ), e=yt(e), e.length===0?[]:i+1+1>t.length?e:f(t, i+1, e);
                if(o.selid==="IF")return e=f(o.args, 0, u), e.length===0?[]:i+1+1>t.length?[u]:f(t, i+1, u);
                if(o.selid==="REPEAT") {
                    if(nt=o.args[0].value, ot=o.args[1]?o.args[1].value: nt, o.args[2]&&(d=o.args[2].variable), c=[], nt===0&&(i+1+1>t.length?c=[u]: (d&&(n.vars[d]=0), c=c.concat(f(t, i+1, u)))), ot>0)for(a=[ {
                        value: u, lvl: 1
                    }
                    ], y=0;
                    a.length>0;
                    )if(e=a[0], a.shift(), e.lvl<=ot&&(d&&(n.vars[d]=e.lvl), tt=f(o.sels, 0, e.value), tt.forEach(function(n) {
                        a.push( {
                            value: n, lvl: e.lvl+1
                        }
                        )
                    }
                    ), e.lvl>=nt&&(i+1+1>t.length?c=c.concat(tt):tt.forEach(function(n) {
                        c=c.concat(f(t, i+1, n))
                    }
                    ))), y++, y>ut)throw new Error("Security brake. Number of iterations = "+y);
                    return c
                }
                if(o.selid==="OF")return i+1+1>t.length?[u]:(w=[], Object.keys(u).forEach(function(r) {
                    n.vars[o.args[0].variable]=r;
                    w=w.concat(f(t, i+1, u[r]))
                }
                ), w);
                if(o.selid==="TO")return it=n.vars[o.args[0]], rt=[], rt=it!==undefined?it.slice(0):[], rt.push(u), i+1+1>t.length?[u]:(n.vars[o.args[0]]=rt, w=f(t, i+1, u), n.vars[o.args[0]]=it, w);
                if(o.selid==="ARRAY") {
                    if(e=f(o.args, 0, u), e.length>0)l=e;
                    else return[];
                    return i+1+1>t.length?[l]: f(t, i+1, l)
                }
                if(o.selid==="SUM") {
                    if(e=f(o.args, 0, u), e.length>0)l=e.reduce(function(n, t) {
                        return n+t
                    }
                    , 0);
                    else return[];
                    return i+1+1>t.length?[l]:f(t, i+1, l)
                }
                if(o.selid==="AVG") {
                    if(e=f(o.args, 0, u), e.length>0)l=e.reduce(function(n, t) {
                        return n+t
                    }
                    , 0)/e.length;
                    else return[];
                    return i+1+1>t.length?[l]:f(t, i+1, l)
                }
                if(o.selid==="COUNT") {
                    if(e=f(o.args, 0, u), e.length>0)l=e.length;
                    else return[];
                    return i+1+1>t.length?[l]: f(t, i+1, l)
                }
                if(o.selid==="FIRST") {
                    if(e=f(o.args, 0, u), e.length>0)l=e[0];
                    else return[];
                    return i+1+1>t.length?[l]: f(t, i+1, l)
                }
                if(o.selid==="LAST") {
                    if(e=f(o.args, 0, u), e.length>0)l=e[e.length-1];
                    else return[];
                    return i+1+1>t.length?[l]: f(t, i+1, l)
                }
                if(o.selid==="MIN")return(e=f(o.args, 0, u), e.length===0)?[]:(l=e.reduce(function(n, t) {
                    return Math.min(n, t)
                }
                , Infinity), i+1+1>t.length?[l]:f(t, i+1, l));
                if(o.selid==="MAX")return(e=f(o.args, 0, u), e.length===0)?[]:(l=e.reduce(function(n, t) {
                    return Math.max(n, t)
                }
                , -Infinity), i+1+1>t.length?[l]:f(t, i+1, l));
                if(o.selid==="PLUS") {
                    for(c=[], a=f(o.args, 0, u).slice(), i+1+1>t.length?c=c.concat(a):a.forEach(function(n) {
                        c=c.concat(f(t, i+1, n))
                    }
                    ), y=0;
                    a.length>0;
                    )if(e=a.shift(), e=f(o.args, 0, e), a=a.concat(e), i+1+1>t.length?c=c.concat(e):e.forEach(function(n) {
                        var r=f(t, i+1, n);
                        c=c.concat(r)
                    }
                    ), y++, y>ut)throw new Error("Security brake. Number of iterations = "+y);
                    return c
                }
                if(o.selid==="STAR") {
                    for(c=[], c=f(t, i+1, u), a=f(o.args, 0, u).slice(), i+1+1>t.length?c=c.concat(a):a.forEach(function(n) {
                        c=c.concat(f(t, i+1, n))
                    }
                    ), y=0;
                    a.length>0;
                    )if(e=a[0], a.shift(), e=f(o.args, 0, e), a=a.concat(e), i+1+1<=t.length&&e.forEach(function(n) {
                        c=c.concat(f(t, i+1, n))
                    }
                    ), y++, y>ut)throw new Error("Loop brake. Number of iterations = "+y);
                    return c
                }
                if(o.selid==="QUESTION")return c=[], c=c.concat(f(t, i+1, u)), e=f(o.args, 0, u), i+1+1<=t.length&&e.forEach(function(n) {
                    c=c.concat(f(t, i+1, n))
                }
                ), c;
                if(o.selid==="WITH") {
                    if(e=f(o.args, 0, u), e.length===0)return[];
                    p= {
                        status: 1, values: e
                    }
                }
                else {
                    if(o.selid==="ROOT")return i+1+1>t.length?[u]: f(t, i+1, s);
                    throw new Error("Wrong selector "+o.selid);
                }
            }
            else if(o.srchid)p=n.srch[o.srchid.toUpperCase()](u, o.args, h, r);
            else throw new Error("Selector not found");
            if(typeof p=="undefined"&&(p= {
                status: 1, values: [u]
            }
            ), v=[], p.status===1)if(st=p.values, i+1+1>t.length)v=st;
            else for(y=0;
            y<p.values.length;
            y++)v=v.concat(f(t, i+1, st[y]));
            return v
        }
        var o, h= {}
        , s, e=g(this.selectors), c, l, a, v, y;
        return e!==undefined&&e.length>0&&(e&&e[0]&&e[0].srchid==="PROP"&&e[0].args&&e[0].args[0]&&(e[0].args[0].toUpperCase()==="XML"?(h.mode="XML", e.shift()):e[0].args[0].toUpperCase()==="HTML"?(h.mode="HTML", e.shift()):e[0].args[0].toUpperCase()==="JSON"&&(h.mode="JSON", e.shift())), e.length>0&&e[0].srchid==="VALUE"&&(h.value=!0, e.shift())), this.from instanceof t.Column?(c=this.from.databaseid||i, s=n.databases[c].tables[this.from.columnid].data):this.from instanceof t.FuncValue&&n.from[this.from.funcid.toUpperCase()]?(l=this.from.args.map(function(t) {
            var i=t.toJS(), u=new Function("params,alasql", "var y;return "+i).bind(this);
            return u(r, n)
        }
        ), s=n.from[this.from.funcid.toUpperCase()].apply(this, l)):typeof this.from=="undefined"?s=n.databases[i].objects:(a=new Function("params,alasql", "var y;return "+this.from.toJS()), s=a(r, n), typeof Mongo=="object"&&typeof Mongo.Collection!="object"&&s instanceof Mongo.Collection&&(s=s.find().fetch())), e!==undefined&&e.length>0?(!1&&e.forEach(function(t) {
            t.srchid==="TO"&&(n.vars[t.args[0]]=[])
        }
        ), o=f(e, 0, s)):o=s, this.into?(typeof this.into.args[0]!="undefined"&&(v=new Function("params,alasql", "var y;return "+this.into.args[0].toJS())(r, n)), typeof this.into.args[1]!="undefined"&&(y=new Function("params,alasql", "var y;return "+this.into.args[1].toJS())(r, n)), o=n.into[this.into.funcid.toUpperCase()](v, y, o, [], u)):(h.value&&o.length>0&&(o=o[0]), u&&(o=u(o))), o
    }
    function fr(t, i, r, u, f) {
        var h=t.sources.length, e, s, o;
        return t.sourceslen=t.sources.length, e=t.sourceslen, t.query=t, t.A=u, t.B=f, t.cb=r, t.oldscope=i, t.queriesfn&&(t.sourceslen+=t.queriesfn.length, e+=t.queriesfn.length, t.queriesdata=[], t.queriesfn.forEach(function(n, i) {
            n.query.params=t.params;
            oi([], -i-1, t)
        }
        )), s=i?g(i): {}
        , t.scope=s, t.sources.forEach(function(i, r) {
            i.query=t;
            var u=i.datafn(t, t.params, oi, r, n);
            typeof u!="undefined"&&((t.intofn||t.intoallfn)&&Array.isArray(u)&&(u=u.length), o=u);
            i.queriesdata=t.queriesdata
        }
        ), (t.sources.length==0||0===e)&&(o=si(t)), o
    }
    function oi(n, t, i) {
        if(t>=0) {
            var r=i.sources[t];
            r.data=n;
            typeof r.data=="function"&&(r.getfn=r.data, r.dontcache=r.getfn.dontcache, (r.joinmode=="OUTER"||r.joinmode=="RIGHT"||r.joinmode=="ANTI")&&(r.dontcache=!1), r.data= {}
            )
        }
        else i.queriesdata[-t-1]=ir(n);
        if(i.sourceslen--, !(i.sourceslen>0))return si(i)
    }
    function si(t) {
        var d=t.scope, h, p, l, a, s, w, u, e, o, r, b, c, k, i, f, v, y;
        if(hi(t), t.data=[], t.xgroups= {}
        , t.groups=[], p=0, ft(t, d, p), t.groupfn)for(t.data=[], 0===t.groups.length&&(s= {}
        , t.selectGroup.length>0&&t.selectGroup.forEach(function(n) {
            s[n.nick]=n.aggregatorid=="COUNT"||n.aggregatorid=="SUM"?0: undefined
        }
        ), t.groups=[s]), t.aggrKeys.length>0&&(l="", t.aggrKeys.forEach(function(n) {
            l+="g['"+n.nick+"']=alasql.aggr['"+n.funcid+"'](undefined,g['"+n.nick+"'],3);"
        }
        ), a=new Function("g,params,alasql", "var y;"+l)), i=0, f=t.groups.length;
        i<f;
        i++)s=t.groups[i], a&&a(s, t.params, n), (!t.havingfn||t.havingfn(s, t.params, n))&&(w=t.selectgfn(s, t.params, n), t.data.push(w));
        if(or(t), t.unionallfn) {
            if(t.corresponding)t.unionallfn.query.modifier||(t.unionallfn.query.modifier=undefined), e=t.unionallfn(t.params);
            else for(t.unionallfn.query.modifier||(t.unionallfn.query.modifier="RECORDSET"), u=t.unionallfn(t.params), e=[], f=u.data.length, i=0;
            i<f;
            i++) {
                for(o= {}
                , r=Math.min(t.columns.length, u.columns.length)-1;
                0<=r;
                r--)o[t.columns[r].columnid]=u.data[i][u.columns[r].columnid];
                e.push(o)
            }
            t.data=t.data.concat(e)
        }
        else if(t.unionfn) {
            if(t.corresponding)t.unionfn.query.modifier||(t.unionfn.query.modifier="ARRAY"), e=t.unionfn(t.params);
            else for(t.unionfn.query.modifier||(t.unionfn.query.modifier="RECORDSET"), u=t.unionfn(t.params), e=[], f=u.data.length, i=0;
            i<f;
            i++) {
                for(o= {}
                , h=Math.min(t.columns.length, u.columns.length), r=0;
                r<h;
                r++)o[t.columns[r].columnid]=u.data[i][u.columns[r].columnid];
                e.push(o)
            }
            t.data=gi(t.data, e)
        }
        else if(t.exceptfn) {
            if(t.corresponding)t.exceptfn.query.modifier||(t.exceptfn.query.modifier="ARRAY"), e=t.exceptfn(t.params);
            else for(t.exceptfn.query.modifier||(t.exceptfn.query.modifier="RECORDSET"), u=t.exceptfn(t.params), e=[], i=0, f=u.data.length;
            i<f;
            i++) {
                for(o= {}
                , r=Math.min(t.columns.length, u.columns.length)-1;
                0<=r;
                r--)o[t.columns[r].columnid]=u.data[i][u.columns[r].columnid];
                e.push(o)
            }
            t.data=nr(t.data, e)
        }
        else if(t.intersectfn) {
            if(t.corresponding)t.intersectfn.query.modifier||(t.intersectfn.query.modifier=undefined), e=t.intersectfn(t.params);
            else for(t.intersectfn.query.modifier||(t.intersectfn.query.modifier="RECORDSET"), u=t.intersectfn(t.params), e=[], f=u.data.length, i=0;
            i<f;
            i++) {
                for(o= {}
                , h=Math.min(t.columns.length, u.columns.length), r=0;
                r<h;
                r++)o[t.columns[r].columnid]=u.data[i][u.columns[r].columnid];
                e.push(o)
            }
            t.data=tr(t.data, e)
        }
        if(t.orderfn&&(t.explain&&(b=Date.now()), t.data=t.data.sort(t.orderfn), t.explain&&t.explaination.push( {
            explid: t.explid++, description: "QUERY BY", ms: Date.now()-b
        }
        )), er(t), typeof angular!="undefined"&&t.removeKeys.push("$$hashKey"), t.removeKeys.length>0) {
            if(c=t.removeKeys, h=c.length, h>0)for(f=t.data.length, i=0;
            i<f;
            i++)for(r=0;
            r<h;
            r++)delete t.data[i][c[r]];
            t.columns.length>0&&(t.columns=t.columns.filter(function(n) {
                var t=!1;
                return c.forEach(function(i) {
                    n.columnid==i&&(t=!0)
                }
                ), !t
            }
            ))
        }
        if(typeof t.removeLikeKeys!="undefined"&&t.removeLikeKeys.length>0) {
            for(k=t.removeLikeKeys, i=0, f=t.data.length;
            i<f;
            i++) {
                o=t.data[i];
                for(v in o)for(r=0;
                r<t.removeLikeKeys.length;
                r++)n.utils.like(t.removeLikeKeys[r], v)&&delete o[v]
            }
            t.columns.length>0&&(t.columns=t.columns.filter(function(t) {
                var i=!1;
                return k.forEach(function(r) {
                    n.utils.like(r, t.columnid)&&(i=!0)
                }
                ), !i
            }
            ))
        }
        if(t.pivotfn&&t.pivotfn(), t.unpivotfn&&t.unpivotfn(), t.intoallfn)return t.intoallfn(t.columns, t.cb, t.params, t.alasql);
        if(t.intofn) {
            for(f=t.data.length, i=0;
            i<f;
            i++)t.intofn(t.data[i], i, t.params, t.alasql);
            return t.cb&&t.cb(t.data.length, t.A, t.B), t.data.length
        }
        return y=t.data, t.cb&&(y=t.cb(t.data, t.A, t.B)), y
    }
    function er(n) {
        var t, i;
        n.limit&&(t=0, n.offset&&(t=n.offset|0||0, t=t<0?0: t), i=n.percent?(n.data.length*n.limit/100|0)+t: (n.limit|0)+t, n.data=n.data.slice(t, i))
    }
    function or(n) {
        var i, r, t, u, f, e;
        if(n.distinct) {
            for(i= {}
            , r=Object.keys(n.data[0]||[]), t=0, u=n.data.length;
            t<u;
            t++)f=r.map(function(i) {
                return n.data[t][i]
            }
            ).join("`"), i[f]=n.data[t];
            n.data=[];
            for(e in i)n.data.push(i[e])
        }
    }
    function ft(t, i, r) {
        var u, f, o, v, s, y, e;
        if(r>=t.sources.length)t.wherefn(i, t.params, n)&&(t.groupfn?t.groupfn(i, t.params, n): t.data.push(t.selectfn(i, t.params, n)));
        else if(t.sources[r].applyselect)u=t.sources[r], u.applyselect(t.params, function(n) {
            if(n.length>0)for(var f=0;
            f<n.length;
            f++)i[u.alias]=n[f], ft(t, i, r+1);
            else u.applymode=="OUTER"&&(i[u.alias]= {}
            , ft(t, i, r+1))
        }
        , i);
        else {
            if(u=t.sources[r], f=t.sources[r+1], !0) {
                var c=u.alias||u.tableid, a=!1, h=u.data, l=!1;
                if(u.getfn&&(!u.getfn||u.dontcache)||u.joinmode!="RIGHT"&&u.joinmode!="OUTER"&&u.joinmode!="ANTI"&&u.optimization=="ix"&&(h=u.ix[u.onleftfn(i, t.params, n)]||[], l=!0), o=0, typeof h=="undefined")throw new Error("Data source number "+r+" in undefined");
                for(v=h.length;
                (e=h[o])||!l&&u.getfn&&(e=u.getfn(o))||o<v;
                )l||!u.getfn||u.dontcache||(h[o]=e), i[c]=e, u.onleftfn&&u.onleftfn(i, t.params, n)!=u.onrightfn(i, t.params, n)||u.onmiddlefn(i, t.params, n)&&(u.joinmode!="SEMI"&&u.joinmode!="ANTI"&&ft(t, i, r+1), u.joinmode!="LEFT"&&u.joinmode!="INNER"&&(e._rightjoin=!0), a=!0), o++;
                u.joinmode!="LEFT"&&u.joinmode!="OUTER"&&u.joinmode!="SEMI"||a||(i[c]= {}
                , ft(t, i, r+1))
            }
            if(r+1<t.sources.length&&(f.joinmode=="OUTER"||f.joinmode=="RIGHT"||f.joinmode=="ANTI"))for(i[u.alias]= {}
            , s=0, y=f.data.length;
            (e=f.data[s])||f.getfn&&(e=f.getfn(s))||s<y;
            )f.getfn&&!f.dontcache&&(f.data[s]=e), e._rightjoin?delete e._rightjoin:r==0&&(i[f.alias]=e, ft(t, i, r+2)), s++;
            i[c]=undefined
        }
    }
    function ci(t, i) {
        var o, u, l, h, y, c, e, a, v, f, r, s;
        if(typeof i=="undefined"||typeof i=="number"||typeof i=="string"||typeof i=="boolean")return i;
        if(o=t.modifier||n.options.modifier, u=t.columns, typeof u=="undefined"||u.length==0)if(i.length>0) {
            for(l= {}
            , r=Math.min(i.length, n.options.columnlookup||10)-1;
            0<=r;
            r--)for(f in i[r])l[f]=!0;
            u=Object.keys(l).map(function(n) {
                return {
                    columnid: n
                }
            }
            )
        }
        else u=[];
        if(o==="VALUE")i.length>0?(f=u&&u.length>0?u[0].columnid:Object.keys(i[0])[0], i=i[0][f]):i=undefined;
        else if(o==="ROW")if(i.length>0) {
            h=[];
            for(f in i[0])h.push(i[0][f]);
            i=h
        }
        else i=undefined;
        else if(o==="COLUMN") {
            if(e=[], i.length>0)for(f=u&&u.length>0?u[0].columnid: Object.keys(i[0])[0], r=0, s=i.length;
            r<s;
            r++)e.push(i[r][f]);
            i=e
        }
        else if(o==="MATRIX") {
            for(e=[], r=0;
            r<i.length;
            r++) {
                for(h=[], y=i[r], c=0;
                c<u.length;
                c++)h.push(y[u[c].columnid]);
                e.push(h)
            }
            i=e
        }
        else if(o==="INDEX") {
            for(e= {}
            , u&&u.length>0?(f=u[0].columnid, a=u[1].columnid): (v=Object.keys(i[0]), f=v[0], a=v[1]), r=0, s=i.length;
            r<s;
            r++)e[i[r][f]]=i[r][a];
            i=e
        }
        else if(o==="RECORDSET")i=new n.Recordset( {
            columns: u, data: i
        }
        );
        else if(o==="TEXTSTRING") {
            for(f=u&&u.length>0?u[0].columnid: Object.keys(i[0])[0], r=0, s=i.length;
            r<s;
            r++)i[r]=i[r][f];
            i=i.join("\n")
        }
        return i
    }
    function bt(n, i) {
        var e, r, o, u, f;
        if(!i)return!1;
        if(i instanceof t.Op&&(i.op=="="||i.op=="AND")&&!i.allsome&&(e=i.toJS("p", n.defaultTableid, n.defcols), r=[], n.sources.forEach(function(n) {
            n.tableid&&e.indexOf("p['"+n.alias+"']")>-1&&r.push(n)
        }
        ), r.length!=0)) {
            if(r.length==1) {
                if(!(e.match(/p\[\'.*?\'\]/g)||[]).every(function(n){return n=="p['"+r[0].alias+"']"}))return;o=r[0];o.srcwherefns=o.srcwherefns?o.srcwherefns+"&&"+e:e;i instanceof t.Op&&i.op=="="&&!i.allsome&&(i.left instanceof t.Column&&(u=i.left.toJS("p",n.defaultTableid,n.defcols),f=i.right.toJS("p",n.defaultTableid,n.defcols),f.indexOf("p['"+r[0].alias+"']")==-1&&(r[0].wxleftfns=u,r[0].wxrightfns=f)),i.right instanceof t.Column&&(u=i.left.toJS("p",n.defaultTableid,n.defcols),f=i.right.toJS("p",n.defaultTableid,n.defcols),u.indexOf("p['"+r[0].alias+"']")==-1&&(r[0].wxleftfns=f,r[0].wxrightfns=u)));i.reduced=!0;return}(i.op="AND")&&(bt(n,i.left),bt(n,i.right))}}function li(t,i,r){var e="",o=[],u;return t.ixsources={},t.sources.forEach(function(n){t.ixsources[n.alias]=n}),t.ixsources[i]&&(u=t.ixsources[i].columns),r&&n.options.joinstar=="json"&&(e+="r['"+i+"']={};"),u&&u.length>0?u.forEach(function(u){r&&n.options.joinstar=="underscore"?o.push("'"+i+"_"+u.columnid+"':p['"+i+"']['"+u.columnid+"']"):r&&n.options.joinstar=="json"?e+="r['"+i+"']['"+u.columnid+"']=p['"+i+"']['"+u.columnid+"'];":o.push("'"+u.columnid+"':p['"+i+"']['"+u.columnid+"']");t.selectColumns[f(u.columnid)]=!0;var s={columnid:u.columnid,dbtypeid:u.dbtypeid,dbsize:u.dbsize,dbprecision:u.dbprecision,dbenum:u.dbenum};t.columns.push(s);t.xcolumns[s.columnid]=s}):(e+='var w=p["'+i+'"];
                for(var k in w) {
                    r[k]=w[k]
                }
                ;
                ',t.dirtyColumns=!0),{s:o.join(","),sp:e}}function dt(n,i){var u,r;if(Array.isArray(n)){for(u=[[]],r=0;r<n.length;r++)if(n[r]instanceof t.Column)n[r].nick=f(n[r].columnid),i.groupColumns[n[r].nick]=n[r].nick,u=u.map(function(t){return t.concat(n[r].nick+"\t"+n[r].toJS("p",i.sources[0].alias,i.defcols))});else if(n[r]instanceof t.FuncValue)i.groupColumns[f(n[r].toString())]=f(n[r].toString()),u=u.map(function(t){return t.concat(f(n[r].toString())+"\t"+n[r].toJS("p",i.sources[0].alias,i.defcols))});else if(n[r]instanceof t.GroupExpression)if(n[r].type=="ROLLUP")u=kt(u,sr(n[r].group,i));else if(n[r].type=="CUBE")u=kt(u,hr(n[r].group,i));else if(n[r].type=="GROUPING SETS")u=kt(u,cr(n[r].group,i));else throw new Error("Unknown grouping function");else u=n[r]===""?[["1\t1"]]:u.map(function(t){return i.groupColumns[f(n[r].toString())]=f(n[r].toString()),t.concat(f(n[r].toString())+"\t"+n[r].toJS("p",i.sources[0].alias,i.defcols))});return u}return n instanceof t.FuncValue?(i.groupColumns[f(n.toString())]=f(n.toString()),[n.toString()+"\t"+n.toJS("p",i.sources[0].alias,i.defcols)]):n instanceof t.Column?(n.nick=f(n.columnid),i.groupColumns[n.nick]=n.nick,[n.nick+"\t"+n.toJS("p",i.sources[0].alias,i.defcols)]):(i.groupColumns[f(n.toString())]=f(n.toString()),[f(n.toString())+"\t"+n.toJS("p",i.sources[0].alias,i.defcols)])}function ht(n,i,r,u){var f="",s,e,o;if(typeof n=="string")f='"'+n+'"';else if(typeof n=="number")f="("+n+")";else if(typeof n=="boolean")f=n;else if(typeof n=="object")if(Array.isArray(n))f+="["+n.map(function(n){return ht(n,i,r,u)}).join(",")+"]";else if(!n.toJS||n instanceof t.Json){f="{";s=[];for(e in n){if(o="",typeof e=="string")o+='"'+e+'"';else if(typeof e=="number")o+=e;else if(typeof e=="boolean")o+=e;else throw new Error("THis is not ES6... no expressions on left side yet");o+=":"+ht(n[e],i,r,u);s.push(o)}f+=s.join(",")+"}"}else if(n.toJS)f=n.toJS(i,r,u);else throw new Error("1Can not parse JSON object "+JSON.stringify(n));else throw new Error("2Can not parse JSON object "+JSON.stringify(n));return f}function gt(n){var t="",r,u,i,f;if(n===undefined)t+="undefined";else if(Array.isArray(n)){t+="<style>";t+="table {border:1px black solid; border-collapse: collapse; border-spacing: 0px;}";t+="td,th {border:1px black solid; padding-left:5px; padding-right:5px}";t+="th {background-color: #EEE}";t+="<\/style>";t+="<table>";r=[];for(u in n[0])r.push(u);for(t+="<tr><th>#",r.forEach(function(n){t+="<th>"+n}),i=0,f=n.length;i<f;i++)t+="<tr><th>"+(i+1),r.forEach(function(r){t+="<td> ";n[i][r]==+n[i][r]?(t+='<div style="text-align:right">',t+=typeof n[i][r]=="undefined"?"NULL":n[i][r],t+="<\/div>"):t+=typeof n[i][r]=="undefined"?"NULL":typeof n[i][r]=="string"?n[i][r]:p(n[i][r])});t+="<\/table>"}else t+="<p>"+p(n)+"<\/p>";return t}function ni(n,t,i){if(!(i<=0)){var r=t-n.scrollTop,u=r/i*10;setTimeout(function(){n.scrollTop!==t&&(n.scrollTop=n.scrollTop+u,ni(n,t,i-10))},10)}}function ti(t,i,r,u,f,e){function c(n){for(var r="",t=0,i=10240;t<n.byteLength/i;++t)r+=String.fromCharCode.apply(null,new Uint8Array(n.slice(t*i,t*i+i)));return r+String.fromCharCode.apply(null,new Uint8Array(n.slice(t*i)))}function s(t){return t&&n.options.casesensitive===!1?t.toLowerCase():t}var o={},h;return r=r||{},n.utils.extend(o,r),typeof o.headers=="undefined"&&(o.headers=!0),i=n.utils.autoExtFilename(i,"xls",r),n.utils.loadBinaryFile(i,!!u,function(i){var d,r,v,y,h,p,k,a,l;if(i instanceof ArrayBuffer?(d=c(i),r=t.read(btoa(d),{type:"base64"})):r=t.read(i,{type:"binary"}),v=typeof o.sheetid=="undefined"?r.SheetNames[0]:o.sheetid,h=[],typeof o.range=="undefined"?y=r.Sheets[v]["!ref"]:(y=o.range,r.Sheets[v][y]&&(y=r.Sheets[v][y])),y){var w=y.split(":"),it=w[0].match(/[A-Z]+/)[0],b=+w[0].match(/[0-9]+/)[0],rt=w[1].match(/[A-Z]+/)[0],ut=+w[1].match(/[0-9]+/)[0],g={},nt=n.utils.xlscn(it),tt=n.utils.xlscn(rt);for(a=nt;a<=tt;a++)l=n.utils.xlsnc(a),g[l]=o.headers?r.Sheets[v][l+""+b]?s(r.Sheets[v][l+""+b].v):s(l):l;for(o.headers&&b++,p=b;p<=ut;p++){for(k={},a=nt;a<=tt;a++)l=n.utils.xlsnc(a),r.Sheets[v][l+""+p]&&(k[g[l]]=r.Sheets[v][l+""+p].v);h.push(k)}}else h.push([]);h.length>0&&h[h.length-1]&&Object.keys(h[h.length-1]).length==0&&h.pop();u&&(h=u(h,f,e))},function(n){throw n;}),h}function lr(n){function e(){return{declaration:o(),root:r()}}function o(){var e=t(/^<\?xml\s*/),n,r;if(e){for(n={attributes:{}};!(f()||i("?>"));){if(r=u(),!r)return n;n.attributes[r.name]=r.value}return t(/\?>\s*/),n}}function r(){var o=t(/^<([\w-:.]+)\s*/),n,e,h;if(o){for(n={name:o[1],attributes:{},children:[]};!(f()||i(">")||i("?>")||i("/>"));){if(e=u(),!e)return n;n.attributes[e.name]=e.value}if(t(/^\s*\/>\s*/))return n;for(t(/\??>\s*/),n.content=s();h=r();)n.children.push(h);return t(/^<\/[\w-:.]+>\s*/),n}}function s(){var n=t(/^([^<]*)/);return n?n[1]:""}function u(){var n=t(/([\w:-]+)\s*=\s*("[^"]*"|'[^']*'|\w+)\s*/);
                if(n)return {
                    name: n[1], value: h(n[2])
                }
            }
            function h(n) {
                return n.replace(/^['"]|['"]$/g,"")}function t(t){var i=n.match(t);if(i)return n=n.slice(i[0].length),i}function f(){return 0==n.length}function i(t){return 0==n.indexOf(t)}return n=n.trim(),n=n.replace(/<!--[\s\S]*?-->/g,""),e()}var n=function(i,r,u,f){if(r=r||[],typeof importScripts!="function"&&n.webworker){var e=n.lastid++;n.buffer[e]=u;n.webworker.postMessage({id:e,sql:i,params:r});return}return arguments.length===0?new t.Select({columns:[new t.Column({columnid:"*"})],from:[new t.ParamValue({param:0})]}):arguments.length===1&&i.constructor===Array?n.promise(i):(typeof r=="function"&&(f=u,u=r,r=[]),typeof r!="object"&&(r=[r]),typeof i=="string"&&i[0]==="#"&&typeof document=="object"?i=document.querySelector(i).textContent:typeof i=="object"&&i instanceof HTMLElement?i=i.textContent:typeof i=="function"&&(i=i.toString().slice(14,-3)),n.exec(i,r,u,f))},i,yi,pi,wi,it,pt,fi,rt,ut,wt,k,ei,hi,u,o,l,et,p,ct,lt,h,r,ot,c,nt;n.version="0.4.3";n.debug=undefined;var w=function(){return null},ai="",d=function(){function yy(){this.yy={}}var t=function(n,t,i,r){for(i=i||{},r=n.length;r--;i[n[r]]=t);return i},ao=[2,13],i=[1,104],r=[1,102],u=[1,103],py=[1,6],vo=[1,42],yo=[1,79],eu=[1,76],kh=[1,94],po=[1,93],wo=[1,69],ou=[1,101],lt=[1,85],bo=[1,64],ko=[1,71],go=[1,84],ns=[1,66],co=[1,70],ts=[1,68],is=[1,61],rs=[1,74],us=[1,62],fs=[1,67],es=[1,83],os=[1,77],ss=[1,86],hs=[1,87],cs=[1,81],ls=[1,82],as=[1,80],vs=[1,88],ys=[1,89],ps=[1,90],ws=[1,91],bs=[1,92],ks=[1,98],ds=[1,65],gs=[1,78],nh=[1,72],th=[1,96],ih=[1,97],rh=[1,63],uh=[1,73],wy=[1,108],by=[1,107],ch=[10,306,602,764],s=[10,306,310,602,764],p=[1,115],d=[1,116],w=[1,117],b=[1,118],k=[1,119],ky=[130,353,410],dy=[1,127],gy=[1,126],np=[1,134],yt=[1,164],g=[1,175],y=[1,178],pt=[1,173],h=[1,181],vt=[1,185],wt=[1,160],c=[1,182],bt=[1,169],kt=[1,171],dt=[1,174],l=[1,183],gt=[1,166],ni=[1,193],ti=[1,188],ii=[1,189],nt=[1,194],tt=[1,195],it=[1,196],rt=[1,197],ut=[1,198],ft=[1,199],et=[1,200],ot=[1,201],st=[1,202],ht=[1,176],ct=[1,177],v=[1,179],at=[1,180],ri=[1,186],ui=[1,192],a=[1,184],fi=[1,187],ei=[1,172],oi=[1,170],o=[1,191],e=[1,203],ku=[2,4,5],gl=[2,471],na=[1,206],tl=[1,211],uc=[1,220],fc=[1,216],fv=[10,72,78,93,98,118,128,162,168,169,183,198,232,245,247,306,310,602,764],tp=[2,4,5,10,72,76,77,78,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,183,185,187,198,280,281,282,283,284,285,286,287,288,306,310,420,424,602,764],sr=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],lu=[1,249],ev=[1,256],ip=[1,265],lh=[1,270],ah=[1,269],il=[2,4,5,10,72,77,78,93,98,107,118,128,131,132,137,143,145,149,152,154,156,162,168,169,179,180,181,183,198,232,245,247,265,266,270,271,273,280,281,282,283,284,285,286,287,288,290,291,292,293,294,295,296,297,298,299,302,303,306,310,312,317,420,424,602,764],ta=[2,162],ia=[1,281],rp=[10,74,78,306,310,505,602,764],f=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,193,198,206,208,222,223,224,225,226,227,228,229,230,231,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,297,300,302,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,343,344,356,368,369,370,373,374,386,389,396,400,401,402,403,404,405,406,408,409,417,418,420,424,426,433,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,514,515,516,517,602,764],up=[2,4,5,10,53,72,89,124,146,156,189,266,267,290,306,335,338,339,396,400,401,404,406,408,409,417,418,434,436,437,439,440,441,442,443,447,448,451,452,505,507,508,517,602,764],dh=[1,562],fp=[1,564],ra=[2,503],ua=[1,569],gh=[1,580],vh=[1,583],fh=[1,584],ep=[10,78,89,132,137,146,189,296,306,310,470,602,764],fo=[10,74,306,310,602,764],fa=[2,567],ea=[1,602],oa=[2,4,5,156],wr=[1,640],er=[1,612],si=[1,646],hi=[1,647],yi=[1,620],op=[1,631],pi=[1,618],li=[1,626],wi=[1,619],br=[1,627],kr=[1,629],gi=[1,621],nr=[1,622],dr=[1,641],ru=[1,638],uu=[1,639],ki=[1,615],bi=[1,617],rr=[1,609],ai=[1,610],ur=[1,611],fr=[1,613],ci=[1,614],di=[1,616],tr=[1,623],ir=[1,624],hr=[1,628],cr=[1,630],lr=[1,632],ar=[1,633],vr=[1,634],yr=[1,635],pr=[1,636],gr=[1,642],nu=[1,643],or=[1,644],iu=[1,645],ov=[2,287],au=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,230,231,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,297,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,343,356,368,369,373,374,396,400,401,404,406,408,409,417,418,420,424,426,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],sp=[2,359],sv=[1,668],sa=[1,678],eo=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,230,231,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,426,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],rl=[1,694],hp=[1,703],cp=[1,702],lp=[2,4,5,10,72,74,78,93,98,118,128,162,168,169,206,208,222,223,224,225,226,227,228,229,230,231,232,245,247,306,310,602,764],cu=[10,72,74,78,93,98,118,128,162,168,169,206,208,222,223,224,225,226,227,228,229,230,231,232,245,247,306,310,602,764],ap=[2,202],vp=[1,725],ec=[10,72,78,93,98,118,128,162,168,169,183,232,245,247,306,310,602,764],yp=[2,163],pp=[1,728],wp=[2,4,5,112],du=[1,741],gu=[1,760],nf=[1,740],tf=[1,739],rf=[1,734],uf=[1,735],ff=[1,737],ef=[1,738],of=[1,742],sf=[1,743],hf=[1,744],cf=[1,745],lf=[1,746],af=[1,747],vf=[1,748],yf=[1,749],pf=[1,750],wf=[1,751],bf=[1,752],kf=[1,753],df=[1,754],gf=[1,755],ne=[1,756],te=[1,757],ie=[1,759],re=[1,761],ue=[1,762],fe=[1,763],ee=[1,764],oe=[1,765],se=[1,766],he=[1,767],ce=[1,770],le=[1,771],ae=[1,772],ve=[1,773],ye=[1,774],pe=[1,775],we=[1,776],be=[1,777],ke=[1,778],de=[1,779],ge=[1,780],no=[1,781],hv=[74,89,189],hu=[10,74,78,154,187,230,297,306,310,343,356,368,369,373,374,602,764],to=[1,798],bp=[10,74,78,300,306,310,602,764],tu=[1,799],kp=[1,805],dp=[1,806],cv=[1,810],su=[10,74,78,306,310,602,764],nc=[2,4,5,77,131,132,137,143,145,149,152,154,156,179,180,181,265,266,270,271,273,280,281,282,283,284,285,286,287,288,290,291,292,293,294,295,296,297,298,299,302,303,312,317,420,424],oc=[10,72,78,93,98,107,118,128,162,168,169,183,198,232,245,247,306,310,602,764],tc=[2,4,5,10,72,77,78,93,98,107,118,128,131,132,137,143,145,149,152,154,156,162,164,168,169,179,180,181,183,185,187,195,198,232,245,247,265,266,270,271,273,280,281,282,283,284,285,286,287,288,290,291,292,293,294,295,296,297,298,299,302,303,306,310,312,317,420,424,602,764],ha=[2,4,5,132,296],gp=[1,844],nw=[10,74,76,78,306,310,602,764],lv=[2,738],ca=[10,74,76,78,132,139,141,145,152,306,310,420,424,602,764],tw=[2,1161],la=[10,74,76,78,139,141,145,152,306,310,420,424,602,764],lo=[10,74,76,78,139,141,145,306,310,420,424,602,764],iw=[10,74,78,139,141,306,310,602,764],av=[10,78,89,132,146,189,296,306,310,470,602,764],sc=[335,338,339],rw=[2,764],uw=[1,869],fw=[1,870],ew=[1,871],ow=[1,872],hc=[1,881],cc=[1,880],ic=[164,166,334],sw=[2,444],hw=[1,936],cw=[2,4,5,77,131,156,290,291,292,293],lw=[1,951],aa=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,118,122,124,128,129,130,131,132,134,135,137,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,313,314,315,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],vv=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,312,313,314,315,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],aw=[2,375],vw=[1,958],yv=[306,308,310],yw=[74,300],eh=[74,300,426],pw=[1,965],pv=[2,4,5,10,53,72,74,76,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],ul=[74,426],fl=[1,978],el=[1,977],yh=[1,984],va=[10,72,78,93,98,118,128,162,168,169,232,245,247,306,310,602,764],ww=[1,1010],oo=[10,72,78,306,310,602,764],io=[1,1016],ro=[1,1017],uo=[1,1018],fu=[2,4,5,10,72,74,76,77,78,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,198,280,281,282,283,284,285,286,287,288,306,310,420,424,602,764],ol=[1,1068],sl=[1,1067],bw=[1,1081],kw=[1,1080],lc=[1,1088],ph=[10,72,74,78,93,98,107,118,128,162,168,169,183,198,232,245,247,306,310,602,764],wv=[1,1119],dw=[10,78,89,146,189,306,310,470,602,764],gw=[1,1139],nb=[1,1138],tb=[1,1137],ac=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,230,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,297,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,343,356,368,369,373,374,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],ib=[1,1153],ya=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,118,122,124,128,129,130,131,132,134,135,137,139,140,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,313,314,315,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],rb=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,118,122,124,128,129,130,131,132,134,135,137,139,140,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,313,315,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],bv=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,118,122,124,128,129,130,131,132,133,134,135,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,313,314,315,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],pa=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,118,122,124,128,129,130,131,132,134,135,137,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,313,314,315,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],oh=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,118,122,124,128,129,130,131,132,134,135,137,139,140,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,314,320,321,322,323,324,325,326,330,331,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],ub=[2,406],kv=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,107,118,122,128,129,130,131,132,134,135,137,143,145,146,148,149,150,152,156,162,164,166,168,169,170,171,172,173,175,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,314,330,331,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],fb=[2,285],dv=[2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,426,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],vu=[10,78,306,310,602,764],sh=[1,1189],eb=[10,77,78,143,145,152,181,302,306,310,420,424,602,764],vc=[10,74,78,306,308,310,464,602,764],ob=[1,1200],hh=[10,72,78,118,128,162,168,169,232,245,247,306,310,602,764],wa=[10,72,74,78,93,98,118,128,162,168,169,183,198,232,245,247,306,310,602,764],wu=[2,4,5,72,76,77,78,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,185,187,280,281,282,283,284,285,286,287,288,420,424],wh=[2,4,5,72,74,76,77,78,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,185,187,280,281,282,283,284,285,286,287,288,420,424],yc=[2,1085],sb=[2,4,5,72,74,76,77,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,185,187,280,281,282,283,284,285,286,287,288,420,424],ba=[1,1252],ka=[10,74,78,128,306,308,310,464,602,764],hl=[115,116,124],gv=[2,584],ny=[1,1280],hb=[76,139],cb=[2,724],lb=[1,1297],ab=[1,1298],ty=[2,4,5,10,53,72,76,89,124,146,156,189,230,266,267,290,306,310,335,338,339,396,400,401,404,406,408,409,417,418,434,436,437,439,440,441,442,443,447,448,451,452,505,507,508,517,602,764],iy=[2,330],ry=[1,1322],bh=[1,1336],uy=[1,1338],vb=[2,487],yu=[74,78],pu=[10,306,308,310,464,602,764],yb=[10,72,78,118,162,168,169,232,245,247,306,310,602,764],pb=[1,1354],da=[1,1358],ga=[1,1359],nv=[1,1361],cl=[1,1362],ll=[1,1363],al=[1,1364],vl=[1,1365],yl=[1,1366],pl=[1,1367],wl=[1,1368],tv=[10,72,74,78,93,98,118,128,162,168,169,206,208,222,223,224,225,226,227,228,229,232,245,247,306,310,602,764],pc=[1,1393],iv=[10,72,78,118,162,168,169,245,247,306,310,602,764],ho=[10,72,78,93,98,118,128,162,168,169,206,208,222,223,224,225,226,227,228,229,232,245,247,306,310,602,764],wb=[1,1490],bb=[1,1492],so=[2,4,5,77,143,145,152,156,181,290,291,292,293,302,420,424],bl=[1,1506],wc=[10,72,74,78,162,168,169,245,247,306,310,602,764],kb=[1,1524],db=[1,1526],gb=[1,1527],nk=[1,1523],tk=[1,1522],ik=[1,1521],fy=[1,1528],rk=[1,1518],uk=[1,1519],fk=[1,1520],ek=[1,1545],ey=[2,4,5,10,53,72,89,124,146,156,189,266,267,290,306,310,335,338,339,396,400,401,404,406,408,409,417,418,434,436,437,439,440,441,442,443,447,448,451,452,505,507,508,517,602,764],ok=[1,1556],oy=[1,1564],sy=[1,1563],sk=[10,72,78,162,168,169,245,247,306,310,602,764],bu=[10,72,78,93,98,118,128,162,168,169,206,208,222,223,224,225,226,227,228,229,230,231,232,245,247,306,310,602,764],hk=[2,4,5,10,72,78,93,98,118,128,162,168,169,206,208,222,223,224,225,226,227,228,229,230,231,232,245,247,306,310,602,764],ck=[1,1621],lk=[1,1623],ak=[1,1620],vk=[1,1622],rv=[187,193,368,369,370,373],hy=[2,515],cy=[1,1628],kl=[1,1647],rc=[10,72,78,162,168,169,306,310,602,764],bc=[1,1657],kc=[1,1658],dc=[1,1659],yk=[1,1678],gc=[4,10,243,306,310,343,356,602,764],dl=[1,1726],nl=[10,72,74,78,118,162,168,169,239,245,247,306,310,602,764],pk=[2,4,5,77],wk=[1,1820],ly=[1,1832],ay=[1,1851],bk=[10,72,78,162,168,169,306,310,415,602,764],vy=[10,74,78,230,306,310,602,764],uv={trace:function(){},yy:{},symbols_:{error:2,Literal:3,LITERAL:4,BRALITERAL:5,NonReserved:6,LiteralWithSpaces:7,main:8,Statements:9,EOF:10,Statements_group0:11,AStatement:12,ExplainStatement:13,EXPLAIN:14,QUERY:15,PLAN:16,Statement:17,AlterTable:18,AttachDatabase:19,Call:20,CreateDatabase:21,CreateIndex:22,CreateGraph:23,CreateTable:24,CreateView:25,CreateEdge:26,CreateVertex:27,Declare:28,Delete:29,DetachDatabase:30,DropDatabase:31,DropIndex:32,DropTable:33,DropView:34,If:35,Insert:36,Merge:37,Reindex:38,RenameTable:39,Select:40,ShowCreateTable:41,ShowColumns:42,ShowDatabases:43,ShowIndex:44,ShowTables:45,TruncateTable:46,WithSelect:47,CreateTrigger:48,DropTrigger:49,BeginTransaction:50,CommitTransaction:51,RollbackTransaction:52,EndTransaction:53,UseDatabase:54,Update:55,JavaScript:56,Source:57,Assert:58,While:59,Continue:60,Break:61,BeginEnd:62,Print:63,Require:64,SetVariable:65,ExpressionStatement:66,AddRule:67,Query:68,Echo:69,CreateFunction:70,CreateAggregate:71,WITH:72,WithTablesList:73,COMMA:74,WithTable:75,AS:76,LPAR:77,RPAR:78,SelectClause:79,Select_option0:80,IntoClause:81,FromClause:82,Select_option1:83,WhereClause:84,GroupClause:85,OrderClause:86,LimitClause:87,UnionClause:88,SEARCH:89,Select_repetition0:90,Select_option2:91,PivotClause:92,PIVOT:93,Expression:94,FOR:95,PivotClause_option0:96,PivotClause_option1:97,UNPIVOT:98,IN:99,ColumnsList:100,PivotClause_option2:101,PivotClause2:102,AsList:103,AsLiteral:104,AsPart:105,RemoveClause:106,REMOVE:107,RemoveClause_option0:108,RemoveColumnsList:109,RemoveColumn:110,Column:111,LIKE:112,StringValue:113,ArrowDot:114,ARROW:115,DOT:116,SearchSelector:117,ORDER:118,BY:119,OrderExpressionsList:120,SearchSelector_option0:121,DOTDOT:122,CARET:123,EQ:124,SearchSelector_repetition_plus0:125,SearchSelector_repetition_plus1:126,SearchSelector_option1:127,WHERE:128,OF:129,CLASS:130,NUMBER:131,STRING:132,SLASH:133,VERTEX:134,EDGE:135,EXCLAMATION:136,SHARP:137,MODULO:138,GT:139,LT:140,GTGT:141,LTLT:142,DOLLAR:143,Json:144,AT:145,SET:146,SetColumnsList:147,TO:148,VALUE:149,ROW:150,ExprList:151,COLON:152,PlusStar:153,NOT:154,SearchSelector_repetition2:155,IF:156,SearchSelector_repetition3:157,Aggregator:158,SearchSelector_repetition4:159,SearchSelector_group0:160,SearchSelector_repetition5:161,UNION:162,SearchSelectorList:163,ALL:164,SearchSelector_repetition6:165,ANY:166,SearchSelector_repetition7:167,INTERSECT:168,EXCEPT:169,AND:170,OR:171,PATH:172,RETURN:173,ResultColumns:174,REPEAT:175,SearchSelector_repetition8:176,SearchSelectorList_repetition0:177,SearchSelectorList_repetition1:178,PLUS:179,STAR:180,QUESTION:181,SearchFrom:182,FROM:183,SelectModifier:184,DISTINCT:185,TopClause:186,UNIQUE:187,SelectClause_option0:188,SELECT:189,COLUMN:190,MATRIX:191,TEXTSTRING:192,INDEX:193,RECORDSET:194,TOP:195,NumValue:196,TopClause_option0:197,INTO:198,Table:199,FuncValue:200,ParamValue:201,VarValue:202,FromTablesList:203,JoinTablesList:204,ApplyClause:205,CROSS:206,APPLY:207,OUTER:208,FromTable:209,FromTable_option0:210,FromTable_option1:211,INDEXED:212,INSERTED:213,FromString:214,JoinTable:215,JoinMode:216,JoinTableAs:217,OnClause:218,JoinTableAs_option0:219,JoinTableAs_option1:220,JoinModeMode:221,NATURAL:222,JOIN:223,INNER:224,LEFT:225,RIGHT:226,FULL:227,SEMI:228,ANTI:229,ON:230,USING:231,GROUP:232,GroupExpressionsList:233,HavingClause:234,GroupExpression:235,GROUPING:236,ROLLUP:237,CUBE:238,HAVING:239,CORRESPONDING:240,OrderExpression:241,DIRECTION:242,COLLATE:243,NOCASE:244,LIMIT:245,OffsetClause:246,OFFSET:247,LimitClause_option0:248,FETCH:249,LimitClause_option1:250,LimitClause_option2:251,LimitClause_option3:252,ResultColumn:253,Star:254,AggrValue:255,Op:256,LogicValue:257,NullValue:258,ExistsValue:259,CaseValue:260,CastClause:261,ArrayValue:262,NewClause:263,Expression_group0:264,CURRENT_TIMESTAMP:265,JAVASCRIPT:266,CREATE:267,FUNCTION:268,AGGREGATE:269,NEW:270,CAST:271,ColumnType:272,CONVERT:273,PrimitiveValue:274,OverClause:275,OVER:276,OverPartitionClause:277,OverOrderByClause:278,PARTITION:279,SUM:280,COUNT:281,MIN:282,MAX:283,AVG:284,FIRST:285,LAST:286,AGGR:287,ARRAY:288,FuncValue_option0:289,REPLACE:290,DATEADD:291,DATEDIFF:292,INTERVAL:293,TRUE:294,FALSE:295,NSTRING:296,NULL:297,EXISTS:298,ARRAYLBRA:299,RBRA:300,ParamValue_group0:301,BRAQUESTION:302,CASE:303,WhensList:304,ElseClause:305,END:306,When:307,WHEN:308,THEN:309,ELSE:310,REGEXP:311,TILDA:312,GLOB:313,ESCAPE:314,NOT_LIKE:315,BARBAR:316,MINUS:317,AMPERSAND:318,BAR:319,GE:320,LE:321,EQEQ:322,EQEQEQ:323,NE:324,NEEQEQ:325,NEEQEQEQ:326,CondOp:327,AllSome:328,ColFunc:329,BETWEEN:330,NOT_BETWEEN:331,IS:332,DOUBLECOLON:333,SOME:334,UPDATE:335,SetColumn:336,SetColumn_group0:337,DELETE:338,INSERT:339,Into:340,Values:341,ValuesListsList:342,DEFAULT:343,VALUES:344,ValuesList:345,Value:346,DateValue:347,TemporaryClause:348,TableClass:349,IfNotExists:350,CreateTableDefClause:351,CreateTableOptionsClause:352,TABLE:353,CreateTableOptions:354,CreateTableOption:355,IDENTITY:356,TEMP:357,ColumnDefsList:358,ConstraintsList:359,Constraint:360,ConstraintName:361,PrimaryKey:362,ForeignKey:363,UniqueKey:364,IndexKey:365,Check:366,CONSTRAINT:367,CHECK:368,PRIMARY:369,KEY:370,PrimaryKey_option0:371,ColsList:372,FOREIGN:373,REFERENCES:374,ForeignKey_option0:375,OnForeignKeyClause:376,ParColsList:377,OnDeleteClause:378,OnUpdateClause:379,NO:380,ACTION:381,UniqueKey_option0:382,UniqueKey_option1:383,ColumnDef:384,ColumnConstraintsClause:385,ColumnConstraints:386,SingularColumnType:387,NumberMax:388,ENUM:389,MAXNUM:390,ColumnConstraintsList:391,ColumnConstraint:392,ParLiteral:393,ColumnConstraint_option0:394,ColumnConstraint_option1:395,DROP:396,DropTable_group0:397,IfExists:398,TablesList:399,ALTER:400,RENAME:401,ADD:402,MODIFY:403,ATTACH:404,DATABASE:405,DETACH:406,AsClause:407,USE:408,SHOW:409,VIEW:410,CreateView_option0:411,CreateView_option1:412,SubqueryRestriction:413,READ:414,ONLY:415,OPTION:416,SOURCE:417,ASSERT:418,JsonObject:419,ATLBRA:420,JsonArray:421,JsonValue:422,JsonPrimitiveValue:423,LCUR:424,JsonPropertiesList:425,RCUR:426,JsonElementsList:427,JsonProperty:428,OnOff:429,SetPropsList:430,AtDollar:431,SetProp:432,OFF:433,COMMIT:434,TRANSACTION:435,ROLLBACK:436,BEGIN:437,ElseStatement:438,WHILE:439,CONTINUE:440,BREAK:441,PRINT:442,REQUIRE:443,StringValuesList:444,PluginsList:445,Plugin:446,ECHO:447,DECLARE:448,DeclaresList:449,DeclareItem:450,TRUNCATE:451,MERGE:452,MergeInto:453,MergeUsing:454,MergeOn:455,MergeMatchedList:456,OutputClause:457,MergeMatched:458,MergeNotMatched:459,MATCHED:460,MergeMatchedAction:461,MergeNotMatchedAction:462,TARGET:463,OUTPUT:464,CreateVertex_option0:465,CreateVertex_option1:466,CreateVertex_option2:467,CreateVertexSet:468,SharpValue:469,CONTENT:470,CreateEdge_option0:471,GRAPH:472,GraphList:473,GraphVertexEdge:474,GraphElement:475,GraphVertexEdge_option0:476,GraphVertexEdge_option1:477,GraphElementVar:478,GraphVertexEdge_option2:479,GraphVertexEdge_option3:480,GraphVertexEdge_option4:481,GraphVar:482,GraphAsClause:483,GraphAtClause:484,GraphElement2:485,GraphElement2_option0:486,GraphElement2_option1:487,GraphElement2_option2:488,GraphElement2_option3:489,GraphElement_option0:490,GraphElement_option1:491,GraphElement_option2:492,SharpLiteral:493,GraphElement_option3:494,GraphElement_option4:495,GraphElement_option5:496,ColonLiteral:497,DeleteVertex:498,DeleteVertex_option0:499,DeleteEdge:500,DeleteEdge_option0:501,DeleteEdge_option1:502,DeleteEdge_option2:503,Term:504,COLONDASH:505,TermsList:506,QUESTIONDASH:507,CALL:508,TRIGGER:509,BeforeAfter:510,InsertDeleteUpdate:511,CreateTrigger_option0:512,CreateTrigger_option1:513,BEFORE:514,AFTER:515,INSTEAD:516,REINDEX:517,A:518,ABSENT:519,ABSOLUTE:520,ACCORDING:521,ADA:522,ADMIN:523,ALWAYS:524,ASC:525,ASSERTION:526,ASSIGNMENT:527,ATTRIBUTE:528,ATTRIBUTES:529,BASE64:530,BERNOULLI:531,BLOCKED:532,BOM:533,BREADTH:534,C:535,CASCADE:536,CATALOG:537,CATALOG_NAME:538,CHAIN:539,CHARACTERISTICS:540,CHARACTERS:541,CHARACTER_SET_CATALOG:542,CHARACTER_SET_NAME:543,CHARACTER_SET_SCHEMA:544,CLASS_ORIGIN:545,COBOL:546,COLLATION:547,COLLATION_CATALOG:548,COLLATION_NAME:549,COLLATION_SCHEMA:550,COLUMNS:551,COLUMN_NAME:552,COMMAND_FUNCTION:553,COMMAND_FUNCTION_CODE:554,COMMITTED:555,CONDITION_NUMBER:556,CONNECTION:557,CONNECTION_NAME:558,CONSTRAINTS:559,CONSTRAINT_CATALOG:560,CONSTRAINT_NAME:561,CONSTRAINT_SCHEMA:562,CONSTRUCTOR:563,CONTROL:564,CURSOR_NAME:565,DATA:566,DATETIME_INTERVAL_CODE:567,DATETIME_INTERVAL_PRECISION:568,DB:569,DEFAULTS:570,DEFERRABLE:571,DEFERRED:572,DEFINED:573,DEFINER:574,DEGREE:575,DEPTH:576,DERIVED:577,DESC:578,DESCRIPTOR:579,DIAGNOSTICS:580,DISPATCH:581,DOCUMENT:582,DOMAIN:583,DYNAMIC_FUNCTION:584,DYNAMIC_FUNCTION_CODE:585,EMPTY:586,ENCODING:587,ENFORCED:588,EXCLUDE:589,EXCLUDING:590,EXPRESSION:591,FILE:592,FINAL:593,FLAG:594,FOLLOWING:595,FORTRAN:596,FOUND:597,FS:598,G:599,GENERAL:600,GENERATED:601,GO:602,GOTO:603,GRANTED:604,HEX:605,HIERARCHY:606,ID:607,IGNORE:608,IMMEDIATE:609,IMMEDIATELY:610,IMPLEMENTATION:611,INCLUDING:612,INCREMENT:613,INDENT:614,INITIALLY:615,INPUT:616,INSTANCE:617,INSTANTIABLE:618,INTEGRITY:619,INVOKER:620,ISOLATION:621,K:622,KEY_MEMBER:623,KEY_TYPE:624,LENGTH:625,LEVEL:626,LIBRARY:627,LINK:628,LOCATION:629,LOCATOR:630,M:631,MAP:632,MAPPING:633,MAXVALUE:634,MESSAGE_LENGTH:635,MESSAGE_OCTET_LENGTH:636,MESSAGE_TEXT:637,MINVALUE:638,MORE:639,MUMPS:640,NAME:641,NAMES:642,NAMESPACE:643,NESTING:644,NEXT:645,NFC:646,NFD:647,NFKC:648,NFKD:649,NIL:650,NORMALIZED:651,NULLABLE:652,NULLS:653,OBJECT:654,OCTETS:655,OPTIONS:656,ORDERING:657,ORDINALITY:658,OTHERS:659,OVERRIDING:660,P:661,PAD:662,PARAMETER_MODE:663,PARAMETER_NAME:664,PARAMETER_ORDINAL_POSITION:665,PARAMETER_SPECIFIC_CATALOG:666,PARAMETER_SPECIFIC_NAME:667,PARAMETER_SPECIFIC_SCHEMA:668,PARTIAL:669,PASCAL:670,PASSING:671,PASSTHROUGH:672,PERMISSION:673,PLACING:674,PLI:675,PRECEDING:676,PRESERVE:677,PRIOR:678,PRIVILEGES:679,PUBLIC:680,RECOVERY:681,RELATIVE:682,REPEATABLE:683,REQUIRING:684,RESPECT:685,RESTART:686,RESTORE:687,RESTRICT:688,RETURNED_CARDINALITY:689,RETURNED_LENGTH:690,RETURNED_OCTET_LENGTH:691,RETURNED_SQLSTATE:692,RETURNING:693,ROLE:694,ROUTINE:695,ROUTINE_CATALOG:696,ROUTINE_NAME:697,ROUTINE_SCHEMA:698,ROW_COUNT:699,SCALE:700,SCHEMA:701,SCHEMA_NAME:702,SCOPE_CATALOG:703,SCOPE_NAME:704,SCOPE_SCHEMA:705,SECTION:706,SECURITY:707,SELECTIVE:708,SELF:709,SEQUENCE:710,SERIALIZABLE:711,SERVER:712,SERVER_NAME:713,SESSION:714,SETS:715,SIMPLE:716,SIZE:717,SPACE:718,SPECIFIC_NAME:719,STANDALONE:720,STATE:721,STATEMENT:722,STRIP:723,STRUCTURE:724,STYLE:725,SUBCLASS_ORIGIN:726,T:727,TABLE_NAME:728,TEMPORARY:729,TIES:730,TOKEN:731,TOP_LEVEL_COUNT:732,TRANSACTIONS_COMMITTED:733,TRANSACTIONS_ROLLED_BACK:734,TRANSACTION_ACTIVE:735,TRANSFORM:736,TRANSFORMS:737,TRIGGER_CATALOG:738,TRIGGER_NAME:739,TRIGGER_SCHEMA:740,TYPE:741,UNBOUNDED:742,UNCOMMITTED:743,UNDER:744,UNLINK:745,UNNAMED:746,UNTYPED:747,URI:748,USAGE:749,USER_DEFINED_TYPE_CATALOG:750,USER_DEFINED_TYPE_CODE:751,USER_DEFINED_TYPE_NAME:752,USER_DEFINED_TYPE_SCHEMA:753,VALID:754,VERSION:755,WHITESPACE:756,WORK:757,WRAPPER:758,WRITE:759,XMLDECLARATION:760,XMLSCHEMA:761,YES:762,ZONE:763,SEMICOLON:764,PERCENT:765,ROWS:766,FuncValue_option0_group0:767,$accept:0,$end:1},terminals_:{2:"error",4:"LITERAL",5:"BRALITERAL",10:"EOF",14:"EXPLAIN",15:"QUERY",16:"PLAN",53:"EndTransaction",72:"WITH",74:"COMMA",76:"AS",77:"LPAR",78:"RPAR",89:"SEARCH",93:"PIVOT",95:"FOR",98:"UNPIVOT",99:"IN",107:"REMOVE",112:"LIKE",115:"ARROW",116:"DOT",118:"ORDER",119:"BY",122:"DOTDOT",123:"CARET",124:"EQ",128:"WHERE",129:"OF",130:"CLASS",131:"NUMBER",132:"STRING",133:"SLASH",134:"VERTEX",135:"EDGE",136:"EXCLAMATION",137:"SHARP",138:"MODULO",139:"GT",140:"LT",141:"GTGT",142:"LTLT",143:"DOLLAR",145:"AT",146:"SET",148:"TO",149:"VALUE",150:"ROW",152:"COLON",154:"NOT",156:"IF",162:"UNION",164:"ALL",166:"ANY",168:"INTERSECT",169:"EXCEPT",170:"AND",171:"OR",172:"PATH",173:"RETURN",175:"REPEAT",179:"PLUS",180:"STAR",181:"QUESTION",183:"FROM",185:"DISTINCT",187:"UNIQUE",189:"SELECT",190:"COLUMN",191:"MATRIX",192:"TEXTSTRING",193:"INDEX",194:"RECORDSET",195:"TOP",198:"INTO",206:"CROSS",207:"APPLY",208:"OUTER",212:"INDEXED",213:"INSERTED",222:"NATURAL",223:"JOIN",224:"INNER",225:"LEFT",226:"RIGHT",227:"FULL",228:"SEMI",229:"ANTI",230:"ON",231:"USING",232:"GROUP",236:"GROUPING",237:"ROLLUP",238:"CUBE",239:"HAVING",240:"CORRESPONDING",242:"DIRECTION",243:"COLLATE",244:"NOCASE",245:"LIMIT",247:"OFFSET",249:"FETCH",265:"CURRENT_TIMESTAMP",266:"JAVASCRIPT",267:"CREATE",268:"FUNCTION",269:"AGGREGATE",270:"NEW",271:"CAST",273:"CONVERT",276:"OVER",279:"PARTITION",280:"SUM",281:"COUNT",282:"MIN",283:"MAX",284:"AVG",285:"FIRST",286:"LAST",287:"AGGR",288:"ARRAY",290:"REPLACE",291:"DATEADD",292:"DATEDIFF",293:"INTERVAL",294:"TRUE",295:"FALSE",296:"NSTRING",297:"NULL",298:"EXISTS",299:"ARRAYLBRA",300:"RBRA",302:"BRAQUESTION",303:"CASE",306:"END",308:"WHEN",309:"THEN",310:"ELSE",311:"REGEXP",312:"TILDA",313:"GLOB",314:"ESCAPE",315:"NOT_LIKE",316:"BARBAR",317:"MINUS",318:"AMPERSAND",319:"BAR",320:"GE",321:"LE",322:"EQEQ",323:"EQEQEQ",324:"NE",325:"NEEQEQ",326:"NEEQEQEQ",330:"BETWEEN",331:"NOT_BETWEEN",332:"IS",333:"DOUBLECOLON",334:"SOME",335:"UPDATE",338:"DELETE",339:"INSERT",343:"DEFAULT",344:"VALUES",347:"DateValue",353:"TABLE",356:"IDENTITY",357:"TEMP",367:"CONSTRAINT",368:"CHECK",369:"PRIMARY",370:"KEY",373:"FOREIGN",374:"REFERENCES",380:"NO",381:"ACTION",386:"ColumnConstraints",389:"ENUM",390:"MAXNUM",396:"DROP",400:"ALTER",401:"RENAME",402:"ADD",403:"MODIFY",404:"ATTACH",405:"DATABASE",406:"DETACH",408:"USE",409:"SHOW",410:"VIEW",414:"READ",415:"ONLY",416:"OPTION",417:"SOURCE",418:"ASSERT",420:"ATLBRA",424:"LCUR",426:"RCUR",433:"OFF",434:"COMMIT",435:"TRANSACTION",436:"ROLLBACK",437:"BEGIN",439:"WHILE",440:"CONTINUE",441:"BREAK",442:"PRINT",443:"REQUIRE",447:"ECHO",448:"DECLARE",451:"TRUNCATE",452:"MERGE",460:"MATCHED",463:"TARGET",464:"OUTPUT",470:"CONTENT",472:"GRAPH",505:"COLONDASH",507:"QUESTIONDASH",508:"CALL",509:"TRIGGER",514:"BEFORE",515:"AFTER",516:"INSTEAD",517:"REINDEX",518:"A",519:"ABSENT",520:"ABSOLUTE",521:"ACCORDING",522:"ADA",523:"ADMIN",524:"ALWAYS",525:"ASC",526:"ASSERTION",527:"ASSIGNMENT",528:"ATTRIBUTE",529:"ATTRIBUTES",530:"BASE64",531:"BERNOULLI",532:"BLOCKED",533:"BOM",534:"BREADTH",535:"C",536:"CASCADE",537:"CATALOG",538:"CATALOG_NAME",539:"CHAIN",540:"CHARACTERISTICS",541:"CHARACTERS",542:"CHARACTER_SET_CATALOG",543:"CHARACTER_SET_NAME",544:"CHARACTER_SET_SCHEMA",545:"CLASS_ORIGIN",546:"COBOL",547:"COLLATION",548:"COLLATION_CATALOG",549:"COLLATION_NAME",550:"COLLATION_SCHEMA",551:"COLUMNS",552:"COLUMN_NAME",553:"COMMAND_FUNCTION",554:"COMMAND_FUNCTION_CODE",555:"COMMITTED",556:"CONDITION_NUMBER",557:"CONNECTION",558:"CONNECTION_NAME",559:"CONSTRAINTS",560:"CONSTRAINT_CATALOG",561:"CONSTRAINT_NAME",562:"CONSTRAINT_SCHEMA",563:"CONSTRUCTOR",564:"CONTROL",565:"CURSOR_NAME",566:"DATA",567:"DATETIME_INTERVAL_CODE",568:"DATETIME_INTERVAL_PRECISION",569:"DB",570:"DEFAULTS",571:"DEFERRABLE",572:"DEFERRED",573:"DEFINED",574:"DEFINER",575:"DEGREE",576:"DEPTH",577:"DERIVED",578:"DESC",579:"DESCRIPTOR",580:"DIAGNOSTICS",581:"DISPATCH",582:"DOCUMENT",583:"DOMAIN",584:"DYNAMIC_FUNCTION",585:"DYNAMIC_FUNCTION_CODE",586:"EMPTY",587:"ENCODING",588:"ENFORCED",589:"EXCLUDE",590:"EXCLUDING",591:"EXPRESSION",592:"FILE",593:"FINAL",594:"FLAG",595:"FOLLOWING",596:"FORTRAN",597:"FOUND",598:"FS",599:"G",600:"GENERAL",601:"GENERATED",602:"GO",603:"GOTO",604:"GRANTED",605:"HEX",606:"HIERARCHY",607:"ID",608:"IGNORE",609:"IMMEDIATE",610:"IMMEDIATELY",611:"IMPLEMENTATION",612:"INCLUDING",613:"INCREMENT",614:"INDENT",615:"INITIALLY",616:"INPUT",617:"INSTANCE",618:"INSTANTIABLE",619:"INTEGRITY",620:"INVOKER",621:"ISOLATION",622:"K",623:"KEY_MEMBER",624:"KEY_TYPE",625:"LENGTH",626:"LEVEL",627:"LIBRARY",628:"LINK",629:"LOCATION",630:"LOCATOR",631:"M",632:"MAP",633:"MAPPING",634:"MAXVALUE",635:"MESSAGE_LENGTH",636:"MESSAGE_OCTET_LENGTH",637:"MESSAGE_TEXT",638:"MINVALUE",639:"MORE",640:"MUMPS",641:"NAME",642:"NAMES",643:"NAMESPACE",644:"NESTING",645:"NEXT",646:"NFC",647:"NFD",648:"NFKC",649:"NFKD",650:"NIL",651:"NORMALIZED",652:"NULLABLE",653:"NULLS",654:"OBJECT",655:"OCTETS",656:"OPTIONS",657:"ORDERING",658:"ORDINALITY",659:"OTHERS",660:"OVERRIDING",661:"P",662:"PAD",663:"PARAMETER_MODE",664:"PARAMETER_NAME",665:"PARAMETER_ORDINAL_POSITION",666:"PARAMETER_SPECIFIC_CATALOG",667:"PARAMETER_SPECIFIC_NAME",668:"PARAMETER_SPECIFIC_SCHEMA",669:"PARTIAL",670:"PASCAL",671:"PASSING",672:"PASSTHROUGH",673:"PERMISSION",674:"PLACING",675:"PLI",676:"PRECEDING",677:"PRESERVE",678:"PRIOR",679:"PRIVILEGES",680:"PUBLIC",681:"RECOVERY",682:"RELATIVE",683:"REPEATABLE",684:"REQUIRING",685:"RESPECT",686:"RESTART",687:"RESTORE",688:"RESTRICT",689:"RETURNED_CARDINALITY",690:"RETURNED_LENGTH",691:"RETURNED_OCTET_LENGTH",692:"RETURNED_SQLSTATE",693:"RETURNING",694:"ROLE",695:"ROUTINE",696:"ROUTINE_CATALOG",697:"ROUTINE_NAME",698:"ROUTINE_SCHEMA",699:"ROW_COUNT",700:"SCALE",701:"SCHEMA",702:"SCHEMA_NAME",703:"SCOPE_CATALOG",704:"SCOPE_NAME",705:"SCOPE_SCHEMA",706:"SECTION",707:"SECURITY",708:"SELECTIVE",709:"SELF",710:"SEQUENCE",711:"SERIALIZABLE",712:"SERVER",713:"SERVER_NAME",714:"SESSION",715:"SETS",716:"SIMPLE",717:"SIZE",718:"SPACE",719:"SPECIFIC_NAME",720:"STANDALONE",721:"STATE",722:"STATEMENT",723:"STRIP",724:"STRUCTURE",725:"STYLE",726:"SUBCLASS_ORIGIN",727:"T",728:"TABLE_NAME",729:"TEMPORARY",730:"TIES",731:"TOKEN",732:"TOP_LEVEL_COUNT",733:"TRANSACTIONS_COMMITTED",734:"TRANSACTIONS_ROLLED_BACK",735:"TRANSACTION_ACTIVE",736:"TRANSFORM",737:"TRANSFORMS",738:"TRIGGER_CATALOG",739:"TRIGGER_NAME",740:"TRIGGER_SCHEMA",741:"TYPE",742:"UNBOUNDED",743:"UNCOMMITTED",744:"UNDER",745:"UNLINK",746:"UNNAMED",747:"UNTYPED",748:"URI",749:"USAGE",750:"USER_DEFINED_TYPE_CATALOG",751:"USER_DEFINED_TYPE_CODE",752:"USER_DEFINED_TYPE_NAME",753:"USER_DEFINED_TYPE_SCHEMA",754:"VALID",755:"VERSION",756:"WHITESPACE",757:"WORK",758:"WRAPPER",759:"WRITE",760:"XMLDECLARATION",761:"XMLSCHEMA",762:"YES",763:"ZONE",764:"SEMICOLON",765:"PERCENT",766:"ROWS"},productions_:[0,[3,1],[3,1],[3,2],[7,1],[7,2],[8,2],[9,3],[9,1],[9,1],[13,2],[13,4],[12,1],[17,0],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[47,3],[73,3],[73,1],[75,5],[40,10],[40,4],[92,8],[92,11],[102,4],[104,2],[104,1],[103,3],[103,1],[105,1],[105,3],[106,3],[109,3],[109,1],[110,1],[110,2],[114,1],[114,1],[117,1],[117,5],[117,5],[117,1],[117,2],[117,1],[117,2],[117,2],[117,3],[117,4],[117,4],[117,4],[117,4],[117,4],[117,1],[117,1],[117,1],[117,1],[117,1],[117,1],[117,2],[117,2],[117,2],[117,1],[117,1],[117,1],[117,1],[117,1],[117,1],[117,2],[117,3],[117,4],[117,3],[117,1],[117,4],[117,2],[117,2],[117,4],[117,4],[117,4],[117,4],[117,4],[117,5],[117,4],[117,4],[117,4],[117,4],[117,4],[117,4],[117,4],[117,4],[117,6],[163,3],[163,1],[153,1],[153,1],[153,1],[182,2],[79,4],[79,4],[79,4],[79,3],[184,1],[184,2],[184,2],[184,2],[184,2],[184,2],[184,2],[184,2],[186,3],[186,4],[186,0],[81,0],[81,2],[81,2],[81,2],[81,2],[81,2],[82,2],[82,3],[82,5],[82,0],[205,6],[205,7],[205,6],[205,7],[203,1],[203,3],[209,4],[209,5],[209,3],[209,3],[209,2],[209,3],[209,1],[209,3],[209,2],[209,3],[209,1],[209,1],[209,2],[209,3],[209,1],[209,1],[209,2],[209,3],[209,1],[209,2],[209,3],[214,1],[199,3],[199,1],[204,2],[204,2],[204,1],[204,1],[215,3],[217,1],[217,2],[217,3],[217,3],[217,2],[217,3],[217,4],[217,5],[217,1],[217,2],[217,3],[217,1],[217,2],[217,3],[216,1],[216,2],[221,1],[221,2],[221,2],[221,3],[221,2],[221,3],[221,2],[221,3],[221,2],[221,2],[221,2],[218,2],[218,2],[218,0],[84,0],[84,2],[85,0],[85,4],[233,1],[233,3],[235,5],[235,4],[235,4],[235,1],[234,0],[234,2],[88,0],[88,2],[88,3],[88,2],[88,2],[88,3],[88,4],[88,3],[88,3],[86,0],[86,3],[120,1],[120,3],[241,1],[241,2],[241,3],[241,4],[87,0],[87,3],[87,8],[246,0],[246,2],[174,3],[174,1],[253,3],[253,2],[253,3],[253,2],[253,3],[253,2],[253,1],[254,5],[254,3],[254,1],[111,5],[111,3],[111,3],[111,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,1],[94,3],[94,3],[94,3],[94,1],[94,1],[56,1],[70,5],[71,5],[263,2],[263,2],[261,6],[261,8],[261,6],[261,8],[274,1],[274,1],[274,1],[274,1],[274,1],[274,1],[274,1],[255,5],[255,6],[255,6],[275,0],[275,4],[275,4],[275,5],[277,3],[278,3],[158,1],[158,1],[158,1],[158,1],[158,1],[158,1],[158,1],[158,1],[158,1],[200,5],[200,3],[200,4],[200,4],[200,8],[200,8],[200,8],[200,8],[200,3],[151,1],[151,3],[196,1],[257,1],[257,1],[113,1],[113,1],[258,1],[202,2],[259,4],[262,3],[201,2],[201,2],[201,1],[201,1],[260,5],[260,4],[304,2],[304,1],[307,4],[305,2],[305,0],[256,3],[256,3],[256,3],[256,3],[256,5],[256,3],[256,5],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,5],[256,3],[256,3],[256,3],[256,5],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,3],[256,6],[256,6],[256,3],[256,3],[256,2],[256,2],[256,2],[256,2],[256,2],[256,3],[256,5],[256,6],[256,5],[256,6],[256,4],[256,5],[256,3],[256,4],[256,3],[256,4],[256,3],[256,3],[256,3],[256,3],[256,3],[329,1],[329,1],[329,4],[327,1],[327,1],[327,1],[327,1],[327,1],[327,1],[328,1],[328,1],[328,1],[55,6],[55,4],[147,1],[147,3],[336,3],[336,4],[29,5],[29,3],[36,5],[36,4],[36,7],[36,6],[36,5],[36,4],[36,5],[36,8],[36,7],[36,4],[36,6],[36,7],[341,1],[341,1],[340,0],[340,1],[342,3],[342,1],[342,1],[342,5],[342,3],[342,3],[345,1],[345,3],[346,1],[346,1],[346,1],[346,1],[346,1],[346,1],[100,1],[100,3],[24,9],[24,5],[349,1],[349,1],[352,0],[352,1],[354,2],[354,1],[355,1],[355,3],[355,3],[355,3],[348,0],[348,1],[350,0],[350,3],[351,3],[351,1],[351,2],[359,1],[359,3],[360,2],[360,2],[360,2],[360,2],[360,2],[361,0],[361,2],[366,4],[362,6],[363,9],[377,3],[376,0],[376,2],[378,4],[379,4],[364,6],[365,5],[365,5],[372,1],[372,1],[372,3],[372,3],[358,1],[358,3],[384,3],[384,2],[384,1],[387,6],[387,4],[387,1],[387,4],[272,2],[272,1],[388,1],[388,1],[385,0],[385,1],[391,2],[391,1],[393,3],[392,2],[392,5],[392,3],[392,6],[392,1],[392,2],[392,4],[392,2],[392,1],[392,2],[392,1],[392,1],[392,3],[392,5],[33,4],[399,3],[399,1],[398,0],[398,2],[18,6],[18,6],[18,6],[18,8],[18,6],[39,5],[19,4],[19,7],[19,6],[19,9],[30,3],[21,4],[21,6],[21,9],[21,6],[407,0],[407,2],[54,3],[54,2],[31,4],[31,5],[31,5],[22,8],[22,9],[32,3],[43,2],[43,4],[43,3],[43,5],[45,2],[45,4],[45,4],[45,6],[42,4],[42,6],[44,4],[44,6],[41,4],[41,6],[25,11],[25,8],[413,3],[413,3],[413,5],[34,4],[66,2],[57,2],[58,2],[58,2],[58,4],[144,4],[144,2],[144,2],[144,2],[144,2],[144,1],[144,2],[144,2],[422,1],[422,1],[423,1],[423,1],[423,1],[423,1],[423,1],[423,1],[423,1],[423,3],[419,3],[419,4],[419,2],[421,2],[421,3],[421,1],[425,3],[425,1],[428,3],[428,3],[428,3],[427,3],[427,1],[65,4],[65,3],[65,4],[65,5],[65,5],[65,6],[431,1],[431,1],[430,3],[430,2],[432,1],[432,1],[432,3],[429,1],[429,1],[51,2],[52,2],[50,2],[35,4],[35,3],[438,2],[59,3],[60,1],[61,1],[62,3],[63,2],[63,2],[64,2],[64,2],[446,1],[446,1],[69,2],[444,3],[444,1],[445,3],[445,1],[28,2],[449,1],[449,3],[450,3],[450,4],[450,5],[450,6],[46,3],[37,6],[453,1],[453,2],[454,2],[455,2],[456,2],[456,2],[456,1],[456,1],[458,4],[458,6],[461,1],[461,3],[459,5],[459,7],[459,7],[459,9],[459,7],[459,9],[462,3],[462,6],[462,3],[462,6],[457,0],[457,2],[457,5],[457,4],[457,7],[27,6],[469,2],[468,0],[468,2],[468,2],[468,1],[26,8],[23,3],[23,4],[473,3],[473,1],[474,3],[474,7],[474,6],[474,3],[474,4],[478,1],[478,1],[482,2],[483,3],[484,2],[485,4],[475,4],[475,3],[475,2],[475,1],[497,2],[493,2],[493,2],[498,4],[500,6],[67,3],[67,2],[506,3],[506,1],[504,1],[504,4],[68,2],[20,2],[48,9],[48,8],[48,9],[510,0],[510,1],[510,1],[510,1],[510,2],[511,1],[511,1],[511,1],[49,3],[38,2],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[11,1],[11,1],[80,0],[80,1],[83,0],[83,1],[90,0],[90,2],[91,0],[91,1],[96,0],[96,1],[97,0],[97,1],[101,0],[101,1],[108,0],[108,1],[121,0],[121,1],[125,1],[125,2],[126,1],[126,2],[127,0],[127,1],[155,0],[155,2],[157,0],[157,2],[159,0],[159,2],[160,1],[160,1],[161,0],[161,2],[165,0],[165,2],[167,0],[167,2],[176,0],[176,2],[177,0],[177,2],[178,0],[178,2],[188,0],[188,1],[197,0],[197,1],[210,0],[210,1],[211,0],[211,1],[219,0],[219,1],[220,0],[220,1],[248,0],[248,1],[250,0],[250,1],[251,0],[251,1],[252,0],[252,1],[264,1],[264,1],[767,1],[767,1],[289,0],[289,1],[301,1],[301,1],[337,1],[337,1],[371,0],[371,1],[375,0],[375,1],[382,0],[382,1],[383,0],[383,1],[394,0],[394,1],[395,0],[395,1],[397,1],[397,1],[411,0],[411,1],[412,0],[412,1],[465,0],[465,1],[466,0],[466,1],[467,0],[467,1],[471,0],[471,1],[476,0],[476,1],[477,0],[477,1],[479,0],[479,1],[480,0],[480,1],[481,0],[481,1],[486,0],[486,1],[487,0],[487,1],[488,0],[488,1],[489,0],[489,1],[490,0],[490,1],[491,0],[491,1],[492,0],[492,1],[494,0],[494,1],[495,0],[495,1],[496,0],[496,1],[499,0],[499,2],[501,0],[501,2],[502,0],[502,2],[503,0],[503,2],[512,0],[512,1],[513,0],[513,1]],performAction:function(t,i,r,u,f,e){var o=e.length-1,v,s,h,c,y,l,a,p,w,b;switch(f){case 1:this.$=n.options.casesensitive?e[o]:e[o].toLowerCase();break;case 2:this.$=vi(e[o].substr(1,e[o].length-2));break;case 3:this.$=e[o].toLowerCase();break;case 4:this.$=e[o];break;case 5:this.$=e[o]?e[o-1]+" "+e[o]:e[o-1];break;case 6:return new u.Statements({statements:e[o-1]});case 7:this.$=e[o-2];e[o]&&e[o-2].push(e[o]);break;case 8:case 9:case 70:case 80:case 85:case 143:case 177:case 205:case 206:case 242:case 261:case 273:case 354:case 372:case 451:case 474:case 475:case 479:case 487:case 528:case 529:case 566:case 649:case 659:case 683:case 685:case 687:case 701:case 702:case 732:case 756:this.$=[e[o]];break;case 10:this.$=e[o];e[o].explain=!0;break;case 11:this.$=e[o];e[o].explain=!0;break;case 12:this.$=e[o];u.exists&&(this.$.exists=u.exists);delete u.exists;u.queries&&(this.$.queries=u.queries);delete u.queries;break;case 13:case 162:case 172:case 237:case 238:case 240:case 248:case 250:case 259:case 267:case 270:case 375:case 491:case 501:case 503:case 515:case 521:case 522:case 567:this.$=undefined;break;case 68:this.$=new u.WithSelect({withs:e[o-1],select:e[o]});break;case 69:case 565:e[o-2].push(e[o]);this.$=e[o-2];break;case 71:this.$={name:e[o-4],select:e[o-1]};break;case 72:u.extend(this.$,e[o-9]);u.extend(this.$,e[o-8]);u.extend(this.$,e[o-7]);u.extend(this.$,e[o-6]);u.extend(this.$,e[o-5]);u.extend(this.$,e[o-4]);u.extend(this.$,e[o-3]);u.extend(this.$,e[o-2]);u.extend(this.$,e[o-1]);u.extend(this.$,e[o]);this.$=e[o-9];break;case 73:this.$=new u.Search({selectors:e[o-2],from:e[o]});u.extend(this.$,e[o-1]);break;case 74:this.$={pivot:{expr:e[o-5],columnid:e[o-3],inlist:e[o-2],as:e[o]}};break;case 75:this.$={unpivot:{tocolumnid:e[o-8],forcolumnid:e[o-6],inlist:e[o-3],as:e[o]}};break;case 76:case 520:case 549:case 585:case 619:case 636:case 637:case 640:case 662:this.$=e[o-1];break;case 77:case 78:case 86:case 147:case 185:case 247:case 280:case 288:case 289:case 290:case 291:case 292:case 293:case 294:case 295:case 296:case 297:case 298:case 299:case 300:case 301:case 304:case 305:case 320:case 321:case 322:case 323:case 324:case 325:case 374:case 440:case 441:case 442:case 443:case 444:case 445:case 516:case 542:case 546:case 548:case 623:case 624:case 625:case 626:case 627:case 628:case 632:case 634:case 635:case 644:case 660:case 661:case 723:case 738:case 739:case 741:case 742:case 748:case 749:this.$=e[o];break;case 79:case 84:case 731:case 755:this.$=e[o-2];this.$.push(e[o]);break;case 81:this.$={expr:e[o]};break;case 82:this.$={expr:e[o-2],as:e[o]};break;case 83:this.$={removecolumns:e[o]};break;case 87:this.$={like:e[o]};break;case 90:case 104:this.$={srchid:"PROP",args:[e[o]]};break;case 91:this.$={srchid:"ORDERBY",args:e[o-1]};break;case 92:v=e[o-1];v||(v="ASC");this.$={srchid:"ORDERBY",args:[{expression:new u.Column({columnid:"_"}),direction:v}]};break;case 93:this.$={srchid:"PARENT"};break;case 94:this.$={srchid:"APROP",args:[e[o]]};break;case 95:this.$={selid:"ROOT"};break;case 96:this.$={srchid:"EQ",args:[e[o]]};break;case 97:this.$={srchid:"LIKE",args:[e[o]]};break;case 98:case 99:this.$={selid:"WITH",args:e[o-1]};break;case 100:this.$={srchid:e[o-3].toUpperCase(),args:e[o-1]};break;case 101:this.$={srchid:"WHERE",args:[e[o-1]]};break;case 102:this.$={selid:"OF",args:[e[o-1]]};break;case 103:this.$={srchid:"CLASS",args:[e[o-1]]};break;case 105:this.$={srchid:"NAME",args:[e[o].substr(1,e[o].length-2)]};break;case 106:this.$={srchid:"CHILD"};break;case 107:this.$={srchid:"VERTEX"};break;case 108:this.$={srchid:"EDGE"};break;case 109:this.$={srchid:"REF"};break;case 110:this.$={srchid:"SHARP",args:[e[o]]};break;case 111:this.$={srchid:"ATTR",args:typeof e[o]=="undefined"?undefined:[e[o]]};break;case 112:this.$={srchid:"ATTR"};break;case 113:this.$={srchid:"OUT"};break;case 114:this.$={srchid:"IN"};break;case 115:this.$={srchid:"OUTOUT"};break;case 116:this.$={srchid:"ININ"};break;case 117:this.$={srchid:"CONTENT"};break;case 118:this.$={srchid:"EX",args:[new u.Json({value:e[o]})]};break;case 119:this.$={srchid:"AT",args:[e[o]]};break;case 120:this.$={srchid:"AS",args:[e[o]]};break;case 121:this.$={srchid:"SET",args:e[o-1]};break;case 122:this.$={selid:"TO",args:[e[o]]};break;case 123:this.$={srchid:"VALUE"};break;case 124:this.$={srchid:"ROW",args:e[o-1]};break;case 125:this.$={srchid:"CLASS",args:[e[o]]};break;case 126:this.$={selid:e[o],args:[e[o-1]]};break;case 127:this.$={selid:"NOT",args:e[o-1]};break;case 128:this.$={selid:"IF",args:e[o-1]};break;case 129:this.$={selid:e[o-3],args:e[o-1]};break;case 130:this.$={selid:"DISTINCT",args:e[o-1]};break;case 131:this.$={selid:"UNION",args:e[o-1]};break;case 132:this.$={selid:"UNIONALL",args:e[o-1]};break;case 133:this.$={selid:"ALL",args:[e[o-1]]};break;case 134:this.$={selid:"ANY",args:[e[o-1]]};break;case 135:this.$={selid:"INTERSECT",args:e[o-1]};break;case 136:this.$={selid:"EXCEPT",args:e[o-1]};break;case 137:this.$={selid:"AND",args:e[o-1]};break;case 138:this.$={selid:"OR",args:e[o-1]};break;case 139:this.$={selid:"PATH",args:[e[o-1]]};break;case 140:this.$={srchid:"RETURN",args:e[o-1]};break;case 141:this.$={selid:"REPEAT",sels:e[o-3],args:e[o-1]};break;case 142:this.$=e[o-2];this.$.push(e[o]);break;case 144:this.$="PLUS";break;case 145:this.$="STAR";break;case 146:this.$="QUESTION";break;case 148:this.$=new u.Select({columns:e[o],distinct:!0});u.extend(this.$,e[o-3]);u.extend(this.$,e[o-1]);break;case 149:this.$=new u.Select({columns:e[o],distinct:!0});u.extend(this.$,e[o-3]);u.extend(this.$,e[o-1]);break;case 150:this.$=new u.Select({columns:e[o],all:!0});u.extend(this.$,e[o-3]);u.extend(this.$,e[o-1]);break;case 151:e[o]?(this.$=new u.Select({columns:e[o]}),u.extend(this.$,e[o-2]),u.extend(this.$,e[o-1])):this.$=new u.Select({columns:[new u.Column({columnid:"_"})],modifier:"COLUMN"});break;case 152:this.$=e[o]=="SELECT"?undefined:{modifier:e[o]};break;case 153:this.$={modifier:"VALUE"};break;case 154:this.$={modifier:"ROW"};break;case 155:this.$={modifier:"COLUMN"};break;case 156:this.$={modifier:"MATRIX"};break;case 157:this.$={modifier:"TEXTSTRING"};break;case 158:this.$={modifier:"INDEX"};break;case 159:this.$={modifier:"RECORDSET"};break;case 160:this.$={top:e[o-1],percent:typeof e[o]!="undefined"?!0:undefined};break;case 161:this.$={top:e[o-1]};break;case 163:case 330:case 523:case 524:case 724:this.$=undefined;break;case 164:case 165:case 166:case 167:this.$={into:e[o]};break;case 168:s=e[o];s=s.substr(1,s.length-2);h=s.substr(-3).toUpperCase();c=s.substr(-4).toUpperCase();s[0]=="#"?this.$={into:new u.FuncValue({funcid:"HTML",args:[new u.StringValue({value:s}),new u.Json({value:{headers:!0}})]})}:h=="XLS"||h=="CSV"||h=="TAB"?this.$={into:new u.FuncValue({funcid:h,args:[new u.StringValue({value:s}),new u.Json({value:{headers:!0}})]})}:(c=="XLSX"||c=="JSON")&&(this.$={into:new u.FuncValue({funcid:c,args:[new u.StringValue({value:s}),new u.Json({value:{headers:!0}})]})});break;case 169:this.$={from:e[o]};break;case 170:this.$={from:e[o-1],joins:e[o]};break;case 171:this.$={from:e[o-2],joins:e[o-1]};break;case 173:this.$=new u.Apply({select:e[o-2],applymode:"CROSS",as:e[o]});break;case 174:this.$=new u.Apply({select:e[o-3],applymode:"CROSS",as:e[o]});break;case 175:this.$=new u.Apply({select:e[o-2],applymode:"OUTER",as:e[o]});break;case 176:this.$=new u.Apply({select:e[o-3],applymode:"OUTER",as:e[o]});break;case 178:case 243:case 452:case 530:case 531:this.$=e[o-2];e[o-2].push(e[o]);break;case 179:this.$=e[o-2];this.$.as=e[o];break;case 180:this.$=e[o-3];this.$.as=e[o];break;case 181:this.$=e[o-1];this.$.as="default";break;case 182:this.$=new u.Json({value:e[o-2]});e[o-2].as=e[o];break;case 183:this.$=e[o-1];e[o-1].as=e[o];break;case 184:this.$=e[o-2];e[o-2].as=e[o];break;case 186:case 638:case 641:this.$=e[o-2];break;case 187:case 191:case 195:case 198:this.$=e[o-1];e[o-1].as=e[o];break;case 188:case 192:case 196:case 199:this.$=e[o-2];e[o-2].as=e[o];break;case 189:case 190:case 194:case 197:this.$=e[o];e[o].as="default";break;case 193:this.$={inserted:!0};e[o].as="default";break;case 200:if(s=e[o],s=s.substr(1,s.length-2),h=s.substr(-3).toUpperCase(),c=s.substr(-4).toUpperCase(),s[0]=="#")y=new u.FuncValue({funcid:"HTML",args:[new u.StringValue({value:s}),new u.Json({value:{headers:!0}})]});else if(h=="XLS"||h=="CSV"||h=="TAB")y=new u.FuncValue({funcid:h,args:[new u.StringValue({value:s}),new u.Json({value:{headers:!0}})]});else if(c=="XLSX"||c=="JSON")y=new u.FuncValue({funcid:c,args:[new u.StringValue({value:s}),new u.Json({value:{headers:!0}})]});else throw new Error("Unknown string in FROM clause");this.$=y;break;case 201:this.$=e[o-2]=="INFORMATION_SCHEMA"?new u.FuncValue({funcid:e[o-2],args:[new u.StringValue({value:e[o]})]}):new u.Table({databaseid:e[o-2],tableid:e[o]});break;case 202:this.$=new u.Table({tableid:e[o]});break;case 203:case 204:this.$=e[o-1];e[o-1].push(e[o]);break;case 207:this.$=new u.Join(e[o-2]);u.extend(this.$,e[o-1]);u.extend(this.$,e[o]);break;case 208:this.$={table:e[o]};break;case 209:this.$={table:e[o-1],as:e[o]};break;case 210:this.$={table:e[o-2],as:e[o]};break;case 211:this.$={json:new u.Json({value:e[o-2],as:e[o]})};break;case 212:this.$={param:e[o-1],as:e[o]};break;case 213:this.$={param:e[o-2],as:e[o]};break;case 214:this.$={select:e[o-2],as:e[o]};break;case 215:this.$={select:e[o-3],as:e[o]};break;case 216:this.$={funcid:e[o],as:"default"};break;case 217:this.$={funcid:e[o-1],as:e[o]};break;case 218:this.$={funcid:e[o-2],as:e[o]};break;case 219:this.$={variable:e[o],as:"default"};break;case 220:this.$={variable:e[o-1],as:e[o]};break;case 221:this.$={variable:e[o-2],as:e[o]};break;case 222:this.$={joinmode:e[o]};break;case 223:this.$={joinmode:e[o-1],natural:!0};break;case 224:case 225:this.$="INNER";break;case 226:case 227:this.$="LEFT";break;case 228:case 229:this.$="RIGHT";break;case 230:case 231:this.$="OUTER";break;case 232:this.$="SEMI";break;case 233:this.$="ANTI";break;case 234:this.$="CROSS";break;case 235:this.$={on:e[o]};break;case 236:case 697:this.$={using:e[o]};break;case 239:this.$={where:new u.Expression({expression:e[o]})};break;case 241:this.$={group:e[o-1]};u.extend(this.$,e[o]);break;case 244:this.$=new u.GroupExpression({type:"GROUPING SETS",group:e[o-1]});break;case 245:this.$=new u.GroupExpression({type:"ROLLUP",group:e[o-1]});break;case 246:this.$=new u.GroupExpression({type:"CUBE",group:e[o-1]});break;case 249:this.$={having:e[o]};break;case 251:this.$={union:e[o]};break;case 252:this.$={unionall:e[o]};break;case 253:this.$={except:e[o]};break;case 254:this.$={intersect:e[o]};break;case 255:this.$={union:e[o],corresponding:!0};break;case 256:this.$={unionall:e[o],corresponding:!0};break;case 257:this.$={except:e[o],corresponding:!0};break;case 258:this.$={intersect:e[o],corresponding:!0};break;case 260:this.$={order:e[o]};break;case 262:this.$=e[o-2];e[o-2].push(e[o]);break;case 263:this.$=new u.Expression({expression:e[o],direction:"ASC"});break;case 264:this.$=new u.Expression({expression:e[o-1],direction:e[o].toUpperCase()});break;case 265:this.$=new u.Expression({expression:e[o-2],direction:"ASC",nocase:!0});break;case 266:this.$=new u.Expression({expression:e[o-3],direction:e[o].toUpperCase(),nocase:!0});break;case 268:this.$={limit:e[o-1]};u.extend(this.$,e[o]);break;case 269:this.$={limit:e[o-2],offset:e[o-6]};break;case 271:this.$={offset:e[o]};break;case 272:case 509:case 533:case 648:case 658:case 682:case 684:case 688:e[o-2].push(e[o]);this.$=e[o-2];break;case 274:case 276:case 278:e[o-2].as=e[o];this.$=e[o-2];break;case 275:case 277:case 279:e[o-1].as=e[o];this.$=e[o-1];break;case 281:this.$=new u.Column({columid:e[o],tableid:e[o-2],databaseid:e[o-4]});break;case 282:this.$=new u.Column({columnid:e[o],tableid:e[o-2]});break;case 283:this.$=new u.Column({columnid:e[o]});break;case 284:this.$=new u.Column({columnid:e[o],tableid:e[o-2],databaseid:e[o-4]});break;case 285:case 286:this.$=new u.Column({columnid:e[o],tableid:e[o-2]});break;case 287:this.$=new u.Column({columnid:e[o]});break;case 302:this.$=new u.DomainValueValue;break;case 303:this.$=new u.Json({value:e[o]});break;case 306:case 307:case 308:u.queries||(u.queries=[]);u.queries.push(e[o-1]);e[o-1].queriesidx=u.queries.length;this.$=e[o-1];break;case 309:this.$=e[o];break;case 310:this.$=new u.FuncValue({funcid:"CURRENT_TIMESTAMP"});break;case 311:this.$=new u.JavaScript({value:e[o].substr(2,e[o].length-4)});break;case 312:this.$=new u.JavaScript({value:'alasql.fn["'+e[o-2]+'"] = '+e[o].substr(2,e[o].length-4)});break;case 313:this.$=new u.JavaScript({value:'alasql.aggr["'+e[o-2]+'"] = '+e[o].substr(2,e[o].length-4)});break;case 314:this.$=new u.FuncValue({funcid:e[o],newid:!0});break;case 315:this.$=e[o];u.extend(this.$,{newid:!0});break;case 316:this.$=new u.Convert({expression:e[o-3]});u.extend(this.$,e[o-1]);break;case 317:this.$=new u.Convert({expression:e[o-5],style:e[o-1]});u.extend(this.$,e[o-3]);break;case 318:this.$=new u.Convert({expression:e[o-1]});u.extend(this.$,e[o-3]);break;case 319:this.$=new u.Convert({expression:e[o-3],style:e[o-1]});u.extend(this.$,e[o-5]);break;case 326:this.$=new u.FuncValue({funcid:"CURRENT_TIMESTAMP"});break;case 327:this.$=e[o-2].length>1&&(e[o-4].toUpperCase()=="MAX"||e[o-4].toUpperCase()=="MIN")?new u.FuncValue({funcid:e[o-4],args:e[o-2]}):new u.AggrValue({aggregatorid:e[o-4].toUpperCase(),expression:e[o-2].pop(),over:e[o]});break;case 328:this.$=new u.AggrValue({aggregatorid:e[o-5].toUpperCase(),expression:e[o-2],distinct:!0,over:e[o]});break;case 329:this.$=new u.AggrValue({aggregatorid:e[o-5].toUpperCase(),expression:e[o-2],over:e[o]});break;case 331:case 332:this.$=new u.Over;u.extend(this.$,e[o-1]);break;case 333:this.$=new u.Over;u.extend(this.$,e[o-2]);u.extend(this.$,e[o-1]);break;case 334:this.$={partition:e[o]};break;case 335:this.$={order:e[o]};break;case 336:this.$="SUM";break;case 337:this.$="COUNT";break;case 338:this.$="MIN";break;case 339:case 544:this.$="MAX";break;case 340:this.$="AVG";break;case 341:this.$="FIRST";break;case 342:this.$="LAST";break;case 343:this.$="AGGR";break;case 344:this.$="ARRAY";break;case 345:l=e[o-4];a=e[o-1];this.$=a.length>1&&(l.toUpperCase()=="MIN"||l.toUpperCase()=="MAX")?new u.FuncValue({funcid:l,args:a}):n.aggr[e[o-4]]?new u.AggrValue({aggregatorid:"REDUCE",funcid:l,expression:a.pop(),distinct:e[o-2]=="DISTINCT"}):new u.FuncValue({funcid:l,args:a});break;case 346:this.$=new u.FuncValue({funcid:e[o-2]});break;case 347:this.$=new u.FuncValue({funcid:"IIF",args:e[o-1]});break;case 348:this.$=new u.FuncValue({funcid:"REPLACE",args:e[o-1]});break;case 349:this.$=new u.FuncValue({funcid:"DATEADD",args:[new u.StringValue({value:e[o-5]}),e[o-3],e[o-1]]});break;case 350:this.$=new u.FuncValue({funcid:"DATEADD",args:[e[o-5],e[o-3],e[o-1]]});break;case 351:this.$=new u.FuncValue({funcid:"DATEDIFF",args:[new u.StringValue({value:e[o-5]}),e[o-3],e[o-1]]});break;case 352:this.$=new u.FuncValue({funcid:"DATEDIFF",args:[e[o-5],e[o-3],e[o-1]]});break;case 353:this.$=new u.FuncValue({funcid:"INTERVAL",args:[e[o-1],new u.StringValue({value:e[o].toLowerCase()})]});break;case 355:e[o-2].push(e[o]);this.$=e[o-2];break;case 356:this.$=new u.NumValue({value:+e[o]});break;case 357:this.$=new u.LogicValue({value:!0});break;case 358:this.$=new u.LogicValue({value:!1});break;case 359:this.$=new u.StringValue({value:e[o].substr(1,e[o].length-2).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")});break;case 360:this.$=new u.StringValue({value:e[o].substr(2,e[o].length-3).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")});break;case 361:this.$=new u.NullValue({value:undefined});break;case 362:this.$=new u.VarValue({variable:e[o]});break;case 363:u.exists||(u.exists=[]);this.$=new u.ExistsValue({value:e[o-1],existsidx:u.exists.length});u.exists.push(e[o-1]);break;case 364:this.$=new u.ArrayValue({value:e[o-1]});break;case 365:case 366:this.$=new u.ParamValue({param:e[o]});break;case 367:typeof u.question=="undefined"&&(u.question=0);this.$=new u.ParamValue({param:u.question++});break;case 368:typeof u.question=="undefined"&&(u.question=0);this.$=new u.ParamValue({param:u.question++,array:!0});break;case 369:this.$=new u.CaseValue({expression:e[o-3],whens:e[o-2],elses:e[o-1]});break;case 370:this.$=new u.CaseValue({whens:e[o-2],elses:e[o-1]});break;case 371:case 699:case 700:this.$=e[o-1];this.$.push(e[o]);break;case 373:this.$={when:e[o-2],then:e[o]};break;case 376:case 377:this.$=new u.Op({left:e[o-2],op:"REGEXP",right:e[o]});break;case 378:this.$=new u.Op({left:e[o-2],op:"GLOB",right:e[o]});break;case 379:this.$=new u.Op({left:e[o-2],op:"LIKE",right:e[o]});break;case 380:this.$=new u.Op({left:e[o-4],op:"LIKE",right:e[o-2],escape:e[o]});break;case 381:this.$=new u.Op({left:e[o-2],op:"NOT LIKE",right:e[o]});break;case 382:this.$=new u.Op({left:e[o-4],op:"NOT LIKE",right:e[o-2],escape:e[o]});break;case 383:this.$=new u.Op({left:e[o-2],op:"||",right:e[o]});break;case 384:this.$=new u.Op({left:e[o-2],op:"+",right:e[o]});break;case 385:this.$=new u.Op({left:e[o-2],op:"-",right:e[o]});break;case 386:this.$=new u.Op({left:e[o-2],op:"*",right:e[o]});break;case 387:this.$=new u.Op({left:e[o-2],op:"/",right:e[o]});break;case 388:this.$=new u.Op({left:e[o-2],op:"%",right:e[o]});break;case 389:this.$=new u.Op({left:e[o-2],op:"^",right:e[o]});break;case 390:this.$=new u.Op({left:e[o-2],op:">>",right:e[o]});break;case 391:this.$=new u.Op({left:e[o-2],op:"<<",right:e[o]});break;case 392:this.$=new u.Op({left:e[o-2],op:"&",right:e[o]});break;case 393:this.$=new u.Op({left:e[o-2],op:"|",right:e[o]});break;case 394:case 395:case 397:this.$=new u.Op({left:e[o-2],op:"->",right:e[o]});break;case 396:this.$=new u.Op({left:e[o-4],op:"->",right:e[o-1]});break;case 398:case 399:case 401:this.$=new u.Op({left:e[o-2],op:"!",right:e[o]});break;case 400:this.$=new u.Op({left:e[o-4],op:"!",right:e[o-1]});break;case 402:this.$=new u.Op({left:e[o-2],op:">",right:e[o]});break;case 403:this.$=new u.Op({left:e[o-2],op:">=",right:e[o]});break;case 404:this.$=new u.Op({left:e[o-2],op:"<",right:e[o]});break;case 405:this.$=new u.Op({left:e[o-2],op:"<=",right:e[o]});break;case 406:this.$=new u.Op({left:e[o-2],op:"=",right:e[o]});break;case 407:this.$=new u.Op({left:e[o-2],op:"==",right:e[o]});break;case 408:this.$=new u.Op({left:e[o-2],op:"===",right:e[o]});break;case 409:this.$=new u.Op({left:e[o-2],op:"!=",right:e[o]});break;case 410:this.$=new u.Op({left:e[o-2],op:"!==",right:e[o]});break;case 411:this.$=new u.Op({left:e[o-2],op:"!===",right:e[o]});break;case 412:u.queries||(u.queries=[]);this.$=new u.Op({left:e[o-5],op:e[o-4],allsome:e[o-3],right:e[o-1],queriesidx:u.queries.length});u.queries.push(e[o-1]);break;case 413:this.$=new u.Op({left:e[o-5],op:e[o-4],allsome:e[o-3],right:e[o-1]});break;case 414:this.$=e[o-2].op=="BETWEEN1"?e[o-2].left.op=="AND"?new u.Op({left:e[o-2].left.left,op:"AND",right:new u.Op({left:e[o-2].left.right,op:"BETWEEN",right1:e[o-2].right,right2:e[o]})}):new u.Op({left:e[o-2].left,op:"BETWEEN",right1:e[o-2].right,right2:e[o]}):e[o-2].op=="NOT BETWEEN1"?e[o-2].left.op=="AND"?new u.Op({left:e[o-2].left.left,op:"AND",right:new u.Op({left:e[o-2].left.right,op:"NOT BETWEEN",right1:e[o-2].right,right2:e[o]})}):new u.Op({left:e[o-2].left,op:"NOT BETWEEN",right1:e[o-2].right,right2:e[o]}):new u.Op({left:e[o-2],op:"AND",right:e[o]});break;case 415:this.$=new u.Op({left:e[o-2],op:"OR",right:e[o]});break;case 416:this.$=new u.UniOp({op:"NOT",right:e[o]});break;case 417:this.$=new u.UniOp({op:"-",right:e[o]});break;case 418:this.$=new u.UniOp({op:"+",right:e[o]});break;case 419:this.$=new u.UniOp({op:"~",right:e[o]});break;case 420:this.$=new u.UniOp({op:"#",right:e[o]});break;case 421:this.$=new u.UniOp({right:e[o-1]});break;case 422:u.queries||(u.queries=[]);this.$=new u.Op({left:e[o-4],op:"IN",right:e[o-1],queriesidx:u.queries.length});u.queries.push(e[o-1]);break;case 423:u.queries||(u.queries=[]);this.$=new u.Op({left:e[o-5],op:"NOT IN",right:e[o-1],queriesidx:u.queries.length});u.queries.push(e[o-1]);break;case 424:this.$=new u.Op({left:e[o-4],op:"IN",right:e[o-1]});break;case 425:this.$=new u.Op({left:e[o-5],op:"NOT IN",right:e[o-1]});break;case 426:this.$=new u.Op({left:e[o-3],op:"IN",right:[]});break;case 427:this.$=new u.Op({left:e[o-4],op:"NOT IN",right:[]});break;case 428:case 430:this.$=new u.Op({left:e[o-2],op:"IN",right:e[o]});break;case 429:case 431:this.$=new u.Op({left:e[o-3],op:"NOT IN",right:e[o]});break;case 432:this.$=new u.Op({left:e[o-2],op:"BETWEEN1",right:e[o]});break;case 433:this.$=new u.Op({left:e[o-2],op:"NOT BETWEEN1",right:e[o]});break;case 434:this.$=new u.Op({op:"IS",left:e[o-2],right:e[o]});break;case 435:this.$=new u.Op({op:"IS",left:e[o-2],right:new u.UniOp({op:"NOT",right:new u.NullValue({value:undefined})})});break;case 436:this.$=new u.Convert({expression:e[o-2]});u.extend(this.$,e[o]);break;case 437:case 438:this.$=e[o];break;case 439:this.$=e[o-1];break;case 446:this.$="ALL";break;case 447:this.$="SOME";break;case 448:this.$="ANY";break;case 449:this.$=new u.Update({table:e[o-4],columns:e[o-2],where:e[o]});break;case 450:this.$=new u.Update({table:e[o-2],columns:e[o]});break;case 453:this.$=new u.SetColumn({column:e[o-2],expression:e[o]});break;case 454:this.$=new u.SetColumn({variable:e[o-2],expression:e[o],method:e[o-3]});break;case 455:this.$=new u.Delete({table:e[o-2],where:e[o]});break;case 456:this.$=new u.Delete({table:e[o]});break;case 457:this.$=new u.Insert({into:e[o-2],values:e[o]});break;case 458:this.$=new u.Insert({into:e[o-1],values:e[o]});break;case 459:case 461:this.$=new u.Insert({into:e[o-2],values:e[o],orreplace:!0});break;case 460:case 462:this.$=new u.Insert({into:e[o-1],values:e[o],orreplace:!0});break;case 463:this.$=new u.Insert({into:e[o-2],"default":!0});break;case 464:this.$=new u.Insert({into:e[o-5],columns:e[o-3],values:e[o]});break;case 465:this.$=new u.Insert({into:e[o-4],columns:e[o-2],values:e[o]});break;case 466:this.$=new u.Insert({into:e[o-1],select:e[o]});break;case 467:this.$=new u.Insert({into:e[o-1],select:e[o],orreplace:!0});break;case 468:this.$=new u.Insert({into:e[o-4],columns:e[o-2],select:e[o]});break;case 473:this.$=[e[o-1]];break;case 476:this.$=e[o-4];e[o-4].push(e[o-1]);break;case 477:case 478:case 480:case 488:this.$=e[o-2];e[o-2].push(e[o]);break;case 489:this.$=new u.CreateTable({table:e[o-4]});u.extend(this.$,e[o-7]);u.extend(this.$,e[o-6]);u.extend(this.$,e[o-5]);u.extend(this.$,e[o-2]);u.extend(this.$,e[o]);break;case 490:this.$=new u.CreateTable({table:e[o]});u.extend(this.$,e[o-3]);u.extend(this.$,e[o-2]);u.extend(this.$,e[o-1]);break;case 492:this.$={"class":!0};break;case 502:this.$={temporary:!0};break;case 504:this.$={ifnotexists:!0};break;case 505:this.$={columns:e[o-2],constraints:e[o]};break;case 506:this.$={columns:e[o]};break;case 507:this.$={as:e[o]};break;case 508:case 532:this.$=[e[o]];break;case 510:case 511:case 512:case 513:case 514:e[o].constraintid=e[o-1];this.$=e[o];break;case 517:this.$={type:"CHECK",expression:e[o-1]};break;case 518:this.$={type:"PRIMARY KEY",columns:e[o-1],clustered:(e[o-3]+"").toUpperCase()};break;case 519:this.$={type:"FOREIGN KEY",columns:e[o-5],fktable:e[o-2],fkcolumns:e[o-1]};break;case 525:this.$={type:"UNIQUE",columns:e[o-1],clustered:(e[o-3]+"").toUpperCase()};break;case 534:this.$=new u.ColumnDef({columnid:e[o-2]});u.extend(this.$,e[o-1]);u.extend(this.$,e[o]);break;case 535:this.$=new u.ColumnDef({columnid:e[o-1]});u.extend(this.$,e[o]);break;case 536:this.$=new u.ColumnDef({columnid:e[o],dbtypeid:""});break;case 537:this.$={dbtypeid:e[o-5],dbsize:e[o-3],dbprecision:+e[o-1]};break;case 538:this.$={dbtypeid:e[o-3],dbsize:e[o-1]};break;case 539:this.$={dbtypeid:e[o]};break;case 540:this.$={dbtypeid:"ENUM",enumvalues:e[o-1]};break;case 541:this.$=e[o-1];e[o-1].dbtypeid+="["+e[o]+"]";break;case 543:case 750:this.$=+e[o];break;case 545:this.$=undefined;break;case 547:u.extend(e[o-1],e[o]);this.$=e[o-1];break;case 550:this.$={primarykey:!0};break;case 551:case 552:this.$={foreignkey:{table:e[o-1],columnid:e[o]}};break;case 553:this.$={identity:{value:e[o-3],step:e[o-1]}};break;case 554:this.$={identity:{value:1,step:1}};break;case 555:case 557:this.$={"default":e[o]};break;case 556:this.$={"default":e[o-1]};break;case 558:this.$={"null":!0};break;case 559:this.$={notnull:!0};break;case 560:this.$={check:e[o]};break;case 561:this.$={unique:!0};break;case 562:this.$={onupdate:e[o]};break;case 563:this.$={onupdate:e[o-1]};break;case 564:this.$=new u.DropTable({tables:e[o],type:e[o-2]});u.extend(this.$,e[o-1]);break;case 568:this.$={ifexists:!0};break;case 569:this.$=new u.AlterTable({table:e[o-3],renameto:e[o]});break;case 570:this.$=new u.AlterTable({table:e[o-3],addcolumn:e[o]});break;case 571:this.$=new u.AlterTable({table:e[o-3],modifycolumn:e[o]});break;case 572:this.$=new u.AlterTable({table:e[o-5],renamecolumn:e[o-2],to:e[o]});break;case 573:this.$=new u.AlterTable({table:e[o-3],dropcolumn:e[o]});break;case 574:this.$=new u.AlterTable({table:e[o-2],renameto:e[o]});break;case 575:this.$=new u.AttachDatabase({databaseid:e[o],engineid:e[o-2].toUpperCase()});break;case 576:this.$=new u.AttachDatabase({databaseid:e[o-3],engineid:e[o-5].toUpperCase(),args:e[o-1]});break;case 577:this.$=new u.AttachDatabase({databaseid:e[o-2],engineid:e[o-4].toUpperCase(),as:e[o]});break;case 578:this.$=new u.AttachDatabase({databaseid:e[o-5],engineid:e[o-7].toUpperCase(),as:e[o],args:e[o-3]});break;case 579:this.$=new u.DetachDatabase({databaseid:e[o]});break;case 580:this.$=new u.CreateDatabase({databaseid:e[o]});u.extend(this.$,e[o]);break;case 581:this.$=new u.CreateDatabase({engineid:e[o-4].toUpperCase(),databaseid:e[o-1],as:e[o]});u.extend(this.$,e[o-2]);break;case 582:this.$=new u.CreateDatabase({engineid:e[o-7].toUpperCase(),databaseid:e[o-4],args:e[o-2],as:e[o]});u.extend(this.$,e[o-5]);break;case 583:this.$=new u.CreateDatabase({engineid:e[o-4].toUpperCase(),as:e[o],args:[e[o-1]]});u.extend(this.$,e[o-2]);break;case 584:this.$=undefined;break;case 586:case 587:this.$=new u.UseDatabase({databaseid:e[o]});break;case 588:this.$=new u.DropDatabase({databaseid:e[o]});u.extend(this.$,e[o-1]);break;case 589:case 590:this.$=new u.DropDatabase({databaseid:e[o],engineid:e[o-3].toUpperCase()});u.extend(this.$,e[o-1]);break;case 591:this.$=new u.CreateIndex({indexid:e[o-5],table:e[o-3],columns:e[o-1]});break;case 592:this.$=new u.CreateIndex({indexid:e[o-5],table:e[o-3],columns:e[o-1],unique:!0});break;case 593:this.$=new u.DropIndex({indexid:e[o]});break;case 594:this.$=new u.ShowDatabases;break;case 595:this.$=new u.ShowDatabases({like:e[o]});break;case 596:this.$=new u.ShowDatabases({engineid:e[o-1].toUpperCase()});break;case 597:this.$=new u.ShowDatabases({engineid:e[o-3].toUpperCase(),like:e[o]});break;case 598:this.$=new u.ShowTables;break;case 599:this.$=new u.ShowTables({like:e[o]});break;case 600:this.$=new u.ShowTables({databaseid:e[o]});break;case 601:this.$=new u.ShowTables({like:e[o],databaseid:e[o-2]});break;case 602:this.$=new u.ShowColumns({table:e[o]});break;case 603:this.$=new u.ShowColumns({table:e[o-2],databaseid:e[o]});break;case 604:this.$=new u.ShowIndex({table:e[o]});break;case 605:this.$=new u.ShowIndex({table:e[o-2],databaseid:e[o]});break;case 606:this.$=new u.ShowCreateTable({table:e[o]});break;case 607:this.$=new u.ShowCreateTable({table:e[o-2],databaseid:e[o]});break;case 608:this.$=new u.CreateTable({table:e[o-6],view:!0,select:e[o-1],viewcolumns:e[o-4]});u.extend(this.$,e[o-9]);u.extend(this.$,e[o-7]);break;case 609:this.$=new u.CreateTable({table:e[o-3],view:!0,select:e[o-1]});u.extend(this.$,e[o-6]);u.extend(this.$,e[o-4]);break;case 613:this.$=new u.DropTable({tables:e[o],view:!0});u.extend(this.$,e[o-1]);break;case 614:case 760:this.$=new u.ExpressionStatement({expression:e[o]});break;case 615:this.$=new u.Source({url:e[o].value});break;case 616:this.$=new u.Assert({value:e[o]});break;case 617:this.$=new u.Assert({value:e[o].value});break;case 618:this.$=new u.Assert({value:e[o],message:e[o-2]});break;case 620:case 631:case 633:this.$=e[o].value;break;case 621:case 629:this.$=+e[o].value;break;case 622:this.$=!!e[o].value;break;case 630:this.$=""+e[o].value;break;case 639:this.$={};break;case 642:this.$=[];break;case 643:u.extend(e[o-2],e[o]);this.$=e[o-2];break;case 645:this.$={};this.$[e[o-2].substr(1,e[o-2].length-2)]=e[o];break;case 646:case 647:this.$={};this.$[e[o-2]]=e[o];break;case 650:this.$=new u.SetVariable({variable:e[o-2].toLowerCase(),value:e[o]});break;case 651:this.$=new u.SetVariable({variable:e[o-1].toLowerCase(),value:e[o]});break;case 652:this.$=new u.SetVariable({variable:e[o-2],expression:e[o]});break;case 653:this.$=new u.SetVariable({variable:e[o-3],props:e[o-2],expression:e[o]});break;case 654:this.$=new u.SetVariable({variable:e[o-2],expression:e[o],method:e[o-3]});break;case 655:this.$=new u.SetVariable({variable:e[o-3],props:e[o-2],expression:e[o],method:e[o-4]});break;case 656:this.$="@";break;case 657:this.$="$";break;case 663:this.$=!0;break;case 664:this.$=!1;break;case 665:this.$=new u.CommitTransaction;break;case 666:this.$=new u.RollbackTransaction;break;case 667:this.$=new u.BeginTransaction;break;case 668:this.$=new u.If({expression:e[o-2],thenstat:e[o-1],elsestat:e[o]});e[o-1].exists&&(this.$.exists=e[o-1].exists);e[o-1].queries&&(this.$.queries=e[o-1].queries);break;case 669:this.$=new u.If({expression:e[o-1],thenstat:e[o]});e[o].exists&&(this.$.exists=e[o].exists);e[o].queries&&(this.$.queries=e[o].queries);break;case 670:this.$=e[o];break;case 671:this.$=new u.While({expression:e[o-1],loopstat:e[o]});e[o].exists&&(this.$.exists=e[o].exists);e[o].queries&&(this.$.queries=e[o].queries);break;case 672:this.$=new u.Continue;break;case 673:this.$=new u.Break;break;case 674:this.$=new u.BeginEnd({statements:e[o-1]});break;case 675:this.$=new u.Print({exprs:e[o]});break;case 676:this.$=new u.Print({select:e[o]});break;case 677:this.$=new u.Require({paths:e[o]});break;case 678:this.$=new u.Require({plugins:e[o]});break;case 679:case 680:this.$=e[o].toUpperCase();break;case 681:this.$=new u.Echo({expr:e[o]});break;case 686:this.$=new u.Declare({declares:e[o]});break;case 689:this.$={variable:e[o-1]};u.extend(this.$,e[o]);break;case 690:this.$={variable:e[o-2]};u.extend(this.$,e[o]);break;case 691:this.$={variable:e[o-3],expression:e[o]};u.extend(this.$,e[o-2]);break;case 692:this.$={variable:e[o-4],expression:e[o]};u.extend(this.$,e[o-2]);break;case 693:this.$=new u.TruncateTable({table:e[o]});break;case 694:this.$=new u.Merge;u.extend(this.$,e[o-4]);u.extend(this.$,e[o-3]);u.extend(this.$,e[o-2]);u.extend(this.$,{matches:e[o-1]});u.extend(this.$,e[o]);break;case 695:case 696:this.$={into:e[o]};break;case 698:this.$={on:e[o]};break;case 703:this.$={matched:!0,action:e[o]};break;case 704:this.$={matched:!0,expr:e[o-2],action:e[o]};break;case 705:this.$={"delete":!0};break;case 706:this.$={update:e[o]};break;case 707:case 708:this.$={matched:!1,bytarget:!0,action:e[o]};break;case 709:case 710:this.$={matched:!1,bytarget:!0,expr:e[o-2],action:e[o]};break;case 711:this.$={matched:!1,bysource:!0,action:e[o]};break;case 712:this.$={matched:!1,bysource:!0,expr:e[o-2],action:e[o]};break;case 713:this.$={insert:!0,values:e[o]};break;case 714:this.$={insert:!0,values:e[o],columns:e[o-3]};break;case 715:this.$={insert:!0,defaultvalues:!0};break;case 716:this.$={insert:!0,defaultvalues:!0,columns:e[o-3]};break;case 718:this.$={output:{columns:e[o]}};break;case 719:this.$={output:{columns:e[o-3],intovar:e[o],method:e[o-1]}};break;case 720:this.$={output:{columns:e[o-2],intotable:e[o]}};break;case 721:this.$={output:{columns:e[o-5],intotable:e[o-3],intocolumns:e[o-1]}};break;case 722:this.$=new u.CreateVertex({"class":e[o-3],sharp:e[o-2],name:e[o-1]});u.extend(this.$,e[o]);break;case 725:this.$={sets:e[o]};break;case 726:this.$={content:e[o]};break;case 727:this.$={select:e[o]};break;case 728:this.$=new u.CreateEdge({from:e[o-3],to:e[o-1],name:e[o-5]});u.extend(this.$,e[o]);break;case 729:this.$=new u.CreateGraph({graph:e[o]});break;case 730:this.$=new u.CreateGraph({from:e[o]});break;case 733:this.$=e[o-2];e[o-1]&&(this.$.json=new u.Json({value:e[o-1]}));e[o]&&(this.$.as=e[o]);break;case 734:this.$={source:e[o-6],target:e[o]};e[o-3]&&(this.$.json=new u.Json({value:e[o-3]}));e[o-2]&&(this.$.as=e[o-2]);u.extend(this.$,e[o-4]);break;case 735:this.$={source:e[o-5],target:e[o]};e[o-2]&&(this.$.json=new u.Json({value:e[o-3]}));e[o-1]&&(this.$.as=e[o-2]);break;case 736:this.$={source:e[o-2],target:e[o]};break;case 740:this.$={vars:e[o],method:e[o-1]};break;case 743:case 744:p=e[o-1];this.$={prop:e[o-3],sharp:e[o-2],name:typeof p=="undefined"?undefined:p.substr(1,p.length-2),"class":e[o]};break;case 745:w=e[o-1];this.$={sharp:e[o-2],name:typeof w=="undefined"?undefined:w.substr(1,w.length-2),"class":e[o]};break;case 746:b=e[o-1];this.$={name:typeof b=="undefined"?undefined:b.substr(1,b.length-2),"class":e[o]};break;case 747:this.$={"class":e[o]};break;case 753:this.$=new u.AddRule({left:e[o-2],right:e[o]});break;case 754:this.$=new u.AddRule({right:e[o]});break;case 757:this.$=new u.Term({termid:e[o]});break;case 758:this.$=new u.Term({termid:e[o-3],args:e[o-1]});break;case 761:this.$=new u.CreateTrigger({trigger:e[o-6],when:e[o-5],action:e[o-4],table:e[o-2],statement:e[o]});e[o].exists&&(this.$.exists=e[o].exists);e[o].queries&&(this.$.queries=e[o].queries);break;case 762:this.$=new u.CreateTrigger({trigger:e[o-5],when:e[o-4],action:e[o-3],table:e[o-1],funcid:e[o]});break;case 763:this.$=new u.CreateTrigger({trigger:e[o-6],when:e[o-4],action:e[o-3],table:e[o-5],statement:e[o]});e[o].exists&&(this.$.exists=e[o].exists);e[o].queries&&(this.$.queries=e[o].queries);break;case 764:case 765:case 767:this.$="AFTER";break;case 766:this.$="BEFORE";break;case 768:this.$="INSTEADOF";break;case 769:this.$="INSERT";break;case 770:this.$="DELETE";break;case 771:this.$="UPDATE";break;case 772:this.$=new u.DropTrigger({trigger:e[o]});break;case 773:this.$=new u.Reindex({indexid:e[o]});break;case 1047:case 1067:case 1069:case 1071:case 1075:case 1077:case 1079:case 1081:case 1083:case 1085:this.$=[];break;case 1048:case 1062:case 1064:case 1068:case 1070:case 1072:case 1076:case 1078:case 1080:case 1082:case 1084:case 1086:e[o-1].push(e[o]);break;case 1061:case 1063:this.$=[e[o]]}},table:[t([10,602,764],ao,{8:1,9:2,12:3,13:4,17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,2:i,4:r,5:u,14:py,53:vo,72:yo,89:eu,124:kh,146:po,156:wo,189:ou,266:lt,267:bo,290:ko,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),{1:[3]},{10:[1,105],11:106,602:wy,764:by},t(ch,[2,8]),t(ch,[2,9]),t(s,[2,12]),t(ch,ao,{17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,12:109,2:i,4:r,5:u,15:[1,110],53:vo,72:yo,89:eu,124:kh,146:po,156:wo,189:ou,266:lt,267:bo,290:ko,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),t(s,[2,14]),t(s,[2,15]),t(s,[2,16]),t(s,[2,17]),t(s,[2,18]),t(s,[2,19]),t(s,[2,20]),t(s,[2,21]),t(s,[2,22]),t(s,[2,23]),t(s,[2,24]),t(s,[2,25]),t(s,[2,26]),t(s,[2,27]),t(s,[2,28]),t(s,[2,29]),t(s,[2,30]),t(s,[2,31]),t(s,[2,32]),t(s,[2,33]),t(s,[2,34]),t(s,[2,35]),t(s,[2,36]),t(s,[2,37]),t(s,[2,38]),t(s,[2,39]),t(s,[2,40]),t(s,[2,41]),t(s,[2,42]),t(s,[2,43]),t(s,[2,44]),t(s,[2,45]),t(s,[2,46]),t(s,[2,47]),t(s,[2,48]),t(s,[2,49]),t(s,[2,50]),t(s,[2,51]),t(s,[2,52]),t(s,[2,53]),t(s,[2,54]),t(s,[2,55]),t(s,[2,56]),t(s,[2,57]),t(s,[2,58]),t(s,[2,59]),t(s,[2,60]),t(s,[2,61]),t(s,[2,62]),t(s,[2,63]),t(s,[2,64]),t(s,[2,65]),t(s,[2,66]),t(s,[2,67]),{353:[1,111]},{2:i,3:112,4:r,5:u},{2:i,3:114,4:r,5:u,156:p,200:113,290:d,291:w,292:b,293:k},t(ky,[2,501],{3:121,348:125,2:i,4:r,5:u,134:dy,135:gy,187:[1,123],193:[1,122],268:[1,129],269:[1,130],357:[1,131],405:[1,120],472:[1,124],509:[1,128]}),{145:np,449:132,450:133},{183:[1,135]},{405:[1,136]},{2:i,3:138,4:r,5:u,130:[1,144],193:[1,139],353:[1,143],397:140,405:[1,137],410:[1,141],509:[1,142]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:145,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(ku,gl,{340:204,171:[1,205],198:na}),t(ku,gl,{340:207,198:na}),{2:i,3:219,4:r,5:u,77:tl,132:uc,143:h,144:212,145:vt,152:c,156:p,181:l,198:[1,210],199:213,200:215,201:214,202:217,209:209,213:fc,214:218,290:d,291:w,292:b,293:k,302:a,419:190,420:o,424:e,453:208},{2:i,3:221,4:r,5:u},{353:[1,222]},t(fv,[2,1043],{80:223,106:224,107:[1,225]}),t(tp,[2,1047],{90:226}),{2:i,3:230,4:r,5:u,190:[1,228],193:[1,231],267:[1,227],353:[1,232],405:[1,229]},{353:[1,233]},{2:i,3:236,4:r,5:u,73:234,75:235},t([306,602,764],ao,{12:3,13:4,17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,9:238,2:i,4:r,5:u,14:py,53:vo,72:yo,89:eu,124:kh,146:po,156:wo,189:ou,266:lt,267:bo,290:ko,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,435:[1,237],436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),{435:[1,239]},{435:[1,240]},{2:i,3:242,4:r,5:u,405:[1,241]},{2:i,3:244,4:r,5:u,199:243},t(sr,[2,311]),{113:245,132:y,296:v},{2:i,3:114,4:r,5:u,113:251,131:g,132:[1,248],143:h,144:246,145:lu,152:c,156:p,181:l,196:250,200:255,201:254,257:252,258:253,265:ev,274:247,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,302:a,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:257,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(s,[2,672]),t(s,[2,673]),{2:i,3:168,4:r,5:u,40:259,56:165,77:yt,79:75,89:eu,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:258,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,184:99,189:ou,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:266,4:r,5:u,113:263,132:y,296:v,444:261,445:262,446:264,447:ip},{2:i,3:267,4:r,5:u,143:lh,145:ah,431:268},{2:i,3:168,4:r,5:u,56:165,77:yt,94:271,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{505:[1,272]},{2:i,3:100,4:r,5:u,504:274,506:273},{2:i,3:114,4:r,5:u,156:p,200:275,290:d,291:w,292:b,293:k},{2:i,3:168,4:r,5:u,56:165,77:yt,94:276,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(il,ta,{186:280,164:[1,279],185:[1,277],187:[1,278],195:ia}),t(rp,[2,757],{77:[1,282]}),t([2,4,5,10,72,77,78,93,98,107,118,128,131,132,137,143,145,152,154,156,162,164,168,169,179,180,181,183,185,187,195,198,232,245,247,265,266,270,271,273,280,281,282,283,284,285,286,287,288,290,291,292,293,294,295,296,297,298,299,302,303,306,310,312,317,420,424,602,764],[2,152],{149:[1,283],150:[1,284],190:[1,285],191:[1,286],192:[1,287],193:[1,288],194:[1,289]}),t(f,[2,1]),t(f,[2,2]),{6:290,131:[1,439],172:[1,462],245:[1,411],285:[1,373],286:[1,407],370:[1,404],381:[1,295],402:[1,297],410:[1,549],414:[1,471],416:[1,443],417:[1,509],433:[1,442],435:[1,525],440:[1,342],460:[1,418],464:[1,448],470:[1,341],514:[1,307],515:[1,299],516:[1,399],518:[1,291],519:[1,292],520:[1,293],521:[1,294],522:[1,296],523:[1,298],524:[1,300],525:[1,301],526:[1,302],527:[1,303],528:[1,304],529:[1,305],530:[1,306],531:[1,308],532:[1,309],533:[1,310],534:[1,311],535:[1,312],536:[1,313],537:[1,314],538:[1,315],539:[1,316],540:[1,317],541:[1,318],542:[1,319],543:[1,320],544:[1,321],545:[1,322],546:[1,323],547:[1,324],548:[1,325],549:[1,326],550:[1,327],551:[1,328],552:[1,329],553:[1,330],554:[1,331],555:[1,332],556:[1,333],557:[1,334],558:[1,335],559:[1,336],560:[1,337],561:[1,338],562:[1,339],563:[1,340],564:[1,343],565:[1,344],566:[1,345],567:[1,346],568:[1,347],569:[1,348],570:[1,349],571:[1,350],572:[1,351],573:[1,352],574:[1,353],575:[1,354],576:[1,355],577:[1,356],578:[1,357],579:[1,358],580:[1,359],581:[1,360],582:[1,361],583:[1,362],584:[1,363],585:[1,364],586:[1,365],587:[1,366],588:[1,367],589:[1,368],590:[1,369],591:[1,370],592:[1,371],593:[1,372],594:[1,374],595:[1,375],596:[1,376],597:[1,377],598:[1,378],599:[1,379],600:[1,380],601:[1,381],602:[1,382],603:[1,383],604:[1,384],605:[1,385],606:[1,386],607:[1,387],608:[1,388],609:[1,389],610:[1,390],611:[1,391],612:[1,392],613:[1,393],614:[1,394],615:[1,395],616:[1,396],617:[1,397],618:[1,398],619:[1,400],620:[1,401],621:[1,402],622:[1,403],623:[1,405],624:[1,406],625:[1,408],626:[1,409],627:[1,410],628:[1,412],629:[1,413],630:[1,414],631:[1,415],632:[1,416],633:[1,417],634:[1,419],635:[1,420],636:[1,421],637:[1,422],638:[1,423],639:[1,424],640:[1,425],641:[1,426],642:[1,427],643:[1,428],644:[1,429],645:[1,430],646:[1,431],647:[1,432],648:[1,433],649:[1,434],650:[1,435],651:[1,436],652:[1,437],653:[1,438],654:[1,440],655:[1,441],656:[1,444],657:[1,445],658:[1,446],659:[1,447],660:[1,449],661:[1,450],662:[1,451],663:[1,452],664:[1,453],665:[1,454],666:[1,455],667:[1,456],668:[1,457],669:[1,458],670:[1,459],671:[1,460],672:[1,461],673:[1,463],674:[1,464],675:[1,465],676:[1,466],677:[1,467],678:[1,468],679:[1,469],680:[1,470],681:[1,472],682:[1,473],683:[1,474],684:[1,475],685:[1,476],686:[1,477],687:[1,478],688:[1,479],689:[1,480],690:[1,481],691:[1,482],692:[1,483],693:[1,484],694:[1,485],695:[1,486],696:[1,487],697:[1,488],698:[1,489],699:[1,490],700:[1,491],701:[1,492],702:[1,493],703:[1,494],704:[1,495],705:[1,496],706:[1,497],707:[1,498],708:[1,499],709:[1,500],710:[1,501],711:[1,502],712:[1,503],713:[1,504],714:[1,505],715:[1,506],716:[1,507],717:[1,508],718:[1,510],719:[1,511],720:[1,512],721:[1,513],722:[1,514],723:[1,515],724:[1,516],725:[1,517],726:[1,518],727:[1,519],728:[1,520],729:[1,521],730:[1,522],731:[1,523],732:[1,524],733:[1,526],734:[1,527],735:[1,528],736:[1,529],737:[1,530],738:[1,531],739:[1,532],740:[1,533],741:[1,534],742:[1,535],743:[1,536],744:[1,537],745:[1,538],746:[1,539],747:[1,540],748:[1,541],749:[1,542],750:[1,543],751:[1,544],752:[1,545],753:[1,546],754:[1,547],755:[1,548],756:[1,550],757:[1,551],758:[1,552],759:[1,553],760:[1,554],761:[1,555],762:[1,556],763:[1,557]},{1:[2,6]},t(ch,ao,{17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,12:558,2:i,4:r,5:u,53:vo,72:yo,89:eu,124:kh,146:po,156:wo,189:ou,266:lt,267:bo,290:ko,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),t(up,[2,1041]),t(up,[2,1042]),t(ch,[2,10]),{16:[1,559]},{2:i,3:244,4:r,5:u,199:560},{405:[1,561]},t(s,[2,760]),{77:dh},{77:[1,563]},{77:fp},{77:[1,565]},{77:[1,566]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:567,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(ku,ra,{350:568,156:ua}),{405:[1,570]},{2:i,3:571,4:r,5:u},{193:[1,572]},{2:i,3:578,4:r,5:u,132:gh,137:vh,143:lh,145:ah,152:fh,183:[1,574],431:585,473:573,474:575,475:576,478:577,482:582,493:579,497:581},{130:[1,589],349:586,353:[1,588],410:[1,587]},{113:591,132:y,183:[2,1141],296:v,471:590},t(ep,[2,1135],{465:592,3:593,2:i,4:r,5:u}),{2:i,3:594,4:r,5:u},{4:[1,595]},{4:[1,596]},t(ky,[2,502]),t(s,[2,686],{74:[1,597]}),t(fo,[2,687]),{2:i,3:598,4:r,5:u},{2:i,3:244,4:r,5:u,199:599},{2:i,3:600,4:r,5:u},t(ku,fa,{398:601,156:ea}),{405:[1,603]},{2:i,3:604,4:r,5:u},t(ku,fa,{398:605,156:ea}),t(ku,fa,{398:606,156:ea}),{2:i,3:607,4:r,5:u},t(oa,[2,1129]),t(oa,[2,1130]),t(s,ao,{17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,12:608,114:625,327:637,2:i,4:r,5:u,53:vo,72:yo,89:eu,99:wr,112:er,115:si,116:hi,123:yi,124:op,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,146:po,154:dr,156:wo,170:ru,171:uu,179:ki,180:bi,189:ou,266:lt,267:bo,290:ko,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),t(sr,[2,288]),t(sr,[2,289]),t(sr,[2,290]),t(sr,[2,291]),t(sr,[2,292]),t(sr,[2,293]),t(sr,[2,294]),t(sr,[2,295]),t(sr,[2,296]),t(sr,[2,297]),t(sr,[2,298]),t(sr,[2,299]),t(sr,[2,300]),t(sr,[2,301]),t(sr,[2,302]),t(sr,[2,303]),t(sr,[2,304]),t(sr,[2,305]),{2:i,3:168,4:r,5:u,26:654,27:653,36:649,40:648,56:165,77:yt,79:75,89:eu,94:651,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,184:99,189:ou,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,264:650,265:gt,266:lt,267:[1,655],270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:[1,652],291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,339:co,419:190,420:o,424:e},t(sr,[2,309]),t(sr,[2,310]),{77:[1,656]},t([2,4,5,10,53,72,74,76,78,89,93,95,98,99,107,112,115,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],ov,{77:dh,116:[1,657]}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:658,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:659,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:660,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:661,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:662,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(sr,[2,283]),t([2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,230,231,232,239,242,243,245,247,249,265,266,267,270,271,273,280,281,282,283,284,285,286,287,288,290,291,292,293,294,295,296,297,298,299,300,302,303,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,343,356,368,369,373,374,396,400,401,404,406,408,409,415,417,418,420,424,426,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764,765,766],[2,356]),t(au,[2,357]),t(au,[2,358]),t(au,sp),t(au,[2,360]),t([2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,230,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,297,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,343,356,368,369,373,374,396,400,401,404,406,408,409,417,418,420,424,426,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],[2,361]),{2:i,3:664,4:r,5:u,131:[1,665],301:663},{2:i,3:666,4:r,5:u},t(au,[2,367]),t(au,[2,368]),{2:i,3:667,4:r,5:u,77:sv,113:669,131:g,132:y,143:h,152:c,181:l,196:670,201:672,257:671,294:ht,295:ct,296:v,302:a,419:673,424:e},{77:[1,674]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:675,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,304:676,307:677,308:sa,312:ei,317:oi,419:190,420:o,424:e},{77:[1,679]},{77:[1,680]},t(eo,[2,624]),{2:i,3:695,4:r,5:u,77:rl,111:690,113:688,131:g,132:y,143:h,144:685,145:lu,152:c,156:p,181:l,196:687,200:693,201:692,257:689,258:691,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,300:[1,683],302:a,419:190,420:o,421:681,422:684,423:686,424:e,427:682},{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:696,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:697,4:r,5:u,156:p,200:698,290:d,291:w,292:b,293:k},{77:[2,336]},{77:[2,337]},{77:[2,338]},{77:[2,339]},{77:[2,340]},{77:[2,341]},{77:[2,342]},{77:[2,343]},{77:[2,344]},{2:i,3:704,4:r,5:u,131:hp,132:cp,425:699,426:[1,700],428:701},{2:i,3:244,4:r,5:u,199:705},{290:[1,706]},t(ku,[2,472]),{2:i,3:244,4:r,5:u,199:707},{231:[1,709],454:708},{231:[2,695]},{2:i,3:219,4:r,5:u,77:tl,132:uc,143:h,144:212,145:vt,152:c,156:p,181:l,199:213,200:215,201:214,202:217,209:710,213:fc,214:218,290:d,291:w,292:b,293:k,302:a,419:190,420:o,424:e},{40:711,79:75,89:eu,184:99,189:ou},t(lp,[2,1091],{210:712,76:[1,713]}),t(cu,[2,185],{3:714,2:i,4:r,5:u,76:[1,715],154:[1,716]}),t(cu,[2,189],{3:717,2:i,4:r,5:u,76:[1,718]}),t(cu,[2,190],{3:719,2:i,4:r,5:u,76:[1,720]}),t(cu,[2,193]),t(cu,[2,194],{3:721,2:i,4:r,5:u,76:[1,722]}),t(cu,[2,197],{3:723,2:i,4:r,5:u,76:[1,724]}),t([2,4,5,10,72,74,76,78,93,98,118,128,154,162,168,169,183,206,208,222,223,224,225,226,227,228,229,230,231,232,245,247,306,310,602,764],ap,{77:dh,116:vp}),t([2,4,5,10,72,74,76,78,93,98,118,128,162,168,169,206,208,222,223,224,225,226,227,228,229,230,231,232,245,247,306,310,602,764],[2,200]),t(s,[2,773]),{2:i,3:244,4:r,5:u,199:726},t(ec,yp,{81:727,198:pp}),t(fv,[2,1044]),t(wp,[2,1057],{108:729,190:[1,730]}),t([10,78,183,306,310,602,764],yp,{419:190,81:731,117:732,3:733,114:736,144:758,158:768,160:769,2:i,4:r,5:u,72:du,76:gu,77:nf,112:tf,115:si,116:hi,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,198:pp,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,420:o,424:e}),{353:[1,782]},{183:[1,783]},t(s,[2,594],{112:[1,784]}),{405:[1,785]},{183:[1,786]},t(s,[2,598],{112:[1,787],183:[1,788]}),{2:i,3:244,4:r,5:u,199:789},{40:790,74:[1,791],79:75,89:eu,184:99,189:ou},t(hv,[2,70]),{76:[1,792]},t(s,[2,667]),{11:106,306:[1,793],602:wy,764:by},t(s,[2,665]),t(s,[2,666]),{2:i,3:794,4:r,5:u},t(s,[2,587]),{146:[1,795]},t([2,4,5,10,53,72,74,76,77,78,89,95,124,128,143,145,146,148,149,152,154,156,181,183,187,189,230,266,267,290,297,302,306,310,335,338,339,343,344,356,368,369,373,374,396,400,401,402,403,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,505,507,508,514,515,516,517,602,764],ap,{116:vp}),t(s,[2,615]),t(s,[2,616]),t(s,[2,617]),t(s,sp,{74:[1,796]}),{77:sv,113:669,131:g,132:y,143:h,152:c,181:l,196:670,201:672,257:671,294:ht,295:ct,296:v,302:a,419:673,424:e},t(hu,[2,320]),t(hu,[2,321]),t(hu,[2,322]),t(hu,[2,323]),t(hu,[2,324]),t(hu,[2,325]),t(hu,[2,326]),t(s,ao,{17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,114:625,327:637,12:797,2:i,4:r,5:u,53:vo,72:yo,89:eu,99:wr,112:er,115:si,116:hi,123:yi,124:op,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,146:po,154:dr,156:wo,170:ru,171:uu,179:ki,180:bi,189:ou,266:lt,267:bo,290:ko,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),t(s,[2,675],{74:to}),t(s,[2,676]),t(bp,[2,354],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(s,[2,677],{74:[1,800]}),t(s,[2,678],{74:[1,801]}),t(fo,[2,683]),t(fo,[2,685]),t(fo,[2,679]),t(fo,[2,680]),{114:807,115:si,116:hi,124:[1,802],230:kp,429:803,430:804,433:dp},{2:i,3:808,4:r,5:u},t(ku,[2,656]),t(ku,[2,657]),t(s,[2,614],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{2:i,3:100,4:r,5:u,504:274,506:809},t(s,[2,754],{74:cv}),t(su,[2,756]),t(s,[2,759]),t(s,[2,681],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(nc,ta,{186:811,195:ia}),t(nc,ta,{186:812,195:ia}),t(nc,ta,{186:813,195:ia}),t(oc,[2,1087],{255:146,200:147,256:148,111:149,254:150,196:151,257:152,113:153,258:154,201:155,202:156,259:157,260:158,261:159,144:161,262:162,263:163,56:165,158:167,3:168,419:190,188:814,174:815,253:816,94:817,2:i,4:r,5:u,77:yt,131:g,132:y,137:pt,143:h,145:vt,149:wt,152:c,154:bt,156:p,179:kt,180:dt,181:l,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,420:o,424:e}),{77:[1,819],131:g,196:818},{2:i,3:100,4:r,5:u,504:274,506:820},t(tc,[2,153]),t(tc,[2,154]),t(tc,[2,155]),t(tc,[2,156]),t(tc,[2,157]),t(tc,[2,158]),t(tc,[2,159]),t(f,[2,3]),t(f,[2,774]),t(f,[2,775]),t(f,[2,776]),t(f,[2,777]),t(f,[2,778]),t(f,[2,779]),t(f,[2,780]),t(f,[2,781]),t(f,[2,782]),t(f,[2,783]),t(f,[2,784]),t(f,[2,785]),t(f,[2,786]),t(f,[2,787]),t(f,[2,788]),t(f,[2,789]),t(f,[2,790]),t(f,[2,791]),t(f,[2,792]),t(f,[2,793]),t(f,[2,794]),t(f,[2,795]),t(f,[2,796]),t(f,[2,797]),t(f,[2,798]),t(f,[2,799]),t(f,[2,800]),t(f,[2,801]),t(f,[2,802]),t(f,[2,803]),t(f,[2,804]),t(f,[2,805]),t(f,[2,806]),t(f,[2,807]),t(f,[2,808]),t(f,[2,809]),t(f,[2,810]),t(f,[2,811]),t(f,[2,812]),t(f,[2,813]),t(f,[2,814]),t(f,[2,815]),t(f,[2,816]),t(f,[2,817]),t(f,[2,818]),t(f,[2,819]),t(f,[2,820]),t(f,[2,821]),t(f,[2,822]),t(f,[2,823]),t(f,[2,824]),t(f,[2,825]),t(f,[2,826]),t(f,[2,827]),t(f,[2,828]),t(f,[2,829]),t(f,[2,830]),t(f,[2,831]),t(f,[2,832]),t(f,[2,833]),t(f,[2,834]),t(f,[2,835]),t(f,[2,836]),t(f,[2,837]),t(f,[2,838]),t(f,[2,839]),t(f,[2,840]),t(f,[2,841]),t(f,[2,842]),t(f,[2,843]),t(f,[2,844]),t(f,[2,845]),t(f,[2,846]),t(f,[2,847]),t(f,[2,848]),t(f,[2,849]),t(f,[2,850]),t(f,[2,851]),t(f,[2,852]),t(f,[2,853]),t(f,[2,854]),t(f,[2,855]),t(f,[2,856]),t(f,[2,857]),t(f,[2,858]),t(f,[2,859]),t(f,[2,860]),t(f,[2,861]),t(f,[2,862]),t(f,[2,863]),t(f,[2,864]),t(f,[2,865]),t(f,[2,866]),t(f,[2,867]),t(f,[2,868]),t(f,[2,869]),t(f,[2,870]),t(f,[2,871]),t(f,[2,872]),t(f,[2,873]),t(f,[2,874]),t(f,[2,875]),t(f,[2,876]),t(f,[2,877]),t(f,[2,878]),t(f,[2,879]),t(f,[2,880]),t(f,[2,881]),t(f,[2,882]),t(f,[2,883]),t(f,[2,884]),t(f,[2,885]),t(f,[2,886]),t(f,[2,887]),t(f,[2,888]),t(f,[2,889]),t(f,[2,890]),t(f,[2,891]),t(f,[2,892]),t(f,[2,893]),t(f,[2,894]),t(f,[2,895]),t(f,[2,896]),t(f,[2,897]),t(f,[2,898]),t(f,[2,899]),t(f,[2,900]),t(f,[2,901]),t(f,[2,902]),t(f,[2,903]),t(f,[2,904]),t(f,[2,905]),t(f,[2,906]),t(f,[2,907]),t(f,[2,908]),t(f,[2,909]),t(f,[2,910]),t(f,[2,911]),t(f,[2,912]),t(f,[2,913]),t(f,[2,914]),t(f,[2,915]),t(f,[2,916]),t(f,[2,917]),t(f,[2,918]),t(f,[2,919]),t(f,[2,920]),t(f,[2,921]),t(f,[2,922]),t(f,[2,923]),t(f,[2,924]),t(f,[2,925]),t(f,[2,926]),t(f,[2,927]),t(f,[2,928]),t(f,[2,929]),t(f,[2,930]),t(f,[2,931]),t(f,[2,932]),t(f,[2,933]),t(f,[2,934]),t(f,[2,935]),t(f,[2,936]),t(f,[2,937]),t(f,[2,938]),t(f,[2,939]),t(f,[2,940]),t(f,[2,941]),t(f,[2,942]),t(f,[2,943]),t(f,[2,944]),t(f,[2,945]),t(f,[2,946]),t(f,[2,947]),t(f,[2,948]),t(f,[2,949]),t(f,[2,950]),t(f,[2,951]),t(f,[2,952]),t(f,[2,953]),t(f,[2,954]),t(f,[2,955]),t(f,[2,956]),t(f,[2,957]),t(f,[2,958]),t(f,[2,959]),t(f,[2,960]),t(f,[2,961]),t(f,[2,962]),t(f,[2,963]),t(f,[2,964]),t(f,[2,965]),t(f,[2,966]),t(f,[2,967]),t(f,[2,968]),t(f,[2,969]),t(f,[2,970]),t(f,[2,971]),t(f,[2,972]),t(f,[2,973]),t(f,[2,974]),t(f,[2,975]),t(f,[2,976]),t(f,[2,977]),t(f,[2,978]),t(f,[2,979]),t(f,[2,980]),t(f,[2,981]),t(f,[2,982]),t(f,[2,983]),t(f,[2,984]),t(f,[2,985]),t(f,[2,986]),t(f,[2,987]),t(f,[2,988]),t(f,[2,989]),t(f,[2,990]),t(f,[2,991]),t(f,[2,992]),t(f,[2,993]),t(f,[2,994]),t(f,[2,995]),t(f,[2,996]),t(f,[2,997]),t(f,[2,998]),t(f,[2,999]),t(f,[2,1e3]),t(f,[2,1001]),t(f,[2,1002]),t(f,[2,1003]),t(f,[2,1004]),t(f,[2,1005]),t(f,[2,1006]),t(f,[2,1007]),t(f,[2,1008]),t(f,[2,1009]),t(f,[2,1010]),t(f,[2,1011]),t(f,[2,1012]),t(f,[2,1013]),t(f,[2,1014]),t(f,[2,1015]),t(f,[2,1016]),t(f,[2,1017]),t(f,[2,1018]),t(f,[2,1019]),t(f,[2,1020]),t(f,[2,1021]),t(f,[2,1022]),t(f,[2,1023]),t(f,[2,1024]),t(f,[2,1025]),t(f,[2,1026]),t(f,[2,1027]),t(f,[2,1028]),t(f,[2,1029]),t(f,[2,1030]),t(f,[2,1031]),t(f,[2,1032]),t(f,[2,1033]),t(f,[2,1034]),t(f,[2,1035]),t(f,[2,1036]),t(f,[2,1037]),t(f,[2,1038]),t(f,[2,1039]),t(f,[2,1040]),t(ch,[2,7]),t(ch,ao,{17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,12:821,2:i,4:r,5:u,53:vo,72:yo,89:eu,124:kh,146:po,156:wo,189:ou,266:lt,267:bo,290:ko,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),{396:[1,825],401:[1,822],402:[1,823],403:[1,824]},{2:i,3:826,4:r,5:u},t(nc,[2,1111],{289:827,767:829,78:[1,828],164:[1,831],185:[1,830]}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:832,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:833,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:834,4:r,5:u,132:[1,835]},{2:i,3:836,4:r,5:u,132:[1,837]},{2:i,3:838,4:r,5:u,99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{2:i,3:839,4:r,5:u},{154:[1,840]},t(ha,ra,{350:841,156:ua}),{230:[1,842]},{2:i,3:843,4:r,5:u},t(s,[2,729],{74:gp}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:845,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(su,[2,732]),t(nw,[2,1143],{419:190,476:846,144:847,139:lv,141:lv,145:lu,420:o,424:e}),{139:[1,848],141:[1,849]},t(ca,tw,{490:851,493:852,77:[1,850],137:vh}),t(la,[2,1167],{494:853,132:[1,854]}),t(lo,[2,1171],{496:855,497:856,152:fh}),t(lo,[2,747]),t(iw,[2,739]),{2:i,3:857,4:r,5:u,131:[1,858]},{2:i,3:859,4:r,5:u},{2:i,3:860,4:r,5:u},t(ku,ra,{350:861,156:ua}),t(ku,ra,{350:862,156:ua}),t(oa,[2,491]),t(oa,[2,492]),{183:[1,863]},{183:[2,1142]},t(av,[2,1137],{466:864,469:865,137:[1,866]}),t(ep,[2,1136]),t(sc,rw,{510:867,95:uw,230:[1,868],514:fw,515:ew,516:ow}),{76:[1,873]},{76:[1,874]},{145:np,450:875},{4:hc,7:879,76:[1,877],272:876,387:878,389:cc},t(s,[2,456],{128:[1,882]}),t(s,[2,579]),{2:i,3:883,4:r,5:u},{298:[1,884]},t(ha,fa,{398:885,156:ea}),t(s,[2,593]),{2:i,3:244,4:r,5:u,199:887,399:886},{2:i,3:244,4:r,5:u,199:887,399:888},t(s,[2,772]),t(ch,[2,669],{438:889,310:[1,890]}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:891,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:892,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:893,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:894,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:895,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:896,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:897,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:898,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:899,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:900,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:901,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:902,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:903,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:904,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:905,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:906,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:907,4:r,5:u,77:[1,909],131:g,156:p,196:908,200:910,290:d,291:w,292:b,293:k},{2:i,3:911,4:r,5:u,77:[1,913],131:g,156:p,196:912,200:914,290:d,291:w,292:b,293:k},t(ic,[2,440],{255:146,200:147,256:148,111:149,254:150,196:151,257:152,113:153,258:154,201:155,202:156,259:157,260:158,261:159,144:161,262:162,263:163,56:165,158:167,3:168,419:190,94:915,2:i,4:r,5:u,77:yt,131:g,132:y,137:pt,143:h,145:vt,149:wt,152:c,154:bt,156:p,179:kt,180:dt,181:l,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,420:o,424:e}),t(ic,[2,441],{255:146,200:147,256:148,111:149,254:150,196:151,257:152,113:153,258:154,201:155,202:156,259:157,260:158,261:159,144:161,262:162,263:163,56:165,158:167,3:168,419:190,94:916,2:i,4:r,5:u,77:yt,131:g,132:y,137:pt,143:h,145:vt,149:wt,152:c,154:bt,156:p,179:kt,180:dt,181:l,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,420:o,424:e}),t(ic,[2,442],{255:146,200:147,256:148,111:149,254:150,196:151,257:152,113:153,258:154,201:155,202:156,259:157,260:158,261:159,144:161,262:162,263:163,56:165,158:167,3:168,419:190,94:917,2:i,4:r,5:u,77:yt,131:g,132:y,137:pt,143:h,145:vt,149:wt,152:c,154:bt,156:p,179:kt,180:dt,181:l,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,420:o,424:e}),t(ic,[2,443],{255:146,200:147,256:148,111:149,254:150,196:151,257:152,113:153,258:154,201:155,202:156,259:157,260:158,261:159,144:161,262:162,263:163,56:165,158:167,3:168,419:190,94:918,2:i,4:r,5:u,77:yt,131:g,132:y,137:pt,143:h,145:vt,149:wt,152:c,154:bt,156:p,179:kt,180:dt,181:l,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,420:o,424:e}),t(ic,sw,{255:146,200:147,256:148,111:149,254:150,196:151,257:152,113:153,258:154,201:155,202:156,259:157,260:158,261:159,144:161,262:162,263:163,56:165,158:167,3:168,419:190,94:919,2:i,4:r,5:u,77:yt,131:g,132:y,137:pt,143:h,145:vt,149:wt,152:c,154:bt,156:p,179:kt,180:dt,181:l,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,420:o,424:e}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:920,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:921,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(ic,[2,445],{255:146,200:147,256:148,111:149,254:150,196:151,257:152,113:153,258:154,201:155,202:156,259:157,260:158,261:159,144:161,262:162,263:163,56:165,158:167,3:168,419:190,94:922,2:i,4:r,5:u,77:yt,131:g,132:y,137:pt,143:h,145:vt,149:wt,152:c,154:bt,156:p,179:kt,180:dt,181:l,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,420:o,424:e}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:923,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:924,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{164:[1,926],166:[1,928],328:925,334:[1,927]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:929,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:930,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:695,4:r,5:u,77:[1,931],111:934,145:hw,156:p,200:935,202:933,290:d,291:w,292:b,293:k,329:932},{99:[1,937],297:[1,938]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:939,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:940,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:941,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{4:hc,7:879,272:942,387:878,389:cc},t(cw,[2,88]),t(cw,[2,89]),{78:[1,943]},{78:[1,944]},{78:[1,945]},{78:[1,946],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(ku,gl,{340:207,77:fp,198:na}),{78:[2,1107]},{78:[2,1108]},{134:dy,135:gy},{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:947,152:c,154:bt,156:p,158:167,164:[1,949],179:kt,180:dt,181:l,185:[1,948],196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:950,4:r,5:u,149:lw,180:[1,952]},t([2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,118,122,128,129,130,131,132,134,135,137,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,314,330,331,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],[2,416],{114:625,327:637,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,332:or}),t(aa,[2,417],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,180:bi,312:ai,316:ci}),t(aa,[2,418],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,180:bi,312:ai,316:ci}),t(vv,[2,419],{114:625,327:637,316:ci}),t(vv,[2,420],{114:625,327:637,316:ci}),t(au,[2,365]),t(au,[2,1113]),t(au,[2,1114]),t(au,[2,366]),t([2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,230,231,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],[2,362]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:953,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(eo,[2,620]),t(eo,[2,621]),t(eo,[2,622]),t(eo,[2,623]),t(eo,[2,625]),{40:954,79:75,89:eu,184:99,189:ou},{99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,304:955,307:677,308:sa,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{305:956,306:aw,307:957,308:sa,310:vw},t(yv,[2,372]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:959,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:960,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{4:hc,7:879,272:961,387:878,389:cc},t(eo,[2,626]),{74:[1,963],300:[1,962]},t(eo,[2,642]),t(yw,[2,649]),t(eh,[2,627]),t(eh,[2,628]),t(eh,[2,629]),t(eh,[2,630]),t(eh,[2,631]),t(eh,[2,632]),t(eh,[2,633]),t(eh,[2,634]),t(eh,[2,635]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:964,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t([2,4,5,10,53,72,74,76,78,89,93,95,98,99,107,112,115,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,426,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],ov,{77:dh,116:pw}),{74:to,300:[1,966]},t(pv,[2,314],{77:dh}),t(sr,[2,315]),{74:[1,968],426:[1,967]},t(eo,[2,639]),t(ul,[2,644]),{152:[1,969]},{152:[1,970]},{152:[1,971]},{40:976,77:[1,975],79:75,89:eu,143:h,144:979,145:lu,149:fl,152:c,181:l,184:99,189:ou,201:980,302:a,341:972,342:973,343:[1,974],344:el,419:190,420:o,424:e},t(ku,gl,{340:981,198:na}),{77:yh,143:h,144:979,145:lu,149:fl,152:c,181:l,201:980,302:a,341:982,342:983,344:el,419:190,420:o,424:e},{230:[1,986],455:985},{2:i,3:219,4:r,5:u,77:tl,132:uc,143:h,144:212,145:vt,152:c,156:p,181:l,199:213,200:215,201:214,202:217,209:987,213:fc,214:218,290:d,291:w,292:b,293:k,302:a,419:190,420:o,424:e},{231:[2,696]},{78:[1,988]},t(cu,[2,1093],{211:989,3:990,2:i,4:r,5:u}),t(lp,[2,1092]),t(cu,[2,183]),{2:i,3:991,4:r,5:u},{212:[1,992]},t(cu,[2,187]),{2:i,3:993,4:r,5:u},t(cu,[2,191]),{2:i,3:994,4:r,5:u},t(cu,[2,195]),{2:i,3:995,4:r,5:u},t(cu,[2,198]),{2:i,3:996,4:r,5:u},{2:i,3:997,4:r,5:u},{148:[1,998]},t(va,[2,172],{82:999,183:[1,1e3]}),{2:i,3:219,4:r,5:u,132:[1,1005],143:h,145:[1,1006],152:c,156:p,181:l,199:1001,200:1002,201:1003,202:1004,290:d,291:w,292:b,293:k,302:a},{2:i,3:1011,4:r,5:u,109:1007,110:1008,111:1009,112:ww},t(wp,[2,1058]),t(oo,[2,1049],{91:1012,182:1013,183:[1,1014]}),t(tp,[2,1048],{153:1015,179:io,180:ro,181:uo}),t([2,4,5,10,72,74,76,78,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,198,280,281,282,283,284,285,286,287,288,306,310,420,424,602,764],[2,90],{77:[1,1019]}),{119:[1,1020]},t(fu,[2,93]),{2:i,3:1021,4:r,5:u},t(fu,[2,95]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1022,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1023,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,112:tf,114:736,115:si,116:hi,117:1025,118:rf,122:uf,123:ff,124:ef,125:1024,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{77:[1,1026]},{77:[1,1027]},{77:[1,1028]},{77:[1,1029]},t(fu,[2,104]),t(fu,[2,105]),t(fu,[2,106]),t(fu,[2,107]),t(fu,[2,108]),t(fu,[2,109]),{2:i,3:1030,4:r,5:u},{2:i,3:1031,4:r,5:u,133:[1,1032]},t(fu,[2,113]),t(fu,[2,114]),t(fu,[2,115]),t(fu,[2,116]),t(fu,[2,117]),t(fu,[2,118]),{2:i,3:1033,4:r,5:u,77:sv,113:669,131:g,132:y,143:h,152:c,181:l,196:670,201:672,257:671,294:ht,295:ct,296:v,302:a,419:673,424:e},{145:[1,1034]},{77:[1,1035]},{145:[1,1036]},t(fu,[2,123]),{77:[1,1037]},{2:i,3:1038,4:r,5:u},{77:[1,1039]},{77:[1,1040]},{77:[1,1041]},{77:[1,1042]},{77:[1,1043],164:[1,1044]},{77:[1,1045]},{77:[1,1046]},{77:[1,1047]},{77:[1,1048]},{77:[1,1049]},{77:[1,1050]},{77:[1,1051]},{77:[1,1052]},{77:[1,1053]},{77:[2,1073]},{77:[2,1074]},{2:i,3:244,4:r,5:u,199:1054},{2:i,3:244,4:r,5:u,199:1055},{113:1056,132:y,296:v},t(s,[2,596],{112:[1,1057]}),{2:i,3:244,4:r,5:u,199:1058},{113:1059,132:y,296:v},{2:i,3:1060,4:r,5:u},t(s,[2,693]),t(s,[2,68]),{2:i,3:236,4:r,5:u,75:1061},{77:[1,1062]},t(s,[2,674]),t(s,[2,586]),{2:i,3:1011,4:r,5:u,111:1065,143:ol,145:sl,147:1063,336:1064,337:1066},{144:1069,145:lu,419:190,420:o,424:e},t(s,[2,671]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1070,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(ic,sw,{255:146,200:147,256:148,111:149,254:150,196:151,257:152,113:153,258:154,201:155,202:156,259:157,260:158,261:159,144:161,262:162,263:163,56:165,158:167,3:168,419:190,94:1071,2:i,4:r,5:u,77:yt,131:g,132:y,137:pt,143:h,145:vt,149:wt,152:c,154:bt,156:p,179:kt,180:dt,181:l,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,420:o,424:e}),{113:1072,132:y,296:v},{2:i,3:266,4:r,5:u,446:1073,447:ip},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1075,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,230:kp,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e,429:1074,433:dp},t(s,[2,651]),{114:1077,115:si,116:hi,124:[1,1076]},t(s,[2,663]),t(s,[2,664]),{2:i,3:1079,4:r,5:u,77:bw,131:kw,432:1078},{114:807,115:si,116:hi,124:[1,1082],430:1083},t(s,[2,753],{74:cv}),{2:i,3:100,4:r,5:u,504:1084},{2:i,3:168,4:r,5:u,56:165,77:yt,94:817,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,174:1085,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,253:816,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:817,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,174:1086,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,253:816,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:817,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,174:1087,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,253:816,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(oc,[2,151]),t(oc,[2,1088],{74:lc}),t(ph,[2,273]),t(ph,[2,280],{114:625,327:637,3:1090,113:1092,2:i,4:r,5:u,76:[1,1089],99:wr,112:er,115:si,116:hi,123:yi,124:tu,131:[1,1091],132:y,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,296:v,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(il,[2,1089],{197:1093,765:[1,1094]}),{131:g,196:1095},{74:cv,78:[1,1096]},t(ch,[2,11]),{148:[1,1097],190:[1,1098]},{190:[1,1099]},{190:[1,1100]},{190:[1,1101]},t(s,[2,575],{76:[1,1103],77:[1,1102]}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1104,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(au,[2,346]),t(nc,[2,1112]),t(nc,[2,1109]),t(nc,[2,1110]),{74:to,78:[1,1105]},{74:to,78:[1,1106]},{74:[1,1107]},{74:[1,1108]},{74:[1,1109]},{74:[1,1110]},t(au,[2,353]),t(s,[2,580]),{298:[1,1111]},{2:i,3:1112,4:r,5:u,113:1113,132:y,296:v},{2:i,3:244,4:r,5:u,199:1114},{230:[1,1115]},{2:i,3:578,4:r,5:u,132:gh,137:vh,143:lh,145:ah,152:fh,431:585,474:1116,475:576,478:577,482:582,493:579,497:581},t(s,[2,730],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(su,[2,1145],{477:1117,483:1118,76:wv}),t(nw,[2,1144]),{2:i,3:1122,4:r,5:u,132:gh,137:vh,144:1121,145:lu,152:fh,419:190,420:o,424:e,475:1120,493:579,497:581},{2:i,3:1122,4:r,5:u,132:gh,137:vh,143:lh,145:ah,152:fh,431:585,475:1124,478:1123,482:582,493:579,497:581},{2:i,3:578,4:r,5:u,132:gh,137:vh,143:lh,145:ah,152:fh,431:585,473:1125,474:575,475:576,478:577,482:582,493:579,497:581},t(la,[2,1163],{491:1126,132:[1,1127]}),t(ca,[2,1162]),t(lo,[2,1169],{495:1128,497:1129,152:fh}),t(la,[2,1168]),t(lo,[2,746]),t(lo,[2,1172]),t(ca,[2,749]),t(ca,[2,750]),t(lo,[2,748]),t(iw,[2,740]),{2:i,3:244,4:r,5:u,199:1130},{2:i,3:244,4:r,5:u,199:1131},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1132,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(dw,[2,1139],{467:1133,113:1134,132:y,296:v}),t(av,[2,1138]),{2:i,3:1135,4:r,5:u},{335:gw,338:nb,339:tb,511:1136},{2:i,3:244,4:r,5:u,199:1140},t(sc,[2,765]),t(sc,[2,766]),t(sc,[2,767]),{129:[1,1141]},{266:[1,1142]},{266:[1,1143]},t(fo,[2,688]),t(fo,[2,689],{124:[1,1144]}),{4:hc,7:879,272:1145,387:878,389:cc},t([2,4,10,53,72,74,76,77,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,230,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,297,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,343,356,368,369,373,374,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],[2,542],{5:[1,1146]}),t([2,5,10,53,72,74,76,78,89,93,95,98,99,107,112,115,116,118,122,123,124,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,230,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,297,300,306,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,343,356,368,369,373,374,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],[2,539],{4:[1,1148],77:[1,1147]}),{77:[1,1149]},t(ac,[2,4]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1150,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(s,[2,588]),t(ha,[2,568]),{2:i,3:1151,4:r,5:u,113:1152,132:y,296:v},t(s,[2,564],{74:ib}),t(fo,[2,566]),t(s,[2,613],{74:ib}),t(s,[2,668]),t(s,ao,{17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,12:1154,2:i,4:r,5:u,53:vo,72:yo,89:eu,124:kh,146:po,156:wo,189:ou,266:lt,267:bo,290:ko,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),t(ya,[2,376],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,312:ai,316:ci,317:di,318:tr,319:ir}),t(vv,[2,377],{114:625,327:637,316:ci}),t(ya,[2,378],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,312:ai,316:ci,317:di,318:tr,319:ir}),t(rb,[2,379],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,312:ai,314:[1,1155],316:ci,317:di,318:tr,319:ir}),t(rb,[2,381],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,312:ai,314:[1,1156],316:ci,317:di,318:tr,319:ir}),t(sr,[2,383],{114:625,327:637}),t(aa,[2,384],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,180:bi,312:ai,316:ci}),t(aa,[2,385],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,180:bi,312:ai,316:ci}),t(bv,[2,386],{114:625,327:637,115:si,116:hi,123:yi,136:li,312:ai,316:ci}),t(bv,[2,387],{114:625,327:637,115:si,116:hi,123:yi,136:li,312:ai,316:ci}),t(bv,[2,388],{114:625,327:637,115:si,116:hi,123:yi,136:li,312:ai,316:ci}),t([2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,112,118,122,123,124,128,129,130,131,132,133,134,135,137,138,139,140,141,142,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,179,180,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,311,313,314,315,317,318,319,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],[2,389],{114:625,327:637,115:si,116:hi,136:li,312:ai,316:ci}),t(pa,[2,390],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,179:ki,180:bi,312:ai,316:ci,317:di}),t(pa,[2,391],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,179:ki,180:bi,312:ai,316:ci,317:di}),t(pa,[2,392],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,179:ki,180:bi,312:ai,316:ci,317:di}),t(pa,[2,393],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,179:ki,180:bi,312:ai,316:ci,317:di}),t(pv,[2,394],{77:dh}),t(sr,[2,395]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1157,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(sr,[2,397]),t(pv,[2,398],{77:dh}),t(sr,[2,399]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1158,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(sr,[2,401]),t(oh,[2,402],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t(oh,[2,403],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t(oh,[2,404],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t(oh,[2,405],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t([2,4,5,10,53,72,89,99,124,139,140,146,154,156,170,171,189,266,267,290,306,310,320,321,322,323,324,325,326,330,331,333,335,338,339,396,400,401,404,406,408,409,417,418,434,436,437,439,440,441,442,443,447,448,451,452,505,507,508,517,602,764],ub,{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t(oh,[2,407],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t(oh,[2,408],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t(oh,[2,409],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t(oh,[2,410],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t(oh,[2,411],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),{77:[1,1159]},{77:[2,446]},{77:[2,447]},{77:[2,448]},t(kv,[2,414],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,332:or}),t([2,4,5,10,53,72,74,76,77,78,89,93,95,98,107,118,122,128,129,130,131,132,134,135,137,143,145,146,148,149,150,152,156,162,164,166,168,169,171,172,173,175,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,314,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],[2,415],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or}),{2:i,3:168,4:r,5:u,40:1160,56:165,77:yt,78:[1,1162],79:75,89:eu,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1161,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,184:99,189:ou,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(sr,[2,428]),t(sr,[2,430]),t(sr,[2,437]),t(sr,[2,438]),{2:i,3:667,4:r,5:u,77:[1,1163]},{2:i,3:695,4:r,5:u,77:[1,1164],111:934,145:hw,156:p,200:935,202:1166,290:d,291:w,292:b,293:k,329:1165},t(sr,[2,435]),t(kv,[2,432],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,332:or}),t(kv,[2,433],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,332:or}),t([2,4,5,10,53,72,74,76,77,78,89,93,95,98,99,107,118,122,124,128,129,130,131,132,134,135,137,139,140,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,181,183,185,187,189,198,206,208,222,223,224,225,226,227,228,229,232,239,242,243,245,247,266,267,280,281,282,283,284,285,286,287,288,290,296,300,306,308,309,310,314,320,321,322,323,324,325,326,330,331,332,333,335,338,339,396,400,401,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,464,470,505,507,508,517,602,764],[2,434],{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir}),t(sr,[2,436]),t(sr,[2,306]),t(sr,[2,307]),t(sr,[2,308]),t(sr,[2,421]),{74:to,78:[1,1167]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1168,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1169,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(sr,fb),t(dv,[2,286]),t(sr,[2,282]),{78:[1,1171],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{78:[1,1172]},{305:1173,306:aw,307:957,308:sa,310:vw},{306:[1,1174]},t(yv,[2,371]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1175,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,309:[1,1176],311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{76:[1,1177],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{74:[1,1178]},t(eo,[2,640]),{2:i,3:695,4:r,5:u,77:rl,111:690,113:688,131:g,132:y,143:h,144:685,145:lu,152:c,156:p,181:l,196:687,200:693,201:692,257:689,258:691,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,300:[1,1179],302:a,419:190,420:o,422:1180,423:686,424:e},{78:[1,1181],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{2:i,3:1182,4:r,5:u,149:lw},t(sr,[2,364]),t(eo,[2,637]),{2:i,3:704,4:r,5:u,131:hp,132:cp,426:[1,1183],428:1184},{2:i,3:695,4:r,5:u,77:rl,111:690,113:688,131:g,132:y,143:h,144:685,145:lu,152:c,156:p,181:l,196:687,200:693,201:692,257:689,258:691,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,302:a,419:190,420:o,422:1185,423:686,424:e},{2:i,3:695,4:r,5:u,77:rl,111:690,113:688,131:g,132:y,143:h,144:685,145:lu,152:c,156:p,181:l,196:687,200:693,201:692,257:689,258:691,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,302:a,419:190,420:o,422:1186,423:686,424:e},{2:i,3:695,4:r,5:u,77:rl,111:690,113:688,131:g,132:y,143:h,144:685,145:lu,152:c,156:p,181:l,196:687,200:693,201:692,257:689,258:691,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,302:a,419:190,420:o,422:1187,423:686,424:e},{77:yh,143:h,144:979,145:lu,152:c,181:l,201:980,302:a,342:1188,419:190,420:o,424:e},t(vu,[2,458],{74:sh}),{149:fl,341:1190,344:el},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1194,100:1191,111:1193,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,345:1192,419:190,420:o,424:e},t(vu,[2,466]),t(eb,[2,469]),t(eb,[2,470]),t(vc,[2,474]),t(vc,[2,475]),{2:i,3:244,4:r,5:u,199:1195},{77:yh,143:h,144:979,145:lu,152:c,181:l,201:980,302:a,342:1196,419:190,420:o,424:e},t(vu,[2,462],{74:sh}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1194,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,345:1192,419:190,420:o,424:e},{308:ob,456:1197,458:1198,459:1199},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1201,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{230:[2,697]},t(cu,[2,181],{3:1202,2:i,4:r,5:u,76:[1,1203]}),t(cu,[2,182]),t(cu,[2,1094]),t(cu,[2,184]),t(cu,[2,186]),t(cu,[2,188]),t(cu,[2,192]),t(cu,[2,196]),t(cu,[2,199]),t([2,4,5,10,53,72,74,76,77,78,89,93,95,98,118,124,128,143,145,146,148,149,152,154,156,162,168,169,181,183,187,189,206,208,222,223,224,225,226,227,228,229,230,231,232,245,247,266,267,290,297,302,306,310,335,338,339,343,344,356,368,369,373,374,396,400,401,402,403,404,406,408,409,417,418,420,424,434,436,437,439,440,441,442,443,447,448,451,452,505,507,508,514,515,516,517,602,764],[2,201]),{2:i,3:1204,4:r,5:u},t(hh,[2,1045],{83:1205,92:1206,93:[1,1207],98:[1,1208]}),{2:i,3:219,4:r,5:u,77:[1,1210],132:uc,143:h,144:212,145:vt,152:c,156:p,181:l,199:213,200:215,201:214,202:217,203:1209,209:1211,213:fc,214:218,290:d,291:w,292:b,293:k,302:a,419:190,420:o,424:e},t(ec,[2,164]),t(ec,[2,165]),t(ec,[2,166]),t(ec,[2,167]),t(ec,[2,168]),{2:i,3:667,4:r,5:u},t(fv,[2,83],{74:[1,1212]}),t(wa,[2,85]),t(wa,[2,86]),{113:1213,132:y,296:v},t([10,72,74,78,93,98,118,124,128,162,168,169,183,198,206,208,222,223,224,225,226,227,228,229,232,245,247,306,310,602,764],ov,{116:pw}),t(oo,[2,73]),t(oo,[2,1050]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1214,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(fu,[2,126]),t(fu,[2,144]),t(fu,[2,145]),t(fu,[2,146]),{2:i,3:168,4:r,5:u,56:165,77:yt,78:[2,1065],94:260,111:149,113:153,127:1215,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1216,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{77:[1,1217]},t(fu,[2,94]),t([2,4,5,10,72,74,76,77,78,118,122,124,128,129,130,131,132,134,135,137,139,140,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,181,183,185,187,198,280,281,282,283,284,285,286,287,288,306,310,420,424,602,764],[2,96],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t([2,4,5,10,72,74,76,77,78,112,118,122,124,128,129,130,131,132,134,135,137,139,140,143,145,146,148,149,150,152,154,156,162,164,166,168,169,170,171,172,173,175,181,183,185,187,198,280,281,282,283,284,285,286,287,288,306,310,420,424,602,764],[2,97],{114:625,327:637,99:wr,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,78:[1,1218],112:tf,114:736,115:si,116:hi,117:1219,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},t(wu,[2,1061],{153:1015,179:io,180:ro,181:uo}),{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,112:tf,114:736,115:si,116:hi,117:1221,118:rf,122:uf,123:ff,124:ef,126:1220,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1222,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1223,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1224,4:r,5:u},t(fu,[2,110]),t(fu,[2,111]),t(fu,[2,112]),t(fu,[2,119]),{2:i,3:1225,4:r,5:u},{2:i,3:1011,4:r,5:u,111:1065,143:ol,145:sl,147:1226,336:1064,337:1066},{2:i,3:1227,4:r,5:u},{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1228,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(fu,[2,125]),t(wu,[2,1067],{155:1229}),t(wu,[2,1069],{157:1230}),t(wu,[2,1071],{159:1231}),t(wu,[2,1075],{161:1232}),t(wh,yc,{163:1233,178:1234}),{77:[1,1235]},t(wu,[2,1077],{165:1236}),t(wu,[2,1079],{167:1237}),t(wh,yc,{178:1234,163:1238}),t(wh,yc,{178:1234,163:1239}),t(wh,yc,{178:1234,163:1240}),t(wh,yc,{178:1234,163:1241}),{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,112:tf,114:736,115:si,116:hi,117:1242,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:817,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,174:1243,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,253:816,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(sb,[2,1081],{176:1244}),t(s,[2,606],{183:[1,1245]}),t(s,[2,602],{183:[1,1246]}),t(s,[2,595]),{113:1247,132:y,296:v},t(s,[2,604],{183:[1,1248]}),t(s,[2,599]),t(s,[2,600],{112:[1,1249]}),t(hv,[2,69]),{40:1250,79:75,89:eu,184:99,189:ou},t(s,[2,450],{74:ba,128:[1,1251]}),t(ka,[2,451]),{124:[1,1253]},{2:i,3:1254,4:r,5:u},t(ku,[2,1115]),t(ku,[2,1116]),t(s,[2,618]),t(bp,[2,355],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(oh,ub,{114:625,327:637,112:er,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,332:or}),t(fo,[2,682]),t(fo,[2,684]),t(s,[2,650]),t(s,[2,652],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1255,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1079,4:r,5:u,77:bw,131:kw,432:1256},t(hl,[2,659]),t(hl,[2,660]),t(hl,[2,661]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1257,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1258,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{114:1077,115:si,116:hi,124:[1,1259]},t(su,[2,755]),t(oc,[2,148],{74:lc}),t(oc,[2,149],{74:lc}),t(oc,[2,150],{74:lc}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:817,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,253:1260,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1261,4:r,5:u,113:1263,131:[1,1262],132:y,296:v},t(ph,[2,275]),t(ph,[2,277]),t(ph,[2,279]),t(il,[2,160]),t(il,[2,1090]),{78:[1,1264]},t(rp,[2,758]),{2:i,3:1265,4:r,5:u},{2:i,3:1266,4:r,5:u},{2:i,3:1268,4:r,5:u,384:1267},{2:i,3:1268,4:r,5:u,384:1269},{2:i,3:1270,4:r,5:u},{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1271,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1272,4:r,5:u},{74:to,78:[1,1273]},t(au,[2,347]),t(au,[2,348]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1274,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1275,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1276,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1277,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(ha,[2,504]),t(s,gv,{407:1278,76:ny,77:[1,1279]}),t(s,gv,{407:1281,76:ny}),{77:[1,1282]},{2:i,3:244,4:r,5:u,199:1283},t(su,[2,731]),t(su,[2,733]),t(su,[2,1146]),{143:lh,145:ah,431:1284},t(hb,[2,1147],{419:190,479:1285,144:1286,145:lu,420:o,424:e}),{76:wv,139:[2,1151],481:1287,483:1288},t([10,74,76,78,132,139,145,152,306,310,420,424,602,764],tw,{490:851,493:852,137:vh}),t(su,[2,736]),t(su,lv),{74:gp,78:[1,1289]},t(lo,[2,1165],{492:1290,497:1291,152:fh}),t(la,[2,1164]),t(lo,[2,745]),t(lo,[2,1170]),t(s,[2,490],{77:[1,1292]}),{76:[1,1294],77:[1,1293]},{99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,148:[1,1295],154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(vu,cb,{79:75,184:99,468:1296,40:1299,89:eu,146:lb,189:ou,470:ab}),t(dw,[2,1140]),t(av,[2,723]),{230:[1,1300]},t(ty,[2,769]),t(ty,[2,770]),t(ty,[2,771]),t(sc,rw,{510:1301,95:uw,514:fw,515:ew,516:ow}),t(sc,[2,768]),t(s,[2,312]),t(s,[2,313]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1302,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(fo,[2,690],{124:[1,1303]}),t(ac,[2,541]),{131:[1,1305],388:1304,390:[1,1306]},t(ac,[2,5]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1194,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,345:1307,419:190,420:o,424:e},t(s,[2,455],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(s,[2,589]),t(s,[2,590]),{2:i,3:244,4:r,5:u,199:1308},t(s,[2,670]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1309,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1310,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{78:[1,1311],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{78:[1,1312],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{2:i,3:168,4:r,5:u,40:1313,56:165,77:yt,79:75,89:eu,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1314,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,184:99,189:ou,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{78:[1,1315]},{74:to,78:[1,1316]},t(sr,[2,426]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1317,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,40:1318,56:165,77:yt,78:[1,1320],79:75,89:eu,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1319,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,184:99,189:ou,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(sr,[2,429]),t(sr,[2,431]),t(sr,iy,{275:1321,276:ry}),{78:[1,1323],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{78:[1,1324],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{2:i,3:1325,4:r,5:u,180:[1,1326]},t(eo,[2,619]),t(sr,[2,363]),{306:[1,1327]},t(sr,[2,370]),{99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,306:[2,374],311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1328,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{4:hc,7:879,272:1329,387:878,389:cc},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1330,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(eo,[2,641]),t(yw,[2,648]),t(eh,[2,636]),t(dv,fb),t(eo,[2,638]),t(ul,[2,643]),t(ul,[2,645]),t(ul,[2,646]),t(ul,[2,647]),t(vu,[2,457],{74:sh}),{77:[1,1332],143:h,144:1333,145:lu,152:c,181:l,201:1334,302:a,419:190,420:o,424:e},t(vu,[2,463]),{74:bh,78:[1,1335]},{74:uy,78:[1,1337]},t([74,78,99,112,115,116,123,124,133,136,138,139,140,141,142,154,170,171,179,180,311,312,313,315,316,317,318,319,320,321,322,323,324,325,326,330,331,332,333],vb),t(yu,[2,479],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{40:1341,77:yh,79:75,89:eu,143:h,144:979,145:lu,149:fl,152:c,181:l,184:99,189:ou,201:980,302:a,341:1339,342:1340,344:el,419:190,420:o,424:e},t(vu,[2,461],{74:sh}),t(s,[2,717],{457:1342,458:1343,459:1344,308:ob,464:[1,1345]}),t(pu,[2,701]),t(pu,[2,702]),{154:[1,1347],460:[1,1346]},{99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,308:[2,698],311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(cu,[2,179]),{2:i,3:1348,4:r,5:u},t(s,[2,574]),t(yb,[2,238],{84:1349,128:[1,1350]}),t(hh,[2,1046]),{77:[1,1351]},{77:[1,1352]},t(va,[2,169],{204:1353,215:1355,205:1356,216:1357,221:1360,74:pb,206:da,208:ga,222:nv,223:cl,224:ll,225:al,226:vl,227:yl,228:pl,229:wl}),{2:i,3:219,4:r,5:u,40:711,77:tl,79:75,89:eu,132:uc,143:h,144:212,145:vt,152:c,156:p,181:l,184:99,189:ou,199:213,200:215,201:214,202:217,203:1369,209:1211,213:fc,214:218,290:d,291:w,292:b,293:k,302:a,419:190,420:o,424:e},t(tv,[2,177]),{2:i,3:1011,4:r,5:u,110:1370,111:1009,112:ww},t(wa,[2,87]),t(oo,[2,147],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{78:[1,1371]},{74:to,78:[2,1066]},{2:i,3:168,4:r,5:u,56:165,77:yt,78:[2,1059],94:1376,111:149,113:153,120:1372,121:1373,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,241:1374,242:[1,1375],254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(fu,[2,98]),t(wu,[2,1062],{153:1015,179:io,180:ro,181:uo}),{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,78:[1,1377],112:tf,114:736,115:si,116:hi,117:1378,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},t(wu,[2,1063],{153:1015,179:io,180:ro,181:uo}),{78:[1,1379],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{78:[1,1380],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{78:[1,1381]},t(fu,[2,120]),{74:ba,78:[1,1382]},t(fu,[2,122]),{74:to,78:[1,1383]},{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,78:[1,1384],112:tf,114:736,115:si,116:hi,117:1385,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,78:[1,1386],112:tf,114:736,115:si,116:hi,117:1387,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,78:[1,1388],112:tf,114:736,115:si,116:hi,117:1389,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,78:[1,1390],112:tf,114:736,115:si,116:hi,117:1391,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{74:pc,78:[1,1392]},t(yu,[2,143],{419:190,3:733,114:736,144:758,158:768,160:769,117:1394,2:i,4:r,5:u,72:du,76:gu,77:nf,112:tf,115:si,116:hi,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,420:o,424:e}),t(wh,yc,{178:1234,163:1395}),{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,78:[1,1396],112:tf,114:736,115:si,116:hi,117:1397,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{2:i,3:733,4:r,5:u,72:du,76:gu,77:nf,78:[1,1398],112:tf,114:736,115:si,116:hi,117:1399,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{74:pc,78:[1,1400]},{74:pc,78:[1,1401]},{74:pc,78:[1,1402]},{74:pc,78:[1,1403]},{78:[1,1404],153:1015,179:io,180:ro,181:uo},{74:lc,78:[1,1405]},{2:i,3:733,4:r,5:u,72:du,74:[1,1406],76:gu,77:nf,112:tf,114:736,115:si,116:hi,117:1407,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,144:758,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,158:768,160:769,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,419:190,420:o,424:e},{2:i,3:1408,4:r,5:u},{2:i,3:1409,4:r,5:u},t(s,[2,597]),{2:i,3:1410,4:r,5:u},{113:1411,132:y,296:v},{78:[1,1412]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1413,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1011,4:r,5:u,111:1065,143:ol,145:sl,336:1414,337:1066},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1415,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{124:[1,1416]},t(s,[2,653],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(hl,[2,658]),{78:[1,1417],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(s,[2,654],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1418,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(ph,[2,272]),t(ph,[2,274]),t(ph,[2,276]),t(ph,[2,278]),t(il,[2,161]),t(s,[2,569]),{148:[1,1419]},t(s,[2,570]),t(su,[2,536],{387:878,7:879,272:1420,4:hc,386:[1,1421],389:cc}),t(s,[2,571]),t(s,[2,573]),{74:to,78:[1,1422]},t(s,[2,577]),t(au,[2,345]),{74:[1,1423],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{74:[1,1424],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{74:[1,1425],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{74:[1,1426],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(s,[2,581]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1427,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1428,4:r,5:u},t(s,[2,583]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1376,111:149,113:153,120:1429,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,241:1374,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{77:[1,1430]},{2:i,3:1431,4:r,5:u},{76:wv,139:[2,1149],480:1432,483:1433},t(hb,[2,1148]),{139:[1,1434]},{139:[2,1152]},t(su,[2,737]),t(lo,[2,744]),t(lo,[2,1166]),{2:i,3:1268,4:r,5:u,76:[1,1437],351:1435,358:1436,384:1438},{2:i,3:1011,4:r,5:u,100:1439,111:1440},{40:1441,79:75,89:eu,184:99,189:ou},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1442,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(vu,[2,722]),{2:i,3:1011,4:r,5:u,111:1065,143:ol,145:sl,147:1443,336:1064,337:1066},{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1444,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(vu,[2,727]),{2:i,3:244,4:r,5:u,199:1445},{335:gw,338:nb,339:tb,511:1446},t(fo,[2,691],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1447,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{74:[1,1448],78:[1,1449]},t(yu,[2,543]),t(yu,[2,544]),{74:uy,78:[1,1450]},t(fo,[2,565]),t(ya,[2,380],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,312:ai,316:ci,317:di,318:tr,319:ir}),t(ya,[2,382],{114:625,327:637,115:si,116:hi,123:yi,133:pi,136:li,138:wi,141:gi,142:nr,179:ki,180:bi,312:ai,316:ci,317:di,318:tr,319:ir}),t(sr,[2,396]),t(sr,[2,400]),{78:[1,1451]},{74:to,78:[1,1452]},t(sr,[2,422]),t(sr,[2,424]),{78:[1,1453],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{78:[1,1454]},{74:to,78:[1,1455]},t(sr,[2,427]),t(sr,[2,327]),{77:[1,1456]},t(sr,iy,{275:1457,276:ry}),t(sr,iy,{275:1458,276:ry}),t(dv,[2,284]),t(sr,[2,281]),t(sr,[2,369]),t(yv,[2,373],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{74:[1,1460],78:[1,1459]},{74:[1,1462],78:[1,1461],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{2:i,3:1325,4:r,5:u},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1194,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,345:1463,419:190,420:o,424:e},t(vc,[2,477]),t(vc,[2,478]),{40:1466,77:yh,79:75,89:eu,143:h,144:979,145:lu,149:fl,152:c,181:l,184:99,189:ou,201:980,302:a,341:1464,342:1465,344:el,419:190,420:o,424:e},{2:i,3:1011,4:r,5:u,111:1467},t(vc,[2,473]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1468,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{77:yh,143:h,144:979,145:lu,152:c,181:l,201:980,302:a,342:1469,419:190,420:o,424:e},t(vu,[2,460],{74:sh}),t(vu,[2,467]),t(s,[2,694]),t(pu,[2,699]),t(pu,[2,700]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:817,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,174:1470,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,253:816,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{170:[1,1472],309:[1,1471]},{460:[1,1473]},t(cu,[2,180]),t(iv,[2,240],{85:1474,232:[1,1475]}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1476,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1477,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1478,4:r,5:u},t(va,[2,170],{216:1357,221:1360,215:1479,205:1480,206:da,208:ga,222:nv,223:cl,224:ll,225:al,226:vl,227:yl,228:pl,229:wl}),{2:i,3:219,4:r,5:u,77:tl,132:uc,143:h,144:212,145:vt,152:c,156:p,181:l,199:213,200:215,201:214,202:217,209:1481,213:fc,214:218,290:d,291:w,292:b,293:k,302:a,419:190,420:o,424:e},t(ho,[2,205]),t(ho,[2,206]),{2:i,3:219,4:r,5:u,77:[1,1486],143:h,144:1484,145:vt,152:c,156:p,181:l,199:1483,200:1487,201:1485,202:1488,217:1482,290:d,291:w,292:b,293:k,302:a,419:190,420:o,424:e},{207:[1,1489],223:wb},{207:[1,1491],223:bb},t(so,[2,222]),{206:[1,1495],208:[1,1494],221:1493,223:cl,224:ll,225:al,226:vl,227:yl,228:pl,229:wl},t(so,[2,224]),{223:[1,1496]},{208:[1,1498],223:[1,1497]},{208:[1,1500],223:[1,1499]},{208:[1,1501]},{223:[1,1502]},{223:[1,1503]},{74:pb,204:1504,205:1356,206:da,208:ga,215:1355,216:1357,221:1360,222:nv,223:cl,224:ll,225:al,226:vl,227:yl,228:pl,229:wl},t(wa,[2,84]),t(fu,[2,100]),{74:bl,78:[1,1505]},{78:[1,1507]},t(wc,[2,261]),{78:[2,1060]},t(wc,[2,263],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,242:[1,1508],243:[1,1509],311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(fu,[2,99]),t(wu,[2,1064],{153:1015,179:io,180:ro,181:uo}),t(fu,[2,101]),t(fu,[2,102]),t(fu,[2,103]),t(fu,[2,121]),t(fu,[2,124]),t(fu,[2,127]),t(wu,[2,1068],{153:1015,179:io,180:ro,181:uo}),t(fu,[2,128]),t(wu,[2,1070],{153:1015,179:io,180:ro,181:uo}),t(fu,[2,129]),t(wu,[2,1072],{153:1015,179:io,180:ro,181:uo}),t(fu,[2,130]),t(wu,[2,1076],{153:1015,179:io,180:ro,181:uo}),t(fu,[2,131]),t(wh,[2,1083],{177:1510}),t(wh,[2,1086],{153:1015,179:io,180:ro,181:uo}),{74:pc,78:[1,1511]},t(fu,[2,133]),t(wu,[2,1078],{153:1015,179:io,180:ro,181:uo}),t(fu,[2,134]),t(wu,[2,1080],{153:1015,179:io,180:ro,181:uo}),t(fu,[2,135]),t(fu,[2,136]),t(fu,[2,137]),t(fu,[2,138]),t(fu,[2,139]),t(fu,[2,140]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:260,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,151:1512,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(sb,[2,1082],{153:1015,179:io,180:ro,181:uo}),t(s,[2,607]),t(s,[2,603]),t(s,[2,605]),t(s,[2,601]),t(hv,[2,71]),t(s,[2,449],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(ka,[2,452]),t(ka,[2,453],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1513,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(hl,[2,662]),t(s,[2,655],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{2:i,3:1514,4:r,5:u},t(su,[2,545],{385:1515,391:1516,392:1517,366:1525,154:kb,187:db,230:gb,297:nk,343:tk,356:ik,368:fy,369:rk,373:uk,374:fk}),t(su,[2,535]),t(s,[2,576],{76:[1,1529]}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1530,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1531,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1532,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1533,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{74:to,78:[1,1534]},t(s,[2,585]),{74:bl,78:[1,1535]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1376,111:149,113:153,120:1536,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,241:1374,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t([10,74,78,139,306,310,602,764],[2,741]),{139:[1,1537]},{139:[2,1150]},{2:i,3:1122,4:r,5:u,132:gh,137:vh,143:lh,145:ah,152:fh,431:585,475:1124,478:1538,482:582,493:579,497:581},{78:[1,1539]},{74:[1,1540],78:[2,506]},{40:1541,79:75,89:eu,184:99,189:ou},t(yu,[2,532]),{74:bh,78:[1,1542]},t(tv,vb),t(s,[2,1133],{412:1543,413:1544,72:ek}),t(vu,cb,{79:75,184:99,114:625,327:637,40:1299,468:1546,89:eu,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,146:lb,154:dr,170:ru,171:uu,179:ki,180:bi,189:ou,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu,470:ab}),t(vu,[2,725],{74:ba}),t(vu,[2,726],{74:to}),t([10,53,72,89,124,146,156,189,266,267,290,306,310,335,338,339,396,400,401,404,406,408,409,417,418,434,436,437,439,440,441,442,443,447,448,451,452,505,507,508,517,602,764],[2,1181],{512:1547,3:1548,2:i,4:r,5:u,76:[1,1549]}),t(ey,[2,1183],{513:1550,76:[1,1551]}),t(fo,[2,692],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{131:[1,1552]},t(ac,[2,538]),t(ac,[2,540]),t(sr,[2,412]),t(sr,[2,413]),t(sr,[2,439]),t(sr,[2,423]),t(sr,[2,425]),{118:ok,277:1553,278:1554,279:[1,1555]},t(sr,[2,328]),t(sr,[2,329]),t(sr,[2,316]),{131:[1,1557]},t(sr,[2,318]),{131:[1,1558]},{74:uy,78:[1,1559]},{77:yh,143:h,144:979,145:lu,152:c,181:l,201:980,302:a,342:1560,419:190,420:o,424:e},t(vu,[2,465],{74:sh}),t(vu,[2,468]),t(tv,[2,488]),t(yu,[2,480],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(vu,[2,459],{74:sh}),t(s,[2,718],{74:lc,198:[1,1561]}),{335:oy,338:sy,461:1562},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1565,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{119:[1,1567],170:[1,1568],309:[1,1566]},t(sk,[2,259],{86:1569,118:[1,1570]}),{119:[1,1571]},t(yb,[2,239],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{95:[1,1572],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{95:[1,1573]},t(ho,[2,203]),t(ho,[2,204]),t(tv,[2,178]),t(ho,[2,237],{218:1574,230:[1,1575],231:[1,1576]}),t(bu,[2,208],{3:1577,2:i,4:r,5:u,76:[1,1578]}),t(hk,[2,1095],{219:1579,76:[1,1580]}),{2:i,3:1581,4:r,5:u,76:[1,1582]},{40:1583,79:75,89:eu,184:99,189:ou},t(bu,[2,216],{3:1584,2:i,4:r,5:u,76:[1,1585]}),t(bu,[2,219],{3:1586,2:i,4:r,5:u,76:[1,1587]}),{77:[1,1588]},t(so,[2,234]),{77:[1,1589]},t(so,[2,230]),t(so,[2,223]),{223:bb},{223:wb},t(so,[2,225]),t(so,[2,226]),{223:[1,1590]},t(so,[2,228]),{223:[1,1591]},{223:[1,1592]},t(so,[2,232]),t(so,[2,233]),{78:[1,1593],205:1480,206:da,208:ga,215:1479,216:1357,221:1360,222:nv,223:cl,224:ll,225:al,226:vl,227:yl,228:pl,229:wl},t(fu,[2,91]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1376,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,241:1594,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(fu,[2,92]),t(wc,[2,264]),{244:[1,1595]},t(yu,[2,142],{419:190,3:733,114:736,144:758,158:768,160:769,117:1596,2:i,4:r,5:u,72:du,76:gu,77:nf,112:tf,115:si,116:hi,118:rf,122:uf,123:ff,124:ef,128:of,129:sf,130:hf,131:cf,132:lf,133:af,134:vf,135:yf,136:pf,137:wf,138:bf,139:kf,140:df,141:gf,142:ne,143:te,145:ie,146:re,148:ue,149:fe,150:ee,152:oe,154:se,156:he,162:ce,164:le,166:ae,168:ve,169:ye,170:pe,171:we,172:be,173:ke,175:de,185:ge,187:no,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,420:o,424:e}),t(fu,[2,132]),{74:to,78:[1,1597]},t(ka,[2,454],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(s,[2,572]),t(su,[2,534]),t(su,[2,546],{366:1525,392:1598,154:kb,187:db,230:gb,297:nk,343:tk,356:ik,368:fy,369:rk,373:uk,374:fk}),t(hu,[2,548]),{370:[1,1599]},{370:[1,1600]},{2:i,3:244,4:r,5:u,199:1601},t(hu,[2,554],{77:[1,1602]}),{2:i,3:114,4:r,5:u,77:[1,1604],113:251,131:g,132:y,143:h,152:c,156:p,181:l,196:250,200:1605,201:254,257:252,258:253,265:ev,274:1603,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,302:a},t(hu,[2,558]),{297:[1,1606]},t(hu,[2,560]),t(hu,[2,561]),{335:[1,1607]},{77:[1,1608]},{2:i,3:1609,4:r,5:u},{78:[1,1610],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{78:[1,1611],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{78:[1,1612],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{78:[1,1613],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(s,gv,{407:1614,76:ny}),t(s,[2,591]),{74:bl,78:[1,1615]},{2:i,3:1122,4:r,5:u,132:gh,137:vh,143:lh,145:ah,152:fh,431:585,475:1124,478:1616,482:582,493:579,497:581},t(su,[2,735]),t(s,[2,493],{352:1617,354:1618,355:1619,4:ck,243:lk,343:ak,356:vk}),t(rv,hy,{3:1268,359:1624,384:1625,360:1626,361:1627,2:i,4:r,5:u,367:cy}),{78:[2,507]},{76:[1,1629]},t(s,[2,609]),t(s,[2,1134]),{368:[1,1631],414:[1,1630]},t(vu,[2,728]),t(s,ao,{17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,12:1632,2:i,4:r,5:u,53:vo,72:yo,89:eu,124:kh,146:po,156:wo,189:ou,266:lt,267:bo,290:ko,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),t(s,[2,762]),t(ey,[2,1182]),t(s,ao,{17:5,18:7,19:8,20:9,21:10,22:11,23:12,24:13,25:14,26:15,27:16,28:17,29:18,30:19,31:20,32:21,33:22,34:23,35:24,36:25,37:26,38:27,39:28,40:29,41:30,42:31,43:32,44:33,45:34,46:35,47:36,48:37,49:38,50:39,51:40,52:41,54:43,55:44,56:45,57:46,58:47,59:48,60:49,61:50,62:51,63:52,64:53,65:54,66:55,67:56,68:57,69:58,70:59,71:60,79:75,504:95,184:99,3:100,12:1633,2:i,4:r,5:u,53:vo,72:yo,89:eu,124:kh,146:po,156:wo,189:ou,266:lt,267:bo,290:ko,335:go,338:ns,339:co,396:ts,400:is,401:rs,404:us,406:fs,408:es,409:os,417:ss,418:hs,434:cs,436:ls,437:as,439:vs,440:ys,441:ps,442:ws,443:bs,447:ks,448:ds,451:gs,452:nh,505:th,507:ih,508:rh,517:uh}),t(ey,[2,1184]),{78:[1,1634]},{78:[1,1635],118:ok,278:1636},{78:[1,1637]},{119:[1,1638]},{119:[1,1639]},{78:[1,1640]},{78:[1,1641]},t(vc,[2,476]),t(vu,[2,464],{74:sh}),{2:i,3:244,4:r,5:u,143:lh,145:ah,199:1643,431:1642},t(pu,[2,703]),t(pu,[2,705]),{146:[1,1644]},{99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,309:[1,1645],311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},{339:kl,462:1646},{417:[1,1649],463:[1,1648]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1650,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(rc,[2,267],{87:1651,245:[1,1652],247:[1,1653]}),{119:[1,1654]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1660,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,233:1655,235:1656,236:bc,237:kc,238:dc,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1661,4:r,5:u},{2:i,3:1662,4:r,5:u},t(ho,[2,207]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1663,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1011,4:r,5:u,100:1664,111:1440},t(bu,[2,209]),{2:i,3:1665,4:r,5:u},t(bu,[2,1097],{220:1666,3:1667,2:i,4:r,5:u}),t(hk,[2,1096]),t(bu,[2,212]),{2:i,3:1668,4:r,5:u},{78:[1,1669]},t(bu,[2,217]),{2:i,3:1670,4:r,5:u},t(bu,[2,220]),{2:i,3:1671,4:r,5:u},{40:1672,79:75,89:eu,184:99,189:ou},{40:1673,79:75,89:eu,184:99,189:ou},t(so,[2,227]),t(so,[2,229]),t(so,[2,231]),t(va,[2,171]),t(wc,[2,262]),t(wc,[2,265],{242:[1,1674]}),t(wh,[2,1084],{153:1015,179:io,180:ro,181:uo}),t(fu,[2,141]),t(hu,[2,547]),t(hu,[2,550]),{374:[1,1675]},t(hu,[2,1127],{395:1676,393:1677,77:yk}),{131:g,196:1679},t(hu,[2,555]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1680,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(hu,[2,557]),t(hu,[2,559]),{2:i,3:114,4:r,5:u,77:[1,1682],113:251,131:g,132:y,143:h,152:c,156:p,181:l,196:250,200:255,201:254,257:252,258:253,265:ev,274:1681,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,302:a},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1683,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(s,[2,578]),t(au,[2,349]),t(au,[2,350]),t(au,[2,351]),t(au,[2,352]),t(s,[2,582]),t(s,[2,592]),t(su,[2,734]),t(s,[2,489]),t(s,[2,494],{355:1684,4:ck,243:lk,343:ak,356:vk}),t(gc,[2,496]),t(gc,[2,497]),{124:[1,1685]},{124:[1,1686]},{124:[1,1687]},{74:[1,1688],78:[2,505]},t(yu,[2,533]),t(yu,[2,508]),{187:[1,1696],193:[1,1697],362:1689,363:1690,364:1691,365:1692,366:1693,368:fy,369:[1,1694],370:[1,1698],373:[1,1695]},{2:i,3:1699,4:r,5:u},{40:1700,79:75,89:eu,184:99,189:ou},{415:[1,1701]},{416:[1,1702]},t(s,[2,761]),t(s,[2,763]),t(ac,[2,537]),t(sr,[2,331]),{78:[1,1703]},t(sr,[2,332]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1660,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,233:1704,235:1656,236:bc,237:kc,238:dc,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1376,111:149,113:153,120:1705,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,241:1374,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(sr,[2,317]),t(sr,[2,319]),{2:i,3:1706,4:r,5:u},t(s,[2,720],{77:[1,1707]}),{2:i,3:1011,4:r,5:u,111:1065,143:ol,145:sl,147:1708,336:1064,337:1066},{335:oy,338:sy,461:1709},t(pu,[2,707]),{77:[1,1711],343:[1,1712],344:[1,1710]},{170:[1,1714],309:[1,1713]},{170:[1,1716],309:[1,1715]},{99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,309:[1,1717],311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(oo,[2,250],{88:1718,162:[1,1719],168:[1,1721],169:[1,1720]}),{131:g,196:1722},{131:g,196:1723},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1376,111:149,113:153,120:1724,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,241:1374,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},t(iv,[2,248],{234:1725,74:dl,239:[1,1727]}),t(nl,[2,242]),{146:[1,1728]},{77:[1,1729]},{77:[1,1730]},t(nl,[2,247],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{78:[2,1051],96:1731,99:[1,1733],102:1732},{99:[1,1734]},t(ho,[2,235],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),t(ho,[2,236],{74:bh}),t(bu,[2,210]),t(bu,[2,211]),t(bu,[2,1098]),t(bu,[2,213]),{2:i,3:1735,4:r,5:u,76:[1,1736]},t(bu,[2,218]),t(bu,[2,221]),{78:[1,1737]},{78:[1,1738]},t(wc,[2,266]),{2:i,3:244,4:r,5:u,199:1739},t(hu,[2,552]),t(hu,[2,1128]),{2:i,3:1740,4:r,5:u},{74:[1,1741]},{78:[1,1742],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(hu,[2,562]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1743,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{78:[1,1744],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(gc,[2,495]),{2:i,3:1745,4:r,5:u},{131:g,196:1746},{2:i,3:1747,4:r,5:u},t(rv,hy,{361:1627,360:1748,367:cy}),t(su,[2,510]),t(su,[2,511]),t(su,[2,512]),t(su,[2,513]),t(su,[2,514]),{370:[1,1749]},{370:[1,1750]},t(pk,[2,1121],{382:1751,370:[1,1752]}),{2:i,3:1753,4:r,5:u},{2:i,3:1754,4:r,5:u},t(rv,[2,516]),t(s,[2,1131],{411:1755,413:1756,72:ek}),t(s,[2,610]),t(s,[2,611],{367:[1,1757]}),t(sr,[2,333]),t([78,118],[2,334],{74:dl}),{74:bl,78:[2,335]},t(s,[2,719]),{2:i,3:1011,4:r,5:u,100:1758,111:1440},t(pu,[2,706],{74:ba}),t(pu,[2,704]),{77:yh,143:h,144:979,145:lu,152:c,181:l,201:980,302:a,342:1759,419:190,420:o,424:e},{2:i,3:1011,4:r,5:u,100:1760,111:1440},{344:[1,1761]},{339:kl,462:1762},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1763,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{339:kl,462:1764},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1765,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{339:kl,462:1766},t(oo,[2,72]),{40:1767,79:75,89:eu,164:[1,1768],184:99,189:ou,240:[1,1769]},{40:1770,79:75,89:eu,184:99,189:ou,240:[1,1771]},{40:1772,79:75,89:eu,184:99,189:ou,240:[1,1773]},t(rc,[2,270],{246:1774,247:[1,1775]}),{248:1776,249:[2,1099],766:[1,1777]},t(sk,[2,260],{74:bl}),t(iv,[2,241]),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1660,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,235:1778,236:bc,237:kc,238:dc,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1779,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{77:[1,1780]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1660,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,233:1781,235:1656,236:bc,237:kc,238:dc,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1660,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,233:1782,235:1656,236:bc,237:kc,238:dc,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{78:[1,1783]},{78:[2,1052]},{77:[1,1784]},{77:[1,1785]},t(bu,[2,214]),{2:i,3:1786,4:r,5:u},{2:i,3:1787,4:r,5:u,76:[1,1788]},{2:i,3:1789,4:r,5:u,76:[1,1790]},t(hu,[2,1125],{394:1791,393:1792,77:yk}),{78:[1,1793]},{131:g,196:1794},t(hu,[2,556]),{78:[1,1795],99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(hu,[2,517]),t(gc,[2,498]),t(gc,[2,499]),t(gc,[2,500]),t(yu,[2,509]),{2:i,3:1797,4:r,5:u,77:[2,1117],371:1796},{77:[1,1798]},{2:i,3:1800,4:r,5:u,77:[2,1123],383:1799},t(pk,[2,1122]),{77:[1,1801]},{77:[1,1802]},t(s,[2,608]),t(s,[2,1132]),t(rv,hy,{361:1627,360:1803,367:cy}),{74:bh,78:[1,1804]},t(pu,[2,713],{74:sh}),{74:bh,78:[1,1805]},t(pu,[2,715]),t(pu,[2,708]),{99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,309:[1,1806],311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(pu,[2,711]),{99:wr,112:er,114:625,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,309:[1,1807],311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,327:637,330:gr,331:nu,332:or,333:iu},t(pu,[2,709]),t(oo,[2,251]),{40:1808,79:75,89:eu,184:99,189:ou,240:[1,1809]},{40:1810,79:75,89:eu,184:99,189:ou},t(oo,[2,253]),{40:1811,79:75,89:eu,184:99,189:ou},t(oo,[2,254]),{40:1812,79:75,89:eu,184:99,189:ou},t(rc,[2,268]),{131:g,196:1813},{249:[1,1814]},{249:[2,1100]},t(nl,[2,243]),t(iv,[2,249],{114:625,327:637,99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1660,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,233:1815,235:1656,236:bc,237:kc,238:dc,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{74:dl,78:[1,1816]},{74:dl,78:[1,1817]},t(hh,[2,1053],{97:1818,104:1819,3:1821,2:i,4:r,5:u,76:wk}),{2:i,3:168,4:r,5:u,56:165,77:yt,94:1824,103:1822,105:1823,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1011,4:r,5:u,100:1825,111:1440},t(bu,[2,215]),t(ho,[2,173]),{2:i,3:1826,4:r,5:u},t(ho,[2,175]),{2:i,3:1827,4:r,5:u},t(hu,[2,551]),t(hu,[2,1126]),t(hu,[2,549]),{78:[1,1828]},t(hu,[2,563]),{77:[1,1829]},{77:[2,1118]},{2:i,3:1831,4:r,5:u,132:ly,372:1830},{77:[1,1833]},{77:[2,1124]},{2:i,3:1011,4:r,5:u,100:1834,111:1440},{2:i,3:1011,4:r,5:u,100:1835,111:1440},t(s,[2,612]),t(s,[2,721]),{343:[1,1837],344:[1,1836]},{339:kl,462:1838},{335:oy,338:sy,461:1839},t(oo,[2,252]),{40:1840,79:75,89:eu,184:99,189:ou},t(oo,[2,255]),t(oo,[2,257]),t(oo,[2,258]),t(rc,[2,271]),{131:[2,1101],250:1841,645:[1,1842]},{74:dl,78:[1,1843]},t(nl,[2,245]),t(nl,[2,246]),t(hh,[2,74]),t(hh,[2,1054]),{2:i,3:1844,4:r,5:u},t(hh,[2,78]),{74:[1,1846],78:[1,1845]},t(yu,[2,80]),t(yu,[2,81],{114:625,327:637,76:[1,1847],99:wr,112:er,115:si,116:hi,123:yi,124:tu,133:pi,136:li,138:wi,139:br,140:kr,141:gi,142:nr,154:dr,170:ru,171:uu,179:ki,180:bi,311:rr,312:ai,313:ur,315:fr,316:ci,317:di,318:tr,319:ir,320:hr,321:cr,322:lr,323:ar,324:vr,325:yr,326:pr,330:gr,331:nu,332:or,333:iu}),{74:bh,78:[1,1848]},t(ho,[2,174]),t(ho,[2,176]),t(hu,[2,553]),{2:i,3:1831,4:r,5:u,132:ly,372:1849},{74:ay,78:[1,1850]},t(yu,[2,528]),t(yu,[2,529]),{2:i,3:1011,4:r,5:u,100:1852,111:1440},{74:bh,78:[1,1853]},{74:bh,78:[1,1854]},{77:yh,143:h,144:979,145:lu,152:c,181:l,201:980,302:a,342:1855,419:190,420:o,424:e},{344:[1,1856]},t(pu,[2,710]),t(pu,[2,712]),t(oo,[2,256]),{131:g,196:1857},{131:[2,1102]},t(nl,[2,244]),t(hh,[2,77]),{78:[2,76]},{2:i,3:168,4:r,5:u,56:165,77:yt,94:1824,105:1858,111:149,113:153,131:g,132:y,137:pt,143:h,144:161,145:vt,149:wt,152:c,154:bt,156:p,158:167,179:kt,180:dt,181:l,196:151,200:147,201:155,202:156,254:150,255:146,256:148,257:152,258:154,259:157,260:158,261:159,262:162,263:163,265:gt,266:lt,270:ni,271:ti,273:ii,280:nt,281:tt,282:it,283:rt,284:ut,285:ft,286:et,287:ot,288:st,290:d,291:w,292:b,293:k,294:ht,295:ct,296:v,297:at,298:ri,299:ui,302:a,303:fi,312:ei,317:oi,419:190,420:o,424:e},{2:i,3:1859,4:r,5:u},{78:[1,1860]},{74:ay,78:[1,1861]},{374:[1,1862]},{2:i,3:1863,4:r,5:u,132:[1,1864]},{74:bh,78:[1,1865]},t(su,[2,526]),t(su,[2,527]),t(pu,[2,714],{74:sh}),t(pu,[2,716]),t(bk,[2,1103],{251:1866,766:[1,1867]}),t(yu,[2,79]),t(yu,[2,82]),t(hh,[2,1055],{3:1821,101:1868,104:1869,2:i,4:r,5:u,76:wk}),t(su,[2,518]),{2:i,3:244,4:r,5:u,199:1870},t(yu,[2,530]),t(yu,[2,531]),t(su,[2,525]),t(rc,[2,1105],{252:1871,415:[1,1872]}),t(bk,[2,1104]),t(hh,[2,75]),t(hh,[2,1056]),t(vy,[2,1119],{375:1873,377:1874,77:[1,1875]}),t(rc,[2,269]),t(rc,[2,1106]),t(su,[2,521],{376:1876,378:1877,230:[1,1878]}),t(vy,[2,1120]),{2:i,3:1831,4:r,5:u,132:ly,372:1879},t(su,[2,519]),{230:[1,1881],379:1880},{338:[1,1882]},{74:ay,78:[1,1883]},t(su,[2,522]),{335:[1,1884]},{380:[1,1885]},t(vy,[2,520]),{380:[1,1886]},{381:[1,1887]},{381:[1,1888]},{230:[2,523]},t(su,[2,524])],defaultActions:{105:[2,6],194:[2,336],195:[2,337],196:[2,338],197:[2,339],198:[2,340],199:[2,341],200:[2,342],201:[2,343],202:[2,344],209:[2,695],591:[2,1142],653:[2,1107],654:[2,1108],710:[2,696],780:[2,1073],781:[2,1074],926:[2,446],927:[2,447],928:[2,448],987:[2,697],1288:[2,1152],1375:[2,1060],1433:[2,1150],1541:[2,507],1732:[2,1052],1777:[2,1100],1797:[2,1118],1800:[2,1124],1842:[2,1102],1845:[2,76],1887:[2,523]},parseError:function(n,t){if(t.recoverable)this.trace(n);else{function i(n,t){this.message=n;this.hash=t}i.prototype=Error;throw new i(n,t);}},parse:function(n){function lt(n){u.length=u.length-2*n;o.length=o.length-n;i.length=i.length-n}var ht=this,u=[0],o=[null],i=[],h=this.table,it="",y=0,rt=0,p=0,w=2,b=1,ct=i.slice.call(arguments,1),t=Object.create(this.lexer),c={yy:{}},g,k,et,ut,r,a,e,f,ft,l,nt,s,ot,tt,d,v;for(g in this.yy)Object.prototype.hasOwnProperty.call(this.yy,g)&&(c.yy[g]=this.yy[g]);t.setInput(n,c.yy);c.yy.lexer=t;c.yy.parser=this;typeof t.yylloc=="undefined"&&(t.yylloc={});k=t.yylloc;i.push(k);et=t.options&&t.options.ranges;this.parseError=typeof c.yy.parseError=="function"?c.yy.parseError:Object.getPrototypeOf(this).parseError;n:ut=function(){var n;return n=t.lex()||b,typeof n!="number"&&(n=ht.symbols_[n]||n),n};for(l={};;){e=u[u.length-1];this.defaultActions[e]?f=this.defaultActions[e]:((r===null||typeof r=="undefined")&&(r=ut()),f=h[e]&&h[e][r]);n:if(typeof f=="undefined"||!f.length||!f[0]){v="";function st(n){for(var t=u.length-1,i=0;;){if(w.toString()in h[n])return i;if(n===0||t<2)return!1;t-=2;n=u[t];++i}}if(p)a!==b&&(d=st(e));else{d=st(e);tt=[];for(nt in h[e])this.terminals_[nt]&&nt>w&&tt.push("'"+this.terminals_[nt]+"'");v=t.showPosition?"Parse error on line "+(y+1)+": \n"+t.showPosition()+"\nExpecting "+tt.join(", ")+", got '"+(this.terminals_[r]||r)+"'":"Parse error on line "+(y+1)+": Unexpected "+(r==b?"end of input":"'"+(this.terminals_[r]||r)+"'");this.parseError(v,{text:t.match,token:this.terminals_[r]||r,line:t.yylineno,loc:k,expected:tt,recoverable:d!==!1})}if(p==3){if(r===b||a===b)throw new Error(v||"Parsing halted while starting to recover from another error.");rt=t.yyleng;it=t.yytext;y=t.yylineno;k=t.yylloc;r=ut()}if(d===!1)throw new Error(v||"Parsing halted. No suitable error recovery rule available.");lt(d);a=r==w?null:r;r=w;e=u[u.length-1];f=h[e]&&h[e][w];p=3}if(f[0]instanceof Array&&f.length>1)throw new Error("Parse Error: multiple actions possible at state: "+e+", token: "+r);switch(f[0]){case 1:u.push(r);o.push(t.yytext);i.push(t.yylloc);u.push(f[1]);r=null;a?(r=a,a=null):(rt=t.yyleng,it=t.yytext,y=t.yylineno,k=t.yylloc,p>0&&p--);break;case 2:if(s=this.productions_[f[1]][1],l.$=o[o.length-s],l._$={first_line:i[i.length-(s||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(s||1)].first_column,last_column:i[i.length-1].last_column},et&&(l._$.range=[i[i.length-(s||1)].range[0],i[i.length-1].range[1]]),ft=this.performAction.apply(l,[it,rt,y,c.yy,f[1],o,i].concat(ct)),typeof ft!="undefined")return ft;s&&(u=u.slice(0,-2*s),o=o.slice(0,-1*s),i=i.slice(0,-1*s));u.push(this.productions_[f[1]][0]);o.push(l.$);i.push(l._$);ot=h[u[u.length-2]][u[u.length-1]];u.push(ot);break;case 3:return!0}}return!0}},dk=["A","ABSENT","ABSOLUTE","ACCORDING","ACTION","ADA","ADD","ADMIN","AFTER","ALWAYS","ASC","ASSERTION","ASSIGNMENT","ATTRIBUTE","ATTRIBUTES","BASE64","BEFORE","BERNOULLI","BLOCKED","BOM","BREADTH","C","CASCADE","CATALOG","CATALOG_NAME","CHAIN","CHARACTERISTICS","CHARACTERS","CHARACTER_SET_CATALOG","CHARACTER_SET_NAME","CHARACTER_SET_SCHEMA","CLASS_ORIGIN","COBOL","COLLATION","COLLATION_CATALOG","COLLATION_NAME","COLLATION_SCHEMA","COLUMNS","COLUMN_NAME","COMMAND_FUNCTION","COMMAND_FUNCTION_CODE","COMMITTED","CONDITION_NUMBER","CONNECTION","CONNECTION_NAME","CONSTRAINTS","CONSTRAINT_CATALOG","CONSTRAINT_NAME","CONSTRAINT_SCHEMA","CONSTRUCTOR","CONTENT","CONTINUE","CONTROL","CURSOR_NAME","DATA","DATETIME_INTERVAL_CODE","DATETIME_INTERVAL_PRECISION","DB","DEFAULTS","DEFERRABLE","DEFERRED","DEFINED","DEFINER","DEGREE","DEPTH","DERIVED","DESC","DESCRIPTOR","DIAGNOSTICS","DISPATCH","DOCUMENT","DOMAIN","DYNAMIC_FUNCTION","DYNAMIC_FUNCTION_CODE","EMPTY","ENCODING","ENFORCED","EXCLUDE","EXCLUDING","EXPRESSION","FILE","FINAL","FIRST","FLAG","FOLLOWING","FORTRAN","FOUND","FS","G","GENERAL","GENERATED","GO","GOTO","GRANTED","HEX","HIERARCHY","ID","IGNORE","IMMEDIATE","IMMEDIATELY","IMPLEMENTATION","INCLUDING","INCREMENT","INDENT","INITIALLY","INPUT","INSTANCE","INSTANTIABLE","INSTEAD","INTEGRITY","INVOKER","ISOLATION","K","KEY","KEY_MEMBER","KEY_TYPE","LAST","LENGTH","LEVEL","LIBRARY","LIMIT","LINK","LOCATION","LOCATOR","M","MAP","MAPPING","MATCHED","MAXVALUE","MESSAGE_LENGTH","MESSAGE_OCTET_LENGTH","MESSAGE_TEXT","MINVALUE","MORE","MUMPS","NAME","NAMES","NAMESPACE","NESTING","NEXT","NFC","NFD","NFKC","NFKD","NIL","NORMALIZED","NULLABLE","NULLS","NUMBER","OBJECT","OCTETS","OFF","OPTION","OPTIONS","ORDERING","ORDINALITY","OTHERS","OUTPUT","OVERRIDING","P","PAD","PARAMETER_MODE","PARAMETER_NAME","PARAMETER_ORDINAL_POSITION","PARAMETER_SPECIFIC_CATALOG","PARAMETER_SPECIFIC_NAME","PARAMETER_SPECIFIC_SCHEMA","PARTIAL","PASCAL","PASSING","PASSTHROUGH","PATH","PERMISSION","PLACING","PLI","PRECEDING","PRESERVE","PRIOR","PRIVILEGES","PUBLIC","READ","RECOVERY","RELATIVE","REPEATABLE","REQUIRING","RESPECT","RESTART","RESTORE","RESTRICT","RETURNED_CARDINALITY","RETURNED_LENGTH","RETURNED_OCTET_LENGTH","RETURNED_SQLSTATE","RETURNING","ROLE","ROUTINE","ROUTINE_CATALOG","ROUTINE_NAME","ROUTINE_SCHEMA","ROW_COUNT","SCALE","SCHEMA","SCHEMA_NAME","SCOPE_CATALOG","SCOPE_NAME","SCOPE_SCHEMA","SECTION","SECURITY","SELECTIVE","SELF","SEQUENCE","SERIALIZABLE","SERVER","SERVER_NAME","SESSION","SETS","SIMPLE","SIZE","SOURCE","SPACE","SPECIFIC_NAME","STANDALONE","STATE","STATEMENT","STRIP","STRUCTURE","STYLE","SUBCLASS_ORIGIN","T","TABLE_NAME","TEMPORARY","TIES","TOKEN","TOP_LEVEL_COUNT","TRANSACTION","TRANSACTIONS_COMMITTED","TRANSACTIONS_ROLLED_BACK","TRANSACTION_ACTIVE","TRANSFORM","TRANSFORMS","TRIGGER_CATALOG","TRIGGER_NAME","TRIGGER_SCHEMA","TYPE","UNBOUNDED","UNCOMMITTED","UNDER","UNLINK","UNNAMED","UNTYPED","URI","USAGE","USER_DEFINED_TYPE_CATALOG","USER_DEFINED_TYPE_CODE","USER_DEFINED_TYPE_NAME","USER_DEFINED_TYPE_SCHEMA","VALID","VERSION","VIEW","WHITESPACE","WORK","WRAPPER","WRITE","XMLDECLARATION","XMLSCHEMA","YES","ZONE"],kk;return uv.parseError=function(n,t){if(!t.expected||!(t.expected.indexOf("'LITERAL'")>-1)||!/[a-zA-Z_][a-zA-Z_0-9]*/.test(t.token)||!(dk.indexOf(t.token)>-1))throw new SyntaxError(n);},kk=function(){return{EOF:1,parseError:function(n,t){if(this.yy.parser)this.yy.parser.parseError(n,t);else throw new Error(n);},setInput:function(n,t){return this.yy=t||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var n=this._input[0],t;return this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n,t=n.match(/(?:\r\n?|\n).*/g),t?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},unput:function(n){var i=n.length,t=n.split(/(?:\r\n?|\n)/g),r,u;return this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-i),this.offset-=i,r=this.match.split(/(?:\r\n?|\n)/g),this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),t.length-1&&(this.yylineno-=t.length-1),u=this.yylloc.range,this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:t?(t.length===r.length?this.yylloc.first_column:0)+r[r.length-t.length].length-t[0].length:this.yylloc.first_column-i},this.options.ranges&&(this.yylloc.range=[u[0],u[0]+this.yyleng-i]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer=true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var n=this.pastInput(),t=new Array(n.length+1).join("-");return n+this.upcomingInput()+"\n"+t+"^"},test_match:function(n,t){var u,i,r,f;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),i=n[0].match(/(?:\r\n?|\n).*/g),i&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],u=this.performAction.call(this,this.yy,this,t,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),u)return u;if(this._backtrack){for(f in r)this[f]=r[f];return!1}return!1},next:function(){var n,t,r,f,u,i;if(this.done)return this.EOF;for(this._input||(this.done=!0),this._more||(this.yytext="",this.match=""),u=this._currentRules(),i=0;i<u.length;i++)if(r=this._input.match(this.rules[u[i]]),r&&(!t||r[0].length>t[0].length))if(t=r,f=i,this.options.backtrack_lexer){if(n=this.test_match(r,u[i]),n!==!1)return n;if(this._backtrack){t=!1;continue}else return!1}else if(!this.options.flex)break;return t?(n=this.test_match(t,u[f]),n!==!1)?n:!1:this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var n=this.next();return n?n:this.lex()},begin:function(n){this.conditionStack.push(n)},popState:function(){var n=this.conditionStack.length-1;return n>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(n){return n=this.conditionStack.length-1-Math.abs(n||0),n>=0?this.conditionStack[n]:"INITIAL"},pushState:function(n){this.begin(n)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(n,t,i,r){var u=r;switch(i){case 0:return 266;case 1:return 302;case 2:return 420;case 3:return 299;case 4:return 5;case 5:return 5;case 6:return 296;case 7:return 296;case 8:return 132;case 9:return 132;case 10:return;case 12:return 316;case 13:return 319;case 14:return t.yytext="VALUE",89;case 15:return t.yytext="VALUE",189;case 16:return t.yytext="ROW",189;case 17:return t.yytext="COLUMN",189;case 18:return t.yytext="MATRIX",189;case 19:return t.yytext="INDEX",189;case 20:return t.yytext="RECORDSET",189;case 21:return t.yytext="TEXT",189;case 22:return t.yytext="SELECT",189;case 23:return 520;case 24:return 381;case 25:return 402;case 26:return 515;case 27:return 287;case 28:return 269;case 29:return 269;case 30:return 164;case 31:return 400;case 32:return 170;case 33:return 229;case 34:return 166;case 35:return 207;case 36:return 288;case 37:return 76;case 38:return 418;case 39:return 242;case 40:return 404;case 41:return 356;case 42:return 284;case 43:return 514;case 44:return 437;case 45:return 330;case 46:return 441;case 47:return 331;case 48:return 315;case 49:return 119;case 50:return 112;case 51:return 315;case 52:return 112;case 53:return 315;case 54:return 112;case 55:return 315;case 56:return 508;case 57:return 303;case 58:return 271;case 59:return 368;case 60:return 130;case 61:return"CLOSE";case 62:return 243;case 63:return 190;case 64:return 190;case 65:return 434;case 66:return 367;case 67:return 470;case 68:return 440;case 69:return 273;case 70:return 240;case 71:return 281;case 72:return 267;case 73:return 206;case 74:return 238;case 75:return 265;case 76:return"CURSOR";case 77:return 405;case 78:return 291;case 79:return 292;case 80:return 448;case 81:return 343;case 82:return 338;case 83:return"DELETED";case 84:return 242;case 85:return 406;case 86:return 185;case 87:return 396;case 88:return 447;case 89:return 135;case 90:return 306;case 91:return 389;case 92:return 310;case 93:return 314;case 94:return 169;case 95:return 508;case 96:return 508;case 97:return 298;case 98:return 14;case 99:return 295;case 100:return 249;case 101:return 285;case 102:return 95;case 103:return 373;case 104:return 183;case 105:return 227;case 106:return 268;case 107:return 313;case 108:return 602;case 109:return 472;case 110:return 232;case 111:return 236;case 112:return 239;case 113:return 156;case 114:return 356;case 115:return 332;case 116:return 99;case 117:return 193;case 118:return 212;case 119:return 224;case 120:return 516;case 121:return 339;case 122:return 213;case 123:return 168;case 124:return 293;case 125:return 198;case 126:return 223;case 127:return 370;case 128:return 286;case 129:return"LET";case 130:return 225;case 131:return 112;case 132:return 245;case 133:return 460;case 134:return 191;case 135:return 283;case 136:return 390;case 137:return 282;case 138:return 452;case 139:return 169;case 140:return 403;case 141:return 222;case 142:return 645;case 143:return 270;case 144:return 244;case 145:return 380;case 146:return 154;case 147:return 297;case 148:return 433;case 149:return 230;case 150:return 415;case 151:return 129;case 152:return 247;case 153:return"OPEN";case 154:return 416;case 155:return 171;case 156:return 118;case 157:return 208;case 158:return 276;case 159:return 172;case 160:return 279;case 161:return 765;case 162:return 93;case 163:return 16;case 164:return 369;case 165:return 442;case 166:return 678;case 167:return 15;case 168:return 414;case 169:return 194;case 170:return"REDUCE";case 171:return 374;case 172:return 311;case 173:return 517;case 174:return 682;case 175:return 107;case 176:return 401;case 177:return 175;case 178:return 290;case 179:return 443;case 180:return 687;case 181:return 173;case 182:return 173;case 183:return 226;case 184:return 436;case 185:return 237;case 186:return 150;case 187:return 766;case 188:return 405;case 189:return 89;case 190:return 228;case 191:return 146;case 192:return 146;case 193:return 409;case 194:return 334;case 195:return 417;case 196:return"STRATEGY";case 197:return"STORE";case 198:return 280;case 199:return 353;case 200:return 353;case 201:return 463;case 202:return 357;case 203:return 357;case 204:return 192;case 205:return 309;case 206:return"TIMEOUT";case 207:return 148;case 208:return 195;case 209:return 435;case 210:return 435;case 211:return 509;case 212:return 294;case 213:return 451;case 214:return 162;case 215:return 187;case 216:return 98;case 217:return 335;case 218:return 408;case 219:return 231;case 220:return 149;case 221:return 344;case 222:return 134;case 223:return 410;case 224:return 308;case 225:return 128;case 226:return 439;case 227:return 72;case 228:return 435;case 229:return 131;case 230:return 131;case 231:return 115;case 232:return 137;case 233:return 179;case 234:return 317;case 235:return 180;case 236:return 133;case 237:return 138;case 238:return 326;case 239:return 323;case 240:return 325;case 241:return 322;case 242:return 320;case 243:return 318;case 244:return 319;case 245:return 142;case 246:return 141;case 247:return 139;case 248:return 321;case 249:return 324;case 250:return 140;case 251:return 124;case 252:return 324;case 253:return 77;case 254:return 78;case 255:return 145;case 256:return 424;case 257:return 426;case 258:return 300;case 259:return 505;case 260:return 507;case 261:return 122;case 262:return 116;case 263:return 74;case 264:return 333;case 265:return 152;case 266:return 764;case 267:return 143;case 268:return 181;case 269:return 136;case 270:return 123;case 271:return 312;case 272:return 4;case 273:return 10;case 274:return"INVALID"}},rules:[/^(?:``([^\`])+``)/i,/^(?:\[\?\])/i,/^(?:@\[)/i,/^(?:ARRAY\[)/i,/^(?:\[([^\]])*?\])/i,/^(?:`([^\`])*?`)/i,/^(?:N(['](\\.|[^']|\\')*?['])+)/i,/^(?:X(['](\\.|[^']|\\')*?['])+)/i,/^(?:(['](\\.|[^']|\\')*?['])+)/i,/^(?:(["](\\.|[^"]|\\")*?["])+)/i,/^(?:--(.*?)($|\r\n|\r|\n))/i,/^(?:\s+)/i,/^(?:\|\|)/i,/^(?:\|)/i,/^(?:VALUE\s+OF\s+SEARCH\b)/i,/^(?:VALUE\s+OF\s+SELECT\b)/i,/^(?:ROW\s+OF\s+SELECT\b)/i,/^(?:COLUMN\s+OF\s+SELECT\b)/i,/^(?:MATRIX\s+OF\s+SELECT\b)/i,/^(?:INDEX\s+OF\s+SELECT\b)/i,/^(?:RECORDSET\s+OF\s+SELECT\b)/i,/^(?:TEXT\s+OF\s+SELECT\b)/i,/^(?:SELECT\b)/i,/^(?:ABSOLUTE\b)/i,/^(?:ACTION\b)/i,/^(?:ADD\b)/i,/^(?:AFTER\b)/i,/^(?:AGGR\b)/i,/^(?:AGGREGATE\b)/i,/^(?:AGGREGATOR\b)/i,/^(?:ALL\b)/i,/^(?:ALTER\b)/i,/^(?:AND\b)/i,/^(?:ANTI\b)/i,/^(?:ANY\b)/i,/^(?:APPLY\b)/i,/^(?:ARRAY\b)/i,/^(?:AS\b)/i,/^(?:ASSERT\b)/i,/^(?:ASC\b)/i,/^(?:ATTACH\b)/i,/^(?:AUTO(_)?INCREMENT\b)/i,/^(?:AVG\b)/i,/^(?:BEFORE\b)/i,/^(?:BEGIN\b)/i,/^(?:BETWEEN\b)/i,/^(?:BREAK\b)/i,/^(?:NOT\s+BETWEEN\b)/i,/^(?:NOT\s+LIKE\b)/i,/^(?:BY\b)/i,/^(?:~~\*)/i,/^(?:!~~\*)/i,/^(?:~~)/i,/^(?:!~~)/i,/^(?:ILIKE\b)/i,/^(?:NOT\s+ILIKE\b)/i,/^(?:CALL\b)/i,/^(?:CASE\b)/i,/^(?:CAST\b)/i,/^(?:CHECK\b)/i,/^(?:CLASS\b)/i,/^(?:CLOSE\b)/i,/^(?:COLLATE\b)/i,/^(?:COLUMN\b)/i,/^(?:COLUMNS\b)/i,/^(?:COMMIT\b)/i,/^(?:CONSTRAINT\b)/i,/^(?:CONTENT\b)/i,/^(?:CONTINUE\b)/i,/^(?:CONVERT\b)/i,/^(?:CORRESPONDING\b)/i,/^(?:COUNT\b)/i,/^(?:CREATE\b)/i,/^(?:CROSS\b)/i,/^(?:CUBE\b)/i,/^(?:CURRENT_TIMESTAMP\b)/i,/^(?:CURSOR\b)/i,/^(?:DATABASE(S)?)/i,/^(?:DATEADD\b)/i,/^(?:DATEDIFF\b)/i,/^(?:DECLARE\b)/i,/^(?:DEFAULT\b)/i,/^(?:DELETE\b)/i,/^(?:DELETED\b)/i,/^(?:DESC\b)/i,/^(?:DETACH\b)/i,/^(?:DISTINCT\b)/i,/^(?:DROP\b)/i,/^(?:ECHO\b)/i,/^(?:EDGE\b)/i,/^(?:END\b)/i,/^(?:ENUM\b)/i,/^(?:ELSE\b)/i,/^(?:ESCAPE\b)/i,/^(?:EXCEPT\b)/i,/^(?:EXEC\b)/i,/^(?:EXECUTE\b)/i,/^(?:EXISTS\b)/i,/^(?:EXPLAIN\b)/i,/^(?:FALSE\b)/i,/^(?:FETCH\b)/i,/^(?:FIRST\b)/i,/^(?:FOR\b)/i,/^(?:FOREIGN\b)/i,/^(?:FROM\b)/i,/^(?:FULL\b)/i,/^(?:FUNCTION\b)/i,/^(?:GLOB\b)/i,/^(?:GO\b)/i,/^(?:GRAPH\b)/i,/^(?:GROUP\b)/i,/^(?:GROUPING\b)/i,/^(?:HAVING\b)/i,/^(?:IF\b)/i,/^(?:IDENTITY\b)/i,/^(?:IS\b)/i,/^(?:IN\b)/i,/^(?:INDEX\b)/i,/^(?:INDEXED\b)/i,/^(?:INNER\b)/i,/^(?:INSTEAD\b)/i,/^(?:INSERT\b)/i,/^(?:INSERTED\b)/i,/^(?:INTERSECT\b)/i,/^(?:INTERVAL\b)/i,/^(?:INTO\b)/i,/^(?:JOIN\b)/i,/^(?:KEY\b)/i,/^(?:LAST\b)/i,/^(?:LET\b)/i,/^(?:LEFT\b)/i,/^(?:LIKE\b)/i,/^(?:LIMIT\b)/i,/^(?:MATCHED\b)/i,/^(?:MATRIX\b)/i,/^(?:MAX(\s+)?(?=\())/i,/^(?:MAX(\s+)?(?=(,|\))))/i,/^(?:MIN(\s+)?(?=\())/i,/^(?:MERGE\b)/i,/^(?:MINUS\b)/i,/^(?:MODIFY\b)/i,/^(?:NATURAL\b)/i,/^(?:NEXT\b)/i,/^(?:NEW\b)/i,/^(?:NOCASE\b)/i,/^(?:NO\b)/i,/^(?:NOT\b)/i,/^(?:NULL\b)/i,/^(?:OFF\b)/i,/^(?:ON\b)/i,/^(?:ONLY\b)/i,/^(?:OF\b)/i,/^(?:OFFSET\b)/i,/^(?:OPEN\b)/i,/^(?:OPTION\b)/i,/^(?:OR\b)/i,/^(?:ORDER\b)/i,/^(?:OUTER\b)/i,/^(?:OVER\b)/i,/^(?:PATH\b)/i,/^(?:PARTITION\b)/i,/^(?:PERCENT\b)/i,/^(?:PIVOT\b)/i,/^(?:PLAN\b)/i,/^(?:PRIMARY\b)/i,/^(?:PRINT\b)/i,/^(?:PRIOR\b)/i,/^(?:QUERY\b)/i,/^(?:READ\b)/i,/^(?:RECORDSET\b)/i,/^(?:REDUCE\b)/i,/^(?:REFERENCES\b)/i,/^(?:REGEXP\b)/i,/^(?:REINDEX\b)/i,/^(?:RELATIVE\b)/i,/^(?:REMOVE\b)/i,/^(?:RENAME\b)/i,/^(?:REPEAT\b)/i,/^(?:REPLACE\b)/i,/^(?:REQUIRE\b)/i,/^(?:RESTORE\b)/i,/^(?:RETURN\b)/i,/^(?:RETURNS\b)/i,/^(?:RIGHT\b)/i,/^(?:ROLLBACK\b)/i,/^(?:ROLLUP\b)/i,/^(?:ROW\b)/i,/^(?:ROWS\b)/i,/^(?:SCHEMA(S)?)/i,/^(?:SEARCH\b)/i,/^(?:SEMI\b)/i,/^(?:SET\b)/i,/^(?:SETS\b)/i,/^(?:SHOW\b)/i,/^(?:SOME\b)/i,/^(?:SOURCE\b)/i,/^(?:STRATEGY\b)/i,/^(?:STORE\b)/i,/^(?:SUM\b)/i,/^(?:TABLE\b)/i,/^(?:TABLES\b)/i,/^(?:TARGET\b)/i,/^(?:TEMP\b)/i,/^(?:TEMPORARY\b)/i,/^(?:TEXTSTRING\b)/i,/^(?:THEN\b)/i,/^(?:TIMEOUT\b)/i,/^(?:TO\b)/i,/^(?:TOP\b)/i,/^(?:TRAN\b)/i,/^(?:TRANSACTION\b)/i,/^(?:TRIGGER\b)/i,/^(?:TRUE\b)/i,/^(?:TRUNCATE\b)/i,/^(?:UNION\b)/i,/^(?:UNIQUE\b)/i,/^(?:UNPIVOT\b)/i,/^(?:UPDATE\b)/i,/^(?:USE\b)/i,/^(?:USING\b)/i,/^(?:VALUE\b)/i,/^(?:VALUES\b)/i,/^(?:VERTEX\b)/i,/^(?:VIEW\b)/i,/^(?:WHEN\b)/i,/^(?:WHERE\b)/i,/^(?:WHILE\b)/i,/^(?:WITH\b)/i,/^(?:WORK\b)/i,/^(?:(\d*[.])?\d+[eE]\d+)/i,/^(?:(\d*[.])?\d+)/i,/^(?:->)/i,/^(?:#)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:!===)/i,/^(?:===)/i,/^(?:!==)/i,/^(?:==)/i,/^(?:>=)/i,/^(?:&)/i,/^(?:\|)/i,/^(?:<<)/i,/^(?:>>)/i,/^(?:>)/i,/^(?:<=)/i,/^(?:<>)/i,/^(?:<)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:\()/i,/^(?:\))/i,/^(?:@)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\])/i,/^(?::-)/i,/^(?:\?-)/i,/^(?:\.\.)/i,/^(?:\.)/i,/^(?:,)/i,/^(?:::)/i,/^(?::)/i,/^(?:;)/i,/^(?:\$)/i,/^(?:\?)/i,/^(?:!)/i,/^(?:\^)/i,/^(?:~)/i,/^(?:[a-zA-Z_][a-zA-Z_0-9]*)/i,/^(?:$)/i,/^(?:.)/i],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274],inclusive:!0}}}}(),uv.lexer=kk,yy.prototype=uv,uv.Parser=yy,new yy}();typeof w!="undefined"&&typeof exports!="undefined"&&(exports.parser=d,exports.Parser=d.Parser,exports.parse=function(){return d.parse.apply(d,arguments)},exports.main=function(n){n[1]||(console.log("Usage: "+n[0]+" FILE"),process.exit(1));var t=w("fs").readFileSync(w("path").normalize(n[1]),"utf8");return exports.parser.parse(t)},typeof module!="undefined"&&w.main===module&&exports.main(process.argv.slice(1)));n.prettyflag=!1;n.pretty=function(t,i){var u=n.prettyflag,r;return n.prettyflag=!i,r=n.parse(t).toString(),n.prettyflag=u,r};i=n.utils={};var f=i.escapeq=function(n){return(""+n).replace(/["'\\\n\r\u2028\u2029]/g,function(n){switch(n){case'"':case"'":case"\\":return"\\"+n;case"\n":return"\\n";case"\r":return"\\r";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029"}})},ri=i.undoubleq=function(n){return n.replace(/(\')/g,"''")},vi=i.doubleq=function(n){return n.replace(/(\'\')/g,"\\'")},vr=i.doubleqq=function(n){return n.replace(/\'/g,"'")},vt=function(n){return n[0]===String.fromCharCode(65279)&&(n=n.substr(1)),n};i.global=function(){try{return Function("return this")()}catch(t){var n=self||window||n;if(n)return n;throw new Error("Unable to locate global object");}}();yi=i.isNativeFunction=function(n){return typeof n=="function"&&!!~n.toString().indexOf("[native code]")};i.isWebWorker=function(){try{var n=i.global.importScripts;return i.isNativeFunction(n)}catch(t){return!1}}();i.isNode=function(){try{return i.isNativeFunction(i.global.process.reallyExit)}catch(n){return!1}}();i.isBrowser=function(){try{return i.isNativeFunction(i.global.location.reload)}catch(n){return!1}}();i.isBrowserify=function(){return i.isBrowser&&typeof process!="undefined"&&process.browser}();i.isRequireJS=function(){return i.isBrowser&&typeof w=="function"&&typeof w.specified=="function"}();i.isMeteor=function(){return typeof Meteor!="undefined"&&Meteor.release}();i.isMeteorClient=i.isMeteorClient=function(){return i.isMeteor&&Meteor.isClient}();i.isMeteorServer=function(){return i.isMeteor&&Meteor.isServer}();i.isCordova=function(){return typeof cordova=="object"}();i.isReactNative=function(){return!1}();i.hasIndexedDB=function(){return!!i.global.indexedDB}();i.isArray=function(n){return"[object Array]"===Object.prototype.toString.call(n)};var st=i.loadFile=function(n,t,r,u){var e,f;if(!i.isNode&&!i.isMeteorServer)if(i.isCordova)i.global.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(t){t.root.getFile(n,{create:!1},function(n){n.file(function(n){var t=new FileReader;t.onloadend=function(){r(vt(this.result))};t.readAsText(n)})})});else if(typeof n=="string")n.substr(0,1)==="#"&&typeof document!="undefined"?(e=document.querySelector(n).textContent,r(e)):(f=new XMLHttpRequest,f.onreadystatechange=function(){f.readyState===4&&(f.status===200?r&&r(vt(f.responseText)):u&&u(f))},f.open("GET",n,t),f.responseType="text",f.send());else if(n instanceof Event){var o=n.target.files,s=new FileReader,h=o[0].name;s.onload=function(n){var t=n.target.result;r(vt(t))};s.readAsText(o[0])}},yr=i.loadBinaryFile=function(n,t,r){var u;if(!i.isNode&&!i.isMeteorServer)if(typeof n=="string")u=new XMLHttpRequest,u.open("GET",n,t),u.responseType="arraybuffer",u.onload=function(){for(var t=new Uint8Array(u.response),i=[],n=0;n<t.length;++n)i[n]=String.fromCharCode(t[n]);r(i.join(""))},u.send();else if(n instanceof Event){var f=n.target.files,e=new FileReader,o=f[0].name;e.onload=function(n){var t=n.target.result;r(t)};e.readAsArrayBuffer(f[0])}else n instanceof Blob&&r(n)},pr=i.removeFile=function(){if(!i.isNode)throw new Error("You can remove files only in Node.js and Apache Cordova");},wr=i.deleteFile=function(){};i.autoExtFilename=function(n,t,i){return(i=i||{},typeof n!="string"||n.match(/^[A-z]+:\/\/|\n|\..{2,4}$/)||i.autoExt===0||i.autoExt===!1)?n:n+"."+t};pi=i.fileExists=function(){if(!i.isNode)throw new Error("You can use exists() only in Node.js or Apach Cordova");};wi=i.saveFile=function(t,r,u,f){var e=1,o,s,h,c;return t===undefined?(e=r,u&&(e=u(e))):i.isNode||(ui()===9?(o=r.replace(/\r\n/g,"&#A;&#D;"),o=o.replace(/\n/g,"&#D;"),o=o.replace(/\t/g,"&#9;"),s=i.global.open("about:blank","_blank"),s.document.write(o),s.document.close(),s.document.execCommand("SaveAs",!1,t),s.close()):(h={disableAutoBom:!1},n.utils.extend(h,f),c=new Blob([r],{type:"text/plain;charset=utf-8"}),nt(c,t,h.disableAutoBom),u&&(e=u(e)))),e};var y=i.hash=function(n){for(var t=2166136261,i=n.length;i;)t=(t^n.charCodeAt(--i))+((t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24));return t},bi=i.arrayUnion=function(n,t){var i=t.slice(0);return n.forEach(function(n){i.indexOf(n)<0&&i.push(n)}),i},ki=i.arrayDiff=function(n,t){return n.filter(function(n){return t.indexOf(n)<0})},di=i.arrayIntersect=function(n,t){var i=[];return n.forEach(function(n){var r=!1;t.forEach(function(t){r=r||n===t});r&&i.push(n)}),i},gi=i.arrayUnionDeep=function(n,t){var i=t.slice(0);return n.forEach(function(n){var t=!1;i.forEach(function(i){t=t||tt(n,i)});t||i.push(n)}),i},nr=i.arrayExceptDeep=function(n,t){var i=[];return n.forEach(function(n){var r=!1;t.forEach(function(t){r=r||tt(n,t)});r||i.push(n)}),i},tr=i.arrayIntersectDeep=function(n,t){var i=[];return n.forEach(function(n){var r=!1;t.forEach(function(t){r=r||tt(n,t,!0)});r&&i.push(n)}),i},g=i.cloneDeep=function g(n){var i,t;if(null===n||typeof n!="object")return n;if(n instanceof Date)return new Date(n);i=n.constructor();for(t in n)n.hasOwnProperty(t)&&(i[t]=g(n[t]));return i},tt=i.deepEqual=function(n,t){if(n===t)return!0;if(typeof n=="object"&&null!==n&&typeof t=="object"&&null!==t){if(Object.keys(n).length!==Object.keys(t).length)return!1;for(var i in n)if(!tt(n[i],t[i]))return!1;return!0}return!1},yt=i.distinctArray=function(n){for(var i={},f,r,e,t=0,u=n.length;t<u;t++)f=typeof n[t]=="object"?Object.keys(n[t]).sort().map(function(i){return i+"`"+n[t][i]}).join("`"):n[t],i[f]=n[t];r=[];for(e in i)r.push(i[e]);return r},e=i.extend=function(n,t){n=n||{};for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);return n},ir=i.flatArray=function(t){if(!t||0===t.length)return[];if(typeof t=="object"&&t instanceof n.Recordset)return t.data.map(function(n){return n[t.columns[0].columnid]});var i=Object.keys(t[0])[0];return i===undefined?[]:t.map(function(n){return n[i]})},br=i.arrayOfArrays=function(n){return n.map(function(n){var t=[],i;for(i in n)t.push(n[i]);return t})};Array.isArray||(Array.isArray=function(n){return Object.prototype.toString.call(n)==="[object Array]"});var kr=i.xlsnc=function(n){var t=String.fromCharCode(65+n%26);return n>=26&&(n=(n/26|0)-1,t=String.fromCharCode(65+n%26)+t,n>26&&(n=(n/26|0)-1,t=String.fromCharCode(65+n%26)+t)),t},dr=i.xlscn=function(n){var t=n.charCodeAt(0)-65;return n.length>1&&(t=(t+1)*26+n.charCodeAt(1)-65,n.length>2&&(t=(t+1)*26+n.charCodeAt(2)-65)),t},gr=i.domEmptyChildren=function(n){for(var t=n.childNodes.length;t--;)n.removeChild(n.lastChild)},nu=i.like=function(n,t,i){var u,f,r,e;for(i||(i=""),u=0,f="^";u<n.length;)r=n[u],e="",u<n.length-1&&(e=n[u+1]),r===i?(f+="\\"+e,u++):r==="["&&e==="^"?(f+="[^",u++):f+=r==="["||r==="]"?r:r==="%"?".*":r==="_"?".":"/.*+?|(){}".indexOf(r)>-1?"\\"+r:r,u++;return f+="$",(""+(t||"")).toUpperCase().search(RegExp(f.toUpperCase()))>-1};i.glob=function(n,t){for(var r=0,u="^",i,f;r<t.length;)i=t[r],f="",r<t.length-1&&(f=t[r+1]),i==="["&&f==="^"?(u+="[^",r++):u+=i==="["||i==="]"?i:i==="*"?".*":i==="?"?".":"/.*+?|(){}".indexOf(i)>-1?"\\"+i:i,r++;return u+="$",(""+(n||"")).toUpperCase().search(RegExp(u.toUpperCase()))>-1};i.findAlaSQLPath=function(){var t,n;if(i.isWebWorker)return"";if(i.isMeteorClient)return"/packages/dist/";if(i.isMeteorServer)return"assets/packages/dist/";if(i.isNode)return ai;if(i.isBrowser)for(t=document.getElementsByTagName("script"),n=0;n<t.length;n++){if(t[n].src.substr(-16).toLowerCase()==="alasql-worker.js")return t[n].src.substr(0,t[n].src.length-16);if(t[n].src.substr(-20).toLowerCase()==="alasql-worker.min.js")return t[n].src.substr(0,t[n].src.length-20);if(t[n].src.substr(-9).toLowerCase()==="alasql.js")return t[n].src.substr(0,t[n].src.length-9);if(t[n].src.substr(-13).toLowerCase()==="alasql.min.js")return t[n].src.substr(0,t[n].src.length-13)}return""};it=function(){var n=null;if(i.isNode||i.isBrowserify||i.isMeteorServer||(n=i.global.XLSX||null),null===n)throw new Error("Please include the xlsx.js library");return n};n.path=n.utils.findAlaSQLPath();n.utils.uncomment=function(n){var t,e,o;n=("__"+n+"__").split("");var i=!1,r,u=!1,f=!1;for(t=0,e=n.length;t<e;t++)o=n[t-1]!=="\\"||n[t-2]==="\\",i?n[t]===r&&o&&(i=!1):u?n[t]==="*"&&n[t+1]==="/"?(n[t]=n[t+1]="",u=!1,t++):n[t]="":f?((n[t+1]==="\n"||n[t+1]==="\r")&&(f=!1),n[t]=""):n[t]==='"'||n[t]==="'"?(i=!0,r=n[t]):n[t]==="["&&n[t-1]!=="@"?(i=!0,r="]"):n[t]==="/"&&n[t+1]==="*"&&(n[t]="",u=!0);return n.join("").slice(2,-2)};n.parser=d;n.parser.parseError=function(n){throw new Error("Have you used a reserved keyword without `escaping` it?\n"+n);};n.parse=function(t){return d.parse(n.utils.uncomment(t))};n.engines={};n.databases={};n.databasenum=0;n.options={};n.options.errorlog=!1;n.options.valueof=!1;n.options.dropifnotexists=!1;n.options.datetimeformat="sql";n.options.casesensitive=!0;n.options.logtarget="output";n.options.logprompt=!0;n.options.progress=!1;n.options.modifier=undefined;n.options.columnlookup=10;n.options.autovertex=!0;n.options.usedbo=!0;n.options.autocommit=!0;n.options.cache=!0;n.options.tsql=!0;n.options.mysql=!0;n.options.postgres=!0;n.options.oracle=!0;n.options.sqlite=!0;n.options.orientdb=!0;n.options.nocount=!1;n.options.nan=!1;n.options.joinstar="overwrite";n.vars={};n.declares={};n.prompthistory=[];n.plugins={};n.from={};n.into={};n.fn={};n.aggr={};n.busy=0;n.MAXSQLCACHESIZE=1e4;n.DEFAULTDATABASEID="alasql";n.lastid=0;n.buffer={};n.use=function(t){if(t||(t=n.DEFAULTDATABASEID),n.useid!==t){n.useid=t;var i=n.databases[n.useid];n.tables=i.tables;i.resetSqlCache();n.options.usedbo&&(n.databases.dbo=i)}};n.autoval=function(t,i,r,u){var f=u?n.databases[u]:n.databases[n.useid];if(!f.tables[t])throw new Error("Tablename not found: "+t);if(!f.tables[t].identities[i])throw new Error("Colname not found: "+i);return r?f.tables[t].identities[i].value||null:f.tables[t].identities[i].value-f.tables[t].identities[i].step||null};n.exec=function(t,i,r,u){if(typeof i=="function"&&(u=r,r=i,i={}),delete n.error,i=i||{},n.options.errorlog)try{return n.dexec(n.useid,t,i,r,u)}catch(f){n.error=f;r&&r(null,n.error)}else return n.dexec(n.useid,t,i,r,u)};n.dexec=function(t,i,r,u,f){var s=n.databases[t],h,o,e,c;if(n.options.cache&&(h=y(i),e=s.sqlCache[h],e&&s.dbversion===e.dbversion))return e(r,u);if(o=n.parse(i),o.statements){if(0===o.statements.length)return 0;if(1===o.statements.length)return o.statements[0].compile?(e=o.statements[0].compile(t,r),!e)?void 0:(e.sql=i,e.dbversion=s.dbversion,n.options.cache&&(s.sqlCacheSize>n.MAXSQLCACHESIZE&&s.resetSqlCache(),s.sqlCacheSize++,s.sqlCache[h]=e),n.res=e(r,u,f)):(n.precompile(o.statements[0],n.useid,r),n.res=o.statements[0].execute(t,r,u,f));if(u)n.adrun(t,o,r,u,f);else return n.drun(t,o,r,u,f)}};n.drun=function(t,i,r,u,f){var s=n.useid,o,e,h,c;for(s!==t&&n.use(t),o=[],e=0,h=i.statements.length;e<h;e++)i.statements[e]&&(i.statements[e].compile?(c=i.statements[e].compile(n.useid),o.push(n.res=c(r,null,f))):(n.precompile(i.statements[e],n.useid,r),o.push(n.res=i.statements[e].execute(n.useid,r))));return s!==t&&n.use(s),u&&u(o),n.res=o,o};n.adrun=function(t,i,r,u,f){function c(l){var a,v;l!==undefined&&h.push(l);a=i.statements.shift();a?a.compile?(v=a.compile(n.useid),v(r,c,f),n.options.progress!==!1&&n.options.progress(s,o++)):(n.precompile(i.statements[0],n.useid,r),a.execute(n.useid,r,c),n.options.progress!==!1&&n.options.progress(s,o++)):(e!==t&&n.use(e),u(h))}var o=0,s=i.statements.length,e,h;n.options.progress!==!1&&n.options.progress(s,o++);e=n.useid;e!==t&&n.use(t);h=[];c()};n.compile=function(t,i){var u,r;if(i=i||n.useid,u=n.parse(t),1===u.statements.length)return r=u.statements[0].compile(i),r.promise=function(n){return new Promise(function(t,i){r(n,function(n,r){r?i(r):t(n)})})},r;throw new Error("Cannot compile, because number of statements in SQL is not equal to 1");};i.global.Promise||i.isNode||function(){"use strict";function dt(n){return"function"==typeof n||"object"==typeof n&&null!==n}function ut(n){return"function"==typeof n}function gt(n){d=n}function ni(n){r=n}function ti(){return function(){process.nextTick(u)}}function ii(){return function(){at(u)}}function ri(){var n=0,i=new wt(u),t=document.createTextNode("");return i.observe(t,{characterData:!0}),function(){t.data=n=++n%2}}function ui(){var n=new MessageChannel;return n.port1.onmessage=u,function(){n.port2.postMessage(0)}}function ft(){return function(){setTimeout(u,1)}}function u(){for(var t,i,n=0;e>n;n+=2)t=o[n],i=o[n+1],t(i),o[n]=void 0,o[n+1]=void 0;e=0}function fi(){try{var t=w,n=t("vertx");return at=n.runOnLoop||n.runOnContext,ii()}catch(i){return ft()}}function ei(n,t){var e=this,i=new this.constructor(f),u,o;return void 0===i[v]&&ct(i),u=e._state,u?(o=arguments[u-1],r(function(){ht(u,i,o,e._result)})):b(e,i,n,t),i}function oi(n){var i=this,t;return n&&"object"==typeof n&&n.constructor===i?n:(t=new i(f),c(t,n),t)}function f(){}function si(){return new TypeError("You cannot resolve a promise with itself")}function hi(){return new TypeError("A promises callback cannot return that same promise.")}function et(n){try{return n.then}catch(t){return y.error=t,y}}function ci(n,t,i,r){try{n.call(t,i,r)}catch(u){return u}}function li(t,u,f){r(function(t){var r=!1,e=ci(f,u,function(n){r||(r=!0,u!==n?c(t,n):i(t,n))},function(i){r||(r=!0,n(t,i))},"Settle: "+(t._label||" unknown promise"));!r&&e&&(r=!0,n(t,e))},t)}function ai(t,r){r._state===a?i(t,r._result):r._state===h?n(t,r._result):b(r,void 0,function(n){c(t,n)},function(i){n(t,i)})}function ot(t,r,u){r.constructor===t.constructor&&u===g&&constructor.resolve===nt?ai(t,r):u===y?n(t,y.error):void 0===u?i(t,r):ut(u)?li(t,r,u):i(t,r)}function c(t,r){t===r?n(t,si()):dt(r)?ot(t,r,et(r)):i(t,r)}function vi(n){n._onerror&&n._onerror(n._result);k(n)}function i(n,t){n._state===s&&(n._result=t,n._state=a,0!==n._subscribers.length&&r(k,n))}function n(n,t){n._state===s&&(n._state=h,n._result=t,r(vi,n))}function b(n,t,i,u){var f=n._subscribers,e=f.length;n._onerror=null;f[e]=t;f[e+a]=i;f[e+h]=u;0===e&&n._state&&r(k,n)}function k(n){var i=n._subscribers,e=n._state,r,u,f,t;if(0!==i.length){for(f=n._result,t=0;t<i.length;t+=3)r=i[t],u=i[t+e],r?ht(e,r,u,f):u(f);n._subscribers.length=0}}function st(){this.error=null}function yi(n,t){try{return n(t)}catch(i){return tt.error=i,tt}}function ht(t,r,u,f){var e,l,o,v,y=ut(u);if(y){if(e=yi(u,f),e===tt?(v=!0,l=e.error,e=null):o=!0,r===e)return void n(r,hi())}else e=f,o=!0;r._state!==s||(y&&o?c(r,e):v?n(r,l):t===a?i(r,e):t===h&&n(r,e))}function pi(t,i){try{i(function(n){c(t,n)},function(i){n(t,i)})}catch(r){n(t,r)}}function wi(){return bt++}function ct(n){n[v]=bt++;n._state=void 0;n._result=void 0;n._subscribers=[]}function bi(n){return new kt(this,n).promise}function ki(n){var t=this;return new t(rr(n)?function(i,r){for(var f=n.length,u=0;f>u;u++)t.resolve(n[u]).then(i,r)}:function(n,t){t(new TypeError("You must pass an array to race."))})}function di(t){var r=this,i=new r(f);return n(i,t),i}function gi(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");}function nr(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");}function t(n){this[v]=wi();this._result=this._state=void 0;this._subscribers=[];f!==n&&("function"!=typeof n&&gi(),this instanceof t?pi(this,n):nr())}function l(t,r){this._instanceConstructor=t;this.promise=new t(f);this.promise[v]||ct(this.promise);Array.isArray(r)?(this._input=r,this.length=r.length,this._remaining=r.length,this._result=new Array(this.length),0===this.length?i(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&i(this.promise,this._result))):n(this.promise,tr())}function tr(){return new Error("Array Methods must be provided an Array")}function ir(){var n,t;if("undefined"!=typeof global)n=global;else if("undefined"!=typeof self)n=self;else try{n=Function("return this")()}catch(i){throw new Error("polyfill failed because global object is unavailable in this environment");}t=n.Promise;(!t||"[object Promise]"!==Object.prototype.toString.call(t.resolve())||t.cast)&&(n.Promise=it)}var lt,kt,rt,p;lt=Array.isArray?Array.isArray:function(n){return"[object Array]"===Object.prototype.toString.call(n)};var at,d,vt,rr=lt,e=0,r=function(n,t){o[e]=n;o[e+1]=t;e+=2;2===e&&(d?d(u):vt())},yt="undefined"!=typeof window?window:void 0,pt=yt||{},wt=pt.MutationObserver||pt.WebKitMutationObserver,ur="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),fr="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,o=new Array(1e3);vt=ur?ti():wt?ri():fr?ui():void 0===yt&&"function"==typeof w?fi():ft();var g=ei,nt=oi,v=Math.random().toString(36).substring(16),s=void 0,a=1,h=2,y=new st,tt=new st,bt=0,er=bi,or=ki,sr=di,it=t;t.all=er;t.race=or;t.resolve=nt;t.reject=sr;t._setScheduler=gt;t._setAsap=ni;t._asap=r;t.prototype={constructor:t,then:g,"catch":function(n){return this.then(null,n)}};kt=l;l.prototype._enumerate=function(){for(var t=this.length,i=this._input,n=0;this._state===s&&t>n;n++)this._eachEntry(i[n],n)};l.prototype._eachEntry=function(n,t){var i=this._instanceConstructor,e=i.resolve,r,u;e===nt?(r=et(n),r===g&&n._state!==s?this._settledAt(n._state,t,n._result):"function"!=typeof r?(this._remaining--,this._result[t]=n):i===it?(u=new i(f),ot(u,n,r),this._willSettleAt(u,t)):this._willSettleAt(new i(function(t){t(n)}),t)):this._willSettleAt(e(n),t)};l.prototype._settledAt=function(t,r,u){var f=this.promise;f._state===s&&(this._remaining--,t===h?n(f,u):this._result[r]=u);0===this._remaining&&i(f,this._result)};l.prototype._willSettleAt=function(n,t){var i=this;b(n,void 0,function(n){i._settledAt(a,t,n)},function(n){i._settledAt(h,t,n)})};rt=ir;p={Promise:it,polyfill:rt};"function"==typeof define&&define.amd?define(function(){return p}):"undefined"!=typeof module&&module.exports?module.exports=p:"undefined"!=typeof this&&(this.ES6Promise=p);rt()}.call(this);pt=function(t,r,u,f){return new i.global.Promise(function(i,e){n(t,r,function(t,r){r?e(r):(u&&f&&n.options.progress!==!1&&n.options.progress(u,f),i(t))})})};fi=function(n){var t,f,e,u,r;if(!(n.length<1)){for(u=[],r=0;r<n.length;r++){if(t=n[r],typeof t=="string"&&(t=[t]),!i.isArray(t)||t.length<1||2<t.length)throw new Error("Error in .promise parameter");f=t[0];e=t[1]||undefined;u.push(pt(f,e,r,n.length))}return i.global.Promise.all(u)}};n.promise=function(n,t){if(typeof Promise=="undefined")throw new Error("Please include a Promise/A+ library");if(typeof n=="string")return pt(n,t);if(!i.isArray(n)||n.length<1||typeof t!="undefined")throw new Error("Error in .promise parameters");return fi(n)};rt=n.Database=function(t){var i=this;if(i===n)if(t){if(i=n.databases[t],n.databases[t]=i,!i)throw new Error('Database "'+t+'" not found');}else i=n.databases.alasql,n.options.tsql&&(n.databases.tempdb=n.databases.alasql);return t||(t="db"+n.databasenum++),i.databaseid=t,n.databases[t]=i,i.dbversion=0,i.tables={},i.views={},i.triggers={},i.indices={},i.objects={},i.counter=0,i.resetSqlCache(),i};rt.prototype.resetSqlCache=function(){this.sqlCache={};this.sqlCacheSize=0};rt.prototype.exec=function(t,i,r){return n.dexec(this.databaseid,t,i,r)};rt.prototype.autoval=function(t,i,r){return n.autoval(t,i,r,this.databaseid)};rt.prototype.transaction=function(t){var i=new n.Transaction(this.databaseid);return t(i)};ut=n.Transaction=function(t){return this.transactionid=Date.now(),this.databaseid=t,this.commited=!1,this.dbversion=n.databases[t].dbversion,this.bank=JSON.stringify(n.databases[t]),this};ut.prototype.commit=function(){this.commited=!0;n.databases[this.databaseid].dbversion=Date.now();delete this.bank};ut.prototype.rollback=function(){if(this.commited)throw new Error("Transaction already commited");else n.databases[this.databaseid]=JSON.parse(this.bank),delete this.bank};ut.prototype.exec=function(t,i,r){return n.dexec(this.databaseid,t,i,r)};ut.prototype.executeSQL=ut.prototype.exec;wt=n.Table=function(n){this.data=[];this.columns=[];this.xcolumns={};this.inddefs={};this.indices={};this.uniqs={};this.uniqdefs={};this.identities={};this.checks=[];this.checkfns=[];this.beforeinsert={};this.afterinsert={};this.insteadofinsert={};this.beforedelete={};this.afterdelete={};this.insteadofdelete={};this.beforeupdate={};this.afterupdate={};this.insteadofupdate={};e(this,n)};wt.prototype.indexColumns=function(){var n=this;n.xcolumns={};n.columns.forEach(function(t){n.xcolumns[t.columnid]=t})};var iu=n.View=function(n){this.columns=[];this.xcolumns={};this.query=[];e(this,n)},rr=n.Query=function(t){this.alasql=n;this.columns=[];this.xcolumns={};this.selectGroup=[];this.groupColumns={};e(this,t)},ru=n.Recordset=function(n){e(this,n)},t=d.yy=n.yy={};t.extend=e;t.casesensitive=n.options.casesensitive;k=t.Base=function(n){return t.extend(this,n)};k.prototype.toString=function(){};k.prototype.toType=function(){};k.prototype.toJS=function(){};k.prototype.compile=ii;k.prototype.exec=function(){};k.prototype.compile=ii;k.prototype.exec=function(){};t.Statements=function(n){return t.extend(this,n)};t.Statements.prototype.toString=function(){return this.statements.map(function(n){return n.toString()}).join("; ")};t.Statements.prototype.compile=function(n){var t=this.statements.map(function(t){return t.compile(n)});return t.length===1?t[0]:function(n,i){var r=t.map(function(t){return t(n)});return i&&i(r),r}};t.Search=function(n){return t.extend(this,n)};t.Search.prototype.toString=function(){var n="SEARCH ";return this.selectors&&(n+=this.selectors.toString()),this.from&&(n+="FROM "+this.from.toString()),n};t.Search.prototype.toJS=function(n){return"this.queriesfn["+(this.queriesidx-1)+"](this.params,null,"+n+")"};t.Search.prototype.compile=function(n){var i=n,r=this,t=function(n,u){var f;return ur.bind(r)(i,n,function(n){f=ci(t.query,n);u&&(f=u(f))}),f};return t.query={},t};n.srch={};n.srch.PROP=function(n,t,i){if(i.mode==="XML"){var r=[];return n.children.forEach(function(n){n.name.toUpperCase()===t[0].toUpperCase()&&r.push(n)}),r.length>0?{status:1,values:r}:{status:-1,values:[]}}return typeof n!="object"||n===null||typeof t!="object"||typeof n[t[0]]=="undefined"?{status:-1,values:[]}:{status:1,values:[n[t[0]]]}};n.srch.APROP=function(n,t){return typeof n!="object"||n===null||typeof t!="object"||typeof n[t[0]]=="undefined"?{status:1,values:[undefined]}:{status:1,values:[n[t[0]]]}};n.srch.EQ=function(t,i,r,u){var f=i[0].toJS("x",""),e=new Function("x,alasql,params","return "+f);return t===e(t,n,u)?{status:1,values:[t]}:{status:-1,values:[]}};n.srch.LIKE=function(t,i,r,u){var f=i[0].toJS("x",""),e=new Function("x,alasql,params","return "+f);return t.toUpperCase().match(new RegExp("^"+e(t,n,u).toUpperCase().replace(/%/g,".*").replace(/\?|_/g,".")+"$"),"g")?{status:1,values:[t]}:{status:-1,values:[]}};n.srch.ATTR=function(n,t,i){if(i.mode==="XML")return typeof t=="undefined"?{status:1,values:[n.attributes]}:typeof n=="object"&&typeof n.attributes=="object"&&typeof n.attributes[t[0]]!="undefined"?{status:1,values:[n.attributes[t[0]]]}:{status:-1,values:[]};throw new Error("ATTR is not using in usual mode");};n.srch.CONTENT=function(n,t,i){if(i.mode==="XML")return{status:1,values:[n.content]};throw new Error("ATTR is not using in usual mode");};n.srch.SHARP=function(t,i){var r=n.databases[n.useid].objects[i[0]];return typeof t!="undefined"&&t===r?{status:1,values:[t]}:{status:-1,values:[]}};n.srch.PARENT=function(){return console.log("PARENT not implemented",arguments),{status:-1,values:[]}};n.srch.CHILD=function(n,t,i){return typeof n=="object"?Array.isArray(n)?{status:1,values:n}:i.mode==="XML"?{status:1,values:Object.keys(n.children).map(function(t){return n.children[t]})}:{status:1,values:Object.keys(n).map(function(t){return n[t]})}:{status:1,values:[]}};n.srch.KEYS=function(n){return typeof n=="object"&&n!==null?{status:1,values:Object.keys(n)}:{status:1,values:[]}};n.srch.WHERE=function(t,i,r,u){var f=i[0].toJS("x",""),e=new Function("x,alasql,params","return "+f);return e(t,n,u)?{status:1,values:[t]}:{status:-1,values:[]}};n.srch.NAME=function(n,t){return n.name===t[0]?{status:1,values:[n]}:{status:-1,values:[]}};n.srch.CLASS=function(n,t){return n.$class==t?{status:1,values:[n]}:{status:-1,values:[]}};n.srch.VERTEX=function(n){return n.$node==="VERTEX"?{status:1,values:[n]}:{status:-1,values:[]}};n.srch.INSTANCEOF=function(t,i){return t instanceof n.fn[i[0]]?{status:1,values:[t]}:{status:-1,values:[]}};n.srch.EDGE=function(n){return n.$node==="EDGE"?{status:1,values:[n]}:{status:-1,values:[]}};n.srch.EX=function(t,i,r,u){var f=i[0].toJS("x",""),e=new Function("x,alasql,params","return "+f);return{status:1,values:[e(t,n,u)]}};n.srch.RETURN=function(t,i,r,u){var f={};return i&&i.length>0&&i.forEach(function(i){var r=i.toJS("x",""),e=new Function("x,alasql,params","return "+r);typeof i.as=="undefined"&&(i.as=i.toString());f[i.as]=e(t,n,u)}),{status:1,values:[f]}};n.srch.REF=function(t){return{status:1,values:[n.databases[n.useid].objects[t]]}};n.srch.OUT=function(t){if(t.$out&&t.$out.length>0){var i=t.$out.map(function(t){return n.databases[n.useid].objects[t]});return{status:1,values:i}}return{status:-1,values:[]}};n.srch.OUTOUT=function(t){if(t.$out&&t.$out.length>0){var i=[];return t.$out.forEach(function(t){var r=n.databases[n.useid].objects[t];r&&r.$out&&r.$out.length>0&&r.$out.forEach(function(t){i=i.concat(n.databases[n.useid].objects[t])})}),{status:1,values:i}}return{status:-1,values:[]}};n.srch.IN=function(t){if(t.$in&&t.$in.length>0){var i=t.$in.map(function(t){return n.databases[n.useid].objects[t]});return{status:1,values:i}}return{status:-1,values:[]}};n.srch.ININ=function(t){if(t.$in&&t.$in.length>0){var i=[];return t.$in.forEach(function(t){var r=n.databases[n.useid].objects[t];r&&r.$in&&r.$in.length>0&&r.$in.forEach(function(t){i=i.concat(n.databases[n.useid].objects[t])})}),{status:1,values:i}}return{status:-1,values:[]}};n.srch.AS=function(t,i){return n.vars[i[0]]=t,{status:1,values:[t]}};n.srch.AT=function(t,i){var r=n.vars[i[0]];return{status:1,values:[r]}};n.srch.CLONEDEEP=function(n){var t=g(n);return{status:1,values:[t]}};n.srch.SET=function(t,i,r,u){var f=i.map(function(n){return n.method==="@"?"alasql.vars['"+n.variable+"']="+n.expression.toJS("x",""):n.method==="$"?"params['"+n.variable+"']="+n.expression.toJS("x",""):"x['"+n.column.columnid+"']="+n.expression.toJS("x","")}).join(";"),e=new Function("x,params,alasql",f);return e(t,u,n),{status:1,values:[t]}};n.srch.ROW=function(t,i,r,u){var f="var y;return [",e,o;return f+=i.map(function(n){return n.toJS("x","")}).join(","),f+="]",e=new Function("x,params,alasql",f),o=e(t,u,n),{status:1,values:[o]}};n.srch.D3=function(n){return n.$node!=="VERTEX"&&n.$node==="EDGE"&&(n.source=n.$in[0],n.target=n.$out[0]),{status:1,values:[n]}};ei=function(i){var u,r,f;if(i)return i&&i.length===1&&i[0].expression&&typeof i[0].expression=="function"?(u=i[0].expression,function(n,t){var i=u(n),r=u(t);return i>r?1:i===r?0:-1}):(r="",f="",i.forEach(function(i){var u="",e;i.expression instanceof t.NumValue&&(i.expression=self.columns[i.expression.value-1]);i.expression instanceof t.Column?(e=i.expression.columnid,n.options.valueof&&(u=".valueOf()"),i.nocase&&(u+=".toUpperCase()"),e==="_"?(r+="if(a"+u+(i.direction==="ASC"?">":"<")+"b"+u+")return 1;",r+="if(a"+u+"==b"+u+"){"):(r+="if((a['"+e+"']||'')"+u+(i.direction==="ASC"?">":"<")+"(b['"+e+"']||'')"+u+")return 1;",r+="if((a['"+e+"']||'')"+u+"==(b['"+e+"']||'')"+u+"){")):(u=".valueOf()",i.nocase&&(u+=".toUpperCase()"),r+="if(("+i.toJS("a","")+"||'')"+u+(i.direction==="ASC"?">(":"<(")+i.toJS("b","")+"||'')"+u+")return 1;",r+="if(("+i.toJS("a","")+"||'')"+u+"==("+i.toJS("b","")+"||'')"+u+"){");f+="}"}),r+="return 0;",r+=f+"return -1",new Function("a,b",r))};n.srch.ORDERBY=function(n,t){var i=n.sort(ei(t));return{status:1,values:i}};hi=function(t){for(var i,o,s,e,u,l,h=0,a=t.sources.length;h<a;h++){if(i=t.sources[h],delete i.ix,h>0&&i.optimization=="ix"&&i.onleftfn&&i.onrightfn){if(i.databaseid&&n.databases[i.databaseid].tables[i.tableid]&&(n.databases[i.databaseid].tables[i.tableid].indices||(t.database.tables[i.tableid].indices={}),o=n.databases[i.databaseid].tables[i.tableid].indices[y(i.onrightfns+"`"+i.srcwherefns)],!n.databases[i.databaseid].tables[i.tableid].dirty&&o&&(i.ix=o)),!i.ix){i.ix={};for(var u={},r=0,c=i.data.length,f;(f=i.data[r])||i.getfn&&(f=i.getfn(r))||r<c;)i.getfn&&!i.dontcache&&(i.data[r]=f),u[i.alias||i.tableid]=f,i.srcwherefn(u,t.params,n)&&(s=i.onrightfn(u,t.params,n),e=i.ix[s],e||(e=i.ix[s]=[]),e.push(f)),r++;i.databaseid&&n.databases[i.databaseid].tables[i.tableid]&&(n.databases[i.databaseid].tables[i.tableid].indices[y(i.onrightfns+"`"+i.srcwherefns)]=i.ix)}}else if(i.wxleftfn){if(n.databases[i.databaseid].engineid||(o=n.databases[i.databaseid].tables[i.tableid].indices[y(i.wxleftfns+"`")]),!n.databases[i.databaseid].tables[i.tableid].dirty&&o)i.ix=o,i.data=i.ix[i.wxrightfn(null,t.params,n)];else{for(i.ix={},u={},r=0,c=i.data.length,f;(f=i.data[r])||i.getfn&&(f=i.getfn(r))||r<c;)i.getfn&&!i.dontcache&&(i.data[r]=f),u[i.alias||i.tableid]=i.data[r],s=i.wxleftfn(u,t.params,n),e=i.ix[s],e||(e=i.ix[s]=[]),e.push(i.data[r]),r++;n.databases[i.databaseid].engineid||(n.databases[i.databaseid].tables[i.tableid].indices[y(i.wxleftfns+"`")]=i.ix)}i.srcwherefns&&(i.data?(u={},i.data=i.data.filter(function(r){return u[i.alias]=r,i.srcwherefn(u,t.params,n)})):i.data=[])}else if(i.srcwherefns&&!i.dontcache)if(i.data){for(u={},i.data=i.data.filter(function(r){return u[i.alias]=r,i.srcwherefn(u,t.params,n)}),u={},r=0,c=i.data.length,l=[];(f=i.data[r])||i.getfn&&(f=i.getfn(r))||r<c;)i.getfn&&!i.dontcache&&(i.data[r]=f),u[i.alias]=f,i.srcwherefn(u,t.params,n)&&l.push(f),r++;i.data=l}else i.data=[];i.databaseid&&n.databases[i.databaseid].tables[i.tableid]}};t.Select=function(n){return t.extend(this,n)};t.Select.prototype.toString=function(){var t;return t="",this.explain&&(t+="EXPLAIN "),t+="SELECT ",this.modifier&&(t+=this.modifier+" "),this.distinct&&(t+="DISTINCT "),this.top&&(t+="TOP "+this.top.value+" ",this.percent&&(t+="PERCENT ")),t+=this.columns.map(function(n){var t;return t=n.toString(),typeof n.as!="undefined"&&(t+=" AS "+n.as),t}).join(", "),this.from&&(t+=" FROM "+this.from.map(function(n){var t;return t=n.toString(),n.as&&(t+=" AS "+n.as),t}).join(",")),this.joins&&(t+=this.joins.map(function(t){var i;if(i=" ",t.joinmode&&(i+=t.joinmode+" "),t.table)i+="JOIN "+t.table.toString();else if(t.select)i+="JOIN ("+t.select.toString()+")";else if(t instanceof n.yy.Apply)i+=t.toString();else throw new Error("Wrong type in JOIN mode");return t.as&&(i+=" AS "+t.as),t.using&&(i+=" USING "+t.using.toString()),t.on&&(i+=" ON "+t.on.toString()),i})),this.where&&(t+=" WHERE "+this.where.toString()),this.group&&this.group.length>0&&(t+=" GROUP BY "+this.group.map(function(n){return n.toString()}).join(", ")),this.having&&(t+=" HAVING "+this.having.toString()),this.order&&this.order.length>0&&(t+=" ORDER BY "+this.order.map(function(n){return n.toString()}).join(", ")),this.limit&&(t+=" LIMIT "+this.limit.value),this.offset&&(t+=" OFFSET "+this.offset.value),this.union&&(t+=" UNION "+(this.corresponding?"CORRESPONDING ":"")+this.union.toString()),this.unionall&&(t+=" UNION ALL "+(this.corresponding?"CORRESPONDING ":"")+this.unionall.toString()),this.except&&(t+=" EXCEPT "+(this.corresponding?"CORRESPONDING ":"")+this.except.toString()),this.intersect&&(t+=" INTERSECT "+(this.corresponding?"CORRESPONDING ":"")+this.intersect.toString()),t};t.Select.prototype.toJS=function(n){return"alasql.utils.flatArray(this.queriesfn["+(this.queriesidx-1)+"](this.params,null,"+n+"))[0]"};t.Select.prototype.compile=function(i,r){var o=n.databases[i],u=new rr,f,e;return u.removeKeys=[],u.aggrKeys=[],u.explain=this.explain,u.explaination=[],u.explid=1,u.modifier=this.modifier,u.database=o,this.compileWhereExists(u),this.compileQueries(u),u.defcols=this.compileDefCols(u,i),u.fromfn=this.compileFrom(u),this.joins&&this.compileJoins(u),u.rownums=[],this.compileSelectGroup0(u),this.group||u.selectGroup.length>0?u.selectgfns=this.compileSelectGroup1(u):u.selectfns=this.compileSelect1(u,r),this.compileRemoveColumns(u),this.where&&this.compileWhereJoins(u),u.wherefn=this.compileWhere(u),(this.group||u.selectGroup.length>0)&&(u.groupfn=this.compileGroup(u)),this.having&&(u.havingfn=this.compileHaving(u)),this.order&&(u.orderfn=this.compileOrder(u)),this.group||u.selectGroup.length>0?u.selectgfn=this.compileSelectGroup2(u):u.selectfn=this.compileSelect2(u),u.distinct=this.distinct,this.pivot&&(u.pivotfn=this.compilePivot(u)),this.unpivot&&(u.pivotfn=this.compileUnpivot(u)),this.top?u.limit=this.top.value:this.limit&&(u.limit=this.limit.value,this.offset&&(u.offset=this.offset.value)),u.percent=this.percent,u.corresponding=this.corresponding,this.union?(u.unionfn=this.union.compile(i),u.orderfn=this.union.order?this.union.compileOrder(u):null):this.unionall?(u.unionallfn=this.unionall.compile(i),u.orderfn=this.unionall.order?this.unionall.compileOrder(u):null):this.except?(u.exceptfn=this.except.compile(i),u.orderfn=this.except.order?this.except.compileOrder(u):null):this.intersect&&(u.intersectfn=this.intersect.compile(i),this.intersect.order?u.intersectfn=this.intersect.compileOrder(u):u.orderfn=null),this.into&&(this.into instanceof t.Table?n.options.autocommit&&n.databases[this.into.databaseid||i].engineid?u.intoallfns='return alasql.engines["'+n.databases[this.into.databaseid||i].engineid+'"].intoTable("'+(this.into.databaseid||i)+'", "'+this.into.tableid+'", this.data, columns, cb);
                ':u.intofns="alasql.databases['"+(this.into.databaseid||i)+"'].tables['"+this.into.tableid+"'].data.push(r);":this.into instanceof t.VarValue?u.intoallfns='alasql.vars["'+this.into.variable+'"]=this.data;
                res=this.data.length;
                if(cb)res=cb(res);
                return res;
                ':this.into instanceof t.FuncValue?(f="return alasql.into['"+this.into.funcid.toUpperCase()+"'](",this.into.args&&this.into.args.length>0?(f+=this.into.args[0].toJS()+",",f+=this.into.args.length>1?this.into.args[1].toJS()+",":"undefined,"):f+="undefined, undefined,",u.intoallfns=f+"this.data,columns,cb)"):this.into instanceof t.ParamValue&&(u.intofns="params['"+this.into.param+"'].push(r)"),u.intofns?u.intofn=new Function("r,i,params,alasql","var y;"+u.intofns):u.intoallfns&&(u.intoallfn=new Function("columns,cb,params,alasql","var y;"+u.intoallfns))),e=function(n,t,i){u.params=n;return fr(u,i,function(n){var i,e,r,o,f;if(u.rownums.length>0)for(i=0,e=n.length;i<e;i++)for(r=0,o=u.rownums.length;r<o;r++)n[i][u.rownums[r]]=i+1;return f=ci(u,n),t&&t(f),f})},e.query=u,e};t.Select.prototype.execute=function(n,t,i){return this.compile(n)(t,i)};t.ExistsValue=function(n){return t.extend(this,n)};t.ExistsValue.prototype.toString=function(){return"EXISTS("+this.value.toString()+")"};t.ExistsValue.prototype.toType=function(){return"boolean"};t.ExistsValue.prototype.toJS=function(n){return"this.existsfn["+this.existsidx+"](params,null,"+n+").data.length"};t.Select.prototype.compileWhereExists=function(n){this.exists&&(n.existsfn=this.exists.map(function(t){var i=t.compile(n.database.databaseid);return i.query.modifier="RECORDSET",i}))};t.Select.prototype.compileQueries=function(n){this.queries&&(n.queriesfn=this.queries.map(function(t){var i=t.compile(n.database.databaseid);return i.query.modifier="RECORDSET",i}))};n.precompile=function(n,t,i){n&&(n.params=i,n.queries&&(n.queriesfn=n.queries.map(function(i){var r=i.compile(t||n.database.databaseid);return r.query.modifier="RECORDSET",r})),n.exists&&(n.existsfn=n.exists.map(function(i){var r=i.compile(t||n.database.databaseid);return r.query.modifier="RECORDSET",r})))};t.Select.prototype.compileFrom=function(i){var r=this;(i.sources=[],i.aliases={},r.from)&&(r.from.forEach(function(r){var e=r.as||r.tableid,u,f,o;if(r instanceof t.Table)i.aliases[e]={tableid:r.tableid,databaseid:r.databaseid||i.database.databaseid,type:"table"};else if(r instanceof t.Select)i.aliases[e]={type:"subquery"};else if(r instanceof t.Search)i.aliases[e]={type:"subsearch"};else if(r instanceof t.ParamValue)i.aliases[e]={type:"paramvalue"};else if(r instanceof t.FuncValue)i.aliases[e]={type:"funcvalue"};else if(r instanceof t.VarValue)i.aliases[e]={type:"varvalue"};else if(r instanceof t.FromData)i.aliases[e]={type:"fromdata"};else if(r instanceof t.Json)i.aliases[e]={type:"json"};else if(r.inserted)i.aliases[e]={type:"inserted"};else throw new Error("Wrong table at FROM");if(u={alias:e,databaseid:r.databaseid||i.database.databaseid,tableid:r.tableid,joinmode:"INNER",onmiddlefn:a,srcwherefns:"",srcwherefn:a},r instanceof t.Table)u.columns=n.databases[u.databaseid].tables[u.tableid].columns,u.datafn=n.options.autocommit&&n.databases[u.databaseid].engineid&&!n.databases[u.databaseid].tables[u.tableid].view?function(n,t,i,r,f){return f.engines[f.databases[u.databaseid].engineid].fromTable(u.databaseid,u.tableid,i,r,n)}:n.databases[u.databaseid].tables[u.tableid].view?function(n,t,i,r,f){var e=f.databases[u.databaseid].tables[u.tableid].select(t);return i&&(e=i(e,r,n)),e}:function(n,t,i,r,f){var e=f.databases[u.databaseid].tables[u.tableid].data;return i&&(e=i(e,r,n)),e};else if(r instanceof t.Select)u.subquery=r.compile(i.database.databaseid),typeof u.subquery.query.modifier=="undefined"&&(u.subquery.query.modifier="RECORDSET"),u.columns=u.subquery.query.columns,u.datafn=function(n,t,i,r){var f;return u.subquery(n.params,function(t){return f=t.data,i&&(f=i(f,r,n)),f}),f};else if(r instanceof t.Search)u.subsearch=r,u.columns=[],u.datafn=function(n,t,i,r){var f;return u.subsearch.execute(n.database.databaseid,n.params,function(t){return f=t,i&&(f=i(f,r,n)),f}),f};else if(r instanceof t.ParamValue)f="var res = alasql.prepareFromData(params['"+r.param+"']",r.array&&(f+=",true"),f+=");if(cb)res=cb(res,idx,query);return res",u.datafn=new Function("query,params,cb,idx,alasql",f);else if(r.inserted)f="var res = alasql.prepareFromData(alasql.inserted",r.array&&(f+=",true"),f+=");if(cb)res=cb(res,idx,query);return res",u.datafn=new Function("query,params,cb,idx,alasql",f);else if(r instanceof t.Json)f="var res = alasql.prepareFromData("+r.toJS(),r.array&&(f+=",true"),f+=");if(cb)res=cb(res,idx,query);return res",u.datafn=new Function("query,params,cb,idx,alasql",f);else if(r instanceof t.VarValue)f="var res = alasql.prepareFromData(alasql.vars['"+r.variable+"']",r.array&&(f+=",true"),f+=");if(cb)res=cb(res,idx,query);return res",u.datafn=new Function("query,params,cb,idx,alasql",f);else if(r instanceof t.FuncValue)o="var res=alasql.from['"+r.funcid.toUpperCase()+"'](",r.args&&r.args.length>0?(o+=r.args[0]?r.args[0].toJS("query.oldscope")+",":"null,",o+=r.args[1]?r.args[1].toJS("query.oldscope")+",":"null,"):o+="null,null,",o+="cb,idx,query",o+=");/*if(cb)res=cb(res,idx,query);*/return res",u.datafn=new Function("query, params, cb, idx, alasql",o);else if(r instanceof t.FromData)u.datafn=function(n,t,i,u){var f=r.data;return i&&(f=i(f,u,n)),f};else throw new Error("Wrong table at FROM");i.sources.push(u)}),i.defaultTableid=i.sources[0].alias)};n.prepareFromData=function(n,t){var i=n,r,u,f;if(typeof n=="string"){if(i=n.split(/\r?\n/),t)for(r=0,u=i.length;r<u;r++)i[r]=[i[r]]}else if(t)for(i=[],r=0,u=n.length;r<u;r++)i.push([n[r]]);else if(typeof n=="object"&&!Array.isArray(n))if(typeof Mongo!="undefined"&&typeof Mongo.Collection!="undefined"&&n instanceof Mongo.Collection)i=n.find().fetch();else{i=[];for(f in n)n.hasOwnProperty(f)&&i.push([f,n[f]])}return i};t.Select.prototype.compileJoins=function(i){var r=this;this.joins.forEach(function(r){var u,e,w,o,c,f,d,g,v;if(r.joinmode=="CROSS")if(r.using||r.on)throw new Error("CROSS JOIN cannot have USING or ON clauses");else r.joinmode=="INNER";if(r instanceof t.Apply)u={alias:r.as,applymode:r.applymode,onmiddlefn:a,srcwherefns:"",srcwherefn:a,columns:[]},u.applyselect=r.select.compile(i.database.databaseid),u.columns=u.applyselect.query.columns,u.datafn=function(n,t,i,r){var u;return i&&(u=i(u,r,n)),u},i.sources.push(u);else{if(r.table){if(e=r.table,u={alias:r.as||e.tableid,databaseid:e.databaseid||i.database.databaseid,tableid:e.tableid,joinmode:r.joinmode,onmiddlefn:a,srcwherefns:"",srcwherefn:a,columns:[]},!n.databases[u.databaseid].tables[u.tableid])throw new Error("Table '"+u.tableid+"' is not exists in database '"+u.databaseid)+"'";u.columns=n.databases[u.databaseid].tables[u.tableid].columns;u.datafn=n.options.autocommit&&n.databases[u.databaseid].engineid?function(n,t,i,r,f){return f.engines[f.databases[u.databaseid].engineid].fromTable(u.databaseid,u.tableid,i,r,n)}:n.databases[u.databaseid].tables[u.tableid].view?function(n,t,i,r,f){var e=f.databases[u.databaseid].tables[u.tableid].select(t);return i&&(e=i(e,r,n)),e}:function(n,t,i,r,f){var e=f.databases[u.databaseid].tables[u.tableid].data;return i&&(e=i(e,r,n)),e};i.aliases[u.alias]={tableid:e.tableid,databaseid:e.databaseid||i.database.databaseid}}else r.select?(e=r.select,u={alias:r.as,joinmode:r.joinmode,onmiddlefn:a,srcwherefns:"",srcwherefn:a,columns:[]},u.subquery=e.compile(i.database.databaseid),typeof u.subquery.query.modifier=="undefined"&&(u.subquery.query.modifier="RECORDSET"),u.columns=u.subquery.query.columns,u.datafn=function(n,t,i,r){return u.subquery(n.params,null,i,r).data},i.aliases[u.alias]={type:"subquery"}):r.param?(u={alias:r.as,joinmode:r.joinmode,onmiddlefn:a,srcwherefns:"",srcwherefn:a},w=r.param.param,o="var res=alasql.prepareFromData(params['"+w+"']",r.array&&(o+=",true"),o+=");if(cb)res=cb(res, idx, query);return res",u.datafn=new Function("query,params,cb,idx, alasql",o),i.aliases[u.alias]={type:"paramvalue"}):r.variable?(u={alias:r.as,joinmode:r.joinmode,onmiddlefn:a,srcwherefns:"",srcwherefn:a},o="var res=alasql.prepareFromData(alasql.vars['"+r.variable+"']",r.array&&(o+=",true"),o+=");if(cb)res=cb(res, idx, query);return res",u.datafn=new Function("query,params,cb,idx, alasql",o),i.aliases[u.alias]={type:"varvalue"}):r.funcid&&(u={alias:r.as,joinmode:r.joinmode,onmiddlefn:a,srcwherefns:"",srcwherefn:a},c="var res=alasql.from['"+js.funcid.toUpperCase()+"'](",r.args&&r.args.length>0?(c+=r.args[0]?r.args[0].toJS("query.oldscope")+",":"null,",c+=r.args[1]?r.args[1].toJS("query.oldscope")+",":"null,"):c+="null,null,",c+="cb,idx,query",c+=");/*if(cb)res=cb(res,idx,query);*/return res",u.datafn=new Function("query, params, cb, idx, alasql",c),i.aliases[u.alias]={type:"funcvalue"});if(f=u.alias,r.natural)if(r.using||r.on)throw new Error("NATURAL JOIN cannot have USING or ON clauses");else if(i.sources.length>0){var v=i.sources[i.sources.length-1],b=n.databases[v.databaseid].tables[v.tableid],k=n.databases[u.databaseid].tables[u.tableid];if(b&&k)d=b.columns.map(function(n){return n.columnid}),g=k.columns.map(function(n){return n.columnid}),r.using=di(d,g).map(function(n){return{columnid:n}});else throw new Error("In this version of Alasql NATURAL JOIN works for tables with predefined columns only");}if(r.using)v=i.sources[i.sources.length-1],u.onleftfns=r.using.map(function(n){return"p['"+(v.alias||v.tableid)+"']['"+n.columnid+"']"}).join('+"`"+'),u.onleftfn=new Function("p,params,alasql","var y;return "+u.onleftfns),u.onrightfns=r.using.map(function(n){return"p['"+(u.alias||u.tableid)+"']['"+n.columnid+"']"}).join('+"`"+'),u.onrightfn=new Function("p,params,alasql","var y;return "+u.onrightfns),u.optimization="ix";else if(r.on)if(r.on instanceof t.Op&&r.on.op=="="&&!r.on.allsome){u.optimization="ix";var y="",p="",nt="",l=!1,s=r.on.left.toJS("p",i.defaultTableid,i.defcols),h=r.on.right.toJS("p",i.defaultTableid,i.defcols);s.indexOf("p['"+f+"']")>-1&&!(h.indexOf("p['"+f+"']")>-1)?(s.match(/p\[\'.*?\'\]/g)||[]).every(function(n){return n=="p['"+f+"']"})?p=s:l=!0:!(s.indexOf("p['"+f+"']")>-1)&&h.indexOf("p['"+f+"']")>-1?(h.match(/p\[\'.*?\'\]/g)||[]).every(function(n){return n=="p['"+f+"']"})?y=s:l=!0:l=!0;h.indexOf("p['"+f+"']")>-1&&!(s.indexOf("p['"+f+"']")>-1)?(h.match(/p\[\'.*?\'\]/g)||[]).every(function(n){return n=="p['"+f+"']"})?p=h:l=!0:!(h.indexOf("p['"+f+"']")>-1)&&s.indexOf("p['"+f+"']")>-1?(s.match(/p\[\'.*?\'\]/g)||[]).every(function(n){return n=="p['"+f+"']"})?y=h:l=!0:l=!0;l&&(p="",y="",nt=r.on.toJS("p",i.defaultTableid,i.defcols),u.optimization="no");u.onleftfns=y;u.onrightfns=p;u.onmiddlefns=nt||"true";u.onleftfn=new Function("p,params,alasql","var y;return "+u.onleftfns);u.onrightfn=new Function("p,params,alasql","var y;return "+u.onrightfns);u.onmiddlefn=new Function("p,params,alasql","var y;return "+u.onmiddlefns)}else u.optimization="no",u.onmiddlefns=r.on.toJS("p",i.defaultTableid,i.defcols),u.onmiddlefn=new Function("p,params,alasql","var y;return "+r.on.toJS("p",i.defaultTableid,i.defcols));i.sources.push(u)}})};t.Select.prototype.compileWhere=function(n){if(this.where){if(typeof this.where=="function")return this.where;var t=this.where.toJS("p",n.defaultTableid,n.defcols);return n.wherefns=t,new Function("p,params,alasql","var y;return "+t)}return function(){return!0}};t.Select.prototype.compileWhereJoins=function(){return};t.Select.prototype.compileGroup=function(n){var u,e,f,r,i;return u=n.sources.length>0?n.sources[0].alias:"",e=n.defcols,f=[[]],this.group&&(f=dt(this.group,n)),r=[],f.forEach(function(n){r=bi(r,n)}),n.allgroups=r,n.ingroup=[],i="",f.forEach(function(f){var o,c,s,h;i+="var g=this.xgroups[";o=f.map(function(t){var i=t.split("\t")[0],r=t.split("\t")[1];return i===""?"1":(n.ingroup.push(i),r)});o.length===0&&(o=["''"]);i+=o.join('+"`"+');i+="];if(!g) {this.groups.push((g=this.xgroups[";i+=o.join('+"`"+');i+="] = {";i+=f.map(function(n){var t=n.split("\t")[0],i=n.split("\t")[1];return t===""?"":"'"+t+"':"+i+","}).join("");c=ki(r,f);i+=c.map(function(n){var t=n.split("\t")[0];return"'"+t+"':null,"}).join("");s="";h="";typeof n.groupStar!="undefined"&&(h+="for(var f in p['"+n.groupStar+"']) {g[f]=p['"+n.groupStar+"'][f];};");i+=n.selectGroup.map(function(i){var f=i.expression.toJS("p",u,e),r=i.nick;return i instanceof t.AggrValue?(i.distinct&&(s+=",g['$$_VALUES_"+r+"']={},g['$$_VALUES_"+r+"']["+f+"]=true"),i.aggregatorid==="SUM")?"'"+r+"':("+f+")||0,":i.aggregatorid==="MIN"||i.aggregatorid==="MAX"||i.aggregatorid==="FIRST"||i.aggregatorid==="LAST"?"'"+r+"':"+f+",":i.aggregatorid==="ARRAY"?"'"+r+"':["+f+"],":i.aggregatorid==="COUNT"?i.expression.columnid==="*"?"'"+r+"':1,":"'"+r+"':(typeof "+f+' !="undefined")?1: 0, ':i.aggregatorid==="AVG"?(n.removeKeys.push("_SUM_"+r),n.removeKeys.push("_COUNT_"+r),"'"+r+"':"+f+",'_SUM_"+r+"':("+f+")||0,'_COUNT_"+r+"':(typeof "+f+' !="undefined")?1: 0, '):i.aggregatorid==="AGGR"?(s+=",g['"+r+"']="+i.expression.toJS("g",-1),""):i.aggregatorid==="REDUCE"?(n.aggrKeys.push(i),"'"+r+"':alasql.aggr['"+i.funcid+"']("+f+",undefined,1),"):"":""}).join("");i+="}"+s+",g));"+h+"} else {";i+=n.selectGroup.map(function(n){var i=n.nick,o=n.expression.toJS("p",u,e),r,f;return n instanceof t.AggrValue?(r="",f="",n.distinct&&(r="if(typeof "+o+'!="undefined" && (!g[\'$$_VALUES_'+i+"']["+o+"])) \t\t\t\t \t\t {", f="g['$$_VALUES_"+i+"']["+o+"]=true;}"), n.aggregatorid==="SUM")?r+"g['"+i+"']+=("+o+"||0);"+f: n.aggregatorid==="COUNT"?n.expression.columnid==="*"?r+"g['"+i+"']++;"+f: r+"if(typeof "+o+'!="undefined") g[\''+i+"']++;"+f: n.aggregatorid==="ARRAY"?r+"g['"+i+"'].push("+o+");"+f: n.aggregatorid==="MIN"?r+"g['"+i+"']=Math.min(g['"+i+"'],"+o+");"+f: n.aggregatorid==="MAX"?r+"g['"+i+"']=Math.max(g['"+i+"'],"+o+");"+f: n.aggregatorid==="FIRST"?"": n.aggregatorid==="LAST"?r+"g['"+i+"']="+o+";"+f: n.aggregatorid==="AVG"?""+r+"g['_SUM_"+i+"']+=(y="+o+")||0;g['_COUNT_"+i+"']+=(typeof y!=\"undefined\")?1:0;g['"+i+"']=g['_SUM_"+i+"']/g['_COUNT_"+i+"'];"+f: n.aggregatorid==="AGGR"?""+r+"g['"+i+"']="+n.expression.toJS("g", -1)+";"+f: n.aggregatorid==="REDUCE"?""+r+"g['"+i+"']=alasql.aggr."+n.funcid+"("+o+",g['"+i+"'],2);"+f: "": ""
            }
            ).join("");
            i+="}"
        }
        ),
        new Function("p,params,alasql",
        "var y;"+i)
    }
    ;
    t.Select.prototype.compileSelect1=function(i,
    r) {
        var o=this;
        i.columns=[];
        i.xcolumns= {}
        ;
        i.selectColumns= {}
        ;
        i.dirtyColumns=!1;
        var e="",
        u=[];
        return this.columns.forEach(function(s) {
            var p,
            l,
            c,
            v,
            w,
            b,
            y,
            a,
            h;
            if(s instanceof t.Column)if(s.columnid==="*")if(s.func)e+="r=params['"+s.param+"'](p['"+i.sources[0].alias+"'],p,params,alasql);";
            else if(s.tableid)l=li(i,
            s.tableid,
            !1),
            l.s&&(u=u.concat(l.s)),
            e+=l.sp;
            else for(p in i.aliases)l=li(i,
            p,
            !0),
            l.s&&(u=u.concat(l.s)),
            e+=l.sp;
            else if(c=s.tableid,
            v=s.databaseid||i.sources[0].databaseid||i.database.databaseid,
            c||(c=i.defcols[s.columnid]),
            c||(c=i.defaultTableid),
            s.columnid!=="_"?!0||!c||i.defcols["."][s.tableid]||i.defcols[s.columnid]?(w=r&&r.length>1&&Array.isArray(r[0])&&r[0].length>=1&&r[0][0].hasOwnProperty("sheetid"), w?e='var r={};var w=p["'+c+'"];var cols=['+o.columns.map(function(n) {
                return"'"+n.columnid+"'"
            }
            ).join(",")+"];var colas=["+o.columns.map(function(n) {
                return"'"+(n.as||n.columnid)+"'"
            }
            ).join(",")+"];for (var i=0;i<Object.keys(p['"+c+"']).length;i++) for(var k=0;k<cols.length;k++){if (!r.hasOwnProperty(i)) r[i]={}; r[i][colas[k]]=w[i][cols[k]];}":u.push("'"+f(s.as||s.columnid)+"':p['"+c+"']['"+s.columnid+"']")):u.push("'"+f(s.as||s.columnid)+"':p['"+i.defaultTableid+"']['"+s.tableid+"']['"+s.columnid+"']"):u.push("'"+f(s.as||s.columnid)+"':p['"+c+"']"),
            i.selectColumns[f(s.as||s.columnid)]=!0,
            i.aliases[c]&&i.aliases[c].type==="table") {
                if(!n.databases[v].tables[i.aliases[c].tableid])throw new Error("Table '"+c+"' does not exists in database");
                if(b=n.databases[v].tables[i.aliases[c].tableid].columns,
                y=n.databases[v].tables[i.aliases[c].tableid].xcolumns,
                y&&b.length>0) {
                    if(a=y[s.columnid],
                    undefined===a)throw new Error("Column does not exists: "+s.columnid);
                    h= {
                        columnid: s.as||s.columnid, dbtypeid: a.dbtypeid, dbsize: a.dbsize, dbpecision: a.dbprecision, dbenum: a.dbenum
                    }
                    ;
                    i.columns.push(h);
                    i.xcolumns[h.columnid]=h
                }
                else h= {
                    columnid: s.as||s.columnid
                }
                ,
                i.columns.push(h),
                i.xcolumns[h.columnid]=h,
                i.dirtyColumns=!0
            }
            else h= {
                columnid: s.as||s.columnid
            }
            ,
            i.columns.push(h),
            i.xcolumns[h.columnid]=h;
            else s instanceof t.AggrValue?(o.group||(o.group=[""]),
            s.as||(s.as=f(s.toString())),
            s.aggregatorid==="SUM"||s.aggregatorid==="MAX"||s.aggregatorid==="MIN"||s.aggregatorid==="FIRST"||s.aggregatorid==="LAST"||s.aggregatorid==="AVG"||s.aggregatorid==="ARRAY"||s.aggregatorid==="REDUCE"?u.push("'"+f(s.as)+"':"+at(s.expression.toJS("p", i.defaultTableid, i.defcols))):s.aggregatorid==="COUNT"&&u.push("'"+f(s.as)+"':1"),
            h= {
                columnid: s.as||s.columnid||s.toString()
            }
            ,
            i.columns.push(h),
            i.xcolumns[h.columnid]=h):(u.push("'"+f(s.as||s.columnid||s.toString())+"':"+at(s.toJS("p", i.defaultTableid, i.defcols))),
            i.selectColumns[f(s.as||s.columnid||s.toString())]=!0,
            h= {
                columnid: s.as||s.columnid||s.toString()
            }
            ,
            i.columns.push(h),
            i.xcolumns[h.columnid]=h)
        }
        ),
        "var r={"+(u.join(",")+"};"+e)
    }
    ;
    t.Select.prototype.compileSelect2=function(n) {
        var i=n.selectfns;
        return this.orderColumns&&this.orderColumns.length>0&&this.orderColumns.forEach(function(r,
        u) {
            var f="$$$"+u;
            i+=r instanceof t.Column&&n.xcolumns[r.columnid]?"r['"+f+"']=r['"+r.columnid+"'];": "r['"+f+"']="+r.toJS("p", n.defaultTableid, n.defcols)+";";
            n.removeKeys.push(f)
        }
        ),
        new Function("p,params,alasql",
        "var y;"+i+"return r")
    }
    ;
    t.Select.prototype.compileSelectGroup0=function(n) {
        var i=this;
        i.columns.forEach(function(r,
        u) {
            var o,
            e;
            if(r instanceof t.Column&&r.columnid==="*")n.groupStar=r.tableid||"default";
            else {
                for(o=r instanceof t.Column?f(r.columnid): f(r.toString(!0)), e=0;
                e<u;
                e++)if(o===i.columns[e].nick) {
                    o=i.columns[e].nick+":"+u;
                    break
                }
                r.nick=o;
                r.funcid&&(r.funcid.toUpperCase()==="ROWNUM"||r.funcid.toUpperCase()==="ROW_NUMBER")&&n.rownums.push(r.as)
            }
        }
        );
        this.columns.forEach(function(t) {
            t.findAggregator&&t.findAggregator(n)
        }
        );
        this.having&&this.having.findAggregator&&this.having.findAggregator(n)
    }
    ;
    t.Select.prototype.compileSelectGroup1=function(n) {
        var r=this,
        i="var r = {};";
        return r.columns.forEach(function(r) {
            var u,
            e;
            if(r instanceof t.Column&&r.columnid==="*")return i+="for(var k in g) {r[k]=g[k]};",
            "";
            for(u=r.as,
            u===undefined&&(u=r instanceof t.Column?f(r.columnid): r.nick), n.groupColumns[u]=r.nick, i+="r['"+u+"']=", i+=at(r.toJS("g", ""))+";", e=0;
            e<n.removeKeys.length;
            e++)if(n.removeKeys[e]===u) {
                n.removeKeys.splice(e,
                1);
                break
            }
        }
        ),
        i
    }
    ;
    t.Select.prototype.compileSelectGroup2=function(n) {
        var r=this,
        i=n.selectgfns;
        return r.columns.forEach(function(t) {
            n.ingroup.indexOf(t.nick)>-1&&(i+="r['"+(t.as||t.nick)+"']=g['"+t.nick+"'];")
        }
        ),
        this.orderColumns&&this.orderColumns.length>0&&this.orderColumns.forEach(function(r,
        u) {
            var f="$$$"+u;
            i+=r instanceof t.Column&&n.groupColumns[r.columnid]?"r['"+f+"']=r['"+r.columnid+"'];": "r['"+f+"']="+r.toJS("g", "")+";";
            n.removeKeys.push(f)
        }
        ),
        new Function("g,params,alasql",
        "var y;"+i+"return r")
    }
    ;
    t.Select.prototype.compileRemoveColumns=function(n) {
        var t=this;
        typeof this.removecolumns!="undefined"&&(n.removeKeys=n.removeKeys.concat(this.removecolumns.filter(function(n) {
            return typeof n.like=="undefined"
        }
        ).map(function(n) {
            return n.columnid
        }
        )),
        n.removeLikeKeys=this.removecolumns.filter(function(n) {
            return typeof n.like!="undefined"
        }
        ).map(function(n) {
            return n.like.value
        }
        ))
    }
    ;
    t.Select.prototype.compileHaving=function(n) {
        return this.having?(s=this.having.toJS("g",
        -1),
        n.havingfns=s,
        new Function("g,params,alasql",
        "var y;return "+s)):function() {
            return!0
        }
    }
    ;
    t.Select.prototype.compileOrder=function(i) {
        var u=this,
        f,
        r,
        e;
        return u.orderColumns=[],
        this.order?this.order&&this.order.length==1&&this.order[0].expression&&typeof this.order[0].expression=="function"?(f=this.order[0].expression,
        function(n,
        t) {
            var i=f(n),
            r=f(t);
            return i>r?1: i==r?0: -1
        }
        ):(r="",
        e="",
        this.order.forEach(function(f, o) {
            var l,
            h,
            s,
            a,
            c;
            l=f.expression instanceof t.NumValue?u.columns[f.expression.value-1]: f.expression;
            u.orderColumns.push(l);
            h="$$$"+o;
            s="";
            f.expression instanceof t.Column&&(a=f.expression.columnid, i.xcolumns[a]?(c=i.xcolumns[a].dbtypeid, (c=="DATE"||c=="DATETIME"||c=="DATETIME2")&&(s=".valueOf()")): n.options.valueof&&(s=".valueOf()"));
            f.nocase&&(s+=".toUpperCase()");
            r+="if((a['"+h+"']||'')"+s+(f.direction=="ASC"?">": "<")+"(b['"+h+"']||'')"+s+")return 1;";
            r+="if((a['"+h+"']||'')"+s+"==(b['"+h+"']||'')"+s+"){";
            e+="}"
        }
        ),
        r+="return 0;",
        r+=e+"return -1",
        i.orderfns=r,
        new Function("a,b",
        "var y;"+r)):void 0
    }
    ;
    t.Select.prototype.compilePivot=function() {
        var f=this,
        t=f.pivot.columnid,
        i=f.pivot.expr.expression.columnid,
        r=f.pivot.expr.aggregatorid,
        u=f.pivot.inlist;
        return u&&(u=u.map(function(n) {
            return n.expr.columnid
        }
        )),
        function() {
            var f=this,
            c=f.columns.filter(function(n) {
                return n.columnid!=t&&n.columnid!=i
            }
            ).map(function(n) {
                return n.columnid
            }
            ),
            l=[],
            v= {}
            ,
            s= {}
            ,
            e= {}
            ,
            y=[],
            a,
            h,
            o,
            p;
            if(f.data.forEach(function(f) {
                if(!u||u.indexOf(f[t])>-1) {
                    var h=c.map(function(n) {
                        return f[n]
                    }
                    ).join("`"),
                    o=s[h];
                    if(o||(o= {}
                    , s[h]=o, y.push(o), c.forEach(function(n) {
                        o[n]=f[n]
                    }
                    )), e[h]||(e[h]= {}
                    ), e[h][f[t]]?e[h][f[t]]++:e[h][f[t]]=1, v[f[t]]||(v[f[t]]=!0, l.push(f[t])), r=="SUM"||r=="AVG")typeof o[f[t]]=="undefined"&&(o[f[t]]=0),
                    o[f[t]]+=f[i];
                    else if(r=="COUNT")typeof o[f[t]]=="undefined"&&(o[f[t]]=0),
                    o[f[t]]++;
                    else if(r=="MIN")typeof o[f[t]]=="undefined"&&(o[f[t]]=Infinity),
                    f[i]<o[f[t]]&&(o[f[t]]=f[i]);
                    else if(r=="MAX")typeof o[f[t]]=="undefined"&&(o[f[t]]=-Infinity),
                    f[i]>o[f[t]]&&(o[f[t]]=f[i]);
                    else if(r=="FIRST")typeof o[f[t]]=="undefined"&&(o[f[t]]=f[i]);
                    else if(r=="LAST")o[f[t]]=f[i];
                    else if(n.aggr[r])n.aggr[r](o[f[t]], f[i]);
                    else throw new Error("Wrong aggregator in PIVOT clause");
                }
            }
            ),
            r=="AVG")for(a in s) {
                h=s[a];
                for(o in h)c.indexOf(o)==-1&&o!=i&&(h[o]=h[o]/e[a][o])
            }
            f.data=y;
            u&&(l=u);
            p=f.columns.filter(function(n) {
                return n.columnid==i
            }
            )[0];
            f.columns=f.columns.filter(function(n) {
                return!(n.columnid==t||n.columnid==i)
            }
            );
            l.forEach(function(n) {
                var t=g(p);
                t.columnid=n;
                f.columns.push(t)
            }
            )
        }
    }
    ;
    t.Select.prototype.compileUnpivot=function(n) {
        var t=this,
        i=t.unpivot.tocolumnid,
        r=t.unpivot.forcolumnid,
        u=t.unpivot.inlist.map(function(n) {
            return n.columnid
        }
        );
        return function() {
            var t=[],
            f=n.columns.map(function(n) {
                return n.columnid
            }
            ).filter(function(n) {
                return u.indexOf(n)==-1&&n!=r&&n!=i
            }
            );
            n.data.forEach(function(n) {
                u.forEach(function(u) {
                    var e= {}
                    ;
                    f.forEach(function(t) {
                        e[t]=n[t]
                    }
                    );
                    e[r]=u;
                    e[i]=n[u];
                    t.push(e)
                }
                )
            }
            );
            n.data=t
        }
    }
    ;
    var sr=function(n,
    i) {
        for(var h=[],
        e=0,
        c=n.length,
        s,
        r,
        u,
        o=0;
        o<c+1;
        o++) {
            for(s=[],
            r=0;
            r<c;
            r++)n[r]instanceof t.Column?(n[r].nick=f(n[r].columnid),
            i.groupColumns[f(n[r].columnid)]=n[r].nick,
            u=n[r].nick+"\t"+n[r].toJS("p",
            i.sources[0].alias,
            i.defcols)): (i.groupColumns[f(n[r].toString())]=f(n[r].toString()), u=f(n[r].toString())+"\t"+n[r].toJS("p", i.sources[0].alias, i.defcols)), e&1<<r&&s.push(u);
            h.push(s);
            e=(e<<1)+1
        }
        return h
    }
    ,
    hr=function(n,
    t) {
        for(var f=[],
        e=n.length,
        o=1<<e,
        u,
        i,
        r=0;
        r<o;
        r++) {
            for(u=[],
            i=0;
            i<e;
            i++)r&1<<i&&(u=u.concat(dt(n[i], t)));
            f.push(u)
        }
        return f
    }
    ,
    cr=function(n,
    t) {
        return n.reduce(function(n,
        i) {
            return n.concat(dt(i, t))
        }
        ,
        [])
    }
    ,
    kt=function(n,
    t) {
        for(var u=[],
        r,
        i=0;
        i<n.length;
        i++)for(r=0;
        r<t.length;
        r++)u.push(n[i].concat(t[r]));
        return u
    }
    ;
    for(t.Select.prototype.compileDefCols=function(i,
    r) {
        var u= {
            ".": {}
        }
        ;
        return this.from&&this.from.forEach(function(i) {
            if(u["."][i.as||i.tableid]=!0, i instanceof t.Table) {
                var e=i.as||i.tableid,
                f=n.databases[i.databaseid||r].tables[i.tableid];
                if(undefined===f)throw new Error("Table does not exists: "+i.tableid);
                f.columns&&f.columns.forEach(function(n) {
                    u[n.columnid]=u[n.columnid]?"-": e
                }
                )
            }
            else if(!(i instanceof t.Select)&&!(i instanceof t.Search)&&!(i instanceof t.ParamValue)&&!(i instanceof t.VarValue)&&!(i instanceof t.FuncValue)&&!(i instanceof t.FromData)&&!(i instanceof t.Json)&&!i.inserted)throw new Error("Unknown type of FROM clause");
        }
        ),
        this.joins&&this.joins.forEach(function(t) {
            var i,
            f;
            if(u["."][t.as||t.table.tableid]=!0, t.table)i=t.table.tableid,
            t.as&&(i=t.as),
            i=t.as||t.table.tableid,
            f=n.databases[t.table.databaseid||r].tables[t.table.tableid],
            f.columns&&f.columns.forEach(function(n) {
                u[n.columnid]=u[n.columnid]?"-": i
            }
            );
            else if(!t.select&&!t.param&&!t.func)throw new Error("Unknown type of FROM clause");
        }
        ),
        u
    }
    ,
    t.Union=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Union.prototype.toString=function() {
        return"UNION"
    }
    ,
    t.Union.prototype.compile=function() {
        return null
    }
    ,
    t.Apply=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Apply.prototype.toString=function() {
        var n=this.applymode+" APPLY ("+this.select.toString()+")";
        return this.as&&(n+=" AS "+this.as),
        n
    }
    ,
    t.Over=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Over.prototype.toString=function() {
        var n="OVER (";
        return this.partition&&(n+="PARTITION BY "+this.partition.toString(),
        this.order&&(n+=" ")),
        this.order&&(n+="ORDER BY "+this.order.toString()),
        n+")"
    }
    ,
    t.ExpressionStatement=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.ExpressionStatement.prototype.toString=function() {
        return this.expression.toString()
    }
    ,
    t.ExpressionStatement.prototype.execute=function(t,
    i,
    r) {
        if(this.expression) {
            n.precompile(this,
            t,
            i);
            var f=new Function("params,alasql,p",
            "var y;return "+this.expression.toJS("({})", "", null)).bind(this),
            u=f(i,
            n);
            return r&&(u=r(u)),
            u
        }
    }
    ,
    t.Expression=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Expression.prototype.toString=function(n) {
        var t=this.expression.toString(n);
        return this.order&&(t+=" "+this.order.toString()),
        this.nocase&&(t+=" COLLATE NOCASE"),
        t
    }
    ,
    t.Expression.prototype.findAggregator=function(n) {
        this.expression.findAggregator&&this.expression.findAggregator(n)
    }
    ,
    t.Expression.prototype.toJS=function(n,
    t,
    i) {
        return this.expression.reduced?"true": this.expression.toJS(n, t, i)
    }
    ,
    t.Expression.prototype.compile=function(n,
    t,
    i) {
        return this.reduced?a(): new Function("p", "var y;return "+this.toJS(n, t, i))
    }
    ,
    t.JavaScript=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.JavaScript.prototype.toString=function() {
        return"``"+this.value+"``"
    }
    ,
    t.JavaScript.prototype.toJS=function() {
        return"("+this.value+")"
    }
    ,
    t.JavaScript.prototype.execute=function(t,
    i,
    r) {
        var u=1,
        f=new Function("params,alasql,p",
        this.value);
        return f(i,
        n),
        r&&(u=r(u)),
        u
    }
    ,
    t.Literal=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Literal.prototype.toString=function(n) {
        var t=this.value;
        return this.value1&&(t=this.value1+"."+t),
        this.alias&&!n&&(t+=" AS "+this.alias),
        t
    }
    ,
    t.Join=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Join.prototype.toString=function() {
        var n=" ";
        return this.joinmode&&(n+=this.joinmode+" "),
        n+("JOIN "+this.table.toString())
    }
    ,
    t.Table=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Table.prototype.toString=function() {
        var n=this.tableid;
        return this.databaseid&&(n=this.databaseid+"."+n),
        n
    }
    ,
    t.View=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.View.prototype.toString=function() {
        var n=this.viewid;
        return this.databaseid&&(n=this.databaseid+"."+n),
        n
    }
    ,
    t.Op=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Op.prototype.toString=function() {
        if(this.op==="IN"||this.op==="NOT IN")return this.left.toString()+" "+this.op+" ("+this.right.toString()+")";
        if(this.allsome)return this.left.toString()+" "+this.op+" "+this.allsome+" ("+this.right.toString()+")";
        if(this.op==="->"||this.op==="!") {
            var n=this.left.toString()+this.op;
            return typeof this.right!="string"&&typeof this.right!="number"&&(n+="("),
            n+=this.right.toString(),
            typeof this.right!="string"&&typeof this.right!="number"&&(n+=")"),
            n
        }
        return this.left.toString()+" "+this.op+" "+(this.allsome?this.allsome+" ":"")+this.right.toString()
    }
    ,
    t.Op.prototype.findAggregator=function(n) {
        this.left&&this.left.findAggregator&&this.left.findAggregator(n);
        this.right&&this.right.findAggregator&&!this.allsome&&this.right.findAggregator(n)
    }
    ,
    t.Op.prototype.toType=function(n) {
        if(["-",
        "*",
        "/",
        "%",
        "^"].indexOf(this.op)>-1)return"number";
        if(["||"].indexOf(this.op)>-1)return"string";
        if(this.op==="+") {
            if(this.left.toType(n)==="string"||this.right.toType(n)==="string")return"string";
            if(this.left.toType(n)==="number"||this.right.toType(n)==="number")return"number"
        }
        return["AND",
        "OR",
        "NOT",
        "=",
        "==",
        "===",
        "!=",
        "!==",
        "!===",
        ">",
        ">=",
        "<",
        "<=",
        "IN",
        "NOT IN",
        "LIKE",
        "NOT LIKE",
        "REGEXP",
        "GLOB"].indexOf(this.op)>-1?"boolean":this.op==="BETWEEN"||this.op==="NOT BETWEEN"||this.op==="IS NULL"||this.op==="IS NOT NULL"?"boolean":this.allsome?"boolean":this.op?"unknown":this.left.toType()
    }
    ,
    t.Op.prototype.toJS=function(n,
    i,
    r) {
        var y=[],
        e=this.op,
        p=this,
        s=function(t) {
            t.toJS&&(t=t.toJS(n, i, r));
            var u=y.push(t)-1;
            return"y["+u+"]"
        }
        ,
        f=function() {
            return s(p.left)
        }
        ,
        o=function() {
            return s(p.right)
        }
        ,
        h,
        c,
        l,
        u,
        a,
        v;
        if(this.op==="="?e="===":this.op==="<>"?e="!=":this.op==="OR"&&(e="||"),
        this.op==="->"&&(h="("+f()+"||{})", typeof this.right=="string"?u=h+'["'+this.right+'"]':typeof this.right=="number"?u=h+"["+this.right+"]":this.right instanceof t.FuncValue?(c=[], !this.right.args||0===this.right.args.length||(c=this.right.args.map(s)), u=""+h+"['"+this.right.funcid+"']("+c.join(",")+")"):u=""+h+"["+o()+"]"),
        this.op==="!"&&typeof this.right=="string"&&(u="alasql.databases[alasql.useid].objects["+f()+']["'+this.right+'"]'),
        this.op==="IS"&&(u="(("+f()+"==null) === ("+o()+"==null))"),
        this.op==="=="&&(u="alasql.utils.deepEqual("+f()+","+o()+")"),
        (this.op==="==="||this.op==="!===")&&(u="("+(this.op==="!==="?"!":"")+"(("+f()+").valueOf()===("+o()+").valueOf()))"),
        this.op==="!=="&&(u="(!alasql.utils.deepEqual("+f()+","+o()+"))"),
        this.op==="||"&&(u="(''+("+f()+"||'')+("+o()+'||""))'),
        (this.op==="LIKE"||this.op==="NOT LIKE")&&(u="("+(this.op==="NOT LIKE"?"!":"")+"alasql.utils.like("+o()+","+f(), this.escape&&(u+=","+s(this.escape)), u+="))"),
        this.op==="REGEXP"&&(u="alasql.stdfn.REGEXP_LIKE("+f()+","+o()+")"),
        this.op==="GLOB"&&(u="alasql.utils.glob("+f()+","+o()+")"),
        (this.op==="BETWEEN"||this.op==="NOT BETWEEN")&&(l=f(), u="("+(this.op==="NOT BETWEEN"?"!":"")+"(("+s(this.right1)+"<="+l+") && ("+l+"<="+s(this.right2)+")))"),
        this.op==="IN"&&(this.right instanceof t.Select?(u="(", u+="alasql.utils.flatArray(this.queriesfn["+this.queriesidx+"](params,null,"+n+"))", u+=".indexOf(", u+=f()+")>-1)"):u=Array.isArray(this.right)?"(["+this.right.map(s).join(",")+"].indexOf("+f()+")>-1)":"("+o()+".indexOf("+f()+")>-1)"),
        this.op==="NOT IN"&&(this.right instanceof t.Select?(u="(", u+="alasql.utils.flatArray(this.queriesfn["+this.queriesidx+"](params,null,p))", u+=".indexOf(", u+=f()+")<0)"):u=Array.isArray(this.right)?"(["+this.right.map(s).join(",")+"].indexOf("+(f()+")<0)"):"("+o()+".indexOf("+(f()+")==-1)")),
        this.allsome==="ALL")if(this.right instanceof t.Select)u="alasql.utils.flatArray(this.query.queriesfn["+this.queriesidx+"](params,null,p))",
        u+=".every(function(b){return (",
        u+=f()+")"+e+"b})";
        else if(Array.isArray(this.right))u=""+(this.right.length==1?s(this.right[0]):"["+this.right.map(s).join(",")+"]"),
        u+=".every(function(b){return (",
        u+=f()+")"+e+"b})";
        else throw new Error("NOT IN operator without SELECT");
        if(this.allsome==="SOME"||this.allsome==="ANY")if(this.right instanceof t.Select)u="alasql.utils.flatArray(this.query.queriesfn["+this.queriesidx+"](params,null,p))",
        u+=".some(function(b){return (",
        u+=f()+")"+e+"b})";
        else if(Array.isArray(this.right))u=""+(this.right.length==1?s(this.right[0]):"["+this.right.map(s).join(",")+"]"),
        u+=".some(function(b){return (",
        u+=f()+")"+e+"b})";
        else throw new Error("SOME/ANY operator without SELECT");
        if(this.op==="AND") {
            if(this.left.reduced) {
                if(this.right.reduced)return"true";
                u=o()
            }
            else this.right.reduced&&(u=f());
            e="&&"
        }
        return a=u||"("+f()+e+o()+")",
        v="y=[("+y.join("), (")+")]",
        e=="&&"||e=="||"||e=="IS"||e=="IS NULL"||e=="IS NOT NULL"?"("+v+", "+a+")":"("+v+", y.some(function(e){return e == null}) ? void 0 : "+a+")"
    }
    ,
    t.VarValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.VarValue.prototype.toString=function() {
        return"@"+this.variable
    }
    ,
    t.VarValue.prototype.toType=function() {
        return"unknown"
    }
    ,
    t.VarValue.prototype.toJS=function() {
        return"alasql.vars['"+this.variable+"']"
    }
    ,
    t.NumValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.NumValue.prototype.toString=function() {
        return this.value.toString()
    }
    ,
    t.NumValue.prototype.toType=function() {
        return"number"
    }
    ,
    t.NumValue.prototype.toJS=function() {
        return""+this.value
    }
    ,
    t.StringValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.StringValue.prototype.toString=function() {
        return"'"+this.value.toString()+"'"
    }
    ,
    t.StringValue.prototype.toType=function() {
        return"string"
    }
    ,
    t.StringValue.prototype.toJS=function() {
        return"'"+f(this.value)+"'"
    }
    ,
    t.DomainValueValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.DomainValueValue.prototype.toString=function() {
        return"VALUE"
    }
    ,
    t.DomainValueValue.prototype.toType=function() {
        return"object"
    }
    ,
    t.DomainValueValue.prototype.toJS=function(n) {
        return n
    }
    ,
    t.ArrayValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.ArrayValue.prototype.toString=function() {
        return"ARRAY[]"
    }
    ,
    t.ArrayValue.prototype.toType=function() {
        return"object"
    }
    ,
    t.ArrayValue.prototype.toJS=function(n,
    t,
    i) {
        return"[("+this.value.map(function(r) {
            return r.toJS(n, t, i)
        }
        ).join("), (")+")]"
    }
    ,
    t.LogicValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.LogicValue.prototype.toString=function() {
        return this.value?"TRUE": "FALSE"
    }
    ,
    t.LogicValue.prototype.toType=function() {
        return"boolean"
    }
    ,
    t.LogicValue.prototype.toJS=function() {
        return this.value?"true": "false"
    }
    ,
    t.NullValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.NullValue.prototype.toString=function() {
        return"NULL"
    }
    ,
    t.NullValue.prototype.toJS=function() {
        return"undefined"
    }
    ,
    t.ParamValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.ParamValue.prototype.toString=function() {
        return"$"+this.param
    }
    ,
    t.ParamValue.prototype.toJS=function() {
        return typeof this.param=="string"?"params['"+this.param+"']": "params["+this.param+"]"
    }
    ,
    t.UniOp=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.UniOp.prototype.toString=function() {
        var n;
        return n=void 0,
        this.op==="~"&&(n=this.op+this.right.toString()),
        this.op==="-"&&(n=this.op+this.right.toString()),
        this.op==="+"&&(n=this.op+this.right.toString()),
        this.op==="#"&&(n=this.op+this.right.toString()),
        this.op==="NOT"&&(n=this.op+"("+this.right.toString()+")"),
        this.op===null&&(n="("+this.right.toString()+")"),
        n||(n="("+this.right.toString()+")"),
        n
    }
    ,
    t.UniOp.prototype.findAggregator=function(n) {
        this.right.findAggregator&&this.right.findAggregator(n)
    }
    ,
    t.UniOp.prototype.toType=function() {
        return this.op==="-"?"number": this.op==="+"?"number": this.op==="NOT"?"boolean": void 0
    }
    ,
    t.UniOp.prototype.toJS=function(n,
    i,
    r) {
        return this.op==="~"?"(~("+this.right.toJS(n,
        i,
        r)+"))": this.op==="-"?"(-("+this.right.toJS(n, i, r)+"))": this.op==="+"?"("+this.right.toJS(n, i, r)+")": this.op==="NOT"?"!("+this.right.toJS(n, i, r)+")": this.op==="#"?this.right instanceof t.Column?"(alasql.databases[alasql.useid].objects['"+this.right.columnid+"'])": "(alasql.databases[alasql.useid].objects["+this.right.toJS(n, i, r)+"])": this.op==null?"("+this.right.toJS(n, i, r)+")": void 0
    }
    ,
    t.Column=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Column.prototype.toString=function(n) {
        var t;
        return t=this.columnid==+this.columnid?"["+this.columnid+"]": this.columnid, this.tableid&&(t=+this.columnid===this.columnid?this.tableid+t: this.tableid+"."+t, this.databaseid&&(t=this.databaseid+"."+t)), this.alias&&!n&&(t+=" AS "+this.alias), t
    }
    ,
    t.Column.prototype.toJS=function(n,
    t,
    i) {
        var r="",
        u;
        if(this.tableid||t!==""||i)if(n==="g")r="g['"+this.nick+"']";
        else if(this.tableid)r=this.columnid!=="_"?n+"['"+this.tableid+"']['"+this.columnid+"']": n==="g"?"g['_']": n+"['"+this.tableid+"']";
        else if(i)if(u=i[this.columnid],
        u==="-")throw new Error('Cannot resolve column "'+this.columnid+'" because it exists in two source tables');
        else r=u?this.columnid!=="_"?n+"['"+u+"']['"+this.columnid+"']": n+"['"+u+"']": this.columnid!=="_"?n+"['"+(this.tableid||t)+"']['"+this.columnid+"']": n+"['"+(this.tableid||t)+"']";
        else r=t===-1?n+"['"+this.columnid+"']": this.columnid!=="_"?n+"['"+(this.tableid||t)+"']['"+this.columnid+"']": n+"['"+(this.tableid||t)+"']";
        else r=this.columnid!=="_"?n+"['"+this.columnid+"']": n==="g"?"g['_']": n;
        return r
    }
    ,
    t.AggrValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.AggrValue.prototype.toString=function(n) {
        var t="";
        return t+=this.aggregatorid==="REDUCE"?this.funcid+"(": this.aggregatorid+"(", this.distinct&&(t+="DISTINCT "), this.expression&&(t+=this.expression.toString()), t+=")", this.over&&(t+=" "+this.over.toString()), this.alias&&!n&&(t+=" AS "+this.alias), t
    }
    ,
    t.AggrValue.prototype.findAggregator=function(n) {
        var r=f(this.toString())+":"+n.selectGroup.length,
        t=!1,
        i;
        if(!t) {
            if(!this.nick) {
                for(this.nick=r,
                t=!1,
                i=0;
                i<n.removeKeys.length;
                i++)if(n.removeKeys[i]===r) {
                    t=!0;
                    break
                }
                t||n.removeKeys.push(r)
            }
            n.selectGroup.push(this)
        }
        return
    }
    ,
    t.AggrValue.prototype.toType=function() {
        return["SUM",
        "COUNT",
        "AVG",
        "MIN",
        "MAX",
        "AGGR",
        "VAR",
        "STDDEV"].indexOf(this.aggregatorid)>-1?"number": ["ARRAY"].indexOf(this.aggregatorid)>-1?"array": ["FIRST", "LAST"].indexOf(this.aggregatorid)>-1?this.expression.toType(): void 0
    }
    ,
    t.AggrValue.prototype.toJS=function() {
        var n=this.nick;
        return n===undefined&&(n=this.toString()),
        "g['"+n+"']"
    }
    ,
    t.OrderExpression=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.OrderExpression.prototype.toString=t.Expression.prototype.toString,
    t.GroupExpression=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.GroupExpression.prototype.toString=function() {
        return this.type+"("+this.group.toString()+")"
    }
    ,
    t.FromData=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.FromData.prototype.toString=function() {
        return this.data?"DATA("+(Math.random()*1e16|0)+")": "?"
    }
    ,
    t.FromData.prototype.toJS=function() {}
    ,
    t.Select.prototype.exec=function(t,
    i) {
        var u;
        this.preparams&&(t=this.preparams.concat(t));
        u=n.useid;
        db=n.databases[u];
        var f=this.toString(),
        e=y(f),
        r=this.compile(u);
        if(r)return r.sql=f,
        r.dbversion=db.dbversion,
        db.sqlCacheSize>n.MAXSQLCACHESIZE&&db.resetSqlCache(),
        db.sqlCacheSize++,
        db.sqlCache[e]=r,
        n.res=r(t,
        i)
    }
    ,
    t.Select.prototype.Select=function() {
        var n=this;
        if(arguments.length>1)args=Array.prototype.slice.call(arguments);
        else if(arguments.length==1)args=Array.isArray(arguments[0])?arguments[0]: [arguments[0]];
        else throw new Error("Wrong number of arguments of Select() function");
        return n.columns=[],
        args.forEach(function(i) {
            if(typeof i=="string")n.columns.push(new t.Column( {
                columnid: i
            }
            ));
            else if(typeof i=="function") {
                var r=0;
                n.preparams?r=n.preparams.length: n.preparams=[];
                n.preparams.push(i);
                n.columns.push(new t.Column( {
                    columnid: "*", func: i, param: r
                }
                ))
            }
        }
        ),
        n
    }
    ,
    t.Select.prototype.From=function(n) {
        var i=this,
        r;
        if(i.from||(i.from=[]),
        Array.isArray(n))r=0,
        i.preparams?r=i.preparams.length:i.preparams=[],
        i.preparams.push(n),
        i.from.push(new t.ParamValue( {
            param: r
        }
        ));
        else if(typeof n=="string")i.from.push(new t.Table( {
            tableid: n
        }
        ));
        else throw new Error("Unknown arguments in From() function");
        return i
    }
    ,
    t.Select.prototype.OrderBy=function() {
        var n=this;
        if(n.order=[],
        arguments.length==0)args=["_"];
        else if(arguments.length>1)args=Array.prototype.slice.call(arguments);
        else if(arguments.length==1)args=Array.isArray(arguments[0])?arguments[0]: [arguments[0]];
        else throw new Error("Wrong number of arguments of Select() function");
        return args.length>0&&args.forEach(function(i) {
            var r=new t.Column( {
                columnid: i
            }
            );
            typeof i=="function"&&(r=i);
            n.order.push(new t.OrderExpression( {
                expression: r, direction: "ASC"
            }
            ))
        }
        ),
        n
    }
    ,
    t.Select.prototype.Top=function(n) {
        var i=this;
        return i.top=new t.NumValue( {
            value: n
        }
        ),
        i
    }
    ,
    t.Select.prototype.GroupBy=function() {
        var n=this;
        if(arguments.length>1)args=Array.prototype.slice.call(arguments);
        else if(arguments.length==1)args=Array.isArray(arguments[0])?arguments[0]: [arguments[0]];
        else throw new Error("Wrong number of arguments of Select() function");
        return n.group=[],
        args.forEach(function(i) {
            var r=new t.Column( {
                columnid: i
            }
            );
            n.group.push(r)
        }
        ),
        n
    }
    ,
    t.Select.prototype.Where=function(n) {
        var t=this;
        return typeof n=="function"&&(t.where=n),
        t
    }
    ,
    t.FuncValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.FuncValue.prototype.toString=function(t) {
        var i="";
        return n.fn[this.funcid]?i+=this.funcid:n.aggr[this.funcid]?i+=this.funcid:(n.stdlib[this.funcid.toUpperCase()]||n.stdfn[this.funcid.toUpperCase()])&&(i+=this.funcid.toUpperCase()),
        i+="(",
        this.args&&this.args.length>0&&(i+=this.args.map(function(n) {
            return n.toString()
        }
        ).join(",")),
        i+=")",
        this.as&&!t&&(i+=" AS "+this.as.toString()),
        i
    }
    ,
    t.FuncValue.prototype.execute=function(t,
    i,
    r) {
        var u=1,
        f;
        return n.precompile(this,
        t,
        i),
        f=new Function("params,alasql",
        "var y;return "+this.toJS("", "", null)),
        f(i,
        n),
        r&&(u=r(u)),
        u
    }
    ,
    t.FuncValue.prototype.findAggregator=function(n) {
        this.args&&this.args.length>0&&this.args.forEach(function(t) {
            t.findAggregator&&t.findAggregator(n)
        }
        )
    }
    ,
    t.FuncValue.prototype.toJS=function(t,
    i,
    r) {
        var u="",
        f=this.funcid;
        return!n.fn[f]&&n.stdlib[f.toUpperCase()]?u+=this.args&&this.args.length>0?n.stdlib[f.toUpperCase()].apply(this,
        this.args.map(function(n) {
            return n.toJS(t, i)
        }
        )):n.stdlib[f.toUpperCase()]():!n.fn[f]&&n.stdfn[f.toUpperCase()]?(this.newid&&(u+="new "),
        u+="alasql.stdfn."+this.funcid.toUpperCase()+"(",
        this.args&&this.args.length>0&&(u+=this.args.map(function(n) {
            return n.toJS(t, i, r)
        }
        ).join(",")),
        u+=")"):(this.newid&&(u+="new "),
        u+="alasql.fn."+this.funcid+"(",
        this.args&&this.args.length>0&&(u+=this.args.map(function(n) {
            return n.toJS(t, i, r)
        }
        ).join(",")),
        u+=")"),
        u
    }
    ,
    u=n.stdlib= {}
    ,
    o=n.stdfn= {}
    ,
    u.ABS=function(n) {
        return"Math.abs("+n+")"
    }
    ,
    u.CLONEDEEP=function(n) {
        return"alasql.utils.cloneDeep("+n+")"
    }
    ,
    o.CONCAT=function() {
        return Array.prototype.slice.call(arguments).join("")
    }
    ,
    u.EXP=function(n) {
        return"Math.pow(Math.E,"+n+")"
    }
    ,
    u.IIF=function(n,
    t,
    i) {
        if(arguments.length==3)return"(("+n+")?("+t+"):("+i+"))";
        throw new Error("Number of arguments of IFF is not equals to 3");
    }
    ,
    u.IFNULL=function(n,
    t) {
        return"("+n+"||"+t+")"
    }
    ,
    u.INSTR=function(n,
    t) {
        return"(("+n+").indexOf("+t+")+1)"
    }
    ,
    u.LEN=u.LENGTH=function(n) {
        return b(n,
        "y.length")
    }
    ,
    u.LOWER=u.LCASE=function(n) {
        return b(n,
        "String(y).toLowerCase()")
    }
    ,
    u.LTRIM=function(n) {
        return b(n,
        'y.replace(/^[ ]+/,"")')
    }
    ,
    u.RTRIM=function(n) {
        return b(n,
        'y.replace(/[ ]+$/,"")')
    }
    ,
    u.MAX=u.GREATEST=function() {
        return"Math.max("+Array.prototype.join.call(arguments,
        ",")+")"
    }
    ,
    u.MIN=u.LEAST=function() {
        return"Math.min("+Array.prototype.join.call(arguments,
        ",")+")"
    }
    ,
    u.SUBSTRING=u.SUBSTR=u.MID=function(n,
    t,
    i) {
        return arguments.length==2?b(n,
        "y.substr("+t+"-1)"): arguments.length==3?b(n, "y.substr("+t+"-1,"+i+")"): void 0
    }
    ,
    o.REGEXP_LIKE=function(n,
    t,
    i) {
        return(n||"").search(RegExp(t, i))>-1
    }
    ,
    u.ISNULL=u.NULLIF=function(n,
    t) {
        return"("+n+"=="+t+"?undefined:"+n+")"
    }
    ,
    u.POWER=function(n,
    t) {
        return"Math.pow("+n+","+t+")"
    }
    ,
    u.RANDOM=function(n) {
        return arguments.length==0?"Math.random()": "(Math.random()*("+n+")|0)"
    }
    ,
    u.ROUND=function(n,
    t) {
        return arguments.length==2?"Math.round(("+n+")*Math.pow(10,("+t+")))/Math.pow(10,("+t+"))": "Math.round("+n+")"
    }
    ,
    u.CEIL=u.CEILING=function(n) {
        return"Math.ceil("+n+")"
    }
    ,
    u.FLOOR=function(n) {
        return"Math.floor("+n+")"
    }
    ,
    u.ROWNUM=function() {
        return"1"
    }
    ,
    u.ROW_NUMBER=function() {
        return"1"
    }
    ,
    u.SQRT=function(n) {
        return"Math.sqrt("+n+")"
    }
    ,
    u.TRIM=function(n) {
        return b(n,
        "y.trim()")
    }
    ,
    u.UPPER=u.UCASE=function(n) {
        return b(n,
        "String(y).toUpperCase()")
    }
    ,
    o.CONCAT_WS=function() {
        return args=Array.prototype.slice.call(arguments),
        args.slice(1,
        args.length).join(args[0])
    }
    ,
    n.aggr.GROUP_CONCAT=function(n,
    t,
    i) {
        return i==1?n: i==2?t+","+n: void 0
    }
    ,
    n.aggr.MEDIAN=function(n,
    t,
    i) {
        if(i===2)return n!==null&&t.push(n),
        t;
        if(i===1)return n===null?[]: [n];
        if(!t.length)return t;
        var r=t.sort(),
        u=(r.length+1)/2;
        return Number.isInteger(u)?r[u-1]: (r[Math.floor(u-1)]+r[Math.ceil(u-1)])/2
    }
    ,
    n.aggr.QUART=function(n,
    t,
    i,
    r) {
        if(i===2)return n!==null&&t.push(n),
        t;
        if(i===1)return n===null?[]: [n];
        if(!t.length)return t;
        r=r?r: 1;
        var u=t.sort(),
        f=r*(u.length+1)/4;
        return Number.isInteger(f)?u[f-1]: u[Math.floor(f)]
    }
    ,
    n.aggr.QUART2=function(t,
    i,
    r) {
        return n.aggr.QUART(t,
        i,
        r,
        2)
    }
    ,
    n.aggr.QUART3=function(t,
    i,
    r) {
        return n.aggr.QUART(t,
        i,
        r,
        3)
    }
    ,
    n.aggr.VAR=function(n,
    t,
    i) {
        var r;
        if(i===1)return n===null? {
            arr: [], sum: 0
        }
        : {
            arr: [n], sum: n
        }
        ;
        if(i===2)return n===null?t:(t.arr.push(n),
        t.sum+=n,
        t);
        var u=t.arr.length,
        f=t.sum/u,
        e=0;
        for(r=0;
        r<u;
        r++)e+=(t.arr[r]-f)*(t.arr[r]-f);
        return e/(u-1)
    }
    ,
    n.aggr.STDEV=function(t,
    i,
    r) {
        return r===1||r===2?n.aggr.VAR(t,
        i,
        r): Math.sqrt(n.aggr.VAR(t, i, r))
    }
    ,
    n.aggr.VARP=function(n,
    t,
    i) {
        var r;
        if(i==1)return {
            arr: [n], sum: n
        }
        ;
        if(i==2)return t.arr.push(n),
        t.sum+=n,
        t;
        var u=t.arr.length,
        f=t.sum/u,
        e=0;
        for(r=0;
        r<u;
        r++)e+=(t.arr[r]-f)*(t.arr[r]-f);
        return e/u
    }
    ,
    n.aggr.STD=n.aggr.STDDEV=n.aggr.STDEVP=function(t,
    i,
    r) {
        return r==1||r==2?n.aggr.VARP(t,
        i,
        r): Math.sqrt(n.aggr.VARP(t, i, r))
    }
    ,
    o.REPLACE=function(n,
    t,
    i) {
        return(n||"").split(t).join(i)
    }
    ,
    l=[],
    et=0;
    et<256;
    et++)l[et]=(et<16?"0":"")+et.toString(16);
    if(o.NEWID=o.UUID=o.GEN_RANDOM_UUID=function() {
        var n=Math.random()*4294967295|0,
        t=Math.random()*4294967295|0,
        i=Math.random()*4294967295|0,
        r=Math.random()*4294967295|0;
        return l[n&255]+l[n>>8&255]+l[n>>16&255]+l[n>>24&255]+"-"+l[t&255]+l[t>>8&255]+"-"+l[t>>16&15|64]+l[t>>24&255]+"-"+l[i&63|128]+l[i>>8&255]+"-"+l[i>>16&255]+l[i>>24&255]+l[r&255]+l[r>>8&255]+l[r>>16&255]+l[r>>24&255]
    }
    ,
    t.CaseValue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.CaseValue.prototype.toString=function() {
        var n="CASE ";
        return this.expression&&(n+=this.expression.toString()),
        this.whens&&(n+=this.whens.map(function(n) {
            return" WHEN "+n.when.toString()+" THEN "+n.then.toString()
        }
        ).join()),
        n+" END"
    }
    ,
    t.CaseValue.prototype.findAggregator=function(n) {
        this.expression&&this.expression.findAggregator&&this.expression.findAggregator(n);
        this.whens&&this.whens.length>0&&this.whens.forEach(function(t) {
            t.when.findAggregator&&t.when.findAggregator(n);
            t.then.findAggregator&&t.then.findAggregator(n)
        }
        );
        this.elses&&this.elses.findAggregator&&this.elses.findAggregator(n)
    }
    ,
    t.CaseValue.prototype.toJS=function(n,
    t,
    i) {
        var r="((function("+n+",params,alasql){var y,r;";
        return this.expression?(r+="v="+this.expression.toJS(n, t, i)+";",
        r+=(this.whens||[]).map(function(r) {
            return" if(v=="+r.when.toJS(n, t, i)+") {r="+r.then.toJS(n, t, i)+"}"
        }
        ).join(" else "),
        this.elses&&(r+=" else {r="+this.elses.toJS(n, t, i)+"}")):(r+=(this.whens||[]).map(function(r) {
            return" if("+r.when.toJS(n, t, i)+") {r="+r.then.toJS(n, t, i)+"}"
        }
        ).join(" else "),
        this.elses&&(r+=" else {r="+this.elses.toJS(n, t, i)+"}")),
        r+(";return r;}).bind(this))("+n+",params,alasql)")
    }
    ,
    t.Json=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Json.prototype.toString=function() {
        var n="";
        return n+=p(this.value),
        n+""
    }
    ,
    p=n.utils.JSONtoString=function(n) {
        var i="",
        f,
        r,
        u;
        if(typeof n=="string")i='"'+n+'"';
        else if(typeof n=="number")i=n;
        else if(typeof n=="boolean")i=n;
        else if(typeof n=="object")if(Array.isArray(n))i+="["+n.map(function(n) {
            return p(n)
        }
        ).join(",")+"]";
        else if(!n.toJS||n instanceof t.Json) {
            i="{";
            f=[];
            for(r in n) {
                if(u="",
                typeof r=="string")u+='"'+r+'"';
                else if(typeof r=="number")u+=r;
                else if(typeof r=="boolean")u+=r;
                else throw new Error("THis is not ES6... no expressions on left side yet");
                u+=":"+p(n[r]);
                f.push(u)
            }
            i+=f.join(",")+"}"
        }
        else if(n.toString)i=n.toString();
        else throw new Error("1Can not show JSON object "+JSON.stringify(n));
        else throw new Error("2Can not show JSON object "+JSON.stringify(n));
        return i
    }
    ,
    t.Json.prototype.toJS=function(n,
    t,
    i) {
        return ht(this.value,
        n,
        t,
        i)
    }
    ,
    t.Convert=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Convert.prototype.toString=function() {
        var n="CONVERT(";
        return n+=this.dbtypeid,
        typeof this.dbsize!="undefined"&&(n+="("+this.dbsize,
        this.dbprecision&&(n+=","+dbprecision),
        n+=")"),
        n+=","+this.expression.toString(),
        this.style&&(n+=","+this.style),
        n+")"
    }
    ,
    t.Convert.prototype.toJS=function(n,
    t,
    i) {
        return"alasql.stdfn.CONVERT("+this.expression.toJS(n,
        t,
        i)+',{dbtypeid:"'+this.dbtypeid+'",dbsize:'+this.dbsize+",style:"+this.style+"})"
    }
    ,
    n.stdfn.CONVERT=function(n,
    t) {
        var r=n,
        i,
        e,
        u,
        s,
        f,
        o;
        if(t.style) {
            i=/\d {
                8
            }
            /.test(r)?new Date(+r.substr(0, 4),
            +r.substr(4, 2)-1,
            +r.substr(6, 2)):new Date(r);
            switch(t.style) {
                case 1: r=("0"+(i.getMonth()+1)).substr(-2)+"/"+("0"+i.getDate()).substr(-2)+"/"+("0"+i.getYear()).substr(-2);
                break;
                case 2: r=("0"+i.getYear()).substr(-2)+"."+("0"+(i.getMonth()+1)).substr(-2)+"."+("0"+i.getDate()).substr(-2);
                break;
                case 3: r=("0"+i.getDate()).substr(-2)+"/"+("0"+(i.getMonth()+1)).substr(-2)+"/"+("0"+i.getYear()).substr(-2);
                break;
                case 4: r=("0"+i.getDate()).substr(-2)+"."+("0"+(i.getMonth()+1)).substr(-2)+"."+("0"+i.getYear()).substr(-2);
                break;
                case 5: r=("0"+i.getDate()).substr(-2)+"-"+("0"+(i.getMonth()+1)).substr(-2)+"-"+("0"+i.getYear()).substr(-2);
                break;
                case 6: r=("0"+i.getDate()).substr(-2)+" "+i.toString().substr(4, 3).toLowerCase()+" "+("0"+i.getYear()).substr(-2);
                break;
                case 7: r=i.toString().substr(4, 3)+" "+("0"+i.getDate()).substr(-2)+","+("0"+i.getYear()).substr(-2);
                break;
                case 8: case 108: r=("0"+i.getHours()).substr(-2)+":"+("0"+i.getMinutes()).substr(-2)+":"+("0"+i.getSeconds()).substr(-2);
                break;
                case 10: r=("0"+(i.getMonth()+1)).substr(-2)+"-"+("0"+i.getDate()).substr(-2)+"-"+("0"+i.getYear()).substr(-2);
                break;
                case 11: r=("0"+i.getYear()).substr(-2)+"/"+("0"+(i.getMonth()+1)).substr(-2)+"/"+("0"+i.getDate()).substr(-2);
                break;
                case 12: r=("0"+i.getYear()).substr(-2)+("0"+(i.getMonth()+1)).substr(-2)+("0"+i.getDate()).substr(-2);
                break;
                case 101: r=("0"+(i.getMonth()+1)).substr(-2)+"/"+("0"+i.getDate()).substr(-2)+"/"+i.getFullYear();
                break;
                case 102: r=i.getFullYear()+"."+("0"+(i.getMonth()+1)).substr(-2)+"."+("0"+i.getDate()).substr(-2);
                break;
                case 103: r=("0"+i.getDate()).substr(-2)+"/"+("0"+(i.getMonth()+1)).substr(-2)+"/"+i.getFullYear();
                break;
                case 104: r=("0"+i.getDate()).substr(-2)+"."+("0"+(i.getMonth()+1)).substr(-2)+"."+i.getFullYear();
                break;
                case 105: r=("0"+i.getDate()).substr(-2)+"-"+("0"+(i.getMonth()+1)).substr(-2)+"-"+i.getFullYear();
                break;
                case 106: r=("0"+i.getDate()).substr(-2)+" "+i.toString().substr(4, 3).toLowerCase()+" "+i.getFullYear();
                break;
                case 107: r=i.toString().substr(4, 3)+" "+("0"+i.getDate()).substr(-2)+","+i.getFullYear();
                break;
                case 110: r=("0"+(i.getMonth()+1)).substr(-2)+"-"+("0"+i.getDate()).substr(-2)+"-"+i.getFullYear();
                break;
                case 111: r=i.getFullYear()+"/"+("0"+(i.getMonth()+1)).substr(-2)+"/"+("0"+i.getDate()).substr(-2);
                break;
                case 112: r=i.getFullYear()+("0"+(i.getMonth()+1)).substr(-2)+("0"+i.getDate()).substr(-2);
                break;
                default: throw new Error("The CONVERT style "+t.style+" is not realized yet.");
            }
        }
        if(e=t.dbtypeid.toUpperCase(),
        t.dbtypeid=="Date")return new Date(r);
        if(e=="DATE")return u=new Date(r),
        s=u.getFullYear()+"."+("0"+(u.getMonth()+1)).substr(-2)+"."+("0"+u.getDate()).substr(-2),
        s;
        if(e=="DATETIME"||e=="DATETIME2")return u=new Date(r),
        s=u.getFullYear()+"."+("0"+(u.getMonth()+1)).substr(-2)+"."+("0"+u.getDate()).substr(-2),
        s+=" "+("0"+u.getHours()).substr(-2)+":"+("0"+u.getMinutes()).substr(-2)+":"+("0"+u.getSeconds()).substr(-2),
        s+("."+("00"+u.getMilliseconds()).substr(-3));
        if(["MONEY"].indexOf(e)>-1)return f=+r,
        (f|0)+f*100%100/100;
        if(["BOOLEAN"].indexOf(e)>-1)return!!r;
        if(["INT",
        "INTEGER",
        "SMALLINT",
        "BIGINT",
        "SERIAL",
        "SMALLSERIAL",
        "BIGSERIAL"].indexOf(t.dbtypeid.toUpperCase())>-1)return r|0;
        if(["STRING",
        "VARCHAR",
        "NVARCHAR",
        "CHARACTER VARIABLE"].indexOf(t.dbtypeid.toUpperCase())>-1)return t.dbsize?(""+r).substr(0,
        t.dbsize):""+r;
        if(["CHAR",
        "CHARACTER",
        "NCHAR"].indexOf(e)>-1)return(r+new Array(t.dbsize+1).join(" ")).substr(0,
        t.dbsize);
        if(["NUMBER",
        "FLOAT"].indexOf(e)>-1)return typeof t.dbprecision!="undefined"?(f=+r,
        o=Math.pow(10, t.dbprecision),
        (f|0)+f*o%o/o):+r;
        if(["DECIMAL",
        "NUMERIC"].indexOf(e)>-1)return f=+r,
        o=Math.pow(10,
        t.dbprecision),
        (f|0)+f*o%o/o;
        if(["JSON"].indexOf(e)>-1) {
            if(typeof r=="object")return r;
            try {
                return JSON.parse(r)
            }
            catch(h) {
                throw new Error("Cannot convert string to JSON");
            }
        }
        return r
    }
    ,
    t.ColumnDef=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.ColumnDef.prototype.toString=function() {
        var n=this.columnid;
        return this.dbtypeid&&(n+=" "+this.dbtypeid),
        this.dbsize&&(n+="("+this.dbsize,
        this.dbprecision&&(n+=","+this.dbprecision),
        n+=")"),
        this.primarykey&&(n+=" PRIMARY KEY"),
        this.notnull&&(n+=" NOT NULL"),
        n
    }
    ,
    t.CreateTable=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.CreateTable.prototype.toString=function() {
        var n="CREATE",
        t;
        return this.temporary&&(n+=" TEMPORARY"),
        n+=this.view?" VIEW":" "+(this["class"]?"CLASS": "TABLE"), this.ifnotexists&&(n+=" IF  NOT EXISTS"), n+=" "+this.table.toString(), this.viewcolumns&&(n+="("+this.viewcolumns.map(function(n) {
            return n.toString()
        }
        ).join(",")+")"),
        this.as?n+=" AS "+this.as:(t=this.columns.map(function(n) {
            return n.toString()
        }
        ),
        n+=" ("+t.join(",")+")"),
        this.view&&this.select&&(n+=" AS "+this.select.toString()),
        n
    }
    ,
    t.CreateTable.prototype.execute=function(t,
    i,
    r) {
        var f=n.databases[this.table.databaseid||t],
        e=this.table.tableid,
        s,
        l,
        u,
        h,
        c,
        a,
        o;
        if(!e)throw new Error("Table name is not defined");
        if(s=this.columns,
        l=this.constraints||[],
        this.ifnotexists&&f.tables[e])return r?r(0): 0;
        if(f.tables[e])throw new Error("Can not create table '"+e+"', because it already exists in the database '"+f.databaseid+"'");
        return(u=f.tables[e]=new n.Table,
        this["class"]&&(u.isclass=!0),
        h=[],
        c=[],
        s&&s.forEach(function(i) {
            var s=i.dbtypeid, l, f, r, o, e, a;
            if(n.fn[s]||(s=s.toUpperCase()), ["SERIAL", "SMALLSERIAL", "BIGSERIAL"].indexOf(s)>-1&&(i.identity= {
                value: 1, step: 1
            }
            ), l= {
                columnid: i.columnid, dbtypeid: s, dbsize: i.dbsize, dbprecision: i.dbprecision, notnull: i.notnull, identity: i.identity
            }
            , i.identity&&(u.identities[i.columnid]= {
                value: +i.identity.value, step: +i.identity.step
            }
            ), i.check&&u.checks.push( {
                id: i.check.constrantid, fn: new Function("r", "var y;return "+i.check.expression.toJS("r", ""))
            }
            ), i["default"]&&h.push("'"+i.columnid+"':"+i["default"].toJS("r", "")), i.primarykey&&(f=u.pk= {}
            , f.columns=[i.columnid], f.onrightfns="r['"+i.columnid+"']", f.onrightfn=new Function("r", "var y;return "+f.onrightfns), f.hh=y(f.onrightfns), u.uniqs[f.hh]= {}
            ), i.unique&&(r= {}
            , u.uk=u.uk||[], u.uk.push(r), r.columns=[i.columnid], r.onrightfns="r['"+i.columnid+"']", r.onrightfn=new Function("r", "var y;return "+r.onrightfns), r.hh=y(r.onrightfns), u.uniqs[r.hh]= {}
            ), i.foreignkey) {
                if(o=i.foreignkey.table, e=n.databases[o.databaseid||t].tables[o.tableid], typeof o.columnid=="undefined")if(e.pk.columns&&e.pk.columns.length>0)o.columnid=e.pk.columns[0];
                else throw new Error("FOREIGN KEY allowed only to tables with PRIMARY KEYs");
                a=function(n) {
                    var t= {}
                    , r;
                    if(typeof n[i.columnid]=="undefined")return!0;
                    if(t[o.columnid]=n[i.columnid], r=e.pk.onrightfn(t), !e.uniqs[e.pk.hh][r])throw new Error('Foreign key "'+n[i.columnid]+'" is not found in table '+e.tableid);
                    return!0
                }
                ;
                u.checks.push( {
                    fn: a
                }
                )
            }
            i.onupdate&&c.push("r['"+i.columnid+"']="+i.onupdate.toJS("r", ""));
            u.columns.push(l);
            u.xcolumns[l.columnid]=l
        }
        ),
        u.defaultfns=h.join(","),
        u.onupdatefns=c.join(";"),
        l.forEach(function(i) {
            var s, f, r, h, e, o;
            if(i.type==="PRIMARY KEY") {
                if(u.pk)throw new Error("Primary key already exists");
                f=u.pk= {}
                ;
                f.columns=i.columns;
                f.onrightfns=f.columns.map(function(n) {
                    return"r['"+n+"']"
                }
                ).join("+'`'+");
                f.onrightfn=new Function("r", "var y;return "+f.onrightfns);
                f.hh=y(f.onrightfns);
                u.uniqs[f.hh]= {}
            }
            else i.type==="CHECK"?s=new Function("r", "var y;return "+i.expression.toJS("r", "")):i.type==="UNIQUE"?(r= {}
            , u.uk=u.uk||[], u.uk.push(r), r.columns=i.columns, r.onrightfns=r.columns.map(function(n) {
                return"r['"+n+"']"
            }
            ).join("+'`'+"), r.onrightfn=new Function("r", "var y;return "+r.onrightfns), r.hh=y(r.onrightfns), u.uniqs[r.hh]= {}
            ):i.type==="FOREIGN KEY"&&(h=u.xcolumns[i.columns[0]], e=i.fktable, i.fkcolumns&&i.fkcolumns.length>0&&(e.columnid=i.fkcolumns[0]), o=n.databases[e.databaseid||t].tables[e.tableid], typeof e.columnid=="undefined"&&(e.columnid=o.pk.columns[0]), s=function(n) {
                var t= {}
                , i;
                if(typeof n[h.columnid]=="undefined")return!0;
                if(t[e.columnid]=n[h.columnid], i=o.pk.onrightfn(t), !o.uniqs[o.pk.hh][i])throw new Error('Foreign key "'+n[h.columnid]+'" is not found in table '+o.tableid);
                return!0
            }
            );
            s&&u.checks.push( {
                fn: s, id: i.constraintid, fk: i.type==="FOREIGN KEY"
            }
            )
        }
        ),
        this.view&&this.viewcolumns&&(a=this, this.viewcolumns.forEach(function(n, t) {
            a.select.columns[t].as=n.columnid
        }
        )),
        this.view&&this.select&&(u.view=!0, u.select=this.select.compile(this.table.databaseid||t)),
        f.engineid)?n.engines[f.engineid].createTable(this.table.databaseid||t,
        e,
        this.ifnotexists,
        r):(u.insert=function(r, u) {
            var p=n.inserted,
            y,
            a,
            h,
            o,
            c,
            s,
            e;
            n.inserted=[r];
            var f=this,
            v=!1,
            l=!1;
            for(s in f.beforeinsert)e=f.beforeinsert[s],
            e&&(e.funcid?n.fn[e.funcid](r)===!1&&(l=l||!0): e.statement&&e.statement.execute(t)===!1&&(l=l||!0));
            if(!l) {
                y=!1;
                for(s in f.insteadofinsert)y=!0,
                e=f.insteadofinsert[s],
                e&&(e.funcid?n.fn[e.funcid](r): e.statement&&e.statement.execute(t));
                if(!y) {
                    for(a in f.identities)h=f.identities[a],
                    r[a]=h.value;
                    if(f.checks&&f.checks.length>0&&f.checks.forEach(function(n) {
                        if(!n.fn(r))throw new Error("Violation of CHECK constraint "+(n.id||""));
                    }
                    ), f.columns.forEach(function(n) {
                        if(n.notnull&&typeof r[n.columnid]=="undefined")throw new Error("Wrong NULL value in NOT NULL column "+n.columnid);
                    }
                    ), f.pk&&(o=f.pk, c=o.onrightfn(r), typeof f.uniqs[o.hh][c]!="undefined"))if(u)v=f.uniqs[o.hh][c];
                    else throw new Error("Cannot insert record, because it already exists in primary key index");
                    if(f.uk&&f.uk.length&&f.uk.forEach(function(n) {
                        var t=n.onrightfn(r);
                        if(typeof f.uniqs[n.hh][t]!="undefined")if(u)v=f.uniqs[n.hh][t];
                        else throw new Error("Cannot insert record, because it already exists in unique index");
                    }
                    ), v)f.update(function(n) {
                        for(var t in r)n[t]=r[t]
                    }
                    , f.data.indexOf(v), i);
                    else {
                        f.data.push(r);
                        for(a in f.identities)h=f.identities[a],
                        h.value+=h.step;
                        f.pk&&(o=f.pk, c=o.onrightfn(r), f.uniqs[o.hh][c]=r);
                        f.uk&&f.uk.length&&f.uk.forEach(function(n) {
                            var t=n.onrightfn(r);
                            f.uniqs[n.hh][t]=r
                        }
                        )
                    }
                    for(s in f.afterinsert)e=f.afterinsert[s],
                    e&&(e.funcid?n.fn[e.funcid](r):e.statement&&e.statement.execute(t));
                    n.inserted=p
                }
            }
        }
        ,
        u["delete"]=function(i) {
            var u=this,
            e=u.data[i],
            f=!1,
            h,
            o,
            r,
            s,
            c;
            for(o in u.beforedelete)r=u.beforedelete[o],
            r&&(r.funcid?n.fn[r.funcid](e)===!1&&(f=f||!0): r.statement&&r.statement.execute(t)===!1&&(f=f||!0));
            if(f)return!1;
            h=!1;
            for(o in u.insteadofdelete)h=!0,
            r=u.insteadofdelete[o],
            r&&(r.funcid?n.fn[r.funcid](e): r.statement&&r.statement.execute(t));
            if(!h) {
                if(this.pk)if(s=this.pk, c=s.onrightfn(e), typeof this.uniqs[s.hh][c]=="undefined")throw new Error("Something wrong with primary key index on table");
                else this.uniqs[s.hh][c]=undefined;
                u.uk&&u.uk.length&&u.uk.forEach(function(n) {
                    var t=n.onrightfn(e);
                    if(typeof u.uniqs[n.hh][t]=="undefined")throw new Error("Something wrong with unique index on table");
                    u.uniqs[n.hh][t]=undefined
                }
                )
            }
        }
        ,
        u.deleteall=function() {
            this.data.length=0;
            this.pk&&(this.uniqs[this.pk.hh]= {}
            );
            u.uk&&u.uk.length&&u.uk.forEach(function(n) {
                u.uniqs[n.hh]= {}
            }
            )
        }
        ,
        u.update=function(i, r, f) {
            var s=g(this.data[r]),
            o,
            h,
            l,
            c,
            e;
            if(this.pk&&(o=this.pk, o.pkaddr=o.onrightfn(s, f), typeof this.uniqs[o.hh][o.pkaddr]=="undefined"))throw new Error("Something wrong with index on table");
            u.uk&&u.uk.length&&u.uk.forEach(function(n) {
                if(n.ukaddr=n.onrightfn(s), typeof u.uniqs[n.hh][n.ukaddr]=="undefined")throw new Error("Something wrong with unique index on table");
            }
            );
            i(s, f, n);
            h=!1;
            for(c in u.beforeupdate)e=u.beforeupdate[c],
            e&&(e.funcid?n.fn[e.funcid](this.data[r], s)===!1&&(h=h||!0):e.statement&&e.statement.execute(t)===!1&&(h=h||!0));
            if(h)return!1;
            l=!1;
            for(c in u.insteadofupdate)l=!0,
            e=u.insteadofupdate[c],
            e&&(e.funcid?n.fn[e.funcid](this.data[r], s):e.statement&&e.statement.execute(t));
            if(!l) {
                if(u.checks&&u.checks.length>0&&u.checks.forEach(function(n) {
                    if(!n.fn(s))throw new Error("Violation of CHECK constraint "+(n.id||""));
                }
                ), u.columns.forEach(function(n) {
                    if(n.notnull&&typeof s[n.columnid]=="undefined")throw new Error("Wrong NULL value in NOT NULL column "+n.columnid);
                }
                ), this.pk&&(o.newpkaddr=o.onrightfn(s), typeof this.uniqs[o.hh][o.newpkaddr]!="undefined"&&o.newpkaddr!==o.pkaddr))throw new Error("Record already exists");
                u.uk&&u.uk.length&&u.uk.forEach(function(n) {
                    if(n.newukaddr=n.onrightfn(s), typeof u.uniqs[n.hh][n.newukaddr]!="undefined"&&n.newukaddr!==n.ukaddr)throw new Error("Record already exists");
                }
                );
                this.pk&&(this.uniqs[o.hh][o.pkaddr]=undefined, this.uniqs[o.hh][o.newpkaddr]=s);
                u.uk&&u.uk.length&&u.uk.forEach(function(n) {
                    u.uniqs[n.hh][n.ukaddr]=undefined;
                    u.uniqs[n.hh][n.newukaddr]=s
                }
                );
                this.data[r]=s;
                for(c in u.afterupdate)e=u.afterupdate[c],
                e&&(e.funcid?n.fn[e.funcid](this.data[r], s):e.statement&&e.statement.execute(t))
            }
        }
        ,
        n.options.nocount||(o=1),
        r&&(o=r(o)),
        o)
    }
    ,
    n.fn.Date=Object,
    n.fn.Date=Date,
    n.fn.Number=Number,
    n.fn.String=String,
    n.fn.Boolean=Boolean,
    o.EXTEND=n.utils.extend,
    o.CHAR=String.fromCharCode.bind(String),
    o.ASCII=function(n) {
        return n.charCodeAt(0)
    }
    ,
    o.COALESCE=function() {
        for(var n=0;
        n<arguments.length;
        n++)if(typeof arguments[n]!="undefined"&&(typeof arguments[n]!="number"||!isNaN(arguments[n])))return arguments[n];
        return undefined
    }
    ,
    o.USER=function() {
        return"alasql"
    }
    ,
    o.OBJECT_ID=function(t) {
        return!!n.tables[t]
    }
    ,
    o.DATE=function(n) {
        return/\d {
            8
        }
        /.test(n)?new Date(+n.substr(0, 4),
        +n.substr(4, 2)-1,
        +n.substr(6, 2)):new Date(n)
    }
    ,
    o.NOW=function() {
        var n=new Date,
        t=n.getFullYear()+"."+("0"+(n.getMonth()+1)).substr(-2)+"."+("0"+n.getDate()).substr(-2);
        return t+=" "+("0"+n.getHours()).substr(-2)+":"+("0"+n.getMinutes()).substr(-2)+":"+("0"+n.getSeconds()).substr(-2),
        t+("."+("00"+n.getMilliseconds()).substr(-3))
    }
    ,
    o.GETDATE=o.NOW,
    o.CURRENT_TIMESTAMP=o.NOW,
    o.SECOND=function(n) {
        var n=new Date(n);
        return n.getSeconds()
    }
    ,
    o.MINUTE=function(n) {
        var n=new Date(n);
        return n.getMinutes()
    }
    ,
    o.HOUR=function(n) {
        var n=new Date(n);
        return n.getHours()
    }
    ,
    o.DAYOFWEEK=o.WEEKDAY=function(n) {
        var n=new Date(n);
        return n.getDay()
    }
    ,
    o.DAY=o.DAYOFMONTH=function(n) {
        var n=new Date(n);
        return n.getDate()
    }
    ,
    o.MONTH=function(n) {
        var n=new Date(n);
        return n.getMonth()+1
    }
    ,
    o.YEAR=function(n) {
        var n=new Date(n);
        return n.getFullYear()
    }
    ,
    ct= {
        year: 31536e6, quarter: 7884e6, month: 2592e6, week: 6048e5, day: 864e5, dayofyear: 864e5, weekday: 864e5, hour: 36e5, minute: 6e4, second: 1e3, millisecond: 1, microsecond: .001
    }
    ,
    n.stdfn.DATEDIFF=function(n,
    t,
    i) {
        var r=new Date(i).getTime()-new Date(t).getTime();
        return r/ct[n.toLowerCase()]
    }
    ,
    n.stdfn.DATEADD=function(n,
    t,
    i) {
        var r=new Date(i).getTime()+t*ct[n.toLowerCase()];
        return new Date(r)
    }
    ,
    n.stdfn.INTERVAL=function(n,
    t) {
        return n*ct[t.toLowerCase()]
    }
    ,
    n.stdfn.DATE_ADD=n.stdfn.ADDDATE=function(n,
    t) {
        var i=new Date(n).getTime()+t;
        return new Date(i)
    }
    ,
    n.stdfn.DATE_SUB=n.stdfn.SUBDATE=function(n,
    t) {
        var i=new Date(n).getTime()-t;
        return new Date(i)
    }
    ,
    t.DropTable=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.DropTable.prototype.toString=function() {
        var n="DROP ";
        return n+=this.view?"VIEW": "TABLE", this.ifexists&&(n+=" IF EXISTS"), n+(" "+this.tables.toString())
    }
    ,
    t.DropTable.prototype.execute=function(t,
    i,
    r) {
        var e=this.ifexists,
        u=0,
        f=0,
        o=this.tables.length;
        return this.tables.forEach(function(i) {
            var s=n.databases[i.databaseid||t],
            h=i.tableid;
            if(!e||e&&s.tables[h]) {
                if(s.tables[h])s.engineid?n.engines[s.engineid].dropTable(i.databaseid||t, h, e, function(n) {
                    delete s.tables[h];
                    u+=n;
                    f++;
                    f==o&&r&&r(u)
                }
                ):(delete s.tables[h], u++, f++, f==o&&r&&r(u));
                else if(!n.options.dropifnotexists)throw new Error("Can not drop table '"+i.tableid+"', because it does not exist in the database.");
            }
            else f++,
            f==o&&r&&r(u)
        }
        ),
        u
    }
    ,
    t.TruncateTable=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.TruncateTable.prototype.toString=function() {
        return"TRUNCATE TABLE "+this.table.toString()
    }
    ,
    t.TruncateTable.prototype.execute=function(t,
    i,
    r) {
        var u=n.databases[this.table.databaseid||t],
        f=this.table.tableid;
        if(u.engineid)return n.engines[u.engineid].truncateTable(this.table.databaseid||t,
        f,
        this.ifexists,
        r);
        if(u.tables[f])u.tables[f].data=[];
        else throw new Error("Cannot truncate table becaues it does not exist");
        return r?r(0): 0
    }
    ,
    t.CreateVertex=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.CreateVertex.prototype.toString=function() {
        var n="CREATE VERTEX ";
        return this["class"]&&(n+=this["class"]+" "),
        this.sharp&&(n+="#"+this.sharp+" "),
        this.sets?n+=this.sets.toString(): this.content?n+=this.content.toString(): this.select&&(n+=this.select.toString()), n
    }
    ,
    t.CreateVertex.prototype.toJS=function(n) {
        return"this.queriesfn["+(this.queriesidx-1)+"](this.params,null,"+n+")"
    }
    ,
    t.CreateVertex.prototype.compile=function(t) {
        var e=t,
        f=this.sharp,
        r,
        i,
        u;
        return typeof this.name!="undefined"&&(i="x.name="+this.name.toJS(),
        r=new Function("x", i)),
        this.sets&&this.sets.length>0&&(i=this.sets.map(function(n) {
            return"x['"+n.column.columnid+"']="+n.expression.toJS("x", "")
        }
        ).join(";"),
        u=new Function("x,params,alasql", i)),
        function(t,
        i) {
            var s,
            h=n.databases[e],
            c,
            o;
            return c=typeof f!="undefined"?f:h.counter++,
            o= {
                $id: c, $node: "VERTEX"
            }
            ,
            h.objects[o.$id]=o,
            s=o,
            r&&r(o),
            u&&u(o,
            t,
            n),
            i&&(s=i(s)),
            s
        }
    }
    ,
    t.CreateEdge=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.CreateEdge.prototype.toString=function() {
        var n="CREATE EDGE ";
        return this["class"]&&(n+=this["class"]+" "),
        n
    }
    ,
    t.CreateEdge.prototype.toJS=function(n) {
        return"this.queriesfn["+(this.queriesidx-1)+"](this.params,null,"+n+")"
    }
    ,
    t.CreateEdge.prototype.compile=function(t) {
        var f=t,
        e=new Function("params,alasql",
        "var y;return "+this.from.toJS()),
        o=new Function("params,alasql",
        "var y;return "+this.to.toJS()),
        r,
        i,
        u;
        return typeof this.name!="undefined"&&(i="x.name="+this.name.toJS(),
        r=new Function("x", i)),
        this.sets&&this.sets.length>0&&(i=this.sets.map(function(n) {
            return"x['"+n.column.columnid+"']="+n.expression.toJS("x", "")
        }
        ).join(";"),
        u=new Function("x,params,alasql", "var y;"+i)),
        function(t,
        i) {
            var h=0,
            a=n.databases[f],
            s= {
                $id: a.counter++, $node: "EDGE"
            }
            ,
            c=e(t,
            n),
            l=o(t,
            n);
            return s.$in=[c.$id],
            s.$out=[l.$id],
            c.$out===undefined&&(c.$out=[]),
            c.$out.push(s.$id),
            typeof l.$in===undefined&&(l.$in=[]),
            l.$in.push(s.$id),
            a.objects[s.$id]=s,
            h=s,
            r&&r(s),
            u&&u(s,
            t,
            n),
            i&&(h=i(h)),
            h
        }
    }
    ,
    t.CreateGraph=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.CreateGraph.prototype.toString=function() {
        var n="CREATE GRAPH ";
        return this["class"]&&(n+=this["class"]+" "),
        n
    }
    ,
    t.CreateGraph.prototype.execute=function(t,
    i,
    r) {
        function o(t) {
            var i=n.databases[n.useid].objects,
            r;
            for(r in i)if(i[r].name===t)return i[r];
            return undefined
        }
        function f(r) {
            var f= {}
            ,
            o;
            if(typeof r.as!="undefined"&&(n.vars[r.as]=f),
            typeof r.prop!="undefined"&&(f.$id=r.prop, f.name=r.prop),
            typeof r.sharp!="undefined"&&(f.$id=r.sharp),
            typeof r.name!="undefined"&&(f.name=r.name),
            typeof r["class"]!="undefined"&&(f.$class=r["class"]),
            o=n.databases[t],
            typeof f.$id=="undefined"&&(f.$id=o.counter++),
            f.$node="VERTEX",
            typeof r.json!="undefined"&&e(f, new Function("params,alasql", "var y;return "+r.json.toJS())(i, n)),
            o.objects[f.$id]=f,
            typeof f.$class!="undefined")if(typeof n.databases[t].tables[f.$class]=="undefined")throw new Error("No such class. Pleace use CREATE CLASS");
            else n.databases[t].tables[f.$class].data.push(f);
            return u.push(f.$id),
            f
        }
        var u=[];
        return this.from&&n.from[this.from.funcid]&&(this.graph=n.from[this.from.funcid.toUpperCase()]),
        this.graph.forEach(function(r) {
            var s,
            a,
            h,
            v,
            c,
            l,
            y;
            if(r.source) {
                if(s= {}
                , typeof r.as!="undefined"&&(n.vars[r.as]=s), typeof r.prop!="undefined"&&(s.name=r.prop), typeof r.sharp!="undefined"&&(s.$id=r.sharp), typeof r.name!="undefined"&&(s.name=r.name), typeof r["class"]!="undefined"&&(s.$class=r["class"]), a=n.databases[t], typeof s.$id=="undefined"&&(s.$id=a.counter++), s.$node="EDGE", typeof r.json!="undefined"&&e(s, new Function("params,alasql", "var y;return "+r.json.toJS())(i, n)), r.source.vars?(l=n.vars[r.source.vars], h=typeof l=="object"?l: a.objects[l]): (v=r.source.sharp, typeof v=="undefined"&&(v=r.source.prop), h=n.databases[t].objects[v], typeof h=="undefined"&&n.options.autovertex&&(typeof r.source.prop!="undefined"||typeof r.source.name!="undefined")&&(h=o(r.source.prop||r.source.name), typeof h=="undefined"&&(h=f(r.source)))), r.source.vars?(l=n.vars[r.target.vars], c=typeof l=="object"?l: a.objects[l]): (y=r.target.sharp, typeof y=="undefined"&&(y=r.target.prop), c=n.databases[t].objects[y], typeof c=="undefined"&&n.options.autovertex&&(typeof r.target.prop!="undefined"||typeof r.target.name!="undefined")&&(c=o(r.target.prop||r.target.name), typeof c=="undefined"&&(c=f(r.target)))), s.$in=[h.$id], s.$out=[c.$id], typeof h.$out=="undefined"&&(h.$out=[]), h.$out.push(s.$id), typeof c.$in=="undefined"&&(c.$in=[]), c.$in.push(s.$id), a.objects[s.$id]=s, typeof s.$class!="undefined")if(typeof n.databases[t].tables[s.$class]=="undefined")throw new Error("No such class. Pleace use CREATE CLASS");
                else n.databases[t].tables[s.$class].data.push(s);
                u.push(s.$id)
            }
            else f(r)
        }
        ),
        r&&(u=r(u)),
        u
    }
    ,
    t.CreateGraph.prototype.compile1=function(t) {
        var f=t,
        e=new Function("params,alasql",
        "var y;return "+this.from.toJS()),
        o=new Function("params,alasql",
        "var y;return "+this.to.toJS()),
        r,
        i,
        u;
        return typeof this.name!="undefined"&&(i="x.name="+this.name.toJS(),
        r=new Function("x", i)),
        this.sets&&this.sets.length>0&&(i=this.sets.map(function(n) {
            return"x['"+n.column.columnid+"']="+n.expression.toJS("x", "")
        }
        ).join(";"),
        u=new Function("x,params,alasql", "var y;"+i)),
        function(t,
        i) {
            var h=0,
            a=n.databases[f],
            s= {
                $id: a.counter++, $node: "EDGE"
            }
            ,
            c=e(t,
            n),
            l=o(t,
            n);
            return s.$in=[c.$id],
            s.$out=[l.$id],
            typeof c.$out=="undefined"&&(c.$out=[]),
            c.$out.push(s.$id),
            typeof l.$in=="undefined"&&(l.$in=[]),
            l.$in.push(s.$id),
            a.objects[s.$id]=s,
            h=s,
            r&&r(s),
            u&&u(s,
            t,
            n),
            i&&(h=i(h)),
            h
        }
    }
    ,
    t.AlterTable=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.AlterTable.prototype.toString=function() {
        var n="ALTER TABLE "+this.table.toString();
        return this.renameto&&(n+=" RENAME TO "+this.renameto),
        n
    }
    ,
    t.AlterTable.prototype.execute=function(t,
    i,
    r) {
        var e=n.databases[t],
        w,
        c,
        h,
        o,
        l;
        if(e.dbversion=Date.now(),
        this.renameto) {
            var v=this.table.tableid,
            y=this.renameto,
            p=1;
            if(e.tables[y])throw new Error("Can not rename a table '"+v+"' to '"+y+"', because the table with this name already exists");
            else if(y==v)throw new Error("Can not rename a table '"+v+"' to itself");
            else e.tables[y]=e.tables[v],
            delete e.tables[v],
            p=1;
            return r&&r(p),
            p
        }
        if(this.addcolumn) {
            e=n.databases[this.table.databaseid||t];
            e.dbversion++;
            var s=this.table.tableid,
            u=e.tables[s],
            f=this.addcolumn.columnid;
            if(u.xcolumns[f])throw new Error('Cannot add column "'+f+'", because it already exists in the table "'+s+'"');
            for(c= {
                columnid: f, dbtypeid: this.dbtypeid, dbsize: this.dbsize, dbprecision: this.dbprecision, dbenum: this.dbenum, defaultfns: null
            }
            ,
            w=function() {}
            ,
            u.columns.push(c),
            u.xcolumns[f]=c,
            o=0,
            l=u.data.length;
            o<l;
            o++)u.data[o][f]=w();
            return r?r(1):1
        }
        if(this.modifycolumn) {
            e=n.databases[this.table.databaseid||t];
            e.dbversion++;
            var s=this.table.tableid,
            u=e.tables[s],
            f=this.modifycolumn.columnid;
            if(!u.xcolumns[f])throw new Error('Cannot modify column "'+f+'", because it was not found in the table "'+s+'"');
            return c=u.xcolumns[f],
            c.dbtypeid=this.dbtypeid,
            c.dbsize=this.dbsize,
            c.dbprecision=this.dbprecision,
            c.dbenum=this.dbenum,
            r?r(1): 1
        }
        if(this.renamecolumn) {
            e=n.databases[this.table.databaseid||t];
            e.dbversion++;
            var s=this.table.tableid,
            u=e.tables[s],
            f=this.renamecolumn,
            a=this.to,
            c;
            if(!u.xcolumns[f])throw new Error('Column "'+f+'" is not found in the table "'+s+'"');
            if(u.xcolumns[a])throw new Error('Column "'+a+'" already exists in the table "'+s+'"');
            if(f!=a) {
                for(h=0;
                h<u.columns.length;
                h++)u.columns[h].columnid==f&&(u.columns[h].columnid=a);
                for(u.xcolumns[a]=u.xcolumns[f],
                delete u.xcolumns[f],
                o=0,
                l=u.data.length;
                o<l;
                o++)u.data[o][a]=u.data[o][f],
                delete u.data[o][f];
                return u.data.length
            }
            return r?r(0):0
        }
        if(this.dropcolumn) {
            e=n.databases[this.table.databaseid||t];
            e.dbversion++;
            var s=this.table.tableid,
            u=e.tables[s],
            f=this.dropcolumn,
            b=!1;
            for(h=0;
            h<u.columns.length;
            h++)if(u.columns[h].columnid==f) {
                b=!0;
                u.columns.splice(h,
                1);
                break
            }
            if(!b)throw new Error('Cannot drop column "'+f+'", because it was not found in the table "'+s+'"');
            for(delete u.xcolumns[f],
            o=0,
            l=u.data.length;
            o<l;
            o++)delete u.data[o][f];
            return r?r(u.data.length):u.data.length
        }
        throw Error("Unknown ALTER TABLE method");
    }
    ,
    t.CreateIndex=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.CreateIndex.prototype.toString=function() {
        var n="CREATE";
        return this.unique&&(n+=" UNIQUE"),
        n+=" INDEX "+this.indexid+" ON "+this.table.toString(),
        n+("("+this.columns.toString()+")")
    }
    ,
    t.CreateIndex.prototype.execute=function(t,
    i,
    r) {
        var p=n.databases[t],
        w=this.table.tableid,
        u=p.tables[w],
        h=this.indexid,
        o,
        b,
        c,
        l,
        a,
        f,
        s,
        e,
        v;
        if(p.indices[h]=w,
        o=this.columns.map(function(n) {
            return n.expression.toJS("r", "")
        }
        ).join("+'`'+"),
        b=new Function("r,params,alasql", "return "+o),
        this.unique) {
            if(u.uniqdefs[h]= {
                rightfns: o
            }
            ,
            c=u.uniqs[h]= {}
            ,
            u.data.length>0)for(f=0,
            s=u.data.length;
            f<s;
            f++)e=o(u.data[f]),
            c[e]||(c[e]= {
                num: 0
            }
            ),
            c[e].num++
        }
        else if(l=y(o),
        u.inddefs[h]= {
            rightfns: o, hh: l
        }
        ,
        u.indices[l]= {}
        ,
        a=u.indices[l]= {}
        ,
        u.data.length>0)for(f=0,
        s=u.data.length;
        f<s;
        f++)e=b(u.data[f],
        i,
        n),
        a[e]||(a[e]=[]),
        a[e].push(u.data[f]);
        return v=1,
        r&&(v=r(v)),
        v
    }
    ,
    t.Reindex=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Reindex.prototype.toString=function() {
        return"REINDEX "+this.indexid
    }
    ,
    t.Reindex.prototype.execute=function(t,
    i,
    r) {
        var f=n.databases[t],
        e=this.indexid,
        o=f.indices[e],
        s=f.tables[o],
        u;
        return s.indexColumns(),
        u=1,
        r&&(u=r(u)),
        u
    }
    ,
    t.DropIndex=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.DropIndex.prototype.toString=function() {
        return"DROP INDEX"+this.indexid
    }
    ,
    t.DropIndex.prototype.compile=function() {
        var n=this.indexid;
        return function() {
            return 1
        }
    }
    ,
    t.WithSelect=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.WithSelect.prototype.toString=function() {
        var n="WITH ";
        return n+=this.withs.map(function(n) {
            return n.name+" AS ("+n.select.toString()+")"
        }
        ).join(",")+" ",
        n+this.select.toString()
    }
    ,
    t.WithSelect.prototype.execute=function(t,
    i,
    r) {
        var f=this,
        u=[],
        e;
        return f.withs.forEach(function(r) {
            u.push(n.databases[t].tables[r.name]);
            var f=n.databases[t].tables[r.name]=new wt( {
                tableid: r.name
            }
            );
            f.data=r.select.execute(t, i)
        }
        ),
        e=1,
        this.select.execute(t,
        i,
        function(i) {
            return f.withs.forEach(function(i, r) {
                u[r]?n.databases[t].tables[i.name]=u[r]: delete n.databases[t].tables[i.name]
            }
            ),
            r&&(i=r(i)),
            i
        }
        )
    }
    ,
    t.If=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.If.prototype.toString=function() {
        var n="IF ";
        return n+=this.expression.toString(),
        n+=" "+this.thenstat.toString(),
        this.elsestat&&(n+=" ELSE "+this.thenstat.toString()),
        n
    }
    ,
    t.If.prototype.execute=function(t,
    i,
    r) {
        var u,
        f=new Function("params,alasql,p",
        "var y;return "+this.expression.toJS("({})", "", null)).bind(this);
        return f(i,
        n)?u=this.thenstat.execute(t,
        i,
        r): this.elsestat?u=this.elsestat.execute(t, i, r): r&&(u=r(u)), u
    }
    ,
    t.While=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.While.prototype.toString=function() {
        var n="WHILE ";
        return n+=this.expression.toString(),
        n+(" "+this.loopstat.toString())
    }
    ,
    t.While.prototype.execute=function(t,
    i,
    r) {
        var e=this,
        u=[],
        o=new Function("params,alasql,p",
        "var y;return "+this.expression.toJS()),
        f,
        h;
        if(r) {
            f=!1;
            s();
            function s(h) {
                f?u.push(h): f=!0;
                setTimeout(function() {
                    o(i, n)?e.loopstat.execute(t, i, s): u=r(u)
                }
                ,
                0)
            }
        }
        else while(o(i, n))h=e.loopstat.execute(t,
        i),
        u.push(h);
        return u
    }
    ,
    t.Break=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Break.prototype.toString=function() {
        return"BREAK"
    }
    ,
    t.Break.prototype.execute=function(n,
    t,
    i) {
        var r=1;
        return i&&(r=i(r)),
        r
    }
    ,
    t.Continue=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Continue.prototype.toString=function() {
        return"CONTINUE"
    }
    ,
    t.Continue.prototype.execute=function(n,
    t,
    i) {
        var r=1;
        return i&&(r=i(r)),
        r
    }
    ,
    t.BeginEnd=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.BeginEnd.prototype.toString=function() {
        return"BEGIN "+this.statements.toString()+" END"
    }
    ,
    t.BeginEnd.prototype.execute=function(n,
    t,
    i) {
        function e() {
            f.statements[u].execute(n,
            t,
            function(n) {
                if(r.push(n), u++, u<f.statements.length)return e();
                i&&(r=i(r))
            }
            )
        }
        var f=this,
        r=[],
        u=0;
        return e(),
        r
    }
    ,
    t.Insert=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Insert.prototype.toString=function() {
        var n="INSERT ";
        return this.orreplace&&(n+="OR REPLACE "),
        this.replaceonly&&(n="REPLACE "),
        n+="INTO "+this.into.toString(),
        this.columns&&(n+="("+this.columns.toString()+")"),
        this.values&&(n+=" VALUES "+this.values.toString()),
        this.select&&(n+=" "+this.select.toString()),
        n
    }
    ,
    t.Insert.prototype.toJS=function(n) {
        return"this.queriesfn["+(this.queriesidx-1)+"](this.params,null,"+n+")"
    }
    ,
    t.Insert.prototype.compile=function(t) {
        var e=this,
        h,
        v,
        o,
        a;
        t=e.into.databaseid||t;
        var r=n.databases[t],
        i=e.into.tableid,
        f=r.tables[i];
        if(!f)throw"Table '"+i+"' could not be found";
        var u="",
        s="",
        u="db.tables['"+i+"'].dirty=true;",
        c="var a,aa=[],x;",
        l;
        if(this.values)this.exists&&(this.existsfn=this.exists.map(function(n) {
            var i=n.compile(t);
            return i.query.modifier="RECORDSET", i
        }
        )),
        this.queries&&(this.queriesfn=this.queries.map(function(n) {
            var i=n.compile(t);
            return i.query.modifier="RECORDSET", i
        }
        )),
        e.values.forEach(function(o) {
            var h=[];
            e.columns?e.columns.forEach(function(t, i) {
                var r="'"+t.columnid+"':";
                f.xcolumns&&f.xcolumns[t.columnid]?["INT", "FLOAT", "NUMBER", "MONEY"].indexOf(f.xcolumns[t.columnid].dbtypeid)>=0?r+="(x="+o[i].toJS()+",x==undefined?undefined:+x)": n.fn[f.xcolumns[t.columnid].dbtypeid]?(r+="(new "+f.xcolumns[t.columnid].dbtypeid+"(", r+=o[i].toJS(), r+="))"): r+=o[i].toJS(): r+=o[i].toJS();
                h.push(r)
            }
            ):Array.isArray(o)&&f.columns&&f.columns.length>0?f.columns.forEach(function(t, i) {
                var r="'"+t.columnid+"':";
                ["INT", "FLOAT", "NUMBER", "MONEY"].indexOf(t.dbtypeid)>=0?r+="+"+o[i].toJS(): n.fn[t.dbtypeid]?(r+="(new "+t.dbtypeid+"(", r+=o[i].toJS(), r+="))"): r+=o[i].toJS();
                h.push(r)
            }
            ):s=ht(o);
            r.tables[i].defaultfns&&h.unshift(r.tables[i].defaultfns);
            u+=s?"a="+s+";":"a={"+h.join(",")+"};";
            r.tables[i].isclass&&(u+="var db=alasql.databases['"+t+"'];", u+='a.$class="'+i+'";', u+="a.$id=db.counter++;", u+="db.objects[a.$id]=a;");
            r.tables[i].insert?(u+="var db=alasql.databases['"+t+"'];", u+="db.tables['"+i+"'].insert(a,"+(e.orreplace?"true":"false")+");"):u+="aa.push(a);"
        }
        ),
        l=c+u,
        r.tables[i].insert||(u+="alasql.databases['"+t+"'].tables['"+i+"'].data=alasql.databases['"+t+"'].tables['"+i+"'].data.concat(aa);"),
        u+=r.tables[i].insert?r.tables[i].isclass?"return a.$id;":"return "+e.values.length:"return "+e.values.length,
        o=new Function("db, params, alasql",
        "var y;"+c+u).bind(this);
        else if(this.select) {
            if(this.select.modifier="RECORDSET",
            h=this.select.compile(t),
            r.engineid&&n.engines[r.engineid].intoTable)return function(t,
            u) {
                var f=h(t);
                return n.engines[r.engineid].intoTable(r.databaseid,
                i,
                f.data,
                null,
                u)
            }
            ;
            var y="return alasql.utils.extend(r,{"+f.defaultfns+"})",
            p=new Function("r,db,params,alasql",
            y),
            o=function(n,
            t,
            r) {
                var u=h(t).data,
                f,
                s,
                o;
                if(n.tables[i].insert)for(f=0,
                s=u.length;
                f<s;
                f++)o=g(u[f]),
                p(o,
                n,
                t,
                r),
                n.tables[i].insert(o,
                e.orreplace);
                else n.tables[i].data=n.tables[i].data.concat(u);
                if(!r.options.nocount)return u.length
            }
        }
        else if(this["default"])v="db.tables['"+i+"'].data.push({"+f.defaultfns+"});return 1;",
        o=new Function("db,params,alasql",
        v);
        else throw new Error("Wrong INSERT parameters");
        return r.engineid&&n.engines[r.engineid].intoTable&&n.options.autocommit?function(t,
        u) {
            var f=new Function("db,params",
            "var y;"+l+"return aa;")(r,
            t);
            return n.engines[r.engineid].intoTable(r.databaseid,
            i,
            f,
            null,
            u)
        }
        :function(r,
        u) {
            var f=n.databases[t],
            e;
            return n.options.autocommit&&f.engineid&&n.engines[f.engineid].loadTableData(t,
            i),
            e=o(f,
            r,
            n),
            n.options.autocommit&&f.engineid&&n.engines[f.engineid].saveTableData(t,
            i),
            n.options.nocount&&(e=undefined),
            u&&u(e),
            e
        }
    }
    ,
    t.Insert.prototype.execute=function(n,
    t,
    i) {
        return this.compile(n)(t,
        i)
    }
    ,
    t.CreateTrigger=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.CreateTrigger.prototype.toString=function() {
        var n="CREATE TRIGGER "+this.trigger+" ";
        return this.when&&(n+=this.when+" "),
        n+=this.action+" ON ",
        this.table.databaseid&&(n+=this.table.databaseid+"."),
        n+=this.table.tableid+" ",
        n+this.statement.toString()
    }
    ,
    t.CreateTrigger.prototype.execute=function(t,
    i,
    r) {
        var s=1,
        f=this.trigger;
        t=this.table.databaseid||t;
        var e=n.databases[t],
        o=this.table.tableid,
        u= {
            action: this.action, when: this.when, statement: this.statement, funcid: this.funcid
        }
        ;
        return e.triggers[f]=u,
        u.action=="INSERT"&&u.when=="BEFORE"?e.tables[o].beforeinsert[f]=u:u.action=="INSERT"&&u.when=="AFTER"?e.tables[o].afterinsert[f]=u:u.action=="INSERT"&&u.when=="INSTEADOF"?e.tables[o].insteadofinsert[f]=u:u.action=="DELETE"&&u.when=="BEFORE"?e.tables[o].beforedelete[f]=u:u.action=="DELETE"&&u.when=="AFTER"?e.tables[o].afterdelete[f]=u:u.action=="DELETE"&&u.when=="INSTEADOF"?e.tables[o].insteadofdelete[f]=u:u.action=="UPDATE"&&u.when=="BEFORE"?e.tables[o].beforeupdate[f]=u:u.action=="UPDATE"&&u.when=="AFTER"?e.tables[o].afterupdate[f]=u:u.action=="UPDATE"&&u.when=="INSTEADOF"&&(e.tables[o].insteadofupdate[f]=u),
        r&&(s=r(s)),
        s
    }
    ,
    t.DropTrigger=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.DropTrigger.prototype.toString=function() {
        return"DROP TRIGGER "+this.trigger
    }
    ,
    t.DropTrigger.prototype.execute=function(t,
    i,
    r) {
        var o=0,
        u=n.databases[t],
        f=this.trigger,
        e=u.triggers[f];
        if(e)o=1,
        delete u.tables[e].beforeinsert[f],
        delete u.tables[e].afterinsert[f],
        delete u.tables[e].insteadofinsert[f],
        delete u.tables[e].beforedelte[f],
        delete u.tables[e].afterdelete[f],
        delete u.tables[e].insteadofdelete[f],
        delete u.tables[e].beforeupdate[f],
        delete u.tables[e].afterupdate[f],
        delete u.tables[e].insteadofupdate[f],
        delete u.triggers[f];
        else throw new Error("Trigger not found");
        return r&&(o=r(o)),
        o
    }
    ,
    t.Delete=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Delete.prototype.toString=function() {
        var n="DELETE FROM "+this.table.toString();
        return this.where&&(n+=" WHERE "+this.where.toString()),
        n
    }
    ,
    t.Delete.prototype.compile=function(t) {
        var r,
        u,
        i,
        f;
        return t=this.table.databaseid||t,
        r=this.table.tableid,
        i=n.databases[t],
        this.where?(this.exists&&(this.existsfn=this.exists.map(function(n) {
            var i=n.compile(t);
            return i.query.modifier="RECORDSET", i
        }
        )),
        this.queries&&(this.queriesfn=this.queries.map(function(n) {
            var i=n.compile(t);
            return i.query.modifier="RECORDSET", i
        }
        )),
        f=new Function("r,params,alasql", "var y;return ("+this.where.toJS("r", "")+")").bind(this),
        u=function(u, e) {
            var s,
            a,
            v,
            h,
            c;
            if(i.engineid&&n.engines[i.engineid].deleteFromTable)return n.engines[i.engineid].deleteFromTable(t, r, f, u, e);
            n.options.autocommit&&i.engineid&&i.engineid=="LOCALSTORAGE"&&n.engines[i.engineid].loadTableData(t, r);
            var o=i.tables[r],
            y=o.data.length,
            l=[];
            for(s=0, a=o.data.length;
            s<a;
            s++)f(o.data[s], u, n)?o["delete"]&&o["delete"](s, u, n): l.push(o.data[s]);
            o.data=l;
            for(v in o.afterdelete)h=o.afterdelete[v],
            h&&(h.funcid?n.fn[h.funcid](): h.statement&&h.statement.execute(t));
            return c=y-o.data.length,
            n.options.autocommit&&i.engineid&&i.engineid=="LOCALSTORAGE"&&n.engines[i.engineid].saveTableData(t, r),
            e&&e(c),
            c
        }
        ):u=function(u,
        f) {
            var s,
            o,
            e;
            n.options.autocommit&&i.engineid&&n.engines[i.engineid].loadTableData(t,
            r);
            s=i.tables[r];
            s.dirty=!0;
            o=i.tables[r].data.length;
            i.tables[r].data.length=0;
            for(e in i.tables[r].uniqs)i.tables[r].uniqs[e]= {}
            ;
            for(e in i.tables[r].indices)i.tables[r].indices[e]= {}
            ;
            return n.options.autocommit&&i.engineid&&n.engines[i.engineid].saveTableData(t,
            r),
            f&&f(o),
            o
        }
        ,
        u
    }
    ,
    t.Delete.prototype.execute=function(n,
    t,
    i) {
        return this.compile(n)(t,
        i)
    }
    ,
    t.Update=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Update.prototype.toString=function() {
        var n="UPDATE "+this.table.toString();
        return this.columns&&(n+=" SET "+this.columns.toString()),
        this.where&&(n+=" WHERE "+this.where.toString()),
        n
    }
    ,
    t.SetColumn=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.SetColumn.prototype.toString=function() {
        return this.column.toString()+"="+this.expression.toString()
    }
    ,
    t.Update.prototype.compile=function(t) {
        var i,
        r,
        u,
        f,
        e;
        return t=this.table.databaseid||t,
        i=this.table.tableid,
        this.where&&(this.exists&&(this.existsfn=this.exists.map(function(n) {
            var i=n.compile(t);
            return i.query.modifier="RECORDSET", i
        }
        )),
        this.queries&&(this.queriesfn=this.queries.map(function(n) {
            var i=n.compile(t);
            return i.query.modifier="RECORDSET", i
        }
        )),
        r=new Function("r,params,alasql", "var y;return "+this.where.toJS("r", "")).bind(this)),
        u=n.databases[t].tables[i].onupdatefns||"",
        u+=";",
        this.columns.forEach(function(n) {
            u+="r['"+n.column.columnid+"']="+n.expression.toJS("r", "")+";"
        }
        ),
        f=new Function("r,params,alasql",
        "var y;"+u),
        e=function(u,
        e) {
            var o=n.databases[t],
            s,
            c,
            h,
            l;
            if(o.engineid&&n.engines[o.engineid].updateTable)return n.engines[o.engineid].updateTable(t,
            i,
            f,
            r,
            u,
            e);
            if(n.options.autocommit&&o.engineid&&n.engines[o.engineid].loadTableData(t, i),
            s=o.tables[i],
            !s)throw new Error("Table '"+i+"' not exists");
            for(c=0,
            h=0,
            l=s.data.length;
            h<l;
            h++)(!r||r(s.data[h], u, n))&&(s.update?s.update(f, h, u): f(s.data[h], u, n), c++);
            return n.options.autocommit&&o.engineid&&n.engines[o.engineid].saveTableData(t,
            i),
            e&&e(c),
            c
        }
        ,
        e
    }
    ,
    t.Update.prototype.execute=function(n,
    t,
    i) {
        return this.compile(n)(t,
        i)
    }
    ,
    t.Merge=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Merge.prototype.toString=function() {
        var n="MERGE ";
        return n+=this.into.tableid+" ",
        this.into.as&&(n+="AS "+this.into.as+" "),
        n+="USING "+this.using.tableid+" ",
        this.using.as&&(n+="AS "+this.using.as+" "),
        n+="ON "+this.on.toString()+" ",
        this.matches.forEach(function(t) {
            n+="WHEN ";
            t.matched||(n+="NOT ");
            n+="MATCHED ";
            t.bytarget&&(n+="BY TARGET ");
            t.bysource&&(n+="BY SOURCE ");
            t.expr&&(n+="AND "+t.expr.toString()+" ");
            n+="THEN ";
            t.action["delete"]&&(n+="DELETE ");
            t.action.insert&&(n+="INSERT ", t.action.columns&&(n+="("+t.action.columns.toString()+") "), t.action.values&&(n+="VALUES ("+t.action.values.toString()+") "), t.action.defaultvalues&&(n+="DEFAULT VALUES "));
            t.action.update&&(n+="UPDATE ", n+=t.action.update.map(function(n) {
                return n.toString()
            }
            ).join(",")+" ")
        }
        ),
        n
    }
    ,
    t.Merge.prototype.execute=function(n,
    t,
    i) {
        var r=1;
        return i&&(r=i(r)),
        r
    }
    ,
    t.CreateDatabase=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.CreateDatabase.prototype.toString=function() {
        var n="CREATE";
        return this.engineid&&(n+=" "+this.engineid),
        n+=" DATABASE",
        this.ifnotexists&&(n+=" IF NOT EXISTS"),
        n+=" "+this.databaseid,
        this.args&&this.args.length>0&&(n+="("+this.args.map(function(n) {
            return n.toString()
        }
        ).join(", ")+")"),
        this.as&&(n+=" AS "+this.as),
        n
    }
    ,
    t.CreateDatabase.prototype.execute=function(t,
    i,
    r) {
        var e,
        f,
        o,
        u;
        if(this.args&&this.args.length>0&&(e=this.args.map(function(t) {
            return new Function("params,alasql", "var y;return "+t.toJS())(i, n)
        }
        )),
        this.engineid)return n.engines[this.engineid].createDatabase(this.databaseid,
        this.args,
        this.ifnotexists,
        this.as,
        r);
        if(f=this.databaseid,
        n.databases[f])throw new Error("Database '"+f+"' already exists");
        return(o=new n.Database(f),
        u=1,
        r)?r(u):u
    }
    ,
    t.AttachDatabase=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.AttachDatabase.prototype.toString=function() {
        var n="ATTACH";
        return this.engineid&&(n+=" "+this.engineid),
        n+=" DATABASE "+this.databaseid,
        args&&(n+="(",
        args.length>0&&(n+=args.map(function(n) {
            return n.toString()
        }
        ).join(", ")),
        n+=")"),
        this.as&&(n+=" AS "+this.as),
        n
    }
    ,
    t.AttachDatabase.prototype.execute=function(t,
    i,
    r) {
        if(!n.engines[this.engineid])throw new Error('Engine "'+this.engineid+'" is not defined.');
        return n.engines[this.engineid].attachDatabase(this.databaseid,
        this.as,
        this.args,
        i,
        r)
    }
    ,
    t.DetachDatabase=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.DetachDatabase.prototype.toString=function() {
        return"DETACH DATABASE "+this.databaseid
    }
    ,
    t.DetachDatabase.prototype.execute=function(t,
    i,
    r) {
        if(!n.databases[this.databaseid].engineid)throw new Error('Cannot detach database "'+this.engineid+'", because it was not attached.');
        var f,
        u=this.databaseid;
        if(u==n.DEFAULTDATABASEID)throw new Error("Drop of default database is prohibited");
        if(n.databases[u])delete n.databases[u],
        u==n.useid&&n.use(),
        f=1;
        else if(this.ifexists)f=0;
        else throw new Error("Database '"+u+"' does not exist");
        return r&&r(f),
        f
    }
    ,
    t.UseDatabase=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.UseDatabase.prototype.toString=function() {
        return"USE DATABASE "+this.databaseid
    }
    ,
    t.UseDatabase.prototype.execute=function(t,
    i,
    r) {
        var u=this.databaseid,
        f;
        if(!n.databases[u])throw new Error("Database '"+u+"' does not exist");
        return n.use(u),
        f=1,
        r&&r(f),
        f
    }
    ,
    t.DropDatabase=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.DropDatabase.prototype.toString=function() {
        var n="DROP";
        return this.ifexists&&(n+=" IF EXISTS"),
        n+(" DATABASE "+this.databaseid)
    }
    ,
    t.DropDatabase.prototype.execute=function(t,
    i,
    r) {
        if(this.engineid)return n.engines[this.engineid].dropDatabase(this.databaseid,
        this.ifexists,
        r);
        var f,
        u=this.databaseid;
        if(u==n.DEFAULTDATABASEID)throw new Error("Drop of default database is prohibited");
        if(n.databases[u]) {
            if(n.databases[u].engineid)throw new Error("Cannot drop database '"+u+"', because it is attached. Detach it.");
            delete n.databases[u];
            u==n.useid&&n.use();
            f=1
        }
        else if(this.ifexists)f=0;
        else throw new Error("Database '"+u+"' does not exist");
        return r&&r(f),
        f
    }
    ,
    t.Declare=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Declare.prototype.toString=function() {
        var n="DECLARE ";
        return this.declares&&this.declares.length>0&&(n=this.declares.map(function(n) {
            var t="";
            return t+="@"+n.variable+" ", t+=n.dbtypeid, this.dbsize&&(t+="("+this.dbsize, this.dbprecision&&(t+=","+this.dbprecision), t+=")"), n.expression&&(t+=" = "+n.expression.toString()), t
        }
        ).join(",")),
        n
    }
    ,
    t.Declare.prototype.execute=function(t,
    i,
    r) {
        var u=1;
        return this.declares&&this.declares.length>0&&this.declares.map(function(t) {
            var r=t.dbtypeid;
            n.fn[r]||(r=r.toUpperCase());
            n.declares[t.variable]= {
                dbtypeid: r, dbsize: t.dbsize, dbprecision: t.dbprecision
            }
            ;
            t.expression&&(n.vars[t.variable]=new Function("params,alasql", "return "+t.expression.toJS("({})", "", null))(i, n), n.declares[t.variable]&&(n.vars[t.variable]=n.stdfn.CONVERT(n.vars[t.variable], n.declares[t.variable])))
        }
        ),
        r&&(u=r(u)),
        u
    }
    ,
    t.ShowDatabases=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.ShowDatabases.prototype.toString=function() {
        var n="SHOW DATABASES";
        return this.like&&(n+="LIKE "+this.like.toString()),
        n
    }
    ,
    t.ShowDatabases.prototype.execute=function(t,
    i,
    r) {
        if(this.engineid)return n.engines[this.engineid].showDatabases(this.like,
        r);
        var f=this,
        u=[];
        for(dbid in n.databases)u.push( {
            databaseid: dbid
        }
        );
        return f.like&&u&&u.length>0&&(u=u.filter(function(t) {
            return n.utils.like(f.like.value, t.databaseid)
        }
        )),
        r&&r(u),
        u
    }
    ,
    t.ShowTables=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.ShowTables.prototype.toString=function() {
        var n="SHOW TABLES";
        return this.databaseid&&(n+=" FROM "+this.databaseid),
        this.like&&(n+=" LIKE "+this.like.toString()),
        n
    }
    ,
    t.ShowTables.prototype.execute=function(t,
    i,
    r) {
        var e=n.databases[this.databaseid||t],
        f=this,
        u=[];
        for(tableid in e.tables)u.push( {
            tableid: tableid
        }
        );
        return f.like&&u&&u.length>0&&(u=u.filter(function(t) {
            return n.utils.like(f.like.value, t.tableid)
        }
        )),
        r&&r(u),
        u
    }
    ,
    t.ShowColumns=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.ShowColumns.prototype.toString=function() {
        var n="SHOW COLUMNS";
        return this.table.tableid&&(n+=" FROM "+this.table.tableid),
        this.databaseid&&(n+=" FROM "+this.databaseid),
        n
    }
    ,
    t.ShowColumns.prototype.execute=function(t,
    i,
    r) {
        var e=n.databases[this.databaseid||t],
        u=e.tables[this.table.tableid],
        f;
        return u&&u.columns?(f=u.columns.map(function(n) {
            return {
                columnid: n.columnid, dbtypeid: n.dbtypeid, dbsize: n.dbsize
            }
        }
        ),
        r&&r(f),
        f):(r&&r([]),
        [])
    }
    ,
    t.ShowIndex=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.ShowIndex.prototype.toString=function() {
        var n="SHOW INDEX";
        return this.table.tableid&&(n+=" FROM "+this.table.tableid),
        this.databaseid&&(n+=" FROM "+this.databaseid),
        n
    }
    ,
    t.ShowIndex.prototype.execute=function(t,
    i,
    r) {
        var o=n.databases[this.databaseid||t],
        u=o.tables[this.table.tableid],
        f=[],
        e;
        if(u&&u.indices)for(e in u.indices)f.push( {
            hh: e, len: Object.keys(u.indices[e]).length
        }
        );
        return r&&r(f),
        f
    }
    ,
    t.ShowCreateTable=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.ShowCreateTable.prototype.toString=function() {
        var n="SHOW CREATE TABLE "+this.table.tableid;
        return this.databaseid&&(n+=" FROM "+this.databaseid),
        n
    }
    ,
    t.ShowCreateTable.prototype.execute=function(t) {
        var f=n.databases[this.databaseid||t],
        i=f.tables[this.table.tableid],
        r,
        u;
        if(i)return r="CREATE TABLE "+this.table.tableid+" (",
        u=[],
        i.columns&&(i.columns.forEach(function(n) {
            var t=n.columnid+" "+n.dbtypeid;
            n.dbsize&&(t+="("+n.dbsize+")");
            n.primarykey&&(t+=" PRIMARY KEY");
            u.push(t)
        }
        ),
        r+=u.join(", ")),
        r+")";
        throw new Error('There is no such table "'+this.table.tableid+'"');
    }
    ,
    t.SetVariable=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.SetVariable.prototype.toString=function() {
        var n="SET ";
        return typeof this.value!="undefined"&&(n+=this.variable.toUpperCase()+" "+(this.value?"ON": "OFF")), this.expression&&(n+=this.method+this.variable+" = "+this.expression.toString()), n
    }
    ,
    t.SetVariable.prototype.execute=function(t,
    i,
    r) {
        var f,
        e,
        u;
        return typeof this.value!="undefined"?(f=this.value,
        f=="ON"?f=!0: f=="OFF"&&(f=!1), n.options[this.variable]=f):this.expression&&(this.exists&&(this.existsfn=this.exists.map(function(n) {
            var i=n.compile(t);
            return i.query&&!i.query.modifier&&(i.query.modifier="RECORDSET"), i
        }
        )),
        this.queries&&(this.queriesfn=this.queries.map(function(n) {
            var i=n.compile(t);
            return i.query&&!i.query.modifier&&(i.query.modifier="RECORDSET"), i
        }
        )),
        u=new Function("params,alasql", "return "+this.expression.toJS("({})", "", null)).bind(this)(i, n),
        n.declares[this.variable]&&(u=n.stdfn.CONVERT(u, n.declares[this.variable])),
        this.props&&this.props.length>0?(e=this.method=="@"?"alasql.vars['"+this.variable+"']":"params['"+this.variable+"']", e+=this.props.map(function(n) {
            return typeof n=="string"?"['"+n+"']": typeof n=="number"?"["+n+"]": "["+n.toJS()+"]"
        }
        ).join(), new Function("value,params,alasql", "var y;"+e+"=value")(u, i, n)):this.method=="@"?n.vars[this.variable]=u:i[this.variable]=u),
        u=1,
        r&&(u=r(u)),
        u
    }
    ,
    n.test=function(t,
    i,
    r) {
        var u,
        f;
        if(arguments.length===0) {
            n.log(n.con.results);
            return
        }
        if(arguments.length===1) {
            u=Date.now();
            r();
            n.con.log(Date.now()-u);
            return
        }
        for(arguments.length===2&&(r=i, i=1),
        u=Date.now(),
        f=0;
        f<i;
        f++)r();
        n.con.results[t]=Date.now()-u
    }
    ,
    n.log=function(t,
    r) {
        var c=n.useid,
        e=n.options.logtarget,
        u,
        s,
        f,
        o,
        h;
        if(i.isNode&&(e="console"),
        u=typeof t=="string"?n(t, r): t, e==="console"||i.isNode)typeof t=="string"&&n.options.logprompt&&console.log(c+">", t), Array.isArray(u)?console.table?console.table(u): console.log(p(u)): console.log(p(u));
        else {
            if(s=e==="output"?document.getElementsByTagName("output")[0]: typeof e=="string"?document.getElementById(e): e, f="", typeof t=="string"&&n.options.logprompt&&(f+="<pre><code>"+n.pretty(t)+"<\/code><\/pre>"), Array.isArray(u))if(u.length===0)f+="<p>[ ]<\/p>";
            else if(typeof u[0]!="object"||Array.isArray(u[0]))for(o=0,
            h=u.length;
            o<h;
            o++)f+="<p>"+gt(u[o])+"<\/p>";
            else f+=gt(u);
            else f+=gt(u);
            s.innerHTML+=f
        }
    }
    ,
    n.clear=function() {
        var t=n.options.logtarget,
        r;
        i.isNode||i.isMeteorServer?console.clear&&console.clear(): (r=t==="output"?document.getElementsByTagName("output")[0]: typeof t=="string"?document.getElementById(t): t, r.innerHTML="")
    }
    ,
    n.write=function(t) {
        var r=n.options.logtarget,
        u;
        i.isNode||i.isMeteorServer?console.log&&console.log(t): (u=r==="output"?document.getElementsByTagName("output")[0]: typeof r=="string"?document.getElementById(r): r, u.innerHTML+=t)
    }
    ,
    n.prompt=function(t,
    r,
    u) {
        var f,
        e,
        o;
        if(i.isNode)throw new Error("The prompt not realized for Node.js");
        if(f=0,
        typeof t=="string"&&(t=document.getElementById(t)),
        typeof r=="string"&&(r=document.getElementById(r)),
        r.textContent=n.useid,
        u) {
            n.prompthistory.push(u);
            f=n.prompthistory.length;
            try {
                e=Date.now();
                n.log(u);
                n.write('<p style="color:blue">'+(Date.now()-e)+" ms<\/p>")
            }
            catch(s) {
                n.write("<p>"+olduseid+"&gt;&nbsp;<b>"+sql+"<\/b><\/p>");
                n.write('<p style="color:red">'+s+"<p>")
            }
        }
        o=t.getBoundingClientRect().top+document.getElementsByTagName("body")[0].scrollTop;
        ni(document.getElementsByTagName("body")[0],
        o,
        500);
        t.onkeydown=function(i) {
            var u,
            e,
            o,
            s;
            if(i.which===13) {
                u=t.value;
                e=n.useid;
                t.value="";
                n.prompthistory.push(u);
                f=n.prompthistory.length;
                try {
                    o=Date.now();
                    n.log(u);
                    n.write('<p style="color:blue">'+(Date.now()-o)+" ms<\/p>")
                }
                catch(h) {
                    n.write("<p>"+e+"&gt;&nbsp;"+n.pretty(u, !1)+"<\/p>");
                    n.write('<p style="color:red">'+h+"<p>")
                }
                t.focus();
                r.textContent=n.useid;
                s=t.getBoundingClientRect().top+document.getElementsByTagName("body")[0].scrollTop;
                ni(document.getElementsByTagName("body")[0],
                s,
                500)
            }
            else i.which===38?(f--,
            f<0&&(f=0),
            n.prompthistory[f]&&(t.value=n.prompthistory[f], i.preventDefault())):i.which===40&&(f++,
            f>=n.prompthistory.length?(f=n.prompthistory.length, t.value=""):n.prompthistory[f]&&(t.value=n.prompthistory[f], i.preventDefault()))
        }
    }
    ,
    t.BeginTransaction=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.BeginTransaction.prototype.toString=function() {
        return"BEGIN TRANSACTION"
    }
    ,
    t.BeginTransaction.prototype.execute=function(t,
    i,
    r) {
        var u=1;
        return n.databases[t].engineid?n.engines[n.databases[n.useid].engineid].begin(t,
        r): (r&&r(u), u)
    }
    ,
    t.CommitTransaction=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.CommitTransaction.prototype.toString=function() {
        return"COMMIT TRANSACTION"
    }
    ,
    t.CommitTransaction.prototype.execute=function(t,
    i,
    r) {
        var u=1;
        return n.databases[t].engineid?n.engines[n.databases[n.useid].engineid].commit(t,
        r): (r&&r(u), u)
    }
    ,
    t.RollbackTransaction=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.RollbackTransaction.prototype.toString=function() {
        return"ROLLBACK TRANSACTION"
    }
    ,
    t.RollbackTransaction.prototype.execute=function(t,
    i,
    r) {
        var u=1;
        return n.databases[t].engineid?n.engines[n.databases[t].engineid].rollback(t,
        r): (r&&r(u), u)
    }
    ,
    n.options.tsql&&(n.stdfn.OBJECT_ID=function(t, i) {
        var e,
        u;
        typeof i=="undefined"&&(i="T");
        i=i.toUpperCase();
        var f=t.split("."),
        r=n.useid,
        o=f[0];
        f.length==2&&(r=f[0], o=f[1]);
        e=n.databases[r].tables;
        r=n.databases[r].databaseid;
        for(u in e)if(u==o)return e[u].view&&i=="V"?r+"."+u: !e[u].view&&i=="T"?r+"."+u: undefined;
        return undefined
    }
    ),
    n.options.mysql,
    (n.options.mysql||n.options.sqlite)&&(n.from.INFORMATION_SCHEMA=function(t, i, r, u, f) {
        var e,
        h,
        o,
        s;
        if(t=="VIEWS"||t=="TABLES") {
            e=[];
            for(h in n.databases) {
                o=n.databases[h].tables;
                for(s in o)(o[s].view&&t=="VIEWS"||!o[s].view&&t=="TABLES")&&e.push( {
                    TABLE_CATALOG: h, TABLE_NAME: s
                }
                )
            }
            return r&&(e=r(e, u, f)),
            e
        }
        throw new Error("Unknown INFORMATION_SCHEMA table");
    }
    ),
    n.options.postgres,
    n.options.oracle,
    n.options.sqlite,
    n.into.SQL=function(t,
    i,
    r,
    u,
    f) {
        var o,
        h,
        e,
        s,
        c;
        if(typeof t=="object"&&(i=t, t=undefined),
        h= {}
        ,
        n.utils.extend(h, i),
        typeof h.tableid=="undefined")throw new Error("Table for INSERT TO is not defined.");
        for(e="",
        u.length===0&&typeof r[0]=="object"&&(u=Object.keys(r[0]).map(function(n) {
            return {
                columnid: n
            }
        }
        )),
        s=0,
        c=r.length;
        s<c;
        s++)e+="INSERT INTO "+i.tableid+"(",
        e+=u.map(function(n) {
            return n.columnid
        }
        ).join(","),
        e+=") VALUES (",
        e+=u.map(function(n) {
            var t=r[s][n.columnid];
            return n.typeid?(n.typeid==="STRING"||n.typeid==="VARCHAR"||n.typeid==="NVARCHAR"||n.typeid==="CHAR"||n.typeid==="NCHAR")&&(t="'"+ri(t)+"'"): typeof t=="string"&&(t="'"+ri(t)+"'"), t
        }
        ),
        e+=");\n";
        return t=n.utils.autoExtFilename(t,
        "sql",
        i),
        o=n.utils.saveFile(t,
        e),
        f&&(o=f(o)),
        o
    }
    ,
    n.into.HTML=function(t,
    i,
    r,
    u,
    f) {
        var a=1,
        v,
        h,
        c,
        y,
        p,
        l,
        o,
        e,
        s;
        if(typeof exports!="object") {
            if(v= {
                headers: !0
            }
            ,
            n.utils.extend(v, i),
            h=document.querySelector(t),
            !h)throw new Error("Selected HTML element is not found");
            if(u.length===0&&typeof r[0]=="object"&&(u=Object.keys(r[0]).map(function(n) {
                return {
                    columnid: n
                }
            }
            )),
            c=document.createElement("table"),
            y=document.createElement("thead"),
            c.appendChild(y),
            v.headers) {
                for(o=document.createElement("tr"),
                e=0;
                e<u.length;
                e++)s=document.createElement("th"),
                s.textContent=u[e].columnid,
                o.appendChild(s);
                y.appendChild(o)
            }
            for(p=document.createElement("tbody"),
            c.appendChild(p),
            l=0;
            l<r.length;
            l++) {
                for(o=document.createElement("tr"),
                e=0;
                e<u.length;
                e++)s=document.createElement("td"),
                s.textContent=r[l][u[e].columnid],
                o.appendChild(s);
                p.appendChild(o)
            }
            n.utils.domEmptyChildren(h);
            h.appendChild(c)
        }
        return f&&(a=f(a)),
        a
    }
    ,
    n.into.JSON=function(t,
    i,
    r,
    u,
    f) {
        var e=1,
        o;
        return typeof t=="object"&&(i=t,
        t=undefined),
        o=JSON.stringify(r),
        t=n.utils.autoExtFilename(t,
        "json",
        i),
        e=n.utils.saveFile(t,
        o),
        f&&(e=f(e)),
        e
    }
    ,
    n.into.TXT=function(t,
    i,
    r,
    u,
    f) {
        var e,
        o,
        s;
        return u.length===0&&r.length>0&&(u=Object.keys(r[0]).map(function(n) {
            return {
                columnid: n
            }
        }
        )),
        typeof t=="object"&&(i=t,
        t=undefined),
        e=r.length,
        o="",
        r.length>0&&(s=u[0].columnid,
        o+=r.map(function(n) {
            return n[s]
        }
        ).join("\n")),
        t=n.utils.autoExtFilename(t,
        "txt",
        i),
        e=n.utils.saveFile(t,
        o),
        f&&(e=f(e)),
        e
    }
    ,
    n.into.TAB=n.into.TSV=function(t,
    i,
    r,
    u,
    f) {
        var e= {}
        ;
        return n.utils.extend(e,
        i),
        e.separator="\t",
        t=n.utils.autoExtFilename(t,
        "tab",
        i),
        e.autoExt=!1,
        n.into.CSV(t,
        e,
        r,
        u,
        f)
    }
    ,
    n.into.CSV=function(t,
    i,
    r,
    u,
    f) {
        var e,
        o,
        s;
        return u.length===0&&r.length>0&&(u=Object.keys(r[0]).map(function(n) {
            return {
                columnid: n
            }
        }
        )),
        typeof t=="object"&&(i=t,
        t=undefined),
        e= {
            headers: !0
        }
        ,
        e.separator=";",
        e.quote='"',
        e.utf8Bom=!0,
        i&&!i.headers&&typeof i.headers!="undefined"&&(e.utf8Bom=!1),
        n.utils.extend(e,
        i),
        o=r.length,
        s=e.utf8Bom?"﻿":"",
        e.headers&&(s+=e.quote+u.map(function(n) {
            return n.columnid.trim()
        }
        ).join(e.quote+e.separator+e.quote)+e.quote+"\r\n"),
        r.forEach(function(n) {
            s+=u.map(function(t) {
                var i=n[t.columnid];
                return e.quote!==""&&(i=(i+"").replace(new RegExp("\\"+e.quote, "g"), e.quote+e.quote)), +i!=i&&(i=e.quote+i+e.quote), i
            }
            ).join(e.separator)+"\r\n"
        }
        ),
        t=n.utils.autoExtFilename(t,
        "csv",
        i),
        o=n.utils.saveFile(t,
        s,
        null,
        {
            disableAutoBom: !0
        }
        ),
        f&&(o=f(o)),
        o
    }
    ,
    n.into.XLS=function(t,
    i,
    r,
    u,
    f) {
        function l() {
            var n='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" \t\txmlns="http://www.w3.org/TR/REC-html40"><head> \t\t<meta charset="utf-8" /> \t\t<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets> ',
            t;
            return n+=" <x:ExcelWorksheet><x:Name>"+o.sheetid+"<\/x:Name><x:WorksheetOptions><x:DisplayGridlines/>     <\/x:WorksheetOptions> \t\t<\/x:ExcelWorksheet>",
            n+="<\/x:ExcelWorksheets><\/x:ExcelWorkbook><\/xml><![endif]--><\/head>",
            n+="<body",
            typeof o.style!="undefined"&&(n+=' style="',
            n+=typeof o.style=="function"?o.style(o): o.style, n+='"'), n+=">", n+="<table>", typeof o.caption!="undefined"&&(t=o.caption, typeof t=="string"&&(t= {
                title: t
            }
            ),
            n+="<caption",
            typeof t.style!="undefined"&&(n+=' style="', n+=typeof t.style=="function"?t.style(o, t):t.style, n+='" '),
            n+=">",
            n+=t.title,
            n+="<\/caption>"),
            typeof o.columns!="undefined"?u=o.columns:u.length==0&&r.length>0&&typeof r[0]=="object"&&(u=Array.isArray(r[0])?r[0].map(function(n, t) {
                return {
                    columnid: t
                }
            }
            ):Object.keys(r[0]).map(function(n) {
                return {
                    columnid: n
                }
            }
            )),
            u.forEach(function(n, t) {
                typeof o.column!="undefined"&&e(n, o.column);
                typeof n.width=="undefined"&&(n.width=o.column&&o.column.width!="undefined"?o.column.width: "120px");
                typeof n.width=="number"&&(n.width=n.width+"px");
                typeof n.columnid=="undefined"&&(n.columnid=t);
                typeof n.title=="undefined"&&(n.title=""+n.columnid.trim());
                o.headers&&Array.isArray(o.headers)&&(n.title=o.headers[t])
            }
            ),
            n+="<colgroups>",
            u.forEach(function(t) {
                n+='<col style="width: '+t.width+'"><\/col>'
            }
            ),
            n+="<\/colgroups>",
            o.headers&&(n+="<thead>",
            n+="<tr>",
            u.forEach(function(t, i) {
                n+="<th ";
                typeof t.style!="undefined"&&(n+=' style="', n+=typeof t.style=="function"?t.style(o, t, i): t.style, n+='" ');
                n+=">";
                typeof t.title!="undefined"&&(n+=typeof t.title=="function"?t.title(o, t, i): t.title);
                n+="<\/th>"
            }
            ),
            n+="<\/tr>",
            n+="<\/thead>"),
            n+="<tbody>",
            r&&r.length>0&&r.forEach(function(t, r) {
                if(!(r>o.limit)) {
                    n+="<tr";
                    var f= {}
                    ;
                    e(f, o.row);
                    o.rows&&o.rows[r]&&e(f, o.rows[r]);
                    typeof f!="undefined"&&typeof f.style!="undefined"&&(n+=' style="', n+=typeof f.style=="function"?f.style(o, t, r): f.style, n+='" ');
                    n+=">";
                    u.forEach(function(u, s) {
                        var l= {}
                        , c, h, a, v;
                        if(e(l, o.cell), e(l, f.cell), typeof o.column!="undefined"&&e(l, o.column.cell), e(l, u.cell), o.cells&&o.cells[r]&&o.cells[r][s]&&e(l, o.cells[r][s]), c=t[u.columnid], typeof l.value=="function"&&(c=l.value(c, o, t, u, l, r, s)), h=l.typeid, typeof h=="function"&&(h=h(c, o, t, u, l, r, s)), typeof h=="undefined"&&(typeof c=="number"?h="number": typeof c=="string"?h="string": typeof c=="boolean"?h="boolean": typeof c=="object"&&c instanceof Date&&(h="date")), a="", h=="money"?a='mso-number-format:"\\#\\,\\#\\#0\\\\ _р_\\.";white-space:normal;': h=="number"?a=" ": h=="date"?a='mso-number-format:"Short Date";': i.types&&i.types[h]&&i.types[h].typestyle&&(a=i.types[h].typestyle), a=a||'mso-number-format:"\\@";', n+="<td style='"+a+"' ", typeof l.style!="undefined"&&(n+=' style="', n+=typeof l.style=="function"?l.style(c, o, t, u, r, s): l.style, n+='" '), n+=">", v=l.format, typeof c=="undefined")n+="";
                        else if(typeof v!="undefined")if(typeof v=="function")n+=v(c);
                        else if(typeof v=="string")n+=c;
                        else throw new Error("Unknown format type. Should be function or string");
                        else n+=h=="number"||h=="date"?c.toString(): h=="money"?(+c).toFixed(2): c;
                        n+="<\/td>"
                    }
                    );
                    n+="<\/tr>"
                }
            }
            ),
            n+="<\/tbody>",
            n+="<\/table>",
            n+="<\/body>",
            n+="<\/html>"
        }
        var s,
        o,
        c,
        h;
        return typeof t=="object"&&(i=t,
        t=undefined),
        s= {}
        ,
        i&&i.sheets&&(s=i.sheets),
        o= {
            headers: !0
        }
        ,
        typeof s.Sheet1!="undefined"?o=s[0]:typeof i!="undefined"&&(o=i),
        typeof o.sheetid=="undefined"&&(o.sheetid="Sheet1"),
        c=l(),
        t=n.utils.autoExtFilename(t,
        "xls",
        i),
        h=n.utils.saveFile(t,
        c),
        f&&(h=f(h)),
        h
    }
    ,
    n.into.XLSXML=function(t,
    i,
    r,
    u,
    f) {
        function h() {
            function c(n) {
                var t="",
                r,
                i,
                u;
                for(r in n) {
                    t+="<"+r;
                    for(i in n[r])t+=" ",
                    t+=i.substr(0,
                    2)=="x:"?i: "ss:", t+=i+'="'+n[r][i]+'"';
                    t+="/>"
                }
                return u=y(t),
                s[u]||(s[u]= {
                    styleid: h
                }
                ,
                f+='<Style ss:ID="s'+h+'">',
                f+=t,
                f+="<\/Style>",
                h++),
                "s"+s[u].styleid
            }
            var f="",
            t=" <\/Styles>",
            s= {}
            ,
            h=62,
            l,
            n;
            for(l in o)n=o[l],
            typeof n.columns!="undefined"?u=n.columns:u.length==0&&r.length>0&&typeof r[0]=="object"&&(u=Array.isArray(r[0])?r[0].map(function(n, t) {
                return {
                    columnid: t
                }
            }
            ):Object.keys(r[0]).map(function(n) {
                return {
                    columnid: n
                }
            }
            )),
            u.forEach(function(t, i) {
                typeof n.column!="undefined"&&e(t, n.column);
                typeof t.width=="undefined"&&(t.width=n.column&&typeof n.column.width!="undefined"?n.column.width: 120);
                typeof t.width=="number"&&(t.width=t.width);
                typeof t.columnid=="undefined"&&(t.columnid=i);
                typeof t.title=="undefined"&&(t.title=""+t.columnid.trim());
                n.headers&&Array.isArray(n.headers)&&(t.title=n.headers[idx])
            }
            ),
            t+='<Worksheet ss:Name="'+l+'"> \t  \t\t\t<Table ss:ExpandedColumnCount="'+u.length+'" ss:ExpandedRowCount="'+((n.headers?1:0)+Math.min(r.length, n.limit||r.length))+'" x:FullColumns="1" \t   \t\t\tx:FullRows="1" ss:DefaultColumnWidth="65" ss:DefaultRowHeight="15">',
            u.forEach(function(n, i) {
                t+='<Column ss:Index="'+(i+1)+'" ss:AutoFitWidth="0" ss:Width="'+n.width+'"/>'
            }
            ),
            n.headers&&(t+='<Row ss:AutoFitHeight="0">',
            u.forEach(function(i, r) {
                if(t+="<Cell ", typeof i.style!="undefined") {
                    var u= {}
                    ;
                    typeof i.style=="function"?e(u, i.style(n, i, r)): e(u, i.style);
                    t+='ss:StyleID="'+c(u)+'"'
                }
                t+='><Data ss:Type="String">';
                typeof i.title!="undefined"&&(t+=typeof i.title=="function"?i.title(n, i, r):i.title);
                t+="<\/Data><\/Cell>"
            }
            ),
            t+="<\/Row>"),
            r&&r.length>0&&r.forEach(function(r, f) {
                var o,
                s;
                f>n.limit||(o= {}
                , e(o, n.row), n.rows&&n.rows[f]&&e(o, n.rows[f]), t+="<Row ", typeof o!="undefined"&&(s= {}
                , typeof o.style!="undefined"&&(typeof o.style=="function"?e(s, o.style(n, r, f)): e(s, o.style), t+='ss:StyleID="'+c(s)+'"')), t+=">", u.forEach(function(u, s) {
                    var a= {}
                    , l, h, p, v, w, y;
                    if(e(a, n.cell), e(a, o.cell), typeof n.column!="undefined"&&e(a, n.column.cell), e(a, u.cell), n.cells&&n.cells[f]&&n.cells[f][s]&&e(a, n.cells[f][s]), l=r[u.columnid], typeof a.value=="function"&&(l=a.value(l, n, r, u, a, f, s)), h=a.typeid, typeof h=="function"&&(h=h(l, n, r, u, a, f, s)), typeof h=="undefined"&&(typeof l=="number"?h="number": typeof l=="string"?h="string": typeof l=="boolean"?h="boolean": typeof l=="object"&&l instanceof Date&&(h="date")), p="String", h=="number"?p="Number": h=="date"&&(p="Date"), v="", h=="money"?v='mso-number-format:"\\#\\,\\#\\#0\\\\ _р_\\.";white-space:normal;': h=="number"?v=" ": h=="date"?v='mso-number-format:"Short Date";': i.types&&i.types[h]&&i.types[h].typestyle&&(v=i.types[h].typestyle), v=v||'mso-number-format:"\\@";', t+="<Cell ", w= {}
                    , typeof a.style!="undefined"&&(typeof a.style=="function"?e(w, a.style(l, n, r, u, f, s)): e(w, a.style), t+='ss:StyleID="'+c(w)+'"'), t+=">", t+='<Data ss:Type="'+p+'">', y=a.format, typeof l=="undefined")t+="";
                    else if(typeof y!="undefined")if(typeof y=="function")t+=y(l);
                    else if(typeof y=="string")t+=l;
                    else throw new Error("Unknown format type. Should be function or string");
                    else t+=h=="number"||h=="date"?l.toString(): h=="money"?(+l).toFixed(2): l;
                    t+="<\/Data><\/Cell>"
                }
                ), t+="<\/Row>")
            }
            ),
            t+="<\/Table><\/Worksheet>";
            return t+="<\/Workbook>",
            '<?xml version="1.0"?> \t\t<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" \t\t xmlns:o="urn:schemas-microsoft-com:office:office" \t\t xmlns:x="urn:schemas-microsoft-com:office:excel" \t\t xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" \t\t xmlns:html="http://www.w3.org/TR/REC-html40"> \t\t <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"> \t\t <\/DocumentProperties> \t\t <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"> \t\t  <AllowPNG/> \t\t <\/OfficeDocumentSettings> \t\t <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"> \t\t  <ActiveSheet>0<\/ActiveSheet> \t\t <\/ExcelWorkbook> \t\t <Styles> \t\t  <Style ss:ID="Default" ss:Name="Normal"> \t\t   <Alignment ss:Vertical="Bottom"/> \t\t   <Borders/> \t\t   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="12" ss:Color="#000000"/> \t\t   <Interior/> \t\t   <NumberFormat/> \t\t   <Protection/> \t\t  <\/Style>'+f+t
        }
        var o,
        s;
        return i=i|| {}
        ,
        typeof t=="object"&&(i=t,
        t=undefined),
        o= {}
        ,
        i&&i.sheets?o=i.sheets:o.Sheet1=i,
        t=n.utils.autoExtFilename(t,
        "xls",
        i),
        s=n.utils.saveFile(t,
        h()),
        f&&(s=f(s)),
        s
    }
    ,
    n.into.XLSX=function(t,
    r,
    u,
    f,
    e) {
        function c() {
            typeof r=="object"&&Array.isArray(r)?u&&u.length>0&&u.forEach(function(n, t) {
                l(r[t], n, undefined, t+1)
            }
            ):l(r,
            u,
            f,
            1);
            a(e)
        }
        function l(t,
        i,
        r,
        u) {
            var f= {
                sheetid: "Sheet "+u, headers: !0
            }
            ,
            h,
            s,
            c,
            l,
            v,
            y,
            p,
            e;
            if(n.utils.extend(f, t),
            h=Object.keys(i).length,
            (!r||r.length==0)&&h>0&&(r=Object.keys(i[0]).map(function(n) {
                return {
                    columnid: n
                }
            }
            )),
            s= {}
            ,
            o.SheetNames.indexOf(f.sheetid)>-1?s=o.Sheets[f.sheetid]:(o.SheetNames.push(f.sheetid), o.Sheets[f.sheetid]= {}
            , s=o.Sheets[f.sheetid]),
            c="A1",
            f.range&&(c=f.range),
            l=n.utils.xlscn(c.match(/[A-Z]+/)[0]),
            v=+c.match(/[0-9]+/)[0]-1,
            o.Sheets[f.sheetid]["!ref"])var w=o.Sheets[f.sheetid]["!ref"],
            y=n.utils.xlscn(w.match(/[A-Z]+/)[0]),
            p=+w.match(/[0-9]+/)[0]-1;
            else y=1,
            p=1;
            var b=Math.max(l+r.length,
            y),
            k=Math.max(v+h+2,
            p),
            a=v+1;
            for(o.Sheets[f.sheetid]["!ref"]="A1:"+n.utils.xlsnc(b)+k,
            f.headers&&(r.forEach(function(t, i) {
                s[n.utils.xlsnc(l+i)+""+a]= {
                    v: t.columnid.trim()
                }
            }
            ), a++),
            e=0;
            e<h;
            e++)r.forEach(function(t, r) {
                var u= {
                    v: i[e][t.columnid]
                }
                ;
                typeof i[e][t.columnid]=="number"?u.t="n":typeof i[e][t.columnid]=="string"?u.t="s":typeof i[e][t.columnid]=="boolean"?u.t="b":typeof i[e][t.columnid]=="object"&&i[e][t.columnid]instanceof Date&&(u.t="d");
                s[n.utils.xlsnc(l+r)+""+a]=u
            }
            ),
            a++
        }
        function a() {
            var n,
            r,
            u;
            if(typeof t=="undefined")s=o;
            else if(n=it(),
            i.isNode||i.isMeteorServer)n.writeFile(o,
            t);
            else {
                r= {
                    bookType: "xlsx", bookSST: !1, type: "binary"
                }
                ;
                u=n.write(o,
                r);
                function f(n) {
                    for(var i=new ArrayBuffer(n.length),
                    r=new Uint8Array(i),
                    t=0;
                    t!=n.length;
                    ++t)r[t]=n.charCodeAt(t)&255;
                    return i
                }
                if(ui()==9)throw new Error("Cannot save XLSX files in IE9. Please use XLS() export function");
                else nt(new Blob([f(u)], {
                    type: "application/octet-stream"
                }
                ),
                t)
            }
        }
        var s=1,
        h,
        o;
        return tt(f,
        [ {
            columnid: "_"
        }
        ])&&(u=u.map(function(n) {
            return n._
        }
        ),
        f=undefined),
        t=n.utils.autoExtFilename(t,
        "xlsx",
        r),
        h=it(),
        typeof t=="object"&&(r=t,
        t=undefined),
        o= {
            SheetNames:[],
            Sheets: {}
        }
        ,
        r.sourcefilename?n.utils.loadBinaryFile(r.sourcefilename,
        !!e,
        function(n) {
            o=h.read(n, {
                type: "binary"
            }
            );
            c()
        }
        ):c(),
        e&&(s=e(s)),
        s
    }
    ,
    n.from.METEOR=function(n,
    t,
    i,
    r,
    u) {
        var f=n.find(t).fetch();
        return i&&(f=i(f, r, u)),
        f
    }
    ,
    n.from.TABLETOP=function(t,
    i,
    r,
    u,
    f) {
        var e=[],
        o= {
            headers: !0, simpleSheet: !0, key: t
        }
        ;
        return n.utils.extend(o,
        i),
        o.callback=function(n) {
            e=n;
            r&&(e=r(e, u, f))
        }
        ,
        Tabletop.init(o),
        null
    }
    ,
    n.from.HTML=function(t,
    i,
    r,
    u,
    f) {
        var a= {}
        ,
        h,
        c,
        o,
        l,
        p,
        v,
        s,
        y,
        e;
        if(n.utils.extend(a, i),
        h=document.querySelector(t),
        !h&&h.tagName!=="TABLE")throw new Error("Selected HTML element is not a TABLE");
        if(c=[],
        o=a.headers,
        o&&!Array.isArray(o))for(o=[],
        l=h.querySelector("thead tr").children,
        e=0;
        e<l.length;
        e++)l.item(e).style&&l.item(e).style.display==="none"&&a.skipdisplaynone?o.push(undefined): o.push(l.item(e).textContent);
        for(p=h.querySelectorAll("tbody tr"),
        v=0;
        v<p.length;
        v++) {
            for(s=p.item(v).children,
            y= {}
            ,
            e=0;
            e<s.length;
            e++)s.item(e).style&&s.item(e).style.display==="none"&&a.skipdisplaynone||(o?y[o[e]]=s.item(e).textContent: y[e]=s.item(e).textContent);
            c.push(y)
        }
        return r&&(c=r(c, u, f)),
        c
    }
    ,
    n.from.RANGE=function(n,
    t,
    i,
    r,
    u) {
        for(var f=[],
        e=n;
        e<=t;
        e++)f.push(e);
        return i&&(f=i(f, r, u)),
        f
    }
    ,
    n.from.FILE=function(t,
    i,
    r,
    u,
    f) {
        var e,
        o,
        s;
        if(typeof t=="string")e=t;
        else if(t instanceof Event)e=t.target.files[0].name;
        else throw new Error("Wrong usage of FILE() function");
        if(o=e.split("."),
        s=o[o.length-1].toUpperCase(),
        n.from[s])return n.from[s](t,
        i,
        r,
        u,
        f);
        throw new Error("Cannot recognize file type for loading");
    }
    ,
    n.from.JSON=function(t,
    i,
    r,
    u,
    f) {
        var e;
        return t=n.utils.autoExtFilename(t,
        "json",
        i),
        n.utils.loadFile(t,
        !!r,
        function(n) {
            e=JSON.parse(n);
            r&&(e=r(e, u, f))
        }
        ),
        e
    }
    ,
    n.from.TXT=function(t,
    i,
    r,
    u,
    f) {
        var e;
        return t=n.utils.autoExtFilename(t,
        "txt",
        i),
        n.utils.loadFile(t,
        !!r,
        function(n) {
            e=n.split(/\r?\n/);
            e[e.length-1]===""&&e.pop();
            for(var t=0, i=e.length;
            t<i;
            t++)e[t]==+e[t]&&(e[t]=+e[t]),
            e[t]=[e[t]];
            r&&(e=r(e, u, f))
        }
        ),
        e
    }
    ,
    n.from.TAB=n.from.TSV=function(t,
    i,
    r,
    u,
    f) {
        return i=i|| {}
        ,
        i.separator="\t",
        t=n.utils.autoExtFilename(t,
        "tab",
        i),
        i.autoext=!1,
        n.from.CSV(t,
        i,
        r,
        u,
        f)
    }
    ,
    n.from.CSV=function(t,
    i,
    r,
    u,
    f) {
        function h(n) {
            function k() {
                var u,
                t,
                r,
                f;
                if(i>=p)return y;
                if(h)return h=!1,
                w;
                if(u=i,
                n.charCodeAt(u)===v) {
                    for(t=u;
                    t++<p;
                    )if(n.charCodeAt(t)===v) {
                        if(n.charCodeAt(t+1)!==v)break;
                        ++t
                    }
                    return i=t+2,
                    r=n.charCodeAt(t+1),
                    r===13?(h=!0,
                    n.charCodeAt(t+2)===10&&++i):r===10&&(h=!0),
                    n.substring(u+1,
                    t).replace(/""/g,
                    '"')
                }
                while(i<p) {
                    if(r=n.charCodeAt(i++),
                    f=1,
                    r===10)h=!0;
                    else if(r===13)h=!0,
                    n.charCodeAt(i)===10&&(++i,
                    ++f);
                    else if(r!==g)continue;
                    return n.substring(u,
                    i-f)
                }
                return n.substring(u)
            }
            for(var g=e.separator.charCodeAt(0),
            v=e.quote.charCodeAt(0),
            w= {}
            ,
            y= {}
            ,
            a=[],
            p=n.length,
            i=0,
            b=0,
            l,
            h,
            c,
            t,
            d;
            (l=k())!==y;
            ) {
                for(c=[];
                l!==w&&l!==y;
                )c.push(l.trim()),
                l=k();
                e.headers?(b===0?typeof e.headers=="boolean"?o=c:Array.isArray(e.headers)&&(o=e.headers, t= {}
                , o.forEach(function(n, i) {
                    t[n]=c[i];
                    typeof t[n]!="undefined"&&t[n].length!==0&&t[n].trim()==+t[n]&&(t[n]=+t[n])
                }
                ), a.push(t)):(t= {}
                , o.forEach(function(n, i) {
                    t[n]=c[i];
                    typeof t[n]!="undefined"&&t[n].length!==0&&t[n].trim()==+t[n]&&(t[n]=+t[n])
                }
                ), a.push(t)),
                b++):a.push(c)
            }
            s=a;
            e.headers&&f&&f.sources&&f.sources[u]&&(d=f.sources[u].columns=[],
            o.forEach(function(n) {
                d.push( {
                    columnid: n
                }
                )
            }
            ));
            r&&(s=r(s, u, f))
        }
        var e= {
            separator: ",", quote: '"', headers: !0
        }
        ,
        s,
        o;
        return n.utils.extend(e,
        i),
        o=[],
        new RegExp("\n").test(t)?h(t):(t=n.utils.autoExtFilename(t, "csv", i),
        n.utils.loadFile(t, !!r, h)),
        s
    }
    ,
    n.from.XLS=function(t,
    i,
    r,
    u,
    f) {
        return i=i|| {}
        ,
        t=n.utils.autoExtFilename(t,
        "xls",
        i),
        i.autoExt=!1,
        ti(it(),
        t,
        i,
        r,
        u,
        f)
    }
    ,
    n.from.XLSX=function(t,
    i,
    r,
    u,
    f) {
        return i=i|| {}
        ,
        t=n.utils.autoExtFilename(t,
        "xlsx",
        i),
        i.autoExt=!1,
        ti(it(),
        t,
        i,
        r,
        u,
        f)
    }
    ,
    n.from.ODS=function(t,
    i,
    r,
    u,
    f) {
        return i=i|| {}
        ,
        t=n.utils.autoExtFilename(t,
        "ods",
        i),
        i.autoExt=!1,
        ti(it(),
        t,
        i,
        r,
        u,
        f)
    }
    ,
    n.from.XML=function(t,
    i,
    r,
    u,
    f) {
        var e;
        return n.utils.loadFile(t,
        !!r,
        function(n) {
            e=lr(n).root;
            r&&(e=r(e, u, f))
        }
        ),
        e
    }
    ,
    n.from.GEXF=function(t,
    i,
    r) {
        var u;
        return n("SEARCH FROM XML("+t+")",
        [],
        function(n) {
            u=n;
            console.log(u);
            r&&(u=r(u))
        }
        ),
        u
    }
    ,
    t.Print=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Print.prototype.toString=function() {
        var n="PRINT";
        return this.statement&&(n+=" "+this.statement.toString()),
        n
    }
    ,
    t.Print.prototype.execute=function(t,
    i,
    r) {
        var o=this,
        u=1,
        f,
        e;
        return n.precompile(this,
        t,
        i),
        this.exprs&&this.exprs.length>0?(f=this.exprs.map(function(t) {
            var r=new Function("params,alasql,p", "var y;return "+t.toJS("({})", "", null)).bind(o), u=r(i, n);
            return p(u)
        }
        ),
        console.log.apply(console, f)):this.select?(e=this.select.execute(t, i),
        console.log(p(e))):console.log(),
        r&&(u=r(u)),
        u
    }
    ,
    t.Source=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Source.prototype.toString=function() {
        var n="SOURCE";
        return this.url&&(n+=" '"+this.url+" '"),
        n
    }
    ,
    t.Source.prototype.execute=function(t,
    i,
    r) {
        var u;
        return st(this.url,
        !!r,
        function(t) {
            return u=n(t),
            r&&(u=r(u)),
            u
        }
        ,
        function(n) {
            throw n;
        }
        ),
        u
    }
    ,
    t.Require=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Require.prototype.toString=function() {
        var n="REQUIRE";
        return this.paths&&this.paths.length>0&&(n+=this.paths.map(function(n) {
            return n.toString()
        }
        ).join(",")),
        this.plugins&&this.plugins.length>0&&(n+=this.plugins.map(function(n) {
            return n.toUpperCase()
        }
        ).join(",")),
        n
    }
    ,
    t.Require.prototype.execute=function(t,
    i,
    r) {
        var e=this,
        u=0,
        f="";
        return this.paths&&this.paths.length>0?this.paths.forEach(function(t) {
            st(t.value, !!r, function(t) {
                (u++, f+=t, u<e.paths.length)||(new Function("params,alasql", f)(i, n), r&&(u=r(u)))
            }
            )
        }
        ):this.plugins&&this.plugins.length>0?this.plugins.forEach(function(t) {
            n.plugins[t]||st(n.path+"/alasql-"+t.toLowerCase()+".js", !!r, function(o) {
                (u++, f+=o, u<e.plugins.length)||(new Function("params,alasql", f)(i, n), n.plugins[t]=!0, r&&(u=r(u)))
            }
            )
        }
        ):r&&(u=r(u)),
        u
    }
    ,
    t.Assert=function(n) {
        return t.extend(this,
        n)
    }
    ,
    t.Source.prototype.toString=function() {
        var n="ASSERT";
        return this.value&&(n+=" "+JSON.stringify(this.value)),
        n
    }
    ,
    t.Assert.prototype.execute=function() {
        if(!tt(n.res, this.value))throw new Error((this.message||"Assert wrong")+": "+JSON.stringify(n.res)+" == "+JSON.stringify(this.value));
        return 1
    }
    ,
    lt=n.engines.WEBSQL=function() {}
    ,
    lt.createDatabase=function(t,
    i,
    r,
    u) {
        var e=1,
        o=openDatabase(t,
        i[0],
        i[1],
        i[2]),
        f;
        if(this.dbid&&(f=n.createDatabase(this.dbid), f.engineid="WEBSQL", f.wdbid=t, sb.wdb=f),
        !o)throw new Error('Cannot create WebSQL database "'+databaseid+'"');
        return u&&u(e),
        e
    }
    ,
    lt.dropDatabase=function() {
        throw new Error("This is impossible to drop WebSQL database.");
    }
    ,
    lt.attachDatabase=function(t,
    i,
    r) {
        if(n.databases[i])throw new Error('Unable to attach database as "'+i+'" because it already exists');
        return alasqlopenDatabase(t,
        r[0],
        r[1],
        r[2]),
        1
    }
    ,
    h=n.engines.INDEXEDDB=function() {}
    ,
    i.hasIndexedDB&&(typeof i.global.indexedDB.webkitGetDatabaseNames=="function"?h.getDatabaseNames=i.global.indexedDB.webkitGetDatabaseNames.bind(i.global.indexedDB):(h.getDatabaseNames=function() {
        var n= {}
        , t= {
            contains:function() {
                return!0
            }
            , notsupported:!0
        }
        ;
        return setTimeout(function() {
            var i= {
                target: {
                    result: t
                }
            }
            ;
            n.onsuccess(i)
        }
        , 0), n
    }
    , h.getDatabaseNamesNotSupported=!0)),
    h.showDatabases=function(n,
    t) {
        var i=h.getDatabaseNames();
        i.onsuccess=function(i) {
            var u=i.target.result,
            f,
            e,
            r;
            if(h.getDatabaseNamesNotSupported)throw new Error("SHOW DATABASE is not supported in this browser");
            for(f=[],
            n&&(e=new RegExp(n.value.replace(/\%/g, ".*"), "g")),
            r=0;
            r<u.length;
            r++)(!n||u[r].match(e))&&f.push( {
                databaseid: u[r]
            }
            );
            t(f)
        }
    }
    ,
    h.createDatabase=function(n,
    t,
    r,
    u,
    f) {
        var e,
        s,
        o;
        console.log(arguments);
        e=i.global.indexedDB;
        r?(s=e.open(n, 1),
        s.onsuccess=function(n) {
            n.target.result.close();
            f&&f(1)
        }
        ):(o=e.open(n, 1),
        o.onupgradeneeded=function(n) {
            console.log("abort");
            n.target.transaction.abort()
        }
        ,
        o.onsuccess=function() {
            if(console.log("success"), r)f&&f(0);
            else throw new Error('IndexedDB: Cannot create new database "'+n+'" because it already exists');
        }
        )
    }
    ,
    h.createDatabase=function(n,
    t,
    r,
    u,
    f) {
        var o=i.global.indexedDB,
        s,
        c,
        e;
        h.getDatabaseNamesNotSupported?r?(s=!0,
        c=o.open(n),
        c.onupgradeneeded=function() {
            s=!1
        }
        ,
        c.onsuccess=function(n) {
            n.target.result.close();
            s?f&&f(0): f&&f(1)
        }
        ):(e=o.open(n),
        e.onupgradeneeded=function(n) {
            n.target.transaction.abort()
        }
        ,
        e.onabort=function() {
            f&&f(1)
        }
        ,
        e.onsuccess=function(t) {
            t.target.result.close();
            throw new Error('IndexedDB: Cannot create new database "'+n+'" because it already exists');
        }
        ):(e=h.getDatabaseNames(),
        e.onsuccess=function(t) {
            var u=t.target.result,
            i;
            if(u.contains(n)) {
                if(r) {
                    f&&f(0);
                    return
                }
                throw new Error('IndexedDB: Cannot create new database "'+n+'" because it already exists');
            }
            i=o.open(n, 1);
            i.onsuccess=function(n) {
                n.target.result.close();
                f&&f(1)
            }
        }
        )
    }
    ,
    h.dropDatabase=function(n,
    t,
    r) {
        var u=i.global.indexedDB,
        f=h.getDatabaseNames();
        f.onsuccess=function(i) {
            var e=i.target.result,
            f;
            if(!e.contains(n)) {
                if(t) {
                    r&&r(0);
                    return
                }
                throw new Error('IndexedDB: Cannot drop new database "'+n+'" because it does not exist');
            }
            f=u.deleteDatabase(n);
            f.onsuccess=function() {
                r&&r(1)
            }
        }
    }
    ,
    h.attachDatabase=function(t,
    r,
    u,
    f,
    e) {
        if(!i.hasIndexedDB)throw new Error("The current browser does not support IndexedDB");
        var o=i.global.indexedDB,
        s=h.getDatabaseNames();
        s.onsuccess=function(i) {
            var f=i.target.result,
            u;
            if(!f.contains(t))throw new Error('IndexedDB: Cannot attach database "'+t+'" because it does not exist');
            u=o.open(t);
            u.onsuccess=function(i) {
                var s=i.target.result,
                u=new n.Database(r||t),
                o,
                f;
                for(u.engineid="INDEXEDDB",
                u.ixdbid=t,
                u.tables=[],
                o=s.objectStoreNames,
                f=0;
                f<o.length;
                f++)u.tables[o[f]]= {}
                ;
                i.target.result.close();
                e&&e(1)
            }
        }
    }
    ,
    h.createTable=function(t,
    r,
    u,
    f) {
        var o=i.global.indexedDB,
        e=n.databases[t].ixdbid,
        s=h.getDatabaseNames();
        s.onsuccess=function(n) {
            var u=n.target.result,
            i;
            if(!u.contains(e))throw new Error('IndexedDB: Cannot create table in database "'+e+'" because it does not exist');
            i=o.open(e);
            i.onversionchange=function(n) {
                n.target.result.close()
            }
            ;
            i.onsuccess=function(n) {
                var u=n.target.result.version,
                i;
                n.target.result.close();
                i=o.open(e,
                u+1);
                i.onupgradeneeded=function(n) {
                    var t=n.target.result,
                    i=t.createObjectStore(r,
                    {
                        autoIncrement: !0
                    }
                    )
                }
                ;
                i.onsuccess=function(n) {
                    n.target.result.close();
                    f&&f(1)
                }
                ;
                i.onerror=function(n) {
                    throw n;
                }
                ;
                i.onblocked=function() {
                    throw new Error('Cannot create table "'+r+'" because database "'+t+'"  is blocked');
                }
            }
        }
    }
    ,
    h.dropTable=function(t,
    r,
    u,
    f) {
        var o=i.global.indexedDB,
        e=n.databases[t].ixdbid,
        s=h.getDatabaseNames();
        s.onsuccess=function(i) {
            var h=i.target.result,
            s;
            if(!h.contains(e))throw new Error('IndexedDB: Cannot drop table in database "'+e+'" because it does not exist');
            s=o.open(e);
            s.onversionchange=function(n) {
                n.target.result.close()
            }
            ;
            s.onsuccess=function(i) {
                var h=i.target.result.version,
                s;
                i.target.result.close();
                s=o.open(e,
                h+1);
                s.onupgradeneeded=function(i) {
                    var f=i.target.result;
                    if(f.objectStoreNames.contains(r))f.deleteObjectStore(r),
                    delete n.databases[t].tables[r];
                    else if(!u)throw new Error('IndexedDB: Cannot drop table "'+r+'" because it does not exist');
                }
                ;
                s.onsuccess=function(n) {
                    n.target.result.close();
                    f&&f(1)
                }
                ;
                s.onerror=function(n) {
                    throw n;
                }
                ;
                s.onblocked=function() {
                    throw new Error('Cannot drop table "'+r+'" because database "'+t+'" is blocked');
                }
            }
        }
    }
    ,
    h.intoTable=function(t,
    r,
    u,
    f,
    e) {
        var o=i.global.indexedDB,
        s=n.databases[t].ixdbid,
        h=o.open(s);
        h.onsuccess=function(n) {
            for(var f=n.target.result,
            o=f.transaction([r], "readwrite"),
            s=o.objectStore(r),
            t=0,
            i=u.length;
            t<i;
            t++)s.add(u[t]);
            o.oncomplete=function() {
                f.close();
                e&&e(i)
            }
        }
    }
    ,
    h.fromTable=function(t,
    r,
    u,
    f,
    e) {
        var o=i.global.indexedDB,
        s=n.databases[t].ixdbid,
        h=o.open(s);
        h.onsuccess=function(n) {
            var i=[],
            o=n.target.result,
            s=o.transaction([r]),
            h=s.objectStore(r),
            t=h.openCursor();
            t.onblocked=function() {}
            ;
            t.onerror=function() {}
            ;
            t.onsuccess=function(n) {
                var t=n.target.result;
                t?(i.push(t.value),
                t["continue"]()): (o.close(), u&&u(i, f, e))
            }
        }
    }
    ,
    h.deleteFromTable=function(t,
    r,
    u,
    f,
    e) {
        var o=i.global.indexedDB,
        s=n.databases[t].ixdbid,
        h=o.open(s);
        h.onsuccess=function(n) {
            var i=n.target.result,
            s=i.transaction([r],
            "readwrite"),
            h=s.objectStore(r),
            t=h.openCursor(),
            o=0;
            t.onblocked=function() {}
            ;
            t.onerror=function() {}
            ;
            t.onsuccess=function(n) {
                var t=n.target.result;
                t?((!u||u(t.value, f))&&(t["delete"](), o++),
                t["continue"]()): (i.close(), e&&e(o))
            }
        }
    }
    ,
    h.updateTable=function(t,
    r,
    u,
    f,
    e,
    o) {
        var s=i.global.indexedDB,
        h=n.databases[t].ixdbid,
        c=s.open(h);
        c.onsuccess=function(n) {
            var i=n.target.result,
            h=i.transaction([r],
            "readwrite"),
            c=h.objectStore(r),
            t=c.openCursor(),
            s=0;
            t.onblocked=function() {}
            ;
            t.onerror=function() {}
            ;
            t.onsuccess=function(n) {
                var t=n.target.result,
                r;
                t?((!f||f(t.value, e))&&(r=t.value, u(r, e), t.update(r), s++),
                t["continue"]()): (i.close(), o&&o(s))
            }
        }
    }
    ,
    r=n.engines.LOCALSTORAGE=function() {}
    ,
    r.get=function(n) {
        var t=localStorage.getItem(n),
        i;
        if(typeof t!="undefined") {
            i=undefined;
            try {
                i=JSON.parse(t)
            }
            catch(r) {
                throw new Error("Cannot parse JSON object from localStorage"+t);
            }
            return i
        }
    }
    ,
    r.set=function(n,
    t) {
        typeof t=="undefined"?localStorage.removeItem(n): localStorage.setItem(n, JSON.stringify(t))
    }
    ,
    r.storeTable=function(t,
    i) {
        var e=n.databases[t],
        f=e.tables[i],
        u= {}
        ;
        u.columns=f.columns;
        u.data=f.data;
        u.identities=f.identities;
        r.set(e.lsdbid+"."+i,
        u)
    }
    ,
    r.restoreTable=function(t,
    i) {
        var e=n.databases[t],
        o=r.get(e.lsdbid+"."+i),
        u=new n.Table,
        f;
        for(f in o)u[f]=o[f];
        return e.tables[i]=u,
        u.indexColumns(),
        u
    }
    ,
    r.removeTable=function(t,
    i) {
        var r=n.databases[t];
        localStorage.removeItem(r.lsdbid+"."+i)
    }
    ,
    r.createDatabase=function(n,
    t,
    i,
    u,
    f) {
        var o=1,
        e=r.get("alasql");
        if(i&&e&&e.databases&&e.databases[n])o=0;
        else {
            if(e||(e= {
                databases: {}
            }
            ),
            e.databases&&e.databases[n])throw new Error('localStorage: Cannot create new database "'+n+'" because it already exists');
            e.databases[n]=!0;
            r.set("alasql",
            e);
            r.set(n,
            {
                databaseid:n,
                tables: {}
            }
            )
        }
        return f&&(o=f(o)),
        o
    }
    ,
    r.dropDatabase=function(n,
    t,
    i) {
        var f=1,
        u=r.get("alasql"),
        e,
        o;
        if(t&&u&&u.databases&&!u.databases[n])f=0;
        else {
            if(!u) {
                if(t)return i?i(0): 0;
                throw new Error("There is no any AlaSQL databases in localStorage");
            }
            if(u.databases&&!u.databases[n])throw new Error('localStorage: Cannot drop database "'+n+'" because there is no such database');
            delete u.databases[n];
            r.set("alasql",
            u);
            e=r.get(n);
            for(o in e.tables)localStorage.removeItem(n+"."+o);
            localStorage.removeItem(n)
        }
        return i&&(f=i(f)),
        f
    }
    ,
    r.attachDatabase=function(t,
    i,
    u,
    f,
    e) {
        var s=1,
        o,
        h;
        if(n.databases[i])throw new Error('Unable to attach database as "'+i+'" because it already exists');
        if(i||(i=t),
        o=new n.Database(i),
        o.engineid="LOCALSTORAGE",
        o.lsdbid=t,
        o.tables=r.get(t).tables,
        !n.options.autocommit&&o.tables)for(h in o.tables)r.restoreTable(i,
        h);
        return e&&(s=e(s)),
        s
    }
    ,
    r.showDatabases=function(n,
    t) {
        var i=[],
        u=r.get("alasql"),
        f;
        if(n&&(f=new RegExp(n.value.replace(/\%/g, ".*"), "g")),
        u&&u.databases) {
            for(dbid in u.databases)i.push( {
                databaseid: dbid
            }
            );
            n&&i&&i.length>0&&(i=i.filter(function(n) {
                return n.databaseid.match(f)
            }
            ))
        }
        return t&&(i=t(i)),
        i
    }
    ,
    r.createTable=function(t,
    i,
    u,
    f) {
        var o=1,
        e=n.databases[t].lsdbid,
        h=r.get(e+"."+i),
        s,
        c;
        if(h&&!u)throw new Error('Table "'+i+'" alsready exists in localStorage database "'+e+'"');
        return s=r.get(e),
        c=n.databases[t].tables[i],
        s.tables[i]=!0,
        r.set(e,
        s),
        r.storeTable(t,
        i),
        f&&(o=f(o)),
        o
    }
    ,
    r.truncateTable=function(t,
    i,
    u,
    f) {
        var e=1,
        h=n.databases[t].lsdbid,
        o,
        s;
        if(o=n.options.autocommit?r.get(h): n.databases[t], !u&&!o.tables[i])throw new Error('Cannot truncate table "'+i+'" in localStorage, because it does not exist');
        return s=r.restoreTable(t,
        i),
        s.data=[],
        r.storeTable(t,
        i),
        f&&(e=f(e)),
        e
    }
    ,
    r.dropTable=function(t,
    i,
    u,
    f) {
        var o=1,
        s=n.databases[t].lsdbid,
        e;
        if(e=n.options.autocommit?r.get(s): n.databases[t], !u&&!e.tables[i])throw new Error('Cannot drop table "'+i+'" in localStorage, because it does not exist');
        return delete e.tables[i],
        r.set(s,
        e),
        r.removeTable(t,
        i),
        f&&(o=f(o)),
        o
    }
    ,
    r.fromTable=function(t,
    i,
    u,
    f,
    e) {
        var s=n.databases[t].lsdbid,
        o=r.restoreTable(t,
        i).data;
        return u&&(o=u(o, f, e)),
        o
    }
    ,
    r.intoTable=function(t,
    i,
    u,
    f,
    e) {
        var h=n.databases[t].lsdbid,
        s=u.length,
        o=r.restoreTable(t,
        i);
        return o.data||(o.data=[]),
        o.data=o.data.concat(u),
        r.storeTable(t,
        i),
        e&&(s=e(s)),
        s
    }
    ,
    r.loadTableData=function(t,
    i) {
        var u=n.databases[t],
        f=n.databases[t].lsdbid;
        r.restoreTable(t,
        i)
    }
    ,
    r.saveTableData=function(t,
    i) {
        var u=n.databases[t],
        f=n.databases[t].lsdbid;
        r.storeTable(f,
        i);
        u.tables[i].data=undefined
    }
    ,
    r.commit=function(t,
    i) {
        var f=n.databases[t],
        e=n.databases[t].lsdbid,
        o= {
            databaseid:e,
            tables: {}
        }
        ,
        u;
        if(f.tables)for(u in f.tables)o.tables[u]=!0,
        r.storeTable(t,
        u);
        return r.set(e,
        o),
        i?i(1):1
    }
    ,
    r.begin=r.commit,
    r.rollback=function() {
        return
    }
    ,
    ot=n.engines.SQLITE=function() {}
    ,
    ot.createDatabase=function() {
        throw new Error("Connot create SQLITE database in memory. Attach it.");
    }
    ,
    ot.dropDatabase=function() {
        throw new Error("This is impossible to drop SQLite database. Detach it.");
    }
    ,
    ot.attachDatabase=function(i,
    r,
    u,
    f,
    e) {
        var o;
        if(n.databases[r])throw new Error('Unable to attach database as "'+r+'" because it already exists');
        if(u[0]&&u[0]instanceof t.StringValue||u[0]instanceof t.ParamValue)return u[0]instanceof t.StringValue?o=u[0].value:u[0]instanceof t.ParamValue&&(o=f[u[0].param]),
        n.utils.loadBinaryFile(o,
        !0,
        function(t) {
            var u=new n.Database(r||i),
            f,
            o;
            u.engineid="SQLITE";
            u.sqldbid=i;
            f=u.sqldb=new SQL.Database(t);
            u.tables=[];
            o=f.exec("SELECT * FROM sqlite_master WHERE type='table'")[0].values;
            o.forEach(function(t) {
                u.tables[t[1]]= {}
                ;
                var r=u.tables[t[1]].columns=[], f=n.parse(t[4]), i=f.statements[0].columns;
                i&&i.length>0&&i.forEach(function(n) {
                    r.push(n)
                }
                )
            }
            );
            e(1)
        }
        ,
        function() {
            throw new Error('Cannot open SQLite database file "'+u[0].value+'"');
        }
        ),
        1;
        throw new Error("Cannot attach SQLite database without a file");
    }
    ,
    ot.fromTable=function(t,
    i,
    r,
    u,
    f) {
        var e=n.databases[t].sqldb.exec("SELECT * FROM "+i),
        s=f.sources[u].columns=[],
        o;
        e[0].columns.length>0&&e[0].columns.forEach(function(n) {
            s.push( {
                columnid: n
            }
            )
        }
        );
        o=[];
        e[0].values.length>0&&e[0].values.forEach(function(n) {
            var t= {}
            ;
            s.forEach(function(i, r) {
                t[i.columnid]=n[r]
            }
            );
            o.push(t)
        }
        );
        r&&r(o,
        u,
        f)
    }
    ,
    ot.intoTable=function(t,
    i,
    r,
    u,
    f) {
        for(var a=n.databases[t].sqldb,
        h,
        o=0,
        s=r.length;
        o<s;
        o++) {
            var e="INSERT INTO "+i+" (",
            c=r[o],
            l=Object.keys(c);
            e+=l.join(",");
            e+=") VALUES (";
            e+=l.map(function(n) {
                return v=c[n],
                typeof v=="string"&&(v="'"+v+"'"),
                v
            }
            ).join(",");
            e+=")";
            a.exec(e)
        }
        return h=s,
        f&&f(h),
        h
    }
    ,
    c=n.engines.FILESTORAGE=n.engines.FILE=function() {}
    ,
    c.createDatabase=function(t,
    i,
    r,
    u,
    f) {
        var e=1,
        o=i[0].value;
        return n.utils.fileExists(o,
        function(t) {
            if(t) {
                if(r)return e=0,
                f&&(e=f(e)),
                e;
                throw new Error("Cannot create new database file, because it alreagy exists");
            }
            else n.utils.saveFile(o, JSON.stringify( {
                tables: {}
            }
            ), function() {
                f&&(e=f(e))
            }
            )
        }
        ),
        e
    }
    ,
    c.dropDatabase=function(t,
    i,
    r) {
        var u,
        f=t.value;
        return n.utils.fileExists(f,
        function(t) {
            if(t)u=1,
            n.utils.deleteFile(f, function() {
                u=1;
                r&&(u=r(u))
            }
            );
            else {
                if(!i)throw new Error("Cannot drop database file, because it does not exist");
                u=0;
                r&&(u=r(u))
            }
        }
        ),
        u
    }
    ,
    c.attachDatabase=function(t,
    i,
    r,
    u,
    f) {
        var o=1,
        e;
        if(n.databases[i])throw new Error('Unable to attach database as "'+i+'" because it already exists');
        return e=new n.Database(i||t),
        e.engineid="FILESTORAGE",
        e.filename=r[0].value,
        st(e.filename,
        !!f,
        function(t) {
            try {
                e.data=JSON.parse(t)
            }
            catch(r) {
                throw new Error("Data in FileStorage database are corrupted");
            }
            if(e.tables=e.data.tables, !n.options.autocommit&&e.tables)for(var i in e.tables)e.tables[i].data=e.data[i];
            f&&(o=f(o))
        }
        ),
        o
    }
    ,
    c.createTable=function(t,
    i,
    r,
    u) {
        var f=n.databases[t],
        s=f.data[i],
        e=1,
        o;
        if(s&&!r)throw new Error('Table "'+i+'" alsready exists in the database "'+fsdbid+'"');
        return o=n.databases[t].tables[i],
        f.data.tables[i]= {
            columns: o.columns
        }
        ,
        f.data[i]=[],
        c.updateFile(t),
        u&&u(e),
        e
    }
    ,
    c.updateFile=function(t) {
        var i=n.databases[t];
        if(i.issaving) {
            i.postsave=!0;
            return
        }
        i.issaving=!0;
        i.postsave=!1;
        n.utils.saveFile(i.filename,
        JSON.stringify(i.data),
        function() {
            i.issaving=!1;
            i.postsave&&setTimeout(function() {
                c.updateFile(t)
            }
            , 50)
        }
        )
    }
    ,
    c.dropTable=function(t,
    i,
    r,
    u) {
        var e=1,
        f=n.databases[t];
        if(!r&&!f.tables[i])throw new Error('Cannot drop table "'+i+'" in fileStorage, because it does not exist');
        return delete f.tables[i],
        delete f.data.tables[i],
        delete f.data[i],
        c.updateFile(t),
        u&&u(e),
        e
    }
    ,
    c.fromTable=function(t,
    i,
    r,
    u,
    f) {
        var o=n.databases[t],
        e=o.data[i];
        return r&&(e=r(e, u, f)),
        e
    }
    ,
    c.intoTable=function(t,
    i,
    r,
    u,
    f) {
        var o=n.databases[t],
        s=r.length,
        e=o.data[i];
        return e||(e=[]),
        o.data[i]=e.concat(r),
        c.updateFile(t),
        f&&f(s),
        s
    }
    ,
    c.loadTableData=function(t,
    i) {
        var r=n.databases[t];
        r.tables[i].data=r.data[i]
    }
    ,
    c.saveTableData=function(t,
    i) {
        var r=n.databases[t];
        r.data[i]=r.tables[i].data;
        r.tables[i].data=null;
        c.updateFile(t)
    }
    ,
    c.commit=function(t,
    i) {
        var r=n.databases[t],
        u;
        if(r.tables)for(u in r.tables)r.data.tables[u]= {
            columns: r.tables[u].columns
        }
        ,
        r.data[u]=r.tables[u].data;
        return c.updateFile(t),
        i?i(1):1
    }
    ,
    c.begin=c.commit,
    c.rollback=function(t,
    i) {
        function f() {
            setTimeout(function() {
                if(r.issaving)return f();
                n.loadFile(r.filename, !!i, function(f) {
                    var o, s;
                    r.data=f;
                    r.tables= {}
                    ;
                    for(o in r.data.tables)s=new n.Table( {
                        columns: r.data.tables[o].columns
                    }
                    ), e(s, r.data.tables[o]), r.tables[o]=s, n.options.autocommit||(r.tables[o].data=r.data[o]), r.tables[o].indexColumns();
                    delete n.databases[t];
                    n.databases[t]=new n.Database(t);
                    e(n.databases[t], r);
                    n.databases[t].engineid="FILESTORAGE";
                    n.databases[t].filename=r.filename;
                    i&&(u=i(u))
                }
                )
            }
            ,
            100)
        }
        var u=1,
        r=n.databases[t];
        r.dbversion++;
        f()
    }
    ,
    i.isBrowser&&!i.isWebWorker) {
        if(n=n||!1,
        !n)throw new Error("alasql was not found");
        n.worker=function() {
            throw new Error("Can find webworker in this enviroment");
        }
        ;
        typeof Worker!="undefined"&&(n.worker=function(t,
        i,
        r) {
            var f,
            u,
            e,
            o,
            s;
            if(t===!0&&(t=undefined),
            typeof t=="undefined")for(f=document.getElementsByTagName("script"),
            u=0;
            u<f.length;
            u++)if(f[u].src.substr(-16).toLowerCase()==="alasql-worker.js") {
                t=f[u].src.substr(0,
                f[u].src.length-16)+"alasql.js";
                break
            }
            else if(f[u].src.substr(-20).toLowerCase()==="alasql-worker.min.js") {
                t=f[u].src.substr(0,
                f[u].src.length-20)+"alasql.min.js";
                break
            }
            else if(f[u].src.substr(-9).toLowerCase()==="alasql.js") {
                t=f[u].src;
                break
            }
            else if(f[u].src.substr(-13).toLowerCase()==="alasql.min.js") {
                t=f[u].src.substr(0,
                f[u].src.length-13)+"alasql.min.js";
                break
            }
            if(typeof t=="undefined")throw new Error("Path to alasql.js is not specified");
            else if(t!==!1)e="importScripts('",
            e+=t,
            e+="');self.onmessage = function(event) {alasql(event.data.sql,event.data.params, function(data){postMessage({id:event.data.id, data:data});});}",
            o=new Blob([e],
            {
                type: "text/plain"
            }
            ),
            n.webworker=new Worker(URL.createObjectURL(o)),
            n.webworker.onmessage=function(t) {
                var i=t.data.id;
                n.buffer[i](t.data.data);
                delete n.buffer[i]
            }
            ,
            n.webworker.onerror=function(n) {
                throw n;
            }
            ,
            arguments.length>1&&(s="REQUIRE "+i.map(function(n) {
                return'"'+n+'"'
            }
            ).join(","),
            n(s, [], r));
            else if(t===!1) {
                delete n.webworker;
                return
            }
        }
        );
        nt=nt||function(n) {
            "use strict";
            if(typeof n!="undefined"&&(typeof navigator=="undefined"||!/MSIE [1-9]\./.test(navigator.userAgent))) {
                var s=n.document,
                r=function() {
                    return n.URL||n.webkitURL||n
                }
                ,
                i=s.createElementNS("http://www.w3.org/1999/xhtml",
                "a"),
                h="download"in i,
                c=function(n) {
                    var t=new MouseEvent("click");
                    n.dispatchEvent(t)
                }
                ,
                l=/constructor/i.test(n.HTMLElement)||n.safari,
                u=/CriOS\/[\d]+/.test(navigator.userAgent),
                a=function(t) {
                    (n.setImmediate||n.setTimeout)(function() {
                        throw t;
                    }
                    ,
                    0)
                }
                ,
                v="application/octet-stream",
                y=4e4,
                f=function(n) {
                    var t=function() {
                        typeof n=="string"?r().revokeObjectURL(n): n.remove()
                    }
                    ;
                    setTimeout(t,
                    y)
                }
                ,
                p=function(n,
                t,
                i) {
                    var r,
                    u;
                    for(t=[].concat(t),
                    r=t.length;
                    r--;
                    )if(u=n["on"+t[r]],
                    typeof u=="function")try {
                        u.call(n,
                        i||n)
                    }
                    catch(f) {
                        a(f)
                    }
                }
                ,
                e=function(n) {
                    return/^\s*(?: text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;
                    .*charset\s*=\s*utf-8/i.test(n.type)?new Blob([String.fromCharCode(65279),
                    n],
                    {
                        type: n.type
                    }
                    ):n
                }
                ,
                o=function(t,
                o,
                s) {
                    s||(t=e(t));
                    var a=this,
                    k=t.type,
                    b=k===v,
                    y,
                    w=function() {
                        p(a,
                        "writestart progress write writeend".split(" "))
                    }
                    ,
                    d=function() {
                        var i,
                        e;
                        if((u||b&&l)&&n.FileReader) {
                            i=new FileReader;
                            i.onloadend=function() {
                                var t=u?i.result: i.result.replace(/^data: [^;
                                ]*;
                                /,
                                "data:attachment/file;"),
                                r=n.open(t,
                                "_blank");
                                r||(n.location.href=t);
                                t=undefined;
                                a.readyState=a.DONE;
                                w()
                            }
                            ;
                            i.readAsDataURL(t);
                            a.readyState=a.INIT;
                            return
                        }
                        y||(y=r().createObjectURL(t));
                        b?n.location.href=y:(e=n.open(y,
                        "_blank"),
                        e||(n.location.href=y));
                        a.readyState=a.DONE;
                        w();
                        f(y)
                    }
                    ;
                    if(a.readyState=a.INIT,
                    h) {
                        y=r().createObjectURL(t);
                        setTimeout(function() {
                            i.href=y;
                            i.download=o;
                            c(i);
                            w();
                            f(y);
                            a.readyState=a.DONE
                        }
                        );
                        return
                    }
                    d()
                }
                ,
                t=o.prototype,
                w=function(n,
                t,
                i) {
                    return new o(n,
                    t||n.name||"download",
                    i)
                }
                ;
                return typeof navigator!="undefined"&&navigator.msSaveOrOpenBlob?function(n,
                t,
                i) {
                    return t=t||n.name||"download",
                    i||(n=e(n)),
                    navigator.msSaveOrOpenBlob(n,
                    t)
                }
                :(t.abort=function() {}
                ,
                t.readyState=t.INIT=0,
                t.WRITING=1,
                t.DONE=2,
                t.error=t.onwritestart=t.onprogress=t.onwrite=t.onabort=t.onerror=t.onwriteend=null,
                w)
            }
        }
        (typeof self!="undefined"&&self||typeof window!="undefined"&&window||this.content);
        typeof module!="undefined"&&module.exports?module.exports.saveAs=nt:typeof define!="undefined"&&define!==null&&define.amd!==null&&define("FileSaver.js",
        function() {
            return nt
        }
        );
        (i.isCordova||i.isMeteorServer||i.isNode)&&console.warn("It looks like you are using the browser version of AlaSQL. Please use the alasql.fs.js file instead.");
        n.utils.saveAs=nt
    }
    return new rt("alasql"),
    n.use("alasql"),
    n
}

);
XLSX= {}

,
function(n) {
    function nl() {
        tr(1200)
    }
    function ts(n) {
        for(var i=[],
        t=0,
        r=n.length;
        t<r;
        ++t)i[t]=n.charCodeAt(t);
        return i
    }
    function lk(n) {
        for(var i=[],
        t=0;
        t<n.length>>1;
        ++t)i[t]=String.fromCharCode(n.charCodeAt(2*t)+(n.charCodeAt(2*t+1)<<8));
        return i.join("")
    }
    function ak(n) {
        for(var i=[],
        t=0;
        t<n.length>>1;
        ++t)i[t]=String.fromCharCode(n.charCodeAt(2*t+1)+(n.charCodeAt(2*t)<<8));
        return i.join("")
    }
    function se(n) {
        return new(wt?Buffer: Array)(n)
    }
    function ir(n) {
        return wt?new Buffer(n,
        "binary"):n.split("").map(function(n) {
            return n.charCodeAt(0)&255
        }
        )
    }
    function vk(n) {
        var t=typeof n=="number"?i._table[n]: n;
        return t=t.replace(is,
        "(\\d+)"),
        new RegExp("^"+t+"$")
    }
    function yk(n,
    t,
    i) {
        var s=-1,
        u=-1,
        h=-1,
        e=-1,
        f=-1,
        o=-1,
        r,
        c;
        return((t.match(is)||[]).forEach(function(n,
        t) {
            var r=parseInt(i[t+1],
            10);
            switch(n.toLowerCase().charAt(0)) {
                case"y": s=r;
                break;
                case"d": h=r;
                break;
                case"h": e=r;
                break;
                case"s": o=r;
                break;
                case"m": e>=0?f=r: u=r
            }
        }
        ),
        o>=0&&f==-1&&u>=0&&(f=u,
        u=-1),
        r=(""+(s>=0?s:(new Date).getFullYear())).slice(-4)+"-"+("00"+(u>=1?u:1)).slice(-2)+"-"+("00"+(h>=1?h:1)).slice(-2),
        r.length==7&&(r="0"+r),
        r.length==8&&(r="20"+r),
        c=("00"+(e>=0?e:0)).slice(-2)+":"+("00"+(f>=0?f:0)).slice(-2)+":"+("00"+(o>=0?o:0)).slice(-2),
        e==-1&&f==-1&&o==-1)?r:s==-1&&u==-1&&h==-1?c:r+"T"+c
    }
    function gu(n) {
        return n!==undefined&&n!==null
    }
    function nt(n) {
        return Object.keys(n)
    }
    function il(n,
    t) {
        for(var u=[],
        r=nt(n),
        i=0;
        i!==r.length;
        ++i)u[n[r[i]][t]]=r[i];
        return u
    }
    function rs(n) {
        for(var r=[],
        i=nt(n),
        t=0;
        t!==i.length;
        ++t)r[n[i[t]]]=i[t];
        return r
    }
    function rl(n) {
        for(var r=[],
        i=nt(n),
        t=0;
        t!==i.length;
        ++t)r[n[i[t]]]=parseInt(i[t],
        10);
        return r
    }
    function pk(n) {
        for(var r=[],
        i=nt(n),
        t=0;
        t!==i.length;
        ++t)r[n[i[t]]]==null&&(r[n[i[t]]]=[]),
        r[n[i[t]]].push(i[t]);
        return r
    }
    function ot(n,
    t) {
        var i=n.getTime();
        return t&&(i-=1263168e5),
        (i-fs)/864e5
    }
    function es(n) {
        var t=new Date;
        return t.setTime(n*864e5+fs),
        t
    }
    function wk(n) {
        var u=0,
        r=0,
        f=!1,
        i=n.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/),
        t;
        if(!i)throw new Error("|"+n+"| is not an ISO8601 Duration");
        for(t=1;
        t!=i.length;
        ++t)if(i[t]) {
            r=1;
            t>3&&(f=!0);
            switch(i[t].substr(i[t].length-1)) {
                case"Y": throw new Error("Unsupported ISO Duration Field: "+i[t].substr(i[t].length-1));
                case"D": r*=24;
                case"H": r*=60;
                case"M": if(f)r*=60;
                else throw new Error("Unsupported ISO Duration Field: M");
            }
            u+=r*parseInt(i[t],
            10)
        }
        return u
    }
    function w(n,
    t) {
        var i=new Date(n),
        f,
        r,
        u;
        return ul?(t>0?i.setTime(i.getTime()+i.getTimezoneOffset()*6e4): t<0&&i.setTime(i.getTime()-i.getTimezoneOffset()*6e4), i): n instanceof Date?n: nf.getFullYear()==1917&&!isNaN(i.getFullYear())?(f=i.getFullYear(), n.indexOf(""+f)>-1)?i: (i.setFullYear(i.getFullYear()+100), i): (r=n.match(/\d+/g)||["2017", "2", "19", "0", "0", "0"], u=new Date(+r[0], +r[1]-1, +r[2], +r[3]||0, +r[4]||0, +r[5]||0), n.indexOf("Z")>-1&&(u=new Date(u.getTime()-u.getTimezoneOffset()*6e4)), u)
    }
    function eu(n) {
        for(var i="",
        t=0;
        t!=n.length;
        ++t)i+=String.fromCharCode(n[t]);
        return i
    }
    function bk(n) {
        for(var i=[],
        t=0;
        t!=n.length;
        ++t)i.push(n.charCodeAt(t));
        return i
    }
    function yi(n) {
        var i,
        t;
        if(typeof JSON!="undefined"&&!Array.isArray(n))return JSON.parse(JSON.stringify(n));
        if(typeof n!="object"||n==null)return n;
        i= {}
        ;
        for(t in n)n.hasOwnProperty(t)&&(i[t]=yi(n[t]));
        return i
    }
    function rr(n,
    t) {
        for(var i="";
        i.length<t;
        )i+=n;
        return i
    }
    function oi(n) {
        var t=Number(n),
        i,
        r;
        return isNaN(t)?(i=1,
        r=n.replace(/([\d]),
        ([\d])/g,
        "$1$2").replace(/[$]/g,
        "").replace(/[%]/g,
        function() {
            return i*=100,
            ""
        }
        ),
        !isNaN(t=Number(r)))?t/i:(r=r.replace(/[(](.*)[)]/,
        function(n,
        t) {
            return i=-i,
            t
        }
        ),
        !isNaN(t=Number(r)))?t/i:t:t
    }
    function tf(n) {
        var t=new Date(n),
        i=new Date(NaN),
        r=t.getYear(),
        f=t.getMonth(),
        u=t.getDate();
        return isNaN(u)?i: r<0||r>8099?i: (f>0||u>1)&&r!=101?t: n.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)?t: n.match(/[^-0-9: , \/\\]/)?i: t
    }
    function kk(n,
    t,
    i) {
        var r,
        u,
        f;
        if(fl||typeof t=="string")return n.split(t);
        for(r=n.split(t),
        u=[r[0]],
        f=1;
        f<r.length;
        ++f)u.push(i),
        u.push(r[f]);
        return u
    }
    function el(n) {
        return n?n.data?yr(n.data): n.asNodeBuffer&&wt?yr(n.asNodeBuffer().toString("binary")): n.asBinary?yr(n.asBinary()): n._data&&n._data.getContent?yr(eu(Array.prototype.slice.call(n._data.getContent(), 0))): null: null
    }
    function dk(n) {
        if(!n)return null;
        if(n.data)return ts(n.data);
        if(n.asNodeBuffer&&wt)return n.asNodeBuffer();
        if(n._data&&n._data.getContent) {
            var t=n._data.getContent();
            return typeof t=="string"?bk(t): Array.prototype.slice.call(t)
        }
        return null
    }
    function gk(n) {
        return n&&n.name.slice(-4)===".bin"?dk(n): el(n)
    }
    function ou(n,
    t) {
        for(var r=nt(n.files),
        f=t.toLowerCase(),
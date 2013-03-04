/*! tableSorter 2.4+ widgets - updated 2/24/2013 */
;(function(b){
b.tablesorter=b.tablesorter||{};
b.tablesorter.themes={bootstrap:{table:"table table-bordered table-striped",header:"bootstrap-header",footerRow:"",footerCells:"",icons:"",sortNone:"bootstrap-icon-unsorted",sortAsc:"icon-chevron-up",sortDesc:"icon-chevron-down",active:"",hover:"",filterRow:"",even:"",odd:""},jui:{table:"ui-widget ui-widget-content ui-corner-all",header:"ui-widget-header ui-corner-all ui-state-default",footerRow:"",footerCells:"",icons:"ui-icon",sortNone:"ui-icon-carat-2-n-s", sortAsc:"ui-icon-carat-1-n",sortDesc:"ui-icon-carat-1-s",active:"ui-state-active",hover:"ui-state-hover",filterRow:"",even:"ui-widget-content",odd:"ui-state-default"}};
b.tablesorter.storage=function(c,a,d){var e,k=!1;e={};var f=c.id||b(".tablesorter").index(b(c)),g=window.location.pathname;try{k=!!localStorage.getItem}catch(n){}b.parseJSON&&(k?e=b.parseJSON(localStorage[a]||"{}"):(e=document.cookie.split(/[;\s|=]/),c=b.inArray(a,e)+1,e=0!==c?b.parseJSON(e[c]||"{}"):{}));if((d||""===d)&&window.JSON&& JSON.hasOwnProperty("stringify"))e[g]||(e[g]={}),e[g][f]=d,k?localStorage[a]=JSON.stringify(e):(c=new Date,c.setTime(c.getTime()+31536E6),document.cookie=a+"="+JSON.stringify(e).replace(/\"/g,'"')+"; expires="+c.toGMTString()+"; path=/");else return e&&e[g]?e[g][f]:{}};
b.tablesorter.addWidget({id:"uitheme",format:function(c){var a,d,e,k,f=b.tablesorter.themes,g=b(c),n=c.config,m=n.widgetOptions,q="default"!==n.theme?n.theme:m.uitheme||"jui",l=f[f[q]?q:f[m.uitheme]?m.uitheme:"jui"],r=b(n.headerList), w="tr."+(m.stickyHeaders||"tablesorter-stickyHeader"),t=l.sortNone+" "+l.sortDesc+" "+l.sortAsc;n.debug&&(a=new Date);if(!g.hasClass("tablesorter-"+q)||n.theme===q||!c.hasInitialized)""!==l.even&&(m.zebra[0]+=" "+l.even),""!==l.odd&&(m.zebra[1]+=" "+l.odd),f=g.removeClass(""===n.theme?"":"tablesorter-"+n.theme).addClass("tablesorter-"+q+" "+l.table).find("tfoot"),f.length&&f.find("tr").addClass(l.footerRow).children("th, td").addClass(l.footerCells),r.addClass(l.header).filter(":not(.sorter-false)").bind("mouseenter.tsuitheme mouseleave.tsuitheme", function(a){b(this)["mouseenter"===a.type?"addClass":"removeClass"](l.hover)}),r.find(".tablesorter-wrapper").length||r.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>'),n.cssIcon&&r.find("."+n.cssIcon).addClass(l.icons),g.hasClass("hasFilters")&&r.find(".tablesorter-filter-row").addClass(l.filterRow);b.each(r,function(a){e=b(this);k=n.cssIcon?e.find("."+n.cssIcon):e;this.sortDisabled?(e.removeClass(t),k.removeClass(t+" tablesorter-icon "+l.icons)): (f=g.hasClass("hasStickyHeaders")?g.find(w).find("th").eq(a).add(e):e,d=e.hasClass(n.cssAsc)?l.sortAsc:e.hasClass(n.cssDesc)?l.sortDesc:e.hasClass(n.cssHeader)?l.sortNone:"",e[d===l.sortNone?"removeClass":"addClass"](l.active),k.removeClass(t).addClass(d))});n.debug&&b.tablesorter.benchmark("Applying "+q+" theme",a)},remove:function(c,a,d){c=b(c);var e="object"===typeof d.uitheme?"jui":d.uitheme||"jui";d="object"===typeof d.uitheme?d.uitheme:b.tablesorter.themes[b.tablesorter.themes.hasOwnProperty(e)? e:"jui"];var k=c.children("thead").children(),f=d.sortNone+" "+d.sortDesc+" "+d.sortAsc;c.removeClass("tablesorter-"+e+" "+d.table).find(a.cssHeader).removeClass(d.header);k.unbind("mouseenter.tsuitheme mouseleave.tsuitheme").removeClass(d.hover+" "+f+" "+d.active).find(".tablesorter-filter-row").removeClass(d.filterRow);k.find(".tablesorter-icon").removeClass(d.icons)}});
b.tablesorter.addWidget({id:"columns",format:function(c){var a,d,e,k,f,g,n,m,q,l=b(c),r=c.config,w=r.widgetOptions,t=r.$tbodies, h=r.sortList,u=h.length,s=["primary","secondary","tertiary"],s=r.widgetColumns&&r.widgetColumns.hasOwnProperty("css")?r.widgetColumns.css||s:w&&w.hasOwnProperty("columns")?w.columns||s:s;g=s.length-1;n=s.join(" ");r.debug&&(f=new Date);for(q=0;q<t.length;q++)a=b.tablesorter.processTbody(c,t.eq(q),!0),d=a.children("tr"),d.each(function(){k=b(this);if("none"!==this.style.display&&(e=k.children().removeClass(n),h&&h[0]&&(e.eq(h[0][0]).addClass(s[0]),1<u)))for(m=1;m<u;m++)e.eq(h[m][0]).addClass(s[m]|| s[g])}),b.tablesorter.processTbody(c,a,!1);d=!1!==w.columns_thead?"thead tr":"";!1!==w.columns_tfoot&&(d+=(""===d?"":",")+"tfoot tr");if(d.length&&(k=l.find(d).children().removeClass(n),h&&h[0]&&(k.filter('[data-column="'+h[0][0]+'"]').addClass(s[0]),1<u)))for(m=1;m<u;m++)k.filter('[data-column="'+h[m][0]+'"]').addClass(s[m]||s[g]);r.debug&&b.tablesorter.benchmark("Applying Columns widget",f)},remove:function(c,a){var d,e,k=a.$tbodies,f=(a.widgetOptions.columns||["primary","secondary","tertiary"]).join(" "); a.$headers.removeClass(f);b(c).children("tfoot").children("tr").children("th, td").removeClass(f);for(d=0;d<k.length;d++)e=b.tablesorter.processTbody(c,k.eq(d),!0),e.children("tr").each(function(){b(this).children().removeClass(f)}),b.tablesorter.processTbody(c,e,!1)}});
b.tablesorter.addWidget({id:"filter",format:function(c){if(c.config.parsers&&!b(c).hasClass("hasFilters")){var a,d,e,k,f,g,n,m,q,l,r,w,t,h,u,s,p,F,z,E=b.tablesorter.formatFloat,K="",B=b.tablesorter,v=c.config,C=b(v.headerList),j=v.widgetOptions, D=j.filter_cssFilter||"tablesorter-filter",y=b(c).addClass("hasFilters"),J=v.$tbodies,I=v.parsers.length,L=/^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/,S=RegExp(v.cssChildRow),T=/undefined|number/,U=/(^[\"|\'|=])|([\"|\'|=]$)/g,G=/[^\w,. \-()]/g,V=/[<>=]/g,M,N,O,H=function(a){var c=b.isArray(a),d=y.find("thead").eq(0).find(".tablesorter-filter-row").children(),e=c?a:d.map(function(a){a=b(this).find("select."+D+", input."+D);return a.length?a.val()||"":""}).get(),f=(e||[]).join("");c&&d.each(function(c, d){b(d).val(a[c]||"")});!0===j.filter_hideFilters&&y.find(".tablesorter-filter-row").trigger(""===f?"mouseleave":"mouseenter");if(!(K===f&&!1!==a))if(y.trigger("filterStart",[e]),v.showProcessing)setTimeout(function(){P(a,e,f);return!1},30);else return P(a,e,f),!1},P=function(g,h,k){var l,r,q,t,w,x,F,A,z;v.debug&&(F=new Date);for(e=0;e<J.length;e++){g=b.tablesorter.processTbody(c,J.eq(e),!0);l=g.children("tr");w=l.length;if(""===k||j.filter_serversideFiltering)l.show().removeClass("filtered");else for(d= 0;d<w;d++)if(!S.test(l[d].className)){t=!0;q=l.eq(d).nextUntil("tr:not(."+v.cssChildRow+")");p=q.length&&(j&&j.hasOwnProperty("filter_childRows")&&"undefined"!==typeof j.filter_childRows?j.filter_childRows:1)?q.text():"";p=j.filter_ignoreCase?p.toLocaleLowerCase():p;r=l.eq(d).children("td");for(a=0;a<I;a++)if(h[a]){n=j.filter_useParsedData||M[a]?v.cache[e].normalized[d][a]:b.trim(r.eq(a).text());m=!T.test(typeof n)&&j.filter_ignoreCase?n.toLocaleLowerCase():n;x=t;f=j.filter_ignoreCase?h[a].toLocaleLowerCase(): h[a];if(j.filter_functions&&j.filter_functions[a])!0===j.filter_functions[a]?x=C.filter('[data-column="'+a+'"]:last').hasClass("filter-match")?0<=m.search(f):h[a]===n:"function"===typeof j.filter_functions[a]?x=j.filter_functions[a](n,v.cache[e].normalized[d][a],h[a],a):"function"===typeof j.filter_functions[a][h[a]]&&(x=j.filter_functions[a][h[a]](n,v.cache[e].normalized[d][a],h[a],a));else if(L.test(f)){u=L.exec(f);try{x=RegExp(u[1],u[2]).test(m)}catch(D){x=!1}}else if(f.replace(U,"")==m)x=!0;else if(/^\!/.test(f))f= f.replace("!",""),s=m.search(b.trim(f)),x=""===f?!0:!(j.filter_startsWith?0===s:0<=s);else if(/^[<>]=?/.test(f))u=isNaN(m)?E(m.replace(G,""),c):E(m,c),s=E(f.replace(G,"").replace(V,""),c),/>/.test(f)&&(x=/>=/.test(f)?u>=s:u>s),/</.test(f)&&(x=/<=/.test(f)?u<=s:u<s),""===s&&(x=!0);else if(/\s+(AND|&&)\s+/g.test(h[a])){s=f.split(/(?:\s+(?:and|&&)\s+)/g);x=0<=m.search(b.trim(s[0]));for(A=s.length-1;x&&A;)x=x&&0<=m.search(b.trim(s[A])),A--}else/\s+(-|to)\s+/.test(f)?(u=isNaN(m)?E(m.replace(G,""),c):E(m, c),s=f.split(/(?: - | to )/),A=E(s[0].replace(G,""),c),z=E(s[1].replace(G,""),c),A>z&&(x=A,A=z,z=x),x=u>=A&&u<=z||""===A||""===z?!0:!1):/[\?|\*]/.test(f)||/\s+OR\s+/.test(h[a])?x=RegExp(f.replace(/\s+or\s+/gi,"|").replace(/\?/g,"\\S{1}").replace(/\*/g,"\\S*")).test(m):(n=(m+p).indexOf(f),x=!j.filter_startsWith&&0<=n||j.filter_startsWith&&0===n);t=x?t?!0:!1:!1}l[d].style.display=t?"":"none";l.eq(d)[t?"removeClass":"addClass"]("filtered");if(q.length)q[t?"show":"hide"]()}b.tablesorter.processTbody(c, g,!1)}K=k;v.debug&&B.benchmark("Completed filter widget search",F);y.trigger("applyWidgets");y.trigger("filterEnd")},Q=function(a,f){var h,g=[];a=parseInt(a,10);h='<option value="">'+(C.filter('[data-column="'+a+'"]:last').attr("data-placeholder")||"")+"</option>";for(e=0;e<J.length;e++){k=v.cache[e].row.length;for(d=0;d<k;d++)j.filter_useParsedData?g.push(""+v.cache[e].normalized[d][a]):(p=v.cache[e].row[d][0].cells[a])&&g.push(b.trim(v.supportsTextContent?p.textContent:b(p).text()))}g=b.grep(g, function(a,c){return b.inArray(a,g)===c});g=B.sortText?g.sort(function(b,d){return B.sortText(c,b,d,a)}):g.sort(!0);for(e=0;e<g.length;e++)h+=""!==g[e]?'<option value="'+g[e].replace(/\"/g,"&quot;")+'">'+g[e]+"</option>":"";y.find("thead").find("select."+D+'[data-column="'+a+'"]')[f?"html":"append"](h)},R=function(b){for(a=0;a<I;a++)if(p=C.filter('[data-column="'+a+'"]:last'),(p.hasClass("filter-select")||j.filter_functions&&!0===j.filter_functions[a])&&!p.hasClass("filter-false"))j.filter_functions|| (j.filter_functions={}),j.filter_functions[a]=!0,Q(a,b)};v.debug&&(N=new Date);j.filter_ignoreCase=!1!==j.filter_ignoreCase;j.filter_useParsedData=!0===j.filter_useParsedData;if(!1!==j.filter_columnFilters&&C.filter(".filter-false").length!==C.length){p='<tr class="tablesorter-filter-row">';for(a=0;a<I;a++)p+="<td></td>";h=y.find("thead").eq(0).append(p+="</tr>").find("td");for(a=0;a<I;a++)F=!1,t=C.filter('[data-column="'+a+'"]:last'),g=j.filter_functions&&j.filter_functions[a]&&"function"!==typeof j.filter_functions[a]|| t.hasClass("filter-select"),F=B.getData?"false"===B.getData(t[0],v.headers[a],"filter"):v.headers[a]&&v.headers[a].hasOwnProperty("filter")&&!1===v.headers[a].filter||t.hasClass("filter-false"),g?p=b("<select>").appendTo(h.eq(a)):(j.filter_formatter&&b.isFunction(j.filter_formatter[a])?((p=j.filter_formatter[a](h.eq(a),a))&&0===p.length&&(p=h.eq(a).children("input")),p&&(0===p.parent().length||p.parent().length&&p.parent()[0]!==h[a])&&h.eq(a).append(p)):p=b('<input type="search">').appendTo(h.eq(a)), p&&p.attr("placeholder",t.attr("data-placeholder")||"")),p&&(p.addClass(D).attr("data-column",a),F&&(p.addClass("disabled")[0].disabled=!0))}y.bind("addRows updateCell update updateRows appendCache filterReset search ".split(" ").join(".tsfilter "),function(a,b){/(search|filterReset)/.test(a.type)||R(!0);"filterReset"===a.type&&y.find("."+D).val("");H("search"===a.type?b:!1);return!1}).find("input."+D).bind("keyup search",function(a,b){if(!("keyup"===a.type&&(32>a.which&&8!==a.which||37<=a.which&& 40>=a.which)))return"undefined"!==typeof b&&!0!==b&&H(b),clearTimeout(O),O=setTimeout(function(){H(!1)},j.filter_searchDelay||300),!1});M=C.map(function(a){return B.getData?"parsed"===B.getData(C.filter('[data-column="'+a+'"]:last'),v.headers[a],"filter"):b(this).hasClass("filter-parsed")}).get();j.filter_reset&&b(j.filter_reset).length&&b(j.filter_reset).bind("click.tsfilter",function(){y.trigger("filterReset")});if(j.filter_functions)for(z in j.filter_functions)if(j.filter_functions.hasOwnProperty(z)&& "string"===typeof z)if(p=C.filter('[data-column="'+z+'"]:last'),g="",!0===j.filter_functions[z]&&!p.hasClass("filter-false"))Q(z);else if("string"===typeof z&&!p.hasClass("filter-false")){for(l in j.filter_functions[z])"string"===typeof l&&(g+=""===g?'<option value="">'+(p.attr("data-placeholder")||"")+"</option>":"",g+='<option value="'+l+'">'+l+"</option>");y.find("thead").find("select."+D+'[data-column="'+z+'"]').append(g)}R(!0);y.find("select."+D).bind("change search",function(){H()});!0===j.filter_hideFilters&& y.find(".tablesorter-filter-row").addClass("hideme").bind("mouseenter mouseleave",function(a){var c;r=b(this);clearTimeout(q);q=setTimeout(function(){/enter|over/.test(a.type)?r.removeClass("hideme"):b(document.activeElement).closest("tr")[0]!==r[0]&&(c=y.find("."+(j.filter_cssFilter||"tablesorter-filter")).map(function(){return b(this).val()||""}).get().join(""),""===c&&r.addClass("hideme"))},200)}).find("input, select").bind("focus blur",function(a){w=b(this).closest("tr");clearTimeout(q);q=setTimeout(function(){if(""=== y.find("."+(j.filter_cssFilter||"tablesorter-filter")).map(function(){return b(this).val()||""}).get().join(""))w["focus"===a.type?"removeClass":"addClass"]("hideme")},200)});v.showProcessing&&y.bind("filterStart.tsfilter filterEnd.tsfilter",function(a,c){var d=c?y.find("."+v.cssHeader).filter("[data-column]").filter(function(){return""!==c[b(this).data("column")]}):"";B.isProcessing(y[0],"filterStart"===a.type,c?d:"")});v.debug&&B.benchmark("Applying Filter widget",N);y.trigger("filterInit");H()}}, remove:function(c,a,d){var e,k;e=b(c);a=a.$tbodies;e.removeClass("hasFilters").unbind("addRows updateCell update appendCache search filterStart filterEnd ".split(" ").join(".tsfilter ")).find(".tablesorter-filter-row").remove();for(e=0;e<a.length;e++)k=b.tablesorter.processTbody(c,a.eq(e),!0),k.children().removeClass("filtered").show(),b.tablesorter.processTbody(c,k,!1);d.filterreset&&b(d.filter_reset).unbind("click.tsfilter")}});
b.tablesorter.addWidget({id:"stickyHeaders",format:function(c){if(!b(c).hasClass("hasStickyHeaders")){var a= b(c).addClass("hasStickyHeaders"),d=c.config,e=d.widgetOptions,k=b(window),f=b(c).children("thead:first"),g=f.children("tr:not(.sticky-false)").children();c=e.stickyHeaders||"tablesorter-stickyHeader";var n=g.eq(0).parent(),m=a.find("tfoot"),e=e.$sticky=a.clone(),q=e.children("thead:first").addClass(c).css({width:f.outerWidth(!0),position:"fixed",margin:0,top:0,visibility:"hidden",zIndex:1}),l=q.children("tr:not(.sticky-false)").children(),r="",w=0,t=function(){var c=navigator.userAgent;w=0;"collapse"!== a.css("border-collapse")&&!/(webkit|msie)/i.test(c)&&(w=2*parseInt(g.eq(0).css("border-left-width"),10));q.css({left:f.offset().left-k.scrollLeft()-w,width:f.outerWidth()});l.each(function(a){a=g.eq(a);b(this).css({width:a.width()-w,height:a.height()})}).find(".tablesorter-header-inner").each(function(a){a=g.eq(a).find(".tablesorter-header-inner").width();b(this).width(a)})};e.find("thead:gt(0),tr.sticky-false,tbody,tfoot,caption").remove();e.css({height:0,width:0,padding:0,margin:0,border:0});q.find("tr.sticky-false").remove(); l.find(".tablesorter-resizer").remove();a.bind("sortEnd.tsSticky",function(){g.each(function(a){a=l.eq(a);a.attr("class",b(this).attr("class"));d.cssIcon&&a.find("."+d.cssIcon).attr("class",b(this).find("."+d.cssIcon).attr("class"))})}).bind("pagerComplete.tsSticky",function(){t()});g.find("*")[b.fn.addBack?"addBack":"andSelf"]().filter(d.selectorSort).each(function(a){var c=b(this);l.eq(a).bind("mouseup",function(a){c.trigger(a,!0)}).bind("mousedown",function(){this.onselectstart=function(){return!1}; return!1})});a.after(e);k.bind("scroll.tsSticky",function(){var b=n.offset(),c=k.scrollTop(),d=a.height()-(q.height()+(m.height()||0)),b=c>b.top&&c<b.top+d?"visible":"hidden";q.css({left:f.offset().left-k.scrollLeft()-w,visibility:b});b!==r&&(t(),r=b)}).bind("resize.tsSticky",function(){t()})}},remove:function(c,a,d){c=b(c);a=d.stickyHeaders||"tablesorter-stickyHeader";c.removeClass("hasStickyHeaders").unbind("sortEnd.tsSticky pagerComplete.tsSticky").find("."+a).remove();d.$sticky&&d.$sticky.remove(); b(window).unbind("scroll.tsSticky resize.tsSticky")}});
b.tablesorter.addWidget({id:"resizable",format:function(c){if(!b(c).hasClass("hasResizable")){b(c).addClass("hasResizable");var a,d,e,k,f,g,n,m,q,l=b(c),r=c.config,w=r.widgetOptions,t=0,h=null,u=null,s=20>Math.abs(l.parent().width()-l.width()),p=function(){b.tablesorter.storage&&h&&(f[h.index()]=h.width(),f[u.index()]=u.width(),h.width(f[h.index()]),u.width(f[u.index()]),!1!==w.resizable&&b.tablesorter.storage(c,"tablesorter-resizable",f));t= 0;h=u=null;b(window).trigger("resize")};if(f=b.tablesorter.storage&&!1!==w.resizable?b.tablesorter.storage(c,"tablesorter-resizable"):{})for(k in f)!isNaN(k)&&k<r.headerList.length&&b(r.headerList[k]).width(f[k]);a=l.children("thead:first").children("tr");a.children().each(function(){d=b(this);e=d.attr("data-column");k="false"===b.tablesorter.getData(d,r.headers[e],"resizable");a.children().filter('[data-column="'+e+'"]').toggleClass("resizable-false",k)});a.each(function(){g=b(this).children(":not(.resizable-false)"); b(this).find(".tablesorter-wrapper").length||g.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>');g=g.slice(0,-1);n=n?n.add(g):g});n.each(function(){a=b(this);k=parseInt(a.css("padding-right"),10)+10;d='<div class="tablesorter-resizer" style="cursor:w-resize;position:absolute;z-index:1;right:-'+k+'px;top:0;height:100%;width:20px;"></div>';a.find(".tablesorter-wrapper").append(d)}).bind("mousemove.tsresize",function(a){0!==t&&h&&(m=a.pageX-t,q=h.width(), h.width(q+m),h.width()!==q&&s&&u.width(u.width()-m),t=a.pageX)}).bind("mouseup.tsresize",function(){p()}).find(".tablesorter-resizer,.tablesorter-resizer-grip").bind("mousedown",function(a){h=b(a.target).closest("th");d=r.$headers.filter('[data-column="'+h.attr("data-column")+'"]');1<d.length&&(h=h.add(d));u=a.shiftKey?h.parent().find("th:not(.resizable-false)").filter(":last"):h.nextAll(":not(.resizable-false)").eq(0);t=a.pageX});l.find("thead:first").bind("mouseup.tsresize mouseleave.tsresize", function(){p()}).bind("contextmenu.tsresize",function(){b.tablesorter.resizableReset(c);var a=b.isEmptyObject?b.isEmptyObject(f):f==={};f={};return a})}},remove:function(c){b(c).removeClass("hasResizable").find("thead").unbind("mouseup.tsresize mouseleave.tsresize contextmenu.tsresize").find("tr").children().unbind("mousemove.tsresize mouseup.tsresize").find(".tablesorter-resizer,.tablesorter-resizer-grip").remove();b.tablesorter.resizableReset(c)}});
b.tablesorter.resizableReset=function(c){b(c.config.headerList).filter(":not(.resizable-false)").css("width", "");b.tablesorter.storage&&b.tablesorter.storage(c,"tablesorter-resizable",{})};
b.tablesorter.addWidget({id:"saveSort",init:function(b,a){a.format(b,!0)},format:function(c,a){var d,e,k=b(c),f=c.config;d=!1!==f.widgetOptions.saveSort;var g={sortList:f.sortList};f.debug&&(e=new Date);k.hasClass("hasSaveSort")?d&&(c.hasInitialized&&b.tablesorter.storage)&&(b.tablesorter.storage(c,"tablesorter-savesort",g),f.debug&&b.tablesorter.benchmark("saveSort widget: Saving last sort: "+f.sortList,e)):(k.addClass("hasSaveSort"), g="",b.tablesorter.storage&&(g=(d=b.tablesorter.storage(c,"tablesorter-savesort"))&&d.hasOwnProperty("sortList")&&b.isArray(d.sortList)?d.sortList:"",f.debug&&b.tablesorter.benchmark('saveSort: Last sort loaded: "'+g+'"',e),k.bind("saveSortReset",function(){b.tablesorter.storage(c,"tablesorter-savesort","")})),a&&g&&0<g.length?f.sortList=g:c.hasInitialized&&(g&&0<g.length)&&k.trigger("sorton",[g]))},remove:function(c){b.tablesorter.storage&&b.tablesorter.storage(c,"tablesorter-savesort","")}})
})(jQuery);

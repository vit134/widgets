$(document).ready(function(){function e(e){for(var a=0,t=0;e.length>t;t++)a+=e[t];return a/e.length}try{var a,t;$.ajax({url:"https://js.dooh.xyz/exchange_dynamics/server/redirect.php",beforeSend:function(){a=new Date,t=a.getTime()},success:function(n){a=new Date,console.log((a.getTime()-t)/1e3);try{console.log("exchange_dynamics data - ",JSON.parse(n));var o=JSON.parse(n),i={};for(var r in o){i[r]={},i[r].labels=[],i[r].series=[];var s=[];for(var l in o[r])i[r].labels.push(l),s.push({meta:"descr",value:parseFloat(o[r][l].USD.replace(" RUB","").replace(",","."))}),i[r].series=new Array(s)}var u=[];for(var d in i)u.push(d);console.log(i);var m={width:480,height:300,fullWidth:!0};$(".header__mounth").html(u[0]);var c=new Chartist.Line(".ct-chart",i[u[0]],m),p=0;c.on("created",function(){p=0});var h=[];c.on("draw",function(e){if(p++,"point"==e.type&&(h[e.index]=e.value.y),"line"===e.type)e.element.animate({opacity:{begin:80*p+1e3,dur:500,from:0,to:1}});else if("label"===e.type&&"x"===e.axis)e.element.animate({y:{begin:80*p,dur:500,from:e.y+100,to:e.y,easing:"easeOutQuart"}});else if("label"===e.type&&"y"===e.axis)e.element.animate({x:{begin:80*p,dur:500,from:e.x-100,to:e.x,easing:"easeOutQuart"}});else if("point"===e.type)e.element.animate({x1:{begin:80*p,dur:500,from:e.x-10,to:e.x,easing:"easeOutQuart"},x2:{begin:80*p,dur:500,from:e.x-10,to:e.x,easing:"easeOutQuart"},opacity:{begin:80*p,dur:500,from:0,to:1,easing:"easeOutQuart"}});else if("grid"===e.type){var a={begin:80*p,dur:500,from:e[e.axis.units.pos+"1"]-30,to:e[e.axis.units.pos+"1"],easing:"easeOutQuart"},t={begin:80*p,dur:500,from:e[e.axis.units.pos+"2"]-100,to:e[e.axis.units.pos+"2"],easing:"easeOutQuart"},n={};n[e.axis.units.pos+"1"]=a,n[e.axis.units.pos+"2"]=t,n.opacity={begin:80*p,dur:500,from:0,to:1,easing:"easeOutQuart"},e.element.animate(n)}});var g=1;c.on("created",function(a){$(".js-descr-max").html(Math.max.apply(Math,h).toFixed(2)),$(".js-descr-min").html(Math.min.apply(Math,h).toFixed(2)),$(".js-descr-average").html(e(h).toFixed(2)),setTimeout(function(){$(".js-description").addClass("active")},12e3),window.__exampleAnimateTimeout&&(clearTimeout(window.__exampleAnimateTimeout),window.__exampleAnimateTimeout=null),window.__exampleAnimateTimeout=setTimeout(function(){g<u.length?($(".header__mounth").html(u[g]),$(".js-description").removeClass("active"),c.update(i[u[g]]),g++):(g=0,$(".header__mounth").html(u[g]),$(".js-description").removeClass("active"),c.update(i[u[g]]))},18e3)}),$(".content__wrapper").show(),$(".js-block").eq(0).fadeIn(500).addClass("active"),$(".preloader").hide()}catch(e){console.log(e),console.log("ошибка внутри ajax")}},complete:function(){},error:function(e,a,t){console.log(e,a,t),$(".preloader").addClass("error")}})}catch(e){console.log(e),console.log("ошибка ajax"),$(".preloader").addClass("error")}});
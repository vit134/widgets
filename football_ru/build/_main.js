$(document).ready(function(){function t(t,a){var e="front"===a?$(".js-block-front[data-clone=true]"):$(".js-block-back[data-clone=true]");e.find(".js-table").html("");var s=t.date.split("-"),o=new Date(s[2],s[1]-1,s[0]),r={year:"numeric",month:"short",day:"numeric"};if(o=o.toLocaleString("ru",r),e.find(".js-home-team").html(t.home_team),e.find(".js-score").html(t.score),e.find(".js-avay-team").html(t.away_team),e.find(".js-date").html(o),t.descr){for(var l=0;4>l;l++)e.find(".js-table").append(t.descr[l]);$(".js-table").find("img").each(function(){switch($(this).attr("alt")){case"goal":$(this).attr("src","https://js.dooh.xyz/football_ru/server/images/ball.svg");break;case"redcard":$(this).attr("src","https://js.dooh.xyz/football_ru/server/images/redcard.svg");break;case"yellowcard":$(this).attr("src","https://js.dooh.xyz/football_ru/server/images/yellowcard.svg")}})}else e.find(".js-table").html('<tr><td class="not-start">'+t.status+"</td></tr>");switch(t.status){case"Не начался":e.find(".js-table").html('<tr><td class="not-start">'+t.status+"<div> начало в </div><div>"+t.time+"</div></td></tr>");break;case"Техн. победа":e.find(".js-table").html('<tr><td class="custom">'+t.status+"</td></tr>")}$(".js-table").animate({opacity:1},300)}try{var a,e;$.ajax({url:"https://js.dooh.xyz/football_ru/server/redirect.php",beforeSend:function(){a=new Date,e=a.getTime()},success:function(s){a=new Date,console.log((a.getTime()-e)/1e3);try{console.log("football data - ",JSON.parse(s)),s=JSON.parse(s),t(s[0],"front"),t(s[1],"back");var o=2;setInterval(function(){o<s.length?(o%2?($(".flip-container").removeClass("flip"),t(s[o],"front")):($(".flip-container").addClass("flip"),t(s[o],"back")),o++):(o%2?($(".flip-container").removeClass("flip"),t(s[0],"front"),t(s[1],"back")):($(".flip-container").addClass("flip"),t(s[0],"back"),t(s[1],"front")),o=2)},1e4),$(".preloader").animate({width:"500px",height:"500px","margin-left":"-250px","margin-top":"-250px",opacity:.2},500,function(){$(this).addClass("slow")}),setTimeout(function(){$(".content").show()},600)}catch(t){console.log(t),console.log("ошибка внутри ajax")}},complete:function(){},error:function(t,a,e){console.log(t,a,e),$(".preloader").addClass("error")}})}catch(t){console.log(t),console.log("ошибка ajax"),$(".preloader").addClass("error")}});
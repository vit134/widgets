function updateVars(){$container=$(".js-content"),$block=$(".js-block")}function init(){updateVars();try{$.ajax({url:"https://js.dooh.xyz/coindesk/server/index.php",dataType:"json",beforeSend:function(){time=new Date,startTime=time.getTime()},success:function(t){data=t;var e=(random(0,data.length),tmpl("template",data)),n=0;$container.html(e),updateVars(),$block.eq(n).addClass("active");var a=setTimeout(function t(){n==data.length-1?(n=0,$block.removeClass("active").eq(0).addClass("active")):(n++,$block.removeClass("active").eq(n).addClass("active")),a=setTimeout(t,1e4)},1e4)}})}catch(t){$container.hide(),console.log("Coindesk ajax err",t)}}function random(t,e){var n=t-.5+Math.random()*(e-t+1);return n=Math.round(n)}var $container=$(".js-content"),$block;!function(){var t={};this.tmpl=function e(n,a){var o=/^[\w-]+$/.test(n)?t[n]=t[n]||e(document.getElementById(n).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");return a?o(a):o}}(),init();
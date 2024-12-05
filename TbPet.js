$(document).ready(function(){
	function start_dialog(init_time, show_time, zs_time, hide_time, init_text, text) {
		$(".tbpet").off();
		if (init_time < 500) {
			init_time = 500;
		}
		var num1 = 2;
		var num2 = 0;
		if (text.length == 0) {
			text.length = 1;
			num1 = 1;
			num2 = 1;
		}
		$(".dialog").text(init_text);
		var init_timer = setTimeout(function() {
			$(".dialog").show(show_time);
			clearTimeout(init_timer);
		}, init_time - 500);
		var timer_arry = new Array(text.length * 3);
		for (let index = 0; index < text.length - num2; index++) {
		    timer_arry[index] = setTimeout(function(){
		      	$(".dialog").hide(hide_time);
		      	clearTimeout(timer_arry[index]);
	        }, init_time + show_time + zs_time + ((show_time + zs_time + hide_time) * index));
	        timer_arry[index + text.length] = setTimeout(function(){
	        	$(".dialog").text(text[index]);
	        	clearTimeout(timer_arry[index + text.length]);
	        }, init_time + show_time + zs_time + hide_time + ((show_time + zs_time + hide_time) * index));
	        timer_arry[index + (text.length * 2)] = setTimeout(function(){
	        	$(".dialog").show(show_time);
	        	clearTimeout([index + (text.length * 2)]);
	        }, init_time + show_time + zs_time + hide_time + ((show_time + zs_time + hide_time) * index)); 
		};
		var over_timer = setTimeout(function(){
		    $(".dialog").hide(hide_time);
		    $(".tbpet").dblclick(function() {
    			var cgimg_timer1 = setTimeout(function(){
			    	$(".tbpet").attr("src","happy.gif");
			    	clearTimeout(cgimg_timer1);
			    }, 0);
			    var cgimg_timer2 = setTimeout(function(){
			    	$(".tbpet").attr("src","static.jpg");
			    	clearTimeout(cgimg_timer2);
			    }, 7500);
    			end_time = start_dialog(200, 1000, 1000, 200, "开心~开心~开心~", ["你回应我我很开心~","试着对我做点什么叭~"]);
			});
			$(".tbpet").mousemove(function(e) {
			  	if (((e.pageX >= 1255 && e.pageX <= 1273) || (e.pageX >= 1299 && e.pageX <= 1313)) && e.pageY >= 690 && e.pageY <= 704) {
			  		end_time = start_dialog(200, 200, 200, 100, "别碰我耳朵，我生气了！", []);
			  	};
			  	if (e.pageX >= 1265 && e.pageX <= 1301 && e.pageY >= 709 && e.pageY <= 752) {
			  		end_time = start_dialog(200, 200, 200, 100, "把我妆弄花了~", []);
			  	};
			  	if (e.pageX >= 1255 && e.pageX <= 1313 && e.pageY >= 797 && e.pageY <= 820) {
			  		end_time = start_dialog(200, 200, 200, 100, "这是你该碰的地方吗？流氓", []);
			  	};
			});
		    clearTimeout(over_timer);
        }, init_time + (show_time * num1) + (zs_time * num1) + hide_time + ((show_time + zs_time + hide_time) * (text.length - 1)));
        return init_time + (show_time * num1) + (zs_time * num1) + (hide_time * 2) + ((show_time + zs_time + hide_time) * (text.length - 1));
	};
    var cgimg_timer = setTimeout(function(){
    	$(".tbpet").attr("src","static.jpg");
    	clearTimeout(cgimg_timer);
    }, 7500);
    end_time = start_dialog(200, 2000, 1500, 500, "啊~睡得好舒服呀~", ["我好想你啊~","试着对我做点什么叭~"]);
});
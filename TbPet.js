$(document).ready(function(){
	var incident_arry = [{data: "我们认识",time: "2023-01-19"},
		{data: "我成为你女朋友",time: "2023-02-11"},
		{data: "我们订婚",time: "2023-05-05"},
		{data: "我们登记",time: "2023-07-26"},
		{data: "我们结婚",time: "2023-09-30"},
		{data: "我的孩子出生",time: "2024-11-04"}];
	
	function daysUntil(targetDate) {
		const today = new Date();
		const target = new Date(targetDate);
		const difference = today - target;
		return Math.ceil(difference / (1000 * 60 * 60 * 24));
	};

	function start_dialog(init_time, show_time, zs_time, hide_time, init_text, text) {
		$(".dialog").attr("lock", "TRUE");
		if (init_time < 500) {
			init_time = 500;
		};
		var num1 = 2;
		var num2 = 0;
		if (text.length == 0) {
			text.length = 1;
			num1 = 1;
			num2 = 1;
		};
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
		    $(".dialog").attr("lock", "FALSE");
		    clearTimeout(over_timer);
        }, init_time + (show_time * num1) + (zs_time * num1) + hide_time + ((show_time + zs_time + hide_time) * (text.length - 1)));
        return init_time + (show_time * num1) + (zs_time * num1) + (hide_time * 2) + ((show_time + zs_time + hide_time) * (text.length - 1));
	};

    var cgimg_timer = setTimeout(function(){
    	$(".tbpet").attr({"src": "static.jpg", "lock": "FALSE"});
    	clearTimeout(cgimg_timer);
    }, 7500);
    end_time = start_dialog(200, 1000, 500, 200, "啊~睡得好舒服呀~", ["我好想你啊~","试着对我做点什么叭~"]);

    $(".tbpet").dblclick(function() {
    	if ($(".dialog").attr("lock") == "FALSE" && $(".tbpet").attr("lock") == "FALSE") {
	    	$(".tbpet").attr("lock", "TRUE");
			$(".tbpet").attr("src","happy.gif");
			var cgimg_timer = setTimeout(function(){
				$(".tbpet").attr({"src": "static.jpg", "lock": "FALSE"});
				clearTimeout(cgimg_timer);
			}, 7500);
			var incident = incident_arry[Math.floor(Math.random() * 7)];
			end_time = start_dialog(200, 1000, 1000, 200, "你回应我我很开心~", ["今天是" + incident.data + "的第" + daysUntil(incident.time) + "天","试着对我做点什么叭~"]);
		};
	});

	$(".lt_ear").mouseover(function() {
		if ($(".dialog").attr("lock") == "FALSE" && $(".tbpet").attr("lock") == "FALSE") {
			$(".tbpet").attr("lock", "TRUE");
			end_time = start_dialog(200, 200, 700, 200, "别碰我左耳朵，我生气了！", []);
			$(".tbpet").attr("src","small.gif");
			var cgimg_timer = setTimeout(function(){
				$(".tbpet").attr({"src": "static.jpg", "lock": "FALSE"});
				clearTimeout(cgimg_timer);
			}, 1000);
		};
	});

	$(".rt_ear").mouseover(function() {
		if ($(".dialog").attr("lock") == "FALSE" && $(".tbpet").attr("lock") == "FALSE") {
			$(".tbpet").attr("lock", "TRUE");
			end_time = start_dialog(200, 200, 700, 200, "别碰我右耳朵，我生气了！", []);
			$(".tbpet").attr("src","small.gif");
			var cgimg_timer = setTimeout(function(){
				$(".tbpet").attr({"src": "static.jpg", "lock": "FALSE"});
				clearTimeout(cgimg_timer);
			}, 1000);
		};
	});

	$(".face").mouseover(function() {
		if ($(".dialog").attr("lock") == "FALSE" && $(".tbpet").attr("lock") == "FALSE") {
			$(".tbpet").attr("lock", "TRUE");
			end_time = start_dialog(200, 200, 700, 200, "把我妆弄花了~", []);
			$(".tbpet").attr("src","small.gif");
			var cgimg_timer = setTimeout(function(){
				$(".tbpet").attr({"src": "static.jpg", "lock": "FALSE"});
				clearTimeout(cgimg_timer);
			}, 1000);
		};
	});

	$(".chest").mouseover(function() {
		if ($(".dialog").attr("lock") == "FALSE" && $(".tbpet").attr("lock") == "FALSE") {
			$(".tbpet").attr("lock", "TRUE");
			end_time = start_dialog(200, 200, 700, 200, "这是你该碰的地方吗？流氓", []);
			$(".tbpet").attr("src","small.gif");
			var cgimg_timer = setTimeout(function(){
				$(".tbpet").attr({"src": "static.jpg", "lock": "FALSE"});
				clearTimeout(cgimg_timer);
			}, 1000);
		};
	});
});

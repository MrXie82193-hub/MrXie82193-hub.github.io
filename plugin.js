$(document).ready(function() {
		$.ajax({
			type: "POST",
		   	url: "https://cn.apihz.cn/api/ip/getapi.php",
		   	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38",
		   	dataType: "json",
			success: function(data){
				console.log(data.ip);
				$.ajax({
				   	type: "POST",
				   	url: "https://cn.apihz.cn/api/tianqi/tqybip.php",
				   	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38&ip=" + data.ip,
				   	dataType: "json",
					success: function(data){
						console.log(data);
						$("#place").text(data.place);
						$("#weather").text(data.weather1 + "-" + data.weather2);
						$("#temperature").text("温度：" + data.temperature + "度");
						$("#precipitation").text("降水量：" + data.precipitation);
						$("#windDirection").text("风向：" + data.windDirection);
						$("#windScale").text("风速：" + data.windScale);		
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
					    console.error("AJAX请求发生错误:", textStatus, errorThrown);
					}
				});
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			    console.error("AJAX请求发生错误:", textStatus, errorThrown);
			}
		});
		$.ajax({
		   	type: "POST",
		   	url: "https://cn.apihz.cn/api/yiyan/api.php",
		   	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38",
		   	dataType: "json",
			success: function(data){
				console.log(data);
				$(".sentence").text(data.msg);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			    console.error("AJAX请求发生错误:", textStatus, errorThrown);
			}
		});
		$.ajax({
		   	type: "POST",
		   	url: "https://cn.apihz.cn/api/time/getday.php",
		   	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38",
		   	dataType: "json",
			success: function(data){
				console.log(data);
				$("#data1").text(data.ynian + "-" + data.yyue + "-" + data.yri + " " + data.xingqi);
				$("#data2").text(data.ganzhinian + " " +  data.shengxiao + "年 "+ data.ganzhiyue + " " + data.ganzhiri);
				$("#data3").text("农历 " + data.nyue + " " + data.nri);
				$("#data4").text("节日：" + data.jieri);
				$("#data5").text("宜：" + data.yi);
				$("#data6").text("忌：" + data.ji);
				$("#data7").text("节气：" + data.jijie + " " + data.jieqimsg);		
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			    console.error("AJAX请求发生错误:", textStatus, errorThrown);
			}
		});
	});
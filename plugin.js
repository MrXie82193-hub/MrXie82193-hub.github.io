$(document).ready(function() {
		let min = 0;
		let weizhi = "";
		let leve = "";
		let addtime = "";
		function deg2rad(deg) {
			return deg * (Math.PI / 180);
		};
		function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
			const R = 6371;
			const dLat = deg2rad(lat2 - lat1);
			const dLon = deg2rad(lon2 - lon2);
			const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const d = R * c;
			return d;
		};
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
				$.ajax({
				   	type: "POST",
				   	url: "https://cn.apihz.cn/api/ip/ipbaidu.php",
				   	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38&ip=" + data.ip,
				   	dataType: "json",
					success: function(data){
						console.log(data);
						let lat = data.y;
						let lon = data.x;
						console.log(lat + " " + lon);
						$.ajax({
						   	type: "POST",
						   	url: "https://cn.apihz.cn/api/tianqi/dizhen.php",
						   	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38",
						   	dataType: "json",
							success: function(data){
								datas = data.data;
								console.log(datas);
								for (let index = 0; index < datas.length; index++) {
									let distanceInKm = getDistanceFromLatLonInKm(lat, lon, datas[index].weidu, datas[index].jingdu);
									if (index == 0) {
										min = distanceInKm;
										weizhi = datas[0].weizhi;
										leve = datas[0].leve;
										addtime = datas[0].addtime;
									} else {
										if (min > distanceInKm) {
											min = distanceInKm;
											weizhi = datas[index].weizhi;
											leve = datas[index].leve;
											addtime = datas[index].addtime;
										};
									};
								};
								$(".sentence").text("近期距离您最近的(" + Math.round(min * 100) / 100 + "Km)地震是 " + addtime + " 发生在 " + weizhi + " 的 " + leve + " 级地震" );
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
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			    console.error("AJAX请求发生错误:", textStatus, errorThrown);
			}
		});
		// $.ajax({
		//    	type: "POST",
		//    	url: "https://cn.apihz.cn/api/yiyan/api.php",
		//    	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38",
		//    	dataType: "json",
		// 	success: function(data){
		// 		console.log(data);
		// 		$(".sentence").text(data.msg);
		// 	},
		// 	error: function (XMLHttpRequest, textStatus, errorThrown) {
		// 	    console.error("AJAX请求发生错误:", textStatus, errorThrown);
		// 	}
		// });
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
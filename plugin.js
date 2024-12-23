$(document).ready(function() {
		let mindistancem = 0;
		let earthquakes = [];
		let earthquake = {
			index: 0,
			issame: false,
			weizhi: "",
			leve: "",
			addtime: ""
		};

		function calculateDistance(lat1, lon1, lat2, lon2) {
		    const a = 6378137;
		    const b = 6356752.314245;
		    const f = 1 / 298.257223563;
		    const L = (lon2 - lon1) * Math.PI / 180;
		    const U1 = Math.atan((1 - f) * Math.tan(lat1 * Math.PI / 180));
		    const U2 = Math.atan((1 - f) * Math.tan(lat2 * Math.PI / 180));
		    const sinU1 = Math.sin(U1);
		    const cosU1 = Math.cos(U1);
		    const sinU2 = Math.sin(U2);
		    const cosU2 = Math.cos(U2);
		    let lambda = L;
		    let iterLimit = 100;
		    let cosSqAlpha;
		    let sinSigma;
		    let cos2SigmaM;
		    let sigma;
		    let sinLambda, cosLambda;
		    let sinAlpha;
		    let C;
		    let uSq;
		    let deltaLambda;
		    let lambdaP;
		    do {
		        sinLambda = Math.sin(lambda);
		        cosLambda = Math.cos(lambda);
		        sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) +
		            (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) *
		            (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
		        if (sinSigma === 0) {
		            return 0;
		        }
		        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
		        sigma = Math.atan2(sinSigma, cosSigma);
		        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
		        cosSqAlpha = 1 - sinAlpha * sinAlpha;
		        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
		        if (Number.isNaN(cos2SigmaM)) {
		            cos2SigmaM = 0;
		        }
		        C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
		        lambdaP = lambda;
		        lambda = L + (1 - C) * f * sinAlpha *
		            (sigma + C * sinSigma *
		             (cos2SigmaM + C * cosSigma *
		              (-1 + 2 * cos2SigmaM * cos2SigmaM)));
		    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
		 
		    if (iterLimit === 0) {
		        return NaN;
		    }
		 
		    uSq = cosSqAlpha * (a * a - b * b) / (b * b);
		    const A = 1 + uSq / 16384 *
		        (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
		    const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
		    const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 *
		        (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
		         B / 6 * cos2SigmaM *
		         (-3 + 4 * sinSigma * sinSigma) *
		         (-3 + 4 * cos2SigmaM * cos2SigmaM)));
		 
		    const distance = b * A * (sigma - deltaSigma);
		    return distance;
		};

		$.ajax({
			type: "POST",
		   	url: "https://cn.apihz.cn/api/ip/getapi.php",
		   	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38",
		   	dataType: "json",
			success: function(data){
				console.log("当前主机IP：" + data.ip);
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
						let lat = Math.round(data.y * 100) / 100;
						let lon = Math.round(data.x * 100) / 100;;
						console.log("当前位置经纬度：" + lat + " " + lon);
						$.ajax({
						   	type: "POST",
						   	url: "https://cn.apihz.cn/api/tianqi/dizhen.php",
						   	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38",
						   	dataType: "json",
							success: function(data){
								datas = data.data;
								earthquakes = [];
								for (let index = 0; index < datas.length; index++) {
									let distancem = calculateDistance(lat, lon, datas[index].weidu, datas[index].jingdu);
									if (index == 0) {
										mindistancem = distancem;
										earthquake.index = index;
									} else {
										if (mindistancem > distancem) {
											mindistancem = distancem;
											earthquake.index = index;
										};
									};
									earthquakes.push((Math.round(distancem / 1000 * 100) / 100) + "Km " + datas[index].weizhi + " " + datas[index].leve + " " + datas[index].addtime + " " + datas[index].weidu + " " + datas[index].jingdu);
								};
								if (earthquake.weizhi == datas[earthquake.index].weizhi && earthquake.leve == datas[earthquake.index].leve && earthquake.addtime == datas[earthquake.index].addtime) {
									earthquake.issame = true;
								} else {
									console.log(earthquakes);
									earthquake.issame = false;
									earthquake.weizhi = datas[earthquake.index].weizhi;
									earthquake.leve = datas[earthquake.index].leve;
									earthquake.addtime = datas[earthquake.index].addtime;
								}
								mindistancem = Math.round(mindistancem / 1000 * 100) / 100;
								if (mindistancem < 100 && earthquake.leve >= 4 && earthquake.issame != true) {
									alert("于 " + earthquake.addtime + " 发生在 " + earthquake.weizhi + " 的 " + earthquake.leve + " 级地震距离您过近(大约100Km以内)！请注意防范");		
								};
								$(".sentence").text("近期距离您最近的(大约" + mindistancem + "Km)地震是 " + earthquake.addtime + " 发生在 " + earthquake.weizhi + " 的 " + earthquake.leve + " 级地震" );
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
							    console.error("AJAX请求发生错误:", textStatus, errorThrown);
							}
						});
						var timer = setInterval(function() {
							$.ajax({
							   	type: "POST",
							   	url: "https://cn.apihz.cn/api/tianqi/dizhen.php",
							   	data: "id=10001564&key=00ddb337f8ce8a3909194ccc19294c38",
							   	dataType: "json",
								success: function(data){
									datas = data.data;
									earthquakes = [];
									for (let index = 0; index < datas.length; index++) {
										let distancem = calculateDistance(lat, lon, datas[index].weidu, datas[index].jingdu);
										if (index == 0) {
											mindistancem = distancem;
											earthquake.index = index;
										} else {
											if (mindistancem > distancem) {
												mindistancem = distancem;
												earthquake.index = index;
											};
										};
										earthquakes.push((Math.round(distancem / 1000 * 100) / 100) + "Km " + datas[index].weizhi + " " + datas[index].leve + " " + datas[index].addtime + " " + datas[index].weidu + " " + datas[index].jingdu);
									};
									if (earthquake.weizhi == datas[earthquake.index].weizhi && earthquake.leve == datas[earthquake.index].leve && earthquake.addtime == datas[earthquake.index].addtime) {
										earthquake.issame = true;
									} else {
										console.log(earthquakes);
										earthquake.issame = false;
										earthquake.weizhi = datas[earthquake.index].weizhi;
										earthquake.leve = datas[earthquake.index].leve;
										earthquake.addtime = datas[earthquake.index].addtime;
									}
									mindistancem = Math.round(mindistancem / 1000 * 100) / 100;
									if (mindistancem < 100 && earthquake.leve >= 4 && earthquake.issame != true) {
										alert("于 " + earthquake.addtime + " 发生在 " + earthquake.weizhi + " 的 " + earthquake.leve + " 级地震距离您过近(大约100Km以内)！请注意防范");
										$(".sentence").text("近期距离您最近的(大约" + mindistancem + "Km)地震是 " + earthquake.addtime + " 发生在 " + earthquake.weizhi + " 的 " + earthquake.leve + " 级地震" );
									};
								},
								error: function (XMLHttpRequest, textStatus, errorThrown) {
								    console.error("AJAX请求发生错误:", textStatus, errorThrown);
								}
							});
						}, 1000 * 60 * 30);
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

define(["jquery","template","bootstrap","radialIndicator"],function(jquery,template){
	var geoCoords = {
		"攀枝花":[101.716007,26.580446],
		"成都":[104.065735,30.659462],
		"自贡":[104.773447,29.352765],
		"德阳":[104.398651,31.127991],
		"泸州":[105.443348,28.889138],
		"绵阳":[104.741722,31.46402],
		"遂宁":[105.571331,30.513311],
		"内江":[105.066138,29.58708],
		"广元":[105.829757,32.433668],
		"眉山":[103.831788,30.048318],
		"南充":[106.082974,30.795281],
		"宜宾":[104.630825,28.760189],
		"广安":[106.633369,30.456398],
		"达州":[107.502262,31.209484],
		"雅安":[103.001033,29.987722],
		"乐山":[103.761263,29.582024],
		"巴中":[106.753669,31.858809],
		"资阳":[104.641917,30.122211],
		"阿坝藏族羌族自治州":[102.221374,31.899792],
		"凉山彝族自治州":[102.258746,27.886762],
		"甘孜藏族自治州":[100.963815,30.050663],
		"安迅机房":[103.665735,30.359462],
		"四川省厅":[103.765735,31.259462],
		"成都市局":[104.745735,30.659462]
    };

    var mapName = "sichuan";
	var mapTitle = "四川省";
	var mapOption = {
	    color: ['#ea204e', '#fce143', '#00ff00'],
	    title : {
	    	show:false
	    },
	    tooltip : {
	    	show:false,
	        trigger: 'item',
	        formatter: function(params){
	        	return params.name+"<br/>总人数: "+mapDataDetail[params.name][0]+"<br/>终端用户: "+mapDataDetail[params.name][1]+"<br/>在线用户: "+mapDataDetail[params.name][2]
	        }
	    },
	    legend: {
	    	show:true,
	    	x:30,
	    	y:'bottom',
	        data:["安迅机房","四川省厅","成都市局"],
	        textStyle:{
	        	color:"#fff"
	        },
	        orient:'vertical',
	        selectedMode:"single",
	        backgroundColor:"rgba(0,0,0,0.1)",
	        padding:[15,15],
	        borderWidth:0.5,
	        borderColor:"#5f5f5f",
	        borderRadius:10
	        
	    },
	    toolbox: {
	        show : false
	    },
	    dataRange: {
	      show:false,
	        min : 0,
	        max : 100,
	        calculable : true,
	        splitNumber:3,
	        color: ['gold','green','lime'],
	        textStyle:{
	        }
	    },
	    series : [
		        {
		        	name:'四川省',
		            type: 'map',
		            mapType: mapName,
		            hoverable: true,
		            data:[],
		            itemStyle:{
		                normal:{
		                  label:{
		                    show:true,
		                    textStyle:{color:"#eee"}
		                  },
		                  borderColor:'#00f6ff',
		                  borderWidth:1.5,
		                  opacity:0.4,
		                  areaStyle:{color:'transparent'}
		                },
		             
		                emphasis:{
		                    label:{
		                  	    show:true,
		                  	    textStyle:{color:"#eee"}
		                    },
		                   	areaStyle:{color:'transparent'}
		                }
		            },
		            geoCoord: geoCoords,
		            markPoint : {
		                data : [

		                	]
		            	}
		        	},
		        	{   
			            name: "安迅机房",
			            type: 'map',
			            mapType: mapName,
			            data:[],
			            markLine : {
			                smooth:false,
			                symbolSize:[2,2],
			                effect : {
			                    show: true,
			                    scaleSize: 0.8,
			                    period: 40,
			                    color: '#ffe712',
			                    shadowBlur: 100
			                },
			                itemStyle : {
			                    normal: {
			                    	label: {
			                            show: false
			                        },
			                        borderWidth:1.5,
			                        lineStyle: {
//						                        	width:0,
										color:"#85597a",
			                            type: 'solid',
			                            shadowBlur: 0
			                        }
			                    }
			                },
			                data : []
			            },
			            
			            markPoint : {
			                symbol:'emptyCircle',
			                symbolSize : function (v){
			                    return 10 + v/5
			                },
			                effect : {
			                    show: true,
			                    shadowBlur : 0,
			                    color:"#ea204e",
			                },
			                itemStyle:{
			                    normal:{
			                        label:{show:false}
			                    },
			                    emphasis: {
			                        label:{position:'top'}
			                    }
			                },
			                data : [
								{name:'安迅机房'},
			                ]
			            }
			        },
			        {   
			            name: "四川省厅",
			            type: 'map',
			            mapType: mapName,
			            data:[],
			            markLine : {
			                data : [

			                ]
			            },
			            markLine : {
			                smooth:false,
			                symbolSize:[2,2],
			                effect : {
			                    show: true,
			                    scaleSize: 0.8,
			                    period: 40,
			                    color: '#ffe712',
			                    shadowBlur: 100
			                },
			                itemStyle : {
			                    normal: {
			                    	label: {
			                            show: false
			                        },
			                        borderWidth:1.5,
			                        lineStyle: {
//						                        	width:0,
										color:"#85597a",
			                            type: 'solid',
			                            shadowBlur: 0
			                        }
			                    }
			                },
			                data : []
			            },
			            markPoint : {
			                symbol:'emptyCircle',
			                symbolSize : function (v){
			                    return 10 + v/5
			                },
			                effect : {
			                    show: true,
			                    shadowBlur : 0,
			                    color:'#fce143',
			                },
			                itemStyle:{
			                    normal:{
			                        label:{show:false}
			                    },
			                    emphasis: {
			                        label:{position:'top'}
			                    }
			                },
			                data : [
								{name:'四川省厅'},
								
			                ]
			            }
			        },
			        {   
			            name: "成都市局",
			            type: 'map',
			            mapType: mapName,
			            data:[],
			            markLine : {
			                smooth:false,
			                symbolSize:[2,2],
			                effect : {
			                    show: true,
			                    scaleSize: 0.8,
			                    period: 40,
			                    color: '#ffe712',
			                    shadowBlur: 100
			                },
			                itemStyle : {
			                    normal: {
			                    	label: {
			                            show: false
			                        },
			                        borderWidth:1.5,
			                        lineStyle: {
//						                        	width:0,
										color:"#85597a",
			                            type: 'solid',
			                            shadowBlur: 0
			                        }
			                    }
			                },
			                data : []
			            },
			            markPoint : {
			                symbol:'emptyCircle',
			                symbolSize : function (v){
			                    return 10 + v/5
			                },
			                effect : {
			                    show: true,
			                    shadowBlur : 0,
			                    color:'#00ff00',
			                },
			                itemStyle:{
			                    normal:{
			                        label:{show:false}
			                    },
			                    emphasis: {
			                        label:{position:'top'}
			                    }
			                },
			                data : [
								{name:'成都市局'},
			                ]
			            }
			        }		

	    	]
		};
	/*终端资源*/
	function getTerminalRes(){
		$.ajax({
			type:"GET",
			url:"../js/app/data/terminalRes.json",
//			url:$.base + "/newPlatformShow/getTerminalRes",
			error:function(){
				alert("出错了");
			},
			success:function(data){
				var result = data;
				var html = "";
				$("#terminalRes tbody").html("");
				html =  "<tr><td>已发终端数：</td><td>"+result.sendedDevNum+"</td></tr>"+
					    "<tr><td>开机在线数：</td><td>"+result.devOnlineNum+"</td></tr>"+
						"<tr><td>VPN在线数：</td><td>"+result.vpnOnlineNum+"</td></tr>"+
						"<tr><td> 当前在线率：</td><td>"+result.onlinePie+"</td></tr>";
				$("#terminalRes tbody").html(html);
			}
		});
	}
	/*应用下载排行*/
	function appDownloadRank(){
		$.ajax({
			type:"GET",
			url:"../js/app/data/appDownloadRank.json",
//			url:$.base + "/newPlatformShow/appDownloadRank",
			error:function(){
				alert("出错了");
			},
			success:function(data){
				var result = data.result;
				var html = "";
				var reg = /^[1-9]$/;
				var length = result.length;//数据条数
				$(".app-download tbody").html("");
				$.each(result,function(index,item){
					var fullStarInteger = "";//整数部分
					var fullStarDecimal = "";//小数部分
					score = (item.score).substring();
				    fullStarInteger = score.split(".")[0];
				    fullStarDecimal = score.split(".")[1];
					/*满星*/
					var fullStarHtml="";
					var halfStarHtml="";
					var emptyStarHtml = "";
					for (var i=0;i<fullStarInteger;i++) {
						fullStarHtml += "<img src='../images/star-full.png' alt=''/>";
					}
					/*半星*/
					var isHalf = "";
					if (!reg.test(fullStarDecimal)){
						halfStarHtml = "";
						isHalf = false;
					}else{
						halfStarHtml = "<img src='../images/star-half.png' alt=''/>";
						isHalf = true;
					}
					/*空星*/
					var emptyStarNum = "";
					if(isHalf == true){
						emptyStarNum = 5-fullStarInteger-1;
					}else{
						emptyStarNum = 5-fullStarInteger;
					}
					for (var i=0;i<emptyStarNum;i++) {
						emptyStarHtml += "<img src='../images/star-empty.png' alt=''/>";
					}
					html += "<tr>"+
								"<td>"+item.app_name+"</td>"+
								"<td>"+fullStarHtml+halfStarHtml+emptyStarHtml+"</td>"+
								"<td>"+item.down_num+"</td>"+
							"</tr>";
				});
				//如果少于6条
				if(length<6){
					for(var i=0;i<6-length;i++){
						html += "<tr>"+
								"<td>暂无</td>"+
								"<td>"+
									"<img src='../images/star-empty.png' alt=''/>"+
									"<img src='../images/star-empty.png' alt=''/>"+
									"<img src='../images/star-empty.png' alt=''/>"+
									"<img src='../images/star-empty.png' alt=''/>"+
									"<img src='../images/star-empty.png' alt=''/>"+
								"</td>"+
								"<td>--</td>"+
							"</tr>";
					}
				}
				$(".app-download tbody").html(html);
			}
		});
	}
	//*当前在线终端数*/
	function getOnlineDevNum(){
		$.ajax({
			type:"GET",
			url:"../js/app/data/getOnlineDevNum.json",
//			url:$.base + "/newPlatformShow/getOnlineDevNum",
			error:function(){
				alert("出错了");
			},
			success:function(data){
				var onlineDevNum = data.onlineDevNum;
				var NumChangePie = data.NumChangePie;
				var html = "";
				$(".num-box").html("");//清空
				html = onlineDevNum;
//				html = onlineDevNum +"<small>(<i class='iconfont'>&#xe6ec;</i>"+NumChangePie+")</small>";
				$(".num-box").html(html);
			}
		});
	}
	/*应用访问排行*/
	function appAccessRank(){
		$.ajax({
			type:"GET",
			url:"../js/app/data/appAccessRank.json",
//			url:$.base + "/newPlatformShow/appAccessRank",
			error:function(){
				alert("出错了");
			},
			success:function(data){
				var result = data.result;
				var html = "";
				$(".app-visit tbody").html("");//清空
				html =  "<tr><td>暂无</td><td>--</td></tr>"+
						"<tr><td>--</td><td>--</td></tr>"+
						"<tr><td>--</td><td>--</td></tr>"+
						"<tr><td>--</td><td>--</td></tr>"+
						"<tr><td>--</td><td>--</td></tr>"+
						"<tr><td>--</td><td>--</td></tr>";
				if(result!=null){//如果数据不为空
					var length = result.length;
					html = "";//如果有数据，清空容器
					$.each(result,function(index,item){
						html += "<tr><td>"+item.name+"</td><td>"+item.totleNum+"</td></tr>";
					});
					//如果少于6条
					if(length<6){
						for(var i=0;i<6-length;i++){
							html += "<tr><td>暂无</td><td>--</td></tr>";
						}
					}
				}
				$(".app-visit tbody").html(html);
			}
		});
	}
	/*设置地图数据*/
	function setMapData(){
		$.ajax({
			type:"GET",
			url:"../js/app/data/listOnlineUserByChannel.json",
//			url:$.base + "/newPlatformShow/listOnlineUserByChannel",
			error:function(){
				alert("出错了");
			},
			success:function(data){
				var results = data.results;
				var anxun = results.anxun;
				var msgCenter = results.msgCenter;
				var cityInfo = results.cityInfo;
				//安迅机房
				var anxunLines = new Array();//所有线条
				var anxunLine = new Array();//单根线条
				$.each(anxun,function(index,item){
					anxunLine = [];
					anxunLine.push({name:item.from});
					anxunLine.push({name:item.to,value:item.value});
					anxunLines.push(anxunLine);
				});
				mapOption.series[1].markLine.data = anxunLines;
				//四川省厅
				var stLines = new Array();//所有线条
				var stLine = new Array();//单根线条
				$.each(msgCenter,function(index,item){
					stLine = [];
					stLine.push({name:item.from},{name:item.to,value:item.value});
					stLines.push(stLine);
				});
				mapOption.series[2].markLine.data = stLines;
				//成都市局
				var sjLines = new Array();//所有线条
				var sjLine = new Array();//单根线条
				$.each(cityInfo,function(index,item){
					sjLine = [];
					sjLine.push({name:item.from},{name:item.to,value:item.value});
					sjLines.push(sjLine);
				});
				mapOption.series[3].markLine.data = sjLines;
				//生成地图
				setMap();
			}
		});
	}
	/*地图*/	
	function setMap(){
		require(["echarts2.0"],function(){
        	myChart = echarts.init(document.getElementById("sichuanMap"));	
			echarts.util.mapData.params.params[mapName] = {
			    getGeoJson: function (callback) {
			        $.getJSON("../js/lib/data/"+mapName+".json", function (data) {
			            callback(echarts.util.mapData.params.decode(data));
			        });
			    }
			};
			myChart.setOption(mapOption,true);
			myChart.on("click",function(param){
				myChart.refresh();
			});		
			        	
	    });
	}
	/*各地市在线终端数*/
	function OnlineDevNumByCity(){
		$.ajax({
			type:"GET",
			url:"../js/app/data/getOnlineDevNumByCity.json",
//			url:$.base + "/newPlatformShow/getOnlineDevNumByCity",
			error:function(){
				alert("出错了");
			},
			success:function(data){
				var result = data.result;
				var html = "",
					totalNum = "",
					value = "";
//				$(".num-list-box").append("");
				$.each(result,function(index,item){
					totalNum = item.totalNum || "0";
					value = item.value || "0";
					html += "<li><span class='title'>"+item.name+"</span><span class='num'>"+item.value+"</span><span class='num'>"+totalNum+"</span></li>";
				})
				$(".num-list:eq(1)").html(html);
				textScroll();
			}
		});
	}
	/*滚动*/
	function textScroll(){
		var timerID = "",j=0;
        //鼠标事件绑定
       	$(".num-list:eq(1)").hover(function () {
            clearInterval(timerID);
        }, function () {
            timerID = setInterval(function () {
            $(".num-list:eq(1) li:eq("+j+")").animate(
                { marginTop: -30+"px"},
                "slow",
                "linear",
                function () {
                	delHtml =   $(this).html();
	                $(this).hide();
	                $(".num-list:eq(1)").append("<li>"+delHtml+"</li>");
	                j++;
                    $(".num-list:eq(1)").css({ marginTop: 0 });
                }
            );
        }, 2000);//这里调用向下或者向上滚动函数
        }).mouseout();
	}
	/*运营商态势*/
	function getOperatorState(){
		$.ajax({
			type:"GET",
			url:"../js/app/data/getOperatorState.json",
//			url:$.base + "/newPlatformShow/getOperatorState",
			error:function(){
				alert("出错了");
			},
			success:function(data){
				//当日累计流量
				var flowByDay = "";
				var flowHtml = "";
				$("#flowByDay").html("");
				flowByDay = data.flowByDay;
				if(flowByDay.length == 0 ){
					flowByDay.push({"name": "移动","value": "--"},{"name": "联通","value": "--"},{"name": "电信","value": "--"})
				}
				$.each(flowByDay,function(index,item){
					flowHtml += "<div class='col-md-4 text-left'><span class='num-name'>"+item.name+" </span><span class='num-box'>"+item.value+"</span></div>";
				});
				$("#flowByDay").html(flowHtml);
				//运营商带宽利用率
				var pieByOperator = "";
				var operatorHtml = "";
				$("#pieByOperator").html("");
				pieByOperator = data.pieByOperator;
				if(pieByOperator.length == 0 ){
					pieByOperator.push({"name": "移动","value": "--"},{"name": "联通","value": "--"},{"name": "电信","value": "--"})
				}
				$.each(pieByOperator,function(index,item){
					operatorHtml += "<div class='col-md-4 text-left'><span class='num-name'>"+item.name+" </span><span class='num-box'>"+item.value+"</span></div>";
				});
				$("#pieByOperator").html(operatorHtml);
				//用户开卡数量、用户开机数量
				var openedCardUserNum = "";
				var bootedUserNum = "";
				var openedCardUserNumData = new Array();
				var bootedUserNumData = new Array();
				openedCardUserNum = data.openedCardUserNum;
				bootedUserNum = data.bootedUserNum;
				$.each(openedCardUserNum,function(index,item){
					openedCardUserNumData.push(Number(item.value));
				})
				$.each(bootedUserNum,function(index,item){
					bootedUserNumData.push(Number(item.value));
				})
				setBar(openedCardUserNumData,bootedUserNumData);
			}
		});
	}
	/*柱状图*/
	function setBar(openedCardUserNum,bootedUserNum){
		console.log(openedCardUserNum);
		console.log(bootedUserNum);
		
		require(["echarts"],function(echarts){
				var chartOption = {
					"bar":{
						title: {
							show:false,
							text: '',
							subtext: ''
						},
						tooltip: {
							trigger: 'axis'
						},
						grid:{
							show:false,
							x:40,
							x2:0,
							y:50,
							y2:30
						},
						legend: {
							top:20,
							data:["SIM卡开卡数量","用户开机数量"],
							textStyle: {
								color: '#fff'
							}
						},
						calculable: true,
						color: ['#7AC52E', '#00D1FE', '#FFD201', '#d03800', '#1d7cf7'],
						xAxis: [{
							type: 'category',
							data: ["移动","联通","电信"],
							axisLine:{
								
							},
							axisLabel: {
								textStyle: {
									color: "#30e7f9",
									fontSize:16,
									fontWeight:"bold"
								},
								interval:0,
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(98,98,98,0.48)'
								}
							},
							axisTick: {
								lineStyle: {
									color: 'rgba(0,0,0,0)'
								}
							}
						}],
						yAxis: [{
							type: 'value',
							name:'',
							axisLabel: {
								textStyle: {
									color: "#00f6ff",
								},
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(98,98,98,0.48)'
								}
							},
							axisTick: {
								show:false,
								lineStyle: {
									color: 'rgba(98,98,98,0.48)'
								}
							},
							splitLine:{
								show:true,
								lineStyle: {
									color: ['rgba(98,98,98,0.48)']
								}
							}
						}],
						series: [
							{
								name: "SIM卡开卡数量",
								type: 'bar',
								smooth: true,
								data: openedCardUserNum,
								label: {
									normal: {
										show: true,
										position: 'top',
										offset :[-10,3],
										textStyle: {
											color: '#14fcff',
											fontStyle: 'normal',
											fontFamily: 'baiduFont',
											fontSize: 14,
										},
									},
								},
								markPoint: {
									label:{
										normal:{
											show:false
										}
									},
									data : [
					                    {
					                    	type : 'max', 
					                    	name: '最大值',
					                    	symbol:'image://../images/shine.png',
					                    },
					                    {
					                    	type : 'min', 
					                    	name: '最小值',
					                    	symbol:'image://../images/shine.png',
					                    },
					                    {
					                    	type : 'average', 
					                    	name: '平均值',
					                    	symbol:'image://../images/shine.png',
					                    }
					                ]
								},
								itemStyle: {
					                normal: {
					                	barBorderRadius:8,
					                    color: new echarts.graphic.LinearGradient(
					                        0, 0, 0, 1,
					                        [
					                            {offset: 0, color: '#BEF4FE'},
					                            {offset: 0.4, color: '#44d4ed'},
					                            {offset: 1, color: '#02bada'}
					                        ]
					                    )
					                },
					                emphasis: {
					                	barBorderRadius:8,
					                    color: new echarts.graphic.LinearGradient(
					                        0, 0, 0, 1,
					                        [
					                            {offset: 0, color: '#02bada'},
					                            {offset: 0.9, color: '#44d4ed'},
					                            {offset: 1, color: '#BEF4FE'}
					                        ]
					                    )
					                }
					            },
								barMaxWidth:20
							},
							{
								name: "用户开机数量",
								type: 'bar',
								itemStyle: {
					                normal: {
					                	barBorderRadius:8,
					                    color: new echarts.graphic.LinearGradient(
					                        0, 0, 0, 1,
					                        [
					                            {offset: 0, color: '#ffd394'},
					                            {offset: 0.4, color: '#f9ae56'},
					                            {offset: 1, color: '#ef7702'}
					                        ]
					                    )
					                },
					                emphasis: {
					                	barBorderRadius:8,
					                    color: new echarts.graphic.LinearGradient(
					                        0, 0, 0, 1,
					                        [
					                            {offset: 0, color: '#ef7702'},
					                            {offset: 0.9, color: '#f9ae56'},
					                            {offset: 1, color: '#ffd394'}
					                        ]
					                    )
					                }
					            },
					            label: {
									normal: {
										show: true,
										position: 'top',
										offset :[10,3],
										textStyle: {
											color: '#f8b14d',
											fontStyle: 'normal',
											fontFamily: 'baiduFont',
											fontSize: 14,
										},
									},
								},
								markPoint: {
									label:{
										normal:{
											show:false
										}
									},
									data : [
					                    {
					                    	type : 'max', 
					                    	name: '最大值',
					                    	symbol:'image://../images/shine.png',
					                    },
					                    {
					                    	type : 'min', 
					                    	name: '最小值',
					                    	symbol:'image://../images/shine.png',
					                    },
					                    {
					                    	type : 'average', 
					                    	name: '平均值',
					                    	symbol:'image://../images/shine.png',
					                    }
					                ]
								},
								smooth: true,
								data: bootedUserNum,
								barMaxWidth:20
							}
						]
					}
							
				};
			var myChart1 = echarts.init(document.getElementById('bar-box'));
			myChart1.setOption(chartOption.bar);
		});
	}
	/*链路通道态势*/
	function getLinkChannelState(){
		$.ajax({
			type:"GET",
			url:"../js/app/data/getLinkChannelState.json",
//			url:$.base + "/newPlatformShow/getLinkChannelState",
			error:function(){
				alert("出错了");
			},
			success:function(data){
				var accessNumNow = data.accessNumNow;
				var totalFlowNow = data.totalFlowNow;
				var pieByChannel = data.pieByChannel;
				var anxunData = new Array();
				var shengtingData = new Array();
				var shijuData = new Array();
				var anxunHtml = "";
				var shengtingHtml = "";
				var shijuHtml = "";
				$(".channel-table tbody").html("");
				
				//当前访问数量
				if(accessNumNow.length == 3){//数组长度为3
					anxunData.push(accessNumNow[0].value);
					shengtingData.push(accessNumNow[1].value);
					shijuData.push(accessNumNow[2].value);
				}else if(accessNumNow.length == 2){//数组长度为2
					if(accessNumNow[0].title == "1"){
						anxunData.push(accessNumNow[0].value);
						if(accessNumNow[1].title == "2"){
							shengtingData.push(accessNumNow[1].value);
							shijuData.push("-");
						}else if(accessNumNow[1].title == "3"){
							shengtingData.push("-");
							shijuData.push(accessNumNow[1].value);
						}
					}else if(accessNumNow[0].title == "2"){
						anxunData.push("-");
						shengtingData.push(accessNumNow[0].title);
						shijuData.push(accessNumNow[1].title);
					}
				}else if(accessNumNow.length == 1){//数组长度为1
					if(accessNumNow[0].title == "1"){
						anxunData.push(accessNumNow[0].value);
						shengtingData.push("-");
						shijuData.push("-");
					}else if(accessNumNow[0].title == "2"){
						anxunData.push("-");
						shengtingData.push(accessNumNow[0].value);
						shijuData.push("-");
					}else if(accessNumNow[0].title == "3"){
						anxunData.push("-");
						shengtingData.push("-");
						shijuData.push(accessNumNow[0].value);
					}
				}else if(accessNumNow.length == 0){//数组长度为0
					anxunData.push("-");
					shengtingData.push("-");
					shijuData.push("-");
				}
				
				//当前累计流量
				if(totalFlowNow.length == 3){//数组长度为3
					anxunData.push(totalFlowNow[0].value);
					shengtingData.push(totalFlowNow[1].value);
					shijuData.push(totalFlowNow[2].value);
				}else if(totalFlowNow.length == 2){//数组长度为2
					if(totalFlowNow[0].title == "1"){
						anxunData.push(totalFlowNow[0].value);
						if(totalFlowNow[1].title == "2"){
							shengtingData.push(totalFlowNow[1].value);
							shijuData.push("-");
						}else if(totalFlowNow[1].title == "3"){
							shengtingData.push("-");
							shijuData.push(totalFlowNow[1].value);
						}
					}else if(totalFlowNow[0].title == "2"){
						anxunData.push("-");
						shengtingData.push(totalFlowNow[0].title);
						shijuData.push(totalFlowNow[1].title);
					}
				}else if(totalFlowNow.length == 1){//数组长度为1
					if(totalFlowNow[0].title == "1"){
						anxunData.push(totalFlowNow[0].value);
						shengtingData.push("-");
						shijuData.push("-");
					}else if(totalFlowNow[0].title == "2"){
						anxunData.push("-");
						shengtingData.push(totalFlowNow[0].value);
						shijuData.push("-");
					}else if(totalFlowNow[0].title == "3"){
						anxunData.push("-");
						shengtingData.push("-");
						shijuData.push(totalFlowNow[0].value);
					}
				}else if(totalFlowNow.length == 0){//数组长度为0
					anxunData.push("-");
					shengtingData.push("-");
					shijuData.push("-");
				}
				
				//当前带宽利用率
				if(pieByChannel.length == 3){//数组长度为3
					anxunData.push(pieByChannel[0].value);
					shengtingData.push(pieByChannel[1].value);
					shijuData.push(pieByChannel[2].value);
				}else if(pieByChannel.length == 2){//数组长度为2
					if(pieByChannel[0].title == "1"){
						anxunData.push(pieByChannel[0].value);
						if(pieByChannel[1].title == "2"){
							shengtingData.push(pieByChannel[1].value);
							shijuData.push("-");
						}else if(pieByChannel[1].title == "3"){
							shengtingData.push("-");
							shijuData.push(pieByChannel[1].value);
						}
					}else if(pieByChannel[0].title == "2"){
						anxunData.push("-");
						shengtingData.push(pieByChannel[0].title);
						shijuData.push(pieByChannel[1].title);
					}
				}else if(pieByChannel.length == 1){//数组长度为1
					if(pieByChannel[0].title == "1"){
						anxunData.push(pieByChannel[0].value);
						shengtingData.push("-");
						shijuData.push("-");
					}else if(pieByChannel[0].title == "2"){
						anxunData.push("-");
						shengtingData.push(pieByChannel[0].value);
						shijuData.push("-");
					}else if(pieByChannel[0].title == "3"){
						anxunData.push("-");
						shengtingData.push("-");
						shijuData.push(pieByChannel[0].value);
					}
				}else if(pieByChannel.length == 0){//数组长度为0
					anxunData.push("-");
					shengtingData.push("-");
					shijuData.push("-");
				}
				//遍历数组--安迅机房
				var axHtml = "";
				$.each(anxunData,function(index,item){
					axHtml += "<td>"+item+"</td>";
				});
				anxunHtml = "<tr><td>安迅机房</td>"+axHtml+"</tr>";
				//遍历数组--四川省厅
				var stHtml = "";
				$.each(shengtingData,function(index,item){
					stHtml += "<td>"+item+"</td>";
				});
				shengtingHtml = "<tr><td>四川省厅</td>"+stHtml+"</tr>";
				//遍历数组--成都市局
				var sjHtml = "";
				$.each(shijuData,function(index,item){
					sjHtml += "<td>"+item+"</td>";
				});
				shijuHtml = "<tr><td>成都市局</td>"+sjHtml+"</tr>";
				//拼成表格
				$(".channel-table tbody").html(anxunHtml+shengtingHtml+shijuHtml);
				
				
			}
		});
	}
	/*设置高度*/
	function setHeight(){
		var totalHeight = "";
		totalHeight = $(".col-md-2 .box-common:eq(0)").outerHeight() + $(".col-md-2 .box-common:eq(1)").outerHeight() + $(".col-md-2 .box-common:eq(2)").outerHeight();
		$(".col-md-6 .box-common").height((totalHeight + 22)+"px");//12*2
		$("#sichuanMap").height((totalHeight-30)+"px");//地图高度
		$("#bar-box").height((totalHeight - $(".col-md-4 .box-common:eq(1)").outerHeight() -$(".compare-box").outerHeight() - 50) + "px");//40+10
		$(".num-list-box").show();
	}
	function updateTime(){ 
	  var d=new Date(),time=""; 
	  var year=d.getFullYear(); 
	  var month=((d.getMonth()+1)>9)?(d.getMonth()+1):("0"+(d.getMonth()+1)); 
	  var day=(d.getDate()>9)?d.getDate():("0"+d.getDate()); 
	  var hour=(d.getHours()>9)?d.getHours():("0"+d.getHours()); 
	  var minute=(d.getMinutes()>9)?d.getMinutes():("0"+d.getMinutes()); 
	  var second=(d.getSeconds()>9)?d.getSeconds():("0"+d.getSeconds()); 
	  time = year + "-" + month + "-" + day + "&nbsp" + hour + ":" + minute + ":" + second;
	  return time; 
	} 
	return {
		run:function(){
			updateTime();
			setInterval(function(){$('.time-box').html(updateTime)},1000);
			getTerminalRes();
			appDownloadRank();
			appAccessRank();
			setHeight();
			getOnlineDevNum();
			setMapData();
//			setMap();
			getOperatorState();
			getLinkChannelState();
//			setBar();
			OnlineDevNumByCity();
		}
	};
});


var mt = {"name":"taizhou","title":"泰州"};
var mapArea = "泰州市公安厅";
var mapOption = {
	    backgroundColor: 'rgba(0,0,0,0)',
	    color: ['gold','aqua','lime'],
	    title : {
	    	show:false,
	        text: '二级网检测运行状态一览表',
	        subtext:'',
	        x:'center',
	        padding:20,
	        textStyle : {
	            color: BaseApp.mediaFontColor,
	            
	        }
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: '{b}'
	    },
	    legend: {
	    	show:false,
	        orient: 'vertical',
	        x:'left',
	        data:['泰州市网络数据'],
	        selectedMode: 'single',
	        selected:{
	            '上海 Top10' : false,
	            '广州 Top10' : false
	        },
	        textStyle : {
	            color: BaseApp.mediaFontColor
	        }
	    },
	    toolbox: {
	        show : false,
	        orient : 'vertical',
	        x: 'right',
	        y: 'center',
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataRange: {
	      show:false,
	        min : 1,
	        max : 3,
	        calculable : false,
	        color: ['red','#fda102','#0ff004'],
	        textStyle:{
	            color:BaseApp.mediaFontColor
	        }
	    },
	    series : [
	      
	        {
	            name: mt.title+' Top10',
	            type: 'map',
	            mapType: mt.name,
	            hoverable: true,
	            data:[],
	            itemStyle:{
	                normal:{
	                  label:{
	                    show:true,
	                    textStyle:{color:BaseApp.mediaFontColor}
	                  },
	                  borderColor:'#eee',
	                  borderWidth:0.6,
	                  areaStyle:{color:'rgba(0,0,0,0)'}
	                },
	             
	                emphasis:{
	                  label:{show:true},
	                  
	                }
	            },
	            geoCoord: BaseApp.getGeoCoord()["jiangsu"],
	             
	            markLine : {
	                smooth:true,
	                effect : {
	                    show: true,
	                    scaleSize: 2,
	                    period: 20,
	                    color: BaseApp.mediaFontColor,
	                    shadowBlur:1
	                },
	                itemStyle : {
	                    normal: {
	                     
	                       
	                        borderWidth:1,
	                        lineStyle: {
	                            type: 'solid',
	                            shadowBlur: 0
	                        }
	                    }
	                },
	                data :[]
	            },
	            markPoint : {
	                symbol:'emptyCircle',
	                symbolSize : function (v){
	                    return 10+ v/30;
	                },
	                effect : {
	                    show: true,
	                    shadowBlur :1
	                },
	                itemStyle:{
	                    normal:{
	                        label:{show:true}
	                    },
	                    emphasis: {
	                        label:{position:'bottom'}
	                    }
	                },
	                data : []
	            	}
	        	} 
	    	]
};
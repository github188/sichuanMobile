require.config({
	baseUrl:(function() {
	    var curWwwPath = window.document.location.href;
	    var pathName = window.document.location.pathname;
	    var pos = curWwwPath.indexOf(pathName);
	    var localhostPath = curWwwPath.substring(0,pos);
	    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	    return(localhostPath+projectName);
	})() + "/js",
	shim: {
		bootstrap:["jquery"],
		'template' : {
			exports:"template"
		},
		echarts:["jquery"],
		bsSelect:["jquery"],
		zTreeAll:["jquery"],
		zTreeCore:["jquery","zTreeAll"],
		zTreeExcheck:["jquery","zTreeAll"],
		zTreeExedit:["jquery","zTreeAll"],
		zTreeExhide:["jquery","zTreeAll"]
	},
	paths:{
		"jquery" : "lib/jquery-1.11.3.min",
		"bootstrap":"lib/bootstrap.min",
		"template":"lib/handlebars-v4.0.4",
		"echarts":"lib/echarts.min",
		"echarts2.0" : "lib/echarts",
		"ecAll" : "lib/echarts-all",
		"radialIndicator":"lib/radialIndicator.min",
		"bsSelect":"lib/bootstrap-select.min",
		"bsDatatables":"lib/dataTables.bootstrap",
		"resDatatables":"lib/dataTables.responsive.min",
		"dateTimePicker":"lib/bootstrap-datetimepicker.min",
		"datatables.net":"lib/jquery.dataTables",
		"jqueryUI":"lib/jquery-ui.min",
		"flow":"lib/flow",
		"icheck":"lib/icheck.min",
		"comboSelect":"lib/jquery.combo.select",
		"engineFactory":"lib/engineFactory",
		"compare":"lib/templateCompare",
		"popover":"lib/popover",
		"zTreeAll":"lib/js/jquery.ztree.all.min",
		"zTreeCore":"lib/js/jquery.ztree.core.min",
		"zTreeExcheck":"lib/js/jquery.ztree.excheck.min",
		"zTreeExedit":"lib/js/jquery.ztree.exedit.min",
		"zTreeExhide":"lib/js/jquery.ztree.exhide.min",
	},
	map: {
        '*': {
            'jquery': 'jquery-config',
        },
        'jquery-config': {
            'jquery': 'jquery'
        }
   }
});

define('jquery-config', ['jquery'], function(){
	var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPath = curWwwPath.substring(0,pos);
    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    $.base = localhostPath+projectName;
    return $;
});









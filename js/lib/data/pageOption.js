var pageOption = {
	"type":"page",
	"items":[
		{
			"type":"header",
			"items":[
				
				{
					"type":"navbar",
					"items":[
						{
							"type":"navbar-header"
						},
						{
							"type":"navbar-collaps",
							"align":"right",
							"items":[
								{
									"type":"dropdown",
									"label":"",
									"icon":"ion-android-settings",
									"items":[
										{"label":"设置布局","value":"layout"},
										{"label":"设置模块","value":"module"}
									]
								},
								{
									"type":"empty",
									"show":false,
									"buttons":[
										{
											"type":"btn",
											"label":"保存",
											"cls":"btn-primary"
										},
										{
											"type":"btn",
											"label":"取消",
											"cls":"btn-default"
										}
									]
								}
							]
						}
					]
				},
				{
					"type":"scrollbar",
					"scrollType":"layout",
					"items":[
						
					]
				},
				{
					"type":"scrollbar",
					"items":[
						
					]
				}
				
			]
		},
		{
			"type":"section",
			"items":[
				
			]
			
		},
		{
			"type":"footer"
		}
		
	]
};

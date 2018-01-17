/**
 **江苏飞搏软件股份有限公司(Fablesoft)版权所有
 **FablesoftUIFactory(fuiFactory) v0.5(内部试用版) 
 **/

define(["bootstrap","jqueryUI","datatables.net","bsDatatables","resDatatables"],function(){
	var fuiFactory = {};
	fuiFactory.entities = {};
	fuiFactory.engineOption = null;
	fuiFactory.extendObject = null;
	fuiFactory.init = function($scope){
		fuiFactory.extendObject = $scope;
	};
	fuiFactory.getOptionByType = function(type,option){
		var selfOption = null;
		$(option.items).each(function(i,o){
			if(o.type==type){
				selfOption = o;
				return false;
			}
		});
		return selfOption;
	};
	fuiFactory.getOptionByEntityId = function(entityId){
		var self = {};
		self.entityId = entityId;
		self.selfOption = null;
		self.hasOption = false;
		self.find = function(option){
			if(option){
				if(option.items&&option.items.length>0){
					$(option.items).each(function(i,o){
						if(!self.hasOption){
							if(o.entityId == self.entityId){
								self.selfOption = o;
								self.hasOption = true;
								return true;
							}else{
								self.find();
							}
						}else{
							return true;
						}
					});
				}
			}
			
		};
		if(fuiFactory.engineOption.entityId == entityId){
			self.selfOption = fuiFactory.engineOption;
		}else{
			self.find(fuiFactory.engineOption);
		}
		
		return self.selfOption;
	};
	fuiFactory.run = function(engineOption){
		var type = "";
		var container = null;
		if(engineOption){
			if(engineOption.option){
				if(engineOption.option.type){
					type = engineOption.option.type;
				}
				fuiFactory.engineOption = engineOption.option;
			}
			if(engineOption.container){
				container = engineOption.container;
			}
			if(engineOption.extendObject){
				fuiFactory.init(engineOption.extendObject);
			}
			if(type&&container){
				var factory = fuiFactory;
				$(type.split(".")).each(function(i,o){
					
					factory = factory[o];
				});
				
				if(factory){
					var obj = factory({
						container:container,
						option:engineOption.option
					});
					
					if(obj){
						if(obj.create){
							obj.create();
							if(engineOption.option.entityId){
								fuiFactory.entities[engineOption.option.entityId] = obj;
							}
							fuiFactory.create({
								container:obj.container,
								option:engineOption.option
							});
						}
					}
				}
			}
		}
		
	};
	fuiFactory.create = function(engineOption){
		var items = engineOption.option.items;
		$(items).each(function(i,o){
			if(o){
				var type = "custom";
				if(o.type){
					type = o.type;
				}
				var factory = fuiFactory;
				
				$(type.split(".")).each(function(i1,o1){
					factory = factory[o1];
				});
				if(factory){
					var obj = factory({
						container:engineOption.container,
						option:o,
						parentOption:engineOption.option
					});
					
					if(obj){
						
						if(o.entityId){
							fuiFactory.entities[o.entityId] = obj;
						}
						if(obj.create){
							obj.create();
							
							fuiFactory.create({
								container:obj.container,
								option:o,
								parentOption:engineOption.option
							});
							//console.log(type)
						}
					}
				}
			}
		});
	};
	fuiFactory.header = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("header");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).prepend(self.container);
		};
		return self;
	};
	fuiFactory.section = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("section");
			fuiFactory.setBaseProperty(self.container,self.option);
			if($("header").length>0){
				$("header").after(self.container);
			}else{
				$(option.container).prepend(self.container);
			}
		};
		return self;
	};
	fuiFactory.footer = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("footer");
			fuiFactory.setBaseProperty(self.container,self.option);
			if($("section").length>0){
				$("section").after(self.container);
			}else if($("header").length>0){
				$("header").after(self.container);
			}else{
				$(option.container).prepend(self.container);
			}
		};
		return self;
	};
	fuiFactory.custom = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.customType = self.option.customType?self.option.customType:"div";
		self.create = function(){
			self.container = document.createElement(self.customType);
			fuiFactory.setBaseProperty(self.container,self.option);
			if(self.option.clickCallback){
				if(typeof(self.option.clickCallback)=="string"){
					$(self.container).on("click",function(){fuiFactory.extendObject[self.option.clickCallback](self.container);});
				}else{
					$(self.container).on("click",function(){self.option.clickCallback(self.container);});
				}
			}
			$(option.container).append(self.container);
			return self;
		};
		
		return self;
	};
	fuiFactory.page = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = $("body");
			fuiFactory.setBaseProperty(self.container,self.option);
		};
		return self;
	};
	fuiFactory.container = function(option){
		
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("div");
			$(self.container).addClass("container");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.row = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.container =  document.createElement("div");
		self.items = null;
		if(self.option.items&&self.option.items.length>0){
			self.items = self.option.items;
		}
		
		$(self.container).addClass("row");
		fuiFactory.setBaseProperty(self.container,self.option);
		$(option.container).append(self.container);
		self.reDraw = function(){
			$(self.container).html("");
			
			self.option = fuiFactory.entities[self.option.entityId].option;
			self.create();
			if(self.option.entityId){
				fuiFactory.entities[self.option.entityId] = self;
			}
			
			fuiFactory.create({
				container:self.container,
				option:self.option,
				parentOption:option.parentOption
			});
		};
		self.create = function(){
			
			if(self.option.drawBeforeCallback){
				fuiFactory.extendObject[self.option.drawBeforeCallback](self);
			}
			if(self.option.dynamic){
				self.setDynamicColumnOption();
			}
			
		};
		
		self.setDynamicColumnOption = function(){
			if(self.option.data&&self.option.data.length>0){
				if(self.items&&self.items.length>0){
					
					
					if(!self.option.dynamicLayout){
						var l = self.option.data.length;
						var s = "";
						for(var i=0;i<l;i++){
							s+="1:";
						}
						s = fuiFactory.clearLastCharacter(s);
						self.option.dynamicLayout = s;
					}
				
					var layoutAry =  self.option.dynamicLayout.split(":");
					var sum = 0;
					for(var i=0,j=layoutAry.length;i<j;i++){
						sum+=Number(layoutAry[i]);
					}
					
					
					self.option.items = [];
					
					$(self.option.data).each(function(i,o){
						
						var columnOption = {
							type :"column", 
							cNum : Math.round(Number(layoutAry[i])/sum*12),
							name : "col",
							items:[]
						};
						
						$(o).each(function(i1,o1){
							$(self.items).each(function(i2,o2){
								if(o2){
									if(o2.bindDataId){
										if(o2.bindDataId == o1.rid){
											if(o1.text){
												if(o2.header){
													o2.header.icon = o1.icon;
													o2.header.label = o1.text;
												}
												if(o2.body){
													if(!o1.open){
														o2.show = false;
													}
												}
												
												
											}
											columnOption.items.push(o2);
											
										}
									}
								}
								
							});
						});
						self.option.items.push(columnOption);
					});
				}
			}
		};
		return self;
	};
	fuiFactory.column = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container =  document.createElement("div");
			if(self.option.cNum){
				$(self.container).addClass("col-xs-12 col-sm-"+self.option.cNum);
			}else{
				$(self.container).addClass("col-xs-12");
			}
			fuiFactory.setBaseProperty(self.container,self.option);
			if(self.option.clickCallback){
				if(typeof(self.option.clickCallback)=="string"){
					$(self.container).on("click",function(){fuiFactory.extendObject[self.option.clickCallback](self);});
				}else{
					$(self.container).on("click",function(){self.option.clickCallback(self);});
				}
			}
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.img = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container =  document.createElement("img");
			if(self.option.url){
				$(self.container).attr("src",self.option.url);
			}
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.navbar = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.header = null;
		self.collapse = null;
		self.create = function(){
			self.container = document.createElement("nav");
			$(self.container).addClass("navbar");
			fuiFactory.setBaseProperty(self.container,self.option);
			
			if(self.option.role){
				$(self.container).attr("role",self.option.role);
			}
			
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.navbarHeader = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("div");
			$(self.container).addClass("navbar-header");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.navbarCollapse = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("div");
			if(!fuiFactory.isFalse(self.option.collapse)){
				$(self.container).addClass("collapse navbar-collapse");
			}
			
			fuiFactory.setBaseProperty(self.container,self.option);
			if(self.option.align){
				$(self.container).addClass("navbar-"+self.option.align);
			}
			
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.nav = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("ul");
			$(self.container).addClass("nav navbar-nav");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.navItem = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		
		self.create = function(){
			
			self.container = document.createElement("li");
			
			fuiFactory.setBaseProperty(self.container,self.option);
			
			if(self.option.active){
				$(self.container).addClass("active");
			}
			if(self.option.dropdown){
				$(self.container).addClass("dropdown");
			}
			
			var link = fuiFactory.link({
				container:self.container,
				option:self.option
			});
			link.create();
			if(self.option.dropdown){
				$(link.container).find("span").append("<b class='caret'></b>");
			}
			if(self.option.toggle){
				$(link.container).removeAttr("href");
				$(link.container).removeAttr("target");
				$(link.container).on("click",function(){
					$(this).parent().parent().find(".active").removeClass("active");
					$(this).parent().addClass("active");
					var toggleObj = fuiFactory.getToggle(self.option.toggle);
					if($(toggleObj)[0].tagName.toLowerCase()=="iframe"){
						if(self.option.url)
						$(toggleObj).attr("src",self.option.url);
					}
				});
				
			}else{
				$(link.container).on("click",function(){
					$(this).parent().parent().find(".active").removeClass("active");
					$(this).parent().addClass("active");
				});
			}
			
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.iframe = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			
			self.container = document.createElement("iframe");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(self.container).attr("frameborder","no");
			$(self.container).attr("allowtransparency","yes");
			$(option.container).append(self.container);
			if(self.option.scrolling){
				$(self.container).attr("scrolling",self.option.scrolling);
			}else{
				$(self.container).attr("scrolling","auto");
			}
			if(self.option.src){
				self.load();
			}
			
		};
		self.load = function(){
			$(self.container).attr("src",self.option.src);
		};
		return self;
	};
	fuiFactory.dropdownMenu = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("ul");
			$(self.container).addClass("dropdown-menu");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.dropdownMenuItem = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("li");
			fuiFactory.setBaseProperty(self.container,self.option);
			if(self.option.active){
				$(self.container).addClass("active");
			}
			
			
			fuiFactory.link({
				container:self.container,
				option:self.option
			}).create();
			
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.link = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("a");
			fuiFactory.setBaseProperty(self.container,self.option);
			if(self.option.icon){
				$(self.container).append("<i class='"+self.option.icon+"'></i>");
			}
			if(self.option.text){
				$(self.container).append("<span>"+self.option.text+"</span>");
			}
			
			if(self.option.target){
				$(self.container).attr("target",self.option.target);
			}
			
			if(self.option.href){
				$(self.container).attr("href",self.option.href);
			}
			if(self.option.dataToggle){
				$(self.container).attr("data-toggle",self.option.dataToggle);
			}
			if(self.option.dataTarget){
				$(self.container).attr("data-target",self.option.dataTarget);
			}
			if(self.option.dropdown){
				$(self.container).attr("data-toggle","dropdown");
			}
			
			if(self.option.clickCallback){
				$(self.container).on("click",function(){
					fuiFactory.extendObject[self.option.clickCallback](self);
				});
			}
			$(option.container).append(self.container);
		};
		
		return self;
	};

	fuiFactory.buttonBar = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("div");
			$(self.container).addClass("button-bar");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.buttonMenu = function(option){
		var self = {};
		self.container = null;
		self.button = null;
		self.option = option.option;
		self.group = null;
		self.create = function(){
			self.container = document.createElement("div");
			$(self.container).addClass("btn-group");
			$(option.container).append(self.container);
			self.button = fuiFactory.button(
				{
					container:self.container,
					option:self.option
				}
			);
			self.button.create();
			
			$(self.button.container).addClass("dropdown-toggle");
			$(self.button.container).attr("data-toggle","dropdown");
			if(self.option.groupItems.length>0){
				self.group = document.createElement("ul");
				$(self.group).addClass("dropdown-menu");
				$(self.group).attr("role","menu");
				$(self.option.groupItems).each(function(i,o){
					var li = document.createElement("li");
					var link = {
						container:li,
						option:{
							"text":o.text,
							"href":"#"
						}
					};
					if(o.dataToggle){
						link.option.dataToggle = o.dataToggle;
					}
					if(o.dataTarget){
						link.option.dataTarget = o.dataTarget;
					}
					fuiFactory.link(link).create();
					//$(li).append("<a href='#'>"+o.text+"</a>");
					$(self.group).append(li);
					fuiFactory.setBaseProperty(li,o);
					$(li).on("click",function(){
						if(o.clickBeforeCallback){
							fuiFactory.extendObject[o.clickBeforeCallback]($(this));
						}
						if(o.clickCallback){
							fuiFactory.extendObject[o.clickCallback]($(this));
						}
					});
				});
				$(self.container).append(self.group);
			}
		};
		return self;
	};
	fuiFactory.button = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.callback = null;
		self.parentOption = option.parentOption;
		self.resize = function(){
			if($(document).width()<=768){
				$("header").addClass("header-mobile-theme");
			}else{
				$("header").removeClass("header-mobile-theme");
			}
		};
		self.create = function(){
			
			if(self.option.drawBeforeCallback){
				if(typeof(self.option.drawBeforeCallback)=="string"){
					fuiFactory.extendObject[self.option.drawBeforeCallback]();
				}else{
					self.option.drawBeforeCallback();
				}
			}
			
			self.container = document.createElement("button");
			fuiFactory.setBaseProperty(self.container,self.option);
			
			if(self.option.icon){
				var i = document.createElement("i");
				$(i).addClass(self.option.icon);
				$(self.container).append(i);
			}
			
			switch(self.option.buttonType){
				case "navbar-collapse-button":
					$(self.container).attr("type","button");
					$(self.container).addClass("navbar-toggle");
					
					for(var i=0;i<3;i++){
						$(self.container).append("<span class='icon-bar'></span>");
					}
					$(window).on("resize",function(){
						self.resize();
					});
					self.resize();
					$(option.container).append(self.container);
				break;
				
				case "box-sh-button":
					
					$(self.container).addClass("btn-sm box-header-button");
					$(self.container).attr("btnType","sh");
					$(option.container).append(self.container);
				break;
				
				case "box-buttonGroup":
				
					var group = document.createElement("div");
					$(group).addClass("btn-group");
					$(self.container).addClass("btn btn-primary dropdown-toggle");
					$(self.container).attr("data-toggle","dropdown");
					$(group).append(self.container);
					if(self.option.groupItems&&self.option.groupItems.length>0){
						var ul = document.createElement("ul");
						$(ul).attr("role","menu");
						$(ul).addClass("dropdown-menu");
						
						if(self.option.align=="right"){
							$(ul).css("left","auto");
							$(ul).css("right","0");
						}
						$(self.option.groupItems).each(function(i,o){
							var li = document.createElement("li");
							//var a = document.createElement("a");
							var linkOption  = {
								container:li,
								option:{
									"text":o.text
								}
							};
							
							
							if(self.option.dataToggle){
								link.option.attr("data-toggle",self.option.dataToggle);
							}
							if(self.option.dataTarget){
								link.option.attr("data-target",self.option.dataTarget);
							}
							
							if(o.value){
								link.option.attr("val",o.value);
							}
							
							var link = fuiFactory.link(linkOption);
							link.create();
							if(o.toggle){
								$(link.container).on("click",function(){
									var toggleObj = fuiFactory.getToggle(o.toggle);
									$(toggleObj).parent().children().hide();
									$(toggleObj).show();
									
									if(o.clickBeforeCallback){
										fuiFactory.extendObject[o.clickBeforeCallback](o);
									}
									if(o.clickCallback){
										o.clickCallback(o);
									}
								});
							}
							
							
							//$(li).append(a);
							$(ul).append(li);
						});
						$(group).append(ul);
					}
					
					$(option.container).append(group);
					
				break;
				
				case "modal":
					if(self.option.size){
						$(self.container).addClass("btn-"+self.option.size);
					}
					if(self.option.text){
						$(self.container).append("<span>"+self.option.text+"</span>");
					}
					$(option.container).append(self.container);
				break;
				
				default:
					if(self.option.cls){
						$(self.container).addClass("btn "+self.option.cls+" ");
					}else{
						$(self.container).addClass("btn btn-primary ");
					}
					
					if(self.option.size){
						$(self.container).addClass("btn-"+self.option.size);
					}
					if(self.option.text){
						$(self.container).append("<span>"+self.option.text+"</span>");
					}
					$(option.container).append(self.container);
				break;
			}
			if(self.option.clickCallback){
				if(typeof(self.option.clickCallback)=="string"){
					$(self.container).on("click",function(){fuiFactory.extendObject[self.option.clickCallback](self);});
				}else{
					$(self.container).on("click",function(){self.option.clickCallback(self);});
				}
			}
			
			
		};
		self.clear = function(){
			if(self.option.buttonType=="box-buttonGroup"){
				if($(self.container)&&$(self.container).parent()){
					$(self.container).parent().remove();
				}
			}else{
				if(self.container){
					$(self.container).remove();
					self.container = null;
				}
			}
			self.container = null;
		};
		self.get = function(){
			return self.container;
		};
		self.redraw = function(option){
			
			self.clear();
			
			self.option = option;
			self.create();
		};
		return self;
	};

	fuiFactory.scrollBar = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.step = 0;
		self.itemContainer = null;
		self.active = self.active?self.active:"auto";
		self.data = null;
		var container = null;
		self.autoSize = function(){
			var number = self.option.number;
			var items = $(self.itemContainer).children("li");
			var w = $(self.itemContainer.parent()).outerWidth();
			
			var l = Math.ceil(w/number);
			$(items).css("width",l);
			$(items).parent().width(l*$(items).length);
			$(items).parent().css("marginLeft",-(self.step*l));
		};
		self.show = function(){
			$(option.container).children(".scroll-bar").hide();
			var liAry =  $(container).find(".scroll-bar-content ul").children("li");
			liAry.hide();
			$(container).show();
			self.autoSize();
			liAry.show();
		};
		self.setScrollOption = function(type){
			
			var itemType = "";
			switch(type){
				case "layoutBar":
					itemType = "layoutItem";
					if(self.data&&self.data.length>0){
						$(self.data).each(function(i,o){
						
							var itemOption = {
								type:itemType,
							};
							if(self.option.clickCallback){
								itemOption.clickCallback = self.option.clickCallback;
							}
							for(var key in o){
								itemOption[key] = o[key];
							}
							self.option.items.push(itemOption);
						});
					}
				break;
				case "appBar":
					itemType = "appItem";
					if(self.data&&self.data.length>0){
						$(self.data).each(function(i,o){
							$(o).each(function(i1,o1){
								var itemOption = {
									type:itemType
								};
								if(self.option.clickCallback){
									itemOption.clickCallback = self.option.clickCallback;
								}
								for(var key in o1){
									itemOption[key] = o1[key];
								}
								self.option.items.push(itemOption);
							});
						});
					}
				break;
				case "tabBar":
					itemType = "tabItem";
					if(self.data&&self.data.length>0){
						$(self.data).each(function(i,o){
							$(o).each(function(i1,o1){
								var itemOption = {
									type:itemType
								};
								if(self.option.clickCallback){
									itemOption.clickCallback = self.option.clickCallback;
								}
								for(var key in o1){
									itemOption[key] = o1[key];
								}
								self.option.items.push(itemOption);
							});
						});
					}
				break;
				
			}
		};
		self.create = function(){
			container = document.createElement("div");
			$(container).addClass("scroll-bar");
			$(option.container).append(container);
			fuiFactory.setBaseProperty(container,self.option);
			
			if(self.option.data){
					
					if(self.option.extendData){
						self.data = fuiFactory.dataMergeByObjects(fuiFactory.getVal(self.option.data),fuiFactory.getData(self.option.extendData));
					}else{
						self.data = fuiFactory.getVal(self.option.data);
					}
					/*
					var isArray = false;
					switch(self.option.scrollType){
						case "layoutBar":
							isArray = false;
						break;
						case "appBar":
							isArray = true;
						break;
					}
					*/
					if(self.option.dynamic){
						self.setScrollOption(self.option.scrollType);
					}
					
				
			}

			if(self.option.label){
				var label = document.createElement("div");
				$(label).html(self.option.label);
				$(label).addClass("scroll-bar-label");
				$(container).append(label);
			}
		
			var ulcls = "scrollbar-"+self.option.scrollType;
			
			
			if(self.option.scrollable){
				var s = "<div class='row' style='margin:0'><div class='col-xs-1 scroll-bar-left'>"+
							"<div><i class='ion-ios-arrow-back'></i></div>"+
						"</div>"+
						"<div class='col-xs-10 scroll-bar-content'><ul class='"+ulcls+"'></ul></div>"+
						"<div class='col-xs-1 scroll-bar-right'>"+
							"<div><i class='ion-ios-arrow-forward'></i></div>"+
						"</div></div>";
				$(container).html(s);
				$(container).find(".scroll-bar-left").on("click",function(){
					var ul = $(container).find(".scroll-bar-content").children("ul");
					var l = parseInt($(ul).css("marginLeft"));
					if(self.step==0){return;}
					var marginLeft = $(ul).find("li").width()*(self.step-1);
					$(ul).animate({"marginLeft":-marginLeft},300);
					self.step--;
				});
				$(container).find(".scroll-bar-right").on("click",function(){
					var ul = $(container).find(".scroll-bar-content").children("ul");
				
					var currentStep = $(ul).find("li").length-self.option.number;
					
					if(currentStep<0){currentStep=0;}
					if(self.step==currentStep){return;}
					var l = parseInt($(ul).css("marginLeft"));
					var marginLeft = $(ul).find("li").width()*(self.step+1);
					$(ul).animate({"marginLeft":-marginLeft},300);
					self.step++;
				});
			}else{
				
				var s ="<div class='row' style='margin:0'><div class='col-xs-12 scroll-bar-content'><ul class='"+ulcls+"'></ul></div></div>";
						
				$(container).html(s);
				
			}
			self.itemContainer = $(container).find(".scroll-bar-content ul");
			if(self.option.number){
				$(self.itemContainer).attr("number",self.option.number);
				if(self.option.items&&self.option.items.length>0){
					var w = ($(self.itemContainer).parent().width()/self.option.number)*(self.option.items.length);
					w = Math.ceil(w);
					$(self.itemContainer).css("width",w);
					
				}
			}
			var size = self.option.size?self.option.size:64;
			$(self.itemContainer).attr("size",size);
			$(self.itemContainer).attr("type",self.option.type);
			
			$(window).on("resize",function(){
				self.autoSize();
			});
			
			
			self.container = self.itemContainer;
		};
		return self;
	};
	fuiFactory.appItem = function(option){
		
		var self = {};
		self.container = null;
		self.option = option.option;
		self.createItem = function(){
			var size = $(option.container).attr("size");
			var number = $(option.container).attr("number");
			self.container = document.createElement("li");
			
			if($(option.container).attr("type")=="scrollBar"){
				$(self.container).css("width",$(option.container).parent().width()/(Number(number)));
			}
			var item = document.createElement("div");
			$(item).css("width",size);
			$(item).css("height",size);
			
			if(self.option.value){
				$(self.container).attr("val",self.option.value);
			}
			
			var fontSize  = 64;
			if(size){
				fontSize = size*0.7;
			}
			var icon = self.option.icon?self.option.icon:"ion-help-circled";
			
			$(item).html("<i style='font-size:"+fontSize+"px'  class='"+icon+"'></i>");
			
			if(self.option.open){
				$(self.container).addClass("open");
				$(item).on("click",function(){
					if($(this).parent().hasClass("open")){
						$(this).parent().removeClass("open");
					}else{
						$(this).parent().addClass("open");
					}
					if(self.option.clickCallback){
						fuiFactory.extendObject[self.option.clickCallback]($(this));
					}
				});
			}else if(self.option.active){
				$(self.container).addClass("active");
				$(item).on("click",function(){
					if($(this).parent().find(".active").length>0){
						$(this).parent().parent().find(".active").removeClass("active");
					}
					$(this).parent().addClass("active");
					if(self.option.clickCallback){
						fuiFactory.extendObject[self.option.clickCallback]($(this));
					}
				});
			}else{
				$(self.container).removeClass("open");
				$(item).on("click",function(){
					if($(this).parent().hasClass("open")){
						$(this).parent().removeClass("open");
					}else{
						$(this).parent().addClass("open");
					}
					if(self.option.clickCallback){
						fuiFactory.extendObject[self.option.clickCallback]($(this));
					}
				});
			}
			
			$(self.container).append(item);
			$(option.container).append(self.container);
		};
		self.createLabel = function(container,option){
			var label = document.createElement("span");
			if(option.text){
				$(label).html(option.text);
			}else{
				$(label).html("未知");
			}
			$(container).append(label);
		};
		self.create = function(){
			self.createItem(self.container,self.option);
			self.createLabel(self.container,self.option);
		};
		return self;
	};
	fuiFactory.layoutItem = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.createItem = function(){
			var size = $(option.container).attr("size");
			var number = $(option.container).attr("number");
			self.container = document.createElement("li");
			if(self.option.active){
				$(self.container).addClass("active");
			}
			if($(option.container).attr("type")=="scrollBar"){
				$(self.container).css("width",$(option.container).parent().width()/(Number(number)));
			}
			
			var item = document.createElement("div");
			$(item).css("width",size);
			$(item).css("height",size);
			$(item).attr("val",self.option.value);
			$(item).attr("text",self.option.text);
			if(self.option.text){
				
				var cv = self.option.text.split(":");
				
				if(cv.length>1){
					
					var cot = 0;
					for(var n=0,m=cv.length;n<m;n++){
						cot+=Number(cv[n]);
					}
					for(var n=0,m=cv.length-1;n<m;n++){
						var cvn = Math.round(Number(cv[n])/cot*(size-1));
						var cutline = document.createElement("div");
						$(cutline).addClass("cutline");
						$(cutline).css("marginLeft",cvn);
						$(item).append(cutline);
					}
				}
			}
			$(item).on("click",function(){
				$(option.container).children("li").removeClass("active");
				$(this).parent().addClass("active");
				
				if(self.option.clickCallback){
					fuiFactory.extendObject[self.option.clickCallback]($(this));
				}
			});
			$(self.container).append(item);
			$(option.container).append(self.container);
		};
		
		self.createLabel = function(container,option){
			var label = document.createElement("span");
			if(option.text){
				$(label).html(option.text);
			}else{
				$(label).html("未知");
			}
			$(container).append(label);
		};
		self.create = function(){
			self.createItem(self.container,self.option);
			self.createLabel(self.container,self.option);
		};
		return self;
	};
	fuiFactory.tabItem = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.createItem = function(){
			var size = $(option.container).attr("size");
			var number = $(option.container).attr("number");
			self.container = document.createElement("li");
			if(self.option.active){
				$(self.container).addClass("active");
			}
			if($(option.container).attr("type")=="scrollBar"){
				$(self.container).css("width",$(option.container).parent().width()/(Number(number)));
			}
			
			var item = document.createElement("div");
			
			$(item).css("text-align","center");
			$(item).attr("val",self.option.value);
			$(item).attr("text",self.option.text);
			
			fuiFactory.setBaseProperty(item,self.option);
			var fontSize  = 64;
			if(size){
				fontSize = size*0.7;
			}
			var icon = self.option.icon?self.option.icon:"ion-help-circled";
			
			$(item).html("<i style='font-size:"+fontSize+"px'  class='"+icon+"'></i>");
			self.createLabel(item,self.option);
			
			$(item).on("click",function(){
				$(option.container).children("li").removeAttr("class");
				$(this).parent().addClass("active");
				if(self.option.toggle){
					if(self.option.toggle.substring(0,1)=="#"){
						$(self.option.toggle).parent().find(".scrollbar-tabbarContent").hide();
						$(self.option.toggle).show();
					}else{
						
					}
				}
				
				if(self.option.clickCallback){
					fuiFactory.extendObject[self.option.clickCallback](self);
				}
			});
			$(self.container).append(item);
			$(option.container).append(self.container);
		};
		
		self.createLabel = function(container,option){
			var label = document.createElement("span");
			if(option.text){
				$(label).html(option.text);
			}else{
				$(label).html("未知");
			}
			$(container).append(label);
		};
		self.create = function(){
			self.createItem(self.container,self.option);
			//self.createLabel(self.container,self.option);
		};
		return self;
	};
	fuiFactory.mergeData = function(items,data,isArray){
		var isArray = isArray?isArray:false;
		var n = 0;
		if(isArray){
			$(data).each(function(i,o){
				$(o).each(function(i1,o1){
					for(var key in o1){
						items[n][key] = o1[key];
					}
					n++;
				});
			});
		}else{
			$(items).each(function(i,o){
				switch(typeof(data[i])){
					case "object":
						for(var key in data[i]){
							o[key] = data[i][key];
						}
					break;
					
					default:
						o.value = data[i];
					break;
				}
			});
		}
	};
	fuiFactory.setBaseProperty = function(obj,option){
		if(option){
			if(option.id){
				$(obj).attr("id",option.id);
			}
			if(option.name){
			
				switch($(obj).get(0).tagName.toLowerCase()){
					case "input":
					case "select":
					case "textarea":
						$(obj).attr("name",option.name);
					break;
					default:
						$(obj).addClass(option.name);
					break;
				}
			}
			if(option.cls){
				$(obj).addClass(option.cls);
			}
			if(option.style){
				$(obj).attr("style",option.style);
			}
			if(option.show==undefined||option.show){
			}else{
				$(obj).hide();
			}
			if(option.width){
				$(obj).css("width",option.width);
			}
			if(option.title){
				$(obj).attr("title",option.title);
			}
			if(option.height){
				$(obj).css("height",option.height);
			}
			if(option.value){
				$(obj).val(fuiFactory.getVal(option.value));
			}
			if(option.readonly){
				$(obj).attr("readonly","readonly");
			}
			if(option.disabled){
				$(obj).attr("disabled","disabled");
			}
			if(option.attr){
				$(option.attr.split(",")).each(function(i,o){
					var oy = o.split("::");
					if(oy.length>1){
						$(obj).attr(oy[0],fuiFactory.getVal(oy[1]));
					}
				});
			}
			if(option.html){
				$(obj).html(fuiFactory.find(option.html));
			}
			if(option.context){
				$(obj).text(fuiFactory.find(option.context));
			}
		}
		
	
		
		
	};
	fuiFactory.box = function(option){
		var self = {};
		self.box = null;
		self.container = null;
		self.header = null;
		self.headerLabel = null;
		self.headerButtonBar = null;
		self.footer = null;
		self.option = option.option;
		self.box = document.createElement("div");
		
		$(self.box).addClass("box");
		fuiFactory.setBaseProperty(self.box,self.option);
		
		if(self.option.parentName){
			$("."+self.option.parentName).append(self.box);
		}else{
			$(option.container).append(self.box);
		}
		if(self.option.bindDataId){
			$(self.box).attr("boxid",self.option.bindDataId);
		}
		
		if(self.option.extendId){
			$(self.box).attr("boxid",self.option.extendId);
		}
		self.create = function(){
			if(self.option.header){
				self.createHeader();
			}
			if(self.option.body){
				self.createBody();
			}
			if(self.option.footer){
				self.createFooter();
			}
			
		};
		self.show = function(){
			$(self.container).show();
		};
		self.hide = function(){
			$(self.container).hide();
		};
		self.createHeader = function(container){
			
			self.header = document.createElement("div");
			$(self.header).addClass("box-header");
			fuiFactory.setBaseProperty(self.header,self.option.header);
			function createLabel(){
				if(self.option.header.label){
					self.headerLabel = document.createElement("div");
					$(self.headerLabel).addClass("box-header-label");
					if(self.option.header.icon){
						$(self.headerLabel).append("<i class='"+self.option.header.icon+"'></i>");
					}
					$(self.headerLabel).append("<span>"+self.option.header.label+"</span>");
					$(self.header).append(self.headerLabel);
				}
				
			};
			function createButtonBar(){
				if(self.option.header.buttons){
					self.headerButtonBar = document.createElement("div");
					$(self.headerButtonBar).addClass("box-header-buttonbar");
					$(self.option.header.buttons).each(function(i,o){
						switch(o.buttonType){
							
							case "box-sh-button":
								var open = true;
								if(fuiFactory.isFalse(self.option.body.show)){
									o.icon = "ion-ios-browsers-outline";
									open = false;
								}else{
									o.icon = "ion-ios-minus-empty";
									open = true;
								}
								o.attr = "o::"+open;
								var btn = fuiFactory.button({
									container:self.headerButtonBar,
									option:o
								});
								btn.create();
								$(btn.container).on("click",function(){
									if($(this).attr("o")=="true"){
										self.hide();
										$(this).find("i").attr("class","ion-ios-browsers-outline");
										$(this).attr("o","false");
									}else{
										if(o.showBeforeCallback){
											fuiFactory.extendObject[o.showBeforeCallback](self);
										}
										self.show();
										$(this).find("i").attr("class","ion-ios-minus-empty");
										$(this).attr("o","true");
										if(o.showAfterCallback){
											fuiFactory.extendObject[o.showAfterCallback](self);
										}
									}
								});
								
							break;
							
							case "box-buttonGroup":
								var btn = fuiFactory.button({
									container:self.headerButtonBar,
									option:o,
									parentOption:self.option
								});
								btn.create();
							break;
						}
					});
					$(self.header).append(self.headerButtonBar);
				}
				
			};
			function create(){
				createLabel();
				createButtonBar();
			};
			create();
			$(self.box).append(self.header);
		};
		self.createBody = function(){
			self.container = document.createElement("div");
			$(self.container).addClass("box-body");
			
			if(fuiFactory.isFalse(self.option.body.show)){
				self.hide();
			}else{
				self.show();
			}
			$(self.box).append(self.container);
			fuiFactory.setBaseProperty(self.container,self.option.body);
			//console.log(self.option)
			fuiFactory.create({
				container:self.container,
				option:self.option.body,
				parentOption:self.option
			});
		};
		self.createFooter = function(){
			self.footer = document.createElement("div");
			$(self.footer).addClass("box-footer");
			$(self.box).append(self.footer);
		};
		return self;
	};
	
	fuiFactory.datatables = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.dataOption = null;
		self.gridContainer = null;
		
		self.datatableObj = null;
		self.data = null;
		self.create = function(){
			self.gridContainer = document.createElement("div");
			$(self.gridContainer).addClass("datatables-container");
			$(option.container).append(self.gridContainer);
			self.container = document.createElement("table");
			$(self.gridContainer).append(self.container);
			fuiFactory.setBaseProperty(self.gridContainer,self.option);
			if(fuiFactory.isFalse(self.option.show)){
				$(self.gridContainer).hide();
			}else{
				$(self.gridContainer).show();
			}
			var responsive = "";
			if(self.option.responsive){
				responsive = " responsive";
			}
			$(self.container).addClass("table table_container table-striped text-center"+responsive);
			$(self.container).attr("cellspacing",0);
			if(!self.option.width){
				$(self.container).css("width","100%");
			}
			
			if(self.option.option){
				self.option.dataOption = fuiFactory.getVal(self.option.option);
				if(self.option.drawBeforeCallback){
					fuiFactory.extendObject[self.option.drawBeforeCallback](self,fuiFactory.extendObject.childTrigger);
				}
				if(self.option.setOptionDataCallback){
					fuiFactory.extendObject[self.option.setOptionDataCallback](self.option);
				}
				if(self.option.childTrigger&&self.option.child){
					self.setChildTrigger();
				}
				self.datatableObj = $(self.container).DataTable(self.option.dataOption);
			}
		};
		self.setChildTrigger = function(){
			self.option.dataOption.rowCallback = function(trObj){
				var trigger = $(trObj).find(self.option.childTrigger);
				$(trigger).on("click",function(){
					fuiFactory.extendObject.childTrigger =  $(this);
					if($(trObj).next().hasClass("datatables-child")){
						
						if($(trObj).next().is(":hidden")){
							$(trObj).next().show();
						}else{
							$(trObj).next().hide();
						}
					}else{
						self.createChild(trObj,$(this));
					}
				});
			};
		};
		self.createChild = function(trObj,trigger){
			var childTr = document.createElement("tr");
			$(childTr).addClass("datatables-child");
			var childTD = document.createElement("td");
			$(childTD).css("padding",0);
			$(childTD).css("border",0);
			$(childTD).attr("colspan",$(trObj).find("td").length);
			
			$(childTr).append(childTD);
			$(trObj).after(childTr);
			
			fuiFactory.create({
				container:childTD,
				option:self.option.child
			});
		};
		self.search = function(params){
			self.datatableObj.ajax.setData(params);
			self.datatableObj.ajax.reload();
		};
		self.localReload = function(data){
			self.datatableObj.destroy();
			self.option.dataOption.data = data;
			self.option.dataOption.aaData = data;
			$(self.gridContainer).remove();
			fuiFactory.datatables({
				container:$(option.container),
				option:self.option
			}).create();
		};
		return self;
	};
	
	fuiFactory.clearLastCharacter = function(str){
		str=str.substring(0,str.length-1);
		return str;
	};
	fuiFactory.isFalse = function(val){
		var isFalse = true;
		if(val==undefined){
			isFalse = false;
		}else{
			if(val){
				isFalse = false;
			}else{
				isFalse = true;
			}
		}
		return isFalse;
	};
	fuiFactory.getObjData = function(obj,str){
		var ds = str.split(".");
		for(var i=0,j= ds.length;i<j;i++){
			obj = obj[ds[i]];
		}
		return obj;
	};
	fuiFactory.progress = function(type,n){
		var s = "";
		switch(type){
			case 1:
				var progressTheme = "";
        		if(n>=75&&n<=100){
        			progressTheme = "-red";
        		}
        		if(n>=50&&n<75){
        			progressTheme = "-yellow";
        		}
        		if(n>=25&&n<50){
        			progressTheme = "-blue";
        		}
        		if(n>=0&&n<25){
        			progressTheme = "-green";
        		}
        		s = "<div class='progress-label'>"+n+"%</div>"+
        				"<div class='progressContainer'>"+
        					"<div class='progress"+progressTheme+"' style='width:"+n+"%'></div>"+
        				"</div>";
			break;
		}
		return s;
	};
	fuiFactory.echart = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.dataOption = null;
		self.parentOption = option.parentOption;
		self.chart = null;
		self.data = null;
		self.echarts = null;
		self.theme = null;
		self.chartEle = null;
		self.option.seriesType =  self.option.seriesType?self.option.seriesType:"map";
		self.container = document.createElement("div");
			$(self.container).addClass("echarts-chart");
			if(fuiFactory.isFalse(self.option.show)){
				$(self.container).hide();
			}else{
				$(self.container).show();
			}
			
		
		$(option.container).append(self.container);
		self.mapSelectFuc = function(chart){
			if(self.option.seriesType=="map"){
				chart.on("mapselectchanged",function(param){
					fuiFactory.extendObject[self.option.mapSelectedCallback](param);
				});
			}else{
				chart.on("click",function(param){
					fuiFactory.extendObject[self.option.mapSelectedCallback](param);
				});
			}
			
			
		};

		self.create = function(){
			if(self.option.option){
				
				self.option.dataOption = fuiFactory.getVal(self.option.option);
				
				if(self.option.setOptionDataCallback){
					fuiFactory.extendObject[self.option.setOptionDataCallback](self.option);	
				}
				if(self.option.type=="map"){
					
					require(["echarts2.0"],function(){
						
						if(self.option.mapJson&&self.option.mapName){
							alert(333)
							$.get(self.option.mapJson,function(geoJson){
								echarts.registerMap(self.option.mapName, geoJson);
								self.echarts = echarts;
								if(!self.option.dataOption.series[0].data||self.option.dataOption.series[0].data.length==0){
									$(self.container).attr("id",self.option.id);
									$(self.container).html("<div style='text-align:center;color:#fff;padding:15px 0 0 0;'>无数据</div>");
									return;
								}
								fuiFactory.setBaseProperty(self.container,self.option);
								
								self.chart = self.echarts.init(self.container,self.theme);
								
								self.chartEle =self.chart.setOption(self.option.dataOption,true);
								
								$(window).on("resize",function(){
									self.reDraw();
									
								});
								if(self.option.mapSelectedCallback){
									self.mapSelectFuc(self.chart);
								}
							});
						}else{
							self.echarts = echarts;
							/*
							if(!self.option.dataOption.series[0].data||self.option.dataOption.series[0].data.length==0){
									$(self.container).attr("id",self.option.id);
									$(self.container).html("<div style='text-align:center;color:#fff;padding:15px 0 0 0;'>无数据</div>");
									return;
								}
							*/
							fuiFactory.setBaseProperty(self.container,self.option);
							
							self.chart = self.echarts.init(self.container,self.theme);
							self.chartEle = self.chart.setOption(self.option.dataOption,true);
						
							$(window).on("resize",function(){
								self.reDraw();
							});
							if(self.option.mapSelectedCallback){
								self.mapSelectFuc(self.chart);
							}
						}
					});
				}else{
					require(["echarts.min",self.option.theme],function(echarts,theme){
						self.echarts = echarts;
						self.theme = theme;
						/*
						if(!self.option.dataOption.series[0].data||self.option.dataOption.series[0].data.length==0){
								$(self.container).attr("id",self.option.id);
								$(self.container).html("<div style='text-align:center;color:#fff;padding:15px 0 0 0;'>无数据</div>");
								return;
							}
						*/
						fuiFactory.setBaseProperty(self.container,self.option);
						
						self.chart = self.echarts.init(self.container,self.theme);
						self.chartEle = self.chart.setOption(self.option.dataOption,true);
					
						$(window).on("resize",function(){
							self.reDraw();
						});
						if(self.option.mapSelectedCallback){
							self.mapSelectFuc(self.chart);
						}
					});
				}
//				require(["echarts","echarts.min",self.option.theme],function(echarts,echartsMin,theme){
//					if(!echarts||echarts==undefined){
//						echarts = echartsMin;
//					}
//					if(self.option.mapJson&&self.option.mapName){
//						$.get(self.option.mapJson,function(geoJson){
//							echarts.registerMap(self.option.mapName, geoJson);
//							self.echarts = echarts;
//							self.theme = theme;
//							if(!self.option.dataOption.series[0].data||self.option.dataOption.series[0].data.length==0){
//								$(self.container).attr("id",self.option.id);
//								$(self.container).html("<div style='text-align:center;color:#fff;padding:15px 0 0 0;'>无数据</div>");
//								return;
//							}
//							fuiFactory.setBaseProperty(self.container,self.option);
//							
//							self.chart = self.echarts.init(self.container,self.theme);
//							
//							self.chartEle =self.chart.setOption(self.option.dataOption,true);
//							
//							$(window).on("resize",function(){
//								self.reDraw();
//								
//							});
//							if(self.option.mapSelectedCallback){
//								self.mapSelectFuc(self.chart);
//							}
//						});
//					}else{
//						self.echarts = echarts;
//						self.theme = theme;
//						
//						if(!self.option.dataOption.series[0].data||self.option.dataOption.series[0].data.length==0){
//								$(self.container).attr("id",self.option.id);
//								$(self.container).html("<div style='text-align:center;color:#fff;padding:15px 0 0 0;'>无数据</div>");
//								return;
//							}
//						
//						fuiFactory.setBaseProperty(self.container,self.option);
//						
//						self.chart = self.echarts.init(self.container,self.theme);
//						self.chartEle = self.chart.setOption(self.option.dataOption,true);
//					
//						$(window).on("resize",function(){
//							self.reDraw();
//						});
//						if(self.option.mapSelectedCallback){
//							self.mapSelectFuc(self.chart);
//						}
//					}
//					
//					
//				});
			}
		};
		
		self.setChartOption = function(chartOption){
			self.option.dataOption = chartOption;
		};
		
		self.getChartOption = function(){
			return self.option.dataOption;
		};
		
		self.refresh = function(chartOption){
			self.setChartOption(chartOption);
			self.chart.setOption(self.option.dataOption,true);
		};
		
		self.reDraw = function(){
			/*
			if(!self.option.dataOption.series[0].data||self.option.dataOption.series[0].data.length==0){
				$(self.container).attr("id",self.option.id);
				$(self.container).html("<div style='text-align:center;color:#fff;padding:15px 0 0 0;'>无数据</div>");
				return;
			}
			*/
			fuiFactory.setBaseProperty(self.container,self.option);
			self.chart = self.echarts.init(self.container,self.theme);
			self.chart.setOption(self.option.dataOption,true); 
			if(self.option.mapSelectedCallback){
				self.mapSelectFuc(self.chart);
			}
			if(self.option.entityId){
				fuiFactory.entities[self.option.entityId] = self;
			}
			
		};
		return self;
	};
	fuiFactory.dataMergeByArrays = function(data,extendDatas){
		$(extendDatas).each(function(a,b){
			if(b&&b.length>0){
				$(b).each(function(i,o){
					$(data).each(function(i1,o1){
						if(o1&&o1.length>0){
							$(o1).each(function(m,n){
								if(n){
									if(o.id==n.id){
										for(var key in o){
											n[key]=o[key];
										}
										
										return false;
									}
								}
								
							});
						}
						
					});
				});
			}
		});
		//console.log(data);
		return data;
	};
	fuiFactory.dataMergeByDataId = function(){
		var self = {};
		self.find = function(obj){
			if($.isArray(obj)){
				$(obj).each(function(i,o){
					self.find(o);
				});
			}else{
				$(objects).each(function(i,o){
					$(o).each(function(i1,o1){
						if(o1.bindDataId== obj.bindDataId){
							for(var key in o1){
								obj[key] = o1[key];
							}
						}
					});
				});
			}
		};
		self.find(data);
		//console.log(data);
		//console.log(data);
		return data;
	};
	fuiFactory.dataMergeByObjects = function(data,objects,kw){
		kw = kw?kw:"rid";
		var self = {};
		
		self.find = function(obj){
			if($.isArray(obj)){
				$(obj).each(function(i,o){
					self.find(o);
				});
			}else{
				$(objects).each(function(i,o){
					$(o).each(function(i1,o1){
						if(o1[kw]== obj[kw]){
							for(var key in o1){
								obj[key] = o1[key];
							}
						}
					});
				});
			}
		};
		self.find(data);
		return data;
	};
	fuiFactory.staticRow = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("div");
			if(self.option.full){
				$(self.container).addClass("row-fluid");
			}else{
				$(self.container).addClass("row");
			}
			
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
		};
		
		return self;
	};
	fuiFactory.dynamicRow = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.layout = null;
		
		
		self.data = null; 
		self.items = null;
		
		self.kw = "rid";
		if(self.option.kw){
			self.kw = self.option.kw;
		}
		self.reDraw = function(){
			
			$(option.container).html("");
			
			self.option = fuiFactory.entities[self.option.entityId].option;
			self.create();
			if(self.option.entityId){
				fuiFactory.entities[self.option.entityId] = self;
			}
			
			fuiFactory.create({
				container:self.container,
				option:self.option,
				parentOption:option.parentOption
			});
		};
		self.countLayout = function(){
			var ly = [];
			if(self.layout){
				var lay = self.layout.split(":");
				var sum = 0;
				$(self.data).each(function(i,o){
					sum+=Number(lay[i]);
				});
				$(self.data).each(function(i,o){
					
					ly.push(Math.round(Number(lay[i])/sum*12));
				});
				
				
			}else{
				var y = 12%(self.data.length);
				var ty = y;
				$(self.data).each(function(i,o){
					if(ty>0){
						ly.push((12-y)/$(self.data).length+1);
						ty--;
					}else{
						ly.push((12-y)/$(self.data).length);
					}
					
				});
			}
			return ly;
		};
		self.create = function(){
			if(self.option.layout){
				self.layout = fuiFactory.getVal(self.option.layout); 
			}
			if(self.option.data){
				self.container = document.createElement("div");
				$(self.container).addClass("row");
				$(option.container).append(self.container);
				fuiFactory.setBaseProperty(self.container,self.option);
				if(self.option.extendData){
					
					var extendData = [];
					$(self.option.extendData.split(",")).each(function(i,o){
						extendData.push(fuiFactory.getVal(o));
					});
					
					self.data = fuiFactory.dataMergeByObjects(fuiFactory.getVal(self.option.data),extendData,self.kw);
				}else{
					
					self.data = fuiFactory.getVal(self.option.data);
					
				}
				if(self.option.colItems&&self.option.colItems.length>0){
					self.setColumnOptionByColItems();
				}else{
					self.setColumnOptionByData();
				}
				
				
			}
		};
		self.setColumnOptionByData = function(){
			
			var ly = self.countLayout();
			
			
			self.option.items = [];
			
			$(self.data).each(function(i,o){
				var cNum = null;
				if(o.cNum){
					cNum = Number(o.cNum);
				}else{
					cNum = ly[i%ly.length];
				}
				
				var columnOption = {
					"type":"column",
					"cNum":cNum,
					"items":[]
				};
				
				if(self.option.colCls){
					columnOption.cls = self.option.colCls;
				}
				if(self.option.colStyle){
					columnOption.style = self.option.colStyle;
				}
				$(o).each(function(i1,o1){
					columnOption.items.push(o1);
				});
				self.option.items.push(columnOption);
			});
			//console.log(self.option.items);
		};
		self.setColumnOptionByColItems = function(){
			var ly = self.countLayout();
			self.option.items = [];
			$(self.data).each(function(i,o){
				var columnOption = {
					"type":"column",
					"cNum":ly[i%ly.length],
					"items":[]
				};
				if(self.option.colCls){
					columnOption.cls = self.option.colCls;
				}
				if(self.option.colStyle){
					columnOption.style = self.option.colStyle;
				}
				$(o).each(function(i1,o1){
					$(self.option.colItems).each(function(i2,o2){
						if(o2){
							
							if(o2.bindDataId){
								if(o2.bindDataId == o1[self.kw]){
									
									switch(o2.type){
										case "box":
											if(o1.icon){
												o2.header.icon = o1.icon;
												o2.header.label = o1.text;
											}
											if(!o1.open){
												o2.show = false;
											}
										break;
									}
									
									columnOption.items.push(o2);
									
								}
							}
						}
						
					});
				});
				self.option.items.push(columnOption);
			});
			//console.log(self.option.items)
		};
		return self;
	};
	fuiFactory.labelBar = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.label = null;
		
		self.create = function(){
			self.container = document.createElement("div");
			$(self.container).addClass("labelBar");
			$(option.container).append(self.container);
			fuiFactory.setBaseProperty(self.container,self.option);
			if(self.option.text){
				self.label = document.createElement("div");
				$(self.label).addClass("labelBar-label");
				if(self.option.labelStyle){
					$(self.label).attr("style",self.option.labelStyle);
				}
				if(self.option.labelCls){
					$(self.label).addClass(self.option.labelCls);
				}
				$(self.label).html(self.option.text+"：");
				$(self.container).append(self.label);
			}
			if(self.option.value){
				self.option.items = self.option.items?self.option.items:[];
				var textOption = {
					"type":"text",
					"html":self.option.value,
					"cls":"labelBar-text"
				};
				self.option.items.push(textOption);
			}
		};
		return self;
	};
	fuiFactory.text = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container =  document.createElement("div");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
		};
		return self;
	};
	fuiFactory.getData = function(str){
		var ary = str.split(",");
		var dataAry = [];
		$(ary).each(function(i,o){
			dataAry.push(fuiFactory.getVal(o));
		});
		return dataAry;
	};
	fuiFactory.getVal = function(str){
		var obj = null;
		if(typeof(str)!="string"){
			return str;
		}
		switch(str.substring(0,1)){
			case "@"://extendObject对象
				var eo = str.substring(1,str.length);
				obj = fuiFactory.extendObject;
				$(eo.split(".")).each(function(i,o){
					obj = obj[o];
				});
				
			break;
			case "$"://dom的input,select,textarea对象
				var ary = str.substring(1,str.length).split("::");
				if(ary.length>0){
					obj = $(ary[0]).attr(ary[1]);
				}else{
					obj = $(str.substring(1,str.length)).val();
				}
				
			break;
			
			case "&"://entities对象
				obj =  fuiFactory.entities[str.substring(1,str.length)];
			break;
			
			
			
			default:
				obj = str;
			break;
		}
		
		return obj;
	};
	fuiFactory.findEntityById = function(id){
		var entityObj = null;
		for(var key in fuiFactory.entities){
			if(fuiFactory.entities[key].option.id==id){
				entityObj = fuiFactory.entities[key];
				break;
			}
		}
		return entityObj;
	};
	fuiFactory.findEntityByEntityId = function(entityId){
		var entityObj = null;
		for(var key in fuiFactory.entities){
			if(fuiFactory.entities[key].option.entityId==entityId){
				entityObj = fuiFactory.entities[key];
				break;
			}
		}
		return entityObj;
	};
	fuiFactory.breadcrumb = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.data = null;
		self.create = function(){
			
			self.container =  document.createElement("ol");
			$(self.container).addClass("breadcrumb");
			$(option.container).append(self.container);
			if(self.option.data){
				self.data = fuiFactory.getVal(self.option.data);
				var active = "none";
				if(self.option.active){
					if(self.option.active=="auto"){
						active = 0;
					}else{
						active = Number(self.option.active);
					}
				}
				
				$(self.data).each(function(i,o){
					
					var li = document.createElement("li");
					
					if(active!="none"){
						
						if(i==active){
							$(li).addClass("active");
						}
					}
					$(self.container).append(li);
					var a = fuiFactory.link({
						container:$(li),
						option:{
							text:o.text
						}
					});
					a.create();
					
					$(a.container).on("click",function(){
						if(self.option.clickCallback){
							fuiFactory.extendObject[self.option.clickCallback](o);
						}
						$(self.container).children("li").removeAttr("class");
						$(li).addClass("active");
					});
					
				});
			}
		};
		return self;
	};
	fuiFactory.getToggle = function(toggle){
		var obj = null;
		if(toggle.substring(0,1)=="&"){
			obj = fuiFactory.entities[toggle.substring(1,toggle.length-1)];
		}else{
			obj = $(toggle);
		}
		return obj;
	};
	fuiFactory.carousel = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.indicators = null;
		self.inner = null;
		self.data = null;
		self.pageDataNum = null;
		self.leftControl= null;
		self.rightControl= null;
		self.create = function(){
			
			if(self.option.data){
				self.data = fuiFactory.getVal(self.option.data);
				self.pageDataNum = self.data.length;
			}
			self.container = document.createElement("div");
			$(self.container).addClass("carousel slide");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
			
			if(!fuiFactory.isFalse(self.option.indicators)){
				self.indicators();
			}
			self.inner();
			if(!fuiFactory.isFalse(self.option.control)){
				self.control();
			}
			
			$(self.container).carousel({
				container:$(self.indicators),
  				//interval: 3000
  				pause: true,
				interval: false
			});
		};
		self.indicators = function(){
			self.indicators = document.createElement("ol");
			$(self.indicators).addClass("carousel-indicators");
			if(self.option.indicators.cls){
				$(self.indicators).addClass(self.option.indicators.cls);
			}
			if(self.option.indicators.style){
				$(self.indicators).attr("style",self.option.indicators.style);
			}
			if(self.option.indicators.id){
				$(self.indicators).attr("id",self.option.indicators.id);
			}
			if(!fuiFactory.isFalse(self.option.indicators.show)){
				if(self.data&&self.data.length>0){
					
					
					for(var i=0;i<self.pageDataNum;i++){
						var li = document.createElement("li");
						$(li).attr("data-target","#"+self.option.id);
						$(li).attr("data-slide-to",i);
						if(self.option.active){
							if(self.option.active==i)
							$(li).addClass("active");
						}else{
							if(i==0){
								$(li).addClass("active");
							}
						}
						$(self.indicators).append(li);
					}
					
				}
			}
			$(self.container).append(self.indicators);
		};
		self.inner = function(){
			self.inner = document.createElement("div");
			$(self.inner).addClass("carousel-inner");
			$(self.container).append(self.inner);
			if(self.option.inner){
				fuiFactory.setBaseProperty(self.inner,self.option.inner);
				var innerOption = {
					container:self.inner,
					option:self.option.inner
					//parentOption:self.option
				};
				
				fuiFactory.create(innerOption);
			}
		};
		self.control = function(){
			self.leftControl = document.createElement("a");
			$(self.leftControl).addClass("carousel-control left");
			$(self.leftControl).attr("data-slide","prev");
			$(self.leftControl).attr("href","#"+self.option.id);
			$(self.container).append(self.leftControl);
			$(self.leftControl).html("&lsaquo;");
			self.rightControl = document.createElement("a");
			$(self.rightControl).addClass("carousel-control right");
			$(self.rightControl).attr("data-slide","next");
			$(self.rightControl).attr("href","#"+self.option.id);
			$(self.rightControl).html("&rsaquo;");
			$(self.container).append(self.rightControl);
			if(self.option.control.style){
				$(self.leftControl).attr("style",self.option.control.style);
				$(self.rightControl).attr("style",self.option.control.style);
			}
		};
		return self;
	};
	fuiFactory.template = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.template = null;
		self.data = null;
		self.create = function(){
			if(self.option.templateToggle){
				var templateContainer =  null;
				var templateToggle = fuiFactory.getToggle(self.option.templateToggle);
				if(self.option.toggle){
					templateContainer = fuiFactory.getToggle(self.option.toggle);
				}else{
					templateContainer = option.container;
				}
				
				if(self.option.data){
					self.data = fuiFactory.getVal(self.option.data);
					
					if(self.data){
						require(["template"],function(template){
							
							self.template = template;
							if(self.option.helpers){
								$(self.option.helpers.split(",")).each(function(i,o){
									
									var helper = fuiFactory.getVal(o);
									if(helper){
										helper(self);
									}
								});
							}
							var tmp = self.template.compile(templateToggle.html());
							
				   			$(templateContainer).html(tmp(self.data));
				   			if(self.option.templateAfterCallback){
				   				fuiFactory.extendObject[self.option.templateAfterCallback](self);
				   			}
						});
					}
				}
				
			}
		};
		return self;
	};
	fuiFactory.radialIndicator = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("div");
			require(["radialIndicator"],function(){
				$(self.container).radialIndicator({
					radius:self.option.radius?self.option.radius:50,
					barWidth:self.option.barWidth?self.option.barWidth:5,
					barBgColor:self.option.barBgColor?self.option.barBgColor:"#eeeeee",
					barColor:self.option.barColor?self.option.barColor:"#99CC33",
					roundCorner:self.option.roundCorner?self.option.roundCorner:false,
					fontColor:self.option.fontColor?self.option.fontColor:"#666",
					fontSize:self.option.fontSize?self.option.fontSize:"Calculated",
					percentage:self.option.percentage?self.option.percentage:true,
					displayNumber:self.option.displayNumber?self.option.displayNumber:true,
					initValue:self.option.initValue?self.option.initValue:0,
					minValue:self.option.minValue?self.option.minValue:0,
					maxValue:self.option.maxValue?self.option.maxValue:100
				});
			});
		};
		return self;
	};
	fuiFactory.form = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			if(fuiFactory.isFalse(self.option.hasForm)){
				self.container = document.createElement("div");
				$(option.container).append(self.container);
			}else{
				self.container = document.createElement("form");
				$(self.container).attr("role","form");
				$(option.container).append(self.container);
				if(self.option.method){
					$(self.container).attr("method",self.option.method);
				}
				if(self.option.action){
					$(self.container).attr("action",self.option.action);
				}
			}
			fuiFactory.setBaseProperty(self.container,self.option);
			if(self.option.layoutType){
				$(self.container).addClass("form-"+self.option.layoutType);
			}
		};
		return self;
	};
	fuiFactory.form.textarea = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("textarea");
			$(self.container).addClass("form-control");
			$(option.container).append(self.container);
			fuiFactory.setBaseProperty(self.container,self.option);
		};
		return self;
	};
	fuiFactory.form.select = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("select");
			$(self.container).addClass("form-control");
			$(option.container).append(self.container);
			fuiFactory.setBaseProperty(self.container,self.option);
			if(self.option.childs&&self.option.childs.length>0){
				$(self.option.childs).each(function(i,o){
					var option = document.createElement("option");
					$(option).attr("value",o.value);
					$(option).html(o.text);
					$(self.container).append(option);
				});
			}
		};
		return self;
	};
	fuiFactory.form.label = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("label");
			$(option.container).append(self.container);
			fuiFactory.setBaseProperty(self.container,self.option);
			if(self.option.text){
				$(self.container).html(self.option.text+"：");
			}
			if(self.option.toggle){
				var ss = self.option.toggle.substring(0,1);
				
				if(ss=="#"){
					$(self.container).attr("for",self.option.toggle.substring(1,self.option.toggle.length));
				}else{
					$(self.container).attr("for",self.option.toggle.substring);
				}
			}

			if(option.parentOption.layoutType){
				switch(option.parentOption.layoutType){
					case "horizontal":
						$(self.container).addClass("control-label");
					break;
					
					case "inline":
						$(self.container).addClass("sr-only");
					break;
				}
			}
		};
		return self;
	};
	fuiFactory.form.group = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("div");
			$(option.container).append(self.container);
			fuiFactory.setBaseProperty(self.container,self.option);
			$(self.container).addClass("form-group");
		};
		return self;
	};
	fuiFactory.form.text = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("input");
			$(option.container).append(self.container);
			fuiFactory.setBaseProperty(self.container,self.option);
			$(self.container).addClass("form-control");
		};
		return self;
	};
	fuiFactory.form.hidden = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.create = function(){
			self.container = document.createElement("input");
			$(option.container).append(self.container);
			$(self.container).attr("type","hidden");
			
			fuiFactory.setBaseProperty(self.container,self.option);
		};
		return self;
	};
	fuiFactory.find = function(str){
		var s = "";
		if(str.split("{{").length>0){
			var ary = str.split("{{");
			$(ary).each(function(i,o){
				var text = "";
				if(o.split("}}").length>1){
					 text = fuiFactory.getVal(o.split("}}")[0])+o.split("}}")[1];
				}else{
					text = o;
				}
				s+=text;
			});
		}else{
			s = str;
		}
		return s;
	};
	fuiFactory.findParams = function(paramsStr){
		var paramAry = paramsStr.split(",");
		
		var params = {};
		$(paramAry).each(function(i,o){
			params[o.split("::")[0]] =  fuiFactory.getVal(o.split("::")[1]);
		});
		return params;
	};
	fuiFactory.modal = function(option){
		var self = {};
		self.modal = null;
		self.header = null;
		self.footer = null;
		self.container = null;
		self.option = option.option;
		self.modalContainer = null;
		self.dialog = null;
		self.content = null;
		self.labelToggle = null;
		self.size = self.option.size?" modal-"+self.option.size:"normal";
		self.show = self.option.show?self.option.show:false;
		self.id = self.option.id?self.option.id:null;
		if(self.id){
			$("#"+self.id).remove();
		}
		self.create = function(){
			self.modalContainer = document.createElement("div");
			$(self.modalContainer).addClass("modal fade");
			$(option.container).append(self.modalContainer);
			var tabindex = self.option.tabindex?self.option.tabindex:"-1";
			$(self.modalContainer).attr("tabindex",tabindex);
			$(self.modalContainer).attr("role","dialog");
			$(self.modalContainer).attr("aria-hidden",self.show);
			fuiFactory.setBaseProperty(self.modalContainer,self.option);
			self.labelLedby = self.option.labelLedby?self.option.labelLedby:""; 
			$(self.modalContainer).attr("aria-labelledby",self.labelLedby);
			self.dialog = document.createElement("div");
			$(self.modalContainer).append(self.dialog);
			
			if(self.option.draggable){
				$(self.dialog).draggable({
					handle: ".modal-header",   
				    cursor: 'move',   
				    refreshPositions: false
				});
			}
			$(self.dialog).addClass("modal-dialog");
			self.content = document.createElement("div");
			$(self.content).addClass("modal-content");
			$(self.dialog).addClass(self.size);
			$(self.dialog).append(self.content);
			if(self.option.header){
				self.createHeader();
			}
			if(self.option.body){
				self.createBody();
			}
			if(self.option.footer){
				self.createFooter();
			}
			
		};
		self.createHeader = function(){
			self.header = document.createElement("div");
			$(self.header).addClass("modal-header");
			$(self.content).append(self.header);
			var closeBtnOption = {
				container:self.header,
				option:{
					type:"button",
					cls:"close",
					buttonType:"modal",
					attr:"data-dismiss::modal,aria-hidden::self.show",
					text:"&times;"
				}
			};
			fuiFactory.button(closeBtnOption).create();
			var h4 = document.createElement("h4");
			$(h4).attr("id",self.labelLedby);
			$(h4).addClass("modal-title");
			$(h4).html(self.option.header.title);
			$(self.header).append(h4);
		};
		self.getBody = function(){
			return self.container;
		};
		self.createBody = function(){
			self.container = document.createElement("div");
			$(self.container).addClass("modal-body");
			$(self.content).append(self.container);
			fuiFactory.setBaseProperty(self.container,self.option.body);
			if(self.option.body.html){
				self.loadHtml();
			}else if(self.option.body.remoteUrl){
				self.loadRemoteContext();
			}else{
				self.loadModal();
			}
		};
		self.createFooter = function(){
			self.footer = document.createElement("div");
			$(self.footer).addClass("modal-footer");
			$(self.content).append(self.footer);
			
			if(self.option.footer){
				if(self.option.footer.buttons&&self.option.footer.buttons.length>0){
					$(self.option.footer.buttons).each(function(i,o){
						
						fuiFactory.button({
							container:self.footer,
							option:o
						}).create();
					});
				}
				var closeBtnOption =  {
					container:self.footer,
					option:{
						"type":"button",
						"text":"关闭",
						"cls":"btn-default",
						"attr":"data-dismiss::modal"
					}
				};
				fuiFactory.button(closeBtnOption).create();
			}
			
		};
		self.hide = function(){
			self.modal = $(self.modalContainer).modal("hide");
		};
		self.sh = function(){
			
			if(!self.show){
				self.modal = $(self.modalContainer).modal("show");
				$(self.modalContainer).on('show.bs.modal',function(){
					if(self.option.align=="center"){
						self.center();
						$(window).on("resize",function(){
							
							self.center();
						});
					}
				});
			}else{
				
				self.modal = $(self.modalContainer).modal("hide");
			}
		};
		self.center = function(){    
			 var top = Math.round(($(document).height()-$(self.modalContainer).height())/2);
		    top = top > 0 ? top : 0;
		     $(self.modalContainer).find('.modal-content').parent().css("margin-top", top);
		};
		self.loadModal = function(){
			self.sh();
			fuiFactory.create({
     			container:self.container,
     			option:self.option.body
	         });
		};
		self.showModal = function(){
			self.sh();
		};
		self.loadRemoteContext = function(){
			
			$.ajax({
			         type: "get",
			         async: true,
			         url:   self.option.body.remoteUrl,
			         data:	fuiFactory.findParams(self.option.body.remoteParams),
			         success: function(data){
			         	
			         	$(self.container).html("");
			         	
			         	if(self.option.body.beforeLoadCallback){
		             		fuiFactory.extendObject[self.option.body.beforeLoadCallback](self);
		             	}
			         	$(self.container).append(data);
			         	self.sh();
					   
			         	
			         	if(self.option.body.afterLoadCallback){
		             		fuiFactory.extendObject[self.option.body.afterLoadCallback](self);
		             	}
		             	
		             	
	             		fuiFactory.create({
	             			container:self.container,
	             			option:self.option.body
	             		});
		             	
			         },
			         error: function(XMLHttpRequest, textStatus, errorThrown){
			             if(textStatus=="timeout"){  
			                 alert("加载超时，请重试");  
			             }else{   
			                 alert("网络出错");   
			            }
			         },
			         beforeSend:function(XMLHttpRequest){
		             	if(self.option.body.beforeSendCallback){
		             		fuiFactory.extendObject[self.option.body.beforeSendCallback](self);
		             	}
		             }
		 		});
		};
		self.loadHtml = function(){
			$(self.container).append(fuiFactory.find(self.option.body.html));
				self.sh();
				
				fuiFactory.create({
         			container:self.container,
         			option:self.option.body
         		});
		};
		return self;
	};
	fuiFactory.alert = function(option){
		fuiFactory.modal({
				container:$("body"),
				option:{
					"type":"modal",
					"size":"sm",
					"show":option.show?option.show:true,
					"header":{"title":option.title?option.title:""},
					"body":{"html":option.html?option.html:""},
					"align":"center"
				}
		});
	};
	fuiFactory.confirm = function(){
		fuiFactory.modal({
			container:$("body"),
			option:{
				"type":"modal",
				"size":"sm",
				"show":option.show?option.show:true,
				"header":{"title":option.title?option.title:""},
				"body":{"html":option.html?option.html:""},
				"footer":{
					"buttons":[
						{
							"type":"button",
							"text":"修改",
							"clickCallback":"mk1_form_submit"
						}
					]
				},
				"align":"center"
			}
		});
	};
	fuiFactory.tabBar = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.tab = null;
		self.tabContent = null;
		self.tabData = null;
		self.tabExtendData = null;
		self.activeId = "";
		self.create = function(){
			if(self.option.tab){
				self.createTab();
			}
			if(self.option.tabContent){
				self.createTabContent();
			}
			
		};
		self.createTab = function(){
			if(self.option.tab.data){
				self.tabData = fuiFactory.getVal(self.option.tab.data);
				if(self.option.tab.extendData){
					self.tabExtendData = fuiFactory.getVal(self.option.tab.extendData);
					
					self.tabData = fuiFactory.dataMergeByObjects(self.tabData,self.tabExtendData);
				}
			}
			self.tab = document.createElement("ul");
			fuiFactory.setBaseProperty(self.tab,self.option.tab);
			$(self.tab).addClass("nav nav-tabs");
			$(option.container).append(self.tab);
			
			var icon = self.option.icon?self.option.icon:"ion-help-circled";
			$(self.tabData).each(function(i,o){
				
				var li = document.createElement("li");
				
				var linkOption = {
					container:li,
					option:{
						"type":"link",
						"text":o.text,
						"icon":o.icon,
						"style":o.style,
						"cls":o.cls,
						"attr":"val:"+o.value+",data-toggle:tab",
						"href":o.href
					}
				};
				
				if(o.clickCallback){
					linkOption.option.clickCallback = o.clickCallback;
				}
				
				var link = fuiFactory.link(linkOption);
				link.create();
				
				if(o.active){
					$(li).addClass("active");
					self.activeId = o.href.substring(1,o.href.length);
				}
				if(o.data&&o.data.length>0){
					$(li).addClass("dropdown");
					$(link.container).append("<b class='caret'></b>");
					$(link.container).attr("data-toggle","dropdown");
					$(link.container).addClass("dropdown");
					var linkId = Math.floor(Math.random()*10000);
					$(link.container).attr("id",linkId);
					var childContainer = document.createElement("ul");
					$(childContainer).addClass("dropdown-menu");
					$(childContainer).attr("role","menu");
					$(childContainer).attr("aria-labelledby",linkId);
					$(li).append(childContainer);
					$(o.data).each(function(i1,o1){
						var childLi = document.createElement("li");
						
						var linkOption2 = {
							container:childLi,
							option:{
								"type":"link",
								"text":o1.text,
								"attr":"val:"+o1.value+",data-toggle:tab,tabindex:-1",
								"href":o1.href
							}
						};
						var link2 = fuiFactory.link(linkOption2);
						link2.create();
						$(childContainer).append(childLi);
					});
				}
				$(self.tab).append(li);
			});
			if(self.activeId==""){
				$(self.tab).children("li:eq(0)").addClass("active");
				self.activeId = self.tabData[0].href.substring(1,self.tabData[0].href.length);
			}
		};
		self.createTabContent = function(){
			self.tabContent = document.createElement("div");
			$(self.tabContent).addClass("tab-content");
			fuiFactory.setBaseProperty(self.tabContent,self.option.tabContent);
			$(option.container).append(self.tabContent);
			var items = self.option.tabContent.items;
			$(items).each(function(i,o){
				if(o.id==self.activeId){
					o.cls = "tab-pane fade in active";
				}else{
					o.cls = "tab-pane fade";
				}
				
			});
			fuiFactory.create({
				container:self.tabContent,
				option:self.option.tabContent
			});
		};
		return self;
	};
	fuiFactory.progressBar = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.min = self.option.min?self.option.min:0;
		self.max =  self.option.max?self.option.max:100;
		self.valueNow =  self.option.valueNow?self.option.valueNow:0;;
		self.progressBar = null;
		self.create = function(){
			self.container = document.createElement("div");
			$(self.container).addClass("progress");
			$(option.container).append(self.container);
			self.progressBar = document.createElement("div");
			$(self.progressBar).addClass("progress-bar");
			$(self.progressBar).attr("role","progressbar");
			$(self.progressBar).attr("aria-valuenow",self.ariaValueNow);
			$(self.progressBar).attr("aria-valuemin",self.min);
			$(self.progressBar).attr("aria-valuemax",self.max);
			$(self.progressBar).css("width",self.valueNow+"%");
			$(self.progressBar).append("<span class='sr-only'>"+self.valueNow+"%"+"已完成</span>");
			$(self.container).append(self.progressBar);
		};
		return self;
	};
	fuiFactory.scrollBar.tabbarContent = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.customType = self.option.customType?self.option.customType:"div";
		
		self.create = function(){
			self.container = document.createElement(self.customType);
			$(self.container).addClass("scrollbar-tabbarContent");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
		};
		return self;
	};
	
	fuiFactory.error = function(container,errorStr){
		$(container).append("<div class='remoteMsg-bar'><i class='ion-android-cancel'></i>"+errorStr+"</div>");
	};
	fuiFactory.remote = function(option){
		var self = {};
		if(option){
			self.params = option.params?option.params:{};
			self.url = option.url?option.url:"";
			self.async = option.async?option.async:true;
			self.type = option.type?option.type:"get";
			self.dataType = option.dataType?option.dataType:"json";
			self.successCallback = option.successCallback?option.successCallback:null;
			self.errorCallback = option.errorCallback?option.errorCallback:null;
			self.beforeCallback = option.beforeCallback?option.beforeCallback:null;
			self.timeout = option.timeout?option.timeout:-1;
			self.remoteObj = null;
			self.isLongConnection =  option.isLongConnection?option.isLongConnection:false;
			if(self.isLongConnection){
				self.timeout = 0;
			}
			self.isConnect = true;
			self.connect = function(){
				self.remoteObj = $.ajax({
			         type:	self.type,
			         async: self.async,
			         url:	self.url,
			         data : self.params,
			         dataType:self.dataType,
			         timeout:self.timeout,
			         success: function(data){
			         	
			         	if(self.successCallback){
			         		if(typeof(self.successCallback)=="string"){
			         			if(fuiFactory.extendObject[self.successCallback]){
			         				fuiFactory.extendObject[self.successCallback](data);
			         			}
			         		}else{
			         			self.successCallback(data);
			         		}
			         		
			         		if(self.isLongConnection){
			         			if(self.isConnect)
			         			self.connect();
			         		}
			         	}
			         	
			         },
			         error: function(XMLHttpRequest, textStatus, errorThrown){
			         	if(self.errorCallback){
			         		if(typeof(self.successCallback)=="string"){
				         		if(fuiFactory.extendObject[self.errorCallback]){
				         			fuiFactory.extendObject[self.errorCallback]();
				         		}
			         		}else{
			         			self.errorCallback();
			         		}
			         		if(self.isLongConnection){
			         			if(self.isConnect)
			         			self.connect();
			         		}
			         	}
			         },
			         beforeSend:function(XMLHttpRequest){
		              	if(self.beforeCallback){
		              		if(typeof(self.successCallback)=="string"){
				         		if(fuiFactory.extendObject[self.beforeCallback]){
				         			fuiFactory.extendObject[self.beforeCallback]();
				         		}
			         		}else{
			         			self.beforeCallback();
			         		}
			         	}
		             },
		             complete:function(XMLHttpRequest, textStatus){
		             	if(textStatus=="timeout"){
		             		if(!self.isLongConnection){//如果非长链接，超时就断开请求
		             			self.remoteObj.abort();
		             		}
		             	}
		             }
	 			});
	 			return self;
			};
			self.stop = function(){
				self.isConnect = false;
				self.remoteObj.abort();
			};
			self.run = function(){
				self.isConnect = true;
				self.connect();
			};
			self.connect();
	 		return self;
		}
		
	};
	fuiFactory.getFormParams = function(option){
		option.container = option.container?option.container:$("body");
		option.type = option.type?option.type:"obj";
	    var tmp = {};
	    var params = {};
	    var inputname = [];
	    
	    $(option.container).find("input,select,textarea").each(function(){
	        var paramObj = {};
	        var name = $(this).attr("name");
	        if($(this).is("input")){
	            if($(this).attr("type")!="radio"&&$(this).attr("type")!="checkbox"){
	                var input =  $(option.container).find("input[name="+name+"]");
	                if(option.isFullParams){
	                	
	                	if(option.encode){
	                		
	                		params[name] = encodeURI(input.val());
	                	}else{
	                		params[name] = input.val();
	                	}
	                     
	                }else{
	                	
	                    if(input.val()){
	                        if(option.encode){
	                        	
	                			params[name] = encodeURI(input.val());
		                	}else{
		                		params[name] = input.val();
		                	}
	                    }
	                   
	                }
	            }else{
	               
	                var s = "";
	                    if(!tmp[name]){
	                        var hav = false;
	                       $(inputname).each(function(i3,o3){
	                           if(name==o3){
	                               hav = true;
	                               return false;
	                           }
	                       });
	                       if(hav){return true;}
	                       var inputs =  $(option.container).find("input[name="+name+"]:checked");
	                       var n =  inputs.size();
	                       if(option.isFullParams){
	                           inputs.each(function(i,obj){
	                               if(i==n-1){
	                               	 if(option.encode){
			                			s+= encodeURI($(obj).val());
				                	 }else{
				                		s+= $(obj).val();
				                	 }
	                                   
	                               }else{
	                               	 if(option.encode){
			                			s+= encodeURI($(obj).val()+",");
				                	 }else{
				                		s+= $(obj).val()+",";
				                	 }
	                                   
	                               }
	                            });
	                        params[name] = s;
	                       }else{
	                           if(n==0){
	                                return true;
	                           }else{
	                               inputs.each(function(i,obj){
	                                   if(i==n-1){
	                                   	 if(option.encode){
				                			s+= encodeURI($(obj).val());
					                	 }else{
					                		s+= $(obj).val();
					                	 }
	                                       
	                                   }else{
	                                   	 if(option.encode){
				                			s+= encodeURI($(obj).val())+",";
					                	 }else{
					                		s+= $(obj).val()+",";
					                	 }
	                                      
	                                   }
	                                });
	                                params[name] = s;
	                           }
	                       }
	                       
	                        tmp[name] = true;
	                    }
	                
	            }
	        }
	        
	        if($(this).is("select")){
	        	if($(this).attr("name")){
	        		 if(option.encode){
	        			params[name] = encodeURI($(option.container).find("select[name="+name+"]").val());
	            	 }else{
	            		params[name] = $(option.container).find("select[name="+name+"]").val();
	            	 }
	        		
	        	}
	            
	        }
	        if($(this).is("textarea")){
	        	if($(this).attr("name")){
	        		var textarea = $(option.container).find("textarea[name="+name+"]");
		            if(option.isFullParams){
		            	 if(option.encode){
		        			params[name] = encodeURI(textarea.val());
		            	 }else{
		            		params[name] = textarea.val();
		            	 }
		                
		            }else{
		                if(textarea.val()){
		                	if(option.encode){
			        			params[name] = encodeURI(textarea.val());
			            	 }else{
			            		params[name] = textarea.val();
			            	 }
		                    
		                }
		            }
	        	}
	          
	        }
	    });
	    tmp = {};
	
	    if(option.type && option.type.toLowerCase()=="obj"){
	        return params;
	    }else{
	        pstr =  "";
	        var num = 0;
	        
	        for(var key in params){
	            if(option.isFirst&&num==0){
	                pstr += "?"+key+"="+params[key];
	            }else{
	                pstr += "&"+key+"="+params[key];
	            }
	            
	            num++;
	        }
	        return pstr;
	    }
	};
	/**
	 *	option
	 * 		1.trigger: click|hover
	 * 		2.title
	 * 		3.content
	 * 		4.width
	 * 		5.height
	 * 		6.closeable
	 * 		7.delay
	 * 		8.url
	 * 		9.templateToggle
	 * 
	 *  **/
	fuiFactory.popover = function(option){
		if(option){
			
			require(["template","popover"],function(tmp){
				var settings = {
					trigger:option.trigger?option.trigger:'click',
					title:option.title?option.title:"",
					content:option.content?option.content:"",
					width:option.width?option.width:"300",
					height:option.height?option.height:"200",				
					multi:true,						
					closeable:option.closeable?option.closeable:true,
					style:'',
					delay:option.delay?option.delay:"0",
					padding:true
				};
			
				if(option.toggle){
					if(option.url){
						var asyncSettings = {
							width:option.width?option.width:"300",
							height:option.height?option.height:"200",
							closeable:option.closeable?option.closeable:true,
							padding:false,
							cache:false,
							url:option.url?option.url:'',
							type:'async',
							content:function(data){
								var html = "加载中...";
								if(option.templateToggle){
									var t = tmp.compile($(option.templateToggle).html());
									html = t(data);
								}
								return html;
									
							}
						};
						$(option.toggle).webuiPopover('destroy').webuiPopover($.extend({},settings,asyncSettings));
					}else{
						$(option.toggle).webuiPopover('destroy').webuiPopover(settings);
					}
					
				}
				
			});
		}
	};
	fuiFactory.convertChartData = function(d1,d2){
		var dataAry = [];
		$(d1).each(function(i,o){
			for(var key in d2){
				if(key== o.name){
					var tmp = {};
					tmp.name = key;
					tmp.value = d2[key];
					tmp.value.push(o.value);
					dataAry.push(tmp);
				}
			}
		});
		return dataAry;
	};
	fuiFactory.pop = function(option){
	
		if($(option.container).length==0){
			return;
		}
		
		var self = {};
		self.option = option.option;
		self.x = self.option.x?self.option.x:0;
		self.y = self.option.y?self.option.y:0;
		self.container = null;
		
		self.create = function(){
			self.container = document.createElement("div");
			fuiFactory.setBaseProperty(self.container,self.option);
			$(option.container).append(self.container);
			
		};
		self.load = function(){
			$(self.container).css("left",self.x+"px");
			$(self.container).css("top",self.y+"px");
			$(self.container).show();
			
			if(self.option.html){
				$(self.container).html(self.option.html);
			}
			if(self.option.url){
				fuiFactory.remote(self.option);
			}
			if(self.option.drawCallback){
				fuiFactory.extendObject[self.option.drawCallback](self);
			}
			if(self.option.trigger){
				var trigger = fuiFactory.getVal(self.option.trigger);
				if(trigger){
					$(document).unbind().bind("click",function(e){
						var target = $(e.target);
						
						if(trigger.x==e.offsetX&&trigger.y==e.offsetY){
							return;
						}else{
							if(target.closest(".pop").length != 0){
								return;
							}else{
								$(self.container).hide();
								$(self.container).html("");
							}
						}
					});
				}
				
			}
		};
		return self;
	};
	
	fuiFactory.showIframeModal = function(option){
		var self = {};
		if(option.modal&&option.trigger){
			self.modal = option.modal;
			self.size = option.size?option.size:"sm";
			self.title = option.title?option.title:"信息";
			self.height = option.height?option.height:400;
			self.url = option.url?option.url:null;
			$(self.modal).find(".modal-title").html(self.title);
			$(self.modal).find(".modal-dialog").removeClass("modal-xs,modal-sm,modal-md,modal-lg,modal-wide");
			$(self.modal).find(".modal-dialog").addClass("modal-"+self.size);
			$(self.modal).find(".modal-body").css("height",self.height+"px");
			if(self.url){
				if($(self.modal).find("iframe").length>0){
					$(self.modal).find("iframe").attr("src",self.url);
				}
			}
			$(option.trigger).click();
		}
	};
	
	fuiFactory.hideIframeModal = function(option){
		var self = {};
		if(option.modal){
			
			self.modal = option.modal;
			$(self.modal).find("button[class='close']").click();
		}
	};
	fuiFactory.statusBar = function(option){
		var self = {};
		self.container = null;
		self.option = option.option;
		self.statusContainer = null;
		self.statusToolsContainer = null;
		self.data = null;
		self.extendData = null;
		self.option.size = self.option.size?self.option.size:20;
		self.option.length = self.option.length?self.option.length:10;
		if(self.option.data){
			self.data = fuiFactory.getVal(self.option.data);
			if(self.data.length>0){
				if(self.option.extendData){
					self.extendData = fuiFactory.getVal(self.option.extendData);
					$(self.data).each(function(i,o){
						$(self.extendData).each(function(i1,o1){
							if(o.status==o1.status){
								for(var key in o1){
									o[key] = o1[key];
								}
							}
						});
					});
				}
			}
			
		}else{
			return;
		}
		self.create = function(){
			self.statusCreate();
			self.statusToolsCreate();
		};
		self.statusCreate = function(){
			self.statusContainer = document.createElement("div");
			self.statusItemCreate();
			$(option.container).append(self.statusContainer);
		};
		self.statusItemCreate = function(){
			$(self.data).each(function(i,o){
				var itemContainer = document.createElement("div");
				$(itemContainer).css("padding","5px");
				var item = document.createElement("div");
				$(item).css("width",self.option.size);
				$(item).css("height",self.option.size);
				$(item).css("margin","auto");
				$(item).css("boxShadow","0 0 5px #000");
				$(item).css("borderRadius",self.option.size);
				$(item).css("backgroundColor",o.color?o.color:"#eee");
				$(item).css("textAlign","center");
				$(item).css("color","#fff");
				$(item).attr("statusItem","statusItem");
				$(item).css("cursor","pointer");
				$(item).css("borderRadius",self.option.size);
				if(self.option.hoverCallback){
					$(item).on("mouseover",function(){
						fuiFactory.extendObject[self.option.hoverCallback](item,o);
					});
				}
				if(o.icon){
					$(item).append("<i class='"+o.icon+"' style='"+self.option.size+"'></i>");
				}
				$(itemContainer).css("width",Math.ceil(100/self.option.length)+"%");
				$(itemContainer).css("float","left");
				$(itemContainer).append(item);
				$(self.statusContainer).append(itemContainer);
			});
			
		};
		self.statusToolsCreate = function(){
			self.statusToolsContainer = document.createElement("div");
			$(self.statusToolsContainer).css("clear","both");
			$(self.statusToolsContainer).css("padding","20px");
			
			self.statusToolsItemCreate();
			$(option.container).append(self.statusToolsContainer);
		};
		self.statusToolsItemCreate = function(){
			var tmpObj = {};
			$(self.data).each(function(i,o){
				if(tmpObj[o.status]){return true;}
				var toolsItemContainer = document.createElement("div");
				$(toolsItemContainer).css("float","left");
				$(self.statusToolsContainer).append(toolsItemContainer);
				var toolsContainer = document.createElement("div");
				$(toolsItemContainer).append(toolsContainer);
				$(toolsContainer).css("float","left");
				var icon = o.icon?o.icon:"ion-help";
				$(toolsContainer).css("float","left");
				var toolsItem = document.createElement("div");
				$(toolsItem).css("float","left");
				$(toolsItem).css("width",self.option.size);
				$(toolsItem).css("height",self.option.size);
				$(toolsItem).css("backgroundColor",o.color?o.color:"#eee");
				$(toolsItem).css("borderRadius",self.option.size);
				$(toolsItem).css("boxShadow","0 0 5px #000");
				$(toolsItem).css("textAlign","center");
				$(toolsItem).css("color","#fff");
				$(toolsItem).append("<i class='"+icon+"' style='"+self.option.size+"'></i>");
				$(toolsContainer).append(toolsItem);
				var toolsItemLabel =  document.createElement("div");
				$(toolsItemLabel).css("float","left");
				$(toolsItemLabel).css("padding","0 15px 0 5px");
				$(toolsItemLabel).css("color",self.option.toolsLabelColor);
				$(toolsItemLabel).html(o.statusText);
				$(toolsContainer).append(toolsItemLabel);
				tmpObj[o.status] = true; 
			});
			
		};
		return self;
	};
	fuiFactory.tableSort = function(option){
		var self = {};
		self.container = option.container?option.container:$("body");
		self.extendParams = option.extendParams?option.extendParams:null;
		if(option.grid){
			self.grid = option.grid;
			var sortItems = $(self.container).find(".tableSort");
			
			
			sortItems.unbind("click").on("click",function(){
				var sortParam = "";
				if($(this).hasClass("ion-arrow-swap")){
					$(this).removeClass("ion-arrow-swap");
					$(this).addClass("ion-arrow-up-b");
					$(this).attr("sortType","asc");
					$(this).attr("title","升序");
				}else if($(this).hasClass("ion-arrow-up-b")){
					$(this).removeClass("ion-arrow-up-b");
					$(this).addClass("ion-arrow-down-b");
					$(this).attr("sortType","desc");
					$(this).attr("title","降序");
				}else{
					$(this).removeClass("ion-arrow-down-b");
					$(this).addClass("ion-arrow-swap");
					$(this).attr("title","无排序");
				}
				
				$(self.container).find(".tableSort").each(function(i,o){
					if(!$(this).hasClass("ion-arrow-swap")){
						sortParam+=$(o).attr("name")+" "+$(o).attr("sortType")+",";
					}
				});
				
				sortParam = fuiFactory.clearLastCharacter(sortParam);
				var paramOption = {};
				paramOption.sortParam = sortParam;
				if(self.extendParams){
					for(var key in self.extendParams){
						paramOption[key] = self.extendParams[key];
					}
				}
				self.grid.ajax.setData(paramOption);
				self.grid.ajax.reload();
				
			});
			
			
		}
		
	};
	/**
	 *表单校验
	 * validates是表单控件校验规则（必须）
	  		属性
	  		1.必填项 required(boolean) (例如：required:true)
	  		2.整数  number(boolean或整数组) (例如: number:true   number[200,500]{200-500之间})
	  		3.数字  floating(boolean或数组) (例如: floating:true   floating[0.3,1]{0.3-1之间})
	  		4.金额格式 isMoney (boolean)
	  		5.邮件格式 isEmail (boolean)
	  		6.手机格式 isMobile (boolean)
	  		7.固定电话 isTelephone (boolean)
	  		8.数据长度 length (int) 不超过n个字符
	  		9.过滤非法字符，只允许数字、字母、下划线  isFliter (boolean)
	  		//10.ajax校验  ajaxUrl(url)
	 * 
	 * container（可选），表单容器，不填默认是整个document
	 * **/
	fuiFactory.validate = function(validates,container){
		var isPass = true;
		var errorObj = null;
		if(!container){
			container = $("body");
		}
		$(".errorContainer").removeClass("errorContainer");
		$(".errorTip").remove();
		if(validates){
			for(var validate in validates){
				var obj = $(container).find("[name='"+validate+"']");
				if($(obj).length>0){
					switch($(obj)[0].tagName.toLowerCase()){
						case "input":
							var type = "text";
							if($(obj).attr("type")){
								type = $(obj).attr("type").toLowerCase();
							}
							switch(type){
								case "text":
								 var rules = validates[validate];
									for(var rule in rules){
										switch(rule){
											case "required"://是否必填
												if(!$(obj).val()){
													$(obj).addClass("errorContainer");
													//alert($(obj)[0].tagName);
													$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>必填项</div>");
													isPass = false;
													return false;	
												}
											break;
											
											case "length"://字符串长度
												if($(obj).val().length>rules[rule]){
													$(obj).addClass("errorContainer");
													$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>不能超过"+rules[rule]+"个字符</div>");
													isPass = false;
													return false;
												}
											break;
											case "range"://范围
												var n = rules[rule];
												if($.isArray(n)){
											    	if($(obj).val() == ""){
											    		return true;
											    	}
													if($(obj).val().length<n[0]){
														$(obj).addClass("errorContainer");
														$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>密码至少6个字符</div>");
														isPass = false;
														return false;
													}
													if($(obj).val().length>n[1]){
														$(obj).addClass("errorContainer");
														$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>密码至多16个字符</div>");
														isPass = false;
														return false;
													}
												}
											break;
											
											
											case "number"://1.boolean(非0整数) 2.整数组 int[min,max],分别是数字的上下限
												var n = rules[rule];
												var ex = /^\d+$/;
												if($.isArray(n)){
													if (!ex.test($(obj).val())){
														$(obj).addClass("errorContainer");
														$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>非整数</div>");
														isPass = false;
														return false;
													}else{
														if($(obj).val()<=0){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>不能为0或负数</div>");
															isPass = false;
															return false;
														}
														if($(obj).val()<n[0]){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>数字过小</div>");
															isPass = false;
															return false;
														}
														if($(obj).val()>n[1]){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>数字过大</div>");
															isPass = false;
															return false;
														}
													}
												}else{
													if (n){
														if (!ex.test($(obj).val())){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>非整数</div>");
															isPass = false;
															return false;
														}
														if($(obj).val()<=0){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>不能为0或负数</div>");
															isPass = false;
															return false;
														}
													}
													
												}
												
												
											break;
											
											case "floating"://浮点型
											    var isFloat = /^\d+(\.\d+)?$/;
											    var n = rules[rule];
											    if($.isArray(n)){
											    	if($(obj).val() == ""){
											    		return true;
											    	}
													if (!isFloat.test($(obj).val())){
														$(obj).addClass("errorContainer");
														$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>非数字</div>");
														isPass = false;
														return false;
													}else{
														if($(obj).val()<0){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>不能为负数</div>");
															isPass = false;
															return false;
														}
														if($(obj).val()<n[0]){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>请保留两位小数</div>");
															isPass = false;
															return false;
														}
														if($(obj).val()>n[1]){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>数字过大</div>");
															isPass = false;
															return false;
														}
													}
												}else{
													if (n){
														if (!isFloat.test($(obj).val()) && $(obj).val() != ""){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>非数字</div>");
															isPass = false;
															return false;
														}
														if($(obj).val()<0){
															$(obj).addClass("errorContainer");
															$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>不能为负数</div>");
															isPass = false;
															return false;
														}
													}
													
												}
											break;
											
											case "isMoney"://金额
												var isMoney = /^\d+\.?\d{1,2}$/;
												var money = $(obj).val();
												if(rules[rule]){
													if(!isMoney.test(money)){
														$(obj).addClass("errorContainer");
														$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>金额格式不符</div>");
														isPass = false;
														return false;
													}
												}
												
											break;
											
											case "isMobile"://手机号
												var mobile = $(obj).val();
												var isMobile = /(1[3-9]\d{9}$)/;
												if(rules[rule]){
													if (!isMobile.test(mobile)) {
														$(obj).addClass("errorContainer");
														$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>请填写正确的手机号码</div>");
														isPass = false;
														return false;
													}
												}
											break;
											
											case "isTelephone"://电话
												var phone = $(obj).val();
												var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
												if(rules[rule]){
													if (!isPhone.test(phone)) { 
														$(obj).addClass("errorContainer");
														$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>请填写正确的电话号码</div>");
														isPass = false;
														return false;
													}
												}
											break;
											
											case "isEmail"://邮箱
												var isEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
												var email = $(obj).val();
												if(rules[rule]){
													if(!isEmail.test(email)){
														$(obj).addClass("errorContainer");
														$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>请填写正确的邮箱地址</div>");
														isPass = false;
														return false;
													}
												}
											break;
											
											case "isFliter"://只允许字母、数字、下划线
												var isFliter = /^\w+$/;
												if(rules[rule]){
													if(!isFliter.test($(obj).val())){
														$(obj).addClass("errorContainer");
														$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>只允许字母、数字、下划线</div>");
														isPass = false;
														return false;
													}
												}
											break;
											
											case "card"://身份证
												 var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
												 if(rules[rule]){
												 	if(reg.test($(obj).val()) === false){  
												 		$(obj).addClass("errorContainer");
												 		$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>身份证填写错误</div>");
												        return false;  
												    }else{
												    	var cityCode={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
												            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",  
												            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",  
												            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",  
												            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",  
												            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
												           };  
												 	var province = $(obj).val().substring(0,2);
											     	if(cityCode[province] == undefined){
											     		$(obj).addClass("errorContainer");
												 		$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>无效的身份证格式</div>");
											        	return false;  
											   		 }
												    }
												 	  
												 }
												 
											break;
											
										}
									}
								break;
								
								case "radio":
								case "checkbox":
									if(BaseApp.getCheckbox(validate).length==0){
										if($(obj).parent().hasClass("inputGroup")){
											$(obj).parent().addClass("errorContainer");
											$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>必选项</div>");
										}
										if($(obj).parent().parent().hasClass("inputGroup")){
											$(obj).parent().parent().addClass("errorContainer");
											$(obj).parent().parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>必选项</div>");
										}
										isPass = false;
										return false;
									}
								break;
							}
						break;
						
						case "select":
							if($(obj).val()=="-1"){
								$(obj).addClass("errorContainer");
								$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>必选项</div>");
								isPass = false;
								return false;
							}
						break;
						
						case "textarea":
						
//							if(!$(obj).val()){
//								$(obj).addClass("errorContainer");
//								$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>必填项</div>");
//								isPass = false;
//								return false;
//							}
							var rules = validates[validate];
							
							for(var rule in rules){
								switch(rule){
									case "isFliter":
										var isFliter = /^\w+$/;
										if(rules[rule]){
											if(!isFliter.test($(obj).val())){
												$(obj).addClass("errorContainer");
												$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>只允许字母、数字、下划线</div>");
												isPass = false;
												return false;
											}
										}
									break;
									
									case "length":
										if($(obj).val().length>rules[rule]){
											$(obj).addClass("errorContainer");
											$(obj).parent().append("<div class='errorTip'><i class='ion-android-cancel'></i>不能超过"+rules[rule]+"个字符</div>");
											isPass = false;
											return false;
										}
									break;
								}
							}
							
						break;
					}
				}
			}
		}
		
		return isPass;
		
	};
	fuiFactory.getUrlParam = function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    fuiFactory.checkAll = function(option){
    	var cbname =  option.cbname?option.cbname:"cb";
    	var container = option.container?option.container:$("body");
    	var cbsname = option.cbsname?option.cbsname:"allcb";
	    var cbs= $(container).find("input[name='"+cbname+"']");
	    var cball = $(container).find("input[name='"+cbsname+"']");
	  
	    cball.click(function(){
	        if($(this).is(':checked')){
	            cbs.prop("checked",true);
	        }else{
	            cbs.prop("checked",false);
	        }
	        
	    });
	   
	    cbs.click(function(){
	           var isAll = true;
	           cbs.each(function(){
	              if(!$(this).is(':checked')) {
	                  isAll = false;
	                  return false;
	              }
	           });
	           if(isAll){
	               cball.prop("checked",true);
	           }else{
	               cball.prop("checked",false);
	           }
	           
	       });
	   
	};
	
	fuiFactory.getCheckbox = function(option){
		return $(option.container).find("input[name='"+option.cbname+"']:checked");
	};
	fuiFactory.getCheckboxVal = function(option){
		var cbs = fuiFactory.getCheckbox(option);
		var s = "";
		$(cbs).each(function(i,o){
			if(!option.valname){
				s+= $(o).val()+",";
			}else{
				s+= $(o).attr(option.valname)+",";
			}
		});
		if(s!=""){
			s = fuiFactory.clearLastCharacter(s);
		}
		return s;
	};
	/**
	 *  动态表单(未发布，勿用！！！)
	 * 		option
	 * 			1.container  $       表单容器  (默认是body)
	 *			2.data		 []      表单数据   (后台传的表单格式数据，具体参加用例)
	 *          3.extendData []      表单扩展数据 (扩展数据是前端定义的，为了扩展弥补后端的data)
	 * 			4.layoutType string  表单布局类型（1.table  2.bootstrap||bs  默认是table）
	 *          5.validate   boolean 是否开启验证规则，开启后会产生以formValidate命名的校验规则（配合工厂里的validate验证插件使用）
	 * 			6.cNum       Number  表单每行的列数 (默认是1行1列)
	 *  **/
	fuiFactory.dynamicForm = function(option){
		var self = {};
		self.option = option.option;
		self.data = option.data?option.data:null;
		self.container = option.container?option.container:$("body");
		self.extendData = option.extendData?option.extendData:null;
		self.layoutType = option.layoutType?option.layoutType:"table";
		self.cNum = option.cNum?option.cNum:1;
		self.formContainer = "";
		
		self.run = function(option){
			var items = null;
			if(option){
				if(option.option){
					items = option.option.item?option.option.items:option.option;
				}
			}
			if(items&&items.length>0){
				$(items).each(function(i,o){
					var tmpObj = null;
					if(!o.type&&!o.groupId){
						tmpObj = self.createFormBar({
							container:option.container,
							data:o
						});
					}else if(o.groupId){
						tmpObj = self.createFormGroup({
							container:option.container,
							data:o
						});
					}else if(o.type){
						tmpObj = self.createForm({
							container:option.container,
							data:o
						});
					}
					self.run({
						container:tmpObj.container,
						data:o
					});
				});
			}
		};
		self.create = function(){
			if(self.data&&self.data.length>0){
				
			}
			self.run({
				container:self.container,
				option:self.data
			});
		};
		
		
		
		self.createFormBar = function(option){
			
			var barContainer = document.createElement("div");
			$(barContainer).addClass("row");
			
			$(option.container).append(barContainer);
			var formBar = document.createElement("div");
			$(formBar).addClass("formBar");
			$(option.container).append(formBar);
		};
		self.mergeFormData = function(){
			for(var key in self.extendData){
				self.setNode(self.data,key,self.extendData[key]);
			}
		};
		self.setNode = function(node,name,data){
			for(var i=0,j=node.length;i<j;i++){
				if(node[i].name&&node[i].name==name){
					node[i] = $.extend({}, node[i],data);
					break;
				}
				if(node[i].items&&node[i].items.length>0){
					self.setNode(node[i].items,name,data);
				}
			}
		};
		return self;
	};
	
	fuiFactory.topo = function(option){
		var self = {};
		self.data = fuiFactory.getVal(option.data)?fuiFactory.getVal(option.data):null;
		self.container = option.container?option.container:$("body");
		self.topoContainer = null;
		self.chartContainer = option.chartContainer?option.chartContainer:$("body");
		self.remoteUrl = option.remoteUrl?option.remoteUrl:null;
		self.create = function(){
			$(self.container).addClass("topoBar");
			if(self.remoteUrl){
				if(self.data){
					self.draw();
				}
			}else{
				self.draw();
			}
			
		};
		self.draw = function(){
			self.topoContainer = self.setTopoData({
				container:self.container,
				data:self.data
			});
			self.setTopo();
		};
		self.clear = function(){
			$(self.container).html("");
			$(self.chartContainer).html("");
		};
		self.findNode = function(data,oid){
			
			var node = null;
			var tmp = {};
			tmp.check = function(data,oid){
				if(data&&data.length>0){
					
					$(data).each(function(i,o){
						if(o.id==oid){
							node = o;
							return true;
						}else{
							if(o.child&&o.child.length>0){
								tmp.check(o.child,oid);
							}
						}
					});
					
				}
			};
			tmp.check(data,oid);
			return node;
			
		};
		self.mergeNodeData = function(data,child,oid){
			
			if(data&&data.length>0){
				for(var i=0,j=data.length;i<j;i++){
					if(data[i].id==oid){
						data[i].child = child;
						break;
					}else{
						if(data[i].child&&data[i].child.length>0){
							self.mergeNodeData(data[i].child,child,oid);
						}
					}
				}
			}
			
		};
		self.remoteAction = function(oid,pid){
			var pid = pid?pid:null;
			fuiFactory.remote({
				url : self.remoteUrl,
				params : {"oid":oid,"pid":pid},
				successCallback : function(data){
					self.mergeNodeData(self.data,data[0].child,oid);
					self.clear();
					self.draw();
				},
				errorCallback : function(){
					
				}
			});
		};
		self.setTopoData = function(option){
			var data = option.data;
			var container = option.container;
			var childContainer = document.createElement("ul");
			if(data&&data.length>0){
				$(container).append(childContainer);
				$(data).each(function(i,o){
					var childItem = document.createElement("li");
					$(childContainer).append(childItem);
					if(o.relName){
						var em = document.createElement("em");
						$(em).css("font-size","13px");
						$(em).html(o.relName);
						$(childItem).append(em);
					}
					if(o.collapsed){
						$(childItem).addClass("collapsed");
					}
					if(o.name){
						
						var btn = fuiFactory.button({
							container:childItem,
							option:{
								"text":o.name,
								"style":"padding:5px;margin:auto;display:block;",
								"cls":"btn btn-info",
								"attr":"oid::"+o.id+",pid::"+o.pid
							}
							
						});
						btn.create();
					}
					
					if(o.icon&&o.icon!=""){
						var icon = document.createElement("img");
						$(icon).attr("src",o.icon).attr('height','50').attr('width','50');
						$(icon).addClass("topoIcon");
						$(childItem).append(icon);
					}
					
					if(o.child&&o.child.length>0){
						self.setTopoData({
							container:childItem,
							data:o.child
						});
					}
				});
			}
			return childContainer;
		};
		
		self.setTopo = function(){
			require(["jOrgChart"],function(){
				$(self.topoContainer).jOrgChart({
					chartElement: self.chartContainer,
					dragAndDrop: false
				});
				$(self.chartContainer).find("button").on("click",function(){
					var oid = $(this).attr("oid")?$(this).attr("oid"):null;
					var node = self.findNode(self.data,oid);
					
					if(node){
						if(!node.child||node.child.length==0)
						self.remoteAction($(this).attr("oid"),$(this).attr("pid"));
					};
					
				});
			});
		};
		return self;
	};
	fuiFactory.pageLoading = function(option){
		if(typeof(option)=="boolean"){
			alert(111)
		}else{
			alert(2222)
		}
	};
	fuiFactory.scroller = function(option,isUpdate){
		
		require(["jqScrollbar","jqMousewheel"],function(){
			if(option){
				if(option.container){
					
					if(isUpdate){
						
						$(option.container).mCustomScrollbar("update");
					}else{
						
						$(option.container).mCustomScrollbar();
					}
					
				}else{
					
					if(isUpdate){
						
						$(option).mCustomScrollbar("update");
					}else{
						
						$(option).mCustomScrollbar();
					}
					
				}
				
			}
			
		});
	};
	fuiFactory.isIE8 = function(){
		if (!$.support.leadingWhitespace) {
			return true;
		}
		return false;
		/*
		$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());  
		$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());  
		$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());  
		$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
		return $.browser;
		*/
	};
	fuiFactory.binder = function(option){
		if(option.container){
			if(option.bindOption){
				if(option.bindData){
					require(["binder"],function(){
						$(option.container).link(option.bindData,option.bindOption);
					});
				}
			}
		}
	};
	fuiFactory.shineAnimate = function(option){
		var self = {};
		self.animateObj = null;
		self.container = option.container?option.container:null;
		self.top = 0;
		self.left = 0;
		self.direction = "";
		self.isRepeat = true;
		self.create = function(){
			if(self.container){
				if(option.animateOption&&option.animateOption.animateObj){
					self.top = option.animateOption.top?option.animateOption.top:0;
					self.left = option.animateOption.left?option.animateOption.left:0;
					self.direction = option.animateOption.direction?option.animateOption.direction:"horizontal";//1.horizontal 2.vertical
					self.animateObj = option.animateOption.animateObj;
					self.isRepeat = option.animateOption.isRepeat?option.animateOption.isRepeat:true;
					self.time = option.animateOption.time?option.animateOption.time:5000;
					self.reset();
					$("body").append(self.animateObj);
					self.animate();
				}
			}
			
		};
		self.animate = function(){
			if(self.direction=="horizontal"){
				//$(self.animateObj).fadeIn(300);
				$(self.animateObj).animate({
					"left":$(self.container).width()
				},self.time,function(){
					//$(self.animateObj).fadeOut(200);
					if(self.isRepeat){
						self.reset();
						self.animate();
					}
				});
			}else{
				
				$(self.animateObj).fadeIn(300);
				$(self.animateObj).animate({
					"top":$(self.container).height()+$(self.animateObj).height()
				},self.time,function(){
					$(self.animateObj).fadeOut(200);
					if(self.isRepeat){
						self.reset();
						self.animate();
					}
				})
			}
		};
		self.reset = function(){
			$(self.animateObj).css({
				"top":self.top,
				"left":self.left
			});
		};
		self.play = function(){
			
		};
		self.pause = function(){
			
		};
		
		self.create();
	};
	fuiFactory.themeAnimate = function(option){
		var self = {};
		self.img = option.img;
		self.container = option.container;
		self.time = option.time?option.time:1500;
		self.animate = function(){
			$("body").css("background-image","url("+self.img+")");
			$(self.container).fadeOut(self.time,function(){
				$(self.container).css("background-image","url("+self.img+")");
				$(self.container).css("background-size","100% 100%");
				$(self.container).show();
			});
		};
		self.animate();
	};
	fuiFactory.themeWall = function(option){
		var self = {};
		self.container = option.container;
		self.option = option.option;
		self.themeData = self.option.themeData;
		self.themeContainerHeight = self.option.height?self.option.height:400;
		self.themeContainer = null;
		self.wallContainer = self.option.wallContainer;
		self.cNum = self.option.cNum?self.option.cNum:4;
		if(self.cNum>12){
			self.cNum = 12;
		}
		self.themeBody = null;
		self.modalOption = {
			"type":"modal",
			"id":"themeModal",
			"size":"lg",
			"show":false,
			"draggable":true,
			"header":{"title":"选择主题"},
			"body":{
				"style":"height:"+self.themeContainerHeight+"px",
				"cls":"themeWall"
			},
			"footer":{
				"buttons":[
					{"text":"确定","clickCallback":function(){
						self.setTheme();
					}}
			]}
		};
		
		self.setTheme = function(){
			var img = "";
			$(self.themeData).each(function(i,o){
				if(o.active){
					img = o.fullImg;
				}
			});
			fuiFactory.themeAnimate({
				container:self.wallContainer,
				img:img,
				time:1000
			});
			self.themeContainer.hide();
		};
		self.create = function(){
			self.createThemeContainer();
			self.createThemeWall();
		};
		self.createThemeContainer = function(){
			self.themeContainer = fuiFactory.modal({
				container:self.container,
				option:self.modalOption
			});
			self.themeContainer.create();
			self.themeContainer.showModal();
			
		};
		self.createThemeWall = function(){
			self.themeBody = self.themeContainer.getBody();
			fuiFactory.scroller($(self.themeBody));
			
			var row = fuiFactory.staticRow({
				container:self.themeBody,
				option:{
					full:true,
					style:"margin-top:15px"
				}
			});
			row.create();
			
			$(self.themeData).each(function(i,o){
				var active = "";
				if(o.active){
					//delete o.active;
					active = " active";
				}
				var column = fuiFactory.column({
					container:row.container,
					option:{
						cls:"col-xs-12 col-sm-6 col-md-"+Math.ceil(12/self.cNum)
					}
				});
				column.create();
				var themeItem = fuiFactory.custom({
					container:column.container,
					option:{
						"customType":"div",
						"cls":"themeItem"+active,
						"clickCallback":function(obj){
							
							$(self.themeBody).find(".active").removeClass("active");
							$(obj).addClass("active");
							$(self.themeData).each(function(i1,o1){
								if(o1.active){
									delete o1.active;
								}
							});
							o.active = true;
						}
					}
				});
				themeItem.create();
				
				var img = fuiFactory.img({
					container:themeItem.container,
					option:{
						url:o.smallImg
					}
				});
				img.create();
				
				var checkedObj = fuiFactory.custom({
					container:themeItem.container,
					option:{
						"customType":"i",
						"cls":"ion-ios-checkmark-outline themeWall-checked",
					}
				});
				checkedObj.create();
				
				var label = fuiFactory.custom({
					container:themeItem.container,
					option:{
						customType:"span",
						html:o.label
						//style:"width:"+(Number($(themeItem.container).width())+11)+"px"
					}
				});
				label.create();
			});
		};
		return self;
	};
	fuiFactory.isIE = function(){
		var isIE = /msie/.test(navigator.userAgent.toLowerCase());
		return isIE;
	};
	fuiFactory.isIE8 = function(){
		return $.support.style;
	};
	fuiFactory.pageFrameGlass = function(option){
		var self = {};
		self.option = option.option;
		self.navContainer = option.container;
		self.defaultPage = self.option.defaultPage?self.option.defaultPage:null;
		self.nav = null;
		self.lang = self.option.lang?self.option.lang:"CN";
		self.menuContainer = self.option.menuContainer?self.option.menuContainer:$(".page-menu");
		self.menu = null;
		self.styleType = self.option.styleType?self.option.styleType:"default";
		self.data = self.option.data?self.option.data:[];
		self.menuContentOffset = self.option.menuContentOffset?self.option.menuContentOffset:95;
		self.navCreate = function(index){
			var index = index?index:0;
			self.nav = document.createElement("ul");
			self.navContainer.append(self.nav);
			$(self.nav).addClass("page-navbar");
			
			$(self.data).each(function(i,o){
				var item = self.createItem(o);
				$(self.nav).append(item);
				$(item).on("click",function(){
					$(this).parent().children("li").removeClass("active");
					$(this).addClass("active");
					self.navAction(o);
				});
			});
			$(self.nav).children("li:eq("+index+")").addClass("active");
			self.navAction(self.data[index]);
		};
		self.createItem = function(itemData){
			var item = document.createElement("li");
			var a = document.createElement("a");
			if(itemData.icon.split(".").length>1){//图片图标
				$(a).append($("<img src='"+itemData.icon+"'/><span>"+itemData["label"+self.lang]+"</span>"));
			}else{//矢量图标
				$(a).append($("<i class='"+itemData.icon+"'/><span>"+itemData["label"+self.lang]+"</span>"));
			}
			if(itemData.active){
				$(item).addClass("active");
			}
			if(itemData.url){
				$(a).attr("target","_blank");
				$(a).attr("href",itemData.url);
			}
			$(item).append(a);
			return item;
		};
		self.menuCreate = function(items){
			
			$(self.menuContainer).html("");
			self.menu = document.createElement("ul");
			$(self.menuContainer).append(self.menu);
			$(items).each(function(i,o){
				var item = self.createItem(o);
				$(self.menu).append(item);
				$(item).on("click",function(){
					$(this).parent().children("li").removeClass("active");
					$(this).addClass("active");
					self.menuAction(o);
				});
			});
			$(self.menu).children("li:eq(0)").addClass("active");
			self.menuAction(items[0]);
		};
		self.redraw = function(content){
			
			if($(".article").find(".mCSB_container").length>0){
				$(".article").find(".mCSB_container").html("");
				var pageContent = $("<div class='page-slider'></div>");
				pageContent.html(content);
				$(".article").find(".mCSB_container").append(pageContent);
				fuiFactory.scroller($(".article"),true);
				fuiFactory.slidePageAnimate({
					ele:pageContent
				});
				
			}else{
				$(".article").html("");
				var pageContent = $("<div class='page-slider'></div>");
				pageContent.html(content);
				$(".article").append(pageContent);
				fuiFactory.scroller($(".article"),false);
				fuiFactory.slidePageAnimate({
					ele:pageContent
				});
			}
		};
		
		
		self.showMenu = function(func){
			$(".aside").fadeIn(500,function(){
				$(".article").css("margin-left",self.menuContentOffset);
				func();
			});
			
			//$(".aside").show();
		};
		self.hideMenu = function(func){
			$(".aside").fadeOut(500,function(){
				$(".article").css("margin-left",0);
				func();
			});
			//$(".aside").hide();
			
		};
		self.loadPage = function(type,action){
			//$(".article").html("");
			
			if($(".article").find(".mCSB_container").length>0){
				$(".article").find(".mCSB_container").html("");
			}else{
				$(".article").html("");
			}
			var obj = {};
			
			obj.action = function(){
				if(action){
			
					var remote = fuiFactory.remote({
						url:action,
						dataType:"text",
						async:false,
						successCallback:function(text){
			
							self.redraw(text);
						},
						errorCallback:function(){
							if(self.defaultPage){
								fuiFactory.remote({
									url:self.defaultPage,
									dataType:"text",
									
									successCallback:function(text){
										self.redraw(text);
									}
								});
							}else{
								self.redraw("");
							}
						},
						beforeCallback:function(){
							fuiFactory.loading($(".article"));
						}
					});
					
				}else{
					self.redraw("");
				}
			};
			if(type=="nav"){
				self.hideMenu(obj.action);
			}else{
				self.showMenu(obj.action);
			}	
		};
		self.navAction = function(navData){
			
			if(navData.items&&navData.items.length>0){//如果有子菜单，就调用子菜单的功能
				self.menuCreate(navData.items);
			}else{//调用自身的action
				if(navData.action){
					self.loadPage("nav",navData.action);
				}else{
					self.loadPage("nav",self.defaultPage);
				}
				
			}
			
		};
		self.menuAction = function(menuData){
			
			if(menuData.action){
				self.loadPage("menu",menuData.action);
			}else{
				self.loadPage("menu",self.defaultPage);
			}
		};
		self.init = function(){
			self.navCreate();
			
		};
		self.init();
		return self;
	};
	fuiFactory.loading = function(container){
		var loadingLabel = "加载中...";
		if(self.lang=="EN"){
			loadingLabel = "loading...";
		}
		var loadingText = "<div class='page-loading'><i class='fa fa-refresh fa-spin fa-3x fa-fw margin-bottom'></i>"+loadingLabel+"</div>";
		if($(container).find(".mCSB_container").length>0){
			$(container).find(".mCSB_container").html(loadingText)
		}else{
			$(container).html(loadingText)
		}
	};
	fuiFactory.slidePageAnimate = function(option){
		if(!option.ele){return;}
		var ele = option.ele;
		var time = option.time?option.time:500;
		var callback = option.callback?option.callback:function(){};
		ele.animate({"left":"0%","opacity":1},time,function(){
			callback();
		});
	};
	return fuiFactory;
});


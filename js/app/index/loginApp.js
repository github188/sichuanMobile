define(["jquery","template","bootstrap","radialIndicator"],function(jquery,template){
	console.log(window.aaa)
	var browser = function(){ 
		      	if(document.all){ 
			        if(window.XMLHttpRequest=="undefined"){ 
			        	return 6; 
			        }else{ 
			            if(!$.support.style){ 
			            	return 7; 
			            }else{ 
			               if(!$.support.opacity){ 
			                	return 8; 
			               }else{ 
			                	return 9; 
			               } 
			            } 
			        } 
		      	}else{ 
		        	return 100; 
		      } 
		   };
		   if(browser() < 9){
		   		$("#inspectVersion").modal("show");
		   }
	return {
		run:function(){
			
		}
	};
});


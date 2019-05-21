if(window.localStorage.getItem('lang')===undefined || 
		window.localStorage.getItem('lang')===null){
	window.localStorage.setItem('lang','en');
}

function setTranslationEvents(){
	$("#translateLanguage").mouseover(function(){
		$("#translateLanguage").stop();
		$("#translateLanguage").animate({top:'0px'},400);
	});

	$("#translateLanguage").mouseout(function(){
		$("#translateLanguage").stop();
		$("#translateLanguage").animate({top:'-54px'},1000);
	});

	$(".french").click(function(){
		window.localStorage.setItem('lang','fr');
		window.location.href="/";
	});

	$(".english").click(function(){
		window.localStorage.setItem('lang','en');
		window.location.href="/";
	});

	$(".spanish").click(function(){
		window.localStorage.setItem('lang','es');
		document.location.href="/";
	});

	$(".hindi").click(function(){
		window.localStorage.setItem('lang','hi');
		document.location.href="/";
	});

	$(".mandarin").click(function(){
		window.localStorage.setItem('lang','chi');
		document.location.href="/";
	});

	if($(window).width()<=800){
		$(".translateButtons").css("width","20px");
		$("#translateLanguage").css("top","-24px");
		$("#translateText").css("left","0px");
		$("#translateText").html("Translate");
		$("#translateLanguage").css("width","130px");
		
		$("#translateLanguage").mouseout(function(){
			$("#translateLanguage").stop();
			$("#translateLanguage").animate({top:'-24px'},1000);
		});
	}

	$(window).on('resize',function(){
		if($(window).width()<=800){
			$(".translateButtons").css("width","20px");
			$("#translateLanguage").css("top","-24px");
			$("#translateText").css("left","0px");
			$("#translateText").html("Translate");
			$("#translateLanguage").css("width","130px");
			
			$("#translateLanguage").mouseout(function(){
				$("#translateLanguage").stop();
				$("#translateLanguage").animate({top:'-24px'},1000);
			});
			
		} else{
			$(".translateButtons").css("width","50px");
			$("#translateLanguage").css("top","-54px");
			$("#translateText").css("left","60px");
			$("#translateText").html("Translate Page");
			$("#translateLanguage").css("width","300px");
			
			$("#translateLanguage").mouseout(function(){
				$("#translateLanguage").stop();
				$("#translateLanguage").animate({top:'-54px'},1000);
			});
		}
	});
}

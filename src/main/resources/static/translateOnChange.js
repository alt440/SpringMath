//for now
var lang = window.localStorage.getItem('lang');

function onTextChange(jQueryElement){
	
	var url = window.location.href;
	var refFile = "";
	if(url.includes("/addition") || url.includes("/subtraction") || 
			url.includes("/multiplication") || url.includes("/division")){
		
		refFile = "../";
		
	}

	$.getJSON(refFile+"translate/translateText.json", function(texts){
		var translate = texts;
		
		jQueryElement.each(function(){
			var currentText;
			if($(this).is("h2")){
				currentText = $(this).text();
			}
			else if($(this).is("input")){
				currentText = $(this).val();
			}
			else{
				currentText = $(this).html();
			}
			
			//check for any numbers
			numbers = currentText.match(/\d+/g);
			
			if (numbers != null && numbers.length>=1){
				for (var i=0;i<numbers.length;i++){
					currentText=currentText.replace(numbers[i], '%n');
				}
				
			}
			
			//check if translation is available
			if(translate[currentText] !== undefined && translate[currentText][lang] !== undefined){
				var textToPut;
				if (numbers != null && numbers>1) {
					textToPut = translate[currentText][lang];
					for (var i=0;i<numbers.length;i++){
						textToPut = textToPut.replace('%n', numbers[i]);
					}
				}
					
				else
					textToPut = translate[currentText][lang];
				if($(this).is("h2")){
					$(this).text(textToPut);
				}
				else if($(this).is("input")){
					$(this).val(textToPut);
				}
				else{
					$(this).html(textToPut);
				}
			}
		});
	});
}

function setLang(langVal){
	window.localStorage.setItem('lang', langVal);
}
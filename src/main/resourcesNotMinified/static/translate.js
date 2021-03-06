//https://github.com/ricky991/simple-jquery-translations-plugin/blob/master/translate-plugin/translations.js
//to compare text put it lower case
//convert digits to %n

//for now
var lang = window.localStorage.getItem('lang');

var url = window.location.href;
var refFile = "";
if(url.includes("/addition") || url.includes("/subtraction") || 
		url.includes("/multiplication") || url.includes("/division")){
	
	refFile = "../";
	
}

$.getJSON(refFile+"translate/translateText.json", function(texts){
	var translate = texts;
	
	//go search for all elements having class translate (and the title)
	$(".translate").each(function(){
		var currentText;
		if($(this).is("h2")){
			currentText = $(this).text();
		}
		else if($(this).is("input")){
			currentText = $(this).val();
		}
		//exception for the contact me page
		else if($(this).is("div") && $(this).text().includes("My name is")){
			currentText = $(this).text().trim();
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
			if (numbers != null && numbers.length>=1){
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
			else if($(this).is("div") && $(this).text().includes("My name is")){
				var currentVal = $(this).html();
				//img part is at index 0
				currentVal = currentVal.split("My name is");
				$(this).html(currentVal[0]+textToPut);
			}
			else{
				$(this).html(textToPut);
			}
		}
		
	})
	
	//also translate the title! No numbers in title...
	var currentText = document.title;
	if(translate[currentText] !== undefined && translate[currentText][lang] !== undefined){
		document.title = translate[currentText][lang];
	}
})

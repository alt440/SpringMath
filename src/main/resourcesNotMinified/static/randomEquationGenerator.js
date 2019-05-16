
function getRandomOperator(){
	//0 for +
	//1 for -
	//2 for *
	//3 for /
	return Math.floor((Math.random()*4));
}

function srcOperatorImage(operatorVal){
	
	var srcImg = "";
	switch(operatorVal){
	case 0:
		srcImg = "img/add.png";
		break;
	case 1:
		srcImg = "img/subtract.png";
		break;
	case 2:
		srcImg = "img/multiply.png";
		break;
	case 3:
		srcImg = "img/divide.png";
		break;
	}
	return srcImg;
}

function getRandomValue(){
	//max value: 12
	return Math.floor((Math.random()*13));
}

function getAnswer(val1, val2, operator){
	if(operator === 0){
		return val1+val2;
	}
	else if(operator === 1){
		return val1-val2;
	}
	else if(operator === 2){
		return val1*val2;
	}
	else if(operator === 3){
		return val1/val2;
	}
}

//gets the number to be divided. This method is added because 
//we want answers not to be decimal numbers.
function getFirstDivisionOperand(val1, val2){
	//making sure there is no division by 0
	if(val1 === 0){
		while(val1 === 0){
			val1 = getRandomValue();
		}
	}
	if(val2 === 0){
		while(val2 === 0){
			val2 = getRandomValue();
		}
	}
	val3 = val1*val2
	//reason: X / 7 = 9 --> to get X = 9*7
	return val3
}
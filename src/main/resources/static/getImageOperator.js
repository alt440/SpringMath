function srcOperatorImage(operatorVal){
	
	var srcImg = "";
	switch(operatorVal){
	case 0:
		srcImg = "../img/add.PNG";
		break;
	case 1:
		srcImg = "../img/subtract.PNG";
		break;
	case 2:
		srcImg = "../img/multiply.PNG";
		break;
	case 3:
		srcImg = "../img/divide.PNG";
		break;
	}
	return srcImg;
}
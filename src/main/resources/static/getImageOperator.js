function srcOperatorImage(operatorVal){
	
	var srcImg = "";
	switch(operatorVal){
	case 0:
		srcImg = "../img/add.png";
		break;
	case 1:
		srcImg = "../img/subtract.png";
		break;
	case 2:
		srcImg = "../img/multiply.png";
		break;
	case 3:
		srcImg = "../img/divide.png";
		break;
	}
	return srcImg;
}
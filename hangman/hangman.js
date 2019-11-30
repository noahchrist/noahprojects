		
const tryThisLetter = letter => {

	document.getElementById("option" + letter).style.background = "blue";

	var xmlhttp = new XMLHttpRequest();   
	var theUrl = "/tryThisLetter";
	xmlhttp.open("POST", theUrl, true);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	xmlhttp.onreadystatechange = function() {
	 	if (this.readyState == 4 && this.status == 200) {

	 	  	gameObj = JSON.parse(this.response);

			document.getElementById("blankWordText").innerHTML = gameObj.nameBlank;

			changeImage(gameObj.misses);
			manageGameEnd(gameObj.gameResult);
					
	   	}
	}	

	gameObj.currentGuess = letter;

	xmlhttp.send(JSON.stringify(gameObj));
		
}


const changeImage = numInt => {
	let img = document.getElementById("image");
	let numStr = "";
			
	switch(numInt){
		case 0: {
			numStr += "zero";
			break;
		}
		case 1: {
			numStr += "one";
			break;
		}
		case 2: {
			numStr += "two";
			break;	
		}
		case 3: {
			numStr += "three";
			break;
		}
		case 4: {
			numStr += "four";
			break;
		}
		case 5: {
			numStr += "five";
			break;
		}
		case 6: {
			numStr += "six"
			break;
		}
	}

	numStr += ".png";
	img.src = numStr;
}


const manageGameEnd = result => {
	if(result === 30){
		document.getElementById("gameResult").innerHTML = "you win !";
	}
	else if(result === 13){
		document.getElementById("gameResult").innerHTML = "you lose :( answer = " + getAnswerOnLoss(gameObj.nameID);	
	}
}

const setupScreen = blank => {

	document.getElementById("blankWordText").innerHTML = blank;

}




//stop game after win/loss


//on loss, get real name from server and post it



const getAnswerOnLoss = id => {

	let xmlhttp = new XMLHttpRequest();
	let url = "/getAnswerOnLoss";
	xmlhttp.open("GET", url, true);

	xmlhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
	        		
        	return this.response;

		}

	};

	
	xmlhttp.send(id);

}
		

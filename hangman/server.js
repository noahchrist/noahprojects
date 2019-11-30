const express = require('express');
const serverStatic = require('serve-static');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', serverStatic(__dirname + '/'));
const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));




const exceptionLetters = ['.',',','-',' '];

const namesList = ["Test One", "Test Twoo", "Test Three"];

const pickID = names => {

	return ranNum = Math.floor(Math.random()*names.length);

	let chosenWord = names[ranNum];

	return chosenWord;

}

const getName = (names, id) => {

	return name = names[id];

}

const wordToBlanks = (word, exceptions) => {
			let blanks = "";

			for(let i=0; i < word.length; i++){
				if(exceptionLetters.some(x => x === word[i])){
					blanks += word[i] + " ";
				}
				else{
					blanks += "_ "
				}
			}

			return blanks;

}

const letterNotGuessed = (letter, guessed) => {
	return !guessed.some(x => letter === x);
}

const letterInWord = (letter, word) => {
	return word.includes(letter) || word.includes(letter.toLowerCase());
}

const updateBlankWord = (letter, word, blanks) => {

	let indices = [];
	let tempBlanks = blanks;

	for(let i=0;i<word.length;i++){
		if(word[i] === letter || word[i] === letter.toLowerCase()){
			indices.push(i*2);
		}
	}

	for(let i=0;i<indices.length;i++){
		tempBlanks = tempBlanks.substring(0, indices[i]) + letter + tempBlanks.substring(indices[i]+1);
	}

	return tempBlanks;

}

const checkForWin = word => {
	return !word.includes("_");
}

const checkForLoss = misses => {
	return (misses === 6)
}


app.get('/startNewGame', function (req, res) {
  
	const newGameObj = {
		gameID: 1,
		nameID: -1,
		nameBlank: "",
		misses: 0,
		guessedLetters: [],
		currentGuess: "",
		gameResult: 0

		//gameResult 0=default 30=WIN 13=LOSS
	}

	newGameObj.nameID = pickID(namesList);
	let tempName = getName(namesList, newGameObj.nameID);

	newGameObj.nameBlank = wordToBlanks(tempName, exceptionLetters);

	res.send(newGameObj);

})

app.post('/tryThisLetter', function(req, res) {

	let myObj = req.body;

	let tempName = getName(namesList, myObj.nameID);

	if(letterNotGuessed(myObj.currentGuess, myObj.guessedLetters)){

		myObj.guessedLetters.push(myObj.currentGuess);

		if(letterInWord(myObj.currentGuess, tempName)){
			myObj.nameBlank = updateBlankWord(myObj.currentGuess, tempName, myObj.nameBlank);
			
			if(checkForWin(myObj.nameBlank)){
				myObj.gameResult = 30;
			}
		}
		else{

			myObj.misses++;
			
			if(checkForLoss(myObj.misses)){
				myObj.gameResult = 13;
			}
		}

	}

	res.send(myObj);

	console.log(req.body);
})

app.get('/getAnswerOnLoss', function(req, res){

	let id = req.body;
	console.log(id);


	let name = getName(namesList, id);

	res.send(name);

})


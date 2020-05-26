/* scripts.js */

function ready(callbackFunc) {
  if (document.readyState !== 'loading') {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  }
}

ready(function() {

// ========================
// Game Data
// ========================

var gameState = {
	discipline: 'addition',
	mode: 'practice',
	equationArray: [0, 0, 0],
	equationAnswers: [0, 0, 0],
	equationCount: 0,
	correctCount: 0,
	timer: 60
}


// ========================
// Navigation
// ========================

// focus on start
document.getElementById('press-start').focus();

// refocus on last checked radio if users clicks elsewhere
document.addEventListener('mouseup', function() {
	document.querySelector('section.active input:checked').focus();
});

// NAV LISTENERS //

navListener('press-start', function() { goToScreen('start') });
navListener('view-highscores', function() { goToScreen('highscores') });

navListener('addition', function() {
	gameState.discipline = 'addition';
	goToScreen('gametype');
});
navListener('subtraction', function() {
	gameState.discipline = 'subtraction';
	goToScreen('gametype');
});
navListener('multiplication', function() {
	gameState.discipline = 'multiplication';
	goToScreen('gametype');
});
navListener('division', function() {
	gameState.discipline = 'division';
	goToScreen('gametype');
});

navListener('practice', function() {
	gameState.mode = 'practice';
	startSession();
	goToScreen('gameplay');
});
navListener('challenge', function() {
	gameState.mode = 'challenge';
	startSession();
	goToScreen('gameplay');
});

navListener('resign', function() {
	document.getElementById('prompt').classList.remove('active');
	endSession();
	goToScreen('title');
});
navListener('dismiss', function() {
	document.getElementById('prompt').classList.remove('active');
});

navListener('replay', function() {
	document.getElementById('summary').classList.remove('active');
	startSession();
});
navListener('end', function() {
	document.getElementById('summary').classList.remove('active');
	endSession();
	goToScreen('title');
});


// NAV FUNCTIONS //

// reusable keyup listeners
function navListener(elementID, navFunction) {
	document.getElementById(elementID).addEventListener('keyup', function(e) {
		if (e.keyCode === 13 || e.keyCode === 88) { // enter or x
			navFunction();
		}
	});
}

// go to a screen
function goToScreen(targetScreen) {
	if (document.querySelector('section.active').id === 'title') {
		document.querySelector('body').classList.remove('title');
	}

	if (targetScreen === 'title') {
		document.querySelector('body').classList.add('title');
	}

	document.querySelector('section.active').classList.remove('active');
	document.getElementById(targetScreen).classList.add('active');

	if (targetScreen !== 'highscores' || targetScreen) {
		document.querySelector('section.active input:checked').focus();
	}
}

// go back a section
document.addEventListener('keyup', function(e) {
	if (e.keyCode === 27 || e.keyCode === 90) { // esc or z
		var activeSection = document.querySelector('section.active');

		if (activeSection.id === 'start' || activeSection.id === 'highscores') {
			goToScreen('title');
		}

		if (activeSection.id === 'gametype') {
			goToScreen('start');
		}

		if (activeSection.id === 'gameplay') {
			document.getElementById('prompt').classList.add('active');
			document.getElementById('resign').focus();
		}
	}
});


// ========================
// Gameplay
// ========================

// Session Listeners //

// answer buttons
document.querySelectorAll('#answers input').forEach(function(el) {
    el.addEventListener('keyup', function(e) {
		if (e.keyCode === 13 || e.keyCode === 88) { // enter or x
			if (document.querySelector('#answers input:checked + span').innerText == gameState.equationArray[2]) {
				correctAnswer();
			} else {
				wrongAnswer();
			}
		}
	});
});

// Session Functions //

var sessionCountdown;

function countdown() {
	if (gameState.timer === 10) {
		document.querySelector('#info progress').classList.remove('is-success');
		document.querySelector('#info progress').classList.add('is-warning');
	}

	if (gameState.timer === 5) {
		document.querySelector('#info progress').classList.remove('is-warning');
		document.querySelector('#info progress').classList.add('is-error');
	}

	if (gameState.timer > 0) {
		gameState.timer--;
		document.querySelector('#info progress').setAttribute('value', (60 - gameState.timer));
	} else {
		endSession();
	}
}

function startSession() {
	if (gameState.mode === 'challenge') {
		// start countdown
		document.querySelector('#info progress').classList.add('active');
		sessionCountdown = setInterval(countdown, 1000);
	}

	generateEquation(gameState.discipline);
}

function correctAnswer() {
	document.querySelector('#answers input:checked').parentNode.classList.add('is-success');

	setTimeout(function() {
		generateEquation(gameState.discipline);
	}, 500);
}

function wrongAnswer() {
	document.querySelector('#answers input:checked').parentNode.classList.add('is-error');
	document.querySelector('#gameplay .nes-container').classList.add('wrong');

	setTimeout(function() {
		document.querySelector('#gameplay .nes-container').classList.remove('wrong');
		generateEquation(gameState.discipline);
	}, 500);
}

function endSession() {
	// if challenge reset countdown
	if (gameState.mode === 'challenge') {
		clearInterval(sessionCountdown);
		gameState.timer = 60;
		for (i = 0; i < 3; i++) {
			document.querySelectorAll('#answers label')[i].classList.add('is-disabled');
		}

		// display summary
		// ...
	}

	gameState.equationCount = 0;
	gameState.correctCount = 0;
	gameState.equationArray = [0, 0, 0];	
	gameState.equationAnswers = [0, 0, 0];	
}

// ========================
// Equation Generators
// ========================

function generateEquation(discipline) {
	switch (discipline) {
		case 'addition':
			additionEquation();
			break;
		case 'subtraction':
			subtractionEquation();
			break;
		case 'multiplication':
			multiplicationEquation();
			break;
		case 'division':
			divisionEquation();
			break;
	}

	generateAnswers();
}

// +
function additionEquation() {
	gameState.equationArray[0] = randomIntFromInterval(1, 100);
	gameState.equationArray[1] = randomIntFromInterval(1, (100 - gameState.equationArray[0]));
	gameState.equationArray[2] = gameState.equationArray[0] + gameState.equationArray[1];

	// randomize order of addends
	if (randomIntFromInterval(0, 1)) {
		var temp = gameState.equationArray[0];
		gameState.equationArray[0] = gameState.equationArray[1];
		gameState.equationArray[1] = temp;
	}

	document.getElementById('operator').innerHTML = '+';
	document.getElementById('digit-one').innerHTML = gameState.equationArray[0];
	document.getElementById('digit-two').innerHTML = gameState.equationArray[1];
}

// -
function subtractionEquation() {

}

// x
function multiplicationEquation() {

}

// /
function divisionEquation() {

}

// create random answers and place as options
function generateAnswers() {
	// reset buttons
	document.querySelectorAll('#answers label').forEach(function(item) {
		item.classList.remove('is-success');
		item.classList.remove('is-error');
	});

	// correct answer
	gameState.equationAnswers[0] = gameState.equationArray[2];
	
	// wrong answer one
	do {
		gameState.equationAnswers[1] = randomIntFromInterval(0, 100);
	} while (gameState.equationAnswers[1] === gameState.equationAnswers[0]);

	// wrong answer two
	do {
		gameState.equationAnswers[2] = randomIntFromInterval(0, 100);
	} while (gameState.equationAnswers[2] === gameState.equationAnswers[0] || gameState.equationAnswers[2] === gameState.equationAnswers[1]);

	// shuffle answers
	shuffle(gameState.equationAnswers);

	// place answers into buttons
	document.querySelector('#answer-one + span').innerHTML = gameState.equationAnswers[0];
	document.querySelector('#answer-two + span').innerHTML = gameState.equationAnswers[1];
	document.querySelector('#answer-three + span').innerHTML = gameState.equationAnswers[2];
}

// random int of range
function randomIntFromInterval(min, max) { 
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// shuffle elements in an array
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



}); // end doc ready
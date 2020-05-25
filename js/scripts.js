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
// Game State
// ========================

var gameState = {
	discipline: 'addition',
	mode: 'practice',
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
navListener('press-start', startScreen);

navListener('addition', function() {
	gameState.discipline = 'addition';
	gametypeScreen();
});
navListener('subtraction', function() {
	gameState.discipline = 'subtraction';
	gametypeScreen();
});
navListener('multiplication', function() {
	gameState.discipline = 'multiplication';
	gametypeScreen();
});
navListener('division', function() {
	gameState.discipline = 'division';
	gametypeScreen();
});

navListener('practice', function() {
	gameState.mode = 'practice';
	practiceScreen();
});
navListener('challenge', function() {
	gameState.mode = 'challenge';
	challengeScreen();
});

navListener('resign', function() {
	titleScreen();
	document.getElementById('prompt').classList.remove('active');
});
navListener('dismiss', function() {
	document.getElementById('prompt').classList.remove('active');
});

// reusable keyup listeners
function navListener(elementID, navFunction) {
	document.getElementById(elementID).addEventListener('keyup', function(e) {
		if (e.keyCode === 88) { // x
			navFunction();
		}
	});
}

// NAV FUNCTIONS //
// go back a section
document.addEventListener('keyup', function(e) {
	if (e.keyCode === 90) { // z
		var activeSection = document.querySelector('section.active');

		if (activeSection.id === 'start') {
			titleScreen();
		}

		if (activeSection.id === 'gametype') {
			startScreen();
		}

		if (activeSection.id === 'gameplay') {
			document.getElementById('prompt').classList.add('active');
			document.getElementById('resign').focus();
		}
	}
});

function titleScreen() {
	document.querySelector('body').classList.add('title');
	document.querySelector('section.active').classList.remove('active');
	document.getElementById('title').classList.add('active');
	document.getElementById('press-start').focus();
}

function startScreen() {
	document.querySelector('body').classList.remove('title');
	document.querySelector('section.active').classList.remove('active');
	document.getElementById('start').classList.add('active');
	document.getElementById('addition').focus();
}

function gametypeScreen() {
	document.querySelector('section.active').classList.remove('active');
	document.getElementById('gametype').classList.add('active');
	document.getElementById('practice').focus();
}

function practiceScreen() {
	document.querySelector('section.active').classList.remove('active');
	document.getElementById('gameplay').classList.add('active');
	document.querySelector('#answers span:first-child').focus();
	gameState.mode = 'practice';
	startSession(gameState.discipline, gameState.mode);
}

function challengeScreen() {
	document.querySelector('section.active').classList.remove('active');
	document.getElementById('gameplay').classList.add('active');
	document.querySelector('#answers span:first-child').focus();
	gameState.mode = 'challenge';
	startSession(gameState.discipline, gameState.mode);
}


// ========================
// Gameplay
// ========================

function startSession(discipline, mode) {
	// if challenge start countdown

	// generate first equation
}

function correctAnswer() {
	// highlight answer as correct

	// wait a moment and then generate next question
}

function wrongAnswer() {
	// highlight answer as wrong

	// wait a moment and then generate next question
}

function endSession() {
	// if challenge reset countdown

	// reset equation count

	// reset correct count

	// clear equation

	// clear answers
}

// ========================
// Equation Generators
// ========================

// Addition

// Subtraction

// Multiplication

// Division




}); // end doc ready
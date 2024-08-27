'use strict';

//selecting the lelements first assinging variable forall elements
//both the methodworks the same but getElementById is faster than queryselector sp we have used the getElementById

//assigning players 
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

//assinging scores
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');

//assinging current score
const currentScore0Element = document.getElementById('current--0')
const currentScore1Element = document.getElementById('current--1')

//Adjusting the dice and the buttons 
const diceElement = document.querySelector('.dice');
const btnNew =  document.querySelector('.btn--new');
const btnRoll =  document.querySelector('.btn--roll');
const btnHold =  document.querySelector('.btn--hold');

// variables for storin the scores and data related tot he fields 
//because we should not store the values directly to the react DOM
let scores, currentScore, activePlayer, playing;

//starting conditions setting
const init = () => {
    //assinging some default values to the variables so that we can change it later when needed
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing=true;

    //setting some default values which are going to show at starting 
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;

    //hide the dice at thestarting position after clicking the roll buttonthe dice will appear
    diceElement.classList.add('hidden');

    //setting default active rules for the players boxes at first player 1 is active
    player0Element.classList.add('player--active')
    player1Element.classList.remove('player--active')
    //by default removing the winningconditions because when resetting the game the functions should be starting.
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
}
init() 

//making a function of switching player when the dice is 1 
const switchPlayer = () => {
    document.getElementById (`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    //changing the active player if roll=1
    activePlayer = activePlayer === 0 ? 1 : 0;
    //3 methods are there add,remove,toggle
    //here toggling between two players when eitherone player make hold or get 1
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

//making a function of rooling dice
btnRoll.addEventListener('click', () => {
    if(playing)
    {
            //generate a random number foreach roll
        const dice = Math.trunc(Math.random()*6)+1;
        // console.log(dice);

        //Displaying the dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        //checking for 1 if true then move to the next player and delte the current score
        if(dice!=1){
            currentScore+=dice;
            // currentScore0Element.textContent = currentScore; just a demo try to see its working or not 
            document.getElementById (`current--${activePlayer}`).textContent = currentScore;
        }
        else{
                //switching to the next player by calling switchPlayer function
                switchPlayer();
        }
    }
})

btnHold.addEventListener('click', ()=>{
    if(playing){
        //add the current score to the active player score
        // scores[1] += currentScore;
        // scores[0] += currentScore;
        //in simpler way foradding the score to thecurrentscore we can do likethis 
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //checking the winning condition that is score>=100
        if(scores[activePlayer] >=10){
            //finish the game
            playing=false;
            //make the dice hidden
            diceElement.classList.add('hidden');
            //make the winner move
            document.querySelector( `.player--${activePlayer}`).classList.add('player--winner'); 
            document.querySelector( `.player--${activePlayer}`).classList.remove('player--active'); 
        }
        else {
            // switch to the next player is upper conditions not match
            switchPlayer();
        }
    }
});

//by rematch we just need to set the function to their default values and the logic is done
btnNew.addEventListener('click', init);
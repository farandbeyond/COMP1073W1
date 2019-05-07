console.log('hello');

/* 
0. Declare the 'random number' (set const for testing)
1. get input from user. Store input in 'input' variable
2. compare input to random number
3. if successful guess, 
    tell user they won
4. if unsuccessful guess, 
    if bigger, 
        tell user its too big
    else (smaller), 
        tell user its too small
    then, loop step 1.
5. after enough failed guesses, or successful guess, reset the game to step 0, with a new number.
*/


// STEP 1: Initialize game variables
    // STEP 1a: Pick random number
    // var price = 87; //todo: random this
    var price = getRandomNumber();
    var tries = 10;
    var memory;
    // STEP 1b: Create variables to represent the three paragraphs above that will contain user feedback
    
    var failedGuesses = document.querySelector('#guesses');
    var lastGuess = document.querySelector('#lastResult');
    var LowHighResult = document.querySelector('#lowOrHi');

      // STEP 1c: Create variables to represent the guessing form
    var inputfield = document.querySelector('#guessField');

    var checkButton = document.querySelector('#submit');

    var resetButton = document.querySelector('#reset');

      // STEP 2: Put focus on the field that allows user to type in guesses
      
    inputfield.focus();

      // STEP 3: Build a function to check the user's guess
    function checkGuess(){
        tries--;
        updateCheckButton();
        // STEP 3a: Create a variable to contain what number the user entered
        var input = inputfield.value;
        inputfield.value = '';
        console.log(input);
        // STEP 3b: If this is the first guess, add some text to the screen as a label for listing previous guesses for reference
        
        if(failedGuesses.textContent == ''){
            failedGuesses.textContent = 'Your Guesses: ';
        }else{
            failedGuesses.textContent += memory;
        }

        // STEP 3c: Add the user's current guess to that list, plus a space
        memory = input;
        lastGuess.textContent = "Your Guess: " + input;
        
        // STEP 3d: Conditional - the user guessed correctly
        if(input == price){
          // Output a success message, then end the game
          LowHighResult.textContent = 'YOUR GUESS IS: CORRECT';
          checkButton.disabled = true;
        }else if(tries == 0){
            checkButton.disabled = true;
            LowHighResult.textContent = 'YOUR FINAL GUESS WAS INCORRECT.';
        }else{
        // STEP 3f: Conditional - the user's guess is incorrect
        
            // Output an appropriate message
            
            if(input < price){
                // If the guess is too low, let the user know
                LowHighResult.textContent = 'YOUR GUESS IS: LOW';
                memory += '(L), ';
            }else{
                // Else if the guess is too high, let the user know
                LowHighResult.textContent = 'YOUR GUESS IS: HIGH';
                memory += '(H), ';
            }
        }
    }

    function resetGame(){
        inputfield.value = '';
        LowHighResult.textContent = '';
        failedGuesses.textContent = '';
        lastGuess.textContent = '';
        input = '';
        tries = 10;
        price = getRandomNumber();
        checkButton.disabled = false;
        updateCheckButton();
    }

    function updateCheckButton(){
        checkButton.textContent = 'Submit guess (' + tries + ')';
    }

    function getRandomNumber(){
        var number =  Math.floor(Math.random() * 100) + 1;
        console.log('Cheaters can tell what the number is here: ' + number);
        return number;
    }

    updateCheckButton();
      // STEP 3i: Add an event listener for the guess form button that calls the checkGuess function
    checkButton.onclick = checkGuess;
    resetButton.onclick = resetGame;
    inputfield.addEventListener("keyup", e => {
        if(e.key == "Enter") checkButton.click(); 
    });
      
$(document).ready(function() {
  $(".sbut").addClass("dim");
  var sequence = [];
  var ss0 = $("#ss0")[0];
  var ss1 = $("#ss1")[0];
  var ss2 = $("#ss2")[0];
  var ss3 = $("#ss3")[0];
  var wrong = $("#wrong")[0];
  var int = 1000;
  var inputCounter = 0;
  var strictMode = false;

  function beepBoop(num) {
    num = parseInt(num);
    console.log("beep " + num);
    if (num === 0) {
      ss0.play();
    } else if (num === 1) {
      ss1.play();
    } else if (num === 2) {
      ss2.play();
    } else if (num === 3) {
      ss3.play();
    }
  }

  function playSequence() {
    $(".sbut").off("click", simonClick);
    $("#seqLength").text(sequence.length);
    console.log(sequence);
    var i = 0;
    var showSequence = setInterval(function(){
      $(".sbut").addClass("dim");
      if (i < sequence.length) {
        $("#" + sequence[i]).removeClass("dim");
        beepBoop(sequence[i]);
        i++;
      } else {
        clearInterval(showSequence);
        console.log("computer done");
      }
    }, int);
    inputCounter = 0;
    $(".sbut").on("click", simonClick);
  }

  function randomSequence() {
    for (var j = 0; j < sequence.length; j++) {
      sequence[j] = Math.floor((Math.random() * 4));
    }
    playSequence();
  }

  function addToSequence() {
    var newMove = Math.floor((Math.random() * 4));
    sequence.push(newMove);
  }

  function startGame(e) {
    $("#start").text("Restart");
    inputCounter = 0;
    sequence = [];
    $("#seqLength").text(sequence.length);
    addToSequence();
    playSequence();
  }

  function simonClick(e) {
    $(this).removeClass("dim");
    console.log("fun: simonClick()");
    var clicked = $(this).attr("id");
    console.log("inputCounter: " + inputCounter);
    console.log("clicked: " + clicked);
    console.log("answer: " + sequence[inputCounter]);
    if (clicked == sequence[inputCounter]) {
      console.log("correct");
      inputCounter++;
      beepBoop(clicked);
      if (inputCounter == sequence.length) {
          console.log("round completed");
          roundWon();
      }
    } else {
      console.log("wrong");
      wrong.play();
      inputCounter = 0;
      if (strictMode) {
        setTimeout(randomSequence, 1500);
      } else {
        setTimeout(playSequence, 1500);
		}
	}
  }

  function roundWon() {
    setTimeout(function() {
      $(".sbut").addClass("dim");
      addToSequence();
      playSequence();
    }, 1500);
  }

  $("#start").on("click", startGame);

  $("#strict").on("click", function() {
    if (strictMode) {
      strictMode = false;
      $("#strict").addClass("dim");
      startGame();
    } else {
      strictMode = true;
      $("#strict").removeClass("dim");
      startGame();
    }
  });

});

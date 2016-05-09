var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// if we click on start/reset button
document.getElementById("startreset").onclick = function() {
   
    //if we are playing
    if(playing == true) {
        
        location.reload();//reload our page
    }
     
    //if we are not not playing
    else {
        //set score to zero
        score=0;
        //change mode to playing
        playing=true;
        
        document.getElementById("value").innerHTML = score;
        
        //show countdown box
        showElement("timeremaining");
            timeremaining = 60;
        
        //hide game over box
        hideElement("gameover");
           
        
        
        //change button to reset
        document.getElementById("startreset").innerHTML=" Reset Game";
        
        
                //start the countdown
                startCountdown();
                
                //genere new Q&A
                generateQA();
    }
}
  

  for(var i=1;i<5;i++) {
        document.getElementById("box"+i).onclick =function() {
        if (playing == true) {
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("value").innerHTML =score;
                hideElement("wrong");
                showElement("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                
                //generate new q&a
                generateQA();
            }else {
            hideElement("correct");
            showElement("wrong");
            setTimeout(function(){
                hideElement("wrong");
            },1000);
       
        }
        } 
    }
  }


//functions 

//start counter
function startCountdown() {
    action = setInterval(function(){
        timeremaining-=1;
         document.getElementById("timeremainigvalue").innerHTML = timeremaining;
                if (timeremaining == 0) {
                    //game over
                    stopCountdown();
                    showElement("gameover");
                    document.getElementById("gameover").innerHTML ="<p>game over !</p> <p>your score is"+score +"<p>";
                    hideElement("timeremaining");
                    hideElement("wrong");
                    hideElement("correct");
                    playing=false;
                    document.getElementById("startreset").innerHTML = " Start Game";
                }
    },1000);
}

//stop counter
function stopCountdown() {
    clearInterval(action);
}

//hide elements
function hideElement(id) {
        document.getElementById(id).style.display="none";
}

//show elements
function showElement(id) {
        document.getElementById(id).style.display="block";
}

function generateQA () {
    
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    
    correctAnswer = x * y ;
    
    document.getElementById("question").innerHTML= x+ "x"+y;
    
    var correctPosition = 1+Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill 1 box with correct answer
    
    //fill other boxes
    var answers =[correctAnswer];
    for (i=1;i<5;i++) {
        if (i != correctPosition) {
            var wrongAnswer;
           do {
                wrongAnswer = (1+ Math.round(9*Math.random())) * (1+ Math.round(9*Math.random()));
                document.getElementById("box"+i).innerHTML=wrongAnswer;
            
           }while(answers.indexOf(wrongAnswer)> -1)
        }
    }
    
}
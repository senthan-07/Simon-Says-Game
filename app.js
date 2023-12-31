let gameseq=[];
let userseq=[];
  
let btns=["yellow","green","purple","red"]; //Creating array which contains all buttons colors

let started=false; 
let level=0;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function () {
    if(started==false){
    console.log("Game started");    
    started=true;  //To ensure game is starterd only once

    levelup();  //calls 2nd step
    }
})
 

//btnflash for random flash generated by system
function gameflash(btn){
    btn.classList.add('flash'); //adds class flash which has styling white background
    setTimeout(function(){ //To create flash effect it removes class after 1 seconds
        btn.classList.remove("flash") 
    },250);
}

//User flash which is for user flasj
function userflash(btn){
    btn.classList.add('userflash'); //adds class flash which has styling white background
    setTimeout(function(){ //To create flash effect it removes class after 1 seconds
        btn.classList.remove("userflash") 
    },250);
}

function levelup(){
    userseq=[]; //Resting my userseq as i need to add from begining each time
    level++;  //increases level by 1
    h2.innerText=`Level  ${level}`; //changes value of h2

    let randidx=Math.floor(Math.random()*3); //Generates random index
    let randcolor=btns[randidx]; //selects a random color
    let randbtn=document.querySelector(`.${randcolor}`); //Access the class of random color i.e the button of color
    // console.log(randidx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn); //passin the random button to btnflash function  
}


function checkans(idx){
    // console.log(`Current level  ${level}`);
    if(userseq[idx]===gameseq[idx]){  
        if(userseq.length===gameseq.length){
            setTimeout(levelup(),1000);
        }
    }
    else{
        h2.innerHTML=`Game Over ! your score was  <b>${level}</b> <br>Press anykey to start`; //changes value of h2 to over
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnpress(){  
    // console.log(this);
    let btn=this;
    userflash(btn); //As user is clicking I am calling user flash fuucntion

    let usercolor=btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length-1); //As i want to check for my recently pressed color
};

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
};

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}

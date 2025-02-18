
const level="Easy (6 colors)";
// const urlParams=new URLSearchParams(window.location.search)
// const level=urlParams.get("");




const time=document.querySelector(".navbarText");
const modalWindow=document.querySelector("#gameOverModal");
const modal=new bootstrap.Modal(modalWindow);

const modalTitle=document.querySelector(".modal-title");
const modalBody=document.querySelector(".modal-body");
const modalText=document.querySelector(".modal-Text");
const keyAnswer=document.querySelector(".keyAnswer");
const  closeBtn=document.querySelector(".closeBtn");
const leftChance =document.querySelector(".navbarBrand")
const currentGuesses=document.querySelector(".currentGuesses");
const palets=document.querySelectorAll(".palet");
const submitBtn=document.querySelector(".submitBtn");
const textJok=document.querySelector(".textJok");
const gussInnerContainer=document.querySelector(".gussInnerContainer");
const guessesHistory=document.querySelector(".guessesHistory");
const btnHome=document.querySelector(".btn-home");
const btnPlayAgain=document.querySelector(".btn-playAgain");
function game() {
if (level==="Easy (6 colors)") {


}else if(level==="Medium (8 colors)"){
   

}else if(level==="Hard (10 colors)"){
    


    }
}


let timerInterval;
let colors=["rgb(0, 0, 255)","rgb(0, 128, 0)","rgb(255, 0, 0)","rgb(255, 255, 0)","rgb(128, 0, 128)","rgb(255, 165, 0)"];

function easy(){
    let timer=10;
    let chanceNumber=10;
    let password=[];
     
    // creat the password
       let passwordLength=6;
    for (let i=0;i<passwordLength;i++ ){
     let random=colors[Math.floor(Math.random()*colors.length)]
     password.push(random);
        
    }
       // creat the password end

    //    chance and timer
    leftChance.textContent=`Remaining Guesses :${chanceNumber}`;
    
        if(timer>0){
            timerInterval=  setInterval(() => {
             let minuts=Math.floor(timer/60);
             let seconds=timer%60;
            time.textContent=`Time Left : ${minuts}:${seconds<10?"0":""}${seconds}`
           
              if(timer<=10){
                time.style.color="red";
                time.style.fontWeight="Bold";
 
              }

           if (timer===0 ) {
        clearInterval(timerInterval);
        modalTitle.textContent="Game over";
        modalText.textContent="The correct colors are :";
         textJok.textContent="You had one job... and still. 😭";
       
        password.forEach((color)=>{
         const ball=document.createElement("div");
         ball.style.width="30px";
         ball.style.height="30px";
         ball.style.borderRadius="50%";
         ball.style.backgroundColor=color;
         keyAnswer.append(ball);
        })

           modal.show();
        }
        timer--;
     } , 1000);
            }
   

   //    chance and timer ends




//    chosing colors starts

   let currentColors=[];
   
   palets.forEach((palet)=>{
    palet.addEventListener("click",(e)=>{
       
     if (currentColors.length<6) {
      const selectedColor=document.createElement("article");
       selectedColor.classList.add("selectedColor");
        selectedColor.style.width="30px";
        selectedColor.style.height="30px";
        selectedColor.style.backgroundColor=getComputedStyle(palet).backgroundColor;
        const colorsBox=getComputedStyle(palet).backgroundColor;
        console.log(colorsBox);
        
        currentColors.push(colorsBox);
        console.log(colorsBox);
        currentGuesses.append(selectedColor);
     }

   })
 
     
  })

//    chosing colors ends



submitBtn.addEventListener("click",(e)=>{
     let correct=0;
    let misplaced=0;
   if(chanceNumber!==0){
    if(currentColors.length<6){
        alert("You must select exactly 6 colors!😐");
        
    }else{
        
     const passwordCopy=[...password];

      
     currentColors.forEach((color,index)=>{

       if(color===password[index]){

        correct++
        passwordCopy[index]=null;
       }

     });


      currentColors.forEach((color,index)=>{

    if(color!==password[index] &&  passwordCopy.includes(color)){

       misplaced++
        passwordCopy[passwordCopy.indexOf(color)]=null;
       }

    })
    chanceNumber--
    leftChance.textContent=`Remaining Guesses :${chanceNumber}`;

    
       if(correct===6){
        modalTitle.textContent=" 🎨 Boom! You're a Color Master! 🌈🔥";
        modalBody.textContent="5 points added to your legendary score!"
        textJok.textContent="Someone give this person a medal! 🏆";
           modal.show();
    
       }else{
       
        if (chanceNumber !==0) {
            const gussInnerContainer=document.createElement("div");
            gussInnerContainer.classList.add("gussInnerContainer");
    
            const showColors=document.createElement("div");
            showColors.classList.add("showColors");
    
            const showText=document.createElement("div");
            showText.classList.add("showText");
        
            const correctSpan=document.createElement("span");
           correctSpan.classList.add("Correct");
           correctSpan.textContent=`Correct:${correct},`;
        
            const misplacedSpan=document.createElement("span");
            misplacedSpan.classList.add("misplaced");
            misplacedSpan.textContent=`Misplaced:${misplaced}`;
            currentColors.forEach((color)=>{
                const gussedColors=document.createElement("div");
                gussedColors.style.width="30px";
                gussedColors.style.height="30px";
                gussedColors.style.borderRadius="50%";
                gussedColors.style.backgroundColor=color;
                showColors.append(gussedColors);
                showText.append(correctSpan,misplacedSpan);
                gussInnerContainer.append(showColors,showText);
                guessesHistory.append(gussInnerContainer);
                
            })
        
            currentColors=[];
            currentGuesses.innerHTML=``;   
        }
        
         
       }


    
    }


   }
     else if(chanceNumber===0){
        modalTitle.textContent="Game over";
        modalText.textContent="The correct colors are :";
         textJok.textContent="You had one job... and still. 😭";
       
        password.forEach((color)=>{
         const ball=document.createElement("div");
         ball.style.width="30px";
         ball.style.height="30px";
         ball.style.borderRadius="50%";
         ball.style.backgroundColor=color;
         keyAnswer.append(ball);
        })

           modal.show();


    }

    })

    btnPlayAgain.addEventListener("click",(e)=>{
        modal.hide();
        password=[];
        currentColors=[];
        currentGuesses.innerHTML=``;  
        guessesHistory.innerHTML="";
        keyAnswer.innerHTML = "";
        clearInterval(timerInterval);
       chanceNumber=10;
       timer=10;

      })


    }
    document.addEventListener("DOMContentLoaded", easy);
  



// modal btns starts
  btnHome.addEventListener("click",(e)=>{


    window.location.href = "../index.html";

      })

   

   
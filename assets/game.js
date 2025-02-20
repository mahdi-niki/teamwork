
const urlParams=new URLSearchParams(window.location.search)
let level=urlParams.get("level");
//  level="Easy (6 colors)";





// get user Info 
let userId= localStorage.getItem("id");
async function userScore(Point) {
                
                
    try{
     const response=await fetch(`https://67b24495bc0165def8cd2771.mockapi.io/users/${userId}`,{
        method:"GET",
        headers:{
         "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
     })
         if (!response.ok) {
            throw new Error(`Error:${response.status}`);
            
         }

       const data=await response.json();

        let newScore=data.score+Point;
       
         const addNewScore=await fetch(`https://67b24495bc0165def8cd2771.mockapi.io/users/${userId}`,{
          
            method:"PATCH",
             headers:{

                  
                   "Content-Type":"application/json",
                   "Authorization":`Bearer ${localStorage.getItem("token")}`

             }  ,


         body:JSON.stringify({
          score:newScore

         })

    });
       if (!addNewScore.ok) {
         throw new Error(`Error:${addNewScore.status}`);
         
       }

       console.log("User score updated.");

}
    catch(err){

        console.log(err.message);
        
    }
}




  // get user Info  ends





const time=document.querySelector(".navbarText");
const modalWindow=document.querySelector("#gameOverModal");
const modal = new bootstrap.Modal(modalWindow, {
    backdrop: 'static', 
    keyboard: false
});

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




let timerInterval;
let colors=["rgb(0, 0, 255)","rgb(0, 128, 0)","rgb(255, 0, 0)","rgb(255, 255, 0)","rgb(128, 0, 128)","rgb(255, 165, 0)"];
let chanceNumber=10;
let timer=0;
let currentColors=[];





function easy(){
   
    timer=300;
    let password=[];
   console.log(password);
   
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

document.querySelectorAll(".palet").forEach((palet) => {
    let newPalet = palet.cloneNode(true);
    palet.replaceWith(newPalet);
});


document.querySelectorAll(".palet").forEach((palet) => {
    palet.addEventListener("click", (e) => {
        e.preventDefault(); 
        if (currentColors.length < 6) {
            const selectedColor = document.createElement("article");
            selectedColor.classList.add("selectedColor");
            selectedColor.style.width = "30px";
            selectedColor.style.height = "30px";
            selectedColor.style.backgroundColor = getComputedStyle(e.target).backgroundColor;

            let colorsBox = getComputedStyle(e.target).backgroundColor;
           
            
            currentColors.push(colorsBox);
            currentGuesses.append(selectedColor);

            console.log(currentColors.length);
            console.log("Current Colors Array:", currentColors);
        }
    });
});



//    chosing colors ends


submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let correct = 0;
    let misplaced = 0;

    
    if (currentColors.length !== 6) {
        alert("You must select exactly 6 colors!😐");
        return; 
    }

    
    const passwordCopy = [...password];

   
    currentColors.forEach((color, index) => {
        if (color === password[index]) {
            correct++;
            passwordCopy[index] = null;
        }
    });

    
    currentColors.forEach((color, index) => {
        if (color !== password[index] && passwordCopy.includes(color)) {
            misplaced++;
            passwordCopy[passwordCopy.indexOf(color)] = null;
        }
    });

   
    chanceNumber--;
    leftChance.textContent = `Remaining Guesses :${chanceNumber}`;

    
    if (correct === 6) {
        modalTitle.textContent = " 🎨 Boom! You're a Color Master! 🌈🔥";
        modalBody.textContent = "5 points added to your legendary score!";
        textJok.textContent = "Someone give this person a medal! 🏆";
        modal.show();
        userScore(5);
        return;
    }

   
    if (chanceNumber !== 0) {
        const gussInnerContainer = document.createElement("div");
        gussInnerContainer.classList.add("gussInnerContainer");

        const showColors = document.createElement("div");
        showColors.classList.add("showColors");

        const showText = document.createElement("div");
        showText.classList.add("showText");

        const correctSpan = document.createElement("span");
        correctSpan.classList.add("Correct");
        correctSpan.textContent = `Correct:${correct},`;

        const misplacedSpan = document.createElement("span");
        misplacedSpan.classList.add("misplaced");
        misplacedSpan.textContent = `Misplaced:${misplaced}`;

      
        currentColors.forEach((color) => {
            const gussedColors = document.createElement("div");
            gussedColors.style.width = "30px";
            gussedColors.style.height = "30px";
            gussedColors.style.borderRadius = "50%";
            gussedColors.style.backgroundColor = color;
            showColors.append(gussedColors);
        });

        showText.append(correctSpan, misplacedSpan);
        gussInnerContainer.append(showColors, showText);
        guessesHistory.append(gussInnerContainer);

       
        currentColors = [];
        currentGuesses.innerHTML = ``;
    }

    if (chanceNumber === 0) {
        modalTitle.textContent = "Game over";
        modalText.textContent = "The correct colors are :";
        textJok.textContent = "You had one job... and still. 😭";

        password.forEach((color) => {
            const ball = document.createElement("div");
            ball.style.width = "30px";
            ball.style.height = "30px";
            ball.style.borderRadius = "50%";
            ball.style.backgroundColor = color;
            keyAnswer.append(ball);
        });

        modal.show();
    }
});
  


    }
   
  








    function medium(){
   
        timer=600;
        let password=[];
       
        // creat the password
           let passwordLength=8;
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
    
    document.querySelectorAll(".palet").forEach((palet) => {
        let newPalet = palet.cloneNode(true);
        palet.replaceWith(newPalet);
    });
    
    
    document.querySelectorAll(".palet").forEach((palet) => {
        palet.addEventListener("click", (e) => {
            e.preventDefault(); 
            if (currentColors.length < 8) {
                const selectedColor = document.createElement("article");
                selectedColor.classList.add("selectedColor");
                selectedColor.style.width = "30px";
                selectedColor.style.height = "30px";
                selectedColor.style.backgroundColor = getComputedStyle(e.target).backgroundColor;
    
                let colorsBox = getComputedStyle(e.target).backgroundColor;
               
                
                currentColors.push(colorsBox);
                currentGuesses.append(selectedColor);
    
                console.log(currentColors.length);
                console.log("Current Colors Array:", currentColors);
            }
        });
    });
    
    
    
    //    chosing colors ends
    
    
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let correct = 0;
        let misplaced = 0;
    
        
        if (currentColors.length !== 8) {
            alert("You must select exactly 8 colors!😐");
            return; 
        }
    
        
        const passwordCopy = [...password];
    
       
        currentColors.forEach((color, index) => {
            if (color === password[index]) {
                correct++;
                passwordCopy[index] = null;
            }
        });
    
        
        currentColors.forEach((color, index) => {
            if (color !== password[index] && passwordCopy.includes(color)) {
                misplaced++;
                passwordCopy[passwordCopy.indexOf(color)] = null;
            }
        });
    
       
        chanceNumber--;
        leftChance.textContent = `Remaining Guesses :${chanceNumber}`;
    
        
        if (correct === 8) {
            modalTitle.textContent = " 🎨 Boom! You're a Color Master! 🌈🔥";
            modalBody.textContent = "10 points added to your legendary score!";
            textJok.textContent = "Someone give this person a medal! 🏆";
            modal.show();
            userScore(10);
            return;
        }
    
       
        if (chanceNumber !== 0) {
            const gussInnerContainer = document.createElement("div");
            gussInnerContainer.classList.add("gussInnerContainer");
    
            const showColors = document.createElement("div");
            showColors.classList.add("showColors");
    
            const showText = document.createElement("div");
            showText.classList.add("showText");
    
            const correctSpan = document.createElement("span");
            correctSpan.classList.add("Correct");
            correctSpan.textContent = `Correct:${correct},`;
    
            const misplacedSpan = document.createElement("span");
            misplacedSpan.classList.add("misplaced");
            misplacedSpan.textContent = `Misplaced:${misplaced}`;
    
          
            currentColors.forEach((color) => {
                const gussedColors = document.createElement("div");
                gussedColors.style.width = "30px";
                gussedColors.style.height = "30px";
                gussedColors.style.borderRadius = "50%";
                gussedColors.style.backgroundColor = color;
                showColors.append(gussedColors);
            });
    
            showText.append(correctSpan, misplacedSpan);
            gussInnerContainer.append(showColors, showText);
            guessesHistory.append(gussInnerContainer);
    
           
            currentColors = [];
            currentGuesses.innerHTML = ``;
        }
    
        if (chanceNumber === 0) {
            modalTitle.textContent = "Game over";
            modalText.textContent = "The correct colors are :";
            textJok.textContent = "You had one job... and still. 😭";
    
            password.forEach((color) => {
                const ball = document.createElement("div");
                ball.style.width = "30px";
                ball.style.height = "30px";
                ball.style.borderRadius = "50%";
                ball.style.backgroundColor = color;
                keyAnswer.append(ball);
            });
    
            modal.show();
        }
    });
      
    
    
        }





    







        function hard(){
   
            timer=900;
            let password=[];
           
            // creat the password
               let passwordLength=10;
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
        
        document.querySelectorAll(".palet").forEach((palet) => {
            let newPalet = palet.cloneNode(true);
            palet.replaceWith(newPalet);
        });
        
        
        document.querySelectorAll(".palet").forEach((palet) => {
            palet.addEventListener("click", (e) => {
                e.preventDefault(); 
                if (currentColors.length < 10) {
                    const selectedColor = document.createElement("article");
                    selectedColor.classList.add("selectedColor");
                    selectedColor.style.width = "25px";
                    selectedColor.style.height = "25px";
                    selectedColor.style.backgroundColor = getComputedStyle(e.target).backgroundColor;
        
                    let colorsBox = getComputedStyle(e.target).backgroundColor;
                   
                    
                    currentColors.push(colorsBox);
                    currentGuesses.append(selectedColor);
        
                    console.log(currentColors.length);
                    console.log("Current Colors Array:", currentColors);
                }
            });
        });
        
        
        
        //    chosing colors ends
        
        
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let correct = 0;
            let misplaced = 0;
        
            
            if (currentColors.length !== 10) {
                alert("You must select exactly 10 colors!😐");
                return; 
            }
        
            
            const passwordCopy = [...password];
        
           
            currentColors.forEach((color, index) => {
                if (color === password[index]) {
                    correct++;
                    passwordCopy[index] = null;
                }
            });
        
            
            currentColors.forEach((color, index) => {
                if (color !== password[index] && passwordCopy.includes(color)) {
                    misplaced++;
                    passwordCopy[passwordCopy.indexOf(color)] = null;
                }
            });
        
           
            chanceNumber--;
            leftChance.textContent = `Remaining Guesses :${chanceNumber}`;
        
            
            if (correct === 10) {
                modalTitle.textContent = " 🎨 Boom! You're a Color Master! 🌈🔥";
                modalBody.textContent = "20 points added to your legendary score!";
                textJok.textContent = "Someone give this person a medal! 🏆";
                modal.show();

                userScore(20);
            
                return;
            }
        
           
            if (chanceNumber !== 0) {
                const gussInnerContainer = document.createElement("div");
                gussInnerContainer.classList.add("gussInnerContainer");
        
                const showColors = document.createElement("div");
                showColors.classList.add("showColors");
        
                const showText = document.createElement("div");
                showText.classList.add("showText");
        
                const correctSpan = document.createElement("span");
                correctSpan.classList.add("Correct");
                correctSpan.textContent = `Correct:${correct},`;
        
                const misplacedSpan = document.createElement("span");
                misplacedSpan.classList.add("misplaced");
                misplacedSpan.textContent = `Misplaced:${misplaced}`;
        
              
                currentColors.forEach((color) => {
                    const gussedColors = document.createElement("div");
                    gussedColors.style.width = "25px";
                    gussedColors.style.height = "25px";
                    gussedColors.style.borderRadius = "50%";
                    gussedColors.style.backgroundColor = color;
                    showColors.append(gussedColors);
                });
        
                showText.append(correctSpan, misplacedSpan);
                gussInnerContainer.append(showColors, showText);
                guessesHistory.append(gussInnerContainer);
        
               
                currentColors = [];
                currentGuesses.innerHTML = ``;
            }
        
            if (chanceNumber === 0) {
                modalTitle.textContent = "Game over";
                modalText.textContent = "The correct colors are :";
                textJok.textContent = "You had one job... and still. 😭";
        
                password.forEach((color) => {
                    const ball = document.createElement("div");
                    ball.style.width = "25px";
                    ball.style.height = "25px";
                    ball.style.borderRadius = "50%";
                    ball.style.backgroundColor = color;
                    keyAnswer.append(ball);
                });
        
                modal.show();
            }
        });
          
        
        
            }
    
    
    








// modal btn starts


btnHome.addEventListener("click",(e)=>{


    window.location.href = "../index.html";

      })

   
// modal ends starts

   




function game() {
    if (level==="Easy (6 colors)") {
    easy();
    return
    
    }else if(level==="Medium (8 colors)"){
        medium();
        return
    
    }else if(level==="Hard (10 colors)"){
        
        hard();
        return
    
        }
    }

    game();















































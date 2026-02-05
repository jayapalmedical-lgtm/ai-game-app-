/* SECTION SWITCH */
function showSection(id) {
    document.querySelectorAll('.game').forEach(g => g.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

/* TIC TAC TOE */
let ttt = Array(9).fill("");

function drawTTT() {
    const b = document.getElementById("ttt-board");
    b.innerHTML = "";
    ttt.forEach((v,i)=>{
        let d=document.createElement("div");
        d.className="cell";
        d.textContent=v;
        d.onclick=()=>moveTTT(i);
        b.appendChild(d);
    });
}

function moveTTT(i){
    if(ttt[i]!="") return;
    ttt[i]="X";
    if(checkTTT("X")) return;
    let empty=ttt.map((v,i)=>v==""?i:null).filter(v=>v!=null);
    if(empty.length==0) return;
    ttt[empty[Math.floor(Math.random()*empty.length)]]="O";
    checkTTT("O");
    drawTTT();
}

function checkTTT(p){
    let w=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let a of w){
        if(a.every(i=>ttt[i]==p)){
            alert(p+" wins!");
            resetTicTacToe();
            return true;
        }
    }
    return false;
}

function resetTicTacToe(){
    ttt=Array(9).fill("");
    drawTTT();
}

drawTTT();

/* QUIZ */
let qs=[
    ["7×8","56"],
    ["Capital of India","New Delhi"],
    ["H2O is","Water"]
];
let qi=0;
document.getElementById("question").textContent=qs[qi][0];

function checkQuiz(){
    let a=document.getElementById("answer").value;
    document.getElementById("quizResult").textContent =
        a.toLowerCase()==qs[qi][1].toLowerCase() ? "Correct!" : "Wrong!";
    qi=(qi+1)%qs.length;
    document.getElementById("question").textContent=qs[qi][0];
    document.getElementById("answer").value="";
}

/* FIND MY NUMBER */
let secret=Math.floor(Math.random()*100)+1;

function checkGuess(){
    let g=document.getElementById("guess").value;
    document.getElementById("numResult").textContent =
        g==secret?"Correct!":g<secret?"Too Low":"Too High";
}

/* CHESS (BASIC) */
let chess=[
["♜","♞","♝","♛","♚","♝","♞","♜"],
["♟","♟","♟","♟","♟","♟","♟","♟"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["♙","♙","♙","♙","♙","♙","♙","♙"],
["♖","♘","♗","♕","♔","♗","♘","♖"]
];

function drawChess(){
    let b=document.getElementById("chess-board");
    b.innerHTML="";
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let d=document.createElement("div");
            d.className="chess "+((i+j)%2==0?"white":"black");
            d.textContent=chess[i][j];
            b.appendChild(d);
        }
    }
}

function resetChess(){ drawChess(); }
resetChess();

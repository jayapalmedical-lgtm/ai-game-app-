/* SECTION SWITCH */
function showSection(id) {
    document.querySelectorAll('.game').forEach(g => g.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// ---------------- Tic-Tac-Toe (HARD AI) ----------------
let tttBoard = ["", "", "", "", "", "", "", "", ""];
let human = "X";
let ai = "O";

function drawTicTacToe() {
    const boardDiv = document.getElementById("ttt-board");
    boardDiv.innerHTML = "";
    tttBoard.forEach((cell, i) => {
        const div = document.createElement("div");
        div.className = "cell";
        div.textContent = cell;
        div.onclick = () => humanMove(i);
        boardDiv.appendChild(div);
    });
}

function humanMove(i) {
    if (tttBoard[i] === "") {
        tttBoard[i] = human;
        if (!checkTTTWinner()) {
            aiMoveHard();
        }
        drawTicTacToe();
    }
}

function aiMoveHard() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (tttBoard[i] === "") {
            tttBoard[i] = ai;
            let score = minimax(tttBoard, 0, false);
            tttBoard[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    tttBoard[move] = ai;
}

function minimax(board, depth, isMax) {
    let result = checkWinnerMini();
    if (result !== null) {
        return result === ai ? 1 : result === human ? -1 : 0;
    }

    if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = ai;
                best = Math.max(best, minimax(board, depth + 1, false));
                board[i] = "";
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = human;
                best = Math.min(best, minimax(board, depth + 1, true));
                board[i] = "";
            }
        }
        return best;
    }
}

function checkWinnerMini() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of wins) {
        if (tttBoard[a] && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c]) {
            return tttBoard[a];
        }
    }
    if (!tttBoard.includes("")) return "draw";
    return null;
}

function checkTTTWinner() {
    let r = checkWinnerMini();
    if (r) {
        alert(r === "draw" ? "Draw!" : r + " wins!");
        tttBoard = ["","","","","","","","",""];
        drawTicTacToe();
        return true;
    }
    return false;
}

drawTicTacToe();

// ---------------- HARD Quiz ----------------
const questions = [
  { q: "If x² = 144, what is x?", a: "12 or -12" },
  { q: "Which gas turns limewater milky?", a: "Carbon dioxide" },
  { q: "The value of (−3)³ is?", a: "-27" },
  { q: "Which organelle is called the powerhouse of the cell?", a: "Mitochondria" },
  { q: "What is the SI unit of force?", a: "Newton" },
  { q: "If 3x − 7 = 11, find x", a: "6" },
  { q: "Which metal is liquid at room temperature?", a: "Mercury" },
  { q: "Find the square root of 0.0081", a: "0.09" }
];

let currentQ = 0;

function checkQuizAnswer() {
    let input = document.getElementById("quiz-answer").value.trim().toLowerCase();
    let correct = questions[currentQ].a.toLowerCase();
    let feedback = document.getElementById("quiz-feedback");

    if (input === correct) {
        feedback.textContent = "✅ Correct";
    } else {
        feedback.textContent = "❌ Wrong | Answer: " + questions[currentQ].a;
    }

    currentQ = (currentQ + 1) % questions.length;
    document.getElementById("quiz-question").textContent = questions[currentQ].q;
    document.getElementById("quiz-answer").value = "";
}

document.getElementById("quiz-question").textContent = questions[currentQ].q;
/* FIND MY NUMBER */
let secret=Math.floor(Math.random()*100)+1;

function checkGuess(){
    let g=document.getElementById("guess").value;
    document.getElementById("numResult").textContent =
        g==secret?"Correct!":g<secret?"Too Low":"Too High";
}

// ================= CHESS GAME (SMART BUT BEATABLE AI) =================

const chessStart = [
 ["r","n","b","q","k","b","n","r"],
 ["p","p","p","p","p","p","p","p"],
 ["","","","","","","",""],
 ["","","","","","","",""],
 ["","","","","","","",""],
 ["","","","","","","",""],
 ["P","P","P","P","P","P","P","P"],
 ["R","N","B","Q","K","B","N","R"]
];

let board = JSON.parse(JSON.stringify(chessStart));
let selected = null;

function resetChess() {
    board = JSON.parse(JSON.stringify(chessStart));
    selected = null;
    drawChess();
}

function drawChess() {
    const el = document.getElementById("chess-board");
    el.innerHTML = "";

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const cell = document.createElement("div");
            cell.className = "chess-cell " + ((r + c) % 2 ? "chess-black" : "chess-white");
            cell.textContent = board[r][c];
            cell.onclick = () => chessClick(r, c);
            el.appendChild(cell);
        }
    }
}

function chessClick(r, c) {
    if (selected) {
        const [sr, sc] = selected;
        const piece = board[sr][sc];

        if (isValidMove(piece, sr, sc, r, c)) {
            board[r][c] = piece;
            board[sr][sc] = "";
            selected = null;
            drawChess();
            setTimeout(chessAI, 400);
        } else {
            selected = null;
        }
    } else if (board[r][c] && board[r][c] === board[r][c].toUpperCase()) {
        selected = [r, c];
    }
}

// -------- MOVE RULES --------
function isValidMove(p, sr, sc, r, c) {
    if (board[r][c] && board[r][c] === board[r][c].toUpperCase()) return false;

    const dr = r - sr;
    const dc = c - sc;

    switch (p) {
        case "P": return dr === -1 && dc === 0 && !board[r][c];
        case "R": return (dr === 0 || dc === 0);
        case "B": return Math.abs(dr) === Math.abs(dc);
        case "Q": return dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);
        case "N": return (Math.abs(dr) === 2 && Math.abs(dc) === 1) ||
                         (Math.abs(dr) === 1 && Math.abs(dc) === 2);
        case "K": return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;
    }
    return false;
}

// -------- AI (SMART BUT BEATABLE) --------
function chessAI() {
    let moves = [];

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece && piece === piece.toLowerCase()) {

                for (let nr = 0; nr < 8; nr++) {
                    for (let nc = 0; nc < 8; nc++) {
                        if (isValidAIMove(piece, r, c, nr, nc)) {
                            let score = 0;
                            if (board[nr][nc]) score += 5;
                            if ([3,4].includes(nr) && [3,4].includes(nc)) score += 2;

                            moves.push({ from:[r,c], to:[nr,nc], score });
                        }
                    }
                }
            }
        }
    }

    if (!moves.length) return;

    moves.sort((a,b)=>b.score-a.score);
    const best = moves.slice(0, 4);
    const move = best[Math.floor(Math.random()*best.length)];

    board[move.to[0]][move.to[1]] = board[move.from[0]][move.from[1]];
    board[move.from[0]][move.from[1]] = "";
    drawChess();
}

function isValidAIMove(p, sr, sc, r, c) {
    if (board[r][c] && board[r][c] === board[r][c].toLowerCase()) return false;

    const dr = r - sr;
    const dc = c - sc;

    switch (p) {
        case "p": return dr === 1 && dc === 0;
        case "r": return dr === 0 || dc === 0;
        case "b": return Math.abs(dr) === Math.abs(dc);
        case "q": return dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);
        case "n": return (Math.abs(dr) === 2 && Math.abs(dc) === 1) ||
                         (Math.abs(dr) === 1 && Math.abs(dc) === 2);
        case "k": return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;
    }
    return false;
}

resetChess();
resetChess();

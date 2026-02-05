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

// Initial board
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

// Reset game
function resetChess() {
    board = JSON.parse(JSON.stringify(chessStart));
    selected = null;
    drawChess();
}

// Draw board
function drawChess() {
    const el = document.getElementById("chess-board");
    el.innerHTML = "";

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let cell = document.createElement("div");
            cell.className = "chess-cell " + ((r + c) % 2 ? "chess-black" : "chess-white");
            cell.textContent = board[r][c];
            cell.onclick = () => chessClick(r, c);
            el.appendChild(cell);
        }
    }
}

// Player move
function chessClick(r, c) {
    if (selected) {
        let [sr, sc] = selected;
        let piece = board[sr][sc];

        if (piece === piece.toUpperCase()) {
            board[r][c] = piece;
            board[sr][sc] = "";
            selected = null;
            drawChess();
            setTimeout(chessAI, 300);
        }
    } else if (board[r][c] && board[r][c] === board[r][c].toUpperCase()) {
        selected = [r, c];
    }
}

// SMART BUT BEATABLE AI
function chessAI() {
    let moves = [];

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let piece = board[r][c];
            if (piece && piece === piece.toLowerCase()) {

                let directions = [[1,0],[-1,0],[0,1],[0,-1]];

                directions.forEach(d => {
                    let nr = r + d[0];
                    let nc = c + d[1];

                    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                        let target = board[nr][nc];
                        let score = 0;

                        // capture priority
                        if (target && target === target.toUpperCase()) score += 5;

                        // pawn forward
                        if (piece === "p" && nr > r) score += 2;

                        // center control
                        if ([3,4].includes(nr) && [3,4].includes(nc)) score += 1;

                        if (!target || target === target.toUpperCase()) {
                            moves.push({
                                from: [r, c],
                                to: [nr, nc],
                                score: score
                            });
                        }
                    }
                });
            }
        }
    }

    if (moves.length === 0) return;

    // sort best → worst
    moves.sort((a, b) => b.score - a.score);

    // choose from top few (beatable)
    let bestMoves = moves.slice(0, Math.min(3, moves.length));
    let move = bestMoves[Math.floor(Math.random() * bestMoves.length)];

    board[move.to[0]][move.to[1]] = board[move.from[0]][move.from[1]];
    board[move.from[0]][move.from[1]] = "";

    drawChess();
}

// Start game
resetChess();

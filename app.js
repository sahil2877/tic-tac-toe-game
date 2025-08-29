let cells = document.querySelectorAll(".cell");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // O starts

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
];

const resetGame = () => {
    turnO = true;
    enableCells();
    msgContainer.classList.add("hide");
};

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if(cell.innerText === ""){
            cell.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            checkWinner();
        }
    });
});

const disableCells = () => {
    cells.forEach(cell => cell.style.pointerEvents = "none");
};

const enableCells = () => {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.pointerEvents = "auto";
    });
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableCells();
};

const showTie = () => {
    msg.innerText = "🤝 It's a Tie!";
    msgContainer.classList.remove("hide");
    disableCells();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = cells[a].innerText;
        let val2 = cells[b].innerText;
        let val3 = cells[c].innerText;

        if(val1 && val1 === val2 && val2 === val3){
            showWinner(val1);
            return;
        }
    }

    // check tie
    let filled = [...cells].every(cell => cell.innerText !== "");
    if(filled){
        showTie();
    }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

/* Sources:
all chess piece images were downloaded from Uray M. János © 2009-2026 at https://greenchess.net/info.php?item=downloads
*/

/* ============================
   BOARD STATE & INITIALIZATION
   ============================ */

const initialBoard = {
    "sq-0": "rook-w", "sq-1": "knight-w", "sq-2": "bishop-w", "sq-3": "queen-w",
    "sq-4": "king-w", "sq-5": "bishop-w", "sq-6": "knight-w", "sq-7": "rook-w",
    "sq-8": "pawn-w", "sq-9": "pawn-w", "sq-10": "pawn-w", "sq-11": "pawn-w",
    "sq-12": "pawn-w", "sq-13": "pawn-w", "sq-14": "pawn-w", "sq-15": "pawn-w",

    "sq-16": "", "sq-17": "", "sq-18": "", "sq-19": "",
    "sq-20": "", "sq-21": "", "sq-22": "", "sq-23": "",
    "sq-24": "", "sq-25": "", "sq-26": "", "sq-27": "",
    "sq-28": "", "sq-29": "", "sq-30": "", "sq-31": "",
    "sq-32": "", "sq-33": "", "sq-34": "", "sq-35": "",
    "sq-36": "", "sq-37": "", "sq-38": "", "sq-39": "",
    "sq-40": "", "sq-41": "", "sq-42": "", "sq-43": "",
    "sq-44": "", "sq-45": "", "sq-46": "", "sq-47": "",

    "sq-48": "pawn-b", "sq-49": "pawn-b", "sq-50": "pawn-b", "sq-51": "pawn-b",
    "sq-52": "pawn-b", "sq-53": "pawn-b", "sq-54": "pawn-b", "sq-55": "pawn-b",
    "sq-56": "rook-b", "sq-57": "knight-b", "sq-58": "bishop-b", "sq-59": "queen-b",
    "sq-60": "king-b", "sq-61": "bishop-b", "sq-62": "knight-b", "sq-63": "rook-b",
};

let boardState = { ... initialBoard };

function reset_board() {
    boardState = { ... initialBoard };
}


/* ============================
   RENDERING
   ============================ */

function render_board() {
    Object.entries(boardState).forEach(([square, piece]) => {
        const el = document.getElementById(square);
        el.innerHTML = piece ? `<img src="./images/${piece}.svg" alt="${piece}">` : "";
    });
}


/* ============================
   MOVE GENERATION
   ============================ */

function get_possible_moves(boardState, selected_square) {
    const piece = boardState[selected_square];

    if (piece.startsWith("pawn")) return get_pawn_moves(boardState, selected_square);
    if (piece.startsWith("knight")) return get_knight_moves(boardState, selected_square);
    if (piece.startsWith("bishop")) return get_bishop_moves(boardState, selected_square);
    if (piece.startsWith("rook")) return get_rook_moves(boardState, selected_square);
    if (piece.startsWith("queen")) return get_queen_moves(boardState, selected_square);
    if (piece.startsWith("king")) return get_king_moves(boardState, selected_square);

    return [];
}

/* ============================
   PAWN MOVES
   ============================ */

function get_pawn_moves(boardState, selected_square) {
    const moves = [];
    const n = parseInt(selected_square.replace("sq-", ""));
    const piece = boardState[selected_square];

    const isWhite = piece === "pawn-w";
    const direction = isWhite ? 8 : -8;
    const startRank = isWhite ? 1 : 6;

    const oneStep = n + direction;
    const twoStep = n + direction * 2;

    // Forward move
    if (boardState["sq-" + oneStep] === "") {
        moves.push("sq-" + oneStep);

        // Double move
        if (Math.floor(n / 8) === startRank && boardState["sq-" + twoStep] === "") {
            moves.push("sq-" + twoStep);
        }
    }

    // Captures
    const captureOffsets = isWhite ? [7, 9] : [-7, -9];

    captureOffsets.forEach(offset => {
        const target = n + offset;
        if (target < 0 || target > 63) return;

        const targetPiece = boardState["sq-" + target];
        if (targetPiece !== "" && targetPiece[6] !== piece[6]) {
            moves.push("sq-" + target);
        }
    });

    return moves;
}

/* ============================
   KNIGHT MOVES
   ============================ */

function get_knight_moves(boardState, selected_square) {
    const moves = [];
    const n = parseInt(selected_square.replace("sq-", ""));
    const piece = boardState[selected_square];

    const offsets = [6, 10, 15, 17, -6, -10, -15, -17];

    offsets.forEach(offset => {
        const t = n + offset;
        if (t < 0 || t > 63) return;

        const targetPiece = boardState["sq-" + t];
        if (targetPiece === "" || targetPiece[6] !== piece[6]) {
            moves.push("sq-" + t);
        }
    });

    return moves;
}

/* ============================
   BISHOP MOVES
   ============================ */

function get_bishop_moves(boardState, selected_square) {
    const moves = [];
    const n = parseInt(selected_square.replace("sq-", ""));
    const piece = boardState[selected_square];

    const directions = [7, 9, -7, -9];

    directions.forEach(dir => {
        let t = n + dir;

        while (t >= 0 && t <= 63 && sameDiagonal(n, t)) {
            const sq = "sq-" + t;
            const targetPiece = boardState[sq];

            if (targetPiece === "") {
                moves.push(sq);
            } else {
                if (targetPiece[6] !== piece[6]) moves.push(sq);
                break;
            }

            t += dir;
        }
    });

    return moves;
}

function sameDiagonal(a, b) {
    const fileA = a % 8, rankA = Math.floor(a / 8);
    const fileB = b % 8, rankB = Math.floor(b / 8);
    return Math.abs(fileA - fileB) === Math.abs(rankA - rankB);
}

/* ============================
   ROOK MOVES
   ============================ */

function get_rook_moves(boardState, selected_square) {
    const moves = [];
    const n = parseInt(selected_square.replace("sq-", ""));
    const piece = boardState[selected_square];

    const directions = [1, -1, 8, -8];

    directions.forEach(dir => {
        let t = n + dir;

        while (t >= 0 && t <= 63 && sameFileOrRank(n, t, dir)) {
            const sq = "sq-" + t;
            const targetPiece = boardState[sq];

            if (targetPiece === "") {
                moves.push(sq);
            } else {
                if (targetPiece[6] !== piece[6]) moves.push(sq);
                break;
            }

            t += dir;
        }
    });

    return moves;
}

function sameFileOrRank(a, b, dir) {
    if (dir === 1 || dir === -1) {
        return Math.floor(a / 8) === Math.floor(b / 8);
    }
    return a % 8 === b % 8;
}

/* ============================
   QUEEN MOVES
   ============================ */

function get_queen_moves(boardState, selected_square) {
    return [
       ... get_rook_moves(boardState, selected_square),
       ... get_bishop_moves(boardState, selected_square)
    ];
}

/* ============================
   KING MOVES
   ============================ */

function get_king_moves(boardState, selected_square) {
    const moves = [];
    const castling = get_castling_moves(boardState, selected_square);

    // normal king moves
    const n = parseInt(selected_square.replace("sq-", ""));
    const piece = boardState[selected_square];
    const offsets = [1, -1, 8, -8, 7, -7, 9, -9];

    offsets.forEach(offset => {
        const t = n + offset;
        if (t < 0 || t > 63) return;

        const sq = "sq-" + t;
        const targetPiece = boardState[sq];

        if (targetPiece === "" || targetPiece[6] !== piece[6]) {
            moves.push(sq);
        }
    });

    // CASTLING DESTINATIONS AS STRINGS
    castling.forEach(c => moves.push(c.king_to));

    return moves;
}


/* ===========================
    Castles
    ========================== */

function get_castling_moves(boardState, selected_square) {
    const moves = [];

    // White king on e1 (sq-4)
    if (selected_square === "sq-4" && boardState["sq-4"] === "king-w") {

        // White kingside castling: e1 → g1 (sq-4 → sq-6)
        if (
            boardState["sq-7"] === "rook-w" &&   // rook on h1
            boardState["sq-5"] === "" &&         // f1 empty
            boardState["sq-6"] === ""            // g1 empty
        ) {
            moves.push({
                type: "castle",
                side: "white-kingside",
                king_from: "sq-4",
                king_to: "sq-6",
                rook_from: "sq-7",
                rook_to: "sq-5"
            });
        }

        // White queenside castling: e1 → c1 (sq-4 → sq-2)
        if (
            boardState["sq-0"] === "rook-w" &&   // rook on a1
            boardState["sq-1"] === "" &&         // b1 empty
            boardState["sq-2"] === "" &&         // c1 empty
            boardState["sq-3"] === ""            // d1 empty
        ) {
            moves.push({
                type: "castle",
                side: "white-queenside",
                king_from: "sq-4",
                king_to: "sq-2",
                rook_from: "sq-0",
                rook_to: "sq-3"
            });
        }
    } else if (selected_square === "sq-60" && boardState["sq-60"] === "king-b") {
        if (
            boardState["sq-63"] === "rook-b" && // rook on h8
            boardState["sq-62"] === "" && // g8 empty
            boardState["sq-61"] === "" // f8 empty
        ) {
            moves.push({
                type: "castle",
                side: "black-kingside",
                king_from: "sq-60",
                king_to: "sq-62",
                rook_from: "sq-63",
                rook_to: "sq-61"
            });
        } if (
            boardState["sq-59"] === "" && // d8 empty
            boardState["sq-58"] === "" && // c8 empty
            boardState["sq-57"] === "" && // b8 empty
            boardState["sq-56"] === "rook-b" // a8 has rook 
        ) {
            moves.push({
                type: "castle",
                side: "black-queenside",
                king_from: "sq-60",
                king_to: "sq-58",
                rook_from: "sq-56",
                rook_to: "sq-59"
            });
        }

    }
    return moves;
}

function apply_castling(move, boardState) {
    // Determine piece colors from the move
    const kingPiece = move.side.startsWith("white") ? "king-w" : "king-b";
    const rookPiece = move.side.startsWith("white") ? "rook-w" : "rook-b";

    // Clear original squares
    boardState[move.king_from] = "";
    boardState[move.rook_from] = "";

    // Place pieces in new squares
    boardState[move.king_to] = kingPiece;
    boardState[move.rook_to] = rookPiece;
}





/* ============================
   UI INTERACTION
   ============================ */

document.getElementById("start-game").addEventListener("click", () => {
    render_board();
});

document.getElementById("end-game").addEventListener("click", () => {
    reset_board();
    render_board();
});

document.getElementById("white-pieces").addEventListener("click", () => {
    document.getElementById("board-wrapper").classList.add("flipped-board");
});

document.getElementById("black-pieces").addEventListener("click", () => {
    document.getElementById("board-wrapper").classList.remove("flipped-board");
});

let selected_square = null;
let selected_piece = null;
let possible_moves = [];

document.querySelectorAll("#chess-board td").forEach(square => {
    square.addEventListener("click", () => {
        const id = square.id;
        const piece = boardState[id];

        // FIRST CLICK
        if (!selected_square) {
            if (piece !== "") {
                selected_square = id;
                selected_piece = piece;

                possible_moves = get_possible_moves(boardState, selected_square);
                highlight_moves(possible_moves);
            }
            return;
        }

        // SECOND CLICK
        if (!possible_moves.includes(id)) {
            alert("Invalid move");
            return;
        }

        if (selected_piece.startsWith("king")) {

        // Check if the selected move is a castling move
        const castling_moves = get_castling_moves(boardState, selected_square);

        // If the user clicked a castling destination square
        const castling_move = castling_moves.find(m => m.king_to == id);

        if (castling_move) {
            apply_castling(castling_move, boardState);

            clear_highlights(possible_moves);
            selected_square = null;
            selected_piece = null;
            possible_moves = [];

            render_board();
            return;   
        }}
 
            // Normal move
            boardState[selected_square] = "";
            boardState[id] = selected_piece;
        


        // Clear highlights
        clear_highlights(possible_moves);

        // Reset selection
        selected_square = null;
        selected_piece = null;
        possible_moves = [];

        // Render human move
        render_board();

        // ============================
        // ENGINE MOVE INTEGRATION
        // ============================

        /* Commented out because it was a hasle tring to get it to work on the webpage.
         It does work locally though

        const fen = generateFEN(boardState);

        fetch("http://127.0.0.1:5000/get-move", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fen: fen })
        })

            .then(response => response.json())
            .then(data => {
                const engineMove = data.move;
                
                if (data.checkmate) {
                    alert("Checkmate!");
                    return;
                }

                if (!engineMove) return;

                const [from_sq, to_sq, captured_piece, promo_piece] = engineMove;

                const from = "sq-" + from_sq;
                const to = "sq-" + to_sq;

                // Get the moving piece BEFORE clearing the origin
                const movingPiece = boardState[from];

                // Update board state
                boardState[from] = "";
                boardState[to] = movingPiece;

                console.log("Engine move:", from, to);
                console.log("HTML element for from:", document.getElementById(from));
                console.log("HTML element for to:", document.getElementById(to));

                render_board();
            })

        */
});});

function highlight_moves(moves) {
    moves.forEach(sq => {
        const el = document.getElementById(sq);
        if (el) el.classList.add("possible-moves");
    });
}

function clear_highlights(moves) {
    moves.forEach(sq => {
        const el = document.getElementById(sq);
        if (el) el.classList.remove("possible-moves");
    });
}

/* ============================
   UTILITIES
   ============================ */

function get_row_and_column(square_id) {
    const square = document.getElementById(square_id);
    const row = square.parentElement.className.trim();
    const col = square.className.split(' ').find(c => c.startsWith('column-'));
    return { row, column: col };
}


/* ============================
    FEN STRING
    ===========================*/
function generateFEN(boardState) {
    const pieceToFen = {
        "pawn-w": "P", "pawn-b": "p",
        "knight-w": "N", "knight-b": "n",
        "bishop-w": "B", "bishop-b": "b",
        "rook-w": "R", "rook-b": "r",
        "queen-w": "Q", "queen-b": "q",
        "king-w": "K", "king-b": "k"
    };

    let fen = "";
    for (let rank = 7; rank >= 0; rank--) {
        let empty = 0;
        for (let file = 0; file < 8; file++) {
            const sqIndex = rank * 8 + file;
            const piece = boardState["sq-" + sqIndex];

            if (!piece) {
                empty++;
            } else {
                if (empty > 0) {
                    fen += empty;
                    empty = 0;
                }
                fen += pieceToFen[piece];
            }
        }
        if (empty > 0) fen += empty;
        if (rank > 0) fen += "/";
    }

    // Active color (always white for now)
    fen += " w";

    // Castling rights (none for now)
    fen += " -";

    // En passant (none)
    fen += " -";

    // Halfmove clock + fullmove number
    fen += " 0 1";

    return fen;
}


<template>
    <v-app>
        <div class="home">
            <div class="leftColumn">
                <MainSidebar />
                <img src="../assets/chess_wallpaper1.jpg" alt="" width="350" height="600"/>
            </div>
            <div class="rightColumn">
                <div>
                    <h2>Wybierz typ końcówek, który chcesz przećwiczyć</h2>

                    <el-tag type="success" v-for="e in endgameTypes" :key="e._id">
                        <button @click="loadPositions(e)"> {{ e.name }} </button>
                    </el-tag>
                </div>
                <div v-if="selectedEndgameType">
                    <h3>Zadania typu {{ selectedEndgameType.name }}</h3>
                    <div class="tag-container">
                        <el-tag type="success" v-for="p in endgamePositions" :key="p._id">
                            <button @click="trainPosition(p)"> {{ p.learningOrder }} </button>
                        </el-tag>
                    </div>
                </div>
                <div class="chessboard">
                    <div v-if="selectedEndgamePosition">
                        <h3>Zadanie {{ selectedEndgamePosition.learningOrder }}</h3>
                        <h3 v-if="positionToDraw"> Nie strać szansy na remis jeszcze przez: {{ movesCounter }} posunięć. </h3>
                        <h3 v-else>Wygraj pozycję.</h3>
                        <h3 v-if="gameOver" class="gameOverMsg"> {{ gameOverMsg }} </h3>
                    </div>

                    <div id="board1"></div>
                    
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
    import MainSidebar from "./MainSidebar.vue"
    import ChessBoard from "chessboardjs-vue3"
    import Chess from "chess.js"

    export default {
        name: "PlayAgainstComputer",
        components: {
            MainSidebar,
        },
        data() {
            return {
                endgameTypes: [],
                endgamePositions: [],
                selectedEndgameType: "",
                selectedEndgamePosition: "",
                board: null,
                movesCounter: 0,
                positionToDraw: false,
                currentBoardConfig: null,
                game: null,
                gameOver: false,
                gameOverMsg: "",
                moveFrom: "",
                moveTo: ""
            };
        },
        methods: {
            async getData() {
                try {
                    let response = await fetch("http://localhost:9000/api/endgameTypes", {
                        method: "POST",
                    });
                    this.endgameTypes = await response.json();
                } catch (error) {
                    console.log(error);
                }
            },
            async loadPositions(e) {
                this.selectedEndgameType = e;
                this.selectedEndgamePosition = "";

                if (this.board != null) {
                    this.board.destroy();
                    this.board = null;
                }

                try {
                    let response = await fetch("http://localhost:9000/api/positions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            symbol: this.selectedEndgameType.symbol
                        })
                    });

                    this.endgamePositions = await response.json();
                } catch (error) {
                    console.log(error);
                }
            },
            async getAnalys(fen) {
                try {
                    let response = await fetch("http://localhost:9000/api/analysePosition", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            fen: fen
                        })
                    });

                    let res = await response.json();
                    return res;
                } catch (error) {
                    console.log(error);
                }
                
            },
            async trainPosition(p) {
                this.selectedEndgamePosition = p;
                this.gameOver = false;
                
                if (this.selectedEndgamePosition.type == "draw") {
                    this.movesCounter = 10;
                    this.positionToDraw = true;
                } else {
                    this.movesCounter = 0;
                    this.positionToDraw = false;
                }

                var boardConfig = {
                    position: this.selectedEndgamePosition.fen,
                    imagesPath: "/pieces_images/wikipedia",
                    draggable: true,
                    onChange: this.onChange,
                    orientation: (this.selectedEndgamePosition.fen.includes(" w ")) ? "white" : "black",
                    onDragStart: this.onDragStart,
                    onDrop: this.onDrop,
                    onSnapEnd: this.onSnapEnd,
                }

                this.currentBoardConfig = boardConfig;
                this.board = ChessBoard("board1", boardConfig);
                this.game = new Chess(p.fen);
            },
            async onChange(oldPos, newPos) {
                this.game.move({from: moveFrom, to: moveTo, promotion: "q"})

                if (this.game.game_over()) {
                    this.GameOver(ChessBoard.objToFen(newPos), 0);
                    return;
                }

                let analys = await this.getAnalys(this.game.fen());

                var moveFrom = analys.moves[0].uci[0].slice(0,2);
                var moveTo = analys.moves[0].uci[0].slice(-2);

                // make move
                this.game.move({from: moveFrom, to: moveTo, promotion: "q"});
                this.currentBoardConfig.position = this.game.fen();
                this.board.destroy();
                this.board = ChessBoard("board1", this.currentBoardConfig);

                if (this.positionToDraw) {
                    this.movesCounter -= 1;
                }

                var score = analys.moves[0].score.value;

                if (((this.positionToDraw) && (this.movesCounter == 0))
                    || ((this.positionToDraw) && (Math.abs(score) > 200))
                    || (this.game.game_over()) ) {
                        this.GameOver(this.game.fen(), score);
                }
            },
            onDragStart(source, piece) {
                if (this.game.game_over()) {
                    return false;
                }

                if ((this.board.orientation() === "white" && piece.includes("b")) ||
                    (this.board.orientation() === "black" && piece.includes("w"))) {
                        return false;
                } else {
                    return true;
                }
            },
            onDrop (source, target) {
                var move = this.game.move({
                    from: source,
                    to: target,
                    promotion: "q"
                });

                if (move == null) {
                    return "snapback";
                } else {
                    this.moveFrom = move.from;
                    this.moveTo = move.to;
                }
            },
            onSnapEnd () {
                this.board.position(this.game.fen())
            },
            async GameOver(fen, score) {
                this.currentBoardConfig.position = fen;
                this.board.destroy();
                this.board = ChessBoard("board1", this.currentBoardConfig);
                this.gameOver = true;

                if (this.positionToDraw) {
                    if (Math.abs(score) > 200) {
                        this.gameOverMsg = "Niestety. Nie udało się utrzymać remisu."
                    } else {
                        this.gameOverMsg = "Gratulacje. Udało się utrzymać remis."
                    }
                } else {
                    if (this.game.in_draw()) {
                        this.gameOverMsg = "Porażka. Nie udało się wygrać."
                    } else {
                        this.gameOverMsg = "Gratulacje. Udało się zwyciężyć."
                    }
                }
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style>
    @import "./styles/GeneralStyles.css";
</style>
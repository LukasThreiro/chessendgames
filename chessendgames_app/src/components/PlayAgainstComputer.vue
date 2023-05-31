<template>
    <v-app>
        <div class="heading">
            <img class="headingImg" src="../assets/cbw4.png" alt="Heading">
        </div>
        <div class="home">
            <div class="leftColumn">
                <MainSidebar />
                <img src="../assets/chess_wallpaper1.jpg" alt="" width="350" height="600"/>
            </div>
            <div class="rightColumnv2">
                <div class="positionList">
                    <div>
                        <h2>Wybierz typ końcówek, który chcesz przećwiczyć</h2>

                        <el-tag class="positionList" type="success" v-for="e in endgameTypes" :key="e._id">
                            <button @click="loadPositions(e)" class="endgameTypeButton"> {{ e.name }} </button>
                        </el-tag>
                    </div>
                    <div v-if="selectedEndgameType">
                        <h3>Zadania typu {{ selectedEndgameType.name }}</h3>
                        <div>
                            <el-tag type="success" class="positionList" v-for="p in endgamePositions" :key="p._id">
                                <button @click="trainPosition(p)" class="positionButton"> Zadanie {{ " " + p.learningOrder }} </button>
                            </el-tag>
                        </div>
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

                    <div v-if="selectedEndgamePosition" class="underBoard">
                        <p v-if="positionScoreFlag">Ocena pozycji: {{ positionScore }}</p>

                        <p v-if="game.fen()">FEN: {{ game.fen() }}</p>

                        <div v-if="gameOver">
                            <button @click="trainPosition(selectedEndgamePosition)">Spróbuj ponownie</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
    import MainSidebar from "./MainSidebar.vue"
    import ChessBoard from "chessboardjs-vue3"
    import Chess from "chess.js"
    import generalCfg from "../../generalCfg.js"

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
                moveTo: "",
                positionScore: "",
                positionScoreFlag: false,
            };
        },
        methods: {
            async getData() {
                try {
                    let response = await fetch(generalCfg.backendUrl + "/endgameTypes", {
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
                this.positionScore = "";
                this.positionScoreFlag = false;

                if (this.board != null) {
                    this.board.destroy();
                    this.board = null;
                }

                try {
                    let response = await fetch(generalCfg.backendUrl + "/positions", {
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
                    let response = await fetch(generalCfg.backendUrl + "/analysePosition", {
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
                this.positionScore = "";
                this.positionScoreFlag = false;
                
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

                this.positionScore = analys.moves[0].score.value;
                this.positionScoreFlag = true;

                if (((this.positionToDraw) && (this.movesCounter == 0))
                    || ((this.positionToDraw) && (Math.abs(this.positionScore) > 200))
                    || (this.game.game_over()) ) {
                        this.GameOver(this.game.fen());
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
            async GameOver(fen) {
                this.currentBoardConfig.position = fen;
                this.board.destroy();
                this.board = ChessBoard("board1", this.currentBoardConfig);
                this.gameOver = true;

                if (this.positionToDraw) {
                    if (Math.abs(this.positionScore) > 200) {
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
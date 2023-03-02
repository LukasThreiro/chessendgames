import {chessAnalysisApi, PROVIDERS} from "chess-analysis-api";

class Stockfish {
	async analysePosition(fen, depth, multipv) {
		var result = chessAnalysisApi.getAnalysis({
			fen: fen,
			depth: depth,
			multipv: multipv,
			excludes: [
				PROVIDERS.LICHESS_BOOK,
				PROVIDERS.LICHESS_CLOUD_EVAL
			]
		});

		return result;
	};
}

export default Stockfish;
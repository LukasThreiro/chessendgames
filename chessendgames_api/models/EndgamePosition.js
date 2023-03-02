import mongoose from"mongoose"

const Schema = mongoose.Schema;

var endgamePositionSchema = new Schema({
	symbol: {
		type: String
	},
	fen: {
		type: String
	},
	learningOrder: {
		type: Number
	},
	type: {
		type: String
	}
}, {
	collection: "Positions"
});

var EndgamePosition = mongoose.model("EndgamePosition", endgamePositionSchema);

export default EndgamePosition;
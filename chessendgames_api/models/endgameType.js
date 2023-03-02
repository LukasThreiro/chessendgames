import mongoose from"mongoose"

const Schema = mongoose.Schema;

var endgameTypeSchema = new Schema({
	symbol: {
		type: String
	},
	name: {
		type: String
	},
	learningOrder: {
		type: Number
	},
	desc: {
		type: String
	}
}, {
	collection: "EndgamesTypes"
});

var EndgameType = mongoose.model("EndgameType", endgameTypeSchema);

export default EndgameType;
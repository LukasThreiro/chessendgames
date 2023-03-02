import EndgameType from "../models/endgameType.js"
import EndgamePosition from "../models/endgamePosition.js"

class DBConnection {
	async getEndgameTypes() {
		var response = await EndgameType.find();
		return response;
	};

	async getPositions(symbol) {
		var response = await EndgamePosition.find({"symbol": symbol});
		return response;
	};
};

export default DBConnection;
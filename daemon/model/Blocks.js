const mongoose = require("mongoose");

// Block mmodel
const BlockSchema = new mongoose.Schema({
    blockNumber: {
        type: Number,
        unique: true
    },
    baseFeePerGas:{
        type: String
    },
    blockScore: {
        type: String
    },
    extraData: {
        type: String
    },
    gasUsed: {
        type: String
    },
    governanceData: {
        type: String
    },
    hash: {
        type: String
    },
    logsBloom: {
        type: String
    },
    parentHash: {
        type: String
    },
    receiptsRoot: {
        type: String
    },
    reward: {
        type: String
    },
    stateRoot: {
        type: String
    },
    timestamp: {
        type: String
    },
    timestampFoS: {
        type: String
    },
    transactionsRoot: {
        type: String
    }   
});

module.exports = mongoose.model("Blocks", BlockSchema);

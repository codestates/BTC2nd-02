const Caver = require('caver-js-ext-kas');
require('dotenv').config();

const { accessKeyId, secretAccessKey} = process.env;
const caver = new Caver();

caver.initKASAPI(8217, accessKeyId, secretAccessKey);

const BlockModel = require("./model/Blocks");

exports.getBlockNumber = async () => {
    const blockNumber = await caver.rpc.klay.getBlockNumber();
    return parseInt(blockNumber).toString(10);
};

exports.getSavedLatestBlockNumber = async () => {
    const savedBlockNumber = await BlockModel.findOne().sort({blockNumber: -1})
    return savedBlockNumber.blockNumber;
}

exports.getBlockNumber = async () => {
    const blockNumber = await caver.rpc.klay.getBlockNumber();
    return parseInt(blockNumber).toString(10);
};

exports.saveBlockData = async (blockNumber) => {
    await caver.rpc.klay.getBlockByNumber(blockNumber).then(data => {
        const {
            baseFeePerGas,
            blockScore, 
            extraData,
            gasUsed,
            governanceData,
            hash,
            logsBloom,
            parentHash,
            receiptsRoot,
            reward,
            stateRoot,
            timestamp,
            timestampFoS,
            transactionsRoot } = data
        
        BlockModel.findOneAndUpdate({blockNumber: parseInt(blockNumber).toString(10)}, {
                baseFeePerGas: baseFeePerGas,
                blockScore: blockScore, 
                extraData: extraData,
                gasUsed: gasUsed,
                governanceData: governanceData,
                hash: hash,
                logsBloom: logsBloom,
                parentHash: parentHash,
                receiptsRoot: receiptsRoot,
                reward: reward,
                stateRoot: stateRoot,
                timestamp: timestamp,
                timestampFoS: timestampFoS,
                transactionsRoot: transactionsRoot
            
        }, {upsert: true}).exec();  
        console.log("Save blockdata blockNumber: " + blockNumber)
    });
}
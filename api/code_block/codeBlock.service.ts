// Internal Dependencies
import { CodeBlock } from "../../interfaces/CodeBlock.interface"
const logger = require('../../services/logger.service')
const dbService = require('../../services/database.service')

// External Dependencies
const ObjectId = require('mongodb').ObjectId
import * as dotenv from "dotenv"

dotenv.config()

async function query() {
    logger.debug(`codeBlock.service - getting code blocks`)
    try {
        const codeBlockCollection = await dbService.getCollection(process.env.DB_COLLECTION_NAME)
        const codeBlocks: CodeBlock[] = await codeBlockCollection.find().toArray()
        return codeBlocks
    } catch (err) {
        logger.error(`Cannot find code blocks `, err)
        throw err
    }
}
// const codeBlockToAdd = {
//     title: 'Function creation',
//     code: `
//         function multiplyNumbers(num1, num2) {
//             let product = num1 + num2;
//             return product;
//         }
//         console.log(multiplyNumbers(5, 10));
      
//     `
// }
// add(codeBlockToAdd)
async function add(codeBlockToAdd: CodeBlock) {
    try {
        const codeBlockCollection = await dbService.getCollection(process.env.DB_COLLECTION_NAME)
        const mongoRes: any = await codeBlockCollection.insertOne(codeBlockToAdd)
        
        codeBlockToAdd._id = mongoRes.insertedId.toString()
        return codeBlockToAdd
    } catch (err) {
        logger.error('Cannot add code block', err)
        throw err
    }
    
}

async function update(codeBlockToUpdate: CodeBlock) {
    try {
        // peek only updatable properties
        const codeBlockToSave = {
            _id: new ObjectId(codeBlockToUpdate._id), // making the codeBlock id suit for mongo
            title: codeBlockToUpdate.title,
            code: codeBlockToUpdate.code,
        } as CodeBlock
        
        const codeBlockCollection = await dbService.getCollection(process.env.DB_COLLECTION_NAME)
        await codeBlockCollection.updateOne({ _id: codeBlockToSave._id }, { $set: codeBlockToSave })
        
        return codeBlockToUpdate
    } catch (err) {
        logger.error(`Cannot update code block`, err)
        throw err
    }
}

async function remove(codeBlockId: string) {
    try {
        const codeBlockMongoId = new ObjectId(codeBlockId)
        const codeBlockCollection = await dbService.getCollection(process.env.DB_COLLECTION_NAME)

        await codeBlockCollection.deleteOne({ _id: (codeBlockMongoId) })

    } catch (err) {
        logger.error(`Cannot remove code block`, err)
        throw err
    }
}


module.exports = {
    query,
    add,
    update,
    remove,
}

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const dbService = require('../../services/database.service');
// External Dependencies
const ObjectId = require('mongodb').ObjectId;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// codeBlocks to manually insert to DB
const codeBlocks = [
    {
        title: 'Async case',
        code: `
const ans = await getYesNoAns()
console.log(ans)

function getYesNoAns() {
    const YES_NO_API_URL = 'https://yesno.wtf/api'
    return fetch(YES_NO_API_URL)
        .then(res => res.json())
}`
    },
    {
        title: 'Object creation',
        code: `
let person = {
    name: "John Doe",
    age: 25,
    address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
    }
};
console.log(person.street);`
    },
    {
        title: 'Function creation',
        code: `
function multiplyNumbers(num1, num2) {
    let product = num1 + num2;
    return product;
}
console.log(multiplyNumbers(5, 10));`
    },
];
// codeBlocks.forEach(codeBlock => add(codeBlock))
function query() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug(`codeBlock.service - getting code blocks`);
        try {
            const codeBlockCollection = yield dbService.getCollection(process.env.DB_COLLECTION_NAME);
            const codeBlocks = yield codeBlockCollection.find().toArray();
            return codeBlocks;
        }
        catch (err) {
            logger.error(`Cannot find code blocks `, err);
            throw err;
        }
    });
}
const codeBlockToAdd = {
    title: 'Function creation',
    code: `function multiplyNumbers(num1, num2) {
    let product = num1 + num2;
    return product;
}
console.log(multiplyNumbers(5, 10));`
};
add(codeBlockToAdd);
function add(codeBlockToAdd) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeBlockCollection = yield dbService.getCollection(process.env.DB_COLLECTION_NAME);
            const mongoRes = yield codeBlockCollection.insertOne(codeBlockToAdd);
            codeBlockToAdd._id = mongoRes.insertedId.toString();
            return codeBlockToAdd;
        }
        catch (err) {
            logger.error('Cannot add code block', err);
            throw err;
        }
    });
}
function update(codeBlockToUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // peek only updatable properties
            const codeBlockToSave = {
                _id: new ObjectId(codeBlockToUpdate._id),
                title: codeBlockToUpdate.title,
                code: codeBlockToUpdate.code,
            };
            const codeBlockCollection = yield dbService.getCollection(process.env.DB_COLLECTION_NAME);
            yield codeBlockCollection.updateOne({ _id: codeBlockToSave._id }, { $set: codeBlockToSave });
            return codeBlockToUpdate;
        }
        catch (err) {
            logger.error(`Cannot update code block`, err);
            throw err;
        }
    });
}
function remove(codeBlockId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeBlockMongoId = new ObjectId(codeBlockId);
            const codeBlockCollection = yield dbService.getCollection(process.env.DB_COLLECTION_NAME);
            yield codeBlockCollection.deleteOne({ _id: (codeBlockMongoId) });
        }
        catch (err) {
            logger.error(`Cannot remove code block`, err);
            throw err;
        }
    });
}
module.exports = {
    query,
    add,
    update,
    remove,
};

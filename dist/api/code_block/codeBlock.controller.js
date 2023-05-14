"use strict";
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
// Internal Dependencies
const codeBlockService = require('./codeBlock.service');
const logger = require('../../services/logger.service');
function getCodeBlocks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeBlocks = yield codeBlockService.query();
            res.send(codeBlocks);
        }
        catch (err) {
            logger.error('Failed to get code blocks ' + err);
            res.status(500).send({ err: 'Failed to get code blocks' });
        }
    });
}
function addCodeBlock(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeBlockToAdd = req.body;
            const addCodeBlock = yield codeBlockService.add(codeBlockToAdd);
            logger.info('Code block added: ', addCodeBlock._id);
            res.send(addCodeBlock);
        }
        catch (err) {
            logger.error('Failed to add code block ' + err);
            res.status(500).send({ err: 'Failed to add code block' });
        }
    });
}
function updateCodeBlock(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeBlockToUpdate = req.body;
            const updateCodeBlock = yield codeBlockService.update(codeBlockToUpdate);
            logger.info('Code block updated: ', updateCodeBlock._id);
            res.send(updateCodeBlock);
        }
        catch (err) {
            logger.error('Failed to update code block ' + err);
            res.status(500).send({ err: 'Failed to update code block' });
        }
    });
}
function removeCodeBlock(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codeBlockId = req.params.id;
            yield codeBlockService.remove(codeBlockId);
            logger.info('CodeBlock removed: ', codeBlockId);
            res.send({ msg: 'Code block deleted' });
        }
        catch (err) {
            logger.error('Failed to delete code block ' + err);
            res.status(500).send({ err: 'Failed to delete code block' });
        }
    });
}
module.exports = {
    getCodeBlocks,
    addCodeBlock,
    updateCodeBlock,
    removeCodeBlock,
};

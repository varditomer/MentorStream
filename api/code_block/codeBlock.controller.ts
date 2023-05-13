// Internal Dependencies
const codeBlockService = require('./codeBlock.service')
const logger = require('../../services/logger.service')

// External Dependencies
import { Request, Response } from 'express'
import { CodeBlock } from '../../interfaces/CodeBlock.interface'

async function getCodeBlocks(req: Request, res: Response) {
    try {
        const codeBlocks: CodeBlock[] = await codeBlockService.query()
        res.send(codeBlocks)
    } catch (err) {
        logger.error('Failed to get code blocks ' + err)
        res.status(500).send({ err: 'Failed to get code blocks' })
    }
}

async function addCodeBlock(req: Request, res: Response) {
    try {
        const codeBlockToAdd: CodeBlock = req.body
        const addCodeBlock: CodeBlock = await codeBlockService.add(codeBlockToAdd)

        logger.info('Code block added: ', addCodeBlock._id)

        res.send(addCodeBlock)
    } catch (err) {
        logger.error('Failed to add code block ' + err)
        res.status(500).send({ err: 'Failed to add code block' })
    }
}

async function updateCodeBlock(req: Request, res: Response) {
    try {
        const codeBlockToUpdate: CodeBlock = req.body
        console.log(`codeBlockToUpdate:`, codeBlockToUpdate)
        const updateCodeBlock: CodeBlock = await codeBlockService.update(codeBlockToUpdate)

        logger.info('Code block updated: ', updateCodeBlock._id)

        res.send(updateCodeBlock)
    } catch (err) {
        logger.error('Failed to update code block ' + err)
        res.status(500).send({ err: 'Failed to update code block' })
    }
}

async function removeCodeBlock(req: Request, res: Response) {
    try {
        const codeBlockId: string = req.params.id
        await codeBlockService.remove(codeBlockId)

        logger.info('CodeBlock removed: ', codeBlockId)

        res.send({ msg: 'Code block deleted' })
    } catch (err) {
        logger.error('Failed to delete code block ' + err)
        res.status(500).send({ err: 'Failed to delete code block' })
    }
}

module.exports = {
    getCodeBlocks,
    addCodeBlock,
    updateCodeBlock,
    removeCodeBlock,
}

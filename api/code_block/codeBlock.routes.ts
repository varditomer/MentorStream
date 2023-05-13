const express = require('express')
// const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const {getCodeBlocks, addCodeBlock, updateCodeBlock, removeCodeBlock} = require('./codeBlock.controller')

const router = express.Router()

router.get('/', getCodeBlocks)
router.post('/', addCodeBlock)
router.put('/', updateCodeBlock)
// router.put('/', requireAuth, updateCodeBlock)
router.delete('/:id', removeCodeBlock)

module.exports = router

// fixing `Cannot redeclare block-scoped variable 'express'` --> adding export {}
export { }
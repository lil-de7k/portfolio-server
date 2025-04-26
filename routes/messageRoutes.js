const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, deleteMessage } = require('../controllers/messageController');
const authenticateToken = require('../middleware/authenticate');

router.post('/', sendMessage); 
router.get('/', authenticateToken, getMessages);  
router.delete('/:id', authenticateToken, deleteMessage); 

module.exports = router;
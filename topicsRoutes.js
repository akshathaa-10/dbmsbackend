const express = require('express');
const router = express.Router();
const c = require('../controllers/topicController');

router.get('/with-papers', c.getTopicsWithPaperCount);
router.get('/', c.getTopics);
router.get('/:id', c.getTopicById);
router.post('/', c.addTopic);
router.put('/:id', c.updateTopic);
router.delete('/:id', c.deleteTopic);

module.exports = router;

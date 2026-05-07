const express = require('express');
const router = express.Router();
const c = require('../controllers/collaborationController');

router.get('/most-active/list', c.getMostActiveCollaborations);
router.get('/stats/general', c.getCollaborationsStatistics);
router.get('/', c.getCollaborations);
router.get('/:id', c.getCollaborationById);
router.post('/', c.addCollaboration);
router.put('/:id', c.updateCollaboration);
router.delete('/:id', c.deleteCollaboration);

module.exports = router;

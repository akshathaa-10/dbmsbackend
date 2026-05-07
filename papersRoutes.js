const express = require('express');
const router = express.Router();
const c = require('../controllers/paperController');

router.get('/search/title', c.searchPapers);
router.get('/with-authors', c.getPapersWithAuthors);
router.get('/stats/by-year', c.getPaperCountByYear);
router.get('/stats/general', c.getPapersStatistics);
router.get('/year/:year', c.getPapersByYear);
router.get('/', c.getPapers);
router.get('/:id', c.getPaperById);
router.post('/', c.addPaper);
router.put('/:id', c.updatePaper);
router.delete('/:id', c.deletePaper);

module.exports = router;

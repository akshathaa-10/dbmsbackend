const express = require('express');
const router = express.Router();
const c = require('../controllers/institutionController');

router.get('/search/name', c.searchInstitutions);
router.get('/with-researcher-count', c.getInstitutionsWithResearcherCount);
router.get('/top-researchers/list', c.getTopInstitutionsByResearchers);
router.get('/', c.getInstitutions);
router.get('/:id', c.getInstitutionById);
router.post('/', c.addInstitution);
router.put('/:id', c.updateInstitution);
router.delete('/:id', c.deleteInstitution);

module.exports = router;

const express = require('express');
const router = express.Router();
const c = require('../controllers/authorController');

router.get('/search/name', c.searchAuthors);
router.get('/with-institutions', c.getAuthorsWithInstitutions);
router.get('/institution/:institution_id', c.getAuthorsByInstitution);
router.get('/', c.getAuthors);
router.get('/:id', c.getAuthorById);
router.post('/', c.addAuthor);
router.put('/:id', c.updateAuthor);
router.delete('/:id', c.deleteAuthor);

module.exports = router;

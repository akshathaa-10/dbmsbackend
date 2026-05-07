const db = require('../db');

exports.getAuthors = (req, res) => {
    db.query('SELECT * FROM authors', (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.getAuthorById = (req, res) => {
    db.query('SELECT * FROM authors WHERE author_id = ?', [req.params.id], (err, result) => {
        if (err) return res.json(err);
        res.json(result[0] || {});
    });
};

exports.searchAuthors = (req, res) => {
    db.query('SELECT * FROM authors WHERE name LIKE ?', [`%${req.query.name}%`], (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.getAuthorsWithInstitutions = (req, res) => {
    db.query(
        `SELECT a.author_id AS id, a.name, a.email,
                i.name AS institution_name,
                COUNT(DISTINCT ap.paper_id) AS papers,
                COALESCE(SUM(p.citations), 0) AS citations
         FROM authors a
         LEFT JOIN author_institution ai ON a.author_id = ai.author_id
         LEFT JOIN institutions i ON ai.institution_id = i.institution_id
         LEFT JOIN author_paper ap ON a.author_id = ap.author_id
         LEFT JOIN papers p ON ap.paper_id = p.paper_id
         GROUP BY a.author_id, i.institution_id`,
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
};

exports.getAuthorsByInstitution = (req, res) => {
    db.query(
        `SELECT a.author_id AS id, a.name, a.email, i.name AS institution_name
         FROM authors a
         INNER JOIN author_institution ai ON a.author_id = ai.author_id
         INNER JOIN institutions i ON ai.institution_id = i.institution_id
         WHERE ai.institution_id = ?`,
        [req.params.institution_id],
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
};

exports.addAuthor = (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO authors (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) return res.json(err);
        res.json({ message: 'Author added', id: result.insertId });
    });
};

exports.updateAuthor = (req, res) => {
    const { name, email } = req.body;
    db.query('UPDATE authors SET name = ?, email = ? WHERE author_id = ?', [name, email, req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ message: 'Author updated' });
    });
};

exports.deleteAuthor = (req, res) => {
    db.query('DELETE FROM authors WHERE author_id = ?', [req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ message: 'Author deleted' });
    });
};

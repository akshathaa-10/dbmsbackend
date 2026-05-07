const db = require('../db');

exports.getInstitutions = (req, res) => {
    db.query('SELECT * FROM institutions', (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.getInstitutionById = (req, res) => {
    db.query('SELECT * FROM institutions WHERE institution_id = ?', [req.params.id], (err, result) => {
        if (err) return res.json(err);
        res.json(result[0] || {});
    });
};

exports.searchInstitutions = (req, res) => {
    db.query('SELECT * FROM institutions WHERE name LIKE ?', [`%${req.query.name}%`], (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.getInstitutionsWithResearcherCount = (req, res) => {
    db.query(
        `SELECT i.institution_id AS id, i.name,
                COUNT(ai.author_id) AS researcher_count
         FROM institutions i
         LEFT JOIN author_institution ai ON i.institution_id = ai.institution_id
         GROUP BY i.institution_id
         ORDER BY researcher_count DESC`,
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
};

exports.getTopInstitutionsByResearchers = (req, res) => {
    const limit = parseInt(req.query.limit) || 4;
    db.query(
        `SELECT i.institution_id AS id, i.name,
                COUNT(ai.author_id) AS researcher_count
         FROM institutions i
         LEFT JOIN author_institution ai ON i.institution_id = ai.institution_id
         GROUP BY i.institution_id
         ORDER BY researcher_count DESC
         LIMIT ?`,
        [limit],
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
};

exports.addInstitution = (req, res) => {
    db.query('INSERT INTO institutions (name) VALUES (?)', [req.body.name], (err, result) => {
        if (err) return res.json(err);
        res.json({ message: 'Institution added', id: result.insertId });
    });
};

exports.updateInstitution = (req, res) => {
    db.query('UPDATE institutions SET name = ? WHERE institution_id = ?', [req.body.name, req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ message: 'Institution updated' });
    });
};

exports.deleteInstitution = (req, res) => {
    db.query('DELETE FROM institutions WHERE institution_id = ?', [req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ message: 'Institution deleted' });
    });
};

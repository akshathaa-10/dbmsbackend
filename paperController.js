const db = require('../db');

exports.getPapers = (req, res) => {
    db.query('SELECT * FROM papers', (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.getPaperById = (req, res) => {
    db.query('SELECT * FROM papers WHERE paper_id = ?', [req.params.id], (err, result) => {
        if (err) return res.json(err);
        res.json(result[0] || {});
    });
};

exports.searchPapers = (req, res) => {
    db.query('SELECT * FROM papers WHERE title LIKE ?', [`%${req.query.title}%`], (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.getPapersByYear = (req, res) => {
    db.query('SELECT * FROM papers WHERE year = ?', [req.params.year], (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.getPapersWithAuthors = (req, res) => {
    db.query(
        `SELECT p.paper_id AS id, p.title, p.year, p.citations,
                GROUP_CONCAT(a.name SEPARATOR ', ') AS author_name
         FROM papers p
         LEFT JOIN author_paper ap ON p.paper_id = ap.paper_id
         LEFT JOIN authors a ON ap.author_id = a.author_id
         GROUP BY p.paper_id`,
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
};

exports.getPaperCountByYear = (req, res) => {
    db.query(
        'SELECT year, COUNT(*) as total_papers FROM papers GROUP BY year ORDER BY year ASC',
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
};

exports.getPapersStatistics = (req, res) => {
    db.query(
        `SELECT COUNT(*) as total_papers, SUM(citations) as total_citations,
                AVG(citations) as avg_citations, MAX(citations) as max_citations
         FROM papers`,
        (err, result) => {
            if (err) return res.json(err);
            res.json(result[0]);
        }
    );
};

exports.addPaper = (req, res) => {
    const { title, year, citations } = req.body;
    db.query('INSERT INTO papers (title, year, citations) VALUES (?, ?, ?)', [title, year, citations], (err, result) => {
        if (err) return res.json(err);
        res.json({ message: 'Paper added', id: result.insertId });
    });
};

exports.updatePaper = (req, res) => {
    const { title, year, citations } = req.body;
    db.query('UPDATE papers SET title = ?, year = ?, citations = ? WHERE paper_id = ?', [title, year, citations, req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ message: 'Paper updated' });
    });
};

exports.deletePaper = (req, res) => {
    db.query('DELETE FROM papers WHERE paper_id = ?', [req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ message: 'Paper deleted' });
    });
};

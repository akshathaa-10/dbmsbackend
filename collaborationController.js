const db = require('../db');

exports.getCollaborations = (req, res) => {
    db.query(
        `SELECT c.collaboration_id AS id, c.collaboration_count,
                a1.name AS author1_name, a2.name AS author2_name
         FROM collaborations c
         INNER JOIN authors a1 ON c.author1_id = a1.author_id
         INNER JOIN authors a2 ON c.author2_id = a2.author_id`,
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
};

exports.getCollaborationById = (req, res) => {
    db.query('SELECT * FROM collaborations WHERE collaboration_id = ?', [req.params.id], (err, result) => {
        if (err) return res.json(err);
        res.json(result[0] || {});
    });
};

exports.getMostActiveCollaborations = (req, res) => {
    const limit = parseInt(req.query.limit) || 8;
    db.query(
        `SELECT c.collaboration_id AS id, c.collaboration_count,
                a1.name AS author1_name, a2.name AS author2_name
         FROM collaborations c
         INNER JOIN authors a1 ON c.author1_id = a1.author_id
         INNER JOIN authors a2 ON c.author2_id = a2.author_id
         ORDER BY c.collaboration_count DESC LIMIT ?`,
        [limit],
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
};

exports.getCollaborationsStatistics = (req, res) => {
    db.query(
        `SELECT COUNT(*) as total_collaborations,
                SUM(collaboration_count) as total_collaboration_count,
                AVG(collaboration_count) as avg_collaboration_count,
                MAX(collaboration_count) as max_collaboration_count,
                MIN(collaboration_count) as min_collaboration_count
         FROM collaborations`,
        (err, result) => {
            if (err) return res.json(err);
            res.json(result[0]);
        }
    );
};

exports.addCollaboration = (req, res) => {
    const { author1_id, author2_id, collaboration_count } = req.body;
    db.query(
        'INSERT INTO collaborations (author1_id, author2_id, collaboration_count) VALUES (?, ?, ?)',
        [author1_id, author2_id, collaboration_count],
        (err, result) => {
            if (err) return res.json(err);
            res.json({ message: 'Collaboration added', id: result.insertId });
        }
    );
};

exports.updateCollaboration = (req, res) => {
    db.query(
        'UPDATE collaborations SET collaboration_count = ? WHERE collaboration_id = ?',
        [req.body.collaboration_count, req.params.id],
        (err) => {
            if (err) return res.json(err);
            res.json({ message: 'Collaboration updated' });
        }
    );
};

exports.deleteCollaboration = (req, res) => {
    db.query('DELETE FROM collaborations WHERE collaboration_id = ?', [req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ message: 'Collaboration deleted' });
    });
};

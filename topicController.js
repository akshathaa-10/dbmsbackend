const db = require('../db');

exports.getTopics = (req, res) => {
    db.query('SELECT * FROM topics', (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.getTopicById = (req, res) => {
    db.query('SELECT * FROM topics WHERE topic_id = ?', [req.params.id], (err, result) => {
        if (err) return res.json(err);
        res.json(result[0] || {});
    });
};

exports.getTopicsWithPaperCount = (req, res) => {
    db.query(
        `SELECT t.topic_id AS id, t.topic_name,
                COUNT(pt.paper_id) AS paper_count
         FROM topics t
         LEFT JOIN paper_topic pt ON t.topic_id = pt.topic_id
         GROUP BY t.topic_id
         ORDER BY paper_count DESC`,
        (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        }
    );
};

exports.addTopic = (req, res) => {
    db.query('INSERT INTO topics (topic_name) VALUES (?)', [req.body.topic_name], (err, result) => {
        if (err) return res.json(err);
        res.json({ message: 'Topic added', id: result.insertId });
    });
};

exports.updateTopic = (req, res) => {
    db.query('UPDATE topics SET topic_name = ? WHERE topic_id = ?', [req.body.topic_name, req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ message: 'Topic updated' });
    });
};

exports.deleteTopic = (req, res) => {
    db.query('DELETE FROM topics WHERE topic_id = ?', [req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ message: 'Topic deleted' });
    });
};

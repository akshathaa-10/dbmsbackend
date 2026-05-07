const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/authors', require('./routes/authorsRoutes'));
app.use('/institutions', require('./routes/institutionsRoutes'));
app.use('/papers', require('./routes/papersRoutes'));
app.use('/topics', require('./routes/topicsRoutes'));
app.use('/collaborations', require('./routes/collaborationsRoutes'));

app.get('/', (req, res) => {
    res.send('Research Hub Backend Running 🚀');
});

// Dashboard summary stats from real DB
app.get('/stats/dashboard', (req, res) => {
    const db = require('./db');
    const queries = [
        'SELECT COUNT(*) as total FROM authors',
        'SELECT COUNT(*) as total FROM papers',
        'SELECT COUNT(*) as total FROM institutions',
        'SELECT COUNT(*) as total FROM collaborations'
    ];
    Promise.all(queries.map(q => new Promise((resolve, reject) => {
        db.query(q, (err, result) => err ? reject(err) : resolve(result[0].total));
    })))
    .then(([authors, papers, institutions, collaborations]) => {
        res.json({ authors, papers, institutions, collaborations });
    })
    .catch(err => res.status(500).json(err));
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
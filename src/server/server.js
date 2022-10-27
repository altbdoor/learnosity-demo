const app = require('express')();
const path = require('path');

app.set('json spaces', 4);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/author/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'author.html'));
});

app.get('/player/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'player.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`express running on ${port}`);
});

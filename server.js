const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist/`));

app.all('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(PORT, function () {
	console.log(`Web-chat-js-app listening on port ${PORT}!`);
});

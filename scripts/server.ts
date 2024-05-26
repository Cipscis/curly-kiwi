import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(express.static('app'));

app.get('*', (request, response, next) => {
	// There's just one page, so redirect to it
	response.redirect('/');
});

app.listen(port, () => {});
console.log(`Listening on port ${port}`);

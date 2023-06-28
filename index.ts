import * as http from 'http';
import 'reflect-metadata';
import db from './src/utils/db';
import App from './src/app';

const port = 3080;

App.set('port', port);
const server = http.createServer(App);

db.open();

let serve = server.listen(port, () => {
	console.log('Server is listening on port', port);
});

server.on('listening', function (): void {
	const addr = serve.address();
	const bind =
		typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
});

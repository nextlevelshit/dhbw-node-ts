import debug from "debug";
import {App, shutdown, shutDownAndFail} from "./App";


const logger = debug("app:i:index");
const verbose = debug("app:v:index");

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

verbose("starting");

App.bootstrap()
	.then(() => {
		verbose("succesfully started");
	})
	.catch((e) => {
		logger(`failed to start: ${e}`);
		shutDownAndFail(e);
	});
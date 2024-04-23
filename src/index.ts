import debug from "debug";
import {App, shutdown, shutDownAndFail} from "./App";


const logger = debug("app:i:index");
const verbose = debug("app:v:index");

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

verbose("starting application");

App.bootstrap()
	.then(() => {
		verbose("succesfully started application");
	})
	.catch((e) => {
		logger(`failed to bootstrap application: ${e}`);
		shutDownAndFail(e);
	});
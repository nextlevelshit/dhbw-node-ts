import debug from "debug";
import {App, shutdown, shutDownAndFail, seedDataSource} from "./App";
import {isDevelopment} from "./config/constants";

const logger = debug("app:i:index");
const verbose = debug("app:v:index");

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

verbose("starting");

App.bootstrap()
	.then(async () => {
		verbose("succesfully started");
		if (isDevelopment) {
			await seedDataSource();
		}
	})
	.catch((e) => {
		logger("failed to start");
		verbose(e);
		shutDownAndFail(e);
	});

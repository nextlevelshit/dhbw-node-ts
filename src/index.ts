import "reflect-metadata";
import debug from "debug";
import {App, shutdown, failOnShutdown} from "./App";
import {TestController} from "./controller/TestController";

const logger = debug("app:i:index");
const verbose = debug("app:v:index");
const error = debug("app:e:index");

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

verbose("starting");

App.bootstrap()
	.then(async () => {
		verbose("succesfully started");

		App.attachRoutes(new TestController(), [
			{
				action: "create",
				method: "post",
				path: "/test",
			},
			{
				action: "getByName",
				method: "get",
				path: "/test/:name",
			},
			{
				action: "all",
				method: "get",
				path: "/test",
			},
			{
				action: "softDelete",
				method: "delete",
				path: "/test/:id",
			},
		]);
	})
	.catch((e) => {
		/**
		 * Fail the application on startup error
		 */
		logger("failed to start");
		error(e);
		failOnShutdown(e);
	});

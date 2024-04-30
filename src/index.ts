import "reflect-metadata";
import debug from "debug";
import {App, shutdown, failOnShutdown, seedDataSource} from "./App";
import {isDevelopment, routesKey, prefixKey} from "./config/constants";
import {UserController} from "./controller/UserController";
import {AppDataSource} from "./AppDataSource";
import {RouteController} from "./config/types";
import {WebRoute} from "./io/WebApplication";
import {PartyController} from "./controller/PartyController";

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
		const controllers: RouteController<unknown>[] = [
			new UserController(AppDataSource),
			new PartyController(AppDataSource)
		];

		controllers.forEach((controller) => {
			const routesWithoutPrefix = Reflect.getMetadata(routesKey, controller.constructor) as WebRoute[];
			const prefix = Reflect.getMetadata(prefixKey, controller.constructor) as string;
			const routes = routesWithoutPrefix.map((route) => ({
				...route,
				path: `${prefix}${route.path}`,
			} as WebRoute));
			App.attachRoutes(routes);
		});
	})
	.catch((e) => {
		logger("failed to start");
		verbose(e);
		failOnShutdown(e);
	});

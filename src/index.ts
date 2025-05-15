import "reflect-metadata";
import debug from "debug";
import {App, shutdown, failOnShutdown, seedDataSource} from "./App";
import {TestController} from "./controller/TestController";
import {isDevelopment, prefixKey, routesKey} from "./config/constants";
import {Route, RouteController} from "./config/types";
import {AppDataSource} from "./AppDataSource";
import {UserController} from "./controller/UserController";
import {PartyController} from "./controller/PartyController";

const logger = debug("app:i:index");
const verbose = debug("app:v:index");
const error = debug("app:e:index");

/**
 * Main entry point for the application
 */
verbose("starting");

App.bootstrap()
	.then(async () => {
		verbose("succesfully started");

		/**
		 * Attach the controllers to the application
		 */
		const controllers: RouteController<any>[] = [
			new UserController(AppDataSource),
			new PartyController(AppDataSource),
		];

		controllers.forEach((controller) => {
			/**
			 * Retrieve the routes from the controller
			 */
			const routesWithoutPrefix = Reflect.getMetadata(
				routesKey,
				controller.constructor,
			) as Route[];
			/**
			 * Retrieve the prefix from the controller
			 */
			const prefix = Reflect.getMetadata(
				prefixKey,
				controller.constructor,
			) as string;
			/**
			 * Prepend the associated prefix to each route
			 */
			const routes = routesWithoutPrefix.map(
				(route) =>
					({
						...route,
						path: `${prefix}${route.path}`,
					}) as Route,
			);
			/**
			 * Attach the routes to the application together with the associated prefix
			 */
			App.attachRoutes(controller, routes);
		});
		/**
		 * Seed the data source with fake data in case of development
		 */
		if (isDevelopment) {
			await seedDataSource();
		}
	})
	.catch((e) => {
		/**
		 * Fail the application on startup error
		 */
		logger("failed to start");
		error(e);
		failOnShutdown(e);
	});

/**
 * Gracefully shutdown the application
 */
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

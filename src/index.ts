import "reflect-metadata";
import debug from "debug";
import {App, shutdown, failOnShutdown, seedDataSource} from "./App";
import {isDevelopment, routesKey, prefixKey} from "./config/constants";
import {UserController} from "./controller/UserController";
import {AppDataSource} from "./AppDataSource";
import {RouteController, Route} from "./config/types";
import {PartyController} from "./controller/PartyController";

const logger = debug("app:i:index");
const verbose = debug("app:v:index");

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

verbose("starting");

App.bootstrap()
	.then(async () => {
		verbose("succesfully started");

		/**
		 * Attach the controllers to the application
		 */
		const controllers: RouteController<unknown>[] = [
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
			App.attachRoutes(routes, controller);
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
		verbose(e);
		failOnShutdown(e);
	});

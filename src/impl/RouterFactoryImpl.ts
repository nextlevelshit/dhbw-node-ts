import {Express} from "express";
import debug from "debug";
import {RouterFactory, RouterFactoryOptions} from "../io/RouterFactory";

const logger = debug("app:i:router-factory");
const verbose = debug("app:v:router-factory");

export class RouterFactoryImpl implements RouterFactory {
	options: RouterFactoryOptions;

	constructor(options: RouterFactoryOptions) {
		this.options = options;
	}

	async createRoutes(app: Express) {
		this.options.routes.forEach((route) => {
			logger(`creating route ${route.method.toUpperCase()} ${route.path}`);
			/**
			 * For each route, we create a new route in the express app based on the method and path.
			 */
			app[route.method](route.path, async (req, res, next) => {
				verbose(`>> ${route.method.toUpperCase()} ${route.path}`);
				try {
					const result = await this.options[route.action](req, res, next);
					verbose("<<", result);
					res.json(result);
				} catch (e) {
					logger("||", e.message);
					res.status(500).send(e.message ?? "Internal server error");
				}
			});
		});
	}
}

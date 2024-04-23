import {Express, Response, Request, NextFunction} from "express";
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
			 * For each route, we create a new route in the express app
			 */
			app[route.method](route.path, async (req: Request, res: Response, next: NextFunction) => {
				verbose(`>> ${route.method.toUpperCase()} ${route.path}`);
				try {
					const result = this.options.controller[route.action](req, res, next);
					/**
					 * If the result is a promise, we wait for it to resolve and then send the result
					 */
					if (result instanceof Promise) {
					} else if (!!result) {
						res.json(result);
						verbose("<<", result);
					} else {
						verbose(`No result found for route ${route.method.toUpperCase()} ${route.path}`);
						res.status(404).send("Not found");
					}
				} catch (e) {
					logger(e);
					res.status(500).send(e?.message ?? "Internal server error");
				}
			});
		});
	}
}

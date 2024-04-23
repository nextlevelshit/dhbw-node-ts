import {Controller} from "../io/BaseController";
import {Express, Response, Request, NextFunction} from "express";
import {Route} from "../config/types";
import {debug} from "node:util";

const logger = debug("app:i:router-factory");
const verbose = debug("app:v:router-factory");

export interface RouterFactoryOptions {
	controller: Controller<any>;
	routes: Route[];
}

export interface RouterFactory {
	options: RouterFactoryOptions;

	createRoutes(app: Express): Promise<void>;
}

export class RouterFactoryImpl implements RouterFactory {
	options: RouterFactoryOptions;

	constructor(options: RouterFactoryOptions) {
		this.options = options;
	}

	async createRoutes(app: Express) {
		this.options.routes.forEach(route => {
			verbose("Creating route %s %s", route.method, route.path);
			/**
			 * For each route, we create a new route in the express app
			 */
			app[route.method](route.path, async (req: Request, res: Response, next: NextFunction) => {
				const result = this.options.controller[route.action](req, res, next);
				/**
				 * If the result is a promise, we wait for it to resolve and then send the result
				 */
				if (result instanceof Promise) {
					res.send(await result);
				} else if (!!result) {
					res.json(result)
				} else {
					res.status(404).send("Not found");
				}
			});
		});
	}
}

// export class ProductRouterFactory extends BaseRouterFactory {
// 	async createRoutes(app: Express) {
// 		this.options.routes.forEach(route => {
// 			app[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
// 				const result = this.options.controller[route.action](req, res, next);
// 				if (result instanceof Promise) {
// 					res.send(await result);
// 				} else if (!!result) {
// 					res.json(result)
// 				}
// 			});
// 		});
// 	}
// }

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
export abstract class BaseRouterFactory {
	options: RouterFactoryOptions;
	constructor(options: RouterFactoryOptions) {
		this.options = options;
	}

	abstract createRoutes(app: Express): Promise<void>;
}

export class UserRouterFactory extends BaseRouterFactory {
	async createRoutes(app: Express) {
		this.options.routes.forEach(route => {
			verbose("Creating route %s %s", route.method, route.route);
			app[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
				const result = this.options.controller[route.action](req, res, next);
				if (result instanceof Promise) {
					res.send(await result);
				} else if (!!result) {
					res.json(result)
				}
			});
		});
	}
}

export class ProductRouterFactory extends BaseRouterFactory {
	async createRoutes(app: Express) {
		this.options.routes.forEach(route => {
			app[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
				const result = this.options.controller[route.action](req, res, next);
				if (result instanceof Promise) {
					res.send(await result);
				} else if (!!result) {
					res.json(result)
				}
			});
		});
	}
}

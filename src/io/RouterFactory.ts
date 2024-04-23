import {Express} from "express";
import {Controller, Route} from "../config/types";

export interface RouterFactoryOptions {
	/**
	 * The controller that this factory will use
	 */
	controller: Controller<any>;
	/**
	 * The routes that this factory will create
	 */
	routes: Route[];
}

export interface RouterFactory {
	/**
	 * The options for this factory
	 */
	options: RouterFactoryOptions;

	/**
	 * Create the routes for the given express app
	 * @param app The express app
	 */
	createRoutes(app: Express): Promise<void>;
}

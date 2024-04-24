import {Express} from "express";
import {BaseController} from "../config/types";

export type RouterFactoryOptions = BaseController<any>;
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

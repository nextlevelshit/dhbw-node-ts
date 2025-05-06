import {Request, Response} from "express";
import {Repository} from "typeorm";

/**
 * Controller interface for controllers.
 * It provides basic CRUD operations.
 */
export interface RouteController<T> {
	readonly repository?: Repository<T>;
	/**
	 * Fetches all instances of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to an array of T.
	 */
	all?(request: Request, response: Response): Promise<T[] | string>;

	/**
	 * Fetches a single instance of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to an instance of T or a string.
	 */
	one?(request: Request, response: Response): Promise<T | string>;

	/**
	 * Saves an instance of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to the saved instance of T.
	 */
	save?(
		request: Request,
		response: Response,
	): Promise<(T & Record<string, any>) | string>;

	/**
	 * Removes an instance of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to the removed instance of T or a string.
	 */
	remove?(request: Request, response: Response): Promise<T | string>;

	[key: string]: any;
}

/**
 * RouteMethod is a type for HTTP methods.
 */
export type RouteMethod = "get" | "post" | "put" | "patch" | "delete" | "all";

/**
 * Route is an interface for routes.
 */
export interface Route {
	/**
	 * HTTP method for the route.
	 */
	method: RouteMethod;
	/**
	 * Path for the route.
	 */
	path: string;
	/**
	 * Action to be performed for the route.
	 */
	action: keyof Omit<RouteController<unknown>, "repository">;
}

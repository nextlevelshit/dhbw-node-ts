import {Request, Response} from "express";
import {User} from "../entity/User";
import {Repository} from "typeorm";

/**
 * BaseController is a generic class for controllers.
 * It provides basic CRUD operations.
 */
export declare class BaseController<T> {
	/**
	 * Repository for the entity T.
	 */
	repository: Repository<T>;

	/**
	 * Fetches all instances of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to an array of T.
	 */
	all(request: Request, response: Response): Promise<T[]>;

	/**
	 * Fetches a single instance of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to an instance of T or a string.
	 */
	one(request: Request, response: Response): Promise<T | string>;

	/**
	 * Saves an instance of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to the saved instance of T.
	 */
	save(
		request: Request,
		response: Response
	): Promise<T & Record<string, any>>;

	/**
	 * Removes an instance of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to the removed instance of T or a string.
	 */
	remove(request: Request, response: Response): Promise<T | string>;

	/**
	 * The routes for this controller.
	 * This can be any function except the existing functions or properties.
	 */
	[key: string]: ((request: Request, response: Response) => Promise<T | T[] | Record<string, any> | Record<string, any>[] | string>) | Repository<T> | undefined;
}

/**
 * Controller interface for controllers.
 * It provides basic CRUD operations.
 */
export interface RouteController<T> {
	repository: Repository<T>;
	/**
	 * Fetches all instances of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to an array of T.
	 */
	all?(request: Request, response: Response): Promise<T[]>;

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
		response: Response
	): Promise<T & Record<string, any>>;

	/**
	 * Removes an instance of T.
	 *
	 * @param request - The express request object.
	 * @param response - The express response object.
	 * @returns A promise that resolves to the removed instance of T or a string.
	 */
	remove?(
		request: Request,
		response: Response
	): Promise<T | string>;

	/**
	 * The routes for this controller.
	 * This can be any function except the existing functions or properties.
	 */
	// [key: string]: ((request: Request, response: Response) => Promise<T | T[] | Record<string, any> | Record<string, any>[] | string>) | Repository<T> | undefined;
}

/**
 * RouteMethod is a type for HTTP methods.
 */
export type RouteMethod = "get" | "post" | "put" | "delete";

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
	action: keyof Omit<BaseController<unknown>, "routes" | "repository">;
}
import {Request, Response, NextFunction} from "express";
import {User} from "../entity/User";
import {Repository} from "typeorm";

export declare class BaseController<T> {
	routes: Route[];
	repository: Repository<T>;

	/**
	 *
	 * @param request
	 * @param response
	 * @param next
	 */
	all(request: Request, response: Response, next: NextFunction): Promise<T[]>;
	/**
	 *
	 * @param request
	 * @param response
	 * @param next
	 */
	one(request: Request, response: Response, next: NextFunction): Promise<T | string>;
	/**
	 *
	 * @param request
	 * @param response
	 * @param next
	 */
	save(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<T & Record<string, any>>;
	/**
	 *
	 * @param request
	 * @param response
	 * @param next
	 */
	remove(request: Request, response: Response, next: NextFunction): Promise<T | string>;
}

export interface Controller<T> {
	/**
	 *
	 * @param request
	 * @param response
	 * @param next
	 */
	all(request: Request, response: Response, next: NextFunction): Promise<T[]>;
	/**
	 *
	 * @param request
	 * @param response
	 * @param next
	 */
	one(request: Request, response: Response, next: NextFunction): Promise<T | string>;
	/**
	 *
	 * @param request
	 * @param response
	 * @param next
	 */
	save(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<T & Record<string, any>>;
	/**
	 *
	 * @param request
	 * @param response
	 * @param next
	 */
	remove(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<User | string>;
}

export interface Route {
	method: "get" | "post" | "put" | "delete";
	path: string;
	action: keyof Omit<BaseController<unknown>, "routes" | "repository">;
}

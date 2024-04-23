import {Request, Response, NextFunction} from "express";
import {User} from "../entity/User";

export interface Controller<T> {
	// protected repository: Repository<any>
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

	save(request: Request, response: Response, next: NextFunction): Promise<T & Record<string, any>>;

	remove(request: Request, response: Response, next: NextFunction): Promise<User | string>;
}

export interface Route {
	method: "get" | "post" | "put" | "delete";
	path: string;
	action: keyof Controller<any>;
}

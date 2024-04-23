import {Repository} from "typeorm";
import {Request, Response, NextFunction} from "express";
import {User} from "../entity/User";

export abstract class BaseController<T> implements Controller<T> {
	protected repository: Repository<T>;

	all(): Promise<T[]>;
	one(request: Request, response: Response, next: NextFunction): Promise<T | string>;
	save(request: Request, response: Response, next: NextFunction): Promise<T & Record<string, any>>;
	remove(request: Request, response: Response, next: NextFunction): Promise<User | string>;
}

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

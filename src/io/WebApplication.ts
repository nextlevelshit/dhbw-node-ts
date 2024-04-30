import {DataSource} from "typeorm";

import {Request, Response} from "express";

export interface WebApplicationOptions {
	dataSource: DataSource;
	port: number;
}

export interface WebRoute {
	method: "get" | "post" | "put" | "delete";
	path: string;
	action: (req: Request, res: Response) => Promise<unknown>;
}

export interface WebApplication {
	/**
	 * Bootstrap the application
	 */
	bootstrap(): Promise<void>;

	/**
	 * Tear down the application
	 */
	teardown(): void;

	/**
	 * Mount routes to express application
	 */
	attachRoutes(routes: WebRoute[]): void
}

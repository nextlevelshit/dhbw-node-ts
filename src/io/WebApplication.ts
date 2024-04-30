import {DataSource} from "typeorm";
import {Route, RouteController} from "../config/types";
import {Express} from "express";

export interface WebApplicationOptions {
	dataSource: DataSource;
	port: number;
}

export interface WebApplication {
	get express(): Express;
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
	attachRoutes(routes: Route[], controller: RouteController<unknown>): void;
}

import {DataSource} from "typeorm";

import {RouterFactory} from "./RouterFactory";

export interface WebApplicationOptions {
	dataSource: DataSource;
	port: number;
	routerFactories: RouterFactory[];
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
}

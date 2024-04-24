import {DataSource} from "typeorm";

import {RouterFactory, RouterFactoryOptions} from "./RouterFactory";
import {BaseController, Controller} from "../config/types";
import {RouterFactoryImpl} from "../impl/RouterFactoryImpl";
import {UserController} from "../controller/UserController";

export interface WebApplicationOptions {
	dataSource: DataSource;
	port: number;
	routerFactory: new (options: RouterFactoryOptions) => RouterFactory;
	controllers: (new (dataSource: DataSource) => BaseController<any>)[];
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

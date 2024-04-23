import {DataSource} from "typeorm";
import {RouterFactory} from "../impl/RouterFactory";


export interface WebApplicationOptions {
	data: DataSource,
	port: number,
	routerFactories: RouterFactory[]
}

export interface WebApplication {
	bootstrap(): void;

	teardown(): void;
}

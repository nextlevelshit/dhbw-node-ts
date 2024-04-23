import {DataSource} from "typeorm";
import {BaseRouterFactory} from "../impl/RouterFactory";


export interface WebApplicationOptions {
	data: DataSource,
	port: number,
	routerFactories: BaseRouterFactory[]
}

export interface WebApplication {
	bootstrap(): void;

	teardown(): void;
}

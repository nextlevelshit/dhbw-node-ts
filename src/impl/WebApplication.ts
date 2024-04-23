import {WebApplication, WebApplicationOptions} from "../io/WebApplication";
import express, {Express} from "express";
import bodyParser from "body-parser";
import {DataSource} from "typeorm";
import {debug} from "node:util";
import {RouterFactory} from "./RouterFactory";

const logger = debug("app:i:web-application");
const verbose = debug("app:v:web-application");

export class WebApplicationImpl implements WebApplication {
	private readonly port: number;
	private app: Express;
	private dataSource: DataSource;
	private routerFactories: RouterFactory[];
	constructor(options: WebApplicationOptions) {
		this.port = options.port;
		this.dataSource = options.data;
	}

	async bootstrap() {
		await this.bootstrapDataSource();
		await this.bootstrapExpress();
	}

	async bootstrapDataSource() {
		try {
			await this.dataSource.initialize();
		} catch(e) {
			logger("Error initializing data source: %O", e);
		}
	}

	protected async bootstrapExpress() {
		this.app = express();
		this.app.use(bodyParser.json());

		// register express routes from defined application routes
		this.routerFactories.forEach(routerFactory => {
			routerFactory.createRoutes(this.app);
		});

		// setup express app here
		// ...

		// start express server
		this.app.listen(this.port);
	}

	teardown() {

	}
}

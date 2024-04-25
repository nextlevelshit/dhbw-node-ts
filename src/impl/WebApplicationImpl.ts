import {WebApplication, WebApplicationOptions} from "../io/WebApplication";
import express, {Express} from "express";
import bodyParser from "body-parser";
import debug from "debug";
import {Server} from "node:net";

const logger = debug("app:i:web-application");
const verbose = debug("app:v:web-application");

export class WebApplicationImpl implements WebApplication {
	private app: Express;
	private options: WebApplicationOptions;
	private server: Server;

	constructor(options: WebApplicationOptions) {
		this.options = options;
	}

	async bootstrap() {
		await this.bootstrapDataSource();
		await this.bootstrapExpress();
	}

	async teardown() {
		await this.teardownDataSource();
		this.teardownExpress();
	}

	private async bootstrapDataSource() {
		verbose("initializing data source");
		try {
			await this.options.dataSource.initialize();
			verbose("initialized data source successfully")
		} catch (e) {
			logger(`error initializing data source: ${e}`);
		}
	}

	private async bootstrapExpress() {
		verbose("bootstrapping application");
		this.app = express();
		this.app.use(bodyParser.json());
		logger("added json body parser");
		this.options.controllers.forEach((controller) => {
			const instance = new controller(this.options.dataSource);
			new this.options.routerFactory(
				instance,
			).createRoutes/*for*/(this.app);
		});
		logger("added routes");
		this.server = this.app.listen(this.options.port);
		logger(`app listening on port ${this.options.port}`);
	}

	private async teardownDataSource() {
		await this.options.dataSource.destroy();
		verbose("closed data source connection successfully");
	}

	private teardownExpress() {
		this.server.close();
		verbose("closed server connection gracefully");
	}
}

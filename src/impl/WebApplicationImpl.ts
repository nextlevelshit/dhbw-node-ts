import {WebApplication, WebApplicationOptions} from "../io/WebApplication";
import express, {Express} from "express";
import bodyParser from "body-parser";
import debug from "debug";

const logger = debug("app:i:web-application");
const verbose = debug("app:v:web-application");

export class WebApplicationImpl implements WebApplication {
	private app: Express;
	private options: WebApplicationOptions;

	constructor(options: WebApplicationOptions) {
		this.options = options;
	}

	async bootstrap() {
		verbose("bootstrapping application");
		await this.bootstrapDataSource();
		verbose("data source initialized");
		await this.bootstrapExpress();
	}

	private async bootstrapDataSource() {
		try {
			await this.options.dataSource.initialize();
		} catch (e) {
			logger(`error initializing data source: ${e}`);
		}
	}

	private async bootstrapExpress() {
		this.app = express();
		this.app.use(bodyParser.json());
		verbose("added json body parser");
		this.options.controllers.forEach((controller) => {
			new this.options.routerFactory(
				new controller(this.options.dataSource),
			).createRoutes(this.app);
		});
		verbose("added routes");
		this.app.listen(this.options.port);
		logger(`app listening on port ${this.options.port}`);
	}

	async teardown() {
		verbose("closing data source connection");
		await this.options.dataSource.destroy();
	}
}

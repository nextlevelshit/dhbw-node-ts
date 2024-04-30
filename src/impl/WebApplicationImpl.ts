import {WebApplication, WebApplicationOptions, WebRoute} from "../io/WebApplication";
import express, {Express, Request, Response, NextFunction} from "express";
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
		this.teardownExpress();
		await this.teardownDataSource();
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

	attachRoutes(routes: WebRoute[]) {
		if (!routes) {
			logger("no routes to attach");
			return;
		}

		routes.forEach((route) => {
			logger(`creating route ${route.method.toUpperCase()} ${route.path}`);
			this.app[route.method](route.path, async (req: Request, res: Response) => {
				verbose(`>> ${route.method.toUpperCase()} ${route.path}`);
				try {
					const result = await route.action(req, res);
					verbose("<<", result);
					res.json(result);
				} catch (e) {
					logger("||", e.message);
					res.status(500).send(e.message ?? "Internal server error");
				}
			});
		});
	}
}

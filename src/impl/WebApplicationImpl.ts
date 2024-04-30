import {WebApplication, WebApplicationOptions} from "../io/WebApplication";
import express, {Express} from "express";
import bodyParser from "body-parser";
import debug from "debug";
import {Server} from "node:net";
import {Route, RouteController} from "../config/types";

const logger = debug("app:i:web-application");
const verbose = debug("app:v:web-application");

export class WebApplicationImpl implements WebApplication {
	private app: Express;
	private options: WebApplicationOptions;
	private server: Server;

	get express(): Express {
		return this.app;
	}

	constructor(options: WebApplicationOptions) {
		this.options = options;
	}

	/**
	 * Bootstrap the application
	 */
	async bootstrap() {
		await this.bootstrapDataSource();
		await this.bootstrapExpress();
	}

	/**
	 * Tear down the application
	 */
	async teardown() {
		this.teardownExpress();
		await this.teardownDataSource();
	}

	private async bootstrapDataSource() {
		verbose("initializing data source");
		try {
			await this.options.dataSource.initialize();
			verbose("initialized data source successfully");
		} catch (e) {
			logger(`error initializing data source: ${e}`);
		}
	}

	private async bootstrapExpress() {
		this.app = express();
		verbose("bootstrapping application");
		this.app.use(bodyParser.json());
		logger("added json body parser");
		this.app.set("x-powered-by", false);
		logger("removed x-powered-by header");
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

	/**
	 * Attach routes to the express application
	 * @param routes - The routes to attach
	 */
	attachRoutes(routes: Route[], controller: RouteController<unknown>) {
		if (!routes) {
			logger("no routes to attach");
			return;
		}

		routes.forEach((route) => {
			logger(`creating route ${route.method.toUpperCase()} ${route.path}`);
			this.app[route.method](route.path, async (req, res) => {
				verbose(`> ${route.method.toUpperCase()} ${route.path}`);
				try {
					const result = await controller[route.action](req, res);
					verbose("<", result);
					res.json(result);
				} catch (e) {
					logger("||", e.message);
					res.status(500).send(e.message ?? "Internal server error");
				}
			});
		});
	}
}

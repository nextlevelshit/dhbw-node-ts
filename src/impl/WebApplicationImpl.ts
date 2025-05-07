import {WebApplication, WebApplicationOptions} from "../io/WebApplication";
import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import debug from "debug";
import {Server} from "node:net";
import {Route, RouteController} from "../config/types";

const logger = debug("app:i:web-application");
const verbose = debug("app:v:web-application");
const error = debug("app:e:web-application");

export class WebApplicationImpl implements WebApplication {
	private readonly app = express();
	private server?: Server;

	get express(): any {
		return this.app;
	}

	constructor(private options: WebApplicationOptions) {}

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
		if (!this.options.dataSource) {
			verbose("no data source to close");
			return;
		}
		await this.teardownDataSource();
	}

	private async bootstrapDataSource() {
		if (!this.options.dataSource) {
			verbose("no data source to initialize");
			return;
		}
		verbose("initializing data source");
		try {
			await this.options.dataSource.initialize();
			verbose("initialized data source successfully");
		} catch (e) {
			error(`error initializing data source: ${e}`);
		}
	}

	private async bootstrapExpress() {
		verbose("bootstrapping application");
		this.app.use(bodyParser.json());
		this.app.set("x-powered-by", false);
		this.server = this.app.listen(this.options.port);
		logger(`app listening on port ${this.options.port}`);
	}

	private async teardownDataSource() {
		if (!this.options.dataSource) {
			verbose("no data source connection to close");
			return;
		}
		await this.options.dataSource.destroy();
		verbose("closed data source connection successfully");
	}

	private teardownExpress() {
		this.server?.close();
		verbose("closed server connection gracefully");
	}

	/**
	 * Attach routes to the express application
	 * @param controller
	 * @param routes - The routes to attach
	 */
	attachRoutes(controller: RouteController<any>, routes: Route[]) {
		if (!routes) {
			logger("no routes to attach");
			return;
		}

		if (!this.app) {
			logger("no app mounted");
			return;
		}

		logger(`creating ${routes.length} routes`);
		routes.forEach((route) => {
			this.app![route.method](route.path, async (req: Request, res: Response) => {
				verbose(`> ${route.method.toUpperCase()} ${route.path}`);
				try {
					const result = await controller[route.action](req, res);
					verbose("<", result);
					res.json(result);
				} catch (e: any) {
					error("|", e?.message);
					res.status(500).send(e.message ?? "Internal server error");
				}
			});
		});
	}
}

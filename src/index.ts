import {AppDataSource} from "./data-source";
import {userRoutes} from "./routes";
import {WebApplicationImpl} from "./impl/WebApplicationImpl";
import {RouterFactoryImpl} from "./impl/RouterFactoryImpl";
import {UserController} from "./controller/UserController";
import debug from "debug";
import {port} from "./config/constants";

const logger = debug("app:i:index");
const verbose = debug("app:v:index");

const app = new WebApplicationImpl({
	port,
	dataSource: AppDataSource,
	routerFactories: [
		new RouterFactoryImpl({
			controller: new UserController(AppDataSource),
			routes: userRoutes,
		}),
	],
});

export const shutdown = () => {
	logger("shutting down application");
	app.teardown();
	process.exit(0);
};

export const shutDownWithError = (e: Error) => {
	logger(`Failed to bootstrap application: ${e}`);
	process.exit(1);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.bootstrap()
	.then(() => verbose("succesfully bootstrap application"))
	.catch(shutDownWithError);

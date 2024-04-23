import {AppDataSource} from "./AppDataSource";
import {userRoutes, partyRoutes} from "./config/routes";
import {WebApplicationImpl} from "./impl/WebApplicationImpl";
import {RouterFactoryImpl} from "./impl/RouterFactoryImpl";
import {UserController} from "./controller/UserController";
import {port} from "./config/constants";
import debug from "debug";
import {User} from "./entity/User";


const logger = debug("app:i:app");
const verbose = debug("app:v:app");

/**
 * The main application instance
 */
export const App = new WebApplicationImpl({
	port,
	dataSource: AppDataSource,
	routerFactories: [
		new RouterFactoryImpl({
			controller: new UserController(AppDataSource),
			routes: userRoutes,
		}),
		new RouterFactoryImpl({
			controller: new UserController(AppDataSource),
			routes: partyRoutes
		}),
	],
});

export const seedDataSource = async () => {
	verbose("seeding with fake data");
	await AppDataSource.manager.save(Object.assign(new User(), {id: 1, firstName: "Sr.", lastName: "Hentry", age: 78}));
	await AppDataSource.manager.save(Object.assign(new User(), {id: 2, firstName: "Jr.", lastName: "Hentry", age: 17}));
	await AppDataSource.manager.save(Object.assign(new User(), {id: 3, firstName: "Mr.", lastName: "Hentry", age: 45}));
	await AppDataSource.manager.save(Object.assign(new User(), {id: 4, firstName: "Ms.", lastName: "Hentry", age: 78}));
}

/**
 * Shutdown the application gracefully
 */
export const shutdown = () => {
	verbose(">> SIGINT/SIGTERM shutting down...");
	App.teardown();
	process.exit(0);
};

/**
 * Shutdown the application and fail
 * @param e Error
 */
export const shutDownAndFail = (e: Error) => {
	logger(`failed to bootstrap application: ${e}`);
	process.exit(1);
};
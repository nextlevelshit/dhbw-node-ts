import debug from "debug";
import {AppDataSource} from "./AppDataSource";
import {WebApplicationImpl} from "./impl/WebApplicationImpl";
import {port} from "./config/constants";
import {User} from "./entity/User";

const logger = debug("app:i:app");
const verbose = debug("app:v:app");

/**
 * The main application instance
 */
export const App = new WebApplicationImpl({
	port,
	dataSource: AppDataSource,
});

export const seedDataSource = async () => {
	logger("starting to seed data source");

	const usersData = [
		{id: 1, firstName: "Sr.", lastName: "Henry", age: 78},
		{id: 2, firstName: "Jr.", lastName: "Henry", age: 17},
		{id: 3, firstName: "Mr.", lastName: "Henry", age: 45},
		{id: 4, firstName: "Ms.", lastName: "Henry", age: 78},
	];

	const users = usersData.map((data) => Object.assign(new User(), data));

	verbose("seeding with fake users", users);

	await Promise.all(users.map((user) => AppDataSource.manager.save(user)));
};

/**
 * Shutdown the application gracefully
 */
export const shutdown = () => {
	verbose("> SIGINT/SIGTERM");
	App.teardown()
		.then(() => process.exit(0))
		.catch(failOnShutdown);
};

/**
 * Shutdown the application and fail
 * @param e Error
 */
export const failOnShutdown = (e: Error) => {
	logger("failed to bootstrap application");
	verbose(e);
	process.exit(1);
};

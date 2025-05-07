import {DataSource} from "typeorm";
import {User} from "./entity/User";
import {Party} from "./entity/Party";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "database.sqlite",
	synchronize: true,
	logging: false,
	entities: [User, Party],
	migrations: [],
	subscribers: [],
});

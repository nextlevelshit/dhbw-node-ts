import {DataSource} from "typeorm";
import {User} from "./entity/User";
import {Party} from "./entity/Party";
import {databaseAddress, isDevelopment} from "./config/constants";
import debug from "debug";

const entities = [User, Party];

const logger = debug("app:i:app-data-source");
const verbose = debug("app:v:app-data-source");

logger("creating data source");

const dataSourceConfig = databaseAddress
	? {
			type: "postgres" as const,
			url: databaseAddress,
			synchronize: isDevelopment,
			logging: isDevelopment,
			entities,
			migrations: [],
			subscribers: [],
		}
	: {
			type: "sqlite" as const,
			database: "database.sqlite",
			synchronize: true,
			logging: false,
			entities,
			migrations: [],
			subscribers: [],
		};

verbose("data source config", dataSourceConfig);

export const AppDataSource = new DataSource(dataSourceConfig);

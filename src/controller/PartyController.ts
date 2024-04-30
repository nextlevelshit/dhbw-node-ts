import {DataSource, Repository} from "typeorm";
import {Controller} from "../decorator/Controller";
import {Get} from "../decorator/Get";
import {RouteController} from "../config/types";
import {User} from "../entity/User";

@Controller("/party")
export class PartyController implements RouteController<User> {
	repository: Repository<User>;

	constructor(appDataSource: DataSource) {
		this.repository = appDataSource.getRepository(User);
	}

	@Get("/techno")
	allTechno() {
		return {
			parties: [
				{
					name: "Techno Party",
					location: "Berlin",
					date: "2024-05-20",
				},
				{
					name: "Techno Party",
					location: "Berlin",
					date: "2024-05-29",
				},
				{
					name: "Techno Party",
					location: "Berlin",
					date: "2024-05-23",
				},
			],
		};
	}

	@Get("/dnb")
	allDnb() {
		return {
			parties: [
				{
					name: "Drum and Bass Party",
					location: "Bristol (UK)",
					date: "2024-08-13",
				},
				{
					name: "Drum and Bass Party",
					location: "Heidelberg",
					date: "2024-06-01",
				},
				{
					name: "Drum and Bass Party",
					location: "Heidelberg",
					date: "2024-04-11",
				},
			],
		};
	}
}

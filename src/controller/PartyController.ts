import {DataSource, Repository} from "typeorm";
import {Controller} from "../decorator/Controller";
import {Get} from "../decorator/Get";
import {RouteController} from "../config/types";
import {Party} from "../entity/Party";

@Controller("/party")
export class PartyController implements RouteController<Party> {
	repository: Repository<Party>;

	constructor(appDataSource: DataSource) {
		this.repository = appDataSource.getRepository(Party);
	}

	@Get("/techno")
	allTechno(): Party[] {
		return [
			{
				id: 0,
				name: "Techno Party",
				location: "Berlin",
				date: "2024-05-20",
			},
			{
				id: 0,
				name: "Techno Party",
				location: "Berlin",
				date: "2024-05-29",
			},
			{
				id: 0,
				name: "Techno Party",
				location: "Berlin",
				date: "2024-05-23",
			},
		];
	}

	@Get("/dnb")
	allDnb(): Party[] {
		return [
			{
				id: 0,
				name: "Drum and Bass Party",
				location: "Bristol (UK)",
				date: "2024-08-13",
			},
			{
				id: 0,
				name: "Drum and Bass Party",
				location: "Heidelberg",
				date: "2024-06-01",
			},
			{
				id: 0,
				name: "Drum and Bass Party",
				location: "Heidelberg",
				date: "2024-04-11",
			},
		];
	}
}

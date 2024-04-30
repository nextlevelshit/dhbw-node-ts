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
	allTechno(){
		return {
			parties: [
				{
					name: "techno party",
					location: "Berlin",
					date: "2020-01-01"
				},
				{
					name: "techno party",
					location: "Berlin",
					date: "2020-01-01"
				},
				{
					name: "techno party",
					location: "Berlin",
					date: "2020-01-01"
				}
			]
		}
	}
}

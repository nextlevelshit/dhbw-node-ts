import {DataSource} from "typeorm";
import {UserController} from "./UserController";

export class PartyController extends UserController {
	constructor(appDataSource: DataSource) {
		super(appDataSource);
		this.routes = [
			{
				path: "/party",
				method: "get",
				action: "all",
			},
			{
				path: "/party-all-night-long",
				method: "get",
				action: "all",
			},
			{
				path: "/party/:id",
				method: "get",
				action: "one",
			},
		];
	}
}

import {Request} from "express";
import {User} from "../entity/User";
import {DataSource, Repository} from "typeorm";
import {Route, BaseController} from "../config/types";

export class UserController implements BaseController<User> {
	routes: Route[];
	repository: Repository<User>;

	constructor(appDataSource: DataSource) {
		this.repository = appDataSource.getRepository(User);
		this.routes = [
			{
				path: "/users",
				method: "get",
				action: "all",
			},
			{
				path: "/users/:id",
				method: "get",
				action: "one",
			},
			{
				path: "/users",
				method: "post",
				action: "save",
			},
			{
				path: "/users/:id",
				method: "delete",
				action: "remove",
			},
		];
	}

	async all() {
		return this.repository.find();
	}

	async one(request: Request) {
		const id = parseInt(request.params.id);

		const user = await this.repository.findOne({
			where: {id},
		});

		if (!user) {
			throw new Error("unregistered user");
		}
		return user;
	}

	async save(request: Request) {
		const {firstName, lastName, age} = request.body;

		const user = Object.assign(new User(), {
			firstName,
			lastName,
			age,
		});

		return this.repository.save(user);
	}

	async remove(request: Request) {
		const id = parseInt(request.params.id);

		let userToRemove = await this.repository.findOneBy({id});

		if (!userToRemove) {
			throw new Error("this user not exist");
		}

		await this.repository.remove(userToRemove);

		return "user has been removed";
	}
}

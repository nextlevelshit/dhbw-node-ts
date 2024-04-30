import {Request} from "express";
import {User} from "../entity/User";
import {DataSource, Repository} from "typeorm";
import {RouteController} from "../config/types";
import {Controller} from "../decorator/Controller";
import {Get} from "../decorator/Get";
import {Post} from "../decorator/Post";
import {Delete} from "../decorator/Delete";
import {Put} from "../decorator/Put";

@Controller("/users")
export class UserController implements RouteController<User> {
	readonly repository: Repository<User>;

	constructor(appDataSource: DataSource) {
		this.repository = appDataSource.getRepository(User);
	}

	@Get("/info")
	async info() {
		return this.repository.count();
	}

	@Get("/")
	async all() {
		return this.repository.find();
	}

	@Get("/:id")
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

	@Post("/save")
	async save(request: Request) {
		const {firstName, lastName, age} = request.body;

		const user = Object.assign(new User(), {
			firstName,
			lastName,
			age,
		});

		return this.repository.save(user);
	}

	@Put("/:id")
	async update(request: Request) {
		const id = parseInt(request.params.id);
		const {firstName, lastName, age} = request.body;

		let userToUpdate = await this.repository.findOneBy({id});

		if (!userToUpdate) {
			throw new Error("this user not exist");
		}

		userToUpdate.firstName = firstName;
		userToUpdate.lastName = lastName;
		userToUpdate.age = age;

		return this.repository.save(userToUpdate);
	}

	@Delete("/:id")
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

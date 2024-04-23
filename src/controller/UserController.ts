import {Request} from "express"
import {User} from "../entity/User"
import {DataSource, Repository} from "typeorm";
import {Controller} from "../config/types";

export class UserController implements Controller<User> {

	protected repository: Repository<User>;

	constructor(appDataSource: DataSource) {
		this.repository = appDataSource.getRepository(User)
	}

	async all() {
		return this.repository.find()
	}

	async one(request: Request) {
		const id = parseInt(request.params.id)


		const user = await this.repository.findOne({
			where: {id}
		})

		if (!user) {
			return "unregistered user"
		}
		return user
	}

	async save(request: Request) {
		const {firstName, lastName, age} = request.body;

		const user = Object.assign(new User(), {
			firstName,
			lastName,
			age
		})

		return this.repository.save(user)
	}

	async remove(request: Request) {
		const id = parseInt(request.params.id)

		let userToRemove = await this.repository.findOneBy({id})

		if (!userToRemove) {
			return "this user not exist"
		}

		await this.repository.remove(userToRemove)

		return "user has been removed"
	}

}

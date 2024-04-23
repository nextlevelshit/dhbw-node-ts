import {Request, Response, NextFunction} from "express"
import {User} from "../entity/User.js"
import {Controller} from "../io/BaseController";
import {DataSource, Repository} from "typeorm";

export class UserController implements Controller<User> {

	protected repository: Repository<User>;

	constructor(appDataSource: DataSource) {
		this.repository = appDataSource.getRepository(User)
	}

	async all() {
		return this.repository.find()
	}

	async one(request: Request, res: Response, next: NextFunction) {
		const id = parseInt(request.params.id)


		const user = await this.repository.findOne({
			where: {id}
		})

		if (!user) {
			return "unregistered user"
		}
		return user
	}

	async save(request: Request, res: Response, next: NextFunction) {
		const {firstName, lastName, age} = request.body;

		const user = Object.assign(new User(), {
			firstName,
			lastName,
			age
		})

		return this.repository.save(user)
	}

	async remove(request: Request, res: Response, next: NextFunction) {
		const id = parseInt(request.params.id)

		let userToRemove = await this.repository.findOneBy({id})

		if (!userToRemove) {
			return "this user not exist"
		}

		await this.repository.remove(userToRemove)

		return "user has been removed"
	}

}

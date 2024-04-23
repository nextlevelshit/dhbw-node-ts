import express, {Express, Request, Response} from "express"
import bodyParser from "body-parser"
import {AppDataSource} from "./data-source.js"
import {Routes} from "./routes.js"
import {User} from "./entity/User.js"
import {WebApplicationImpl} from "./impl/WebApplication";
import {UserRouterFactory} from "./impl/RouterFactory";
import {UserController} from "./controller/UserController";

const app = new WebApplicationImpl({
	data: AppDataSource,
	port: 12000,
	routerFactories: [
		new UserRouterFactory(new UserController())
	]
});

// AppDataSource.initialize().then(async () => {
//
// 	// create express app
// 	const app = express()
// 	app.use(bodyParser.json())
//
// 	// register express routes from defined application routes
// 	Routes.forEach(route => {
// 		(app as Express)[route.method](route.route, (req: Request, res: Response, next: Function) => {
// 			const result = (new (route.controller as any))[route.action](req, res, next)
// 			if (result instanceof Promise) {
// 				result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
//
// 			} else if (result !== null && result !== undefined) {
// 				res.json(result)
// 			}
// 		})
// 	})
//
// 	// setup express app here
// 	// ...
//
// 	// start express server
// 	app.listen(3000)
//
// 	// insert new users for test
// 	await AppDataSource.manager.save(
// 		AppDataSource.manager.create(User, {
// 			firstName: "Timber",
// 			lastName: "Saw",
// 			age: 27
// 		})
// 	)
//
// 	await AppDataSource.manager.save(
// 		AppDataSource.manager.create(User, {
// 			firstName: "Phantom",
// 			lastName: "Assassin",
// 			age: 24
// 		})
// 	)
//
// 	console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")
//
// }).catch(error => console.log(error))

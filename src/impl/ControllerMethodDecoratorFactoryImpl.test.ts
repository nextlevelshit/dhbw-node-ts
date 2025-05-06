import "reflect-metadata";
import {routesKey} from "../config/constants";
import {Controller} from "../decorator/Controller";
import {Delete} from "../decorator/Delete";
import {Post} from "../decorator/Post";
import {Put} from "../decorator/Put";
import {Get} from "../decorator/Get";

describe("ControllerMethodDecoratorFactoryImpl", () => {
	it("should add a delete route to the controller's metadata", () => {
		@Controller("/delete")
		class MockController {
			@Delete("/:id")
			remove() {}
		}

		const routes = Reflect.getMetadata(routesKey, MockController.constructor);

		expect(routes).toHaveLength(1);
		expect(routes[0]).toMatchObject({
			path: "/:id",
			method: "delete",
		});
		Reflect.deleteMetadata(routesKey, MockController.constructor);
	});

	it("should add a delete route to the controller's metadata with a custom path", () => {
		@Controller("/custom")
		class MockController {
			@Delete("/custom")
			remove() {}
		}

		const routes = Reflect.getMetadata(routesKey, MockController.constructor);

		expect(routes).toHaveLength(1);
		expect(routes[0]).toMatchObject({
			path: "/custom",
			method: "delete",
		});
		Reflect.deleteMetadata(routesKey, MockController.constructor);
	});

	it("should add a post route to the controller's metadata", () => {
		@Controller("/post")
		class MockController {
			@Post("/")
			create() {}
		}

		const routes = Reflect.getMetadata(routesKey, MockController.constructor);

		expect(routes).toHaveLength(1);
		expect(routes[0]).toMatchObject({
			path: "/",
			method: "post",
		});
		Reflect.deleteMetadata(routesKey, MockController.constructor);
	});

	it("should add a put route to the controller's metadata", () => {
		@Controller("/put")
		class MockController {
			@Put("/:id")
			update() {}
		}

		const routes = Reflect.getMetadata(routesKey, MockController.constructor);

		expect(routes).toHaveLength(1);
		expect(routes[0]).toMatchObject({
			path: "/:id",
			method: "put",
		});
		Reflect.deleteMetadata(routesKey, MockController.constructor);
	});

	it("should add a get route to the controller's metadata", () => {
		@Controller("/get")
		class MockController {
			@Get("/")
			read() {}
		}

		const routes = Reflect.getMetadata(routesKey, MockController.constructor);

		expect(routes).toHaveLength(1);
		expect(routes[0]).toMatchObject({
			path: "/",
			method: "get",
		});
		Reflect.deleteMetadata(routesKey, MockController.constructor);
	});
});

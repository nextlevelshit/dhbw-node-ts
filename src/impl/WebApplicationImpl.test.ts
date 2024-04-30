import request from "supertest";
import {WebApplicationImpl} from "./WebApplicationImpl";
import {DataSource} from "typeorm";
import {RouteController, Route} from "../config/types";

describe("WebApplicationImpl", () => {
	let dataSourceMock: jest.Mocked<DataSource>;
	let app: WebApplicationImpl;
	let controllerMock: jest.Mocked<RouteController<unknown>>;
	let routes: Route[];

	beforeEach(async () => {
		dataSourceMock = {
			initialize: jest.fn().mockResolvedValue(undefined),
			destroy: jest.fn().mockResolvedValue(undefined),
		} as unknown as jest.Mocked<DataSource>;

		controllerMock = {
			all: jest.fn(),
			one: jest.fn(),
			save: jest.fn(),
			remove: jest.fn(),
		} as unknown as jest.Mocked<RouteController<unknown>>;

		routes = [
			{
				method: "get",
				path: "/",
				action: "all",
			},
		];

		app = new WebApplicationImpl({
			dataSource: dataSourceMock,
			port: 3000,
		});

		await app.bootstrap();
	});

	afterEach(async () => {
		jest.clearAllMocks();
		await app.teardown();
	});

	describe("bootstrap", () => {
		it("should initialize the data source", async () => {
			expect(dataSourceMock.initialize).toHaveBeenCalledTimes(1);
		});
	});

	describe("teardown", () => {
		it("should destroy the data source", async () => {
			await app.teardown();
			expect(dataSourceMock.destroy).toHaveBeenCalledTimes(1);
		});
	});

	describe("attachRoutes", () => {
		it("should attach routes to the application", async () => {
			app.attachRoutes(routes, controllerMock);
			controllerMock.all.mockResolvedValue("Hello, World!");

			const response = await request(app.express).get("/");

			expect(response.status).toBe(200);
			expect(response.text).toBe(JSON.stringify("Hello, World!"));
		});
	});
});

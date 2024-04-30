// import {WebApplicationImpl} from "./WebApplicationImpl";
// import {WebApplicationOptions} from "../io/WebApplication";
// import {DataSource} from "typeorm";
// import {RouterFactory, RouterFactoryOptions} from "../io/RouterFactory";
// import {BaseController} from "../config/types";
//
// describe("WebApplicationImpl", () => {
// 	let dataSourceMock: Partial<jest.Mocked<DataSource>>;
// 	let routerFactoryMock: jest.MockedClass<new (options: RouterFactoryOptions) => RouterFactory>;
// 	let controllerMock: jest.MockedClass<new (dataSource: DataSource) => BaseController<any>>;
// 	let options: WebApplicationOptions;
// 	let app: WebApplicationImpl;
// 	let i = 0;
//
// 	beforeEach(async () => {
// 		dataSourceMock = {
// 			initialize: jest.fn().mockResolvedValue(undefined),
// 			destroy: jest.fn().mockResolvedValue(undefined),
// 		};
//
// 		const mockRouterFactory = jest.fn().mockImplementation(() => ({
// 			createRoutes: jest.fn(),
// 		}));
// 		routerFactoryMock = mockRouterFactory as jest.MockedClass<new (options: RouterFactoryOptions) => RouterFactory>;
//
// 		const mockController = jest.fn().mockImplementation(() => ({
// 			routes: [
// 				{
// 					path: "/",
// 					method: "get",
// 					action: "all",
// 				},
// 			],
// 		}));
// 		controllerMock = mockController as jest.MockedClass<new (dataSource: DataSource) => BaseController<any>>;
//
// 		options = {
// 			dataSource: dataSourceMock as jest.Mocked<DataSource>,
// 			port: 3000 + i++,
// 			routerFactory: routerFactoryMock,
// 			controllers: [controllerMock],
// 		};
//
// 		app = new WebApplicationImpl(options);
//
// 		await app.bootstrap();
// 	});
//
// 	afterEach(async () => {
// 		// jest.clearAllMocks();
// 		await app.teardown();
// 	});
//
// 	it.only("should bootstrap without errors", async () => {
// 		expect(dataSourceMock.initialize).toHaveBeenCalledTimes(1);
// 	});
//
// 	it("should handle error during data source initialization", async () => {
// 		dataSourceMock.initialize.mockRejectedValue(new Error("Test error"));
// 		await expect(app.bootstrap()).rejects.toThrow("Test error");
// 		expect(dataSourceMock.initialize).toHaveBeenCalledTimes(1);
// 	});
//
// 	it("should teardown without errors", async () => {
// 		await app.teardown();
// 		expect(dataSourceMock.destroy).toHaveBeenCalledTimes(1);
// 	});
// });

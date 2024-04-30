import {WebApplicationImpl} from "./WebApplicationImpl";
import {DataSource} from "typeorm";

describe("WebApplicationImpl", () => {
	let dataSourceMock: jest.Mocked<DataSource>;
	let app: WebApplicationImpl;

	beforeEach(async () => {
		dataSourceMock = {
			initialize: jest.fn().mockResolvedValue(undefined),
			destroy: jest.fn().mockResolvedValue(undefined),
		} as unknown as jest.Mocked<DataSource>;

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
});
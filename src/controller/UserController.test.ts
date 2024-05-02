import "reflect-metadata";
import { UserController } from "../controller/UserController";
import { DataSource, Repository } from "typeorm";

class User {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
}

describe("UserController", () => {
	let userController: UserController;
	let mockDataSource: DataSource;
	let mockRepository: Repository<User>;

	beforeEach(() => {
		mockRepository = {} as Repository<User>;
		mockDataSource = { getRepository: jest.fn().mockReturnValue(mockRepository) } as unknown as DataSource;
		userController = new UserController(mockDataSource);
	});

	it("should return user count", async () => {
		mockRepository.count = jest.fn().mockResolvedValue(10);
		const result = await userController.info();
		expect(result).toBe(10);
	});

	it("should return all users", async () => {
		const users = [new User(), new User()];
		mockRepository.find = jest.fn().mockResolvedValue(users);
		const result = await userController.all();
		expect(result).toEqual(users);
	});

	it("should return a user by id", async () => {
		const user = new User();
		mockRepository.findOne = jest.fn().mockResolvedValue(user);
		const result = await userController.one({ params: { id: '1' } } as any);
		expect(result).toEqual(user);
	});

	it("should throw error when user not found", async () => {
		mockRepository.findOne = jest.fn().mockResolvedValue(undefined);
		await expect(userController.one({ params: { id: '1' } } as any)).rejects.toThrow("unregistered user");
	});

	it("should save a user", async () => {
		const user = new User();
		mockRepository.save = jest.fn().mockResolvedValue(user);
		const result = await userController.save({ body: user } as any);
		expect(result).toEqual(user);
	});

	it("should update a user", async () => {
		const user = new User();
		mockRepository.findOne = jest.fn().mockResolvedValue(user);
		mockRepository.save = jest.fn().mockResolvedValue(user);
		const result = await userController.update({ params: { id: '1' }, body: user } as any);
		expect(result).toEqual(user);
	});

	it("should throw error when updating non-existing user", async () => {
		mockRepository.findOne = jest.fn().mockResolvedValue(undefined);
		await expect(userController.update({ params: { id: '1' }, body: undefined } as any)).rejects.toThrow("this user not exist");
	});

	it("should remove a user", async () => {
		const user = new User();
		mockRepository.findOne = jest.fn().mockResolvedValue(user);
		mockRepository.remove = jest.fn().mockResolvedValue(user);
		const result = await userController.remove({ params: { id: '1' } } as any);
		expect(result).toEqual("user has been removed");
	});

	it("should throw error when removing non-existing user", async () => {
		mockRepository.findOne = jest.fn().mockResolvedValue(undefined);
		await expect(userController.remove({ params: { id: '1' } } as any)).rejects.toThrow("this user not exist");
	});
});
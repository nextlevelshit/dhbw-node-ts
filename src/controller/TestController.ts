import {Request} from "express";
import {RouteController} from "../config/types";

export class TestController implements RouteController<unknown> {
	async create(request: Request) {
		return `this is this body ${JSON.stringify(request.body)}`;
	}

	async getByName(request: Request) {
		return `this is the one ${request.params.name}`;
	}

	async all() {
		return "this is all";
	}

	async softDelete(request: Request) {
		return `this is soft delete ${request.params.id}`;
	}
}

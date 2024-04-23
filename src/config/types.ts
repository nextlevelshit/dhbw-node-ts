import {Controller} from "../io/BaseController";

export interface Route {
	method: "get" | "post" | "put" | "delete";
	route: string;
	action: keyof Controller<any>;
}

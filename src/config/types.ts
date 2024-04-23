import {Controller} from "../io/BaseController";

export interface Route {
	method: "get" | "post" | "put" | "delete";
	path: string;
	action: keyof Controller<any>;
}

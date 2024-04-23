import {Route} from "./config/types";

export const userRoutes: Route[] = [{
	method: "get",
	path: "/users",
	action: "all"
}, {
	method: "get",
	path: "/users/:id",
	action: "one"
}, {
	method: "post",
	path: "/users",
	action: "save"
}, {
	method: "delete",
	path: "/users/:id",
	action: "remove"
}]

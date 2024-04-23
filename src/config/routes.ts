import {Route} from "./types";

export const userRoutes: Route[] = [
	{
		method: "get",
		path: "/user",
		action: "all",
	},
	{
		method: "get",
		path: "/user/:id",
		action: "one",
	},
	{
		method: "post",
		path: "/user",
		action: "save",
	},
	{
		method: "delete",
		path: "/user/:id",
		action: "remove",
	},
];

export const partyRoutes: Route[] = [
	{
		method: "get",
		path: "/party",
		action: "all",
	},
	{
		method: "get",
		path: "/party/:id",
		action: "one",
	},
	{
		method: "post",
		path: "/party",
		action: "save",
	},
	{
		method: "delete",
		path: "/party/:id",
		action: "remove",
	},
];
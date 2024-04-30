import {RouteMethod} from "../config/types";

export type ControllerMethodDecoratorFactory = (
	method: RouteMethod,
) => (path: string) => MethodDecorator;

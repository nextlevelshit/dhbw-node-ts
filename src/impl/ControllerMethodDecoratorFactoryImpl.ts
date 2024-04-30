import {RouteController} from "../config/types";
import {ControllerMethodDecoratorFactory} from "../io/ControllerMethodDecoratorFactory";
import {WebRoute} from "../io/WebApplication";
import {routesKey, prefixKey} from "../config/constants";

export const ControllerMethodDecoratorFactoryImpl: ControllerMethodDecoratorFactory = (method) => {
	return (path) => {
		return (target, action): void => {
			if (!Reflect.hasMetadata(routesKey, target.constructor)) {
				Reflect.defineMetadata(routesKey, [], target.constructor);
			}

			const routes = Reflect.getMetadata(routesKey, target.constructor) as WebRoute[];

			routes.push({
				path,
				method,
				action: target[action as keyof Omit<RouteController<unknown>, "repository">],
			});
			Reflect.defineMetadata(routesKey, routes, target.constructor);
		};
	};
};
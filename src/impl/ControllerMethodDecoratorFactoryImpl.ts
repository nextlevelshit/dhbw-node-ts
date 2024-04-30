import {RouteController, Route} from "../config/types";
import {ControllerMethodDecoratorFactory} from "../io/ControllerMethodDecoratorFactory";
import {routesKey} from "../config/constants";

export const ControllerMethodDecoratorFactoryImpl: ControllerMethodDecoratorFactory = (
	method,
) => {
	return (path) => {
		return (target, action): void => {
			if (!Reflect.hasMetadata(routesKey, target.constructor)) {
				Reflect.defineMetadata(routesKey, [], target.constructor);
			}

			const routes = Reflect.getMetadata(routesKey, target.constructor) as Route[];

			routes.push({
				path,
				method,
				action: action as keyof Omit<RouteController<unknown>, "repository">,
			});

			Reflect.defineMetadata(routesKey, routes, target.constructor);
		};
	};
};

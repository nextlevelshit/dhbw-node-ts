import {routesKey, prefixKey} from "../config/constants";

export const Controller = (prefix = ""): ClassDecorator => {
	return (target) => {
		Reflect.defineMetadata(prefixKey, prefix, target);

		if (!Reflect.hasMetadata(routesKey, target)) {
			Reflect.defineMetadata(routesKey, [], target);
		}
	};
};

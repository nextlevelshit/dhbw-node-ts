import {ControllerMethodDecoratorFactoryImpl} from "../impl/ControllerMethodDecoratorFactoryImpl";

export const Delete = (path: string): MethodDecorator => {
	return ControllerMethodDecoratorFactoryImpl("delete")(path);
};

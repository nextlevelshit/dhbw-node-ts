import {ControllerMethodDecoratorFactoryImpl} from "../impl/ControllerMethodDecoratorFactoryImpl";

export const Get = (path: string): MethodDecorator => {
	return ControllerMethodDecoratorFactoryImpl("get")(path);
};

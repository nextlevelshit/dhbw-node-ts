import {ControllerMethodDecoratorFactoryImpl} from "../impl/ControllerMethodDecoratorFactoryImpl";

export const Put = (path: string): MethodDecorator => {
	return ControllerMethodDecoratorFactoryImpl("put")(path);
};

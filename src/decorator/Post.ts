import {ControllerMethodDecoratorFactoryImpl} from "../impl/ControllerMethodDecoratorFactoryImpl";

export const Post = (path: string): MethodDecorator => {
	return ControllerMethodDecoratorFactoryImpl("post")(path);
};

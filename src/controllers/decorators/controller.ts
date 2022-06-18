import { RequestHandler, Response, Request, NextFunction } from 'express';
import { AppRouter } from '../../AppRouter';
import { MetadataKey } from './MetadataKeysEnum';
import { Methods } from './MethodsEnum';

const bodyValidatorMW = (keys: string[]): RequestHandler => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(402).send('Invalid request, No body');
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(402).send(`Invalid request, ${key} is missing`);
        return;
      }
    }
    next();
  };
};

export function controller(routePrefix: string = '') {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (const key in target.prototype) {
      const routeHandler: RequestHandler = target.prototype?.[key];
      const path: string = Reflect.getMetadata(
        MetadataKey.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKey.method,
        target.prototype,
        key
      );
      const middlewares: RequestHandler[] =
        Reflect.getMetadata(MetadataKey.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps: string[] =
        Reflect.getMetadata(MetadataKey.validator, target.prototype, key) || [];
      const validator: RequestHandler = bodyValidatorMW(requiredBodyProps);
      if (path && method) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}

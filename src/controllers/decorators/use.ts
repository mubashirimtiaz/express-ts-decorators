import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKey } from './MetadataKeysEnum';

export function use(middleware: RequestHandler) {
  return function (target: object, key: string, desc: PropertyDescriptor) {
    const middlewares: RequestHandler[] =
      Reflect.getMetadata(MetadataKey.middleware, target, key) || [];
    Reflect.defineMetadata(
      MetadataKey.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}

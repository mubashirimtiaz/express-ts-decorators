import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKey } from './MetadataKeysEnum';
import { Methods } from './MethodsEnum';

interface routeHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routerBinder(method: string) {
  return function (path: string = '') {
    return function (
      target: object,
      key: string,
      desc: routeHandlerDescriptor
    ) {
      Reflect.defineMetadata(MetadataKey.path, path, target, key);
      Reflect.defineMetadata(MetadataKey.method, method, target, key);
    };
  };
}

export const get = routerBinder(Methods.get);
export const put = routerBinder(Methods.put);
export const post = routerBinder(Methods.post);
export const dlt = routerBinder(Methods.delete);
export const patch = routerBinder(Methods.patch);

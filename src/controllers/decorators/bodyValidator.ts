import 'reflect-metadata';
import { MetadataKey } from './MetadataKeysEnum';
export function bodyValidator(...keys: string[]) {
  return function (target: object, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKey.validator, keys, target, key);
  };
}

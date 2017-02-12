'use strict';

import Logger from './Logger';

const Logging: MethodDecorator = (
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
): TypedPropertyDescriptor<any> => {
  const src = descriptor.value;
  descriptor.value = function() {
    Logger.debug(`${propertyKey} method called.`);
    for (let i = 0; i < arguments.length; i++) {
      Logger.debug(`arguments[${i}]: ${arguments[i]}`);
    }
    const result = src.apply(this, arguments);
    Logger.debug(`result: ${result}`);
    return result;
  };
  return descriptor;
};

export default Logging;

'use strict';

const TestDecorator: ClassDecorator = (target: Function) => {

  console.log(target);
};

export default TestDecorator;

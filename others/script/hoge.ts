'use strict';

import Logging from './Logging';

class Hoge {

  @Logging
  isPrime(value: number): boolean {
    if (value < 2) {
      return false;
    }
    if (value !== 2 && value % 2 === 0) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(value); i++) {
      if (value % i === 0) {
        return false;
      }
    }
    return true;
  }

}
const hoge = new Hoge();

console.log(hoge.isPrime(73));
console.log(hoge.isPrime(79));	
console.log(hoge.isPrime(83));	
console.log(hoge.isPrime(89));	
console.log(hoge.isPrime(97));	
console.log(hoge.isPrime(101));	
console.log(hoge.isPrime(103));	
console.log(hoge.isPrime(107));	
console.log(hoge.isPrime(109));	
console.log(hoge.isPrime(113));	
console.log(hoge.isPrime(127));	
console.log(hoge.isPrime(131));	
console.log(hoge.isPrime(137));	
console.log(hoge.isPrime(139));	
console.log(hoge.isPrime(149));	
console.log(hoge.isPrime(151));	
console.log(hoge.isPrime(157));	
console.log(hoge.isPrime(163));	
console.log(hoge.isPrime(167));	
console.log(hoge.isPrime(173));


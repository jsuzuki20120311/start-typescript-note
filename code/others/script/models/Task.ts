import Runnable from './Runnable';

class Task implements Runnable {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  run(): boolean {
    let result = false;
    // 何か処理をする
    return result;
  }
}

export default Task;
/*
 * @Description: 全局派发器 GlobalEventDistributor 职责是触发各个模块对外的API.
 * @Author: shifeng
 * @Email: shifeng199307@gmail.com
 * @Date: 2020-03-25 22:02:24
 */

export class GlobalEventDistributor {

  constructor() {
    // 在函数实例化的时候,初始一个数组,保存所有模块的对外api
    this.stores = [];
  }

  // 注册
  registerStore(store) {
    this.stores.push(store);
  }

  // 触发,这个函数会被种到每一个模块当中.便于每一个模块可以调用其他模块的 api
  // 大致是每个模块都问一遍,是否有对应的事件触发.如果每个模块都有,都会被触发.
  dispatch(event) {
    this.stores.forEach((s) => {
      s.dispatch(event)
    });
  }

  // 获取所有模块当前的对外状态
  getState() {
    let state = {};
    this.stores.forEach((s) => {
      let currentState = s.getState();
      // console.log(currentState)
      state[currentState.namespace] = currentState
    });
    return state
  }
}

export default class PubSub {
  constructor() {
    this.subscriptions = {};
  }

  subscribe(route, callback) {
    let routeArray = this.subscriptions[route];
    if (routeArray === undefined) {
      this.subscriptions[route] = [];
      routeArray = this.subscriptions[route];
    }
    routeArray.push(callback);
  }

  publish(route, message) {
    this.subscriptions[route].forEach((callback) => { callback(message); });
  }
}
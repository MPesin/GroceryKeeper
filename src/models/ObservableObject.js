// the observable object subscribes to callbacks.
export default class ObservableObject {
  constructor() {
    this.observers = [];
  }

  subscribe(observerToAdd) {
    this.observers.push(observerToAdd);
  }

  unsubscribe(observerToRemove) {
    this.observers = this.observers.filter((observer) => {
      if (observer !== observerToRemove) {
        return observer;
      }
    });
  }

  unsubscribeAll() {
    this.observers = [];
  }

  notifyAll() {
    if (this.observers.length !== 0) {
      this.observers.forEach(observer => {
        observer.call();
      });
    }
  }
}
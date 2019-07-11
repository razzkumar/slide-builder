class Notification {
  constructor(container) {
    this.container = container;
    this.notificationWrapper = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: "notification"
      }
    });
    this.init = this.init.bind(this);
  }

  init(message, delay = 2000, type = "success") {
    this.notificationWrapper.classList.add("active", type);
    this.notificationWrapper.innerHTML = message

    setTimeout(() => {
      this.notificationWrapper.classList.remove("active", type);
    }, delay);

    return this;
  }
}

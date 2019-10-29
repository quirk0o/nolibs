export class BrowserHistory {
  history = window.history

  listen (cb) {
    window.onpopstate = (e) => {
      e.preventDefault()
      cb(new URL(window.location), e.state)
    }
  }

  location () {
    return new URL(window.location)
  }

  push (path, state = {}) {
    this.history.pushState(state, '', path)
  }
}

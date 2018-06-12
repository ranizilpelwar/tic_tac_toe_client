class WindowListener {
  static promptOnRedirect() {
    window.onbeforeunload = () => { return "This will end the game, are you sure?" };
  }
}

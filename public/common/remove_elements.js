class RemoveElements {
  static at(elementToRemove) {
    let parent = elementToRemove.parentElement;
    elementToRemove.remove();
    return parent;
  }
}
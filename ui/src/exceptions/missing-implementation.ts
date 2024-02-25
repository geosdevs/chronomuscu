export default class MissingImplementationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingImplementation";
  }
}
export default class EventError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EventError';
    this.message = `error.event.${message}`;
  }
}

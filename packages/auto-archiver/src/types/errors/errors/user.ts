export default class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
    this.message = `error.user.${message}`;
  }
}

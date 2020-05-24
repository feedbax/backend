export default class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
    this.message = `error.auth.${message}`;
  }
}

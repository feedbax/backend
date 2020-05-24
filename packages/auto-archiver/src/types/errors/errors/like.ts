export default class LikeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LikeError';
    this.message = `error.like.${message}`;
  }
}

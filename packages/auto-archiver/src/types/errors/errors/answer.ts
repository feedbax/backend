export default class AnswerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AnswerError';
    this.message = `error.answer.${message}`;
  }
}

export default class QuestionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuestionError';
    this.message = `error.question.${message}`;
  }
}

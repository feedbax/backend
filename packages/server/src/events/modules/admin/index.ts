import userEvents from '~events/modules/user';

export default [
  ...userEvents,
  import('~events/modules/admin/login'),
  import('~events/modules/admin/answer/destroy'),
  import('~events/modules/admin/answer/edit'),
  import('~events/modules/admin/answer/merge'),
  import('~events/modules/admin/question/create'),
  import('~events/modules/admin/question/destroy'),
  import('~events/modules/admin/event/create'),
  import('~events/modules/admin/event/destroy'),
];

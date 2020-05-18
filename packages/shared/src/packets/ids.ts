export default {
  Server: {
    Question: {
      Create: '106',
      Destroy: '107',
    },

    Answer: {
      Create: '102',
      Destroy: '103',
      Edit: '104',
      Merge: '105',
    },

    Like: {
      Create: '100',
      Destroy: '101',
    },
  },

  Client: {
    User: {
      Login: '000-0',

      Event: {
        Get: '001',
      },

      Answer: {
        Create: '003',
      },

      Like: {
        Toggle: '002',
      },
    },

    Admin: {
      Login: '000-1',

      Event: {
        Create: '008',
        Destroy: '009',
      },

      Question: {
        Create: '007',
        Destroy: '010',
      },

      Answer: {
        Destroy: '004',
        Edit: '005',
        Merge: '006',
      },
    },
  },
};

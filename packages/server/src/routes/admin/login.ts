import type { Express } from 'express';

export default async function login(server: Express): Promise<void> {
  server.get('/', (req, res) => {
    res.json({
      ichglaub: 'eshackt',
    });
  });
}

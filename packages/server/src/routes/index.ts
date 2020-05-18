import routesAdmin from '~routes/admin';

import type { Express } from 'express';

interface Handler {
  default: (server: Express) => Promise<void>;
}

export default async function registerRoutes(
  server: Express,
): Promise<void> {
  const routes = {
    admin: await Promise.all<Handler>(routesAdmin),
  };

  routes.admin.forEach((route) => route.default(server));
}

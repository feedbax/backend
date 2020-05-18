# feedbax backend monorepo

This is the monorepo of the feedb.ax backend. It consists of the modules:
- server
- api
- shared

### Server
A Node.js® backend written in TypeScript. Communication with the frontend via WebSockets. Saves the data and scales horiziontally via Redis.

### api
An npm module that contains the necessary tools to communicate with the Node.js backend. Written in TypeScript, state management with Redux.

### shared
Contains all the shared types between the server and the api module.

# Setup

To set up the subprojects for development, it is recommended that you run `yarn run install`* once in the root directory of `@feedbax/backend`.
  
After this it is recommended to open the packages seperately in different VSCode workspaces. At least the ones you want to develop. Because everyone ships it's own eslint / typescript configs.
  
  
\* The `run` in `yarn run install` is important because it does not install dependencies, but runs its own installer script.
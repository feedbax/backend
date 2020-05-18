import { createStore, combineReducers } from 'redux';
import modules from './modules';

import type { AnyAction, Reducer, Store } from 'redux';

export const apiReducer = combineReducers(modules);
const rootReducer = combineReducers({ api: apiReducer });

export interface DispatchAll {
  dispatchAll: (...actions: AnyAction[]) => void;
}

export function addDispatchAll<T extends Store>(store: T): T & DispatchAll {
  const $store: T & Partial<DispatchAll> = store;

  $store.dispatchAll = (...actions: AnyAction[]): void => {
    for (let i = 0; i < actions.length; i += 1) {
      const action = actions[i];
      store.dispatch(action);
    }
  };

  return $store as T & DispatchAll;
}

const $store = createStore(rootReducer);
const store = addDispatchAll($store);

export type ApiStateDefault = ReturnType<typeof rootReducer>;
export type ApiStoreDefault = typeof store;

export default store;
export { Reducer };

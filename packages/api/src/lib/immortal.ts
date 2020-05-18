import { ImmortalStorage, IndexedDbStore, LocalStorageStore } from 'immortal-db';

const stores = [IndexedDbStore, LocalStorageStore];
const db = new ImmortalStorage(stores);

export default db;

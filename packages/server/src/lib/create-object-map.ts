export interface MapObject {
  [key: string]: string | MapObject;
}

export type ObjectMap = Map<string, string | MapObject>;

interface CreateMapping {
  (map: ObjectMap, object: MapObject, stack: string): ObjectMap;
}

function isMapObject(value: string | MapObject): value is MapObject {
  return typeof value === 'object';
}

const createMapping: CreateMapping = (map, object, stack) => {
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = object[key];

    if (isMapObject(value)) {
      createMapping(map, value, `${stack}.${key}`);
    } else {
      map.set(value, `${stack}.${key}`);
    }

    map.set(`${stack}.${key}`, value);
  }

  map.set(`${stack}`, object);

  return map;
};

export default createMapping;

import { localStorage } from './browser';

function getItem<T>(name: string): T | null {
  const item: string | null = localStorage().getItem(name);
  return item ? (JSON.parse(item) as T) : null;
}

function setItem<T>(name: string, item: T) {
  const json: string = JSON.stringify(item);
  localStorage().setItem(name, json);
}

function removeItem(name: string) {
  localStorage().removeItem(name);
}

export { getItem, setItem, removeItem };

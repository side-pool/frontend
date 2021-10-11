export function saveItem(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

export function loadItem(key: string) {
  return sessionStorage.getItem(key);
}

export function removeItem(key: string) {
  sessionStorage.removeItem(key);
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

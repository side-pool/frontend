import { saveItem, loadItem, removeItem } from './storage';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string | number) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
});

describe('storage', () => {
  const testData = { userId: 1, userEmail: 'example@gmail.com' };

  beforeEach(() => {
    window.sessionStorage.clear();
    jest.restoreAllMocks();
  });

  it('setItem 으로 저장한 값은 loadItem 으로 가져와진다', () => {
    const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
    const setItemSpy = jest.spyOn(window.sessionStorage, 'setItem');

    saveItem('userInfo', JSON.stringify(testData));
    const loadedItem = loadItem('userInfo') ?? '';

    expect(setItemSpy).toBeCalled();
    expect(getItemSpy).toBeCalledWith('userInfo');
    expect(JSON.parse(loadedItem)).toEqual({
      userId: 1,
      userEmail: 'example@gmail.com',
    });
  });

  it('저장된 값이 없다면 loadItem 의 리턴 값은 undefined이다', () => {
    const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
    const loadedItem = loadItem('userInfo');

    expect(loadedItem).toBeUndefined();
    expect(getItemSpy).toBeCalledWith('userInfo');
  });

  it('saveItem으로 저장된 값은 removeItem으로 지울 수 있다', () => {
    const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
    const setItemSpy = jest.spyOn(window.sessionStorage, 'setItem');
    const removeItemSpy = jest.spyOn(window.sessionStorage, 'removeItem');

    saveItem(
      'userInfo',
      JSON.stringify({ userId: 1, userEmail: 'example@gmail.com' }),
    );
    removeItem('userInfo');
    const loadedItem = loadItem('userInfo');

    expect(setItemSpy).toBeCalled();
    expect(removeItemSpy).toBeCalled();
    expect(getItemSpy).toBeCalledWith('userInfo');
    expect(loadedItem).toBeUndefined();
  });
});

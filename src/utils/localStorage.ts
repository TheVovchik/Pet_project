export const getFromLocalStorage = (key: string) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key) ?? '');
  }

  return '';
};

export const setInLocalStorage = (key: string, item: any) => {
  localStorage.setItem(key, JSON.stringify(item));
};

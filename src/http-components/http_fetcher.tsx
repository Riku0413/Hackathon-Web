// この関数はあらゆるGETリクエストに使いまわせる
// 変える必要があるのは、引数のURLだけ！！

export const httpFetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }
  return res.json();
};

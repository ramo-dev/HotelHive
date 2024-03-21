const getQuery = async (search: any) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const res = await fetch(url + search);
  const data = await res.json();
  return data;
};

export default getQuery;

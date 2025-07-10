const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTask(limit = 10) {
  const res = await fetch(`${API_URL}?_limit=${limit}`);
  return res.json();
}

export async function fetchTaskById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

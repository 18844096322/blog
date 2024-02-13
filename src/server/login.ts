export async function login(username: string, password: string): Promise<boolean> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ username, password }),
  })
  return response.json();
}
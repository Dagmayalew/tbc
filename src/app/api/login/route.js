import { mockUsers } from "../../utils/mockData";

export async function POST(req) {
  const { username, password } = await req.json();

  const user = mockUsers.find((u) => u.username === username && u.password === password);

  if (user) {
    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ message: "Invalid username or password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}

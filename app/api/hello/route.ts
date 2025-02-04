export async function GET() {
    return new Response(JSON.stringify({ message: "Hello, API!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  
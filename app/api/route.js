export async function GET() {
  console.log("hey");
  const res = await fetch("https://www.spod.com/articles", {
    headers: {
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": "1993b5d3-e00b-4959-b6c1-a86f374dc222",
    },
  });

  console.log("res: ", res);
  const data = await res.json();
  console.log("data: ", data);
  return Response.json({ data });
}

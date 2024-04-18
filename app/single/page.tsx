import React from "react";

export default async function Single() {
  const res = await fetch("https://rest.spod.com/articles/2803251", {
    method: "GET",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
    },
  });

  const article = await res.json();

  console.log("single: ", article);
  return <div>Single</div>;
}

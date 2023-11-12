
export const httpWorkMake = async (user_id: string) => {  

  try {
    const res = await fetch("https://hackathon-bafb6ceksa-uc.a.run.app/work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to make work: ${res.status}`);
    }

    // HTTPリクエストが成功した場合、JSONレスポンスを受け取る
    const jsonData = await res.json();
    const id = jsonData.id;
    return id;

  } catch (err) {
    console.error(err);
  }
};
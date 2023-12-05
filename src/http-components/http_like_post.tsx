;
export const httpLikePost = async (user_id: string, item_category: string, item_id: string) => {  

  try {
    const res = await fetch("http://localhost:8080/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, item_category, item_id}),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to make blog: ${res.status}`);
    }

    // HTTPリクエストが成功した場合、JSONレスポンスを受け取る
    const jsonData = await res.json();
    const id = jsonData.id;
    return id;

  } catch (err) {
    console.error(err);
  }
};
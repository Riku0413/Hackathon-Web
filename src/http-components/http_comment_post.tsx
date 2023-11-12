// import { mutate } from "swr";

// 返り値はUID?
export const httpCommentPost = async (user_id: string, user_name: string, item_category: string, item_id: string, content: string) => {  

  try {
    const res = await fetch("https://hackathon-bafb6ceksa-uc.a.run.app/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, user_name, item_category, item_id, content}),
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
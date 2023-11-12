// import { mutate } from "swr";

// 返り値はUID?
export const httpBlogUpdate = async (id: string, title: string, content: string) => {  

  try {
    const res = await fetch("https://hackathon-bafb6ceksa-uc.a.run.app/blog/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to update blog: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

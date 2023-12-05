// import { mutate } from "swr";

// 返り値はUID?
export const httpVideoUpdate = async (id: string, title: string, introduction: string, url: string) => {  

  try {
    const res = await fetch("http://localhost:8080/video/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, introduction, url }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to update video: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

// import { mutate } from "swr";

// 返り値はUID?
export const httpBookUpdate = async (id: string, title: string, introduction: string) => {  

  try {
    const res = await fetch("https://hackathon-bafb6ceksa-uc.a.run.app/book/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, introduction }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to update blog: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

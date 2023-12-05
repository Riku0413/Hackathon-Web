// import { mutate } from "swr";

// 返り値はUID?
export const httpBlogPublish = async (id: string, publish: boolean) => {  

  try {
    const res = await fetch("http://localhost:8080/blog/publish", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, publish }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to publish blog: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

// import { mutate } from "swr";

// 返り値はUID?
export const httpWorkPublish = async (id: string, publish: boolean) => {  

  try {
    const res = await fetch("http://localhost:8080/work/publish", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, publish }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to publish work: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

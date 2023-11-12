// import { mutate } from "swr";

// 返り値はUID?
export const httpBookPublish = async (id: string, publish: boolean) => {  

  try {
    // console.log(publish);
    const res = await fetch("https://hackathon-bafb6ceksa-uc.a.run.app/book/publish", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, publish }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to publish book: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

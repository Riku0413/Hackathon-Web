// import { mutate } from "swr";

// 返り値はUID?
export const httpUserRegister = async (id: string, user_name: string) => {  

  try {
    const res = await fetch("https://hackathon-bafb6ceksa-uc.a.run.app/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, user_name }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to post uid: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }
};
// import { mutate } from "swr";

// 返り値はUID?
export const httpUserRegister = async (id: string) => {  

  try {
    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to post uid: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }
};
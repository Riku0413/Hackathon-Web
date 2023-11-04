import { mutate } from "swr";

// 返り値なし！！
export const httpRobotPost = async (name: string, age: number) => {  

  if (!name) {
    alert("Please enter name");
    return;
  }

  if (name.length > 50) {
    alert("Please enter a name shorter than 50 characters");
    return;
  }

  if (age < 20 || age > 80) {
    alert("Please enter age between 20 and 80");
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/robot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age }),
    });

    if (!res.ok) {
      throw new Error(`Failed to post user: ${res.status}`);
    }

    mutate("http://localhost:8080/robots");
  } catch (err) {
    console.error(err);
  }
};
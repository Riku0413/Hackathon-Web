
export const httpWorkUpdate = async (id: string, title: string, introduction: string, url: string) => {  

  try {
    const res = await fetch("http://localhost:8080/work/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, introduction, url }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to update work: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

// 返り値はUID?
export const httpChapterUpdate = async (id: string, title: string, content: string) => {  

  try {
    const res = await fetch("http://localhost:8080/chapter/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content }),
    });
 
    if (!res.ok) {
      throw new Error(`Failed to update chapter: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

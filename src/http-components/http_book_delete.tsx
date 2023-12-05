// 返り値はUID?
export const httpBookDelete = async (id: string) => {  

  try {
    const res = await fetch(`http://localhost:8080/book/${id}`, {
      method: "DELETE"
    });
 
    if (!res.ok) {
      throw new Error(`Failed to delete blog: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

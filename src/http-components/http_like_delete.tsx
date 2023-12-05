// 返り値はUID?
export const httpLikeDelete = async (item_category: string, item_id: string, id: string) => {  

  try {
    const res = await fetch(`http://localhost:8080/like/${item_category}/${item_id}/${id}`, {
      method: "DELETE"
    });
 
    if (!res.ok) {
      throw new Error(`Failed to delete like: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};


export const httpWorkDelete = async (id: string) => {  

  try {
    const res = await fetch(`http://localhost:8080/work/${id}`, {
      method: "DELETE"
    });
 
    if (!res.ok) {
      throw new Error(`Failed to delete work: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

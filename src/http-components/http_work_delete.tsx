
export const httpWorkDelete = async (id: string) => {  

  try {
    const res = await fetch(`https://hackathon-bafb6ceksa-uc.a.run.app/work/${id}`, {
      method: "DELETE"
    });
 
    if (!res.ok) {
      throw new Error(`Failed to delete work: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

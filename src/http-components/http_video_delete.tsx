
export const httpVideoDelete = async (id: string) => {  

  try {
    const res = await fetch(`https://hackathon-bafb6ceksa-uc.a.run.app/video/${id}`, {
      method: "DELETE"
    });
 
    if (!res.ok) {
      throw new Error(`Failed to delete video: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

// 返り値はUID?
export const httpBlogDelete = async (id: string) => {  

  try {
    const res = await fetch(`https://hackathon-bafb6ceksa-uc.a.run.app/blog/${id}`, {
      method: "DELETE"
    });
 
    if (!res.ok) {
      throw new Error(`Failed to delete blog: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};


export const httpUserUpdate = async (id: string, user_name: string, introduction: string, git_hub: string) => {  

  try {
    const res = await fetch("http://localhost:8080/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, user_name, introduction, git_hub }),
    });
    
    if (!res.ok) {
      throw new Error(`Failed to update user profile: ${res.status}`);
    }

  } catch (err) {
    console.error(err);
  }

};

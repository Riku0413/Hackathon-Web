import { FC, useState, FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "./Form.css"

// やりとりするデータのフォーマット
interface UserData {
  id: number;
  name: string;
  age: number;
}

// GETリクエストを送ってJSONを返す
const fetchUsers = async () => {
  const res = await fetch("https://hackathon-bafb6ceksa-uc.a.run.app/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  return res.json();
};

// name、ageとともにPOSTリクエストを送る
const postUser = async (userData: { name: string; age: number }) => {
  const res = await fetch("https://hackathon-bafb6ceksa-uc.a.run.app/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error(`Failed to post user: ${res.status}`);
  }
};

const Form: FC = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading, isError } = useQuery<UserData[]>(
    "users",
    fetchUsers
  );

  const mutation = useMutation(postUser, {
    onSettled: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

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

    mutation.mutate({ name, age });

    setName("");
    setAge(0);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* フォームの部分 */}
        <div className="form">
          <label htmlFor="name" className="property_name">Name:</label>
          <div className="input_field">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="form">
          <label htmlFor="age" className="property_name">Age:</label>
          <div className="input_field">
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="post-button-area">
          <button type="submit" className="post-button">
            POST
          </button>
        </div>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}

      {users && users.length > 0 && (
        <div>
          {users.map((item) => (
            <div className="data" key={item.id}>
              {item.name}, {item.age}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Form;
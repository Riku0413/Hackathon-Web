import { FC, useState, FormEvent } from "react";
import useSWR, { mutate } from "swr";
import "./Form.css";
import { httpFetcher } from "./http-components/http_fetcher";
import { httpRobotPost } from "./http-components/http_robot_post_get";

interface UserData {
  id: number;
  name: string;
  age: number;
}

const Form: FC = () => {
  // GETリクエストの定型文！
  const { data: users, error } = useSWR<UserData[]>(
    "http://localhost:8080/robots",
    httpFetcher
  );

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    httpRobotPost(name, age);
    setName("");
    setAge(0);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label htmlFor="name" className="property_name">
            Name:
          </label>
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
          <label htmlFor="age" className="property_name">
            Age:
          </label>
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
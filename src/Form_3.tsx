import { FC, useState, useEffect, FormEvent } from "react";
import "./Form.css";

interface UserData {
  id: number;
  name: string;
  age: number;
}

const Form: FC = () => {
  const [data, setUsers] = useState<UserData[]>([]);
  const [age, setAge] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [showData, setShowData] = useState<boolean>(true);

  useEffect(() => {
    // アプリの立ち上げ時にGETリクエストを送信し、データを取得する
    fetchUsers();
  }, []); // 空の依存配列を指定することで、アプリの立ち上げ時に一度だけ実行

  // データをとってきて表示するコンポーネント
  const fetchUsers = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:8080/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // エラーハンドリング
      if (!res.ok) {
        throw Error(`Failed to fetch users: ${res.status}`);
      }

      const users: UserData[] = await res.json();
      setUsers(users);
      setShowData(true); // データを表示

    } catch (err) {
      console.error(err);
    }
  };

  // データをポストした上で、改めてfetchUsersを起動するコンポーネント
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

    try {
      // ボタンをクリックした際にデータを送信
      const res = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      // エラーハンドリング
      if (!res.ok) {
        throw Error(`Failed to post user: ${res.status}`)
      }

      setName(""); // フォームをクリア
      setAge(0);
      fetchUsers(); // データを再取得して新しいデータを表示

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>

        <div className="form">
          <label htmlFor="name" className="property_name">
            Name:
          </label>
          <div className="input_field ">
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
          <button type={"submit"} className="post-button">
            POST
          </button>
        </div>

      </form>

      {showData && data.length > 0 && (
        <div>
          {data.map((item) => (
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
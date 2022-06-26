import SingupForm from "./components/SignupForm";
import Card from "./UI/Card";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import UserList from "./components/UserList";

import "./App.css";

function App() {
  const [userList, setUserlist] = useState<any>([]);

  useEffect(() => {
    axios
      .get(
        "https://react-job-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      )
      .then((response) => {
        let users: any = [];

        for (const key in response.data) {
          users.push({
            id: response.data[key].id,
            firstname: response.data[key].firstName,
            lastname: response.data[key].lastName,
            email: response.data[key].email,
            phone: response.data[key].phone,
          });
        }

        setUserlist(users);
      });
  }, []);

  const addUserHandler = (userData: any) => {
    userData.id = Math.random();

    axios.post(
      "https://react-job-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      userData
    );

    const newUser: {} = {
      id: Math.random(),
      firstname: userData.firstName,
      lastname: userData.lastName,
      email: userData.email,
      phone: userData.phone,
    };

    console.log(newUser);

    setUserlist((prevusers: any) => {
      return prevusers.concat(newUser);
    });
  };

  const removeUserHandler = (userid: number) => {
    axios.delete(
      `https://react-job-default-rtdb.europe-west1.firebasedatabase.app/users/users.json`
    );
    setUserlist((prevusers: any) =>
      prevusers.filter((user: any) => user.id !== userid)
    );
  };

  return (
    <div className="App">
      <Card>
        <SingupForm adduser={addUserHandler} />
      </Card>
      <UserList list={userList} onRemoveUser={removeUserHandler} />
    </div>
  );
}

export default App;

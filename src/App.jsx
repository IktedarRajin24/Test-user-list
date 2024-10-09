import { useEffect, useState } from "react";
import "./App.css";
import getUsers from "./Utilities/fetchUser";
import Loading from "./Components/Loading";
import Users from "./Components/Users";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getUsers("https://dummyjson.com/users");
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return <>{isLoading ? <Loading /> : <Users users={users} />}</>;
}

export default App;

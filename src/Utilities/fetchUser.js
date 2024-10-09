const getUsers = async () => {
  const localUsers = localStorage.getItem("users");
  if (localUsers) {
    return JSON.parse(localUsers);
  } else {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      localStorage.setItem("users", JSON.stringify(data.users));
      return data.users;
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }
};

export default getUsers;

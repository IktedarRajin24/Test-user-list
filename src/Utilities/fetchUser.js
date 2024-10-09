const getUsers = async (url) => {
  try {
    const response = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return response.users;
  } catch (error) {
    console.log("error", error);
  }
};

export default getUsers;

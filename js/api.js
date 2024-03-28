const url = 'https://api.github.com/users';

const getUser = async (username) => {
  const response = await axios.get(`${url}/${username}`);
  return response.data;
};

const getUserRepos = async (username) => {
  const response = await axios.get(`${url}/${username}/repos`);
  return response.data;
};

export default { getUser, getUserRepos };

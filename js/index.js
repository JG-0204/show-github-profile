import api from './api.js';

const githubUserSearchForm = document.getElementById('form');
const userInput = document.getElementById('input-username');

const getGithubUser = async (username) => {
  try {
    const user = await api.getUser(username);
    const userRepos = await api.getUserRepos(username);
    return { user, userRepos };
  } catch (error) {
    console.error('error:', error.message);
  }
};

const handleFormSubmit = (event) => {
  if (!userInput.value) {
    console.log('search a user..');
  } else {
    renderUser(userInput.value);
  }

  userInput.value = '';

  event.preventDefault();
};

githubUserSearchForm.addEventListener('submit', handleFormSubmit);

const renderUser = async (username) => {
  const container = document.getElementById('skeleton');

  const loadingHtml = '<p>loading...</p>';

  let loading = false;

  const setLoading = (val) => {
    loading = val;
  };

  setLoading(true);

  if (loading) {
    console.log('loading');
    container.innerHTML = loadingHtml;
  }

  try {
    const { user, userRepos } = await getGithubUser(username);

    setLoading(false);

    container.innerHTML = createGithubUserHtml(user, userRepos);

    console.log('user fetched');
  } catch (err) {
    setLoading(false);

    console.error('error:', err.message);
  }
};

const createGithubUserHtml = (user, userRepos) => {
  // subjected to change, just to see if it works
  const innerHtml = `
  <p> User: ${user.name ?? user.login} </p>
  <p> ReposCount: ${userRepos.length} </p> 
  `;

  return innerHtml;
};

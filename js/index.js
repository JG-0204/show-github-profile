import api from './api.js';
import createUserCard from './component.js';

const githubUserSearchForm = document.getElementById('form');
const userInput = document.getElementById('input-username');
const container = document.getElementById('container');

let loading;

const setLoading = (val) => (loading = val);

// const savedUser = window.localStorage.getItem('user');
// const parsedUser = JSON.parse(savedUser);

// const user = parsedUser.user;
// const userRepos = parsedUser.userRepos;

// const createGithubUserHtml = () => {
//   const mostStarredRepo = getUserMostStarredRepo(userRepos);

// subjected to change, just to see if it works
//   const html = `

//     <img  src=${user.avatar_url} class="w-[200px] "/>

//   <div>
//   <div class="flex gap-2 items-center">
//   <div class="flex gap-2">
//   <p class="font-bold">${user.name ?? user.login}</p>
//   <p class="font-extralight">${!user.name ? '' : user.login}</p>
//   </div>
//   <p>${user.location ?? 'ZA WARUDO!!'}</p>
//   </div>

//   <div class="stats shadow bg-secondary text-secondary-content">
//   <div class="stat place-items-center">
//   <div class="stat-value">${userRepos.length}</div>
//   <div class="stat-title">Public Repos</div>
// </div>
// <div class="stat place-items-center">
// <div class="stat-value">${user.followers}</div>
// <div class="stat-title">Followers</div>
// </div>
// <div class="stat place-items-center">
// <div class="stat-value">${user.following}</div>
// <div class="stat-title">Following</div>
// </div>
//   </div>
//   </div>
//   `;

//   return html;
// };

const createLoadingHtml = () => {
  const html = '<span class="loading loading-spinner loading-md"></span>';
  return html;
};

const getGithubUser = async (username) => {
  try {
    const user = await api.getUser(username);
    const userRepos = await api.getUserRepos(username);
    return { user, userRepos };
  } catch (error) {
    console.error('error:', error);
  }
};

const getUserMostStarredRepo = (repositories) => {
  // can use sort but when repos length is massive it can affect performance (I'm the only one who'll use this page lol)
  // made the code readable as possible

  const mostStarredRepo = repositories.reduce((currRepo, prevRepo) => {
    if (currRepo.stargazers_count > prevRepo.stargazers_count) {
      return currRepo;
    }
    return prevRepo;
  }, repositories[0]);

  return mostStarredRepo;
};

const renderUser = async (username) => {
  setLoading(true);

  if (loading) {
    console.log('loading...');
    container.innerHTML = createLoadingHtml();
  }

  try {
    const { user, userRepos } = await getGithubUser(username);

    // window.localStorage.clear();
    // window.localStorage.setItem('user', JSON.stringify({ user, userRepos }));

    setLoading(false);

    container.appendChild(createUserCard(user));
    console.log('user fetched');
  } catch (err) {
    setLoading(false);
    console.log('Error: ', err.message);
  }
};

const handleFormSubmit = (event) => {
  if (!userInput.value) {
    console.log('search a user..');
  } else {
    console.log('render');
    renderUser(userInput.value);
  }

  userInput.value = '';

  event.preventDefault();
};

githubUserSearchForm.addEventListener('submit', handleFormSubmit);

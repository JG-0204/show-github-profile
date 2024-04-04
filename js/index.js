import api from './api.js';
import {
  createSpinner,
  createUserCard,
  createHelpText,
  createError,
} from './component.js';

const githubUserSearchForm = document.getElementById('form');
const userInput = document.getElementById('input-username');
const container = document.getElementById('container');

const spinner = createSpinner();
let loading;

const setLoading = (val) => (loading = val);

const getGithubUser = async (username) => {
  try {
    const user = await api.getUser(username);
    const userRepos = await api.getUserRepos(username);
    return { user, userRepos };
  } catch (error) {
    if (error.response.status === 404) {
      showError("Hmmm, couldn't find that user.");
    } else if (error.response.status === 403) {
      showError("Hold your horses! API's on cooldown");
    } else {
      showError(
        "Well, that's awkward. Our bad! Try again when the internet's in a better mood.",
      );
    }
  }
};

const getUserMostStarredRepo = (repositories) => {
  // can use sort but when repos length is massive it can affect performance (I'm the only one who'll use this page lol)
  // made the code readable as possible

  if (!repositories.length) {
    const noRepo = {
      name: "don't click this",
      description: 'a black hole',
      html_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      updated_at: 'N/A',
      language: 'N/A',
      stargazers_count: '0',
    };

    return noRepo;
  }

  const mostStarredRepo = repositories.reduce((currRepo, prevRepo) => {
    if (currRepo.stargazers_count > prevRepo.stargazers_count) {
      return currRepo;
    }
    return prevRepo;
  }, repositories[0]);

  return mostStarredRepo;
};

const renderUser = async (username) => {
  // remove previous user card
  container.innerHTML = '';

  setLoading(true);

  if (loading) container.appendChild(spinner);

  try {
    const { user, userRepos } = await getGithubUser(username);

    setLoading(false);

    const mostStarredRepo = getUserMostStarredRepo(userRepos);
    const userCard = createUserCard(user, mostStarredRepo);

    container.removeChild(spinner);
    container.appendChild(userCard);
  } catch (err) {
    setLoading(false);
    container.removeChild(spinner);
  }
};

const handleFormSubmit = (event) => {
  if (!userInput.value) {
    showHelpText();
    userInput.focus();
  } else {
    renderUser(userInput.value);
  }

  userInput.value = '';

  event.preventDefault();
};

githubUserSearchForm.addEventListener('submit', handleFormSubmit);

const showHelpText = () => {
  const helpText = createHelpText();
  githubUserSearchForm.appendChild(helpText);

  setTimeout(() => {
    githubUserSearchForm.removeChild(helpText);
  }, 3000);
};

const showError = (errorMessage) => {
  const error = createError(errorMessage);
  container.appendChild(error);

  setTimeout(() => {
    container.removeChild(error);
  }, 5000);
};

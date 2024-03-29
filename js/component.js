const createElement = (type) => {
  const element = document.createElement(type);
  return element;
};

const createUserGeneralInfo = ({ name, login, location }) => {
  const container = createElement('div');
  const usernameContainer = createElement('div');

  const namePara = createElement('p');
  namePara.textContent = name ?? login;
  const usernamePara = createElement('p');
  usernamePara.textContent = !name ? '' : login;
  const locationPara = createElement('p');
  locationPara.textContent = location ?? '';

  usernameContainer.append(namePara, usernamePara);
  container.append(usernameContainer, locationPara);

  return container;
};

const createUserStats = ({ public_repos, followers, following }) => {
  const container = createElement('div');
  const repoCountContainer = createElement('div');
  const followerCountContainer = createElement('div');
  const followingCountContainer = createElement('div');

  const repoCount = createElement('div');
  repoCount.textContent = public_repos;
  const repoCountDesc = createElement('div');
  repoCountDesc.textContent = 'Public Repositories';

  const followerCount = createElement('div');
  followerCount.textContent = followers;
  const followerCountDesc = createElement('div');
  followerCountDesc.textContent = 'Followers';

  const followingCount = createElement('div');
  followingCount.textContent = following;
  const followingCountDesc = createElement('div');
  followingCountDesc.textContent = 'Following';

  repoCountContainer.append(repoCount, repoCountDesc);
  followerCountContainer.append(followerCount, followerCountDesc);
  followingCountContainer.append(followingCount, followingCountDesc);

  container.append(
    repoCountContainer,
    followerCountContainer,
    followingCountContainer,
  );

  return container;
};

const createUserCard = (user) => {
  const container = createElement('div');

  const avatar = createElement('img');
  avatar.src = user.avatar_url;

  container.append(avatar, createUserGeneralInfo(user), createUserStats(user));

  return container;
};

export default createUserCard;

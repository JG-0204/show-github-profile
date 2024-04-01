const createElement = (type) => {
  const element = document.createElement(type);
  return element;
};

const createUserGeneralInfo = ({ name, login, location }) => {
  const container = createElement('div');
  container.className = 'flex flex-col pl-[5px] w-content max-w-[500px] ';

  const namePara = createElement('p');
  namePara.textContent = name ?? login;
  namePara.className = 'font-bold text-lg';
  const usernamePara = createElement('p');
  usernamePara.textContent = !name ? '' : login;
  usernamePara.className = 'font-light text-sm';
  const locationPara = createElement('p');
  locationPara.textContent = location ?? 'dk, from earth probably';
  container.append(namePara, usernamePara, locationPara);

  return container;
};

const createUserStats = ({ public_repos, followers, following }) => {
  const container = createElement('div');
  container.className = 'stats shadow w-content max-w-[500px] bg-neutral';
  const repoCountContainer = createElement('div');
  repoCountContainer.className = 'stat place-items-center';
  const followerCountContainer = createElement('div');
  followerCountContainer.className = 'stat place-items-center';
  const followingCountContainer = createElement('div');
  followingCountContainer.className = 'stat place-items-center';

  const repoCount = createElement('div');
  repoCount.textContent = public_repos;
  repoCount.className = 'stat-value text-neutral-content';
  const repoCountDesc = createElement('div');
  repoCountDesc.textContent = 'Repositories';
  repoCountDesc.className = 'stat-title text-neutral-content';

  const followerCount = createElement('div');
  followerCount.textContent = followers;
  followerCount.className = 'stat-value text-neutral-content';
  const followerCountDesc = createElement('div');
  followerCountDesc.textContent = 'Followers';
  followerCountDesc.className = 'stat-title text-neutral-content';

  const followingCount = createElement('div');
  followingCount.textContent = following;
  followingCount.className = 'stat-value text-neutral-content';
  const followingCountDesc = createElement('div');
  followingCountDesc.textContent = 'Following';
  followingCountDesc.className = 'stat-title text-neutral-content';

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

const createUserMostStarredRepository = ({
  name,
  html_url,
  description,
  updated_at,
  stargazers_count,
  language,
}) => {
  const container = createElement('div');
  container.className =
    'w-content max-w-[500px] h-fit max-h-[150px] flex flex-col gap-5';

  const projectOverviewContainer = createElement('div');
  projectOverviewContainer.className =
    'flex flex-col gap-[5px] pt-[3px] px-[5px]';
  const repoDetailsContainer = createElement('div');
  repoDetailsContainer.className = 'flex justify-around pb-[5px]';

  const projectAnchor = createElement('a');
  projectAnchor.className = 'link';
  projectAnchor.textContent = name;
  projectAnchor.href = html_url;
  const projectNamePara = createElement('p');
  projectNamePara.appendChild(projectAnchor);
  projectNamePara.className = 'text-center font-bold text-primary';

  const descriptionPara = createElement('p');
  descriptionPara.textContent = exceedsCharacterLimit(description)
    ? 'too long, just click the link if you are interested!'
    : description;
  descriptionPara.className = 'font-light text-neutral text-justify';

  const updatedPara = createElement('p');
  updatedPara.textContent = `Updated on ${formatDate(updated_at)}`;

  const starsPara = createElement('p');
  starsPara.textContent = stargazers_count;
  const languagePara = createElement('p');
  languagePara.textContent = language;

  projectOverviewContainer.append(projectNamePara, descriptionPara);
  repoDetailsContainer.append(updatedPara, starsPara, languagePara);

  container.append(projectOverviewContainer, repoDetailsContainer);

  return container;
};

const createUserCard = (user, repo) => {
  const container = createElement('div');
  container.className = 'flex gap-[1rem]';

  const infoContainer = createElement('div');
  infoContainer.className = 'flex flex-col gap-[5px]';

  infoContainer.append(
    createUserGeneralInfo(user),
    createUserMostStarredRepository(repo),
    createUserStats(user),
  );

  const avatar = createElement('img');
  avatar.className = 'w-[300px] rounded-2xl ';
  avatar.src = user.avatar_url;

  // ring ring-primary ring-offset-base-100 ring-offset-4

  container.append(avatar, infoContainer);

  return container;
};

const createSpinner = () => {
  const spinner = createElement('span');
  spinner.className = 'loading loading-spinner loading-lg mt-[100px]';
  return spinner;
};

const createHelpText = () => {
  const span = createElement('span');
  span.textContent = 'Input a username';
  span.className =
    'absolute right-[200px] bottom-[-2rem]  rounded-md badge gap-2"';
  return span;
};

// format date as MM-D
const formatDate = (date) => {
  if (date === 'N/A') {
    return date;
  }

  const options = { month: 'short', day: 'numeric' };

  const formattedDate = new Date(date).toLocaleDateString('en-us', options);
  return formattedDate;
};

const exceedsCharacterLimit = (text, limit = 80) => {
  return text.split('').length > limit;
};

export { createSpinner, createUserCard, createHelpText };

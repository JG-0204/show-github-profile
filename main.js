const userInput = document.querySelector('#login-input');
const showButton = document.querySelector('.btn');
const container = document.querySelector('.data-container');
const dialog = document.querySelector('dialog');

showButton.addEventListener('click', renderUser);

async function renderUser() {
   const username = userInput.value;

   if (username === '') {
      alert('Please enter a username');
      return;
   }

   let user = await getUsers(username);

   if (!user) return;

   let userRepos = await getRepo(username);

   const mostStarredRepo = getMostStarredRepo(userRepos);

   let html = `
   <div class="avatar-container">
      <img class="user-avatar"
      src="${user.avatar_url}"
      alt="user-avatar"/>
   </div>

   <section class="profile-info">
      <h2 class="user-name">
         <a href="${user.html_url}" target="_blank">
            ${user.name ?? user.login}
         </a>
      </h2>
      <p class="user-bio">${user.bio ?? 'This user has not included a bio.'}</p>
   </section>

   <div class="social-info">
      <p class="user-twitter">${user.twitter_username ?? 'None'}</p>
      <p class="user-followers">Followers: ${user.followers}</p>
      <p class="user-following">Following: ${user.following}</p>
   </div>

   <section class="most-starred-repo">
      <h2 class="repo-name">
         <a href="${mostStarredRepo.url}" target="_blank">${
      mostStarredRepo.name
   }</a>
      </h2>
      <p class="repo-description">${mostStarredRepo.description}</p>

      <div>
         <p class="repo-stars">${mostStarredRepo.star}</p>
         <p class="repo-language">${mostStarredRepo.language}</p>
         <p class="repo-last-updated">Updated: ${mostStarredRepo.pushed_at}</p>
      </div>
   </section>
   
   <div class="account-info">
      <p class="user-public-repos">Public Repositories: ${user.public_repos}</p>
      <p class="user-created-at">Joined: ${formatDate(user.created_at)}</p>
   </div>`;

   container.innerHTML = html;
   container.style.display = 'grid';

   userInput.value = '';
}

async function getUsers(username) {
   let url = `https://api.github.com/users/${username}`;

   try {
      let res = await fetch(url);
      return res.status !== 200 ? renderUserNotFoundModal() : res.json();
   } catch (err) {
      console.log(err);
      return null;
   }
}

async function getRepo(username) {
   let url = `https://api.github.com/users/${username}/repos`;

   try {
      let res = await fetch(url);
      return res.json();
   } catch (err) {
      console.log(err);
      return null;
   }
}

function renderUserNotFoundModal() {
   dialog.showModal();
   userInput.value = '';
}

function getMostStarredRepo(repositories) {
   if (repositories.length === 0) {
      return {
         name: 'No repositories',
         description: 'N/A',
         language: 'N/A',
         star: 'N/A',
         url: '',
         pushed_at: 'N/A',
      };
   }

   const mostStarred = repositories.reduce((prev, current) =>
      current.stargazers_count > prev.stargazers_count ? current : prev
   );

   return {
      name: mostStarred.name,
      description: mostStarred.description ?? 'N/A',
      language: mostStarred.language ?? 'N/A',
      star: mostStarred.stargazers_count,
      url: mostStarred.html_url,
      pushed_at: formatDate(mostStarred.pushed_at),
   };
}

// Function to format a date as "Month Day Year"
function formatDate(date) {
   const options = { year: 'numeric', month: 'long', day: 'numeric' };
   return new Date(date).toLocaleDateString(undefined, options);
}

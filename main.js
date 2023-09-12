const userInput = document.querySelector('#login-input');
const showButton = document.querySelector('.btn');
const container = document.querySelector('.data-container');
const dialog = document.querySelector('dialog');

showButton.addEventListener('click', renderUser);

async function renderUser() {
   let user = await getUsers();
   let userRepos = await getRepo();

   if (user === undefined || userRepos === undefined) return true;

   const mostStarredRepo = getMostStarredRepo(userRepos);

   let html = `
   <div>
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
         <p class="repo-last-updated">${formatDate(
            mostStarredRepo.pushed_at
         )}</p>
      </div>
   </section>
   
   <div class="account-info">
      <p class="user-public-repos">Public Repositories: ${user.public_repos}</p>
      <p class="user-created-at">Date Created: ${formatDate(
         user.created_at
      )}</p>
   </div>`;

   container.innerHTML = html;
   container.style.display = 'grid';

   userInput.value = '';
}

async function getUsers() {
   if (userInput.value === '') {
      alert('Enter something');
      return;
   }

   let url = `https://api.github.com/users/${userInput.value}`;

   try {
      let res = await fetch(url);
      console.log(res);
      return res.status !== 200 ? renderUserNotFoundModal() : res.json();
   } catch (err) {
      console.log(err);
   }
}

function renderUserNotFoundModal() {
   dialog.showModal();
   userInput.value = '';
}

async function getRepo() {
   if (userInput.value === '') return undefined;

   let url = `https://api.github.com/users/${userInput.value}/repos`;

   try {
      let res = await fetch(url);
      return res.json();
   } catch (err) {
      console.log(err);
   }
}

function getMostStarredRepo(repository) {
   const repo = {
      name: 'default name',
      description: 'default description',
      language: 'default language',
      star: 'N/A',
      url: '',
      pushed_at: 'N/A',
   };

   if (repository.length === 0) return repo;

   const starArr = [];
   // loop
   repository.forEach((project) => {
      // find the most starred
      starArr.push(project.stargazers_count);
   });

   repository.forEach((project) => {
      if (project.stargazers_count === Math.max(...starArr)) {
         repo.name = project.name;
         repo.description = project.description;
         repo.language = project.language ?? 'No language';
         repo.star = project.stargazers_count;
         repo.url = project.html_url;
         repo.pushed_at = project.pushed_at;
      }
   });

   return repo;
}

function formatDate(date) {
   const d = date.slice(0, 10);

   let month = d.split('-')[1];
   const year = d.split('-')[0];
   const day = d.split('-')[2];

   switch (month) {
      case '01':
         month = 'January';
         break;
      case '02':
         month = 'February';
         break;
      case '03':
         month = 'March';
         break;
      case '04':
         month = 'April';
         break;
      case '05':
         month = 'May';
         break;
      case '06':
         month = 'June';
         break;
      case '07':
         month = 'July';
         break;
      case '08':
         month = 'August';
         break;
      case '09':
         month = 'September';
         break;
      case '10':
         month = 'October';
         break;
      case '11':
         month = 'November';
         break;
      case '12':
         month = 'December';
         break;
   }

   return `${month} ${day} ${year}`;
}

// try and implement local storage
// refactor if possible

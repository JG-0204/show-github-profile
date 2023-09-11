const userInput = document.querySelector('#login-input');
const showButton = document.querySelector('.btn');

showButton.addEventListener('click', renderUser);

async function renderUser() {
   let user = await getUsers();
   let html = '';

   let segment = `
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
         <a href="#" target="_blank">sample-repo</a>
      </h2>
      <p class="repo-description">Lorem ipsum dolor sit.</p>

      <div>
         <p class="repo-stars">35</p>
         <p class="repo-language">HTML</p>
         <p class="repo-last-updated">2021-04-08</p>
      </div>
   </section>
   
   <div class="account-info">
      <p class="user-public-repos">Public Repositories: ${user.public_repos}</p>
      <p class="user-created-at">Date Created: ${user.created_at.slice(
         0,
         10
      )}</p>
   </div>`;

   html += segment;

   let container = document.querySelector('.data-container');
   container.innerHTML = html;
   container.style.display = 'grid';

   userInput.value = '';
}

async function getUsers() {
   if (userInput.value === '') return true;

   let url = `https://api.github.com/users/${userInput.value}`;

   try {
      let res = await fetch(url);
      return res.status === 404 ? renderUserNotFoundModal() : res.json();
   } catch (err) {
      console.log(err);
   }
}

function renderUserNotFoundModal() {
   document.querySelector('dialog').showModal();
   userInput.value = '';
}

async function getUsers() {
   let url = 'https://api.github.com/users/jg-0204';
   try {
      let res = await fetch(url);
      if (res.status === 404) {
         console.log('User Not Found.');
      } else {
         return res.json();
      }
   } catch (err) {
      console.log(err);
   }
}

getUsers();

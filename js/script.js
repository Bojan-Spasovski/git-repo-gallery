// div where profile information will appear.
const profileInfo = document.querySelector(".overview");
const username = "Bojan-Spasovski";
const repoList = document.querySelector(".repo-list");

const gitProfile = async function () {
  const gitProfile = await fetch(`https://api.github.com/users/${username}`);
  const data = await gitProfile.json();

  displayUserInfo(data);
};

gitProfile();



const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  profileInfo.append(div);
  fetchRepoList();
};

const fetchRepoList = async function () {
  const repoLink = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoLink.json();
  // console.log(repoData);
  displayRepoInfo(repoData);
};

// fetchRepoList();

const displayRepoInfo = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};




// div where profile information will appear.
const profileInfo = document.querySelector(".overview");
const username = "Bojan-Spasovski";
const repoList = document.querySelector(".repo-list");
const repoInfo = document.querySelector(".repos");
const repoContent = document.querySelector(".repo-data");

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

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    specificRepoInfo(repoName);
  }

});

const specificRepoInfo = async function (repoName) {
  const specRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
  const specRepoData = await specRepo.json();
  console.log(specRepoData);
  // Grab languages
  const fetchLanguages = await fetch(specRepoData.languages_url);
  const languageData = await fetchLanguages.json();


  // Make a list of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  console.log(languages);
  displaySpecRepoInfo(specRepoData, languages);
};

const displaySpecRepoInfo = function (specRepoData, languages) {
  repoContent.innerHTML = "";
  repoContent.classList.remove("hide");
  repoInfo.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${specRepoData.name}</h3>
  <p>Description: ${specRepoData.description}</p>
  <p>Default Branch: ${specRepoData.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${specRepoData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`;
  repoContent.append(div);
};





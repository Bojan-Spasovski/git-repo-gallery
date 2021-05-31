// div where profile information will appear.
const profileInfo = document.querySelector(".overview");
const username = "Bojan-Spasovski";
const repoList = document.querySelector(".repo-list");
const repoInfo = document.querySelector(".repos");
const repoContent = document.querySelector(".repo-data");
const backToRepoButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

// Fetch information from your GitHub profile using the GitHub API address

const gitProfile = async function () {
  const gitProfile = await fetch(`https://api.github.com/users/${username}`);
  const data = await gitProfile.json();

  displayUserInfo(data);
};

gitProfile();

// Fetch GitHub user data, 
// Display the fetched user information on the page 
// Function accepts the JSON data as a parameter.

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

// Fetch repos 
// Sorted repos by the most recently updated to last updated. 
// Showed up to 100 repos per page at a time. 

const fetchRepoList = async function () {
  const repoLink = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoLink.json();
  // console.log(repoData);
  displayRepoInfo(repoData);
};

// Displayed Info About Repos

const displayRepoInfo = function (repos) {
  filterInput.classList.remove("hide");
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

//  Fetched request to grab information about the specific repository.

const specificRepoInfo = async function (repoName) {
  const specRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
  const specRepoData = await specRepo.json();
  console.log(specRepoData);
  // Grab languages
  const fetchLanguages = await fetch(specRepoData.languages_url);
  const languageData = await fetchLanguages.json();


  // Made a array of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  console.log(languages);
  displaySpecRepoInfo(specRepoData, languages);

};

// Function to Display Specific Repo Info

const displaySpecRepoInfo = function (specRepoData, languages) {
  backToRepoButton.classList.remove("hide");
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

// Click Event to the Back Button
backToRepoButton.addEventListener("click", function () {
  repoInfo.classList.remove("hide");
  repoContent.classList.add("hide");
  backToRepoButton.classList.add("hide");
});

// Input Event to the Search Box

filterInput.addEventListener("input", function (e) {
  const inputTextValue = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = inputTextValue.toLowerCase();

  for (const letter of repos) {
    
    const repoLowerText = letter.innerText.toLowerCase();
    
    if (repoLowerText.includes(searchLowerText)) {
      letter.classList.remove("hide");
    } else {
      letter.classList.add("hide");
    }
  }
});



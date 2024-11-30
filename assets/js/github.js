async function fetchGithub(githubUser) {
  try {
    const colourResponse = await fetch('assets/js/json/colour.json');
    const colour = await colourResponse.json();
    const userResponse = await fetch(`https://api.github.com/users/${githubUser}`);
    const data = await userResponse.json();
    const reposResponse = await fetch(`https://api.github.com/users/${githubUser}/repos`);
    const repos = await reposResponse.json();
    const mainContainer = document.getElementById("card");
    for (let i = 0; i < data.public_repos; i++) {
      const repo = repos[i];
      if (!repo) continue;
      repo.topics = repo.topics || "N/A";
      repo.language = repo.language || "N/A";
      try {
        const mdResponse = await fetch(`assets/md/${repo.name}.md`);
        const md = await mdResponse.text();
        const div = document.createElement("div");
        div.innerHTML = `
          <div class="col s12 m4">
            <a href="#project-git_${i}">
              <div class="card darken-1">
                <div class="card-thumbnail"><img src="../assets/img/thumbnail/${repo.name}.png"></div>
                <div class="card-content white-text">
                <a href="https://github.com/${githubUser}/${repo.name}" target="_blank"><i class="fab fa-github github-link"></i></a>
                  <a href="https://github.com/${githubUser}/${repo.name}" target="_blank"><span class="card-title">${repo.name}</span></a>
                  <p class="card-description">${repo.description}</p>
                  <p class="small-text tags">${repo.topics.toString().split(',').join(', ').toUpperCase()} </p>
                </div>
                <div class="card-action">
                  <span class="code-colour" style="background-color: ${colour[repo.language] || "#fff"};"></span> ${repo.language}
                  <div style="float: right; margin-right: 0;">
                    <i class="fas fa-code-branch"></i> ${repo.forks_count} 
                    <i class="fas fa-star"></i> ${repo.stargazers_count} 
                    <i class="far fa-calendar" style="padding-left: 10px; padding-right: 2px"></i> ${new Date(repo.created_at).getUTCFullYear()}
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div class="popup" id="project-git_${i}">
            <a class="popup-overlay" href="#"></a>
            <div class="popup-wrapper">
              <div class="popup-content">
                <a class="popup-close" href="#"><i class="fas fa-times card-title"></i></a>
                <div class="popup-box" id="md">
                  ${DOMPurify.sanitize(marked.parse(md))}
                </div>
              </div>
            </div>
          </div>`;
        mainContainer.appendChild(div);
      } catch (err) {
        console.error(`Error fetching markdown for repo ${repo.name}:`, err);
      }
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}
fetchGithub("fayzaanali");
function fetchGithub(githubUser){  
  fetch('assets/js/json/colour.json').then(res => res.json()).then(colour => {
    fetch('https://api.github.com/users/' + githubUser).then(res => res.json()).then(data => {
      fetch('https://api.github.com/users/' + githubUser + '/repos').then(res => res.json()).then(repo => {
      var mainContainer = document.getElementById("row");
        for (i = 0; i < data.public_repos; i++) {
          if (repo[i].topics == undefined) repo[i].topics = "N/A";
          if (repo[i].language == undefined) repo[i].language = "N/A";
          var div = document.createElement("div");
          div.innerHTML = 
          `<div class="col s12 m4">
            <a href="${repo[i].html_url}" target="_blank">
              <div class="card darken-1">
              <div class="card-thumbnail"><img src="../assets/img/thumbnail/${repo[i].name}.png"></div>
                <div class="card-content white-text">
                  <span class="card-title">${repo[i].name} <i class="fas fa-external-link-alt title-link"></i></span>
                  <p class="card-description">${repo[i].description}</p>
                  <p class="small-text tags">${repo[i].topics.toString().split(',').join(', ').toUpperCase()} </p>
                </div>
                <div class="card-action">
                  <span class="code-colour" style="background-color: ${colour[repo[i].language] || "#fff"};"></span> ${repo[i].language}
                  <div style="float: right; margin-right: 0;"><i class="fas fa-code-branch"></i> ${repo[i].forks_count} <i class="fas fa-star"></i> ${repo[i].stargazers_count} <i class="far fa-calendar" style="padding-left: 10px; padding-right: 2px"></i> ${new Date(repo[i].created_at).getUTCFullYear()}</div>
                </div>
              </div>
            </a>
          </div>`
        mainContainer.appendChild(div);
        }
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
  })
};
fetchGithub("fayzaanali");
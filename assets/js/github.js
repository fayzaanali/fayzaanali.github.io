var tags = {
  "fayzaanali.github.io": [" HTML", " CSS", " JS", " Website"],
  "Pacman-S2D": [" C++", " Game-Engine", " OpenGL"],
  "Mario-SDL": [" C++", " Game-Engine", " OpenGL", " SDL"]
 }

function fetchGithub(githubUser){  
  fetch('assets/js/json/colour.json').then(res => res.json()).then(colour => {
    fetch('https://api.github.com/users/' + githubUser).then(res => res.json()).then(data => {
      fetch('https://api.github.com/users/' + githubUser + '/repos').then(res => res.json()).then(repo => {
      var mainContainer = document.getElementById("row");
        for (i = 0; i < data.public_repos; i++) {
          if (tags[repo[i].name] == undefined) tags[repo[i].name] = "N/A";
          if (repo[i].language == undefined) repo[i].language = "N/A";
          var div = document.createElement("div");
          div.innerHTML = 
          `<div class="col s12 m6">
          <div class="card darken-1">
            <div class="card-content white-text">
              <a href="${repo[i].html_url}" target="_blank"><span class="card-title">${repo[i].name}</span></a>
              <p class="card-description">${repo[i].description}</p>
              <p class="small-text">${tags[repo[i].name]}</p>
            </div>
            <div class="card-action">
              <span class="code-colour" style="background-color: ${colour[repo[i].language] || "#fff"};"></span> ${repo[i].language}
              <div style="float: right; margin-right: 0;"><i class="fas fa-code-branch"></i> ${repo[i].forks_count} <i class="fas fa-star"></i> ${repo[i].stargazers_count}</div>
            </div>
          </div>
        </div>`
        mainContainer.appendChild(div);
        }
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
  })
};

fetchGithub("fayzaanali");


var tags = {
  "fayzaanali.github.io": [" HTML", " CSS", " JS", " Website"],
  "Pacman-S2D": [" C++", " Game-Engine", " OpenGL"],
  "Mario-SDL": [" C++", " Game-Engine", " OpenGL", " SDL"]
 }
 
fetch('https://api.github.com/users/fayzaanali').then(res => res.json()).then(data => {
  fetch('https://api.github.com/users/fayzaanali/repos').then(res => res.json()).then(repo => {
    // add modal here and use loop to create multiple ids
    var mainContainer = document.getElementById("row");
      for (i = 0; i < data.public_repos; i++) {
        if (tags[repo[i].name] == undefined) tags[repo[i].name] = "N/A";
        var div = document.createElement("div");
        div.innerHTML = 
        `<div class="col s12 m6">
        <div class="card darken-1">
          <div class="card-content white-text">
            <span class="card-title">${repo[i].name}</span>
            <p class="card-description">${repo[i].description}</p>
            <p class="small-text">${tags[repo[i].name]}</p>
          </div>
          <div class="card-action">
            <a href="${repo[i].html_url}" target="_blank"><i class="fas fa-code-branch"></i> REPO</a>
            <!-- <a href="#" style="float: right; margin-right: 0;">More Info</a> -->
          </div>
        </div>
      </div>`
      mainContainer.appendChild(div);
      }
    }).catch(err => console.error(err));
}).catch(err => console.error(err));
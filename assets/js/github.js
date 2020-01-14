var tags = {
  0: [" HTML", " CSS", " JS", " Website"],
  1: [" C++", " Game-Engine", " OpenGL"] 
 }
 
fetch('https://api.github.com/users/fayzaanali').then(res => res.json()).then(data => {
  fetch('https://api.github.com/users/fayzaanali/repos').then(res => res.json()).then(repo => {
    var mainContainer = document.getElementById("row");
      for (i = 0; i < data.public_repos; i++) {
        var div = document.createElement("div");
        div.innerHTML = 
        `<div class="col s12 m6">
        <div class="card darken-1">
          <div class="card-content white-text">
            <span class="card-title">${repo[i].name}</span>
            <p class="card-description">${repo[i].description}</p>
            <p class="small-text">${tags[i]}</p>
          </div>
          <div class="card-action">
            <a href="${repo[i].html_url}" target="_blank">Repo</a>
            <!-- <a href="#" style="float: right; margin-right: 0;">More Info</a> -->
          </div>
        </div>
      </div>`
      mainContainer.appendChild(div);
      }
    }).catch(err => console.error(err));
}).catch(err => console.error(err))
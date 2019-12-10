fetch('https://api.github.com/users/fayzaanali/repos').then(res => res.json()).then(repo => {
  document.getElementById('repo').innerHTML = 
    `<div class="col s12 m6">
    <div class="card darken-1">
      <div class="card-content white-text">
        <span class="card-title">${repo[0].name}</span>
        <p>${repo[0].description}</p>
        <p class="small-text">Website | CSS | HTML | JS</p>
      </div>
      <div class="card-action">
        <a href="${repo[0].html_url}" target="_blank">Repo</a>
        <a href="#" style="float: right; margin-right: 0;">More Info</a>
      </div>
    </div>
  </div>
  <div class="col s12 m6">
    <div class="card darken-1">
      <div class="card-content white-text">
        <span class="card-title">${repo[1].name}</span>
        <p>${repo[1].description}</p>
        <p class="small-text">C++ | Game-Engine | OpenGL</p>
      </div>
      <div class="card-action">
        <a href="${repo[1].html_url}" target="_blank">Repo</a>
        <a href="#" style="float: right; margin-right: 0;">More Info</a>
      </div>
    </div>
  </div>`
}).catch(error => console.error(error));
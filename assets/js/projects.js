async function fetchProject() {
  try {
    const colourResponse = await fetch('assets/js/json/colour.json');
    const colour = await colourResponse.json();
    const projectsResponse = await fetch('assets/js/json/projects.json');
    const project = await projectsResponse.json();
    const mainContainer = document.getElementById("card");
    for (let i = 0; i < (project.projects).length; i++)
    {
      const data = project.projects[i];
      if (!data) continue;
      try{
        const mdResponse = await fetch(`assets/md/${data.name}.md`);
        const md = await mdResponse.text();
        const div = document.createElement("div");
        div.innerHTML =
        `<div class="col s12 m4">
          <a href="#project_${i}">
            <div class="card darken-1">
            <div class="card-thumbnail"><img src="../assets/img/thumbnail/${data.name}.png"></div>
              <div class="card-content white-text">
                <a href="${data.link}" target="_blank"><i class="fab fa-github github-link"></i></a>
                <a href="${data.link}" target="_blank"><span class="card-title">${data.name}</span></a>
                <p class="card-description">${data.description}</p>
                <p class="small-text tags">${data.tags.toString().split(',').join(', ').toUpperCase()} </p>
              </div>
              <div class="card-action">
                <span class="code-colour" style="background-color: ${colour[data.language] || "#fff"};"></span> ${data.language}
                <div style="float: right; margin-right: 0;"> <i class="fas fa-user-friends"></i> <i class="far fa-calendar" style="padding-left: 10px; padding-right: 2px"></i> ${data.year}</div>
              </div>
            </div>
          </a>
        </div>
        <div class="popup" id="project_${i}">
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
        console.error("Error:", err);
      }
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  }

}
fetchProject();
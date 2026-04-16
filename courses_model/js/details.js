const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const course = courses.find(c => c.id == id);

document.getElementById("details").innerHTML = `
  <div class="card-form" style="width:80%;margin:20px auto">

    <h1>${course.title}</h1>
    <p>${course.fullDescription}</p>

    <h3>Weekly Plan</h3>

    ${course.weekly.map((w,i)=>`
      <p><b>Week ${i+1}:</b> ${w}</p>
    `).join("")}

  </div>
`;
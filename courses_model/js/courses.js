const container = document.getElementById("courseContainer");

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const list = category ? courses.filter(c => c.category === category) : courses;

list.forEach(c => {
  container.innerHTML += `
    <div class="card">

      <div class="img-box">
        <img src="${c.image}">
      </div>

      <div class="card-body">

        <h2>${c.title}</h2>

        <!-- TABS -->
        <div class="tabs">
          <button onclick="showTab(${c.id},'overview')">Overview</button>
          <button onclick="showTab(${c.id},'syllabus')">Syllabus</button>
          <button onclick="showTab(${c.id},'price')">Price</button>
          <button onclick="openForm(${c.id})">Enroll</button>
        </div>

        <!-- CONTENT -->
        <div id="tab-${c.id}" class="tab-content">
          ${overviewHTML(c)}
        </div>

      </div>
    </div>
  `;
});

// TAB SWITCH
function showTab(id, type){
  const course = courses.find(c => c.id === id);
  const box = document.getElementById("tab-" + id);

  if(type === "overview"){
    box.innerHTML = overviewHTML(course);
  }

  if(type === "syllabus"){
    box.innerHTML = `
      <div class="syllabus">
        ${course.weekly.map((w,i)=>`
          <div class="week">Week ${i+1} - ${w}</div>
        `).join("")}
      </div>
    `;
  }

  if(type === "price"){
    box.innerHTML = `
      <div class="price-box">
        <h3>₹${course.price}</h3>
        <p>Duration: ${course.duration}</p>
      </div>
    `;
  }
}

// OVERVIEW
function overviewHTML(c){
  return `
    <p>${c.description}</p>
    <p><b>Duration:</b> ${c.duration}</p>
  `;
}

// ENROLL
let selectedCourse = null;

function openForm(id){
  selectedCourse = courses.find(c => c.id === id);

  document.getElementById("applyTitle").innerText =
    "Enroll in " + selectedCourse.title;

  document.getElementById("applyBox").style.display = "flex";
}

function showPayment(){
  document.getElementById("applyBox").style.display = "none";
  document.getElementById("paymentBox").style.display = "flex";
}

function confirmPayment(){
  document.getElementById("paymentBox").style.display = "none";
  document.getElementById("successBox").style.display = "flex";
}

function closeAll(){
  document.getElementById("successBox").style.display = "none";
}

function validateForm(){

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const nameRegex = /^[A-Za-z ]{3,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  if(!nameRegex.test(name)){
    alert("Enter valid name");
    return;
  }

  if(!emailRegex.test(email)){
    alert("Enter valid email");
    return;
  }

  if(!phoneRegex.test(phone)){
    alert("Enter valid mobile number");
    return;
  }

  // SUCCESS → OPEN PAYMENT
  document.getElementById("applyBox").style.display = "none";
  document.getElementById("paymentBox").style.display = "flex";
}
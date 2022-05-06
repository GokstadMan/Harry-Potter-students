let studentArray = [];
let slytherinArray = [];
let gryffindorArray = [];
let ravenclawArray = [];
let hufflepuffArray = [];

let studentContainer = document.getElementById("student-container");

async function fetchStudents() {
  let response = await fetch(
    "http://hp-api.herokuapp.com/api/characters/students/"
  ); // or API as defined
  let data = await response.json();
  studentArray.push(data);

  // filtrate students in own arrays

  data.filter((student) => {
    if (student.house == "Slytherin") {
      slytherinArray.push(student);
    }
    if (student.house == "Gryffindor") {
      gryffindorArray.push(student);
    }
    if (student.house == "Ravenclaw") {
      ravenclawArray.push(student);
    }
    if (student.house == "Hufflepuff") {
      hufflepuffArray.push(student);
    }
  });
}

//SearchBar

const searchBar = document.getElementById("search-bar");
let studentsList = document.getElementById("students-list");

searchBar.addEventListener("keyup", function (e) {
  let searchString = e.target.value.toLowerCase();
  let filteredCharacters = slytherinArray
    .concat(gryffindorArray, ravenclawArray, hufflepuffArray)
    .filter(function (students) {
      return students.name.toLowerCase().includes(searchString);
    });
  showStudents(filteredCharacters);
  if (searchBar.value === "") {
    studentsList.innerHTML = "";
  }
});

let houseOfSlytherin = document.getElementById("house-of-slytherin");
houseOfSlytherin.addEventListener("click", function () {
  filterStudents("Slytherin");
});

let houseOfGryffindor = document.getElementById("house-of-gryffindor");
houseOfGryffindor.addEventListener("click", function () {
  filterStudents("Gryffindor");
});

let houseOfRavenclaw = document.getElementById("house-of-ravenclaw");
houseOfRavenclaw.addEventListener("click", function () {
  filterStudents("Ravenclaw");
});

let houseOfHufflepuff = document.getElementById("house-of-hufflepuff");
houseOfHufflepuff.addEventListener("click", function () {
  filterStudents("Hufflepuff");
});

function filterStudents(house) {
  if (house == "Slytherin") {
    let studHouse = slytherinArray;
    showStudents(studHouse);
  }

  if (house == "Gryffindor") {
    let studHouse = gryffindorArray;
    showStudents(studHouse);
  }

  if (house == "Ravenclaw") {
    let studHouse = ravenclawArray;
    showStudents(studHouse);
  }

  if (house == "Hufflepuff") {
    let studHouse = hufflepuffArray;
    showStudents(studHouse);
  }
}

function showStudents(studHouse) {
  studentContainer.innerHTML = "";
  for (let i = 0; i < studHouse.length; i++) {
    let div = document.createElement("div");
    div.classList.add("student-card");
    div.style.backgroundColor = "rgb(107, 230, 134)";

    let img = document.createElement("img");
    img.classList.add("student-img");
    img.src = studHouse[i].image;
    if (studHouse[i].image === "") {
      img.src = studHouse[i].image = "./images/avatar.jpg";
    }

    let studentName = document.createElement("h4");
    studentName.innerText = studHouse[i].name;

    let studentHouse = document.createElement("p");
    studentHouse.innerText = studHouse[i].house;
    if (studHouse[i].house === "Slytherin") {
      div.style.backgroundColor = "rgb(107, 230, 134)";
    } else if (studHouse[i].house === "Gryffindor") {
      div.style.backgroundColor = "rgb(151, 184, 226)";
    } else if (studHouse[i].house === "Hufflepuff") {
      div.style.backgroundColor = "rgb(231, 168, 226)";
    } else if (studHouse[i].house === "Ravenclaw") {
      div.style.backgroundColor = "rgb(231, 202, 140)";
    }

    let studentAge = document.createElement("p");
    if (studHouse[i].yearOfBirth == "") {
      studentAge.innerText = "Alder: uvisst";
    } else {
      studentAge.innerText = `Alder: ${2022 - studHouse[i].yearOfBirth} år`;
    }

    let studentAlive = document.createElement("p");
    if (studHouse[i].alive == false) {
      studentAlive.innerText = "I live: Nei";
      studentAlive.style.color = "red";
      studentAge.style.visibility = "hidden";
    } else {
      studentAlive.innerText = "I live: Ja";
    }

    div.append(studentName, img, studentHouse, studentAge, studentAlive);
    studentContainer.append(div);
  }
}

function createStudentMember(studHouse) {
  let studentName = document.getElementById("student-name").value;
  let studentHouse = document.getElementById("student-house").value;
  let yearOfBirth = document.getElementById("year-of-birth").value;
  let newImage = "./images/avatar.jpg";

  if (studentName == "" || studentHouse == "" || yearOfBirth == "") {
    alert("Husk alle felter må fylles ut!");
    return;
  } else if (
    (studentHouse !== "Slytherin") &
    (studentHouse !== "Gryffindor") &
    (studentHouse !== "Ravenclaw") &
    (studentHouse !== "Hufflepuff")
  ) {
    alert("Huset må være en av de 4!");
    return;
  }

  if (studentHouse == "Slytherin") {
    slytherinArray.unshift({
      name: studentName,
      image: newImage,
      house: studentHouse,
      yearOfBirth: yearOfBirth,
    });
  }
  if (studentHouse == "Gryffindor") {
    gryffindorArray.unshift({
      name: studentName,
      image: newImage,
      house: studentHouse,
      yearOfBirth: yearOfBirth,
    });
  }
  if (studentHouse == "Ravenclaw") {
    ravenclawArray.unshift({
      name: studentName,
      image: newImage,
      house: studentHouse,
      yearOfBirth: yearOfBirth,
    });
  }
  if (studentHouse == "Hufflepuff") {
    hufflepuffArray.unshift({
      name: studentName,
      image: newImage,
      house: studentHouse,
      yearOfBirth: yearOfBirth,
    });
  }

  let answer = prompt("Ønsker du å lagre ansatt? (ja/nei)");
  if (answer === "ja") {
    showStudents(studHouse);
  }
}

let addstudentBtn = document.getElementById("add-student-btn");
addstudentBtn.addEventListener("click", createStudentMember);

fetchStudents();

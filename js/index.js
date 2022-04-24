let url = "http://localhost:3000/";

let page = 1;

function monsters(page) {
  fetch(`${url}monsters/?_limit=50&_page=${page}`)
    .then((res) => res.json())
    
    .then((monsters) => {
      for (let monster of monsters) {
        let monster_container = document.getElementById("monster-container");
        let container = document.createElement("div");
        container.innerHTML = `
           <h1> ${monster.name}</h1>
           <p> ${monster.age} </p>
           <p> ${monster.description} </p>
           `;
        monster_container.appendChild(container);
      }
    });
}

document.addEventListener("DOMContentLoaded", (e) => {
  monsters(page);
  let formData = document.querySelector("form");

  formData.addEventListener("submit", (e) => {
    e.preventDefault();
    let monsterName = document.getElementById("Name");
    let monsterAge = document.getElementById("age");
    let monsterDescr = document.getElementById("Description");

    fetch(`${url}monsters`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: monsterName.value,
        age: monsterAge.value,
        description: monsterDescr.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
});

let upButton = document.getElementById("forward");
let downButton = document.getElementById("back");

upButton.addEventListener("click", pageUp);
downButton.addEventListener("click", pageDown);

let pageUp = () => {
  document.getElementById("monster-container").innerHTML = "";
  page++;
  monsters(page);
};

let pageDown = () => {
  if (page > 1) {
    document.getElementById("monster-container").innerHTML = "";
    page--;
    monsters(page);
  }
};

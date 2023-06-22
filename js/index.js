let monsterPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  const monsterContainer = document.getElementById("monster-container");
  const createMonsterForm = document.getElementById("create-monster-form");
  const loadMoreButton = document.getElementById("load-more-button");

  // Function to display a monster in the DOM
  const displayMonster = (monster) => {
    const monsterCard = document.createElement("div");
    monsterCard.className = "monster-card";

    const name = document.createElement("h2");
    name.textContent = monster.name;

    const age = document.createElement("h4");
    age.textContent = `Age: ${monster.age}`;

    const description = document.createElement("p");
    description.textContent = monster.description;

    monsterCard.appendChild(name);
    monsterCard.appendChild(age);
    monsterCard.appendChild(description);

    monsterContainer.appendChild(monsterCard);
  };

  // Function to load monsters from the API
  const loadMonsters = () => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${monsterPage}`)
      .then((response) => response.json())
      .then((monsters) => {
        monsters.forEach((monster) => {
          displayMonster(monster);
        });
      })
      .catch((error) => {
        console.log("Error loading monsters:", error);
      });
  };

  // Function to create a new monster
  const createMonster = (name, age, description) => {
    const newMonster = {
      name: name,
      age: age,
      description: description,
    };

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newMonster),
    })
      .then((response) => response.json())
      .then((createdMonster) => {
        displayMonster(createdMonster);
      })
      .catch((error) => {
        console.log("Error creating monster:", error);
      });
  };

  // Event listener for the create monster form submission
  createMonsterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name-input");
    const ageInput = document.getElementById("age-input");
    const descriptionInput = document.getElementById("description-input");

    const name = nameInput.value;
    const age = parseFloat(ageInput.value);
    const description = descriptionInput.value;

    createMonster(name, age, description);

    // Clear form inputs
    nameInput.value = "";
    ageInput.value = "";
    descriptionInput.value = "";
  });

  // Event listener for the load more button
  loadMoreButton.addEventListener("click", () => {
    monsterPage++;
    loadMonsters();
  });

  // Initial load of monsters
  loadMonsters();
});



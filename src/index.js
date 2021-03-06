let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  /*************** VARIABLES ************************/
  const url = 'http://localhost:3000/toys'
  const newToyForm = document.querySelector('.add-toy-form')
  const toyCollectionDiv = document.querySelector('#toy-collection')


  /*************** EVENT LISTENERS ************************/
  newToyForm.addEventListener('submit', function (event) {
    event.preventDefault()

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: event.target.name.value,
        image: event.target.image.value,
        likes: 0
      })
    })
      .then(response => response.json())
      .then(newToyObject => {
        renderNewToy(newToyObject)
      })

  })

  // EVENT DELEGATION APPROACH
  // toyCollectionDiv.addEventListener('click', function (event) {
  //   if (event.target.matches('.like-btn')) {
  //     const cardDiv = event.target.closest('.card')
  //     const id = cardDiv.dataset.id
  //     const pTag = cardDiv.querySelector('p')

  //     fetch(`${url}/${id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json"
  //       },
  //       body: JSON.stringify({ likes: parseInt(pTag.textContent) + 1 })
  //     })
  //       .then(response => response.json())
  //       .then(updatedToyObject => {
  //         pTag.textContent = `${updatedToyObject.likes} Likes`
  //       })
  //   }
  // })


  /*************** FUNCTIONS ************************/

  function initialize() {
    fetch(url)
      .then(response => response.json())
      .then(toys => {
        toys.forEach(function (toyObject) {
          renderNewToy(toyObject)
        })
      })
  }

  function renderNewToy(toyObject) {
    // INNER HTML WAY
    const div = document.createElement('div')
    div.dataset.id = toyObject.id
    div.className = 'card'
    div.innerHTML = `
        <h2>${toyObject.name}</h2>
        <img src='${toyObject.image}' class="toy-avatar" />
        <p>${toyObject.likes} Likes </p>
        <button class="like-btn">Like <3</button>`

    toyCollectionDiv.append(div)

    // NESTED EVENT LISTENER APPROACH
    const button = div.querySelector('.like-btn')
    button.addEventListener('click', function () {
      const id = toyObject.id
      const pTag = div.querySelector('p')

      fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ likes: parseInt(pTag.textContent) + 1 })
      })
        .then(response => response.json())
        .then(updatedToyObject => {
          pTag.textContent = `${updatedToyObject.likes} Likes`
        })

    })

  }

  /*************** INITIALIZE ************************/
  initialize()

});

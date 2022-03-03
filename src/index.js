console.log("%c HI", "color: firebrick");

// Challenge 1:
// on page load, fetches the images using the url above ⬆️
// parses the response as JSON
// adds image elements to the DOM for each 🤔 image in the array

const dogImageContainer = document.querySelector("#dog-image-container");

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);

      let imgArray = [];
      for (i = 0; i < data.message.length; i++) {
        let url = data.message[i];
        imgArray.push(url);

        renderImage(url);
      }
    });
});

function renderImage(url) {
  let dogImage = document.createElement("img");
  dogImage.src = `${url}`;

  dogImageContainer.appendChild(dogImage);
}

// Challenge 2:
// on page load, fetches all the dog breeds using the url above ⬆️
// adds the breeds to the page in the <ul> provided in index.html

const dogBreedList = document.querySelector("ul#dog-breeds");
let dogBreedArray = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((data) => {
      let dogBreedsObj = data.message;

      for (breed in dogBreedsObj) {
        dogBreedArray.push(breed);
      }

      createBreedList(dogBreedArray);
    });
});

function createBreedList(arr) {
  dogBreedList.textContent = "";
  arr.forEach((breed) => {
    let listItem = document.createElement("li");
    listItem.textContent = breed;

    listItem.addEventListener("click", (e) => {
      changeColor(e);
    });

    // listItem.addEventListener("click", (e) => {
    //     e.target.style.color = "magenta";
    //   });

    dogBreedList.appendChild(listItem);
  });
}

// Challenge 3:
// add function so that the font color of that <li> changes when clicked
function changeColor(li) {
  li.target.style.color = "magenta";
}

// Challenge 4:
// add function so that user can filter breeds that start with a letter, using a dropdown

const dropMenu = document.querySelector("#breed-dropdown");
dropMenu.addEventListener("change", (e) => {
  let letter = e.target.value;

  createFilteredArray(dogBreedArray, letter);
});

function createFilteredArray(arr, letter) {
  let filteredArray = arr.filter((breed) => breed.startsWith(letter));
  createBreedList(filteredArray);
}

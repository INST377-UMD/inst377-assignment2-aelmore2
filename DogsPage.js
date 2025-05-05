function loadPicAPI() {
  return fetch(`https://dog.ceo/api/breeds/image/random/10`).then((result) =>
    result.json()
  );
}

function loadDogAPI() {
  return fetch(`https://dogapi.dog/api/v2/breeds`).then((result) =>
    result.json()
  );
}

async function getDogs() {
  const picAPIResponse = await loadPicAPI();
  console.log(picAPIResponse);
  const result = await picAPIResponse;

  const dogAPIResponse = await loadDogAPI();
  console.log(dogAPIResponse);
  const response = await dogAPIResponse;

  const carousel = document.querySelector(".carousel");

  result.message.forEach((pic) => {
    const carouselImage = document.createElement("img");
    carouselImage.src = pic;
    carousel.appendChild(carouselImage);
  });

  const buttons = document.querySelector(".dogButtons");

  response.data.forEach((dog) => {
    const dogButton = document.createElement("button");
    dogButton.setAttribute("class", "button-50");
    dogButton.innerHTML = dog.attributes.name;

    dogButton.addEventListener("click", () => {
      dogInfo(dog);
    });

    buttons.appendChild(dogButton);
  });

  simpleslider.getSlider();

  console.log("Result of pic API:", result);
  console.log("Result of dog API:", response);
}

function dogInfo(dog) {
  const info = document.querySelector(".dogInfo");

  info.innerHTML = "";

  const dogBreed = document.createElement("h2");
  dogBreed.setAttribute("class", "dogInfo");
  dogBreed.innerHTML = dog.attributes.name;

  const dogDescription = document.createElement("p");
  dogDescription.setAttribute("class", "dogInfo");
  dogDescription.innerHTML = dog.attributes.description;

  const dogMin = document.createElement("p");
  dogMin.setAttribute("class", "dogInfo");
  dogMin.innerHTML = `Min Life: ${dog.attributes.life.min}`;

  const dogMax = document.createElement("p");
  dogMax.setAttribute("class", "dogInfo");
  dogMax.innerHTML = `Max Life: ${dog.attributes.life.max}`;

  info.appendChild(dogBreed);
  info.appendChild(dogDescription);
  info.appendChild(dogMin);
  info.appendChild(dogMax);
}

if (annyang) {
  annyang.addCommands({
    "look up *breed": async function (breed) {
      const dogAPIResponse = await loadDogAPI();
      const dogs = dogAPIResponse.data;

      const dog = dogs.find((dog) => dog.attributes.name === breed);

      if (dog) {
        dogInfo(dog);
      }
    },
  });

  SpeechKITT.annyang();

  SpeechKITT.vroom();
}

window.onload = getDogs;

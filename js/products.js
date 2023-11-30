const detailContainer = document.querySelector(".container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = `https://project-archive.no/exam/wp-json/wc/store/products/${id}`;

console.log(id);

async function fetchProducts() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    document.title = `${details.name}`;

    document.title = "TastyBites" + " | " + details.name;

    createHtml(details);

    console.log(details);

    createHtml(details);

    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        lightbox.classList.add("active");

        while (lightbox.firstChild) {
          lightbox.removeChild(lightbox.firstChild);
        }

        const img = document.createElement("img");
        img.src = image.src;

        lightbox.appendChild(img);
      });
    });
  } catch (error) {
    console.log(error);
    detailContainer.innerHTML = message("error", error);
  }
}

fetchProducts();

function createHtml(details) {
  detailContainer.innerHTML = `<h1>${details.name}</h1>
                              <p>${details.description}</p>
                              <img src="${details.images[0].src}" alt="${details.name}">`;
}

const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

const images = document.querySelectorAll("img");
images.forEach((image) => {
  image.addEventListener("click", (e) => {
    lightbox.innerHTML = ""; // Tøm innholdet først

    const img = document.createElement("img");
    img.src = image.src;
    lightbox.appendChild(img);

    lightbox.classList.add("active");
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("active");
  }
});

document.title = document.getElementsByClassName("h1")[0].innerText;

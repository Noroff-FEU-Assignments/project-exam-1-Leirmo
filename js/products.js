const detailContainer = document.querySelector(".container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url = `https://project-archive.no/exam/wp-json/wc/store/products/${id}`;

console.log(url);

async function fetchProducts() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    console.log(details);

    createHtml(details);
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

document.title = `${details.description}`;

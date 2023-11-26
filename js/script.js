const url = "https://project-archive.no/exam/wp-json/wc/store/products";
const productContainer = document.querySelector(".products");
const loadMoreButton = document.getElementById("load-more");

let currentPage = 1;

async function getProducts(page) {
  try {
    const response = await fetch(`${url}?page=${page}&per_page=10`);
    const getResults = await response.json();
    createHTML(getResults);
    if (getResults.length === 10) {
      loadMoreButton.style.display = "block";
    } else {
      loadMoreButton.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

function createHTML(products) {
  products.forEach(function (product) {
    productContainer.innerHTML += `<a href="products.html?id=${product.id}" class="product">
      <img src="${product.images[0].src}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.short_description}</p>
    </a>`;
  });
}

function loadMore() {
  currentPage++;
  getProducts(currentPage);
}

function initializePage() {
  getProducts(currentPage);
}

loadMoreButton.addEventListener("click", loadMore);
loadMoreButton.style.display = "none";

initializePage();

document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel-item");

  const buttonsHtml = Array.from(items, () => {
    return `<span class="carousel-button"></span>`;
  });

  carousel.insertAdjacentHTML(
    "beforeend",
    `
    <div class="carousel-nav">
    ${buttonsHtml.join("")}
    </div>
    `
  );
  const buttons = carousel.querySelectorAll(".carousel-button");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      items.forEach((item) => item.classList.remove("carousel-active"));
      buttons.forEach((button) => button.classList.remove("button-active"));
      items[i].classList.add("carousel-active");
      button.classList.add("button-active");
    });
  });

  items[0].classList.add("carousel-active");
  buttons[0].classList.add("button-active");
});

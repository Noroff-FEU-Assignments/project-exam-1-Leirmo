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

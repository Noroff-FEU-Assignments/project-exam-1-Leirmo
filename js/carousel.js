const carouselUrl = "https://project-archive.no/exam/wp-json/wc/store/products";
const carouselContainer = document.querySelector(".carousel");

async function getCarouselData() {
  try {
    const response = await fetch(carouselUrl);
    const carouselData = await response.json();
    createCarouselHTML(carouselData.slice(0, 4));
  } catch (error) {
    console.error("Error fetching carousel data:", error);
  }
}

function createCarouselHTML(carouselData) {
  carouselData.forEach(function (product) {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    carouselItem.innerHTML = `
      <a href="products.html?id=${product.id}" class="product">
        <img src="${product.images[0].src}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.short_description}</p>
      </a>`;

    carouselContainer.appendChild(carouselItem);
  });

  initializeCarousel();
}

function initializeCarousel() {
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
}

getCarouselData();

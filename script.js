API_KEY = "0b5ab295873f45139e23d2d93be99062"
url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", fetchNews("India"));

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const newsData = await response.json();
    bindData(newsData.articles);
}

const bindData = (articles) => {
    const cardContainer = document.getElementById("cards-container");
    const newsTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsTemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillData(cardClone, article) {
    const image = cardClone.querySelector("#news-img");
    const title = cardClone.querySelector("#news-title");
    const source = cardClone.querySelector("#news-source");
    const desc = cardClone.querySelector("#news-desc");

    image.src = article.urlToImage;
    title.innerHTML = article.title;
    desc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })

    source.innerHTML = `${article.source.name} : ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "__blank")
    })
}

let selectedNav = null;

function onNavItemClick(id) {
    fetchNews(id)
    const currentNav = document.getElementById(id);
    selectedNav?.classList.remove('active');
    selectedNav = currentNav;
    selectedNav.classList.add('active');

}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    selectedNav?.classList.remove("active");
    selectedNav = null;
});

const logo = document.getElementById("main");
logo.addEventListener("click", () => {
    fetchNews("India");
    selectedNav?.classList.remove("active");
    selectedNav = null;
})
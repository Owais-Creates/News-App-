API_KEY = "0b5ab295873f45139e23d2d93be99062"
url = "https://newsapi.org/v2/everything?q="

async function fetchNews (query){
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`); 
    const newsData = await response.json();
    console.log(newsData);
}

fetchNews("India")
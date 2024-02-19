console.log("HEllo world");
console.log("try");

let query;
let page;
try {
    query = window.location.search.split(`?`)[1].split(`=`)[1].split("&")[0];
    page = parseInt(window.location.search.split(`?`)[1].split('&')[1].split('=')[1]);
} catch (error) {
    console.log(error.message);
}


let articlesperpage ;
let totalpages;

const fetchNews = async (query="all", pageNo=1) => {
    let a = await fetch(`/api?q=${query}&apiKey=038b923e1eb24abdbf272d6ad36b122c&pageSize=10&page=${pageNo}`);
    let r = await a.json();
    console.log(r);

    if(pageNo<=1)
    {
        console.log("prev not allowed");
        next.href = `/?q=${query}&pageno=${pageNo + 1}`
    }
    else if(pageNo>=10)
    {
        prev.href = `/?q=${query}&pageno=${pageNo - 1}`
    }
    else
    {
        prev.href = `/?q=${query}&pageno=${pageNo - 1}`
        next.href = `/?q=${query}&pageno=${pageNo + 1}`
    }

    let str = ""; 

    for (const item of r.articles) {

        str = str + `<div class="card-content">
        <div class="card-img" style="border-radius: 20px;">
            <img src="${item.urlToImage}" alt=""> -
        </div>
        <div class="card-title">
            <h1>${item.title}</h1>
        </div>
        <div class="card-desc">
            <p>${item.description}</p>
        </div>
        <div class="readMore">
            <button class="button-34" role="button"><a target="_blank" href="${item.url}"></a></button>
        </div>
    </div>`

        cardContent.innerHTML = str;
    }
}

fetchNews(query, page);
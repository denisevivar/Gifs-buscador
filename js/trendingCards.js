
const trendingResults = document.getElementById('trending-results')

async function getTrendings(){
    let urlApi= `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=16&rating=g`   
    const response = await fetch(urlApi)
    const datos = await response.json()
    const dataArray = datos.data 
    printTrendingCards(dataArray)
}
getTrendings()

function printTrendingCards(dataArray) {  
    const gridResults = document.createElement("div")
    gridResults.setAttribute('class', 'grid-results') 
    trendingResults.appendChild(gridResults) 

    let resultsHTML = ''

    dataArray.map(gifItem =>{
            resultsHTML +=
            `<div class="card">
                <img class="card-img" src="${gifItem.images.fixed_width.url}" alt="${gifItem.title}">
            </div>`
        })    

    gridResults.innerHTML = resultsHTML
}













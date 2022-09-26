const searchInput = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-btn')
const resultsSection = document.querySelector('#results')
const title = document.createElement("h2")
const errorContainer = document.querySelector('.error-container')
let inputValue

//Event search term by input (enter)
searchInput.addEventListener('keyup', (e) => {
    inputValue = e.target.value
    if (e.keyCode === 13) {;
        displayResults(inputValue)
    }
})

//Display results. Print title and the gifs on grid

function displayResults () {
    cleanGrid ()
    printTitle(inputValue)
    getGifs(inputValue)    
}

//print Title
function printTitle (inputValue) {
    resultsSection.classList.add('is-displayed')
    title.innerHTML = ''
    title.innerHTML = inputValue
    resultsSection.appendChild(title)
}

//get gifs by input value
const getGifs = async (inputValue) => {
    let urlApi= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputValue}&offset=0&rating=g&lang=en`    
    
    try {
        const response = await fetch(urlApi)
        const datos = await response.json()
        dataArray = datos.data

        showGifs(dataArray)
    }
    catch {
        showError()
    }

    if(dataArray == '') {
        showError()
    }
}

const showGifs = (_array) => {

    const gridResults = document.createElement("div")
    gridResults.setAttribute('class', 'grid-results') 
    resultsSection.appendChild(gridResults) 

    let resultsHTML = ''

    dataArray.map(gifItem =>{
            resultsHTML +=
            `<div class="card"> 
                <img class="card-img" src="${gifItem.images.fixed_width.url}" alt="${gifItem.title}">
            </div>`
        })    

    gridResults.innerHTML = resultsHTML
}


function cleanGrid () {
    resultsSection.classList.remove('is-displayed')
    resultsSection.innerHTML = ''
}

//Show error if searching doesnt work
function showError () {
    resultsSection.classList.remove('is-displayed')
    errorContainer.classList.add('is-displayed')

    setTimeout(() => {
        errorContainer.remove()
    }, 10000)
}







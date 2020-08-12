
var url = "https://api.pexels.com/v1/search?"
var curr_page = 1


//function to get the required images
const getImages =  () => {
    var key = config.key
    var pageNo = document.getElementById("pageNo")
    pageNo.innerHTML = curr_page
    var searchItem = document.getElementById("search").value
    console.log(searchItem)
    let params = new URL(url);
    params.searchParams.set("query", searchItem)
    params.searchParams.set("per_page", 10)
    params.searchParams.set("page", curr_page)
    fetch(params + searchItem, {
        headers: {
            Authorization: key
        }
    }).
    then(res => res.json()).
    then(result => {
            console.log("result", result)
            displayData(result)
    })

   
}
//diplaying the data in the page

function displayData(data){
    var {photos} = data
    var display = document.getElementById("display")
    photos.map(item=>{
        console.log(item.url)
        var image = document.createElement('img')
        image.setAttribute('src',item.src.original)
        display.appendChild(image)
    })
}

var prev = document.getElementById("previous")
prev.addEventListener("click", goToPrevPage)


var next = document.getElementById("next")
next.addEventListener("click", goToNextPage)


//function to go to previous page
function goToPrevPage() {
    if (curr_page > 1) {
        var display = document.getElementById("display")
        display.innerHTML = ""
        curr_page -= 1
        console.log("working")
        getImages()
    }
}

//function to go to next page
function goToNextPage() {
    var display = document.getElementById("display")
    display.innerHTML = ""
    curr_page += 1
    getImages()
}


//function which implements debouncing for searching purpose
const debounce = function (cb, ms) {
    let timer;
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            cb.apply(this, arguments)
        }, ms)
    }
}
let debouncing = debounce(getImages, 2000)
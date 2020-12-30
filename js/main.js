import {
    setSearchFocus, 
    showClearTextButton,
    clearSearchText,
    clearPudhListener
}  from './searchBar.js';
import {
        deleteSearchResult,
        buildSearchResults, 
        clearStatsLine,
        setStatsLine
    }  from './searchResults.js';
import {
    getSearchTerm,
    retriveSearchResults
} from './dataFunction.js';

document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState == "complete"){
        initApp();
    }
});

const initApp = () => {
    //Set the focus
    setSearchFocus();

    // TODO: 3 listeners clear text
    const serarch = document.getElementById('search');
    serarch.addEventListener('input', showClearTextButton);

    const clear = document.getElementById("clear");
    clear.addEventListener('click', clearSearchText)
    clear.addEventListener('keydown', clearPudhListener);

    const form = document.getElementById("searchBar")
    form.addEventListener('submit', submitTheSearch)
}

//Procedural "workfow" function
const submitTheSearch = (event) =>{
    event.preventDefault();
    //TODO: delete search results
    deleteSearchResult();
    // process the search
    processTheSearch();
    // set the focus
    setSearchFocus();


}

const processTheSearch = async () => {
    //clear the stats line
    clearStatsLine()
  
    const searchTerm = getSearchTerm()
    if(searchTerm === "") return;
    const resultArray = await retriveSearchResults(searchTerm);
    if(resultArray.length) buildSearchResults(resultArray) // TODO: buld search results

    // TODO: set stats line
    setStatsLine(resultArray.length)


}
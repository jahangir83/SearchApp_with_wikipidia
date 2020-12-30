
export const getSearchTerm = () => {
    const rawSearchTerm = document.getElementById('search').value.trim();
    const regex = /[ ] {2,}/gi;
    const searchTerm = rawSearchTerm.replaceAll(regex, " ");
    return searchTerm

}

export const retriveSearchResults = async (searchTerm) => {
    const wikiSearchString = getWikiSearchString(searchTerm);
    const wikiSearchResults = await requestData(wikiSearchString)
    let resultArray = [];
    if(wikiSearchResults.hasOwnProperty("query")){
        resultArray = processWikiResults(wikiSearchResults.query.pages);

    }

    return resultArray;
}

const getWikiSearchString = (searchTerm) => {
    const maxchars = getMaxChars();
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxchars}&exintro&explaintext&exlimit=max&format=json&origin=*`
    
    console.log(rawSearchString)
    const searchString = encodeURI(rawSearchString)
    console.log(searchString)
    return searchString
}

const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth; 
    let  maxChars;
    if(width <414) maxChars = 65;
    if(width >= 414 && width < 1400) maxChars = 100;
    if(width >= 1400) maxChars = 130;
    return maxChars;
}

const requestData = async (searchString) => {
    try{
        const response = await fetch(searchString);
        const data = await response.json();
        return data
    }catch(err){
        console.error(err)
    }
}

const processWikiResults = (result) => {
    const resultArray = [];
    Object.keys(result).forEach((key) => {
        const id = key;
        const title = result[key].title;
        const text = result[key].extract;
        const img = result[key].hasOwnProperty("thumbnail") ? result[key].thumbnail.source : null; 

        const item = {
            id : id,
            title: title,
            img : img,
            text : text
        };
        resultArray.push(item)
    });
    return resultArray
}
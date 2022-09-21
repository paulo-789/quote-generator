const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


//hide loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}



//gettiing from api
async function getQuote(){
    loading();
    const proxyUrl = 'https://cors-anywhare.herokuapp.com/'

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
   const response = await fetch(proxyUrl + apiUrl);
   const data = await response.json();
   if (data.quoteAuthor === ""){
    authorText.innerText = "anonymous";
   }else{
    authorText.innerText = data.quoteAuthor;
   }
//    console.log(data);

//redece font size for long quote
if (data.quoteText.length > 100){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
     
      quoteText.innerText = data.quoteText;
      //stop loader an show quote
      complete();

    }
    catch (error){
        getQuote();
// console.log("whoops, no quote", error);
    }
}
//tweeter
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//event listners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuote();
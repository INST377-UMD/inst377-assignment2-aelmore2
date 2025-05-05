function loadQuotesAPI() {
  return fetch(`https://zenquotes.io/api/random`).then((result) =>
    result.json()
  );
}

async function getQuote() {
  const quotesAPIResponse = await loadQuotesAPI();
  console.log(quotesAPIResponse);
  const result = quotesAPIResponse;

  result.forEach((quote) => {
    document.getElementById("quote").innerHTML = quote.q;
    document.getElementById("author").innerHTML = quote.a;
  });
}

window.onload = getQuote();

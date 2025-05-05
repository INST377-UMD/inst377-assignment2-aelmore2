function loadStocksAPI(stocksTicker, from, to) {
  return fetch(
    `https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=ZW3kbZSMB5vDxfrp4Q3uFDX9OpW2T8P6`
  ).then((result) => result.json());
}

function loadRedditAPI() {
  return fetch(`https://tradestie.com/api/v1/apps/reddit?date=2022-04-03`).then(
    (result) => result.json()
  );
}

async function populateChart() {
  const stocksTicker = document
    .getElementById("stocksTicker")
    .value.toUpperCase();
  const days = document.getElementById("days").value;

  var today = new Date();
  var day = String(today.getDate()).padStart(2, "0");
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var year = today.getFullYear();
  var to = year + "-" + month + "-" + day;

  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() - days);
  var fromDay = String(fromDate.getDate()).padStart(2, "0");
  var fromMonth = String(fromDate.getMonth() + 1).padStart(2, "0");
  var fromYear = fromDate.getFullYear();
  var from = fromYear + "-" + fromMonth + "-" + fromDay;

  const stocksAPIResponse = await loadStocksAPI(stocksTicker, from, to);
  console.log(stocksAPIResponse);
  const result = stocksAPIResponse;

  const dateLabels = [];
  const priceData = [];

  result.results.forEach((stock) => {
    const date = new Date(stock.t);
    var formattedDay = String(date.getDate()).padStart(2, "0");
    var formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    var formattedYear = date.getFullYear();
    var formattedDate =
      formattedYear + "-" + formattedMonth + "-" + formattedDay;
    dateLabels.push(formattedDate);
    priceData.push(stock.c);
  });

  const ctx = document.getElementById("myChart");

  let chartStatus = Chart.getChart("myChart");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels: dateLabels,
      datasets: [
        {
          label: "Stock Price in USD",
          data: priceData,
          borderWidth: 1,
        },
      ],
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

async function createTable() {
  const redditAPIResponse = await loadRedditAPI();
  console.log(redditAPIResponse);

  const result = redditAPIResponse;
  const redditTable = document.getElementById("redditTable");

  result.forEach((stock, index) => {
    if (index >= 5) return;

    const tableRow = document.createElement("tr");
    const stockName = document.createElement("td");
    const stockComments = document.createElement("td");
    const stockSentiment = document.createElement("td");

    stockName.innerHTML = `<a href="https://finance.yahoo.com/quote/${stock.ticker}">${stock.ticker}</a>`;
    stockComments.innerHTML = stock.no_of_comments;
    stockSentiment.innerHTML = stock.sentiment;

    if (stockSentiment.innerHTML == "Bullish") {
      stockSentiment.innerHTML =
        '<img src="bullish.png" width="100px" height="100px"></img>';
    } else {
      stockSentiment.innerHTML =
        '<img src="bearish.png" width="100px" height="100px"></img>';
    }

    tableRow.appendChild(stockName);
    tableRow.appendChild(stockComments);
    tableRow.appendChild(stockSentiment);

    redditTable.append(tableRow);
  });
}

if (annyang) {
  annyang.addCommands({
    "look up *stock": function (stock) {
      document.getElementById("stocksTicker").value = stock.toUpperCase();
      document.getElementById("days").value = 30;
      populateChart();
    },
  });

  SpeechKITT.annyang();

  SpeechKITT.vroom();
}

window.onload = createTable;

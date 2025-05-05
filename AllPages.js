if (annyang) {
  annyang.addCommands({
    hello: function () {
      alert("Hello world!");
    },
  });

  annyang.addCommands({
    "change the color to *color": function (color) {
      document.body.style.backgroundColor = color;
    },

    "change color to *color": function (color) {
      document.body.style.backgroundColor = color;
    },
  });

  annyang.addCommands({
    "navigate to home": function () {
      window.location.href = "HomePage.html";
    },

    "navigate to home page": function () {
      window.location.href = "HomePage.html";
    },

    "navigate to stocks": function () {
      window.location.href = "StocksPage.html";
    },

    "navigate to stocks page": function () {
      window.location.href = "StocksPage.html";
    },

    "navigate to dogs": function () {
      window.location.href = "DogsPage.html";
    },

    "navigate to dogs page": function () {
      window.location.href = "DogsPage.html";
    },
  });

  SpeechKITT.annyang();

  SpeechKITT.vroom();
}

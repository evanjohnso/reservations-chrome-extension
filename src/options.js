var resortId = 29;
var url =
  "https://account.ikonpass.com/api/v2/reservation-availability/" + resortId;
var headers = new Headers();
headers.append("cookie", document.cookie);

document.getElementById("save").addEventListener("click", requestAvailability);

chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "notificationClicked") {
    // this opens up a new page in the context of the extension
    // window.open(
    //   "_blank",
    //   "https://account.ikonpass.com/en/myaccount/add-reservations/"
    // );
  }
});

function requestAvailability() {
  fetch(url, { headers })
    .then((res) => {
      if (res.ok) return res.json();
      else {
        errorNotification(
          "Make sure you are logged in to account.ikonpass.com"
        );
      }
    })
    .then(parseResponse);
}

function parseResponse(rawData) {
  var data = rawData["data"];
  var theOneWeWant = data.indexOf((d) =>
    d["blackout_dates"].some((date) => date.includes("2021-"))
  );
  reservationNotification(theOneWeWant);
}

const _commonNotificationOptions = {
  iconUrl: "icons/robot.png",
  type: "basic",
  isClickable: true,
};

function errorNotification(message) {
  chrome.runtime.sendMessage("", {
    type: "notification",
    options: {
      title: "Something isn't right",
      message: message.toString(),
      ..._commonNotificationOptions,
    },
  });
}

function reservationNotification(day) {
  chrome.runtime.sendMessage("", {
    type: "notification",
    options: {
      title: `Parking is available for ${day}!!!`,
      message: "Quick, click here to make the reservation!",
      ..._commonNotificationOptions,
    },
  });
}

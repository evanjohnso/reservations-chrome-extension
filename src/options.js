var resortId = 29;
var url =
  "https://account.ikonpass.com/api/v2/reservation-availability/" + resortId;
var headers = new Headers();
headers.append("cookie", document.cookie);

document.getElementById("save").addEventListener("click", requestAvailability);

// document.getElementById("enableNotifications").addEventListener("click", () => {
//   handleEnableNotificationButton("www.google.com");
// });

function requestAvailability() {
  fetch(url, { headers })
    .then((res) => {
      if (res.ok) return res.json();
      errorNotification("Make sure you are logged in");
    })
    .then((data) => {
      data = data["data"];
      reservationNotification(data[0]["id"], "PicklesLink");
    });
}
function errorNotification(message) {
  chrome.runtime.sendMessage("", {
    type: "notification",
    options: {
      title: "Something isn't right",
      message,
      iconUrl: "icons/robot.png",
      type: "basic",
    },
  });
}

function reservationNotification(day, makeReservationLink) {
  chrome.runtime.sendMessage("", {
    type: "notification",
    options: {
      title: `Parking is available for ${day}!!!`,
      message: "Quick, click here to make the reservation!",
      iconUrl: "icons/robot.png",
      type: "basic",
    },
    makeReservationLink,
  });
}

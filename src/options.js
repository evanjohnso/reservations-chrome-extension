var resortId = 29;
var url =
  "https://account.ikonpass.com/api/v2/reservation-availability/" + resortId;
var headers = new Headers();
headers.append("cookie", document.cookie);

document.getElementById("save").addEventListener("click", handleSendIt);

document.getElementById("enableNotifications").addEventListener("click", () => {
  handleEnableNotificationButton("www.google.com");
});

function handleSendIt() {
  fetch(url, { headers })
    .then((res) => {
      if (res.ok) return res.json();
      alert("Something isn't right. Make sure you are logged in");
    })
    .then((data) => {
      data = data["data"];
      alert(data[0]["id"]);
    });
}

function notify_day_available(day, makeReservationLink) {
  if (Notification.permission === "granted") {
    var title = `Parking is available for ${day}!!!`;
    var message = "Quick, click here to make the reservation!";

    // show notification here
    var my_notification = new Notification(title, { body: message });
    my_notification.onclick = (e) => onAlertClick(e, makeReservationLink);
  }
}

function onAlertClick(event, makeReservationLink) {
  event.preventDefault(); // prevent the browser from focusing the Notification's tab
  window.open(makeReservationLink, "_blank");
}

// function dispalySkiResortLabel(resort) {
//   switch (resort) {
//     case "alta":
//       return "Alta Snowbird";
//     case "bachelor":
//       return "Mount Bachelor";
//     case "copper":
//       return "Copper Mountain";
//   }
// }

function handleEnableNotificationButton(makeReservationLink) {
  var title = "Notifications are enabled!";
  var message =
    "Watch for this alert here if your day opens up. Click this notification to be taken to the reservation page. Try it now!";
  if (!window.Notification) {
    console.log("Browser does not support notifications.");
  } else {
    // check if permission is already granted
    if (Notification.permission === "granted") {
      // show notification here
      var theNotification = new Notification(title, { body: message });
      theNotification.onclick = (e) => onAlertClick(e, makeReservationLink);
    } else {
      // request permission from user
      Notification.requestPermission()
        .then(function (p) {
          alert("did it happen?!"); // no, it did not
          if (p === "granted") {
            // show notification here
            var notify = new Notification(title, { body: message });
            notify.onclick = (e) => onAlertClick(e, makeReservationLink);
          } else {
            console.log("User blocked notifications.");
          }
        })
        .catch(function (err) {
          alert(err);
          console.error(err);
        });
    }
  }
}

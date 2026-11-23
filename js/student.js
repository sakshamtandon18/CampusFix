/* Get the student who is currently logged in */
var currentUser = localStorage.getItem("campusfixCurrentUser");

/* Send the user back if they are not logged in */
if (!currentUser) {
    window.location.href = "login.html";
} else {
    currentUser = JSON.parse(currentUser);

    /* Only students should use this dashboard */
    if (currentUser.role !== "student") {
        window.location.href = "login.html";
    } else {
        document.getElementById("welcomeText").innerHTML =
            "Welcome, " + currentUser.name + "!";

        /* Get all complaints saved in the browser */
        var complaints = getData("campusfixComplaints");

        var total = 0;
        var pending = 0;
        var progress = 0;
        var resolved = 0;

        /* Count only complaints submitted by this student */
        for (var i = 0; i < complaints.length; i++) {
            if (complaints[i].email === currentUser.email) {
                total++;

                if (complaints[i].status === "Pending") {
                    pending++;
                }

                if (complaints[i].status === "In Progress") {
                    progress++;
                }

                if (complaints[i].status === "Resolved") {
                    resolved++;
                }
            }
        }

        /* Show the totals on the page */
        document.getElementById("totalCount").innerHTML = total;
        document.getElementById("pendingCount").innerHTML = pending;
        document.getElementById("progressCount").innerHTML = progress;
        document.getElementById("resolvedCount").innerHTML = resolved;
    }
}

/* Logout button */
document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.removeItem("campusfixCurrentUser");
    window.location.href = "login.html";
});
var complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
    complaintForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var user = localStorage.getItem("campusfixCurrentUser");

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        user = JSON.parse(user);

        var title = document.getElementById("title").value;
        var category = document.getElementById("category").value;
        var location = document.getElementById("location").value;
        var priority = document.getElementById("priority").value;
        var description = document.getElementById("description").value;

        /* Gets saved complaints. If none are saved, it gets an empty array. */
        var complaints = getData("campusfixComplaints");

        /* Date.now creates a different complaint ID each time */
        var complaintId = "CF-" + Date.now();

        var complaint = {
            id: complaintId,
            email: user.email,
            title: title,
            category: category,
            location: location,
            priority: priority,
            description: description,
            status: "Pending",
            date: new Date().toLocaleDateString(),
            response: ""
        };

        complaints.push(complaint);

        saveData("campusfixComplaints", complaints);

        alert("Complaint submitted successfully. Your ID is " + complaintId);

        window.location.href = "my-complaints.html";
    });
}
/* Logout button */
document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.removeItem("campusfixCurrentUser");
    window.location.href = "login.html";
});
var user = localStorage.getItem("campusfixCurrentUser");

if (!user) {
    window.location.href = "login.html";
}

user = JSON.parse(user);

/* Submit complaint page */
var complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
    complaintForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var complaints = getData("campusfixComplaints");

        var complaint = {
            id: "CF-" + Date.now(),
            email: user.email,
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            location: document.getElementById("location").value,
            priority: document.getElementById("priority").value,
            description: document.getElementById("description").value,
            status: "Pending",
            date: new Date().toLocaleDateString()
        };

        complaints.push(complaint);
        saveData("campusfixComplaints", complaints);

        alert("Complaint submitted successfully.");
        window.location.href = "my-complaints.html";
    });
}

/* My complaints page */
var complaintList = document.getElementById("complaintList");

if (complaintList) {
    showComplaints();

    document.getElementById("searchBox").addEventListener("input", showComplaints);
    document.getElementById("categoryFilter").addEventListener("change", showComplaints);
    document.getElementById("statusFilter").addEventListener("change", showComplaints);
}

function showComplaints() {
    var complaints = getData("campusfixComplaints");

    var searchText = document.getElementById("searchBox").value.toLowerCase();
    var category = document.getElementById("categoryFilter").value;
    var status = document.getElementById("statusFilter").value;

    complaintList.innerHTML = "";

    for (var i = 0; i < complaints.length; i++) {
        var complaint = complaints[i];

        if (complaint.email === user.email) {
            var titleMatches = complaint.title.toLowerCase().includes(searchText);
            var categoryMatches = category === "" || complaint.category === category;
            var statusMatches = status === "" || complaint.status === status;

            if (titleMatches && categoryMatches && statusMatches) {
                complaintList.innerHTML +=
                    "<div class='complaint-card'>" +
                    "<h3>" + complaint.title + "</h3>" +
                    "<p><b>ID:</b> " + complaint.id + "</p>" +
                    "<p><b>Category:</b> " + complaint.category + "</p>" +
                    "<p><b>Location:</b> " + complaint.location + "</p>" +
                    "<p><b>Status:</b> " + complaint.status + "</p>" +
                    "<p><b>Priority:</b> " + complaint.priority + "</p>" +
                    "<p><b>Date:</b> " + complaint.date + "</p>" +
                    "<a class='details-button' href='complaint-details.html?id=" + complaint.id + "'>View Details</a>" +
                    "</div>";
            }
        }
    }

    if (complaintList.innerHTML === "") {
        complaintList.innerHTML = "<p>No complaints found.</p>";
    }
}

/* Logout */
var logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("campusfixCurrentUser");
        window.location.href = "login.html";
    });
}
/* Complaint details page */
var detailsBox = document.getElementById("detailsBox");

if (detailsBox) {
    var pageUrl = new URLSearchParams(window.location.search);
    var complaintId = pageUrl.get("id");

    var complaints = getData("campusfixComplaints");

    for (var i = 0; i < complaints.length; i++) {
        if (complaints[i].id === complaintId) {
            var complaint = complaints[i];

            detailsBox.innerHTML =
                "<div class='details-card'>" +
                "<h2>" + complaint.title + "</h2>" +
                "<p><b>Complaint ID:</b> " + complaint.id + "</p>" +
                "<p><b>Category:</b> " + complaint.category + "</p>" +
                "<p><b>Location:</b> " + complaint.location + "</p>" +
                "<p><b>Priority:</b> " + complaint.priority + "</p>" +
                "<p><b>Status:</b> " + complaint.status + "</p>" +
                "<p><b>Date:</b> " + complaint.date + "</p>" +
                "<p><b>Description:</b> " + complaint.description + "</p>" +
                "<hr>" +
                "<h3>Admin Response</h3>" +
                "<p>" + (complaint.response || "No response from admin yet.") + "</p>" +
                "</div>";
        }
    }
}

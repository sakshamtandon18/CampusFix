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
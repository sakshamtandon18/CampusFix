var user = localStorage.getItem("campusfixCurrentUser");

/* Check whether admin is logged in */
if (!user) {
    window.location.href = "login.html";
} else {
    user = JSON.parse(user);

    if (user.role !== "admin") {
        window.location.href = "login.html";
    }
}

document.getElementById("adminWelcome").innerHTML =
    "Welcome, " + user.name;

showAdminComplaints();

/* Search and filter */
document.getElementById("adminSearch").addEventListener("input", showAdminComplaints);

document.getElementById("adminStatusFilter").addEventListener("change", showAdminComplaints);

/* Display all saved complaints */
function showAdminComplaints() {
    var complaints = getData("campusfixComplaints");

    var searchText = document.getElementById("adminSearch").value.toLowerCase();
    var statusFilter = document.getElementById("adminStatusFilter").value;

    var list = document.getElementById("adminComplaintList");
    list.innerHTML = "";

    for (var i = 0; i < complaints.length; i++) {
        var complaint = complaints[i];

        var titleMatches = complaint.title.toLowerCase().includes(searchText);
        var statusMatches = statusFilter === "" || complaint.status === statusFilter;

        if (titleMatches && statusMatches) {
            list.innerHTML +=
                "<div class='admin-card'>" +
                "<h3>" + complaint.title + "</h3>" +
                "<p><b>ID:</b> " + complaint.id + "</p>" +
                "<p><b>Student Email:</b> " + complaint.email + "</p>" +
                "<p><b>Category:</b> " + complaint.category + "</p>" +
                "<p><b>Location:</b> " + complaint.location + "</p>" +
                "<p><b>Description:</b> " + complaint.description + "</p>" +
                "<a class='details-button' href='complaint-details.html?id=" + complaint.id + "'>View Details</a>" +

                "<label>Status</label>" +
                "<select id='status-" + complaint.id + "'>" +
                "<option>" + complaint.status + "</option>" +
                "<option>Pending</option>" +
                "<option>In Progress</option>" +
                "<option>Resolved</option>" +
                "<option>Rejected</option>" +
                "</select>" +

                "<label>Priority</label>" +
                "<select id='priority-" + complaint.id + "'>" +
                "<option>" + complaint.priority + "</option>" +
                "<option>Low</option>" +
                "<option>Medium</option>" +
                "<option>High</option>" +
                "</select>" +

                "<label>Admin Response</label>" +
                "<textarea id='response-" + complaint.id + "'>" +
                (complaint.response || "") +
                "</textarea>" +

                "<button onclick=\"updateComplaint('" + complaint.id + "')\">Save Changes</button>" +
                "<button class='delete-button' onclick=\"deleteComplaint('" + complaint.id + "')\">Delete</button>" +
                "</div>";
        }
    }

    if (list.innerHTML === "") {
        list.innerHTML = "<p>No complaints found.</p>";
    }
}

/* Save admin changes */
function updateComplaint(id) {
    var complaints = getData("campusfixComplaints");

    for (var i = 0; i < complaints.length; i++) {
        if (complaints[i].id === id) {
            complaints[i].status = document.getElementById("status-" + id).value;
            complaints[i].priority = document.getElementById("priority-" + id).value;
            complaints[i].response = document.getElementById("response-" + id).value;
        }
    }

    saveData("campusfixComplaints", complaints);

    alert("Complaint updated.");
    showAdminComplaints();
}

/* Delete a complaint */
function deleteComplaint(id) {
    var answer = confirm("Do you want to delete this complaint?");

    if (answer) {
        var complaints = getData("campusfixComplaints");

        for (var i = 0; i < complaints.length; i++) {
            if (complaints[i].id === id) {
                complaints.splice(i, 1);
            }
        }

        saveData("campusfixComplaints", complaints);

        alert("Complaint deleted.");
        showAdminComplaints();
    }
}

/* Logout */
document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.removeItem("campusfixCurrentUser");
    window.location.href = "login.html";
});
/* Registration form */
var registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var rollNumber = document.getElementById("rollNumber").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        var students = getData("campusfixStudents");

        for (var i = 0; i < students.length; i++) {
            if (students[i].email === email) {
                alert("This email is already registered.");
                return;
            }
        }

        var student = {
            name: name,
            email: email,
            rollNumber: rollNumber,
            password: password,
            role: "student"
        };

        students.push(student);
        saveData("campusfixStudents", students);

        alert("Registration successful. Please login.");
        window.location.href = "login.html";
    });
}

/* Login form */
var loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        /* Demo admin login */
        if (email === "admin@campusfix.com" && password === "admin123") {
            var admin = {
                name: "CampusFix Admin",
                email: email,
                role: "admin"
            };

            localStorage.setItem("campusfixCurrentUser", JSON.stringify(admin));
            alert("Admin login successful.");
            window.location.href = "admin-dashboard.html";
            return;
        }

        var students = getData("campusfixStudents");

        for (var i = 0; i < students.length; i++) {
            if (students[i].email === email && students[i].password === password) {
                localStorage.setItem(
                    "campusfixCurrentUser",
                    JSON.stringify(students[i])
                );

                alert("Login successful.");
                window.location.href = "student-dashboard.html";
                return;
            }
        }

        alert("Incorrect email or password.");
    });
}
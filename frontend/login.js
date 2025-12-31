document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const studentBtn = document.getElementById('studentBtn');
    const adminBtn = document.getElementById('adminBtn');
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    let currentRole = 'student'; // Default role 

    // Toggle Logic
    if (studentBtn && adminBtn) {
        studentBtn.addEventListener('click', () => {
            currentRole = 'student';
            studentBtn.classList.add('active');
            adminBtn.classList.remove('active');
            document.documentElement.style.setProperty('--primary-color', '#3b82f6'); // Blue for Student
        });

        adminBtn.addEventListener('click', () => {
            currentRole = 'admin';
            adminBtn.classList.add('active');
            studentBtn.classList.remove('active');
            document.documentElement.style.setProperty('--primary-color', '#8b5cf6'); // Purple for Admin
        });
    } else {
        console.error("Toggle buttons not found!");
    }

    // Login Logic
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value;
            const password = passwordInput.value;
            const submitBtn = loginForm.querySelector('button');

            // Visual Loading State
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Authenticating...";
            submitBtn.style.opacity = "0.7";

            // Static Login Logic
            setTimeout(() => {
                if (currentRole === 'student' && email === "12345ujjwalpratap@gmail.com" && password === "123123") {
                    alert("Successfully logged in as Student!");
                    window.location.href = 'student-dashboard.html';
                } else if (currentRole === 'admin' && email === "12345ujjwalpratap@gmail.com" && password === "12345") {
                    alert("Successfully logged in as Librarian!");
                    window.location.href = 'librarian-dashboard.html';
                } else {
                    alert("Login Failed: Invalid credentials for " + currentRole);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.style.opacity = "1";
                }
            }, 500);
        });
    }
});
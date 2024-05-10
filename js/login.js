function displayErrorMessage(message) {
    const errorDiv = document.querySelector(".login-error");
    errorDiv.textContent = message;
}

async function loginUser(event) {
    event.preventDefault();
    const form = document.getElementById("loginForm");
 
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        data.device = "Laptop";

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!result.success) {
                const errorMessage = result.message || "Wrong email or password!";
                displayErrorMessage(errorMessage);
            }
            if (result.success === true) {
                window.location.href = "payment.html";
            }

        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        form.reportValidity();
    }
}
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function(event) {
    loginUser(event);
});


loginForm.querySelectorAll(".pop-up__input").forEach(form => {
    form.addEventListener("input", function() {
        this.setCustomValidity("");
    });
});
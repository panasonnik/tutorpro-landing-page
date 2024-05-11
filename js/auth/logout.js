function displayErrorMessage(message) {
    const errorDiv = document.querySelector(".log-out-error");
    errorDiv.textContent = message;
}

async function logOutUser(event) {
    event.preventDefault();
    const token = localStorage.getItem("authToken");
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            },
        });

        const result = await response.json();
        if (!result.success) {
            const errorMessage = result.message || "Log out failed!";
            displayErrorMessage(errorMessage);
        }
        if (result.success === true) {
            localStorage.removeItem("authToken");
            window.location.href = "index.html";
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

const logOutForm = document.getElementById("logOutForm");
logOutForm.addEventListener("submit", function(event) {
    logOutUser(event);
});

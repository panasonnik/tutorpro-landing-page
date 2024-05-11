function displayErrorMessage(message) {
    const errorDiv = document.querySelector(".payment-error");
    errorDiv.textContent = message;
}
function displaySuccessMessage(message) {
    const errorDiv = document.querySelector(".payment-success");
    errorDiv.textContent = message;
}

async function buyPremiumSubscription(event) {
    event.preventDefault();
    const form = document.getElementById("paymentForm");
 
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const data = {};
        const token = localStorage.getItem("authToken");
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(data);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/user/premium-purchase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            const result = await response.json();

            if (!result) {
                throw new Error("Empty response");
            }

            if (!result.success) {
                const errorMessage = result.message || "YOu have already subscrived to premium!";
                displayErrorMessage(errorMessage);
            } else {
                displaySuccessMessage("Payment was successful! Redirecting to home page...");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 5000);
            }

        } catch (error) {
            console.error("Error:", error.message);
            if (error.message === "Empty response") {
                displayErrorMessage("Empty response from the server");
            } else {
                displayErrorMessage("An error occurred. Please try again later.");
            }
        }
    } else {
        form.reportValidity();
    }
}

const paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", function(event) {
    buyPremiumSubscription(event);
});

paymentForm.querySelectorAll(".pop-up__input").forEach(form => {
    form.addEventListener("input", function() {
        this.setCustomValidity("");
    });
});

document.querySelector('input[name="date_of_expiration"]').addEventListener('input', function(event) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
        input.value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
        input.value = value;
    }
});

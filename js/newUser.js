async function createUser() {
    const form = document.getElementById("signInForm");
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    data.device = "Laptop";
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      return result.unique;
    //   if (result.success === true) {
    //     window.location.href = "payment.html";
    //   }
    } catch (error) {
      console.error("Error:", error);
    }
}
document.querySelector(".pop-up__sign-in-btn").addEventListener('click', function() {
    createUser();
});

document.getElementById("signInForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const emailInput = document.getElementById("register-email");
    const emailError = document.getElementById("email-error");

    const email = emailInput.value;
    const isUnique = await isEmailUnique(email);
    if (!isUnique) {
        emailError.textContent = "Email already in use!";
        return;
    }

    this.submit();
});

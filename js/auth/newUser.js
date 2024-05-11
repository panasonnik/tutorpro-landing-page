async function createUser() {
  const form = document.getElementById("signInForm");
  
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });
  data.device = "Laptop";
  console.log(data);

  try {
      const response = await fetch("http://45.94.158.182/~tutorpro/public/api/auth/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success === true) {
          localStorage.setItem("authToken", result.data.token);
          window.location.href = "payment.html";
      }
  } catch (error) {
      console.error("Error:", error);
  }
}

document.getElementById("signInForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  createUser();
});

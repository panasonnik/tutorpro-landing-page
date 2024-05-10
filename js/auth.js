async function postJSON() {
    const form = document.getElementById("loginForm");
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
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
}

document.querySelectorAll(".pop-up__btn").forEach(button => {
    button.addEventListener('click', function() {
        postJSON();
    });
});
  

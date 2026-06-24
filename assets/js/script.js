document.addEventListener("DOMContentLoaded", function () {
  const heading = document.querySelector("h1");

  if (heading) {
    heading.textContent = "My Mock Website is working!";
    heading.style.transform = "scale(1.05)";
    heading.style.transition = "transform 0.3s ease";
  }

  console.log("JavaScript is connected.");
});

document.getElementById("toggle-dark").addEventListener("click", () => {
  const body = document.body;
  body.dataset.bsTheme = body.dataset.bsTheme === "dark" ? "light" : "dark";
});

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.querySelector(".generateButton");
  const colorTool = document.querySelector(".colorTool");
  const colorSwatch = document.querySelector(".colorSwatch");
  const colorName = document.querySelector(".colorName");
  const scrollTop = document.querySelector(".scrollTop");
  const year = document.querySelector(".currentYear");

  const getRandomColor = () => {
    const characters = "0123456789ABCDEF";
    return "#" + Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
  };

  const hexToRGB = (hex) => {
    const values = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16));
    return `rgb(${values.join(", ")})`;
  };

  const hexToRGBA = (hex, alpha = 1) => {
    const values = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16));
    return `rgba(${values.join(", ")}, ${alpha})`;
  };

  const hexToHSL = (hex) => {
    const [red, green, blue] = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255);
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const lightness = (max + min) / 2;
    if (max === min) return `hsl(0, 0%, ${Math.round(lightness * 100)}%)`;
    const difference = max - min;
    const saturation = lightness > 0.5 ? difference / (2 - max - min) : difference / (max + min);
    let hue;
    if (max === red) hue = (green - blue) / difference + (green < blue ? 6 : 0);
    else if (max === green) hue = (blue - red) / difference + 2;
    else hue = (red - green) / difference + 4;
    hue /= 6;
    return `hsl(${Math.round(hue * 360)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`;
  };

  const generateColor = () => {
    const hex = getRandomColor();
    const values = { hexadecimal: `Hexadecimal: ${hex}`, rgb: `RGB: ${hexToRGB(hex)}`, rgba: `RGBA: ${hexToRGBA(hex)}`, hsl: `HSL: ${hexToHSL(hex)}` };
    Object.entries(values).forEach(([key, value]) => { document.querySelector(`.${key}`).textContent = value; });
    colorTool.style.setProperty("--accent", hex);
    colorSwatch.style.backgroundColor = hex;
    colorName.textContent = hex;
  };

  document.querySelectorAll(".copyButton").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = document.querySelector(`.${button.dataset.copyTarget}`).textContent.split(": ").slice(1).join(": ");
      await navigator.clipboard.writeText(value);
      const originalText = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => { button.textContent = originalText; }, 1200);
    });
  });

  generateButton.addEventListener("click", generateColor);
  year.textContent = new Date().getFullYear();
  window.addEventListener("scroll", () => scrollTop.classList.toggle("visible", window.scrollY > 320), { passive: true });
  scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  generateColor();
});

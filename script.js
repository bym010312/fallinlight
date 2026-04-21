const slider = document.getElementById("progress-slider");
const container = document.querySelector(".container");
const isTouch = window.matchMedia("(hover: none)").matches;

function updateSlider() {
  const val = slider.value;
  slider.style.setProperty("--slider-fill", val + "%");
  
  // 블러 강도 업데이트 (0 ~ 60px 범위)
  const blurVal = (val * 0.6).toFixed(1);
  document.documentElement.style.setProperty("--blur-amount", blurVal + "px");
}

slider.addEventListener("input", updateSlider);
updateSlider();

if (!isTouch) {
  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    container.style.setProperty("--x", x + "%");
    container.style.setProperty("--y", y + "%");

    // 기울기 배율을 더 극적으로 수정 (12 -> 5)
    const rotateX = (y - 50) / 5;
    const rotateY = (50 - x) / 5;

    container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  container.addEventListener("mouseleave", () => {
    container.style.transform = "rotateX(0) rotateY(0) scale(1)";
    container.style.setProperty("--x", "50%");
    container.style.setProperty("--y", "50%");
  });
}

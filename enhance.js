// ===== 點擊圖片放大 + 雙擊縮放（支援任意同級子路徑）=====
(function () {
  // === 在這裡維護所有要啟用的根路徑 ===
  // 每次新增一個新資料夾，只要加一行就好，例如 "/summer2025/", "/random123/" 等
  const enabledPaths = [
    "/youmiyahina/",
    // 下面是未來新增的例子，你可以直接在這邊加：
    // "/summer2025/",
    // "/random123/",
    // "/abc-def/",
    // "/event2026/",
    // "/gallery-new/",
  ];

  // 檢查當前頁面是否以其中任一個路徑開頭（包含子路徑也生效）
  const currentPath = location.pathname;
  const isEnabled = enabledPaths.some(path => 
    currentPath === path || currentPath.startsWith(path)
  );

  if (!isEnabled) return;

  // 以下是完整放大 + 雙擊縮放功能（不變）
  const viewer = document.createElement("div");
  viewer.id = "image-viewer";
  viewer.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.92);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: zoom-out;
    opacity: 0;
    transition: opacity 0.25s ease;
    user-select: none;
  `;

  const img = document.createElement("img");
  img.style.cssText = `
    max-width: 94vw;
    max-height: 94vh;
    object-fit: contain;
    transition: transform 0.4s ease;
    transform: scale(1);
    opacity: 0;
    transition: opacity 0.3s;
    cursor: zoom-in;
  `;
  viewer.appendChild(img);

  let currentScale = 1;
  const maxScale = 3; // 最大放大倍率，可改成 2、4 等

  img.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    if (currentScale === 1) {
      currentScale = maxScale;
      img.style.cursor = "zoom-out";
    } else {
      currentScale = 1;
      img.style.cursor = "zoom-in";
    }
    img.style.transform = `scale(${currentScale})`;
  });

  viewer.onclick = (e) => {
    if (e.target === viewer || e.target === img) {
      currentScale = 1;
      img.style.transform = `scale(1)`;
      img.style.cursor = "zoom-in";
      viewer.style.opacity = "0";
      setTimeout(() => {
        viewer.style.display = "none";
        img.src = "";
      }, 250);
    }
  };

  const closeOnEsc = (e) => {
    if (e.key === "Escape" && viewer.style.display === "flex") {
      viewer.onclick(e);
    }
  };

  document.body.appendChild(viewer);

  document.addEventListener("click", (e) => {
    const target = e.target.closest("img");
    if (!target) return;
    if (target.closest("#image-viewer")) return;

    e.preventDefault();

    currentScale = 1;
    img.style.transform = `scale(1)`;
    img.style.cursor = "zoom-in";

    img.src = target.dataset.full || target.dataset.original || target.src;
    img.style.opacity = "0";

    viewer.style.display = "flex";
    setTimeout(() => {
      viewer.style.opacity = "1";
      img.onload = () => { img.style.opacity = "1"; };
    }, 10);

    document.addEventListener("keydown", closeOnEsc);
    const removeEsc = () => {
      document.removeEventListener("keydown", closeOnEsc);
      viewer.removeEventListener("transitionend", removeEsc);
    };
    viewer.addEventListener("transitionend", removeEsc);
  }, { passive: false });
})();

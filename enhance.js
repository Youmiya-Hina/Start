// ===== 深 / 浅色（默认浅色）=====
(function () {
  const style = document.createElement("style");
  style.innerHTML = `
    :root{
      --bg:#ffffff;
      --text:#000000;
    }
    body{
      background:var(--bg);
      color:var(--text);
      transition:.2s;
    }
    body.dark{
      --bg:#0f0f0f;
      --text:#ffffff;
    }
    .theme-toggle{
      position:fixed;
      right:16px;
      bottom:16px;
      padding:8px 12px;
      background:#eee;
      border-radius:20px;
      cursor:pointer;
      font-size:14px;
      z-index:9999;
      user-select:none;
    }
  `;
  document.head.appendChild(style);

  const btn = document.createElement("div");
  btn.className = "theme-toggle";
  btn.innerText = "🌗 深/浅";
  btn.onclick = () => document.body.classList.toggle("dark");
  document.body.appendChild(btn);
})();

// ===== 点击图片放大 =====
(function () {
  const viewer = document.createElement("div");
  viewer.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.85);
    display:none;
    justify-content:center;
    align-items:center;
    z-index:9998;
  `;

  const img = document.createElement("img");
  img.style.cssText = `
    max-width:90%;
    max-height:90%;
  `;
  viewer.appendChild(img);
  viewer.onclick = () => viewer.style.display = "none";
  document.body.appendChild(viewer);

  document.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
      img.src = e.target.src;
      viewer.style.display = "flex";
    }
  });
})();

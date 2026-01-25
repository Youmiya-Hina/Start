// ===== 点击图片放大（仅在指定子路径生效）=====
(function () {

  /* ✅ 允许放大的子路径（以后只加名字） */
  const enablePaths = [
    "/youmiyahina/",
    // "/gallery2/",
    // "/photos/",
  ];

  if (!enablePaths.some(p => location.pathname.startsWith(p))) return;

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


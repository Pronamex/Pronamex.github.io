(function () {
  // Esperar a que el DOM esté listo
  document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("bannerNoticias");
    if (!video) {
      console.error('No se encontró el elemento video con id "bannerNoticias"');
      return;
    }

    // Configuración básica
    video.style.width = "100%";
    video.style.borderRadius = "15px";
    video.muted = true;
    video.autoplay = true;
    video.controls = false;

    // Lista de reproducción
    const playlist = [
      "https://www.pronamexsacv.com.mx/Videos/Banner_Sismos.mp4",
      "https://www.pronamexsacv.com.mx/Videos/Banner_Seguimiento.mp4",
      "https://www.pronamexsacv.com.mx/Videos/Banner_SAT.mp4",
      "https://www.pronamexsacv.com.mx/Videos/Banner_CapturaVentas.mp4",
    ];

    let currentIndex = 0;

    function loadVideo(index) {
      const safeIndex = (index + playlist.length) % playlist.length;
      currentIndex = safeIndex;
      video.src = playlist[safeIndex];
      video.load();
      video
        .play()
        .catch((e) =>
          console.log("Error al reproducir (autoplay bloqueado):", e),
        );
    }

    // Si un video falla al cargar, pasa al siguiente
    video.addEventListener("error", function () {
      console.warn("Error cargando video:", video.src);
      loadVideo(currentIndex + 1);
    });

    video.addEventListener("ended", function () {
      loadVideo(currentIndex + 1);
    });

    // Crear contenedor para botones
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "block";
    wrapper.style.width = "100%";

    video.parentNode.insertBefore(wrapper, video);
    wrapper.appendChild(video);

    // Botón anterior
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "&#10094;";
    Object.assign(prevButton.style, {
      position: "absolute",
      top: "50%",
      left: "10px",
      transform: "translateY(-50%)",
      zIndex: "10",
      background: "rgba(0,0,0,0.5)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      fontSize: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
    prevButton.setAttribute("aria-label", "Video anterior");
    prevButton.addEventListener("click", () => loadVideo(currentIndex - 1));

    // Botón siguiente
    const nextButton = document.createElement("button");
    nextButton.innerHTML = "&#10095;";
    Object.assign(nextButton.style, {
      position: "absolute",
      top: "50%",
      right: "10px",
      transform: "translateY(-50%)",
      zIndex: "10",
      background: "rgba(0,0,0,0.5)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      fontSize: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
    nextButton.setAttribute("aria-label", "Video siguiente");
    nextButton.addEventListener("click", () => loadVideo(currentIndex + 1));

    wrapper.appendChild(prevButton);
    wrapper.appendChild(nextButton);

    // Iniciar
    loadVideo(0);
  });
})();

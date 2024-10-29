// URL de la API de YouTube para buscar videos de un canal específico.
// Incluye parámetros como el ID del canal, el tipo de datos a obtener (snippet, id), el orden de los resultados y el número máximo de resultados.
const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UC0_95MpNlRz9x7JmsXBClZA&part=snippet%2Cid&order=date&maxResults=15";

// Selecciona el elemento del DOM donde se mostrarán los videos.
// Usa null como valor inicial para evitar errores si el elemento no se encuentra.
const content = null || document.getElementById("content");

// Configuración de opciones para la solicitud a la API, incluyendo el método y los encabezados necesarios para la autenticación.
const options = {
  method: "GET", // Método de la solicitud HTTP
  headers: {
    "x-rapidapi-key": "bdc36f7778msh41c91dde96fadf3p167ef7jsn4abe09371654", // Clave de API para autenticación
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com", // Host de la API
  },
};

// Función asíncrona para obtener datos de la API
async function fetchData(urlApi) {
  const response = await fetch(urlApi, options); // Realiza la solicitud a la API
  const data = await response.json(); // Convierte la respuesta a formato JSON
  return data; // Devuelve los datos obtenidos
}

// Función IIFE (Immediately Invoked Function Expression) para ejecutar código asíncrono
(async () => {
  try {
    // Llama a la función fetchData para obtener los videos
    const videos = await fetchData(API);

    // Crea el HTML para mostrar los videos
    let view = `
        ${videos.items
          .map(
            (video) => `
            <div class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title} // Título del video
                    </h3>
                </div>
            </div>
        `
          )
          .slice(0, 8)
          .join("")}
        `;

    // Inserta el HTML generado en el elemento 'content'
    content.innerHTML = view;
  } catch (error) {
    // Manejo de errores en caso de que falle la solicitud a la API
    console.log(error);
  }
})();

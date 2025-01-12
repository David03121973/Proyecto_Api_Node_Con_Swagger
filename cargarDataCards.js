const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Definir la ruta de la carpeta donde se guardarán las imágenes
const imagesDirectory = path.resolve(__dirname, '../FrontEnd_con_nuxt/Web_cartas/public/assets'); // Cambia 'ruta/deseada' por tu ruta deseada

// Asegúrate de que la carpeta existe
if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true }); // Crea la carpeta si no existe
}

// Función para descargar una imagen
const downloadImage = async (url, imageName) => {
    const response = await axios.get(url, { responseType: 'stream' });
    const writer = fs.createWriteStream(path.join(imagesDirectory, imageName)); // Usar la ruta definida

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

// Función para cargar los datos de las cartas
const cargarDataCards = async () => {
    try {
        console.log("Obteniendo datos");
        // Hacer la solicitud a la API
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        console.log("Datos obtenidos");

        // Procesar los datos recibidos
        const data = response.data.data;
        if (data && Array.isArray(data)) {
            let cont = 1;
            for (let element of data) {
                console.log(cont, ": ", element.card_images[0].image_url);
                // Crear carta
                const cartaData = {
                    nombre: element.name,
                    tipo: element.type,
                    descripcion: element.desc,
                    raza: element.race,
                    arquetipo: element.archetype,
                    imagen: ` `
                };
                try {
                    const response = await axios.post("http://localhost:3000/carta/createCarta", cartaData);
                    console.log('Carta creada exitosamente: true');
                    // Realizar la solicitud PUT
                    const data = {
                        imagen: `/assets/${response.data.id_carta}.jpg` // Nueva URL de la imagen
                    };
                    const responsePut = await axios.put(`http://localhost:3000/carta/updateCarta/${response.data.id_carta}`, data);
                    console.log("Carta actualizada");

                    // Descargar imagen de la carta
                    const imageUrl = element.card_images[0].image_url;
                    const imageName = `${response.data.id_carta}.jpg`; // Usar el ID de la carta como nombre de archivo
                    try {
                        await downloadImage(imageUrl, imageName);
                        console.log(`Imagen descargada: ${imageName}`);
                    } catch (error) {
                        console.error(`Error al descargar la imagen de ${imageUrl}:`, error);
                    }
                } catch (error) {
                    console.error('Error al crear la carta:', error.response ? error.response.data : error.message);
                }
                cont++;
            }
        }

        // Aquí puedes agregar más lógica para manejar los datos como desees

    } catch (error) {
        // Manejo de errores
        console.error('Error al cargar los datos de las cartas:', error);
    }
};

// Llamar a la función para cargar los datos
cargarDataCards();
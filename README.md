Proyecto Quiniela Next.js + MongoDB
Este repositorio contiene una aplicación construida con Next.js y MongoDB. A continuación, encontrarás instrucciones para instalar y ejecutar la aplicación en tu entorno local.

Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

Node.js (versión 14.x o superior)
MongoDB (instalado localmente o acceso a una base de datos en la nube)
npm (administrador de paquetes)
Instalación
Clona el repositorio:

bash
git clone https://github.com/luisalbeto/quinielaMongo.git
Navega al directorio del proyecto:

bash
cd tu-repositorio
Instala las dependencias:

bash
npm install

Configura las variables de entorno:

Copialas en el archivo de ejemplo de variables de entorno y renómbralo:

.env.example a .env

Luego, abre el archivo .env y configura las variables necesarias. Asegúrate de incluir tu URI de conexión a MongoDB. Ejemplo:

MONGODB_URI="mongodb://localhost:27017/tu-base-de-datos"
NEXTAUTH_SECRET="examplesecrettoken21902u129012u981"

Inicia la base de datos MongoDB:

Asegúrate de que MongoDB esté en ejecución. Puedes iniciar el servidor MongoDB con:

bash
mongod

Ejecutar la Aplicación
Para ejecutar la aplicación en modo de desarrollo, usa uno de los siguientes comandos:

Con npm:

bash
npm run dev

La aplicación estará disponible en http://localhost:3000.

Construir y Desplegar
Para construir la aplicación para producción, usa:

Con npm:

bash
npm run build

Luego, para iniciar el servidor de producción, usa:

Con npm:

bash
npm start

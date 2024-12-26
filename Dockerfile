# Dockerfile pour le projet Sudoku

# Utiliser une image de base Node.js
FROM node:14

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install
RUN npm install -g http-server

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["http-server", ".", "-p", "3000", "--host", "0.0.0.0"]

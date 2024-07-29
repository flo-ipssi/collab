# Utiliser une image Node.js appropriée
FROM node:18.17.0

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
RUN npm run build

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application
# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]

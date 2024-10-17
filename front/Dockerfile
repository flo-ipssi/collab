# Utiliser une image Node.js appropriée
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Install dependencies and update certificates

# RUN apt-get update && apt-get install -y ca-certificates
RUN npm set strict-ssl false && npm install --legacy-peer-deps
RUN npm install -D @swc/cli @swc/core --legacy-peer-deps
# RUN npm set strict-ssl true
# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
# RUN npm run build
# RUN npm run dev

# Re-enable strict SSL checking for the final image
# RUN npm set strict-ssl true

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application
# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]

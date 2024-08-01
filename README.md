# Colllab

## BUG EN COURS 
Il est possible que le lancement de l'application front-end en Next.js rencontre des problèmes. Ce bug est inscrit dans la liste des tâches à résoudre.

Pour contourner ce problème, installez Node.js localement et lancez la commande npm run dev.


## Description
Colllab est une application web permettant aux utilisateurs de s'inscrire, d'ajouter leurs compétences et leur matériel musical, et de rechercher des artistes en fonction de leur localisation.

## Technologies Utilisées
- **Frontend**: React
- **Backend**: Symfony, API Platform
- **Base de données**: MySQL
- **Recherche**: Elasticsearch
- **Authentification**: JWT
- **Stockage de fichiers**: Cloudinary
- **Notifications**: SendGrid et Twilio
- **DevOps**:
  - Docker & Docker Compose
  - Kubernetes
  - GitLab CI
- **Monitoring & Logging**:
  - ELK Stack (Elasticsearch, Logstash, Kibana)
  - Prometheus
- **Géolocalisation**: OpenStreetMap

## Prérequis
- Docker & Docker Compose
- Node.js & npm/yarn
- Symfony CLI
- Composer

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/flo-ipssi/colllab.git
   cd colllab

2. Lancez les conteneurs :
   ```bash
   docker-compose up -d


3. Créez et génerer la base de donnée :
   ```bash
   docker exec -it php_collab bash
   php bin/console d:d:c
   php bin/console d:m:m
   php bin/console d:fixtures:load


## Troubleshooting
Error: UNABLE_TO_VERIFY_LEAF_SIGNATURE
L'installation de paquets avec npm est souvent liée à des problèmes de certificat SS

Solution
   ```bash
      npm config set strict-ssl false
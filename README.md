# Sudoku Docker Configuration

Ce dépôt contient la configuration Docker pour déployer le jeu de Sudoku. Il est conçu pour être facilement déployable sur n'importe quel environnement Docker.

## Structure
- `docker-compose.yml` : Configuration des services
- `Dockerfile` : Configuration de l'image Docker
- `nginx.conf` : Configuration du serveur web

## Dépendances
- Docker
- Docker Compose

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/SebDeNoocode/sudoku-dk.git
cd sudoku-dk
```

2. Cloner le jeu Sudoku :
```bash
git clone https://github.com/SebDeNoocode/sudoku-web.git
```

3. Lancer les conteneurs :
```bash
docker-compose up -d
```

## Accès
Le jeu sera accessible à l'adresse : http://localhost:80

## Liens
- [Dépôt du jeu Sudoku](https://github.com/SebDeNoocode/sudoku-web)

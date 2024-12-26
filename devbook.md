# DevBook du projet Sudoku

## To-Do List
### Code
- [x] Implémenter la logique du jeu
  - [x] Génération de grille valide
  - [x] Validation des mouvements
  - [x] Système de difficulté (easy, medium, hard)
  - [x] Système d'indices
- [ ] Créer l'interface utilisateur
  - [ ] Affichage de la grille
  - [ ] Saisie des nombres
  - [ ] Affichage des erreurs
  - [ ] Timer
- [x] Création de l'application web (en Docker)
- [ ] Ajouter un bouton pour le tableau des scores (top 50 des temps par différents niveaux)
- [ ] Ajouter un bouton indice (icône ampoule) pour aider à l'ajout d'un chiffre, limité à 5 maximum, avec ajout de 30s sur le temps
- [x] Ajouter un bouton "?" avec les règles du jeu
- [ ] Mettre à jour le design pour un style plus sympa (ombre, contraste, différentes couleurs, cases plus ou moins sombres)

### Graphisme
- [ ] Concevoir les assets graphiques
  - [ ] Icône ampoule pour les indices
  - [ ] Design des boutons
  - [ ] Style de la grille
- [ ] Créer des animations
  - [ ] Animation de victoire
  - [ ] Animation lors de la saisie d'un nombre
  - [ ] Animation pour les erreurs

### Tests
- [ ] Écrire les tests unitaires
  - [ ] Tests de génération de grille
  - [ ] Tests de validation des mouvements
  - [ ] Tests du système d'indices
- [ ] Effectuer des tests d'intégration

### Documentation
- [ ] Rédiger le manuel utilisateur
- [ ] Documenter le code

## Timeline
- **Semaine 1** : Finaliser le cahier des charges et la conception
- **Semaine 2-3** : Développement de la logique du jeu et de l'interface
- **Semaine 4** : Tests et corrections de bugs
- **Semaine 5** : Finalisation et préparation pour le lancement

## État des tâches
| Tâches à faire | Tâches en cours | Tâches terminées |
|----------------|----------------|------------------|
| - [ ]         | - [ ]         | - [x] Implémenter la logique du jeu
|                |                | - [x] Création de l'application web (en Docker)
|                |                | - [x] Ajouter un bouton "?" avec les règles du jeu

## Progrès

### 26 Décembre 2024
- Configuration de Docker avec `http-server` pour servir l'application
- Implémentation complète de la logique du jeu dans `sudoku.js`
  - Génération de grilles valides
  - Système de validation des mouvements
  - Système de difficulté avec 3 niveaux
  - Système d'indices
- Ajout du bouton des règles du jeu

## Prochaines étapes
1. Mettre à jour l'interface utilisateur pour utiliser la nouvelle logique de jeu
2. Implémenter le système de timer
3. Ajouter le tableau des scores
4. Améliorer le design visuel

## Suivi des dépendances
- Vérifier les dépendances pour éviter les blocages lors du développement.

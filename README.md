# CRM Pro - Application de gestion de clientèle

Une application CRM moderne construite avec Next.js, conçue pour aider les petites équipes commerciales à gérer efficacement leur base de clients.

## 🚀 Fonctionnalités

### Pages principales

- **Page de connexion** : Interface élégante avec authentification mockée
- **Dashboard** : Vue d'ensemble avec statistiques et actions rapides
- **Liste des clients** : Table interactive avec recherche, tri et filtres
- **Fiche client** : Vue détaillée avec informations complètes et historique
- **Formulaire d'ajout** : Création de nouveaux clients avec validation

### Fonctionnalités avancées

- 📱 **Design responsive** : Optimisé pour mobile, tablette et desktop
- 🔍 **Recherche en temps réel** : Filtrage instantané des clients
- 📊 **Tri dynamique** : Par nom, statut, date de création
- 🏷️ **Système de tags** : Organisation et catégorisation des clients
- 🎨 **Interface moderne** : Design system cohérent

## 🛠️ Technologies utilisées

- **Next.js 13** : Framework React avec App Router
- **TypeScript** : Typage statique pour plus de robustesse
- **Tailwind CSS** : Framework CSS utility-first
- **shadcn/ui** : Composants UI modernes et accessibles
- **Redux Toolkit** : Gestion globale d’état optimisée avec typage TypeScript, actions asynchrones et persistance automatique
- **React Hook Form** : Gestion des formulaires avec validation
- **Zod** : Validation de schémas TypeScript
- **date-fns** : Manipulation des dates
- **Faker.js** : Génération de données mockées
- **Lucide React** : Icônes modernes

## 📦 Installation

1. **Cloner le projet** (si applicable)

```bash
git clone https://github.com/49maodo/crm-client
cd crm-client
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer le serveur de développement**

```bash
npm run dev
```

4. **Ouvrir l'application**
   Accédez à [http://localhost:3000](http://localhost:3000)

## 🔐 Authentification

L'application utilise un système d'authentification mocké pour la démonstration :

- Utilisez n'importe quel email et mot de passe
- Les sessions sont stockées en localStorage
- Redirection automatique selon l'état de connexion

## 📊 Données mockées

L'application utilise **Faker.js** pour générer des données réalistes :

- 20 clients avec informations complètes
- Historique d'activités pour chaque client
- Différents statuts : actif, prospect, inactif
- Tags et entreprises variés
- Adresses françaises

## 🔍 Fonctionnalités détaillées

### Dashboard

- Vue d'ensemble
- Liste des clients récents
- Actions rapides (ajouter client, etc.)
- Statistiques avec tendances

### Gestion des clients

- **Liste** : Table avec tri, recherche, pagination
- **Détail** : Informations complètes, historique, actions
- **Ajout** : Formulaire avec validation, gestion des tags
- **Recherche** : Par nom, email, entreprise en temps réel

### Validation des formulaires

- Champs obligatoires marqués
- Validation email et téléphone
- Messages d'erreur contextuels
- Prévisualisation des données

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

### Lancement en production

```bash
npm start
```
## 🤝 Contribution

Ce projet respecte les bonnes pratiques :

- Code TypeScript strict
- Composants réutilisables
- Architecture modulaire
- Documentation complète
- Design system cohérent
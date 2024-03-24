## Projet "Next.js Movie App"

Ce projet est une application web développée avec Next.js, MongoDB et MongoDB Atlas. L'objectif de cette application est d'afficher une liste de films récupérés depuis l'API de The Movie Database (TMDb) et de permettre à l'utilisateur de consulter les détails de chaque film.

### Stack technologique

- **Frontend**:
  - Next.js
  - React
  - Tailwind CSS
  - TypeScript (TSX)

- **Backend**:
  - MongoDB
  - MongoDB Atlas
  - TypeScript (TS)

### Comment setup et lancer le projet

1. **Cloner le repository**:
   ```bash
   git clone <url-du-repository>
   ```

2. **Installer les dépendances**:
   ```bash
    cd nextjs-movie-app
    npm install
   ```

3. **Configurer MongoDB Atlas**:
   - Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/signup).
   - Créez un nouveau cluster en suivant les instructions sur le tableau de bord de MongoDB Atlas.
   - Ajoutez une base de données et un utilisateur avec les autorisations nécessaires.
   - Copiez le lien de connexion à votre cluster MongoDB.
   - Créez un fichier `.env.local` à la racine du projet et ajoutez-y votre URI de connexion MongoDB sous la forme suivante :
     ```
     MONGODB_URI=<Votre URI de connexion MongoDB>
     ```
   - Assurez-vous que le fichier `.env.local` est inclus dans votre fichier `.gitignore` pour éviter de partager vos informations sensibles.

3. **Lancer l'application**:
    ```bash
   npm run dev
   ```

4. **Statut du développement**:
   - Le projet est actuellement en cours de développement.
   - Jusqu'à présent, la liste des films est affichée avec succès.
   - La fonctionnalité de détail du film fonctionne, mais elle rencontre parfois des problèmes.
   - D'autres fonctionnalités et améliorations sont en cours de développement.

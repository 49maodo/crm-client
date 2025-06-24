// export const mockClients: Client[] = [
//   {
//     id: '1',
//     nom: 'Dupont',
//     prenom: 'Jean',
//     email: 'jean.dupont@example.com',
//     telephone: '+33 1 23 45 67 89',
//     entreprise: 'TechCorp',
//     poste: 'Directeur IT',
//     statut: 'actif',
//     tags: ['VIP', 'Tech'],
//     dateCreation: new Date('2023-01-15'),
//     derniereActivite: new Date('2024-01-10'),
//     adresse: {
//       rue: '123 Rue de la Paix',
//       ville: 'Paris',
//       codePostal: '75001',
//       pays: 'France',
//     },
//     historique: [
//       {
//         id: 'h1',
//         type: 'appel',
//         titre: 'Appel de suivi',
//         description: 'Discussion sur le nouveau projet',
//         date: new Date('2024-01-10'),
//       },
//     ],
//   },
//   {
//     id: '2',
//     nom: 'Martin',
//     prenom: 'Sophie',
//     email: 'sophie.martin@example.com',
//     telephone: '+33 1 98 76 54 32',
//     entreprise: 'DesignStudio',
//     poste: 'Creative Director',
//     statut: 'prospect',
//     tags: ['Design', 'Créatif'],
//     dateCreation: new Date('2023-03-20'),
//     derniereActivite: new Date('2024-01-08'),
//     adresse: {
//       rue: '456 Avenue des Champs',
//       ville: 'Lyon',
//       codePostal: '69001',
//       pays: 'France',
//     },
//     historique: [
//       {
//         id: 'h2',
//         type: 'email',
//         titre: 'Proposition commerciale',
//         description: 'Envoi de la proposition pour le projet web',
//         date: new Date('2024-01-08'),
//       },
//     ],
//   },
//   {
//     id: '3',
//     nom: 'Bernard',
//     prenom: 'Pierre',
//     email: 'pierre.bernard@example.com',
//     telephone: '+33 1 11 22 33 44',
//     entreprise: 'ConsultCorp',
//     poste: 'CEO',
//     statut: 'inactif',
//     tags: ['Consulting'],
//     dateCreation: new Date('2022-11-10'),
//     derniereActivite: new Date('2023-12-15'),
//     adresse: {
//       rue: '789 Boulevard Saint-Germain',
//       ville: 'Marseille',
//       codePostal: '13001',
//       pays: 'France',
//     },
//     historique: [
//       {
//         id: 'h3',
//         type: 'reunion',
//         titre: 'Réunion de clôture',
//         description: 'Fin du contrat de consulting',
//         date: new Date('2023-12-15'),
//       },
//     ],
//   },
//   {
//     id: '4',
//     nom: 'Leroy',
//     prenom: 'Marie',
//     email: 'marie.leroy@example.com',
//     telephone: '+33 1 55 66 77 88',
//     entreprise: 'StartupInc',
//     poste: 'CTO',
//     statut: 'actif',
//     tags: ['Startup', 'Tech', 'Innovation'],
//     dateCreation: new Date('2023-06-01'),
//     derniereActivite: new Date('2024-01-12'),
//     adresse: {
//       rue: '321 Rue de Rivoli',
//       ville: 'Paris',
//       codePostal: '75004',
//       pays: 'France',
//     },
//     historique: [
//       {
//         id: 'h4',
//         type: 'note',
//         titre: 'Note de suivi',
//         description: 'Client très satisfait du service',
//         date: new Date('2024-01-12'),
//       },
//     ],
//   },
//   {
//     id: '5',
//     nom: 'Moreau',
//     prenom: 'Antoine',
//     email: 'antoine.moreau@example.com',
//     telephone: '+33 1 99 88 77 66',
//     entreprise: 'RetailPlus',
//     poste: 'Responsable Digital',
//     statut: 'prospect',
//     tags: ['Retail', 'Digital'],
//     dateCreation: new Date('2023-09-15'),
//     derniereActivite: new Date('2024-01-05'),
//     adresse: {
//       rue: '654 Place Bellecour',
//       ville: 'Lyon',
//       codePostal: '69002',
//       pays: 'France',
//     },
//     historique: [
//       {
//         id: 'h5',
//         type: 'appel',
//         titre: 'Premier contact',
//         description: 'Présentation de nos services',
//         date: new Date('2024-01-05'),
//       },
//     ],
//   },
// ];

// export interface Client {
//   id: string;
//   nom: string;
//   prenom: string;
//   email: string;
//   telephone: string;
//   entreprise: string;
//   poste: string;
//   dateCreation: Date;
//   derniereActivite: Date;
//   statut: 'actif' | 'inactif' | 'prospect';
//   tags: string[];
//   adresse: {
//     rue: string;
//     ville: string;
//     codePostal: string;
//     pays: string;
//   };
//   historique: ActivityRecord[];
// }

// export interface ActivityRecord {
//   id: string;
//   type: 'appel' | 'email' | 'reunion' | 'note';
//   titre: string;
//   description: string;
//   date: Date;
// }

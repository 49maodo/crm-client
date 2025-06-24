import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

export interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string;
  poste: string;
  dateCreation: string;
  derniereActivite: string;
  statut: 'actif' | 'inactif' | 'prospect';
  tags: string[];
  adresse: {
    rue: string;
    ville: string;
    codePostal: string;
    pays: string;
  };
  historique: ActivityRecord[];
}

export interface ActivityRecord {
  id: string;
  type: 'appel' | 'email' | 'reunion' | 'note';
  titre: string;
  description: string;
  date: string;
}


const mockClients: Client[] = [
  {
    id: '1',
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    telephone: '+33 1 23 45 67 89',
    entreprise: 'TechCorp',
    poste: 'Directeur IT',
    statut: 'actif',
    tags: ['VIP', 'Tech'],
    dateCreation: new Date('2023-01-15').toString(),
    derniereActivite: new Date('2024-01-10').toString(),
    adresse: {
      rue: '123 Rue de la Paix',
      ville: 'Paris',
      codePostal: '75001',
      pays: 'France',
    },
    historique: [
      {
        id: 'h1',
        type: 'appel',
        titre: 'Appel de suivi',
        description: 'Discussion sur le nouveau projet',
        date: new Date('2024-01-10').toString(),
      },
    ],
  },
  {
    id: '2',
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@example.com',
    telephone: '+33 1 98 76 54 32',
    entreprise: 'DesignStudio',
    poste: 'Creative Director',
    statut: 'prospect',
    tags: ['Design', 'Créatif'],
    dateCreation: new Date('2023-03-20').toString(),
    derniereActivite: new Date('2024-01-08').toString(),
    adresse: {
      rue: '456 Avenue des Champs',
      ville: 'Lyon',
      codePostal: '69001',
      pays: 'France',
    },
    historique: [
      {
        id: 'h2',
        type: 'email',
        titre: 'Proposition commerciale',
        description: 'Envoi de la proposition pour le projet web',
        date: new Date('2024-01-08').toString(),
      },
    ],
  },
];

const generateQuickClients = (count: number): Client[] => {
  const clients: Client[] = [...mockClients];

  for (let i = clients.length; i < count; i++) {
    const dateCreation = faker.date.between({ from: '2022-01-01', to: new Date() });
    const derniereActivite = faker.date.recent({ days: 30 });
    const historiqueDate = faker.date.recent({ days: 7 });

    clients.push({
      id: (i + 1).toString(),
      nom: faker.person.lastName(),
      prenom: faker.person.firstName(),
      email: faker.internet.email(),
      telephone: faker.phone.number(),
      entreprise: faker.company.name(),
      poste: faker.person.jobTitle(),
      dateCreation: dateCreation.toISOString(), // ✅ convert to string
      derniereActivite: derniereActivite.toISOString(), // ✅ convert to string
      statut: faker.helpers.arrayElement(['actif', 'inactif', 'prospect']),
      tags: faker.helpers.arrayElements(['Premium', 'VIP', 'Startup', 'Corporate', 'PME'], { min: 0, max: 2 }),
      adresse: {
        rue: faker.location.streetAddress(),
        ville: faker.location.city(),
        codePostal: faker.location.zipCode(),
        pays: 'France',
      },
      historique: [
        {
          id: faker.string.uuid(),
          type: faker.helpers.arrayElement(['appel', 'email', 'reunion', 'note']),
          titre: 'Activité récente',
          description: faker.lorem.sentence(),
          date: historiqueDate.toISOString(), // ✅ convert to string
        },
      ],
    });
  }

  return clients;
};

interface ClientsState {
  clients: Client[];
  currentClient: Client | null;
  isLoading: boolean;
  error: string | null;
  stats: {
    totalClients: number;
    clientsActifs: number;
    prospects: number;
    activitesRecentes: number;
  };
}

const ClientData = generateQuickClients(20);
const calculateStats = (clients: Client[]) => ({
  totalClients: clients.length,
  clientsActifs: clients.filter((c) => c.statut === 'actif').length,
  prospects: clients.filter((c) => c.statut === 'prospect').length,
  activitesRecentes: clients.reduce((acc, c) => acc + c.historique.length, 0),
});

const initialState: ClientsState = {
  clients: ClientData,
  currentClient: null,
  isLoading: false,
  error: null,
  stats: calculateStats(ClientData),
};

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  await new Promise((r) => setTimeout(r, 500)); 
  return generateQuickClients(20);
});

export const addClient = createAsyncThunk('clients/addClient', async (clientData: Omit<Client, 'id' | 'dateCreation' | 'derniereActivite' | 'historique'>) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newClient: Client = {
    ...clientData,
    id: Date.now().toString(),
    dateCreation: new Date().toString(),
    derniereActivite: new Date().toString(),
    historique: [],
  };

  return newClient;
});

export const updateClient = createAsyncThunk('clients/updateClient', async ({ id, updates }: { id: string; updates: Partial<Client> }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { id, updates: { ...updates, derniereActivite: new Date().toString() } };
});

export const fetchClientById = createAsyncThunk('clients/fetchClientById', async (id: string, { getState }) => {
  const state = getState() as { clients: ClientsState };
  const localClient = state.clients.clients.find((client) => client.id === id);

  if (localClient) {
    return localClient;
  }


  await new Promise((resolve) => setTimeout(resolve, 500));
  const mockClient = mockClients.find((client) => client.id === id);

  if (!mockClient) {
    throw new Error('Client non trouvé');
  }

  return mockClient;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentClient: (state) => {
      state.currentClient = null;
    },
    updateStats: (state) => {
      const totalClients = state.clients.length;
      const clientsActifs = state.clients.filter((c) => c.statut === 'actif').length;
      const prospects = state.clients.filter((c) => c.statut === 'prospect').length;
      const activitesRecentes = state.clients.reduce((acc, client) => acc + client.historique.length, 0);

      state.stats = {
        totalClients,
        clientsActifs,
        prospects,
        activitesRecentes,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = action.payload;
        clientsSlice.caseReducers.updateStats(state);
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Erreur lors du chargement des clients';
      })
      // Add client
      .addCase(addClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients.push(action.payload);
        clientsSlice.caseReducers.updateStats(state);
      })
      .addCase(addClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Erreur lors de l'ajout du client";
      })
      // Update client
      .addCase(updateClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, updates } = action.payload;
        const clientIndex = state.clients.findIndex((client) => client.id === id);
        if (clientIndex !== -1) {
          state.clients[clientIndex] = { ...state.clients[clientIndex], ...updates };
        }
        if (state.currentClient && state.currentClient.id === id) {
          state.currentClient = { ...state.currentClient, ...updates };
        }
        clientsSlice.caseReducers.updateStats(state);
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Erreur lors de la mise à jour du client';
      })
      // Fetch client by ID
      .addCase(fetchClientById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentClient = action.payload;
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Erreur lors du chargement du client';
      });
  },
});

export const { clearError, clearCurrentClient, updateStats } = clientsSlice.actions;
export default clientsSlice.reducer;

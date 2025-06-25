import { create } from "zustand";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  collegeName: string;
  branch: string;
  avatar: string;
  college: string;
  isAffiliate: boolean;
  createdAt: string;
}

interface Challenge {
  _id: string;
  title: string;
  createdAt: string;
  category: string;
  difficulty: string;
  platform: string;
  description: string;
  problemLink: string;
  solvedUsers: any[];
}

interface AdminState {
  users: User[];
  challenges: Challenge[];
  loading: boolean;
  error: string | null;
  token: string | null;
  fetchUsers: () => Promise<void>;
  fetchChallenges: () => Promise<void>;
  login: (token: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => {
  const token = localStorage.getItem("admin-token");

  return {
    users: [],
    challenges: [],
    loading: false,
    error: null,
    token,

    // Fetch users from the API
    fetchUsers: async () => {
      try {
        set({ loading: true, error: null });

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/users`);

        let users: User[] = [];

        if (Array.isArray(response.data)) {
          users = response.data;
        } else if (response.data && typeof response.data === "object") {
          const userData = response.data.users || response.data.data || [];
          if (Array.isArray(userData)) {
            users = userData;
          } else {
            throw new Error("Invalid data format received from API");
          }
        } else {
          throw new Error("Invalid data format received from API");
        }

        set({ users });
      } catch (err) {
        console.error("Error fetching users:", err);
        set({ error: (err as Error).message });
      } finally {
        set({ loading: false });
      }
    },

    // Fetch challenges from the API and store them in state
    fetchChallenges: async () => {
      try {
        set({ loading: true, error: null });

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/challenges`);

        // Store the raw challenges data
        if (response.data && Array.isArray(response.data.challenges)) {
          set({ challenges: response.data.challenges });
        }
      } catch (err) {
        console.error("Error fetching challenges:", err);
        set({ error: (err as Error).message });
      } finally {
        set({ loading: false });
      }
    },

    // Login function to set token and store it in local storage
    login: (token: string) => {
      localStorage.setItem("admin-token", token);
      set({ token });
    },

    // Logout function to remove token from local storage
    logout: () => {
      localStorage.removeItem("admin-token");
      set({ token: null });
    },
  };
});

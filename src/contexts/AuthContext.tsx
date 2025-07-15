import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '../services/api';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types';

interface AuthContextData {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signIn(credentials: LoginCredentials): Promise<void>;
  signUp(data: RegisterData): Promise<void>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const storedToken = localStorage.getItem('@ClickBeard:token');
    const storedUser = localStorage.getItem('@ClickBeard:user');

    if (storedToken && storedUser) {
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  async function signIn(credentials: LoginCredentials) {
    try {
      const response = await api.post<AuthResponse>('/sessions', credentials);
      const { access_token, user } = response.data;

      localStorage.setItem('@ClickBeard:token', access_token);
      localStorage.setItem('@ClickBeard:user', JSON.stringify(user));

    
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      setUser(user);
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Email ou senha incorretos');
      }
      throw new Error('Erro ao fazer login. Tente novamente.');
    }
  }

  async function signUp(data: RegisterData) {
    try {
      await api.post('/accounts', data);

      await signIn({ email: data.email, password: data.password });
    } catch (error: any) {
      if (error.response?.data?.message?.includes('Email já')) {
        throw new Error('Email já cadastrado');
      }
      throw new Error('Erro ao criar conta. Tente novamente.');
    }
  }

  function signOut() {
    localStorage.removeItem('@ClickBeard:token');
    localStorage.removeItem('@ClickBeard:user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}
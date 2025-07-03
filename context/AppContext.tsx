'use client';

import { AppContextType, Certificate, Project } from '@/utils/types.d';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projectsResp, certificatesResp] = await axios.all([
          axios.get(`${API_URL}/projects`),
          axios.get(`${API_URL}/certificates`),
        ]);

        if (projectsResp.status !== 200 || certificatesResp.status !== 200) {
          throw new Error(
            `Error en la respuesta: ${projectsResp.status} ${certificatesResp.status}`
          );
        }

        setProjects(projectsResp.data);
        setCertificates(certificatesResp.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              'Disculpa, estamos experimentando problemas al conectar con el servidor.'
          );
        } else {
          setError((error as Error).message || 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProjectById = async (id: string): Promise<Project> => {
    setLoading(true);
    try {
      const resp = await axios.get<Project>(`${API_URL}/projects/${id}`);

      if (resp.status !== 200) {
        throw new Error(`Error en la respuesta: ${resp.status}`);
      }

      const project = resp.data;
      if (!project || typeof project !== 'object') {
        throw new Error('Formato de respuesta inválido');
      }

      return project;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            'Disculpa, estamos teniendo problemas al conectar con el servidor.'
        );
      } else {
        setError((error as Error).message || 'Error desconocido');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const openModal = (img: string) => {
    setIsModalOpen(true);
    setSelectedImg(img);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        certificates,
        getProjectById,
        isModalOpen,
        setIsModalOpen,
        selectedImg,
        loading,
        error,
        openModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook para utilizar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de un <AppProvider>');
  }

  return context;
};

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  animeDatabase as initialAnime,
  studios as initialStudios,
  type Anime,
  type Studio,
} from "@/data/animeData";

interface DataContextType {
  animeList: Anime[];
  studiosList: Studio[];
  addAnime: (anime: Omit<Anime, "id">) => void;
  addStudio: (studio: Omit<Studio, "id">) => void;
  deleteAnime: (id: number) => void;
  deleteStudio: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [animeList, setAnimeList] = useState<Anime[]>(initialAnime);
  const [studiosList, setStudiosList] = useState<Studio[]>(initialStudios);

  const addAnime = (animeData: Omit<Anime, "id">) => {
    const newAnime: Anime = {
      ...animeData,
      id: Math.max(...animeList.map((a) => a.id), 0) + 1,
    };
    setAnimeList((prev) => [...prev, newAnime]);
  };

  const addStudio = (studioData: Omit<Studio, "id">) => {
    const newStudio: Studio = {
      ...studioData,
      id: Math.max(...studiosList.map((s) => s.id), 0) + 1,
    };
    setStudiosList((prev) => [...prev, newStudio]);
  };

  const deleteAnime = (id: number) => {
    setAnimeList((prev) => prev.filter((anime) => anime.id !== id));
  };

  const deleteStudio = (id: number) => {
    setStudiosList((prev) => prev.filter((studio) => studio.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        animeList,
        studiosList,
        addAnime,
        addStudio,
        deleteAnime,
        deleteStudio,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

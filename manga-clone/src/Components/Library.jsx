import React, { createContext, useContext, useState } from 'react';

const LibraryContext = createContext();

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {
    const [library, setLibrary] = useState([]);

    const addToLibrary = (manga) => {
        setLibrary((prev) => {
            const alreadyExists = prev.some(item => item.mal_id === manga.mal_id);
            return alreadyExists ? prev : [...prev, manga];
        });
    };

    return (
        <LibraryContext.Provider value={{ library, addToLibrary }}>
            {children}
        </LibraryContext.Provider>
    );
};

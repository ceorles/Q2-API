import { useState, useEffect } from 'react';

export function useLibrary() {
    const [library, setLibrary] = useState(() => {
        const stored = localStorage.getItem('mangaLibrary');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('mangaLibrary', JSON.stringify(library));
    }, [library]);

    const addToLibrary = (manga) => {
        if (!library.some(item => item.mal_id === manga.mal_id)) {
            setLibrary(prev => [...prev, manga]);
        }
    };

    const removeFromLibrary = (mal_id) => {
        setLibrary(prev => prev.filter(manga => manga.mal_id !== mal_id));
    };
    

    return { library, addToLibrary, removeFromLibrary };
}

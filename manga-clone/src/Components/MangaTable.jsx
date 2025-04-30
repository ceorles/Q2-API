import React, { useState, useEffect, useCallback } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import './component-css/MangaClone.css';
import { useLibrary } from '../Components/Library';

function MangaTable() {
    const [mangas, setMangas] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    // const [order, setOrder] = useState('asc');
    const [file, setFile] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { library, addToLibrary, removeFromLibrary } = useLibrary();
    const [showLibrary, setShowLibrary] = useState(false);

    const mangasPerPage = 10;

    const fetchData = useCallback(() => {
        if (page === 1 && searchTerm.trim() === '') {
            const customMangas = [
                {
                    mal_id: 1001,
                    title: "The guy she was interested in wasn't a guy at all",
                    authors: [{ name: "Arai Sumiko" }],
                    published: { from: "2022" },
                    images: { jpg: { image_url: "theGuySheWasInterestedInWasn'tAGuyAtAll.jpg" } }
                },
                {
                    mal_id: 1002,
                    title: "I'm in Love with the Villainess",
                    authors: [{ name: "Inori" }],
                    published: { from: "2019" },
                    images: { jpg: { image_url: "imInLoveWithTheVillainess.jpg" } }
                },
                {
                    mal_id: 1003,
                    title: "Whisper Me a Love Song",
                    authors: [{ name: "Eku Takeshima" }],
                    published: { from: "2019" },
                    images: { jpg: { image_url: "whisperMeALoveSong.jpg" } }
                },
                {
                    mal_id: 1004,
                    title: "Bloom Into You",
                    authors: [{ name: "Nakatani Nio" }],
                    published: { from: "2015" },
                    images: { jpg: { image_url: "bloomIntoYou.jpg" } }
                },
                {
                    mal_id: 1005,
                    title: "Tokyo Aliens",
                    authors: [{ name: "Naoe" }],
                    published: { from: "2020" },
                    images: { jpg: { image_url: "tokyoAliens.jpg" } }
                },
                {
                    mal_id: 1006,
                    title: "The Villainess Flips the Script!",
                    authors: [{ name: "KEN" }],
                    published: { from: "2024" },
                    images: { jpg: { image_url: "theVillainessFlipTheScript.jpg" } }
                },
                {
                    mal_id: 1007,
                    title: "Vampire x Junior",
                    authors: [{ name: "Takano Saku" }],
                    published: { from: "2019" },
                    images: { jpg: { image_url: "VampirexJunior.jpg" } }
                },
                {
                    mal_id: 1008,
                    title: "I Want to Love You Till Your Dying Day",
                    authors: [{ name: "Aono Nachi" }],
                    published: { from: "2025" },
                    images: { jpg: { image_url: "iWantToLoveYouTillYourDyingDay.jpg" } }
                },
                {
                    mal_id: 1009,
                    title: "Tricked Into Becoming the Heroine's Stepmother",
                    authors: [{ name: "Unknown" }],
                    published: { from: "2022" },
                    images: { jpg: { image_url: "trickedIntoBecomingTheHeroinesStepmother.jpg" } }
                },
                {
                    mal_id: 1010,
                    title: "The Summer You Were There",
                    authors: [{ name: "Yuama" }],
                    published: { from: "2021" },
                    images: { jpg: { image_url: "theSummerYouWereThere.jpg" } }
                }
            ];
            setMangas(customMangas);
            setTotalPages(7577);
        } else {
            fetch(`https://api.jikan.moe/v4/manga?q=${searchTerm}&page=${page}&limit=${mangasPerPage}`)
                .then(res => res.json())
                .then(data => {
                    setMangas(data.data || []);
                    setTotalPages(data.pagination?.last_visible_page || 1);
                })
                .catch(() => setMangas([]));
        }
    }, [page, searchTerm]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            alert(`Uploaded file: ${uploadedFile.name}`);
        }
    };

    // const sortedMangas = [...mangas].sort((a, b) => {
    //     const aTitle = (a.title || '').toLowerCase();
    //     const bTitle = (b.title || '').toLowerCase();
    //     return order === 'asc' ? aTitle.localeCompare(bTitle) : bTitle.localeCompare(aTitle);
    // });

    return (
        <div className='maryAngelaRemojo'>
            {/* Search and Upload Section */}
            <div className='search'>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="searchInput"
            />
            <button onClick={() => {
                setPage(1);
                setSearchTerm(search); // trigger search officially
            }}>
                Search
            </button>


                <div className="upload_holder">
                    <label className="upload_label">
                        <FiUploadCloud size={30} />
                        Upload Image
                        <input type="file" onChange={handleUpload} hidden />
                    </label>
                    {file && <p className="uploaded-file">Uploaded: {file.name}</p>}
                </div>
            </div>

            {/* Library Toggle Button */}
            {!showLibrary && (
                <div className="sidebar-toggle">
                    <button onClick={() => setShowLibrary(true)}>📚 Open Library</button>
                </div>
            )}

            {/* Library Sidebar */}
            {showLibrary && (
                <div className="librarySidebar">
                    <div className="libraryHeader">
                        <h2>Your Library</h2>
                        <button onClick={() => setShowLibrary(false)}>❌ Close</button>
                    </div>
                    {/* You'll need to access your library data here */}
                    {/* Example: If you have useLibrary, add `const { library } = useLibrary();` at the top */}
                    {library.length === 0 ? (
                        <p>No manga in your library.</p>
                    ) : (
                        <div className='lelagela'>
                            {library.map(manga => (
                                <div className='mangaHolder' key={manga.mal_id}>
                                    <div className='mangaImg'>
                                        <img
                                            src={manga.images?.jpg?.image_url || 'https://dummyimage.com/150x200/ccc/000.jpg&text=No+Image'}
                                            alt={manga.title}
                                        />
                                    </div>
                                    <div className='mangaTitle1st'>
                                        <h1>{manga.title}</h1>
                                        <h2>{manga.authors?.[0]?.name || "No Author"}</h2>
                                        <h3>{manga.published?.from?.slice(0, 4) || "N/A"}</h3>
                                        <button onClick={() => removeFromLibrary(manga.mal_id)}>❌ Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Manga Cards Section */}
            <div className='lelagela'>
                {mangas.length > 0 ? (
                    mangas.map(manga => {
                        const coverUrl = manga.images?.jpg?.image_url || 'https://dummyimage.com/150x200/ccc/000.jpg&text=No+Image';
                        return (
                            <div className='mangaHolder' key={manga.mal_id}>
                                <div className='mangaImg'>
                                    <img src={coverUrl} alt={manga.title || 'No Title'} />
                                </div>
                                <div className='mangaTitle'>
                                    <h1>{manga.title || 'No Title'}</h1>
                                    <h2>{manga.authors?.[0]?.name || "No Author"}</h2>
                                    <h3>{manga.published?.from?.slice(0, 4) || "N/A"}</h3>
                                    <button onClick={() => addToLibrary(manga)}>+ Add to Library</button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No manga found.</p>
                )}
            </div>

            {/* Pagination Section */}
            <div className='gelalela'>
                <div className='gustoKoSiGelaLang'>
                    <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                        <img src="back.png" alt="PREVIOUS" />
                    </button>
                    <span> Page {page}/{totalPages} </span>
                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        <img src="next.png" alt="NEXT" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MangaTable;

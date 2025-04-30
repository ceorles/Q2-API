import React, { useState, useEffect, useCallback } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import './component-css/MangaClone.css';

function MangaTable() {
    const [mangas, setMangas] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');
    const [file, setFile] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const mangasPerPage = 10;

    const fetchData = useCallback(() => {
        if (page === 1 && search.trim() === '') {
            const customMangas = [
                {
                    mal_id: 1001,
                    title: "The guy she was interested in wasn't a guy at all",
                    authors: [{ name: "Arai Sumiko" }],
                    published: { from: "2022-01-01" },
                    images: { jpg: { image_url: "theGuySheWasInterestedInWasn'tAGuyAtAll.jpg" } }
                },
                {
                    mal_id: 1002,
                    title: "I'm in Love with the Villainess",
                    authors: [{ name: "Inori" }],
                    published: { from: "2019-01-01" },
                    images: { jpg: { image_url: "imInLoveWithTheVillainess.jpg" } }
                },
                {
                    mal_id: 1003,
                    title: "Whisper Me a Love Song",
                    authors: [{ name: "Eku Takeshima" }],
                    published: { from: "2019-01-01" },
                    images: { jpg: { image_url: "whisperMeALoveSong.jpg" } }
                },
                {
                    mal_id: 1004,
                    title: "Bloom Into You",
                    authors: [{ name: "Nakatani Nio" }],
                    published: { from: "2015-01-01" },
                    images: { jpg: { image_url: "bloomIntoYou.jpg" } }
                },
                {
                    mal_id: 1005,
                    title: "Omniscient Reader's Viewpoint",
                    authors: [{ name: "Sing Shong" }],
                    published: { from: "2018-01-01" },
                    images: { jpg: { image_url: "ORV.jpg" } }
                },
                {
                    mal_id: 1006,
                    title: "There is No Love Wishing Upon a Star",
                    authors: [{ name: "Unknown" }],
                    published: { from: "2020-01-01" },
                    images: { jpg: { image_url: "thereIsNoLoveWishingUponAStar.jpg" } }
                },
                {
                    mal_id: 1007,
                    title: "The Novel's Extra",
                    authors: [{ name: "Jee Gab Song" }],
                    published: { from: "2018-01-01" },
                    images: { jpg: { image_url: "theNovelsExtra.png" } }
                },
                {
                    mal_id: 1008,
                    title: "I Built a Lifespan Club",
                    authors: [{ name: "Unknown" }],
                    published: { from: "2021-01-01" },
                    images: { jpg: { image_url: "iBuiltALifespanClub.jpg" } }
                },
                {
                    mal_id: 1009,
                    title: "Tricked Into Becoming the Heroine's Stepmother",
                    authors: [{ name: "Unknown" }],
                    published: { from: "2022-01-01" },
                    images: { jpg: { image_url: "trickedIntoBecomingTheHeroinesStepmother.jpg" } }
                },
                {
                    mal_id: 1010,
                    title: "Kaoru Hana wa Rin to Saku",
                    authors: [{ name: "Shuu Morishita" }],
                    published: { from: "2020-01-01" },
                    images: { jpg: { image_url: "KaoruHanaWaRinToSaku.jpg" } }
                }
            ];
            setMangas(customMangas);
            setTotalPages(7577);
        } else {
            fetch(`https://api.jikan.moe/v4/manga?q=${search}&page=${page}&limit=${mangasPerPage}`)
                .then(res => res.json())
                .then(data => {
                    setMangas(data.data || []);
                    setTotalPages(data.pagination?.last_visible_page || 1);
                })
                .catch(() => setMangas([]));
        }
    }, [page, search]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [fetchData]);

    const handleUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            alert(`Uploaded file: ${uploadedFile.name}`);
        }
    };

    const sortedMangas = [...mangas].sort((a, b) => {
        const aTitle = (a.title || '').toLowerCase();
        const bTitle = (b.title || '').toLowerCase();
        return order === 'asc' ? aTitle.localeCompare(bTitle) : bTitle.localeCompare(aTitle);
    });

    return (
        <div className='maryAngelaRemojo'>
            {/* Search and Upload Section */}
            <div className='search'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="searchInput"
                />
                <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                    Toggle Order ({order})
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

            {/* Manga Cards Section */}
            <div className='lelagela'>
                {sortedMangas.length > 0 ? (
                    sortedMangas.map(manga => {
                        const coverUrl = manga.images?.jpg?.image_url || 'https://dummyimage.com/150x200/ccc/000.jpg&text=No+Image';
                        return (
                            <div className='mangaHolder' key={manga.mal_id}>
                                <div className='mangaImg'>
                                    <img src={coverUrl} alt={manga.title || 'No Title'} />
                                </div>
                                <div className='mangaTitle'>
                                    <h1>{manga.title || 'No Title'}</h1>
                                    <h2>{manga.authors?.[0]?.name || "No Author"}</h2>
                                    <h2>{manga.published?.from?.slice(0, 4) || "N/A"}</h2>
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
                <div>
                    <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                        Previous
                    </button>
                    <span> Page {page} of {totalPages} </span>
                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MangaTable;

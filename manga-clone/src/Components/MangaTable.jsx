import React, { useState, useEffect } from 'react';
// import "./manga.css";
import { FiUploadCloud } from 'react-icons/fi';

function MangaTable() {
    const [mangas, setMangas] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');
    const [file, setFile] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const mangasPerPage = 10;

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 500); // para may deley

        return () => clearTimeout(delayDebounce);
    }, [search, page]);

    const fetchData = () => {
        fetch(`https://api.jikan.moe/v4/manga?q=${search}&page=${page}&limit=${mangasPerPage}`)
            .then(res => res.json())
            .then(data => {
                setMangas(data.data || []);
                setTotalPages(data.pagination?.last_visible_page || 1);
            })
            .catch(() => setMangas([]));
    };

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
        <div className='Main_holder'>
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
            <div className='holder'>
                {sortedMangas.length > 0 ? (
                    sortedMangas.map(manga => {
                        const coverUrl = manga.images?.jpg?.image_url || 'https://dummyimage.com/150x200/ccc/000.jpg&text=No+Image';

                        return (
                            <div className='bookHolder' key={manga.mal_id}>
                                <div className='bookImg'>
                                    <img src={coverUrl} alt={manga.title || 'No Title'} />
                                </div>
                                <div className='bookTitle'>
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
            <div className='pagination'>
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
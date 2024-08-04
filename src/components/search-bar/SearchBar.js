import { Input, Row, Col, Modal } from 'reactstrap';
import Loading from '../Loading';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useQueryClient } from 'react-query';
import { PDFDocument } from 'pdf-lib';
import { post } from '../../utils/fetch';
import "./search.css";

export default function SearchBar({ searchFunction }) {
    const { data } = useQuery('currentUser', () => post('users'));
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [favorites, setFavorites] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfError, setPdfError] = useState(null);
    const [pdfLink, setPdfLink] = useState("");
    const [searchCriteria, setSearchCriteria] = useState(null);
    const categories = ["Appetizers", "Breakfast", "Breads", "Cakes", "Candy", "Casseroles", "Canning", "Cookies", "Desserts", "Drinks", "Fish", "Frosting", "Ice Cream", "Meat", "Pasta", "Pie", "Poultry", "Pudding", "Salads", "Soups", "Vegetables"]; 
    const { data: recipeData } = useQuery(
        ["recipes", searchCriteria],
        () => post("recipes/search", searchCriteria),
        { enabled: !!searchCriteria, staleTime: Infinity }
    );
      
      
    const handleSearch = () => {
        const searchData = {
            title: title || "",
            category: category || "",
            favorites: favorites
        }
        searchFunction(searchData);
        setSearchCriteria(searchData);
    }

    const searchFavorites = () => {
        const search_criteria = {
            title: "",
            category: "",
            favorites: true
        }
        searchFunction(search_criteria);
    }

    const printResults = () => {
        console.log(recipeData.recipes)
        setPdfLoading(true);
        getPdfs();
        setModalOpen(true);
    }

    const getPdfs = async () => {
        const blobs = [];
        try {
            for (let recipe of recipeData.recipes) {
                const response = await post(`recipes/pdf/${recipe._id}`, {}, "blob");
                console.log(response);
                blobs.push(response);
            }
        } catch (error) {
            setPdfError(error.message);
            setPdfLoading(false);
            return;
        }

        const mergedPdf = await PDFDocument.create();
    
        for (const blob of blobs) {
            const pdfBytes = await blob.arrayBuffer();
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfFile = await mergedPdf.save();
        const mergedBlob = new Blob([mergedPdfFile], { type: 'application/pdf' });
        const url = URL.createObjectURL(mergedBlob);
        setPdfLink(url);
        setPdfLoading(false);
    }

    const SearchBtns = () => {
        return (
            <div className='search-btns'>
                <button onClick={handleSearch} className='me-1 pink-btn'>
                    <FontAwesomeIcon icon={faSearch} className='me-2'/>
                    Search
                </button>
                {
                    recipeData?.recipes?.length > 0 && (
                        <button className='blue-btn ms-2' onClick={printResults}>
                            Print Results
                        </button>
                    )
                }
                {
                    data.user && (
                        <button className='blue-btn' onClick={searchFavorites} data-testid="see-favorites-btn">
                            <FontAwesomeIcon icon={faHeart} className='me-2'/>
                            My Favorites
                        </button>
                        // <label check className='switch'>
                        //     <input 
                        //         type="checkbox" 
                        //         checked={favorites}
                        //         onChange={() => { 
                        //             setFavorites(!favorites);
                        //         }}/>
                        //     <span className="slider round">
                        //         <FontAwesomeIcon icon={faHeart} />
                        //     </span>
                        // </label>
                    )
                }
            </div>
        )
    }

    return (
      <Row className='search-bar'>
        <Col xs='12' className='search-input d-block d-md-flex align-items-center'>
            <Input 
                placeholder='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <Input 
                type='select' 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            >
                <option value="">no category</option>
                {
                    categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))
                }
            </Input>
            <div className='d-none d-md-block'>
                <SearchBtns />
            </div>
        </Col>
        <Col className='d-block d-md-none'>
            <SearchBtns />
        </Col>

        <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
            {pdfLoading ? (
                <div className="text-center">
                    <Loading />
                    <p className="mb-5">This might take a few minutes...</p>
                </div>
            ) : pdfError ? (
                <div className="text-center my-4 py-4">
                    <p>{pdfError}</p>
                    <button
                        className="grey-btn ms-4"
                        onClick={() => setModalOpen(false)}
                    >
                            Go Back
                    </button>
                </div>
            ) : (
            <div className="d-flex align-items-center justify-content-center py-5">
                <a
                href={pdfLink}
                target="_blank"
                className="me-3"
                rel="noreferrer"
                >
                    Open PDF
                </a>
                <button
                className="grey-btn ms-4"
                onClick={() => setModalOpen(false)}
                >
                    Go Back
                </button>
            </div>
            )}
        </Modal>
      </Row>
    )
  }
import { createContext, useContext, useState, useEffect } from "react";
import api from "../../API/Axios";
import { useSearchParams } from "react-router-dom";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);


export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({
            search: searchTerm,

        });
    }, [searchTerm])

    return (
        <SearchContext.Provider
            value={{ searchTerm, setSearchTerm }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;

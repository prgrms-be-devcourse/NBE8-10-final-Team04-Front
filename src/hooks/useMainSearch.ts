import {useState, type FormEvent} from "react";
import {useNavigate} from "react-router-dom";

export function useMainSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 검색어를 query parameter로 담아 검색 페이지로 이동
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
  };
}

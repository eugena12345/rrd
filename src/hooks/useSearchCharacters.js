import axios from "axios";
import { useEffect, useState } from "react";

export const useSearchCharacters = (query = '', pageNumber, category) => {
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [result, setResult] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setResult([]);
    }, [category])

    useEffect(() => {
        setIsLoading(true);
        setError(false);
        let cancel;

        axios({
            method: 'GET',
            url: `https://rickandmortyapi.com/api/${category}`,
            params: { q: query, page: pageNumber },
            cancelToken: new axios.CancelToken((c) => cancel = c),
        }).then((response) => {
            setResult((prev) => [... new Set([...prev, ...response.data.results])])
            setHasMore(response.data.info.pages > pageNumber)
        })
            .catch((e) => {
                if (axios.isCancel(e)) {
                    return;
                }
                console.error(e);
                setError(true)
            })
            .finally(() => {
                setIsLoading(false);
            });

        return () => cancel();

    }, [query, pageNumber, category]);

    return {
        loading,
        error,
        result,
        hasMore
    };
};


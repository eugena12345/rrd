import { useNavigate, useParams } from "react-router-dom";
import characters from "./../../data/characters.json";
import episode from "./../../data/episode.json";
import location from "./../../data/location.json";
import { useAuthContext } from "../../context/AuthContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchCharacters } from "../../hooks/useSearchCharacters";

const categoriesName = {
    character: {
        name: 'Персонажи',
        data: characters
    },
    episode: {
        name: 'Эпизоды',
        data: episode
    },
    location: {
        name: 'Локации',
        data: location
    },
};

const CategoryPage = () => {
    const { id } = useParams(); //id = здесь название категории, странный нейминг, да
    const navigate = useNavigate();
    const value = useAuthContext();
    const [pageNumber, setPageNumber] = useState(1);
    const {
        loading,
        error,
        result,
        hasMore
    } = useSearchCharacters('', pageNumber, id);

    const observer = useRef();

    useEffect(() => {
        setPageNumber(1);
    }, [id])

    const lastNodeRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber((prev) => prev + 1);
            }
        })

        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore])


    const isRealCategory = () => {
        const categories = Object.keys(categoriesName);
        if (categories.includes(id)) {
            return true;
        }
        return false;
    }

    if (!isRealCategory()) {
        return (<div>Нет такой категории, попробуйте выбрать категорию из меню</div>)
    };

    const onCategoryClick = (categoryName, item) => {
        const path = `/categories/${categoryName}/${item.id}`;
        navigate(path, { state: item });
    }
    return (
        <div>
            <div>Приветствую, {value.user || 'Guest'}</div>
            <h1>Название категории: {categoriesName[id].name}</h1>
            <p>Вы видите список элементов из данной категории. При нажатии на элемент, откроется детальная информация об элементе.</p>
            <div className="elements">
                {loading && <>Загрузка...</>}
                {result.map((item, index) => {
                    if ((index + 1) === (result.length)) {
                        return (
                            <div
                                ref={lastNodeRef}
                                className="element"
                                key={item.id}
                                onClick={() => { onCategoryClick(id, item) }}>
                                {item.name}
                            </div>
                        )
                    } else {
                        return (
                            <div
                                className="element"
                                key={item.id}
                                onClick={() => { onCategoryClick(id, item) }}>
                                {item.name}
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default CategoryPage;
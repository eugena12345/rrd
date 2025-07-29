import { useNavigate, useParams } from "react-router-dom";
import characters from "./../../data/characters.json";
import episode from "./../../data/episode.json";
import location from "./../../data/location.json";

const categoriesName = {
    characters: {
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
    const { id } = useParams();
    const navigate = useNavigate();
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
            <h1>Название категории: {categoriesName[id].name}</h1>
            <p>Вы видите список элементов из данной категории. При нажатии на элемент, откроется детальная информация об элементе.</p>
            <div className="elements">
                {categoriesName[id].data.map((item) => {
                    return (
                        <div
                            className="element"
                            key={item.id}
                            onClick={() => { onCategoryClick(id, item) }}>
                            {item.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoryPage;
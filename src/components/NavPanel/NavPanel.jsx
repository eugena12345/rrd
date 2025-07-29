import { Link, NavLink } from "react-router-dom";


const NavPanel = () => {
    const categories = ['characters', 'episode', 'location']
    return (
        <ul className="navlist">
            {categories.map((category) => {
                return (
                    <li key={category}><NavLink to={`/categories/${category}`}>{category}</NavLink></li>
                )
            })}
            <li><NavLink to='/'>На главную</NavLink></li>
        </ul>
    )
}

export default NavPanel;
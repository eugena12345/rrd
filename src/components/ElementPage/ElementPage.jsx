import { useLocation, useParams } from "react-router-dom";

const ElementPage = () => {
  const { id, elementId } = useParams();
  const element = useLocation();
  if (!element.state) {
    return (
      <div>Такой элемент не найден, попробуйте выбрать что-нибудь из имеющихся категорий</div>
    )
  }

  if (id === 'characters') {
    return (
      <div className="entity-info">
        <h2>{element.state.name}</h2>
        <img src={element.state.image} alt={element.state.name} className="entity-image" />
        <p><strong>Status:</strong> {element.state.status}</p>
        <p><strong>Species:</strong> {element.state.species}</p>
        <p><strong>Type:</strong> {element.state.type || 'Unknown'}</p>
        <p><strong>Gender:</strong> {element.state.gender}</p>
        <p><strong>Created:</strong> {new Date(element.state.created).toLocaleDateString()}</p>
      </div>
    );
  }

  if (id === 'location') {
    return (
      <div className="entity-info">
        <h2>{element.state.name}</h2>
        <p><strong>Type:</strong> {element.state.type}</p>
        <p><strong>Dimension:</strong> {element.state.dimension}</p>
        <p><strong>Created:</strong> {new Date(element.state.created).toLocaleDateString()}</p>
      </div>
    );
  }

  if (id === 'episode') {
    return (
      <div className="entity-info">
        <h2>{element.state.name}</h2>
        <p><strong>Air Date:</strong> {element.state.air_date}</p>
        <p><strong>Episode:</strong> {element.state.episode}</p>
        <p><strong>Created:</strong> {new Date(element.state.created).toLocaleDateString()}</p>
      </div>
    );
  }

  return (
    <div>Такой элемент не найден, попробуйте выбрать что-нибудь из имеющихся категорий</div>
  )
}

export default ElementPage;
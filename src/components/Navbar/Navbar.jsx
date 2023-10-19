import "./navbar.css";
import myData from "../../data/myData.json";
import PropTypes from 'prop-types';
function Navbar({ setSelectedTypes, selectedTypes,recherche }) {
  const handleTypeClick = (type) => {
   
    if (selectedTypes.includes(type)) {
    
      setSelectedTypes(selectedTypes.filter((selected) => selected !== type));
    } else {
     
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const getTypeClassName = (type) => {
   
    return selectedTypes.includes(type) ? "type_navbar type_actif" : "type_navbar";
  };

  return (
    <nav>
      <div className="nav_container">
        <div className="nav_button"></div>
        <div className="container_nav">
          <div className="img_navbar">
            <img src="/img/pokemon_logo.png" alt="" />
          </div>
          <div className="title_type_button">Search by name</div>
          <div className="search_bar">
            <input onInput={(e) => recherche(e)} type="text" />
          </div>
          <div className="title_type_button">Search by types</div>
          <div className="types_button_container">
            {Object.keys(myData.types).map((type, index) => (
              <div
                key={index}
                className={getTypeClassName(type)}
                onClick={() => handleTypeClick(type)}
              >
                <img src={myData.types[type].img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
Navbar.propTypes = {
  setSelectedTypes: PropTypes.func.isRequired, 
  selectedTypes: PropTypes.array.isRequired,
  recherche: PropTypes.func.isRequired, 
};
export default Navbar;

import "./styles.scss";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../components/UI/Button";
import Navbar from "../../components/Navbar";
import Box from "../../components/UI/Box";
import ProductCard from "../../components/ProductCard";

function Categoria(props) {
  const category = props.categoryList.find(
    (category) => category.id === props.match.params.id
  );

  useEffect(() => {
    window.scrollTo(0, 0)
    props.getCategoryProducts(category.name);

    return () => props.setFilteredProductList([]);
  }, []);

  const history = useHistory();

  return (
    <div className="category-page">
      <div className="navbar-category">
        <Navbar />
      </div>
      <div className="category-cover">
        <div className="category-gradient">
          <h1 className="category-title">{category.name}</h1>
          <Button
            buttonType="secondary"
            id="category-back-button"
            onClick={() => history.goBack()}
          >
            Voltar
          </Button>

          <img src={category.image} id="category-cover-image" />
          {/* <Image name="pulseira.jpg" /> */}
        </div>
      </div>

      <Box id="category-products-box">
        <div className="products-list">
          {props.filteredProductList?.map((product) => (
            <ProductCard
              title={product.name}
              category={product.category}
              price={product.price}
              id={product.id}
              addToCart={props.addToCart}
            >
              <img
                src={product.images[0]}
                alt=""
                onClick={() =>
                  history.push(`/produto/${product.name.replace(/\s+/g, "-")}`)
                }
              />
            </ProductCard>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default Categoria;

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getElementById } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import CustomerDetails from "../components/CustomerDetails";
import EditItem from "../components/EditItem";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [editedProduct, setEditedProduct] = useState(product);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);

  const [productCustomers, setProductCustomers] = useState();
  //   const product = getElementById("products", "8WTLTeHCD9qUk6DdP1FX")

  const location = useLocation();

  // const productCustomers = location.state;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  console.log(productCustomers);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const currentProduct = await getElementById("products", id);
        setProduct({ ...currentProduct.data(), id: currentProduct.id });
        setEditedProduct({ ...currentProduct.data(), id: currentProduct });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const handler = () => {
      const productCustomersCopy = [];
      purchases.forEach((purchase) => {
        const { customerId } = purchase;
        if (!productCustomersCopy.includes(customerId)) {
          productCustomersCopy.push(customerId);
        }
      });
      setProductCustomers(productCustomersCopy);
    };

    fetchProduct();
    handler();
  }, [id]);

  // const editHandler = (e) => {
  //   const { name, value } = e.target;
  //   setEditedProduct((prevEditedProduct) => ({
  //     ...prevEditedProduct,
  //     [name]: value,
  //   }));
  // };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Product: {product.name}</h1>

        <EditItem item={product} collection={"products"} />
      </div>
      <br />
      <h3 className="text-center text-3xl">Customers:</h3> <br />
      <ul>
        {productCustomers?.map((customerId) => {
          const custPurchase = purchases.find(
            (p) => p.productId === product.id && p.customerId === customerId
          );
          const customer = customers.find((c) => c.id === customerId);
          return (
            <>
              <CustomerDetails
                key={customerId}
                customer={customer}
                custPurchase={custPurchase}
              />
              <br />
            </>
          );
        })}
      </ul>
    </>
  );
}

export default EditProduct;

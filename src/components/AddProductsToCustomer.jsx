import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import "firebase/database";

function AddProductsToCustomer({ customer }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [productToAdd, setProductToAdd] = useState();

  const purchasesCollectionRef = collection(db, "purchases");
  const productsCollectionRef = collection(db, "products");

  const saveHandler = async () => {
    if (productToAdd) {
      const product = products.find((p) => p.name === productToAdd);
      if (product) {

        const currentDate = new Date()
        const yyyy = currentDate.getFullYear()
        let mm = currentDate.getMonth() + 1
        let dd = currentDate.getDate()
        if(dd < 10) {dd ='0' + dd}
        if(mm < 10) {mm = '0' + mm}
        const formattedDate = dd + '/' + mm + '/' + yyyy
 
        const purchaseData = {
          customerId: customer.id,
          productId: product.id,
          date: formattedDate,
        };

        const ref = doc(db, 'products', product.id);
        await setDoc(ref, {...product, quantity: product.quantity - 1})


        await addDoc(purchasesCollectionRef, purchaseData);

        dispatch({
          type: "SAVE",
          payload: purchaseData,
        });
        setProductToAdd("");
      }
    }
  };

  return (
    <>
      <select
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        onChange={(e) => setProductToAdd(e.target.value)}
      >
        <option disabled={true} selected={true}>
          Select Product
        </option>
        {products.map((product) => (
          <>
            <option key={product.id} disabled={product.quantity <= 0 ? true : false }>
              <img src={product.image} alt={product.image}></img>
              {product.name}
            </option>
          </>
        ))}
      </select>
      <button
        onClick={() => saveHandler()}
        className="px-4 mt-1 py-1 text-sm text-white bg-blue-400 font-bold rounded-full border border-blue-600 hover:text-blue-600 hover:bg-white hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
      >
        Save
      </button>
    </>
  );
}

export default AddProductsToCustomer;

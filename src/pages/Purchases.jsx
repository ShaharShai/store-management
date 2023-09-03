import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Purchases() {
  const purchases = useSelector((state) => state.purchases);
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);

  const [searchData, setSearchData] = useState({
    product: "",
    customer: "",
    date: "",
  });
  const [purchasesToPresent, setPurchasesToPresent] = useState([]);

  useEffect(() => {
    let currentPurchases = [];


    if (
      searchData.customer === "" &&
      searchData.product === "" &&
      searchData.date === ""
    ) {
      purchases.forEach((purchase) => {
        const customer = customers.find(
          (customer) => customer.id === purchase.customerId
        );

        
        const product = products.find(
          (product) => product.id === purchase.productId
        );

        if (customer && product) {
          currentPurchases[purchase.id] = {
            customer: `${customer.firstname} ${customer.lastname}`,
            product: product.name,
            date: purchase.date,
          };
        }
      });

      setPurchasesToPresent(currentPurchases);
    }
   
 
    
    
    console.log(purchasesToPresent);
    console.log(currentPurchases);
  }, [searchData, purchases]);

  const searchDatahandler = (e) => {
    const { name, value } = e.target;
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: value === "all" ? "" : value,
    }));

   
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl">Purchases</h1>
        <select
          name="product"
          onInput={(e) => searchDatahandler(e)}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          <option disabled={true} selected={true}>
            Select a Product
          </option>
          <option value="" selected={!searchData.product}>
            All Products
          </option>
          {products.map((product) => (
            <>
              <option key={product.id}>
                <img src={product.image} alt={product.image}></img>
                {product.name}
              </option>
            </>
          ))}
        </select>
        <br /> <br />
        <select
          name="customer"
          onInput={(e) => searchDatahandler(e)}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          <option disabled={true} selected={true}>
            Select a Customer
          </option>
          <option value="" selected={!searchData.customer}>
            All Customers
          </option>
          {customers.map((customer) => (
            <>
              <option key={customer.id}>
                {customer.firstname} {customer.lastname}
              </option>
            </>
          ))}
        </select>
        <br /> <br />
        <input
          onInput={(e) => searchDatahandler(e)}
          type="date"
          name="date"
          id="date"
        />
        <br /> <br />
        <button className="px-4 mt-1 py-1 text-sm text-white bg-blue-400 font-bold rounded-full border border-blue-600 hover:text-blue-600 hover:bg-white hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2">
          Search
        </button>
      </div>
      {/* <div className="text-3xl text-center">
       <h1>{searchData.customer}</h1> - <h1>{searchData.product}</h1> - <h1>{searchData.date}</h1>
       </div> */}
      <div className="text-center">
        {purchasesToPresent.map((p) => (
          <div key={p}>{p.customer}</div>
        ))}
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-blue-100 border-b bg-neutral-800 font-medium text-black dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span>Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Name</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Price</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Quantity</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(purchasesToPresent).map((purchaseId) => {
              const purchase = purchasesToPresent[purchaseId];
              return (
                <tr
                  key={purchaseId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-32 p-4">
                    <img
                      className="rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                      src={
                        purchase.customer.image
                          ? purchase.customer.image
                          : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                      }
                      alt={purchase.customer.name}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <Link to={`/edit-product/${purchase.customer.id}`}>
                      <h3 className="font-bold">{purchase.customer}</h3>
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <h3>{purchase.product}</h3>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <h3>{purchase.date}</h3>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Purchases;

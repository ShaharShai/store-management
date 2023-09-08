import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Purchases() {
  const {
    purchases,
    products,
    customers,
  } = useSelector((state) => state);

  const [searchData, setSearchData] = useState({
    product: "",
    customer: "",
    date: "",
  });

  const [initialPurchases, setInitialPurchases] = useState([]);
  const [purchasesToPresent, setPurchasesToPresent] = useState([]);


  const filterPurchases = () => {
    let filteredArray = [...initialPurchases];
  
    if (searchData.customer !== "") {
      filteredArray = filteredArray.filter(
        (purchase) => purchase.customer === searchData.customer
      );
    }
  
    if (searchData.product !== "") {
      filteredArray = filteredArray.filter(
        (purchase) => purchase.product === searchData.product
      );
    }
  
    if (searchData.date !== "") {
      filteredArray = filteredArray.filter(
        (purchase) => purchase.date === searchData.date
      );
    }
  
    setPurchasesToPresent(filteredArray);
  };

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
          currentPurchases.push({
            customer: `${customer.firstname} ${customer.lastname}`,
            product: product.name,
            date: purchase.date,
          });
        }
      });

      setPurchasesToPresent([...currentPurchases]);
      setInitialPurchases([...currentPurchases]);
    } else {

      filterPurchases()
    }
    

    console.log(purchasesToPresent);
    console.log(currentPurchases);
  }, [searchData, purchases]);


  const searchDatahandler = (e) => {
    const { name, value } = e.target;
  

    if (name === 'date') {
   
      const inputDate = new Date(value);
      const dd = String(inputDate.getDate()).padStart(2, '0');
      const mm = String(inputDate.getMonth() + 1).padStart(2, '0');
      const yyyy = inputDate.getFullYear();
      const formattedDate = `${dd}/${mm}/${yyyy}`;
  

      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        [name]: formattedDate,
      }));
    } else {
      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        [name]: value === "all" ? "" : value,
      }));
    }
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

      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-blue-100 border-b bg-neutral-800 font-medium text-black dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
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
            {
             purchasesToPresent.length === 0 ? (
              <tr>
                <td colSpan="3">No Purchases Found</td>
              </tr>
            ) :
            purchasesToPresent.map((purchase) => {
              return (
                <tr
                  key={purchase.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <h3 className="font-bold">{purchase.customer}</h3>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <h3>{purchase.product}</h3>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <h3>{purchase.date}</h3>
                  </td>
                </tr>
              );
            })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Purchases;

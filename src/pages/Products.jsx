import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomerDetails from "../components/CustomerDetails";
import { Link } from "react-router-dom";

function Products() {
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);

  const [productCustomers, setProductCustomers] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const productCustomersCopy = { ...productCustomers };
    let total = 0;

    const productCustomersHandler = () => {
      purchases.forEach((purchase) => {
        const { productId, customerId } = purchase;
        if (!productCustomersCopy[productId]) {
          productCustomersCopy[productId] = [];
        }
        if (!productCustomersCopy[productId].includes(customerId)) {
          productCustomersCopy[productId].push(customerId);
        }
      });
    };
    setProductCustomers(productCustomersCopy);

    const totalAmountHandler = () => {
      purchases.forEach((purchase) => {
        total += 1;
      });

      setTotalAmount(total);
    };

    totalAmountHandler();
    productCustomersHandler();
    console.log(purchases);
  }, [purchases]);

  if (!products || !customers || !purchases) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl">Products</h1> <br />
        <div className="mb-12 md:mb-0">
          <h3 className="text-xl">Total amount of purchased products:</h3>
          <h4 className="display-5 mb-4 text-4xl font-bold text-primary dark:text-primary-400">
            {totalAmount}
          </h4>
        </div>
        <div>
          <h3 className="text-xl font-bold">All Products: </h3>
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
                  <th scope="col" className="px-6 py-3">
                    <span>Customers that bought the product:</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-32 p-4">
                        <img
                          className="rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                          src={
                            product.image
                              ? product.image
                              : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                          }
                          alt={product.name}
                        ></img>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <Link to={`/edit-product/${product.id}`}>
                          <h3 className="font-bold">{product.name}</h3>
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <h3>${product.price}</h3>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <h3>{product.quantity}</h3>
                      </td>
                      <td className="w-32 p-4">
                        <div className="scrollDiv">
                          <ul>
                            {productCustomers[product.id]?.map((customerId) => {
                              const custPurchase = purchases.find(
                                (p) =>
                                  p.productId === product.id &&
                                  p.customerId === customerId
                              );
                              const customer = customers.find(
                                (c) => c.id === customerId
                              );
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
                        </div>
                      </td>
                      <br /> <br />
                    </tr>
                    <br />
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;

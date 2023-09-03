import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddProductsToCustomer from "../components/AddProductsToCustomer";

function Customers() {
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);

  const [buyProductToggle, setBuyProductToggle] = useState(false);

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl">Customers</h1>
      </div>
      <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-blue-100 border-b bg-neutral-800 font-medium text-black dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                <span>Name</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Products</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Add a Product</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  <img
                    className="rounded-sm w-32 shadow-none transition-shadow duration-300 ease-in-out hover:shadow-sm hover:shadow-black/30"
                    src={
                      customer.image
                        ? customer.image
                        : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                    }
                    alt={customer.firstname}
                  ></img>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {customer.firstname} {customer.lastname}
                </td>
                <td className="w-32 p-4">
                  <div className="scrollDiv3 ">
                    {purchases
                      .filter((purchase) => purchase.customerId === customer.id)
                      .map((purchase) => {
                        const product = products.find(
                          (p) => p.id === purchase.productId
                        );
                        return (
                          <div key={purchase.id}>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              <ul>
                                {product && (
                                  <Link to={`/edit-product/${product.id}`}>
                                    {product.name}
                                  </Link>
                                )}
                              </ul>
                            </td>

                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              {purchase.date}
                            </td>
                          </div>
                        );
                      })}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  <button
                    className="px-4 py-1 text-sm text-blue-600 font-bold rounded-full border border-blue-600 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    onClick={() => setBuyProductToggle(!buyProductToggle)}
                  >
                    Buy a Product
                  </button>

                  {buyProductToggle ? (
                    <AddProductsToCustomer customer={customer} />
                  ) : null}
                </td>
                <br /> <br />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Customers;

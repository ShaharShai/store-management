import { Link, useParams } from "react-router-dom";
import { getElementById } from "../utils";
import { useEffect, useState } from "react";
import EditItem from "../components/EditItem";
import { useSelector } from "react-redux";

function EditCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [customerPurchases, setCustomerPurchases] = useState([]);
  const purchases = useSelector((state) => state.purchases);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const handler = async () => {
      const currentCustomer = await getElementById("customers", id);
      setCustomer({ ...currentCustomer.data(), id: currentCustomer.id });

      // setCustomerPurchases(purchases.filter(p => p.customerId == currentCustomer.id))
      const customerPurchasesCopy = customerPurchases;
      purchases.forEach((purchase) => {
        products.forEach((product) => {
          if (purchase.customerId == currentCustomer.id) {
            if (product.id == purchase.productId) {
              customerPurchasesCopy.push({
                product: product,
                date: purchase.date,
              });
            }
          }
        });
      });
      setCustomerPurchases(customerPurchasesCopy);
    };

    handler();
  }, [id]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Customer: {customer.firstname}</h1>

        <EditItem item={customer} collection={"customers"} />
      </div>
      <br />
      <h3 className="text-center text-3xl">Purchased Products:</h3> <br />
      <div className="parent-container">
        <div className="scrollDiv2 flex justify-center">
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-5">
            {customerPurchases.map((product) => (
              <Link key={product.id} to={`/edit-product/${product.product.id}`}>
                <li className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                  {product.product.name} - <br /> {product.date}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

    </>
  );
}

export default EditCustomer;

import { useState } from "react";
import AddProductsToCustomer from "./AddProductsToCustomer";
import { Link } from "react-router-dom";

function CustomerDetails({ customer, custPurchase }) {
  const [addBtnClicked, setAddBtnClicked] = useState(false);

  return (
    <>
      <div className="bg-blue-200 bg-opacity-100 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="border-b bg-neutral-800 font-medium text-black dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span>Name</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Date</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Add a Product</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <Link to={`/edit-customer/${customer.id}`}>
                <h3>{customer.firstname}</h3>
                </Link>
                
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <h3>{custPurchase.date}</h3>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              <button
        onClick={() => setAddBtnClicked(!addBtnClicked)}
        className="px-4 py-1 text-sm text-blue-600 font-bold rounded-full border border-blue-600 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Add
      </button>
      <br />
      {addBtnClicked ? <AddProductsToCustomer customer={customer} /> : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <li></li>
      {/* <button
        onClick={() => setAddBtnClicked(!addBtnClicked)}
        className="px-4 py-1 text-sm text-blue-600 font-bold rounded-full border border-blue-600 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Add
      </button>
      <br />
      {addBtnClicked ? <AddProductsToCustomer customer={customer} /> : null} */}
    </>
  );
}

export default CustomerDetails;

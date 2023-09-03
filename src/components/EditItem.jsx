import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function EditItem({item, collection}) {

    const [editedItem, setEditedItem] = useState(item);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const editHandler = (e) => {
        const { name, value } = e.target;
        setEditedItem((prevEditedProduct) => ({
          ...prevEditedProduct,
          [name]: value,
        }));
      };

  return (
    <>
    <h1 className="text-3xl">Edit: </h1>
        <input
          type="text"
          name={item.firstname ? "firstname" : "name"}
          onInput={(e) => editHandler(e)}
          value={item.firstname ? editedItem.firstname : editedItem.name}
          className="rounded-full border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        <br />
        <input
          type={item.lastname ? "text" : "number"}
          name={item.lastname ? "lastname" : "price"}
          value={item.lastname ? editedItem.lastname : editedItem.price}
          onInput={(e) => editHandler(e)}
          className="rounded-full border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        <br />
        <input
          type={item.city ? "text" : "nubmer"}
          name={item.city ? "city" : "quantity"}
          value={item.city ? editedItem.city : editedItem.quantity}
          onInput={(e) => editHandler(e)}
          className="rounded-full border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        <br />
        <button
          onClick={() => {
            dispatch({
              type: "UPDATE_PRODUCT",
              payload: { updatedProduct: editedItem, id: editedItem.id, collection: collection },
            });
          }}
          className="px-4 mt-1 py-1 text-sm text-white bg-blue-400 font-bold rounded-full border border-blue-600 hover:text-blue-600 hover:bg-white hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
        >
          Submit
        </button> <br />


        <button
          onClick={() => {
            dispatch({ type: "DELETE_PRODUCT", payload: { id: editedItem.id, collection: collection } });
            navigate('/')
          }}
          className="px-4 mt-1 py-1 text-sm text-white bg-red-400 font-bold rounded-full border border-red-600 hover:text-red-600 hover:bg-white hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
        >
          Delete Item
        </button>

    </>
  )
}

export default EditItem
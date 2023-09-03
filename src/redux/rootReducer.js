import { updateCollection, updateItem } from "../utils";

const initialState = {
  products: [],
  customers: [],
  purchases: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        products: action.payload.products,
        customers: action.payload.customers,
        purchases: action.payload.purchases,
      };

    case "SAVE": {
      const { productId, customerId } = action.payload;
      const updatedProducts = state.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      return {
        ...state,
        purchases: [...state.purchases, action.payload],
        products: updatedProducts,
        // products: [...state.products, products[action.payload.productId].amount: products[action.payload.productId].amount - 1]
      };
    }

    case "UPDATE_PRODUCT": {
      const { updatedProduct, id, collection } = action.payload;

      const updatedCollection = state[collection].map((product) => {
        if (product.id === id) {
          return updatedProduct;
        }
        return product;
      });

      console.log("Updating", collection, "with ID", id);
      console.log("Updated data:", updatedProduct);

      updateItem(collection, id, updatedProduct);

      return {
        ...state,
        [collection]: updatedCollection,
      };
    }

    case "DELETE_PRODUCT": {
      const { id, collection } = action.payload;
      if (collection == "products") {
        const updatedProducts = state.products.filter(
          (product) => product.id !== id
        );
        const updatedPurchases = state.purchases.filter(
          (purchase) => purchase.productId !== id
        );

        updateCollection("products", id);

        state.purchases.forEach((p) => {
          if (p.productId == id) {
            updateCollection("purchases", p.id);
          }
        });

        return {
          ...state,
          products: updatedProducts,
          purchases: updatedPurchases,
        };
      } else {
        const updatedCustomers = state.customers.filter(
          (customer) => customer.id !== id
        );
        const updatedPurchases = state.purchases.filter(
          (purchase) => purchase.customerId !== id
        );

        updateCollection("customers", id);

        state.purchases.forEach((p) => {
          if (p.customerId == id) {
            updateCollection("purchases", p.id);
          }
        });

        return {
          ...state,
          customers: updatedCustomers,
          purchases: updatedPurchases,
        };
      }
    }

    default:
      return state;
  }
};

export default reducer;

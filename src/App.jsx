import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection,getDocs } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import Customers from './pages/Customers'
import Purchases from './pages/Purchases'
import Home from './pages/Home'
import EditProduct from './pages/EditProduct'
import EditCustomer from './pages/EditCustomer'

function App() {

  const dispatch = useDispatch();
  // const [products, setProducts] = useState([])
  const productCollectionRef = collection(db, 'products')
  const customersCollectionRef = collection(db, 'customers')
  const purchasesCollectionRef = collection(db, 'purchases')

  useEffect(() => {
   const getProducts = async () => {
    const productsData = await getDocs(productCollectionRef)
    const customersData = await getDocs(customersCollectionRef)
    const purchasesData = await getDocs(purchasesCollectionRef)
    // setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    dispatch({type: "LOAD", payload: {
    products: productsData.docs.map((doc) => ({...doc.data(), id: doc.id})),
    customers: customersData.docs.map((doc) => ({...doc.data(), id: doc.id})),
    purchases: purchasesData.docs.map((doc) => ({...doc.data(), id: doc.id}))  
   }
  })
   }
   
   getProducts()
  }, [])

  return (
    <>   
    <Navbar/> 

    <div>
      {/* {products.map(p => {
        return (
          <>
          Name: {p.name} <br />
          </>
        )
      })} */}
    </div>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/products' element={<Products/>}></Route>
      <Route path='/customers' element={<Customers/>}></Route>
      <Route path='/purchases' element={<Purchases/>}></Route>
      <Route path='/edit-product/:id' element={<EditProduct/>}></Route>
      <Route path='/edit-customer/:id' element={<EditCustomer/>}></Route>
     </Routes>
    </>
  )
}

export default App

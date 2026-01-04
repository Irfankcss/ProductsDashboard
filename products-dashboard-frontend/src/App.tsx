// import { useEffect, useState } from 'react'
import './App.css'
// import type { Product } from './models/Product'
// import { getProducts } from './api/products';
import ProductsPage from './pages/ProductsPage';

function App() {
  //const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {//
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await getProducts();
  //       setProducts(response);
  //     } catch (e) {
  //       console.log(e)
  //     }
  // try {
  //   const response = await fetch(apiUrl + "Products");
  //   const data: Product[//] = await response.json();
  //   console.log("DATA:", data);
  //   setProducts(data);
  // } catch (e) {
  //   console.log(e)
  // } finally {
  //
  //   }
  //   fetchProducts();
  // }, [])
  return (
    <ProductsPage />

    /* <div>
      <label className='text-4xl font-semibold '>Products Dashboard</label>
      <div className="card grid grid-cols-3 gap-4">
        {products.map((p) => <div key={p.id}><h2>{p.name}</h2>
          <img className='h-48 w-96 object-contain hover:h-56 w-100 transition-all' src={p.imageUrl} />
          <p>{p.description}</p>
          <p className='text-60 font-bold '>{p.price.toFixed(2)} KM/kg</p>
        </div>)
        }
      </div>
     </div> */
  )
}

export default App



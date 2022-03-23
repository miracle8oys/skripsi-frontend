import { useState } from "react";

function Main() {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [exp, setExp] = useState(0);
  const [profit, setProfit] = useState(0);
  const [products, setProducts] = useState([]);

  const [minSupport, setMinSupport] = useState(0);

  const [transactions, setTransactions] = useState(null);

  const [bestProducts, setBestProducts] = useState([]);
  const [result, setResult] = useState([]);

  const handleAddProduct = () => {
    const rawDate = new Date(exp);
    const expDate = rawDate.getTime();
    const now = Date.now();
    const expLeft = expDate - now;

    setProducts(current => [...current, {
      id,
      name,
      stock,
      exp: expLeft,
      rawDate,
      profit,
    }]);
  }

  const handleDeleteProducts = (productId) => {
    setProducts(current => current.filter(item => item.id !== productId));
  }


  const handleSubmit = () => {
    const data = new FormData();
    data.append('file', transactions[0]);
    data.append("dataProducts", JSON.stringify(products));
    data.append("minSupport", JSON.stringify(minSupport));
    fetch(`http://localhost:8000/api/main`, {
      method: 'POST',
      body: data

    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setBestProducts(result.data.bestProduct);
      setResult(result.data.result)
    }).catch(err => {
      console.error(err);
    })
  }

  return (
    <div className="App grid justify-center">
      <div className="w-[50vw]">
          <div>
            <label className="block text-xl font-medium text-gray-700">Product</label>
            <div className="grid justify-center">
              <label className="block text-sm font-medium text-gray-700">ID Product</label>
              <input onChange={(e) => setId(e.target.value)} className="border-2 px-1 rounded-sm" type="text" />
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input onChange={(e) => setName(e.target.value)} className="border-2 px-1 rounded-sm" type="text" />
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input onChange={(e) => setStock(e.target.value)} className="border-2 px-1 rounded-sm" type="number" />
              <label className="block text-sm font-medium text-gray-700">Expired</label>
              <input onChange={(e) => setExp(e.target.value)} className="border-2 px-1 rounded-sm" type="date" />
              <label className="block text-sm font-medium text-gray-700">Profit</label>
              <input onChange={(e) => setProfit(e.target.value)}className="border-2 px-1 rounded-sm" type="number" />
              <button onClick={handleAddProduct} type="submit" className="px-2 py-2 bg-secondary rounded-md my-3">Add</button>
            </div>
          </div>

          <div>
            <label className="block text-xl font-medium text-gray-700">Utiliy</label>
            <div className="grid justify-center">
              <label className="block text-sm font-medium text-gray-700">Min Support (%)</label>
              <input onChange={(e) => setMinSupport(e.target.value)} className="border-2 px-1 rounded-sm" type="text" />
            </div>
          </div>

          <div className="w-full">
                    <div className="flex flex-col">
                            <div className="sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                                        <table className="min-w-full">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        ID
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Product Name
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Stock
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Expiration Date
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Profit
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map(item => (
                                                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                            {item.id}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {item.name}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {item.stock}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {item.rawDate?.toLocaleDateString("id-ID")}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {item.profit}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            <div className="flex gap-3">
                                                                <button onClick={() => handleDeleteProducts(item.id)} className="text-button py-1 px-2 bg-buy rounded font-semibold">Delete</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

          <div>
              <label className="block text-xl font-medium text-gray-700">Transaction</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="text-primary">Upload a file</span>
                      <input onChange={(e) => setTransactions(e.target.files)} id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV up to 10MB</p>
                </div>
              </div>
            </div>
            <div className="text-center my-3">
              <button onClick={handleSubmit} className="py-1 px-2 bg-secondary rounded-md">Submit</button>
            </div>
      </div>

      <div className="w-full">
        <label className="block text-xl font-medium text-gray-700">Best Product</label>
                    <div className="flex flex-col">
                            <div className="sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                                        <table className="min-w-full">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        ID
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Product Name
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Value
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bestProducts.map(item => (
                                                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                            {item.id}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {item.name}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {Math.round(item.total * 100)}/100
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                  <div className="w-full pb-32">
                       <label className="block text-xl font-medium text-gray-700">Result</label>
                    <div className="flex flex-col">
                            <div className="sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                                        <table className="min-w-full">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        No
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Itemset
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Product
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Support 
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Confidence
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result.map((item, i) => (
                                                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                            {i + 1}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                            {item?.itemset.join(', ')}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {item.product}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {parseFloat(item.support).toFixed(2)}%
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {parseFloat(item.confidence).toFixed(2)}%
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    </div>
  );
}

export default Main;

import { useState } from "react";
import {BsFileEarmarkBarGraph} from "react-icons/bs"

function Main() {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [exp, setExp] = useState(0);
  const [profit, setProfit] = useState(0);
  const [products, setProducts] = useState([]);

  const [minSupport, setMinSupport] = useState(0);
  const [productAmount, setProductAmount] = useState(0);

  const [transactions, setTransactions] = useState(null);

  const [bestProducts, setBestProducts] = useState([]);
  const [result, setResult] = useState([]);
  const [itemset, setItemset] = useState([]);

  const [stockPercentage, setStockPercentage] = useState(0);
  const [expPercentage, setExpPercentage] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);

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
    data.append("productAmount", JSON.stringify(productAmount));
    data.append("stockPercentage", JSON.stringify(stockPercentage));
    data.append("expPercentage", JSON.stringify(expPercentage));
    data.append("profitPercentage", JSON.stringify(profitPercentage));
    // https://fpgrowth-saw.herokuapp.com/api/main
    fetch(`https://fpgrowth-saw.herokuapp.com/api/main`, {
      method: 'POST',
      body: data

    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setBestProducts(result.data.bestProduct);
      setResult(result.data.result);
      setItemset(result.data.itemset)
    }).catch(err => {
      console.error(err);
    })
  }

  return (
    <div className="App grid justify-center bg-mainbg bg-opacity-25 min-h-[100vh]">
      <div className="w-[50vw]">
        <div className="text-center">
            <h1 className="text-2xl font-semibold py-10">Bundling Recomendation</h1>
        </div>
          <div>
            <label className="block text-xl font-medium text-gray-700">Product</label>
            <div className="flex justify-center gap-10">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ID Product</label>
                    <input onChange={(e) => setId(e.target.value)} className="border-2 px-1 rounded-sm" type="text" />
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input onChange={(e) => setName(e.target.value)} className="border-2 px-1 rounded-sm" type="text" />
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input onChange={(e) => setStock(e.target.value)} className="border-2 px-1 rounded-sm" type="number" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Expired</label>
                    <input onChange={(e) => setExp(e.target.value)} className="border-2 px-1 rounded-sm" type="date" />
                    <label className="block text-sm font-medium text-gray-700">Profit</label>
                    <input onChange={(e) => setProfit(e.target.value)}className="border-2 px-1 rounded-sm" type="number" />
                </div>
            </div>
            <div className="text-center">
                <button onClick={handleAddProduct} type="submit" className="px-2 py-2 bg-secondary rounded-md my-3 font-semibold">Add</button>
            </div>
          </div>

          <div>
            <label className="block text-xl font-medium text-gray-700">Utiliy</label>
            <div className="grid justify-center">
              <label className="block text-sm font-medium text-gray-700">Min Support (%)</label>
              <input onChange={(e) => setMinSupport(e.target.value)} className="border-2 px-1 rounded-sm" type="text" />
              <label className="block text-sm font-medium text-gray-700">Product Amount (%)</label>
              <input onChange={(e) => setProductAmount(e.target.value)} className="border-2 px-1 rounded-sm" type="text" />
            </div>

            <div className="flex justify-center">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock Percentage (%)</label>
                    <input onChange={(e) => setStockPercentage(e.target.value)} className="border-2 px-1 rounded-sm" type="number" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Profit Percentage (%)</label>
                    <input onChange={(e) => setProfitPercentage(e.target.value)} className="border-2 px-1 rounded-sm" type="number" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Expired Percentage (%)</label>
                    <input onChange={(e) => setExpPercentage(e.target.value)} className="border-2 px-1 rounded-sm" type="number" />
                </div>
            </div>
          </div>

          <div className="w-full">
                    <div className="flex flex-col">
                            <div className="sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                                        <table className="min-w-full">
                                            <thead className="bg-utility text-white">
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
                  <BsFileEarmarkBarGraph className="w-52 h-16" />
                  <div className="flex justify-center text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="text-primary">Upload a file</span>
                      <input onChange={(e) => setTransactions(e.target.files)} id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">CSV up to 10MB</p>
                </div>
              </div>
            </div>
            <div className="text-center my-3">
              <button onClick={handleSubmit} className="py-1 px-2 text-xl font-semibold bg-secondary rounded-md">Submit</button>
            </div>
      </div>

      <div className="w-full">
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


      <div className="w-full">
        <label className="block text-xl font-medium text-gray-700">Best Product</label>
                    <div className="flex flex-col">
                            <div className="sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                                        <table className="min-w-full">
                                            <thead className="bg-tertiary text-white">
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
                       <label className="block text-xl font-medium text-gray-700">Itemset</label>
                    <div className="flex flex-col">
                            <div className="sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                                        <table className="min-w-full">
                                            <thead className="bg-secondary text-white">
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
                                                {itemset.map((item, i) => (
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

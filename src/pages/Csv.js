import { useState } from "react";
import {BsFileEarmarkBarGraph, BsFileEarmarkCheck, BsInfoCircle} from "react-icons/bs"
import {AiOutlineCloseCircle} from "react-icons/ai"

function Csv() {

  const [minSupport, setMinSupport] = useState(0);
  const [productAmount, setProductAmount] = useState(0);

  const [files, setFiles] = useState([]);

  const [bestProducts, setBestProducts] = useState([]);
  const [result, setResult] = useState([]);
  const [itemset, setItemset] = useState([]);

  const [stockPercentage, setStockPercentage] = useState(0);
  const [expPercentage, setExpPercentage] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);

  const [showProductForm, setShowProductForm] = useState(true);
  const [showUtilityForm, setShowUtilityForm] = useState(false);
  const [showProductAtributeForm, setShowProductAtributeForm] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [itemsetDesc, setItemsetDesc] = useState(false);
  const [supportDesc, setSupportDesc] = useState(false);
  const [confidenceDesc, setconfidenceDesc] = useState(false);

  const [mainDesc, setMainDesc] = useState('');

  



  const handleChangeInput = (e) => {
      setFiles(current => [...current, ...e.target.files])
      //setFiles(current => current[i] = {...e.target.files})
  }


  const handleSubmit = () => {
    console.log(files);
    const data = new FormData();
    data.append('product', files[0]);
    data.append('transaction', files[1]);
    data.append("minSupport", JSON.stringify(minSupport));
    data.append("productAmount", JSON.stringify(productAmount));
    data.append("stockPercentage", JSON.stringify(stockPercentage));
    data.append("expPercentage", JSON.stringify(expPercentage));
    data.append("profitPercentage", JSON.stringify(profitPercentage));
    fetch(`http://localhost:8000/api/csv`, {
      method: 'POST',
      body: data

    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setBestProducts(result.data.bestProduct);
      setResult(result.data.result)
      setItemset(result.data.itemset)
    }).catch(err => {
      console.error(err);
    })
  }

  const saveRecomendation = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    fetch('http://localhost:8000/save', {
        headers: {
            'Content-Type': 'Application/Json',
        },
        method: 'Post',
        body: JSON.stringify({
            user_id,
            result,
            best_products: bestProducts,
            itemset
        })
    }
    ).then((res) => {
        return res.json();
    }).then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
  };

  const resultExplanation = (itemset, product, support, confidence) => {
      const probability = itemset.filter(i => i !== product);
      console.log(`Kombinasi item ${itemset.join(' & ')} memiliki persentase terjual sebesar ${parseFloat(support).toFixed(2)}%, jika pengunjung membeli ${probability} maka ${parseFloat(confidence).toFixed(2)}% kemungkinan juga akan membeli ${product}`);
      setMainDesc(`Kombinasi item ${itemset.join(' & ')} memiliki persentase terjual sebesar ${parseFloat(support).toFixed(2)}%, jika pengunjung membeli ${probability} maka ${parseFloat(confidence).toFixed(2)}% kemungkinan juga akan membeli ${product}`)
  }

  return (
    <div className="App grid justify-center bg-mainbg bg-opacity-25 min-h-[100vh] pb-72">
      <div className="w-[50vw]">

        <div className="text-center h-min">
          <h1 className="text-2xl font-semibold py-10">Bundling Recomendation</h1>
          {itemsetDesc &&
           <p className="bg-tertiary font-semibold py-2 rounded flex justify-between items-center px-5">Itemset merupakan rekomendasi gabungan kombinasi item yg sesuai dengan hasil transaksi dan kriteria yg diberikan <AiOutlineCloseCircle className="text-2xl text-background" onClick={() => setItemsetDesc('')} /></p>
          }
          {supportDesc &&
           <p className="bg-tertiary font-semibold py-2 rounded flex justify-between items-center px-5">Support merupakan nilai perbandingan antara penjualan hasil rekomendasi kombinasi item dengan keseluruhan transaksi yang terjadi <AiOutlineCloseCircle className="text-2xl text-background" onClick={() => setSupportDesc('')} /></p>
          }
          {confidenceDesc &&
           <p className="bg-tertiary font-semibold py-2 rounded flex justify-between items-center px-5">Confidence merupakan persentase perbandingan antara jumlah transaksi kombinasi itemset dengan salah satu itemnya sendiri <AiOutlineCloseCircle className="text-2xl text-background" onClick={() => setconfidenceDesc('')} /></p>
          }

          {
              mainDesc &&
              <div className="flex gap-3 items-center bg-tertiary px-2 py-1 rounded font-semibold">
                  <h1>{mainDesc}</h1>
                  <AiOutlineCloseCircle className="text-3xl text-background" onClick={() => setMainDesc('')} />
              </div>
          }
        </div>
          
        {
            showProductForm && 
            <>
                <div>
                <label className="block text-xl font-medium text-gray-700">Produk</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <div className="flex justify-center">
                            <BsFileEarmarkCheck className="w-52 h-16" />
                        </div>
                    <div className="flex justify-center text-sm text-gray-600">
                        <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                        <span className="text-primary">Upload a file</span>
                        <input onChange={(e) => handleChangeInput(e)} id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                    </div>
                    <p className="text-xs text-gray-500">CSV up to 10MB</p>
                    <p className="text-xs text-buy">File yang diinput merupakan atribut produk yang terdiri dari id, nama, stok, profit dan batas expired dari produk yg ditransaksikan</p>
                    </div>
                </div>
                
                </div>

                <div>
              <label className="block text-xl font-medium text-gray-700">Transaction</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <div className="flex justify-center">
                    <BsFileEarmarkBarGraph className="w-52 h-16" />
                    </div>
                  <div className="flex justify-center text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="text-primary">Upload a file</span>
                      <input onChange={(e) => handleChangeInput(e)} id="file-upload2" name="file-upload2" type="file" className="sr-only" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">CSV up to 10MB</p>
                  <p className="text-xs text-buy">File transaksi dapat berupa nama atau id dari produk yg terjual</p>
                </div>
              </div>
            </div>
            <div className="text-center my-3">
                    <button onClick={() => {setShowProductForm(false); setShowUtilityForm(true)}} className="py-1 px-2 bg-secondary rounded-md">Next</button>
            </div>
            </>
        }


        
            {
                showUtilityForm &&
                <>
                    <label className="block text-xl font-medium text-gray-700">Utiliy Form</label>
                    <div className="grid justify-center">
                        <label className="block text-sm font-medium text-gray-700 text-center">Min Support (%)</label>
                        <p className="text-xs text-buy w-72 py-2">Minimum support merupakan batas minimum penjualan produk untuk dapat masuk kedalam rekomendasi</p>
                        <div className="flex justify-center">
                            <input onChange={(e) => setMinSupport(e.target.value)} className="border-2 px-1 rounded w-40 h-10" type="text" />
                        </div>
                        <label className="block text-sm font-medium text-gray-700 text-center">Produk terbaik</label>
                        <p className="text-xs text-buy w-72 py-2">Field Produk terbaik digunakan untuk menentukan jumlah produk yg akan masuk ke sistem rekomendasi</p>
                        <div className="flex justify-center">
                            <input onChange={(e) => setProductAmount(e.target.value)} className="border-2 px-1 rounded w-40 h-10" type="text" />
                        </div>
                    </div>
                    <div className="text-center my-3">
                        <button onClick={() => {setShowUtilityForm(false); setShowProductAtributeForm(true)}} className="py-1 px-2 bg-secondary rounded-md">Next</button>
                    </div>
                </>
            }

            {
                showProductAtributeForm &&

                <>
                <label className="block text-xl font-medium text-gray-700">Product Attribute Form</label>
                <div className="flex justify-center">
                    <p className="text-xs text-buy w-72 text-center">Form ini berfungsi sebagai penentuan prioritas masing - masing atribut produk dalam sistem rekomendasi</p>
                </div>
                <div className="flex justify-center">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock (%)</label>
                        <input onChange={(e) => setStockPercentage(e.target.value)} className="border-2 px-1 rounded w-40 h-10" type="number" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profit (%)</label>
                        <input onChange={(e) => setProfitPercentage(e.target.value)} className="border-2 px-1 rounded w-40 h-10" type="number" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expired (%)</label>
                        <input value={100 - stockPercentage - profitPercentage} onChange={(e) => setExpPercentage(e.target.value)} className="border-2 px-1 rounded w-40 h-10" type="number" />
                    </div>
                </div>

                    <div className="text-center my-3">
                        <button onClick={() => {handleSubmit(); setShowProductAtributeForm(false); setShowResult(true)}} className="py-1 px-2 bg-secondary rounded-md">Submit</button>
                    </div>
                </>
            }

          

      </div>


      


      {
          showResult &&
          <>
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
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 flex items-center gap-1">
                                                        Itemset <BsInfoCircle onClick={() => {setItemsetDesc(true); setSupportDesc(false); setconfidenceDesc(false)}} />
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Product
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 flex items-center gap-1">
                                                        Support <BsInfoCircle onClick={() => {setItemsetDesc(false); setSupportDesc(true); setconfidenceDesc(false)}} />
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                            Confidence <BsInfoCircle onClick={() => {setItemsetDesc(false); setSupportDesc(false); setconfidenceDesc(true)}} />
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                            Action
                                                        </div>
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
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            <BsInfoCircle className="font-semibold text-xl" onClick={() => resultExplanation(item.itemset, item.product, item.support, item.confidence)} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-3">
                            <button onClick={saveRecomendation} className="py-1 px-2 bg-secondary rounded-md font-semibold mx-7">Simpan</button>
                            <button onClick={() => window.location.reload()} className="py-1 px-2 bg-secondary rounded-md font-semibold">Reset</button>
                        </div>
                    </div>
                    
          </>
      }

                  
    </div>
  );
}

export default Csv;

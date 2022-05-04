import { useEffect, useState } from "react";

const History = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        const user_id = localStorage.getItem("user_id");

        fetch(`http://localhost:8000/history/${user_id}`, {
            headers: {
                'Content-Type': 'Application/Json',
            },
            method: 'Get'
        }).then((res) => {
            return res.json();
        }).then(response => {
            setData(response.data);
        })
        .catch(err => {
            console.log(err);
        })

    }, []);

    return ( 
        <div className="grid justify-center bg-mainbg bg-opacity-25 min-h-[100vh]">
            <div className="w-[50vw]">
            <h1 className="text-center font-semibold text-2xl pt-3">History</h1>
            {data.map(item => (
                <div className="py-10" key={item._id}>
                    <hr />
                    <div className="w-full">
                       <label className="block text-xl font-medium text-gray-700">Result {new Date(item.date).toLocaleString('id-ID')}</label>
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
                                                        Itemset
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Product
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 flex items-center gap-1">
                                                        Support
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                            Confidence
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item?.result.map((item, i) => (
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
            ))}
            </div>
        </div>
     );
}
 
export default History;
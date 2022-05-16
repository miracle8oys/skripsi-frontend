import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [company_name, setCompany_name] = useState('');
  const [company_email, setCompany_email] = useState('');
  const [company_address, setCompany_address] = useState('');
  const [province_id, setProvince_id] = useState('6279cc78879126fa1377ff51');
  const [city_id, setCity_id] = useState('6279cd58623aa6989953383b');


  const [province, setProvince] = useState([]);
  const [cities, setCities] = useState([]);

  const [showPreviusForm, setShowPreviusForm] = useState(true);
  const [showNextForm, setShowNextForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://localhost:8000/cities', {
      headers: {
        'Content-Type': 'Application/Json'
      },
      method: 'Get'
    })
    .then(res => res.json())
    .then(result => {
      setCities(result.data)
    })
    .catch(err => {
      console.log(err);
    })

    fetch('http://localhost:8000/province', {
      headers: {
        'Content-Type': 'Application/Json'
      },
      method: 'Get'
    })
    .then(res => res.json())
    .then(result => {
      setProvince(result.data)
    })
    .catch(err => {
      console.log(err);
    })

  }, [])

  const handleRegister = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/register', {
        headers: {
            'Content-Type': 'Application/Json',
        },
        method: 'Post',
        body: JSON.stringify({
            username,
            password,
            company_name,
            company_email,
            company_address,
            province_id,
            city_id
        })
    }
    ).then((res) => {
        return res.json();
    }).then(() => {
        navigate("/")
    })
    .catch(err => {
        console.log(err);
    })
  };

  return (
    <div className="bg-mainbg bg-opacity-25 w-full min-h-screen flex justify-center items-center">
      <div className="bg-primary p-3 rounded-xl w-[20vw]">
        <div className="w-full flex justify-between items-center gap-5 py-3 px-10">
          <img src={'https://img2.pngdownload.id/20180420/zpw/kisspng-laptop-product-bundling-computer-service-bundles-5ada37ad48b7f8.9869221215242505412979.jpg'} className="h-[60px]" alt="iposlogo" />
          <div>
            <h1 className="font-semibold text-2xl">Bunding</h1>
            <h1 className="font-semibold text-2xl">Recomendations</h1>
          </div>
        </div>
        <div className="bg-buy bg-opacity-25 p-4 rounded-lg">
          <h1 className="text-xl text-center font-medium py-3">Register</h1>
          <form onSubmit={handleRegister}>
            <div>
              {
                showPreviusForm && 
                <>
                  <div>
                  <label className="block text-md font-medium">Username</label>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md border-gray focus:outline-none focus:ring-1 focus:ring-button"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-md font-medium">Password</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md border-gray focus:outline-none focus:ring-1 focus:ring-button"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-md font-medium">Confirmasi Password</label>
                  <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md border-gray focus:outline-none focus:ring-1 focus:ring-button"
                  />
                </div>
                <h1 onClick={() => { setShowNextForm(true); setShowPreviusForm(false) }} className="px-6 py-2 mt-4 bg-secondary rounded-lg text-white w-32 text-center">
                    Next
                </h1>
                </>
              }
              {
                showNextForm &&
                  <>
                    <div className="mt-4">
                <label className="block text-md font-medium">Nama Perusahaan</label>
                <input
                  type="text"
                  onChange={(e) => setCompany_name(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md border-gray focus:outline-none focus:ring-1 focus:ring-button"
                />
              </div>
              <div className="mt-4">
                <label className="block text-md font-medium">Email</label>
                <input
                  type="text"
                  onChange={(e) => setCompany_email(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md border-gray focus:outline-none focus:ring-1 focus:ring-button"
                />
              </div>
              {/* <div className="mt-4">
                <label className="block text-md font-medium">Provinsi</label>
                <input
                  type="password"
                  onChange={(e) => setProvince_id(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md border-gray focus:outline-none focus:ring-1 focus:ring-button"
                />
              </div> */}
              <label className="block text-md font-medium">Provinsi</label>
              <select
                  onChange={(e) => setProvince_id(e.target.value)}
                  value={province_id}
                  className="border border-gray focus:border-primary focus:outline-none w-full rounded py-2 px-3"
                >
                  {province.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.province_name}
                    </option>
                  ))}
                </select>

                <label className="block text-md font-medium">Kabupaten/Kota</label>
                <select
                  onChange={(e) => setCity_id(e.target.value)}
                  value={city_id}
                  className="border border-gray focus:border-primary focus:outline-none w-full rounded py-2 px-3"
                >
                  {cities.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.city_name}
                    </option>
                  ))}
                </select>
              {/* <div className="mt-4">
                <label className="block text-md font-medium">Kota/Kabupaten</label>
                <input
                  type="password"
                  onChange={(e) => setCity_id(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md border-gray focus:outline-none focus:ring-1 focus:ring-button"
                />
              </div> */}
              <div className="mt-4">
                <label className="block text-md font-medium">Alamat</label>
                <input
                  type="text"
                  onChange={(e) => setCompany_address(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md border-gray focus:outline-none focus:ring-1 focus:ring-button"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button type="submit" className="px-6 py-2 mt-4 bg-secondary rounded-lg text-white">
                  Register
                </button>
              </div>
                  </>
              }
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

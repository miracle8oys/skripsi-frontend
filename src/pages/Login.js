import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/login', {
        headers: {
            'Content-Type': 'Application/Json',
        },
        method: 'Post',
        body: JSON.stringify({
            username,
            password
        })
    }
    ).then((res) => {
        return res.json();
    }).then(result => {
        localStorage.setItem("username", `${result.data.username}`);
        localStorage.setItem("company_id", `${result.data.company_id}`);
        localStorage.setItem("user_id", `${result.data._id}`);
        navigate("/home")
    })
    .catch(err => {
        console.log(err);
    })
  };

  return (
    <div className="bg-mainbg bg-opacity-25 w-full min-h-screen flex justify-center items-center">
      <div className="bg-primary p-3 rounded-xl w-[20vw]">
        <div className="w-full flex justify-between items-center py-3 px-10">
          <img src={'https://img2.pngdownload.id/20180420/zpw/kisspng-laptop-product-bundling-computer-service-bundles-5ada37ad48b7f8.9869221215242505412979.jpg'} className="h-[60px]" alt="iposlogo" />
          <div>
            <h1 className="font-semibold text-2xl">Bunding</h1>
            <h1 className="font-semibold text-2xl">Recomendations</h1>
          </div>
        </div>
        <div className="bg-buy bg-opacity-25 p-4 rounded-lg">
          <h1 className="text-xl text-center font-medium py-3">Login</h1>
          <form onSubmit={handleRegister}>
            <div>
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
              <div className="flex items-baseline justify-between">
                <button className="px-6 py-2 mt-4 bg-secondary rounded-lg text-white">
                  Login
                </button>
                <Link to={'/register'}>Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

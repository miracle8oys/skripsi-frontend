import { Link } from "react-router-dom";
import {BiLinkExternal} from "react-icons/bi"
const Home = () => {
    return ( 
        <div className="flex flex-wrap flex-grow bg-mainbg bg-opacity-25 rounded-b-lg h-[100vh] py-32">
            <div className="mx-auto">
                <div className="py-5 md:py-8 flex justify-center gap-8">
                    <div className=" mx-6 my-auto  md:text-left">
                        <p className="md:text-5xl text-xl 2xl:text-6xl font-semibold tracking-wide mb-2">Bundling Recomendations</p>
                        <p className="text-gray-500 2xl:text-lg mt-4 md:w-[30vw]">Produk bundle adalah suatu strategi pemasaran  dimana produk dikelompokkan bersama menjadi dua atau lebih dalam satu kemasan penjualan dengan satu harga. Dengan strategi ini, harga akan menjadi lebih ekonomis/murah dari total harga kemasan persatuannya.</p>
                        <div className="md:mt-14 mt-8 flex justify-center md:justify-start gap-3">
                            <Link to={'/manual'} className="rounded-full bg-buy bg-opacity-25 py-3 px-5 text-sm 2xl:text-lg text-white shadow-lg hover:bg-orange-300 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200 w-max md:text-base flex" type="submit" name="submit">Manual Input <BiLinkExternal className="mx-2 mt-1 2xl:mt-2"/></Link>
                            <Link to={'/csv'} className="rounded-full bg-buy bg-opacity-25 py-3 px-5 text-sm 2xl:text-lg text-white shadow-lg hover:bg-orange-300 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200 w-max md:text-base flex" type="submit" name="submit">CSV input <BiLinkExternal className="mx-2 mt-1 2xl:mt-2"/></Link>
                        </div>
                        
                    </div>
                    {/* <img src={HomePet} alt="Pet" className="hidden rounded-full -mt-2 md:block w-full object-cover"/>  */}
                    <div className="mx-auto my-auto">
                        <img src={'https://assets.aboutamazon.com/dims4/default/55a83e9/2147483647/strip/true/crop/4928x2774+0+253/resize/1320x743!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F20%2F47%2F130b3bfc4ff4ac0f6eb9fae14bb9%2Famazon-product-1416.jpg'} alt="Pet" className="hidden rounded-2xl bg-orange-500 bg-opacity-75 h-96 md:block w-full object-cover"/> 
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Home;
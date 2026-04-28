import { FaSearch } from "react-icons/fa";
import Button from "./Button";
import Loader from "./Loader";

export default function SearchBar({ onclick, cityName, onkeydown, onchange, loading }) {
  return (
    <div className="flex items-center justify-center relative pb-5">
      <div className="flex-10 relative">
        <input
          type="text"
          placeholder="Search City"
          value={cityName}
          onChange={onchange}
          onKeyDown={onkeydown}
          id="city"
          className="text-base text-white capitalize bg-gray-800 border-2 border-gray-500 focus:outline-indigo-500 rounded-3xl pl-10 py-2 w-full block placeholder:text-white"
        />
        <FaSearch className="absolute top-3.5 left-4 text-white text-lg" />
      </div>
      <Button
        className={`flex items-center w-20 justify-center text-white text-lg absolute -top-0.3 -right-1 border-2 border-indigo-400 bg-indigo-500 py-2.5 rounded-3xl cursor-pointer dis`}
        loading={loading}
        onclick={onclick}
        onkeydown={onkeydown}
        
      >
        {loading ? <Loader className={'w-4 h-4'}/> : <FaSearch /> }
          
      </Button>
    </div>
  );
}

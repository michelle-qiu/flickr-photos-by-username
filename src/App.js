import React, {useEffect, useState} from "react";

import './App.css';
import Pg from "./photos.js";


const App = () => {
  const key="97670eb7ace1846c577d9f5d6fcab986";
  const[pics, setPics] = useState([]);
  const[searchUser, setSearch]=useState("");
  const[query, setQuery] = useState("");

  useEffect(() => {
    getPics();
  }, [query]);
  
  const updateSearch = e =>{
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(searchUser);
  }


  const getPics = async () => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=${key}&username=${query}&format=json&nojsoncallback=1`;
    console.log(url);
    var nsid = "";
    try {
      var response = await fetch (url)
      var data = await response.json();
      console.log(data.user.nsid);
      nsid = data.user.nsid
      const newurl = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${key}&user_id=${nsid}&format=json&nojsoncallback=1`
      console.log(newurl);
      response = await fetch (newurl)
      data = await response.json()
      setPics(data.photos.photo.slice(0,10));
      console.log(data.photos.photo.slice(0,10)); 
      setSearch(""); 
    }
    catch(error){
      console.log(error);
      console.log("Something went wrong");

    }

    
  }
  

  return(
    <div className="App">
      <header><h1>Find your favorite Flickr user's photos here!</h1></header>
      <div className="belowheader">
      <h2>Type a Flickr user's username in the search box below.</h2>

        <form onSubmit={getSearch}>
        <input className='search-bar' type='text' value={searchUser} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
        </form>
        <div className="grid">
          {pics.map(photos =>(
          <Pg
          id={photos.id}
          server={photos.server} 
          secret={photos.secret}
          title={photos.title} 
          />
        ))}
        </div> 
      </div>
     
    </div>
  )

}

export default App;

import { Checkbox } from "@mui/material";
import React, {useEffect, useState} from "react";
import './App.css';
import Pg from "./photos.js";

const App = () => {
  const key="97670eb7ace1846c577d9f5d6fcab986";
  const[pics, setPics] = useState([]);
  const[searchUser, setSearch] = useState("");
  const[query, setQuery] = useState("");
  const[err, setError] = useState("");
  const[picError, setPicError] = useState(false);

  useEffect(() => {
    getPics();
  }, [query]);
  
  const updateSearch = e =>{
    setSearch(e.target.value);

  };

  const getSearch = e => {
    e.preventDefault();
    setPics([]);
    setError(false);
    setPicError(false);
    setQuery(searchUser);
    setSearch(""); 
  }

  const getPics = async () => {
    if (query){
      const url = `https://www.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=${key}&username=${query}&format=json&nojsoncallback=1`;
      console.log(url);
      var nsid = "";
      try {
        var response = await fetch (url)
        var data = await response.json();
        console.log(data.user.nsid);
        nsid = data.user.nsid;
        var sortBy="interesting";
        const newurl = `https://www.flickr.com/services/rest/?method=flickr.photos.getPopular&api_key=${key}&user_id=${nsid}&sort=${sortBy}&format=json&nojsoncallback=1`
        console.log(newurl);
        response = await fetch (newurl)
        data = await response.json()
        if (data.photos.photo.length==0){
          setPicError(true);
        }
        setPics(data.photos.photo.slice(0,12));
        console.log(data.photos.photo.slice(0,12));
      }
      catch(error){
        console.log(error);
        console.log("Something went wrong");
        if (nsid==""){ setError(true); }
        else{ setError(false);}
      }
    }
  }
  function renderPics(){
    if (err){
      return "Username not found.";
    }
    else if (picError){
      return "No photos found for the given username.";
    }
  }
  return(
    <div className="App">
      <div className="margin">
      <header><h1>Find your favorite Flickr user's most popular photos here!</h1></header>
      <div className="belowheader">
        <h2>Type a Flickr user's username in the search box below.</h2>
        <form onSubmit={getSearch}>
          <input className='search-bar' type='text' value={searchUser} onChange={updateSearch}/>
          <button className="search-button" type="submit">Search</button>
          
        </form>
        <div>
          {query ? (<p>You searched for: @{query}</p>) : <h2></h2>}
          {picError || err ? (<p><strong>{renderPics()}</strong></p>): null}
        </div>  
      </div>     
      <div className="grid">
          {pics.map(photos =>(
          <Pg
          key={photos.id}
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

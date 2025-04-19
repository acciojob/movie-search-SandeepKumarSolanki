
import React, { useState } from "react";
import axios from 'axios'
import './../styles/App.css';

const App = () => {
  const [searchItem, setSearchItem] = useState([]);
  const [userInput, setUserInput] = useState('')
  const [error, seetError] = useState(false);


  function handleApi() {
    axios.get(`http://www.omdbapi.com`, {
      params: {
        apikey: "99eb9fd1",
        s: userInput,
      },
    })
      .then((response) => {
        if (response.data.Search && response.data.Search.length > 0) {
          setSearchItem(response.data.Search);
        } else {
          setSearchItem([]);
          seetError(true);
        }
      })
      .catch((error) => {
        seetError(true);
        console.log(error);
      })
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (userInput) {
      handleApi();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <input 
            type="text"
            onChange={(e)=>{setUserInput(e.target.value)}}
          />
          <button type="submit">Search</button>
      </form>
      <div>
        
        {
          searchItem.length > 0 ?(
            <ul>
              {searchItem.map ((item)=>(
                <div key={item.imdbID}>
                  <li>
                    <p>
                      {item.Title} ({item.Year})
                    </p>
                    <img src={item.Poster} alt={item.Title} />
                  </li>
                </div>
              ))}
            </ul>
          ) :(
            error && (
              <p className="error">Invalid movie name. Please try again.</p>
            )
          )
        }
      </div>
    </div>
  )
}

export default App

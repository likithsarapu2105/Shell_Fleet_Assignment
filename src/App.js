import React, { useEffect, useState } from "react";
import "./App.css";

import exampleImg from "../src/images/beer.jpg";
import logo from '../src/images/logo.jpg';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function App() {

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers?page=1&per_page=10")
      .then((res) => res.json())
      .then((data) => {
        setSmallImagesData(data);
        console.log(data)
      });

  }, []);

  const [smallImagesData, setSmallImagesData] = useState([]);

  return (
    <div className="container">
      <div className="top-text">
        <div >
          <img className="logo" src={logo} />
        </div>
        <div className="header-fields">
          <a>HOME</a>
          <a>BEERS</a>
          <a>CONTACT</a>
        </div>
      </div>
      <div>
        <img className="bgimage" src={exampleImg} />
        <div className="image-text">
          <h2>GREAT IPA</h2>
          <p>
            Some hops is plowed. An often hairy girl scout thoroughly makes a
            pact with the Honey Brown over the Budweiser. A blood clot makes a
            pact with the discusting satelliste brewery. A lover about the
            Pilsner Urquell takes a peek at the bottle of beer. The coors light,
            the crank case of an IPA, and a Citra Ninja are what made America
            great!
          </p>
        </div>
      </div>
      <div className="small-images" data-testid="small-images">
        {smallImagesData.length > 0 ? (
          smallImagesData.map((imageData, index) => (
            <Item imageData={imageData} index={index} setSmallImagesData={setSmallImagesData} />
          ))
        ) : (
          <h1>Loading.....</h1>
        )}
      </div>

      <div>
        <div className="bottom-border"></div>
        <div className="lastbottom-border">Copyright Foolproof 2019</div>
      </div>
    </div>
  );
}

function Item({ imageData, index, setSmallImagesData }) {
  const [isLiked, setIsLiked] = useState();
  const handleLikeClick = (imageData, index) => {
    setIsLiked((prev) => !prev);
  };
  return (
    <div className="small-image" data-testid="small-image" key={index}>
      <div className="card-header">
        {isLiked ? (
          <AiFillHeart
            data-testid="like-icon"
            className="love-icon"
            color="red"
            size={20}
            onClick={() => { handleLikeClick(imageData, index) }}
          />
        ) : (
          <AiOutlineHeart
            data-testid="like-icon"
            className="love-icon"
            size={20}
            onClick={() => { handleLikeClick(imageData, index) }}
          />
        )}
        <img src={imageData.image_url} alt={imageData.title} />
      </div>
      <div className="card-content">
        <h2>{imageData.name}</h2>
        <p>{imageData.brewers_tips}</p>
      </div>
    </div>
  );
}
export default App;

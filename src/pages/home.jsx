import { Image } from "antd";
import React from "react";
import img from "../assets/img.avif";

const Home = () => {
  return (
    <div className="home">
      <img src={img} />
      <div className="name">O'telbayev Jasurbek</div>
      <div className="desc">Iqtisodiyot fakulteti</div>
      <div className="desc">
        Transportda axborot tizmlar va texnologiyalari kafedrasi
      </div>
      <div className="desc">AT-3</div>
    </div>
  );
};

export default Home;

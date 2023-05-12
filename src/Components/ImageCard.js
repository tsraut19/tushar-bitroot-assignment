import React, { useEffect, useState } from 'react';
import './ImageCard.css'; 
import './Modal.css';

const ImageCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  
  
  const handleCardClick = (item) => {
    setSelectedCard(item);
    console.log(selectedCard);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

   const handleMouseOver = () => {
     setIsHovered(true);
     console.log('hovered');
   };

   const handleMouseOut =() => {
     setIsHovered(false);
     console.log('hovered-out');
   };


  useEffect(() => {
    let API = "https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts";
    fetch(API)
    .then((response) => response.json())
    .then((response) => setData(response))
    .catch((error) => console.log(error))
    console.log(data)
    console.log('data fetched');

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('API');
    //     const data = await response.json();
    //     setData(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // fetchData();
  }, []);

  return (
    <div className="image-card">

      {data.map(item => (
        <div className="card" key={item.id}>
          <div className="card-body">
            <div className="overlay"></div>
              <img className= "image" src={item.thumbnail.large} alt={item.title} />
              <br></br>
              <h2 className='card-title'>{item.title}</h2>
              <br></br>
              <div className="learn-more" 
                onClick = {() => handleCardClick({item})} 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut} 
                >Learn More
              </div>
              <p className="card-content">{item.content}</p>
              <br></br>
              <div className="bottom-content">
                <span>{item.author.name} - {item.author.role}</span>
                <span>{item.date}</span>
              </div>
            </div>
        </div>
      ))}

      {isModalOpen && selectedCard && (
        //<Modal isOpen={isModalOpen} onClose={handleCloseModal} selectedCard={data} />
        data.map(item => (
          <div className="modal" >
            <div className="modal-content">
            
                <div className="modal-button" onClick={handleCloseModal} >
                  x
                </div>
              
                <img className="modal-image" src={selectedCard.item.thumbnail.large}/>
                <div class="modal-body">
                  <h2 >{selectedCard.item.title}</h2>
                  <br></br>
                  <p className="modal-body-content">{selectedCard.item.content}</p>
                  <br></br>
                  <div className="bottom-content">
                    <span><img className="modal-avatar" src={item.author.avatar} alt={item.author}/>  {item.author.name} - {item.author.role}</span>
                  </div>
                </div>
            </div>
          </div>
        )))}
      
    </div>
  );
};

export default ImageCard;

import React, { useEffect, useState } from "react";
import Card from "./Card";

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/courses")
      .then((response) => response.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 bg-white">
      {cards.map((card) => (
        <Card
          index={card.id}
          key={card.id}
          title={card.title}
          description={card.description}
          icon={card.icon}
          bgColor={card.bgColor}
          iconColor={card.iconColor}
        />
      ))}
    </div>
  );
};

export default CardList;

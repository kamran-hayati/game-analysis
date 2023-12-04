"use client";

import { Card } from "semantic-ui-react";
import { useState } from "react";

const cards = [
  { header: "Card 1", description: "This is the first card" },
  { header: "Card 2", description: "This is the second card" },
  { header: "Card 3", description: "This is the third card" },
];

export default function CardGroup() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Card.Group itemsPerRow={3}>
      {cards.map((card, index) => (
        <Card
          key={card.header}
          header={card.header}
          description={card.description}
          onClick={() => handleClick(index)}
          color={activeIndex === index ? "red" : null}
        />
      ))}
    </Card.Group>
  );
}

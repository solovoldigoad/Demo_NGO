// CardLayout.tsx
import React from 'react';
import Card from './Cards';

const CardLayout: React.FC = () => {
  const cardsData = [
    {
      title: 'ChildHood',
      description: 'Childhood is the period of generally considered to be the period between infancy and adolescence, from ages 1–2 to 12–13. Childhood can also refer to the early period of development of something',
      imageUrl: 'img1.jpg', // Change this to your actual image URL
      link: '#',
    },
    {
      title: 'Save Water',
      description: "The earth has an abundance of water, but unfortunately, only a small percentage (about 0.3 percent), is even usable by humans. The other 99.7 percent is in the oceans, soils, icecaps, and floating , river , lake...",
      imageUrl: 'saveWater.jpg', // Change this to your actual image URL
      link: '#',
    },
    {
        title: 'Women’s Health Problem',
        description: 'Among numerous vital issues in a developing country like India, women have many unique health concerns including menstrual cycles, pregnancy, birth control, menopause to name the least. Many...',
        imageUrl: 'womenHelath.jpg', // Change this to your actual image URL
        link: '#',
      },
      {
        title: 'Child Labor',
        description:'According to data from Census 2011, the number of child laborers in India is 10.1 million of which 5.6 million are boys and 4.5 million are girls. Children are also at risk of various other forms of...',
        imageUrl: 'Child-labour.jpg', // Change this to your actual image URL
        link: '#',
      },
      {
        title: 'Child Education',
        description:"'Less than half of India's children between the age 6 and 14 go to school. A little over one-third of all children who enroll in grade one reach grade eight. At least 35 million children aged 6 - 14...",
        imageUrl: 'childerEdu.jpg', // Change this to your actual image URL
        link: '#',
      },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};

export default CardLayout;

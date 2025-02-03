import React from 'react';

function Promo() {
  const data = [
    {
      id: 1,
      title: 'Looking for Specialist Doctors?',
      description: 'Schedule an appointment to consult with top doctors.',
      image: '/image/home/Image.png',
    },
    {
      id: 2,
      title: 'Looking for Specialist Doctors?',
      description: 'Schedule an appointment to consult with top doctors.',
      image: '/image/home/Image2.png',
    },
    {
      id: 3,
      title: 'Looking for Specialist Doctors?',
      description: 'Schedule an appointment to consult with top doctors.',
      image: '/image/home/Image.png',
    },
  ];

  return (
    <div className="my-20 container mx-auto">
      <h1 className="text-4xl text-center font-bold text-[#383A3A]">
        Promo <span className="text-[#357A7B]">Menarik</span>
      </h1>
      <div className="flex overflow-x-scroll gap-8 mt-16 scrollbar-hide">
        {data.map((card) => (
          <div
            key={card.id}
            className="bg-cover bg-center w-[800px] h-60 rounded-lg"
            style={{ backgroundImage: `url(${card.image})` }}
          >
            <div className=" bottom-0 left-0 p-6 bg-black bg-opacity-50 text-white h-60 rounded-lg w-[800px]">
              <h2 className="text-4xl font-bold w-1/2">{card.title}</h2>
              <p className="mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Promo;

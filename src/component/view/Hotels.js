import React, { useState } from 'react';

const hotels = [
  {
    id: 1,
    name: '시그니엘 서울',
    description: '주소 : 서울특별시 송파구 올림픽로 300 롯데월드타워 (신천동)' + "\n" + '전화 : 02-3213-1000',
    imageUrl: 'https://res.heraldm.com/content/image/2017/01/06/20170106000674_0.jpg',
  },
  {
    id: 2,
    name: '포시즌스 호텔 서울',
    description: '주소 : 서울특별시 종로구 새문안로 97  (당주동) 전화 : 02-6388-5000',
    imageUrl: 'https://www.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=44441&fileTy=MEDIA&fileNo=1',
  },
  {
    id: 3,
    name: '그랜드 머큐어 앰배서더 호텔',
    description: '주소 : 서울특별시 용산구 청파로20길 95 서울드래곤시티 (한강로3가) 전화 : 02-2223-7000',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBO9EFe3JAPJ9-2OTnP20RXHe7vqJAgLOZYg&usqp=CAU',
  },
  {
    id: 4,
    name: '호텔 신라 서울',
    description: '주소 : 서울특별시 중구 동호로 249  (장충동2가) 전화 : 02-2233-3131',
    imageUrl: 'https://www.shillahotels.com/images/en/hub/sub/seoulMainImg.jpg',
  },
  {
    id: 5,
    name: '롯데 호텔 서울',
    description: '주소 : 서울특별시 중구 을지로 30 (소공동) 전화 : 02-771-1000',
    imageUrl: 'https://image.edaily.co.kr/images/Photo/files/NP/S/2018/08/PS18083001018.jpg',
  },
  {
    id: 6,
    name: 'JW 메리어트 호텔 서울',
    description: '주소 : 서울특별시 서초구 신반포로 176 전화 : 02-6282-6262',
    imageUrl: 'https://dimg.donga.com/wps/ECONOMY/IMAGE/2014/02/04/60568235.1.jpg',
  },
  {
    id: 7,
    name: '포시즌스 호텔 서울',
    description: '주소 : 서울특별시 종로구 새문안로 97  (당주동) 전화 : 02-6388-5000',
    imageUrl: 'https://www.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=44441&fileTy=MEDIA&fileNo=1',
  },
  {
    id: 8,
    name: '시그니엘 서울',
    description: '주소 : 서울특별시 송파구 올림픽로 300 롯데월드타워 (신천동) 전화 : 02-3213-1000',
    imageUrl: 'https://res.heraldm.com/content/image/2017/01/06/20170106000674_0.jpg',
  },
  {
    id: 9,
    name: '호텔 신라 서울',
    description: '주소 : 서울특별시 중구 동호로 249  (장충동2가) 전화 : 02-2233-3131',
    imageUrl: 'https://www.shillahotels.com/images/en/hub/sub/seoulMainImg.jpg',
  },
  {
    id: 10,
    name: '그랜드 머큐어 앰배서더 호텔',
    description: '주소 : 서울특별시 용산구 청파로20길 95 서울드래곤시티 (한강로3가) 전화 : 02-2223-7000',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBO9EFe3JAPJ9-2OTnP20RXHe7vqJAgLOZYg&usqp=CAU',
  },
  {
    id: 11,
    name: 'JW 메리어트 호텔 서울',
    description: '주소 : 서울특별시 서초구 신반포로 176 전화 : 02-6282-6262',
    imageUrl: 'https://dimg.donga.com/wps/ECONOMY/IMAGE/2014/02/04/60568235.1.jpg',
  },
  {
    id: 12,
    name: '롯데 호텔 서울',
    description: '주소 : 서울특별시 중구 을지로 30  (소공동) 전화 : 02-771-1000',
    imageUrl: 'https://image.edaily.co.kr/images/Photo/files/NP/S/2018/08/PS18083001018.jpg',
  },
];

const HotelCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const pageCount = Math.ceil(hotels.length / pageSize);
  const paginatedHotels = hotels.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridGap: '10px',
        }}
      >
        {paginatedHotels.map((hotel) => (
          <div
            key={hotel.id}
            style={{
              border: '1px solid #b1bff9',
              margin: '5px 20px',
              borderRadius: '15px',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={hotel.imageUrl}
              alt={hotel.name}
              style={{ width: '100%', height: '225px', objectFit: 'cover' }}
            />
            <div style={{ marginTop: '10px', textAlign: 'left' }}>
              <h2 style={{ margin: '10px' }}>{hotel.name}</h2>
              <p style={{ margin: '10px' }}>{hotel.description}</p>
            </div>
            <button
              style={{
                marginTop: 'auto',
                padding: '5px 10px',
                backgroundColor: '#b1bff9',
                color: '#fff',
                border: 'none',
                borderRadius: '7px',
              }}
            >
              예약하기
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0  }
          style={{
            marginRight: '10px',
            padding: '5px 10px',
            backgroundColor: '#b1bff9',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          이전
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pageCount - 1}
          style={{
            marginTop: 'auto',
            padding: '5px 10px',
            backgroundColor: '#b1bff9',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default HotelCarousel;

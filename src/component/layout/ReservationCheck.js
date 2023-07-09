import { Link } from '@mui/material'
import React, { useState } from 'react'

import { API_BASE_URL } from '../../util/host-utils';
import { getLoginUserInfo } from '../../util/login-utils';
import ReservationItem from './ReservationItem';

const ReservationCheck = () => {

    // 로그인 인증 토큰 얻어오기
    const token = getLoginUserInfo().token;

    const [reserveList, setReserveList] = useState([]);

    const requestHeader = {
        'content-type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      };

  
    useEffect(() => {
    
        //페이지가 렌더링 되면 예약목록 보여주기.
        fetch(API_BASE_URL, {
          method: 'GET',
          headers: requestHeader
        })
        .then(res => {
          if(res.status === 200) return res.json();
          else if(res.status === 403) {
            alert('로그인이 필요한 서비스 입니다.');
            redirection("/login");
            return;
          } else {
            alert('관리자에게 문의하세요!');
          }
          return;
        })
        .then(json => {
          // console.log(json.todos);
    
          //fetch를 통해 받아온 데이터를 상태 변수에 할당.
          if(json) setReserveList(json.resList);
    
        });
    
      }, []);
    return (
    <>
    <Link to='/reservation'>예매하러 가기</Link>
        <h1>예약 정보 확인</h1>
        <ul className='todo-list'>

        {
          reserveList.map(reserve => <ReservationItem
                                  key={reserve.id}
                                  item={reserve}
                                  />)
        }
    </ul>
    </>
  
)};

export default ReservationCheck;
import React from 'react'
import "../../design/mypage.scss"

const MyPage = () => {
  return (
    <>
      <h1>My Page</h1>
      <div className='my-page'>
          <div className='welcome'>
            <img src={require("../../img/profileImage.png")} />
            심청이님 환영합니다.
          </div>
          <div className='page-menu'>
            <span>회원 정보 수정하기</span>
            <span>작성한 여행 후기</span>
            <span>뭘 추가 해야할까</span>
            <span>하나 더 추가 하고싶다</span>
          </div>
      </div>
    </>
  )
}

export default MyPage
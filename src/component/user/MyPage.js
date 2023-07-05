import React from 'react'
import "../../design/mypage.scss"

const MyPage = () => {
  return (
    <>
      <h1>My Page</h1>
      <div className='my-page'>
          <div className='welcome'>
            <img src={require("../../img/profileImage.png")} />
            <div className='nick'>심청이님</div>
            <div className='nick-welcome'>환영합니다</div>
            <div className='photo'>프로필 사진 바꾸기 {'>'}</div>
          </div>
          <div className='page-menu'>
            <span>회원 정보 수정하기</span>
            <span>영화 촬영지 여행 후기</span>
            <span>찜 목록</span>
            <span>으핫</span>
            <div className='delete'>
              <a>회원 탈퇴</a>
            </div>
          </div>
      </div>
    </>
  )
}

export default MyPage
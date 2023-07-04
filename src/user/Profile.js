import React from 'react'
import '../design/profile.scss'

const Profile = () => {

  return (
    <>
      회원 정보 수정  <br />
      <div className='prof-main'>
        <div className='profile'>
          ID : <input type='text' name='id' placeholder='고정값' readOnly /> <br />
          PW : <input type='password' name='pw' placeholder='비밀번호' />  <br />
          Nick : <input type='text' name='nick' placeholder='닉네임' />  <br />
          Email : <input type='text' name='email' placeholder='이메일' />
        </div>
        <div className='image-profile'>
          <img src={require("../img/profileImage.png")} />
        </div>
      </div>
    </>
  )
}

export default Profile
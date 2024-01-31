import React from 'react'
import "./Uploaded.css"
import Header from '../Components/Header/Header'
const Uploaded = () => {
  return (
   <>
   <Header/>

   <div className="image-page">
      <div className="image-container">
        <img src="/Img/Uploaded-doc.png" alt="Your Image" />
      </div>
      <div>
      <p>Thank You for the submission, our team will reach out to you shortly</p>
      <div className="button-container">
        <button className='custom-btn-wp ' onClick={()=>{window.location.href="https://web.whatsapp.com"}}>Back to Whatsapp</button>
        <button className="custom-btn">Visit Mastork</button>
      </div>
      </div>
    </div>
   </>
  )
}

export default Uploaded

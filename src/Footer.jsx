import './Footer.css';

const Footer = () => {
    return (
        <>
        <br />
        <div className='back'>
        <div className='footer'>
            <p>&copy;CrochetPal</p>
            < a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
                <img src='\images\insta.png' alt='Instagram'></img>
            </a>

            < a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                <img src='\images\facebook.png' alt='Facebook'></img>
            </a>
            
            < a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                <img src='\images\twitter.png' alt='Twitter'></img>
            </a>
          </div>  
        </div>
      </>
    )
}

export default Footer;
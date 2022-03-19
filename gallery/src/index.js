import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ImageGallery from 'react-image-gallery';
import reportWebVitals from './reportWebVitals';

const fileNames = [
  '0_h',
  '1_h',
  '2_v',
  '3_v',
  '4_v',
  '5_h',
  '6_v',
  '7_h',
  '8_h',
  '9_v',
  '10_h',
  '11_v',
  '12_v',
  '13_h',
  '14_v',
]
const images = fileNames.map(f => {
  const suffix = f.substring(f.indexOf('_') + 1)
  return {
    original: f + '_f.jpg',
    originalTitle: f,
    //originalAlt: '클릭하여 크게 보기',
    thumbnail: f + '_t.jpg',
    thumbnailHeight: '48px',
    thumbnailWidth: suffix === 'h' ? '72px' : '32px',
    loading: 'lazy'
  }
})

const MyGallery = () => {
  const [display, setDisplay] = useState('none')
  const [imgTitle, setImgTitle] = useState("")
  const [start, setStart] = useState(0)

  useEffect(() => {
    const initImgTitle = window.location.search.substring(1) || ""
    setImgTitle(initImgTitle)
    console.log(initImgTitle)

    if (initImgTitle && initImgTitle.indexOf('_') > 0) {
      const st = parseInt(initImgTitle.substring(0, initImgTitle.indexOf('_')));
      setStart(st)
    }
    console.log(start)
  }, [])

  const onImgClick = (e) => {
    e.preventDefault();
    const clickedImgTitle = e.target.title;
    console.log(clickedImgTitle)
    setImgTitle(clickedImgTitle)
    setDisplay('block')

  }

  const closePopup = (e) => {
    e.preventDefault();
    setDisplay('none')
  }

  return (
    <div>
      <ImageGallery
        items={images}
        lazyLoad={true}
        startIndex={start}
        //onClick={onImgClick}
      />
      <FullPopup
        display={display}
        imgTitle={imgTitle}
        closePopup={closePopup} />
    </div>
  );
}

const FullPopup = (props) => {
  console.log(props)
  const imgPath = props.imgTitle + "_f.jpg"
  return (
    <div className="popup"
      style={props}>
      <button
        //onClick={props.closePopup}
        type="button"
        className="x-btn">
        <img className="x-svg" src="x.svg" />
      </button>
      <img
        className="popup_img"
        src={imgPath} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <MyGallery />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 4130 2748
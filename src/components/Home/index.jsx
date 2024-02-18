import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.css"
import { Translation } from 'react-i18next';

export default function index() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch("https://strapi-store-server.onrender.com/api/products?featured=true")
      .then(res => res.json())
      .then((el) => {
        setData(el.data)
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])



  return (
    <div className={styles.containers}>
      {
        loading ? (
          <p className={styles.loader}>Loading...</p>
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.text}>
                <Translation>
                  {
                    t => <h1>{t('text')}</h1>
                  }
                </Translation>
                <Translation>
                  {
                    t => <p>{t('text1')}</p>
                  }
                </Translation>
                <Translation>
                  {
                    t => <button>{t('textbtn')}</button>
                  }
                </Translation>
              </div>

              <div className={styles.carusel}>
                <div className="carousel carousel-center max-w-xl h-47 p-5 space-x-5 bg-neutral rounded-box">
                  <div className="carousel-item">
                    <img src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp" className={styles.rounded_box} />
                  </div>
                  <div className="carousel-item">
                    <img src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp" className={styles.rounded_box} />
                  </div>
                  <div className="carousel-item">
                    <img src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp" className={styles.rounded_box} />
                  </div>
                  <div className="carousel-item">
                    <img src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp" className={styles.rounded_box} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <Translation>
                {
                  t => <h1>{t('text2')}</h1>
                }
              </Translation>
              <hr />

              <div className={styles.cards} data-aos="zoom-in-down">
                {
                  data.map((data, index) => {
                    return (
                      <div className={styles.cart} key={index} onClick={() => {
                        Navigate(`/product/${data.id}`)
                      }}>
                        <img src={data.attributes.image} />
                        <h2>{data.attributes.title}</h2>
                        <h3>${data.attributes.price}</h3>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </>
        )
      }
    </div>
  )
}

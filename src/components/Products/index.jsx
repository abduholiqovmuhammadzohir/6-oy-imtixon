import styles from "./index.module.css"
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Translation } from 'react-i18next';

export default function index() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const productRef = useRef();
  const categoryRef = useRef();
  const companyRef = useRef();
  const sortRef = useRef();

  useEffect(() => {
    setLoading(true)
    fetch("https://strapi-store-server.onrender.com/api/products")
      .then(res => res.json())
      .then((el) => {
        setData(el.data)
        console.log(el);
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://strapi-store-server.onrender.com/api/products?search=${productRef.current.value}&category=${categoryRef.current.value}&company=${companyRef.current.value}&order=${sortRef.current.value}&price=${inputValue}000`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setInfo(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleReset() {
    setLoading(true);
    productRef.current.value = "";
    categoryRef.current.value = "all";
    companyRef.current.value = "all";
    sortRef.current.value = "a-z";
    fetch("https://strapi-store-server.onrender.com/api/products")
      .then(res => res.json())
      .then((el) => {
        setData(el.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  return (
    <div className={styles.container}>

      {
        loading ? (
          <p className={styles.loader}></p>
        ) : (
          <>
            <div className={styles.products}>
              <div className={styles.selects}>
                <div className={styles.product}>
                  <Translation>
                    {
                      t => <label>{t('product')}</label>
                    }
                  </Translation><br />
                  <input ref={productRef} type="text" />
                </div>
                <div className={styles.category}>
                  <Translation>
                    {
                      t => <label>{t('category')}</label>
                    }
                  </Translation><br />
                  <select ref={categoryRef}>
                    <option value="all" selected>all</option>
                    <Translation>
                      {
                        t => <option value="tables">{t('tables')}</option>
                      }
                    </Translation>
                    <Translation>
                      {
                        t => <option value="chairs">{t('chairs')}</option>
                      }
                    </Translation>
                    <Translation>
                      {
                        t => <option value="kids">{t('kids')}</option>
                      }
                    </Translation>
                    <Translation>
                      {
                        t => <option value="sofas">{t('sofas')}</option>
                      }
                    </Translation>
                    <Translation>
                      {
                        t => <option value="beds">{t('beds')}</option>
                      }
                    </Translation>
                  </select>
                </div>
                <div className={styles.compony}>
                  <Translation>
                    {
                      t => <label>{t('company')}</label>
                    }
                  </Translation><br />
                  <select ref={companyRef}>
                    <option value="all">all</option>
                    <option value="modenza">Modenza</option>
                    <option value="luxora">Luxora</option>
                    <option value="artifex">Artifex</option>
                    <option value="comfora">Comfora</option>
                    <option value="homestead">Homestead</option>
                  </select>
                </div>
                <div className={styles.sort}>
                  <Translation>
                    {
                      t => <label>{t('sort')}</label>
                    }
                  </Translation><br />
                  <select ref={sortRef}>
                    <option value="a-z">a-z</option>
                    <option value="z-a">z-a</option>
                    <Translation>
                      {
                        t => <option value="high">{t('high')}</option>
                      }
                    </Translation>
                    <Translation>
                      {
                        t => <option value="low">{t('low')}</option>
                      }
                    </Translation>
                  </select>
                </div>
              </div>
              <div className={styles.btn}>
                <Translation>
                  {
                    t => <button className={styles.search} onClick={handleSearch}>{t('search')}</button >
                  }
                </Translation>
                <Translation>
                  {
                    t => <button className={styles.reset} onClick={handleReset}>{t('reset')}</button>
                  }
                </Translation>
              </div>
            </div>

            <div className={styles.cards}>
              {
                data.map((data, index) => {
                  return (
                    <div className={styles.cart} key={index} onClick={() => {
                      Navigate(`/product/${data.id}`)
                    }} >
                      <img src={data.attributes.image} />
                      <h2>{data.attributes.title}</h2>
                      <h3>${data.attributes.price}</h3>
                    </div>
                  )
                })
              }
            </div>
            <div className={styles.next}>
              <div className="join">
                <button className="join-item btn">PREV</button>
                <button className="join-item btn btn-active">1</button>
                <button className="join-item btn">2</button>
                <button className="join-item btn">3</button>
                <button className="join-item btn">NEXT</button>
              </div>
            </div>
          </>
        )

      }

    </div>
  )
}

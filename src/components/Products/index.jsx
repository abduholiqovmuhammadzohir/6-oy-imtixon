import styles from "./index.module.css"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function index() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate()


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


  return (
    <div className={styles.container}>

      {
        loading ? (
          <p className={styles.loader}>Loading...</p>
        ) : (
          <>
            <div className={styles.products}>
              <div className={styles.selects}>
                <div className={styles.product}>
                  <label>Search Product</label><br />
                  <input type="text" />
                </div>
                <div className={styles.category}>
                  <label>Select Category</label><br />
                  <select>
                    <option value="all" selected>all</option>
                    <option value="tables">Tables</option>
                    <option value="chairs">Chairs</option>
                    <option value="kids">Kids</option>
                    <option value="sofas">Sofas</option>
                    <option value="beds">Beds</option>
                  </select>
                </div>
                <div className={styles.compony}>
                  <label>Select Company</label><br />
                  <select>
                    <option value="all">all</option>
                    <option value="modenza">Modenza</option>
                    <option value="luxora">Luxora</option>
                    <option value="artifex">Artifex</option>
                    <option value="comfora">Comfora</option>
                    <option value="homestead">Homestead</option>
                  </select>
                </div>
                <div className={styles.sort}>
                  <label>Sort By</label><br />
                  <select>
                    <option value="a-z">a-z</option>
                    <option value="z-a">z-a</option>
                    <option value="high">high</option>
                    <option value="low">low</option>
                  </select>
                </div>
              </div>
              <div className={styles.btn}>
                <button className={styles.search}>SEARCH</button>
                <button className={styles.reset}>RESET</button>
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

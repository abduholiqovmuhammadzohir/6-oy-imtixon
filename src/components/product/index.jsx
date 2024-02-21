import React, { useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./index.module.css"
import {useDispatch} from "react-redux"

export default function Product() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const useSelect = useRef(0)


    useEffect(() => {
        setLoading(true)
        fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
            .then(res => res.json())
            .then((el) => {
                setData(el.data.attributes)
                console.log(el.data.attributes);
            }).catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    function handleClick() {
        const selectedValue = useSelect.current.value;
        data.selectValue = selectedValue
        console.log(data);
        dispatch({type:"ADD", payload:data})    
    }

    return (
        <div className={styles.container}>
            {
                loading ? (
                    <>
                        <p className={styles.loader}>Loading...</p>
                    </>
                ) : (
                    <>
                        <div className={styles.text_url}>
                            <span onClick={() => { Navigate(`/`) }}>Home </span>
                            <span onClick={() => { Navigate(`/products`) }}>Products</span>
                        </div>
                        <div className={styles.containers}>
                            <div className="image">
                                <img src={data.image} />
                            </div>
                            <div className={styles.text}>
                                <h1>{data.title}</h1>
                                <h2>{data.company}</h2>
                                <h3>${data.price}</h3>
                                <p>{data.description}</p>
                                <label>Amount</label><br />
                                <select ref={useSelect} className="select select-bordered w-full max-w-xs">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                </select><br />
                                <button onClick={handleClick}>ADD TO BAG</button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>

    )
}

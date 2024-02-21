import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './App.css'
import Home from "./components/Home"
import About from "./components/About"
import Products from "./components/Products"
import Cart from "./components/Cart"
import NoPages from "./components/NoPages"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useTranslation } from 'react-i18next';
import Product from './components/product';
import {useSelector} from "react-redux"

function App() {

  const [lang, setLang] = useState('en')
  const { t, i18n } = useTranslation();
  const [loader, setLoader] = useState(true)
  const customers = useSelector(state => state.customers.customers)

  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    const body = document.querySelector('body');
    if (darkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  }

  useEffect(() => {
    let lang = localStorage.getItem('lang')

    if (lang) {
      i18n.changeLanguage(lang)
      setLang(lang)
    }

  }, [])

  function handleChangeLang(e) {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value)
    localStorage.setItem('lang', e.target.value)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }, [])

  return (
    <BrowserRouter>
      {
        !loader ? (
          <>
            <div className="div">
              {/* <NavLink to="/signin">Signin</NavLink>
              <NavLink to="/account">Account</NavLink> */}
              <div className={`navbar ${darkMode ? 'dark' : 'light'}`}>
                <div className="navbars">
                  <div className={`logo ${darkMode ? 'dark' : 'light'}`}>
                    C
                  </div>
                  <nav>
                    <ul className={darkMode ? 'dark' : 'light'}>
                      <NavLink className="li" to="/">{t("home")}</NavLink>
                      <NavLink className="li" to="/about">{t('about')}</NavLink>
                      <NavLink className="li" to="/products">{t("products")}</NavLink>
                      <NavLink className="li" to="/cart">{t('cart')}</NavLink>
                    </ul>
                  </nav>
                  <div className="mode">
                    <div className={darkMode ? "dark" : "light"} onClick={toggleDarkMode}>
                      {darkMode ? <DarkModeIcon /> : <LightModeOutlinedIcon />}
                    </div>
                    <div className="lang">
                      <select onChange={handleChangeLang} value={lang}>
                        <option value="en">en</option>
                        <option value="uz">uz</option>
                        <option value="ru">ru</option>
                      </select>
                    </div>
                    <div className="indicator">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        className="h-6 w-6"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      > 
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                      </svg>
                      <span className="badge badge-sm badge-primary indicator-item">{customers.length}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="futer">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<Products />} />
                <Route path="/product/:id" element={<Product></Product>} />
                <Route path="cart" element={<Cart />} />
                {/* <Route path="signin" element={<Signin></Signin>} />
                <Route path="account" element={<Account></Account>} /> */}
                <Route path="*" element={<NoPages />} />
              </Routes>
            </div>
          </>
        ) : (
          <div className="spinner-wrapper">
            <div className="spinner">
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
            </div>
          </div>
        )
      }

    </BrowserRouter>
  )
}

export default App;

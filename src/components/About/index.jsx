import React from 'react'
import styles from "./index.module.css"
import { Translation } from 'react-i18next';

export default function index() {
  return (
    <div className={styles.container}>
      <Translation>
        {
          t => <h1>{t('aboute')}</h1>
        }
      </Translation>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae quam
        blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia optio aut! Perferendis ipsa
        cumque ipsam nostrum reprehenderit ad illo sed officiis ea tempore! Similique eos
        minima sit porro, ratione aspernatur!</p>
    </div>
  )
}

import  { Dispatch, SetStateAction } from 'react'
import styles from './Tabs.module.css'

export interface Tab<K extends string> {
  key: K
  label: string
}

export interface TabsProps<K extends string> {
  tabs: Tab<K>[]
  activeTab: K
  // agora onChange aceita exatamente o mesmo Dispatch usado pelo setState
  onChange: Dispatch<SetStateAction<K>>
}

export default function Tabs<K extends string>({
  tabs,
  activeTab,
  onChange,
}: TabsProps<K>) {
  return (
    <div className={styles.tabs}>
      {tabs.map(t => (
        <button
          key={t.key}
          className={`${styles.tab} ${activeTab === t.key ? styles.active : ''}`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

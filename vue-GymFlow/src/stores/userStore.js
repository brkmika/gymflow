import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const getItem = (key) => {
    const val = localStorage.getItem(key)
    if (val === 'null' || val === null) return null
    return val
}

export const useUserStore = defineStore('user', () => {
    
    const ime = ref(getItem('user_ime') || '')
  const prezime = ref(getItem('user_prezime') || '')
  const tezina = ref(getItem('user_tezina'))
  const visina = ref(getItem('user_visina'))
  const godine = ref(getItem('user_godine'))
  const treninziTjedno = ref(Number(getItem('user_treninziTjedno')) || null)

  // automatski sprema u localStorage kada se vrijednost promjeni
  watch(ime, (val) => localStorage.setItem('user_ime', val))
  watch(prezime, (val) => localStorage.setItem('user_prezime', val))
  watch(tezina, (val) => localStorage.setItem('user_tezina', val))
  watch(visina, (val) => localStorage.setItem('user_visina', val))
  watch(godine, (val) => localStorage.setItem('user_godine', val))
  watch(treninziTjedno, (val) => localStorage.setItem('user_treninziTjedno', val))

    return { ime, prezime, tezina, visina, godine, treninziTjedno }
})
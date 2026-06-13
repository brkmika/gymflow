import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    
    const ime = ref('')
    const prezime = ref('')
    const tezina = ref(null)
    const visina = ref(null)
    const godine = ref(null)
    const treninziTjedno = ref(3)

    // treba spojiti sa profileView formom
    // trebam isto dodati localStorage da se podaci ne gube

    return { ime, prezime, tezina, visina, godine, treninziTjedno }
})
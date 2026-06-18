<template>
    <div class="home">
        <div class="header">
        <h1>GymFlow</h1>
        <p class="subtitle"> Vaš personalni trener u džepu</p>
    </div>

    <div class="quick-stats">
        <div class="stat-card">
            <span class="stat-number indigo">{{  treninziOvajMjesec }}</span>
            <span class="stat-label">Treninga ovaj mjesec </span>
        </div>
        <div class="stat-card">
            <span class="stat-number green">{{  bestOverload }}</span> 
            <span class="stat-label">Progressive Overload</span>
        </div>
        <div class="stat-card">
            <span class="stat-number purple">{{ tjedniCilj }}</span>
            <span class="stat-label">Tjedni cilj</span>
        </div>
    </div>


   <div class="menu-grid">
    <button class="menu-card" @click="navigate('profil')">
        <div class="menu-icon blue-bg">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
        <h3> Profil </h3>
        <p>Upravljajte svojim profilom i tjelesnim podacima</p>
    </button>


    <button class="menu-card" @click="navigate('ciljevi')">
        <div class="menu-icon green-bg">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>
        <h3> Ciljevi </h3>
        <p>Definirajte fitness ciljeve</p>
    </button>


    <button class="menu-card" @click="navigate('plan-treninga')">
        <div class="menu-icon purple-bg">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </div>
        <h3> Plan treninga </h3>
        <p>Tjedni plan i predlošci</p>
    </button>


    <button class="menu-card highlight" @click="navigate('logiraj-trening')">
        <div class="menu-icon white-bg">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 4v16m8-8H4" />
    </svg>
  </div>
        <h3> Logiraj trening </h3>
        <p>Unesite današnji trening</p>
    </button>


    <button class="menu-card" @click="navigate('napredak')">
        <div class="menu-icon orange-bg">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 
        0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 
        2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  </div>
        <h3> Napredak </h3>
        <p>Grafovi i statistika</p>
    </button>


    <button class="menu-card" @click="navigate('dnevnik')">
        <div class="menu-icon red-bg">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 
        18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 
        5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 
        0-3.332.477-4.5 1.253" />
    </svg>
  </div>
        <h3> Dnevnik </h3>
        <p>Povijest treninga</p>
    </button>

<!-- NOTES: !!!!!!-->
<!-- mozda bi isto bilo dobro da stavimo ovaj gymflow logo ipak skroz ljevo a ne u sredinu-->
<!-- Kada radimo view prozore nazovi ih ImeView.vue -->

   </div>
   </div>
</template>

<script setup>

// treba ispisati navigaciju na druge ekrane
// quick stats trebaju biti dinamicni

import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore'
import { computed } from 'vue'
import { useHistoryStore } from '@/stores/historyStore';

const router = useRouter()
const userStore = useUserStore()
const historyStore = useHistoryStore()

const navigate = (screen) => {
    router.push('/' + screen)
}

// tjedni cilj = koliko je odradeno
const tjedniCilj = computed(() => {
    if(!userStore.treninziTjedno) return '-'
    const odradeno = historyStore.getCurrentWeekWorkouts().length
    return `${odradeno}/${userStore.treninziTjedno}`
})

// broj treninga ovaj mjesec
const treninziOvajMjesec = computed(() => {
    const now = new Date()
    const mjesec = now.getMonth() + 1
    const godina = now.getFullYear()

    let count = 0
    for(let i = 0; i < historyStore.workoutHistory.length; i++) {
        const parts = historyStore.workoutHistory[i].date.split('.')
        if(Number(parts[1]) === mjesec && Number(parts[2]) === godina) {
            count++
        }
    }
    return count
})

// najbolji progressive overload % od compound vjezbi !!!!!!!!!!!!!!! Trebam vidjet dal je bolje tako ili uzet prosjek svega
const compoundExercises = ['Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Bent Over Row']

const bestOverload = computed(() => {
    let best = null

    for (let i = 0; i < compoundExercises.length; i++) {
        const result = historyStore.getExerciseProgress(compoundExercises[i])
        if(result && (best === null || Number(result.percent) > Number(best.percent))) {
            best = result
        }
    }

    if(!best) return '-'
    const prefix = best.percent > 0 ? '+' : ''
    return `${prefix}${best.percent}%`
})

</script>

<style scoped>
/* pozadina */
.home {
    min-height: 100vh;
    padding: 24px;
    background: linear-gradient(135deg, #eff6ff, #eef2ff);
}

/* naslov */
.header h1 {
    font-size: 40px;
    font-weight: 800;
    color: #1e1b4b;
    margin: 0;
}

.header p {
    color: #6b7280;
    margin: 4px 0 0;
}

/* stat kartice */
.quick-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
}

.stat-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
}

.stat-card span:first-child {
    font-size: 26px;
    font-weight: 700;
    color: #4f46e5
}

.stat-card span:last-child {
    font-size: 11px;
    color: #6b7280;
}

/* Menu card */
.menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.menu-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: none;
    cursor:pointer;
    text-align: left;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}


.menu-card:hover {
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}

.menu-card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 4px;
}

.menu-card p {
    font-size: 13px;
    color: #6b7280;
    margin: 0;
}

.menu-card.highlight h3 {
    color: white;
}

.menu-card.highlight p {
    color: #c7d2fe;
}

/* Ikone */
.menu-icon {
    width: 48px;
    height:48px;
    border-radius: 50%;
    display: flex;
    align-items:center;
    justify-content:center;
    margin-bottom: 12px;
}

.menu-icon svg {
    width: 24px;
    height: 24px;
}

/* boje za ikone */
.blue-bg {background: #dbeafe; }
.blue-bg svg {color: #2563eb;}

.green-bg {background: #dcfce7; }
.green-bg svg {color: #16a34a;}

.purple-bg {background: #f3e8ff; }
.purple-bg svg {color: #9333ea;}

.orange-bg {background: #ffedd5; }
.orange-bg svg {color: #ea580c;}

.red-bg {background: #fee2e2; }
.red-bg svg {color: #dc2626; }

.white-bg {background: rgba(255,255,255,0.2);}
.white-bg svg {color: white; }

/* gradient za logiraj trening */

.menu-card.highlight {
    background: linear-gradient(135deg, #4f46e5, #9333ea);
}

.menu-card.highlight h3 {
    color: white;
}

.menu-card.highlight p {
    color: #c7d2fe;
}

/* novi razmak izmedu naslova i botuna */

.header {
    margin-bottom: 32px;
}


</style>
<template>
    <div class="home">
        <div class="header">
        <h1>GymFlow</h1>
        <p class="subtitle"> Vaš personalni trener u džepu</p>
    </div>

    <div class="quick-stats">
        <div class="stat-card">
            <span class="stat-number indigo">12</span> <!-- OVO TREBA BITI DINAMICKI IZRACUNATO KASNIJE-->
            <span class="stat-label">Treninga ovaj mjesec </span>
        </div>
        <div class="stat-card">
            <span class="stat-number green">+8%</span> <!-- OVO ISTO TREBA BITI DINAMICKI IZRACUNATO KASNIJE-->
            <span class="stat-label">Progressive Overload</span>
        </div>
        <div class="stat-card">
            <span class="stat-number purple">4/5</span> <!-- OVO INTO TREBA BITI DINAMICKI IZRACUNATO KASNIJE-->
            <span class="stat-label">Tjedni cilj</span>
        </div>
    </div>

   <div class="menu-grid">
    <button @click="navigate('profil')">Profil</button>
    <button @click="navigate('ciljevi')">Ciljevi</button>
    <button @click="navigate('plan-treninga')">Plan treninga</button>
    <button @click="navigate('logiraj-trening')">Logiraj trening</button>
    <button @click="navigate('napredak')">Napredak</button>
    <button @click="navigate('dnevnik')">Dnevnik</button>
   </div>
   </div>
</template>

<script setup>

// treba ispisati navigaciju na druge ekrane
// quick stats trebaju biti dinamicni

import { useRouter } from 'vue-router';

const router = useRouter()

const navigate = (screen) => {
    router.push('/' + screen)
}

// spoji gumbe sa navigate


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

/* treba jos menu gumbe, pitaj AI */

</style>
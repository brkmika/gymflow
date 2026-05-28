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
    <button class="menu-card" @click="navigate('profil')">
        <h3> Profil </h3>
        <p>Upravljajte svojim profilom i tjelesnim podacima</p>
    </button>
    <button class="menu-card" @click="navigate('ciljevi')">
        <h3> Ciljevi </h3>
        <p>Definirajte fitness ciljeve</p>
    </button>
    <button class="menu-card" @click="navigate('plan-treninga')">
        <h3> Plan treninga </h3>
        <p>Tjedni plan i predlošci</p>
    </button>
    <button class="menu-card" @click="navigate('logiraj-trening')">
        <h3> Logiraj trening </h3>
        <p>Unesite današnji trening</p>
    </button>
    <button class="menu-card" @click="navigate('napredak')">
        <h3> Napredak </h3>
        <p>Grafovi i statistika</p>
    </button>
    <button class="menu-card" @click="navigate('dnevnik')">
        <h3> Dnevnik </h3>
        <p>Povijest treninga</p>
    </button>

<!-- trebamo jos dodati ikone na dugma i trebamo ovaj logiraj trening napravit u posebnoj boji-->
 <!-- mozda bi isto bilo dobro da stavimo ovaj gymflow logo ipak skroz ljevo a ne u sredinu-->
  <!-- I da mozda stavimo malo veci padding izmedu naslova i ovih dugma i stagod vec-->
   <!-- Nakon toga mozemo krenuti na routanje svakog dugma u svoj poseban tab i krenut radit funkcionalni dio-->

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


</style>
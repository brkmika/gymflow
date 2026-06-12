<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

// lista ciljeva - na pocetku ucitamo iz localStorage, a ako nema nista lista je prazna
const goals = ref(JSON.parse(localStorage.getItem('goals')) || []);

// kontrolira da li je forma vidljiva
const showForm = ref(false);

// podaci iz forme
const newGoal = ref({
    type: 'Povećanje snage',
    description: '',
    current: null,
    target: null,
    deadline: '',
});

// spremi listu u localStorage
const saveGoals = () => {
    localStorage.setItem('goals', JSON.stringify(goals.value));
};

// dodavanje novog cilja
const addGoal = () => {
    // jednostavna validacija
    if (!newGoal.value.description || !newGoal.value.current || !newGoal.value.target) {
        alert('Popunite sva polja!');
        return;
    }

    goals.value.push({
        id: Date.now(), // jedinstveni id
        type: newGoal.value.type,
        description: newGoal.value.description,
        current: Number(newGoal.value.current),
        target: Number(newGoal.value.target),
        deadline: newGoal.value.deadline,
    });

    saveGoals();

    // resetiraj formu i sakrij je
    newGoal.value = { type: 'Povećanje snage', description: '', current: null, target: null, deadline: '' };
    showForm.value = false;
};

// brisanje cilja
const deleteGoal = (id) => {
    goals.value = goals.value.filter(g => g.id !== id);
    saveGoals();
};

// izracun postotka za progress bar
const progress = (goal) => {
    let pct;
    if (goal.type === 'Smanjenje težine') {
        // kod smanjenja je cilj manji od trenutnog -> obrnuti omjer
        pct = (goal.target / goal.current) * 100;
    } else {
        pct = (goal.current / goal.target) * 100;
    }
    return Math.min(Math.round(pct), 100); // max 100%
};
</script>

<template>
    <div class="goals-view">
        <button class="back-btn" @click="router.push('/')">← Natrag</button>
        <h2>Moji ciljevi</h2>

        <!-- poruka kad nema ciljeva -->
        <p class="empty-msg" v-if="goals.length === 0">
            Još nemate nijedan cilj. Dodajte svoj prvi cilj!
        </p>

        <!-- lista ciljeva -->
        <div class="goal-card" v-for="goal in goals" :key="goal.id">
            <div class="goal-header">
                <div>
                    <h3>{{ goal.type }}</h3>
                    <p class="goal-desc">{{ goal.description }}</p>
                </div>
                <div class="goal-actions">
                    <span class="badge">Aktivan</span>
                    <button class="delete-btn" @click="deleteGoal(goal.id)">✕</button>
                </div>
            </div>

            <div class="goal-values">
                <span>Trenutno: {{ goal.current }}kg</span>
                <span>Cilj: {{ goal.target }}kg</span>
            </div>

            <div class="progress-bg">
                <div class="progress-fill"
                    :class="goal.type === 'Smanjenje težine' ? 'green' : 'indigo'"
                    :style="{ width: progress(goal) + '%' }">
                </div>
            </div>

            <p class="deadline">Rok: {{ goal.deadline || '-' }}</p>
        </div>

        <!-- gumb za otvaranje forme -->
        <button class="add-btn" @click="showForm = !showForm">
            {{ showForm ? 'Odustani' : '+ Dodaj novi cilj' }}
        </button>

        <!-- forma za novi cilj -->
        <div class="goal-form" v-if="showForm">
            <h3>Novi cilj</h3>

            <label>Tip cilja</label>
            <select v-model="newGoal.type">
                <option>Povećanje snage</option>
                <option>Smanjenje težine</option>
                <option>Povećanje mase</option>
            </select>

            <label>Opis</label>
            <input type="text" v-model="newGoal.description" placeholder="npr. Bench press 100kg" />

            <label>Trenutna vrijednost (kg)</label>
            <input type="number" v-model="newGoal.current" placeholder="npr. 85" />

            <label>Ciljna vrijednost (kg)</label>
            <input type="number" v-model="newGoal.target" placeholder="npr. 100" />

            <label>Rok (dd.mm.gggg)</label>
            <input type="text" v-model="newGoal.deadline" placeholder="npr. 30.06.2026" />

            <button class="save-btn" @click="addGoal">Spremi cilj</button>
        </div>
    </div>
</template>

<style scoped>
.goals-view {
    min-height: 100vh;
    padding: 24px;
    max-width: 700px;
    margin: 0 auto;
    text-align: left;
}

.back-btn {
    background: none;
    border: none;
    color: #4f46e5;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 16px;
    padding: 0;
    cursor: pointer;
}

h2 {
    font-size: 28px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 20px;
}

/* poruka kad je lista prazna */
.empty-msg {
    color: #6b7280;
    font-size: 14px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* kartica cilja */
.goal-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.goal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.goal-header h3 {
    font-size: 17px;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
}

.goal-desc {
    font-size: 13px;
    color: #6b7280;
    margin: 4px 0 0;
}

.goal-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.badge {
    background: #dcfce7;
    color: #16a34a;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 12px;
}

.delete-btn {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 14px;
}

.goal-values {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #6b7280;
    margin: 16px 0 6px;
}

/* progress bar */
.progress-bg {
    background: #e5e7eb;
    border-radius: 6px;
    height: 8px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 6px;
}

.progress-fill.indigo { background: #4f46e5; }
.progress-fill.green { background: #16a34a; }

.deadline {
    font-size: 12px;
    color: #9ca3af;
    margin: 8px 0 0;
}

/* gumb dodaj */
.add-btn {
    width: 100%;
    background: #4f46e5;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    margin-top: 8px;
}

.add-btn:hover {
    background: #4338ca;
}

/* forma */
.goal-form {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-top: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.goal-form h3 {
    margin: 0 0 12px;
    color: #1f2937;
}

.goal-form label {
    display: block;
    font-size: 13px;
    color: #6b7280;
    margin: 12px 0 4px;
}

.goal-form input,
.goal-form select {
    width: 100%;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
}

.save-btn {
    width: 100%;
    background: #16a34a;
    color: white;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    padding: 12px;
    margin-top: 16px;
    cursor: pointer;
}
</style>

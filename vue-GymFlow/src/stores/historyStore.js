// ovo je za spremanja treninga u local storage

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHistoryStore = defineStore('history', () => {
    const workoutHistory = ref(JSON.parse(localStorage.getItem('workout_history')) || [])

    const saveWorkout = (workoutName, day, exercises) => {
        const entry = {
            id: Date.now(),
            date: new Date().toLocaleDateString('hr-HR'),
            week: getWeekNumber(),
            year: new Date().getFullYear(),
            name: workoutName,
            day: day,
            exercises: exercises.map(e => ({
                name: e.name,
                sets: e.sets.map(s => ({ ...s }))
            }))
        }

        workoutHistory.value.push(entry)
        localStorage.setItem('workout_history', JSON.stringify(workoutHistory.value))
    }

    const getWeekNumber = () => {
        const date = new Date()
        const firstDay = new Date(date.getFullYear(), 0, 1)
        return Math.ceil((((date - firstDay) / 86400000) + firstDay.getDay() + 1) / 7)
    }

    //vraca treninge za trenutni tjedan
    const getCurrentWeekWorkouts = () => {
        const currentWeek = getWeekNumber()
        const currentYear = new Date().getFullYear()
        return workoutHistory.value.filter(
            w => w.week === currentWeek && w.year === currentYear
        )
    }

    //vracamo sve treninge za dnevnik
    const getAllWorkouts = () => {
        return [...workoutHistory.value].reverse()
    }

    // nadodat progressive overload algoritam ali to cu kasnije

    return { workoutHistory, saveWorkout, getCurrentWeekWorkouts, getAllWorkouts}
})
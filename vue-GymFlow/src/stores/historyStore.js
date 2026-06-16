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

    // ovo racuna ukupni volumen (suma weight x reps) za jedan trening
    const calculateWorkoutVolume = (workout) => {
        let total = 0;
        for (let i = 0; i < workout.exercises.length; i++){
            const exercise = workout.exercises[i]

            for(let j = 0; j < exercise.sets.length; j++){
                const set = exercise.sets[j]

                if(set.weight && set.reps) {
                    total = total + (Number(set.weight) * Number(set.reps))
                }
            }
        }
        return total
    }

    // vraca volumen po danu za graf
    const getVolumeHistory = () => {
        return workoutHistory.value.map(w => ({
            date: w.date,
            volume: calculateWorkoutVolume(w)
        }))
    }

    //vraca volumen grupiran po mjesecima za zadnjih N mjeseci
    const getMonthlyVolume = (numMonths) => {
  const monthNames = ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro']

  const today = new Date()
  const months = []

  // pripremi prazne mjesece od najstarijeg do najnovijeg
  for (let i = numMonths - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
    months.push({
      label: monthNames[d.getMonth()],
      year: d.getFullYear(),
      month: d.getMonth(),
      volume: 0
    })
  }

  // prolazimo kroz sve mjesece i dodajemo volumen u odgovarajuci mjesec
  for (let i = 0; i < workoutHistory.value.length; i++) {
    const workout = workoutHistory.value[i]
    const parts = workout.date.split('.')
    const workoutDay = Number(parts[0])
    const workoutMonth = Number(parts[1]) - 1
    const workoutYear = Number(parts[2])

    for (let j = 0; j < months.length; j++) {
      if (months[j].month === workoutMonth && months[j].year === workoutYear) {
        months[j].volume += calculateWorkoutVolume(workout)
      }
    }
  }

  return months
}

    return { workoutHistory, saveWorkout, getCurrentWeekWorkouts, getAllWorkouts, getVolumeHistory, getMonthlyVolume}
})
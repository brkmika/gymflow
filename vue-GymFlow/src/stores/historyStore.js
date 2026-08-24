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

  const months = []
  const now = new Date()

  for (let i = numMonths - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({
      label: monthNames[d.getMonth()],
      year: d.getFullYear(),
      month: d.getMonth(),
      volume: 0
    })
  }

  for (let i = 0; i < workoutHistory.value.length; i++) {
    const workout = workoutHistory.value[i]
    const parts = workout.date.split('.')
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

const isDayCompletedThisWeek = (dayName) => {
    const currentWeekWorkouts = getCurrentWeekWorkouts()

    for(let i = 0; i < currentWeekWorkouts.length; i++){
        if (currentWeekWorkouts[i].day === dayName) {
            return true
        }
    }

    return false
}

// pronalazi najvecu tezinu za odredenu vjezbu u jednom treningu
const getMaxWeightForExercise = (workout, exerciseName) => {
    let maxWeight = 0

    for(let i = 0; i < workout.exercises.length; i++){
        if (workout.exercises[i].name === exerciseName) {
            for(let j = 0; j < workout.exercises[i].sets.length; j++){
                const w = Number(workout.exercises[i].sets[j].weight)
                if (w > maxWeight) {
                    maxWeight = w
                }
            }
        }
    }

    return maxWeight
}

//racuna progresiu za odredjenu vjezbu i usporeduje prvi i zadnji put
const getExerciseProgress = (exerciseName) => {
    let firstWeight = null
    let lastWeight = null
    
    for(let i = 0; i < workoutHistory.value.length; i++){
        const workout = workoutHistory.value[i]
        const weight = getMaxWeightForExercise(workout, exerciseName)

        if(weight > 0) {
            if(firstWeight === null) {
                firstWeight = weight
            }
            lastWeight = weight
        }
    }

    if(firstWeight === null || lastWeight === null){
        return null
    }

    const percentChange = ((lastWeight - firstWeight) / firstWeight) * 100

    return {
        name: exerciseName,
        first: firstWeight,
        last: lastWeight,
        percent: percentChange.toFixed(1)
    }
}
// vraca max tezinu za vjezbu iz POSLJEDNJEG spremljenog treninga (za progressive overload)
const getLastWeightForExercise = (exerciseName) => {
    for (let i = workoutHistory.value.length - 1; i >= 0; i--) {
        const w = getMaxWeightForExercise(workoutHistory.value[i], exerciseName)
        if (w > 0) return w
    }
    return null
}


    return { workoutHistory, saveWorkout, getCurrentWeekWorkouts, getAllWorkouts, getVolumeHistory, getMonthlyVolume, isDayCompletedThisWeek, getExerciseProgress, getLastWeightForExercise}
})
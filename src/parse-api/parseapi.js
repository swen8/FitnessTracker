import Parse from 'parse/react-native';

export const addNewTraining = async ({name, exercises}) => {
    const Training = Parse.Object.extend("Training");
    
    const training = new Training();
    training.set("name", name);
    
    let trainingResult
    try {
        trainingResult = await training.save()
        //alert('New object created with objectId: ' + result.id);
    } catch(error) {
        alert('Failed to create new training, with error code: ' + error.message);
        return;
    }


    //Exercises
    const Exercise = Parse.Object.extend("Exercise");

    exercises.forEach((exerciseData, index) => addNexExercise(Exercise, trainingResult, exerciseData, index))
} 

const addNexExercise = async (Exercise, trainingResult, exerciseData, index) => {
    const exercise = new Exercise()
    exercise.set("number", index)
    exercise.set("name", exerciseData.name)
    exercise.set("type", exerciseData.type)
    exercise.set("sets", selectValidSets(exerciseData.sets, exerciseData.type))
    exercise.set("training", trainingResult)

    console.log(`save exercise: ${exerciseData.name}`)
    try {
        let exerciseResult = await exercise.save()
        console.log(exerciseResult.id)
        //alert('New object created with objectId: ' + result.id);
    } catch(error) {
        alert('Failed to create new exercise, with error code: ' + error.message);
    }
}

const selectValidSets = (sets, type) => {
    if(type === 'reps') {
        return sets.filter(set => set.reps !== undefined)
    }

    return sets
}
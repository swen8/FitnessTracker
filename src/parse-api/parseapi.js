import Parse from 'parse/react-native';

export const saveNewTraining = async ({name, exercises}) => {
    const Training = Parse.Object.extend("Training");
    
    const training = new Training();
    training.set("name", name);
    
    let trainingResult
    try {
        trainingResult = await training.save()
        //alert('New object created with objectId: ' + result.id);
    } catch(error) {
        alert('Failed to create new object, with error code: ' + error.message);
    }

    //Exercises
    const Exercise = Parse.Object.extend("Exercise");

    exercises.forEach(async function(exerciseData, index) {
        const exercise = new Exercise()
        exercise.set("number", index)
        exercise.set("name", exerciseData.name)
        exercise.set("type", exerciseData.type)
        exercise.set("sets", exerciseData.sets)
        exercise.set("training", trainingResult)

        try {
            let exerciseResult = await exercise.save()
            console.log(exerciseResult.id)
            //alert('New object created with objectId: ' + result.id);
        } catch(error) {
            alert('Failed to create new object, with error code: ' + error.message);
        }
    })

} 
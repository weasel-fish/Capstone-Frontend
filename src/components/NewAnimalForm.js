
function NewAnimalForm({animForm, handleAnimChange}) {

    return (
        <>
            <label>Common Name: <input type='text' name='common_name' onChange={handleAnimChange} value={animForm.common_name}></input></label>
            <label>Scientific Name: <input type='text' name='scientific_name' onChange={handleAnimChange} value={animForm.scientific_name}></input></label>
            <label>Description: <input type='text' name='description' onChange={handleAnimChange} value={animForm.description}></input></label>
        </>
    )
}

export default NewAnimalForm
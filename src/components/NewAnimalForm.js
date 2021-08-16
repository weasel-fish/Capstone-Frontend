
function NewAnimalForm({animForm, handleAnimChange}) {

    return (
        <>
            <label>Common Name:</label>
            <input type='text' name='common_name' onChange={handleAnimChange} value={animForm.common_name}></input>
            <label>Scientific Name:</label>
            <input type='text' name='scientific_name' onChange={handleAnimChange} value={animForm.scientific_name}></input>
            <label>Description:</label>
            <input type='text' name='description' onChange={handleAnimChange} value={animForm.description}></input>
        </>
    )
}

export default NewAnimalForm
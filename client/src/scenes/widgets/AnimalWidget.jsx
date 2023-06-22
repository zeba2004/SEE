import React, { useState } from 'react';

const AnimalWidget = () => {
  const [animals, setAnimals] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [lifespan, setLifespan] = useState(''); // Added lifespan state
  const [editingIndex, setEditingIndex] = useState(-1);
  const [yearsAfter, setYearsAfter] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleLifespanChange = (event) => { // Added lifespan event handler
    setLifespan(event.target.value);
  };

  const handleYearsAfterChange = (event) => {
    setYearsAfter(parseInt(event.target.value));
  };

  const handleAddAnimal = () => {
    const newAnimal = { name, age, lifespan }; // Added lifespan
    setAnimals([...animals, newAnimal]);
    setName('');
    setAge('');
    setLifespan(''); // Reset lifespan
  };

  const handleEditAnimal = (index) => {
    const animalToEdit = animals[index];
    setName(animalToEdit.name);
    setAge(animalToEdit.age);
    setLifespan(animalToEdit.lifespan); // Set lifespan
    setEditingIndex(index);
  };

  const handleUpdateAnimal = () => {
    const updatedAnimals = [...animals];
    updatedAnimals[editingIndex] = { name, age, lifespan }; // Updated lifespan
    setAnimals(updatedAnimals);
    setName('');
    setAge('');
    setLifespan(''); // Reset lifespan
    setEditingIndex(-1);
  };

  const handleDeleteAnimal = (index) => {
    const updatedAnimals = [...animals];
    updatedAnimals.splice(index, 1);
    setAnimals(updatedAnimals);
  };

  const calculateAliveAnimals = () => {
    const currentYear = new Date().getFullYear();
    let aliveCount = 0;
  
    animals.forEach((animal) => {
      const remainingYears = parseInt(animal.lifespan) - parseInt(animal.age);
  
      if (remainingYears >= yearsAfter) {
        aliveCount++;
      }
    });
  
    return aliveCount;
  };
  

  return (
    <div>
      <h2>Animal Widget</h2>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
        <input type="text" placeholder="Age" value={age} onChange={handleAgeChange} />
        <input type="text" placeholder="Lifespan" value={lifespan} onChange={handleLifespanChange} />
        {editingIndex === -1 ? (
          <button onClick={handleAddAnimal}>Add Animal</button>
        ) : (
          <button onClick={handleUpdateAnimal}>Update Animal</button>
        )}
      </div>
      <div>
        <input
          type="number"
          placeholder="Years After"
          value={yearsAfter}
          onChange={handleYearsAfterChange}
        />
      </div>
      <ul>
        {animals.map((animal, index) => (
          <li key={index}>
            {animal.name} - {animal.age} - {animal.lifespan}
            <button onClick={() => handleEditAnimal(index)}>Edit</button>
            <button onClick={() => handleDeleteAnimal(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <p>Number of animals alive after {yearsAfter} years: {calculateAliveAnimals()}</p>
      </div>
    </div>
  );
};

export default AnimalWidget;

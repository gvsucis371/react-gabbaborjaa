import './index.css';
import { useState } from "react";

const data = [
  { hero: "Iron Man", name: "Tony Stark" },
  { hero: "Captain America", name: "Steve Rogers" },
  { hero: "Spider-Man", name: "Peter Parker" },
  { hero: "Winter Soldier", name: "Bucky Barnes" },
  { hero: "Hulk", name: "Bruce Banner" },
];

function Hero({ hero, name, onUpdate, onDelete }) {
  return (
    <div className="hero-wrapper">
      <h2>Hero: {hero}</h2>
      <p>Name: {name}</p>
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

function HeroForm({ onSubmit }) {
  const [hero, setHero] = useState({ hero: "", name: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(hero);
    setHero({ hero: "", name: "" }); // Reset form after submission
  };

  return (
    <form className="hero-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Hero Name"
        value={hero.hero}
        onChange={(e) => setHero({ ...hero, hero: e.target.value })}
      />
      <input
        type="text"
        placeholder="Real Name"
        value={hero.name}
        onChange={(e) => setHero({ ...hero, name: e.target.value })}
      />
      <button type="submit">Add Hero</button>
    </form>
  );
}

function Marvel() {
  const [heroes, setHeroes] = useState(data);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ hero: "", name: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setFormData(heroes[index]);
  };

  const updateHero = (e) => {
    e.preventDefault();
    const updatedHeroes = [...heroes];
    updatedHeroes[editingIndex] = formData;
    setHeroes(updatedHeroes);
    setEditingIndex(null);
    setFormData({ hero: "", name: "" });
  };

  const addHero = (newHero) => {
    setHeroes([...heroes, newHero]);
  };

  const deleteHero = (index) => {
    const updatedHeroes = heroes.filter((_, i) => i !== index);
    setHeroes(updatedHeroes);
  };

  return (
    <>
      <section>
        <div>
          <h1>Welcome to Marvel Heroes</h1>
          <p>This is a simple React app to showcase Marvel heroes.</p>
        </div>
      </section>
      <section>
        <HeroForm onSubmit={addHero} />
      </section>
      <section className="heros-container">
        {heroes.map((hero, index) => (
          <Hero
            key={index}
            hero={hero.hero}
            name={hero.name}
            onUpdate={() => startEditing(index)}
            onDelete={() => deleteHero(index)}
          />
        ))}
      </section>
      {editingIndex !== null && (
        <form onSubmit={updateHero}>
          <h3>Update Hero</h3>
          <input
            type="text"
            name="hero"
            value={formData.hero}
            onChange={handleInputChange}
            placeholder="Hero Name"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Real Name"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingIndex(null)}>
            Cancel
          </button>
        </form>
      )}
    </>
  );
}

export default Marvel;
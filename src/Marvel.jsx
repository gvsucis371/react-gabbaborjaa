import { useState, useEffect } from "react";
import "./Marvel.css";
import { db } from "./firebase-config"; 
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"; 

function Hero({ hero, name, onUpdate, onDelete }) {
  return (
    <div className="hero-wrapper">
      <h2>{hero}</h2>
      <p>{name}</p>
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

function HeroForm({ onSubmit }) {
  const [hero, setHero] = useState({ hero: "", name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(hero);
    setHero({ hero: "", name: "" });
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
  const [heroes, setHeroes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ hero: "", name: "" });

  useEffect(() => {
    const fetchHeroes = async () => {
      const heroesCollection = collection(db, "heroes");
      const querySnapshot = await getDocs(heroesCollection);
      setHeroes(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchHeroes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setFormData(heroes[index]);
  };

  const updateHero = async (e) => {
    e.preventDefault();

    const heroesCollection = collection(db, "heroes");
    const heroDoc = doc(heroesCollection, heroes[editingIndex].id); 
    await updateDoc(heroDoc, { hero: formData.hero, name: formData.name });

    const updatedHeroes = [...heroes];
    updatedHeroes[editingIndex] = formData;
    setHeroes(updatedHeroes);
    setEditingIndex(null);
    setFormData({ hero: "", name: "" });
  };

  const addHero = async (newHero) => {
    const heroesCollection = collection(db, "heroes");
    await addDoc(heroesCollection, newHero);

    const querySnapshot = await getDocs(heroesCollection);
    setHeroes(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const deleteHero = async (index) => {
    const heroesCollection = collection(db, "heroes");
    const heroDoc = doc(heroesCollection, heroes[index].id); 
    await deleteDoc(heroDoc);

    const querySnapshot = await getDocs(heroesCollection);
    setHeroes(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
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
            key={hero.id}
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
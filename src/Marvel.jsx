import './App.css'

const data = [{
    hero: "Iron Man",
    name: "Tony Stark",
    apperances: [
        { movie: "Iron Man", year: 2008},
        { movie: "The Incredible Hulk", year: 2008},
        { movie: "Iron Man 2", year: 2010},
        { movie: "Avengers", year: 2012}
    ]
},
{
    hero: "Captain America",
    name: "Steve Rogers",
    apperances: [
        { movie: "Captain America: The First Avenger", year: 2011 },
        { movie: "Avengers", year: 2012 },
        { movie: "Captain America: The Winter Soldier", year: 2014 },
        { movie: "Captain America: Civil War", year: 2016 }
    ]
},
{
    hero: "Spider-Man",
    name: "Peter Parker",
    apperances: [
        { movie: "Spider-Man: Homecoming", year: 2017 },
        { movie: "Avengers: Infinity War", year: 2018 },
        { movie: "Spider-Man: Far From Home", year: 2019 },
        { movie: "Spider-Man: No Way Home", year: 2021 }
    ]
}]
function Appearances(props)  {
    return <li> {props.movie} ({props.year}) </li>;
}

function AppearanceList(props){
    return (
        <ul className="appearance">
            {props.appearance.map((item, index) => (
                <Appearances movie={item.movie} year={item.year} key={index} />
            ))}
        </ul>
    );
}
function Hero(props){
    return (
        <div> 
            <h2><b>{props.hero} </b></h2>
            <h3>{props.name}</h3>
            <AppearanceList appearance={props.appearances} />
        </div>
    )
}

function Marvel(props) {
    return (
        <>
        <section>
            <div class="opening-text">
                <h1>Welcome to Marvel Heroes</h1>
                <p>This is a simple React app to showcase Marvel heroes.</p>
            </div>
        </section>
        <section>
            {data.map((hero, index) => (
                <Hero
                    key={index}
                    hero={hero.hero}
                    name={hero.name}
                    appearances={hero.apperances}
                />
            ))}
        </section>
        </>
    );
}   
export default Marvel;
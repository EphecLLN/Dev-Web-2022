import React from "react"

const About = () => {
  return <>
    <div style={{
      display:"flex",
      flexDirection: "column",
      color:"black",
      width: "50%",
      height: "100%",
    }}>
      < div style={{
      // eslint-disable-next-line max-len
        backgroundImage: "url('https://cdn.pixabay.com/photo/2020/01/30/06/38/given-4804499__340.jpg')",
        flex:"1",
      }}>
        <div>
          <h1>Qui sommes nous?</h1>
          <p>Nous sommes des étudiants en bac 2 en informatique à 
            l&apos;EPHEC.</p>
        </div>
        <div style={{maxwidth: "50%",}}>
          <h1>Pourquoi faire ce projet</h1>
          <p>
        Pour notre cours de développement informatique,
        nous avons dû trouver un client afin de
        réaliser un projet pour celui-ci. le notre était Fanny.
        Celle-ci souhaitait un site pour faire un jeu de rôle en ligne
        dans lequel tout est pris en compte 
        sans dépendre d&apos;autres logiciels externes
          </p>
        </div>
        <div>
          <h1>Lien vers notre wiki github</h1>
          <a
            // eslint-disable-next-line max-len
            href="https://austreelis.github.io/WebsiteWhereYouAreTheHero/wiki/accueil.html">
          wiki github</a>
        </div>
      </div>
    </div></>
}

export default About

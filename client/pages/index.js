import React from "react"

const Home = () => {
  return (
    <div style={{ width: "50%"}}>
      <div>
        <h1>Comment créer un scénario?</h1>
        <p>
        Rendez-vous dans l&apos;interface de création.
        Cliquer sur une node. Vous accèderez à l&apos;interface de la node.
        Cette node représente un choix durant le scénario.
        Vous pouvez y mettre d&apos;autres choix,
        les nodes seront créées et vous verrez les liens entre elles.
        Lorsque vous voulez terminer le scénario,
        vous mettez dans la dernière case 0.
        </p>
      </div>
      <div>
        <h1>Règles du jeu de rôle</h1>
        <p>
          Pour jouer au jeu, veillez à ce que un scénario soit déja là.
          Vous pouvez le voir dans play
          lorsque tout ceux avec qui vous voulez
          jouer ont rejoins le chat en ligne,
          vous pourrez clicker sur le bouton en-dessous
          afin de savoir quel scénario vous souhaitez jouer.
          Ensuite, lorsque tout le monde a voté,
          le scénario se lance et vous ne devez plus que profiter de la partie.
        </p>
      </div>
    </div>
  )
}

export default Home

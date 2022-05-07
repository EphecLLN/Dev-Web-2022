import React from "react"

export const Inventory = ({inv, setInv}) => { 
  return <details className="dropdown col-2">
    <summary className="button is-full-width">inventory</summary>
    <div className="card is-full-width">
      {inv.map(({ id, objet, nom}, i) => (
        <p key={i+1}><a id={id} title={objet} onClick={(_event) => {
          setInv(inv.filter(del => del.id != id))
        }}>
          {nom}</a>
        </p>
      ))}
    </div>
  </details>
}

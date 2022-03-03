import React from 'react'
import { useState } from 'react'

export default function AddDish() {
  const [name, setName] = useState('')
  // const [image, setImage] = useState('')
  const [origin, setOrigin] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [location, setLocation] = useState('')

  return (
    <>
      <form onSubmit='{handleSubmit}'>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='enter dish name'
        />
        <input
          type='text'
          id='origin'
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder='food origin'
        />

        <input
          type='text'
          id='ingredient'
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <select
          name='location'
          id='location'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        >
          <option value=''>enter location</option>
          <option value='west-kreuz'>West-kreuz</option>
          <option value='Lichtenberg'>Lichtenberg</option>
          <option value='Gesundbrunnen'>Gesundbrunnen</option>
          <option value='pankow'>Pankow</option>
          <option value='mitte'>Mitte</option>
          <option value='Wansee'>Wansee</option>
        </select>

        {/* <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
      </form>
    </>
  )
}

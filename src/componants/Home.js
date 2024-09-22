import React from 'react'
import cms from '../cms.png'

function Home() {



  return (
    <div className='page'>
      <div className="part1">
        <h1>Smart Contact Management System</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore recusandae nemo harum quos ipsam a ut atque cupiditate distinctio! Natus quidem iure, cumque quod magnam corporis sequi delectus deserunt optio.
        Minus ad nulla nostrum omnis quos! Sapiente ut architecto nihil, iure vel, a placeat inventore in aspernatur, quisquam necessitatibus blanditiis voluptatum optio minus. Beatae, fuga alias minima id repellat cum.</p>
      </div>
      <div className="part2">
        <img src={cms} alt="img"  />
      </div>
    </div>
  )
}

export default Home

import React from 'react'

const PersonForm = ({submitHandler, nameOnChangeHandler, numberOnChangeHandler}) => (
    <form onSubmit={submitHandler}>
    <div>
        name: <input onChange={nameOnChangeHandler}/>
      </div>
      <div>
        number: <input onChange={numberOnChangeHandler}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
)

export default PersonForm
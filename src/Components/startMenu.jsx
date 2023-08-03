import { useState } from 'react'

function StartMenu(props) {
    const [difficulty, setDifficulty] = useState("easy")
    const [category, setCategory] = useState(27)

    return (
        <div className='flex h-[100%] w-[100%] justify-center'> 
            <div className="bg-base-300 h-max w-96 m-auto rounded-lg shadow-lg">
                <h1 className="text-5xl text-center font-bold m-5">Quizzical</h1>
                <p className="text-sm text-center m-5">Select a category and difficulty to start a trivial quiz regarding your choices.</p>

                <div className="h-max w-max m-auto">
                    <select 
                        className="select select-primary m-2"
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option disabled>Category</option>
                        <option value={27} >Animals</option>
                        <option value={28} >Vehicles</option>
                        <option value={18} >Computers</option>
                        <option value={24} >Politics</option>
                        <option value={15} >Video Games</option>
                        <option value={21} >Sports</option>
                    </select>
                </div>

                <div className="h-max w-max m-auto">
                    <select 
                        className="select select-primary m-2"
                        onChange={(event) => setDifficulty(event.target.value)}
                    >
                        <option disabled>Difficulty</option>
                        <option value="easy" >Easy</option>
                        <option value="medium" >Medium</option>
                        <option value="hard" >Hard</option>
                    </select>
                </div>

                <div className="flex justify-center mx-auto m-2 w-max h-max">
                    <button onClick={() => {
                        props.setQuiz({
                            difficulty,
                            category  
                        })
                    }} 

                    className="btn btn-primary m-5">Start Game</button>
                </div>
            </div>
        </div>

    )
    
}

export default StartMenu
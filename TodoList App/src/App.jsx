import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { v4 as uuidv4 } from 'uuid'; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState('')
  const [todoArray, setTodoArray] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    const getData = localStorage.getItem('items')
    if (getData) {
      let parsedData = JSON.parse(getData)
      setTodoArray(parsedData)
    }
    // console.log(getData)
  }, [])


  function saveToLS() {
    localStorage.setItem('items', JSON.stringify(todoArray))
  }



  function handleChange(e) {

    const newTodo = e.target.value
    setTodo(newTodo)
    // // console.log(newTodo)
    saveToLS()
  }

  function handleAdd() {

    if (todo != "") {

      const newTodoArray = [...todoArray, { id: uuidv4(), todo, isCompleted: false }]
      setTodoArray(newTodoArray)

      // console.log(newTodoArray)
      setTodo("")

    }
    else {
      alert("Please write a todo📝")
    }

  }

  function handleCheckbox(e) {

    const todoId = e.target.id
    // console.log(todoId)

    const todoIndex = todoArray.findIndex((item) => {
      return item.id === todoId;
    })

    const checkTodo = [...todoArray]

    checkTodo[todoIndex].isCompleted = !checkTodo[todoIndex].isCompleted
    setTodoArray(checkTodo)
    // console.log(todoArray)
    saveToLS()
  }

  function handleEdit(e, id) {

    const t = todoArray.filter(item => {
      return item.id === id
    })
    setTodo(t[0].todo)

    const newTodo = todoArray.filter(item => {
      return item.id !== id;
    })

    setTodoArray(newTodo)
    // console.log(newTodo)
    saveToLS()
  }

  function handleDelete(e, id, todo) {

    const todoId = id
    // console.log(todoId)

    let deleteConsent = confirm(`⚠️ Do you really want to delete this todo: "${todo}" ?`)

    if (deleteConsent) {

      const newTodo = todoArray.filter(item => {
        return item.id !== id;
      })

      setTodoArray(newTodo)
      // console.log(newTodo)
      saveToLS()
      // alert(`"Todo deleted 🗑️✅`)
    }
  }


  function toggleFinished(e) {
    setshowFinished(!showFinished)
  }



  return (
    <div className='m-0 p-0 h-screen bg-emerald-100 [&_button]:text-white [&_button]:text-shadow-xs [&_button]:shadow-sm'>

      <Navbar />

      {/* Container */}
      <div className="flex justify-center m-4 [&_button]:cursor-pointer ">
        <div className="p-4 w-[90vw] md:w-[80vw] min-h-[80vh] bg-emerald-500 rounded-xl">

          {/* Add todo */}
          <div className="flex flex-col p-4 bg-emerald-100 rounded-2xl">
            <h2 className='text-lg font-bold'>Add a todo</h2>
            <div className='flex'>
              <input className="min-w-[75%] md:w-1/2 bg-emerald-50 rounded-lg px-2 md:pb-1 my-2" type="text" name="todo" id="todo" placeholder='my todo' onChange={handleChange} value={todo} />
              <button className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-400 rounded-lg font-[600] px-3 py-1 m-2" onClick={handleAdd}>Save</button>
            </div>
          </div>

          {/* Show finished */}
          <div className='flex gap-2 items-center my-2 mx-4 text-white'>
            <input className='cursor-pointer min-h-full' type="checkbox" name="showFinished" id="showFinished" onChange={toggleFinished} defaultChecked={showFinished} />
            <label htmlFor='showFinished' className='font-semibold text-shadow-sm'>Show finished</label>
          </div>

          {/* Todos */}
          <div className='flex flex-col mt-2 min-w-1/2 p-4 bg-emerald-100 rounded-2xl'>
            <h2 className='text-lg font-bold'>Your todos</h2>

            {todoArray.length == 0 ? <div>No todos to display</div> : ""}

            {todoArray.map((items) => (

              (showFinished || !items.isCompleted) &&
              <div key={items.id} className="flex items-center my-1 ">

                <input className='cursor-pointer' onClick={handleCheckbox} type="checkbox" name="checkbox" id={items.id} value={items.isCompleted} defaultChecked={items.isCompleted ? true : false} />

                <div className="w-4/5 md:w-1/3 ml-4 md:pb-1 wrap-anywhere">
                  <span className={items.isCompleted ? "line-through" : ""}>
                    {items.todo}
                  </span>

                </div>

                <div className="flex gap-2 mx-2">
                  <button className="bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-300 rounded-lg font-[600] px-2 md:px-3 py-1" onClick={(e) => { handleEdit(e, items.id) }}>
                    <span className='block md:hidden'><FaEdit size={22} /></span>
                    <span className='hidden md:block'>Edit</span>
                  </button>
                  <button className="bg-red-400 hover:bg-red-500 active:bg-red-300 rounded-lg font-[600] px-2 md:px-3 py-1" onClick={(e) => { handleDelete(e, items.id, items.todo) }}>
                    <span className='block md:hidden'><MdDelete size={22} /></span>
                    <span className='hidden md:block'>Delete</span>

                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div >
  )
}

export default App

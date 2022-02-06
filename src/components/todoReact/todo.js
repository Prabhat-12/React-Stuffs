import React, {useState, useEffect} from 'react';
import "./style.css"

// get the localStorage data
const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");

    if(lists) {
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // addItem Fumction
    const addItem= () =>{
         if(!inputData){
             alert("plz fill the data")
         }
         else if(inputData && toggleButton){
             setItems(
                 items.map((currElement) => {
                     if(currElement.id === isEditItem){
                         return{...currElement, name:inputData}
                     }
                     return currElement;
                 })
                 )
            
            setInputData("")
            setIsEditItem(null)
            setToggleButton(false)
                }
         else{
             const myNewInputData = {
                 id: new Date().getTime().toString(),
                 name: inputData,
             }
             setItems([...items, myNewInputData])
             setInputData("")
         }
    }

    //editItem function
    const editItem = (index) => {
        const item_todo_edited = items.find((currElement) =>{
            return currElement.id === index;
        });
        setInputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }

    // DeleteItem function
    const deleteItem = (index) => {
        const updateItem = items.filter((currElement) =>{
            return currElement.id !== index;
        });
        setItems(updateItem)
    };

    //removeAll the elements
    const removeAll = () => {
        setItems([]);
    }

    //adding items to local storage
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items))
    }, [items])

  return (
      <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todoList.png" alt="todoLogo" />
                    <figcaption>Add Your List Here</figcaption>
                </figure>
                <div className="additems">
                    <input 
                        type="text" 
                        placeholder='📝Add Item' 
                        className='form-control' 
                        value={inputData}
                        onChange={(event)=> setInputData(event.target.value)}
                         />
                        {toggleButton ? 
                            (<i className="far fa-edit add-btn" onClick={addItem}></i>)
                            : 
                            (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
                        }
                </div>
                {/* show our Items */}
                    <div className="showItems">
                        {items.map((currElement) => {
                            return(
                                <div className="eachItem" key={currElement.id}>
                                <h3>{currElement.name}</h3>
                                <div className="todo-btn">
                                <i className="far fa-edit add-btn" 
                                 onClick={()=> editItem(currElement.id)}></i>
                                <i className="far fa-trash-alt add-btn" 
                                 onClick={() => deleteItem(currElement.id)}></i>
                                </div>
                            </div>
                            );
                        })}
                    </div>

                {/* remove all buttons */}
                <div className="showItem">
                    <button 
                        className="btn effect04" 
                        data-sm-link-text='Remove All'
                        onClick={removeAll}>
                      <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
      </>
  );
};

export default Todo;

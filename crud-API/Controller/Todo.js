const Todo = require("../Model/Todo");


// const getTodos = (req, res) => {
//     Todo.find((err, todos) => {
//         if (err) {
//           res.send(err);
//         }

//         res.json(todos);
//       });
//   };

  // Controller function to get all todo items
async function getTodos(req, res) {
    try {
      // Retrieve all todo items from the database using the Todo model
      const todos = await Todo.find();
  
      // Return the todo items as the response
      res.json(todos);
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
//   async function createTodo(req, res) {
//     try {
//       // Extract the todo item details from the request body
//       const { title, description } = req.body;
  
//       // Create a new todo object using the Todo model
//       const newTodo = new Todo({
//         title,
//         description
//       });
  
//       // Save the new todo in the database
//       const createdTodo = await newTodo.save();
  
//       // Return the newly created todo as the response
//       res.status(201).json(createdTodo);
//     } catch (error) {
//       // Handle any errors that occur during the creation process
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
  
const createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
          });
        
          const saveTodo = await todo.save();
          res.status(200).json({message:'todo is saved successfuly.'})
    } catch (error) {
        console.error('Error creating todo:', err);
        res.status(500).json({ error: 'Failed to create todo' });
    }
  
  };

const updateTodo = async (req,res)=>{
  try {
    const{id}=req.params;
    const {title,description,completed}=req.body;

    // Find todo item by id
    const todo =await Todo.findById(id);

    if(!todo){
      return res.status(404).json({error:'Todo not found'});

    }

    // Update the todo fields

    todo.title =title || todo.title;
    todo.description=description || todo.description;
    todo.completed=completed || todo.completed;

    // Save the updated todo item
    const updateTodo =await todo.save();
    res.json(updateTodo);
    
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({error:'Internal server error'});
    
  }
}

// delete the specific note.

const deleteTodo= async (req,res)=>{
  try {
    const{id}=req.params;
    const todo =await Todo.findByIdAndDelete(id);

    if(!todo){
      return res.status(404).json({error:'Todo not found'});

    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    
  }
}

  
  
module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };

  
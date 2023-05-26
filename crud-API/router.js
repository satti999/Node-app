const router = require("express").Router();
//const { getTodos } = require("./Controller/Todo");
const { getTodos, createTodo,updateTodo,deleteTodo} = require("./Controller/Todo");

router.get("/todos", getTodos);
router.put("/todas/:todoID",updateTodo);
router.put('/todos/:id',);
router.delete('/todos/:id',deleteTodo);
router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});
router.post("/todos", createTodo);

module.exports = router;
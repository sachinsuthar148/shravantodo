const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const todo = new Todo({
      user: req.user._id,
      title,
      description,
    });

    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const todos = await Todo.find({ user: req.user._id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Todo.countDocuments({ user: req.user._id });

    res.json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo && todo.user.toString() === req.user._id.toString()) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

exports.updateTodo = async (req, res) => {
  const { title, description, isFavorite } = req.body;

  const todo = await Todo.findById(req.params.id);

  if (todo && todo.user.toString() === req.user._id.toString()) {
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.isFavorite = isFavorite !== undefined ? isFavorite : todo.isFavorite;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo && todo.user.toString() === req.user._id.toString()) {
    await todo.remove();
    res.json({ message: 'Todo removed' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

exports.searchTodos = async (req, res) => {
  const { search } = req.query;
  const { page = 1, limit = 10 } = req.query;

  try {
    const todos = await Todo.find({
      user: req.user._id,
      title: { $regex: search, $options: 'i' },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Todo.countDocuments({
      user: req.user._id,
      title: { $regex: search, $options: 'i' },
    });

    res.json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

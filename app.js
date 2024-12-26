const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let employees = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index', { employees });
});

app.get('/add', (req, res) => {
    res.render('addEmployee');
});

app.post('/add', (req, res) => {
    const { name, designation, location, salary } = req.body;
    employees.push({ id: Date.now(), name, designation, location, salary });
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
    res.redirect('/');
});

app.post('/update/:id', (req, res) => {
    const { name, designation, location, salary } = req.body;
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        employee.name = name;
        employee.designation = designation;
        employee.location = location;
        employee.salary = salary;
    }
    res.redirect('/');
});

// Start Server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));

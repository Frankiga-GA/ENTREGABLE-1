const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/database');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/img/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', (req, res) => {
    res.render('inicio');
});

router.get('/catalogo', (req, res) => {
    db.query('SELECT * FROM productos', (err, productos) => {
        if (err) throw err;
        res.render('catalogo', { productos });
    });
});

router.get('/create', (req, res) => {
    db.query('SELECT * FROM categorias', (err, categorias) => {
        if (err) throw err;
        res.render('create', { categorias });
    });
});

router.post('/create', upload.fields([{ name: 'imagen1' }, { name: 'imagen2' }]), (req, res) => {
    const { idcategoria, nombre, descripcion, precio, stock } = req.body;
    const imagen1 = req.files['imagen1'] ? req.files['imagen1'][0].filename : null;
    const imagen2 = req.files['imagen2'] ? req.files['imagen2'][0].filename : null;

    db.query(
        'INSERT INTO productos (idcategoria, nombre, descripcion, precio, stock, imagen1, imagen2) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [idcategoria, nombre, descripcion, precio, stock, imagen1, imagen2],
        (err, result) => {
            if (err) throw err;
            res.redirect('/catalogo');
        }
    );
});

router.get('/eliminar/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM productos WHERE idproducto = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/catalogo');
    });
});
// Mostrar formulario para editar producto
router.get('/editar/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM productos WHERE idproducto = ?', [id], (err, productos) => {
        if (err) throw err;
        db.query('SELECT * FROM categorias', (err, categorias) => {
            if (err) throw err;
            res.render('editar', { producto: productos[0], categorias });
        });
    });
});

// Guardar cambios de edición
router.post('/editar/:id', upload.fields([{ name: 'imagen1' }, { name: 'imagen2' }]), (req, res) => {
    const id = req.params.id;
    const { idcategoria, nombre, descripcion, precio, stock } = req.body;
    const imagen1 = req.files['imagen1'] ? req.files['imagen1'][0].filename : req.body.imagen1_actual;
    const imagen2 = req.files['imagen2'] ? req.files['imagen2'][0].filename : req.body.imagen2_actual;

    db.query(
        'UPDATE productos SET idcategoria=?, nombre=?, descripcion=?, precio=?, stock=?, imagen1=?, imagen2=? WHERE idproducto=?',
        [idcategoria, nombre, descripcion, precio, stock, imagen1, imagen2, id],
        (err, result) => {
            if (err) throw err;
            res.redirect('/catalogo');
        }
    );
});


module.exports = router;
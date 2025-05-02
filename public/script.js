
document.addEventListener("DOMContentLoaded", () => {
    // Botón Eliminar ya lo tienes...

    // Nuevo: Botón Editar
    document.querySelectorAll(".btn-editar").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const nombre = button.getAttribute("data-nombre");

            Swal.fire({
                title: 'Editar producto',
                text: `¿Deseas editar el producto "${nombre}"?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí, editar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `/editar/${id}`;
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".btn-eliminar").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const nombre = button.getAttribute("data-nombre");

            Swal.fire({
                title: '¿Estás seguro?',
                text: `Eliminarás el producto "${nombre}". ¡Esta acción no se puede revertir!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `/eliminar/${id}`;
                }
            });
        });
    });
});


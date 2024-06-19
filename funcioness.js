import { getAllData, getDocumento, remove, save, update } from './firestore.js';

let id = 0;

document.getElementById('btnSave').addEventListener('click', async (event) => {
    event.preventDefault();

    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });

    if (document.querySelectorAll('.is-invalid').length === 0) {
        const emp = {
            run: document.getElementById('idJugador').value.trim(),
            nom: document.getElementById('nombre').value.trim(),
            rol: document.getElementById('rol').value.trim(),
            country: document.getElementById('country').value.trim(),
            fecha: document.getElementById('fecha').value.trim(),
            email: document.getElementById('email').value.trim(),
            fono: document.getElementById('fono').value.trim()
        };

        // Verifica si el ID de jugador ya existe
        const exists = await checkIfIdExists(emp.run);
        if (exists && id === 0) {
            Swal.fire('Error', 'El ID de jugador ya existe', 'error');
            return;
        }

        if (id === 0) {
            save(emp)
                .then(() => {
                    Swal.fire('Guardado', '', 'success');
                    limpiar();
                    cargarDatos(); // Recargar datos después de guardar
                    limpiar()
                })
        } else {
            update(id, emp)
                .then(() => {
                    Swal.fire('Actualizado', '', 'success');
                    limpiar();
                    cargarDatos(); // Recargar datos después de actualizar
                })
                .catch((error) => {
                    console.error('Error al actualizar el documento: ', error);
                    Swal.fire('Error', 'No se pudo actualizar el documento', 'error');
                });
            id = 0;
        }
    }
});

async function checkIfIdExists(run) {
    const data = await getAllData();
    for (const doc of data) {
        const item = doc.data();
        if (item.run === run) {
            return true;
        }
    }
    return false;
}

window.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
});

async function cargarDatos() {
    const datos = await getAllData();
    let tabla = '';
    datos.forEach((emp) => {
        const item = emp.data();
        tabla += `<tr>
            <td>${item.run}</td>
            <td>${item.nom}</td>
            <td>${item.rol}</td>
            <td>${item.country}</td>
            <td>${item.fecha}</td>
            <td>${item.email}</td>
            <td>${item.fono}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${emp.id}-edit">Editar</button>
                <button class="btn btn-danger" id="${emp.id}-delete">Eliminar</button>
            </td>
        </tr>`;
    });
    document.getElementById('contenido').innerHTML = tabla;

    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', () => {
            Swal.fire({
                title: "¿Estás seguro de eliminar el registro?",
                text: "No podrás revertir los cambios",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Eliminar"
            }).then((result) => {
                if (result.isConfirmed) {
                    const docId = btn.id.replace('-delete', '');
                    remove(docId)
                        .then(() => {
                            Swal.fire('Eliminado!', 'Su registro ha sido eliminado', 'success');
                            cargarDatos(); // Recargar datos después de eliminar
                        })
                        .catch((error) => {
                            console.error('Error al eliminar el documento: ', error);
                            Swal.fire('Error', 'No se pudo eliminar el documento', 'error');
                        });
                }
            });
        });
    });

    document.querySelectorAll('.btn-warning').forEach(btn => {
        btn.addEventListener('click', async () => {
            const docId = btn.id.replace('-edit', '');
            const doc = await getDocumento(docId);
            const emp = doc.data();

            document.getElementById('idJugador').value = emp.run;
            document.getElementById('nombre').value = emp.nom;
            document.getElementById('rol').value = emp.rol;
            document.getElementById('country').value = emp.country;
            document.getElementById('fecha').value = emp.fecha;
            document.getElementById('email').value = emp.email;
            document.getElementById('fono').value = emp.fono;

            id = docId;
            document.getElementById('idJugador').readOnly = true;
            document.getElementById('btnSave').value = 'Editar';
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
    // Declarar las variables feather, loadSidebar y loadHeader
    const feather = window.feather; // Asumiendo que feather está disponible globalmente
    const loadSidebar = () => { console.log('loadSidebar function called'); }; // Reemplazar con la implementación real
    const loadHeader = () => { console.log('loadHeader function called'); }; // Reemplazar con la implementación real

    // Inicializar los iconos de Feather
    feather.replace();
    
    // Cargar el sidebar y el header
    loadSidebar();
    loadHeader();
    
    // Referencias a elementos del DOM
    const usersTableBody = document.getElementById('users-table-body');
    const searchInput = document.getElementById('search-users');
    const filterRole = document.getElementById('filter-role');
    const usersPerPage = document.getElementById('users-per-page');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const paginationNumbers = document.getElementById('pagination-numbers');
    const showingFrom = document.getElementById('showing-from');
    const showingTo = document.getElementById('showing-to');
    const totalUsers = document.getElementById('total-users');
    const selectAllCheckbox = document.getElementById('select-all-users');
    const deleteSelectedBtn = document.getElementById('delete-selected-btn');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    
    // Referencias al modal
    const userModal = document.getElementById('user-modal');
    const modalTitle = document.getElementById('modal-title');
    const userForm = document.getElementById('user-form');
    const userId = document.getElementById('user-id');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userRole = document.getElementById('user-role');
    const userPassword = document.getElementById('user-password');
    const passwordFields = document.getElementById('password-fields');
    const userStatus = document.getElementById('user-status');
    const addUserBtn = document.getElementById('add-user-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const saveUserBtn = document.getElementById('save-user-btn');
    
    // Estado de la aplicación
    let users = [];
    let filteredUsers = [];
    let currentPage = 1;
    let itemsPerPage = 10;
    let selectedUsers = new Set();
    
    
    
    // Cargar datos de usuarios (simulado)
    function loadUsers() {
        // Verificar si hay usuarios en localStorage
        const storedUsers = localStorage.getItem('users');
        
        if (storedUsers) {
            users = JSON.parse(storedUsers);
        } else {
            // Datos de ejemplo
            users = [
                {
                    id: '1',
                    name: 'Admin Usuario',
                    email: 'admin@ejemplo.com',
                    role: 'admin',
                    status: 'active',
                    lastLogin: '2023-05-01T10:30:00',
                    permissions: {
                        viewCameras: true,
                        manageCameras: true,
                        viewRecordings: true,
                        manageUsers: true,
                        systemSettings: true
                    }
                },
                {
                    id: '2',
                    name: 'Operador Ejemplo',
                    email: 'operador@ejemplo.com',
                    role: 'operator',
                    status: 'active',
                    lastLogin: '2023-05-01T09:15:00',
                    permissions: {
                        viewCameras: true,
                        manageCameras: true,
                        viewRecordings: true,
                        manageUsers: false,
                        systemSettings: false
                    }
                },
                {
                    id: '3',
                    name: 'Visualizador Demo',
                    email: 'visualizador@ejemplo.com',
                    role: 'viewer',
                    status: 'active',
                    lastLogin: '2023-04-30T14:20:00',
                    permissions: {
                        viewCameras: true,
                        manageCameras: false,
                        viewRecordings: true,
                        manageUsers: false,
                        systemSettings: false
                    }
                },
                {
                    id: '4',
                    name: 'Usuario Inactivo',
                    email: 'inactivo@ejemplo.com',
                    role: 'viewer',
                    status: 'inactive',
                    lastLogin: '2023-04-15T11:45:00',
                    permissions: {
                        viewCameras: true,
                        manageCameras: false,
                        viewRecordings: false,
                        manageUsers: false,
                        systemSettings: false
                    }
                }
            ];
            
            // Guardar en localStorage
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Aplicar filtros iniciales
        applyFilters();
    }
    
    // Aplicar filtros y búsqueda
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const roleFilter = filterRole.value;
        
        filteredUsers = users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                                 user.email.toLowerCase().includes(searchTerm);
            
            const matchesRole = roleFilter === '' || user.role === roleFilter;
            
            return matchesSearch && matchesRole;
        });
        
        // Actualizar la paginación
        updatePagination();
        
        // Renderizar la tabla
        renderUsersTable();
    }
    
    // Actualizar la paginación
    function updatePagination() {
        const totalItems = filteredUsers.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        // Asegurarse de que la página actual es válida
        if (currentPage > totalPages) {
            currentPage = totalPages || 1;
        }
        
        // Actualizar información de paginación
        const from = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
        const to = Math.min(currentPage * itemsPerPage, totalItems);
        
        showingFrom.textContent = from;
        showingTo.textContent = to;
        totalUsers.textContent = totalItems;
        
        // Habilitar/deshabilitar botones de navegación
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        // Generar números de página
        paginationNumbers.innerHTML = '';
        
        // Limitar el número de páginas mostradas
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-number ${i === currentPage ? 'pagination-active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                applyFilters();
            });
            
            paginationNumbers.appendChild(pageBtn);
        }
    }
    
    // Renderizar la tabla de usuarios
    function renderUsersTable() {
        usersTableBody.innerHTML = '';
        
        // Obtener los usuarios para la página actual
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedUsers = filteredUsers.slice(start, end);
        
        if (paginatedUsers.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No se encontraron usuarios
                </td>
            `;
            usersTableBody.appendChild(emptyRow);
            return;
        }
        
        paginatedUsers.forEach(user => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 dark:hover:bg-gray-700';
            
            // Formatear la fecha de último acceso
            const lastLogin = new Date(user.lastLogin);
            const formattedDate = lastLogin.toLocaleDateString() + ' ' + lastLogin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Verificar si el usuario está seleccionado
            const isSelected = selectedUsers.has(user.id);
            
            row.innerHTML = `
                <td class="table-cell">
                    <input type="checkbox" class="form-checkbox user-checkbox" data-user-id="${user.id}" ${isSelected ? 'checked' : ''}>
                </td>
                <td class="table-cell">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <span class="text-lg font-medium text-gray-600 dark:text-gray-300">${user.name.charAt(0)}</span>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900 dark:text-white">${user.name}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td class="table-cell">
                    <span class="role-badge ${user.role === 'admin' ? 'role-admin' : user.role === 'operator' ? 'role-operator' : 'role-viewer'}">
                        ${user.role === 'admin' ? 'Administrador' : user.role === 'operator' ? 'Operador' : 'Visualizador'}
                    </span>
                </td>
                <td class="table-cell">
                    <span class="status-badge ${user.status === 'active' ? 'status-active' : 'status-inactive'}">
                        ${user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td class="table-cell">
                    ${formattedDate}
                </td>
                <td class="table-cell">
                    <div class="flex items-center space-x-2">
                        <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 edit-user-btn" data-user-id="${user.id}">
                            <i data-feather="edit" class="w-4 h-4"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 delete-user-btn" data-user-id="${user.id}">
                            <i data-feather="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </td>
            `;
            
            usersTableBody.appendChild(row);
        });
        
        // Reinicializar los iconos de Feather
        feather.replace();
        
        // Agregar event listeners a los checkboxes
        document.querySelectorAll('.user-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const userId = this.getAttribute('data-user-id');
                
                if (this.checked) {
                    selectedUsers.add(userId);
                } else {
                    selectedUsers.delete(userId);
                }
                
                updateDeleteButton();
            });
        });
        
        // Agregar event listeners a los botones de editar
        document.querySelectorAll('.edit-user-btn').forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                editUser(userId);
            });
        });
        
        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.delete-user-btn').forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                deleteUser(userId);
            });
        });
    }
    
    // Actualizar el estado del botón de eliminar seleccionados
    function updateDeleteButton() {
        deleteSelectedBtn.disabled = selectedUsers.size === 0;
    }
    
    // Abrir el modal para agregar un nuevo usuario
    function openAddUserModal() {
        modalTitle.textContent = 'Agregar Usuario';
        userForm.reset();
        userId.value = '';
        passwordFields.style.display = 'block';
        userPassword.required = true;
        
        // Establecer permisos predeterminados según el rol
        userRole.addEventListener('change', updatePermissionsByRole);
        
        userModal.classList.remove('hidden');
    }
    
    // Abrir el modal para editar un usuario existente
    function editUser(id) {
        const user = users.find(u => u.id === id);
        
        if (!user) return;
        
        modalTitle.textContent = 'Editar Usuario';
        userId.value = user.id;
        userName.value = user.name;
        userEmail.value = user.email;
        userRole.value = user.role;
        userStatus.value = user.status;
        
        // La contraseña no se muestra al editar
        passwordFields.style.display = 'none';
        userPassword.required = false;
        
        // Establecer permisos
        document.getElementById('perm-view-cameras').checked = user.permissions.viewCameras;
        document.getElementById('perm-manage-cameras').checked = user.permissions.manageCameras;
        document.getElementById('perm-view-recordings').checked = user.permissions.viewRecordings;
        document.getElementById('perm-manage-users').checked = user.permissions.manageUsers;
        document.getElementById('perm-system-settings').checked = user.permissions.systemSettings;
        
        userModal.classList.remove('hidden');
    }
    
    // Actualizar permisos según el rol seleccionado
    function updatePermissionsByRole() {
        const role = userRole.value;
        
        // Restablecer todos los permisos
        document.getElementById('perm-view-cameras').checked = false;
        document.getElementById('perm-manage-cameras').checked = false;
        document.getElementById('perm-view-recordings').checked = false;
        document.getElementById('perm-manage-users').checked = false;
        document.getElementById('perm-system-settings').checked = false;
        
        // Establecer permisos según el rol
        if (role === 'admin') {
            document.getElementById('perm-view-cameras').checked = true;
            document.getElementById('perm-manage-cameras').checked = true;
            document.getElementById('perm-view-recordings').checked = true;
            document.getElementById('perm-manage-users').checked = true;
            document.getElementById('perm-system-settings').checked = true;
        } else if (role === 'operator') {
            document.getElementById('perm-view-cameras').checked = true;
            document.getElementById('perm-manage-cameras').checked = true;
            document.getElementById('perm-view-recordings').checked = true;
        } else if (role === 'viewer') {
            document.getElementById('perm-view-cameras').checked = true;
            document.getElementById('perm-view-recordings').checked = true;
        }
    }
    
    // Guardar un usuario (nuevo o editado)
    function saveUser() {
        // Validar el formulario
        if (!userForm.checkValidity()) {
            userForm.reportValidity();
            return;
        }
        
        // Obtener los valores del formulario
        const id = userId.value || Date.now().toString();
        const name = userName.value;
        const email = userEmail.value;
        const role = userRole.value;
        const status = userStatus.value;
        const password = userPassword.value;
        
        // Obtener los permisos
        const permissions = {
            viewCameras: document.getElementById('perm-view-cameras').checked,
            manageCameras: document.getElementById('perm-manage-cameras').checked,
            viewRecordings: document.getElementById('perm-view-recordings').checked,
            manageUsers: document.getElementById('perm-manage-users').checked,
            systemSettings: document.getElementById('perm-system-settings').checked
        };
        
        // Crear o actualizar el usuario
        if (userId.value) {
            // Actualizar usuario existente
            const index = users.findIndex(u => u.id === id);
            
            if (index !== -1) {
                users[index] = {
                    ...users[index],
                    name,
                    email,
                    role,
                    status,
                    permissions
                };
                
                showToast('Usuario actualizado correctamente', 'success');
            }
        } else {
            // Crear nuevo usuario
            const newUser = {
                id,
                name,
                email,
                role,
                status,
                lastLogin: new Date().toISOString(),
                permissions
            };
            
            users.push(newUser);
            showToast('Usuario creado correctamente', 'success');
        }
        
        // Guardar en localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Cerrar el modal
        closeModal();
        
        // Actualizar la tabla
        applyFilters();
    }
    
    // Eliminar un usuario
    function deleteUser(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            // Eliminar el usuario del array
            users = users.filter(user => user.id !== id);
            
            // Eliminar de los seleccionados
            selectedUsers.delete(id);
            
            // Guardar en localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            // Actualizar la tabla
            applyFilters();
            
            // Actualizar el botón de eliminar
            updateDeleteButton();
            
            showToast('Usuario eliminado correctamente', 'success');
        }
    }
    
    // Eliminar usuarios seleccionados
    function deleteSelectedUsers() {
        if (selectedUsers.size === 0) return;
        
        if (confirm(`¿Estás seguro de que deseas eliminar ${selectedUsers.size} usuario(s)?`)) {
            // Eliminar los usuarios seleccionados
            users = users.filter(user => !selectedUsers.has(user.id));
            
            // Guardar en localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            // Limpiar selección
            selectedUsers.clear();
            
            // Actualizar la tabla
            applyFilters();
            
            // Actualizar el botón de eliminar
            updateDeleteButton();
            
            showToast('Usuarios eliminados correctamente', 'success');
        }
    }
    
    // Cerrar el modal
    function closeModal() {
        userModal.classList.add('hidden');
    }
    
    // Exportar a CSV
    function exportToCsv() {
        // Crear el contenido CSV
        let csvContent = 'ID,Nombre,Email,Rol,Estado,Último Acceso\n';
        
        filteredUsers.forEach(user => {
            const lastLogin = new Date(user.lastLogin);
            const formattedDate = lastLogin.toLocaleDateString() + ' ' + lastLogin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            csvContent += `${user.id},"${user.name}","${user.email}","${user.role}","${user.status}","${formattedDate}"\n`;
        });
        
        // Crear un blob y descargar
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'usuarios.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Exportar a PDF (simulado)
    function exportToPdf() {
        alert('Esta funcionalidad estaría disponible en un entorno de producción.');
    }
    
    // Función para mostrar notificaciones toast
    function showToast(message, type = 'info') {
        // Crear el elemento toast
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-y-20 opacity-0`;
        
        // Aplicar estilos según el tipo
        switch (type) {
            case 'success':
                toast.classList.add('bg-green-500', 'text-white');
                break;
            case 'error':
                toast.classList.add('bg-red-500', 'text-white');
                break;
            case 'warning':
                toast.classList.add('bg-yellow-500', 'text-white');
                break;
            default:
                toast.classList.add('bg-blue-500', 'text-white');
        }
        
        // Agregar el mensaje
        toast.innerHTML = message;
        
        // Agregar al DOM
        document.body.appendChild(toast);
        
        // Mostrar con animación
        setTimeout(() => {
            toast.classList.remove('translate-y-20', 'opacity-0');
        }, 10);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            
            // Eliminar del DOM después de la animación
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Event Listeners
    
    // Búsqueda y filtros
    searchInput.addEventListener('input', applyFilters);
    filterRole.addEventListener('change', applyFilters);
    
    // Cambiar items por página
    usersPerPage.addEventListener('change', function() {
        itemsPerPage = parseInt(this.value);
        currentPage = 1;
        applyFilters();
    });
    
    // Navegación de páginas
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            applyFilters();
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            applyFilters();
        }
    });
    
    // Seleccionar todos los usuarios
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.user-checkbox');
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
            
            const userId = checkbox.getAttribute('data-user-id');
            
            if (this.checked) {
                selectedUsers.add(userId);
            } else {
                selectedUsers.delete(userId);
            }
        });
        
        updateDeleteButton();
    });
    
    // Botón de eliminar seleccionados
    deleteSelectedBtn.addEventListener('click', deleteSelectedUsers);
    
    // Botones de exportar
    exportCsvBtn.addEventListener('click', exportToCsv);
    exportPdfBtn.addEventListener('click', exportToPdf);
    
    // Modal
    addUserBtn.addEventListener('click', openAddUserModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    saveUserBtn.addEventListener('click', saveUser);
    
    // Cerrar el modal al hacer clic en el overlay
    userModal.addEventListener('click', function(e) {
        if (e.target === userModal) {
            closeModal();
        }
    });
    
    // Inicializar
    loadUsers();
});
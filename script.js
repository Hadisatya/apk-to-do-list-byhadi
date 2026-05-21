// ==================== DATABASE HELPER ====================
    const USERS_KEY = 'productivity_users';
    const SESSION_KEY = 'current_user';

    function getUsers() {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : [];
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function getCurrentUser() {
        const user = localStorage.getItem(SESSION_KEY);
        return user ? JSON.parse(user) : null;
    }

    // ==================== ROUTING SEDERHANA ====================
    let currentPage = 'home'; // home, login, register, dashboard

    function navigateTo(page) {
        currentPage = page;
        renderApp();
    }

    // ==================== RENDER MAIN APP ====================
    function renderApp() {
        const app = document.getElementById('app');
        
        if (currentPage === 'home') {
            app.innerHTML = renderHome();
            attachHomeEvents();
        } else if (currentPage === 'login') {
            app.innerHTML = renderLogin();
            attachLoginEvents();
        } else if (currentPage === 'register') {
            app.innerHTML = renderRegister();
            attachRegisterEvents();
        } else if (currentPage === 'dashboard') {
            const user = getCurrentUser();
            if (!user) {
                navigateTo('login');
                return;
            }
            app.innerHTML = renderDashboard();
            attachDashboardEvents();
        }
    }

    // ==================== HALAMAN HOME ====================
    function renderHome() {
        return `
            <nav class="navbar">
                <div class="container">
                    <div class="logo">
                        <i class="fas fa-brain"></i> Hadi-Produkvitas
                    </div>
                    <ul class="nav-links">
                        <li><a href="#" onclick="navigateTo('home')">Beranda</a></li>
                        <li><a href="#" onclick="navigateTo('login')">Masuk</a></li>
                        <li><a href="#" onclick="navigateTo('register')" class="btn-outline">Daftar</a></li>
                    </ul>
                </div>
            </nav>
            <header class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1>Produktivitas Tanpa Batas</h1>
                        <p>Atur tugas, catatan, dan target harianmu dalam satu platform modern. Gratis selamanya.</p>
                        <div class="hero-buttons">
                            <a href="#" onclick="navigateTo('register')" class="btn-primary">Mulai Sekarang <i class="fas fa-arrow-right"></i></a>
                            <a href="#" onclick="navigateTo('login')" class="btn-secondary">Sudah punya akun?</a>
                        </div>
                    </div>
                    <div class="hero-image">
                        <i class="fas fa-tasks fa-6x"></i>
                    </div>
                </div>
            </header>
            <section class="features">
                <div class="container">
                    <h2>Fitur Canggih</h2>
                    <div class="feature-grid">
                        <div class="feature-card">
                            <i class="fas fa-list-check fa-3x"></i>
                            <h3>To-Do List Pintar</h3>
                            <p>Buat, edit, dan selesaikan tugas dengan prioritas & deadline.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-note-sticky fa-3x"></i>
                            <h3>Catatan Pribadi</h3>
                            <p>Simpan ide penting dengan editor teks kaya.</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-chart-line fa-3x"></i>
                            <h3>Statistik Harian</h3>
                            <p>Lihat progress produktivitasmu dalam grafik.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function attachHomeEvents() {}

    // ==================== HALAMAN LOGIN ====================
    function renderLogin() {
        return `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <i class="fas fa-brain fa-2x"></i>
                        <h2>Selamat Datang Kembali</h2>
                        <p>Masuk ke akun Hadi-Produkvitas Anda</p>
                    </div>
                    <form id="loginForm">
                        <div class="input-group">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="loginEmail" placeholder="Alamat Email" required>
                        </div>
                        <div class="input-group">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="loginPassword" placeholder="Kata Sandi" required>
                        </div>
                        <button type="submit" class="btn-auth">Masuk <i class="fas fa-sign-in-alt"></i></button>
                    </form>
                    <p class="auth-footer">Belum punya akun? <a href="#" onclick="navigateTo('register')">Daftar sekarang</a></p>
                    <div id="loginMessage" class="message"></div>
                </div>
            </div>
        `;
    }

    function attachLoginEvents() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value.trim();
                const password = document.getElementById('loginPassword').value;
                const messageDiv = document.getElementById('loginMessage');

                const users = getUsers();
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email }));
                    messageDiv.innerHTML = '<div class="message" style="background:#d4f8e8;color:#27ae60;">Login berhasil! Mengarahkan...</div>';
                    setTimeout(() => navigateTo('dashboard'), 1000);
                } else {
                    messageDiv.innerHTML = '<div class="message" style="background:#fee;color:#e74c3c;">Email atau password salah!</div>';
                }
            });
        }
    }

    // ==================== HALAMAN REGISTER ====================
    function renderRegister() {
        return `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <i class="fas fa-user-plus fa-2x"></i>
                        <h2>Buat Akun Baru</h2>
                        <p>Mulai perjalanan produktivitas Anda</p>
                    </div>
                    <form id="registerForm">
                        <div class="input-group">
                            <i class="fas fa-user"></i>
                            <input type="text" id="regName" placeholder="Nama Lengkap" required>
                        </div>
                        <div class="input-group">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="regEmail" placeholder="Alamat Email" required>
                        </div>
                        <div class="input-group">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="regPassword" placeholder="Kata Sandi (min. 6 karakter)" required>
                        </div>
                        <button type="submit" class="btn-auth">Daftar <i class="fas fa-user-check"></i></button>
                    </form>
                    <p class="auth-footer">Sudah punya akun? <a href="#" onclick="navigateTo('login')">Masuk disini</a></p>
                    <div id="registerMessage" class="message"></div>
                </div>
            </div>
        `;
    }

    function attachRegisterEvents() {
        const form = document.getElementById('registerForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('regName').value.trim();
                const email = document.getElementById('regEmail').value.trim();
                const password = document.getElementById('regPassword').value;
                const messageDiv = document.getElementById('registerMessage');

                if (!name || !email || !password) {
                    messageDiv.innerHTML = '<div class="message" style="background:#fee;color:#e74c3c;">Semua field harus diisi!</div>';
                    return;
                }

                if (password.length < 6) {
                    messageDiv.innerHTML = '<div class="message" style="background:#fee;color:#e74c3c;">Password minimal 6 karakter!</div>';
                    return;
                }

                let users = getUsers();
                if (users.find(u => u.email === email)) {
                    messageDiv.innerHTML = '<div class="message" style="background:#fee;color:#e74c3c;">Email sudah terdaftar!</div>';
                    return;
                }

                const newUser = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    password: password,
                    tasks: [],
                    notes: []
                };
                users.push(newUser);
                saveUsers(users);
                messageDiv.innerHTML = '<div class="message" style="background:#d4f8e8;color:#27ae60;">Pendaftaran berhasil! Silakan login.</div>';
                setTimeout(() => navigateTo('login'), 1500);
            });
        }
    }

    // ==================== HALAMAN DASHBOARD ====================
    let dashboardState = {
        userData: null,
        currentFilter: 'all',
        editingTaskId: null,
        editingNoteId: null,
        currentTab: 'tasks'
    };

    function loadUserDataForDashboard() {
        const currentUser = getCurrentUser();
        if (!currentUser) return null;
        const users = getUsers();
        const user = users.find(u => u.id === currentUser.id);
        if (user) {
            if (!user.tasks) user.tasks = [];
            if (!user.notes) user.notes = [];
            return user;
        }
        return null;
    }

    function saveUserDataForDashboard(userData) {
        const users = getUsers();
        const index = users.findIndex(u => u.id === userData.id);
        if (index !== -1) {
            users[index] = userData;
            saveUsers(users);
        }
    }

    function renderDashboard() {
        const currentUser = getCurrentUser();
        return `
            <div class="dashboard-container">
                <aside class="sidebar">
                    <div class="sidebar-header">
                        <i class="fas fa-brain"></i>
                        <span>ProductivityHub</span>
                    </div>
                    <nav class="sidebar-nav">
                        <div class="nav-item ${dashboardState.currentTab === 'tasks' ? 'active' : ''}" data-tab="tasks">
                            <i class="fas fa-tasks"></i> Tugas Saya
                        </div>
                        <div class="nav-item ${dashboardState.currentTab === 'notes' ? 'active' : ''}" data-tab="notes">
                            <i class="fas fa-edit"></i> Catatan
                        </div>
                        <div class="nav-item ${dashboardState.currentTab === 'stats' ? 'active' : ''}" data-tab="stats">
                            <i class="fas fa-chart-simple"></i> Statistik
                        </div>
                        <div class="nav-item logout" id="logoutBtn">
                            <i class="fas fa-sign-out-alt"></i> Keluar
                        </div>
                    </nav>
                    <div class="user-info">
                        <i class="fas fa-user-circle"></i> ${escapeHtml(currentUser?.name || 'User')}
                    </div>
                </aside>
                <main class="main-content">
                    <div class="tab-content" id="tasksTab" style="${dashboardState.currentTab === 'tasks' ? '' : 'display:none'}">
                        <div class="tasks-header">
                            <h2><i class="fas fa-list-check"></i> Daftar Tugas</h2>
                            <button id="addTaskBtn" class="btn-primary-small"><i class="fas fa-plus"></i> Tugas Baru</button>
                        </div>
                        <div class="task-filters">
                            <button class="filter-btn ${dashboardState.currentFilter === 'all' ? 'active' : ''}" data-filter="all">Semua</button>
                            <button class="filter-btn ${dashboardState.currentFilter === 'pending' ? 'active' : ''}" data-filter="pending">Belum</button>
                            <button class="filter-btn ${dashboardState.currentFilter === 'completed' ? 'active' : ''}" data-filter="completed">Selesai</button>
                        </div>
                        <div id="tasksList" class="tasks-list"></div>
                    </div>

                    <div class="tab-content" id="notesTab" style="${dashboardState.currentTab === 'notes' ? '' : 'display:none'}">
                        <div class="notes-header">
                            <h2><i class="fas fa-note-sticky"></i> Catatan Penting</h2>
                            <button id="addNoteBtn" class="btn-primary-small"><i class="fas fa-plus"></i> Catatan Baru</button>
                        </div>
                        <div id="notesList" class="notes-list"></div>
                    </div>

                    <div class="tab-content" id="statsTab" style="${dashboardState.currentTab === 'stats' ? '' : 'display:none'}">
                        <h2><i class="fas fa-chart-line"></i> Statistik Produktivitas</h2>
                        <div class="stats-card">
                            <div class="stat-item">
                                <span>Total Tugas:</span>
                                <strong id="totalTasks">0</strong>
                            </div>
                            <div class="stat-item">
                                <span>Tugas Selesai:</span>
                                <strong id="completedTasks">0</strong>
                            </div>
                            <div class="stat-item">
                                <span>Persentase:</span>
                                <strong id="completionRate">0%</strong>
                            </div>
                            <div class="progress-bar">
                                <div id="progressFill" class="progress-fill"></div>
                            </div>
                        </div>
                        <div class="stats-card">
                            <h3>Jumlah Catatan</h3>
                            <div class="stat-item">
                                <span>Total Catatan:</span>
                                <strong id="totalNotes">0</strong>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <!-- Modal Tugas -->
            <div id="taskModal" class="modal hidden">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3 id="taskModalTitle">Tambah Tugas</h3>
                    <input type="text" id="taskTitle" placeholder="Judul tugas" autocomplete="off">
                    <textarea id="taskDesc" placeholder="Deskripsi (opsional)"></textarea>
                    <select id="taskPriority">
                        <option value="Rendah">🟢 Prioritas Rendah</option>
                        <option value="Sedang" selected>🟡 Prioritas Sedang</option>
                        <option value="Tinggi">🔴 Prioritas Tinggi</option>
                    </select>
                    <input type="date" id="taskDeadline">
                    <button id="saveTaskBtn" class="btn-primary">Simpan Tugas</button>
                </div>
            </div>

            <!-- Modal Catatan -->
            <div id="noteModal" class="modal hidden">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3 id="noteModalTitle">Tambah Catatan</h3>
                    <input type="text" id="noteTitle" placeholder="Judul catatan" autocomplete="off">
                    <textarea id="noteContent" placeholder="Isi catatan ..." rows="5"></textarea>
                    <button id="saveNoteBtn" class="btn-primary">Simpan Catatan</button>
                </div>
            </div>
        `;
    }

    function attachDashboardEvents() {
        let userData = loadUserDataForDashboard();
        if (!userData) {
            navigateTo('login');
            return;
        }

        function refreshTasks() {
            let filteredTasks = [...userData.tasks];
            if (dashboardState.currentFilter === 'pending') filteredTasks = filteredTasks.filter(t => !t.completed);
            if (dashboardState.currentFilter === 'completed') filteredTasks = filteredTasks.filter(t => t.completed);
            
            const tasksList = document.getElementById('tasksList');
            if (!tasksList) return;
            
            if (filteredTasks.length === 0) {
                tasksList.innerHTML = '<p style="text-align:center; padding:2rem; color:#888;">✨ Belum ada tugas. Tambah tugas baru!</p>';
                return;
            }

            tasksList.innerHTML = filteredTasks.map(task => `
                <div class="task-card ${task.completed ? 'task-completed' : ''}">
                    <div class="task-header">
                        <h3>${escapeHtml(task.title)}</h3>
                        <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    </div>
                    <p>${task.desc ? escapeHtml(task.desc) : '<em>Tidak ada deskripsi</em>'}</p>
                    ${task.deadline ? `<small><i class="fas fa-calendar"></i> Deadline: ${task.deadline}</small><br>` : ''}
                    <div class="task-actions">
                        <button class="complete-btn" onclick="window.dashboardToggleComplete(${task.id})">
                            <i class="fas ${task.completed ? 'fa-undo-alt' : 'fa-check-circle'}"></i>
                        </button>
                        <button class="edit-btn" onclick="window.dashboardEditTask(${task.id})"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" onclick="window.dashboardDeleteTask(${task.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }

        function refreshNotes() {
            const notesList = document.getElementById('notesList');
            if (!notesList) return;
            
            if (!userData.notes.length) {
                notesList.innerHTML = '<p style="text-align:center; padding:2rem; color:#888;">📝 Belum ada catatan. Buat catatan baru!</p>';
                return;
            }
            notesList.innerHTML = userData.notes.map(note => `
                <div class="note-card">
                    <h3>${escapeHtml(note.title)}</h3>
                    <p>${escapeHtml(note.content.substring(0, 150))}${note.content.length > 150 ? '...' : ''}</p>
                    <div class="note-actions">
                        <button class="edit-btn" onclick="window.dashboardEditNote(${note.id})"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" onclick="window.dashboardDeleteNote(${note.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }

        function updateStats() {
            const total = userData.tasks.length;
            const completed = userData.tasks.filter(t => t.completed).length;
            const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
            const totalTasksEl = document.getElementById('totalTasks');
            const completedTasksEl = document.getElementById('completedTasks');
            const completionRateEl = document.getElementById('completionRate');
            const progressFillEl = document.getElementById('progressFill');
            const totalNotesEl = document.getElementById('totalNotes');
            
            if (totalTasksEl) totalTasksEl.innerText = total;
            if (completedTasksEl) completedTasksEl.innerText = completed;
            if (completionRateEl) completionRateEl.innerText = `${rate}%`;
            if (progressFillEl) progressFillEl.style.width = `${rate}%`;
            if (totalNotesEl) totalNotesEl.innerText = userData.notes.length;
        }

        window.dashboardToggleComplete = function(id) {
            const task = userData.tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                saveUserDataForDashboard(userData);
                refreshTasks();
                updateStats();
            }
        };

        window.dashboardDeleteTask = function(id) {
            if (confirm('Hapus tugas ini?')) {
                userData.tasks = userData.tasks.filter(t => t.id !== id);
                saveUserDataForDashboard(userData);
                refreshTasks();
                updateStats();
            }
        };

        window.dashboardEditTask = function(id) {
            const task = userData.tasks.find(t => t.id === id);
            if (task) {
                dashboardState.editingTaskId = id;
                document.getElementById('taskModalTitle').innerText = 'Edit Tugas';
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDesc').value = task.desc || '';
                document.getElementById('taskPriority').value = task.priority;
                document.getElementById('taskDeadline').value = task.deadline || '';
                document.getElementById('taskModal').classList.remove('hidden');
            }
        };

        window.dashboardEditNote = function(id) {
            const note = userData.notes.find(n => n.id === id);
            if (note) {
                dashboardState.editingNoteId = id;
                document.getElementById('noteModalTitle').innerText = 'Edit Catatan';
                document.getElementById('noteTitle').value = note.title;
                document.getElementById('noteContent').value = note.content;
                document.getElementById('noteModal').classList.remove('hidden');
            }
        };

        window.dashboardDeleteNote = function(id) {
            if (confirm('Hapus catatan ini?')) {
                userData.notes = userData.notes.filter(n => n.id !== id);
                saveUserDataForDashboard(userData);
                refreshNotes();
                updateStats();
            }
        };

        function saveTask() {
            const title = document.getElementById('taskTitle').value.trim();
            if (!title) {
                alert('Judul tugas wajib diisi!');
                return;
            }
            const taskData = {
                id: dashboardState.editingTaskId || Date.now(),
                title: title,
                desc: document.getElementById('taskDesc').value,
                priority: document.getElementById('taskPriority').value,
                deadline: document.getElementById('taskDeadline').value,
                completed: dashboardState.editingTaskId ? (userData.tasks.find(t => t.id === dashboardState.editingTaskId)?.completed || false) : false
            };
            
            if (dashboardState.editingTaskId) {
                const index = userData.tasks.findIndex(t => t.id === dashboardState.editingTaskId);
                if (index !== -1) userData.tasks[index] = taskData;
                dashboardState.editingTaskId = null;
            } else {
                userData.tasks.push(taskData);
            }
            saveUserDataForDashboard(userData);
            refreshTasks();
            updateStats();
            closeTaskModal();
        }

        function saveNote() {
            const title = document.getElementById('noteTitle').value.trim();
            if (!title) {
                alert('Judul catatan wajib diisi!');
                return;
            }
            const noteData = {
                id: dashboardState.editingNoteId || Date.now(),
                title: title,
                content: document.getElementById('noteContent').value
            };
            if (dashboardState.editingNoteId) {
                const index = userData.notes.findIndex(n => n.id === dashboardState.editingNoteId);
                if (index !== -1) userData.notes[index] = noteData;
                dashboardState.editingNoteId = null;
            } else {
                userData.notes.push(noteData);
            }
            saveUserDataForDashboard(userData);
            refreshNotes();
            updateStats();
            closeNoteModal();
        }

        function closeTaskModal() {
            const modal = document.getElementById('taskModal');
            if (modal) modal.classList.add('hidden');
            dashboardState.editingTaskId = null;
        }

        function closeNoteModal() {
            const modal = document.getElementById('noteModal');
            if (modal) modal.classList.add('hidden');
            dashboardState.editingNoteId = null;
        }

        // Tab switching
        document.querySelectorAll('.nav-item[data-tab]').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = tab.getAttribute('data-tab');
                dashboardState.currentTab = tabName;
                document.getElementById('tasksTab').style.display = tabName === 'tasks' ? 'block' : 'none';
                document.getElementById('notesTab').style.display = tabName === 'notes' ? 'block' : 'none';
                document.getElementById('statsTab').style.display = tabName === 'stats' ? 'block' : 'none';
                document.querySelectorAll('.nav-item[data-tab]').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                if (tabName === 'tasks') refreshTasks();
                if (tabName === 'notes') refreshNotes();
                if (tabName === 'stats') updateStats();
            });
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                dashboardState.currentFilter = btn.getAttribute('data-filter');
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                refreshTasks();
            });
        });

        // Add buttons
        const addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.onclick = () => {
                dashboardState.editingTaskId = null;
                document.getElementById('taskModalTitle').innerText = 'Tambah Tugas';
                document.getElementById('taskTitle').value = '';
                document.getElementById('taskDesc').value = '';
                document.getElementById('taskPriority').value = 'Sedang';
                document.getElementById('taskDeadline').value = '';
                document.getElementById('taskModal').classList.remove('hidden');
            };
        }

        const addNoteBtn = document.getElementById('addNoteBtn');
        if (addNoteBtn) {
            addNoteBtn.onclick = () => {
                dashboardState.editingNoteId = null;
                document.getElementById('noteModalTitle').innerText = 'Tambah Catatan';
                document.getElementById('noteTitle').value = '';
                document.getElementById('noteContent').value = '';
                document.getElementById('noteModal').classList.remove('hidden');
            };
        }

        const saveTaskBtn = document.getElementById('saveTaskBtn');
        if (saveTaskBtn) saveTaskBtn.onclick = saveTask;
        
        const saveNoteBtn = document.getElementById('saveNoteBtn');
        if (saveNoteBtn) saveNoteBtn.onclick = saveNote;

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.onclick = () => { closeTaskModal(); closeNoteModal(); };
        });

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.onclick = () => {
                localStorage.removeItem('current_user');
                navigateTo('home');
            };
        }

        // Initial render
        refreshTasks();
        refreshNotes();
        updateStats();
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    // Buat fungsi global untuk navigate
    window.navigateTo = navigateTo;
    window.dashboardToggleComplete = null;
    window.dashboardEditTask = null;
    window.dashboardDeleteTask = null;
    window.dashboardEditNote = null;
    window.dashboardDeleteNote = null;

    // Mulai aplikasi
    renderApp();
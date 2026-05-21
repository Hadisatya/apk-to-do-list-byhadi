  // ==================== DATABASE ====================
    const USERS_KEY = 'productivity_users';
    const SESSION_KEY = 'current_user';

    function getUsers() {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : [];
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    // ==================== ROUTING ====================
    let currentPage = 'home';

    function navigateTo(page) {
        currentPage = page;
        renderApp();
    }

    // ==================== RENDER APP ====================
    function renderApp() {
        const app = document.getElementById('app');
        
        if (currentPage === 'home') {
            app.innerHTML = renderHome();
        } else if (currentPage === 'login') {
            app.innerHTML = renderLogin();
            attachLoginEvents();
        } else if (currentPage === 'register') {
            app.innerHTML = renderRegister();
            attachRegisterEvents();
        } else if (currentPage === 'dashboard') {
            const user = JSON.parse(localStorage.getItem(SESSION_KEY));
            if (!user) {
                navigateTo('login');
                return;
            }
            app.innerHTML = renderDashboard();
            attachDashboardEvents();
        }
    }

    function renderHome() {
        return `
            <nav class="navbar">
                <div class="container">
                    <div class="logo">
                        <span class="icon-brain"></span> ProductivityHub
                    </div>
                    <ul class="nav-links">
                        <li><a onclick="navigateTo('home')">Beranda</a></li>
                        <li><a onclick="navigateTo('login')">Masuk</a></li>
                        <li><a onclick="navigateTo('register')" class="btn-outline">Daftar</a></li>
                    </ul>
                </div>
            </nav>
            <header class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1>Produktivitas Tanpa Batas</h1>
                        <p>Atur tugas, catatan, dan target harianmu dalam satu platform modern. Gratis selamanya.</p>
                        <div class="hero-buttons">
                            <a onclick="navigateTo('register')" class="btn-primary">Mulai Sekarang <span class="icon-arrow"></span></a>
                            <a onclick="navigateTo('login')" class="btn-secondary">Sudah punya akun?</a>
                        </div>
                    </div>
                    <div class="hero-image">
                        <span class="icon-tasks" style="font-size: 5rem;"></span>
                    </div>
                </div>
            </header>
            <section class="features">
                <div class="container">
                    <h2>Fitur Canggih</h2>
                    <div class="feature-grid">
                        <div class="feature-card">
                            <span class="icon-list"></span>
                            <h3>To-Do List Pintar</h3>
                            <p>Buat, edit, dan selesaikan tugas dengan prioritas & deadline.</p>
                        </div>
                        <div class="feature-card">
                            <span class="icon-note"></span>
                            <h3>Catatan Pribadi</h3>
                            <p>Simpan ide penting dengan editor teks kaya.</p>
                        </div>
                        <div class="feature-card">
                            <span class="icon-chart"></span>
                            <h3>Statistik Harian</h3>
                            <p>Lihat progress produktivitasmu dalam grafik.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function renderLogin() {
        return `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <span class="icon-brain"></span>
                        <h2>Selamat Datang Kembali</h2>
                        <p>Masuk ke akun ProductivityHub Anda</p>
                    </div>
                    <form id="loginForm">
                        <div class="input-group">
                            <span class="icon-email"></span>
                            <input type="email" id="loginEmail" placeholder="Alamat Email" required>
                        </div>
                        <div class="input-group">
                            <span class="icon-lock"></span>
                            <input type="password" id="loginPassword" placeholder="Kata Sandi" required>
                        </div>
                        <button type="submit" class="btn-auth">Masuk <span class="icon-arrow"></span></button>
                    </form>
                    <p class="auth-footer">Belum punya akun? <a onclick="navigateTo('register')">Daftar sekarang</a></p>
                    <div id="loginMessage" class="message"></div>
                </div>
            </div>
        `;
    }

    function attachLoginEvents() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.onsubmit = function(e) {
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
            };
        }
    }

    function renderRegister() {
        return `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <span class="icon-user"></span>
                        <h2>Buat Akun Baru</h2>
                        <p>Mulai perjalanan produktivitas Anda</p>
                    </div>
                    <form id="registerForm">
                        <div class="input-group">
                            <span class="icon-user"></span>
                            <input type="text" id="regName" placeholder="Nama Lengkap" required>
                        </div>
                        <div class="input-group">
                            <span class="icon-email"></span>
                            <input type="email" id="regEmail" placeholder="Alamat Email" required>
                        </div>
                        <div class="input-group">
                            <span class="icon-lock"></span>
                            <input type="password" id="regPassword" placeholder="Kata Sandi (min. 6 karakter)" required>
                        </div>
                        <button type="submit" class="btn-auth">Daftar <span class="icon-check"></span></button>
                    </form>
                    <p class="auth-footer">Sudah punya akun? <a onclick="navigateTo('login')">Masuk disini</a></p>
                    <div id="registerMessage" class="message"></div>
                </div>
            </div>
        `;
    }

    function attachRegisterEvents() {
        const form = document.getElementById('registerForm');
        if (form) {
            form.onsubmit = function(e) {
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
            };
        }
    }

    // ==================== DASHBOARD ====================
    let dashboardData = {
        userData: null,
        currentFilter: 'all',
        editingTaskId: null,
        editingNoteId: null,
        currentTab: 'tasks'
    };

    function renderDashboard() {
        const currentUser = JSON.parse(localStorage.getItem(SESSION_KEY));
        return `
            <div class="dashboard-container">
                <aside class="sidebar">
                    <div class="sidebar-header">
                        <span class="icon-brain"></span> ProductivityHub
                    </div>
                    <nav class="sidebar-nav">
                        <div class="nav-item ${dashboardData.currentTab === 'tasks' ? 'active' : ''}" data-tab="tasks">
                            <span class="icon-tasks"></span> Tugas Saya
                        </div>
                        <div class="nav-item ${dashboardData.currentTab === 'notes' ? 'active' : ''}" data-tab="notes">
                            <span class="icon-note"></span> Catatan
                        </div>
                        <div class="nav-item ${dashboardData.currentTab === 'stats' ? 'active' : ''}" data-tab="stats">
                            <span class="icon-chart"></span> Statistik
                        </div>
                        <div class="nav-item logout" id="logoutBtn">
                            <span class="icon-logout"></span> Keluar
                        </div>
                    </nav>
                    <div class="user-info">
                        <span class="icon-user"></span> ${escapeHtml(currentUser?.name || 'User')}
                    </div>
                </aside>
                <main class="main-content">
                    <div id="tasksTab" style="${dashboardData.currentTab === 'tasks' ? 'display:block' : 'display:none'}">
                        <div class="tasks-header">
                            <h2><span class="icon-tasks"></span> Daftar Tugas</h2>
                            <button id="addTaskBtn" class="btn-primary-small"><span class="icon-plus"></span> Tugas Baru</button>
                        </div>
                        <div class="task-filters">
                            <button class="filter-btn ${dashboardData.currentFilter === 'all' ? 'active' : ''}" data-filter="all">Semua</button>
                            <button class="filter-btn ${dashboardData.currentFilter === 'pending' ? 'active' : ''}" data-filter="pending">Belum</button>
                            <button class="filter-btn ${dashboardData.currentFilter === 'completed' ? 'active' : ''}" data-filter="completed">Selesai</button>
                        </div>
                        <div id="tasksList"></div>
                    </div>

                    <div id="notesTab" style="${dashboardData.currentTab === 'notes' ? 'display:block' : 'display:none'}">
                        <div class="notes-header">
                            <h2><span class="icon-note"></span> Catatan Penting</h2>
                            <button id="addNoteBtn" class="btn-primary-small"><span class="icon-plus"></span> Catatan Baru</button>
                        </div>
                        <div id="notesList"></div>
                    </div>

                    <div id="statsTab" style="${dashboardData.currentTab === 'stats' ? 'display:block' : 'display:none'}">
                        <h2><span class="icon-chart"></span> Statistik Produktivitas</h2>
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
        const currentUser = JSON.parse(localStorage.getItem(SESSION_KEY));
        if (!currentUser) return;

        let users = getUsers();
        let userData = users.find(u => u.id === currentUser.id);
        if (!userData) {
            navigateTo('login');
            return;
        }
        if (!userData.tasks) userData.tasks = [];
        if (!userData.notes) userData.notes = [];

        function saveUserData() {
            const allUsers = getUsers();
            const index = allUsers.findIndex(u => u.id === userData.id);
            if (index !== -1) {
                allUsers[index] = userData;
                saveUsers(allUsers);
            }
        }

        function renderTasks() {
            let filtered = [...userData.tasks];
            if (dashboardData.currentFilter === 'pending') filtered = filtered.filter(t => !t.completed);
            if (dashboardData.currentFilter === 'completed') filtered = filtered.filter(t => t.completed);
            
            const container = document.getElementById('tasksList');
            if (!container) return;
            
            if (filtered.length === 0) {
                container.innerHTML = '<p style="text-align:center; padding:2rem; color:#888;">✨ Belum ada tugas. Tambah tugas baru!</p>';
                return;
            }

            container.innerHTML = filtered.map(task => `
                <div class="task-card ${task.completed ? 'task-completed' : ''}">
                    <div class="task-header">
                        <h3>${escapeHtml(task.title)}</h3>
                        <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    </div>
                    <p>${task.desc ? escapeHtml(task.desc) : '<em>Tidak ada deskripsi</em>'}</p>
                    ${task.deadline ? `<small><span class="icon-calendar"></span> Deadline: ${task.deadline}</small><br>` : ''}
                    <div class="task-actions">
                        <button class="complete-btn" onclick="window.completeTask(${task.id})">
                            <span class="icon-check"></span> ${task.completed ? 'Batal Selesai' : 'Selesai'}
                        </button>
                        <button class="edit-btn" onclick="window.editTaskById(${task.id})">
                            <span class="icon-edit-small"></span> Edit
                        </button>
                        <button class="delete-btn" onclick="window.deleteTaskById(${task.id})">
                            <span class="icon-trash"></span> Hapus
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function renderNotes() {
            const container = document.getElementById('notesList');
            if (!container) return;
            
            if (userData.notes.length === 0) {
                container.innerHTML = '<p style="text-align:center; padding:2rem; color:#888;">📝 Belum ada catatan. Buat catatan baru!</p>';
                return;
            }
            
            container.innerHTML = userData.notes.map(note => `
                <div class="note-card">
                    <h3>${escapeHtml(note.title)}</h3>
                    <p>${escapeHtml(note.content.substring(0, 150))}${note.content.length > 150 ? '...' : ''}</p>
                    <div class="note-actions">
                        <button class="edit-btn" onclick="window.editNoteById(${note.id})">
                            <span class="icon-edit-small"></span> Edit
                        </button>
                        <button class="delete-btn" onclick="window.deleteNoteById(${note.id})">
                            <span class="icon-trash"></span> Hapus
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function updateStats() {
            const total = userData.tasks.length;
            const completed = userData.tasks.filter(t => t.completed).length;
            const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
            
            const totalEl = document.getElementById('totalTasks');
            const completedEl = document.getElementById('completedTasks');
            const rateEl = document.getElementById('completionRate');
            const fillEl = document.getElementById('progressFill');
            const notesEl = document.getElementById('totalNotes');
            
            if (totalEl) totalEl.innerText = total;
            if (completedEl) completedEl.innerText = completed;
            if (rateEl) rateEl.innerText = `${rate}%`;
            if (fillEl) fillEl.style.width = `${rate}%`;
            if (notesEl) notesEl.innerText = userData.notes.length;
        }

        window.completeTask = function(id) {
            const task = userData.tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                saveUserData();
                renderTasks();
                updateStats();
            }
        };

        window.deleteTaskById = function(id) {
            if (confirm('Hapus tugas ini?')) {
                userData.tasks = userData.tasks.filter(t => t.id !== id);
                saveUserData();
                renderTasks();
                updateStats();
            }
        };

        window.editTaskById = function(id) {
            const task = userData.tasks.find(t => t.id === id);
            if (task) {
                dashboardData.editingTaskId = id;
                document.getElementById('taskModalTitle').innerText = 'Edit Tugas';
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDesc').value = task.desc || '';
                document.getElementById('taskPriority').value = task.priority;
                document.getElementById('taskDeadline').value = task.deadline || '';
                document.getElementById('taskModal').classList.remove('hidden');
            }
        };

        window.editNoteById = function(id) {
            const note = userData.notes.find(n => n.id === id);
            if (note) {
                dashboardData.editingNoteId = id;
                document.getElementById('noteModalTitle').innerText = 'Edit Catatan';
                document.getElementById('noteTitle').value = note.title;
                document.getElementById('noteContent').value = note.content;
                document.getElementById('noteModal').classList.remove('hidden');
            }
        };

        window.deleteNoteById = function(id) {
            if (confirm('Hapus catatan ini?')) {
                userData.notes = userData.notes.filter(n => n.id !== id);
                saveUserData();
                renderNotes();
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
                id: dashboardData.editingTaskId || Date.now(),
                title: title,
                desc: document.getElementById('taskDesc').value,
                priority: document.getElementById('taskPriority').value,
                deadline: document.getElementById('taskDeadline').value,
                completed: false
            };
            
            if (dashboardData.editingTaskId) {
                const existingTask = userData.tasks.find(t => t.id === dashboardData.editingTaskId);
                if (existingTask) taskData.completed = existingTask.completed;
                userData.tasks = userData.tasks.map(t => t.id === dashboardData.editingTaskId ? taskData : t);
            } else {
                userData.tasks.push(taskData);
            }
            
            saveUserData();
            renderTasks();
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
                id: dashboardData.editingNoteId || Date.now(),
                title: title,
                content: document.getElementById('noteContent').value
            };
            
            if (dashboardData.editingNoteId) {
                userData.notes = userData.notes.map(n => n.id === dashboardData.editingNoteId ? noteData : n);
            } else {
                userData.notes.push(noteData);
            }
            
            saveUserData();
            renderNotes();
            updateStats();
            closeNoteModal();
        }

        function closeTaskModal() {
            const modal = document.getElementById('taskModal');
            if (modal) modal.classList.add('hidden');
            dashboardData.editingTaskId = null;
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDesc').value = '';
            document.getElementById('taskDeadline').value = '';
        }

        function closeNoteModal() {
            const modal = document.getElementById('noteModal');
            if (modal) modal.classList.add('hidden');
            dashboardData.editingNoteId = null;
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteContent').value = '';
        }

        document.querySelectorAll('.nav-item[data-tab]').forEach(tab => {
            tab.onclick = () => {
                const tabName = tab.getAttribute('data-tab');
                dashboardData.currentTab = tabName;
                document.getElementById('tasksTab').style.display = tabName === 'tasks' ? 'block' : 'none';
                document.getElementById('notesTab').style.display = tabName === 'notes' ? 'block' : 'none';
                document.getElementById('statsTab').style.display = tabName === 'stats' ? 'block' : 'none';
                document.querySelectorAll('.nav-item[data-tab]').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                if (tabName === 'tasks') renderTasks();
                if (tabName === 'notes') renderNotes();
                if (tabName === 'stats') updateStats();
            };
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.onclick = () => {
                dashboardData.currentFilter = btn.getAttribute('data-filter');
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderTasks();
            };
        });

        const addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.onclick = () => {
                dashboardData.editingTaskId = null;
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
                dashboardData.editingNoteId = null;
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
                localStorage.removeItem(SESSION_KEY);
                navigateTo('home');
            };
        }

        renderTasks();
        renderNotes();
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

    window.navigateTo = navigateTo;
    renderApp();
// profile.js
const apiBase = ""; // backend URL if different origin

// ---------------- Helper ----------------
function qs(id) { return document.getElementById(id); }
function showAlert(msg) { alert(msg); }

// ---------------- Elements ----------------
const profileNameEl = qs('profileName');
const profileSubtitleEl = qs('profileSubtitle');
const emailValueEl = qs('emailValue');
const whatsappValueEl = qs('whatsappValue');
const departmentValueEl = qs('departmentValue');
const programValueEl = qs('programValue');
const semesterValueEl = qs('semesterValue');
const studentIdValueEl = qs('studentIdValue');

let currentUser = null;

// ---------------- Modals ----------------
const changeRoleModal = qs('changeRoleModal');
const editContactModal = qs('editContactModal');
const editProfileModal = qs('editProfileModal');

// ---------------- Load Profile ----------------
async function loadProfile() {
    const email = localStorage.getItem('userEmail');
    if (!email) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch(`${apiBase}/api/user/info?email=${email}`);
        if (!res.ok) throw new Error('Failed to fetch');

        const user = await res.json();
        currentUser = user;

        profileNameEl.textContent = user.fullName || '-';
        profileSubtitleEl.textContent = `${user.department || '-'} • ${user.semester || '-'}`;
        emailValueEl.textContent = user.email || '-';
        whatsappValueEl.textContent = user.phone || '-';
        departmentValueEl.textContent = user.department || '-';
        programValueEl.textContent = user.program || '-';
        semesterValueEl.textContent = user.semester || '-';
        studentIdValueEl.textContent = user.studentId || '-';

        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.role === user.role);
        });

    } catch (err) {
        console.error(err);
        showAlert('Could not load profile');
    }
}

document.addEventListener('DOMContentLoaded', loadProfile);

// ---------------- Role Change (PASSWORD REQUIRED) ----------------
qs('changeRoleBtn').addEventListener('click', () => {
    qs('rolePassword').value = '';
    qs('roleError').textContent = '';
    changeRoleModal.classList.add('active');
});

qs('closeRoleModal').addEventListener('click', () => changeRoleModal.classList.remove('active'));
qs('cancelRoleChange').addEventListener('click', () => changeRoleModal.classList.remove('active'));

document.querySelectorAll('.role-option').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelectorAll('.role-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
    });
});

qs('confirmRoleChange').addEventListener('click', async () => {
    const selected = document.querySelector('.role-option.active');
    if (!selected) {
        qs('roleError').textContent = 'Select a role';
        return;
    }

    const selectedRole = selected.dataset.newRole;
    const password = qs('rolePassword').value.trim();

    if (!password) {
        qs('roleError').textContent = 'Enter password';
        return;
    }

    try {
        const res = await fetch(`${apiBase}/api/auth/updateRole`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: currentUser.email,
                role: selectedRole,
                password: password
            })
        });

        const data = await res.json();

        if (res.ok && data.status === 'success') {
            currentUser.role = selectedRole;
            localStorage.setItem("userRole", selectedRole);

            qs('roleError').textContent = '';
            changeRoleModal.classList.remove('active');

            // Redirect to correct form
            if (selectedRole === 'driver') {
                window.location.href = 'driverForm.html';
            } else {
                window.location.href = 'passengerForm.html';
            }

        } else {
            qs('roleError').textContent = data.message || 'Incorrect password';
        }

    } catch (err) {
        console.error(err);
        qs('roleError').textContent = 'Server error';
    }
});

// ---------------- Edit Contact ----------------
qs('editContactBtn').addEventListener('click', () => {
    qs('editWhatsapp').value = currentUser.phone || '';
    editContactModal.classList.add('active');
});

qs('closeContactModal').addEventListener('click', () => editContactModal.classList.remove('active'));
qs('cancelContactEdit').addEventListener('click', () => editContactModal.classList.remove('active'));

qs('saveContactEdit').addEventListener('click', async () => {
    const payload = {
        email: currentUser.email,
        phone: qs('editWhatsapp').value.trim()
    };

    try {
        await fetch(`${apiBase}/api/auth/updateProfile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        whatsappValueEl.textContent = payload.phone || '-';
        editContactModal.classList.remove('active');
        showAlert('Contact updated');

    } catch (err) {
        console.error(err);
        showAlert('Failed to update contact');
    }
});

// ---------------- Edit Profile ----------------
qs('editProfileBtn').addEventListener('click', () => {
    qs('editFullName').value = currentUser.fullName || '';
    qs('editDepartment').value = currentUser.department || '';
    qs('editProgram').value = currentUser.program || '';
    qs('editSemester').value = currentUser.semester || '';
    editProfileModal.classList.add('active');
});

qs('closeProfileModal').addEventListener('click', () => editProfileModal.classList.remove('active'));
qs('cancelProfileEdit').addEventListener('click', () => editProfileModal.classList.remove('active'));

qs('saveProfileEdit').addEventListener('click', async () => {
    const payload = {
        email: currentUser.email,
        fullName: qs('editFullName').value.trim(),
        department: qs('editDepartment').value.trim(),
        program: qs('editProgram').value.trim(),
        semester: qs('editSemester').value.trim()
    };

    try {
        await fetch(`${apiBase}/api/auth/updateProfile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        loadProfile();
        editProfileModal.classList.remove('active');
        showAlert('Profile updated');

    } catch (err) {
        console.error(err);
        showAlert('Failed to update profile');
    }
});

// ---------------- Logout ----------------
document.querySelector('.logout-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});

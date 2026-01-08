import { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { getAllUsers, createUser, updateUser, deleteUser } from './services/api';
import { User } from './types/User';

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch users. Ensure backend is running.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateOrUpdate = async (user: User) => {
        try {
            if (editingUser && editingUser.id) {
                await updateUser(editingUser.id, user);
            } else {
                await createUser(user);
            }
            setIsModalOpen(false);
            setEditingUser(undefined);
            fetchUsers();
        } catch (err) {
            console.error(err);
            setError('Failed to save user.');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (err) {
                console.error(err);
                setError('Failed to delete user.');
            }
        }
    };

    const openCreateModal = () => {
        setEditingUser(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>User Management</h1>
                <button className="primary" onClick={openCreateModal}>
                    + Add User
                </button>
            </header>

            {error && (
                <div style={{ background: 'rgba(218, 54, 51, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <UserList users={users} onEdit={openEditModal} onDelete={handleDelete} />

            {isModalOpen && (
                <div className="modal-overlay">
                    <UserForm
                        initialUser={editingUser}
                        onSubmit={handleCreateOrUpdate}
                        onCancel={() => setIsModalOpen(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default App;

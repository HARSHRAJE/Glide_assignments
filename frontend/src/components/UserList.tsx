import React from 'react';
import { User } from '../types/User';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
    return (
        <div className="card">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <div className="actions">
                                        <button onClick={() => onEdit(user)} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Edit</button>
                                        <button className="danger" onClick={() => user.id && onDelete(user.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { User } from '../types/User';

interface UserFormProps {
    initialUser?: User;
    onSubmit: (user: User) => void;
    onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ initialUser, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        age: 0,
    });

    useEffect(() => {
        if (initialUser) {
            setFormData(initialUser);
        }
    }, [initialUser]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="card modal">
            <h2>{initialUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                        required
                    />
                </div>
                <div className="actions" style={{ justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="button" className="danger" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="primary">
                        {initialUser ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
};

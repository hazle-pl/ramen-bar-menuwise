import { useState } from 'react';

const ProjectForm = ({ onProjectAdded }: { onProjectAdded: () => void }) => {
  const [form, setForm] = useState({
    name: '',
    website: '',
    type: 'Strona internetowa',
    status: 'Do zrobienia',
    amount: 0,
    email: '',
    password: '',
    note: '',
  });

  const statusOptions = ['Do zrobienia', 'W toku', 'Skończone'];
  const typeOptions = ['Strona internetowa', 'Aplikacja web', 'Sklep e-commerce', 'Grafika', 'Inne'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      onProjectAdded();
      setForm({ name: '', website: '', type: 'Strona internetowa', status: 'Do zrobienia', amount: 0, email: '', password: '', note: '' });
    } else {
      console.error('Błąd dodawania projektu');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nazwa" value={form.name} onChange={handleChange} required />
      <input name="website" placeholder="Strona" value={form.website} onChange={handleChange} required />
      <select name="type" value={form.type} onChange={handleChange} required>
        {typeOptions.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select name="status" value={form.status} onChange={handleChange} required>
        {statusOptions.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <input name="amount" type="number" placeholder="Kwota" value={form.amount} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Hasło" value={form.password} onChange={handleChange} />
      <textarea name="note" placeholder="Notatka" value={form.note} onChange={handleChange} />
      <button type="submit">Dodaj projekt</button>
    </form>
  );
};

export default ProjectForm;

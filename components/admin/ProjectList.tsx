import { useState, useEffect } from 'react';

type Project = {
  _id: string;
  name: string;
  website: string;
  type: string;
  status: string;
  amount: number;
  email: string;
  password: string;
  note: string;
};

const statusOptions = ['Do zrobienia', 'W toku', 'Skończone'];
const typeOptions = ['Strona internetowa', 'Aplikacja web', 'Sklep e-commerce', 'Grafika', 'Inne'];

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [form, setForm] = useState<Project>({
    _id: '',
    name: '',
    website: '',
    type: '',
    status: '',
    amount: 0,
    email: '',
    password: '',
    note: '',
  });
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const fetchProjects = async () => {
    const response = await fetch('/api/projects');
    const data: Project[] = await response.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setEditingProject(project._id);
    setForm(project);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    fetchProjects();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/projects/${editingProject}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setEditingProject(null);
    fetchProjects();
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <h2>Lista projektów</h2>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Strona</th>
            <th>Typ</th>
            <th>Status</th>
            <th>Kwota (PLN)</th>
            <th>Email</th>
            <th>Hasło</th>
            <th>Notatka</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              {editingProject === project._id ? (
                <>
                  <td><input name="name" value={form.name} onChange={handleChange} required /></td>
                  <td><input name="website" value={form.website} onChange={handleChange} required /></td>
                  <td>
                    <select name="type" value={form.type} onChange={handleChange} required>
                      {typeOptions.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select name="status" value={form.status} onChange={handleChange} required>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td><input name="amount" type="number" value={form.amount} onChange={handleChange} required /></td>
                  <td><input name="email" type="email" value={form.email} onChange={handleChange} required /></td>
                  <td><input name="password" type="password" value={form.password} onChange={handleChange} required /></td>
                  <td><textarea name="note" value={form.note} onChange={handleChange} /></td>
                  <td>
                    <button onClick={handleSubmit}>Zapisz</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{project.name}</td>
                  <td><a href={project.website} target="_blank" rel="noopener noreferrer">{project.website}</a></td>
                  <td>{project.type}</td>
                  <td>{project.status}</td>
                  <td>{project.amount} PLN</td>
                  <td>{project.email}</td>
                  <td>
                    {project.password && (
                      <>
                        {visiblePasswords[project._id] ? project.password : '******'}
                        <i
                          onClick={() => togglePasswordVisibility(project._id)}
                          className={`fa-solid fa-eye ${visiblePasswords[project._id] ? 'fa-eye-slash' : 'fa-eye'}`}
                        />
                      </>
                    )}
                  </td>
                  <td>{project.note}</td>
                  <td>
                    <button onClick={() => handleEdit(project)}>Edytuj</button>
                    <button onClick={() => handleDelete(project._id)}>Usuń</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
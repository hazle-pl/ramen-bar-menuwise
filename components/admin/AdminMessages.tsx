import { useEffect, useState } from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (!response.ok) throw new Error('Błąd pobierania wiadomości');

        const data: Message[] = await response.json();
        setMessages(data);
      } catch (err) {
        setError('Nie udało się pobrać wiadomości');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      {messages.length === 0 && !loading && <p>Brak wiadomości</p>}
      <ul>
        {messages.map((msg) => (
          <li key={msg._id}>
            <p><strong>Od:</strong> {msg.name} ({msg.email})</p>
            <p><strong>Treść:</strong> {msg.message}</p>
            <p><strong>Data:</strong> {new Date(msg.createdAt).toLocaleString()}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMessages;

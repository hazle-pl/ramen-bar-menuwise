import { CustomInput, CustomTextarea } from '@/atoms/CustomInputs';
import { useState } from 'react';
import RichText from './RichText';
import useTranslation from '@/lib/useTranslations';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { translate } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Błąd wysyłania wiadomości');

      setFormData({ name: '', email: '', message: '' });
      setSuccess(true);
    } catch (err) {
      setError('Nie udało się wysłać wiadomości');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form" id="contact">
      <RichText>
        <h1>{translate('contact-form', 'contactUs')}</h1>
        <p>{translate('contact-form', 'haveQuestions')}</p>
      </RichText>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <CustomInput label={translate('contact-form', 'name')} name="name" value={formData.name} onChange={handleChange} />
          <CustomInput label={translate('contact-form', 'email')} name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>
        <CustomTextarea label={translate('contact-form', 'message')} name="message" value={formData.message} onChange={handleChange} />
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              {translate('contact-form', 'sendingMessage')}
            </>
          ) : (
            <>
              {translate('contact-form', 'sendMessage')} <i className="fa-solid fa-arrow-right"/>
            </>
          )}
        </button>
      </form>
      {success && <p>{translate('contact-form', 'successSending')}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ContactForm;
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import { GET_PROFIL } from '../../services/queries';
import { CREATE_PROFIL, UPDATE_PROFIL } from '../../services/mutations';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Save, User, Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe, CheckCircle } from 'lucide-react';

const Profile = () => {
  const { loading, error, data, refetch } = useQuery(GET_PROFIL);
  const [createProfil] = useMutation(CREATE_PROFIL);
  const [updateProfil] = useMutation(UPDATE_PROFIL);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    titre: '',
    bio: '',
    email: '',
    telephone: '',
    photo: '',
    cv: '',
    reseauxSociaux: {
      linkedin: '',
      github: '',
      twitter: '',
      website: ''
    },
    adresse: {
      ville: '',
      pays: ''
    }
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (data?.getProfil) {
      setFormData({
        nom: data.getProfil.nom || '',
        prenom: data.getProfil.prenom || '',
        titre: data.getProfil.titre || '',
        bio: data.getProfil.bio || '',
        email: data.getProfil.email || '',
        telephone: data.getProfil.telephone || '',
        photo: data.getProfil.photo || '',
        cv: data.getProfil.cv || '',
        reseauxSociaux: {
          linkedin: data.getProfil.reseauxSociaux?.linkedin || '',
          github: data.getProfil.reseauxSociaux?.github || '',
          twitter: data.getProfil.reseauxSociaux?.twitter || '',
          website: data.getProfil.reseauxSociaux?.website || ''
        },
        adresse: {
          ville: data.getProfil.adresse?.ville || '',
          pays: data.getProfil.adresse?.pays || ''
        }
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');

    try {
      const input = {
        nom: formData.nom,
        prenom: formData.prenom,
        titre: formData.titre,
        bio: formData.bio,
        email: formData.email,
        telephone: formData.telephone,
        photo: formData.photo,
        cv: formData.cv,
        reseauxSociaux: formData.reseauxSociaux,
        adresse: formData.adresse
      };

      if (data?.getProfil?.id) {
        await updateProfil({
          variables: { id: data.getProfil.id, input }
        });
        setSuccessMessage('Profile updated successfully!');
      } else {
        await createProfil({ variables: { input } });
        setSuccessMessage('Profile created successfully!');
      }

      refetch();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Error saving profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="p-8 text-red-400">Error: {error.message}</div>;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-4xl font-display font-bold text-white">
          My <span className="text-gradient">Profile</span>
        </h1>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 glass-effect px-6 py-3 rounded-xl border border-green-500/30"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">{successMessage}</span>
          </motion.div>
        )}
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Personal Information */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-primary-orange-500" />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary-grey-300 mb-2">
                Professional Title *
              </label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                required
                placeholder="Ex: Full Stack Developer"
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary-grey-300 mb-2">
                Bio *
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary-orange-500" />
            Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2 flex items-center gap-1">
                <Phone className="w-4 h-4" />
                Phone
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary-orange-500" />
            Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2">
                City
              </label>
              <input
                type="text"
                name="adresse.ville"
                value={formData.adresse.ville}
                onChange={handleChange}
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2">
                Country
              </label>
              <input
                type="text"
                name="adresse.pays"
                value={formData.adresse.pays}
                onChange={handleChange}
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Social Networks */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Social Networks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2 flex items-center gap-1">
                <Linkedin className="w-4 h-4 text-primary-orange-500" />
                LinkedIn
              </label>
              <input
                type="url"
                name="reseauxSociaux.linkedin"
                value={formData.reseauxSociaux.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2 flex items-center gap-1">
                <Github className="w-4 h-4 text-primary-orange-500" />
                GitHub
              </label>
              <input
                type="url"
                name="reseauxSociaux.github"
                value={formData.reseauxSociaux.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2 flex items-center gap-1">
                <Twitter className="w-4 h-4 text-primary-orange-500" />
                Twitter
              </label>
              <input
                type="url"
                name="reseauxSociaux.twitter"
                value={formData.reseauxSociaux.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2 flex items-center gap-1">
                <Globe className="w-4 h-4 text-primary-orange-500" />
                Website
              </label>
              <input
                type="url"
                name="reseauxSociaux.website"
                value={formData.reseauxSociaux.website}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Files */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2">
                Profile Photo URL
              </label>
              <input
                type="url"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-grey-300 mb-2">
                CV URL (PDF)
              </label>
              <input
                type="url"
                name="cv"
                value={formData.cv}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-primary-orange-500 text-white px-8 py-4 rounded-xl hover:bg-primary-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg shadow-primary-orange-500/30"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Profile'}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default Profile;

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import { GET_EXPERIENCES, GET_COMPETENCES } from '../../services/queries';
import { CREATE_EXPERIENCE, UPDATE_EXPERIENCE, DELETE_EXPERIENCE } from '../../services/mutations';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import { Plus, Edit, Trash2, Save, Briefcase, MapPin, Calendar } from 'lucide-react';

const ExperienceManagement = () => {
  const { loading, error, data, refetch } = useQuery(GET_EXPERIENCES);
  const { data: competencesData } = useQuery(GET_COMPETENCES);
  const [createExperience] = useMutation(CREATE_EXPERIENCE);
  const [updateExperience] = useMutation(UPDATE_EXPERIENCE);
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    entreprise: '',
    poste: '',
    type: 'CDI',
    description: '',
    competences: [],
    dateDebut: '',
    dateFin: '',
    enCours: false,
    lieu: '',
    logo: '',
    ordre: 0
  });

  const resetForm = () => {
    setFormData({
      entreprise: '',
      poste: '',
      type: 'CDI',
      description: '',
      competences: [],
      dateDebut: '',
      dateFin: '',
      enCours: false,
      lieu: '',
      logo: '',
      ordre: 0
    });
    setEditingExp(null);
  };

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        entreprise: exp.entreprise,
        poste: exp.poste,
        type: exp.type,
        description: exp.description,
        competences: exp.competences?.map(c => c.id) || [],
        dateDebut: exp.dateDebut?.split('T')[0] || '',
        dateFin: exp.dateFin?.split('T')[0] || '',
        enCours: exp.enCours,
        lieu: exp.lieu || '',
        logo: exp.logo || '',
        ordre: exp.ordre || 0
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCompetenceToggle = (compId) => {
    setFormData(prev => ({
      ...prev,
      competences: prev.competences.includes(compId)
        ? prev.competences.filter(id => id !== compId)
        : [...prev.competences, compId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const input = {
        entreprise: formData.entreprise,
        poste: formData.poste,
        type: formData.type,
        description: formData.description,
        competences: formData.competences,
        dateDebut: formData.dateDebut,
        dateFin: formData.enCours ? null : formData.dateFin,
        enCours: formData.enCours,
        lieu: formData.lieu,
        logo: formData.logo,
        ordre: parseInt(formData.ordre)
      };

      if (editingExp) {
        await updateExperience({
          variables: { id: editingExp.id, input }
        });
      } else {
        await createExperience({ variables: { input } });
      }

      refetch();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving experience:', err);
      alert('Error saving experience');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience({ variables: { id } });
      refetch();
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting experience:', err);
      alert('Error deleting experience');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="p-8 text-red-400">Error: {error.message}</div>;

  const experiences = data?.getExperiences || [];
  const competences = competencesData?.getCompetences || [];

  const typeLabels = {
    CDI: 'Full-time',
    CDD: 'Contract',
    FREELANCE: 'Freelance',
    STAGE: 'Internship',
    ALTERNANCE: 'Apprenticeship'
  };

  const typeColors = {
    CDI: 'bg-green-500/10 text-green-400 border-green-500/30',
    CDD: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    FREELANCE: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    STAGE: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    ALTERNANCE: 'bg-primary-orange-500/10 text-primary-orange-400 border-primary-orange-500/30'
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-4xl font-display font-bold text-white">
          Experience <span className="text-gradient">Management</span>
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary-orange-500 text-white px-6 py-3 rounded-xl hover:bg-primary-orange-600 transition-all shadow-lg shadow-primary-orange-500/30 font-medium"
        >
          <Plus className="w-5 h-5" />
          New Experience
        </motion.button>
      </motion.div>

      {/* Experiences List */}
      <div className="space-y-5">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-effect rounded-2xl p-6 border border-primary-grey-800 hover:border-primary-orange-500/50 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Logo */}
              <div className="flex-shrink-0">
                {exp.logo ? (
                  <div className="w-16 h-16 glass-effect rounded-xl p-2 border border-primary-grey-800">
                    <img src={exp.logo} alt={exp.entreprise} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 glass-effect rounded-xl flex items-center justify-center border border-primary-grey-800">
                    <Briefcase className="w-8 h-8 text-primary-orange-500" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.poste}</h3>
                    <p className="text-primary-grey-300 text-lg flex items-center gap-2">
                      {exp.entreprise}
                      {exp.lieu && (
                        <>
                          <span className="text-primary-grey-600">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.lieu}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full border ${typeColors[exp.type]}`}>
                    {typeLabels[exp.type]}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-primary-grey-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(exp.dateDebut).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {exp.enCours ? (
                      <span className="text-primary-orange-500 font-semibold">Present</span>
                    ) : (
                      new Date(exp.dateFin).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    )}
                  </span>
                </div>

                {/* Description */}
                <p className="text-primary-grey-300 mb-4 leading-relaxed">{exp.description}</p>

                {/* Skills */}
                {exp.competences && exp.competences.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.competences.map((comp) => (
                      <span
                        key={comp.id}
                        className="px-3 py-1 glass-effect text-primary-orange-400 text-xs rounded-full border border-primary-orange-500/30"
                      >
                        {comp.nom}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenModal(exp)}
                    className="flex items-center gap-1 px-4 py-2 glass-effect text-primary-orange-500 hover:bg-primary-orange-500/10 rounded-lg text-sm transition-all border border-primary-orange-500/30"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDeleteConfirm(exp)}
                    className="flex items-center gap-1 px-4 py-2 glass-effect text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-all border border-red-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {experiences.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-primary-grey-400 glass-effect rounded-2xl border border-primary-grey-800"
        >
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-primary-grey-600" />
          <p className="text-lg">No experience yet. Click "New Experience" to get started.</p>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingExp ? 'Edit Experience' : 'New Experience'}>
        <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
              <input
                type="text"
                name="poste"
                value={formData.poste}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
              >
                <option value="CDI">Full-time</option>
                <option value="CDD">Contract</option>
                <option value="FREELANCE">Freelance</option>
                <option value="STAGE">Internship</option>
                <option value="ALTERNANCE">Apprenticeship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="lieu"
                value={formData.lieu}
                onChange={handleChange}
                placeholder="Paris, France"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills Used</label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-gray-50">
              {competences.map((comp) => (
                <label key={comp.id} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.competences.includes(comp.id)}
                    onChange={() => handleCompetenceToggle(comp.id)}
                    className="rounded text-primary-orange-500 focus:ring-primary-orange-500"
                  />
                  <span className="text-sm text-gray-900">{comp.nom}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                name="dateDebut"
                value={formData.dateDebut}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                name="dateFin"
                value={formData.dateFin}
                onChange={handleChange}
                disabled={formData.enCours}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="enCours"
                checked={formData.enCours}
                onChange={handleChange}
                className="rounded text-primary-orange-500 focus:ring-primary-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Current Position</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo (URL)</label>
              <input
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
              <input
                type="number"
                name="ordre"
                value={formData.ordre}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-primary-orange-500 text-white px-4 py-3 rounded-lg hover:bg-primary-orange-600 font-medium shadow-lg shadow-primary-orange-500/30 transition-all"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirm Deletion"
      >
        <p className="mb-6 text-gray-700">Are you sure you want to delete the experience "{deleteConfirm?.poste}" at {deleteConfirm?.entreprise}?</p>
        <div className="flex gap-3">
          <button
            onClick={() => setDeleteConfirm(null)}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(deleteConfirm.id)}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-lg shadow-red-500/30 transition-all"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ExperienceManagement;

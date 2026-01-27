import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import { GET_COMPETENCES } from '../../services/queries';
import { CREATE_COMPETENCE, UPDATE_COMPETENCE, DELETE_COMPETENCE } from '../../services/mutations';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import { Plus, Edit, Trash2, Save, Code } from 'lucide-react';

const SkillsManagement = () => {
  const { loading, error, data, refetch } = useQuery(GET_COMPETENCES);
  const [createCompetence] = useMutation(CREATE_COMPETENCE);
  const [updateCompetence] = useMutation(UPDATE_COMPETENCE);
  const [deleteCompetence] = useMutation(DELETE_COMPETENCE);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    nom: '',
    niveau: 'INTERMEDIAIRE',
    categorie: 'FRONTEND',
    pourcentage: 50,
    icone: ''
  });

  const resetForm = () => {
    setFormData({
      nom: '',
      niveau: 'INTERMEDIAIRE',
      categorie: 'FRONTEND',
      pourcentage: 50,
      icone: ''
    });
    setEditingSkill(null);
  };

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        nom: skill.nom,
        niveau: skill.niveau,
        categorie: skill.categorie,
        pourcentage: skill.pourcentage || 50,
        icone: skill.icone || ''
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const input = {
        nom: formData.nom,
        niveau: formData.niveau,
        categorie: formData.categorie,
        pourcentage: parseInt(formData.pourcentage),
        icone: formData.icone
      };

      if (editingSkill) {
        await updateCompetence({
          variables: { id: editingSkill.id, input }
        });
      } else {
        await createCompetence({ variables: { input } });
      }

      refetch();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving skill:', err);
      alert('Error saving skill');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompetence({ variables: { id } });
      refetch();
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting skill:', err);
      alert('Error deleting skill');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="p-8 text-red-400">Error: {error.message}</div>;

  const skills = data?.getCompetences || [];
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.categorie]) acc[skill.categorie] = [];
    acc[skill.categorie].push(skill);
    return acc;
  }, {});

  const categoryLabels = {
    FRONTEND: 'Frontend',
    BACKEND: 'Backend',
    DATABASE: 'Database',
    DEVOPS: 'DevOps',
    AUTRE: 'Other'
  };

  const categoryIcons = {
    FRONTEND: '🎨',
    BACKEND: '⚙️',
    DATABASE: '🗄️',
    DEVOPS: '🚀',
    AUTRE: '💡'
  };

  const niveauLabels = {
    DEBUTANT: 'Beginner',
    INTERMEDIAIRE: 'Intermediate',
    AVANCE: 'Advanced',
    EXPERT: 'Expert'
  };

  const niveauColors = {
    DEBUTANT: 'bg-primary-grey-800/50 text-primary-grey-300 border-primary-grey-700',
    INTERMEDIAIRE: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    AVANCE: 'bg-green-500/10 text-green-400 border-green-500/30',
    EXPERT: 'bg-primary-orange-500/10 text-primary-orange-400 border-primary-orange-500/30'
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-4xl font-display font-bold text-white">
          Skills <span className="text-gradient">Management</span>
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary-orange-500 text-white px-6 py-3 rounded-xl hover:bg-primary-orange-600 transition-all shadow-lg shadow-primary-orange-500/30 font-medium"
        >
          <Plus className="w-5 h-5" />
          New Skill
        </motion.button>
      </motion.div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-effect rounded-2xl p-6 border border-primary-grey-800"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">{categoryIcons[category]}</span>
              {categoryLabels[category]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  whileHover={{ y: -5 }}
                  className="glass-effect border border-primary-grey-800 rounded-xl p-5 hover:border-primary-orange-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {skill.icone && (
                        <img src={skill.icone} alt={skill.nom} className="w-6 h-6 object-contain" />
                      )}
                      {!skill.icone && (
                        <Code className="w-6 h-6 text-primary-orange-500" />
                      )}
                      <h3 className="font-semibold text-white text-lg">{skill.nom}</h3>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full border ${niveauColors[skill.niveau]}`}>
                      {niveauLabels[skill.niveau]}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-primary-grey-400 mb-2">
                      <span>Proficiency</span>
                      <span className="font-semibold text-primary-orange-500">{skill.pourcentage}%</span>
                    </div>
                    <div className="w-full bg-primary-grey-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.pourcentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="bg-gradient-to-r from-primary-orange-500 to-primary-orange-600 h-2 rounded-full shadow-lg shadow-primary-orange-500/50"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOpenModal(skill)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 glass-effect text-primary-orange-500 hover:bg-primary-orange-500/10 rounded-lg text-sm transition-all border border-primary-orange-500/30"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDeleteConfirm(skill)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 glass-effect text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-all border border-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {skills.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-primary-grey-400 glass-effect rounded-2xl border border-primary-grey-800"
        >
          <Code className="w-16 h-16 mx-auto mb-4 text-primary-grey-600" />
          <p className="text-lg">No skills yet. Click "New Skill" to get started.</p>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingSkill ? 'Edit Skill' : 'New Skill'}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
            >
              <option value="FRONTEND">Frontend</option>
              <option value="BACKEND">Backend</option>
              <option value="DATABASE">Database</option>
              <option value="DEVOPS">DevOps</option>
              <option value="AUTRE">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level *</label>
            <select
              name="niveau"
              value={formData.niveau}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
            >
              <option value="DEBUTANT">Beginner</option>
              <option value="INTERMEDIAIRE">Intermediate</option>
              <option value="AVANCE">Advanced</option>
              <option value="EXPERT">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proficiency ({formData.pourcentage}%)
            </label>
            <input
              type="range"
              name="pourcentage"
              min="0"
              max="100"
              value={formData.pourcentage}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon (URL)</label>
            <input
              type="url"
              name="icone"
              value={formData.icone}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500 focus:border-transparent transition-all"
            />
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
        <p className="mb-6 text-gray-700">Are you sure you want to delete the skill "{deleteConfirm?.nom}"?</p>
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

export default SkillsManagement;

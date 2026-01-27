import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GET_PORTFOLIO } from '@/services/queries';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SimpleAvatar from '@/components/SimpleAvatar';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code2,
  Palette,
  Rocket,
  Briefcase,
  Award,
  Terminal,
  Smartphone,
  Database,
  Cloud,
  GitBranch
} from 'lucide-react';

const NewHome = () => {
  const { data, loading, error } = useQuery(GET_PORTFOLIO);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-black-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const portfolio = data?.getPortfolio;
  const profil = portfolio?.profil;
  const projets = portfolio?.projets || [];
  const competences = portfolio?.competences || [];
  const experiences = portfolio?.experiences || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary-black-900">
      {/* Modern Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary-grey-800"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-display font-bold"
            >
              <span className="text-white">&lt;</span>
              <span className="text-gradient">{profil ? `${profil.prenom}` : 'Portfolio'}</span>
              <span className="text-white">/&gt;</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Projets', path: '/projects' },
                { label: 'Compétences', path: '/skills' },
                { label: 'Expérience', path: '/experience' }
              ].map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="text-primary-grey-300 hover:text-primary-orange-500 transition-all duration-300 font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-orange-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin/login"
                className="bg-primary-orange-500 text-white px-6 py-2 rounded-lg hover:bg-primary-orange-600 transition-all font-medium shadow-lg shadow-primary-orange-500/30"
              >
                Admin
              </Link>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-orange-600/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-left"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-block px-4 py-2 glass-effect rounded-full text-primary-orange-500 text-sm font-medium mb-4">
                  👋 Bonjour, je suis disponible pour travailler
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
              >
                {profil ? (
                  <>
                    <span className="block">Je suis</span>
                    <span className="block text-gradient">{profil.prenom} {profil.nom}</span>
                  </>
                ) : (
                  'Développeur Créatif'
                )}
              </motion.h1>

              {profil?.titre && (
                <motion.h2
                  variants={itemVariants}
                  className="text-2xl md:text-3xl text-primary-grey-400 mb-6 font-medium"
                >
                  {profil.titre}
                </motion.h2>
              )}

              <motion.p
                variants={itemVariants}
                className="text-lg text-primary-grey-400 mb-8 max-w-xl leading-relaxed"
              >
                {profil?.bio || 'Créer des expériences numériques avec du code propre et un design créatif. Spécialisé dans la création d\'applications web modernes, évolutives et qui font la différence.'}
              </motion.p>

              {profil?.adresse && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center text-primary-grey-500 mb-8"
                >
                  <MapPin className="w-5 h-5 mr-2 text-primary-orange-500" />
                  <span>{profil.adresse.ville}, {profil.adresse.pays}</span>
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 mb-8"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center bg-primary-orange-500 text-white px-8 py-4 rounded-lg hover:bg-primary-orange-600 transition-all font-medium shadow-lg shadow-primary-orange-500/30"
                  >
                    Voir mes projets
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/experience"
                    className="inline-flex items-center justify-center glass-effect border-2 border-primary-grey-700 text-white px-8 py-4 rounded-lg hover:border-primary-orange-500 transition-all font-medium"
                  >
                    Mon parcours
                  </Link>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex gap-4">
                {profil?.reseauxSociaux?.github && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    href={profil.reseauxSociaux.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center hover:bg-primary-orange-500 transition-all group"
                  >
                    <Github className="w-5 h-5 text-primary-grey-400 group-hover:text-white" />
                  </motion.a>
                )}
                {profil?.reseauxSociaux?.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    href={profil.reseauxSociaux.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center hover:bg-primary-orange-500 transition-all group"
                  >
                    <Linkedin className="w-5 h-5 text-primary-grey-400 group-hover:text-white" />
                  </motion.a>
                )}
                {profil?.email && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    href={`mailto:${profil.email}`}
                    className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center hover:bg-primary-orange-500 transition-all group"
                  >
                    <Mail className="w-5 h-5 text-primary-grey-400 group-hover:text-white" />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>

            {/* Right: Interactive Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-end"
            >
              <SimpleAvatar />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <div>
    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
      À propos <span className="text-gradient">de moi</span>
    </h2>
    <div className="space-y-4 text-primary-grey-400 text-lg leading-relaxed">
      <p>
        Salut, je suis Khadija, développeuse web full stack spécialisée en React, Laravel et Node.js. 
        J’ai une grande passion pour la création d’applications web dynamiques et performantes, en mettant l’accent sur des expériences utilisateur fluides. 
        Mon expertise réside dans la conception de solutions responsives, évolutives et maintenables en utilisant des frameworks JavaScript modernes et des technologies backend.
      </p>
      <p>
        Voici quelques-uns des projets sur lesquels j’ai travaillé :
      </p>
      <p>
        - Développement d’applications web interactives et dynamiques avec React, Laravel et Node.js.<br/>
        - Mise en œuvre du rendu côté serveur (SSR) et de la génération de sites statiques (SSG) pour des performances optimisées.
      </p>
      <p>
        - Garantir un design responsive et une compatibilité multi-navigateurs sur plateformes mobiles et desktop.<br/>
        Je suis toujours enthousiaste à l’idée d’explorer de nouvelles technologies et de collaborer sur des projets innovants. 
        N’hésitez pas à consulter mes dépôts ou à me contacter si vous souhaitez échanger !
      </p>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    {[
      { icon: Code2, label: 'Code propre', value: '100%' },
      { icon: Palette, label: 'Design créatif', value: '95%' },
      { icon: Rocket, label: 'Livraison rapide', value: '98%' },
      { icon: Briefcase, label: 'Professionnalisme', value: '100%' },
    ].map((item, index) => (
      <motion.div
        key={item.label}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="glass-effect rounded-2xl p-6 text-center hover:bg-primary-orange-500/10 transition-all"
      >
        <item.icon className="w-10 h-10 text-primary-orange-500 mx-auto mb-3" />
        <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
        <div className="text-sm text-primary-grey-500">{item.label}</div>
      </motion.div>
    ))}
  </div>
</div>

          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Stack <span className="text-gradient">Technique</span>
            </h2>
            <p className="text-primary-grey-400 text-lg max-w-2xl mx-auto">
              Technologies et outils que j'utilise pour donner vie aux idées
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: Terminal, name: 'JavaScript', color: '#f97316' },
              { icon: Code2, name: 'React', color: '#61dafb' },
              { icon: GitBranch, name: 'Node.js', color: '#68a063' },
              { icon: Database, name: 'MongoDB', color: '#4db33d' },
              { icon: Cloud, name: 'Docker', color: '#2496ed' },
              { icon: Smartphone, name: 'Responsive', color: '#f97316' },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="glass-effect rounded-2xl p-6 text-center hover:bg-white/10 transition-all cursor-pointer group"
              >
                <skill.icon className="w-12 h-12 mx-auto mb-3 text-primary-grey-400 group-hover:text-primary-orange-500 transition-colors" />
                <div className="text-white font-medium">{skill.name}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/skills"
              className="inline-flex items-center text-primary-orange-500 hover:text-primary-orange-400 font-medium group"
            >
              Voir toutes les compétences
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: `${projets.length}+`, label: 'Projets réalisés', icon: Rocket },
              { value: `${experiences.length}+`, label: 'Années d\'expérience', icon: Award },
              { value: `${competences.length}+`, label: 'Technologies', icon: Code2 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-effect rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-primary-orange-500/10 hover:to-transparent transition-all"
              >
                <stat.icon className="w-12 h-12 text-primary-orange-500 mx-auto mb-4" />
                <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-primary-grey-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Projets <span className="text-gradient">en vedette</span>
            </h2>
            <p className="text-primary-grey-400 text-lg max-w-2xl mx-auto">
              Une sélection de mes travaux récents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projets.slice(0, 6).map((projet, index) => (
              <Link
                key={projet._id}
                to={`/projects/${projet.id}`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  {/* Background Image */}
                  {projet.images && projet.images[0] ? (
                    <div className="absolute inset-0">
                      <img
                        src={projet.images[0]}
                        alt={projet.titre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-black-900 via-primary-black-900/60 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-orange-500/20 to-primary-grey-800"></div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-orange-500 transition-colors">
                        {projet.titre}
                      </h3>
                      <p className="text-primary-grey-300 mb-4 line-clamp-2 text-sm">
                        {projet.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {projet.technologies?.slice(0, 2).map((tech) => (
                          <span
                            key={tech.id || tech.nom}
                            className="px-3 py-1 glass-effect text-white rounded-full text-xs font-medium border border-primary-orange-500/30"
                          >
                            {tech.nom || tech}
                          </span>
                        ))}
                        {projet.technologies?.length > 2 && (
                          <span className="px-3 py-1 glass-effect text-primary-grey-400 rounded-full text-xs font-medium">
                            +{projet.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-orange-500 rounded-2xl transition-all duration-300"></div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center text-primary-orange-500 hover:text-primary-orange-400 font-medium group"
            >
              Voir tous les projets
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-3xl p-12 text-center bg-gradient-to-br from-primary-orange-500/10 to-transparent"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Construisons quelque chose d'<span className="text-gradient">Incroyable</span>
            </h2>
            <p className="text-primary-grey-400 text-lg mb-8 max-w-2xl mx-auto">
              Vous avez un projet en tête ? Collaborons et créons ensemble quelque chose d'extraordinaire.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${profil?.email || 'contact@example.com'}`}
                className="inline-flex items-center bg-primary-orange-500 text-white px-8 py-4 rounded-lg hover:bg-primary-orange-600 transition-all font-medium shadow-lg shadow-primary-orange-500/30"
              >
                <Mail className="mr-2 w-5 h-5" />
                Me contacter
              </motion.a>
              {profil?.cv && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={profil.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center glass-effect border-2 border-primary-grey-700 text-white px-8 py-4 rounded-lg hover:border-primary-orange-500 transition-all font-medium"
                >
                  Télécharger CV
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-primary-grey-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-primary-grey-500">
              © {new Date().getFullYear()} {profil ? `${profil.prenom} ${profil.nom}` : 'Portfolio'}. Créé avec
              <span className="text-primary-orange-500 mx-1">♥</span>
              et <span className="text-primary-orange-500">React</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewHome;

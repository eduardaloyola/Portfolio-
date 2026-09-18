import { useState, useEffect, useRef } from 'react'

const skillGroups = [
  {
    id: 'frontend',
    label: 'Front-end',
    icon: '◈',
    color: '#7CB842',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 88 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'HTML & CSS', level: 92 },
      { name: 'Vite', level: 82 },
      { name: 'Angular', level: 65 },
    ],
  },
  {
    id: 'backend',
    label: 'Back-end',
    icon: '◉',
    color: '#B8E04A',
    skills: [
      { name: 'Node.js', level: 78 },
      { name: 'Python', level: 80 },
      { name: 'C#', level: 60 },
      { name: 'PHP', level: 55 },
      { name: 'SQL', level: 75 },
    ],
  },
  {
    id: 'tools',
    label: 'Ferramentas',
    icon: '◧',
    color: '#7CB842',
    skills: [
      { name: 'Git / GitHub', level: 85 },
      { name: 'GitLab', level: 78 },
      { name: 'Docker', level: 55 },
      { name: 'Power BI', level: 70 },
      { name: 'N8N', level: 65 },
      { name: '.NET', level: 55 },
    ],
  },
]

const experiences = [
  {
    role: 'Estagiária de Governança de TI',
    company: 'FIEB',
    period: 'Ago 2025 – Ago 2026',
    tags: ['Python', 'Power BI', 'N8N', 'TOTVS Protheus'],
    desc: 'Automação de dados com Python e N8N, dashboards no Power BI, mapeamento de processos e controle de contratos de TI.',
    temp: false,
  },
  {
    role: 'Estagiária de Sistemas',
    company: 'FIEB',
    period: 'Jun – Jul 2026',
    tags: ['JavaScript', 'React', 'Node.js', 'C#', 'PHP'],
    desc: 'Desenvolvimento e manutenção de sistemas internos. Versionamento em equipe com Git, GitHub e GitLab.',
    temp: true,
  },
  {
    role: 'Integrante de Extensão',
    company: 'Herdata — UFBA',
    period: 'Out 2025 – Presente',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'SQL', 'Python'],
    desc: 'Site oficial do coletivo, pesquisas científicas e análise de dados com impacto comunitário.',
    temp: false,
  },
]

const certs = [
  { title: 'Python do Básico ao Avançado', source: 'Udemy', year: '2025' },
  { title: 'Lógica de Programação e Estrutura de Dados', source: 'UFBA / IC', year: '2024' },
  { title: 'Santander Coders 2024', source: 'ADA Tech', year: '2024' },
]

const education = {
  course: 'Ciência e Tecnologia',
  institution: 'Universidade Federal da Bahia (UFBA)',
  period: '2023 – Presente',
  subjects: ['Hardware', 'Software', 'Lógica de Programação', 'Programação Orientada a Objetos', 'Sistemas Operacionais'],
}

function PixelGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.04 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#7CB842" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

function StatBar({ value, color }: { value: number; color: string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setWidth(value), 100) } },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])

  const blocks = Math.round(value / 10)

  return (
    <div ref={ref} className="flex gap-0.5 items-center">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-2 flex-1 transition-all duration-500"
          style={{
            backgroundColor: i < blocks && width > 0 ? color : 'var(--color-border)',
            transitionDelay: `${i * 40}ms`,
            opacity: i < blocks && width > 0 ? 1 : 0.4,
          }}
        />
      ))}
      <span
        className="ml-2 text-xs font-mono flex-shrink-0"
        style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)', minWidth: '28px' }}
      >
        {value}
      </span>
    </div>
  )
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 45)
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="cursor-blink" style={{ color: 'var(--color-primary)' }}>█</span>
      )}
    </span>
  )
}

export default function App() {
  const [activeGroup, setActiveGroup] = useState('frontend')
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [natureSoundOn, setNatureSoundOn] = useState(true)
  const natureAudioRef = useRef<HTMLAudioElement>(null)
  const natureSoundDisabledRef = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (window.scrollY > 0 && !natureSoundDisabledRef.current) playNatureSound()
    }
    const onWheel = () => {
      if (!natureSoundDisabledRef.current) playNatureSound()
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  useEffect(() => {
    const audio = natureAudioRef.current
    if (!audio) return

    if (natureSoundOn) {
      audio.play().catch(() => setNatureSoundOn(false))
    } else {
      audio.pause()
    }
  }, [natureSoundOn])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const active = skillGroups.find(g => g.id === activeGroup)!
  const natureSoundUrl = `${import.meta.env.BASE_URL}soundreality-birds-forest-nature-445379.mp3`
  const playNatureSound = () => {
    const audio = natureAudioRef.current
    if (!audio) return

    audio.play().then(() => setNatureSoundOn(true)).catch(() => setNatureSoundOn(false))
  }

  const toggleNatureSound = () => {
    const audio = natureAudioRef.current
    if (!audio) return

    if (audio.paused) {
      natureSoundDisabledRef.current = false
      playNatureSound()
    } else {
      natureSoundDisabledRef.current = true
      audio.pause()
      setNatureSoundOn(false)
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)', minHeight: '100vh' }}>

      <audio ref={natureAudioRef} src={natureSoundUrl} autoPlay loop preload="auto" volume={0.15} />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          backgroundColor: scrolled ? 'rgba(13,17,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
        }}
      >
        <div className="site-nav-inner max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span
            className="font-mono text-sm"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}
          >
            {'>'} eduarda.dev<span className="cursor-blink">_</span>
          </span>
          <div className="site-nav-links flex gap-6 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-foreground)' }}>
            {['sobre', 'skills', 'formacao', 'contato'].map(id => (
              <button
                key={id}
                onClick={() => { scrollTo(id); setMobileNavOpen(false) }}
                className="hover:text-primary transition-colors"
                style={{ color: 'inherit' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted-foreground)')}
              >
                /{id}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label="Abrir menu de navegação"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(open => !open)}
          >
            •••
          </button>
          {mobileNavOpen && (
            <div className="mobile-nav-menu" style={{ fontFamily: 'var(--font-mono)' }}>
              {['sobre', 'skills', 'formacao', 'contato'].map(id => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { scrollTo(id); setMobileNavOpen(false) }}
                >
                  /{id}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Organic blob shapes */}
        <div
          className="absolute top-20 right-0 w-96 h-96 opacity-10 float"
          style={{
            background: 'radial-gradient(ellipse at center, #7CB842, transparent 70%)',
            filter: 'blur(40px)',
            borderRadius: '60% 40% 70% 30% / 40% 60% 40% 60%',
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-64 h-64 opacity-8"
          style={{
            background: 'radial-gradient(ellipse at center, #3D5C1A, transparent 70%)',
            filter: 'blur(60px)',
            borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%',
          }}
        />

        <div className="hero-content relative z-10 max-w-5xl mx-auto px-6 py-32">
          <div className="hero-status mb-4 flex items-center gap-3">
            <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              [PLAYER_1] ·
            </span>
            <span style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              Salvador, BA · ~2 anos em campo
            </span>
          </div>

          <h1
            className="font-display mb-2 leading-none"
            style={{ fontSize: 'clamp(3.8rem, 9vw, 8rem)', fontWeight: 300, color: 'var(--color-foreground)' }}
          >
            <TypewriterText text="Eduarda" delay={200} />
          </h1>
          <h1
            className="font-display mb-8 leading-none"
            style={{ fontSize: 'clamp(3.8rem, 9vw, 8rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-primary)' }}
          >
            Loyola
          </h1>

          <p
            className="max-w-lg mb-10 leading-relaxed"
            style={{ color: 'var(--color-muted-foreground)', fontSize: '1rem', lineHeight: '1.8' }}
          >
            Desenvolvedora full stack graduanda em Ciência e Tecnologia pela UFBA.
            Construtora de interfaces, scripts e sistemas — com ~2 anos de código na mochila.
            Fora da tela: natureza e games. 
          </p>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => scrollTo('skills')}
              className="px-6 py-3 text-sm font-medium transition-all duration-200"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
            >
              Ver skills →
            </button>
            <a
              href="https://github.com/eduardaloyola"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 text-sm transition-all duration-200"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-muted-foreground)' }}
            >
              GitHub ↗
            </a>
          </div>

          {/* Stat row */}
          <div className="hero-stats mt-16 flex gap-8 flex-wrap">
            {[
              { label: 'LVL', value: '02', sub: 'anos codando' },
              { label: 'LANG', value: '10+', sub: 'tecnologias' },
              { label: 'LOC', value: 'BA', sub: 'Salvador' },
              { label: 'UNIV', value: 'UFBA', sub: 'C&T' },
            ].map(({ label, value, sub }) => (
              <div key={label}>
                <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '2px' }}>
                  {label}
                </div>
                <div className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-foreground)', fontWeight: 400, lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ color: 'var(--color-muted-foreground)', fontSize: '11px', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-28 relative" style={{ backgroundColor: 'var(--color-card)' }}>
        <PixelGrid />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '12px' }}>
                // SOBRE.txt
              </p>
              <h2
                className="font-display mb-6 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}
              >
                Full stack por<br />
                <em style={{ color: 'var(--color-primary)' }}>escolha</em>, curiosa<br />
                por natureza
              </h2>
              <p style={{ color: 'var(--color-muted-foreground)', lineHeight: '1.85', marginBottom: '16px' }}>
                Construo aplicações web de ponta a ponta — do componente React ao script Python que automatiza o que ninguém quer fazer manualmente.
                Com ~2 anos de prática, já passei por ambiente corporativo, extensão universitária e projetos próprios.
              </p>
              <p style={{ color: 'var(--color-muted-foreground)', lineHeight: '1.85' }}>
                Quando não estou no terminal, gosto de jogar ou sair para a natureza. Natureza e código têm mais em comum do que parece: os dois exigem atenção, paciência e respeito pelo processo.
              </p>
            </div>

            {/* Terminal-style card */}
            <div
              className="font-mono text-sm leading-7 p-6"
              style={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
              }}
            >
              <div style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>
                $ whoami
              </div>
              <div style={{ color: 'var(--color-foreground)', marginBottom: '16px' }}>
                Eduarda Loyola
              </div>
              <div style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>
                $ cat interesses.txt
              </div>
              <div style={{ color: 'var(--color-muted-foreground)' }}>
                <div>▸ desenvolvimento full stack</div>
                <div>▸ automação de processos</div>
                <div>▸ análise de dados</div>
                <div>▸ natureza 🌿</div>
                <div>▸ games & worldbuilding</div>
              </div>
              <div style={{ color: 'var(--color-primary)', marginTop: '16px', marginBottom: '8px' }}>
                $ echo $LOCATION
              </div>
              <div style={{ color: 'var(--color-foreground)' }}>
                Salvador, BA — Brasil
              </div>
              <div style={{ color: 'var(--color-primary)', marginTop: '16px' }}>
                <span className="cursor-blink">█</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 relative">
        <PixelGrid />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '12px' }}>
            // SKILLS.json
          </p>
          <h2
            className="font-display mb-14 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}
          >
            Stack &{' '}
            <em style={{ color: 'var(--color-primary)' }}>Habilidades</em>
          </h2>

          {/* Tab switcher */}
          <div className="flex gap-1 mb-10 flex-wrap">
            {skillGroups.map(g => (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                className="px-5 py-2.5 text-sm transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  backgroundColor: activeGroup === g.id ? 'var(--color-primary)' : 'var(--color-card)',
                  color: activeGroup === g.id ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)',
                  border: `1px solid ${activeGroup === g.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
              >
                {g.icon} {g.label}
              </button>
            ))}
          </div>

          {/* Skills list */}
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-5">
            {active.skills.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-foreground)' }}>{skill.name}</span>
                </div>
                <StatBar value={skill.level} color={active.color} />
              </div>
            ))}
          </div>

          {/* Projeto */}
          <div
            className="mt-20 p-8 relative overflow-hidden"
            style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
          >
            <div
              className="absolute top-0 left-0 w-1 h-full"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            <div className="ml-4">
              <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '10px' }}>
                // PROJETO_DESTAQUE
              </p>
              <h3 className="font-display mb-3" style={{ fontSize: '1.3rem', fontWeight: 400 }}>
                Site Coletivo HerData
              </h3>
              <p style={{ color: 'var(--color-muted-foreground)', lineHeight: '1.75', fontSize: '0.93rem', maxWidth: '520px', marginBottom: '16px' }}>
                Site desenvolvido com React, Vite, TypeScript e Tailwind CSS para um coletivo de pesquisa e extensão universitária. Deploy via GitHub Pages.
              </p>
              <div className="flex gap-2 flex-wrap mb-6">
                {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GitHub Pages'].map(t => (
                  <span
                    key={t}
                    style={{
                      backgroundColor: 'rgba(124,184,66,0.1)',
                      color: 'var(--color-primary)',
                      border: '1px solid rgba(124,184,66,0.2)',
                      padding: '3px 10px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="https://eduardaloyola.github.io/Site-para-coletivo-HerData/"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '13px', textDecoration: 'underline', textUnderlineOffset: '4px' }}
              >
                eduardaloyola.github.io/Site-para-coletivo-HerData/ ↗
              </a>
            </div>
          </div>

          {/* Experiência */}
          <div className="mt-20">
            <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px' }}>
              // EXPERIENCIA
            </p>
            <div className="space-y-1">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-[180px_1fr] gap-6 py-6"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <div>
                    <div style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      {exp.period}
                    </div>
                    <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.85rem' }}>{exp.company}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="font-display" style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--color-foreground)' }}>
                        {exp.role}
                      </div>
                      {exp.temp && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--color-muted-foreground)', border: '1px solid var(--color-border)', padding: '2px 7px' }}>
                          TEMPORÁRIO
                        </span>
                      )}
                    </div>
                    <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '10px' }}>
                      {exp.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(t => (
                        <span
                          key={t}
                          style={{
                            backgroundColor: 'rgba(124,184,66,0.1)',
                            color: 'var(--color-primary)',
                            border: '1px solid rgba(124,184,66,0.2)',
                            padding: '2px 8px',
                            fontSize: '10px',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certs */}
          <div className="mt-14">
            <div id="formacao" className="mb-14 scroll-mt-24">
              <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px' }}>
                // FORMAÇÃO.acadêmica
              </p>
              <div
                className="grid md:grid-cols-[180px_1fr] gap-6 py-6"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <div>
                  <div style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    {education.period}
                  </div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.85rem' }}>{education.institution}</div>
                </div>
                <div>
                  <div className="font-display mb-2" style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--color-foreground)' }}>
                    {education.course}
                  </div>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '10px' }}>
                    Formação interdisciplinar com base em computação, tecnologia e resolução de problemas.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {education.subjects.map(subject => (
                      <span
                        key={subject}
                        style={{
                          backgroundColor: 'rgba(124,184,66,0.1)',
                          color: 'var(--color-primary)',
                          border: '1px solid rgba(124,184,66,0.2)',
                          padding: '2px 8px',
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px' }}>
              // CERTIFICADOS
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {certs.map(c => (
                <div
                  key={c.title}
                  className="p-5"
                  style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                >
                  <div style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '10px', marginBottom: '8px' }}>{c.year}</div>
                  <div style={{ color: 'var(--color-foreground)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '6px' }}>{c.title}</div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>{c.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-28 relative" style={{ backgroundColor: 'var(--color-card)' }}>
        <PixelGrid />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="max-w-lg">
            <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '12px' }}>
              // CONTATO.sh
            </p>
            <h2
              className="font-display mb-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}
            >
              Bora fazer<br />
              <em style={{ color: 'var(--color-primary)' }}>algo legal?</em>
            </h2>
            <p style={{ color: 'var(--color-muted-foreground)', lineHeight: '1.8', marginBottom: '28px' }}>
              Aberta a oportunidades, freelas, colaborações e boas conversas sobre código, games e natureza.
            </p>

            <div className="space-y-3">
              {[
                { label: 'EMAIL', value: 'eduardaloyoladev@gmail.com', href: 'mailto:eduardaloyoladev@gmail.com' },
                { label: 'LINKEDIN', value: 'linkedin.com/in/eduardaloyola', href: 'https://linkedin.com/in/eduardaloyola' },
                { label: 'GITHUB', value: 'github.com/eduardaloyola', href: 'https://github.com/eduardaloyola' },
                { label: 'FONE', value: '(71) 99358-0634', href: null },
              ].map(({ label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 py-3"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', minWidth: '72px' }}>
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      style={{ color: 'var(--color-foreground)', fontSize: '0.9rem', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.9rem' }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 px-6" style={{ backgroundColor: 'var(--color-background)', borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-muted-foreground)' }}>
            {'>'} eduarda_loyola © {new Date().getFullYear()}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-border)' }}>
            made with React + Tailwind
          </span>
        </div>
      </footer>

      <button
        type="button"
        aria-pressed={natureSoundOn}
        onClick={toggleNatureSound}
        className="fixed bottom-5 right-5 z-50 px-4 py-2 text-xs transition-colors"
        style={{
          backgroundColor: natureSoundOn ? 'var(--color-primary)' : 'var(--color-card)',
          color: natureSoundOn ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)',
          border: '1px solid var(--color-border)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {natureSoundOn ? '♪ som: on' : '♪ som: off'}
      </button>

    </div>
  )
}

import { Code, Database, Globe, Smartphone, Zap, GitBranch, Wrench, Users, MessageSquare, Lightbulb, Target, Clock, Heart, Brain } from 'lucide-react'
import { useState } from 'react'

interface SkillsData {
  title: string
  hardSkillsTitle: string
  softSkillsTitle: string
  hardSkills: {
    [key: string]: string[]
  }
  softSkills: string[]
}

interface SkillsProps {
  data: SkillsData
}

const getSkillIcon = (skill: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    'React': <Code className="h-6 w-6" />,
    'Next.js': <Globe className="h-6 w-6" />,
    'React Native': <Smartphone className="h-6 w-6" />,
    'Node.js': <Zap className="h-6 w-6" />,
    'MongoDB': <Database className="h-6 w-6" />,
    'Git': <GitBranch className="h-6 w-6" />,
    'Problem Solving': <Lightbulb className="h-6 w-6" />,
    'Communication': <MessageSquare className="h-6 w-6" />,
    'Teamwork': <Users className="h-6 w-6" />,
    'Time Management': <Clock className="h-6 w-6" />,
    'Creativity': <Lightbulb className="h-6 w-6" />,
    'Leadership': <Target className="h-6 w-6" />,
    'Emotional Intelligence': <Heart className="h-6 w-6" />,
    'Critical Thinking': <Brain className="h-6 w-6" />,
    'Решение проблем': <Lightbulb className="h-6 w-6" />,
    'Коммуникация': <MessageSquare className="h-6 w-6" />,
    'Работа в команде': <Users className="h-6 w-6" />,
    'Управление временем': <Clock className="h-6 w-6" />,
    'Креативность': <Lightbulb className="h-6 w-6" />,
    'Лидерство': <Target className="h-6 w-6" />,
    'Эмоциональный интеллект': <Heart className="h-6 w-6" />,
    'Критическое мышление': <Brain className="h-6 w-6" />,
    'Вирішення проблем': <Lightbulb className="h-6 w-6" />,
    'Комунікація': <MessageSquare className="h-6 w-6" />,
    'Командна робота': <Users className="h-6 w-6" />,
    'Управління часом': <Clock className="h-6 w-6" />,
    'Креативність': <Lightbulb className="h-6 w-6" />,
    'Лідерство': <Target className="h-6 w-6" />,
    'Емоційний інтелект': <Heart className="h-6 w-6" />,
    'Критичне мислення': <Brain className="h-6 w-6" />,
  }
  return iconMap[skill] || <Wrench className="h-6 w-6" />
}

const Skills = ({ data }: SkillsProps) => {
  const [activeMainTab, setActiveMainTab] = useState<string>(data.hardSkillsTitle)

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-primary">{data.title}</h2>
        
        {/* Main Tabs */}
        <div className="flex justify-center mb-10">
          {[data.hardSkillsTitle, data.softSkillsTitle].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMainTab(tab)}
              className={`px-6 py-2 mx-2 rounded-lg font-medium transition-colors ${
                activeMainTab === tab ? 'bg-cyan-400 text-black shadow-lg' : 'bg-background/20 text-foreground hover:bg-background/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeMainTab === data.hardSkillsTitle && (
          <>
            {/* Hard Skills by Categories */}
            <div className="space-y-8">
              {Object.entries(data.hardSkills).map(([category, skills]) => (
                <div key={category} className="max-w-4xl mx-auto">
                  <h3 className="text-xl font-semibold text-primary mb-4 text-center">{category}</h3>
                  <div className="flex flex-wrap justify-center items-center gap-3">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-cyan-400/10 text-cyan-400 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-cyan-400/20 hover:bg-cyan-400/20 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeMainTab === data.softSkillsTitle && (
          /* Soft Skills Tags */
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-3">
              {data.softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-accent/10 text-accent px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-accent/20 hover:bg-accent/20 hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills
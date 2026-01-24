import { Award, ExternalLink } from 'lucide-react'

interface Certificate {
  name: string
  issuer: string
  link: string
}

interface CertificatesProps {
  title: string
  data: Certificate[]
}

const Certificates = ({ title, data }: CertificatesProps) => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-primary">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg border border-primary/30 hover:shadow-xl hover:scale-105 transition-all duration-300 block group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <Award className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                      {cert.name}
                    </h3>
                  </div>
                  <p className="text-primary/80 font-medium">{cert.issuer}</p>
                </div>
                <ExternalLink className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates
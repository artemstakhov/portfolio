import { useForm, FieldValues } from 'react-hook-form'
import axios from 'axios'
import { Send, Mail, User, MessageSquare } from 'lucide-react'

const Contact = ({ title, contact }: { title: string, contact: { nameLabel: string, emailLabel: string, messageLabel: string, namePlaceholder: string, emailPlaceholder: string, messagePlaceholder: string, sendButton: string, sendingText: string, successMessage: string, errorMessage: string } }) => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post('/api/contact', data)
      alert(contact.successMessage)
      reset()
    } catch {
      alert(contact.errorMessage)
    }
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-primary/10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-primary">{title}</h2>
        <div className="bg-background/80 backdrop-blur-sm p-4 md:p-8 rounded-xl shadow-xl border border-primary/30">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-primary/70 mb-2">{contact.nameLabel}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <input
                    {...register('name', { required: true })}
                    placeholder={contact.namePlaceholder}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-foreground/50"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-primary/70 mb-2">{contact.emailLabel}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <input
                    {...register('email', { required: true })}
                    placeholder={contact.emailPlaceholder}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-foreground/50"
                  />
                </div>
              </div>
            </div>
            <div className="relative">
                  <label className="block text-sm font-medium text-primary/70 mb-2">{contact.messageLabel}</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-primary" />
                <textarea
                  {...register('message', { required: true })}
                  placeholder={contact.messagePlaceholder}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-foreground/50 resize-none"
                  rows={6}
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-8 py-3 bg-cyan-400 text-black shadow-lg rounded-lg hover:bg-cyan-500 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                <Send className="h-5 w-5 mr-2" />
                {isSubmitting ? contact.sendingText : contact.sendButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
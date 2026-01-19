import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Contacts = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  })

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const getSubjectLabel = (value) => {
    switch (value) {
      case 'booking':
        return 'Booking Issue'
      case 'refund':
        return 'Refund Request'
      case 'technical':
        return 'Technical Support'
      case 'other':
        return 'Other'
      default:
        return ''
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault();

    const to = 'heritagehub0923@gmail.com'
    const subjectLabel = getSubjectLabel(formData.subject) || formData.subject

    const mailSubject = `HeritageHub Contact: ${subjectLabel}`
    const mailBody = [
      `Name: ${formData.firstName} ${formData.lastName}`.trim(),
      `Email: ${formData.email}`,
      '',
      'Message:',
      formData.message,
    ].join('\n')

    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`

    // Opens the user's default mail app (Gmail app, Outlook, etc.)
    window.location.href = mailtoUrl
    toast.success('Opening your email app…');

    setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
  }

  return (
      <section id="contact" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">We're here to help! Reach out to us through any of these channels.</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-xl text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">Our Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">Uttar Pradesh<br />Uttar Pradesh, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone-alt text-xl text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">Phone Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 8271221434<br />Mon - Fri <br /> 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-xl text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">Email Us</h3>
                    <a
                      href="mailto:heritagehub0923@gmail.com"
                      className="text-gray-600 dark:text-gray-300 hover:underline"
                    >
                      heritagehub0923@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4 dark:text-white">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition duration-300">
                    <i className="fab fa-facebook-f text-indigo-600"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition duration-300">
                    <i className="fab fa-twitter text-indigo-600"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition duration-300">
                    <i className="fab fa-instagram text-indigo-600"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition duration-300">
                    <i className="fab fa-linkedin-in text-indigo-600"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={updateField('firstName')}
                      className="w-full px-4 py-3 border dark:bg-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={updateField('lastName')}
                      className="w-full px-4 py-3 border dark:bg-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={updateField('email')}
                    className="w-full px-4 py-3 border dark:bg-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Subject</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={updateField('subject')}
                    className="w-full px-4 py-3 border dark:bg-gray-900 dark:text-gray-300 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Issue</option>
                    <option value="refund">Refund Request</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Message</label>
                  <textarea
                    required
                    rows="4"
                    value={formData.message}
                    onChange={updateField('message')}
                    className="w-full px-4 py-3 border dark:bg-gray-900 dark:text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

  )
}

export default Contacts

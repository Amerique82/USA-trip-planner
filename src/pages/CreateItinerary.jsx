import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { ButtonLoading, LoadingOverlay } from '../components/Loading'
import jsPDF from 'jspdf'

export default function CreateItinerary() {
  const { addUserItinerary, userItineraries, removeUserItinerary } = useAppContext()
  const [form, setForm] = useState({ title: '', destination: '', duration: '', style: '', notes: '' })
  const [days, setDays] = useState([{ id: 1, title: '', activities: [''] }])
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.destination.trim()) e.destination = 'Destination is required'
    if (!form.duration) e.duration = 'Duration is required'
    if (!form.style) e.style = 'Style is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const downloadPDF = async (itinerary) => {
    setSaving(true)
    try {
      const pdf = new jsPDF()
      
      // Configuración del PDF
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text(itinerary.title, 20, 30)
      
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Destination: ${itinerary.destination}`, 20, 50)
      pdf.text(`Duration: ${itinerary.duration}`, 20, 60)
      pdf.text(`Style: ${itinerary.style}`, 20, 70)
      
      if (itinerary.notes) {
        pdf.text(`Notes: ${itinerary.notes}`, 20, 80)
      }
      
      let yPosition = 100
      itinerary.days.forEach((day, index) => {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 30
        }
        
        pdf.setFont('helvetica', 'bold')
        pdf.text(`Day ${index + 1}: ${day.title || 'Untitled'}`, 20, yPosition)
        yPosition += 10
        
        pdf.setFont('helvetica', 'normal')
        day.activities.forEach(activity => {
          if (activity && yPosition < 270) {
            pdf.text(`• ${activity}`, 25, yPosition)
            yPosition += 8
          }
        })
        yPosition += 5
      })
      
      // Descargar el PDF
      pdf.save(`${itinerary.title.replace(/\s+/g, '-')}.pdf`)
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    
    setSaving(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newItinerary = { ...form, days }
      addUserItinerary(newItinerary)
      
      // Descargar PDF inmediatamente después de guardar
      await downloadPDF(newItinerary)
      
      // Reset form
      setForm({ title: '', destination: '', duration: '', style: '', notes: '' })
      setDays([{ id: 1, title: '', activities: [''] }])
    } catch (error) {
      console.error('Error saving itinerary:', error)
    } finally {
      setSaving(false)
    }
  }

  const addDay = () => setDays(p => [...p, { id: Date.now(), title: '', activities: [''] }])
  const updateDay = (id, field, val) => setDays(p => p.map(d => d.id === id ? { ...d, [field]: val } : d))
  const addActivity = (id) => setDays(p => p.map(d => d.id === id ? { ...d, activities: [...d.activities, ''] } : d))
  const updateActivity = (dayId, idx, val) => setDays(p => p.map(d => d.id === dayId ? { ...d, activities: d.activities.map((a, i) => i === idx ? val : a) } : d))
  const removeActivity = (dayId, idx) => setDays(p => p.map(d => d.id === dayId ? { ...d, activities: d.activities.filter((_, i) => i !== idx) } : d))

  const downloadExistingItinerary = async (it) => {
    await downloadPDF(it)
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="/usa-trip-planner-create-your-itinerary.webp" alt="Create itinerary hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary-900 mb-3">Create Your Itinerary</h1>
          <p className="text-primary-800 text-sm md:text-base max-w-xl">Plan your perfect trip step by step.</p>
        </div>
      </div>
    <div className="container-custom py-10">
      {saved && <div className="max-w-4xl mx-auto mb-6 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">Itinerary created and PDF downloaded!</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* LEFT COLUMN - Form (60% width) */}
        <div className="lg:col-span-3 pr-8">
          <form onSubmit={handleSubmit}>
            <div className="card p-6 mb-6">
              <h2 className="font-heading font-bold text-primary-900 mb-4">Trip Details</h2>
              <div className="mb-4">
                <label htmlFor="create-title" className="block text-sm text-gray-600 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} id="create-title" aria-label="Trip title" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <label htmlFor="create-destination" className="block text-sm text-gray-600 mb-1">Destination *</label>
                  <input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} id="create-destination" aria-label="Trip destination" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
                </div>
                <div>
                  <label htmlFor="create-duration" className="block text-sm text-gray-600 mb-1">Duration *</label>
                  <select value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} id="create-duration" aria-label="Trip duration" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">Select</option>
                    {['1-3 days','4-7 days','1-2 weeks','2+ weeks'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                </div>
                <div>
                  <label htmlFor="create-style" className="block text-sm text-gray-600 mb-1">Style *</label>
                  <select value={form.style} onChange={e => setForm({...form, style: e.target.value})} id="create-style" aria-label="Travel style" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">Select</option>
                    {['Solo','Couple','Family','Friends','Road Trip'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.style && <p className="text-red-500 text-xs mt-1">{errors.style}</p>}
                </div>
              </div>
              <label className="block text-sm text-gray-600 mb-1">Notes (optional)</label>
              <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>

            <div className="card p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-heading font-bold text-primary-900">Day-by-Day Plan</h2>
                <button type="button" onClick={addDay} className="text-primary-500 text-sm font-medium">+ Add Day</button>
              </div>
              {days.map((day, di) => (
                <div key={day.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <h3 className="font-bold text-primary-800 mb-2">Day {di + 1}</h3>
                  <label className="block text-sm text-gray-600 mb-1">Day Title</label>
                  <input value={day.title} onChange={e => updateDay(day.id, 'title', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  <label className="block text-sm text-gray-600 mb-1">Activities</label>
                  {day.activities.map((a, ai) => (
                    <div key={ai} className="flex gap-2 mb-2">
                      <input value={a} onChange={e => updateActivity(day.id, ai, e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                      {day.activities.length > 1 && <button type="button" onClick={() => removeActivity(day.id, ai)} className="text-gray-400 hover:text-red-500">×</button>}
                    </div>
                  ))}
                  <button type="button" onClick={() => addActivity(day.id)} className="text-primary-500 text-xs">+ Add Activity</button>
                </div>
              ))}
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN - Live Preview (40% width) */}
        <div className="lg:col-span-2">
          <div className="sticky top-8">
            <div className="border border-gray-200 rounded-2xl p-6">
              {/* Destination Image */}
              <div className="overflow-hidden rounded-xl mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop" 
                  alt="Destination preview" 
                  className="w-full h-40 object-cover"
                />
              </div>

              {/* Trip Title */}
              <h3 className="font-heading font-bold text-primary-900 text-xl mt-4">
                {form.title || 'Your Trip'}
              </h3>
              
              {/* Destination · Duration · Style */}
              <p className="text-sm text-gray-400 mt-1">
                {form.destination || 'Destination'} · {form.duration || 'Duration'} · {form.style || 'Style'}
              </p>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4"></div>

              {/* Day-by-Day Preview List */}
              <div className="space-y-2">
                {days.map((day, index) => (
                  <div key={day.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                    <div className="font-bold text-primary-800 text-sm">
                      Day {index + 1}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {day.title || 'Untitled day'}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {day.activities
                        .filter(activity => activity.trim())
                        .slice(0, 2)
                        .map((activity, idx) => (
                          <span key={idx}>
                            {idx > 0 && ' · '}{activity}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview note */}
              <p className="text-xs text-gray-300 italic mt-4">
                Preview updates as you type
              </p>

              {/* Button Section - Moved here */}
              <div className="mt-6 space-y-2">
                <ButtonLoading 
                  type="submit" 
                  loading={saving}
                  disabled={saving}
                  className="btn-accent w-full text-base py-4 relative"
                >
                  {saving ? 'Creating PDF...' : 'Download PDF Itinerary'}
                </ButtonLoading>
                
                <button
                  onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(form.title || 'My Itinerary')}&body=${encodeURIComponent(`Check out this itinerary: ${window.location.origin}/create`)}`}
                  className="inline-flex items-center justify-center gap-1 border border-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium hover:border-primary-300 hover:text-primary-600 transition-colors shrink-0 whitespace-nowrap w-full"
                >
                  ✉ Send by email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Itineraries Section - unchanged */}
      {userItineraries.length > 0 && (
        <div className="max-w-2xl mx-auto mt-10">
          <h2 className="font-heading font-bold text-primary-900 mb-4">Saved Itineraries</h2>
          {userItineraries.map(it => (
            <div key={it.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3">
              <div>
                <p className="font-bold text-primary-800">{it.title}</p>
                <p className="text-sm text-gray-500">{it.destination} · {it.duration}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => downloadExistingItinerary(it)} className="btn-primary text-xs px-3 py-1">Download PDF</button>
                <button onClick={() => removeUserItinerary(it.id)} className="text-red-500 text-xs">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

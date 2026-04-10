import { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Award, Clock, Shield, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { contactInfo, services, processSteps, aboutContent } from '../data/mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact/submit`, formData);
      
      if (response.data.status === 'success') {
        toast.success('Uw aanvraag is succesvol verzonden!');
        toast.info('U ontvangt binnen enkele minuten een bevestigingsmail.', { duration: 5000 });
        setFormData({ name: '', email: '', phone: '', location: '', message: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Er is een fout opgetreden. Probeer het later opnieuw of neem direct contact op via telefoon/WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\+/g, '')}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Stacked Center Layout with Transparency & Mobile Hamburger */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-4 md:py-6">
          {/* Logo - Centered and Large, Full Width */}
          <div className="flex justify-center mb-3 md:mb-4 px-4">
            <img 
              src="/images/logo-banner.png"
              alt="Van de Voorde Orthopedie"
              className="h-auto w-full max-w-[260px] md:max-w-[350px] lg:max-w-[420px] object-contain"
            />
          </div>
          
          {/* Mobile: Buttons Row + Hamburger */}
          <div className="md:hidden flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-3 w-full px-4">
              <Button 
                onClick={handleWhatsApp} 
                size="sm" 
                variant="outline" 
                className="flex-1 max-w-[160px] border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>WhatsApp</span>
              </Button>
              <Button 
                onClick={handleCall} 
                size="sm" 
                className="flex-1 max-w-[160px] bg-[#ffcc4f] hover:bg-[#F4A531] text-[#0e4b4c] font-semibold"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span>Bel Mij</span>
              </Button>
            </div>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#0e4b4c]/95 backdrop-blur-lg rounded-lg p-4 mt-2">
              <nav className="flex flex-col gap-3">
                <a 
                  href="#diensten" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#ffcc4f] transition-colors font-medium text-center py-2"
                >
                  Diensten
                </a>
                <a 
                  href="#over" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#ffcc4f] transition-colors font-medium text-center py-2"
                >
                  Over Mij
                </a>
                <a 
                  href="#werkwijze" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#ffcc4f] transition-colors font-medium text-center py-2"
                >
                  Werkwijze
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#ffcc4f] transition-colors font-medium text-center py-2"
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
          
          {/* Desktop: Navigation and Buttons - Centered Row */}
          <div className="hidden md:flex flex-row items-center justify-center gap-6 lg:gap-8 mt-3">
            <nav className="flex items-center gap-6 lg:gap-8">
              <a href="#diensten" className="text-white hover:text-[#ffcc4f] transition-colors font-medium text-sm lg:text-base">
                Diensten
              </a>
              <a href="#over" className="text-white hover:text-[#ffcc4f] transition-colors font-medium text-sm lg:text-base">
                Over Mij
              </a>
              <a href="#werkwijze" className="text-white hover:text-[#ffcc4f] transition-colors font-medium text-sm lg:text-base">
                Werkwijze
              </a>
              <a href="#contact" className="text-white hover:text-[#ffcc4f] transition-colors font-medium text-sm lg:text-base">
                Contact
              </a>
            </nav>
            
            <div className="flex items-center gap-2 lg:gap-3">
              <Button 
                onClick={handleWhatsApp} 
                size="sm" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm text-sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>WhatsApp</span>
              </Button>
              <Button 
                onClick={handleCall} 
                size="sm" 
                className="bg-[#ffcc4f] hover:bg-[#F4A531] text-[#0e4b4c] font-semibold text-sm"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span>Bel Mij</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Full-Width Banner */}
      <section className="relative bg-[#0e4b4c] text-white overflow-hidden pt-72 md:pt-80 lg:pt-96 pb-16 md:pb-24 lg:pb-32">
        {/* Full-width Banner Background */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-background.jpg"
            alt="Van de Voorde Orthopedie Banner"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e4b4c]/95 via-[#0e4b4c]/90 to-[#0e4b4c]/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 md:mb-6">
              ✓ Exclusieve Service aan Huis door heel België
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6">
              Maatwerk orthopedische schoenen & steunzolen
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto">
              Professionele schoentechniek voor uw voetgezondheid. Orthopedische schoenen aan huis, steunzolen in de praktijk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="bg-[#ffcc4f] hover:bg-[#F4A531] text-[#0e4b4c] font-semibold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto"
              >
                Maak een Afspraak
              </Button>
              <Button 
                onClick={handleWhatsApp}
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 font-semibold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Mij
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-6 md:pt-8 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-[#70C6A5]" />
                <span>RIZIV Erkend</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 md:h-5 md:w-5 text-[#70C6A5]" />
                <span>Vakbekwaam Specialist</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-[#70C6A5]" />
                <span>Flexibele Planning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="over" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-2 bg-[#70C6A5]/20 text-[#0e4b4c] rounded-full text-sm font-semibold mb-6">
                Erkend Specialist
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {aboutContent.title}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {aboutContent.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg">{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Professionele Gegevens</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-[#0e4b4c]" />
                    <div>
                      <span className="font-medium text-gray-900">RIZIV:</span>
                      <span className="ml-2 text-gray-700">{contactInfo.riziv}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#0e4b4c]" />
                    <div>
                      <span className="font-medium text-gray-900">Praktijk:</span>
                      <span className="ml-2 text-gray-700">{contactInfo.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#70C6A5] to-[#70C6A5]/60 rounded-2xl transform rotate-3"></div>
                <img 
                  src="/images/profile-siegert.jpg"
                  alt="Siegert Van de Voorde"
                  className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="diensten" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-[#70C6A5]/20 text-[#0e4b4c] rounded-full text-sm font-semibold mb-6">
              Mijn Expertise
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Orthopedische Schoenen & Steunzolen
            </h2>
            <p className="text-lg text-gray-600">
              Maatwerk orthopedische schoenen aan huis en steunzolen in de praktijk. Professionele zorg afgestemd op uw behoeften.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={service.id} className="border-2 hover:border-[#70C6A5] hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="w-14 h-14 bg-[#70C6A5]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0e4b4c] transition-colors">
                    {service.icon === 'shoe' && <Award className="h-7 w-7 text-[#0e4b4c] group-hover:text-white transition-colors" />}
                    {service.icon === 'footprints' && <Shield className="h-7 w-7 text-[#0e4b4c] group-hover:text-white transition-colors" />}
                    {service.icon === 'search' && <Clock className="h-7 w-7 text-[#0e4b4c] group-hover:text-white transition-colors" />}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section - Service at Home */}
      <section className="py-20 bg-gradient-to-br from-[#70C6A5]/10 to-[#0e4b4c]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-[#0e4b4c] text-white rounded-full text-sm font-semibold mb-6">
                Unieke Service
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Service aan Huis voor Maatwerk Schoenen
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                De complete zorg voor uw nieuwe schoenen – van de eerste voetanalyse en maatname tot de uiteindelijke levering – bij u thuis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="/images/service-at-home.jpg"
                  alt="Service aan huis"
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0e4b4c] rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Geen Afstandsbeperking</h3>
                    <p className="text-gray-600">Waar u ook in België woont, ik kom bij u langs voor een professionele service.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0e4b4c] rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Uw Comfort Voorop</h3>
                    <p className="text-gray-600">Geen stress om naar een werkplaats te reizen. Alles gebeurt in de vertrouwde omgeving van uw eigen huis.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0e4b4c] rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Persoonlijke Aandacht</h3>
                    <p className="text-gray-600">Eén-op-één begeleiding door een ervaren specialist, volledig afgestemd op uw unieke situatie en behoeften.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="werkwijze" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-[#70C6A5]/20 text-[#0e4b4c] rounded-full text-sm font-semibold mb-6">
              Hoe Het Werkt
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Van Eerste Contact tot Perfecte Pasvorm
            </h2>
            <p className="text-lg text-gray-600">
              In drie eenvoudige stappen naar uw maatwerk orthopedische schoenen of steunzolen
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={step.id} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#0e4b4c] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <img 
                src="/images/logo-vdv.jpg"
                alt="Van de Voorde Orthopedie"
                className="rounded-xl shadow-lg h-64 w-full object-contain bg-[#0e4b4c] p-6"
              />
              <img 
                src="/images/logo-vdv.jpg"
                alt="Van de Voorde Orthopedie"
                className="rounded-xl shadow-lg h-64 w-full object-contain bg-[#0e4b4c] p-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-6">
                Neem Contact Op
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Klaar voor Maatwerk Schoenen?
              </h2>
              <p className="text-lg text-gray-600">
                Vul het formulier in of neem direct contact met mij op
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Aanvraagformulier</CardTitle>
                  <CardDescription>Ik neem zo spoedig mogelijk contact met u op</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Naam *</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Uw volledige naam"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mailadres *</label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="uw.email@voorbeeld.be"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefoonnummer *</label>
                      <Input 
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+32 ..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Woonplaats *</label>
                      <Input 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Gemeente of stad"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Uw vraag</label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Vertel mij kort over uw situatie en wensen..."
                        rows={4}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Verzenden...' : 'Verstuur Aanvraag'}
                    </Button>
                    <p className="mt-4 text-[10px] text-gray-400 italic text-center leading-relaxed">
  Opmerking: De eerste aanvraag kan tot 60 seconden duren terwijl onze beveiligde server opstart.
</p>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Direct Contact</CardTitle>
                    <CardDescription>Liever telefonisch of via WhatsApp?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      onClick={handleCall}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 border-2 hover:border-teal-700 hover:bg-teal-50"
                    >
                      <Phone className="mr-3 h-5 w-5 text-teal-700" />
                      <div>
                        <div className="font-semibold text-gray-900">Telefoonnummer</div>
                        <div className="text-sm text-gray-600">{contactInfo.phone}</div>
                      </div>
                    </Button>
                    <Button 
                      onClick={handleWhatsApp}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 border-2 hover:border-teal-700 hover:bg-teal-50"
                    >
                      <MessageCircle className="mr-3 h-5 w-5 text-teal-700" />
                      <div>
                        <div className="font-semibold text-gray-900">WhatsApp</div>
                        <div className="text-sm text-gray-600">Stuur mij een bericht</div>
                      </div>
                    </Button>
                    <Button 
                      onClick={handleEmail}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 border-2 hover:border-teal-700 hover:bg-teal-50"
                    >
                      <Mail className="mr-3 h-5 w-5 text-teal-700" />
                      <div>
                        <div className="font-semibold text-gray-900">E-mail</div>
                        <div className="text-sm text-gray-600">{contactInfo.email}</div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-teal-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-white">Praktijkadres</CardTitle>
                    <CardDescription className="text-teal-100">Voor correspondentie</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{contactInfo.address}</p>
                        <p className="text-sm text-teal-100 mt-2">
                          Let op: Dienstverlening vindt plaats bij u thuis
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <img 
                src="/images/logo-vdv.jpg"
                alt="Van de Voorde Orthopedie"
                className="h-12 mb-4 object-contain rounded"
              />
              <p className="text-sm text-gray-400">
                Orthopedisch Schoentechnoloog<br />
                Exclusieve Service aan Huis<br />
                Door heel België
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-2 text-sm">
                <p>{contactInfo.name}</p>
                <p>{contactInfo.email}</p>
                <p>{contactInfo.phone}</p>
                <p className="text-gray-400 mt-4">{contactInfo.address}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Professionele Gegevens</h3>
              <div className="space-y-2 text-sm">
                <p>RIZIV: {contactInfo.riziv}</p>
                <p>BTW: {contactInfo.btw}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Orthopedie Van de Voorde. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronLeft, ChevronRight, Facebook } from 'lucide-react'
import Image from 'next/image'

interface GalleryImage {
    filename: string
    date: string
    alt: string
}

interface CreativeDaysHomeProps {
    galleryImages: GalleryImage[]
}

export default function CreativeDaysHome({ galleryImages }: CreativeDaysHomeProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)

            const sections = ['home', 'about', 'programs', 'gallery', 'testimonials', 'contact']
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return

            if (e.key === 'Escape') {
                setLightboxIndex(null)
            } else if (e.key === 'ArrowRight') {
                nextImage()
            } else if (e.key === 'ArrowLeft') {
                prevImage()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [lightboxIndex])

    const testimonials = [
        {
            text: "Our daughter has blossomed at Creative Days. The teachers are nurturing and the Montessori approach has helped her become independent and confident.",
            author: "Sarah Johnson",
            role: "Parent"
        },
        {
            text: "The emphasis on hands-on learning and self-directed activities has made such a difference. Our son actually looks forward to school every day!",
            author: "Michael Chen",
            role: "Parent"
        },
        {
            text: "What sets this school apart is the genuine care and attention each child receives. The environment is warm, safe, and stimulating.",
            author: "Emma Rodriguez",
            role: "Parent"
        }
    ]

    const navigation = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About Us' },
        { id: 'programs', label: 'Programs' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'contact', label: 'Contact' }
    ]

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId)
        setMobileMenuOpen(false)
        const element = document.getElementById(sectionId)
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.scrollY - offset
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    const nextImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % galleryImages.length)
        }
    }

    const prevImage = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className={`bg-white fixed w-full top-0 z-50 transition-shadow ${scrollY > 50 ? 'shadow-md' : 'shadow-sm'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl sm:text-2xl font-bold text-amber-600">Creative Days Pre-School</h1>
                        </div>

                        <div className="hidden md:flex space-x-6 lg:space-x-8">
                            {navigation.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`text-sm lg:text-base text-gray-700 hover:text-amber-600 transition-colors ${activeSection === item.id ? 'text-amber-600 font-semibold' : ''
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-700 hover:text-amber-600"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-md"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="pt-16 bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                    <div className="text-center">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Nurturing Young Minds
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                            Where curiosity meets discovery in a warm, Montessori-inspired environment
                        </p>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="bg-amber-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Schedule a Visit
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">About Our School</h2>
                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div>
                            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                                At Creative Days Pre-School, we believe every child is unique and deserves an education
                                tailored to their individual needs and interests. Our Montessori-inspired approach encourages
                                independence, creativity, and a lifelong love of learning.
                            </p>
                            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                                Founded in 2010, we've been providing exceptional early childhood education for over a decade.
                                Our experienced teachers create a nurturing environment where children feel safe to explore,
                                question, and grow.
                            </p>
                            <p className="text-base sm:text-lg text-gray-700">
                                We focus on the whole child—developing not just academic skills, but also social-emotional
                                intelligence, physical coordination, and creative expression.
                            </p>
                        </div>
                        <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=800&fit=crop"
                                alt="Children engaged in learning"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="py-16 sm:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Our Programs</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-bold text-amber-600 mb-3 sm:mb-4">Toddler Program</h3>
                            <p className="text-gray-600 mb-3 sm:mb-4 font-semibold">Ages 18 months - 3 years</p>
                            <p className="text-sm sm:text-base text-gray-700">
                                Our toddler program focuses on developing independence, language skills, and social interaction
                                in a safe, nurturing environment designed specifically for young explorers.
                            </p>
                        </div>
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <h3 className="text-xl sm:text-2xl font-bold text-amber-600 mb-3 sm:mb-4">Preschool Program</h3>
                            <p className="text-gray-600 mb-3 sm:mb-4 font-semibold">Ages 3 - 5 years</p>
                            <p className="text-sm sm:text-base text-gray-700">
                                Children engage with hands-on Montessori materials, developing math, literacy, and critical
                                thinking skills while building confidence and social-emotional competence.
                            </p>
                        </div>
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-amber-600 mb-3 sm:mb-4">Kindergarten</h3>
                            <p className="text-gray-600 mb-3 sm:mb-4 font-semibold">Ages 5 - 6 years</p>
                            <p className="text-sm sm:text-base text-gray-700">
                                Our kindergarten program prepares children for elementary school with advanced Montessori
                                curriculum, collaborative projects, and enrichment activities in art, music, and science.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">Our Gallery</h2>
                    <p className="text-center text-gray-600 mb-8 sm:mb-12">
                        Showing {galleryImages.length} {galleryImages.length === 1 ? 'image' : 'images'} (most recent first)
                    </p>

                    {galleryImages.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No images yet. Add images to /public/images/gallery/ to see them here!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {galleryImages.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setLightboxIndex(index)}
                                    className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                                >
                                    <Image
                                        src={`/images/gallery/${image.filename}`}
                                        alt={image.alt}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                                        <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                                            <p className="font-semibold text-sm sm:text-base">{image.alt}</p>
                                            <p className="text-xs sm:text-sm">{new Date(image.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && galleryImages.length > 0 && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setLightboxIndex(null)
                        }}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                        aria-label="Close lightbox"
                    >
                        <X size={32} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            prevImage()
                        }}
                        className="absolute left-2 sm:left-4 text-white hover:text-gray-300 z-10"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            nextImage()
                        }}
                        className="absolute right-2 sm:right-4 text-white hover:text-gray-300 z-10"
                        aria-label="Next image"
                    >
                        <ChevronRight size={40} />
                    </button>
                    <div className="max-w-5xl w-full relative" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full h-[80vh]">
                            <Image
                                src={`/images/gallery/${galleryImages[lightboxIndex].filename}`}
                                alt={galleryImages[lightboxIndex].alt}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-white text-center mt-4 text-sm sm:text-base px-4">
                            {galleryImages[lightboxIndex].alt}
                        </p>
                        <p className="text-gray-400 text-center text-xs sm:text-sm">
                            {lightboxIndex + 1} of {galleryImages.length}
                        </p>
                    </div>
                </div>
            )}

            {/* Testimonials Section */}
            <section id="testimonials" className="py-16 sm:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">What Parents Say</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>
                                <div className="border-t pt-4">
                                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Get In Touch</h2>
                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Visit Us</h3>
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex items-start">
                                    <MapPin className="text-amber-600 mt-1 mr-3 flex-shrink-0" size={24} />
                                    <div>
                                        <p className="font-semibold text-base sm:text-lg">Address</p>
                                        <p className="text-sm sm:text-base text-gray-600">25, 26 Baskin Cottages<br /> Ballymacartle<br /> Dublin<br /> K67 H6P1</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="text-amber-600 mt-1 mr-3 flex-shrink-0" size={24} />
                                    <div>
                                        <p className="font-semibold text-base sm:text-lg">Phone</p>
                                        <a href="tel:+353852874598" className="text-sm sm:text-base text-gray-600 hover:text-amber-600">(085) 287 4598</a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Mail className="text-amber-600 mt-1 mr-3 flex-shrink-0" size={24} />
                                    <div>
                                        <p className="font-semibold text-base sm:text-lg">Email</p>
                                        <a href="mailto:Creativedayspreschool25@gmail.com" className="text-sm sm:text-base text-gray-600 hover:text-amber-600">Creativedayspreschool25@gmail.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Facebook className="text-amber-600 mt-1 mr-3 flex-shrink-0" size={24} />
                                    <div>
                                        <p className="font-semibold text-base sm:text-lg">Facebook Page</p>
                                        <a href="https://www.facebook.com/CreativeDaysPreschool/" target="_blank" rel="noopener noreferrer" className="text-amber-600 text-xs sm:text-sm mt-2">@CreativeDaysPreschool</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-64 sm:h-80 md:h-96 rounded-lg flex items-center justify-center shadow-lg">
                            <div className="text-center p-4">
                                <MapPin className="text-amber-600 mx-auto mb-3" size={48} />
                                <p className="text-amber-700 text-base sm:text-lg font-semibold">Map Integration</p>
                                <a href="https://maps.app.goo.gl/WU8u3s6TmyhpSX2u7" target="_blank" rel="noopener noreferrer" className="text-amber-600 text-xs sm:text-sm mt-2 hover:text-amber-700">View Creative Days on Google Maps</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm sm:text-base">&copy; 2026 Creative Days Pre-School. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
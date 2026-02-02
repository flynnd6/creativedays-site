import CreativeDaysHome from './components/CreativeDaysHome'
import { getGalleryImages } from '@/lib/images'

export default async function Home() {
  const galleryImages = await getGalleryImages()

  return <CreativeDaysHome galleryImages={galleryImages} />
}
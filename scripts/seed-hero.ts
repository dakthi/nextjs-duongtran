// Script to seed initial hero content
import { prisma } from '../src/lib/prisma'

async function seedHero() {
  try {
    // Check if hero content already exists
    const existingHero = await prisma.heroContent.findFirst()

    if (existingHero) {
      console.log('Hero content already exists')
      return
    }

    // Create initial hero content
    const hero = await prisma.heroContent.create({
      data: {
        title: "I am an accountant.\nHow about you?",
        subtitle: "I would love to hear more about you, and how I can help you protect your business, support your family, and enjoy the life you are building.",
        description: "Leave the boring parts to me\nYou take care of what is fun!",
        ctaText: "See how I can help",
        ctaLink: "/services",
        image: "/img/lieu-barbican.jpg",
        isActive: true
      }
    })

    console.log('Successfully seeded hero content:', hero)
  } catch (error) {
    console.error('Error seeding hero content:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedHero()
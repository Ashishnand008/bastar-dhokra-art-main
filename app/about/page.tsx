"use client"

import { useEffect } from "react"
import { AnimatedSection } from "@/components/animated-section"

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src="/about.jpg?height=800&width=1600"
            alt="Bastar Dhokra Art craftsmanship"
            className="h-full w-full object-cover object-[25%_35%]"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-4xl text-center text-white">
            <AnimatedSection animation="fade-in-up">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">About Bastar Dhokra Art</h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-up" delay="delay-200">
              <p className="text-lg md:text-xl">A 4,000-year-old metal casting tradition from central India</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="container mx-auto py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <AnimatedSection animation="fade-in-left">
            <div>
              <h2 className="mb-6 text-3xl font-bold">The Rich Heritage</h2>
              <p className="mb-4 text-muted-foreground">
                Dhokra, also known as Dokra, is an ancient metal casting technique that has been practiced in India for
                over 4,000 years. The earliest known Dhokra artifacts date back to the Indus Valley Civilization.
              </p>
              <p className="mb-4 text-muted-foreground">
                In the tribal regions of Bastar in Chhattisgarh, this art form has been preserved through generations,
                with artisans passing down their skills and knowledge to their children.
              </p>
              <p className="text-muted-foreground">
                The Dhokra artisans, known as Ghadwas, create stunning brass artifacts using the lost-wax casting
                technique, producing pieces that reflect their tribal life, mythology, and cultural heritage.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-in-right" delay="delay-200">
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Historical Dhokra artifacts"
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Crafting Process */}
      <section className="bg-muted py-16">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">The Lost-Wax Casting Process</h2>
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Clay Core",
                description: "Artisans begin by creating a clay core in the rough shape of the final product.",
              },
              {
                title: "Wax Layering",
                description:
                  "A mixture of beeswax, resin, and oil is applied over the clay core and detailed designs are carved.",
              },
              {
                title: "Clay Coating",
                description: "The wax model is coated with layers of fine clay and left to dry completely.",
              },
              {
                title: "Metal Casting",
                description:
                  "The mold is heated, allowing the wax to melt and drain out. Molten brass is then poured into the cavity.",
              },
            ].map((step, index) => (
              <AnimatedSection key={index} animation="fade-in-up" delay={`delay-${index * 100}` as
              | ""
              | "delay-100"
              | "delay-200"
              | "delay-300"
              | "delay-400"
              | "delay-500"}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section className="container mx-auto py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">The Master Artisans</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Meet the skilled craftspeople who keep this ancient tradition alive through their dedication and expertise.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-lg border">
              <div className="h-64 w-full">
                <img
                  src={`/placeholder.svg?height=300&width=400&text=Artisan ${i}`}
                  alt={`Dhokra artisan ${i}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">Artisan Name</h3>
                <p className="mb-4 text-sm text-muted-foreground">Master Craftsperson with 30+ years of experience</p>
                <p className="text-muted-foreground">
                  "I learned this craft from my father, who learned it from his father. Each piece I create carries the
                  wisdom and traditions of my ancestors."
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cultural Significance */}
      <section className="bg-muted py-16">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative h-[500px] overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=500&width=700"
                alt="Cultural significance of Dhokra art"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold">Cultural Significance</h2>
              <p className="mb-4 text-muted-foreground">
                Dhokra art is deeply intertwined with the cultural and spiritual life of the tribal communities of
                Bastar. The motifs and figures depicted in these artworks often represent:
              </p>
              <ul className="mb-6 space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Tribal deities and religious ceremonies that form an integral part of their belief system</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Daily life activities like farming, hunting, and community gatherings</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>
                    Wildlife and nature, reflecting the close relationship between the tribal communities and their
                    environment
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Folk tales and legends passed down through generations</span>
                </li>
              </ul>
              <p className="text-muted-foreground">
                By preserving and promoting Dhokra art, we are not just supporting a craft but helping maintain a
                cultural heritage that is at risk of being lost in the modern world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

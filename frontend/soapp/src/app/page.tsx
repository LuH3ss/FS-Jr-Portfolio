
import Navbar from "@/components/shared/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Shield, ArrowRight, Code2, Layers, Cpu } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="container relative mx-auto px-4 py-24 md:px-6 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Potenciado por Inteligencia Artificial</span>
            </div>
            
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Transforma tus ideas técnicas en{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                contenido profesional
              </span>
            </h1>
            
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Gestiona tu portfolio fullstack con un sistema CRUD completo. 
              Mejora automáticamente tus publicaciones con IA para destacar 
              en tu carrera profesional.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Comenzar Ahora
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="gap-2">
                  Ver Características
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-card/50 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Todo lo que necesitas para tu portfolio
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Una plataforma completa para gestionar y potenciar tu presencia profesional
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card transition-colors hover:border-primary/50">
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">CRUD Completo</h3>
                <p className="text-muted-foreground">
                  Crea, edita y elimina tus publicaciones técnicas con una interfaz intuitiva y moderna.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card transition-colors hover:border-primary/50">
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Cpu className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Mejora con IA</h3>
                <p className="text-muted-foreground">
                  Potencia automáticamente tus textos con streaming de IA en tiempo real.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card transition-colors hover:border-primary/50">
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Autenticación Segura</h3>
                <p className="text-muted-foreground">
                  Sistema de login seguro para proteger tu contenido y gestionar accesos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card transition-colors hover:border-primary/50">
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Layers className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Arquitectura Fullstack</h3>
                <p className="text-muted-foreground">
                  Construido con Next.js, TypeScript y las mejores prácticas de desarrollo.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card transition-colors hover:border-primary/50">
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Rendimiento Óptimo</h3>
                <p className="text-muted-foreground">
                  Streaming de datos y renderizado optimizado para la mejor experiencia.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card transition-colors hover:border-primary/50">
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Diseño Profesional</h3>
                <p className="text-muted-foreground">
                  Interfaz moderna y cohesiva que destaca tu trabajo como desarrollador.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Listo para empezar?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Únete y comienza a construir tu portfolio profesional hoy mismo.
            </p>
            <Link href="/login">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Crear Cuenta Gratis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <Sparkles className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">MyPortfolio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Construido con Next.js, TypeScript y IA
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

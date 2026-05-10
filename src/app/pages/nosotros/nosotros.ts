import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarWidget } from '../landing/components/topbarwidget.component';
import { FooterWidget } from '../landing/components/footerwidget';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, TopbarWidget, FooterWidget],
  template: `
    <div class="min-h-screen flex flex-col bg-surface-0 dark:bg-surface-900">
        <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
        <div class="flex-1">
            <!-- Hero Section -->
            <section class="py-20 bg-primary-50 dark:bg-surface-800">
                <div class="container mx-auto px-6 text-center">
                    <h1 class="text-6xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
                        Transformamos la forma de <span class="text-primary-600">encontrar hogar</span>
                    </h1>
                    <p class="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        En TuPisoYa, no solo listamos propiedades; construimos puentes hacia tus sueños. Somos la plataforma líder que combina tecnología avanzada con un trato humano excepcional.
                    </p>
                </div>
            </section>

            <!-- Stats / Why Us -->
            <section class="py-16">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div class="p-8 rounded-2xl bg-white dark:bg-surface-800 shadow-xl border border-gray-100 dark:border-surface-700">
                            <i class="pi pi-users text-5xl text-primary-500 mb-6"></i>
                            <h3 class="text-2xl font-bold mb-4">Comunidad</h3>
                            <p class="text-gray-600 dark:text-gray-400">Más de 50,000 usuarios confían mensualmente en nosotros para encontrar su próximo destino.</p>
                        </div>
                        <div class="p-8 rounded-2xl bg-white dark:bg-surface-800 shadow-xl border border-gray-100 dark:border-surface-700">
                            <i class="pi pi-shield text-5xl text-primary-500 mb-6"></i>
                            <h3 class="text-2xl font-bold mb-4">Seguridad</h3>
                            <p class="text-gray-600 dark:text-gray-400">Verificamos cada anuncio para garantizar que tu experiencia sea 100% segura y libre de fraudes.</p>
                        </div>
                        <div class="p-8 rounded-2xl bg-white dark:bg-surface-800 shadow-xl border border-gray-100 dark:border-surface-700">
                            <i class="pi pi-bolt text-5xl text-primary-500 mb-6"></i>
                            <h3 class="text-2xl font-bold mb-4">Rapidez</h3>
                            <p class="text-gray-600 dark:text-gray-400">Nuestro buscador inteligente te ahorra horas de navegación, mostrándote solo lo que te importa.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Mission/Vision -->
            <section class="py-20 bg-surface-50 dark:bg-surface-900">
                <div class="container mx-auto px-6">
                    <div class="flex flex-col md:flex-row items-center gap-16">
                        <div class="w-full md:w-1/2">
                            <img src="/demo/images/galleria/galleria10.jpg" alt="Equipo" class="rounded-3xl shadow-2xl">
                        </div>
                        <div class="w-full md:w-1/2 space-y-8">
                            <div>
                                <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Nuestra Misión</h2>
                                <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Democratizar el acceso al mercado inmobiliario, eliminando las barreras burocráticas y haciendo que el proceso de alquiler o compra sea tan sencillo como pedir un café.
                                </p>
                            </div>
                            <div>
                                <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Nuestra Visión</h2>
                                <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Ser el estándar global de transparencia en el sector inmobiliario, donde cada clic signifique una nueva oportunidad para empezar una vida mejor.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <footer-widget class="mt-auto" />
    </div>
  `
})
export class Nosotros {}

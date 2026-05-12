import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarWidget } from '../landing/components/topbarwidget.component';
import { FooterWidget } from '../landing/components/footerwidget';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, TopbarWidget, FooterWidget],
  template: `
    <div class="min-h-screen flex flex-col bg-surface-0 dark:bg-surface-900">
        <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
        <div class="flex-1">
            <!-- Hero Contact -->
            <section class="py-20" style="background-color: #D4E157;">
                <div class="container mx-auto px-6 text-center">
                    <h1 class="text-6xl font-bold mb-4 text-gray-900">Estamos aquí para ayudarte</h1>
                    <p class="text-2xl text-gray-700">Resuelve tus dudas en minutos con nuestro equipo de expertos.</p>
                </div>
            </section>

            <!-- Contact Grid -->
            <section class="py-20">
                <div class="container mx-auto px-6">
                    <div class="flex flex-col lg:flex-row gap-16">
                        <!-- Contact Info -->
                        <div class="w-full lg:w-1/3 space-y-12">
                            <div>
                                <h3 class="text-3xl font-bold mb-6">Datos de Contacto</h3>
                                <div class="space-y-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                            <i class="pi pi-phone text-primary-600 dark:text-primary-300"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500">Llámanos</p>
                                            <p class="text-xl font-bold">+34 900 123 456</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                            <i class="pi pi-envelope text-primary-600 dark:text-primary-300"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500">Email</p>
                                            <p class="text-xl font-bold">info@tupisoya.com</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                            <i class="pi pi-map-marker text-primary-600 dark:text-primary-300"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500">Ubicación</p>
                                            <p class="text-xl font-bold">Calle Principal 123, Madrid</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="p-8 rounded-3xl shadow-2xl" style="background-color: #D4E157;">
                                <h4 class="text-2xl font-bold mb-4 text-gray-900">¿Eres propietario?</h4>
                                <p class="mb-6 text-gray-700">Publica tu inmueble gratis y empieza a recibir ofertas hoy mismo.</p>
                                <button class="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">Publicar Anuncio</button>
                            </div>
                        </div>

                        <!-- Contact Form -->
                        <div class="w-full lg:w-2/3 bg-white dark:bg-surface-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-surface-700">
                            <h3 class="text-3xl font-bold mb-8">Envíanos un mensaje</h3>
                            <form class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="flex flex-col gap-2">
                                    <label class="font-bold text-gray-700 dark:text-gray-300">Nombre Completo</label>
                                    <input type="text" placeholder="Ej. Juan Pérez" class="p-4 bg-surface-50 dark:bg-surface-900 border border-gray-200 dark:border-surface-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all">
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label class="font-bold text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                                    <input type="email" placeholder="juan@ejemplo.com" class="p-4 bg-surface-50 dark:bg-surface-900 border border-gray-200 dark:border-surface-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all">
                                </div>
                                <div class="flex flex-col gap-2 md:col-span-2">
                                    <label class="font-bold text-gray-700 dark:text-gray-300">Asunto</label>
                                    <input type="text" placeholder="¿En qué podemos ayudarte?" class="p-4 bg-surface-50 dark:bg-surface-900 border border-gray-200 dark:border-surface-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all">
                                </div>
                                <div class="flex flex-col gap-2 md:col-span-2">
                                    <label class="font-bold text-gray-700 dark:text-gray-300">Mensaje</label>
                                    <textarea rows="5" placeholder="Cuéntanos más detalles..." class="p-4 bg-surface-50 dark:bg-surface-900 border border-gray-200 dark:border-surface-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"></textarea>
                                </div>
                                <div class="md:col-span-2">
                                    <button 
                                        class="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                                        Enviar Mensaje
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <footer-widget class="mt-auto" />
    </div>
  `
})
export class Contacto {}
